import type { LinkItem } from "@/types/links";
import {
  getDeadlineStatus,
  formatDate,
  getJenisColor,
} from "@/lib/utils";
import { ExternalLink, Calendar, Tag, Layers } from "lucide-react";

interface LinkCardProps {
  link: LinkItem;
}

const deadlineBadge: Record<string, { label: string; className: string }> = {
  today: {
    label: "Hari ini",
    className: "bg-amber-50 text-amber-700 border-amber-200",
  },
  upcoming: {
    label: "Akan datang",
    className: "bg-blue-50 text-blue-700 border-blue-200",
  },
  overdue: {
    label: "Terlewat",
    className: "bg-red-50 text-red-700 border-red-200",
  },
  none: { label: "", className: "" },
};

export default function LinkCard({ link }: LinkCardProps) {
  const deadlineStatus = getDeadlineStatus(link.tenggat);
  const badge = deadlineBadge[deadlineStatus];
  const jenisClass = getJenisColor(link.jenis);

  return (
    <article className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-[#243B68]/20 transition-all duration-200 flex flex-col">
      <div className="p-5 flex flex-col flex-1">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="font-semibold text-gray-800 text-sm leading-snug flex-1 line-clamp-2">
            {link.namaLink}
          </h3>
          {link.jenis && (
            <span
              className={`shrink-0 text-xs px-2 py-0.5 rounded-full border font-medium ${jenisClass}`}
            >
              {link.jenis}
            </span>
          )}
        </div>

        {/* Description */}
        {link.deskripsi && (
          <p className="text-gray-500 text-xs leading-relaxed mb-3 line-clamp-2">
            {link.deskripsi}
          </p>
        )}

        {/* Meta */}
        <div className="flex flex-col gap-1.5 mt-auto">
          {link.kategori && (
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <Tag className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>{link.kategori}</span>
            </div>
          )}
          {link.tenggat && (
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <Calendar className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>Tenggat: {formatDate(link.tenggat)}</span>
              {deadlineStatus !== "none" && (
                <span
                  className={`ml-1 text-xs px-1.5 py-0.5 rounded-full border font-medium ${badge.className}`}
                >
                  {badge.label}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Action */}
      <div className="px-5 pb-4">
        <a
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 w-full justify-center px-4 py-2 bg-[#243B68] text-white text-sm font-medium rounded-xl hover:bg-[#1a2d52] focus:outline-none focus:ring-2 focus:ring-[#243B68]/40 transition"
          aria-label={`Buka ${link.namaLink} di tab baru`}
        >
          <ExternalLink className="w-4 h-4" aria-hidden="true" />
          Buka Link
        </a>
      </div>
    </article>
  );
}
