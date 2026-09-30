"use client";

import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import FilterBar from "@/components/FilterBar";
import LinkCard from "@/components/LinkCard";
import RefreshBar from "@/components/RefreshBar";
import ErrorState from "@/components/ErrorState";
import EmptyState from "@/components/EmptyState";
import { LoadingSkeletonGrid } from "@/components/LoadingSkeleton";
import { useLinks } from "@/hooks/useLinks";
import { ClipboardList } from "lucide-react";

const ADMIN_CATEGORIES = ["Perizinan", "Pascakegiatan", "Medium & Bahasa Inggris"];

export default function AdministrasiPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("");
  const [sortBy, setSortBy] = useState<"urutan" | "tenggat">("urutan");

  const { allLinks, categories, isLoading, error, lastUpdated, refresh } = useLinks({
    autoRefreshInterval: 60000,
  });

  // Filter to admin-related categories
  const adminCategories = categories.filter((c) => ADMIN_CATEGORIES.includes(c));

  // Filter links manually for admin + search + category
  const filteredLinks = allLinks
    .filter((l) => {
      if (activeCategory) return l.kategori === activeCategory;
      return ADMIN_CATEGORIES.includes(l.kategori);
    })
    .filter(
      (l) =>
        !searchQuery ||
        l.namaLink.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.deskripsi.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "tenggat") {
        if (!a.tenggat && !b.tenggat) return a.urutan - b.urutan;
        if (!a.tenggat) return 1;
        if (!b.tenggat) return -1;
        return new Date(a.tenggat).getTime() - new Date(b.tenggat).getTime();
      }
      return a.urutan - b.urutan;
    });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center gap-3">
        <div className="bg-[#243B68] rounded-xl p-2.5">
          <ClipboardList className="w-5 h-5 text-white" aria-hidden="true" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-800">Administrasi</h1>
          <p className="text-gray-500 text-sm">
            Perizinan, pascakegiatan, dan formulir administrasi
          </p>
        </div>
      </div>

      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Cari formulir administrasi..."
      />

      <FilterBar
        categories={adminCategories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      <RefreshBar lastUpdated={lastUpdated} isLoading={isLoading} onRefresh={refresh} />

      {!isLoading && !error && (
        <p className="text-sm text-gray-500">
          Menampilkan{" "}
          <span className="font-medium text-gray-700">{filteredLinks.length}</span>{" "}
          tautan administrasi
        </p>
      )}

      {isLoading ? (
        <LoadingSkeletonGrid />
      ) : error ? (
        <ErrorState message={error} onRetry={refresh} />
      ) : filteredLinks.length === 0 ? (
        <EmptyState
          title="Belum ada tautan administrasi"
          description={
            searchQuery
              ? `Tidak ada tautan yang cocok dengan "${searchQuery}".`
              : "Belum ada tautan administrasi yang tersedia."
          }
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredLinks.map((link) => (
            <LinkCard key={link.id} link={link} />
          ))}
        </div>
      )}
    </div>
  );
}
