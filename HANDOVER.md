# HANDOVER — Portfolio Landing Page Ahmad Fariz Kazhimy

Dokumen ini merangkum seluruh konteks dari sesi chat Claude.ai agar pekerjaan bisa dilanjutkan di Claude Code.
Terakhir diperbarui: 19 Nov 2026.

## 1. Tujuan proyek
Landing page portfolio pribadi yang menjelaskan pengalaman kerja di bidang IT (Project Manager / BA, proyek perbankan).
- Kode disimpan di GitHub, di-deploy ke Vercel.
- Gaya: glassmorphism + minimalis, motion halus, tipografi bersih, hierarki visual kuat, responsif, siap produksi.
- Bahasa konten: Inggris (diganti dari Indonesia pada 19 Nov 2026 atas permintaan user).

## 2. Status saat ini
Versi aktif: folder `portfolio-light/` (palet baru). Sudah jadi dan sudah di-screenshot di desktop 1440px dan mobile 390px, tanpa error console dan tanpa overflow horizontal. **Belum pernah di-deploy ke Vercel dan belum dites Lighthouse.**

Versi lama (palet navy + amber) ada di `portfolio-ahmad-fariz.zip`, hanya sebagai arsip.

## 3. Stack & struktur
Statis murni: HTML + CSS + vanilla JS. Tanpa build step, tanpa dependency.

```
index.html      konten, meta SEO/OG, JSON-LD Person
styles.css      token, glass, layout, responsive; blok "LIGHT THEME" di bagian bawah
script.js       reveal on scroll, count-up, rotator hero, tilt, spotlight, nav, progress
404.html
vercel.json     security headers + cache
robots.txt / sitemap.xml
assets/         profile.webp (800x1000), og-image.png (1200x630), favicon.svg
README.md       cara jalan lokal + deploy
FORM-DETAIL-PROYEK.md   form yang perlu diisi user untuk detail proyek
```

Jalankan lokal: `python3 -m http.server 8000` lalu buka `http://localhost:8000`.
Path aset memakai root absolut (`/styles.css`, `/assets/...`), jadi harus disajikan dari root folder.

## 4. Keputusan desain
**Palet 60/30/10 (ditetapkan user):**
| Peran | Warna | HEX | Dipakai untuk |
|---|---|---|---|
| 60% | Claude Grey | `#E9ECEF` | latar halaman, kartu glass putih translusen |
| 30% | Jet Black | `#111316` | teks utama, logo, chip foto, blok gelap (strip statistik, kartu proyek utama, blok Kontak) |
| 10% | Cobalt | `#1F4FD8` | tombol CTA, eyebrow, angka langkah, link aktif, titik timeline, badge |

Catatan: di dalam blok gelap, teks kecil dan angka memakai cobalt lebih terang (`#6D93FF` / `#8FA9F5`) karena cobalt asli di atas jet black kontrasnya kurang. Tombol utama tetap `#1F4FD8`.

**Tipografi:** Plus Jakarta Sans (heading) + Inter (body) dari Google Fonts, dengan fallback system font.

**Motion:** blob latar melayang + parallax kursor, reveal on scroll, count-up, kata hero berganti, tilt 3D kartu foto, spotlight kursor di kartu glass, marquee, garis timeline terisi saat scroll, progress bar scroll. Semua nonaktif saat `prefers-reduced-motion`.

**Section:** Hero, Statistik, Tentang, Project Portfolio (1 kartu utama + 4), Pengalaman (timeline), Keahlian & Toolkit, Cara Saya Bekerja (5 tahap), Sertifikasi, Kontak + Pendidikan, Footer.

## 5. Data sumber (dari CV & sertifikat user)
- Nama: Ahmad Fariz Kazhimy. Lokasi: Tebet, Jakarta Selatan. Email: farizkazhimy54@gmail.com. HP: 0813 3720 7474. LinkedIn: linkedin.com/in/ahmad-fariz-kazhimy-1a294a154
- Pendidikan: Universitas Brawijaya, Business Administration, GPA 3.62, 2015–2019.
- Pengalaman: PT Praisindo Teknologi: Project Manager (Jan 2025–sekarang), Business Analyst (Jan 2024–Jan 2025), Business Consultant (Jan 2023–Jan 2024). PT Jaya Express Transindo: Sales Support Officer (Mar 2021–Jan 2023).
- Highlight: memimpin implementasi Wealth Management System senilai IDR 9,5 miliar, 25+ resource, beberapa business unit, dari inisiasi sampai go-live.
- Proyek: CIMB Niaga WMS (PM), BTN CRM (BA), BSI WMS (BA), Bank Ganesha OMS (BC), Bank Mayora Bancassurance (BC).
- Skill: Agile, Scrum, Waterfall, Jira, Smartsheet, Azure DevOps, Whimsical, Figma, SQL, Postman.
- Sertifikat: MySkill Project & Product Management Bootcamp, Batch 14, 15 Sep–3 Nov 2026 (sertifikat diterbitkan 8 Nov 2026).
- Foto: foto semi-formal baju putih dari user, dipotong 4:5 (crop 130,250 → 930,1250 dari file asli 1023x1537) lalu disimpan 800x1000 webp.

## 6. Hal yang BELUM terverifikasi / perlu keputusan user
1. **Atribusi IDR 9,5 M ke CIMB Niaga.** Di CV angka ini ada di peran PM Praisindo dan tidak disebut milik klien mana. Kartu utama saat ini menyebut CIMB Niaga + periode "2025 — Sekarang" (inferensi). Minta konfirmasi.
2. **Tag di kartu BTN, BSI, Ganesha, Mayora** (FSD, SIT/UAT, Training, dll) diambil dari deskripsi peran umum di CV, bukan rincian per proyek.
3. **Nomor WhatsApp & URL LinkedIn** dibaca dari gambar CV. Verifikasi. Nomor HP jadi publik lewat tombol WhatsApp (`wa.me/6281337207474`).
4. **Statistik "3+ tahun"** dihitung dinamis dari Jan 2023 di `script.js` (`data-count-since`).
5. **Credential ID sertifikat sengaja tidak ditampilkan** (karakter ambigu l/I saat dibaca dari gambar).

## 7. Yang menunggu dari user
- **Form detail proyek** (`FORM-DETAIL-PROYEK.md`) per proyek: skala, peran, tantangan, hasil terukur, izin publikasi nama/logo klien. Setelah terisi, ubah kartu proyek menjadi studi kasus (halaman atau modal) dengan angka hasil nyata.

## 8. Rencana langkah berikutnya (urut prioritas)
1. Refactor blok "LIGHT THEME" di akhir `styles.css`: pindahkan nilai ke token `:root` dan hapus aturan dark yang sudah tertimpa (saat ini tema terang diterapkan sebagai override di atas tema gelap, dan ini hutang teknis).
2. Ganti semua `YOUR-DOMAIN.vercel.app` di `index.html` (canonical, og:url, og:image), `robots.txt`, `sitemap.xml` setelah domain final.
3. Isi studi kasus dari form user; jangan menambah klaim yang tidak ada di CV atau form.
4. Self-host font (hapus ketergantungan Google Fonts) untuk performa dan privasi; tambah `preload` woff2.
5. Jalankan Lighthouse (target Performance, Accessibility, SEO, Best Practices ≥ 95); cek kontras teks kecil di blok gelap.
6. Opsional: toggle bahasa ID/EN, tautan ke sertifikat asli, halaman terpisah `/proyek/*`, analytics ringan (mis. Vercel Analytics).
7. Setup repo GitHub dan deploy Vercel (Framework Preset "Other", tanpa build command, output kosong). Perintah lengkap ada di `README.md`.

## 9. Catatan teknis
- `.glass` memakai `backdrop-filter`; ada fallback `@supports not` yang membuat latar hampir solid.
- Elemen `.chip` pada kartu foto berada di dalam `.profile` (ber-`transform`); chip ketiga disembunyikan di bawah 860px agar tidak menutupi nama.
- `.rotator` sengaja `display: grid` (satu baris sendiri) supaya tidak ada celah saat kata pendek tampil.
- Reveal memakai class `js` di `<html>` (di-set inline di `<head>`), sehingga tanpa JS konten tetap terlihat.
- OG image dibuat dengan PIL memakai font DejaVu Sans Bold, bukan font brand. Jika ingin konsisten, render ulang dari HTML/Figma.
- Aturan sumber konten: jangan mengarang fakta, angka, atau nama klien di luar CV/form user.

## 10. Prompt awal untuk Claude Code
Salin ke Claude Code setelah membuka folder project ini:

> Baca `HANDOVER.md` dan `README.md` di folder ini. Ini landing page portfolio statis (HTML/CSS/JS) untuk Ahmad Fariz Kazhimy, akan di-deploy ke Vercel via GitHub. Mulai dari langkah 1 di bagian "Rencana langkah berikutnya": refactor blok LIGHT THEME di `styles.css` menjadi token `:root` tanpa mengubah tampilan, lalu verifikasi dengan screenshot desktop 1440px dan mobile 390px. Setelah itu tanya saya soal item di bagian 6 sebelum mengubah konten. Jangan menambah klaim yang tidak ada di CV.
