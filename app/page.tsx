"use client";

import { useState } from "react";
import Hero from "@/components/Hero";
import SummaryCards from "@/components/SummaryCards";
import CategoryCard from "@/components/CategoryCard";
import LinkCard from "@/components/LinkCard";
import RefreshBar from "@/components/RefreshBar";
import ErrorState from "@/components/ErrorState";
import EmptyState from "@/components/EmptyState";
import { useLinks } from "@/hooks/useLinks";
import { BookOpen, ClipboardList } from "lucide-react";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");

  const { links, allLinks, categories, isLoading, error, lastUpdated, refresh } = useLinks({
    query: searchQuery,
    autoRefreshInterval: 60000,
  });

  // Build category counts per halaman dari allLinks
  const tugasCounts: Record<string, number> = {};
  const adminCounts: Record<string, number> = {};
  for (const link of allLinks) {
    if (link.halaman === "Tugas") {
      tugasCounts[link.kategori] = (tugasCounts[link.kategori] ?? 0) + 1;
    } else if (link.halaman === "Administrasi") {
      adminCounts[link.kategori] = (adminCounts[link.kategori] ?? 0) + 1;
    }
  }

  // Sub-kategori unik per halaman (urutan dipertahankan dari data)
  const tugasCats = [...new Set(
    allLinks.filter((l) => l.halaman === "Tugas").map((l) => l.kategori)
  )].filter(Boolean);
  const adminCats = [...new Set(
    allLinks.filter((l) => l.halaman === "Administrasi").map((l) => l.kategori)
  )].filter(Boolean);

  const isSearching = searchQuery.trim().length > 0;

  return (
    <>
      <Hero
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchResults={isSearching ? links : undefined}
        isSearchLoading={isSearching && isLoading}
      />

      <div className="max-w-6xl mx-auto px-4 py-10 space-y-12">
        {/* Summary Dashboard */}
        <section aria-labelledby="summary-heading">
          <h2 id="summary-heading" className="sr-only">
            Ringkasan Dashboard
          </h2>
          <SummaryCards links={allLinks} categories={categories} isLoading={isLoading} />
        </section>

        {/* Refresh bar */}
        <RefreshBar lastUpdated={lastUpdated} isLoading={isLoading} onRefresh={refresh} />

        {/* Categories & Latest links — only show when not searching */}
        {!isSearching && (
          <>
            {/* Error state */}
            {error && <ErrorState message={error} onRetry={refresh} />}

            {/* Loading skeleton */}
            {isLoading && (
              <div className="space-y-10">
                {[0, 1].map((section) => (
                  <div key={section}>
                    <div className="h-5 w-32 bg-gray-200 rounded animate-pulse mb-4" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-pulse">
                      {[0, 1, 2].map((i) => (
                        <div key={i} className="bg-white rounded-2xl border border-gray-100 h-32" />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Grouped categories */}
            {!isLoading && !error && (
              <>
                {/* Tugas */}
                {tugasCats.length > 0 && (
                  <section aria-labelledby="tugas-heading">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="bg-[#243B68] rounded-lg p-1.5">
                        <BookOpen className="w-4 h-4 text-white" aria-hidden="true" />
                      </div>
                      <h2 id="tugas-heading" className="text-lg font-bold text-gray-800">
                        Tugas
                      </h2>
                      <span className="text-xs text-gray-400 ml-1">
                        Harian · Mingguan · Bulanan
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {tugasCats.map((cat) => (
                        <CategoryCard
                          key={cat}
                          name={cat}
                          count={tugasCounts[cat] ?? 0}
                          href={`/tugas?kategori=${encodeURIComponent(cat)}`}
                        />
                      ))}
                    </div>
                  </section>
                )}

                {/* Administrasi */}
                {adminCats.length > 0 && (
                  <section aria-labelledby="admin-heading">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="bg-teal-600 rounded-lg p-1.5">
                        <ClipboardList className="w-4 h-4 text-white" aria-hidden="true" />
                      </div>
                      <h2 id="admin-heading" className="text-lg font-bold text-gray-800">
                        Administrasi
                      </h2>
                      <span className="text-xs text-gray-400 ml-1">
                        Perizinan · Survei · Laporan · Konten
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {adminCats.map((cat) => (
                        <CategoryCard
                          key={cat}
                          name={cat}
                          count={adminCounts[cat] ?? 0}
                          href={`/administrasi?kategori=${encodeURIComponent(cat)}`}
                        />
                      ))}
                    </div>
                  </section>
                )}

                {/* Fallback jika tidak ada kategori sama sekali */}
                {tugasCats.length === 0 && adminCats.length === 0 && (
                  <EmptyState
                    title="Belum ada kategori"
                    description="Belum ada data yang tersedia dari Google Sheets."
                  />
                )}
              </>
            )}

            {/* Latest links */}
            {!isLoading && !error && allLinks.length > 0 && (
              <section aria-labelledby="latest-heading">
                <h2 id="latest-heading" className="text-lg font-bold text-gray-800 mb-4">
                  Tautan Terbaru
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {allLinks.slice(0, 6).map((link) => (
                    <LinkCard key={link.id} link={link} />
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </>
  );
}
