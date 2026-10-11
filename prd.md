# Dokumen Persyaratan Produk (PRD)

## Hub Repositori Sekolah (*School Repository Hub*)

**Status:** Draf v1.0

**Jenis produk:** Portal web berbasis *frontend*

**Tumpukan teknologi utama (*stack*):** React + Tailwind CSS

**Mode data awal:** Data *mock* / sampel

**Perubahan *backend*:** Di luar cakupan (*out of scope*) untuk fase awal

---

## 1. Ringkasan Produk

School Repository Hub adalah antarmuka web responsif untuk menemukan dan mengunduh perangkat lunak (*software*) serta mengelola akses ke berkas bersama yang dihosting pada server sekolah yang sudah ada. Rilis pertama berfokus pada pengalaman pengguna yang jelas dan purwarupa (*prototypes*) *frontend*. Sistem ini tidak boleh mengubah penyiapan penyimpanan/TrueNAS yang sedang berjalan.

Produk ini menggabungkan dua area utama:

1. **Pusat Perangkat Lunak (*Software Center*)** --- katalog perangkat lunak, APK, *driver*, utilitas, dan berkas ISO yang dapat dicari.
2. **Penyimpanan Cloud (*Cloud Storage*)** --- antarmuka penjelajah berkas (*file browser*) untuk menavigasi folder dan berkas.

Sebuah dasbor menyediakan pintasan dan ringkasan ringkas dari item yang baru ditambahkan.

---

## 2. Pernyataan Masalah

Server yang ada saat ini digunakan untuk menyimpan APK dan penginstal perangkat lunak (*software installers*) serta dapat diakses dari jarak jauh. Alur kerja berbasis folder terkadang kurang praktis ketika pengguna perlu mencari aplikasi tertentu, mengidentifikasi versi yang benar, atau menavigasi berkas bersama. Portal ini dirancang untuk mempermudah penemuan tanpa menggantikan layanan penyimpanan yang sudah ada.

---

## 3. Tujuan

* Menyediakan titik masuk yang rapi dan responsif untuk repositori perangkat lunak yang sudah ada.
* Membantu pengguna menemukan berkas melalui pencarian, kategori, dan metadata.
* Menyediakan antarmuka penelusuran folder/berkas yang familier.
* Membuat antarmuka dapat digunakan di perangkat *desktop*, tablet, dan seluler.
* Menjaga agar implementasi awal tetap independen dari perubahan *backend*.
* Menetapkan batasan integrasi yang jelas untuk koneksi di masa mendatang ke API penyimpanan atau tautan unduhan yang ada.

---

## 4. Bukan Tujuan untuk Rilis Awal (*Non-goals*)

* Membangun *backend*, basis data (*database*), atau sistem otentikasi baru.
* Mengganti TrueNAS atau mengubah konfigurasi penyimpanannya.
* Menerapkan pengunggahan, penghapusan, penggantian nama, pemindahan, atau perubahan izin berkas aktual tanpa API yang ada.
* Melakukan *proxying* unduhan berkas melalui aplikasi React.
* Menerapkan manajemen pengguna, *audit log*, pemindaian antivirus, atau administrasi penyimpanan.
* Mengklaim kapasitas penyimpanan langsung (*live storage capacity*) atau metadata berkas nyata ketika tidak ada API yang menyediakannya.

---

## 5. Pengguna Target

### Pengguna utama

* Teknisi sekolah yang memelihara dan mengatur perangkat lunak.
* Guru dan staf yang memerlukan perangkat lunak yang disetujui atau berkas bersama.
* Siswa, jika pihak sekolah secara eksplisit mengizinkan akses ke sumber daya pilihan.

### Kebutuhan pengguna

* Mencari perangkat lunak berdasarkan nama, kategori, sistem operasi, atau versi.
* Memeriksa detail berkas sebelum mengunduh.
* Menjelajahi folder bersama tanpa tersesat.
* Menggunakan portal secara nyaman dari ponsel atau komputer.
* Memahami apakah item yang ditampilkan adalah data nyata, data sampel, atau tidak tersedia.

---

## 6. Alur Pengguna Utama (*Core User Journeys*)

### Alur A: Menemukan dan mengunduh perangkat lunak

1. Pengguna membuka portal.
2. Pengguna menavigasi ke Pusat Perangkat Lunak (*Software Center*).
3. Pengguna melakukan pencarian atau memilih kategori.
4. Pengguna membuka tampilan detail atau kartu perangkat lunak.
5. Pengguna meninjau versi, platform, ukuran berkas, dan informasi sumber.
6. Pengguna memilih Unduh (*Download*).
7. Dalam mode purwarupa, antarmuka dengan jelas menunjukkan bahwa tautan unduhan adalah sampel atau *placeholder*.

### Alur B: Menjelajahi berkas bersama

1. Pengguna membuka Penyimpanan Cloud (*Cloud Storage*).
2. Pengguna menavigasi melalui folder menggunakan *breadcrumb*.
3. Pengguna beralih antara tampilan daftar (*list*) dan kisi (*grid*).
4. Pengguna menyaring atau mencari item *mock* yang tersedia.
5. Pengguna memilih berkas dan melihat metadata yang tersedia.
6. Pengguna menggunakan tautan yang tersedia hanya jika dikonfigurasi.

### Alur C: Menemukan sumber daya yang baru ditambahkan

1. Pengguna membuka Dasbor (*Dashboard*).
2. Pengguna meninjau perangkat lunak dan berkas yang baru ditambahkan.
3. Pengguna memilih item untuk membuka detail atau lokasi foldernya.

---

## 7. Persyaratan Fungsional

### Dasbor

* Menampilkan navigasi ke Pusat Perangkat Lunak dan Penyimpanan Cloud.
* Menampilkan perangkat lunak terbaru dan berkas terbaru menggunakan data sampel pada awalnya.
* Menyediakan titik masuk pencarian global.
* Menampilkan penggunaan penyimpanan hanya jika disediakan oleh API tepercaya; jika tidak, gunakan label *placeholder* yang jelas atau abaikan.

### Pusat Perangkat Lunak (*Software Center*)

* Menampilkan kartu perangkat lunak atau daftar (*list*).
* Pencarian berdasarkan nama dan deskripsi.
* Penyaringan berdasarkan kategori dan platform.
* Menampilkan nama, ikon, kategori, versi, platform, ukuran, tanggal pembaruan, dan catatan sumber/lisensi jika tersedia.
* Menyediakan tampilan detail atau modal.
* Menyediakan tindakan unduh yang menggunakan URL yang dikonfigurasi; URL sampel tidak boleh berpura-pura aktif.
* Mendukung hasil pencarian kosong serta status pemuatan (*loading*) dan kesalahan (*error*).

### Penyimpanan Cloud (*Cloud Storage*)

* Menampilkan entri folder dan berkas.
* Navigasi ke dalam folder dan kembali menggunakan *breadcrumb*.
* Beralih antara tata letak daftar dan kisi.
* Mencari/menyaring item *mock* yang tersedia saat ini.
* Menampilkan jenis berkas, ukuran, dan tanggal modifikasi jika diketahui.
* Membedakan folder dari berkas.
* Menjaga tindakan tulis (unggah, hapus, ganti nama, pindah) tetap disembunyikan atau dinonaktifkan hingga API dan model otorisasi yang didukung tersedia.
* Tidak menyiratkan bahwa operasi berkas *mock* mengubah server yang sebenarnya.

### Antarmuka Bersama (*Shared UI*)

* Navigasi/bilah sisi (*sidebar*) responsif.
* Tajuk (*header*) dengan fitur pencarian global.
* Status navigasi aktif yang jelas.
* Status pemuatan, kosong, galat, dan tidak tersedia.
* Fokus aksesibilitas dan navigasi keyboard.
* Ikonografi dan jarak (*spacing*) yang konsisten.

---

## 8. Persyaratan Non-Fungsional

* Responsif dari layar ponsel kecil hingga komputer *desktop*.
* HTML semantik dan label aksesibilitas.
* Menghindari dependensi besar yang tidak perlu.
* Menjaga komponen agar dapat digunakan kembali dan diberi tipe (*typed*) jika TypeScript dipilih.
* Menghindari eksposur kredensial, *token* privat, atau URL administratif dalam kode *frontend*.
* Tidak mengandalkan pengecekan sisi *frontend* saja untuk keamanan.
* Memastikan tautan unduhan menggunakan HTTPS jika didukung dan berasal dari sumber tepercaya.
* Tidak merender nama berkas atau deskripsi yang tidak tepercaya sebagai HTML mentah.
* Menjaga aplikasi tetap dapat digunakan ketika tidak ada *backend* aktif yang dikonfigurasi.

---

## 9. Arsitektur Informasi yang Disarankan

* `/` --- Dasbor
* `/software` --- Katalog perangkat lunak
* `/software/:id` --- Detail perangkat lunak, atau modal jika perutean (*routing*) tidak diperlukan
* `/files` --- Akar Penyimpanan Cloud (*Cloud Storage root*)
* `/files/:path` --- Tampilan folder, hanya jika pemetaan jalur aman diimplementasikan
* `/about` --- Informasi portal dan catatan penggunaan (opsional)

Hindari menempatkan jalur sistem berkas server mentah pada rute peramban (*browser routes*). Gunakan ID item yang stabil atau pengidentifikasi yang disandikan (*encoded*) yang disediakan oleh lapisan integrasi.

---

## 10. Model Data (Purwarupa Frontend)

### `SoftwareItem` (Item Perangkat Lunak)

* `id`: string
* `name`: string (nama)
* `description`: string (deskripsi)
* `category`: `Windows` | `Linux` | `Android` | `Drivers` | `Utilities` | `ISO` | `Other`
* `platform`: string
* `version`: string (versi)
* `sizeBytes`: number | null (ukuran dalam byte)
* `updatedAt`: ISO date string | null (tanggal pembaruan)
* `iconUrl`: string | null
* `downloadUrl`: string | null
* `sourceUrl`: string | null
* `licenseNote`: string | null (catatan lisensi)
* `checksum`: string | null
* `isSample`: boolean

### `FileEntry` (Entri Berkas)

* `id`: string
* `name`: string (nama)
* `kind`: `file` | `folder` (jenis)
* `mimeType`: string | null
* `sizeBytes`: number | null
* `modifiedAt`: ISO date string | null (tanggal modifikasi)
* `parentId`: string | null
* `downloadUrl`: string | null
* `isSample`: boolean

---

## 11. Kriteria Keberhasilan

Purwarupa awal dapat diterima apabila:

* Dasbor, Pusat Perangkat Lunak, dan Penyimpanan Cloud dapat dinavigasi.
* Pencarian dan filter kategori berfungsi dengan data sampel.
* Navigasi folder dan *breadcrumb* berfungsi dengan data sampel.
* Tombolalih daftar/kisi berfungsi.
* Tata letak dapat digunakan di perangkat seluler dan *desktop*.
* Data dan tindakan *placeholder* diidentifikasi dengan jelas.
* Tidak ada tindakan yang secara diam-diam mengklaim mengubah server asli.
* Lapisan integrasi masa depan dapat menggantikan data *mock* tanpa menulis ulang UI.

---

## 12. Risiko dan Dependensi

* Metode akses dan API server yang ada belum dikonfirmasi.
* Folder bersama TrueNAS tidak otomatis menjadi API peramban yang aman.
* Keamanan peramban, CORS, otentikasi, dan perilaku tautan unduhan bergantung pada layanan saat ini.
* Unduhan yang dapat diakses secara publik dapat menimbulkan masalah perizinan dan keamanan.
* Penggunaan penyimpanan dan data berkas terbaru tidak dapat akurat tanpa sumber yang tepercaya.

---

## 13. Keputusan yang Belum Diputuskan (*Open Decisions*)

* Mengonfirmasi versi TrueNAS dan mekanisme berbagi/unduh berkas saat ini.
* Mengonfirmasi apakah pengguna memerlukan akses baca saja (*read-only*) atau folder pribadi yang diautentikasi.
* Memutuskan apakah proyek menggunakan JavaScript atau TypeScript; TypeScript sangat disarankan.
* Memutuskan apakah perutean menggunakan React Router atau *router* ringan lainnya.
* Mengonfirmasi domain yang ada, penyiapan HTTPS, dan titik akhir integrasi (*integration endpoints*) sebelum menghubungkan data langsung.