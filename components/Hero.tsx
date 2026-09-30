"use client";

import SearchBar from "./SearchBar";
import Link from "next/link";
import { FileText, ClipboardList, Camera, TableProperties } from "lucide-react";

interface HeroProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
}

export default function Hero({ searchQuery, onSearchChange }: HeroProps) {
  return (
    <section className="bg-[#243B68] text-white py-14 md:py-20">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 leading-tight">
          Assalamu&apos;alaikum, Mahasiswi! 👋
        </h1>
        <p className="text-white/75 text-base sm:text-lg mb-8 max-w-xl mx-auto leading-relaxed">
          Semua kebutuhan tugas, administrasi, dan dokumentasi dalam satu tempat.
        </p>
        <div className="max-w-xl mx-auto">
          <SearchBar
            value={searchQuery}
            onChange={onSearchChange}
            placeholder="Cari tugas, formulir, atau dokumentasi..."
            className="text-gray-800"
          />
          {searchQuery && (
            <p className="text-white/60 text-xs mt-2 text-left">
              Mencari: &ldquo;<span className="text-white">{searchQuery}</span>&rdquo;
            </p>
          )}
        </div>
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
        </div>
      </div>
    </section>
  );
}
