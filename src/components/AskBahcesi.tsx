import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, Shield, Droplets, Utensils } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface AskBahcesiProps {
  onUnlockAchievement: (id: string) => void;
}

export const AskBahcesi: React.FC<AskBahcesiProps> = ({ onUnlockAchievement }) => {
  const [foodCount, setFoodCount] = useState(3);
  const [catSpeech, setCatSpeech] = useState<string | null>(null);
  const [dogSpeech, setDogSpeech] = useState<string | null>(null);
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>([]);
  const [protectionBadgeClicked, setProtectionBadgeClicked] = useState(false);

  const handleFeed = (e: React.MouseEvent<HTMLButtonElement>) => {
    soundManager.playPop();
    setFoodCount((prev) => prev + 1);
    onUnlockAchievement('pati-dostu');

    // Spawn floating heart
    const rect = e.currentTarget.getBoundingClientRect();
    const newHeart = {
      id: Date.now(),
      x: rect.left + rect.width / 2,
      y: rect.top
    };
    setHearts((prev) => [...prev, newHeart]);
    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
    }, 1500);
  };

  const handleCatClick = () => {
    soundManager.playMeow();
    setCatSpeech('“Rahatsız etme. İloş’un misafiriyim.” 🐾');
    onUnlockAchievement('pati-dostu');
    setTimeout(() => setCatSpeech(null), 3500);
  };

  const handleDogClick = () => {
    soundManager.playBark();
    setDogSpeech('“Hav! İloş az önce geçti, buralar güvende.” 🐶');
    onUnlockAchievement('pati-dostu');
    setTimeout(() => setDogSpeech(null), 3500);
  };

  return (
    <section id="ask-bahcesi-section" className="py-24 px-4 sm:px-6 relative overflow-hidden">
      
      {/* Warm gentle ambient glow */}
      <div className="absolute w-[500px] h-[500px] bg-pink-900/15 rounded-full blur-3xl pointer-events-none -left-20 top-1/4" />
      <div className="absolute w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-3xl pointer-events-none -right-20 bottom-1/4" />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-950/60 border border-pink-700/40 text-pink-300 text-xs font-mono-code mb-3">
            <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-400/30" />
            <span>SAHNE 05 • EN SAF BÖLÜM</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
            Aşk Bahçesi
          </h2>
          <p className="text-sm sm:text-base text-purple-200/80 max-w-lg mx-auto mt-2 font-medium">
            Bazıları çiçek yetiştirir. İloş biraz daha ileri gitmiş olabilir.
          </p>
        </div>

        {/* The Garden Interactive Canvas / Card */}
        <div className="bg-gradient-to-b from-[#180e2b]/90 to-[#120822]/95 border border-purple-600/40 rounded-3xl p-6 sm:p-10 shadow-2xl shadow-purple-950/70 relative">
          
          {/* Paw Protection Badge Header */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-purple-800/40">
            <button
              onClick={() => {
                soundManager.playPop();
                setProtectionBadgeClicked(!protectionBadgeClicked);
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-purple-950/70 hover:bg-purple-900/60 border border-purple-700/40 text-purple-200 text-xs font-mono-code transition-all"
            >
              <Shield className="w-4 h-4 text-pink-400" />
              <span>🐾 Resmi Koruma Bildirimi</span>
            </button>

            <div className="flex items-center gap-2 text-xs font-mono-code text-pink-300">
              <span>Toplam Sevgi Dolumu:</span>
              <span className="px-2 py-0.5 rounded bg-pink-900/50 border border-pink-700/40 font-bold">
                {foodCount * 10} Kalp 💜
              </span>
            </div>
          </div>

          {/* Protection Notice Banner */}
          <AnimatePresence>
            {protectionBadgeClicked && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 p-4 rounded-2xl bg-pink-950/40 border border-pink-700/40 text-xs text-pink-200 leading-relaxed text-center font-serif-italic"
              >
                “Bu alan İloş tarafından koşulsuz sevgi, taze mama ve sonsuz şefkatle korunmaktadır.”
              </motion.div>
            )}
          </AnimatePresence>

          {/* Animals Playground Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
            
            {/* The Cat Card */}
            <motion.div
              whileHover={{ y: -3 }}
              onClick={handleCatClick}
              className="relative p-6 rounded-2xl bg-purple-950/40 border border-purple-800/40 hover:border-pink-500/50 transition-all cursor-pointer flex flex-col items-center text-center group"
            >
              <div className="text-6xl mb-3 group-hover:scale-110 transition-transform">
                🐈‍⬛
              </div>
              <h4 className="text-base font-bold text-white mb-1">
                Aşk Bahçesi Kedisi
              </h4>
              <p className="text-xs text-purple-300/70 mb-3">
                Güneşin vurduğu en yumuşak minderde keyif yapan misafir.
              </p>
              
              <span className="text-[11px] font-mono-code text-pink-400/80 underline decoration-pink-500/40">
                (Tıkla & Miyavlat)
              </span>

              {/* Cat Speech Bubble */}
              <AnimatePresence>
                {catSpeech && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute -top-6 bg-pink-950 border border-pink-500 text-pink-100 text-xs px-3 py-1.5 rounded-xl shadow-xl z-20 font-medium"
                  >
                    {catSpeech}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* The Dog Card */}
            <motion.div
              whileHover={{ y: -3 }}
              onClick={handleDogClick}
              className="relative p-6 rounded-2xl bg-purple-950/40 border border-purple-800/40 hover:border-purple-500/50 transition-all cursor-pointer flex flex-col items-center text-center group"
            >
              <div className="text-6xl mb-3 group-hover:scale-110 transition-transform">
                🐕
              </div>
              <h4 className="text-base font-bold text-white mb-1">
                Bahçenin Neşeli Köpeği
              </h4>
              <p className="text-xs text-purple-300/70 mb-3">
                İloş'u kapıda görünce kuyruğu pervaneye dönen dost.
              </p>
              
              <span className="text-[11px] font-mono-code text-purple-400/80 underline decoration-purple-500/40">
                (Tıkla & Sev)
              </span>

              {/* Dog Speech Bubble */}
              <AnimatePresence>
                {dogSpeech && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute -top-6 bg-purple-950 border border-purple-500 text-purple-100 text-xs px-3 py-1.5 rounded-xl shadow-xl z-20 font-medium"
                  >
                    {dogSpeech}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

          </div>

          {/* Interactive Food Bowl (Mama Kabı) */}
          <div className="bg-purple-950/60 border border-purple-700/40 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-left">
              <div className="w-12 h-12 rounded-xl bg-pink-900/50 border border-pink-600/40 flex items-center justify-center text-2xl">
                🍲
              </div>
              <div>
                <h5 className="text-sm font-bold text-white">
                  Aşk Bahçesi Mama Kabı
                </h5>
                <p className="text-xs text-purple-300/70">
                  Şu an kapta: <strong className="text-pink-300">{foodCount} porsiyon</strong> taze mama var.
                </p>
              </div>
            </div>

            <button
              id="feed-animals-btn"
              onClick={handleFeed}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white text-xs font-semibold shadow-md shadow-pink-950 flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
            >
              <Utensils className="w-4 h-4 text-pink-200" />
              <span>Mama Ekle (+Sevgi)</span>
            </button>
          </div>

          {/* Emotional Concluding Reflection */}
          <div className="mt-8 pt-6 border-t border-purple-800/40 text-center">
            <p className="text-sm sm:text-base text-purple-200/90 font-serif-italic max-w-xl mx-auto leading-relaxed">
              “Belki Aşk Bahçesi sadece onların bahçesi değildir. <br className="hidden sm:inline" />
              İloş’un nasıl bir kalbi olduğunu gösteren küçük bir yer de olabilir.”
            </p>
          </div>

        </div>

      </div>

      {/* Floating Hearts from Feeding */}
      {hearts.map((h) => (
        <motion.div
          key={h.id}
          initial={{ opacity: 1, y: 0, scale: 0.8 }}
          animate={{ opacity: 0, y: -60, scale: 1.4 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="fixed pointer-events-none text-pink-400 z-50 text-2xl font-bold"
          style={{ left: h.x, top: h.y }}
        >
          💜
        </motion.div>
      ))}

    </section>
  );
};
