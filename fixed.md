 ═══════════════════════════════════════════════════════════════════════════════
        CARA B: BUILD APK VIA WEBSITE2APK + FIX LANDING PAGE (CEPAT & MUDAH)
═══════════════════════════════════════════════════════════════════════════════

Kamu adalah Senior Mobile Developer. Saya punya 2 website yang sudah jalan:

🔵 WEB APP (PWA):  https://k4-app-omega.vercel.app/
🟢 LANDING PAGE:   https://k4-land.vercel.app/

═══════════════════════════════════════════════════════════════════════════════
                        MASALAH YANG HARUS DI-FIX
═══════════════════════════════════════════════════════════════════════════════

❌ Tombol "Download App" di landing page download HTML, bukan APK
❌ QR Code arah ke web app, bukan ke file APK  
❌ Gak ada file APK sama sekali
❌ User Android gak bisa install aplikasi asli

═══════════════════════════════════════════════════════════════════════════════
                    SOLUSI: WEBSITE2APK BUILDER + HOSTING APK
═══════════════════════════════════════════════════════════════════════════════

📌 STEP 1: BUILD APK MENGGUNAKAN WEBSITE2APK

1. Buka browser, kunjungi: https://website2apk.com/
   (atau https://www.gonative.io/ kalau website2apk gak bisa)

2. Isi form builder:
   ┌─────────────────────────────────────────────────────────┐
   │  Website URL:                                           │
   │  https://k4-app-omega.vercel.app/                       │
   │                                                         │
   │  App Name: K4                                           │
   │  Package Name: com.k4.kaskelas                          │
   │  Version: 1.0.0                                         │
   │  Version Code: 1                                        │
   │                                                         │
   │  App Icon: Upload logo K4 (buat SVG/PNG 512x512)        │
   │  Splash Screen: Upload splash image K4                  │
   │                                                         │
   │  Orientation: Portrait                                  │
   │  Full Screen: NO (biar ada status bar)                  │
   │  Enable Zoom: NO                                        │
   │  Show Scrollbars: YES                                   │
   │                                                         │
   │  Permissions:                                           │
   │  ☑️ Internet                                            │
   │  ☑️ Storage (untuk export file)                         │
   │  ☑️ Camera (untuk upload foto)                          │
   │                                                         │
   │  Advanced:                                              │
   │  ☑️ Enable JavaScript                                   │
   │  ☑️ Enable DOM Storage                                  │
   │  ☑️ Enable Geolocation (opsional)                       │
   │                                                         │
   │  [🔨 BUILD APK]                                         │
   └─────────────────────────────────────────────────────────┘

3. Tunggu proses build (1-5 menit)

4. Download file APK hasil build:
   └── k4-kaskelas-release.apk (atau nama serupa)

5. RENAME file jadi: K4-Kelola-Kas-Kelas-v1.0.0.apk

═══════════════════════════════════════════════════════════════════════════════
                    STEP 2: UPLOAD APK KE HOSTING (GITHUB RELEASES)
═══════════════════════════════════════════════════════════════════════════════

📌 CARA UPLOAD KE GITHUB RELEASES (GRATIS & STABIL):

1. Buat akun GitHub (kalau belum punya): https://github.com/signup

2. Buat repository baru:
   ├── Nama: k4-apk-release
   ├── Visibility: Public
   ├── README: NO
   └── [Create Repository]

3. Di repository, klik tab "Releases" (di sebelah kanan)

4. Klik "Create a new release"

5. Isi form release:
   ┌─────────────────────────────────────────────────────────┐
   │  Choose a tag: v1.0.0  (buat tag baru)                  │
   │  Target: main                                           │
   │                                                         │
   │  Release title: K4 v1.0.0 - Kelola Keuangan Kas Kelas   │
   │                                                         │
   │  Describe this release:                                 │
   │  Aplikasi manajemen keuangan kas kelas untuk Android.   │
   │  - Data tersimpan lokal                                 │
   │  - Export ke Excel                                      │
   │  - Manajemen anggota & kas bulanan                      │
   │                                                         │
   │  [☑️ This is a pre-release]  ← UNCHECK (ini release     │
   │                                  stabil)                │
   │                                                         │
   │  [📎 Attach binaries]                                   │
   │  Drag & drop file: K4-Kelola-Kas-Kelas-v1.0.0.apk       │
   │                                                         │
   │  [🚀 Publish release]                                   │
   └─────────────────────────────────────────────────────────┘

6. Setelah publish, klik file APK di release
   └── Copy DIRECT LINK-nya, contoh:
   https://github.com/[username]/k4-apk-release/releases/download/v1.0.0/K4-Kelola-Kas-Kelas-v1.0.0.apk

   ⚠️ PASTIKAN link ini langsung download file (buka di browser
      untuk test, harus langsung download .apk)

═══════════════════════════════════════════════════════════════════════════════
              STEP 3: UPDATE LANDING PAGE — FIX SEMUA TOMBOL & QR
═══════════════════════════════════════════════════════════════════════════════

📌 GANTI SEMUA FILE LANDING PAGE (k4-land.vercel.app)

Landing page HARUS di-update dengan struktur baru ini:

═══════════════════════════════════════
  A. HERO SECTION — 2 TOMBOL JELAS
═══════════════════════════════════════

Ganti bagian tombol di hero jadi:

┌─────────────────────────────────────────────────────────────────┐
│  [HERO SECTION]                                                 │
│                                                                 │
│  💰 K4 - Kelola Keuangan Kas Kelas                              │
│  "Kas Kelas, Kelola dengan Cerdas!"                             │
│                                                                 │
│  ┌─────────────────────────┐  ┌─────────────────────────┐      │
│  │  📱 DOWNLOAD APK        │  │  🌐 BUKA WEB APP        │      │
│  │                         │  │                         │      │
│  │  Install di Android     │  │  Buka di Browser        │      │
│  │  Bisa offline           │  │  Semua device           │      │
│  │  ~15 MB                 │  │  Perlu internet         │      │
│  │                         │  │                         │      │
│  │  [Android logo]         │  │  [Browser logo]         │      │
│  └─────────────────────────┘  └─────────────────────────┘      │
│                                                                 │
│  [atau]                                                         │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  📲 SCAN QR UNTUK DOWNLOAD APK                          │   │
│  │                                                         │   │
│  │  [QR CODE IMAGE — link ke APK]                          │   │
│  │                                                         │   │
│  │  Scan pakai kamera HP untuk langsung download           │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

═══════════════════════════════════════
  B. KODE HTML/CSS/JS LENGKAP
═══════════════════════════════════════

Replace SEMUA kode tombol download di landing page dengan ini:

┌─────────────────────────────────────────────────────────────────┐
│  <!-- HERO BUTTONS -->                                          │
│  <div class="hero-buttons">                                     │
│                                                                 │
│    <!-- TOMBOL DOWNLOAD APK (PRIMARY) -->                      │
│    <a href="[GITHUB_RELEASES_DIRECT_LINK_APK]"                 │
│       download="K4-Kelola-Kas-Kelas.apk"                        │
│       class="btn btn-primary btn-download-apk"                  │
│       id="btn-download-apk">                                    │
│      <span class="icon">📱</span>                               │
│      <div class="btn-text">                                     │
│        <strong>Download APK</strong>                            │
│        <small>Android 7.0+ • ~15 MB</small>                     │
│      </div>                                                     │
│    </a>                                                         │
│                                                                 │
│    <!-- TOMBOL BUKA WEB APP (SECONDARY) -->                    │
│    <a href="https://k4-app-omega.vercel.app/"                  │
│       target="_blank"                                           │
│       rel="noopener"                                            │
│       class="btn btn-secondary btn-web-app">                    │
│      <span class="icon">🌐</span>                               │
│      <div class="btn-text">                                     │
│        <strong>Buka Web App</strong>                            │
│        <small>Semua Device • Online</small>                     │
│      </div>                                                     │
│    </a>                                                         │
│                                                                 │
│  </div>                                                         │
│                                                                 │
│  <!-- QR CODE SECTION -->                                       │
│  <div class="qr-section">                                       │
│    <h3>📲 Atau Scan QR Code</h3>                                │
│    <div class="qr-grid">                                        │
│                                                                 │
│      <!-- QR APK -->                                            │
│      <div class="qr-card">                                      │
│        <img src="https://api.qrserver.com/v1/create-qr-code/    │
│                   ?size=200x200&data=[URL_ENCODED_APK_LINK]"   │
│             alt="QR Download APK"                               │
│             class="qr-img">                                     │
│        <p><strong>Download APK</strong></p>                     │
│        <small>Untuk Android</small>                             │
│      </div>                                                     │
│                                                                 │
│      <!-- QR WEB APP (opsional) -->                             │
│      <div class="qr-card">                                      │
│        <img src="https://api.qrserver.com/v1/create-qr-code/    │
│                   ?size=200x200&data=https%3A%2F%2Fk4-app-     │
│                   omega.vercel.app%2F"                          │
│             alt="QR Web App"                                    │
│             class="qr-img">                                     │
│        <p><strong>Buka Web App</strong></p>                     │
│        <small>Semua Device</small>                              │
│      </div>                                                     │
│                                                                 │
│    </div>                                                       │
│  </div>                                                         │
└─────────────────────────────────────────────────────────────────┘

═══════════════════════════════════════
  C. CSS STYLING UNTUK TOMBOL
═══════════════════════════════════════

Tambahkan CSS ini ke landing page:

┌─────────────────────────────────────────────────────────────────┐
│  .hero-buttons {                                                │
│    display: flex;                                               │
│    gap: 1rem;                                                   │
│    flex-wrap: wrap;                                             │
│    justify-content: center;                                     │
│    margin: 2rem 0;                                              │
│  }                                                              │
│                                                                 │
│  .btn {                                                         │
│    display: inline-flex;                                        │
│    align-items: center;                                         │
│    gap: 0.75rem;                                                │
│    padding: 1rem 2rem;                                          │
│    border-radius: 16px;                                         │
│    text-decoration: none;                                       │
│    font-family: inherit;                                        │
│    transition: all 0.3s ease;                                   │
│    cursor: pointer;                                             │
│    border: none;                                                │
│  }                                                              │
│                                                                 │
│  .btn-primary {                                                 │
│    background: linear-gradient(135deg, #6366F1, #8B5CF6);      │
│    color: white;                                                │
│    box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4);            │
│  }                                                              │
│                                                                 │
│  .btn-primary:hover {                                           │
│    transform: translateY(-2px);                                 │
│    box-shadow: 0 8px 25px rgba(99, 102, 241, 0.5);            │
│  }                                                              │
│                                                                 │
│  .btn-secondary {                                               │
│    background: white;                                           │
│    color: #1E293B;                                              │
│    border: 2px solid #E2E8F0;                                   │
│  }                                                              │
│                                                                 │
│  .btn-secondary:hover {                                         │
│    border-color: #6366F1;                                       │
│    color: #6366F1;                                              │
│  }                                                              │
│                                                                 │
│  .btn .icon {                                                   │
│    font-size: 1.5rem;                                           │
│  }                                                              │
│                                                                 │
│  .btn-text {                                                    │
│    display: flex;                                               │
│    flex-direction: column;                                      │
│    align-items: flex-start;                                     │
│  }                                                              │
│                                                                 │
│  .btn-text strong {                                             │
│    font-size: 1.1rem;                                           │
│  }                                                              │
│                                                                 │
│  .btn-text small {                                              │
│    font-size: 0.75rem;                                          │
│    opacity: 0.8;                                                │
│  }                                                              │
│                                                                 │
│  /* QR SECTION */                                               │
│  .qr-section {                                                  │
│    margin-top: 2rem;                                            │
│    text-align: center;                                          │
│  }                                                              │
│                                                                 │
│  .qr-grid {                                                     │
│    display: flex;                                               │
│    gap: 2rem;                                                   │
│    justify-content: center;                                     │
│    flex-wrap: wrap;                                             │
│    margin-top: 1rem;                                            │
│  }                                                              │
│                                                                 │
│  .qr-card {                                                     │
│    background: white;                                           │
│    padding: 1.5rem;                                             │
│    border-radius: 16px;                                         │
│    box-shadow: 0 4px 15px rgba(0,0,0,0.1);                      │
│    text-align: center;                                          │
│  }                                                              │
│                                                                 │
│  .qr-img {                                                      │
│    width: 150px;                                                │
│    height: 150px;                                               │
│    border-radius: 12px;                                         │
│  }                                                              │
└─────────────────────────────────────────────────────────────────┘

═══════════════════════════════════════
  D. JAVASCRIPT FORCE DOWNLOAD (BACKUP)
═══════════════════════════════════════

Kalau link APK gak langsung download, tambahkan JS ini:

┌─────────────────────────────────────────────────────────────────┐
│  <script>                                                       │
│    // Force download APK                                        │
│    document.getElementById('btn-download-apk').addEventListener(│
│      'click', function(e) {                                    │
│      e.preventDefault();                                       │
│      const apkUrl = '[GITHUB_RELEASES_DIRECT_LINK_APK]';       │
│      const apkName = 'K4-Kelola-Kas-Kelas-v1.0.0.apk';         │
│                                                                 │
│      // Method 1: Direct download                               │
│      const link = document.createElement('a');                 │
│      link.href = apkUrl;                                        │
│      link.download = apkName;                                   │
│      link.target = '_blank';                                    │
│      document.body.appendChild(link);                           │
│      link.click();                                              │
│      document.body.removeChild(link);                           │
│                                                                 │
│      // Show toast notification                                 │
│      showToast('📱 Download APK dimulai...');                  │
│    });                                                          │
│                                                                 │
│    function showToast(message) {                                │
│      const toast = document.createElement('div');              │
│      toast.style.cssText = `                                   │
│        position: fixed; bottom: 20px; left: 50%;               │
│        transform: translateX(-50%);                            │
│        background: #10B981; color: white;                      │
│        padding: 12px 24px; border-radius: 12px;                │
│        z-index: 9999; font-weight: 500;                        │
│        animation: slideUp 0.3s ease;                           │
│      `;                                                         │
│      toast.textContent = message;                               │
│      document.body.appendChild(toast);                          │
│      setTimeout(() => toast.remove(), 3000);                   │
│    }                                                            │
│  </script>                                                      │
└─────────────────────────────────────────────────────────────────┘

═══════════════════════════════════════════════════════════════════════════════
                    STEP 4: UPDATE NAVBAR & FOOTER LINKS
═══════════════════════════════════════════════════════════════════════════════

📌 DI NAVBAR:

Ganti menu "Download" jadi dropdown:

┌─────────────────────────────────────────────────────────────────┐
│  <nav>                                                          │
│    <div class="logo">K4</div>                                   │
│    <div class="nav-links">                                      │
│      <a href="#fitur">Fitur</a>                                 │
│      <a href="#cara-pakai">Cara Pakai</a>                       │
│                                                                  │
│      <!-- DROPDOWN DOWNLOAD -->                                 │
│      <div class="dropdown">                                     │
│        <button class="dropbtn">Download ▼</button>              │
│        <div class="dropdown-content">                           │
│          <a href="[APK_LINK]" download>📱 Download APK</a>     │
│          <a href="https://k4-app-omega.vercel.app/"             │
│             target="_blank">🌐 Buka Web App</a>                 │
│        </div>                                                   │
│      </div>                                                     │
│                                                                  │
│      <a href="#tentang">Tentang</a>                             │
│    </div>                                                       │
│  </nav>                                                         │
└─────────────────────────────────────────────────────────────────┘

📌 DI FOOTER:

┌─────────────────────────────────────────────────────────────────┐
│  <footer>                                                       │
│    <div class="footer-links">                                   │
│      <h4>Download</h4>                                          │
│      <a href="[APK_LINK]" download>📱 APK Android</a>          │
│      <a href="https://k4-app-omega.vercel.app/">🌐 Web App</a> │
│    </div>                                                       │
│  </footer>                                                      │
└─────────────────────────────────────────────────────────────────┘

═══════════════════════════════════════════════════════════════════════════════
                    STEP 5: HALAMAN DOWNLOAD KHUSUS (OPSIONAL)
═══════════════════════════════════════════════════════════════════════════════

Buat file baru: /download.html di landing page

┌─────────────────────────────────────────────────────────────────┐
│  <!-- download.html -->                                         │
│  <!DOCTYPE html>                                                │
│  <html>                                                         │
│  <head>                                                         │
│    <title>Download K4 - Kelola Keuangan Kas Kelas</title>      │
│    <meta name="viewport" content="width=device-width, initial-scale=1"> │
│  </head>                                                        │
│  <body>                                                         │
│    <div class="download-page">                                  │
│      <img src="logo-k4.svg" alt="K4 Logo" class="logo-big">    │
│      <h1>📱 Download K4</h1>                                    │
│      <p>Pilih versi yang sesuai dengan device-mu</p>            │
│                                                                  │
│      <div class="download-options">                             │
│                                                                  │
│        <!-- OPTION 1: APK -->                                   │
│        <div class="download-card">                              │
│          <div class="platform-icon">🤖</div>                    │
│          <h3>Android APK</h3>                                   │
│          <p>Install langsung di HP Android</p>                  │
│          <p class="version">v1.0.0 • ~15 MB</p>                │
│          <a href="[APK_LINK]"                                   │
│             download="K4-Kelola-Kas-Kelas.apk"                  │
│             class="btn-download">                               │
│            ⬇️ Download APK                                      │
│          </a>                                                   │
│          <div class="qr-small">                                 │
│            <img src="https://api.qrserver.com/v1/create-qr-code/│
│              ?size=120x120&data=[URL_ENCODED_APK_LINK]"         │
│                 alt="QR APK">                                   │
│            <small>Scan untuk download</small>                   │
│          </div>                                                 │
│        </div>                                                   │
│                                                                  │
│        <!-- OPTION 2: PWA -->                                   │
│        <div class="download-card">                              │
│          <div class="platform-icon">🌐</div>                    │
│          <h3>Web App (PWA)</h3>                                 │
│          <p>Buka di browser, bisa install ke home screen</p>    │
│          <p class="version">Semua Device • Online</p>           │
│          <a href="https://k4-app-omega.vercel.app/"             │
│             target="_blank"                                     │
│             class="btn-download btn-secondary">                 │
│            🚀 Buka Web App                                      │
│          </a>                                                   │
│          <div class="qr-small">                                 │
│            <img src="https://api.qrserver.com/v1/create-qr-code/│
│              ?size=120x120&data=https%3A%2F%2Fk4-app-omega.    │
│              vercel.app%2F"                                     │
│                 alt="QR Web">                                   │
│            <small>Scan untuk buka</small>                       │
│          </div>                                                 │
│        </div>                                                   │
│                                                                  │
│      </div>                                                     │
│                                                                  │
│      <!-- PETUNJUK INSTALL APK -->                              │
│      <div class="install-guide">                                │
│        <h3>📖 Cara Install APK</h3>                             │
│        <ol>                                                     │
│          <li>Download file APK di atas</li>                     │
│          <li>Buka file di folder Downloads HP</li>              │
│          <li>Klik file APK</li>                                 │
│          <li>Jika muncul "Install unknown apps", klik 
│              <strong>Allow</strong></li>                        │
│          <li>Klik <strong>Install</strong></li>                 │
│          <li>Selesai! K4 siap digunakan 🎉</li>                 │
│        </ol>                                                    │
│      </div>                                                     │
│                                                                  │
│    </div>                                                       │
│  </body>                                                        │
│  </html>                                                        │
└─────────────────────────────────────────────────────────────────┘

═══════════════════════════════════════════════════════════════════════════════
                    STEP 6: DEPLOY LANDING PAGE UPDATE
═══════════════════════════════════════════════════════════════════════════════

1. Update semua file di project landing page
2. Push ke GitHub / deploy ke Vercel
3. Test di HP Android:
   ├── Buka https://k4-land.vercel.app/
   ├── Klik "Download APK"
   ├── Harus langsung download file .apk
   ├── Install & test app
   └── Scan QR code, harus langsung download juga

═══════════════════════════════════════════════════════════════════════════════
                        CHECKLIST AKHIR
═══════════════════════════════════════════════════════════════════════════════

✅ APK sudah di-build via Website2APK
✅ APK sudah di-upload ke GitHub Releases
✅ Direct link APK sudah didapatkan
✅ Landing page tombol "Download APK" → link ke file APK
✅ Landing page tombol "Buka Web App" → link ke k4-app-omega.vercel.app
✅ QR Code APK → link ke file APK (bukan web app)
✅ QR Code Web App → link ke k4-app-omega.vercel.app (terpisah)
✅ Navbar punya dropdown Download (APK + Web)
✅ Footer punya link APK + Web App
✅ Download page khusus sudah dibuat
✅ Petunjuk install APK sudah ada
✅ Test download dari HP Android BERHASIL

═══════════════════════════════════════════════════════════════════════════════
                        CATATAN PENTING
═══════════════════════════════════════════════════════════════════════════════

⚠️ PENTING:

1. GITHUB RELEASES LINK FORMAT:
   https://github.com/USERNAME/k4-apk-release/releases/download/v1.0.0/K4-Kelola-Kas-Kelas-v1.0.0.apk

2. URL ENCODE untuk QR Code:
   Ganti semua karakter special:
   : → %3A
   / → %2F
   . → %2E
   - → %2D
   _ → %5F

   Contoh URL encoded:
   https%3A%2F%2Fgithub.com%2Fusername%2Fk4-apk-release%2Freleases%2Fdownload%2Fv1.0.0%2FK4-Kelola-Kas-Kelas-v1.0.0.apk

3. KALAU GITHUB RELEASES GAK BISA:
   Alternatif hosting APK:
   ├── Firebase Storage (free tier 5GB)
   ├── Netlify (upload ke folder public/)
   ├── Vercel (upload ke folder public/)
   └── Dropbox (bisa direct link dengan ?dl=1)

4. APK HARUS di-test sebelum di-share:
   ├── Install di HP Android
   ├── Test semua fitur web app
   ├── Test export Excel
   ├── Test LocalStorage
   └── Test camera/upload foto

═══════════════════════════════════════════════════════════════════════════════
                        DELIVERABLES
═══════════════════════════════════════════════════════════════════════════════

1. ✅ File APK: K4-Kelola-Kas-Kelas-v1.0.0.apk
2. ✅ GitHub Release dengan APK ter-upload
3. ✅ Landing page yang sudah di-update (semua link benar)
4. ✅ Halaman /download.html
5. ✅ QR Code yang berfungsi
6. ✅ Test berhasil dari HP Android

═══════════════════════════════════════════════════════════════════════════════