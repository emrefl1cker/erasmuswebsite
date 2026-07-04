import { useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, CheckCircle2, FileText, ArrowRight } from "lucide-react";
import { HAREKETLILIK, ILETISIM } from "./data.js";

const SEKMELER = ["Genel Bakış", "Başvuru Koşulları", "Süreç", "Belgeler"];

export default function HareketlilikSayfa() {
  const { tur } = useParams();
  const veri = HAREKETLILIK.find((h) => h.slug === tur);
  const [sekme, setSekme] = useState(SEKMELER[0]);

  if (!veri) return <Navigate to="/" replace />;

  return (
    <div className="pt-24 md:pt-28 px-5 sm:px-8 md:px-10 pb-20 max-w-4xl mx-auto" style={{ overflowX: "clip" }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-widest mb-8 hover:opacity-70 transition-opacity" style={{ color: "#8FA0BC" }}>
          <ArrowLeft size={15} /> Ana Sayfa
        </Link>

        <div className="flex items-center gap-3 flex-wrap mb-3">
          <span className="text-xs font-semibold rounded-full px-3 py-1 uppercase tracking-widest" style={{ background: "#163962", color: "#FFD500" }}>
            {veri.grup} · {veri.kod}
          </span>
        </div>
        <h1 className="hero-heading font-black uppercase leading-none tracking-tight" style={{ fontSize: "clamp(1.9rem, 6.5vw, 4.2rem)" }}>
          {veri.ad}
        </h1>
        <p className="font-light leading-relaxed mt-4 max-w-2xl" style={{ color: "#8FA0BC", fontSize: "clamp(0.95rem, 1.8vw, 1.15rem)" }}>
          {veri.kisa}
        </p>
      </motion.div>

      {/* Sekmeler */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="flex gap-2 mt-10 mb-8 overflow-x-auto pb-1 -mx-5 px-5 sm:mx-0 sm:px-0"
      >
        {SEKMELER.map((s) => (
          <button
            key={s}
            onClick={() => setSekme(s)}
            className="relative shrink-0 rounded-full px-5 py-2.5 text-xs sm:text-sm font-medium uppercase tracking-wider transition-colors"
            style={{ color: sekme === s ? "#06122B" : "#DDE6F2" }}
          >
            {sekme === s && (
              <motion.span
                layoutId="sekme-arka"
                className="absolute inset-0 rounded-full"
                style={{ background: "#FFD500" }}
                transition={{ type: "spring", damping: 26, stiffness: 320 }}
              />
            )}
            <span className="relative z-10">{s}</span>
          </button>
        ))}
      </motion.div>

      {/* Sekme içeriği */}
      <AnimatePresence mode="wait">
        <motion.div
          key={sekme}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {sekme === "Genel Bakış" && (
            <div className="flex flex-col gap-5">
              {veri.genel.map((p, i) => (
                <p key={i} className="font-light leading-relaxed" style={{ color: "#DDE6F2", fontSize: "clamp(0.95rem, 1.8vw, 1.15rem)" }}>
                  {p}
                </p>
              ))}
            </div>
          )}

          {sekme === "Başvuru Koşulları" && (
            <ul className="flex flex-col gap-4">
              {veri.kosullar.map((k, i) => (
                <li key={i} className="flex items-start gap-3 rounded-2xl p-5 border" style={{ background: "#0B1B3A", borderColor: "#14264D" }}>
                  <CheckCircle2 size={20} className="shrink-0 mt-0.5" style={{ color: "#FFD500" }} />
                  <span className="font-light leading-relaxed" style={{ color: "#DDE6F2" }}>{k}</span>
                </li>
              ))}
            </ul>
          )}

          {sekme === "Süreç" && (
            <ol className="relative flex flex-col gap-6 pl-2">
              {veri.surec.map((a, i) => (
                <li key={i} className="relative flex gap-5">
                  <div className="flex flex-col items-center">
                    <span className="flex items-center justify-center w-10 h-10 rounded-full font-black shrink-0" style={{ background: "#FFD500", color: "#06122B" }}>
                      {i + 1}
                    </span>
                    {i < veri.surec.length - 1 && <span className="w-px flex-1 mt-1" style={{ background: "#14264D" }} />}
                  </div>
                  <div className="pb-2">
                    <h3 className="font-medium uppercase tracking-wide mb-1" style={{ color: "#DDE6F2" }}>{a.baslik}</h3>
                    <p className="font-light leading-relaxed text-sm sm:text-base" style={{ color: "#8FA0BC" }}>{a.detay}</p>
                  </div>
                </li>
              ))}
            </ol>
          )}

          {sekme === "Belgeler" && (
            <ul className="grid sm:grid-cols-2 gap-3">
              {veri.belgeler.map((b, i) => (
                <li key={i} className="flex items-center gap-3 rounded-2xl p-5 border" style={{ background: "#0B1B3A", borderColor: "#14264D" }}>
                  <FileText size={18} className="shrink-0" style={{ color: "#FFD500" }} />
                  <span className="font-light" style={{ color: "#DDE6F2" }}>{b}</span>
                </li>
              ))}
            </ul>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Alt CTA */}
      <div className="mt-14 rounded-[28px] p-7 sm:p-9 border-2 flex flex-col sm:flex-row sm:items-center gap-5 justify-between" style={{ background: "#0B1B3A", borderColor: "#14264D" }}>
        <div>
          <h3 className="font-medium uppercase tracking-wide mb-1" style={{ color: "#DDE6F2" }}>Sorunuz mu var?</h3>
          <p className="font-light text-sm" style={{ color: "#8FA0BC" }}>Başvuru süreciyle ilgili her konuda ofisimize yazabilirsiniz.</p>
        </div>
        <a
          href={`mailto:${ILETISIM.eposta}`}
          className="inline-flex items-center justify-center gap-2 shrink-0 rounded-full px-7 py-3.5 text-sm font-medium uppercase tracking-widest"
          style={{ background: "#FFD500", color: "#06122B" }}
        >
          {ILETISIM.eposta} <ArrowRight size={15} />
        </a>
      </div>
    </div>
  );
}
