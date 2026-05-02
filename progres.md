# K4 - Progress Tracking

## 📋 Task List

### Task 1: Hapus Capacitor Setup ❌ → ✅ SELESAI
- [x] Uninstall Capacitor packages (@capacitor/core, @capacitor/cli, @capacitor/android)
- [x] Hapus capacitor.config.json
- [x] Hapus folder android/
- [x] Hapus .github/workflows/build-apk.yml
- [x] Bersihkan package.json dari script Capacitor

### Task 2: Update Landing Page — Tombol & QR Code ✅ SELESAI
- [x] Ganti tombol "Download App" → "📱 Download APK" (link ke GitHub Releases APK)
- [x] Ganti tombol "Buka Web App" → "🌐 Buka Web App" (link ke k4-app-omega.vercel.app)
- [x] Tambah dual QR Code di hero: QR APK + QR Web App terpisah
- [x] Update download section: 2 card terpisah (APK + Web App)
- [x] QR Code APK → link ke GitHub Releases APK
- [x] QR Code Web App → link ke k4-app-omega.vercel.app
- [x] Tambah petunjuk install APK (4 langkah)
- [x] Tambah toast notification saat download APK
- [x] Update navbar: "Download APK" + "Web App" terpisah
- [x] Update footer: tambah kolom "Download" dengan link APK + Web App

### Task 3: Buat Halaman download.html ✅ SELESAI
- [x] Halaman download khusus dengan 2 opsi (APK + Web App)
- [x] QR Code kecil untuk masing-masing opsi
- [x] Petunjuk install APK (6 langkah)
- [x] Link kembali ke halaman utama

### Task 4: Deploy ke Vercel ✅ SELESAI
- [x] Landing page: https://k4-land.vercel.app (deployed)
- [x] Web App: https://k4-app-omega.vercel.app (deployed, dummy data removed)

### Task 5: Setup GitHub Repo untuk APK Releases ⏳ BLOCKED
- [ ] Buat repo MHFADev/k4-apk-release
- [ ] Upload APK ke Release v1.0.0
- [ ] Dapatkan direct link APK
- **BLOCKED**: GitHub API unreachable dari network ini (timeout)
- **SOLUSI**: User perlu manual build APK via Website2APK, upload ke GitHub Releases
- Link APK yang sudah dikonfigurasi: `https://github.com/MHFADev/k4-apk-release/releases/download/v1.0.0/K4-Kelola-Kas-Kelas-v1.0.0.apk`

### Task 6: Hapus Dummy Data dari App ✅ SELESAI (session sebelumnya)
- [x] Hapus sample members & transactions dari onboarding
- [x] App mulai dengan data kosong (members=[], transactions=[])

---

## 📝 Log Perubahan

| Tanggal | Task | Status | Keterangan |
|---------|------|--------|------------|
| 2 Mei 2026 | Hapus Capacitor setup | ✅ Selesai | Uninstall packages, hapus config, android dir |
| 2 Mei 2026 | Update landing page tombol & QR | ✅ Selesai | Dual QR, tombol APK+Web terpisah, toast JS |
| 2 Mei 2026 | Buat download.html | ✅ Selesai | Halaman download khusus dengan install guide |
| 2 Mei 2026 | Deploy Vercel | ✅ Selesai | Landing page + Web App deployed |
| 2 Mei 2026 | Setup GitHub APK releases | ⏳ Blocked | GitHub API timeout, perlu manual |
| 2 Mei 2026 | Hapus dummy data | ✅ Selesai | App mulai kosong, no sample data |

---

## ⚠️ YANG MASIH PERLU DILAKUKAN MANUAL

1. **Build APK via Website2APK**:
   - Buka https://website2apk.com/
   - Input URL: https://k4-app-omega.vercel.app/
   - App Name: K4, Package: com.k4.kaskelas
   - Download APK hasil build

2. **Upload APK ke GitHub Releases**:
   - Buat repo: https://github.com/new → `k4-apk-release` (Public)
   - Buat Release v1.0.0
   - Upload file APK
   - Direct link akan otomatis jadi: `https://github.com/MHFADev/k4-apk-release/releases/download/v1.0.0/K4-Kelola-Kas-Kelas-v1.0.0.apk`

3. **Test**:
   - Buka https://k4-land.vercel.app dari HP Android
   - Klik "Download APK" → harus download file .apk
   - Install & test app
