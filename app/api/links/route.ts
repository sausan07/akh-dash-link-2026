import { NextResponse } from "next/server";

const SHEETS_API_URL = process.env.SHEETS_API_URL;

export async function GET() {
  if (!SHEETS_API_URL) {
    return NextResponse.json(
      { success: false, error: "URL API belum dikonfigurasi di server." },
      { status: 500 }
    );
  }

  try {
    const res = await fetch(SHEETS_API_URL, {
      cache: "no-store",
      signal: AbortSignal.timeout(15000),
      redirect: "follow",
    });

    const contentType = res.headers.get("content-type") ?? "";

    // Apps Script mengembalikan halaman HTML login jika akses belum "Anyone"
    if (!contentType.includes("application/json")) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Apps Script belum dapat diakses publik. Pastikan deployment diset 'Who has access: Anyone' lalu deploy ulang.",
        },
        { status: 502 }
      );
    }

    if (!res.ok) {
      return NextResponse.json(
        {
          success: false,
          error: `Google Apps Script merespons dengan status ${res.status}.`,
        },
        { status: 502 }
      );
    }

    const data = await res.json();

    return NextResponse.json(data, {
      headers: { "Cache-Control": "no-store, max-age=0" },
    });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Terjadi kesalahan tidak diketahui.";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
