import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Film, Clapperboard, Sparkles, Popcorn } from 'lucide-react';
import { soundManager } from '../utils/audio';

export const Daha17Cinema: React.FC = () => {
  const [isCinemaMode, setIsCinemaMode] = useState(false);

  const handleToggleCinema = () => {
    soundManager.playPop();
    setIsCinemaMode(!isCinemaMode);
  };

  return (
    <section id="cinema-section" className="py-16 px-4 sm:px-6 relative">
      <div className="max-w-4xl mx-auto">
        <div className={`rounded-3xl p-6 sm:p-10 border transition-all duration-500 relative overflow-hidden ${
          isCinemaMode
            ? 'bg-[#180824] border-purple-400 shadow-2xl shadow-purple-950 film-grain'
            : 'bg-[#130a21]/90 border-purple-800/40 shadow-xl'
        }`}>
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-purple-800/40 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-700 to-pink-600 flex items-center justify-center text-white text-xl">
                🎬
              </div>
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <span>İloş Sinema Kulübü</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-purple-900/60 text-pink-300 font-mono-code">
                    DAHA 17
                  </span>
                </h3>
                <p className="text-xs text-purple-300/80">
                  Dizi ve sinema saatleri
                </p>
              </div>
            </div>

            <button
              onClick={handleToggleCinema}
              className={`px-4 py-2 rounded-xl text-xs font-mono-code font-semibold transition-all border flex items-center gap-2 ${
                isCinemaMode
                  ? 'bg-purple-600 text-white border-purple-400 shadow-md'
                  : 'bg-purple-950/60 text-purple-300 border-purple-800/40 hover:bg-purple-900/50'
              }`}
            >
              <Clapperboard className="w-3.5 h-3.5" />
              <span>{isCinemaMode ? 'Sinematik Mod Açık' : 'Daha 17 Modunu Aç'}</span>
            </button>
          </div>

          <div className="p-6 rounded-2xl bg-purple-950/40 border border-purple-800/30 text-center">
            <p className="text-sm sm:text-base text-purple-200/90 font-serif-italic max-w-xl mx-auto leading-relaxed">
              “Bazı şeyleri bir kez izlersin. <br className="hidden sm:inline" />
              Bazılarını İloş sevdiği için ezberlemeye yaklaşırsın.”
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};
