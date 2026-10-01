"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import SearchBar from "@/components/SearchBar";
import FilterBar from "@/components/FilterBar";
import LinkCard from "@/components/LinkCard";
import RefreshBar from "@/components/RefreshBar";
import ErrorState from "@/components/ErrorState";
import EmptyState from "@/components/EmptyState";
import { LoadingSkeletonGrid } from "@/components/LoadingSkeleton";
import { useLinks } from "@/hooks/useLinks";
import { BookOpen } from "lucide-react";

export default function TugasPage() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState(
    searchParams.get("kategori") ?? ""
  );
  const [sortBy, setSortBy] = useState<"urutan" | "tenggat">("urutan");

  useEffect(() => {
    const k = searchParams.get("kategori");
    if (k) setActiveCategory(k);
  }, [searchParams]);

  const { allLinks, isLoading, error, lastUpdated, refresh } = useLinks({
    autoRefreshInterval: 60000,
  });

  // Hanya link dengan halaman === "Tugas"
  const tugasLinks = allLinks.filter((l) => l.halaman === "Tugas");

  // Sub-kategori yang ada di data Tugas
  const tugasCategories = [...new Set(tugasLinks.map((l) => l.kategori))].filter(Boolean);

  const filteredLinks = tugasLinks
    .filter((l) => {
      if (activeCategory) return l.kategori === activeCategory;
      return true;
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
          <BookOpen className="w-5 h-5 text-white" aria-hidden="true" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-800">Tugas</h1>
          <p className="text-gray-500 text-sm">
            Tugas harian, mingguan, bulanan, dan periode tertentu
          </p>
        </div>
      </div>

      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Cari tugas..."
      />

      <FilterBar
        categories={tugasCategories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      <RefreshBar lastUpdated={lastUpdated} isLoading={isLoading} onRefresh={refresh} />

      {isLoading ? (
        <LoadingSkeletonGrid />
      ) : error ? (
        <ErrorState message={error} onRetry={refresh} />
      ) : filteredLinks.length === 0 ? (
        <EmptyState
          title={searchQuery ? "Tidak ada hasil pencarian" : "Belum ada tugas"}
          description={
            searchQuery
              ? `Tidak ada tugas yang cocok dengan "${searchQuery}".`
              : activeCategory
              ? `Belum ada tugas aktif di kategori "${activeCategory}".`
              : "Belum ada tugas yang tersedia."
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
