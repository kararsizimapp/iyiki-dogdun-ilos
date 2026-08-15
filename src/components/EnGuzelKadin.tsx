import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, Eye, Smile, ShieldCheck, Flame, Crown, Shuffle } from 'lucide-react';
import { soundManager } from '../utils/audio';
import { launchMorKonfeti } from '../utils/confetti';

interface EnGuzelKadinProps {
  onUnlockAchievement: (id: string) => void;
}

interface ReasonItem {
  id: number;
  title: string;
  icon: string;
  badge: string;
  quote: string;
  description: string;
  details: string;
}

const reasons: ReasonItem[] = [
  {
    id: 1,
    title: 'O Eşsiz ve Derin Gözler',
    icon: '✨',
    badge: '1. Kanıt • Bakışlar',
    quote: '“Gözlerin etrafa öyle güzel bir ışık saçıyor ki tüm ortam aydınlanıyor.”',
    description: 'Sadece güzel değil; içinde samimiyeti, zekayı, şefkati ve koca bir evreni barındıran en içten bakışlar.',
    details: 'Bir tebessümüyle insanın tüm gününü güzelleştiren, dünyaya umutla ve parıltıyla bakan o gözler.'
  },
  {
    id: 2,
    title: 'Gülünce Açan Çiçekler',
    icon: '🌸',
    badge: '2. Kanıt • Tebessüm',
    quote: '“Sen güldüğün zaman etraftaki her şey canlanıyor.”',
    description: 'Hiçbir sahtelik barındırmayan, içten gelen, kahkahasında bile insanı mutlu eden o sıcacık gülüş.',
    details: 'En yorgun günlerde bile enerjisiyle ortamı aydınlatan, dünyanın en pozitif tebessümü.'
  },
  {
    id: 3,
    title: 'Kalbindeki Sonsuz Merhamet',
    icon: '🐾',
    badge: '3. Kanıt • Ruh Güzelliği',
    quote: '“Sokaktaki canlara bakan o kalbin güzelliği yüzüne yansıyor.”',
    description: 'Kedileri, köpekleri ve dokunduğu her canlıyı seven; kötülük bilmeyen tertemiz bir kalp.',
    details: 'Gerçek güzellik sadece dış görünüş değil; İloş gibi kalbiyle seven bir insanın ruhudur.'
  },
  {
    id: 4,
    title: 'Zarafeti ve Doğallığı',
    icon: '👑',
    badge: '4. Kanıt • Asalet',
    quote: '“Olduğun gibi harikasın; hiçbir fazlalığa ihtiyacın yok.”',
    description: 'Filtresiz, yapmacıksız, kendi gibi olan, zarafetini doğallığından alan kraliçe.',
    details: 'Sade bir saç toplayışında, termosunu tutuşunda bile kusursuz bir zarafet taşıyan asil duruş.'
  },
  {
    id: 5,
    title: 'Azmi, İnadı ve Gücü',
    icon: '⚡',
    badge: '5. Kanıt • Karakter',
    quote: '“İstediğin şeyin peşini bırakmayan o güçlü duruşun herkese ilham veriyor.”',
    description: 'Yorulduğunda bile vazgeçmeyen, hayallerinin peşinden koşan güçlü ve kararlı kadın.',
    details: 'Kendi ayakları üzerinde dimdik duran, geleceğini ilmek ilmek inşa eden güçlü karakter.'
  },
  {
    id: 6,
    title: 'Sadece "İloş" Oluşu',
    icon: '💜',
    badge: '6. Kanıt • Biriciklik',
    quote: '“Bu dünyada senin gibi özel bir insan daha yok.”',
    description: 'Bütün bu zarafetin, tatlılığın ve eşsiz huyların tek bir isimdeki kusursuz birleşimi.',
    details: 'Mustafa Can’ın ve tüm sevenlerinin gözündeki en değerli ve en güzel insan.'
  }
];

export const EnGuzelKadin: React.FC<EnGuzelKadinProps> = ({ onUnlockAchievement }) => {
  const [activeReason, setActiveReason] = useState<ReasonItem>(reasons[0]);
  const [likes, setLikes] = useState(28);

  const handleSelectReason = (reason: ReasonItem) => {
    soundManager.playPop();
    setActiveReason(reason);
  };

  const handleLike = () => {
    soundManager.playAchievement();
    setLikes((prev) => prev + 1);
    launchMorKonfeti();
    onUnlockAchievement('en-guzel-kadin');
  };

  const handleRandom = () => {
    soundManager.playPop();
    const otherReasons = reasons.filter((r) => r.id !== activeReason.id);
    const random = otherReasons[Math.floor(Math.random() * otherReasons.length)];
    setActiveReason(random);
  };

  return (
    <section id="en-guzel-kadin-section" className="py-24 px-4 sm:px-6 relative overflow-hidden">
      
      {/* Background Radiance */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-950/60 border border-pink-700/40 text-pink-300 text-xs font-mono-code mb-3">
            <Crown className="w-3.5 h-3.5 text-yellow-300" />
            <span>MUTLAK GERÇEK • BELGELENDİ</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            Neden Dünyanın En Güzel Kadını? 👑💜
          </h2>
          <p className="text-sm sm:text-base text-pink-200/80 max-w-xl mx-auto mt-2">
            Mustafa Can’ın gözünden, bilimin ve kalbin onayladığı tartışmaya kapalı 6 temel kanıt.
          </p>
        </div>

        {/* Reason Nav Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 mb-8">
          {reasons.map((r) => (
            <button
              key={r.id}
              onClick={() => handleSelectReason(r)}
              className={`p-3.5 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 ${
                activeReason.id === r.id
                  ? 'bg-gradient-to-b from-pink-900/90 to-purple-900/90 border-pink-400 text-white shadow-xl scale-105'
                  : 'bg-purple-950/40 border-purple-800/40 text-purple-300 hover:bg-purple-900/40'
              }`}
            >
              <span className="text-2xl">{r.icon}</span>
              <span className="font-bold text-xs block text-white truncate max-w-full">{r.title}</span>
            </button>
          ))}
        </div>

        {/* Active Reason Showcase Display */}
        <motion.div
          key={activeReason.id}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35 }}
          className="rounded-3xl p-6 sm:p-12 bg-gradient-to-br from-[#1a0a2a]/95 via-[#12061e]/95 to-[#1c0828]/95 border-2 border-pink-500/40 shadow-2xl shadow-purple-950/90 relative overflow-hidden"
        >
          {/* Top Badge */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-pink-900/40 mb-6">
            <div className="flex items-center gap-3">
              <span className="text-4xl sm:text-5xl">{activeReason.icon}</span>
              <div>
                <span className="text-[11px] font-mono-code px-3 py-1 rounded-full bg-pink-900/60 text-pink-300 border border-pink-700/50 uppercase tracking-wider">
                  {activeReason.badge}
                </span>
                <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white mt-1.5">
                  {activeReason.title}
                </h3>
              </div>
            </div>

            <button
              onClick={handleRandom}
              className="px-3.5 py-2 rounded-xl bg-purple-950/70 hover:bg-purple-900 border border-purple-700/40 text-purple-300 text-xs font-mono-code flex items-center gap-1.5 transition-all"
            >
              <Shuffle className="w-3.5 h-3.5 text-pink-400" />
              <span>Rastgele Kanıt</span>
            </button>
          </div>

          {/* Core Quote Box */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-pink-950/70 via-purple-950/80 to-pink-950/70 border border-pink-500/30 mb-6 text-center">
            <p className="text-base sm:text-xl text-white font-serif-italic leading-relaxed">
              {activeReason.quote}
            </p>
            <span className="text-[11px] font-mono-code text-pink-300/80 mt-2 block">
              — Mustafa Can Aygün
            </span>
          </div>

          {/* Detailed Paragraphs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-800/30">
              <h4 className="text-xs font-mono-code text-pink-400 uppercase tracking-wider mb-1">
                Gözle Görülür Gerçek:
              </h4>
              <p className="text-xs sm:text-sm text-purple-100/90 leading-relaxed font-light">
                {activeReason.description}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-800/30">
              <h4 className="text-xs font-mono-code text-pink-400 uppercase tracking-wider mb-1">
                Kalpteki Karşılığı:
              </h4>
              <p className="text-xs sm:text-sm text-purple-100/90 leading-relaxed font-light">
                {activeReason.details}
              </p>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-pink-900/40">
            <button
              onClick={handleLike}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 hover:scale-105 text-white font-bold text-xs sm:text-sm shadow-xl flex items-center justify-center gap-2 transition-all uppercase tracking-wider"
            >
              <Heart className="w-4 h-4 text-white fill-white animate-pulse" />
              <span>Bu Kanıtı Onayla ({likes} Kalp)</span>
            </button>

            <span className="text-xs font-mono-code text-pink-300/70 font-serif-italic">
              *Tüm dünya toplansa aksi iddia edilemez.
            </span>
          </div>

        </motion.div>

      </div>
    </section>
  );
};
