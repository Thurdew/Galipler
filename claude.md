# CLAUDE.md — Galipler Yapı Malzemeleri Projesi

## Proje Genel Bakış
**Galipler Yapı Malzemeleri A.Ş.** için geliştirilmiş kurumsal web sitesi.
1972'den beri faaliyet gösteren İstanbul Ataşehir'deki yapı malzemeleri firmasının dijital varlığıdır.
Site; ürün vitrin, kargo/teslimat bilgisi, iletişim ve admin paneli + blog içermektedir.

## Teknoloji Yığını
- **Frontend:** React 19 + Vite 6 + Tailwind CSS 3
- **UI Bileşen Kütüphaneleri:** lucide-react, react-icons
- **Routing:** react-router-dom v7
- **Backend API:** Node.js + Express 5 (server.js)
- **Veri Depolama:** JSON dosya tabanlı (`data/` klasörü)
- **Build Aracı:** Vite (ESM modüller, `"type": "module"`)

## Klasör Yapısı
```
Galipler-main/
├── CLAUDE.md
├── package.json
├── vite.config.js
├── tailwind.config.js
├── server.js              ← Express API sunucusu (port 3000)
├── index.html             ← Vite giriş noktası + tüm SEO meta tagları
├── data/
│   ├── products.json      ← Ürün verileri (12 ürün)
│   ├── blog-posts.json    ← Blog yazıları
│   └── config.json        ← Admin kimlik bilgileri ve site ayarları
├── public/
│   ├── sitemap.xml        ← Statik sitemap (tüm URL'leri içerir)
│   ├── robots.txt         ← Crawler yönergeleri
│   └── images/            ← Ürün ve site görselleri (1.jpg – 15.jpeg, logo, bg1)
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    └── components/
        ├── Header.jsx         ← Scroll'a duyarlı sticky navbar
        ├── HomePage.jsx       ← Hero, Features, About, Products, Delivery, Contact
        ├── Footer.jsx
        └── ScrollToTopButton.jsx
```

## npm Komutları
```bash
npm install          # Bağımlılıkları kur
npm run dev          # Vite dev sunucusu (port 5173)
npm run build        # Production build → dist/
npm run preview      # Build önizlemesi
npm start            # Express API sunucusu (port 3000)
```

## Geliştirme Kuralları

### SEO
- `index.html` içinde canonical, OG, Twitter Card ve iki JSON-LD bloğu (WebSite + LocalBusiness) mevcuttur
- Tüm görseller `alt` attribute'u içermeli; `loading="lazy"` kullanılıyor
- Her yeni sayfa için benzersiz `<title>` (max 60 karakter) ve `<meta name="description">` (max 160 karakter) gerekir
- Yeni ürün veya blog eklendiğinde `public/sitemap.xml` güncellenmeli; dinamik sitemap `/api/sitemap` endpoint'inden de okunabilir
- URL'ler SEO dostu slug formatında olmalı: `ferforje`, `boru-profil`, `osb-levha` vb.
- Ürün sayfaları Product JSON-LD, blog yazıları BlogPosting JSON-LD içermeli

### Admin & API (server.js)
- Admin girişi: `POST /api/admin/login` → Base64 token döner
- Token `Authorization: Bearer <token>` header'ı ile gönderilir
- Korumalı endpoint'ler: ürün/blog CRUD (POST, PUT, DELETE)
- Kimlik bilgileri `data/config.json` içinde saklanır

### Blog
- Blog yazıları `data/blog-posts.json` içinde tutulur
- Her post alanları: `id`, `title`, `slug`, `excerpt`, `content`, `author`, `date`, `tags`, `metaTitle`, `metaDescription`, `ogImage`
- Blog listesi `/api/blog?page=N` (sayfa başına 6 yazı)

### Ürünler
- Ürünler `data/products.json` içinde tutulur (12 ürün mevcut)
- Her ürün alanları: `id`, `name`, `slug`, `description`, `price`, `image`, `category`, `inStock`, `metaTitle`, `metaDescription`
- Görseller `public/images/` içinde, path formatı `/images/[dosya]`

### Kodlama Kuralları
- Mevcut tasarıma (gradient mavi-mor paleti, rounded-2xl kartlar, Tailwind utility sınıfları) dokunma
- Yorum satırı yazma; iyi isimlendirilmiş değişkenler yeterlidir
- Her bileşen tek sorumluluk ilkesine göre tasarlanmalı
- `"type": "module"` olduğundan ES import/export syntax kullan, require() değil
