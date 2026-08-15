import { IlosData, Achievement, QuizQuestion, ApprovedMenuItem, FlowerItem } from '../types';

export const ilosData: IlosData = {
  fullName: "Selin İlayda Güneş",
  nickname: "İloş",
  birthDate: "1998-08-20",
  turningAge: 28,
  mother: "Nuray",
  creator: "Mustafa Can",
  friend: "Murat",
  favoriteColor: "Mor",
  footballTeam: "Galatasaray",
  footballPlayers: ["Mauro Icardi", "Barış Alper Yılmaz"],
  favoriteFoods: [
    "Künefe",
    "Komagene Çiğköfte",
    "Cheeseburger"
  ],
  favoriteDrinks: [
    "Kahve",
    "Ice Tea Şeftali"
  ],
  dreamCars: [
    "Mini Cooper",
    "Tesla"
  ],
  favoriteSeries: "Daha 17",
  favoriteSong: {
    title: "Akşamüstü",
    artist: "Yalın",
    audioSrc: "/assets/aksamustu.mp3"
  },
  loveGardenNote: "Aşk Bahçesi — sokaktaki dostlarına açtığı sıcacık yuva.",
  kpssDream: "Geleceğin En Havalı Devlet Memuru"
};

export const initialAchievements: Achievement[] = [
  {
    id: 'pati-dostu',
    title: 'Pati Dostu',
    description: 'Aşk Bahçesi\'ndeki sevimli dostları sevdin ve mama kabını doldurdun.',
    hint: 'Aşk Bahçesi\'ndeki hayvanları ziyaret et',
    iconName: 'HeartHandshake',
    unlocked: false,
    category: 'garden'
  },
  {
    id: 'hidrasyon-kralicesi',
    title: 'Hidrasyon Kraliçesi',
    description: 'Pembe termosa 5 kez basarak su seviyesini fulledin. Mustafa\'nın bugünkü görevlerinden biri başarıyla tamamlandı.',
    hint: 'Pembe termos sayacını 5/5 yap',
    iconName: 'Droplets',
    unlocked: false,
    category: 'general'
  },
  {
    id: 'aksamustu-dinleyici',
    title: 'Akşamüstü Melodisi',
    description: 'Yalın\'ın Akşamüstü parçasını açıp İloş\'un resmi şarkısını dinledin.',
    hint: 'Yalın - Akşamüstü çalarını başlat',
    iconName: 'Sparkles',
    unlocked: false,
    category: 'secret'
  },
  {
    id: 'ultraslan-ilos',
    title: 'ultrAslan İloş',
    description: 'İloş Stadium Mode\'u açtın ve 90+4\'te golü yazdın.',
    hint: 'Galatasaray stadyum moduna geçip gol at',
    iconName: 'Trophy',
    unlocked: false,
    category: 'sport'
  },
  {
    id: 'kpss-warrior',
    title: 'KPSS Savaşçısı',
    description: 'Memur yükleme ekranındaki son %1\'lik kahve ve motivasyon testini aşıp atama belgesini aldın.',
    hint: 'KPSS modülünde memur yüklemesini %100 yap',
    iconName: 'GraduationCap',
    unlocked: false,
    category: 'kpss'
  },
  {
    id: 'dream-driver',
    title: 'Dream Driver',
    description: 'Garajda İloş Moru Tesla veya Mini Cooper\'ı yapılandırdın.',
    hint: 'Garajda özel İloş rengini seç',
    iconName: 'Car',
    unlocked: false,
    category: 'general'
  },
  {
    id: 'kenks-protokolu',
    title: 'Kenks Protokolü',
    description: 'Murat\'ın telefon rehberi / kenksim kartını açığa çıkardın.',
    hint: 'Kenks modülüne göz at',
    iconName: 'Users',
    unlocked: false,
    category: 'secret'
  },
  {
    id: 'tatli-krizi',
    title: 'Tatlı Krizi',
    description: 'Künefeye 3 kez dokunup peynir uzama sınırını zorladın.',
    hint: 'Künefe kartını defalarca tıkla',
    iconName: 'Flame',
    unlocked: false,
    category: 'food'
  },
  {
    id: 'ilos-os',
    title: 'İloş OS v28.0',
    description: 'Sistem özelliklerini inceleyip kahve ile işletim sistemini yeniden başlattın.',
    hint: 'İloş OS kahve fincanına tıkla',
    iconName: 'Terminal',
    unlocked: false,
    category: 'general'
  },
  {
    id: 'merakli-ilos',
    title: 'Meraklı İloş',
    description: '"Buraya basma" uyarısına rağmen bastın. Tahmin ettiğimiz gibi!',
    hint: 'Yasaklı kırmızı/mor butona tıkla',
    iconName: 'AlertCircle',
    unlocked: false,
    category: 'secret'
  },
  {
    id: 'hummel-fit',
    title: 'Hummel Sporcu',
    description: 'İloş Training Mode\'da antrenmanı başlattın. Bugünlük bunu site yaptı!',
    hint: 'Training modunda antrenmana başla',
    iconName: 'Activity',
    unlocked: false,
    category: 'sport'
  },
  {
    id: 'cicek-bahcesi',
    title: 'Mor Çiçeklerin Sırrı',
    description: 'Mor çiçek bahçesindeki tüm yaprakları ve "İloş" çiçeğini açtın.',
    hint: 'Mor çiçek bahçesindeki tüm çiçeklere tıkla',
    iconName: 'Flower2',
    unlocked: false,
    category: 'garden'
  },
  {
    id: 'mustafabank-vip',
    title: 'MustafaBank VIP',
    description: 'MustafaBank Black Card ile tüm harcamaları tek tıkla Mustafa Can\'a yansıttın.',
    hint: 'MustafaBank modülünde bir harcamayı Mustafa\'ya ödet',
    iconName: 'CreditCard',
    unlocked: false,
    category: 'general'
  },
  {
    id: 'uber-mustafa-vip',
    title: 'Uber Mustafa 7/24',
    description: 'Özel şoförün Mustafa Can\'ı çağırdın ve VIP transferi başlattın.',
    hint: 'Uber Mustafa modülünden özel transfer çağır',
    iconName: 'Car',
    unlocked: false,
    category: 'general'
  },
  {
    id: 'mustafanin-cozumu',
    title: 'Mustafa Çözüm Reçetesi',
    description: 'Günün moduna göre Mustafa Can\'dan özel reçete ve VIP çözüm aldın.',
    hint: 'Çözüm üretici modülünde bir çözüm talep et',
    iconName: 'Sparkles',
    unlocked: false,
    category: 'general'
  },
  {
    id: 'en-guzel-kadin',
    title: 'Evrenin En Güzel Kadını',
    description: 'Mustafa Can’ın gözündeki 6 tartışmasız kanıtı inceleyip onayladın.',
    hint: 'En Güzel Kadın modülünde bir kanıtı beğen',
    iconName: 'Heart',
    unlocked: false,
    category: 'general'
  },
  {
    id: 'mor-tarot',
    title: 'Mistik Mor Tarotçu',
    description: 'İloş Mor Tarot destesinden kader kartını çektin ve günün kehanetini okudun.',
    hint: 'Tarot modülünden bir kart aç',
    iconName: 'Moon',
    unlocked: false,
    category: 'secret'
  },
  {
    id: 'mor-orkide-usta',
    title: 'Mor Orkide Bahçıvanı',
    description: 'Küçük tohumu sevgiyle ve suyla besleyip Işıltılı İloş Orkidesine dönüştürdün.',
    hint: 'Sanal orkideyi son aşamasına kadar sula',
    iconName: 'Flower2',
    unlocked: false,
    category: 'garden'
  },
  {
    id: 'gunes-enerjisi',
    title: 'Güneş Işığı Enerjisi',
    description: 'İloş Güneş Modu ile altın ışık huzmelerinden %100 pozitif enerji ve D vitamini yükledin.',
    hint: 'Güneş modülünden enerji al butonuna tıkla',
    iconName: 'Sun',
    unlocked: false,
    category: 'secret'
  }
];

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Sabah gözler açıldı, enerji seviyesi kritik dipte. İlk hamle nedir?",
    options: [
      { key: "A", text: "Taze ve sıcak bir kahve", isIlosChoice: true, funnyComment: "Sistem başka türlü açılmaz ☕" },
      { key: "B", text: "Hemen 10 km tempolu koşu", isIlosChoice: false, funnyComment: "İloş bile bu kadar erken koşmaz!" },
      { key: "C", text: "Sabah 7'de vergi mevzuatı okumak", isIlosChoice: false, funnyComment: "KPSS tamam da sabahın köründe olmaz :)" }
    ]
  },
  {
    id: 2,
    question: "İçecek dolabında hangisi konulduğu an ışık hızında kaybolur?",
    options: [
      { key: "A", text: "Ice Tea Şeftali", isIlosChoice: true, funnyComment: "Soğuk soğuk tek nefeste biter 🍑" },
      { key: "B", text: "Tuzlu şalgam", isIlosChoice: false, funnyComment: "Pek İloş tercihi sayılmaz..." },
      { key: "C", text: "Organik kereviz suyu", isIlosChoice: false, funnyComment: "Görmezden gelinir." }
    ]
  },
  {
    id: 3,
    question: "Hayalindeki rüya garajı için en mantıklı karar?",
    options: [
      { key: "A", text: "Gece parlayan Mor Tesla", isIlosChoice: false, funnyComment: "Çok havalı seçim..." },
      { key: "B", text: "Tatlı bir Mini Cooper", isIlosChoice: false, funnyComment: "Klasik ve stil sahibi..." },
      { key: "C", text: "İkisini de alalım!", isIlosChoice: true, funnyComment: "En İloş cevap kesinlikle bu! 🚗⚡" }
    ]
  },
  {
    id: 4,
    question: "Murat uzaktan göründüğünde ağızdan dökülen otomatik hitap?",
    options: [
      { key: "A", text: "Sayın Murat Beyefendi", isIlosChoice: false, funnyComment: "Böyle dense Murat kaçar!" },
      { key: "B", text: "Kenks", isIlosChoice: true, funnyComment: "Klasik ve samimi ✌️" },
      { key: "C", text: "Kenksim", isIlosChoice: true, funnyComment: "Daha da samimi versiyonu ✌️" }
    ]
  },
  {
    id: 5,
    question: "İloş'un karşı konulamaz gerçek zayıf noktası?",
    options: [
      { key: "A", text: "Mor çiçekler", isIlosChoice: false, funnyComment: "Görünce dayanamaz..." },
      { key: "B", text: "Aşk Bahçesi'ndeki masum canlar", isIlosChoice: false, funnyComment: "Kalbinin en yumuşak yeri..." },
      { key: "C", text: "Sıcak ve peyniri uzayan Künefe", isIlosChoice: false, funnyComment: "Tatlı krizinin ilacı..." },
      { key: "D", text: "Yukarıdakilerin hepsi!", isIlosChoice: true, funnyComment: "Tam 12'den İloş profili! 💜" }
    ]
  }
];

export const approvedMenuItems: ApprovedMenuItem[] = [
  {
    id: 'kunefe',
    title: 'Künefe',
    subtitle: 'Mutluluk Endeksi: 94/100',
    ratingText: '★ 5.0 (Tartışmaya Kapalı)',
    emoji: '🍮',
    tag: 'Tatlı Krizinde',
    bgGradient: 'from-amber-900/40 via-purple-950/50 to-purple-900/30',
    description: 'Şerbeti tam, peyniri uzayan, sıcak sıcak gelen ve masada kimseyle paylaşılmak istenmeyen altın tabak.'
  },
  {
    id: 'komagene',
    title: 'Komagene Çiğköfte',
    subtitle: 'Hayatta Kalma Paketi',
    ratingText: 'Acil Durum Kurtarıcısı',
    emoji: '🌯',
    tag: 'Günün Her Saati',
    bgGradient: 'from-red-950/40 via-purple-950/50 to-purple-900/30',
    description: 'Dürümün içine nar ekşisi, bol marul ve limon. Modu anında yükselten, kriz anlarının milli ilacı.'
  },
  {
    id: 'cheeseburger',
    title: 'Cheeseburger',
    subtitle: 'Güvenli ve En Lezzetli Seçim',
    ratingText: 'İloş Standartlarında',
    emoji: '🍔',
    tag: 'Klasik Favori',
    bgGradient: 'from-yellow-950/40 via-purple-950/50 to-purple-900/30',
    description: 'Eriyen peynir, yumuşacık ekmek ve yanında çıtır patates. Her zaman doğru ve risksiz karar.'
  },
  {
    id: 'icetea',
    title: 'Ice Tea Şeftali',
    subtitle: 'İloş Tarafından Onaylandı',
    ratingText: 'Serinletme Garantili',
    emoji: '🧋',
    tag: 'Resmi İçecek',
    bgGradient: 'from-orange-950/40 via-purple-950/50 to-purple-900/30',
    description: 'Buz gibi, şeftali aromalı ferahlık. Masada durduğu anda bitmesi sadece birkaç dakikadır.'
  },
  {
    id: 'browni',
    title: 'Islak Browni Kek',
    subtitle: 'Çikolata Patlaması: 100/100',
    ratingText: 'Sıcak & Akışkan Kalp',
    emoji: '🍫',
    tag: 'Tatlı Aşkı',
    bgGradient: 'from-amber-950/60 via-purple-950/50 to-pink-950/40',
    description: 'Fırından yeni çıkmış, içi ıslak ve akışkan Belçika çikolatalı nefis browni. Bir dilim alındığı an tüm stres sıfırlanır.'
  },
  {
    id: 'kahve',
    title: 'Kahve',
    subtitle: 'Sistem Gereksinimi & Yakıt',
    ratingText: 'Olmazsa Çalışmaz',
    emoji: '☕',
    tag: 'Temel İhtiyaç',
    bgGradient: 'from-stone-900/50 via-purple-950/50 to-purple-900/30',
    description: 'Günün başlangıcı, KPSS molası ve sohbetlerin vazgeçilmezi. İloş OS\'in ana enerji kaynağı.'
  }
];

export const flowersData: FlowerItem[] = [
  { id: 1, word: 'Merhamet', subtext: 'Sokaktaki canlara bakan o koca yürek.', x: 15, y: 30, delay: 0.1 },
  { id: 2, word: 'İnat', subtext: 'İstediği şeyin peşini asla bırakmama gücü.', x: 45, y: 20, delay: 0.2 },
  { id: 3, word: 'Neşe', subtext: 'Bir kahkahasıyla etrafı canlandıran enerji.', x: 75, y: 35, delay: 0.3 },
  { id: 4, word: 'Emek', subtext: 'Her gün sessizce çalışıp çabalayan kararlılık.', x: 30, y: 70, delay: 0.4 },
  { id: 5, word: 'Zarafet', subtext: 'Doğallığı ve içtenliğiyle etrafa yayılan samimiyet.', x: 60, y: 65, delay: 0.5 },
  { id: 6, word: 'İloş', subtext: 'Bütün bu güzelliklerin tek bir isimdeki karşılığı.', x: 50, y: 45, delay: 0.6 }
];

export const funnyStats = [
  { label: "Mustafa Can İltifat Endeksi", value: "Sonsuz ∞", note: "Dünyanın en güzel kadını & en güzel gözleri" },
  { label: "Mor Sevgisi", value: "%100", note: "Tartışmaya ve yoruma kapalı" },
  { label: "MustafaBank Bakiye Durumu", value: "0 TL Masraf", note: "Tüm hesaplar Mustafa tarafından karşılanıyor" },
  { label: "Uber Mustafa VIP Hazır Bulunma", value: "7/24 Aktif", note: "İloş yorulmasın, tek tıkla kapısında" },
  { label: "Hayvan Görünce 'Ayy' Deme Oranı", value: "%99.8", note: "Her köşe başında otomatik devreye girer" },
  { label: "Kahve Gereksinimi", value: "Kritik", note: "Eksikliğinde İloş OS yavaşlar" },
  { label: "Gözlerinin Güzellik Derecesi", value: "Kusursuz ★★★★★", note: "Baktığı yeri aydınlatan büyüleyici bakışlar" },
  { label: "Galatasaray Sadakati", value: "En Üst Seviye", note: "Sarı & Kırmızı ama kalbi Mor" },
  { label: "Icardi & Barış Alper Kotası", value: "Dolu", note: "Gol olunca evde bayram havası" },
  { label: "Pembe Termos Bağlılığı", value: "VIP / Premium", note: "Her yudumda +10 hidrasyon" },
  { label: "Künefe Reddetme İhtimali", value: "%0.001", note: "Şüpheli derecede düşük" },
  { label: "KPSS Savaşçılığı", value: "Devam Ediyor", note: "Geleceğin en havalı memuru" }
];
