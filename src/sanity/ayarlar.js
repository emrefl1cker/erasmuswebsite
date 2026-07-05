/* ============================================================
   SANITY AYARLARI — TEK YAPMAN GEREKEN BURAYI DOLDURMAK
   ------------------------------------------------------------
   1) sanity.io adresinde ücretsiz hesap aç (Google ile giriş)
   2) sanity.io/manage -> "Create new project" -> isim ver
   3) Açılan projenin "Project ID" değerini aşağıya yapıştır
      (8 haneli, örn: "ab12cd34")
   ============================================================ */
export const projectId = "k3kqvj9o";
export const dataset = "production";

// projectId girilmediyse site data.js'deki yedek içerikle çalışır
export const cmsAktif = projectId !== "BURAYA_PROJECT_ID" && projectId.length > 3;
