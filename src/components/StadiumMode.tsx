import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Sparkles, Shield, Flame, Star, Volume2, Users, Award, Radio } from 'lucide-react';
import { soundManager } from '../utils/audio';
import { launchGalatasarayConfetti } from '../utils/confetti';

interface StadiumModeProps {
  onUnlockAchievement: (id: string) => void;
}

interface GSPlayer {
  id: string;
  name: string;
  number: string;
  role: string;
  tag: string;
  emoji: string;
  quote: string;
  actionText: string;
}

const gsSquad: GSPlayer[] = [
  {
    id: 'icardi',
    name: 'Mauro Icardi',
    number: '#9',
    role: 'Kral & Aşk Adamı',
    tag: 'Aşkın Olayım',
    emoji: '🇦🇷 👑',
    quote: '“Benim sevdiğim tek bir şey var: Gol atmak ve tribünleri inletmek.”',
    actionText: 'Icardi Kulak Sevinci Yap 👂'
  },
  {
    id: 'osimhen',
    name: 'Victor Osimhen',
    number: '#45',
    role: 'Maskeli Süperstar',
    tag: 'Havadaki Roket',
    emoji: '🇳🇬 🎭',
    quote: '“Maskeyi takınca sahada beni kimse tutamaz!”',
    actionText: 'Maskeyi Tak & Havalan 🚀'
  },
  {
    id: 'baris',
    name: 'Barış Alper Yılmaz',
    number: '#53',
    role: 'Yerli Tank & Enerji',
    tag: 'Yorulmayan Motor',
    emoji: '🇹🇷 ⚡',
    quote: '“90 dakika yetmez, 180 dakika olsa yine koşarım.”',
    actionText: 'Rakipleri Sırtla & Yardır 💨'
  },
  {
    id: 'torreira',
    name: 'Lucas Torreira',
    number: '#34',
    role: 'Atom Karınca',
    tag: 'Orta Saha Efendisi',
    emoji: '🇺🇾 🐜',
    quote: '“O top benim olacak, başka yolu yok.”',
    actionText: 'Topu Çal & Kontraya Çık ⚔️'
  },
  {
    id: 'muslera',
    name: 'Fernando Muslera',
    number: '#1',
    role: 'Kaptan & Efsane Panter',
    tag: 'Geçilmez Duvar',
    emoji: '🇺🇾 🧤',
    quote: '“Galatasaray benim evim, bu kale benim mabedim.”',
    actionText: '90\'dan Çıkar 🧤'
  }
];

const chants = [
  { id: 'askin-olayim', title: 'Aşkın Olayım', singer: 'Simge / Tribün Korosu', text: '“Ben sana yanarken şimdi, sen kimbilir nerdesin...”' },
  { id: 'rerere', title: 'Re Re Re Ra Ra Ra', singer: 'ultrAslan Korosu', text: '“Re Re Re Ra Ra Ra! Galatasaray Galatasaray Cimbombom!”' },
  { id: 'sereftir', title: 'Şereftir Seni Sevmek', singer: 'RAMS Park 52.000 Kişi', text: '“Şereftir seni sevmek, senle ağlayıp gülmek...”' },
  { id: 'yildiz', title: '5. Yıldız Yolu', singer: 'Şampiyonluk Marşı', text: '“Armandaki yıldızlar parıldasın, 5. yıldız İloş\'a gelsin!”' }
];

export const StadiumMode: React.FC<StadiumModeProps> = ({ onUnlockAchievement }) => {
  const [stadiumActive, setStadiumActive] = useState(false);
  const [activePlayer, setActivePlayer] = useState<GSPlayer>(gsSquad[0]);
  const [activeChant, setActiveChant] = useState<string | null>(null);
  const [flaresIgnited, setFlaresIgnited] = useState(false);
  const [goalScored, setGoalScored] = useState(false);
  const [scorer, setScorer] = useState<string | null>(null);
  const [trophyLifted, setTrophyLifted] = useState(false);
  const [stadiumDb, setStadiumDb] = useState(115);

  const handleToggleStadium = () => {
    soundManager.playGoal();
    setStadiumActive(!stadiumActive);
    setGoalScored(false);
  };

  const handleShoot = (player: string) => {
    soundManager.playGoal();
    setScorer(player);
    setGoalScored(true);
    setStadiumDb(131.7);
    launchGalatasarayConfetti();
    onUnlockAchievement('ultraslan-ilos');
  };

  const handleChantClick = (chant: typeof chants[0]) => {
    soundManager.playPop();
    setActiveChant(chant.title);
    launchGalatasarayConfetti();
  };

  const handleIgniteFlares = () => {
    soundManager.playGoal();
    setFlaresIgnited(true);
    launchGalatasarayConfetti();
    setTimeout(() => setFlaresIgnited(false), 5000);
  };

  const handleLiftTrophy = () => {
    soundManager.playAchievement();
    setTrophyLifted(true);
    launchGalatasarayConfetti();
    onUnlockAchievement('ultraslan-ilos');
  };

  return (
    <section id="stadium-section" className="py-20 px-4 sm:px-6 relative">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-600/40 text-amber-300 text-xs font-mono-code mb-3">
            <Trophy className="w-3.5 h-3.5 text-yellow-400" />
            <span>SAHNE 10 • GALATASARAY & RAMS PARK</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            İloş Stadium Mode 🦁
          </h2>
          <p className="text-sm sm:text-base text-amber-200/80 max-w-xl mx-auto mt-2">
            Sarı & Kırmızı aşkı, tribün besteleri, Icardi gol sevinci ve 5. Yıldız coşkusu.
          </p>
        </div>

        {/* Stadium Arena Card */}
        <div className={`rounded-3xl p-6 sm:p-10 border transition-all duration-500 shadow-2xl relative overflow-hidden ${
          stadiumActive
            ? 'bg-gradient-to-b from-[#2a0d18] via-[#1a0822] to-[#0c0414] border-amber-500/60 shadow-amber-950/60'
            : 'bg-[#140b25]/90 border-purple-700/40 shadow-purple-950/60'
        }`}>
          
          {/* Flare / Pyro atmosphere */}
          {flaresIgnited && (
            <div className="absolute inset-0 bg-gradient-to-t from-red-600/20 via-amber-500/15 to-transparent pointer-events-none animate-pulse" />
          )}

          {/* Top Bar with Match Day Atmosphere */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-amber-800/40 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-red-600 via-amber-500 to-yellow-400 flex items-center justify-center text-white text-2xl font-black shadow-xl shadow-red-950/80 border border-amber-300/40">
                🦁
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-black text-white tracking-wide">
                    RAMS PARK • İLOŞ TRİBÜNÜ
                  </h3>
                  <div className="flex text-amber-400 text-xs">
                    ⭐⭐⭐⭐<span className="text-yellow-200 animate-pulse">⭐</span>
                  </div>
                </div>
                <p className="text-xs text-amber-300/80 font-mono-code mt-0.5">
                  Ses Düzeyi: <span className="font-bold text-white">{stadiumDb} dB</span> • 52.000 Aslan Hazır
                </p>
              </div>
            </div>

            {/* Stadium Action Controls */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handleToggleStadium}
                className={`px-4 py-2.5 rounded-2xl font-mono-code text-xs font-semibold transition-all border flex items-center gap-1.5 ${
                  stadiumActive
                    ? 'bg-amber-500 text-black border-yellow-300 shadow-md shadow-amber-950'
                    : 'bg-amber-950/40 text-amber-200 border-amber-700/40 hover:bg-amber-900/50'
                }`}
              >
                <span>{stadiumActive ? 'Tribün Işıkları Açık ✓' : '🏟️ Işıkları Yak'}</span>
              </button>

              <button
                onClick={handleIgniteFlares}
                className="px-4 py-2.5 rounded-2xl font-mono-code text-xs font-semibold bg-red-900/60 hover:bg-red-800 border border-red-500/50 text-red-100 flex items-center gap-1.5 transition-all hover:scale-105"
              >
                <Flame className="w-3.5 h-3.5 text-yellow-300 animate-bounce" />
                <span>Meşale Yak 🔥</span>
              </button>
            </div>
          </div>

          {/* GS Efsane Kadro Oyuncu Kartları Switcher */}
          <div className="mb-8">
            <label className="text-xs font-mono-code text-amber-300/80 uppercase tracking-wider block mb-3">
              🦁 1. Favori Oyuncunu Seç:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {gsSquad.map((player) => (
                <button
                  key={player.id}
                  onClick={() => {
                    soundManager.playPop();
                    setActivePlayer(player);
                  }}
                  className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                    activePlayer.id === player.id
                      ? 'bg-gradient-to-b from-amber-900/80 to-red-950/90 border-amber-400 text-white shadow-xl scale-102'
                      : 'bg-purple-950/40 border-amber-900/30 text-amber-200/70 hover:bg-purple-900/40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-base">{player.emoji}</span>
                    <span className="text-[11px] font-mono-code font-bold text-amber-400">{player.number}</span>
                  </div>
                  <div className="mt-2">
                    <span className="font-bold text-xs block text-white truncate">{player.name}</span>
                    <span className="text-[10px] text-amber-300/70 font-mono-code block truncate">{player.tag}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Active Player Showcase Box */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-red-950/70 via-purple-950/80 to-amber-950/70 border border-amber-500/40 mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg bg-amber-900/60 border border-amber-600/40 text-amber-200 text-xs font-mono-code">
                <span>{activePlayer.role}</span>
              </div>
              <h4 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
                {activePlayer.name} <span className="text-amber-400 text-xl font-mono-code">{activePlayer.number}</span>
              </h4>
              <p className="text-xs sm:text-sm text-purple-200/90 font-serif-italic max-w-lg">
                {activePlayer.quote}
              </p>
            </div>

            <button
              onClick={() => handleShoot(activePlayer.name)}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-500 to-red-600 text-black font-extrabold text-xs sm:text-sm shadow-xl hover:scale-105 transition-all whitespace-nowrap uppercase tracking-wider"
            >
              {activePlayer.actionText}
            </button>
          </div>

          {/* Tribün Besteleri / Marşlar Soundboard */}
          <div className="mb-8">
            <label className="text-xs font-mono-code text-amber-300/80 uppercase tracking-wider block mb-3">
              📣 2. Tribün Besteleri & Tezahüratlar:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {chants.map((chant) => (
                <button
                  key={chant.id}
                  onClick={() => handleChantClick(chant)}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    activeChant === chant.title
                      ? 'bg-amber-950/80 border-amber-400 text-white shadow-lg'
                      : 'bg-purple-950/40 border-amber-900/30 text-purple-200 hover:bg-purple-900/40'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                    <span className="font-bold text-xs text-white">{chant.title}</span>
                  </div>
                  <span className="text-[10px] text-amber-400/80 font-mono-code block mb-1.5">{chant.singer}</span>
                  <p className="text-[11px] text-purple-200/70 font-serif-italic line-clamp-2">
                    {chant.text}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* 5. Yıldız & Şampiyonluk Kupası Kaldırma */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-950/60 via-purple-950/70 to-red-950/60 border border-amber-600/40 text-center flex flex-col items-center justify-center">
            <div className="text-3xl mb-2">🏆 ⭐⭐⭐⭐⭐</div>
            <h4 className="text-lg sm:text-xl font-bold text-white mb-1">
              5. Yıldız Şampiyonluk Kupası
            </h4>
            <p className="text-xs sm:text-sm text-amber-200/80 font-serif-italic max-w-md mb-4">
              Galatasaray 5. yıldıza koşarken, bu kupayı kaldırmak en çok İloş'a yakışır!
            </p>

            <button
              onClick={handleLiftTrophy}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-black font-extrabold text-xs sm:text-sm shadow-xl hover:scale-105 transition-all flex items-center gap-2"
            >
              <Trophy className="w-4 h-4 text-black" />
              <span>{trophyLifted ? 'Şampiyonluk Kutlandı! 🏆✓' : 'Kupayı İloş Adına Kaldır!'}</span>
            </button>
          </div>

          {/* Goal Celebration Modal / Toast */}
          <AnimatePresence>
            {goalScored && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="mt-6 p-6 rounded-2xl bg-gradient-to-r from-red-950 via-purple-950 to-amber-950 border-2 border-amber-400 text-center shadow-2xl"
              >
                <div className="text-3xl sm:text-5xl font-display font-black text-amber-300 tracking-wider mb-2 animate-bounce">
                  GOOOOOOOOL! ⚽🔥
                </div>
                <p className="text-base sm:text-lg font-bold text-white mb-1">
                  {scorer} 90+4'te fileleri havalandırdı, RAMS Park yıkılıyor!
                </p>
                <p className="text-xs sm:text-sm text-pink-300 font-serif-italic">
                  “Aşkın olayım çalar arkada... İloş tribünde yerinde duramaz!”
                </p>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
};

