export type LinkStatus = "Aktif" | "Arsip" | "Perlu Link";

export type LinkJenis =
  | "Google Form"
  | "Google Drive"
  | "Google Spreadsheet"
  | "SeaTable"
  | "Website"
  | "Excel Microsoft"
  | string;

export interface LinkItem {
  id: string;
  halaman: string;
  kategori: string;
  namaLink: string;
  deskripsi: string;
  url: string;
  jenis: LinkJenis;
  tenggat: string;
  status: LinkStatus;
  urutan: number;
}

export interface DocumentationItem {
  namaKegiatan: string;
  url: string;
  deskripsi?: string;
  tahun?: string;
}

export interface ApiResponse {
  success: true;
  timestamp: string;
  total: number;
  categories: string[];
  data: LinkItem[];
}

export interface ApiErrorResponse {
  success: false;
  error: string;
}

export type ApiResult = ApiResponse | ApiErrorResponse;

export interface CategorySummary {
  name: string;
  count: number;
  description: string;
}

export type DeadlineStatus = "today" | "upcoming" | "overdue" | "none";
