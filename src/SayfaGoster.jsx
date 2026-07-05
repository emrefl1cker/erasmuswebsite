import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { PortableText } from "@portabletext/react";
import { ArrowLeft } from "lucide-react";
import { useSayfaIcerik } from "./sanity/veri.js";

const bilesenler = {
  block: {
    h2: ({ children }) => <h2 className="font-black uppercase mt-8 mb-3" style={{ color: "#FFD500", fontSize: "clamp(1.3rem, 3vw, 1.9rem)" }}>{children}</h2>,
    h3: ({ children }) => <h3 className="font-medium uppercase mt-6 mb-2" style={{ color: "#DDE6F2", fontSize: "clamp(1.1rem, 2.4vw, 1.4rem)" }}>{children}</h3>,
    normal: ({ children }) => <p className="font-light leading-relaxed mb-4" style={{ color: "#DDE6F2", fontSize: "clamp(0.95rem, 1.8vw, 1.1rem)" }}>{children}</p>,
    blockquote: ({ children }) => <blockquote className="border-l-2 pl-4 my-4 italic font-light" style={{ borderColor: "#FFD500", color: "#8FA0BC" }}>{children}</blockquote>,
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc pl-6 mb-4 flex flex-col gap-1.5 font-light" style={{ color: "#DDE6F2" }}>{children}</ul>,
    number: ({ children }) => <ol className="list-decimal pl-6 mb-4 flex flex-col gap-1.5 font-light" style={{ color: "#DDE6F2" }}>{children}</ol>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold" style={{ color: "#FFD500" }}>{children}</strong>,
    link: ({ children, value }) => <a href={value?.href} target="_blank" rel="noreferrer" className="underline underline-offset-4" style={{ color: "#FFD500" }}>{children}</a>,
  },
};

export default function SayfaGoster() {
  const { slug } = useParams();
  const sayfa = useSayfaIcerik(slug);

  return (
    <div className="pt-24 md:pt-28 px-5 sm:px-8 md:px-10 pb-20 max-w-3xl mx-auto">
      <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-widest mb-8 hover:opacity-70 transition-opacity" style={{ color: "#8FA0BC" }}>
        <ArrowLeft size={15} /> Ana Sayfa
      </Link>
      {sayfa === undefined && <p className="font-light" style={{ color: "#8FA0BC" }}>Yükleniyor...</p>}
      {sayfa === null && <p className="font-light" style={{ color: "#8FA0BC" }}>Sayfa bulunamadı.</p>}
      {sayfa && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="hero-heading font-black uppercase leading-none tracking-tight mb-8" style={{ fontSize: "clamp(1.9rem, 6.5vw, 4rem)" }}>
            {sayfa.baslik}
          </h1>
          <PortableText value={sayfa.icerik} components={bilesenler} />
        </motion.div>
      )}
    </div>
  );
}
