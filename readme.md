# School Repository Hub

Portal frontend untuk repositori perangkat lunak dan berkas sekolah dengan akses berbasis role. Proyek ini dibangun dengan React, TypeScript, Vite, dan CSS yang sudah diatur untuk tampilan portal sekolah. Semua fitur saat ini masih menggunakan data demo lokal dan tidak terhubung ke backend atau TrueNAS yang sebenarnya.

## Fitur yang sudah dibuat

- Dashboard dengan ringkasan dan navigasi cepat
- Katalog software dengan pencarian dan filter kategori
- Penjelajah berkas dengan breadcrumbs dan tampilan list/grid
- Login page dengan proteksi route
- Role-based access control dengan dua role: Teknisi dan Guest
- Manajemen user untuk role Teknisi (tambah, edit, hapus, status, role)
- Mode tamu yang dibatasi hanya untuk akses baca-saja
- Data pengguna dan sesi disimpan di localStorage untuk prototype frontend

## Role yang tersedia

- Teknisi
  - dapat login
  - dapat mengakses dashboard operasional
  - dapat mengelola user
- Guest
  - dapat login
  - hanya dapat melihat katalog software dan file publik
  - tidak dapat mengelola user atau fitur administratif

## Demo akun

```text
Teknisi:
  email: teknisi@school.local
  password: teknisi123

Guest:
  email: guest@school.local
  password: guest123
```

## Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Lucide React
- React Router

## Menjalankan project

Install dependency:

```bash
npm install
```

Jalankan development server:

```bash
npm run dev
```

Build production bundle:

```bash
npm run build
```

Preview build hasil produksi:

```bash
npm run preview
```

## Struktur utama

```text
src/
  App.tsx
  main.tsx
  index.css
  data/
    repository.ts
    users.ts
```

## Scope penting

Proyek ini adalah frontend prototype. Otentikasi, peran, dan data user saat ini bersifat lokal dan demo. Integrasi backend, sistem login yang aman, serta koneksi ke TrueNAS atau storage nyata harus ditangani di milestone berikutnya dengan backend yang sesuai.

## Dokumen pendukung

- `prd.md` untuk kebutuhan proyek dan deskripsi fitur
- `design.md` untuk sistem visual dan layout
- `skill.md` untuk panduan implementasi
- `roadmap-frontend.md` untuk roadmap fase frontend

## Status saat ini

Frontend prototype untuk School Repository Hub sudah selesai sesuai scope saat ini: dashboard, software catalog, file browser, login, role-based access, dan manajemen user untuk Teknisi. Semua fitur masih menggunakan data mock dan dirancang agar mudah diganti saat backend atau layanan autentikasi yang nyata sudah siap.
