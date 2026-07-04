import { useState, useEffect, useRef } from "react";
import { GraduationCap, Briefcase, Presentation, BookOpen, Search, MapPin, Calendar, ArrowUpRight, Megaphone } from "lucide-react";

/* ============================================================
   FENERBAHÇE ÜNİVERSİTESİ — ERASMUS+ KOORDİNATÖRLÜĞÜ
   ------------------------------------------------------------
   DÜZENLEME REHBERİ (kod bilmeye gerek yok):
   1) DUYURULAR  -> aşağıdaki DUYURULAR listesine yeni satır ekle
   2) PARTNERLER -> PARTNERLER listesine üniversite ekle/çıkar
   3) İletişim bilgileri -> en alttaki FOOTER bölümünde
   ============================================================ */

// ==================== DUYURULAR (BURADAN DÜZENLE) ====================
// En yeni duyuruyu listenin EN ÜSTÜNE ekle. yeni: true dersen "YENİ" rozeti çıkar.
const DUYURULAR = [
  {
    tarih: "01.07.2026",
    etiket: "Öğrenim",
    baslik: "2026-2027 Güz Dönemi Öğrenim Hareketliliği Başvuruları Açıldı",
    ozet: "KA131 kapsamında 2026-2027 Güz dönemi öğrenci öğrenim hareketliliği başvuruları Turna Portal üzerinden alınmaya başlanmıştır. Son başvuru tarihi 25 Temmuz 2026.",
    yeni: true,
  },
  {
    tarih: "20.06.2026",
    etiket: "Staj",
    baslik: "Yaz Dönemi Staj Hareketliliği Sonuçları Açıklandı",
    ozet: "Staj hareketliliği değerlendirme sonuçları ilan edilmiştir. Asil ve yedek listeler için duyuru ekini inceleyiniz. Feragat süresi 5 iş günüdür.",
    yeni: true,
  },
  {
    tarih: "10.06.2026",
    etiket: "Personel",
    baslik: "Personel Ders Verme ve Eğitim Alma Hareketliliği Çağrısı",
    ozet: "Akademik ve idari personelimiz için 2026-2027 dönemi ders verme (STA) ve eğitim alma (STT) hareketliliği başvuru çağrısı yayımlanmıştır.",
    yeni: false,
  },
  {
    tarih: "28.05.2026",
    etiket: "Genel",
    baslik: "Erasmus+ Bilgilendirme Toplantısı",
    ozet: "Tüm öğrencilerimize açık Erasmus+ genel bilgilendirme toplantısı konferans salonunda gerçekleştirilecektir. Katılım için kayıt gerekmemektedir.",
    yeni: false,
  },
];

// ==================== PARTNER ÜNİVERSİTELER (BURADAN DÜZENLE) ====================
// turler: "Öğrenim", "Staj", "Ders Verme", "Eğitim Alma" — geçerli olanları yaz.
const PARTNERLER = [
  { universite: "Politehnica University of Bucharest", ulke: "Romanya", sehir: "Bükreş", alan: "Mühendislik", turler: ["Öğrenim", "Ders Verme", "Eğitim Alma"] },
  { universite: "Warsaw University of Technology", ulke: "Polonya", sehir: "Varşova", alan: "Mühendislik", turler: ["Öğrenim", "Ders Verme"] },
  { universite: "University of Lodz", ulke: "Polonya", sehir: "Lodz", alan: "İşletme ve Ekonomi", turler: ["Öğrenim", "Staj", "Eğitim Alma"] },
  { universite: "Leipzig University", ulke: "Almanya", sehir: "Leipzig", alan: "Sosyal Bilimler", turler: ["Öğrenim", "Ders Verme"] },
  { universite: "Hochschule Bremen", ulke: "Almanya", sehir: "Bremen", alan: "İşletme ve Ekonomi", turler: ["Öğrenim", "Staj"] },
  { universite: "Transilvania University of Brasov", ulke: "Romanya", sehir: "Braşov", alan: "Sağlık Bilimleri", turler: ["Öğrenim", "Eğitim Alma"] },
  { universite: "University of Porto", ulke: "Portekiz", sehir: "Porto", alan: "Mimarlık ve Tasarım", turler: ["Öğrenim", "Ders Verme"] },
  { universite: "Vilnius Tech", ulke: "Litvanya", sehir: "Vilnius", alan: "Mühendislik", turler: ["Öğrenim", "Staj", "Ders Verme", "Eğitim Alma"] },
  { universite: "University of Pécs", ulke: "Macaristan", sehir: "Pécs", alan: "Sağlık Bilimleri", turler: ["Öğrenim", "Ders Verme"] },
  { universite: "Masaryk University", ulke: "Çekya", sehir: "Brno", alan: "Psikoloji", turler: ["Öğrenim", "Eğitim Alma"] },
];

// ==================== HAREKETLİLİK İÇERİKLERİ ====================
const OGRENCI_HAREKETLILIK = [
  {
    no: "01",
    ad: "Öğrenci Öğrenim Hareketliliği",
    kod: "SMS",
    ikon: GraduationCap,
    aciklama:
      "Anlaşmalı bir Avrupa üniversitesinde 1 veya 2 dönem eğitim alma imkânı. Alınan dersler Öğrenim Anlaşması (Learning Agreement) ile tanınır, dönem kaybı yaşanmaz.",
    detaylar: ["Süre: 3-12 ay", "GNO şartı: Lisans 2.20 / YL 2.50", "Aylık hibe desteği", "Turna Portal üzerinden başvuru"],
  },
  {
    no: "02",
    ad: "Öğrenci Staj Hareketliliği",
    kod: "SMP",
    ikon: Briefcase,
    aciklama:
      "Avrupa'daki bir işletme, araştırma merkezi veya üniversitede staj yapma imkânı. Mezuniyet sonrası 12 ay içinde de gerçekleştirilebilir.",
    detaylar: ["Süre: 2-12 ay", "Staj yerini öğrenci bulur", "Öğrenim hibesinden daha yüksek hibe", "Mezunlar da başvurabilir"],
  },
];

const PERSONEL_HAREKETLILIK = [
  {
    no: "03",
    ad: "Personel Ders Verme Hareketliliği",
    kod: "STA",
    ikon: Presentation,
    aciklama:
      "Akademik personelin anlaşmalı bir partner üniversitede ders vermesi. Uluslararası akademik iş birliklerinin geliştirilmesi için temel araçtır.",
    detaylar: ["Süre: 2-5 gün (seyahat hariç)", "En az 8 saat ders verme şartı", "Günlük hibe + seyahat desteği", "Anlaşmalı üniversite şartı"],
  },
  {
    no: "04",
    ad: "Personel Eğitim Alma Hareketliliği",
    kod: "STT",
    ikon: BookOpen,
    aciklama:
      "Akademik ve idari personelin yurt dışında eğitim, iş başı gözlem veya staff week etkinliklerine katılması. İdari personel için de açıktır.",
    detaylar: ["Süre: 2-5 gün (seyahat hariç)", "Staff week etkinlikleri uygundur", "İdari personel öncelikli olabilir", "Günlük hibe + seyahat desteği"],
  },
];

// ==================== ANİMASYON: FadeIn (IntersectionObserver) ====================
function FadeIn({ children, delay = 0, y = 30, x = 0, className = "" }) {
  const ref = useRef(null);
  const [gorunur, setGorunur] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setGorunur(true);
          obs.disconnect();
        }
      },
      { rootMargin: "50px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: gorunur ? 1 : 0,
        transform: gorunur ? "translate(0,0)" : `translate(${x}px, ${y}px)`,
        transition: `opacity 0.7s cubic-bezier(0.25,0.1,0.25,1) ${delay}s, transform 0.7s cubic-bezier(0.25,0.1,0.25,1) ${delay}s`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}

// ==================== BUTON ====================
function AnaButon({ children, href = "#iletisim" }) {
  return (
    <a
      href={href}
      className="inline-block rounded-full px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base font-medium uppercase tracking-widest text-white"
      style={{
        background: "linear-gradient(123deg, #001030 7%, #163962 45%, #1F5FA8 72%, #FFD500 130%)",
        boxShadow: "0px 4px 4px rgba(22, 57, 98, 0.25), 4px 4px 12px #1F5FA8 inset",
        outline: "2px solid #FFFFFF",
        outlineOffset: "-3px",
      }}
    >
      {children}
    </a>
  );
}

// ==================== ANA UYGULAMA ====================
export default function App() {
  // Partner filtre durumu
  const [ulkeFiltre, setUlkeFiltre] = useState("Tümü");
  const [turFiltre, setTurFiltre] = useState("Tümü");
  const [arama, setArama] = useState("");

  const ulkeler = ["Tümü", ...[...new Set(PARTNERLER.map((p) => p.ulke))].sort()];
  const turler = ["Tümü", "Öğrenim", "Staj", "Ders Verme", "Eğitim Alma"];

  const filtreliPartnerler = PARTNERLER.filter((p) => {
    const ulkeOk = ulkeFiltre === "Tümü" || p.ulke === ulkeFiltre;
    const turOk = turFiltre === "Tümü" || p.turler.includes(turFiltre);
    const q = arama.toLocaleLowerCase("tr");
    const aramaOk =
      q === "" ||
      p.universite.toLocaleLowerCase("tr").includes(q) ||
      p.sehir.toLocaleLowerCase("tr").includes(q) ||
      p.alan.toLocaleLowerCase("tr").includes(q);
    return ulkeOk && turOk && aramaOk;
  });

  return (
    <div style={{ background: "#0C0C0C", fontFamily: "'Kanit', sans-serif", overflowX: "clip" }}>
      {/* ==================== 1. HERO ==================== */}
      <section className="h-screen flex flex-col" style={{ overflowX: "clip" }}>
        {/* Navbar */}
        <FadeIn delay={0} y={-20}>
          <nav className="flex justify-between px-6 md:px-10 pt-6 md:pt-8">
            {[
              ["Hareketlilik", "#hareketlilik"],
              ["Duyurular", "#duyurular"],
              ["Partnerler", "#partnerler"],
              ["İletişim", "#iletisim"],
            ].map(([ad, hedef]) => (
              <a
                key={ad}
                href={hedef}
                className="text-sm md:text-lg lg:text-[1.4rem] font-medium uppercase tracking-wider hover:opacity-70 transition-opacity duration-200"
                style={{ color: "#D7E2EA" }}
              >
                {ad}
              </a>
            ))}
          </nav>
        </FadeIn>

        {/* Dev başlık */}
        <div className="overflow-hidden flex-1 flex flex-col justify-center">
          <FadeIn delay={0.15} y={40}>
            <h1 className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-center text-[17vw] sm:text-[18vw]">
              Erasmus+
            </h1>
          </FadeIn>
          <FadeIn delay={0.3} y={20}>
            <p
              className="text-center font-medium uppercase tracking-[0.3em] mt-4 px-4"
              style={{ color: "#FFD500", fontSize: "clamp(0.7rem, 1.6vw, 1.2rem)" }}
            >
              Fenerbahçe Üniversitesi
            </p>
          </FadeIn>
        </div>

        {/* Alt bar */}
        <div className="flex justify-between items-end px-6 md:px-10 pb-7 sm:pb-8 md:pb-10">
          <FadeIn delay={0.35} y={20}>
            <p
              className="font-light uppercase tracking-wide leading-snug max-w-[160px] sm:max-w-[260px] md:max-w-[320px]"
              style={{ color: "#D7E2EA", fontSize: "clamp(0.75rem, 1.4vw, 1.5rem)" }}
            >
              Avrupa'da eğitim, staj ve akademik iş birliği için kapınız
            </p>
          </FadeIn>
          <FadeIn delay={0.5} y={20}>
            <AnaButon href="#hareketlilik">Keşfet</AnaButon>
          </FadeIn>
        </div>
      </section>

      {/* ==================== 2. HAREKETLİLİK (BEYAZ BÖLÜM) ==================== */}
      <section
        id="hareketlilik"
        className="rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
        style={{ background: "#FFFFFF" }}
      >
        <FadeIn y={40}>
          <h2
            className="font-black uppercase text-center leading-none tracking-tight mb-6"
            style={{ color: "#0C0C0C", fontSize: "clamp(2.6rem, 10vw, 140px)" }}
          >
            Hareketlilik
          </h2>
        </FadeIn>
        <FadeIn delay={0.1} y={20}>
          <p
            className="text-center font-light max-w-2xl mx-auto mb-16 sm:mb-20 leading-relaxed"
            style={{ color: "#0C0C0C", opacity: 0.6, fontSize: "clamp(0.9rem, 1.8vw, 1.25rem)" }}
          >
            Erasmus+ KA131 kapsamında öğrenci ve personelimize sunulan dört hareketlilik türü.
            Size uygun olanı seçin, başvuru koşullarını inceleyin.
          </p>
        </FadeIn>

        <div className="max-w-5xl mx-auto">
          {/* Öğrenci grubu */}
          <FadeIn y={20}>
            <div className="flex items-center gap-4 mb-2">
              <span
                className="font-semibold uppercase tracking-[0.25em]"
                style={{ color: "#163962", fontSize: "clamp(0.8rem, 1.6vw, 1.1rem)" }}
              >
                Öğrenci Hareketliliği
              </span>
              <div className="flex-1 h-px" style={{ background: "rgba(12,12,12,0.15)" }} />
            </div>
          </FadeIn>

          {OGRENCI_HAREKETLILIK.map((h, i) => (
            <HareketlilikSatiri key={h.kod} h={h} delay={i * 0.1} />
          ))}

          {/* Personel grubu */}
          <FadeIn y={20}>
            <div className="flex items-center gap-4 mb-2 mt-14 sm:mt-20">
              <span
                className="font-semibold uppercase tracking-[0.25em]"
                style={{ color: "#163962", fontSize: "clamp(0.8rem, 1.6vw, 1.1rem)" }}
              >
                Personel Hareketliliği
              </span>
              <div className="flex-1 h-px" style={{ background: "rgba(12,12,12,0.15)" }} />
            </div>
          </FadeIn>

          {PERSONEL_HAREKETLILIK.map((h, i) => (
            <HareketlilikSatiri key={h.kod} h={h} delay={i * 0.1} />
          ))}
        </div>
      </section>

      {/* ==================== 3. DUYURULAR ==================== */}
      <section
        id="duyurular"
        className="rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 relative z-10 px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
        style={{ background: "#0C0C0C" }}
      >
        <FadeIn y={40}>
          <h2
            className="hero-heading font-black uppercase text-center leading-none tracking-tight mb-16 sm:mb-20"
            style={{ fontSize: "clamp(2.6rem, 10vw, 140px)" }}
          >
            Duyurular
          </h2>
        </FadeIn>

        <div className="max-w-4xl mx-auto flex flex-col gap-5">
          {DUYURULAR.map((d, i) => (
            <FadeIn key={i} delay={i * 0.08} y={30}>
              <article
                className="rounded-[28px] sm:rounded-[34px] p-6 sm:p-8 border-2 transition-colors duration-200 hover:border-[#FFD500]"
                style={{ borderColor: "#2A2F36", background: "#111417" }}
              >
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <Megaphone size={16} style={{ color: "#FFD500" }} />
                  <span
                    className="flex items-center gap-1.5 text-xs sm:text-sm font-light"
                    style={{ color: "#8A939C" }}
                  >
                    <Calendar size={13} /> {d.tarih}
                  </span>
                  <span
                    className="text-xs font-medium uppercase tracking-widest rounded-full px-3 py-1"
                    style={{ background: "#1B2733", color: "#D7E2EA" }}
                  >
                    {d.etiket}
                  </span>
                  {d.yeni && (
                    <span
                      className="text-xs font-semibold uppercase tracking-widest rounded-full px-3 py-1"
                      style={{ background: "#FFD500", color: "#0C0C0C" }}
                    >
                      Yeni
                    </span>
                  )}
                </div>
                <h3
                  className="font-medium mb-2"
                  style={{ color: "#D7E2EA", fontSize: "clamp(1.05rem, 2.2vw, 1.5rem)" }}
                >
                  {d.baslik}
                </h3>
                <p
                  className="font-light leading-relaxed"
                  style={{ color: "#8A939C", fontSize: "clamp(0.85rem, 1.6vw, 1.05rem)" }}
                >
                  {d.ozet}
                </p>
              </article>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ==================== 4. PARTNER ÜNİVERSİTELER ==================== */}
      <section id="partnerler" className="px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32" style={{ background: "#0C0C0C" }}>
        <FadeIn y={40}>
          <h2
            className="hero-heading font-black uppercase text-center leading-none tracking-tight mb-6"
            style={{ fontSize: "clamp(2.2rem, 9vw, 120px)" }}
          >
            Partnerler
          </h2>
        </FadeIn>
        <FadeIn delay={0.1} y={20}>
          <p
            className="text-center font-light max-w-2xl mx-auto mb-12 leading-relaxed"
            style={{ color: "#8A939C", fontSize: "clamp(0.9rem, 1.8vw, 1.15rem)" }}
          >
            İkili anlaşmamız bulunan üniversiteler. Ülkeye ve hareketlilik türüne göre filtreleyebilirsiniz.
          </p>
        </FadeIn>

        {/* Filtre çubuğu */}
        <FadeIn delay={0.15} y={20}>
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row gap-3 mb-8">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "#8A939C" }} />
              <input
                type="text"
                placeholder="Üniversite, şehir veya alan ara..."
                value={arama}
                onChange={(e) => setArama(e.target.value)}
                className="w-full rounded-full pl-11 pr-5 py-3 text-sm font-light outline-none border-2 focus:border-[#FFD500] transition-colors"
                style={{ background: "#111417", borderColor: "#2A2F36", color: "#D7E2EA" }}
              />
            </div>
            <select
              value={ulkeFiltre}
              onChange={(e) => setUlkeFiltre(e.target.value)}
              className="rounded-full px-5 py-3 text-sm font-medium uppercase tracking-wider outline-none border-2 cursor-pointer"
              style={{ background: "#111417", borderColor: "#2A2F36", color: "#D7E2EA" }}
            >
              {ulkeler.map((u) => (
                <option key={u} value={u}>{u === "Tümü" ? "Ülke: Tümü" : u}</option>
              ))}
            </select>
            <select
              value={turFiltre}
              onChange={(e) => setTurFiltre(e.target.value)}
              className="rounded-full px-5 py-3 text-sm font-medium uppercase tracking-wider outline-none border-2 cursor-pointer"
              style={{ background: "#111417", borderColor: "#2A2F36", color: "#D7E2EA" }}
            >
              {turler.map((t) => (
                <option key={t} value={t}>{t === "Tümü" ? "Tür: Tümü" : t}</option>
              ))}
            </select>
          </div>
        </FadeIn>

        {/* Sonuç sayısı */}
        <div className="max-w-5xl mx-auto mb-4">
          <p className="text-xs uppercase tracking-widest font-light" style={{ color: "#8A939C" }}>
            {filtreliPartnerler.length} üniversite listeleniyor
          </p>
        </div>

        {/* Partner listesi */}
        <div className="max-w-5xl mx-auto flex flex-col">
          {filtreliPartnerler.length === 0 && (
            <p className="font-light py-10 text-center" style={{ color: "#8A939C" }}>
              Bu filtrelerle eşleşen üniversite bulunamadı. Filtreleri sıfırlayıp tekrar deneyin.
            </p>
          )}
          {filtreliPartnerler.map((p, i) => (
            <div
              key={p.universite}
              className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6 py-6 sm:py-7"
              style={{ borderBottom: "1px solid #2A2F36" }}
            >
              <div className="flex-1">
                <h3
                  className="font-medium"
                  style={{ color: "#D7E2EA", fontSize: "clamp(1rem, 2vw, 1.35rem)" }}
                >
                  {p.universite}
                </h3>
                <p className="flex items-center gap-1.5 font-light text-sm mt-1" style={{ color: "#8A939C" }}>
                  <MapPin size={13} /> {p.sehir}, {p.ulke} · {p.alan}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {p.turler.map((t) => (
                  <span
                    key={t}
                    className="text-xs font-medium uppercase tracking-wider rounded-full px-3 py-1.5"
                    style={{
                      background: t.includes("Öğrenim") || t.includes("Staj") ? "#1B2733" : "#221B33",
                      color: "#D7E2EA",
                      border: "1px solid #2A2F36",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==================== 5. İLETİŞİM / FOOTER ==================== */}
      <section
        id="iletisim"
        className="rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24"
        style={{ background: "#FFFFFF" }}
      >
        <FadeIn y={40}>
          <h2
            className="font-black uppercase text-center leading-none tracking-tight mb-10"
            style={{ color: "#0C0C0C", fontSize: "clamp(2.2rem, 9vw, 120px)" }}
          >
            İletişim
          </h2>
        </FadeIn>
        <FadeIn delay={0.15} y={20}>
          <div className="max-w-xl mx-auto text-center flex flex-col gap-3">
            <p className="font-medium uppercase tracking-wider" style={{ color: "#0C0C0C" }}>
              Erasmus+ Koordinatörlüğü — Uluslararası Ofis
            </p>
            <p className="font-light" style={{ color: "#0C0C0C", opacity: 0.6 }}>
              Fenerbahçe Üniversitesi, Ataşehir / İstanbul
            </p>
            <p className="font-light" style={{ color: "#0C0C0C", opacity: 0.6 }}>
              erasmus@fbu.edu.tr
            </p>
            <div className="mt-6">
              <AnaButon href="mailto:erasmus@fbu.edu.tr">Bize Yazın</AnaButon>
            </div>
          </div>
        </FadeIn>
        <p
          className="text-center text-xs font-light uppercase tracking-widest mt-16"
          style={{ color: "#0C0C0C", opacity: 0.4 }}
        >
          © 2026 Fenerbahçe Üniversitesi Erasmus+ Koordinatörlüğü
        </p>
      </section>
    </div>
  );
}

// ==================== HAREKETLİLİK SATIRI BİLEŞENİ ====================
function HareketlilikSatiri({ h, delay }) {
  const Ikon = h.ikon;
  return (
    <FadeIn delay={delay} y={30}>
      <div
        className="flex flex-col sm:flex-row gap-4 sm:gap-8 md:gap-12 py-8 sm:py-10 md:py-12"
        style={{ borderBottom: "1px solid rgba(12,12,12,0.15)" }}
      >
        <span
          className="font-black leading-none shrink-0"
          style={{ color: "#0C0C0C", fontSize: "clamp(3rem, 10vw, 140px)" }}
        >
          {h.no}
        </span>
        <div className="flex flex-col gap-3 pt-2">
          <div className="flex items-center gap-3 flex-wrap">
            <Ikon size={26} style={{ color: "#163962" }} />
            <h3
              className="font-medium uppercase"
              style={{ color: "#0C0C0C", fontSize: "clamp(1rem, 2.2vw, 2rem)" }}
            >
              {h.ad}
            </h3>
            <span
              className="text-xs font-semibold rounded-full px-3 py-1 uppercase tracking-widest"
              style={{ background: "#163962", color: "#FFD500" }}
            >
              {h.kod}
            </span>
          </div>
          <p
            className="font-light leading-relaxed max-w-2xl"
            style={{ color: "#0C0C0C", opacity: 0.6, fontSize: "clamp(0.85rem, 1.6vw, 1.2rem)" }}
          >
            {h.aciklama}
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-1 mt-1">
            {h.detaylar.map((d) => (
              <li
                key={d}
                className="flex items-center gap-1.5 text-sm font-light"
                style={{ color: "#0C0C0C", opacity: 0.75 }}
              >
                <ArrowUpRight size={13} style={{ color: "#163962" }} /> {d}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </FadeIn>
  );
}
