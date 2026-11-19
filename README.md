# Portfolio — Ahmad Fariz Kazhimy

Landing page portfolio statis (HTML + CSS + vanilla JS). Tanpa build step, tanpa dependency.
Tema glassmorphism minimalis, palet **60% Ink Navy / 30% Slate Blue / 10% Amber**.

## Struktur

```
.
├── index.html        # konten + SEO meta + JSON-LD
├── styles.css        # design tokens, glass, layout, responsive
├── script.js         # reveal, count-up, rotator, tilt, spotlight, nav
├── 404.html
├── vercel.json       # security headers + caching
├── robots.txt
├── sitemap.xml
└── assets/
    ├── profile.webp
    ├── og-image.png  # 1200x630, untuk preview link
    └── favicon.svg
```

## Jalankan lokal

```bash
python3 -m http.server 8000   # lalu buka http://localhost:8000
# atau: npx serve .
```

## Deploy: GitHub → Vercel

```bash
git init
git add .
git commit -m "feat: portfolio landing page"
git branch -M main
git remote add origin https://github.com/<username>/<repo>.git
git push -u origin main
```

1. Buka [vercel.com/new](https://vercel.com/new) → **Import** repo tersebut.
2. Framework Preset: **Other**. Build Command & Output Directory: **kosongkan**.
3. Klik **Deploy**. Setiap `git push` ke `main` akan otomatis deploy ulang.

## Checklist setelah deploy

- [ ] Ganti semua `YOUR-DOMAIN.vercel.app` di `index.html`, `robots.txt`, `sitemap.xml` dengan domain asli.
- [ ] Verifikasi URL LinkedIn dan nomor WhatsApp di bagian Kontak.
- [ ] Tes preview link di LinkedIn Post Inspector / WhatsApp.
- [ ] Jalankan Lighthouse (target: Performance, Accessibility, SEO ≥ 95).

## Kustomisasi cepat

- **Warna**: ubah variabel di `:root` pada `styles.css` (`--ink-*` = 60%, `--blue-*` = 30%, `--amber` = 10%).
- **Kata yang berputar di hero**: elemen `.rotator__word` di `index.html`.
- **Proyek baru**: salin satu `<article class="project ...">` di section `#proyek`.
- **Gerak**: otomatis nonaktif jika perangkat memakai `prefers-reduced-motion`.
