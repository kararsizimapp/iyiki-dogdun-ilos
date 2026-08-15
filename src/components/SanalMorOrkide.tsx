import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Droplets, Sun, Sparkles, Heart, RefreshCw, Award, Flower2 } from 'lucide-react';
import { soundManager } from '../utils/audio';
import { launchMorKonfeti } from '../utils/confetti';

interface SanalMorOrkideProps {
  onUnlockAchievement: (id: string) => void;
}

interface GrowthStage {
  stage: number;
  name: string;
  emoji: string;
  desc: string;
  quote: string;
  waterNeeded: number;
}

const stages: GrowthStage[] = [
  {
    stage: 0,
    name: 'Sihirli Tohum',
    emoji: '🌰',
    desc: 'Saksıda sevgiyle ekilmiş, filizlenmeyi bekleyen küçük bir tohum.',
    quote: '“Her büyük güzellik, küçük ve sabırlı bir adımla başlar.”',
    waterNeeded: 2
  },
  {
    stage: 1,
    name: 'İlk Yeşil Filiz',
    emoji: '🌱',
    desc: 'Toprağı yarıp hayata gözlerini açan taze filiz.',
    quote: '“Senin sevginle beslenen her şey mutlaka yeşerir.”',
    waterNeeded: 4
  },
  {
    stage: 2,
    name: 'Mor Tomurcuk',
    emoji: '🌿 💜',
    desc: 'Gövdesi güçlenen ve üzerinde mor tomurcuklar beliren asil bitki.',
    quote: '“Güzellik sabır ister; tıpkı KPSS gibi, sonu muhteşem olacak.”',
    waterNeeded: 7
  },
  {
    stage: 3,
    name: 'Açan Mor Orkide',
    emoji: '🌸 💜',
    desc: 'Kusursuz mor yapraklarıyla tüm odaya zarafet saçan çiçek.',
    quote: '“Sen baktığın her yeri, dokunduğun her kalbi böyle güzelleştirirsin.”',
    waterNeeded: 10
  },
  {
    stage: 4,
    name: 'Işıltılı Sonsuz İloş Orkidesi',
    emoji: '👑 🌺 ✨',
    desc: 'Büyüleyici ışıltılarla parlayan, hiç solmayacak ebedi aşk orkidesi.',
    quote: '“Dünyanın en güzel kadını için yetiştirilmiş, solmayan tek çiçek sensin.”',
    waterNeeded: 12
  }
];

export const SanalMorOrkide: React.FC<SanalMorOrkideProps> = ({ onUnlockAchievement }) => {
  const [waterCount, setWaterCount] = useState(0);
  const [sunCount, setSunCount] = useState(0);
  const [currentStageIdx, setCurrentStageIdx] = useState(0);
  const [isWatering, setIsWatering] = useState(false);
  const [floatingEffects, setFloatingEffects] = useState<{ id: number; text: string; x: number; y: number }[]>([]);

  const currentStage = stages[currentStageIdx];

  const handleWater = (e: React.MouseEvent<HTMLButtonElement>) => {
    soundManager.playPop();
    setIsWatering(true);
    setTimeout(() => setIsWatering(false), 800);

    const nextWater = waterCount + 1;
    setWaterCount(nextWater);

    // Spawn floating water drop effect
    const rect = e.currentTarget.getBoundingClientRect();
    const newEff = {
      id: Date.now(),
      text: '💧 +1 Can',
      x: rect.left + rect.width / 2,
      y: rect.top - 20
    };
    setFloatingEffects((prev) => [...prev, newEff]);
    setTimeout(() => {
      setFloatingEffects((prev) => prev.filter((item) => item.id !== newEff.id));
    }, 1200);

    // Stage progression logic
    if (currentStageIdx < stages.length - 1 && nextWater >= stages[currentStageIdx + 1].waterNeeded) {
      const nextIdx = currentStageIdx + 1;
      setCurrentStageIdx(nextIdx);
      soundManager.playAchievement();
      launchMorKonfeti();
      if (nextIdx >= stages.length - 1) {
        onUnlockAchievement('mor-orkide-usta');
      }
    }
  };

  const handleSunlight = () => {
    soundManager.playPop();
    setSunCount((prev) => prev + 1);
  };

  const handleReset = () => {
    soundManager.playClick();
    setWaterCount(0);
    setSunCount(0);
    setCurrentStageIdx(0);
  };

  return (
    <section id="sanal-orkide-section" className="py-24 px-4 sm:px-6 relative overflow-hidden">
      
      {/* Gentle Green & Purple Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/70 border border-purple-600/40 text-purple-300 text-xs font-mono-code mb-3">
            <Flower2 className="w-3.5 h-3.5 text-pink-400" />
            <span>CANLI BAHÇE • INTERAKTİF BİTKİ</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            İloş'un Mor Orkidesi 🌸💜
          </h2>
          <p className="text-sm sm:text-base text-purple-200/80 max-w-lg mx-auto mt-2">
            Toprağa can ver, güneş ışığı sağla ve tohumun adım adım göz alıcı bir mor orkideye dönüşmesini izle.
          </p>
        </div>

        {/* Flower Growth Glass Container */}
        <div className="rounded-3xl p-6 sm:p-12 bg-gradient-to-b from-[#160b28]/95 via-[#100720]/95 to-[#190a2e]/95 border-2 border-purple-500/40 shadow-2xl shadow-purple-950/90 relative overflow-hidden text-center">
          
          {/* Progress Top Bar */}
          <div className="flex items-center justify-between gap-4 pb-6 border-b border-purple-800/40 mb-8 text-xs font-mono-code text-purple-300">
            <span>Aşama: <strong className="text-white">{currentStageIdx + 1} / {stages.length}</strong></span>
            <span className="px-3 py-1 rounded-full bg-purple-900/60 border border-purple-700/40 text-pink-300">
              {currentStage.name}
            </span>
            <span>Sulama: <strong className="text-white">{waterCount} Damla</strong></span>
          </div>

          {/* Plant Growth Display Canvas */}
          <div className="relative py-12 flex flex-col items-center justify-center min-h-[260px]">
            
            {/* Pulsing Light Aura */}
            <motion.div
              animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="absolute w-56 h-56 rounded-full bg-purple-500/20 blur-3xl pointer-events-none"
            />

            {/* Plant Stage Emoji with Entry Animation */}
            <motion.div
              key={currentStage.stage}
              initial={{ scale: 0.5, opacity: 0, y: 20 }}
              animate={{ scale: isWatering ? 1.2 : 1, opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="text-7xl sm:text-9xl mb-4 drop-shadow-2xl select-none cursor-pointer"
              onClick={handleWater}
            >
              {currentStage.emoji}
            </motion.div>

            {/* Pot Graphic */}
            <div className="w-32 h-10 rounded-b-2xl bg-gradient-to-b from-amber-900/90 to-amber-950 border border-amber-700/60 shadow-xl flex items-center justify-center text-[10px] font-mono-code text-amber-200/80">
              İLOŞ SAKSI 🪴
            </div>

            {/* Stage Name & Description */}
            <div className="mt-6 max-w-md">
              <h3 className="text-2xl font-bold text-white mb-1">
                {currentStage.name}
              </h3>
              <p className="text-xs sm:text-sm text-purple-200/80 font-light mb-3">
                {currentStage.desc}
              </p>
              <p className="text-xs sm:text-sm text-pink-300 font-serif-italic">
                {currentStage.quote}
              </p>
            </div>

          </div>

          {/* Controls Bar */}
          <div className="pt-8 border-t border-purple-800/40 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={handleWater}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white font-bold text-xs sm:text-sm shadow-lg flex items-center gap-2 transition-all hover:scale-105"
            >
              <Droplets className="w-4 h-4 text-cyan-200 animate-bounce" />
              <span>Su Ver (Sevgiyle Büyüt)</span>
            </button>

            <button
              onClick={handleSunlight}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-600 via-yellow-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold text-xs sm:text-sm shadow-lg flex items-center gap-2 transition-all hover:scale-105"
            >
              <Sun className="w-4 h-4 text-yellow-200 animate-spin" style={{ animationDuration: '8s' }} />
              <span>Güneş Işığı Sağla ({sunCount})</span>
            </button>

            {currentStageIdx >= stages.length - 1 && (
              <button
                onClick={handleReset}
                className="px-4 py-3 rounded-2xl bg-purple-950/60 hover:bg-purple-900 border border-purple-700/40 text-purple-300 text-xs font-mono-code flex items-center gap-1.5 transition-all"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Yeniden Tohum Ek</span>
              </button>
            )}
          </div>

          {/* Floating effects */}
          {floatingEffects.map((eff) => (
            <motion.div
              key={eff.id}
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 0, y: -40 }}
              transition={{ duration: 1 }}
              className="fixed pointer-events-none text-xs font-mono-code font-bold text-cyan-300 drop-shadow-md z-50"
              style={{ left: eff.x, top: eff.y }}
            >
              {eff.text}
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
};
