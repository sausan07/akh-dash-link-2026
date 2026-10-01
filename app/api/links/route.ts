import { NextResponse } from "next/server";

const SHEETS_API_URL = process.env.SHEETS_API_URL;

export async function GET() {
  // Cek env var
  if (!SHEETS_API_URL) {
    return NextResponse.json(
      {
        success: false,
        error:
          "Environment variable SHEETS_API_URL belum diset di server. Tambahkan di Vercel: Settings → Environment Variables → SHEETS_API_URL",
      },
      { status: 500 }
    );
  }

  let res: Response;

  try {
    res = await fetch(SHEETS_API_URL, {
      cache: "no-store",
      // Apps Script sering redirect — ikuti redirect otomatis
      redirect: "follow",
      headers: {
        // Beberapa deployment Apps Script butuh ini agar tidak redirect ke login
        Accept: "application/json, text/plain, */*",
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { success: false, error: `Tidak dapat terhubung ke Apps Script: ${message}` },
      { status: 502 }
    );
  }

  const contentType = res.headers.get("content-type") ?? "";

  // Jika bukan JSON → kemungkinan redirect ke halaman login Google
  if (!contentType.includes("application/json")) {
    const body = await res.text();
    const isLoginPage =
      body.includes("accounts.google.com") || body.includes("SignIn");

    return NextResponse.json(
      {
        success: false,
        error: isLoginPage
          ? "Apps Script meminta login. Pastikan: (1) Deploy sebagai Web App, (2) 'Who has access' diset ke 'Anyone', (3) Sudah klik Deploy ulang setelah mengubah setting."
          : `Server mengembalikan konten bukan JSON (${contentType}). Status: ${res.status}`,
      },
      { status: 502 }
    );
  }

  if (!res.ok) {
    return NextResponse.json(
      {
        success: false,
        error: `Apps Script merespons dengan status ${res.status}.`,
      },
      { status: 502 }
    );
  }

  try {
    const data = await res.json();
    return NextResponse.json(data, {
      headers: { "Cache-Control": "no-store, max-age=0" },
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Gagal mem-parse respons JSON dari Apps Script." },
      { status: 502 }
    );
  }
}
