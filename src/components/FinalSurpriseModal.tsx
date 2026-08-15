import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, Flower2, X } from 'lucide-react';
import { soundManager } from '../utils/audio';
import { launchGrandBirthdayConfetti } from '../utils/confetti';

interface FinalSurpriseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FinalSurpriseModal: React.FC<FinalSurpriseModalProps> = ({ isOpen, onClose }) => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setStage(0);
      const t1 = setTimeout(() => {
        setStage(1); // "İyi ki doğdun"
        soundManager.playPop();
      }, 700);

      const t2 = setTimeout(() => {
        setStage(2); // "Selin."
        soundManager.playPop();
      }, 1800);

      const t3 = setTimeout(() => {
        setStage(3); // "Şaka şaka."
        soundManager.playPop();
      }, 3100);

      const t4 = setTimeout(() => {
        setStage(4); // "İyi ki doğdun İLOŞ. 💜" + Giant Confetti
        soundManager.playAchievement();
        soundManager.playMeow();
        launchGrandBirthdayConfetti();
      }, 4200);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
        clearTimeout(t4);
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 text-white px-6 overflow-hidden">
      
      {/* Floating Flowers and Stars Background in Stage 4 */}
      {stage >= 4 && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            className="w-full h-full stars-bg"
          />
        </div>
      )}

      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 p-3 rounded-full bg-purple-950/60 text-purple-300 hover:text-white border border-purple-700/40 z-30 transition-all"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Main Narrative Progression */}
      <div className="relative z-20 text-center max-w-xl flex flex-col items-center">
        
        {stage >= 1 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl sm:text-3xl text-purple-300 font-serif-italic mb-2"
          >
            İyi ki doğdun
          </motion.div>
        )}

        {stage === 2 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-4xl sm:text-6xl font-display font-extrabold text-white mb-4"
          >
            Selin.
          </motion.div>
        )}

        {stage === 3 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-2xl sm:text-3xl text-pink-400 font-mono-code font-bold mb-4"
          >
            Şaka şaka...
          </motion.div>
        )}

        {stage >= 4 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', damping: 12 }}
            className="flex flex-col items-center"
          >
            <h2 className="text-5xl sm:text-7xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-pink-400 to-purple-100 tracking-tight leading-tight my-4">
              İyi ki doğdun İLOŞ! 💜
            </h2>

            <div className="px-4 py-2 rounded-2xl bg-purple-950/80 border border-pink-500/40 text-pink-300 text-xs sm:text-sm font-serif-italic my-2 max-w-md">
              “Dünyanın en güzel kadını, en güzel bakan gözleri... İyi ki varsın.”
              <span className="block text-[11px] text-purple-300 font-mono-code font-bold mt-1">— Mustafa Can</span>
            </div>

            <div className="flex items-center gap-3 my-3 text-2xl">
              <span>🌸</span>
              <span>☕</span>
              <span>💗</span>
              <span>🐾</span>
              <span>✨</span>
            </div>

            <p className="text-sm sm:text-base text-purple-200/90 font-light max-w-md mt-2 font-serif-italic leading-relaxed">
              28. yaşın sana tüm güzellikleri, hak ettiğin başarıları, sınırsız mutluluğu ve kalbindeki tüm dilekleri getirsin.
            </p>

            <button
              onClick={() => {
                soundManager.playAchievement();
                launchGrandBirthdayConfetti();
              }}
              className="mt-8 px-6 py-3 rounded-2xl bg-purple-900/60 hover:bg-purple-800 border border-purple-500/50 text-purple-200 hover:text-white text-xs font-mono-code flex items-center gap-2 transition-all shadow-lg"
            >
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span>Tekrar Konfeti Yağdır 🎉</span>
            </button>
          </motion.div>
        )}

      </div>

      {/* Walking Cat across bottom */}
      {stage >= 4 && (
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: '100vw' }}
          transition={{ duration: 10, ease: 'linear', repeat: Infinity }}
          className="absolute bottom-6 left-0 text-3xl pointer-events-none z-30"
        >
          🐈‍⬛ 🐾 🐾
        </motion.div>
      )}

      {/* Bottom corner whisper */}
      {stage >= 4 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-6 right-6 text-right text-xs text-purple-400/80 font-mono-code"
        >
          <div>“zaateeen duygulanacağını biliyordum.”</div>
          <div className="text-[10px] text-purple-500/60 mt-0.5">Tamam tamam kapatıyorum. :)</div>
        </motion.div>
      )}

    </div>
  );
};
