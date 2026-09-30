/**
 * Global in-memory cache untuk data links.
 * Disimpan di module-level sehingga bertahan selama tab browser masih terbuka
 * dan bisa dipakai oleh semua halaman tanpa fetch ulang.
 */

import type { LinkItem, ApiResponse } from "@/types/links";

interface CacheEntry {
  allLinks: LinkItem[];
  categories: string[];
  apiResponse: ApiResponse;
  fetchedAt: Date;
}

let cache: CacheEntry | null = null;
let pendingPromise: Promise<CacheEntry | null> | null = null;

/** Umur cache maksimal sebelum dianggap stale (default 60 detik) */
const MAX_AGE_MS = 60_000;

export function getCached(): CacheEntry | null {
  if (!cache) return null;
  const age = Date.now() - cache.fetchedAt.getTime();
  if (age > MAX_AGE_MS) return null; // stale
  return cache;
}

export function setCache(entry: CacheEntry) {
  cache = entry;
}

export function clearCache() {
  cache = null;
}

/** Kembalikan promise yang sedang berjalan agar tidak double-fetch */
export function getPending(): Promise<CacheEntry | null> | null {
  return pendingPromise;
}

export function setPending(p: Promise<CacheEntry | null> | null) {
  pendingPromise = p;
}
