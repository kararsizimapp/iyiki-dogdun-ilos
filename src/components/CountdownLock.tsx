import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, Unlock, Sparkles, Heart, Clock, Play, Pause, Volume2, VolumeX, ShieldCheck, KeyRound, Star, Compass } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface CountdownLockProps {
  onUnlockPreview: () => void;
  isPlayingMusic: boolean;
  onToggleMusic: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const CountdownLock: React.FC<CountdownLockProps> = ({
  onUnlockPreview,
  isPlayingMusic,
  onToggleMusic,
  isMuted,
  onToggleMute
}) => {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    totalMs: number;
  }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalMs: 1
  });

  const [showSecretModal, setShowSecretModal] = useState(false);
  const [secretPass, setSecretPass] = useState('');
  const [secretError, setSecretError] = useState(false);

  // Target: 20 August 2026 00:00:00 (Local Turkish Time)
  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      // Year 2026, August (index 7), 20th day, 00:00:00
      let target = new Date(2026, 7, 20, 0, 0, 0);

      // If current time is after 20 Aug 2026, check next year
      if (now.getTime() > target.getTime() + 86400000) {
        target = new Date(now.getFullYear() + 1, 7, 20, 0, 0, 0);
      }

      const diff = target.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, totalMs: 0 });
        onUnlockPreview(); // Auto-unlock when target date arrives
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds, totalMs: diff });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [onUnlockPreview]);

  const handleSecretSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Allow easy unlock for Mustafa Can / testing with password or bypass
    const clean = secretPass.trim().toLowerCase();
    if (clean === 'mustafa' || clean === 'ilos' || clean === '1998' || clean === '28' || clean === 'can') {
      soundManager.playAchievement();
      onUnlockPreview();
    } else {
      soundManager.playBuzzer();
      setSecretError(true);
      setTimeout(() => setSecretError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#090412] text-white flex flex-col items-center justify-between p-4 sm:p-8 relative overflow-hidden stars-bg">
      
      {/* Background YouTube Audio / Video Stream (Yalın - Akşamüstü) */}
      <div className="fixed -bottom-96 -left-96 w-10 h-10 opacity-0 pointer-events-none overflow-hidden">
        {isPlayingMusic && (
          <iframe
            id="youtube-audio-stream-locked"
            width="320"
            height="240"
            src="https://www.youtube-nocookie.com/embed/h0mQWe-EPcw?autoplay=1&loop=1&playlist=h0mQWe-EPcw&enablejsapi=1"
            title="Yalın - Akşamüstü"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        )}
      </div>

      {/* Atmospheric Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-purple-700/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-pink-600/15 rounded-full blur-[120px] pointer-events-none" />

      {/* Top Header Bar */}
      <header className="w-full max-w-4xl flex items-center justify-between z-10 pt-2 pb-6">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-2xl bg-purple-900/60 border border-purple-500/40 flex items-center justify-center text-pink-300 font-display font-extrabold shadow-lg">
            İ
          </div>
          <div>
            <div className="text-sm font-display font-bold text-white tracking-wide">
              İLOŞ EVRENİ 💜
            </div>
            <div className="text-[10px] font-mono-code text-purple-300/70">
              20 AĞUSTOS 2026 ÖZEL KORUMALI ALAN
            </div>
          </div>
        </div>

        {/* Music Quick Player */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              soundManager.playPop();
              onToggleMusic();
            }}
            className={`px-3 py-1.5 rounded-full text-xs font-mono-code flex items-center gap-1.5 border transition-all shadow-md ${
              isPlayingMusic
                ? 'bg-pink-600/90 text-white border-pink-400 shadow-pink-900/50 animate-pulse'
                : 'bg-purple-950/60 text-purple-200 border-purple-700/40 hover:bg-purple-900/60'
            }`}
          >
            {isPlayingMusic ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            <span className="hidden sm:inline">Yalın — Akşamüstü</span>
            <span>{isPlayingMusic ? 'Çalıyor ♫' : 'Müziği Başlat ♫'}</span>
          </button>

          <button
            onClick={onToggleMute}
            className="p-2 rounded-full bg-purple-950/60 border border-purple-700/40 text-purple-300 hover:text-white"
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-pink-400" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </header>

      {/* Main Locked Content Card */}
      <main className="w-full max-w-2xl my-auto z-10 text-center flex flex-col items-center">
        
        {/* Lock Badge */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative mb-6"
        >
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-tr from-purple-900 via-fuchsia-900 to-pink-600 border border-purple-400/50 flex items-center justify-center text-white shadow-2xl shadow-purple-950 relative">
            <Lock className="w-10 h-10 sm:w-12 sm:h-12 text-purple-100 animate-pulse" />
            
            {/* Pulsing ring */}
            <span className="animate-ping absolute inset-0 rounded-3xl bg-pink-400 opacity-20" />
          </div>
        </motion.div>

        {/* Title */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-700/50 text-pink-300 text-xs font-mono-code mb-4">
          <Sparkles className="w-3.5 h-3.5 text-pink-400" />
          <span>DOĞUM GÜNÜNE ÖZEL KİLİTLİ ALAN</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight leading-tight mb-4">
          Bu Evren İloş İçin <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-400 to-purple-200">
            20 Ağustos'ta Açılacak ✨
          </span>
        </h1>

        {/* Mustafa Can's Dedication / Compliment */}
        <div className="p-4 sm:p-5 rounded-2xl bg-purple-950/40 border border-purple-800/40 backdrop-blur-md max-w-lg mb-8 text-center shadow-xl">
          <p className="text-xs sm:text-sm text-purple-200/90 font-serif-italic leading-relaxed">
            “Dünyanın en güzel kadını, en derin ve büyüleyici gözlerine sahip insanı için hazırlandı.
            Geri sayım bittiğinde tüm sürprizler, hatıralar ve hediyeler sana açılacak.”
          </p>
          <div className="mt-2 text-[11px] font-mono-code text-pink-300 font-semibold">
            — Mustafa Can
          </div>
        </div>

        {/* Countdown Flip Units */}
        <div className="grid grid-cols-4 gap-2.5 sm:gap-4 w-full max-w-md mb-8">
          {[
            { label: 'GÜN', value: timeLeft.days },
            { label: 'SAAT', value: timeLeft.hours },
            { label: 'DAKİKA', value: timeLeft.minutes },
            { label: 'SANİYE', value: timeLeft.seconds }
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-b from-[#1c0c33]/90 to-[#120726]/90 border border-purple-600/40 rounded-2xl p-3 sm:p-4 flex flex-col items-center justify-center shadow-xl shadow-purple-950/60"
            >
              <span className="text-2xl sm:text-4xl font-mono-code font-extrabold text-white">
                {String(item.value).padStart(2, '0')}
              </span>
              <span className="text-[9px] sm:text-[10px] font-mono-code text-purple-300 tracking-wider mt-1">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Interactive Teaser Highlights */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-mono-code text-purple-300/80 mb-8 max-w-md">
          <span className="px-3 py-1 rounded-full bg-purple-950/50 border border-purple-800/40">🎵 Yalın — Akşamüstü</span>
          <span className="px-3 py-1 rounded-full bg-purple-950/50 border border-purple-800/40">💳 MustafaBank VIP</span>
          <span className="px-3 py-1 rounded-full bg-purple-950/50 border border-purple-800/40">🚗 Uber Mustafa</span>
          <span className="px-3 py-1 rounded-full bg-purple-950/50 border border-purple-800/40">🌸 Mor Çiçekler</span>
          <span className="px-3 py-1 rounded-full bg-purple-950/50 border border-purple-800/40">🐾 Aşk Bahçesi</span>
        </div>

        {/* Secret Bypass Button for Mustafa Can / Instant Preview */}
        <div className="flex flex-col items-center gap-3">
          <button
            id="mustafa-can-bypass-btn"
            onClick={() => {
              soundManager.playPop();
              setShowSecretModal(true);
            }}
            className="text-xs font-mono-code text-purple-400/60 hover:text-pink-300 underline underline-offset-4 transition-all flex items-center gap-1.5"
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span>Mustafa Can Girişi / Önizleme Kilidi</span>
          </button>
        </div>

      </main>

      {/* Footer info */}
      <footer className="w-full max-w-4xl text-center text-xs text-purple-400/50 font-mono-code z-10 pt-6 border-t border-purple-900/30 flex flex-col sm:flex-row items-center justify-between gap-2">
        <span>Kilit Açılış Tarihi: 20 Ağustos 2026 • 00:00</span>
        <span className="text-pink-400/80 font-serif-italic">Mustafa Can & İloş 💜</span>
      </footer>

      {/* Secret Password / Instant Unlock Modal */}
      <AnimatePresence>
        {showSecretModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#18092e] border border-purple-500/50 rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl text-center"
            >
              <div className="w-12 h-12 rounded-2xl bg-purple-900/80 border border-purple-600/50 flex items-center justify-center text-pink-300 mx-auto mb-4">
                <KeyRound className="w-6 h-6" />
              </div>

              <h3 className="text-xl font-display font-bold text-white mb-1">
                Mustafa Can Önizleme
              </h3>
              <p className="text-xs text-purple-300/80 mb-6">
                Siteyi test etmek veya kilidi kaldırmak için şifreyi girin veya doğrudan butona tıklayın.
              </p>

              <form onSubmit={handleSecretSubmit} className="space-y-4">
                <input
                  type="text"
                  value={secretPass}
                  onChange={(e) => setSecretPass(e.target.value)}
                  placeholder="Şifre (örn: mustafa / ilos / 1998)"
                  className="w-full px-4 py-3 rounded-xl bg-purple-950/80 border border-purple-700/50 text-white placeholder-purple-400/40 text-sm text-center focus:outline-none focus:border-pink-500 font-mono-code"
                  autoFocus
                />

                {secretError && (
                  <p className="text-xs text-pink-400 font-mono-code animate-shake">
                    Hatalı şifre. Tekrar deneyin veya doğrudan açın.
                  </p>
                )}

                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 text-white font-semibold text-xs shadow-lg hover:from-pink-500 hover:to-purple-500 transition-all"
                  >
                    Kilidi Aç
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playAchievement();
                      onUnlockPreview();
                    }}
                    className="px-4 py-3 rounded-xl bg-purple-900/60 hover:bg-purple-800 border border-purple-700/40 text-purple-200 text-xs font-mono-code"
                  >
                    Doğrudan Aç
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setShowSecretModal(false)}
                  className="text-xs text-purple-400 hover:text-white pt-2 block mx-auto"
                >
                  Vazgeç
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
