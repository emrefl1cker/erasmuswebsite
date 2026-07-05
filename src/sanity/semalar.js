/* Panelde görünecek içerik türleri (şemalar) */

export const duyuru = {
  name: "duyuru",
  title: "Duyurular",
  type: "document",
  fields: [
    { name: "baslik", title: "Başlık", type: "string", validation: (r) => r.required() },
    { name: "tarih", title: "Tarih", type: "date", validation: (r) => r.required() },
    {
      name: "etiket", title: "Etiket", type: "string",
      options: { list: ["Öğrenim", "Staj", "Personel", "Genel"] },
      initialValue: "Genel",
    },
    { name: "ozet", title: "Özet", type: "text", rows: 4 },
    { name: "yeni", title: '"YENİ" rozeti gösterilsin mi?', type: "boolean", initialValue: true },
    { name: "popup", title: "Site açılışında POP-UP olarak göster", type: "boolean", initialValue: false, description: "Aynı anda sadece bir duyuruda açık olmalı" },
  ],
  preview: {
    select: { title: "baslik", subtitle: "tarih" },
  },
};

export const partner = {
  name: "partner",
  title: "Partner Üniversiteler",
  type: "document",
  fields: [
    { name: "universite", title: "Üniversite Adı", type: "string", validation: (r) => r.required() },
    { name: "ulke", title: "Ülke", type: "string", validation: (r) => r.required() },
    { name: "sehir", title: "Şehir", type: "string" },
    { name: "alan", title: "Alan / Bölüm", type: "string" },
    {
      name: "turler", title: "Geçerli Hareketlilik Türleri", type: "array",
      of: [{ type: "string" }],
      options: { list: ["Öğrenim", "Staj", "Ders Verme", "Eğitim Alma"] },
    },
  ],
  preview: { select: { title: "universite", subtitle: "ulke" } },
};

export const sayfa = {
  name: "sayfa",
  title: "Sayfalar (Menü Sekmeleri)",
  type: "document",
  fields: [
    { name: "baslik", title: "Sayfa Başlığı (menüde görünür)", type: "string", validation: (r) => r.required() },
    { name: "slug", title: "Adres (slug)", type: "slug", options: { source: "baslik" }, validation: (r) => r.required(), description: '"Generate" butonuna bas, otomatik oluşur' },
    { name: "sira", title: "Menüdeki Sırası", type: "number", initialValue: 1 },
    {
      name: "icerik", title: "Sayfa İçeriği", type: "array",
      of: [{ type: "block" }, { type: "image", options: { hotspot: true } }],
    },
  ],
  preview: { select: { title: "baslik" } },
};

export const istatistik = {
  name: "istatistik",
  title: "İstatistikler (Ana Sayfa Sayaçları)",
  type: "document",
  fields: [
    { name: "etiket", title: "Etiket (örn. Partner Üniversite)", type: "string", validation: (r) => r.required() },
    { name: "deger", title: "Sayı", type: "number", validation: (r) => r.required() },
    { name: "ek", title: "Ek işaret (örn. +)", type: "string", initialValue: "" },
    { name: "sira", title: "Sırası", type: "number", initialValue: 1 },
  ],
  preview: { select: { title: "etiket", subtitle: "deger" } },
};

export const semalar = [duyuru, partner, sayfa, istatistik];
