import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, Coffee, ShieldAlert, Zap, Award, CheckCircle2, MessageCircleHeart, Flame } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface MustafaSolutionEngineProps {
  onUnlockAchievement: (id: string) => void;
}

interface MoodOption {
  id: string;
  emoji: string;
  title: string;
  shortDesc: string;
  problem: string;
  solutionTitle: string;
  solutionSteps: string[];
  mustafaQuote: string;
  bgGradient: string;
  badgeColor: string;
}

const moodOptions: MoodOption[] = [
  {
    id: 'kpss-yorgun',
    emoji: '🤯',
    title: 'KPSS Çok Yordu',
    shortDesc: 'Mevzuat & Deneme Yoğunluğu',
    problem: 'Beyin %1 şarjda, sorular ve kanun maddeleri birbirine girdi.',
    solutionTitle: 'ACİL KPSS REHABİLİTASYON PROTOKOLÜ',
    solutionSteps: [
      'Tüm test kitapları derhal kapatılıyor ve masadan uzaklaştırılıyor.',
      'Sıcak çay / taze kahve hazırlanıyor, yumuşak bir battaniye getiriliyor.',
      'Mustafa Can 5 dakika boyunca "Sen bu sınavı dereceyle fethedeceksin" telkini yapıyor.',
      'Kalan tüm akşam dinlenme ilan ediliyor.'
    ],
    mustafaQuote: '“Sen elinden gelenin en güzelini yapıyorsun. O atama gelecek ve biz kutlayacağız!”',
    bgGradient: 'from-purple-950/90 via-indigo-950/80 to-purple-900/60',
    badgeColor: 'bg-indigo-900/60 text-indigo-300 border-indigo-700/40'
  },
  {
    id: 'kahve-bitti',
    emoji: '☕',
    title: 'Kahvem Bitti / Enerji %2',
    shortDesc: 'Sistem Yakıtı Tükendi',
    problem: 'Gözler kapanıyor, odak sıfıra indi, acil kafein desteği şart.',
    solutionTitle: 'MUSTAFABANK KAFEİN ACİL DESTEK FONU',
    solutionSteps: [
      'MustafaBank özel kahve limitini sınırsıza çıkardı.',
      'En taze, bol aromalı filtre kahve / espresso hazırlanıyor.',
      'Yanına en sevdiğin çikolatalı atıştırmalık ekleniyor.',
      'Enerji çubuğu %100 dolana kadar hiçbir soru çözülmüyor.'
    ],
    mustafaQuote: '“Sen iste, kahve dükkanını kapına getireyim. Yeter ki o güzel enerjin ve neşen hiç bitmesin.”',
    bgGradient: 'from-amber-950/90 via-purple-950/80 to-stone-900/60',
    badgeColor: 'bg-amber-900/60 text-amber-300 border-amber-700/40'
  },
  {
    id: 'tatli-krizi',
    emoji: '🍫',
    title: 'Tatlı & Künefe Krizindeyim',
    shortDesc: 'Şeker Seviyesi Düştü',
    problem: 'Akılda tek bir şey var: Sıcak, peyniri uzayan künefe veya ıslak browni.',
    solutionTitle: 'RESMİ ŞEKER YÜKLEME OPERASYONU',
    solutionSteps: [
      'Künefenin şerbeti tam kıvamında ısıtılıyor.',
      'Peynir uzama rekoru kırmak üzere altın tepsi masaya konuyor.',
      'Masadaki hiç kimse senin dilimine dokunamıyor.',
      'İloş Approved onayıyla mutluluk endeksi 100/100 yapılıyor.'
    ],
    mustafaQuote: '“Künefenin de browninin de en güzeli senin hakkın. Afiyet bal şeker olsun!”',
    bgGradient: 'from-pink-950/90 via-purple-950/80 to-red-950/60',
    badgeColor: 'bg-pink-900/60 text-pink-300 border-pink-700/40'
  },
  {
    id: 'sessiz-mod',
    emoji: '🤫',
    title: 'Sadece Sessizce Dinlenmek İstiyorum',
    shortDesc: 'Dünyayı Sustur Modu',
    problem: 'Gürültü yok, soru yok, telaş yok. Sadece huzur aranıyor.',
    solutionTitle: 'VIP SESSİZ HUZUR KOZASI',
    solutionSteps: [
      'Tüm bildirimler ve dış dünya sesleri sessize alınıyor.',
      'Arka planda sadece Yalın - Akşamüstü en kısık tonda çalıyor.',
      'Mustafa Can tam destekle ve sessizce ortamın huzurunu koruyor.',
      'İstediğin kadar sessiz kalma hakkı garanti altına alınıyor.'
    ],
    mustafaQuote: '“Bazen hiç konuşmamak da en güzel sohbettir. Ne zaman istersen buradayım.”',
    bgGradient: 'from-slate-950/90 via-purple-950/80 to-purple-950/60',
    badgeColor: 'bg-purple-900/60 text-purple-300 border-purple-700/40'
  },
  {
    id: 'simartilmak',
    emoji: '🥺',
    title: 'Biraz Şımartılmak İstiyorum',
    shortDesc: 'Sevgi & İltifat İhtiyacı',
    problem: 'Bugün biraz ekstra ilgi, pozitiflik ve kraliçe muamelesi hak edildi.',
    solutionTitle: 'VIP PRENSES & KRALİÇE PROTOKOLÜ',
    solutionSteps: [
      'Mustafa Can otomatik olarak ne kadar özel ve harika bir insan olduğunu hatırlatıyor.',
      'Günün tüm istekleri koşulsuz kabul ediliyor.',
      'Mor detaylarla süslenmiş taptaze çiçekler ve sürprizler planlanıyor.',
      'Zarafetin ve pozitifliğin üzerine tatlı övgüler sıralanıyor.'
    ],
    mustafaQuote: '“Sen dünyadaki en özel insanlardan birisin. Yüzün hep gülsün, hak ettiğin tüm güzellikler seni bulsun.”',
    bgGradient: 'from-fuchsia-950/90 via-purple-950/80 to-pink-950/60',
    badgeColor: 'bg-fuchsia-900/60 text-fuchsia-300 border-fuchsia-700/40'
  },
  {
    id: 'gs-maci',
    emoji: '🦁',
    title: 'Galatasaray Maçı Var / Heyecanlıyım',
    shortDesc: '90 Dakika Maç Modu',
    problem: 'Kalp sarı-kırmızı atıyor, RAMS Park atmosferi evde yaşanıyor.',
    solutionTitle: 'RAMS PARK TRİBÜN PROTOKOLÜ',
    solutionSteps: [
      'Sarı-kırmızı formalar giyiliyor, meşaleler hazırlanıyor.',
      'Ice Tea ve atıştırmalıklar hazır ediliyor.',
      'Icardi gol attığında "Aşkın Olayım" eşliğinde kutlama yapılıyor.',
      '90+4 zaferi coşkuyla kutlanıyor.'
    ],
    mustafaQuote: '“Maç ne olursa olsun, senin o tatlı heyecanın her şeye değer!”',
    bgGradient: 'from-amber-950/90 via-red-950/80 to-purple-950/60',
    badgeColor: 'bg-amber-900/60 text-amber-300 border-amber-700/40'
  }
];

export const MustafaSolutionEngine: React.FC<MustafaSolutionEngineProps> = ({ onUnlockAchievement }) => {
  const [selectedMood, setSelectedMood] = useState<MoodOption>(moodOptions[0]);
  const [applied, setApplied] = useState(false);

  const handleSelectMood = (mood: MoodOption) => {
    soundManager.playPop();
    setSelectedMood(mood);
    setApplied(false);
  };

  const handleApplySolution = () => {
    soundManager.playAchievement();
    setApplied(true);
    onUnlockAchievement('mustafanin-cozumu');
  };

  return (
    <section id="solution-engine-section" className="py-20 px-4 sm:px-6 relative">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/60 border border-purple-700/40 text-purple-300 text-xs font-mono-code mb-3">
            <Sparkles className="w-3.5 h-3.5 text-pink-400" />
            <span>MODUNU SEÇ • MUSTAFA ÇÖZSÜN</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            Mustafa'dan Anında Çözüm Üretici 🛠️💜
          </h2>
          <p className="text-sm sm:text-base text-purple-300/80 max-w-lg mx-auto mt-2">
            Bugün nasıl hissediyorsun? Durumunu seç, Mustafa Can'ın sana özel hazırladığı reçeteyi anında gör.
          </p>
        </div>

        {/* Mood Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
          {moodOptions.map((mood) => (
            <button
              key={mood.id}
              onClick={() => handleSelectMood(mood)}
              className={`p-4 rounded-2xl border text-center transition-all flex flex-col items-center justify-between gap-2 ${
                selectedMood.id === mood.id
                  ? 'bg-gradient-to-b from-purple-800/90 to-pink-900/90 border-pink-400 text-white shadow-xl shadow-purple-950/80 scale-105'
                  : 'bg-[#140b24]/80 border-purple-800/40 text-purple-300 hover:bg-purple-900/40'
              }`}
            >
              <span className="text-3xl drop-shadow-md">{mood.emoji}</span>
              <div>
                <span className="font-bold text-xs block text-white leading-tight">{mood.title}</span>
                <span className="text-[10px] text-purple-300/70 font-mono-code block mt-0.5">{mood.shortDesc}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Active Solution Prescription Card */}
        <motion.div
          key={selectedMood.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className={`rounded-3xl p-6 sm:p-10 bg-gradient-to-br ${selectedMood.bgGradient} border border-purple-500/40 shadow-2xl shadow-purple-950/80 relative overflow-hidden`}
        >
          {/* Background Glow */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Top Status */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-purple-700/40 mb-6">
            <div className="flex items-center gap-3">
              <span className="text-4xl">{selectedMood.emoji}</span>
              <div>
                <span className={`text-[10px] font-mono-code px-2.5 py-0.5 rounded-full border uppercase tracking-wider ${selectedMood.badgeColor}`}>
                  {selectedMood.title}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                  {selectedMood.solutionTitle}
                </h3>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[11px] font-mono-code text-purple-300/70 block">Çözüm Sorumlusu:</span>
              <span className="text-xs font-bold text-pink-300 font-serif-italic">Mustafa Can Aygün</span>
            </div>
          </div>

          {/* Problem Assessment */}
          <div className="p-4 rounded-2xl bg-black/40 border border-purple-800/40 mb-6">
            <span className="text-[11px] font-mono-code text-pink-400 font-bold uppercase tracking-wider block mb-1">
              🔍 Teşhis:
            </span>
            <p className="text-xs sm:text-sm text-purple-200">
              {selectedMood.problem}
            </p>
          </div>

          {/* Solution Steps */}
          <div className="mb-6 space-y-2.5">
            <span className="text-[11px] font-mono-code text-purple-300 font-bold uppercase tracking-wider block mb-2">
              📋 Uygulanacak Adımlar:
            </span>
            {selectedMood.solutionSteps.map((step, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-purple-950/50 border border-purple-800/30">
                <CheckCircle2 className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-purple-100 font-light">{step}</span>
              </div>
            ))}
          </div>

          {/* Mustafa's Personal Quote */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-900/60 to-pink-900/60 border border-pink-500/30 mb-8 flex items-center gap-3">
            <MessageCircleHeart className="w-5 h-5 text-pink-300 shrink-0" />
            <p className="text-xs sm:text-sm text-white font-serif-italic">
              {selectedMood.mustafaQuote}
            </p>
          </div>

          {/* Apply Button */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-purple-700/40">
            <button
              onClick={handleApplySolution}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 hover:from-pink-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-purple-950 flex items-center justify-center gap-2 transition-all hover:scale-102 uppercase tracking-wider"
            >
              <Zap className="w-4 h-4 text-yellow-300" />
              <span>{applied ? 'Çözüm Uygulandı! Huzur Yüklendi ✓' : 'Bu Çözümü Mustafa\'dan Talep Et'}</span>
            </button>

            {applied && (
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-xs font-mono-code text-pink-300 flex items-center gap-1.5"
              >
                <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-400" />
                <span>Mustafa talebi aldı, anında devrede!</span>
              </motion.span>
            )}
          </div>

        </motion.div>

      </div>
    </section>
  );
};
