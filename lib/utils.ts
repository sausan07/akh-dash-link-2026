import type { DeadlineStatus } from "@/types/links";
import type { LucideIcon } from "lucide-react";
import {
  CalendarDays,
  CalendarRange,
  Star,
  ShieldCheck,
  Clock,
  CheckCircle2,
  PenLine,
  BookOpen,
  Camera,
  Pin,
} from "lucide-react";

export function getDeadlineStatus(tenggat: string): DeadlineStatus {
  if (!tenggat || tenggat.trim() === "") return "none";

  const deadline = new Date(tenggat);
  if (isNaN(deadline.getTime())) return "none";

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  deadline.setHours(0, 0, 0, 0);

  const diff = deadline.getTime() - today.getTime();
  const days = diff / (1000 * 60 * 60 * 24);

  if (days === 0) return "today";
  if (days > 0) return "upcoming";
  return "overdue";
}

export function formatDate(dateStr: string): string {
  if (!dateStr || dateStr.trim() === "") return "-";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function getTodayFormatted(): string {
  return new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function getCurrentYear(): number {
  return new Date().getFullYear();
}

interface CategoryMeta {
  icon: LucideIcon;
  color: string;   // icon color class
  bg: string;      // background class
}

const CATEGORY_META: Record<string, CategoryMeta> = {
  Harian:                    { icon: CalendarDays,  color: "text-blue-600",   bg: "bg-blue-50" },
  Bulanan:                   { icon: CalendarRange,  color: "text-indigo-600", bg: "bg-indigo-50" },
  Opsional:                  { icon: Star,           color: "text-amber-500",  bg: "bg-amber-50" },
  Perizinan:                 { icon: ShieldCheck,    color: "text-green-600",  bg: "bg-green-50" },
  "Periode Tertentu":        { icon: Clock,          color: "text-orange-500", bg: "bg-orange-50" },
  Pascakegiatan:             { icon: CheckCircle2,   color: "text-teal-600",   bg: "bg-teal-50" },
  "Medium & Bahasa Inggris":  { icon: PenLine,        color: "text-violet-600", bg: "bg-violet-50" },
  "Tugas Mingguan":          { icon: BookOpen,       color: "text-[#243B68]",  bg: "bg-[#243B68]/8" },
  Dokumentasi:               { icon: Camera,         color: "text-rose-500",   bg: "bg-rose-50" },
};

const DEFAULT_META: CategoryMeta = { icon: Pin, color: "text-gray-500", bg: "bg-gray-100" };

export function getCategoryMeta(category: string): CategoryMeta {
  return CATEGORY_META[category] ?? DEFAULT_META;
}

export function getCategoryDescription(category: string): string {
  const map: Record<string, string> = {
    Harian: "Tugas dan kegiatan rutin setiap hari",
    Bulanan: "Laporan dan tugas bulanan",
    Opsional: "Tugas pilihan tambahan",
    Perizinan: "Formulir perizinan dan administrasi",
    "Periode Tertentu": "Tugas untuk periode waktu khusus",
    Pascakegiatan: "Laporan dan dokumentasi setelah kegiatan",
    "Medium & Bahasa Inggris": "Pengumpulan medium dan tugas bahasa Inggris",
    "Tugas Mingguan": "Tugas rutin setiap minggu",
    Dokumentasi: "Galeri dokumentasi kegiatan",
  };
  return map[category] ?? "Kumpulan tautan untuk kategori ini";
}

export function getJenisColor(jenis: string): string {
  const map: Record<string, string> = {
    "Google Form": "bg-blue-50 text-blue-700 border-blue-200",
    "Google Drive": "bg-yellow-50 text-yellow-700 border-yellow-200",
    "Google Spreadsheet": "bg-green-50 text-green-700 border-green-200",
    SeaTable: "bg-purple-50 text-purple-700 border-purple-200",
    Website: "bg-gray-50 text-gray-700 border-gray-200",
  };
  return map[jenis] ?? "bg-slate-50 text-slate-700 border-slate-200";
}
