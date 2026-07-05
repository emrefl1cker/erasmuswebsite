import { useState, useEffect } from "react";
import { createClient } from "@sanity/client";
import { projectId, dataset, cmsAktif } from "./ayarlar.js";
import { DUYURULAR, PARTNERLER, ISTATISTIKLER } from "../data.js";

export const client = cmsAktif
  ? createClient({ projectId, dataset, apiVersion: "2024-01-01", useCdn: true })
  : null;

/* Genel amaçlı: CMS'ten çek, boşsa/hata varsa yedeğe (data.js) düş */
function useCmsListe(sorgu, yedek, donustur) {
  const [veri, setVeri] = useState(yedek);
  useEffect(() => {
    if (!cmsAktif) return;
    let iptal = false;
    client
      .fetch(sorgu)
      .then((r) => {
        if (!iptal && Array.isArray(r) && r.length > 0) setVeri(donustur ? r.map(donustur) : r);
      })
      .catch(() => {});
    return () => { iptal = true; };
  }, [sorgu]);
  return veri;
}

const tarihBicimle = (iso) => {
  if (!iso) return "";
  const [y, a, g] = iso.split("-");
  return `${g}.${a}.${y}`;
};

export function useDuyurular() {
  return useCmsListe(
    `*[_type=="duyuru"]|order(tarih desc){baslik, ozet, etiket, yeni, popup, tarih}`,
    DUYURULAR,
    (d) => ({ ...d, tarih: tarihBicimle(d.tarih) })
  );
}

export function usePartnerler() {
  return useCmsListe(
    `*[_type=="partner"]|order(universite asc){universite, ulke, sehir, alan, "turler": coalesce(turler, [])}`,
    PARTNERLER
  );
}

export function useIstatistikler() {
  return useCmsListe(
    `*[_type=="istatistik"]|order(sira asc){etiket, deger, "ek": coalesce(ek, "")}`,
    ISTATISTIKLER
  );
}

export function useSayfalar() {
  return useCmsListe(
    `*[_type=="sayfa" && defined(slug.current)]|order(sira asc){baslik, "slug": slug.current}`,
    []
  );
}

export function useSayfaIcerik(slug) {
  const [veri, setVeri] = useState(undefined); // undefined = yükleniyor
  useEffect(() => {
    if (!cmsAktif) { setVeri(null); return; }
    client
      .fetch(`*[_type=="sayfa" && slug.current==$slug][0]{baslik, icerik}`, { slug })
      .then((r) => setVeri(r || null))
      .catch(() => setVeri(null));
  }, [slug]);
  return veri;
}
