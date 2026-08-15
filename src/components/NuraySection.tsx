import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, ShieldCheck, Crown } from 'lucide-react';
import { soundManager } from '../utils/audio';

// If Nuray Anne writes a message later, place it here:
const NURAY_MESSAGE = "";

export const NuraySection: React.FC = () => {
  const [isRevealed, setIsRevealed] = useState(false);

  const handleReveal = () => {
    soundManager.playPop();
    setIsRevealed(true);
  };

  return (
    <section id="nuray-section" className="py-16 px-4 sm:px-6 relative">
      <div className="max-w-3xl mx-auto">
        
        <div className="bg-gradient-to-b from-[#1c0e35] to-[#120724] border border-pink-700/40 rounded-3xl p-6 sm:p-8 shadow-xl text-center relative overflow-hidden">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-950/60 border border-pink-700/40 text-pink-300 text-xs font-mono-code mb-4">
            <Crown className="w-3.5 h-3.5 text-yellow-400" />
            <span>1998'DEN BERİ PROJEYİ YÖNETEN KİŞİ</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-2">
            Nuray Anne
          </h3>

          <div className="max-w-lg mx-auto bg-purple-950/50 rounded-2xl p-5 border border-purple-800/40 my-4 text-xs sm:text-sm font-mono-code text-purple-200/90 space-y-2 text-left">
            <div className="flex justify-between border-b border-purple-800/40 pb-2">
              <span className="text-purple-400">İLOŞ PROJESİ BAŞLANGIÇ:</span>
              <span className="text-pink-300 font-bold">20.08.1998</span>
            </div>
            <div className="flex justify-between border-b border-purple-800/40 pb-2">
              <span className="text-purple-400">SİSTEM DURUMU:</span>
              <span className="text-green-400 font-bold">28 Yıldır Başarıyla Çalışıyor ✓</span>
            </div>
          </div>

          <p className="text-sm text-purple-200/90 font-serif-italic max-w-lg mx-auto mt-4 leading-relaxed">
            “Bugünkü İloş’un hikâyesinde en eski ve en değerli imzalardan biri elbette annesine ait.”
          </p>

          {NURAY_MESSAGE && (
            <div className="mt-4 p-4 rounded-2xl bg-pink-950/40 border border-pink-600/40 text-pink-100 text-sm font-serif-italic">
              “{NURAY_MESSAGE}”
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
