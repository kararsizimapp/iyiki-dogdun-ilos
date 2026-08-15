import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart, ChevronDown, Calendar, Star, Compass } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface HeroSceneProps {
  morLevel: number;
  onIncreaseMor: () => void;
  onEnterUniverse: () => void;
}

export const HeroScene: React.FC<HeroSceneProps> = ({
  morLevel,
  onIncreaseMor,
  onEnterUniverse
}) => {
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number } | null>(null);
  const [isBirthdayToday, setIsBirthdayToday] = useState(false);

  useEffect(() => {
    const calculateCountdown = () => {
      const now = new Date();
      const currentYear = now.getFullYear();
      let targetBirthday = new Date(currentYear, 7, 20); // 20 August (month is 0-indexed)

      // If today is 20 August
      if (now.getDate() === 20 && now.getMonth() === 7) {
        setIsBirthdayToday(true);
        return;
      }

      // If 20 August has passed this year, point to next year
      if (now.getTime() > targetBirthday.getTime() + 86400000) {
        targetBirthday = new Date(currentYear + 1, 7, 20);
      }

      const diff = targetBirthday.getTime() - now.getTime();
      if (diff <= 0) {
        setIsBirthdayToday(true);
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 px-4 sm:px-6 overflow-hidden stars-bg"
    >
      {/* Dynamic Purple Nebula glow reflecting morLevel */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.35, 0.55, 0.35]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none -top-20"
        style={{
          backgroundColor: morLevel > 3 ? '#9333ea' : '#7c3aed',
          filter: `blur(${100 + morLevel * 10}px)`
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
        
        {/* Date Stamp Tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/70 border border-purple-700/40 text-purple-300 text-xs sm:text-sm font-mono-code mb-8 backdrop-blur-md shadow-lg"
        >
          <Calendar className="w-4 h-4 text-purple-400" />
          <span>20.08.1998</span>
          <span className="text-purple-500">•</span>
          <span className="text-pink-300 font-semibold">28. Yaş Özel Sürümü</span>
        </motion.div>

        {/* Narrative Intro */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-base sm:text-lg text-purple-200/80 max-w-xl font-light tracking-wide leading-relaxed mb-4"
        >
          O gün dünyada bir sürü şey oldu. <br className="hidden sm:block" />
          Ama bizim ilgilendiğimiz kayıt biraz daha farklıydı.
        </motion.p>

        {/* Big Stately Name Transition */}
        <div className="my-6">
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-4xl sm:text-6xl md:text-7xl font-display font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white via-purple-100 to-purple-300 tracking-tight leading-none"
          >
            SELİN İLAYDA GÜNEŞ
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.7 }}
            className="mt-3 flex flex-col items-center justify-center gap-2"
          >
            <div className="flex items-center justify-center gap-2">
              <span className="text-purple-300 text-lg sm:text-2xl font-serif-italic">
                ama biz ona
              </span>
              <span className="font-display font-extrabold text-2xl sm:text-3xl text-pink-400 tracking-wide underline decoration-purple-500 underline-offset-4">
                İLOŞ
              </span>
              <span className="text-purple-300 text-lg sm:text-2xl font-serif-italic">
                diyoruz 💜
              </span>
            </div>

            {/* Mustafa Can Dedication & Compliments */}
            <div className="mt-4 px-4 py-2 rounded-2xl bg-purple-950/50 border border-purple-700/40 max-w-lg shadow-md">
              <p className="text-xs sm:text-sm text-purple-200/95 font-serif-italic leading-relaxed">
                “Mustafa Can der ki: Dünyanın en güzel kadını, en derin ve büyüleyici gözlerine sahip insanı... Senin olduğun her yer güzelleşiyor.”
              </p>
            </div>
          </motion.div>
        </div>

        {/* Birthday Countdown or Celebration Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.7 }}
          className="my-8 w-full max-w-lg"
        >
          {isBirthdayToday ? (
            <div className="bg-gradient-to-r from-purple-900/60 via-fuchsia-900/60 to-pink-900/60 border border-purple-500/50 rounded-2xl p-4 shadow-xl shadow-purple-950/60 text-center animate-pulse">
              <div className="flex items-center justify-center gap-2 text-pink-300 text-xs font-mono-code uppercase tracking-wider mb-1">
                <Sparkles className="w-4 h-4" /> 20 Ağustos Özel
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
                BUGÜN İLOŞ GÜNÜ! 🎂
              </h3>
              <p className="text-xs text-purple-200/90 mt-1">
                Yeni yaş protokolü başarıyla başlatıldı. Mutlu yıllar!
              </p>
            </div>
          ) : timeLeft ? (
            <div className="bg-[#150d27]/70 backdrop-blur-md border border-purple-800/40 rounded-2xl p-4 shadow-lg">
              <span className="text-xs text-purple-300/70 uppercase tracking-widest font-mono-code block mb-2">
                20 Ağustos'a Kalan Zaman:
              </span>
              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="bg-purple-950/60 rounded-xl py-2 px-1 border border-purple-800/30">
                  <div className="text-xl sm:text-2xl font-bold font-mono-code text-white">{timeLeft.days}</div>
                  <div className="text-[10px] text-purple-300/60 uppercase">Gün</div>
                </div>
                <div className="bg-purple-950/60 rounded-xl py-2 px-1 border border-purple-800/30">
                  <div className="text-xl sm:text-2xl font-bold font-mono-code text-white">{timeLeft.hours}</div>
                  <div className="text-[10px] text-purple-300/60 uppercase">Saat</div>
                </div>
                <div className="bg-purple-950/60 rounded-xl py-2 px-1 border border-purple-800/30">
                  <div className="text-xl sm:text-2xl font-bold font-mono-code text-white">{timeLeft.minutes}</div>
                  <div className="text-[10px] text-purple-300/60 uppercase">Dakika</div>
                </div>
                <div className="bg-purple-950/60 rounded-xl py-2 px-1 border border-purple-800/30">
                  <div className="text-xl sm:text-2xl font-bold font-mono-code text-pink-400">{timeLeft.seconds}</div>
                  <div className="text-[10px] text-purple-300/60 uppercase">Saniye</div>
                </div>
              </div>
            </div>
          ) : null}
        </motion.div>

        {/* CTA Enter Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center gap-4 mt-2"
        >
          <a
            href="#os-section"
            id="hero-enter-btn"
            onClick={() => {
              soundManager.playAchievement();
              onEnterUniverse();
            }}
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 text-white font-display font-bold text-lg shadow-xl shadow-purple-900/50 hover:shadow-purple-700/60 transition-all hover:scale-105 border border-purple-400/40 cursor-pointer overflow-hidden"
          >
            {/* Sparkle background shimmer */}
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <Compass className="w-5 h-5 text-purple-200 group-hover:rotate-45 transition-transform" />
            <span>İLOŞ EVRENİNE GİR</span>
            <Sparkles className="w-5 h-5 text-yellow-300 group-hover:scale-125 transition-transform" />
          </a>

          {/* Quick "Daha Mor Yap" Button Easter Egg */}
          <button
            id="hero-more-purple-btn"
            onClick={() => {
              soundManager.playPop();
              onIncreaseMor();
            }}
            className="px-4 py-3 rounded-2xl bg-purple-950/40 hover:bg-purple-900/50 border border-purple-800/40 text-purple-300 hover:text-white text-xs font-mono-code transition-all flex items-center gap-2"
          >
            <Star className="w-3.5 h-3.5 text-purple-400" />
            <span>Daha Mor Yap ({morLevel}/5)</span>
          </button>
        </motion.div>

        {/* Subtle subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="mt-12 text-xs sm:text-sm text-purple-300/60 font-serif-italic"
        >
          “Neden bütün bunları hatırladığımı sorma. Zaateeen uzun mesele.”
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="mt-8 text-purple-400/50 flex flex-col items-center gap-1"
        >
          <span className="text-[11px] font-mono-code uppercase tracking-wider">Aşağı Kaydır</span>
          <ChevronDown className="w-4 h-4" />
        </motion.div>

      </div>
    </section>
  );
};
