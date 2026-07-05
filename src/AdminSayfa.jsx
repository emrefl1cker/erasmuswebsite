import { Studio } from "sanity";
import config from "./sanity/config.js";
import { cmsAktif } from "./sanity/ayarlar.js";

export default function AdminSayfa() {
  if (!cmsAktif) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6" style={{ background: "#06122B" }}>
        <div className="max-w-lg rounded-[28px] p-8 border-2" style={{ background: "#0B1B3A", borderColor: "#FFD500" }}>
          <h1 className="font-black uppercase mb-4" style={{ color: "#FFD500", fontSize: "1.4rem" }}>
            Panel Henüz Bağlı Değil
          </h1>
          <ol className="flex flex-col gap-3 font-light leading-relaxed list-decimal pl-5" style={{ color: "#DDE6F2" }}>
            <li>sanity.io adresinde ücretsiz hesap aç (Google ile giriş yeterli)</li>
            <li>sanity.io/manage → <b>Create new project</b> → bir isim ver</li>
            <li>Projenin <b>Project ID</b> değerini kopyala</li>
            <li><code style={{ color: "#FFD500" }}>src/sanity/ayarlar.js</code> dosyasındaki <code style={{ color: "#FFD500" }}>BURAYA_PROJECT_ID</code> yazan yere yapıştır</li>
            <li>GitHub'a commit'le — Vercel yeniden kurunca bu sayfa panele dönüşecek</li>
          </ol>
        </div>
      </div>
    );
  }
  return (
    <div style={{ height: "100vh" }}>
      <Studio config={config} />
    </div>
  );
}
