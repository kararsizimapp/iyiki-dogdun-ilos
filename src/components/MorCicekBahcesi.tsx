import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Flower2, Sparkles, Heart } from 'lucide-react';
import { flowersData } from '../data/ilosData';
import { soundManager } from '../utils/audio';

interface MorCicekBahcesiProps {
  onUnlockAchievement: (id: string) => void;
}

export const MorCicekBahcesi: React.FC<MorCicekBahcesiProps> = ({ onUnlockAchievement }) => {
  const [openedFlowers, setOpenedFlowers] = useState<number[]>([]);
  const [activeWord, setActiveWord] = useState<{ word: string; subtext: string } | null>(null);

  const handleFlowerClick = (flower: typeof flowersData[0]) => {
    soundManager.playPop();
    setActiveWord(flower);

    if (!openedFlowers.includes(flower.id)) {
      const nextOpened = [...openedFlowers, flower.id];
      setOpenedFlowers(nextOpened);

      if (nextOpened.length >= flowersData.length) {
        soundManager.playAchievement();
        onUnlockAchievement('cicek-bahcesi');
      }
    }
  };

  return (
    <section id="flowers-section" className="py-20 px-4 sm:px-6 relative">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-800/40 text-purple-300 text-xs font-mono-code mb-3">
            <Flower2 className="w-3.5 h-3.5 text-pink-400" />
            <span>SAHNE • MOR ÇİÇEK BAHÇESİ</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            Mor Çiçeklerin Sırrı
          </h2>
          <p className="text-sm sm:text-base text-purple-300/70 max-w-lg mx-auto mt-2">
            Her mor yaprağın altında Selin'in karakterini oluşturan bir parça gizli.
          </p>
        </div>

        {/* Garden Interactive Grid */}
        <div className="bg-[#150b28]/90 backdrop-blur-xl border border-purple-700/40 rounded-3xl p-6 sm:p-10 shadow-2xl shadow-purple-950/60">
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 mb-8">
            {flowersData.map((flower) => {
              const isOpened = openedFlowers.includes(flower.id);
              const isSpecial = flower.word === 'İloş';

              return (
                <motion.div
                  key={flower.id}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleFlowerClick(flower)}
                  className={`cursor-pointer rounded-2xl p-5 border text-center transition-all flex flex-col items-center justify-center min-h-[140px] relative overflow-hidden ${
                    isOpened
                      ? isSpecial
                        ? 'bg-gradient-to-tr from-purple-800 via-fuchsia-700 to-pink-600 border-pink-400 text-white shadow-lg shadow-pink-950/50'
                        : 'bg-purple-900/60 border-purple-500/50 text-white'
                      : 'bg-purple-950/40 border-purple-800/40 text-purple-300 hover:border-purple-600/50'
                  }`}
                >
                  <motion.div
                    animate={{ rotate: isOpened ? [0, 10, -10, 0] : 0 }}
                    className="text-4xl mb-2"
                  >
                    {isSpecial ? '👑 🌸' : '🌸'}
                  </motion.div>

                  <h4 className="text-base font-bold tracking-tight">
                    {flower.word}
                  </h4>

                  <span className="text-[10px] font-mono-code text-purple-300/80 mt-1">
                    {isOpened ? 'Açıldı ✓' : '(Dokun & Aç)'}
                  </span>
                </motion.div>
              );
            })}
          </div>

          {/* Active Word Meaning Popover */}
          <AnimatePresence>
            {activeWord && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-5 rounded-2xl bg-purple-950/80 border border-pink-500/40 text-center"
              >
                <h5 className="text-lg font-bold text-pink-300 mb-1">
                  🌸 {activeWord.word}
                </h5>
                <p className="text-sm text-purple-100 font-serif-italic">
                  “{activeWord.subtext}”
                </p>
                {activeWord.word === 'İloş' && (
                  <p className="mt-3 text-xs text-purple-300 font-medium pt-3 border-t border-purple-800/40">
                    “Bazı isimler bir süre sonra isim olmaktan çıkıyor. Bir sürü küçük anının kısa yolu oluyor.”
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
};
