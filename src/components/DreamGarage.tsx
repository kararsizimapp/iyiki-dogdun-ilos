import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Car, Zap, Sparkles, Check, ShoppingBag, CreditCard, ShieldAlert } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface DreamGarageProps {
  onUnlockAchievement: (id: string) => void;
}

type CarModel = 'mini' | 'tesla';

interface ColorOption {
  id: string;
  name: string;
  hex: string;
  bgGradient: string;
  accentGlow: string;
}

const colors: ColorOption[] = [
  { id: 'ilos-moru', name: 'İloş Moru', hex: '#8b5cf6', bgGradient: 'from-purple-900 via-fuchsia-950 to-purple-950', accentGlow: 'rgba(139, 92, 246, 0.5)' },
  { id: 'midnight', name: 'Gece Mürdümü', hex: '#4c1d95', bgGradient: 'from-purple-950 via-stone-950 to-purple-950', accentGlow: 'rgba(76, 29, 149, 0.5)' },
  { id: 'lavender', name: 'Açık Lavanta', hex: '#c084fc', bgGradient: 'from-purple-800 via-pink-950 to-purple-900', accentGlow: 'rgba(192, 132, 252, 0.5)' },
  { id: 'pearl', name: 'İnci Beyazı', hex: '#f4effa', bgGradient: 'from-purple-950 via-slate-900 to-purple-950', accentGlow: 'rgba(244, 239, 250, 0.4)' },
  { id: 'pink', name: 'Pembe Termos Tonu', hex: '#ec4899', bgGradient: 'from-pink-900 via-purple-950 to-pink-950', accentGlow: 'rgba(236, 72, 153, 0.5)' }
];

export const DreamGarage: React.FC<DreamGarageProps> = ({ onUnlockAchievement }) => {
  const [selectedCar, setSelectedCar] = useState<CarModel>('tesla');
  const [selectedColor, setSelectedColor] = useState<ColorOption>(colors[0]);
  const [licensePlate, setLicensePlate] = useState('34 ILOS 28');
  const [isBuying, setIsBuying] = useState(false);
  const [buyMessage, setBuyMessage] = useState<string | null>(null);
  const [mustafaPayMessage, setMustafaPayMessage] = useState<string | null>(null);
  const [secretTeslaToast, setSecretTeslaToast] = useState<{ step: number; text: string } | null>(null);

  const handleColorChange = (color: ColorOption) => {
    soundManager.playPop();
    setSelectedColor(color);
    onUnlockAchievement('dream-driver');

    // Secret Mor Tesla easter egg
    if (selectedCar === 'tesla' && color.id === 'ilos-moru') {
      setSecretTeslaToast({ step: 1, text: '“Bunu sana yakıştıran biri varmış.”' });
      setTimeout(() => {
        setSecretTeslaToast({ step: 2, text: '“Kim olduğunu söylemiyor.”' });
        setTimeout(() => {
          setSecretTeslaToast(null);
        }, 3000);
      }, 2000);
    }
  };

  const handleCarSwitch = (car: CarModel) => {
    soundManager.playClick();
    setSelectedCar(car);
    if (car === 'tesla' && selectedColor.id === 'ilos-moru') {
      setSecretTeslaToast({ step: 1, text: '“Bunu sana yakıştıran biri varmış.”' });
      setTimeout(() => {
        setSecretTeslaToast({ step: 2, text: '“Kim olduğunu söylemiyor.”' });
        setTimeout(() => {
          setSecretTeslaToast(null);
        }, 3000);
      }, 2000);
    }
  };

  const handleBuyClick = () => {
    soundManager.playClick();
    setIsBuying(true);
    setBuyMessage(null);

    setTimeout(() => {
      setIsBuying(false);
      setBuyMessage('“KPSS atamasından sonra tekrar deneyelim. Ama mor gerçekten çok yakıştı.”');
      soundManager.playAchievement();
    }, 1800);
  };

  const handleMustafaPay = () => {
    soundManager.playPop();
    setMustafaPayMessage('“Mustafa sohbetten ayrıldı...”');
    setTimeout(() => {
      setMustafaPayMessage('“Şaka şaka buradayım. Ama önce KPSS ataması :)”');
      setTimeout(() => {
        setMustafaPayMessage(null);
      }, 4000);
    }, 1400);
  };

  // Real high-definition automotive photos
  const carImages: Record<CarModel, { url: string; alt: string; modelName: string; specs: string }> = {
    tesla: {
      url: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1200&q=80',
      alt: 'Mor Tesla Performance',
      modelName: 'Tesla Model 3 Dual Motor Performance',
      specs: '0-100: 3.1 sn • Mor Neon Işıklandırma • Otopilot'
    },
    mini: {
      url: 'https://images.unsplash.com/photo-1541348263662-e0c8de42d1fe?auto=format&fit=crop&w=1200&q=80',
      alt: 'Mor Mini Cooper S Iconic',
      modelName: 'Mini Cooper S Iconic Hatchback',
      specs: 'İkonik Yuvarlak Farlar • Panoramik Tavan • Mor Detaylar • İloş Modu'
    }
  };

  return (
    <section id="garage-section" className="py-20 px-4 sm:px-6 relative">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-800/40 text-purple-300 text-xs font-mono-code mb-3">
            <Car className="w-3.5 h-3.5 text-purple-400" />
            <span>SAHNE 07 • SHOWROOM</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            İloş Dream Garage
          </h2>
          <p className="text-sm sm:text-base text-purple-300/70 max-w-lg mx-auto mt-2">
            Özel configurator ile hayalindeki arabayı ve mor detayları tasarla.
          </p>
        </div>

        {/* Showroom Window Container */}
        <div className="bg-[#120822]/90 backdrop-blur-xl border border-purple-700/40 rounded-3xl p-6 sm:p-10 shadow-2xl shadow-purple-950/60 relative overflow-hidden">
          
          {/* Top Model Switcher */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <button
              onClick={() => handleCarSwitch('tesla')}
              className={`px-5 py-2.5 rounded-2xl font-display font-bold text-sm transition-all flex items-center gap-2 border ${
                selectedCar === 'tesla'
                  ? 'bg-purple-600 border-purple-400 text-white shadow-lg shadow-purple-900/50 scale-105'
                  : 'bg-purple-950/40 border-purple-800/40 text-purple-300 hover:bg-purple-900/40'
              }`}
            >
              <Zap className="w-4 h-4 text-yellow-300" />
              <span>Tesla Model 3 / Y</span>
            </button>

            <button
              onClick={() => handleCarSwitch('mini')}
              className={`px-5 py-2.5 rounded-2xl font-display font-bold text-sm transition-all flex items-center gap-2 border ${
                selectedCar === 'mini'
                  ? 'bg-purple-600 border-purple-400 text-white shadow-lg shadow-purple-900/50 scale-105'
                  : 'bg-purple-950/40 border-purple-800/40 text-purple-300 hover:bg-purple-900/40'
              }`}
            >
              <Car className="w-4 h-4 text-pink-300" />
              <span>Mini Cooper</span>
            </button>
          </div>

          {/* Car Stage / Preview */}
          <div className={`relative rounded-3xl p-6 sm:p-8 bg-gradient-to-b ${selectedColor.bgGradient} border border-purple-600/30 flex flex-col items-center justify-center min-h-[360px] shadow-inner mb-8 transition-colors duration-500 overflow-hidden`}>
            
            {/* Showroom Lighting Glow */}
            <div
              className="absolute w-96 h-96 rounded-full blur-3xl pointer-events-none transition-colors duration-500 opacity-60"
              style={{ backgroundColor: selectedColor.accentGlow }}
            />

            {/* Visual Representation of Car with Real Image */}
            <motion.div
              key={`${selectedCar}-${selectedColor.id}`}
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="relative z-10 w-full flex flex-col items-center"
            >
              {/* Real Car Image Container */}
              <div className="relative w-full max-w-xl h-64 sm:h-72 rounded-2xl overflow-hidden shadow-2xl border border-purple-500/30 bg-black/60 group">
                <img
                  src={carImages[selectedCar].url}
                  alt={carImages[selectedCar].alt}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Purple Color Tint Overlay */}
                <div
                  className="absolute inset-0 mix-blend-color opacity-70 transition-colors duration-500 pointer-events-none"
                  style={{ backgroundColor: selectedColor.hex }}
                />
                <div
                  className="absolute inset-0 mix-blend-overlay opacity-50 transition-colors duration-500 pointer-events-none"
                  style={{ backgroundColor: selectedColor.hex }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0514] via-transparent to-black/30 pointer-events-none" />

                {/* Badge on Photo */}
                <div className="absolute top-3 left-3 px-3 py-1 rounded-xl bg-purple-950/80 backdrop-blur-md border border-purple-500/40 text-white text-[11px] font-mono-code font-bold flex items-center gap-1.5 shadow-lg">
                  <Sparkles className="w-3 h-3 text-pink-400" />
                  <span>{selectedColor.name} Özel Kaplama</span>
                </div>

                {/* Mounted License Plate on Car */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-white text-black border-2 border-slate-700 rounded-md shadow-2xl flex items-center gap-2 font-mono-code font-bold text-xs sm:text-sm tracking-wider">
                  <span className="bg-blue-700 text-white text-[10px] px-1 py-0.5 rounded font-sans font-normal">TR</span>
                  <span>{licensePlate}</span>
                </div>
              </div>

              <div className="mt-4 text-center">
                <h3 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight">
                  {carImages[selectedCar].modelName}
                </h3>
                <p className="text-xs font-mono-code text-purple-300/80 mt-1">
                  {carImages[selectedCar].specs}
                </p>
              </div>
            </motion.div>

          </div>

          {/* Configurator Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-purple-800/40">
            
            {/* Color Swatches */}
            <div>
              <label className="text-xs font-mono-code text-purple-300 uppercase tracking-wider block mb-3">
                1. Renk Seçimi:
              </label>
              <div className="flex flex-wrap gap-2.5">
                {colors.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => handleColorChange(c)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-medium transition-all ${
                      selectedColor.id === c.id
                        ? 'bg-purple-900 border-pink-400 text-white shadow-md'
                        : 'bg-purple-950/50 border-purple-800/40 text-purple-300 hover:bg-purple-900/40'
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-white/40"
                      style={{ backgroundColor: c.hex }}
                    />
                    <span>{c.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* License Plate Input */}
            <div>
              <label className="text-xs font-mono-code text-purple-300 uppercase tracking-wider block mb-3">
                2. Plaka Kişiselleştirme:
              </label>
              <input
                type="text"
                value={licensePlate}
                maxLength={14}
                onChange={(e) => setLicensePlate(e.target.value.toUpperCase())}
                className="w-full bg-purple-950/60 border border-purple-700/50 rounded-xl px-4 py-2.5 text-white font-mono-code text-sm uppercase tracking-wider focus:outline-none focus:border-pink-400"
                placeholder="34 ILOS 28"
              />
            </div>

          </div>

          {/* Action Buttons */}
          <div className="mt-8 pt-6 border-t border-purple-800/40 flex flex-col sm:flex-row items-center justify-between gap-4">
            
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                id="garage-buy-btn"
                onClick={handleBuyClick}
                disabled={isBuying}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:opacity-50 text-white font-bold text-xs sm:text-sm shadow-lg shadow-purple-950 flex items-center justify-center gap-2 transition-all w-full sm:w-auto"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{isBuying ? 'Banka Hesabı Kontrol Ediliyor...' : 'Satın Al (Sipariş Ver)'}</span>
              </button>

              <button
                id="garage-mustafa-pay-btn"
                onClick={handleMustafaPay}
                className="px-4 py-3 rounded-xl bg-purple-950/60 hover:bg-purple-900/60 border border-purple-700/40 text-purple-300 hover:text-white text-xs font-mono-code transition-all whitespace-nowrap"
              >
                💳 Mustafa Ödesin
              </button>
            </div>

            <span className="text-xs text-purple-400/70 font-mono-code">
              *Ödeme yöntemi: KPSS Ataması
            </span>
          </div>

          {/* Buy Message Response */}
          <AnimatePresence>
            {buyMessage && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-6 p-4 rounded-2xl bg-purple-950/70 border border-purple-600/50 text-center text-sm text-pink-200 font-serif-italic"
              >
                {buyMessage}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mustafa Pay Joke Response */}
          <AnimatePresence>
            {mustafaPayMessage && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-4 p-3.5 rounded-xl bg-pink-950/60 border border-pink-700/40 text-center text-xs sm:text-sm text-pink-300 font-mono-code"
              >
                {mustafaPayMessage}
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>

      {/* Secret Mor Tesla Toast */}
      <AnimatePresence>
        {secretTeslaToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl bg-[#1d0d36] border border-purple-400 text-purple-100 text-xs sm:text-sm shadow-2xl font-serif-italic shadow-purple-950"
          >
            {secretTeslaToast.text}
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};
