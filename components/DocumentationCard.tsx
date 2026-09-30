import type { DocumentationItem } from "@/types/links";
import { ExternalLink, Camera } from "lucide-react";

interface DocumentationCardProps {
  item: DocumentationItem;
}

export default function DocumentationCard({ item }: DocumentationCardProps) {
  return (
    <article className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-[#243B68]/20 transition-all duration-200 flex flex-col">
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-[#243B68]/8 rounded-xl p-2.5 shrink-0" aria-hidden="true">
            <Camera className="w-5 h-5 text-[#243B68]" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 text-sm leading-snug">
              {item.namaKegiatan}
            </h3>
            {item.tahun && (
              <p className="text-gray-400 text-xs mt-0.5">{item.tahun}</p>
            )}
          </div>
        </div>
        {item.deskripsi && (
          <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">
            {item.deskripsi}
          </p>
        )}
      </div>
      <div className="px-5 pb-4">
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 w-full justify-center px-4 py-2 bg-[#243B68] text-white text-sm font-medium rounded-xl hover:bg-[#1a2d52] focus:outline-none focus:ring-2 focus:ring-[#243B68]/40 transition"
          aria-label={`Lihat dokumentasi ${item.namaKegiatan} di tab baru`}
        >
          <ExternalLink className="w-4 h-4" aria-hidden="true" />
          Lihat Dokumentasi
        </a>
      </div>
    </article>
  );
}
