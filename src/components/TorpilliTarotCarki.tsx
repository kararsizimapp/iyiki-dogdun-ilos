import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Disc3, Award, Gift, RefreshCw, Star, Heart, CheckCircle2, Flame } from 'lucide-react';
import { soundManager } from '../utils/audio';
import { launchMorKonfeti } from '../utils/confetti';

interface TorpilliTarotCarkiProps {
  onUnlockAchievement: (id: string) => void;
}

interface TorpilliCard {
  id: string;
  title: string;
  category: string;
  badge: string;
  icon: string;
  privilege: string;
  guaranteeText: string;
  color: string;
}

interface WheelSegment {
  id: string;
  label: string;
  reward: string;
  emoji: string;
  color: string;
}

const torpilliCards: TorpilliCard[] = [
  {
    id: 'haklilik-karti',
    title: 'Sonsuz Haklılık Kartı',
    category: 'V.I.P Torpil Belgesi',
    badge: 'GEÇERLİLİK: ÖMÜR BOYU',
    icon: '⚖️ 👑',
    privilege: 'Mustafa ile yaşanabilecek tüm tatlı tartışmalarda, İloş herhangi bir kanıt göstermeksizin otomatik olarak %100 HAKLI kabul edilir.',
    guaranteeText: 'Mustafa Can’ın itiraz hakkı kanunen ve kalben feshedilmiştir.',
    color: 'from-purple-900 via-fuchsia-950 to-pink-950'
  },
  {
    id: 'tatli-istegi',
    title: 'Gece 02:00 Künefe & Tatlı Kuponu',
    category: 'Gurme Muafiyet Kartı',
    badge: 'SINIRSIZ KULLANIM',
    icon: '🥞 ✨',
    privilege: 'Günün veya gecenin hangi saati olursa olsun, İloş canı ne zaman künefe, çiğköfte veya tatlı isterse Mustafa Can derhal temin etmekle yükümlüdür.',
    guaranteeText: 'Kurye gecikirse Mustafa bizzat fırına koşar.',
    color: 'from-amber-950 via-purple-950 to-stone-900'
  },
  {
    id: 'masaj-kahve',
    title: 'VIP Masaj & Özel Kahve Servisi',
    category: 'Spa & Dinlenme İmtiyazı',
    badge: 'PREMIUM SERTİFİKA',
    icon: '☕ 💆‍♀️',
    privilege: 'Ders çalışırken veya yorgun bir günün ardından tek bir parmak şıklatmasıyla taze filtre kahve ve omuz masajı anında devreye girer.',
    guaranteeText: 'Kahve sıcaklığı ve köpük oranı milimetrik ayarlanır.',
    color: 'from-pink-950 via-purple-950 to-indigo-950'
  },
  {
    id: 'rota-belirleme',
    title: 'Direksiyon & Rota Hakimiyeti Kartı',
    category: 'Yolculuk & Gezi Ayrıcalığı',
    badge: 'MUTLAK YETKİ',
    icon: '🚗 🎵',
    privilege: 'Arabada çalacak tüm şarkılar (başta Yalın olmak üzere) ve gidilecek tüm rotalar istisnasız İloş’un zevkine göre belirlenir.',
    guaranteeText: 'Mustafa canı gönülden eşlik eder ve yolu açar.',
    color: 'from-indigo-950 via-purple-950 to-fuchsia-950'
  }
];

const wheelSegments: WheelSegment[] = [
  { id: '1', label: 'Ömür Boyu Haklılık', reward: 'Tüm tartışmalarda %100 haklı çıkma garantisi!', emoji: '👑', color: '#9333ea' },
  { id: '2', label: 'Sıcak Künefe', reward: 'Hemen şimdi sıcacık künefe sipariş hakkı!', emoji: '🥞', color: '#ec4899' },
  { id: '3', label: 'Omuz Masajı', reward: '30 dakikalık dinlendirici VIP masaj kuponu!', emoji: '💆‍♀️', color: '#f59e0b' },
  { id: '4', label: 'Ice Tea Şeftali', reward: 'Buz gibi şeftalili Ice Tea ikramı!', emoji: '🍹', color: '#06b6d4' },
  { id: '5', label: 'Yalın Konseri', reward: 'Özel Akşamüstü canlı playback performansı!', emoji: '🎤', color: '#a855f7' },
  { id: '6', label: 'Mustafa\'dan Özür', reward: 'Sebepsiz yere bile olsa en içten af dileme kuponu!', emoji: '💐', color: '#10b981' }
];

export const TorpilliTarotCarki: React.FC<TorpilliTarotCarkiProps> = ({ onUnlockAchievement }) => {
  const [activeTab, setActiveTab] = useState<'cards' | 'wheel'>('wheel');
  const [selectedCard, setSelectedCard] = useState<TorpilliCard | null>(torpilliCards[0]);
  const [wheelRotation, setWheelRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [wheelResult, setWheelResult] = useState<WheelSegment | null>(null);
  const [spinCount, setSpinCount] = useState(0);

  const handleSpinWheel = () => {
    if (isSpinning) return;
    soundManager.playPop();
    setIsSpinning(true);
    setWheelResult(null);

    // Random spin (at least 5 full rotations + random angle)
    const extraDegrees = Math.floor(Math.random() * 360);
    const totalRotation = wheelRotation + 1800 + extraDegrees;
    setWheelRotation(totalRotation);

    setTimeout(() => {
      setIsSpinning(false);
      const normalizedAngle = (360 - (totalRotation % 360)) % 360;
      const segmentAngle = 360 / wheelSegments.length;
      const winningIndex = Math.floor(normalizedAngle / segmentAngle) % wheelSegments.length;
      const wonSegment = wheelSegments[winningIndex];

      setWheelResult(wonSegment);
      soundManager.playAchievement();
      launchMorKonfeti();

      const nextSpin = spinCount + 1;
      setSpinCount(nextSpin);
      if (nextSpin >= 2) {
        onUnlockAchievement('sans-carki-kralicesi');
      }
    }, 3200);
  };

  return (
    <section id="torpilli-tarot-section" className="py-20 px-4 sm:px-6 relative overflow-hidden bg-gradient-to-b from-[#0a0414] via-[#140728] to-[#0c0517]">
      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950/80 border border-amber-700/50 text-amber-300 text-xs font-mono-code mb-4 shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>%100 KAZANMA GARANTİLİ ŞANS KULÜBÜ</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
            İloş’un Torpilli <span className="bg-gradient-to-r from-amber-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">Tarot & Şans Çarkı</span>
          </h2>
          <p className="mt-2 text-sm sm:text-base text-purple-200/80 font-serif-italic">
            “Kural basit: İloş her zaman kazanır! Çarkı çevir veya torpilli imtiyaz kartlarını incele.”
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-10">
          <div className="p-1.5 rounded-2xl bg-[#170930] border border-purple-800/60 flex items-center gap-2 shadow-xl">
            <button
              onClick={() => {
                soundManager.playClick();
                setActiveTab('wheel');
              }}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold font-mono-code transition-all flex items-center gap-2 ${
                activeTab === 'wheel'
                  ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-md'
                  : 'text-purple-300 hover:text-white'
              }`}
            >
              <Disc3 className="w-4 h-4" />
              🎡 Torpilli Şans Çarkı
            </button>
            <button
              onClick={() => {
                soundManager.playClick();
                setActiveTab('cards');
              }}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold font-mono-code transition-all flex items-center gap-2 ${
                activeTab === 'cards'
                  ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-md'
                  : 'text-purple-300 hover:text-white'
              }`}
            >
              <Award className="w-4 h-4" />
              🃏 İmtiyaz Kartları
            </button>
          </div>
        </div>

        {/* View: Fortune Wheel */}
        {activeTab === 'wheel' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Left: The Spinning Wheel (6 cols) */}
            <div className="md:col-span-6 flex flex-col items-center justify-center">
              <div className="relative w-72 h-72 sm:w-84 sm:h-84 flex items-center justify-center">
                
                {/* Pointer / Stopper Arrow */}
                <div className="absolute -top-3 z-30 flex flex-col items-center">
                  <div className="w-6 h-6 bg-amber-400 rotate-45 border-2 border-white shadow-lg" />
                </div>

                {/* The Rotating Wheel SVG */}
                <motion.div
                  animate={{ rotate: wheelRotation }}
                  transition={{ duration: 3.2, ease: [0.15, 0.9, 0.25, 1] }}
                  className="w-full h-full rounded-full border-8 border-purple-900/80 shadow-2xl shadow-purple-950 overflow-hidden relative"
                >
                  <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                    {wheelSegments.map((seg, idx) => {
                      const angle = 360 / wheelSegments.length;
                      const startAngle = idx * angle;
                      const endAngle = (idx + 1) * angle;
                      const x1 = 50 + 50 * Math.cos((Math.PI * startAngle) / 180);
                      const y1 = 50 + 50 * Math.sin((Math.PI * startAngle) / 180);
                      const x2 = 50 + 50 * Math.cos((Math.PI * endAngle) / 180);
                      const y2 = 50 + 50 * Math.sin((Math.PI * endAngle) / 180);
                      const path = `M 50 50 L ${x1} ${y1} A 50 50 0 0 1 ${x2} ${y2} Z`;

                      return (
                        <path
                          key={seg.id}
                          d={path}
                          fill={seg.color}
                          stroke="#1a0b32"
                          strokeWidth="1"
                          opacity="0.9"
                        />
                      );
                    })}
                  </svg>

                  {/* Wheel Center Button */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-16 h-16 rounded-full bg-[#180933] border-4 border-amber-400 flex items-center justify-center text-amber-300 shadow-xl font-bold font-display text-sm">
                      İLOŞ
                    </div>
                  </div>
                </motion.div>

              </div>

              {/* Spin Action Button */}
              <button
                onClick={handleSpinWheel}
                disabled={isSpinning}
                className="mt-6 px-8 py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-pink-600 to-purple-600 hover:from-amber-400 hover:to-purple-500 disabled:opacity-50 text-white font-bold font-mono-code text-sm transition-all shadow-xl shadow-purple-950 active:scale-95 flex items-center gap-2"
              >
                <RefreshCw className={`w-4 h-4 ${isSpinning ? 'animate-spin' : ''}`} />
                {isSpinning ? 'ÇARK DÖNÜYOR...' : 'ÇARKI ÇEVİR (HER SEFER KAZAN)'}
              </button>
            </div>

            {/* Right: Reward Outcome Box (6 cols) */}
            <div className="md:col-span-6">
              <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#1b0c36] to-[#120626] border-2 border-purple-700/50 shadow-2xl">
                <div className="flex items-center gap-2 text-xs font-mono-code text-amber-400 mb-3">
                  <Gift className="w-4 h-4" />
                  <span>KAZANILAN İMTİYAZ</span>
                </div>

                <AnimatePresence mode="wait">
                  {wheelResult ? (
                    <motion.div
                      key={wheelResult.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="space-y-4"
                    >
                      <div className="text-5xl mb-2">{wheelResult.emoji}</div>
                      <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
                        {wheelResult.label}
                      </h3>
                      <p className="text-sm sm:text-base text-purple-200/90 font-serif-italic bg-purple-950/60 p-4 rounded-2xl border-l-4 border-amber-400">
                        {wheelResult.reward}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-pink-300 font-mono-code">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        Mustafa Can tarafından anında onaylandı ve yürürlüğe girdi.
                      </div>
                    </motion.div>
                  ) : (
                    <div className="py-8 text-center text-purple-300/70 font-serif-italic">
                      Çarkı çevirdiğinde Mustafa’dan sana özel resmi bir hak veya hediye burada mühürlenecek...
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>

          </div>
        )}

        {/* View: Torpilli Privilege Cards */}
        {activeTab === 'cards' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {torpilliCards.map((card) => (
              <motion.div
                key={card.id}
                whileHover={{ y: -6, scale: 1.02 }}
                className={`rounded-3xl p-5 bg-gradient-to-b ${card.color} border-2 border-purple-600/50 shadow-xl flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-black/40 text-amber-300 border border-amber-500/30">
                      {card.badge}
                    </span>
                    <span className="text-xl">{card.icon}</span>
                  </div>

                  <span className="text-[11px] font-mono-code text-purple-300 uppercase block mb-1">
                    {card.category}
                  </span>

                  <h4 className="text-lg font-bold text-white mb-3">
                    {card.title}
                  </h4>

                  <p className="text-xs text-purple-100/90 leading-relaxed mb-4 font-sans">
                    {card.privilege}
                  </p>
                </div>

                <div className="pt-3 border-t border-purple-500/30 text-[10px] font-serif-italic text-pink-300/90">
                  {card.guaranteeText}
                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
