import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Moon, Sun, Star, Shuffle, Heart, Eye } from 'lucide-react';
import { soundManager } from '../utils/audio';
import { launchMorKonfeti } from '../utils/confetti';

interface IlosTarotProps {
  onUnlockAchievement: (id: string) => void;
}

interface TarotCard {
  id: string;
  name: string;
  arcana: string;
  symbol: string;
  element: string;
  meaning: string;
  loveMessage: string;
  luckyDetail: string;
  colorGradient: string;
}

const tarotDeck: TarotCard[] = [
  {
    id: 'kupa-kralicesi',
    name: 'Kupa Kraliçesi İloş',
    arcana: 'Büyük Sır Kartı • I',
    symbol: '👑 ✨',
    element: 'Zarafet & Pozitif Enerji',
    meaning: 'Bugün girdiğin her ortama neşe ve ışık saçacaksın. Doğallığın ve samimiyetin etrafındaki herkesin gününü güzelleştiriyor.',
    loveMessage: 'Mustafa Can her zaman senin en büyük destekçin ve hayranın.',
    luckyDetail: 'Şanslı Renk: Asil Mor • Şanslı Sayı: 28',
    colorGradient: 'from-purple-900 via-fuchsia-950 to-purple-950'
  },
  {
    id: 'kutsal-kahve',
    name: 'Kutsal Kahve & Atanma Kartı',
    arcana: 'Büyük Sır Kartı • II',
    symbol: '☕ 📚',
    element: 'Azim & Parlak Gelecek',
    meaning: 'Fincanın dibinde kocaman bir KPSS başarısı ve resmi atama müjdesi görünüyor. Döktüğün her damla emek sana hak ettiğin başarıyı getirecek.',
    loveMessage: 'Senin zekana ve azmine güvenimiz tam, o kadro sana gelecek!',
    luckyDetail: 'Şanslı İçecek: Taze Filtre Kahve • Şanslı Saat: 20:00',
    colorGradient: 'from-amber-950 via-purple-950 to-stone-900'
  },
  {
    id: 'aslan-yuregi',
    name: 'Aslan Yüreği (Icardi Kartı)',
    arcana: 'Büyük Sır Kartı • III',
    symbol: '🦁 ⚽',
    element: '90+4 Zaferi & Neşe',
    meaning: 'Asla pes etmeyenlerin kartı. Karşına ne engel çıkarsa çıksın, 90+4’te köşeye takılan o gol gibi günün sonunda hep yüzün gülecek.',
    loveMessage: 'Tribünler "Aşkın Olayım" diye inlerken sen günün yıldızısın.',
    luckyDetail: 'Şanslı Skor: 5. Yıldız Şampiyonluk',
    colorGradient: 'from-red-950 via-amber-950 to-purple-950'
  },
  {
    id: 'mor-tesla-yol',
    name: 'Mor Tesla & Yolculuk Kartı',
    arcana: 'Büyük Sır Kartı • IV',
    symbol: '🚗 ⚡',
    element: 'Özgürlük & Yeni Hayaller',
    meaning: 'Yakında camları açık, Yalın çalan, mor renkte bir arabada rüzgara karşı gülümseyeceğin ferah ve mutlu günler çok yakın.',
    loveMessage: 'Hayal ettiğin her güzel yolculukta en güzel rotalar seninle olsun.',
    luckyDetail: 'Şanslı Plaka: 34 ILOS 28',
    colorGradient: 'from-indigo-950 via-purple-950 to-pink-950'
  },
  {
    id: 'sonsuz-bag',
    name: 'Sonsuz Şans & Parıltı Kartı',
    arcana: 'Büyük Sır Kartı • V',
    symbol: '🌟 💜',
    element: 'Kader & Özel Dostluk',
    meaning: 'Günün kehaneti: Etrafında senin değerini çok iyi bilen, her başarınla gurur duyan ve sana her an destek olmaya hazır insanlar var.',
    loveMessage: '“İyi ki doğdun İloş, enerjin dünyayı güzelleştiriyor!”',
    luckyDetail: 'Şanslı Tarih: 20 Ağustos',
    colorGradient: 'from-pink-950 via-purple-950 to-fuchsia-950'
  }
];

export const IlosTarot: React.FC<IlosTarotProps> = ({ onUnlockAchievement }) => {
  const [selectedCard, setSelectedCard] = useState<TarotCard | null>(null);
  const [isFlipping, setIsFlipping] = useState(false);
  const [drawnCardsCount, setDrawnCardsCount] = useState(0);

  const handleDrawCard = (card: TarotCard) => {
    if (isFlipping) return;
    soundManager.playPop();
    setIsFlipping(true);
    setSelectedCard(null);

    setTimeout(() => {
      setSelectedCard(card);
      setIsFlipping(false);
      soundManager.playAchievement();
      launchMorKonfeti();
      setDrawnCardsCount((prev) => prev + 1);
      onUnlockAchievement('mor-tarot');
    }, 600);
  };

  const handleRandomDraw = () => {
    const randomIndex = Math.floor(Math.random() * tarotDeck.length);
    handleDrawCard(tarotDeck[randomIndex]);
  };

  return (
    <section id="tarot-section" className="py-24 px-4 sm:px-6 relative overflow-hidden">
      
      {/* Mystical Background Nebula */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-purple-900/15 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/70 border border-purple-600/40 text-purple-300 text-xs font-mono-code mb-3">
            <Moon className="w-3.5 h-3.5 text-purple-400" />
            <span>MİSTİK EVREN • GÜNLÜK FAL</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            İloş Mor Tarot & Günlük Kehanet 🔮
          </h2>
          <p className="text-sm sm:text-base text-purple-300/80 max-w-lg mx-auto mt-2">
            Aşağıdaki gizemli kartlardan birine dokun veya rastgele çek; günün mesajını oku.
          </p>
        </div>

        {/* Tarot Deck Visual Carousel */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
          {tarotDeck.map((card, idx) => (
            <motion.button
              key={card.id}
              whileHover={{ y: -8, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleDrawCard(card)}
              className={`w-28 sm:w-36 h-44 sm:h-56 rounded-2xl p-3 border flex flex-col items-center justify-between transition-all relative overflow-hidden shadow-xl ${
                selectedCard?.id === card.id
                  ? 'border-pink-400 shadow-pink-900/50 scale-105 ring-2 ring-pink-500/50'
                  : 'border-purple-700/50 hover:border-purple-400'
              } bg-gradient-to-b from-[#180a2a] via-[#120520] to-[#1f0933]`}
            >
              <div className="w-full flex items-center justify-between text-[10px] text-purple-400 font-mono-code">
                <span>✦</span>
                <span>{idx + 1}</span>
                <span>✦</span>
              </div>

              <div className="w-12 h-12 rounded-full border border-purple-500/40 flex items-center justify-center text-xl bg-purple-950/60 shadow-inner">
                {card.symbol.split(' ')[0]}
              </div>

              <span className="text-[11px] font-bold text-center text-purple-200 line-clamp-2 leading-tight">
                {card.name}
              </span>

              <div className="w-full text-center text-[9px] font-mono-code text-purple-400/80 uppercase">
                Açmak İçin Dokun
              </div>
            </motion.button>
          ))}
        </div>

        {/* Draw Random Button */}
        <div className="text-center mb-10">
          <button
            onClick={handleRandomDraw}
            className="px-6 py-3 rounded-2xl bg-purple-950/70 hover:bg-purple-900 border border-purple-600/40 text-purple-200 hover:text-white font-mono-code text-xs flex items-center gap-2 mx-auto transition-all hover:scale-105"
          >
            <Shuffle className="w-4 h-4 text-pink-400" />
            <span>Kaderine Bırak (Rastgele Kart Çek)</span>
          </button>
        </div>

        {/* Active Tarot Card Detailed Reading */}
        <AnimatePresence mode="wait">
          {selectedCard && (
            <motion.div
              key={selectedCard.id}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className={`rounded-3xl p-6 sm:p-12 bg-gradient-to-br ${selectedCard.colorGradient} border-2 border-pink-400/40 shadow-2xl shadow-purple-950/90 relative overflow-hidden`}
            >
              <div className="flex flex-col md:flex-row items-center gap-8">
                
                {/* Left Card Visual */}
                <div className="w-44 sm:w-52 h-68 sm:h-80 rounded-3xl p-5 border-2 border-pink-300/50 bg-black/60 backdrop-blur-md flex flex-col items-center justify-between text-center shrink-0 shadow-2xl shadow-black/80">
                  <span className="text-xs font-mono-code text-pink-300 uppercase tracking-widest">
                    {selectedCard.arcana}
                  </span>
                  
                  <div className="text-5xl my-2 drop-shadow-2xl">
                    {selectedCard.symbol}
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-white leading-tight">
                      {selectedCard.name}
                    </h4>
                    <span className="text-[11px] font-mono-code text-purple-300 mt-1 block">
                      {selectedCard.element}
                    </span>
                  </div>

                  <div className="w-full pt-2 border-t border-purple-800/40 text-[10px] font-mono-code text-pink-400">
                    KADER MÜHRÜ ✓
                  </div>
                </div>

                {/* Right Interpretation Content */}
                <div className="flex-1 space-y-4 text-center md:text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/60 text-pink-300 text-xs font-mono-code border border-pink-500/30">
                    <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                    <span>GÜNÜN MİSTİK YORUMU</span>
                  </div>

                  <h3 className="text-2xl sm:text-4xl font-display font-extrabold text-white">
                    {selectedCard.name}
                  </h3>

                  <p className="text-sm sm:text-base text-purple-100 leading-relaxed font-light">
                    {selectedCard.meaning}
                  </p>

                  <div className="p-4 rounded-2xl bg-black/40 border border-purple-700/40">
                    <span className="text-xs font-mono-code text-pink-400 font-bold block mb-1">
                      💜 Mustafa Can'ın Kalp Notu:
                    </span>
                    <p className="text-xs sm:text-sm text-white font-serif-italic">
                      {selectedCard.loveMessage}
                    </p>
                  </div>

                  <div className="text-xs font-mono-code text-purple-300/80 pt-2 flex flex-wrap items-center gap-4 justify-center md:justify-start">
                    <span>🔮 {selectedCard.luckyDetail}</span>
                  </div>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
