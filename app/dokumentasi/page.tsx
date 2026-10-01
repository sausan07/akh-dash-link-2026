"use client";

import { useLinks } from "@/hooks/useLinks";
import DocumentationCard from "@/components/DocumentationCard";
import RefreshBar from "@/components/RefreshBar";
import ErrorState from "@/components/ErrorState";
import EmptyState from "@/components/EmptyState";
import type { DocumentationItem } from "@/types/links";
import { Camera } from "lucide-react";

export default function DokumentasiPage() {
  const { allLinks, isLoading, error, lastUpdated, refresh } = useLinks({
    autoRefreshInterval: 60000,
  });

  // Documentation items: hanya link dengan halaman === "Dokumentasi"
  const docLinks = allLinks.filter((l) => l.halaman === "Dokumentasi");

  const docItems: DocumentationItem[] = docLinks.map((l) => ({
    namaKegiatan: l.namaLink,
    url: l.url,
    deskripsi: l.deskripsi,
    tahun: l.tenggat ? new Date(l.tenggat).getFullYear().toString() : undefined,
  }));

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      {/* Page header */}
      <div className="flex items-center gap-3">
        <div className="bg-[#243B68] rounded-xl p-2.5">
          <Camera className="w-5 h-5 text-white" aria-hidden="true" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-800">Dokumentasi Kegiatan</h1>
          <p className="text-gray-500 text-sm">
            Galeri dokumentasi berbagai kegiatan mahasiswi
          </p>
        </div>
      </div>

      <RefreshBar lastUpdated={lastUpdated} isLoading={isLoading} onRefresh={refresh} />

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-pulse">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 h-40" />
          ))}
        </div>
      ) : error ? (
        <ErrorState message={error} onRetry={refresh} />
      ) : docItems.length === 0 ? (
        <EmptyState
          title="Belum ada dokumentasi"
          description="Dokumentasi kegiatan belum tersedia. Pengelola akan menambahkan tautan dokumentasi setelah kegiatan berlangsung."
          icon={<Camera className="w-8 h-8 text-gray-400" />}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {docItems.map((item) => (
            <DocumentationCard key={item.namaKegiatan} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
