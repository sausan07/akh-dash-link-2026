import type { ApiResult, LinkItem } from "@/types/links";

function isValidUrl(url: string): boolean {
  if (!url || typeof url !== "string") return false;
  const trimmed = url.trim();
  return trimmed.startsWith("http://") || trimmed.startsWith("https://");
}

export async function fetchLinks(): Promise<ApiResult> {
  try {
    const res = await fetch("/api/links", {
      cache: "no-store",
      signal: AbortSignal.timeout(20000),
    });

    if (!res.ok) {
      return {
        success: false,
        error: `Server merespons dengan status ${res.status}. Silakan coba lagi.`,
      };
    }

    const json: ApiResult = await res.json();
    return json;
  } catch (err: unknown) {
    if (err instanceof DOMException && err.name === "AbortError") {
      return {
        success: false,
        error: "Koneksi ke server timeout. Silakan coba lagi.",
      };
    }
    const message =
      err instanceof Error ? err.message : "Terjadi kesalahan tidak diketahui.";
    return { success: false, error: message };
  }
}

export function filterActiveLinks(items: LinkItem[]): LinkItem[] {
  return items.filter(
    (item) =>
      item.status === "Aktif" &&
      item.namaLink &&
      item.namaLink.trim() !== "" &&
      isValidUrl(item.url)
  );
}

export function sortLinks(
  items: LinkItem[],
  sortBy: "urutan" | "tenggat"
): LinkItem[] {
  return [...items].sort((a, b) => {
    if (sortBy === "tenggat") {
      if (!a.tenggat && !b.tenggat) return a.urutan - b.urutan;
      if (!a.tenggat) return 1;
      if (!b.tenggat) return -1;
      return new Date(a.tenggat).getTime() - new Date(b.tenggat).getTime();
    }
    return a.urutan - b.urutan;
  });
}

export function searchLinks(items: LinkItem[], query: string): LinkItem[] {
  if (!query.trim()) return items;
  const q = query.toLowerCase();
  return items.filter(
    (item) =>
      item.namaLink.toLowerCase().includes(q) ||
      item.deskripsi.toLowerCase().includes(q) ||
      item.kategori.toLowerCase().includes(q)
  );
}
