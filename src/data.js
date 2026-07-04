/* ============================================================
   TÜM SİTE İÇERİĞİ BU DOSYADA — BURADAN DÜZENLE
   ============================================================ */

// ==================== DUYURULAR ====================
// yeni: true  -> "YENİ" rozeti
// popup: true -> site açılınca pop-up olarak gösterilir (SADECE BİRİNE ver)
export const DUYURULAR = [
  {
    tarih: "01.07.2026",
    etiket: "Öğrenim",
    baslik: "2026-2027 Güz Dönemi Öğrenim Hareketliliği Başvuruları Açıldı",
    ozet: "KA131 kapsamında 2026-2027 Güz dönemi öğrenci öğrenim hareketliliği başvuruları Turna Portal üzerinden alınmaya başlanmıştır. Son başvuru tarihi 25 Temmuz 2026.",
    yeni: true,
    popup: true,
  },
  {
    tarih: "20.06.2026",
    etiket: "Staj",
    baslik: "Yaz Dönemi Staj Hareketliliği Sonuçları Açıklandı",
    ozet: "Staj hareketliliği değerlendirme sonuçları ilan edilmiştir. Asil ve yedek listeler için duyuru ekini inceleyiniz. Feragat süresi 5 iş günüdür.",
    yeni: true,
    popup: false,
  },
  {
    tarih: "10.06.2026",
    etiket: "Personel",
    baslik: "Personel Ders Verme ve Eğitim Alma Hareketliliği Çağrısı",
    ozet: "Akademik ve idari personelimiz için 2026-2027 dönemi ders verme (STA) ve eğitim alma (STT) hareketliliği başvuru çağrısı yayımlanmıştır.",
    yeni: false,
    popup: false,
  },
  {
    tarih: "28.05.2026",
    etiket: "Genel",
    baslik: "Erasmus+ Bilgilendirme Toplantısı",
    ozet: "Tüm öğrencilerimize açık Erasmus+ genel bilgilendirme toplantısı konferans salonunda gerçekleştirilecektir. Katılım için kayıt gerekmemektedir.",
    yeni: false,
    popup: false,
  },
];

// ==================== SAYAÇLAR (örnek veriler — gerçekleriyle değiştir) ====================
export const ISTATISTIKLER = [
  { deger: 40, ek: "+", etiket: "Partner Üniversite" },
  { deger: 15, ek: "", etiket: "Ülke" },
  { deger: 200, ek: "+", etiket: "Giden Öğrenci" },
  { deger: 4, ek: "", etiket: "Hareketlilik Türü" },
];

// ==================== PARTNER ÜNİVERSİTELER ====================
export const PARTNERLER = [
  { universite: "Politehnica University of Bucharest", ulke: "Romanya", sehir: "Bükreş", alan: "Mühendislik", turler: ["Öğrenim", "Ders Verme", "Eğitim Alma"] },
  { universite: "Warsaw University of Technology", ulke: "Polonya", sehir: "Varşova", alan: "Mühendislik", turler: ["Öğrenim", "Ders Verme"] },
  { universite: "University of Lodz", ulke: "Polonya", sehir: "Lodz", alan: "İşletme ve Ekonomi", turler: ["Öğrenim", "Staj", "Eğitim Alma"] },
  { universite: "Leipzig University", ulke: "Almanya", sehir: "Leipzig", alan: "Sosyal Bilimler", turler: ["Öğrenim", "Ders Verme"] },
  { universite: "Hochschule Bremen", ulke: "Almanya", sehir: "Bremen", alan: "İşletme ve Ekonomi", turler: ["Öğrenim", "Staj"] },
  { universite: "Transilvania University of Brasov", ulke: "Romanya", sehir: "Braşov", alan: "Sağlık Bilimleri", turler: ["Öğrenim", "Eğitim Alma"] },
  { universite: "University of Porto", ulke: "Portekiz", sehir: "Porto", alan: "Mimarlık ve Tasarım", turler: ["Öğrenim", "Ders Verme"] },
  { universite: "Vilnius Tech", ulke: "Litvanya", sehir: "Vilnius", alan: "Mühendislik", turler: ["Öğrenim", "Staj", "Ders Verme", "Eğitim Alma"] },
  { universite: "University of Pécs", ulke: "Macaristan", sehir: "Pécs", alan: "Sağlık Bilimleri", turler: ["Öğrenim", "Ders Verme"] },
  { universite: "Masaryk University", ulke: "Çekya", sehir: "Brno", alan: "Psikoloji", turler: ["Öğrenim", "Eğitim Alma"] },
];

// ==================== HAREKETLİLİK SAYFALARI ====================
// Her tür kendi sayfasına sahip: /hareketlilik/<slug>
// Sekme içerikleri: genel, kosullar, surec, belgeler
export const HAREKETLILIK = [
  {
    slug: "ogrenim",
    no: "01",
    ad: "Öğrenci Öğrenim Hareketliliği",
    kod: "SMS",
    grup: "Öğrenci",
    kisa: "Anlaşmalı bir Avrupa üniversitesinde 1-2 dönem eğitim alın. Dersleriniz Öğrenim Anlaşması ile tanınır, dönem kaybı yaşamazsınız.",
    genel: [
      "Öğrenim hareketliliği, kayıtlı olduğunuz programın en az bir dönemini ikili anlaşmamız bulunan bir Avrupa üniversitesinde geçirmenizi sağlar. Faaliyet süresi 3 ile 12 ay arasındadır.",
      "Gittiğiniz üniversitede aldığınız dersler, hareketlilik öncesinde imzalanan Öğrenim Anlaşması (Learning Agreement) ile güvence altına alınır ve dönüşünüzde diploma programınıza sayılır.",
      "Hareketlilik süresince aylık hibe desteği alırsınız; hibe miktarı gidilen ülkenin yaşam maliyetine göre belirlenir.",
    ],
    kosullar: [
      "Fenerbahçe Üniversitesi'nde örgün eğitim kademelerinden birinde kayıtlı olmak",
      "Lisans öğrencileri için en az 2.20, lisansüstü için en az 2.50 GNO",
      "Başvuru döneminde açılan çağrıda belirtilen yabancı dil puanını sağlamak",
      "Gidilecek üniversite ile bölümünüz arasında geçerli ikili anlaşma bulunması",
    ],
    surec: [
      { baslik: "Başvuru", detay: "İlan döneminde Turna Portal üzerinden başvurunuzu yapın." },
      { baslik: "Değerlendirme", detay: "GNO %50 + yabancı dil puanı %50 ile ağırlıklı puanınız hesaplanır." },
      { baslik: "Yerleştirme", detay: "Puan sıralamasına göre tercihlerinize yerleştirilirsiniz." },
      { baslik: "Öğrenim Anlaşması", detay: "Bölüm koordinatörünüzle ders eşleştirmesi yapıp anlaşmayı imzalatın." },
      { baslik: "Hareketlilik", detay: "Hibe sözleşmenizi imzalayın, vize sürecini tamamlayın ve yola çıkın." },
    ],
    belgeler: ["Transkript", "Yabancı dil sınav sonucu", "Öğrenim Anlaşması (Learning Agreement)", "Hibe sözleşmesi", "Kabul mektubu (Letter of Acceptance)"],
  },
  {
    slug: "staj",
    no: "02",
    ad: "Öğrenci Staj Hareketliliği",
    kod: "SMP",
    grup: "Öğrenci",
    kisa: "Avrupa'daki bir işletme veya kurumda 2-12 ay staj yapın. Mezuniyet sonrası 12 ay içinde de kullanılabilir.",
    genel: [
      "Staj hareketliliği, alanınızla ilgili bir Avrupa işletmesinde, araştırma merkezinde veya üniversitede tam zamanlı staj yapmanızı sağlar. Süre 2 ile 12 ay arasındadır.",
      "Staj yerini öğrenci kendisi bulur; ofisimiz kabul belgesi ve anlaşma süreçlerinde destek olur. ErasmusIntern.org gibi platformlar iyi bir başlangıç noktasıdır.",
      "Staj hibesi, öğrenim hibesinden daha yüksektir. Mezuniyet tarihinden itibaren 12 ay içinde tamamlanmak şartıyla mezunlar da faydalanabilir (başvuru son sınıfta yapılmalıdır).",
    ],
    kosullar: [
      "Fenerbahçe Üniversitesi'nde kayıtlı öğrenci olmak (veya son sınıfta başvurmuş mezun)",
      "Lisans için en az 2.20, lisansüstü için en az 2.50 GNO",
      "Çağrıda belirtilen yabancı dil şartını sağlamak",
      "Staj yapılacak kurumdan kabul mektubu almak",
    ],
    surec: [
      { baslik: "Staj yeri bulma", detay: "Alanınıza uygun kurumla iletişime geçip kabul mektubu alın." },
      { baslik: "Başvuru", detay: "İlan döneminde Turna Portal üzerinden başvurun." },
      { baslik: "Değerlendirme", detay: "GNO + dil puanı ağırlıklı sıralamayla seçim yapılır." },
      { baslik: "Staj Anlaşması", detay: "Learning Agreement for Traineeships üç taraflı imzalanır." },
      { baslik: "Hareketlilik", detay: "Hibe sözleşmesi ve vize sonrası staja başlayın." },
    ],
    belgeler: ["Transkript", "Yabancı dil sınav sonucu", "Kabul mektubu", "Staj Anlaşması (LA for Traineeships)", "Hibe sözleşmesi"],
  },
  {
    slug: "ders-verme",
    no: "03",
    ad: "Personel Ders Verme Hareketliliği",
    kod: "STA",
    grup: "Personel",
    kisa: "Akademik personelimizin anlaşmalı bir Avrupa üniversitesinde ders vermesi. Uluslararası iş birliğinin temel aracı.",
    genel: [
      "Ders verme hareketliliği, akademik personelin ikili anlaşmamız bulunan bir partner üniversitede ders vermesini kapsar. Faaliyet süresi seyahat hariç 2-5 gündür.",
      "Faaliyet süresince en az 8 saat ders verme zorunluluğu vardır. Ders programı, Personel Hareketliliği Anlaşması (Mobility Agreement) ile önceden onaylanır.",
      "Katılımcılara günlük hibe ve mesafeye göre hesaplanan seyahat desteği ödenir.",
    ],
    kosullar: [
      "Fenerbahçe Üniversitesi'nde tam veya yarı zamanlı akademik personel olmak",
      "Gidilecek üniversite ile ilgili alanda ikili anlaşma bulunması",
      "En az 8 saatlik ders programının karşı kurumca onaylanması",
    ],
    surec: [
      { baslik: "Davet ve program", detay: "Partner üniversiteden davet mektubu ve ders programı onayı alın." },
      { baslik: "Başvuru", detay: "Çağrı döneminde başvuru formu ve Mobility Agreement ile başvurun." },
      { baslik: "Değerlendirme", detay: "Ofis, çağrıda ilan edilen önceliklendirme kriterlerine göre seçim yapar." },
      { baslik: "Hareketlilik", detay: "Hibe sözleşmesi sonrası faaliyeti gerçekleştirin, katılım sertifikanızı alın." },
    ],
    belgeler: ["Davet mektubu", "Mobility Agreement (Ders Verme)", "Hibe sözleşmesi", "Katılım sertifikası", "Seyahat belgeleri"],
  },
  {
    slug: "egitim-alma",
    no: "04",
    ad: "Personel Eğitim Alma Hareketliliği",
    kod: "STT",
    grup: "Personel",
    kisa: "Akademik ve idari personelin yurt dışında eğitim, iş başı gözlem veya staff week etkinliklerine katılımı.",
    genel: [
      "Eğitim alma hareketliliği, personelin mesleki gelişimi için yurt dışındaki bir kurumda eğitim almasını, iş başı gözlem (job shadowing) yapmasını veya staff week etkinliklerine katılmasını kapsar. Süre seyahat hariç 2-5 gündür.",
      "Bu hareketlilik türü idari personele de açıktır ve birçok kurumda idari personel önceliklendirilir.",
      "Konferans katılımı bu kapsamda desteklenmez; faaliyetin eğitim odaklı olması gerekir.",
    ],
    kosullar: [
      "Fenerbahçe Üniversitesi'nde tam veya yarı zamanlı personel olmak (akademik veya idari)",
      "Kabul eden kurumdan davet/kabul mektubu almak",
      "Eğitim programının Mobility Agreement ile onaylanması",
    ],
    surec: [
      { baslik: "Kurum bulma", detay: "Staff week takvimlerini inceleyin (imotion-erasmus.eu) veya bir kurumla doğrudan anlaşın." },
      { baslik: "Başvuru", detay: "Çağrı döneminde başvuru formu ve Mobility Agreement ile başvurun." },
      { baslik: "Değerlendirme", detay: "Önceliklendirme kriterlerine göre (ilk kez katılım, idari personel vb.) seçim yapılır." },
      { baslik: "Hareketlilik", detay: "Faaliyet sonrası katılım sertifikası ve nihai rapor ile süreç tamamlanır." },
    ],
    belgeler: ["Davet/kabul mektubu", "Mobility Agreement (Eğitim Alma)", "Hibe sözleşmesi", "Katılım sertifikası", "Nihai rapor"],
  },
];

export const ILETISIM = {
  birim: "Erasmus+ Koordinatörlüğü — Uluslararası Ofis",
  adres: "Fenerbahçe Üniversitesi, Ataşehir / İstanbul",
  eposta: "erasmus@fbu.edu.tr",
};
