# FBÜ Erasmus+ Sitesi

Fenerbahçe Üniversitesi Erasmus+ Koordinatörlüğü web sitesi (React + Vite + Tailwind).

## Vercel'e Deploy (en kolay yol)

1. github.com'da yeni repo aç (örn. `fbu-erasmus`)
2. Bu klasördeki dosyaları repoya yükle ("uploading an existing file" linkiyle sürükle-bırak da olur)
3. vercel.com → "Add New Project" → GitHub reponu seç → Import
4. Hiçbir ayarı değiştirme (Vercel, Vite'ı otomatik tanır) → Deploy
5. 1 dakika sonra siten `xxx.vercel.app` adresinde yayında

## Yerel çalıştırma (istersen)

```
npm install
npm run dev
```

## İçerik güncelleme

Tüm düzenlenebilir içerik `src/App.jsx` dosyasının EN ÜSTÜNDE:
- `DUYURULAR` listesi → yeni ilan eklemek için
- `PARTNERLER` listesi → partner üniversite eklemek/çıkarmak için

Değişikliği GitHub'a push'ladığında Vercel otomatik yeniden deploy eder.
