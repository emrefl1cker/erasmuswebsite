import { useEffect, lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Home from "./Home.jsx";
import HareketlilikSayfa from "./HareketlilikSayfa.jsx";
import SayfaGoster from "./SayfaGoster.jsx";

/* Admin paneli tembel yüklenir: siteye girenler onun kodunu indirmez */
const AdminSayfa = lazy(() => import("./AdminSayfa.jsx"));

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
  const konum = useLocation();
  const adminde = konum.pathname.startsWith("/admin");

  return (
    <div style={{ background: "#06122B", fontFamily: "'Kanit', sans-serif", minHeight: "100vh" }}>
      <ScrollDuzelt />
      {!adminde && <Navbar />}
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center" style={{ color: "#8FA0BC" }}>Panel yükleniyor...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hareketlilik/:tur" element={<HareketlilikSayfa />} />
          <Route path="/sayfa/:slug" element={<SayfaGoster />} />
          <Route path="/admin/*" element={<AdminSayfa />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Suspense>
    </div>
  );
}
