import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Music, Play, Pause, Volume2, VolumeX, Sparkles, Disc, Heart, ListMusic, Radio, Video, ExternalLink } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface AksamustuPlayerProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

const LYRICS = [
  { time: 0, text: "Gözlerin gözlerime değdiğinde bir akşamüstü..." },
  { time: 8, text: "Bütün yorgunluğum kayboldu o tatlı gülüşünle." },
  { time: 16, text: "İçimde kıpırdayan sıcacık bir şeyler var..." },
  { time: 24, text: "Sanki zaman durmuş, her köşe mor çiçeklerle donatılmış gibi." },
  { time: 32, text: "Akşamüstü birdenbire..." },
  { time: 40, text: "Güneş batarken geriye kalan en güzel melodi: İloş 💜" }
];

export const AksamustuPlayer: React.FC<AksamustuPlayerProps> = ({
  isPlaying,
  onTogglePlay,
  isMuted,
  onToggleMute
}) => {
  const [currentLyricIndex, setCurrentLyricIndex] = useState(0);
  const [showLyrics, setShowLyrics] = useState(true);
  const [showVideo, setShowVideo] = useState(false);

  // Cycle lyrics when playing
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentLyricIndex((prev) => (prev + 1) % LYRICS.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <section id="soundtrack-section" className="py-20 px-4 sm:px-6 relative">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-800/40 text-purple-300 text-xs font-mono-code mb-3">
            <Radio className="w-3.5 h-3.5 text-pink-400" />
            <span>RESMİ SOUNDTRACK • İLOŞ & MUSTAFA CAN SEÇİMİ</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            Yalın — Akşamüstü ♫
          </h2>
          <p className="text-sm sm:text-base text-purple-300/80 max-w-md mx-auto mt-2 font-serif-italic">
            “Gözlerin gözlerime değdiğinde bir akşamüstü…”
          </p>
        </div>

        {/* Music Player Deck */}
        <div className="bg-gradient-to-br from-[#1c0c33]/90 via-[#150926]/95 to-[#0f061c]/90 backdrop-blur-xl border border-purple-600/40 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-purple-950/70 relative overflow-hidden">
          
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Hidden/Active YouTube Sync Player */}
          {isPlaying && (
            <div className="hidden">
              <iframe
                width="1"
                height="1"
                src="https://www.youtube-nocookie.com/embed/h0mQWe-EPcw?autoplay=1&loop=1&playlist=h0mQWe-EPcw&enablejsapi=1"
                title="Yalın - Akşamüstü"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            </div>
          )}

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            
            {/* Spinning Vinyl / Album Art */}
            <div className="relative shrink-0">
              <motion.div
                animate={{ rotate: isPlaying ? 360 : 0 }}
                transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                className="w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-gradient-to-tr from-purple-950 via-zinc-900 to-purple-900 border-4 border-purple-500/40 shadow-2xl flex items-center justify-center relative p-3 group cursor-pointer"
                onClick={onTogglePlay}
              >
                {/* Vinyl Grooves */}
                <div className="w-full h-full rounded-full border border-purple-700/30 flex items-center justify-center">
                  <div className="w-3/4 h-3/4 rounded-full border border-purple-700/20 flex items-center justify-center">
                    {/* Center Label */}
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-purple-600 to-pink-500 flex flex-col items-center justify-center text-white text-center shadow-md p-1">
                      <Disc className="w-6 h-6 text-white mb-0.5" />
                      <span className="text-[9px] font-bold tracking-tight">YALIN</span>
                      <span className="text-[7px] text-purple-200">Akşamüstü</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Pulsing indicator when playing */}
              {isPlaying && (
                <div className="absolute -top-1 -right-1 flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-pink-500" />
                </div>
              )}
            </div>

            {/* Track Info & Controls */}
            <div className="flex-1 w-full text-center md:text-left">
              
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full bg-pink-950/60 border border-pink-700/40 text-pink-300 text-[11px] font-mono-code font-semibold">
                  ÖZEL YOUTUBE PARÇASI
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-purple-950/60 border border-purple-700/40 text-purple-300 text-[11px] font-mono-code">
                  28. Yaş Resmi Şarkısı
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
                Akşamüstü
              </h3>
              <p className="text-base text-purple-300 font-medium mt-0.5">
                Yalın (Orijinal Klip)
              </p>

              {/* Animated Equalizer Bars */}
              <div className="flex items-end justify-center md:justify-start gap-1 h-6 my-4">
                {[12, 24, 16, 28, 20, 14, 26, 18, 10, 22, 16, 25].map((height, idx) => (
                  <motion.div
                    key={idx}
                    animate={
                      isPlaying
                        ? {
                            height: [
                              `${height * 0.4}px`,
                              `${height}px`,
                              `${height * 0.3}px`
                            ]
                          }
                        : { height: '4px' }
                    }
                    transition={{
                      duration: 0.6 + (idx % 4) * 0.15,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                    className={`w-1 rounded-full ${
                      isPlaying ? 'bg-gradient-to-t from-purple-500 to-pink-400' : 'bg-purple-800/40'
                    }`}
                  />
                ))}
              </div>

              {/* Controls Bar */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-4">
                
                {/* Main Play / Pause Button */}
                <button
                  id="soundtrack-play-btn"
                  onClick={() => {
                    soundManager.playPop();
                    onTogglePlay();
                  }}
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold text-sm shadow-xl shadow-purple-950 flex items-center gap-2.5 transition-all hover:scale-105"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-4 h-4 fill-white" />
                      <span>Şarkıyı Duraklat</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-white" />
                      <span>Yalın — Akşamüstü Çal ♫</span>
                    </>
                  )}
                </button>

                {/* Video Clip Toggle */}
                <button
                  onClick={() => setShowVideo(!showVideo)}
                  className={`px-4 py-3 rounded-2xl border text-xs font-mono-code flex items-center gap-1.5 transition-all ${
                    showVideo
                      ? 'bg-pink-900/60 border-pink-500/50 text-white'
                      : 'bg-purple-950/40 border-purple-800/40 text-purple-300 hover:text-white'
                  }`}
                >
                  <Video className="w-4 h-4 text-pink-400" />
                  <span>{showVideo ? 'Klibi Gizle' : 'Klibi İzle'}</span>
                </button>

                {/* Mute SFX / Audio toggle */}
                <button
                  onClick={onToggleMute}
                  className="p-3 rounded-2xl bg-purple-950/60 hover:bg-purple-900/60 border border-purple-700/40 text-purple-300 hover:text-white transition-all"
                  title={isMuted ? 'Sesi Aç' : 'Sesi Kıs'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-pink-400" /> : <Volume2 className="w-4 h-4 text-purple-200" />}
                </button>

                {/* Lyrics toggle */}
                <button
                  onClick={() => setShowLyrics(!showLyrics)}
                  className={`px-3 py-3 rounded-2xl border text-xs font-mono-code flex items-center gap-1.5 transition-all ${
                    showLyrics
                      ? 'bg-purple-900/60 border-purple-500/50 text-purple-100'
                      : 'bg-purple-950/40 border-purple-800/40 text-purple-400'
                  }`}
                >
                  <ListMusic className="w-3.5 h-3.5" />
                  <span>{showLyrics ? 'Sözler Açık' : 'Sözleri Göster'}</span>
                </button>

              </div>

            </div>

          </div>

          {/* YouTube Video Player Embed Section */}
          <AnimatePresence>
            {showVideo && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-8 pt-6 border-t border-purple-800/40"
              >
                <div className="aspect-video w-full rounded-2xl overflow-hidden border border-purple-700/50 shadow-2xl bg-black">
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube-nocookie.com/embed/h0mQWe-EPcw?autoplay=1"
                    title="Yalın - Akşamüstü (Resmi Video)"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Lyrics Box */}
          <AnimatePresence>
            {showLyrics && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-8 pt-6 border-t border-purple-800/40"
              >
                <div className="text-center p-4 rounded-2xl bg-purple-950/40 border border-purple-800/30">
                  <span className="text-[10px] uppercase tracking-widest text-pink-400/80 font-mono-code block mb-1">
                    {isPlaying ? 'ŞU AN AKAN SÖZLER' : 'ŞARKI SÖZLERİ'}
                  </span>
                  
                  <motion.p
                    key={currentLyricIndex}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-base sm:text-lg font-serif-italic text-purple-100 font-medium py-1"
                  >
                    “{LYRICS[currentLyricIndex].text}”
                  </motion.p>

                  <div className="flex justify-center gap-1.5 mt-3">
                    {LYRICS.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentLyricIndex(idx)}
                        className={`h-1.5 rounded-full transition-all ${
                          idx === currentLyricIndex ? 'w-6 bg-pink-500' : 'w-2 bg-purple-800/50'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
};
