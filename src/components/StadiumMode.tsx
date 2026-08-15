import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Sparkles, Shield, Flame, Play } from 'lucide-react';
import { soundManager } from '../utils/audio';
import { launchGalatasarayConfetti } from '../utils/confetti';

interface StadiumModeProps {
  onUnlockAchievement: (id: string) => void;
}

export const StadiumMode: React.FC<StadiumModeProps> = ({ onUnlockAchievement }) => {
  const [stadiumActive, setStadiumActive] = useState(false);
  const [goalScored, setGoalScored] = useState(false);
  const [scorer, setScorer] = useState<string | null>(null);

  const handleToggleStadium = () => {
    soundManager.playGoal();
    setStadiumActive(!stadiumActive);
    setGoalScored(false);
  };

  const handleShoot = (player: string) => {
    soundManager.playGoal();
    setScorer(player);
    setGoalScored(true);
    launchGalatasarayConfetti();
    onUnlockAchievement('ultraslan-ilos');
  };

  return (
    <section id="stadium-section" className="py-20 px-4 sm:px-6 relative">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-800/40 text-purple-300 text-xs font-mono-code mb-3">
            <Trophy className="w-3.5 h-3.5 text-yellow-400" />
            <span>SAHNE 10 • TRİBÜN RUHU</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            İloş Stadium Mode
          </h2>
          <p className="text-sm sm:text-base text-purple-300/70 max-w-lg mx-auto mt-2">
            Galatasaray sevdası, tribün coşkusu ve 90+4 heyecanı.
          </p>
        </div>

        {/* Stadium Arena Card */}
        <div className={`rounded-3xl p-6 sm:p-10 border transition-all duration-500 shadow-2xl relative overflow-hidden ${
          stadiumActive
            ? 'bg-gradient-to-b from-[#240e1a] via-[#1a0826] to-[#0d0417] border-amber-500/50 shadow-amber-950/40'
            : 'bg-[#140b25]/90 border-purple-700/40 shadow-purple-950/60'
        }`}>
          
          {/* Subtle floodlight glow when active */}
          {stadiumActive && (
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          )}

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-purple-800/40 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-red-600 via-amber-500 to-yellow-500 flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-amber-950/60">
                🦁
              </div>
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>İLOŞ XI • RAMS PARK</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-amber-900/60 text-amber-300 font-mono-code">
                    GS EDITION
                  </span>
                </h3>
                <p className="text-xs text-purple-300/80">
                  Mauro Icardi & Barış Alper Yılmaz Özel Kadro
                </p>
              </div>
            </div>

            <button
              onClick={handleToggleStadium}
              className={`px-4 py-2.5 rounded-2xl font-mono-code text-xs font-semibold transition-all border flex items-center gap-2 ${
                stadiumActive
                  ? 'bg-amber-500 text-black border-yellow-300 shadow-md shadow-amber-950'
                  : 'bg-purple-950/60 text-purple-300 border-purple-700/40 hover:bg-purple-900/50'
              }`}
            >
              <span>{stadiumActive ? 'Tribün Işıkları Açık ✓' : '🏟️ Tribün Işıklarını Aç'}</span>
            </button>
          </div>

          {/* Mini Game: 90+4 Son Pozisyon */}
          <div className="bg-purple-950/50 border border-purple-700/40 rounded-2xl p-6 text-center relative">
            <span className="text-xs font-mono-code uppercase tracking-widest text-amber-400 font-bold block mb-2">
              90+4 • MAÇIN SON POZİSYONU
            </span>
            <h4 className="text-lg sm:text-xl font-bold text-white mb-6">
              Ceza sahasında top sekip önüne düştü! Kararın?
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto mb-6">
              <button
                id="stadium-shoot-icardi"
                onClick={() => handleShoot('Mauro Icardi')}
                className="p-4 rounded-2xl bg-gradient-to-r from-red-900/50 via-purple-900/40 to-amber-900/40 border border-amber-600/40 hover:border-amber-400 hover:scale-102 transition-all flex flex-col items-center gap-1 group text-white"
              >
                <span className="text-2xl">🇦🇷 ⚽</span>
                <span className="font-bold text-sm text-amber-200 group-hover:text-amber-100">
                  Icardi'ye Bırak
                </span>
                <span className="text-[11px] text-purple-300/70 font-serif-italic">
                  Aşkın Olayım köşeye taksın
                </span>
              </button>

              <button
                id="stadium-shoot-baris"
                onClick={() => handleShoot('Barış Alper Yılmaz')}
                className="p-4 rounded-2xl bg-gradient-to-r from-amber-900/40 via-purple-900/40 to-red-900/50 border border-yellow-600/40 hover:border-yellow-400 hover:scale-102 transition-all flex flex-col items-center gap-1 group text-white"
              >
                <span className="text-2xl">🇹🇷 ⚡</span>
                <span className="font-bold text-sm text-yellow-200 group-hover:text-yellow-100">
                  Barış Alper Yardırsın
                </span>
                <span className="text-[11px] text-purple-300/70 font-serif-italic">
                  Fizikle basıp içeri girsin
                </span>
              </button>
            </div>

            {/* Goal Celebration Message */}
            <AnimatePresence>
              {goalScored && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="p-5 rounded-2xl bg-gradient-to-r from-amber-950/70 via-purple-950/80 to-red-950/70 border border-amber-500/50 text-center"
                >
                  <div className="text-3xl sm:text-4xl font-display font-extrabold text-amber-300 tracking-wider mb-2 animate-bounce">
                    GOOOOOOOOL! ⚽🔥
                  </div>
                  <p className="text-sm font-bold text-white mb-1">
                    {scorer} 90+4'te fileleri havalandırdı!
                  </p>
                  <p className="text-xs text-pink-300 font-serif-italic">
                    “Yanlış cevap yoktu. İkisini de seviyorsun zaateeen.”
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
};
