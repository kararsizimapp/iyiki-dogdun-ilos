import React from 'react';
import { Heart, Sparkles, Coffee } from 'lucide-react';
import { soundManager } from '../utils/audio';

export const Footer: React.FC = () => {
  return (
    <footer className="py-16 px-4 sm:px-6 border-t border-purple-900/30 bg-[#09040e] text-center relative">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        
        {/* Date infinity stamp */}
        <div className="font-mono-code text-sm sm:text-base font-bold text-purple-300 tracking-widest mb-2">
          20.08.1998 → ∞
        </div>

        {/* Title */}
        <h4 className="font-display font-extrabold text-lg text-white tracking-tight">
          İloş Birthday Universe
        </h4>

        {/* Made with by Mustafa Can */}
        <p className="mt-4 text-xs sm:text-sm text-purple-400/80 font-serif-italic max-w-md mx-auto leading-relaxed">
          Made with kahve, gereğinden fazla detay ve biraz da “zaateeen” by <span className="text-pink-300 font-sans font-semibold">Mustafa Can</span>.
        </p>

        <div className="mt-6 flex items-center gap-4 text-[11px] font-mono-code text-purple-500/60">
          <span>Selin İlayda Güneş</span>
          <span>•</span>
          <span>28. Yaş</span>
          <span>•</span>
          <span>2026</span>
        </div>

      </div>
    </footer>
  );
};
