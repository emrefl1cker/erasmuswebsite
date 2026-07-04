import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Home from "./Home.jsx";
import HareketlilikSayfa from "./HareketlilikSayfa.jsx";

/* Sayfa değişince en üste kaydır (hash varsa o bölüme) */
function ScrollDuzelt() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) { el.scrollIntoView({ behavior: "smooth" }); return; }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <div style={{ background: "#06122B", fontFamily: "'Kanit', sans-serif", minHeight: "100vh" }}>
      <ScrollDuzelt />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hareketlilik/:tur" element={<HareketlilikSayfa />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  );
}
