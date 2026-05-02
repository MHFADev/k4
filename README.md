# K4 - Kelola Keuangan Kas Kelas

**"Kas Kelas, Kelola dengan Cerdas!"**

K4 adalah aplikasi manajemen keuangan kas kelas yang dirancang khusus untuk bendahara kelas. Aplikasi ini fun, elegan, dan mudah digunakan dengan fitur lengkap untuk mengelola pemasukan dan pengeluaran kas kelas.

![K4 Logo](assets/logo.svg)

## ✨ Fitur Utama

### 💰 Manajemen Keuangan
- **Dashboard Real-time** - Pantau saldo, pemasukan, dan pengeluaran secara instan
- **Grafik Visual** - Lihat trend keuangan dengan chart interaktif
- **Transaksi Cepat** - Tambah pemasukan/pengeluaran dengan cepat via FAB

### 👥 Manajemen Anggota
- **Daftar Anggota** - Kelola data lengkap anggota kelas
- **Tracking Pembayaran** - Pantau siapa yang sudah/belum bayar kas
- **Quick Pay** - Bayar kas dengan satu tap

### 📊 Laporan & Export
- **Export Excel** - Download laporan dalam format .xlsx
- **Export PDF** - Buat laporan PDF yang rapi
- **Export CSV** - Format untuk import ke spreadsheet
- **Filter Periode** - Lihat laporan per bulan/tahun/custom range

### 🎨 Personalisasi
- **Dark Mode** - Tema gelap untuk kenyamanan mata
- **Pilihan Warna** - 4 warna tema (Indigo, Emerald, Rose, Amber)
- **PIN Lock** - Keamanan dengan PIN 4-6 digit

### 📱 Fitur PWA
- **Offline Ready** - Bisa digunakan tanpa internet
- **Installable** - Tambahkan ke home screen seperti aplikasi native
- **Responsive** - Tampilan optimal di semua ukuran layar

## 🚀 Cara Menggunakan

### 1. Buka Aplikasi
Buka file `app/index.html` di browser atau akses landing page di `landing-page/index.html`

### 2. Setup Awal
- Masukkan nama bendahara
- Isi nama kelas dan sekolah
- Atur nominal kas bulanan
- Tambah anggota kelas

### 3. Catat Transaksi
- Tap tombol + di pojok kanan bawah
- Pilih Pemasukan atau Pengeluaran
- Isi jumlah dan keterangan
- Pilih kategori dan anggota (opsional)
- Simpan

### 4. Export Laporan
- Buka halaman Laporan
- Pilih periode yang diinginkan
- Tap Export ke Excel/PDF/CSV
- File akan terunduh otomatis

## 📁 Struktur Proyek

```
k4/
├── landing-page/          # Halaman publik (marketing)
│   └── index.html
├── app/                   # Aplikasi utama (PWA)
│   ├── index.html
│   ├── manifest.json
│   ├── sw.js             # Service Worker
│   └── js/
│       └── app.js        # Logic aplikasi
├── assets/               # Asset bersama
│   ├── logo.svg
│   └── icons/           # Icon PWA
└── docs/                # Dokumentasi
    ├── tutorial.html
    ├── faq.html
    └── privacy.html
```

## 💾 Penyimpanan Data

K4 menyimpan semua data di **LocalStorage** browser perangkatmu. Data tidak dikirim ke server mana pun, sehingga:
- ✅ Aman dan privat
- ✅ Bisa digunakan offline
- ⚠️ Data akan hilang jika browser di-clear

### Backup Data
Untuk keamanan, lakukan backup secara berkala:
1. Buka **Pengaturan**
2. Tap **Backup Data ke File**
3. Simpan file JSON yang diunduh
4. Untuk restore, belum tersedia via UI (coming soon)

## 🛠️ Teknologi

- **HTML5** - Struktur aplikasi
- **CSS3 + Tailwind CSS** - Styling modern
- **Vanilla JavaScript (ES6+)** - Logic aplikasi
- **Chart.js** - Visualisasi data
- **SheetJS (XLSX)** - Export Excel
- **jsPDF** - Export PDF
- **LocalStorage** - Penyimpanan data lokal

## 📱 Install sebagai Aplikasi

### Android (Chrome)
1. Buka K4 di Chrome
2. Tap menu (⋮)
3. Pilih **"Add to Home Screen"**
4. Selesai! K4 muncul di home screen

### iOS (Safari)
1. Buka K4 di Safari
2. Tap **Share** (icon kotak dengan panah)
3. Pilih **"Add to Home Screen"**
4. Tap **Add**

## 🎯 Roadmap

- [x] Manajemen transaksi
- [x] Manajemen anggota
- [x] Export Excel/PDF/CSV
- [x] Dark mode
- [x] PIN lock
- [ ] Backup/Restore via file
- [ ] Kalender keuangan
- [ ] Target/Anggaran
- [ ] Widget home screen
- [ ] Multi-bendahara

## 🤝 Kontribusi

K4 adalah proyek open-source. Kontribusi sangat diterima!

## 📄 Lisensi

MIT License - Gratis untuk digunakan dan dimodifikasi.

## 💬 Kontak

Ada pertanyaan atau saran?
- Email: support@k4.app
- Instagram: @k4.app

---

**Made with 💜 untuk para Bendahara Kelas Indonesia**
