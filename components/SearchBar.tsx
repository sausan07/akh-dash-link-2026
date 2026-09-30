"use client";

import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function SearchBar({
  value,
  onChange,
  placeholder = "Cari tugas, formulir, atau dokumentasi...",
  className = "",
}: SearchBarProps) {
  return (
    <div className={`relative ${className}`}>
      <label htmlFor="search-bar" className="sr-only">
        Cari
      </label>
      <Search
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none"
        aria-hidden="true"
      />
      <input
        id="search-bar"
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 bg-white shadow-sm text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#243B68]/40 focus:border-[#243B68] transition"
        aria-label="Cari tautan"
        autoComplete="off"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#243B68]/40 rounded transition"
          aria-label="Hapus pencarian"
        >
          ✕
        </button>
      )}
    </div>
  );
}
