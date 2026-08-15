import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Car, Zap, Sparkles, Check, ShoppingBag, CreditCard, ShieldAlert, Volume2, KeyRound, Gauge, Radio } from 'lucide-react';
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

interface CarSpecs {
  modelName: string;
  category: string;
  acceleration: string;
  topSpeed: string;
  range: string;
  features: string[];
}

const carDetails: Record<CarModel, CarSpecs> = {
  tesla: {
    modelName: 'Tesla Model 3 Dual Motor Performance',
    category: 'Elektrikli Performans Sedan',
    acceleration: '3.1 sn (0-100 km/s)',
    topSpeed: '261 km/s',
    range: '547 km',
    features: ['Otopilot & FSD', 'Cam Panoramik Tavan', 'Mor Neon Ambiyans', 'Yalın Akşamüstü Ses Sistemi']
  },
  mini: {
    modelName: 'Mini Cooper S Iconic Hatchback',
    category: 'İkonik Şehir & Stil İkonu',
    acceleration: '6.6 sn (0-100 km/s)',
    topSpeed: '235 km/s',
    range: '720 km (Dolu Depo)',
    features: ['İkonik Yuvarlak Farlar', 'Çift Renk Tavan', 'Mor Dikişli İç Mekan', 'Go-Kart Sürüş Hissi']
  }
};

export const DreamGarage: React.FC<DreamGarageProps> = ({ onUnlockAchievement }) => {
  const [selectedCar, setSelectedCar] = useState<CarModel>('tesla');
  const [selectedColor, setSelectedColor] = useState<ColorOption>(colors[0]);
  const [licensePlate, setLicensePlate] = useState('34 ILOS 28');
  const [isBuying, setIsBuying] = useState(false);
  const [buyMessage, setBuyMessage] = useState<string | null>(null);
  const [mustafaPayMessage, setMustafaPayMessage] = useState<string | null>(null);
  const [secretTeslaToast, setSecretTeslaToast] = useState<{ step: number; text: string } | null>(null);
  const [isEngineRunning, setIsEngineRunning] = useState(false);
  const [headlightsOn, setHeadlightsOn] = useState(true);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

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

  const handleToggleEngine = () => {
    soundManager.playAchievement();
    setIsEngineRunning(!isEngineRunning);
    const msg = !isEngineRunning
      ? (selectedCar === 'tesla' ? '⚡ Tesla Sessiz Güç Modu Aktif (Otopilot Hazır)' : '🏎️ Mini Cooper S Motoru Çalıştırıldı (Vrooom!)')
      : '🛑 Motor Durduruldu (Park Modu)';
    setActionNotice(msg);
    setTimeout(() => setActionNotice(null), 3000);
  };

  const handleHonkHorn = () => {
    soundManager.playPop();
    setActionNotice('📢 *DÜT DÜT!* (İloş Geçiyor, Yolu Açın!)');
    setTimeout(() => setActionNotice(null), 2500);
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

  return (
    <section id="garage-section" className="py-20 px-4 sm:px-6 relative">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-800/40 text-purple-300 text-xs font-mono-code mb-3">
            <Car className="w-3.5 h-3.5 text-purple-400" />
            <span>SAHNE 07 • SHOWROOM & KONFİGÜRATÖR</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            İloş Dream Garage
          </h2>
          <p className="text-sm sm:text-base text-purple-300/70 max-w-lg mx-auto mt-2">
            Özel dijital configurator ile hayalindeki mor arabayı kişiselleştir ve donanımlarını test et.
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
              <span>Tesla Model 3 Performance</span>
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
              <span>Mini Cooper S Iconic</span>
            </button>
          </div>

          {/* Car Stage / Futuristic Vector Studio Canvas */}
          <div className={`relative rounded-3xl p-6 sm:p-10 bg-gradient-to-b ${selectedColor.bgGradient} border border-purple-600/40 flex flex-col items-center justify-center min-h-[400px] shadow-inner mb-8 transition-colors duration-500 overflow-hidden`}>
            
            {/* Showroom Lighting Glow */}
            <div
              className="absolute w-96 h-96 rounded-full blur-3xl pointer-events-none transition-colors duration-500 opacity-60"
              style={{ backgroundColor: selectedColor.accentGlow }}
            />

            {/* Futuristic Studio Grid Ground */}
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none opacity-40" />

            {/* Quick Interactive Tool Strip */}
            <div className="w-full flex flex-wrap items-center justify-between gap-2 z-20 mb-4">
              <div className="px-3 py-1 rounded-xl bg-black/60 backdrop-blur-md border border-purple-500/40 text-white text-[10px] sm:text-[11px] font-mono-code font-bold flex items-center gap-1.5 shadow-lg">
                <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                <span>{selectedColor.name}</span>
              </div>

              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <button
                  onClick={() => setHeadlightsOn(!headlightsOn)}
                  className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl text-[10px] sm:text-xs font-mono-code border transition-all flex items-center gap-1 ${
                    headlightsOn ? 'bg-yellow-400 text-black border-yellow-300 font-bold' : 'bg-black/60 text-purple-200 border-purple-700/50'
                  }`}
                >
                  <Zap className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span>{headlightsOn ? 'Farlar Açık' : 'Farlar'}</span>
                </button>

                <button
                  onClick={handleHonkHorn}
                  className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl text-[10px] sm:text-xs font-mono-code bg-black/60 hover:bg-purple-900/60 border border-purple-700/50 text-purple-200 transition-all flex items-center gap-1"
                >
                  <Volume2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-pink-400" />
                  <span>Korna</span>
                </button>

                <button
                  onClick={handleToggleEngine}
                  className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl text-[10px] sm:text-xs font-mono-code border transition-all flex items-center gap-1 ${
                    isEngineRunning
                      ? 'bg-emerald-500 text-black border-emerald-400 font-bold animate-pulse'
                      : 'bg-black/60 text-purple-200 border-purple-700/50 hover:bg-purple-900/60'
                  }`}
                >
                  <KeyRound className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span>{isEngineRunning ? 'Çalışıyor' : 'Start'}</span>
                </button>
              </div>
            </div>

            {/* Dynamic Vector Studio Car Silhouette */}
            <motion.div
              key={`${selectedCar}-${selectedColor.id}`}
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="relative z-10 w-full max-w-2xl flex flex-col items-center mt-8"
            >
              {/* Futuristic Vector Car Drawing */}
              <div className="relative w-full h-56 sm:h-64 flex items-center justify-center">
                
                {/* Headlight Beam Effect */}
                {headlightsOn && (
                  <>
                    <div className="absolute right-8 top-28 w-44 h-16 bg-gradient-to-r from-yellow-200/40 via-yellow-100/10 to-transparent blur-md transform rotate-6 pointer-events-none" />
                    <div className="absolute left-8 top-28 w-44 h-16 bg-gradient-to-l from-yellow-200/40 via-yellow-100/10 to-transparent blur-md transform -rotate-6 pointer-events-none" />
                  </>
                )}

                {/* SVG Silhouette */}
                <svg
                  viewBox="0 0 500 200"
                  className="w-full h-full drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)] filter transition-all duration-500"
                  style={{ filter: `drop-shadow(0 0 25px ${selectedColor.hex}60)` }}
                >
                  {/* Underglow Neon Bar */}
                  <rect
                    x="100"
                    y="160"
                    width="300"
                    height="6"
                    rx="3"
                    fill={selectedColor.hex}
                    className="animate-pulse"
                  />

                  {/* Car Body Geometry */}
                  {selectedCar === 'tesla' ? (
                    // Sleek Aerodynamic Tesla Silhouette
                    <g>
                      {/* Car Body Main */}
                      <path
                        d="M 50,150 C 60,140 100,135 140,130 C 180,100 230,80 320,80 C 390,80 430,110 460,135 C 475,145 480,155 470,160 L 50,160 Z"
                        fill={selectedColor.hex}
                        opacity="0.9"
                      />
                      {/* Metallic Highlight Gradient Top */}
                      <path
                        d="M 145,128 C 185,98 232,82 320,82 C 385,82 422,110 448,132"
                        stroke="#ffffff"
                        strokeWidth="3"
                        strokeLinecap="round"
                        fill="none"
                        opacity="0.4"
                      />
                      {/* Panoramic Glass Roof */}
                      <path
                        d="M 180,120 C 210,95 250,88 320,88 C 365,88 395,105 415,120 Z"
                        fill="#0c0714"
                        stroke={selectedColor.hex}
                        strokeWidth="2"
                      />
                      {/* Aerodynamic Body Crease */}
                      <path
                        d="M 80,142 Q 250,132 445,140"
                        stroke="rgba(255,255,255,0.3)"
                        strokeWidth="2"
                        fill="none"
                      />
                      {/* LED Headlights */}
                      <ellipse cx="455" cy="138" rx="8" ry="4" fill={headlightsOn ? '#fef08a' : '#581c87'} />
                      <ellipse cx="65" cy="142" rx="8" ry="4" fill="#ef4444" />
                    </g>
                  ) : (
                    // Classic Mini Cooper Silhouette with Rounded Curves & Dual Roof
                    <g>
                      {/* White / Black Contrast Roof */}
                      <path
                        d="M 170,80 L 340,80 C 355,80 365,90 365,100 L 150,100 C 150,90 158,80 170,80 Z"
                        fill="#ffffff"
                        opacity="0.95"
                      />
                      {/* Mini Body */}
                      <path
                        d="M 70,155 C 75,130 90,115 150,105 L 365,105 C 410,115 440,128 450,155 L 70,155 Z"
                        fill={selectedColor.hex}
                        opacity="0.95"
                      />
                      {/* Windows */}
                      <path
                        d="M 160,108 L 245,108 L 245,128 L 140,128 Z"
                        fill="#120822"
                        stroke="rgba(255,255,255,0.2)"
                      />
                      <path
                        d="M 255,108 L 350,108 L 365,128 L 255,128 Z"
                        fill="#120822"
                        stroke="rgba(255,255,255,0.2)"
                      />
                      {/* Iconic Round Headlights */}
                      <circle cx="438" cy="135" r="10" fill={headlightsOn ? '#fef08a' : '#6b21a8'} stroke="#ffffff" strokeWidth="2" />
                      <circle cx="85" cy="138" r="8" fill="#ef4444" stroke="#ffffff" strokeWidth="1.5" />
                    </g>
                  )}

                  {/* Left Wheel */}
                  <g transform="translate(120, 160)">
                    <circle cx="0" cy="0" r="28" fill="#0f071a" stroke="#475569" strokeWidth="4" />
                    <circle cx="0" cy="0" r="16" fill="#1e1b4b" stroke={selectedColor.hex} strokeWidth="3" />
                    <circle cx="0" cy="0" r="6" fill="#ffffff" />
                  </g>

                  {/* Right Wheel */}
                  <g transform="translate(380, 160)">
                    <circle cx="0" cy="0" r="28" fill="#0f071a" stroke="#475569" strokeWidth="4" />
                    <circle cx="0" cy="0" r="16" fill="#1e1b4b" stroke={selectedColor.hex} strokeWidth="3" />
                    <circle cx="0" cy="0" r="6" fill="#ffffff" />
                  </g>
                </svg>

                {/* Mounted Physical License Plate on Showroom Bumper */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-4 py-1 bg-white text-black border-2 border-slate-700 rounded-md shadow-2xl flex items-center gap-2 font-mono-code font-bold text-xs sm:text-sm tracking-wider z-20">
                  <span className="bg-blue-700 text-white text-[10px] px-1 py-0.5 rounded font-sans font-normal">TR</span>
                  <span>{licensePlate}</span>
                </div>
              </div>

              {/* Vehicle Title & Dynamic Category */}
              <div className="mt-6 text-center">
                <h3 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight">
                  {carDetails[selectedCar].modelName}
                </h3>
                <p className="text-xs font-mono-code text-purple-300/90 mt-1">
                  {carDetails[selectedCar].category}
                </p>
              </div>

              {/* Specs Bento Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full mt-5">
                <div className="p-2.5 rounded-xl bg-black/40 border border-purple-800/40 text-center">
                  <span className="text-[10px] text-purple-300/70 font-mono-code block">Hızlanma (0-100)</span>
                  <span className="text-xs font-bold text-white font-mono-code">{carDetails[selectedCar].acceleration}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-black/40 border border-purple-800/40 text-center">
                  <span className="text-[10px] text-purple-300/70 font-mono-code block">Maksimum Hız</span>
                  <span className="text-xs font-bold text-white font-mono-code">{carDetails[selectedCar].topSpeed}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-black/40 border border-purple-800/40 text-center">
                  <span className="text-[10px] text-purple-300/70 font-mono-code block">Menzil / Kapasite</span>
                  <span className="text-xs font-bold text-white font-mono-code">{carDetails[selectedCar].range}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-black/40 border border-purple-800/40 text-center">
                  <span className="text-[10px] text-purple-300/70 font-mono-code block">İloş Donanım</span>
                  <span className="text-xs font-bold text-pink-300 font-mono-code">VIP Özel Paket</span>
                </div>
              </div>

              {/* Action notice banner */}
              <AnimatePresence>
                {actionNotice && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-4 px-4 py-2 rounded-xl bg-purple-950/90 border border-pink-400/50 text-xs text-pink-200 font-mono-code font-bold shadow-lg"
                  >
                    {actionNotice}
                  </motion.div>
                )}
              </AnimatePresence>

            </motion.div>

          </div>

          {/* Configurator Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-purple-800/40">
            
            {/* Color Swatches */}
            <div>
              <label className="text-xs font-mono-code text-purple-300 uppercase tracking-wider block mb-3">
                1. Renk & Kaplama Seçimi:
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

