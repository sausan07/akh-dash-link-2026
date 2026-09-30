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

  const { links, categories, isLoading, error, lastUpdated, refresh } = useLinks({
    query: searchQuery,
    kategori: activeCategory,
    sortBy,
    autoRefreshInterval: 60000,
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center gap-3">
        <div className="bg-[#243B68] rounded-xl p-2.5">
          <BookOpen className="w-5 h-5 text-white" aria-hidden="true" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-800">Tugas &amp; Administrasi</h1>
          <p className="text-gray-500 text-sm">
            Semua tautan tugas, formulir, dan administrasi
          </p>
        </div>
      </div>

      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Cari tautan tugas..."
      />

      <FilterBar
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      <RefreshBar lastUpdated={lastUpdated} isLoading={isLoading} onRefresh={refresh} />

      {!isLoading && !error && (
        <p className="text-sm text-gray-500">
          Menampilkan{" "}
          <span className="font-medium text-gray-700">{links.length}</span> tautan
          {activeCategory && (
            <>
              {" "}di kategori{" "}
              <span className="font-medium text-[#243B68]">{activeCategory}</span>
            </>
          )}
          {searchQuery && (
            <>
              {" "}untuk &ldquo;
              <span className="font-medium text-[#243B68]">{searchQuery}</span>
              &rdquo;
            </>
          )}
        </p>
      )}

      {isLoading ? (
        <LoadingSkeletonGrid />
      ) : error ? (
        <ErrorState message={error} onRetry={refresh} />
      ) : links.length === 0 ? (
        <EmptyState
          title={searchQuery ? "Tidak ada hasil pencarian" : "Belum ada tautan"}
          description={
            searchQuery
              ? `Tidak ada tautan yang cocok dengan "${searchQuery}".`
              : activeCategory
              ? `Belum ada tautan aktif di kategori "${activeCategory}".`
              : "Belum ada tautan yang tersedia. Pastikan Google Sheets API sudah dikonfigurasi."
          }
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {links.map((link) => (
            <LinkCard key={link.id} link={link} />
          ))}
        </div>
      )}
    </div>
  );
}
