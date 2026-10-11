# Spesifikasi Desain

## Hub Repositori Sekolah (*School Repository Hub*)

**Arah visual:** Modern, bersih, bernuansa biru (*blue-accented*), teknis namun mudah diakses (*approachable*)

**Frontend:** React + Tailwind CSS

**Tujuan utama:** Membuat penemuan perangkat lunak dan penjelajahan berkas terasa seperti satu produk yang koheren.

---

## 1. Prinsip Desain

1. **Kejelasan sebelum dekorasi.** Nama berkas, versi perangkat lunak, dan tindakan harus mudah dipindai (*scannable*).
2. **Pola yang familier.** Gunakan pencarian yang mudah dikenali, *breadcrumb* folder, tampilan daftar/kisi (*list/grid*), serta tindakan unduh.
3. **Responsif secara default.** Tampilan *desktop* menggunakan bilah sisi (*sidebar*) permanen; perangkat seluler mendapatkan laci navigasi (*navigation drawer*) atau menu yang ramah di bagian bawah.
4. **Status yang jujur.** Data sampel, tindakan yang tidak tersedia, dan layanan yang terputus harus diberi label secara jelas.
5. **Utamakan baca-saja (*read-only first*).** Rilis pertama menelusuri dan menautkan ke sumber daya yang sudah ada; tidak berpura-pura melakukan mutasi di sisi server.

---

## 2. Identitas Visual

### Palet warna

Gunakan kelas utilitas Tailwind atau token tema berdasarkan nilai-nilai berikut:

* Biru primer: `#2563EB`
* Biru tua (*Dark navy*): `#0F172A`
* Teks utama: `#111827`
* Teks sekunder: `#64748B`
* Latar belakang halaman: `#F8FAFC`
* Permukaan (*Surface*): `#FFFFFF`
* Batas (*Border*): `#E2E8F0`
* Sukses: `#16A34A`
* Peringatan: `#D97706`
* Bahaya: `#DC2626`

Pertahankan warna biru untuk tindakan utama dan navigasi aktif. Jangan gunakan warna sendirian untuk mengkomunikasikan status; padukan dengan teks atau ikon.

### Tipografi

* Direkomendasikan: Inter, *system UI*, atau sans-serif lain yang mudah dibaca.
* Judul halaman: 24–30 px pada *desktop*, 22–26 px pada seluler.
* Judul bagian: 16–20 px.
* Teks isi (*Body*): 14–16 px.
* Metadata: 12–13 px, dengan kontras yang memadai.

### Bentuk dan elevasi

* Kartu (*Cards*): radius 12–16 px.
* Input dan tombol: radius 8–10 px.
* Gunakan batas halus sebagai default; cadangkan bayangan (*shadows*) untuk menu mengambang atau dialog.
* Hindari gradien yang berlebihan, efek kaca (*glass effects*), dan grafik dekoratif berukuran besar.

---

## 3. Tata Letak (*Layout*)

### Desktop

* Bilah sisi kiri (*Left sidebar*): sekitar 240–260 px.
* Tajuk (*Header*): sekitar 64–72 px.
* Konten utama: lebar maksimum (*max-width*) sekitar 1440 px, dengan padding 24–32 px.
* Dasbor menggunakan kartu responsif dan bagian item terbaru.

### Tablet

* Bilah sisi dapat diciutkan ke mode ikon.
* Kartu menggunakan dua kolom di mana ruang memungkinkan.
* Pencarian tetap menonjol.

### Seluler

* Bilah sisi menjadi laci (*drawer*) atau navigasi yang dapat diciutkan.
* Konten utama menggunakan padding horizontal 16 px.
* Kartu perangkat lunak ditumpuk secara vertikal atau menggunakan tata letak dua kolom yang kompak hanya jika terbaca.
* Daftar berkas beralih ke baris atau kartu yang ringkas.
* Hindari pengguliran horizontal (*horizontal scrolling*) kecuali untuk tabel yang memang dirancang dapat digulir.

---

## 4. Navigasi

Navigasi utama:

* Dasbor (*Dashboard*)
* Pusat Perangkat Lunak (*Software Center*)
* Penyimpanan Cloud (*Cloud Storage*)
* Tentang (*About* - opsional)

Elemen tajuk (*Header*):

* Judul halaman atau *breadcrumb*
* Kolom pencarian global atau pemicu pencarian
* Area pengguna/avatar opsional hanya jika autentikasi nyata ada

Jangan menampilkan pengguna yang masuk secara palsu atau menu akun palsu di dalam purwarupa.

---

## 5. Dasbor

Bagian yang direkomendasikan:

1. Area sambutan/judul dengan penjelasan singkat.
2. Dua kartu tujuan utama: Pusat Perangkat Lunak dan Penyimpanan Cloud.
3. Input pencarian.
4. Perangkat lunak yang baru ditambahkan.
5. Berkas yang baru ditambahkan.
6. Status penyimpanan hanya jika disediakan oleh API nyata; jika tidak, abaikan atau beri label sebagai data demo.

Jaga agar dasbor tetap bermanfaat alih-alih mengubahnya menjadi dinding statistik.

---

## 6. Pusat Perangkat Lunak (*Software Center*)

### Struktur halaman

* Judul dan deskripsi singkat.
* Kolom pencarian.
* Chip kategori atau pilihan menu (*select*).
* Filter platform.
* Kontrol pengurutan: Baru diperbarui (*Recently updated*), Nama A–Z.
* Jumlah hasil.
* Kartu perangkat lunak yang responsif.

### Kartu perangkat lunak

Menampilkan:

* Ikon aplikasi atau ikon cadangan kategori
* Nama perangkat lunak
* Deskripsi satu atau dua baris
* Tag kategori/platform
* Versi
* Ukuran berkas, jika diketahui
* Tanggal pembaruan, jika diketahui
* Tombol Unduh utama ketika URL nyata tersedia
* Status Demo/Tidak Tersedia yang diberi label jelas jika tidak ada

Jangan menampilkan peringkat palsu, jumlah unduhan, atau lencana keamanan kecuali didukung oleh data.

---

## 7. Detail Perangkat Lunak

Modal atau halaman detail dapat mencakup:

* Nama dan deskripsi
* Platform dan versi
* Ukuran berkas dan tanggal terakhir diperbarui
* Situs web sumber dan catatan lisensi
* *Checksum* SHA-256 dengan tindakan salin, jika disediakan
* Tindakan unduh
* Pemberitahuan bahwa pengguna harus memverifikasi penerbit (*publisher*) dan lisensi

---

## 8. Penyimpanan Cloud (*Cloud Storage*)

### Bilah alat (*Toolbar*)

* *Breadcrumb*
* Pencarian di dalam folder saat ini
* Tombolalih daftar/kisi (*list/grid toggle*)
* Urutkan berdasarkan nama, tanggal modifikasi, atau ukuran saat data tersedia

### Baris berkas/folder

* Ikon jenis (*type icon*)
* Nama
* Tanggal modifikasi
* Ukuran (hanya untuk berkas)
* Menu tindakan opsional

Baris folder harus dibedakan dengan jelas dan terbuka saat dipilih. Tautan unduh berkas harus muncul hanya bila dikonfigurasi.

### Status kosong (*Empty states*)

* Folder kosong: jelaskan bahwa tidak ada item yang tersedia.
* Tidak ada kecocokan pencarian: tawarkan untuk menghapus pencarian.
* Tidak terhubung: jelaskan bahwa layanan penyimpanan langsung belum dikonfigurasi.
* Galat (*Error*): berikan pesan coba lagi yang berguna tanpa mengekspos detail server internal.

---

## 9. Aturan Interaksi

* Pencarian memperbarui hasil secara instan untuk data sampel lokal.
* Filter dapat digabungkan dan harus memiliki opsi setel ulang (*reset*) yang jelas.
* *Breadcrumb* bernavigasi ke folder induk.
* Tombolalih daftar/kisi mempertahankan folder dan pencarian saat ini.
* Unduh membuka URL yang dikonfigurasi; jika tidak ada, tampilkan pesan tidak tersedia/demo.
* Unggah/hapus/ganti nama/pindah tidak boleh muncul sebagai tindakan fungsional hingga didukung oleh API yang diotorisasi.
* Gunakan *toast* atau umpan balik sebaris (*inline feedback*) untuk tindakan salin ke *clipboard* dan demo.
* Semua kontrol memerlukan status *hover*, *fokus*, dinonaktifkan (*disabled*), dan aktif.

---

## 10. Aksesibilitas

* Gunakan markah semantik: `header`, `nav`, `main`, `aside` jika sesuai.
* Tombol harus memiliki label deskriptif.
* Input memerlukan label yang terlihat atau nama yang dapat diakses.
* Fokus keyboard harus terlihat.
* Dialog harus mengelola fokus dan mendukung tombol Escape jika sesuai.
* Memenuhi target kontras WCAG AA jika memungkinkan.
* Jangan mengomunikasikan status dengan warna saja.

---

## 11. Penerimaan Responsif (*Responsive Acceptance*)

* Tidak ada luapan konten (*overflow*) pada lebar viewport 360 px.
* Tindakan utama tetap dapat dijangkau pada seluler.
* Navigasi bilah sisi dapat digunakan dengan keyboard dan sentuhan.
* Teks kartu tidak bertabrakan dengan tombol tindakan.
* Metadata berkas dapat membungkus atau disembunyikan dalam mode seluler yang ringkas tanpa menyembunyikan nama berkas.

---

## 12. Deliverable Desain

* Kerangka aplikasi bersama (*Shared application shell*)
* Halaman dasbor
* Halaman Pusat Perangkat Lunak
* Modal/halaman detail perangkat lunak
* Halaman Penyimpanan Cloud
* Status pemuatan, kosong, galat, dan terputus
* Navigasi seluler yang responsif
* Tombol, kartu, lencana, input pencarian, *breadcrumb*, dan baris berkas yang dapat digunakan kembali