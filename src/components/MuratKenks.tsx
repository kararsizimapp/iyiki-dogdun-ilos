import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Phone, Users, ShieldAlert, Sparkles, MessageCircle } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface MuratKenksProps {
  onUnlockAchievement: (id: string) => void;
}

export const MuratKenks: React.FC<MuratKenksProps> = ({ onUnlockAchievement }) => {
  const [isRevealed, setIsRevealed] = useState(false);

  const handleReveal = () => {
    soundManager.playPop();
    setIsRevealed(true);
    onUnlockAchievement('kenks-protokolu');
  };

  return (
    <section id="kenks-section" className="py-12 px-4 sm:px-6 relative">
      <div className="max-w-md mx-auto">
        
        <div className="bg-[#170c2a] border border-purple-700/40 rounded-3xl p-6 shadow-xl text-center">
          
          <div className="flex items-center justify-between pb-3 border-b border-purple-800/40 mb-4">
            <span className="text-[10px] font-mono-code uppercase tracking-widest text-purple-400">
              REHBER PROTOKOLÜ
            </span>
            <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-purple-900/60 text-pink-300">
              KENKS MODU
            </span>
          </div>

          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-800 to-indigo-600 flex items-center justify-center text-white text-2xl mx-auto mb-3 shadow-lg">
            ✌️
          </div>

          <h3 className="text-xl font-bold text-white mb-1">Murat</h3>
          <p className="text-xs text-purple-300 font-mono-code mb-4">
            Alias: <strong className="text-pink-300">Kenks / Kenksim</strong>
          </p>

          <div className="p-3.5 rounded-2xl bg-purple-950/60 border border-purple-800/30 text-left text-xs font-mono-code space-y-2 mb-4">
            <div>
              <span className="text-purple-400 block text-[10px]">İLİŞKİ STATÜSÜ:</span>
              <span className="text-purple-100 font-medium">İloş tarafından kenks kategorisine alınmış insan</span>
            </div>
            <div className="pt-2 border-t border-purple-800/30 text-[11px] text-pink-300 font-serif-italic">
              “Sistem bunu değiştirmeye yetkili değil zaateeen.”
            </div>
          </div>

          <button
            onClick={handleReveal}
            className="w-full py-2 rounded-xl bg-purple-950/80 hover:bg-purple-900 text-purple-300 hover:text-white border border-purple-700/40 text-xs font-mono-code transition-all"
          >
            {isRevealed ? 'Kenks Protokolü Doğrulandı ✓' : 'Kenks Protokolünü Doğrula'}
          </button>

        </div>

      </div>
    </section>
  );
};
