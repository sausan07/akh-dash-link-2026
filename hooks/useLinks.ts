"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import type { LinkItem, ApiResponse } from "@/types/links";
import { fetchLinks, filterActiveLinks, sortLinks, searchLinks } from "@/lib/api";
import { getCached, setCache, clearCache, getPending, setPending } from "@/lib/cache";

interface UseLinksOptions {
  kategori?: string;
  sortBy?: "urutan" | "tenggat";
  query?: string;
  autoRefreshInterval?: number;
}

interface UseLinksReturn {
  links: LinkItem[];
  allLinks: LinkItem[];
  categories: string[];
  isLoading: boolean;
  error: string | null;
  lastUpdated: Date | null;
  refresh: () => void;
  apiResponse: ApiResponse | null;
}

async function loadFresh(): Promise<{
  allLinks: LinkItem[];
  categories: string[];
  apiResponse: ApiResponse;
  fetchedAt: Date;
} | null> {
  const result = await fetchLinks();
  if (!result.success) return null;
  const active = filterActiveLinks(result.data);
  const fetchedAt = new Date();
  const entry = { allLinks: active, categories: result.categories, apiResponse: result, fetchedAt };
  setCache(entry);
  return entry;
}

export function useLinks(options: UseLinksOptions = {}): UseLinksReturn {
  const {
    kategori,
    sortBy = "urutan",
    query = "",
    autoRefreshInterval = 60000,
  } = options;

  // Seed state from cache immediately (no loading flash if data already available)
  const cached = getCached();
  const [allLinks, setAllLinks] = useState<LinkItem[]>(cached?.allLinks ?? []);
  const [categories, setCategories] = useState<string[]>(cached?.categories ?? []);
  const [isLoading, setIsLoading] = useState(!cached);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(cached?.fetchedAt ?? null);
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(cached?.apiResponse ?? null);
  const mountedRef = useRef(true);

  const applyEntry = useCallback((entry: { allLinks: LinkItem[]; categories: string[]; apiResponse: ApiResponse; fetchedAt: Date }) => {
    if (!mountedRef.current) return;
    setAllLinks(entry.allLinks);
    setCategories(entry.categories);
    setApiResponse(entry.apiResponse);
    setLastUpdated(entry.fetchedAt);
    setIsLoading(false);
    setError(null);
  }, []);

  const load = useCallback(async (force = false) => {
    // Use cache if still fresh and not forced
    if (!force) {
      const hit = getCached();
      if (hit) {
        applyEntry(hit);
        return;
      }
    }

    // If another instance is already fetching, wait for that promise
    const existing = getPending();
    if (existing) {
      const entry = await existing;
      if (entry) applyEntry(entry);
      else if (mountedRef.current) setError("Gagal memuat data. Silakan coba lagi.");
      return;
    }

    if (mountedRef.current) setIsLoading(true);

    const promise = loadFresh();
    setPending(promise);

    try {
      const entry = await promise;
      if (mountedRef.current) {
        if (entry) applyEntry(entry);
        else setError("Gagal memuat data dari server.");
      }
    } catch {
      if (mountedRef.current) setError("Terjadi kesalahan saat memuat data.");
    } finally {
      setPending(null);
      if (mountedRef.current) setIsLoading(false);
    }
  }, [applyEntry]);

  // Manual refresh — force bypass cache
  const refresh = useCallback(() => {
    clearCache();
    load(true);
  }, [load]);

  useEffect(() => {
    mountedRef.current = true;
    load();
    return () => { mountedRef.current = false; };
  }, [load]);

  // Auto-refresh: invalidate cache and reload
  useEffect(() => {
    if (!autoRefreshInterval) return;
    const interval = setInterval(() => {
      clearCache();
      load(true);
    }, autoRefreshInterval);
    return () => clearInterval(interval);
  }, [load, autoRefreshInterval]);

  const filtered = useCallback(() => {
    let result = allLinks;
    if (kategori) result = result.filter((l) => l.kategori === kategori);
    result = searchLinks(result, query);
    result = sortLinks(result, sortBy);
    return result;
  }, [allLinks, kategori, query, sortBy]);

  return {
    links: filtered(),
    allLinks,
    categories,
    isLoading,
    error,
    lastUpdated,
    refresh,
    apiResponse,
  };
}
