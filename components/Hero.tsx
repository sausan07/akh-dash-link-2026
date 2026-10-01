"use client";

import SearchBar from "./SearchBar";
import LinkCard from "./LinkCard";
import Link from "next/link";
import type { LinkItem } from "@/types/links";
import { FileText, ClipboardList, Camera, TableProperties, Monitor, GraduationCap } from "lucide-react";
import { LoadingSkeletonGrid } from "./LoadingSkeleton";

interface HeroProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  searchResults?: LinkItem[];
  isSearchLoading?: boolean;
}

export default function Hero({
  searchQuery,
  onSearchChange,
  searchResults,
  isSearchLoading,
}: HeroProps) {
  const isSearching = searchQuery.trim().length > 0;

  return (
    <section className="bg-[#243B68] text-white py-14 md:py-20">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 leading-tight">
          Hai, semuanya! 👋
        </h1>
        <p className="text-white/75 text-base sm:text-lg mb-8 max-w-xl mx-auto leading-relaxed">
          Semua link penting, dalam satu tempat.
        </p>
        <div className="max-w-xl mx-auto">
          <SearchBar
            value={searchQuery}
            onChange={onSearchChange}
            placeholder="Cari tugas, formulir, atau dokumentasi..."
            className="text-gray-800"
          />
          {isSearching && (
            <p className="text-white/60 text-xs mt-2 text-left">
              Mencari: &ldquo;<span className="text-white">{searchQuery}</span>&rdquo;
            </p>
          )}
        </div>

        {/* Inline search results — tampil langsung di bawah search bar */}
        {isSearching && (
          <div className="mt-6 max-w-6xl mx-auto text-left">
            {isSearchLoading ? (
              <LoadingSkeletonGrid />
            ) : searchResults && searchResults.length === 0 ? (
              <p className="text-white/70 text-sm text-center py-4">
                Tidak ada hasil untuk &ldquo;
                <span className="text-white font-medium">{searchQuery}</span>&rdquo;. Coba kata kunci lain.
              </p>
            ) : (
              <>
                <p className="text-white/60 text-xs mb-3">
                  {searchResults?.length ?? 0} hasil ditemukan
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {searchResults?.map((link) => (
                    <LinkCard key={link.id} link={link} />
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* Nav links — hanya tampil saat tidak search */}
        {!isSearching && (
          <div className="flex flex-wrap justify-center gap-3 mt-6 text-sm">
            <Link
              href="/tugas"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/15 text-white hover:bg-white/25 focus:outline-none focus:ring-2 focus:ring-white/50 transition"
            >
              <FileText className="w-4 h-4" aria-hidden="true" />
              Tugas
            </Link>
            <Link
              href="/administrasi"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/15 text-white hover:bg-white/25 focus:outline-none focus:ring-2 focus:ring-white/50 transition"
            >
              <ClipboardList className="w-4 h-4" aria-hidden="true" />
              Administrasi
            </Link>
            <Link
              href="/dokumentasi"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/15 text-white hover:bg-white/25 focus:outline-none focus:ring-2 focus:ring-white/50 transition"
            >
              <Camera className="w-4 h-4" aria-hidden="true" />
              Dokumentasi
            </Link>
            <a
              href="https://docs.google.com/spreadsheets/d/1ClEJb1LzGlFlwBVGP6mSrR0igNh2qdpiczxOCGrQwTQ/edit?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/15 text-white hover:bg-white/25 focus:outline-none focus:ring-2 focus:ring-white/50 transition"
            >
              <TableProperties className="w-4 h-4" aria-hidden="true" />
              Kalender Akademik
            </a>
            <a
              href="https://lms.politeknikidn.id/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/15 text-white hover:bg-white/25 focus:outline-none focus:ring-2 focus:ring-white/50 transition"
            >
              <Monitor className="w-4 h-4" aria-hidden="true" />
              LMS
            </a>
            <a
              href="https://mhs.idn.siakad.tech/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/15 text-white hover:bg-white/25 focus:outline-none focus:ring-2 focus:ring-white/50 transition"
            >
              <GraduationCap className="w-4 h-4" aria-hidden="true" />
              SIAKAD
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
