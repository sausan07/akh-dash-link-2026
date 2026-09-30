import { Link as LinkIcon, FolderOpen, BookMarked } from "lucide-react";
import type { LinkItem } from "@/types/links";
import { LoadingSkeletonStat } from "./LoadingSkeleton";

interface SummaryCardsProps {
  links: LinkItem[];
  categories: string[];
  isLoading: boolean;
}

export default function SummaryCards({
  links,
  categories,
  isLoading,
}: SummaryCardsProps) {
  const totalActive = links.length;
  const totalCategories = categories.length;
  const totalTugas = links.filter((l) =>
    ["Harian", "Bulanan", "Tugas Mingguan", "Opsional", "Periode Tertentu", "Pascakegiatan"].includes(l.kategori)
  ).length;

  const stats = [
    {
      value: totalActive,
      label: "Tautan Aktif",
      icon: <LinkIcon className="w-5 h-5 text-[#243B68]" aria-hidden="true" />,
      bg: "bg-[#243B68]/8",
    },
    {
      value: totalCategories,
      label: "Kategori",
      icon: <FolderOpen className="w-5 h-5 text-violet-600" aria-hidden="true" />,
      bg: "bg-violet-50",
    },
    {
      value: totalTugas,
      label: "Tautan Tugas",
      icon: <BookMarked className="w-5 h-5 text-teal-600" aria-hidden="true" />,
      bg: "bg-teal-50",
    },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[0, 1, 2].map((i) => (
          <LoadingSkeletonStat key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {stats.map((s) => (
        <div
          key={s.label}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4"
        >
          <div className={`${s.bg} rounded-xl p-3 shrink-0`}>{s.icon}</div>
          <div>
            <p className="text-2xl font-bold text-gray-800 leading-tight">
              {s.value}
            </p>
            <p className="text-gray-500 text-xs mt-0.5">{s.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
