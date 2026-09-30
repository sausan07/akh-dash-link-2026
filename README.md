# Akhwat Student Hub

> Portal terpusat informasi & administrasi mahasiswi — tautan tugas, formulir, kegiatan, dan dokumentasi dalam satu tempat.

---

## Daftar Isi

1. [Project Overview](#1-project-overview)
2. [Requirements](#2-requirements)
3. [Installation](#3-installation)
4. [Environment Variables](#4-environment-variables)
5. [Google Sheets Setup](#5-google-sheets-setup)
6. [Google Apps Script Setup](#6-google-apps-script-setup)
7. [Menjalankan Project](#7-menjalankan-project)
8. [Deployment ke Vercel](#8-deployment-ke-vercel)
9. [Cara Mengelola Data](#9-cara-mengelola-data)

---

## 1. Project Overview

**Akhwat Student Hub** adalah website portal yang menampilkan seluruh tautan tugas, administrasi, dan dokumentasi mahasiswi secara terpusat. Data bersumber dari Google Sheets dan diakses melalui Google Apps Script REST API — tanpa perlu mengubah kode website ketika ada perubahan data.

**Teknologi:**
- Next.js 15 (App Router) + TypeScript
- Tailwind CSS
- Lucide React (ikon)
- Google Sheets (database)
- Google Apps Script (REST API read-only)
- Vercel (deployment)

---

## 2. Requirements

- Node.js 18 atau lebih baru
- npm 9 atau lebih baru
- Akun Google (untuk Google Sheets + Apps Script)
- Akun Vercel (untuk deployment)

---

## 3. Installation

```bash
# Clone atau download project
cd akhwat-student-hub

# Install dependencies
npm install
```

---

## 4. Environment Variables

Buat file `.env.local` di root project:

```bash
cp .env.example .env.local
```

Isi dengan URL Web App Google Apps Script Anda:

```env
NEXT_PUBLIC_SHEETS_API_URL=https://script.google.com/macros/s/XXXXX/exec
```

> ⚠️ Jangan commit file `.env.local` ke repository.

---

## 5. Google Sheets Setup

### Buat Spreadsheet Baru

1. Buka [Google Sheets](https://sheets.google.com) dan buat spreadsheet baru.
2. Rename sheet pertama menjadi **`Links`**.
3. Buat header kolom di baris pertama:

| A | B | C | D | E | F | G | H | I |
|---|---|---|---|---|---|---|---|---|
| ID | Kategori | Nama Link | Deskripsi | URL | Jenis | Tenggat | Status | Urutan |

### Keterangan Kolom

| Kolom | Keterangan | Contoh |
|-------|-----------|--------|
| ID | Identifikasi unik | 1, 2, 3 |
| Kategori | Nama kategori | Harian, Bulanan, Perizinan |
| Nama Link | Nama tautan | Absensi Harian |
| Deskripsi | Penjelasan singkat | Form absensi setiap hari |
| URL | Alamat lengkap | https://forms.gle/xxx |
| Jenis | Tipe tautan | Google Form, Google Drive, Google Spreadsheet, SeaTable, Website |
| Tenggat | Format YYYY-MM-DD | 2025-12-31 |
| Status | Status tautan | **Aktif** / Arsip / Perlu Link |
| Urutan | Angka urutan | 1, 2, 3 (semakin kecil = tampil lebih awal) |

### Aturan Data

- **Status = `Aktif`** → tautan ditampilkan di website
- **Status = `Arsip`** → disembunyikan (tidak dihapus dari sheet)
- **Status = `Perlu Link`** → dicatat tapi belum ada URL, tidak ditampilkan
- **URL kosong** → tidak ditampilkan
- **URL tidak valid** (tidak dimulai `http://` atau `https://`) → tidak ditampilkan

### Kategori Dokumentasi

Untuk menambahkan dokumentasi kegiatan, buat baris dengan:
- **Kategori** = `Dokumentasi`
- **Nama Link** = nama kegiatan (contoh: FLOW FEST)
- **URL** = tautan Google Drive/Photos
- **Status** = `Aktif`

---

## 6. Google Apps Script Setup

### Langkah Setup

1. Buka [Google Apps Script](https://script.google.com) dan buat project baru.
2. Hapus kode default yang ada.
3. Salin seluruh isi file `google-apps-script/Code.gs` dari project ini.
4. Tempel ke editor Apps Script.
5. Ganti nilai `SPREADSHEET_ID` dengan ID spreadsheet Anda:

```javascript
var SPREADSHEET_ID = "ID_SPREADSHEET_ANDA";
```

> ID spreadsheet ada di URL spreadsheet:  
> `https://docs.google.com/spreadsheets/d/**ID_INI**/edit`

6. Simpan project (Ctrl+S).

### Deploy sebagai Web App

1. Klik menu **Deploy** → **New deployment**.
2. Klik ikon ⚙️ di samping "Select type" → pilih **Web App**.
3. Isi deskripsi (opsional).
4. Pada **Execute as**: pilih **Me**.
5. Pada **Who has access**: pilih **Anyone**.
6. Klik **Deploy**.
7. Izinkan akses yang diminta (klik "Allow").
8. Salin **Web App URL** yang diberikan.

### Format Web App URL

```
https://script.google.com/macros/s/XXXXXXXXXXXXXXX/exec
```

### Masukkan URL ke .env.local

```env
NEXT_PUBLIC_SHEETS_API_URL=https://script.google.com/macros/s/XXXXXXXXXXXXXXX/exec
```

> ⚠️ Setiap kali Anda mengubah kode Apps Script, Anda perlu deploy ulang (New Deployment) dan menggunakan URL baru, ATAU pilih Manage Deployments → Edit → pilih versi terbaru.

---

## 7. Menjalankan Project

### Development

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

### Build Production

```bash
npm run build
```

### Menjalankan Build Production Lokal

```bash
npm run start
```

---

## 8. Deployment ke Vercel

### Cara Deploy

1. Push project ke GitHub repository.
2. Buka [vercel.com](https://vercel.com) dan login.
3. Klik **New Project** dan import repository GitHub.
4. Di halaman konfigurasi, tambahkan environment variable:
   - **Key**: `NEXT_PUBLIC_SHEETS_API_URL`
   - **Value**: URL Web App Google Apps Script Anda
5. Klik **Deploy**.

### Update Environment Variable di Vercel

1. Buka project di Vercel dashboard.
2. Pergi ke **Settings** → **Environment Variables**.
3. Edit atau tambahkan `NEXT_PUBLIC_SHEETS_API_URL`.
4. Redeploy project.

---

## 9. Cara Mengelola Data

Semua perubahan data dilakukan **langsung di Google Sheets** — tidak perlu mengubah kode website.

### Menambahkan Link Baru

1. Buka Google Sheets → sheet **Links**.
2. Tambahkan baris baru di bawah data terakhir.
3. Isi semua kolom, pastikan **Status = `Aktif`** dan URL valid.
4. Website otomatis menampilkan tautan baru setelah refresh (maks 60 detik).

### Mengubah Link

1. Cari baris yang ingin diubah.
2. Edit kolom yang diperlukan (nama, URL, deskripsi, tenggat, dll).
3. Perubahan terlihat setelah website refresh.

### Mengarsipkan Link

1. Cari baris yang ingin diarsipkan.
2. Ubah kolom **Status** dari `Aktif` menjadi `Arsip`.
3. Tautan tidak akan ditampilkan lagi, tetapi data tetap tersimpan di sheet.

### Menambahkan Kategori Baru

1. Tambahkan tautan baru dengan nama kategori yang diinginkan di kolom **Kategori**.
2. Kategori baru otomatis muncul di website — tidak perlu mengubah kode.
3. Gunakan nama kategori yang **konsisten** (perhatikan huruf kapital dan spasi).

### Menambahkan Dokumentasi Kegiatan

1. Tambahkan baris baru di sheet **Links**.
2. Isi **Kategori** = `Dokumentasi`.
3. Isi **Nama Link** = nama kegiatan.
4. Isi **URL** = tautan dokumentasi (Google Drive, Google Photos, dll).
5. Isi **Status** = `Aktif`.
6. Dokumentasi akan muncul di halaman Dokumentasi.

> 💡 Jika URL dokumentasi belum tersedia, isi Status = `Perlu Link`. Dokumentasi tidak akan ditampilkan ke mahasiswi sampai URL tersedia dan Status diubah ke `Aktif`.

---

## Struktur Project

```
akhwat-student-hub/
├── app/
│   ├── layout.tsx          # Root layout (Header + Footer)
│   ├── page.tsx            # Halaman beranda
│   ├── globals.css
│   ├── tugas/
│   │   ├── page.tsx        # Wrapper dengan Suspense
│   │   └── TugasPage.tsx   # Halaman tugas (client component)
│   ├── administrasi/
│   │   └── page.tsx        # Halaman administrasi
│   ├── dokumentasi/
│   │   └── page.tsx        # Halaman dokumentasi
│   └── pengelola/
│       └── page.tsx        # Panduan pengelola
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── SearchBar.tsx
│   ├── FilterBar.tsx
│   ├── SummaryCards.tsx
│   ├── CategoryCard.tsx
│   ├── LinkCard.tsx
│   ├── DocumentationCard.tsx
│   ├── RefreshBar.tsx
│   ├── LoadingSkeleton.tsx
│   ├── EmptyState.tsx
│   └── ErrorState.tsx
├── hooks/
│   └── useLinks.ts         # Custom hook untuk fetching & filtering data
├── lib/
│   ├── api.ts              # Fungsi fetch API
│   └── utils.ts            # Utility functions
├── types/
│   └── links.ts            # TypeScript types & interfaces
├── google-apps-script/
│   └── Code.gs             # Kode Google Apps Script
├── public/
├── .env.example
└── README.md
```

---

## Lisensi

Dikelola oleh Tim Kemahasiswaan.
