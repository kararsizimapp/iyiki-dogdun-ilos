import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, Coffee } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface PreloaderProps {
  onComplete: () => void;
}

const steps = [
  { progress: 10, text: 'Bir İloş hazırlanıyor...' },
  { progress: 27, text: 'Mor tonu ayarlanıyor...' },
  { progress: 43, text: 'Kahve ekleniyor...' },
  { progress: 61, text: 'Pembe termos aranıyor...' },
  { progress: 73, text: 'Kediler toplanıyor...' },
  { progress: 88, text: 'Galatasaray kontenjanı açılıyor...' },
  { progress: 99, text: '“Zaateeen” sisteme yükleniyor...' },
  { progress: 100, text: 'Tamamdır.' }
];

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (currentStepIndex < steps.length - 1) {
      const duration = currentStepIndex === steps.length - 2 ? 1100 : 380;
      const timer = setTimeout(() => {
        soundManager.playPop();
        setCurrentStepIndex((prev) => prev + 1);
      }, duration);
      return () => clearTimeout(timer);
    } else {
      const finalTimer = setTimeout(() => {
        soundManager.playAchievement();
        setIsFinished(true);
        setTimeout(onComplete, 800);
      }, 700);
      return () => clearTimeout(finalTimer);
    }
  }, [currentStepIndex, onComplete]);

  const currentStep = steps[currentStepIndex];

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          id="preloader-screen"
          initial={{ opacity: 1 }}
          exit={{ y: '-100%', opacity: 0, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0512] text-white px-6"
        >
          {/* Subtle background glow */}
          <div className="absolute w-96 h-96 bg-purple-900/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 w-full max-w-md flex flex-col items-center text-center">
            {/* Animated Logo / Icon */}
            <motion.div
              animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
              className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-800 to-fuchsia-600 flex items-center justify-center shadow-lg shadow-purple-950 mb-8 border border-purple-400/30"
            >
              <Sparkles className="w-8 h-8 text-purple-100" />
            </motion.div>

            {/* Version / Title */}
            <span className="text-xs uppercase tracking-widest text-purple-400 font-mono-code mb-2">
              Selin İlayda Güneş • v28.0
            </span>
            <h2 className="text-2xl font-bold text-white mb-6 tracking-tight">
              İloş Universe Yükleniyor
            </h2>

            {/* Progress bar container */}
            <div className="w-full bg-purple-950/60 rounded-full h-3.5 p-0.5 border border-purple-800/40 mb-4 overflow-hidden">
              <motion.div
                className="bg-gradient-to-r from-purple-600 via-fuchsia-500 to-pink-500 h-full rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: `${currentStep.progress}%` }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              />
            </div>

            {/* Step info and percentage */}
            <div className="w-full flex items-center justify-between text-sm">
              <motion.span
                key={currentStep.text}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-purple-200/90 font-medium"
              >
                {currentStep.text}
              </motion.span>
              <span className="font-mono-code font-bold text-purple-300">
                %{currentStep.progress}
              </span>
            </div>

            {/* Mini cute icons */}
            <div className="flex items-center gap-3 mt-8 text-purple-400/60 text-xs">
              <span className="flex items-center gap-1"><Coffee className="w-3.5 h-3.5" /> Kahve</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5" /> Aşk Bahçesi</span>
              <span>•</span>
              <span>Zaateeen</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
