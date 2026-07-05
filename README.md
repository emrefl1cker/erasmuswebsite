# FBÜ Erasmus+ Sitesi (CMS'li)

React + Vite + Tailwind + Framer Motion + Sanity CMS.

## İlk kurulum (bir kere yapılır)

### 1. Vercel'e deploy
- Dosyaları GitHub repona yükle → Vercel otomatik kurar (önceki gibi)

### 2. Sanity hesabı ve proje
1. **sanity.io** → ücretsiz hesap aç (Google ile giriş yeterli)
2. **sanity.io/manage** → **Create new project** → isim ver (örn. "fbu-erasmus")
3. Dataset sorulursa: **production**, görünürlük **public**
4. Proje sayfasında **Project ID** yazar (8 haneli) → kopyala

### 3. Project ID'yi siteye tanıt
- `src/sanity/ayarlar.js` dosyasını aç
- `BURAYA_PROJECT_ID` yerine kendi ID'ni yapıştır
- GitHub'a commit'le → Vercel yeniden kurar

### 4. CORS izni (panelin çalışması için şart)
- **sanity.io/manage** → projen → **API** sekmesi → **CORS origins** → **Add CORS origin**
- Site adresini ekle: `https://SENIN-SITEN.vercel.app` (Allow credentials: AÇIK ✓)

### 5. Panele gir
- `SENIN-SITEN.vercel.app/admin` → Sanity hesabınla giriş yap
- Duyuru, partner, sayfa, istatistik ekle → **Publish** → saniyeler içinde sitede!

## Panelden neler yönetilir?
| İçerik | Ne yapar |
|---|---|
| **Duyurular** | Ana sayfadaki dönen kart + "popup" kutucuğu işaretlenirse açılış pop-up'ı |
| **Partner Üniversiteler** | Filtrelenebilir liste (ülke/tür otomatik) |
| **Sayfalar** | Menüye yeni sekme ekler — panelde sayfa oluştur, navbar'da belirir |
| **İstatistikler** | Ana sayfadaki sayaçlar |

## Önemli
- CMS boşken site `src/data.js` içindeki yedek içeriği gösterir. Panele gerçek
  içerikleri girince otomatik CMS'e geçer.
- Popup için aynı anda SADECE BİR duyuruda "popup" kutucuğu açık olmalı.
- Hareketlilik sayfa içerikleri (koşullar/süreç/belgeler) şimdilik `src/data.js`'te —
  istenirse o da CMS'e taşınabilir.
