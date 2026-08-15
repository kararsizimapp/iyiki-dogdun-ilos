import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertCircle, Sparkles, Footprints } from 'lucide-react';
import { soundManager } from '../utils/audio';
import { launchPurpleConfetti } from '../utils/confetti';

interface FloatingEasterEggsProps {
  onUnlockAchievement: (id: string) => void;
}

export const FloatingEasterEggs: React.FC<FloatingEasterEggsProps> = ({
  onUnlockAchievement
}) => {
  const [showDoNotPressModal, setShowDoNotPressModal] = useState(false);
  const [fastScrollToast, setFastScrollToast] = useState(false);
  const [ultraIlosMode, setUltraIlosMode] = useState(false);

  // Fast scroll detector
  useEffect(() => {
    let lastScrollTop = window.scrollY;
    let lastScrollTime = Date.now();

    const handleScroll = () => {
      const currentScrollTop = window.scrollY;
      const currentTime = Date.now();
      const timeDiff = currentTime - lastScrollTime;
      const distance = Math.abs(currentScrollTop - lastScrollTop);

      if (timeDiff > 0 && timeDiff < 100) {
        const speed = distance / timeDiff; // px per ms
        if (speed > 8.5 && !fastScrollToast) {
          setFastScrollToast(true);
          setTimeout(() => setFastScrollToast(false), 3000);
        }
      }

      lastScrollTop = currentScrollTop;
      lastScrollTime = currentTime;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [fastScrollToast]);

  // Konami Code listener
  useEffect(() => {
    const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let currentIndex = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === konamiSequence[currentIndex] || e.key.toLowerCase() === konamiSequence[currentIndex]) {
        currentIndex++;
        if (currentIndex === konamiSequence.length) {
          currentIndex = 0;
          triggerUltraMode();
        }
      } else {
        currentIndex = 0;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const triggerUltraMode = () => {
    soundManager.playAchievement();
    launchPurpleConfetti();
    setUltraIlosMode(true);
    setTimeout(() => {
      setUltraIlosMode(false);
    }, 4500);
  };

  const handleDoNotPress = () => {
    soundManager.playPop();
    setShowDoNotPressModal(true);
    onUnlockAchievement('merakli-ilos');
  };

  return (
    <>
      {/* Floating "Buraya Basma" Easter Egg Button */}
      <div className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-40">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleDoNotPress}
          className="px-3 py-1.5 rounded-full bg-purple-950/80 border border-purple-700/50 hover:border-pink-500/60 text-purple-300 hover:text-pink-300 text-[10px] sm:text-[11px] font-mono-code backdrop-blur-md shadow-lg shadow-purple-950/50 transition-all flex items-center gap-1.5"
        >
          <AlertCircle className="w-3 h-3 text-pink-400" />
          <span>Buraya basma.</span>
        </motion.button>
      </div>

      {/* "Buraya Basma" modal */}
      <AnimatePresence>
        {showDoNotPressModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#1b0e33] border border-pink-500/50 rounded-3xl p-6 max-w-sm w-full shadow-2xl text-center"
            >
              <div className="text-4xl mb-3">😏</div>
              <h4 className="text-lg font-bold text-white mb-2">
                “Basacağını biliyorduk zaateeen.”
              </h4>
              <p className="text-xs text-purple-200 font-serif-italic mb-5">
                Meraklı İloş başarımı açıldı!
              </p>
              <button
                onClick={() => setShowDoNotPressModal(false)}
                className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition-colors"
              >
                Haklısınız, kapattım ✓
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Fast Scroll Toast */}
      <AnimatePresence>
        {fastScrollToast && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -20, x: '-50%' }}
            className="fixed top-16 sm:top-20 left-1/2 z-50 px-4 py-2 rounded-2xl bg-purple-950/95 border border-purple-500/60 text-purple-100 text-xs font-mono-code shadow-2xl backdrop-blur-md flex items-center gap-2 max-w-[92vw] text-center"
          >
            <span>🐶</span>
            <span className="truncate">“Yavaş la, Aşk Bahçesi’ndekileri korkutacaksın.”</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ULTRA İLOŞ MODE OVERLAY */}
      <AnimatePresence>
        {ultraIlosMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 pointer-events-none flex flex-col items-center justify-center bg-purple-950/30 backdrop-blur-xs"
          >
            <div className="bg-[#1e0a38]/95 border-2 border-pink-400 p-8 rounded-3xl text-center shadow-2xl animate-pulse max-w-sm">
              <div className="text-5xl mb-2">🚀 💜 ⚡ 🐾</div>
              <h3 className="text-2xl font-black text-white">ULTRA İLOŞ MODE</h3>
              <p className="text-xs text-pink-300 font-mono-code mt-1">
                Kahve, Aşk Bahçesi, Zaateeen ve Galatasaray maksimum seviyede!
              </p>
              <span className="text-[10px] text-purple-400 block mt-4 font-mono-code">
                Tamam normale dönelim...
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
