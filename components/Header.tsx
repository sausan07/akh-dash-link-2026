"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Menu, X, Calendar, Home, ClipboardList, FileText, Camera } from "lucide-react";
import { getTodayFormatted } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Beranda", icon: Home },
  { href: "/tugas", label: "Tugas", icon: FileText },
  { href: "/administrasi", label: "Administrasi", icon: ClipboardList },
  { href: "/dokumentasi", label: "Dokumentasi", icon: Camera },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="bg-[#243B68] text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center gap-4">

          {/* Logo & Title — kiri */}
          <Link
            href="/"
            className="flex items-center gap-3 group shrink-0"
            aria-label="Akhwat Student Hub - Beranda"
          >
            <div className="bg-white/15 rounded-xl p-2 group-hover:bg-white/25 transition-colors">
              <BookOpen className="w-6 h-6 text-white" aria-hidden="true" />
            </div>
            <div className="hidden sm:block">
              <p className="font-bold text-base leading-tight">Akhwat Student Hub</p>
              <p className="text-white/70 text-xs leading-tight">Portal Informasi &amp; Administrasi Mahasiswi</p>
            </div>
            <p className="sm:hidden font-bold text-sm leading-tight">Akhwat Student Hub</p>
          </Link>

          {/* Nav — tengah (desktop) */}
          <nav className="hidden md:flex flex-1 justify-center" aria-label="Navigasi utama">
            <ul className="flex items-center gap-1">
              {navLinks.map(({ href, label, icon: Icon }) => {
                const isActive = pathname === href;
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 ${
                        isActive
                          ? "bg-white/20 text-white font-medium"
                          : "text-white/75 hover:text-white hover:bg-white/15"
                      }`}
                      aria-current={isActive ? "page" : undefined}
                    >
                      <Icon className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Tanggal — kanan (desktop) */}
          <div className="hidden md:flex items-center gap-1.5 shrink-0 text-white/55 text-xs">
            <Calendar className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            <span>{getTodayFormatted()}</span>
          </div>

          {/* Hamburger — kanan (mobile) */}
          <div className="md:hidden flex items-center gap-2 ml-auto">
            <button
              className="p-2 rounded-lg hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/50 transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <nav
            id="mobile-menu"
            className="md:hidden pt-3 pb-1 border-t border-white/20 mt-3"
            aria-label="Navigasi mobile"
          >
            <div className="flex items-center gap-1.5 text-white/50 text-xs mb-3 px-1">
              <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{getTodayFormatted()}</span>
            </div>
            <ul className="flex flex-col gap-1">
              {navLinks.map(({ href, label, icon: Icon }) => {
                const isActive = pathname === href;
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 ${
                        isActive
                          ? "bg-white/20 text-white font-medium"
                          : "text-white/75 hover:text-white hover:bg-white/15"
                      }`}
                      onClick={() => setMenuOpen(false)}
                      aria-current={isActive ? "page" : undefined}
                    >
                      <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
