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

Tüm düzenlenebilir içerik `src/data.js` dosyasında:
- `DUYURULAR` → yeni ilan ekle; `popup: true` verirsen açılışta pop-up olur
- `PARTNERLER` → partner üniversite ekle/çıkar
- `HAREKETLILIK` → her türün sayfa içerikleri (koşullar, süreç, belgeler)
- `ISTATISTIKLER` → ana sayfadaki sayaçlar (örnek verileri gerçekleriyle değiştir!)

Değişikliği GitHub'a push'ladığında Vercel otomatik yeniden deploy eder.
