import React from 'react';
import { Sparkles, Trophy, Droplets, Volume2, VolumeX, Music, Heart } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface NavbarProps {
  hydrationCount: number;
  onAddHydration: () => void;
  unlockedAchievementsCount: number;
  totalAchievementsCount: number;
  onOpenAchievements: () => void;
  isPlayingMusic: boolean;
  onToggleMusic: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  scrollProgress: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  hydrationCount,
  onAddHydration,
  unlockedAchievementsCount,
  totalAchievementsCount,
  onOpenAchievements,
  isPlayingMusic,
  onToggleMusic,
  isMuted,
  onToggleMute,
  scrollProgress
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-3 sm:px-6 py-3 transition-all duration-300">
      <div className="max-w-6xl mx-auto bg-[#130b22]/85 backdrop-blur-md border border-purple-800/40 rounded-2xl px-4 py-2.5 flex items-center justify-between shadow-lg shadow-purple-950/40">
        
        {/* Left: Brand / Title */}
        <div className="flex items-center gap-3">
          <a
            href="#hero"
            id="nav-logo"
            className="flex items-center gap-2 group cursor-pointer"
            onClick={() => soundManager.playClick()}
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 to-fuchsia-500 flex items-center justify-center text-white shadow-md shadow-purple-900/50 group-hover:scale-105 transition-transform">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-sm sm:text-base tracking-tight text-purple-100 flex items-center gap-1">
                İLOŞ <span className="text-purple-400 font-mono-code text-xs font-normal">v28.0</span>
              </span>
              <span className="text-[10px] text-purple-300/60 hidden sm:inline">
                20.08.1998
              </span>
            </div>
          </a>

          {/* Quick Universe Exploration status */}
          <div className="hidden lg:flex items-center gap-2 pl-3 border-l border-purple-800/40 text-xs text-purple-300/80">
            <span className="font-mono-code">
              {scrollProgress >= 98 ? 'Evren %100 keşfedildi 💜' : `Evren %${scrollProgress} keşfedildi`}
            </span>
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          
          {/* Yalın - Akşamüstü Soundtrack Quick Pill */}
          <button
            id="nav-soundtrack-btn"
            onClick={() => {
              soundManager.playPop();
              onToggleMusic();
            }}
            title="Yalın - Akşamüstü Çal/Duraklat"
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 border ${
              isPlayingMusic
                ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white border-pink-400 shadow-md shadow-purple-900/50'
                : 'bg-purple-950/40 text-purple-300 border-purple-800/40 hover:bg-purple-900/50'
            }`}
          >
            <Music className={`w-3.5 h-3.5 ${isPlayingMusic ? 'text-pink-300 animate-bounce' : 'text-purple-400'}`} />
            <span className="hidden sm:inline">Akşamüstü</span>
            <span className="text-[10px] px-1 py-0.2 rounded bg-purple-900/70 font-mono-code">
              {isPlayingMusic ? 'ÇALIYOR' : 'ÇAL'}
            </span>
          </button>

          {/* Hydration Counter (Pembe Termos) */}
          <button
            id="nav-hydration-btn"
            onClick={() => {
              soundManager.playPop();
              onAddHydration();
            }}
            title="Pembe Termosla Su İç (+1 Hidrasyon)"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-pink-950/40 border border-pink-800/40 text-pink-200 hover:bg-pink-900/50 transition-all text-xs font-medium"
          >
            <Droplets className="w-3.5 h-3.5 text-pink-400 fill-pink-400/40" />
            <span className="font-mono-code text-[11px] font-bold">
              {hydrationCount >= 5 ? '5/5 ✓' : `${hydrationCount}/5`}
            </span>
          </button>

          {/* Achievements Trigger */}
          <button
            id="nav-achievements-btn"
            onClick={() => {
              soundManager.playClick();
              onOpenAchievements();
            }}
            title="Başarımlar ve Gizli Sırlar"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-purple-950/50 border border-purple-800/40 text-amber-200 hover:bg-purple-900/60 transition-all text-xs font-medium"
          >
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-mono-code text-[11px]">
              {unlockedAchievementsCount}/{totalAchievementsCount}
            </span>
          </button>

          {/* Mute SFX */}
          <button
            id="nav-mute-btn"
            onClick={() => {
              onToggleMute();
            }}
            title={isMuted ? 'Sesi Aç' : 'Sesi Kapat'}
            className="p-1.5 rounded-xl bg-purple-950/40 text-purple-300 border border-purple-800/40 hover:bg-purple-900/50 transition-all"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-purple-400" /> : <Volume2 className="w-4 h-4 text-purple-200" />}
          </button>
        </div>

      </div>

      {/* Progress Bar at the top */}
      <div className="w-full max-w-6xl mx-auto mt-1 h-0.5 bg-purple-950/30 overflow-hidden rounded-full">
        <div
          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-150"
          style={{ width: `${Math.min(100, scrollProgress)}%` }}
        />
      </div>
    </header>
  );
};
