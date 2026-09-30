import { Search } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
}

export default function EmptyState({
  title = "Tidak ada data ditemukan",
  description = "Belum ada tautan yang sesuai dengan kriteria pencarian.",
  icon,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="bg-gray-100 rounded-full p-5 mb-4" aria-hidden="true">
        {icon ?? <Search className="w-8 h-8 text-gray-400" />}
      </div>
      <h3 className="text-gray-700 font-semibold text-base mb-1">{title}</h3>
      <p className="text-gray-400 text-sm max-w-xs">{description}</p>
    </div>
  );
}
