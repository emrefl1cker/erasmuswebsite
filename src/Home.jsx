import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Search, MapPin, Calendar, Megaphone, ArrowRight, X, GraduationCap, Briefcase, Presentation, BookOpen } from "lucide-react";
import { DUYURULAR, PARTNERLER, HAREKETLILIK, ISTATISTIKLER, ILETISIM } from "./data.js";

const IKONLAR = { ogrenim: GraduationCap, staj: Briefcase, "ders-verme": Presentation, "egitim-alma": BookOpen };
const gecis = { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] };

function FadeIn({ children, delay = 0, y = 30, className = "" }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "50px" }}
      transition={{ ...gecis, delay }}
    >
      {children}
    </motion.div>
  );
}

/* Scroll'da sayan istatistik */
function Sayac({ deger, ek, etiket }) {
  const ref = useRef(null);
  const gorunur = useInView(ref, { once: true, margin: "-50px" });
  const [sayi, setSayi] = useState(0);

  useEffect(() => {
    if (!gorunur) return;
    const sure = 1400;
    const baslangic = performance.now();
    let frame;
    const adim = (t) => {
      const oran = Math.min((t - baslangic) / sure, 1);
      setSayi(Math.round(deger * (1 - Math.pow(1 - oran, 3))));
      if (oran < 1) frame = requestAnimationFrame(adim);
    };
    frame = requestAnimationFrame(adim);
    return () => cancelAnimationFrame(frame);
  }, [gorunur, deger]);

  return (
    <div ref={ref} className="text-center">
      <p className="font-black leading-none" style={{ color: "#FFD500", fontSize: "clamp(2.4rem, 6vw, 4.5rem)" }}>
        {sayi}{ek}
      </p>
      <p className="font-light uppercase tracking-widest mt-2" style={{ color: "#8FA0BC", fontSize: "clamp(0.7rem, 1.4vw, 0.95rem)" }}>
        {etiket}
      </p>
    </div>
  );
}

/* Açılışta gösterilen pop-up duyuru */
function PopupDuyuru() {
  const duyuru = DUYURULAR.find((d) => d.popup);
  const [acik, setAcik] = useState(false);

  useEffect(() => {
    if (duyuru && !sessionStorage.getItem("popupGoruldu")) {
      const t = setTimeout(() => setAcik(true), 900);
      return () => clearTimeout(t);
    }
  }, [duyuru]);

  const kapat = () => {
    setAcik(false);
    sessionStorage.setItem("popupGoruldu", "1");
  };

  if (!duyuru) return null;
  return (
    <AnimatePresence>
      {acik && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center px-5"
          style={{ background: "rgba(2,8,20,0.75)", backdropFilter: "blur(6px)" }}
          onClick={kapat}
        >
          <motion.div
            initial={{ scale: 0.9, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 10, opacity: 0 }}
            transition={{ type: "spring", damping: 22, stiffness: 260 }}
            className="relative max-w-lg w-full rounded-[28px] p-7 sm:p-9 border-2"
            style={{ background: "#0B1B3A", borderColor: "#FFD500" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={kapat} aria-label="Kapat" className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-[#14264D] transition-colors" style={{ color: "#8FA0BC" }}>
              <X size={20} />
            </button>
            <div className="flex items-center gap-2 mb-4">
              <Megaphone size={18} style={{ color: "#FFD500" }} />
              <span className="text-xs font-semibold uppercase tracking-widest rounded-full px-3 py-1" style={{ background: "#FFD500", color: "#06122B" }}>
                Yeni Duyuru
              </span>
            </div>
            <h3 className="font-medium mb-3" style={{ color: "#DDE6F2", fontSize: "clamp(1.1rem, 3vw, 1.4rem)" }}>
              {duyuru.baslik}
            </h3>
            <p className="font-light leading-relaxed mb-6" style={{ color: "#8FA0BC", fontSize: "0.95rem" }}>
              {duyuru.ozet}
            </p>
            <a
              href="#duyurular"
              onClick={kapat}
              className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-widest rounded-full px-6 py-3"
              style={{ background: "#FFD500", color: "#06122B" }}
            >
              Tüm Duyurular <ArrowRight size={15} />
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* Harf harf açılan hero başlığı */
function HeroBaslik({ metin }) {
  return (
    <h1 className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap text-center text-[16.5vw] sm:text-[17.5vw]" aria-label={metin}>
      {metin.split("").map((harf, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: "0.35em", filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 0.12 + i * 0.055, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {harf}
        </motion.span>
      ))}
    </h1>
  );
}

export default function Home() {
  const [ulkeFiltre, setUlkeFiltre] = useState("Tümü");
  const [turFiltre, setTurFiltre] = useState("Tümü");
  const [arama, setArama] = useState("");

  const ulkeler = ["Tümü", ...[...new Set(PARTNERLER.map((p) => p.ulke))].sort()];
  const turler = ["Tümü", "Öğrenim", "Staj", "Ders Verme", "Eğitim Alma"];

  const filtreli = PARTNERLER.filter((p) => {
    const q = arama.toLocaleLowerCase("tr");
    return (
      (ulkeFiltre === "Tümü" || p.ulke === ulkeFiltre) &&
      (turFiltre === "Tümü" || p.turler.includes(turFiltre)) &&
      (q === "" || p.universite.toLocaleLowerCase("tr").includes(q) || p.sehir.toLocaleLowerCase("tr").includes(q) || p.alan.toLocaleLowerCase("tr").includes(q))
    );
  });

  return (
    <div style={{ overflowX: "clip" }}>
      <PopupDuyuru />

      {/* ==================== HERO ==================== */}
      <section className="min-h-screen flex flex-col justify-center pt-20 pb-10">
        <div className="overflow-hidden">
          <HeroBaslik metin="Erasmus+" />
        </div>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...gecis, delay: 0.8 }}
          className="text-center font-medium uppercase tracking-[0.35em] mt-5 px-4"
          style={{ color: "#FFD500", fontSize: "clamp(0.7rem, 1.6vw, 1.2rem)" }}
        >
          Fenerbahçe Üniversitesi
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...gecis, delay: 0.95 }}
          className="text-center font-light max-w-md mx-auto mt-6 px-6 leading-relaxed"
          style={{ color: "#8FA0BC", fontSize: "clamp(0.9rem, 1.8vw, 1.1rem)" }}
        >
          Avrupa'da eğitim, staj ve akademik iş birliği için kapınız. Hareketlilik türünü seç, yolculuğuna başla.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...gecis, delay: 1.1 }}
          className="flex justify-center mt-9"
        >
          <a
            href="#hareketlilik"
            className="rounded-full px-9 py-3.5 sm:px-11 sm:py-4 text-xs sm:text-sm font-medium uppercase tracking-widest text-white"
            style={{
              background: "linear-gradient(123deg, #001030 7%, #163962 45%, #1F5FA8 72%, #FFD500 130%)",
              boxShadow: "0 4px 4px rgba(22,57,98,.25), 4px 4px 12px #1F5FA8 inset",
              outline: "2px solid #fff",
              outlineOffset: "-3px",
            }}
          >
            Keşfet
          </a>
        </motion.div>

        {/* İstatistikler */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto w-full mt-16 sm:mt-20 px-6">
          {ISTATISTIKLER.map((s) => (
            <Sayac key={s.etiket} {...s} />
          ))}
        </div>
      </section>

      {/* ==================== SARI MARQUEE ==================== */}
      <div className="py-4 sm:py-5 overflow-hidden -rotate-1" style={{ background: "#FFD500" }}>
        <div className="marquee-ic flex whitespace-nowrap" style={{ width: "max-content" }}>
          {[0, 1].map((k) => (
            <span key={k} className="font-black uppercase tracking-tight" style={{ color: "#06122B", fontSize: "clamp(1.1rem, 2.6vw, 1.8rem)" }}>
              {"Öğrenim • Staj • Ders Verme • Eğitim Alma • KA131 • Avrupa Seni Bekliyor • ".repeat(3)}
            </span>
          ))}
        </div>
      </div>

      {/* ==================== HAREKETLİLİK ==================== */}
      <section id="hareketlilik" className="px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-28">
        <FadeIn y={40}>
          <h2 className="hero-heading font-black uppercase text-center leading-none tracking-tight mb-5" style={{ fontSize: "clamp(2.4rem, 9vw, 130px)" }}>
            Hareketlilik
          </h2>
        </FadeIn>
        <FadeIn delay={0.1} y={20}>
          <p className="text-center font-light max-w-2xl mx-auto mb-14 sm:mb-18 leading-relaxed" style={{ color: "#8FA0BC", fontSize: "clamp(0.9rem, 1.8vw, 1.15rem)" }}>
            Dört hareketlilik türü, dört ayrı yol. Kartına tıkla, başvuru koşullarından belge listesine her detayı gör.
          </p>
        </FadeIn>

        <div className="max-w-5xl mx-auto grid sm:grid-cols-2 gap-5">
          {HAREKETLILIK.map((h, i) => {
            const Ikon = IKONLAR[h.slug];
            return (
              <FadeIn key={h.slug} delay={i * 0.08} y={30}>
                <Link
                  to={`/hareketlilik/${h.slug}`}
                  className="group block rounded-[28px] sm:rounded-[34px] p-7 sm:p-9 border-2 transition-colors duration-200 h-full hover:border-[#FFD500]"
                  style={{ background: "#0B1B3A", borderColor: "#14264D" }}
                >
                  <div className="flex items-start justify-between mb-6">
                    <span className="font-black leading-none" style={{ color: "#14264D", fontSize: "clamp(3rem, 8vw, 5rem)" }}>
                      {h.no}
                    </span>
                    <span className="text-xs font-semibold rounded-full px-3 py-1 uppercase tracking-widest" style={{ background: "#163962", color: "#FFD500" }}>
                      {h.grup} · {h.kod}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <Ikon size={24} style={{ color: "#FFD500" }} />
                    <h3 className="font-medium uppercase" style={{ color: "#DDE6F2", fontSize: "clamp(1rem, 2.2vw, 1.35rem)" }}>
                      {h.ad}
                    </h3>
                  </div>
                  <p className="font-light leading-relaxed mb-5" style={{ color: "#8FA0BC", fontSize: "clamp(0.85rem, 1.6vw, 1rem)" }}>
                    {h.kisa}
                  </p>
                  <span className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-widest transition-transform duration-200 group-hover:translate-x-1" style={{ color: "#FFD500" }}>
                    Detaylar <ArrowRight size={15} />
                  </span>
                </Link>
              </FadeIn>
            );
          })}
        </div>
      </section>

      {/* ==================== DUYURULAR ==================== */}
      <section id="duyurular" className="px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-28 rounded-t-[40px] sm:rounded-t-[50px]" style={{ background: "#0B1B3A" }}>
        <FadeIn y={40}>
          <h2 className="hero-heading font-black uppercase text-center leading-none tracking-tight mb-14 sm:mb-18" style={{ fontSize: "clamp(2.4rem, 9vw, 130px)" }}>
            Duyurular
          </h2>
        </FadeIn>
        <div className="max-w-4xl mx-auto flex flex-col gap-5">
          {DUYURULAR.map((d, i) => (
            <FadeIn key={i} delay={i * 0.07} y={30}>
              <article className="rounded-[24px] sm:rounded-[30px] p-6 sm:p-8 border-2 transition-colors duration-200 hover:border-[#FFD500]" style={{ borderColor: "#14264D", background: "#06122B" }}>
                <div className="flex flex-wrap items-center gap-2.5 mb-3">
                  <Megaphone size={15} style={{ color: "#FFD500" }} />
                  <span className="flex items-center gap-1.5 text-xs sm:text-sm font-light" style={{ color: "#8FA0BC" }}>
                    <Calendar size={13} /> {d.tarih}
                  </span>
                  <span className="text-xs font-medium uppercase tracking-widest rounded-full px-3 py-1" style={{ background: "#14264D", color: "#DDE6F2" }}>
                    {d.etiket}
                  </span>
                  {d.yeni && (
                    <span className="text-xs font-semibold uppercase tracking-widest rounded-full px-3 py-1" style={{ background: "#FFD500", color: "#06122B" }}>
                      Yeni
                    </span>
                  )}
                </div>
                <h3 className="font-medium mb-2" style={{ color: "#DDE6F2", fontSize: "clamp(1.05rem, 2.2vw, 1.45rem)" }}>
                  {d.baslik}
                </h3>
                <p className="font-light leading-relaxed" style={{ color: "#8FA0BC", fontSize: "clamp(0.85rem, 1.6vw, 1rem)" }}>
                  {d.ozet}
                </p>
              </article>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ==================== PARTNERLER ==================== */}
      <section id="partnerler" className="px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-28" style={{ background: "#0B1B3A" }}>
        <FadeIn y={40}>
          <h2 className="hero-heading font-black uppercase text-center leading-none tracking-tight mb-5" style={{ fontSize: "clamp(2.1rem, 8vw, 110px)" }}>
            Partnerler
          </h2>
        </FadeIn>
        <FadeIn delay={0.1} y={20}>
          <p className="text-center font-light max-w-2xl mx-auto mb-10 leading-relaxed" style={{ color: "#8FA0BC", fontSize: "clamp(0.9rem, 1.8vw, 1.1rem)" }}>
            İkili anlaşmamız bulunan üniversiteler. Ülkeye ve hareketlilik türüne göre filtreleyin.
          </p>
        </FadeIn>

        <FadeIn delay={0.15} y={20}>
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row gap-3 mb-8">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "#8FA0BC" }} />
              <input
                type="text"
                placeholder="Üniversite, şehir veya alan ara..."
                value={arama}
                onChange={(e) => setArama(e.target.value)}
                className="w-full rounded-full pl-11 pr-5 py-3.5 text-sm font-light outline-none border-2 focus:border-[#FFD500] transition-colors"
                style={{ background: "#06122B", borderColor: "#14264D", color: "#DDE6F2" }}
              />
            </div>
            <select value={ulkeFiltre} onChange={(e) => setUlkeFiltre(e.target.value)} className="rounded-full px-5 py-3.5 text-sm font-medium uppercase tracking-wider outline-none border-2 cursor-pointer" style={{ background: "#06122B", borderColor: "#14264D", color: "#DDE6F2" }}>
              {ulkeler.map((u) => <option key={u} value={u}>{u === "Tümü" ? "Ülke: Tümü" : u}</option>)}
            </select>
            <select value={turFiltre} onChange={(e) => setTurFiltre(e.target.value)} className="rounded-full px-5 py-3.5 text-sm font-medium uppercase tracking-wider outline-none border-2 cursor-pointer" style={{ background: "#06122B", borderColor: "#14264D", color: "#DDE6F2" }}>
              {turler.map((t) => <option key={t} value={t}>{t === "Tümü" ? "Tür: Tümü" : t}</option>)}
            </select>
          </div>
        </FadeIn>

        <div className="max-w-5xl mx-auto">
          <p className="text-xs uppercase tracking-widest font-light mb-2" style={{ color: "#8FA0BC" }}>
            {filtreli.length} üniversite listeleniyor
          </p>
          {filtreli.length === 0 && (
            <p className="font-light py-10 text-center" style={{ color: "#8FA0BC" }}>
              Bu filtrelerle eşleşen üniversite yok. Filtreleri sıfırlayıp tekrar deneyin.
            </p>
          )}
          {filtreli.map((p) => (
            <div key={p.universite} className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6 py-6" style={{ borderBottom: "1px solid #14264D" }}>
              <div className="flex-1">
                <h3 className="font-medium" style={{ color: "#DDE6F2", fontSize: "clamp(1rem, 2vw, 1.3rem)" }}>{p.universite}</h3>
                <p className="flex items-center gap-1.5 font-light text-sm mt-1" style={{ color: "#8FA0BC" }}>
                  <MapPin size={13} /> {p.sehir}, {p.ulke} · {p.alan}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {p.turler.map((t) => (
                  <span key={t} className="text-xs font-medium uppercase tracking-wider rounded-full px-3 py-1.5 border" style={{ background: "#06122B", color: "#DDE6F2", borderColor: "#14264D" }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==================== İLETİŞİM ==================== */}
      <section id="iletisim" className="px-5 sm:px-8 md:px-10 py-20 sm:py-24 rounded-t-[40px] sm:rounded-t-[50px]" style={{ background: "#FFD500" }}>
        <FadeIn y={40}>
          <h2 className="font-black uppercase text-center leading-none tracking-tight mb-8" style={{ color: "#06122B", fontSize: "clamp(2.1rem, 8vw, 110px)" }}>
            İletişim
          </h2>
        </FadeIn>
        <FadeIn delay={0.15} y={20}>
          <div className="max-w-xl mx-auto text-center flex flex-col gap-2.5">
            <p className="font-semibold uppercase tracking-wider" style={{ color: "#06122B" }}>{ILETISIM.birim}</p>
            <p className="font-light" style={{ color: "#06122B", opacity: 0.7 }}>{ILETISIM.adres}</p>
            <a href={`mailto:${ILETISIM.eposta}`} className="font-medium underline underline-offset-4" style={{ color: "#06122B" }}>
              {ILETISIM.eposta}
            </a>
          </div>
        </FadeIn>
        <p className="text-center text-xs font-light uppercase tracking-widest mt-14" style={{ color: "#06122B", opacity: 0.5 }}>
          © 2026 Fenerbahçe Üniversitesi Erasmus+ Koordinatörlüğü
        </p>
      </section>
    </div>
  );
}
