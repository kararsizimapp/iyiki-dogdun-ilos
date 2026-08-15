import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Activity, CheckCircle2, Dumbbell, Sparkles, Flame, Play } from 'lucide-react';
import { soundManager } from '../utils/audio';
import { launchPurpleConfetti } from '../utils/confetti';

interface TrainingModeProps {
  onUnlockAchievement: (id: string) => void;
}

export const TrainingMode: React.FC<TrainingModeProps> = ({ onUnlockAchievement }) => {
  const [motivationLoaded, setMotivationLoaded] = useState(false);
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [count, setCount] = useState(3);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMotivationLoaded(true);
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  const handleStartWorkout = () => {
    if (isCountingDown || isDone) return;
    soundManager.playPop();
    setIsCountingDown(true);
    setCount(3);

    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsCountingDown(false);
          setIsDone(true);
          soundManager.playAchievement();
          launchPurpleConfetti();
          onUnlockAchievement('hummel-fit');
          return 0;
        }
        soundManager.playClick();
        return prev - 1;
      });
    }, 800);
  };

  return (
    <section id="training-section" className="py-20 px-4 sm:px-6 relative">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-800/40 text-purple-300 text-xs font-mono-code mb-3">
            <Activity className="w-3.5 h-3.5 text-purple-400" />
            <span>SAHNE 08 • HUMMEL SPOR MODU</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            İloş Training Mode
          </h2>
          <p className="text-sm sm:text-base text-purple-300/70 max-w-lg mx-auto mt-2">
            Hummel ekipmanları, pembe termos ve spor salonuna hazır enerji.
          </p>
        </div>

        {/* Training Box */}
        <div className="bg-[#140b25]/90 backdrop-blur-xl border border-purple-700/40 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-purple-950/60">
          
          <div className="flex items-center justify-between pb-4 border-b border-purple-800/40 mb-6">
            <div className="flex items-center gap-2 text-white font-bold text-sm sm:text-base">
              <Dumbbell className="w-5 h-5 text-pink-400" />
              <span>Günün Fit Kombini</span>
            </div>
            <span className="text-[11px] font-mono-code px-2.5 py-1 rounded-full bg-purple-900/60 text-purple-200 border border-purple-700/30">
              HUMMEL EDITION
            </span>
          </div>

          {/* Checklist */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-8">
            <div className="p-3.5 rounded-2xl bg-purple-950/40 border border-purple-800/30 flex items-center justify-between text-sm">
              <span className="text-purple-200 flex items-center gap-2">
                <span>👟</span> Hummel Spor Ayakkabı
              </span>
              <CheckCircle2 className="w-4 h-4 text-green-400" />
            </div>

            <div className="p-3.5 rounded-2xl bg-purple-950/40 border border-purple-800/30 flex items-center justify-between text-sm">
              <span className="text-purple-200 flex items-center gap-2">
                <span>🩱</span> Hummel Tayt
              </span>
              <CheckCircle2 className="w-4 h-4 text-green-400" />
            </div>

            <div className="p-3.5 rounded-2xl bg-purple-950/40 border border-purple-800/30 flex items-center justify-between text-sm">
              <span className="text-purple-200 flex items-center gap-2">
                <span>👕</span> Hummel Tişört
              </span>
              <CheckCircle2 className="w-4 h-4 text-green-400" />
            </div>

            <div className="p-3.5 rounded-2xl bg-purple-950/40 border border-purple-800/30 flex items-center justify-between text-sm">
              <span className="text-purple-200 flex items-center gap-2">
                <span>💗</span> Pembe Su Termosu
              </span>
              <CheckCircle2 className="w-4 h-4 text-green-400" />
            </div>
          </div>

          {/* Motivation Status */}
          <div className="p-4 rounded-2xl bg-purple-950/60 border border-purple-800/40 mb-8 flex items-center justify-between text-xs font-mono-code">
            <span className="text-purple-300">SPOR MOTİVASYONU:</span>
            {motivationLoaded ? (
              <span className="text-green-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Bulundu sayılır ✓</span>
              </span>
            ) : (
              <span className="text-amber-400 flex items-center gap-1 animate-pulse">
                <span>Aranıyor...</span>
              </span>
            )}
          </div>

          {/* Action Button / Countdown */}
          <div className="text-center">
            {!isDone ? (
              <div>
                {isCountingDown ? (
                  <div className="text-5xl font-display font-extrabold text-pink-400 animate-bounce my-4">
                    {count}
                  </div>
                ) : (
                  <button
                    id="training-start-btn"
                    onClick={handleStartWorkout}
                    className="px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-sm sm:text-base shadow-xl shadow-purple-950 transition-all flex items-center gap-2 mx-auto hover:scale-105"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    <span>Antrenmana Başla</span>
                  </button>
                )}
              </div>
            ) : (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="p-6 rounded-2xl bg-purple-900/50 border border-purple-500/40 text-center"
              >
                <div className="text-4xl mb-2">🎉</div>
                <h4 className="text-lg font-bold text-white mb-1">
                  Antrenman Tamamlandı!
                </h4>
                <p className="text-sm text-pink-300 font-serif-italic">
                  “Bugünlük bunu site yaptı. Sen rahat ol. 👟”
                </p>
              </motion.div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
