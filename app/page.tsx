"use client";

import { useState } from "react";
import Hero from "@/components/Hero";
import SummaryCards from "@/components/SummaryCards";
import CategoryCard from "@/components/CategoryCard";
import LinkCard from "@/components/LinkCard";
import RefreshBar from "@/components/RefreshBar";
import ErrorState from "@/components/ErrorState";
import EmptyState from "@/components/EmptyState";
import { LoadingSkeletonGrid } from "@/components/LoadingSkeleton";
import { useLinks } from "@/hooks/useLinks";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");

  const { links, allLinks, categories, isLoading, error, lastUpdated, refresh } = useLinks({
    query: searchQuery,
    autoRefreshInterval: 60000,
  });

  // Build category counts from allLinks
  const categoryCounts: Record<string, number> = {};
  for (const link of allLinks) {
    categoryCounts[link.kategori] = (categoryCounts[link.kategori] ?? 0) + 1;
  }

  const isSearching = searchQuery.trim().length > 0;

  return (
    <>
      <Hero searchQuery={searchQuery} onSearchChange={setSearchQuery} />

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

        {/* Search results or Categories */}
        {isSearching ? (
          <section aria-labelledby="search-results-heading">
            <h2 id="search-results-heading" className="text-lg font-bold text-gray-800 mb-4">
              Hasil Pencarian ({links.length})
            </h2>
            {isLoading ? (
              <LoadingSkeletonGrid />
            ) : error ? (
              <ErrorState message={error} onRetry={refresh} />
            ) : links.length === 0 ? (
              <EmptyState
                title="Tidak ada hasil"
                description={`Tidak ada tautan yang cocok dengan "${searchQuery}". Coba kata kunci lain.`}
              />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {links.map((link) => (
                  <LinkCard key={link.id} link={link} />
                ))}
              </div>
            )}
          </section>
        ) : (
          <>
            {/* Categories */}
            <section aria-labelledby="categories-heading">
              <h2 id="categories-heading" className="text-lg font-bold text-gray-800 mb-4">
                Kategori Tautan
              </h2>
              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-pulse">
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="bg-white rounded-2xl border border-gray-100 h-32" />
                  ))}
                </div>
              ) : error ? (
                <ErrorState message={error} onRetry={refresh} />
              ) : categories.length === 0 ? (
                <EmptyState
                  title="Belum ada kategori"
                  description="Belum ada data yang tersedia dari Google Sheets."
                />
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categories.map((cat) => (
                    <CategoryCard
                      key={cat}
                      name={cat}
                      count={categoryCounts[cat] ?? 0}
                      href={`/tugas?kategori=${encodeURIComponent(cat)}`}
                    />
                  ))}
                </div>
              )}
            </section>

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
