import { BookOpen, PlusCircle, Archive, FolderPlus, Camera, Table2, AlertTriangle } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Panduan Pengelola | Akhwat Student Hub",
  description: "Panduan untuk pengelola dalam mengelola data Akhwat Student Hub melalui Google Sheets.",
};

interface GuideCardProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}

function GuideCard({ icon, title, children }: GuideCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-[#243B68]/8 rounded-xl p-2.5 shrink-0">{icon}</div>
        <h2 className="font-bold text-gray-800 text-base">{title}</h2>
      </div>
      <div className="text-sm text-gray-600 space-y-3 leading-relaxed">{children}</div>
    </div>
  );
}

function Step({ number, children }: { number: number; children: React.ReactNode }) {
  return (
    <div className="flex gap-3">
      <span className="shrink-0 bg-[#243B68] text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mt-0.5">
        {number}
      </span>
      <p>{children}</p>
    </div>
  );
}

function CodeBlock({ children }: { children: string }) {
  return (
    <code className="block bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-xs font-mono text-gray-700 whitespace-pre-wrap">
      {children}
    </code>
  );
}

export default function PengelolaPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Page header */}
      <div className="flex items-center gap-3">
        <div className="bg-[#243B68] rounded-xl p-2.5">
          <BookOpen className="w-5 h-5 text-white" aria-hidden="true" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-800">Panduan Pengelola</h1>
          <p className="text-gray-500 text-sm">
            Cara mengelola data Akhwat Student Hub melalui Google Sheets
          </p>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" aria-hidden="true" />
        <div className="text-sm text-amber-800">
          <p className="font-semibold mb-1">Catatan Penting</p>
          <p>
            Halaman ini bersifat publik dan hanya berisi panduan penggunaan. Semua
            perubahan data dilakukan langsung melalui Google Sheets — bukan melalui
            website ini. Halaman ini tidak memiliki fitur login atau autentikasi.
          </p>
        </div>
      </div>

      {/* Column structure */}
      <GuideCard icon={<Table2 className="w-5 h-5 text-[#243B68]" />} title="Struktur Kolom Google Sheets (Sheet: Links)">
        <p>Sheet <strong>Links</strong> harus memiliki header kolom berikut pada baris pertama:</p>
        <CodeBlock>{`ID | Kategori | Nama Link | Deskripsi | URL | Jenis | Tenggat | Status | Urutan`}</CodeBlock>
        <p>Keterangan kolom:</p>
        <ul className="space-y-1.5 list-none">
          {[
            ["ID", "Identifikasi unik (contoh: 1, 2, 3)"],
            ["Kategori", "Nama kategori (contoh: Harian, Bulanan, Perizinan)"],
            ["Nama Link", "Nama deskriptif tautan"],
            ["Deskripsi", "Penjelasan singkat isi tautan"],
            ["URL", "Alamat lengkap mulai dengan http:// atau https://"],
            ["Jenis", "Tipe tautan: Google Form, Google Drive, Google Spreadsheet, SeaTable, Website, Excel Microsoft"],
            ["Tenggat", "Format tanggal: YYYY-MM-DD (contoh: 2025-12-31)"],
            ["Status", "Isi dengan: Aktif, Arsip, atau Perlu Link"],
            ["Urutan", "Angka urutan tampil (semakin kecil tampil lebih dahulu)"],
          ].map(([col, desc]) => (
            <li key={col} className="flex gap-2">
              <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs font-mono shrink-0 h-fit">{col}</code>
              <span>{desc}</span>
            </li>
          ))}
        </ul>
      </GuideCard>

      {/* Add link */}
      <GuideCard icon={<PlusCircle className="w-5 h-5 text-[#243B68]" />} title="Cara Menambahkan Tautan Baru">
        <Step number={1}>Buka Google Sheets dan pilih sheet <strong>Links</strong>.</Step>
        <Step number={2}>Tambahkan baris baru di bawah data terakhir.</Step>
        <Step number={3}>Isi semua kolom: ID (unik), Kategori, Nama Link, Deskripsi, URL, Jenis, Tenggat (opsional), Status = <strong>Aktif</strong>, dan Urutan.</Step>
        <Step number={4}>Pastikan URL dimulai dengan <code className="bg-gray-100 px-1 rounded text-xs">https://</code> atau <code className="bg-gray-100 px-1 rounded text-xs">http://</code>.</Step>
        <Step number={5}>Simpan spreadsheet. Website akan menampilkan tautan baru setelah di-refresh atau otomatis setiap 60 detik.</Step>
      </GuideCard>

      {/* Edit link */}
      <GuideCard icon={<PlusCircle className="w-5 h-5 text-teal-600]" />} title="Cara Mengubah Tautan">
        <Step number={1}>Buka Google Sheets dan cari baris tautan yang ingin diubah.</Step>
        <Step number={2}>Edit kolom yang diperlukan (nama, deskripsi, URL, atau tenggat).</Step>
        <Step number={3}>Simpan spreadsheet. Perubahan akan terlihat di website setelah refresh.</Step>
        <p className="text-amber-700 bg-amber-50 rounded-lg px-3 py-2 text-xs">
          ⚠️ Jangan mengubah kolom ID agar data tidak kacau.
        </p>
      </GuideCard>

      {/* Archive link */}
      <GuideCard icon={<Archive className="w-5 h-5 text-[#243B68]" />} title="Cara Mengarsipkan Tautan">
        <Step number={1}>Cari baris tautan yang ingin diarsipkan di Google Sheets.</Step>
        <Step number={2}>Ubah kolom <strong>Status</strong> dari <code className="bg-gray-100 px-1 rounded text-xs">Aktif</code> menjadi <code className="bg-gray-100 px-1 rounded text-xs">Arsip</code>.</Step>
        <Step number={3}>Simpan spreadsheet. Tautan tidak akan muncul lagi di website.</Step>
        <p className="text-blue-700 bg-blue-50 rounded-lg px-3 py-2 text-xs">
          💡 Gunakan status <code className="bg-blue-100 px-1 rounded">Perlu Link</code> jika tautan belum tersedia tetapi sudah ingin dicatat.
        </p>
      </GuideCard>

      {/* Add category */}
      <GuideCard icon={<FolderPlus className="w-5 h-5 text-[#243B68]" />} title="Cara Menambahkan Kategori Baru">
        <Step number={1}>Kategori berasal dari kolom <strong>Kategori</strong> di Google Sheets — tidak perlu mengubah kode website.</Step>
        <Step number={2}>Tambahkan tautan baru dengan nama kategori yang diinginkan di kolom Kategori.</Step>
        <Step number={3}>Kategori baru akan otomatis muncul di website setelah data dimuat ulang.</Step>
        <p className="text-amber-700 bg-amber-50 rounded-lg px-3 py-2 text-xs">
          ⚠️ Gunakan nama kategori yang konsisten (sama persis, perhatikan huruf kapital dan spasi).
        </p>
      </GuideCard>

      {/* Documentation */}
      <GuideCard icon={<Camera className="w-5 h-5 text-[#243B68]" />} title="Cara Menambahkan Dokumentasi Kegiatan">
        <Step number={1}>Dokumentasi ditampilkan dari tautan dengan <strong>Kategori = Dokumentasi</strong>.</Step>
        <Step number={2}>Tambahkan baris baru di sheet Links dengan Kategori diisi <code className="bg-gray-100 px-1 rounded text-xs">Dokumentasi</code>.</Step>
        <Step number={3}>Isi Nama Link dengan nama kegiatan (contoh: FLOW FEST, Makrab).</Step>
        <Step number={4}>Isi URL dengan tautan Google Drive, Google Photos, atau platform dokumentasi lainnya.</Step>
        <Step number={5}>Isi Status = <strong>Aktif</strong>.</Step>
        <p className="text-blue-700 bg-blue-50 rounded-lg px-3 py-2 text-xs">
          💡 Jika URL belum tersedia, isi Status = <code className="bg-blue-100 px-1 rounded">Perlu Link</code> — dokumentasi tidak akan ditampilkan ke mahasiswi.
        </p>
      </GuideCard>

      {/* Status values reference */}
      <GuideCard icon={<Table2 className="w-5 h-5 text-[#243B68]" />} title="Nilai Status yang Valid">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { value: "Aktif", color: "bg-green-50 border-green-200 text-green-800", desc: "Ditampilkan di website" },
            { value: "Arsip", color: "bg-gray-50 border-gray-200 text-gray-700", desc: "Disembunyikan dari website" },
            { value: "Perlu Link", color: "bg-amber-50 border-amber-200 text-amber-800", desc: "Belum ada URL, tidak ditampilkan" },
          ].map((s) => (
            <div key={s.value} className={`rounded-xl border p-3 ${s.color}`}>
              <code className="font-bold text-sm">{s.value}</code>
              <p className="text-xs mt-1">{s.desc}</p>
            </div>
          ))}
        </div>
      </GuideCard>
    </div>
  );
}
