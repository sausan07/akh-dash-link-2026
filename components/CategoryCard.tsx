import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getCategoryMeta, getCategoryDescription } from "@/lib/utils";

interface CategoryCardProps {
  name: string;
  count: number;
  href: string;
}

export default function CategoryCard({ name, count, href }: CategoryCardProps) {
  const { icon: Icon, color, bg } = getCategoryMeta(name);
  const description = getCategoryDescription(name);

  return (
    <article className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-[#243B68]/20 transition-all duration-200 p-5 flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <div className={`${bg} rounded-xl p-2.5 shrink-0`} aria-hidden="true">
          <Icon className={`w-5 h-5 ${color}`} />
        </div>
        <div>
          <h3 className="font-semibold text-gray-800 text-sm leading-snug">
            {name}
          </h3>
          <p className="text-gray-400 text-xs mt-0.5">
            {count} tautan aktif
          </p>
        </div>
      </div>
      <p className="text-gray-500 text-xs leading-relaxed flex-1">{description}</p>
      <Link
        href={href}
        className="inline-flex items-center gap-1.5 text-[#243B68] text-xs font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-[#243B68]/40 rounded transition"
        aria-label={`Lihat tautan kategori ${name}`}
      >
        Lihat Tautan
        <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
      </Link>
    </article>
  );
}
