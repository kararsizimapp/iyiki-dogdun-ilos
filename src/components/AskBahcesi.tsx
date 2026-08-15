import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, Shield, Droplets, Utensils, Award, Fish, Bone } from 'lucide-react';
import { soundManager } from '../utils/audio';
import { launchMorKonfeti } from '../utils/confetti';

interface AskBahcesiProps {
  onUnlockAchievement: (id: string) => void;
}

export const AskBahcesi: React.FC<AskBahcesiProps> = ({ onUnlockAchievement }) => {
  const [catFeedCount, setCatFeedCount] = useState(4);
  const [dogFeedCount, setDogFeedCount] = useState(4);
  const [waterBowlLevel, setWaterBowlLevel] = useState(100);
  const [catSpeech, setCatSpeech] = useState<string | null>(null);
  const [dogSpeech, setDogSpeech] = useState<string | null>(null);
  const [catPurring, setCatPurring] = useState(false);
  const [dogHappy, setDogHappy] = useState(false);
  const [hearts, setHearts] = useState<{ id: number; text: string; x: number; y: number }[]>([]);
  const [protectionBadgeClicked, setProtectionBadgeClicked] = useState(false);

  const spawnFloatingHeart = (e: React.MouseEvent<HTMLElement>, text = '💜') => {
    const rect = e.currentTarget.getBoundingClientRect();
    const newHeart = {
      id: Date.now() + Math.random(),
      text,
      x: rect.left + rect.width / 2,
      y: rect.top
    };
    setHearts((prev) => [...prev, newHeart]);
    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
    }, 1500);
  };

  const handleFeedCat = (e: React.MouseEvent<HTMLButtonElement>) => {
    soundManager.playPop();
    setCatFeedCount((prev) => prev + 1);
    setCatPurring(true);
    setCatSpeech('“Mırrr... En sevdiğim somonlu mama! Teşekkürler İloş 🐾”');
    spawnFloatingHeart(e, '🐟 +10 Sevgi');
    onUnlockAchievement('pati-dostu');
    setTimeout(() => {
      setCatPurring(false);
      setTimeout(() => setCatSpeech(null), 3000);
    }, 1500);
  };

  const handleFeedDog = (e: React.MouseEvent<HTMLButtonElement>) => {
    soundManager.playPop();
    setDogFeedCount((prev) => prev + 1);
    setDogHappy(true);
    setDogSpeech('“Hav hav! Çıtır ödül kemiği! İloş dünyanın en tatlı insanı! 🐶”');
    spawnFloatingHeart(e, '🦴 +10 Sevgi');
    onUnlockAchievement('pati-dostu');
    setTimeout(() => {
      setDogHappy(false);
      setTimeout(() => setDogSpeech(null), 3000);
    }, 1500);
  };

  const handleFillWater = (e: React.MouseEvent<HTMLButtonElement>) => {
    soundManager.playAchievement();
    setWaterBowlLevel(100);
    spawnFloatingHeart(e, '💧 Taze Su Dolduruldu!');
  };

  const handleCatClick = (e: React.MouseEvent<HTMLDivElement>) => {
    soundManager.playMeow();
    setCatPurring(true);
    setCatSpeech('“Mırrr... İloş beni okşadı, dünyadaki en mutlu kediyim.” 🐾');
    spawnFloatingHeart(e, '💜');
    onUnlockAchievement('pati-dostu');
    setTimeout(() => {
      setCatPurring(false);
      setTimeout(() => setCatSpeech(null), 3500);
    }, 2000);
  };

  const handleDogClick = (e: React.MouseEvent<HTMLDivElement>) => {
    soundManager.playBark();
    setDogHappy(true);
    setDogSpeech('“Kuyruğum pervaneye döndü! İloş geldi, neşemiz yerine geldi!” 🐕');
    spawnFloatingHeart(e, '💜');
    onUnlockAchievement('pati-dostu');
    setTimeout(() => {
      setDogHappy(false);
      setTimeout(() => setDogSpeech(null), 3500);
    }, 2000);
  };

  const totalPoints = (catFeedCount + dogFeedCount) * 10;

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
            <span>SAHNE 05 • CANLI BESLEME SİMÜLATÖRÜ</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
            Aşk Bahçesi & Can Dostlar 🐾💜
          </h2>
          <p className="text-sm sm:text-base text-purple-200/80 max-w-lg mx-auto mt-2 font-medium">
            Kedilere somonlu mama, köpeklere çıtır kemik ver; sevdikçe mırıldamalarını dinle.
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
              <span>🐾 İloş Şefkat Sertifikası</span>
            </button>

            <div className="flex items-center gap-2 text-xs font-mono-code text-pink-300">
              <span>Toplam Sevgi Skoru:</span>
              <span className="px-3 py-1 rounded-full bg-pink-900/50 border border-pink-700/40 font-bold text-white">
                {totalPoints} Kalp 💜
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
              className={`relative p-6 rounded-2xl border transition-all cursor-pointer flex flex-col items-center text-center group ${
                catPurring
                  ? 'bg-pink-950/60 border-pink-500 shadow-xl shadow-pink-950'
                  : 'bg-purple-950/40 border-purple-800/40 hover:border-pink-500/50'
              }`}
            >
              <div className="text-6xl mb-3 group-hover:scale-110 transition-transform">
                🐈‍⬛
              </div>
              <h4 className="text-base font-bold text-white mb-1">
                Pamuk (Aşk Bahçesi Kedisi)
              </h4>
              <p className="text-xs text-purple-300/70 mb-3">
                Güneşin vurduğu en yumuşak minderde keyif yapan misafir.
              </p>
              
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[11px] font-mono-code px-2.5 py-0.5 rounded-full bg-purple-900/60 text-purple-200">
                  {catFeedCount} Porsiyon Somon 🐟
                </span>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleFeedCat(e);
                }}
                className="px-4 py-2 rounded-xl bg-pink-600 hover:bg-pink-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md transition-all hover:scale-105"
              >
                <Fish className="w-3.5 h-3.5" />
                <span>Somonlu Mama Ver</span>
              </button>

              {/* Cat Speech Bubble */}
              <AnimatePresence>
                {catSpeech && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute -top-8 left-1/2 -translate-x-1/2 w-11/12 max-w-xs bg-pink-950/95 border border-pink-500 text-pink-100 text-[11px] sm:text-xs px-3 py-1.5 rounded-xl shadow-xl z-20 font-medium text-center backdrop-blur-md"
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
              className={`relative p-6 rounded-2xl border transition-all cursor-pointer flex flex-col items-center text-center group ${
                dogHappy
                  ? 'bg-purple-900/60 border-purple-400 shadow-xl shadow-purple-950'
                  : 'bg-purple-950/40 border-purple-800/40 hover:border-purple-500/50'
              }`}
            >
              <div className="text-6xl mb-3 group-hover:scale-110 transition-transform">
                🐕
              </div>
              <h4 className="text-base font-bold text-white mb-1">
                Çakıl (Bahçenin Neşeli Köpeği)
              </h4>
              <p className="text-xs text-purple-300/70 mb-3">
                İloş'u görünce sevinçten kuyruğu pervaneye dönen sadık dost.
              </p>
              
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[11px] font-mono-code px-2.5 py-0.5 rounded-full bg-purple-900/60 text-purple-200">
                  {dogFeedCount} Ödül Kemiği 🦴
                </span>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleFeedDog(e);
                }}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md transition-all hover:scale-105"
              >
                <Bone className="w-3.5 h-3.5" />
                <span>Ödül Kemiği Ver</span>
              </button>

              {/* Dog Speech Bubble */}
              <AnimatePresence>
                {dogSpeech && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute -top-8 left-1/2 -translate-x-1/2 w-11/12 max-w-xs bg-purple-950/95 border border-purple-500 text-purple-100 text-[11px] sm:text-xs px-3 py-1.5 rounded-xl shadow-xl z-20 font-medium text-center backdrop-blur-md"
                  >
                    {dogSpeech}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

          </div>

          {/* Fresh Water Basin (Taze Su Havuzu) */}
          <div className="bg-purple-950/60 border border-purple-700/40 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-left">
              <div className="w-12 h-12 rounded-xl bg-cyan-950/80 border border-cyan-600/40 flex items-center justify-center text-2xl">
                🥣
              </div>
              <div>
                <h5 className="text-sm font-bold text-white">
                  Taze Su Kabı
                </h5>
                <p className="text-xs text-cyan-300/80 font-mono-code">
                  Su Seviyesi: %{waterBowlLevel} • Serin ve Berrak
                </p>
              </div>
            </div>

            <button
              onClick={handleFillWater}
              className="px-5 py-2.5 rounded-xl bg-cyan-800 hover:bg-cyan-700 text-cyan-100 text-xs font-semibold flex items-center gap-2 transition-all hover:scale-105"
            >
              <Droplets className="w-4 h-4 text-cyan-300" />
              <span>Taze Su Tazele</span>
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
          animate={{ opacity: 0, y: -60, scale: 1.3 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="fixed pointer-events-none text-pink-300 z-50 text-sm font-mono-code font-bold drop-shadow-lg"
          style={{ left: h.x, top: h.y }}
        >
          {h.text}
        </motion.div>
      ))}

    </section>
  );
};

