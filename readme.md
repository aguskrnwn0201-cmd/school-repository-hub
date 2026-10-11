# School Repository Hub

Portal berbasis frontend untuk repositori perangkat lunak (software) yang dihosting oleh sekolah dan penyimpanan berkas bersama. Dibangun dengan React + Tailwind CSS. Milestone awal menggunakan data mock (sampel) dan tidak mengubah penyiapan TrueNAS yang sudah ada.

## Features Planned

-   Dashboard with shortcuts and recent resources
-   Software Center with search, categories, filters, and software
    details
-   Cloud Storage browser with folder navigation, breadcrumbs, and
    list/grid views
-   Responsive interface for phones, tablets, and desktops
-   Service layer designed so mock data can later be replaced by a
    verified API

## Important Scope Note

Proyek ini adalah antarmuka frontend, bukan server penyimpanan. Otentikasi aktual, izin (permissions), pencarian daftar berkas, unggahan, dan operasi berkas harus disediakan oleh layanan pendukung yang ada atau backend yang disetujui secara terpisah. Purwarupa tidak boleh mengklaim bahwa tindakan sampel memodifikasi berkas nyata.

## Recommended Stack

-   React
-   TypeScript
-   Vite
-   Tailwind CSS
-   Lucide React
-   React Router, if route-based navigation is needed

Gunakan instruksi penyiapan resmi untuk versi yang dipilih, terutama Tailwind CSS, karena instalasi dan konfigurasinya bervariasi antar versi utama.

## Local Development

After the project has been initialized:

``` bash
npm install
npm run dev
```

Build and preview the production bundle:

``` bash
npm run build
npm run preview
```

These commands assume the standard Vite scripts are present in
`package.json`.

## Suggested Structure

``` text
src/
  app/
  components/
  pages/
  data/
  types/
  services/
  hooks/
  lib/
  main.tsx
  index.css
```

See: - `prd.md` for goals, requirements, data models, and acceptance
criteria. - `design.md` for visual system, layout, interactions, and
accessibility. - `skill.md` for implementation conventions and
integration boundaries. - `roadmap-frontend.md` for phased development
and exit criteria.

## Data and Integration

Start with sample data in `src/data/`. Keep data access behind service
functions in `src/services/`, so the UI does not depend directly on mock
arrays.

Before connecting live storage, confirm: 1. The current TrueNAS version
and storage access method. 2. Whether a supported API or safe HTTP
download URLs already exist. 3. Authentication and authorization
requirements. 4. CORS and HTTPS behavior. 5. Which directories are
approved for access through the portal.

A browser cannot directly browse an SMB/NFS share as if it were an HTTP
API. Do not place privileged credentials in frontend code or expose the
TrueNAS admin interface to general users.

## Software Distribution

Only publish installers, APKs, drivers, and ISO files that the school is
authorized to distribute. Prefer official vendor sources and show
version, platform, file size, source, and checksum when those values are
available.

## Status

Fondasi frontend kini tersedia: dashboard, katalog software dengan pencarian/filter kategori, dan penjelajah berkas mock dengan navigasi folder serta tampilan daftar/kisi. Semua konten masih data contoh dan read-only; integrasi server langsung tetap menjadi milestone terpisah.
