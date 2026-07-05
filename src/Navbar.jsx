import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { HAREKETLILIK } from "./data.js";

export default function Navbar() {
  const [mobilAcik, setMobilAcik] = useState(false);
  const [dropAcik, setDropAcik] = useState(false);
  const [mobilDropAcik, setMobilDropAcik] = useState(false);
  const konum = useLocation();

  const anaSayfaLink = (hash) => (konum.pathname === "/" ? hash : `/${hash}`);

  const kapat = () => {
    setMobilAcik(false);
    setMobilDropAcik(false);
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-5 md:px-10 py-4 md:py-5"
        style={{ background: "rgba(6,18,43,0.85)", backdropFilter: "blur(12px)", borderBottom: "1px solid #14264D" }}
      >
        <Link to="/" onClick={kapat} className="flex items-center rounded-full px-3.5 py-1.5" style={{ background: "#FFFFFF" }}>
          <img src="/fbu-logo.png" alt="Fenerbahçe Üniversitesi" className="h-8 md:h-9 w-auto" />
        </Link>

        {/* Masaüstü menü */}
        <div className="hidden md:flex items-center gap-8">
          <div className="relative" onMouseEnter={() => setDropAcik(true)} onMouseLeave={() => setDropAcik(false)}>
            <button
              className="flex items-center gap-1.5 text-sm lg:text-base font-medium uppercase tracking-wider hover:opacity-70 transition-opacity"
              style={{ color: "#DDE6F2" }}
              onClick={() => setDropAcik((v) => !v)}
            >
              Hareketlilik <ChevronDown size={15} style={{ transform: dropAcik ? "rotate(180deg)" : "none", transition: "transform .2s" }} />
            </button>
            <AnimatePresence>
              {dropAcik && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.18 }}
                  className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-72"
                >
                  <div className="rounded-2xl overflow-hidden border" style={{ background: "#0B1B3A", borderColor: "#14264D" }}>
                    {HAREKETLILIK.map((h) => (
                      <Link
                        key={h.slug}
                        to={`/hareketlilik/${h.slug}`}
                        className="flex items-center justify-between px-5 py-3.5 text-sm font-medium hover:bg-[#14264D] transition-colors"
                        style={{ color: "#DDE6F2" }}
                      >
                        {h.ad.replace("Hareketliliği", "")}
                        <span className="text-xs font-semibold rounded-full px-2 py-0.5" style={{ background: "#163962", color: "#FFD500" }}>
                          {h.kod}
                        </span>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {[
            ["Partnerler", "#partnerler"],
            ["İletişim", "#iletisim"],
          ].map(([ad, hash]) => (
            <a
              key={ad}
              href={anaSayfaLink(hash)}
              className="text-sm lg:text-base font-medium uppercase tracking-wider hover:opacity-70 transition-opacity"
              style={{ color: "#DDE6F2" }}
            >
              {ad}
            </a>
          ))}
        </div>

        {/* Mobil hamburger */}
        <button className="md:hidden p-2 -mr-2" onClick={() => setMobilAcik((v) => !v)} aria-label="Menü" style={{ color: "#DDE6F2" }}>
          {mobilAcik ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {/* Mobil tam ekran menü */}
      <AnimatePresence>
        {mobilAcik && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-30 flex flex-col justify-center px-8 gap-2 md:hidden"
            style={{ background: "#06122B" }}
          >
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 }}
              onClick={() => setMobilDropAcik((v) => !v)}
              className="flex items-center gap-2 text-3xl font-black uppercase tracking-tight py-3 text-left"
              style={{ color: "#DDE6F2" }}
            >
              Hareketlilik <ChevronDown size={26} style={{ transform: mobilDropAcik ? "rotate(180deg)" : "none", transition: "transform .2s", color: "#FFD500" }} />
            </motion.button>
            <AnimatePresence>
              {mobilDropAcik && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden flex flex-col pl-4"
                  style={{ borderLeft: "2px solid #FFD500" }}
                >
                  {HAREKETLILIK.map((h) => (
                    <Link
                      key={h.slug}
                      to={`/hareketlilik/${h.slug}`}
                      onClick={kapat}
                      className="py-2.5 text-lg font-medium uppercase tracking-wide"
                      style={{ color: "#8FA0BC" }}
                    >
                      {h.ad.replace("Hareketliliği", "")}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
            {[
              ["Partnerler", "#partnerler"],
              ["İletişim", "#iletisim"],
            ].map(([ad, hash], i) => (
              <motion.a
                key={ad}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.06 }}
                href={anaSayfaLink(hash)}
                onClick={kapat}
                className="text-3xl font-black uppercase tracking-tight py-3"
                style={{ color: "#DDE6F2" }}
              >
                {ad}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
