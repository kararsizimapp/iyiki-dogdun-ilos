import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sun, Sparkles, Flame, Eye, Heart, Compass, Glasses, Zap } from 'lucide-react';
import { soundManager } from '../utils/audio';
import { launchMorKonfeti } from '../utils/confetti';

interface IlosGunesiProps {
  onUnlockAchievement: (id: string) => void;
}

interface SunPhase {
  id: string;
  name: string;
  emoji: string;
  time: string;
  lumens: string;
  temp: string;
  desc: string;
  quote: string;
  gradient: string;
  sunColor: string;
  rayColor: string;
}

const sunPhases: SunPhase[] = [
  {
    id: 'sabah',
    name: 'Sabah Güneşi (Taze Enerji)',
    emoji: '🌅',
    time: '07:30',
    lumens: '65.000 Lümen',
    temp: '22°C Ilık',
    desc: 'Günün ilk ışıklarıyla uyanan, uykusunu almış ve hedeflerine hazır taptaze bir enerji.',
    quote: '“Güneş doğarken ilk önce senin tebessümünü örnek alıyor.”',
    gradient: 'from-amber-950/80 via-orange-950/60 to-purple-950/90',
    sunColor: 'from-yellow-300 via-amber-400 to-orange-500',
    rayColor: 'bg-yellow-400/20'
  },
  {
    id: 'ogle',
    name: 'Öğle Işıltısı (Maksimum Parlaklık)',
    emoji: '☀️',
    time: '13:00',
    lumens: '120.000 Lümen',
    temp: '29°C Sıcak',
    desc: 'Gökyüzünün en tepesinde, her köşeyi pırıl pırıl aydınlatan durdurulamaz pozitif enerji.',
    quote: '“Girdiğin her odayı, bastığın her yeri böyle aydınlatıyorsun.”',
    gradient: 'from-yellow-950/80 via-amber-950/70 to-purple-950/90',
    sunColor: 'from-yellow-200 via-yellow-400 to-amber-500',
    rayColor: 'bg-yellow-300/25'
  },
  {
    id: 'golden-hour',
    name: 'Golden Hour (Altın Saat)',
    emoji: '🌇',
    time: '19:45',
    lumens: '85.000 Lümen',
    temp: '25°C Büyüleyici',
    desc: 'Fotoğrafların en güzel çıktığı, gökyüzünün altın ve mor renklere büründüğü masalsı atmosfer.',
    quote: '“Altın saatler bile senin o doğal güzelliğin yanında sönük kalır.”',
    gradient: 'from-orange-950/90 via-purple-950/90 to-pink-950/80',
    sunColor: 'from-amber-300 via-orange-500 to-pink-500',
    rayColor: 'bg-orange-400/25'
  },
  {
    id: 'aksamustu',
    name: 'Akşamüstü & Yalın Saati',
    emoji: '🌆',
    time: '20:30',
    lumens: '40.000 Lümen',
    temp: '21°C Dingin',
    desc: 'Tatlı bir yorgunluğun yerini serin bir esintiye ve kahve eşliğinde huzura bıraktığı an.',
    quote: '“Güneş batsa ne olur? Senin enerjin geceyi bile aydınlatmaya yeter.”',
    gradient: 'from-purple-950/95 via-indigo-950/90 to-slate-950/95',
    sunColor: 'from-pink-400 via-purple-500 to-indigo-600',
    rayColor: 'bg-purple-400/20'
  }
];

export const IlosGunesi: React.FC<IlosGunesiProps> = ({ onUnlockAchievement }) => {
  const [activePhase, setActivePhase] = useState<SunPhase>(sunPhases[2]); // Start with Golden Hour
  const [energyLevel, setEnergyLevel] = useState(85);
  const [sunglassesOn, setSunglassesOn] = useState(false);
  const [sunSparks, setSunSparks] = useState<{ id: number; text: string; x: number; y: number }[]>([]);

  const handleSelectPhase = (phase: SunPhase) => {
    soundManager.playPop();
    setActivePhase(phase);
  };

  const handleAbsorbSunlight = (e: React.MouseEvent<HTMLButtonElement>) => {
    soundManager.playAchievement();
    setEnergyLevel(100);
    launchMorKonfeti();
    onUnlockAchievement('gunes-enerjisi');

    const rect = e.currentTarget.getBoundingClientRect();
    const newSpark = {
      id: Date.now(),
      text: '☀️ +100 D Vitamini & Pozitiflik',
      x: rect.left + rect.width / 2,
      y: rect.top - 20
    };
    setSunSparks((prev) => [...prev, newSpark]);
    setTimeout(() => {
      setSunSparks((prev) => prev.filter((s) => s.id !== newSpark.id));
    }, 1500);
  };

  const handleToggleSunglasses = () => {
    soundManager.playPop();
    setSunglassesOn(!sunglassesOn);
  };

  return (
    <section id="gunes-section" className="py-24 px-4 sm:px-6 relative overflow-hidden">
      
      {/* Dynamic Ambient Sun Radiance */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-amber-500/15 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950/70 border border-amber-500/40 text-amber-300 text-xs font-mono-code mb-3">
            <Sun className="w-3.5 h-3.5 text-yellow-400 animate-spin" style={{ animationDuration: '12s' }} />
            <span>IŞIK & ENERJİ MODÜLÜ • SEN DOĞDUN GÜNEŞ DOĞDU</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            İloş Güneş Işığı Modu ☀️✨
          </h2>
          <p className="text-sm sm:text-base text-amber-200/80 max-w-lg mx-auto mt-2">
            Günün istediğin saatine geçiş yap, sıcak altın ışık huzmelerini hisset ve enerjini doldur.
          </p>
        </div>

        {/* Phase Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {sunPhases.map((phase) => (
            <button
              key={phase.id}
              onClick={() => handleSelectPhase(phase)}
              className={`p-4 rounded-2xl border text-center transition-all flex flex-col items-center justify-between gap-1.5 ${
                activePhase.id === phase.id
                  ? 'bg-gradient-to-b from-amber-900/90 to-purple-900/90 border-amber-400 text-white shadow-xl shadow-amber-950/70 scale-105'
                  : 'bg-[#180d28]/80 border-amber-900/30 text-amber-200/70 hover:bg-purple-900/40'
              }`}
            >
              <span className="text-3xl drop-shadow-md">{phase.emoji}</span>
              <div>
                <span className="font-bold text-xs block text-white">{phase.name}</span>
                <span className="text-[10px] text-amber-300/80 font-mono-code block mt-0.5">{phase.time} • {phase.temp}</span>
              </div>
            </button>
          ))}
        </div>

        {/* The Solar Canvas Display Card */}
        <motion.div
          key={activePhase.id}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className={`rounded-3xl p-6 sm:p-12 bg-gradient-to-br ${activePhase.gradient} border-2 border-amber-500/40 shadow-2xl shadow-amber-950/90 relative overflow-hidden`}
        >
          
          {/* Rotating Sun Rays Overlay */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none opacity-40">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
              className="w-full h-full relative flex items-center justify-center"
            >
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className={`absolute w-1.5 h-full ${activePhase.rayColor} rounded-full`}
                  style={{ transform: `rotate(${i * 30}deg)` }}
                />
              ))}
            </motion.div>
          </div>

          {/* Top Status Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-amber-800/40 mb-8 relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-900/60 border border-amber-400/40 flex items-center justify-center text-2xl shadow-lg">
                {activePhase.emoji}
              </div>
              <div>
                <span className="text-[11px] font-mono-code px-2.5 py-0.5 rounded-full bg-amber-900/60 text-amber-200 border border-amber-600/40 uppercase">
                  {activePhase.time} SAATİ
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                  {activePhase.name}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleToggleSunglasses}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono-code border transition-all flex items-center gap-1.5 ${
                  sunglassesOn
                    ? 'bg-amber-400 text-black border-yellow-300 font-bold'
                    : 'bg-black/50 text-amber-200 border-amber-700/40 hover:bg-black/70'
                }`}
              >
                <Glasses className="w-4 h-4" />
                <span>{sunglassesOn ? 'Gözlük Takıldı 🕶️' : 'Gözlük Tak 🕶️'}</span>
              </button>
            </div>
          </div>

          {/* Main Glowing Sun Orb */}
          <div className="relative py-8 flex flex-col items-center justify-center text-center z-10">
            <motion.div
              animate={{ scale: [1, 1.08, 1], filter: ['brightness(1)', 'brightness(1.2)', 'brightness(1)'] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className={`w-36 sm:w-44 h-36 sm:h-44 rounded-full bg-gradient-to-tr ${activePhase.sunColor} shadow-[0_0_80px_rgba(251,191,36,0.6)] flex items-center justify-center text-4xl sm:text-5xl border-4 border-yellow-100/50 mb-6 cursor-pointer`}
              onClick={handleAbsorbSunlight}
            >
              {sunglassesOn ? '😎' : '☀️'}
            </motion.div>

            <p className="text-base sm:text-xl text-white font-serif-italic max-w-xl mb-4">
              {activePhase.quote}
            </p>

            <p className="text-xs sm:text-sm text-amber-200/80 font-light max-w-md">
              {activePhase.desc}
            </p>
          </div>

          {/* Metrics & Action Bar */}
          <div className="pt-8 border-t border-amber-800/40 grid grid-cols-1 sm:grid-cols-3 gap-4 items-center z-10 relative">
            <div className="p-3.5 rounded-2xl bg-black/40 border border-amber-800/40 text-center">
              <span className="text-[10px] font-mono-code text-amber-400 block uppercase">Işık Şiddeti</span>
              <span className="text-sm font-bold text-white font-mono-code">{activePhase.lumens}</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-black/40 border border-amber-800/40 text-center">
              <span className="text-[10px] font-mono-code text-amber-400 block uppercase">Sıcaklık & His</span>
              <span className="text-sm font-bold text-white font-mono-code">{activePhase.temp}</span>
            </div>

            <button
              onClick={handleAbsorbSunlight}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-400 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-extrabold text-xs sm:text-sm shadow-xl flex items-center justify-center gap-2 transition-all hover:scale-105 uppercase tracking-wider"
            >
              <Zap className="w-4 h-4 text-black" />
              <span>Güneşten Enerji Al ☀️</span>
            </button>
          </div>

          {/* Floating Sparks */}
          {sunSparks.map((spark) => (
            <motion.div
              key={spark.id}
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 0, y: -50 }}
              transition={{ duration: 1.2 }}
              className="fixed pointer-events-none text-xs font-mono-code font-bold text-yellow-300 drop-shadow-md z-50"
              style={{ left: spark.x, top: spark.y }}
            >
              {spark.text}
            </motion.div>
          ))}

        </motion.div>

      </div>
    </section>
  );
};
