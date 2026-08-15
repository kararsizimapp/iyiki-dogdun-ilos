import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { UtensilsCrossed, AlertTriangle, Sparkles, Heart, Check, Flame, RefreshCw } from 'lucide-react';
import { approvedMenuItems } from '../data/ilosData';
import { soundManager } from '../utils/audio';

interface ApprovedMenuProps {
  onUnlockAchievement: (id: string) => void;
}

export const ApprovedMenu: React.FC<ApprovedMenuProps> = ({ onUnlockAchievement }) => {
  const [kunefeClicks, setKunefeClicks] = useState(0);
  const [kunefeCheeseStretched, setKunefeCheeseStretched] = useState(false);
  const [isIceTeaShattered, setIsIceTeaShattered] = useState(false);
  const [burgerStacked, setBurgerStacked] = useState(false);
  const [brownieBites, setBrownieBites] = useState(0);
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [emergencyStep, setEmergencyStep] = useState(0);

  const handleBrownieClick = () => {
    soundManager.playPop();
    const next = brownieBites + 1;
    setBrownieBites(next);
    if (next >= 3) {
      soundManager.playAchievement();
    }
  };

  const handleKunefeClick = () => {
    soundManager.playPop();
    const next = kunefeClicks + 1;
    setKunefeClicks(next);
    setKunefeCheeseStretched(true);

    if (next >= 3) {
      soundManager.playAchievement();
      onUnlockAchievement('tatli-krizi');
    }
  };

  const handleIceTeaClick = () => {
    soundManager.playPop();
    setIsIceTeaShattered(true);
    setTimeout(() => setIsIceTeaShattered(false), 4000);
  };

  const handleBurgerClick = () => {
    soundManager.playPop();
    setBurgerStacked(true);
    setTimeout(() => setBurgerStacked(false), 3500);
  };

  const handleEmergencyProtocol = () => {
    soundManager.playAchievement();
    setShowEmergencyModal(true);
    setEmergencyStep(0);

    let step = 0;
    const timer = setInterval(() => {
      step++;
      setEmergencyStep(step);
      soundManager.playClick();
      if (step >= 5) {
        clearInterval(timer);
      }
    }, 700);
  };

  return (
    <section id="menu-section" className="py-20 px-4 sm:px-6 relative">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-800/40 text-purple-300 text-xs font-mono-code mb-3">
            <UtensilsCrossed className="w-3.5 h-3.5 text-purple-400" />
            <span>SAHNE 09 • RESMİ MENÜ</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            İloş Approved
          </h2>
          <p className="text-sm sm:text-base text-purple-300/70 max-w-lg mx-auto mt-2">
            İloş lezzet standartlarından tam not almış, kriz anlarının kurtarıcı menüsü.
          </p>
        </div>

        {/* Menu Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {approvedMenuItems.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ y: -4 }}
              className={`rounded-3xl p-6 bg-gradient-to-br ${item.bgGradient} border border-purple-700/40 shadow-xl shadow-purple-950/50 flex flex-col justify-between relative overflow-hidden`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl">{item.emoji}</span>
                  <span className="text-[11px] font-mono-code px-2.5 py-0.5 rounded-full bg-purple-900/60 text-purple-200 border border-purple-700/40">
                    {item.tag}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
                <span className="text-xs text-pink-300 font-semibold block mb-3">{item.subtitle}</span>
                <p className="text-xs text-purple-200/80 leading-relaxed font-light mb-4">
                  {item.description}
                </p>
              </div>

              {/* Card Interactive Micro Action */}
              <div className="pt-3 border-t border-purple-800/30 flex items-center justify-between">
                <span className="text-[11px] font-mono-code text-purple-300/70">
                  {item.ratingText}
                </span>

                {item.id === 'kunefe' && (
                  <button
                    onClick={handleKunefeClick}
                    className="text-xs px-2.5 py-1 rounded-xl bg-amber-600/60 hover:bg-amber-500 text-white font-mono-code transition-all"
                  >
                    🧀 Uzat ({kunefeClicks}/3)
                  </button>
                )}

                {item.id === 'icetea' && (
                  <button
                    onClick={handleIceTeaClick}
                    className="text-xs px-2.5 py-1 rounded-xl bg-orange-600/60 hover:bg-orange-500 text-white font-mono-code transition-all"
                  >
                    🥤 Şişeyi Salla
                  </button>
                )}

                {item.id === 'cheeseburger' && (
                  <button
                    onClick={handleBurgerClick}
                    className="text-xs px-2.5 py-1 rounded-xl bg-yellow-600/60 hover:bg-yellow-500 text-white font-mono-code transition-all"
                  >
                    🍔 Katmanla
                  </button>
                )}

                {item.id === 'browni' && (
                  <button
                    onClick={handleBrownieClick}
                    className="text-xs px-2.5 py-1 rounded-xl bg-pink-700/70 hover:bg-pink-600 text-white font-mono-code transition-all"
                  >
                    🍫 Isır ({brownieBites})
                  </button>
                )}
              </div>

              {/* Feedback messages inside cards */}
              {item.id === 'kunefe' && kunefeCheeseStretched && (
                <div className="mt-2 text-[11px] text-amber-300 font-serif-italic">
                  {kunefeClicks >= 3
                    ? '“Tamam paylaşmayacağını anladık zaateeen :)”'
                    : 'Peynir uzuyor... Mutluluk artıyor!'}
                </div>
              )}

              {item.id === 'browni' && brownieBites > 0 && (
                <div className="mt-2 text-[11px] text-pink-300 font-serif-italic">
                  {brownieBites >= 3
                    ? '“Akışkan çikolata zirveye ulaştı! Bütün yorgunluk eridi gitti 🍫💜”'
                    : 'Sıcak çikolata kalbe iyi geldi...'}
                </div>
              )}

              {item.id === 'icetea' && isIceTeaShattered && (
                <div className="mt-2 text-[11px] text-orange-300 font-serif-italic">
                  “Bunu salladıktan sonra açman gerçekten mantıklı mıydı? 🍑”
                </div>
              )}

              {item.id === 'cheeseburger' && burgerStacked && (
                <div className="mt-2 text-[11px] text-yellow-300 font-serif-italic">
                  “Ekmek + Köfte + Peynir birleşti. İloş approved! ✓”
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Menu End Disclaimer */}
        <div className="bg-purple-950/40 border border-purple-800/40 rounded-2xl p-4 text-center mb-8">
          <p className="text-xs sm:text-sm text-purple-200/90 font-serif-italic">
            “Beslenme uzmanları bu menüyü onaylamadı. İloş onayladı. Bizce yeterli.”
          </p>
        </div>

        {/* Emergency Mood Button (Komagene Easter Egg) */}
        <div className="text-center">
          <button
            id="emergency-mood-btn"
            onClick={handleEmergencyProtocol}
            className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-purple-800 via-pink-700 to-red-700 hover:from-purple-700 hover:to-red-600 text-white font-bold text-xs sm:text-sm shadow-xl shadow-purple-950/70 border border-pink-500/40 transition-all inline-flex items-center gap-2 hover:scale-105"
          >
            <AlertTriangle className="w-4 h-4 text-yellow-300 animate-pulse" />
            <span>ACİL DURUM PROTOKOLÜ (İloş'un Modu Düştüğünde)</span>
          </button>
        </div>

      </div>

      {/* Emergency Purple Alarm Modal */}
      <AnimatePresence>
        {showEmergencyModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gradient-to-b from-[#220d3d] to-[#120524] border-2 border-pink-500/60 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative text-left"
            >
              <div className="flex items-center gap-3 pb-4 border-b border-purple-700/50 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-pink-600/30 border border-pink-500/50 flex items-center justify-center text-pink-300">
                  <AlertTriangle className="w-5 h-5 text-pink-400 animate-bounce" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">İLOŞ'UN MODU DÜŞTÜ</h3>
                  <p className="text-xs text-purple-300/80 font-mono-code">Acil Müdahale Protokolü</p>
                </div>
              </div>

              <div className="space-y-2.5 font-mono-code text-xs">
                {emergencyStep >= 1 && (
                  <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex items-center justify-between p-2.5 rounded-xl bg-purple-950/60 text-purple-200">
                    <span>1. Kahve Kontrolü</span>
                    <span className="text-green-400 font-bold">✓</span>
                  </motion.div>
                )}

                {emergencyStep >= 2 && (
                  <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex items-center justify-between p-2.5 rounded-xl bg-purple-950/60 text-purple-200">
                    <span>2. Ice Tea Şeftali</span>
                    <span className="text-green-400 font-bold">✓</span>
                  </motion.div>
                )}

                {emergencyStep >= 3 && (
                  <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex items-center justify-between p-2.5 rounded-xl bg-purple-950/60 text-purple-200">
                    <span>3. Komagene Çiğköfte</span>
                    <span className="text-green-400 font-bold">✓</span>
                  </motion.div>
                )}

                {emergencyStep >= 4 && (
                  <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex items-center justify-between p-2.5 rounded-xl bg-purple-950/60 text-purple-200">
                    <span>4. Kenks Çağrılıyor...</span>
                    <span className="text-pink-300 font-bold">Hazır</span>
                  </motion.div>
                )}

                {emergencyStep >= 5 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center justify-between p-3 rounded-xl bg-purple-900/60 border border-purple-500/50 text-white font-bold"
                  >
                    <span>5. Mustafa zaten burada</span>
                    <span className="text-green-400">✓</span>
                  </motion.div>
                )}
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setShowEmergencyModal(false)}
                  className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold transition-colors"
                >
                  Protokolü Tamamla ✓
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
