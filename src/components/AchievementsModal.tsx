import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, X, CheckCircle2, Lock, Sparkles, Star } from 'lucide-react';
import { Achievement } from '../types';
import { soundManager } from '../utils/audio';

interface AchievementsModalProps {
  isOpen: boolean;
  onClose: () => void;
  achievements: Achievement[];
}

export const AchievementsModal: React.FC<AchievementsModalProps> = ({
  isOpen,
  onClose,
  achievements
}) => {
  if (!isOpen) return null;

  const unlockedCount = achievements.filter((a) => a.unlocked).length;
  const isAllUnlocked = unlockedCount === achievements.length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-[#160b29] border border-purple-600/50 rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl relative"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-purple-800/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">İloş Başarımları & Sırlar</h3>
              <p className="text-xs text-purple-300 font-mono-code">
                {unlockedCount} / {achievements.length} Başarım Açıldı
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-purple-950 text-purple-400 hover:text-white border border-purple-700/40"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-purple-950 rounded-full h-2 my-4 overflow-hidden border border-purple-800/30">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-amber-400 transition-all duration-300"
            style={{ width: `${(unlockedCount / achievements.length) * 100}%` }}
          />
        </div>

        {/* Master All-Unlocked Celebration */}
        {isAllUnlocked && (
          <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-900/80 via-pink-900/80 to-purple-900/80 border border-pink-400/50 text-center mb-4">
            <h4 className="text-sm font-bold text-pink-300 mb-1">
              “Sen gerçekten her yere bastın.”
            </h4>
            <p className="text-xs text-purple-100 font-serif-italic">
              “Bunu yapacağını tahmin etmiştik zaateeen.”
            </p>
            <span className="block text-[11px] font-mono-code text-pink-400 mt-1">
              — Mustafa
            </span>
          </div>
        )}

        {/* Achievements List */}
        <div className="overflow-y-auto space-y-3 pr-1 my-2 flex-1">
          {achievements.map((ach) => (
            <div
              key={ach.id}
              className={`p-3.5 rounded-2xl border flex items-start justify-between gap-3 transition-all ${
                ach.unlocked
                  ? 'bg-purple-900/40 border-purple-500/50 text-white'
                  : 'bg-purple-950/20 border-purple-900/30 text-purple-400/60 opacity-60'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                  ach.unlocked
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'bg-purple-950 text-purple-600 border border-purple-900/40'
                }`}>
                  {ach.unlocked ? <CheckCircle2 className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                </div>

                <div>
                  <h5 className="text-xs sm:text-sm font-bold text-purple-100">
                    {ach.title}
                  </h5>
                  <p className="text-[11px] text-purple-300/80 mt-0.5 leading-relaxed font-light">
                    {ach.unlocked ? ach.description : `İpucu: ${ach.hint}`}
                  </p>
                </div>
              </div>

              <span className={`text-[10px] font-mono-code px-2 py-0.5 rounded shrink-0 ${
                ach.unlocked
                  ? 'bg-purple-800/80 text-pink-300 border border-purple-600/50'
                  : 'bg-purple-950 text-purple-600'
              }`}>
                {ach.unlocked ? 'AÇILDI' : 'KİLİTLİ'}
              </span>
            </div>
          ))}
        </div>

        {/* Footer info */}
        <div className="pt-4 border-t border-purple-800/40 text-center">
          <p className="text-[11px] text-purple-400/70 font-mono-code">
            Sitedeki butonları, kahve fincanını, künefeyi ve gizli alanları keşfet!
          </p>
        </div>
      </motion.div>
    </div>
  );
};
