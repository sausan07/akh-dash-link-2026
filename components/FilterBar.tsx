"use client";

import { SlidersHorizontal } from "lucide-react";

interface FilterBarProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (cat: string) => void;
  sortBy: "urutan" | "tenggat";
  onSortChange: (sort: "urutan" | "tenggat") => void;
}

export default function FilterBar({
  categories,
  activeCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
}: FilterBarProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
      {/* Category filter */}
      <div className="flex items-center gap-2 flex-1 flex-wrap">
        <SlidersHorizontal className="w-4 h-4 text-gray-500 shrink-0" aria-hidden="true" />
        <span className="text-sm text-gray-500 shrink-0">Filter:</span>
        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter kategori">
          <button
            onClick={() => onCategoryChange("")}
            className={`px-3 py-1 rounded-full text-xs font-medium border transition focus:outline-none focus:ring-2 focus:ring-[#243B68]/40 ${
              activeCategory === ""
                ? "bg-[#243B68] text-white border-[#243B68]"
                : "bg-white text-gray-600 border-gray-200 hover:border-[#243B68]/40 hover:text-[#243B68]"
            }`}
            aria-pressed={activeCategory === ""}
          >
            Semua
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`px-3 py-1 rounded-full text-xs font-medium border transition focus:outline-none focus:ring-2 focus:ring-[#243B68]/40 ${
                activeCategory === cat
                  ? "bg-[#243B68] text-white border-[#243B68]"
                  : "bg-white text-gray-600 border-gray-200 hover:border-[#243B68]/40 hover:text-[#243B68]"
              }`}
              aria-pressed={activeCategory === cat}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Sort */}
      <div className="flex items-center gap-2 shrink-0">
        <label htmlFor="sort-select" className="text-sm text-gray-500">
          Urutkan:
        </label>
        <select
          id="sort-select"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as "urutan" | "tenggat")}
          className="text-sm border border-gray-200 rounded-lg px-2 py-1.5 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#243B68]/40 focus:border-[#243B68] transition"
        >
          <option value="urutan">Urutan</option>
          <option value="tenggat">Tenggat</option>
        </select>
      </div>
    </div>
  );
}
