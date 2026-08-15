import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Car, MapPin, Navigation, Star, Shield, Clock, Heart, Sparkles, CheckCircle2, PhoneCall, Music } from 'lucide-react';
import { soundManager } from '../utils/audio';
import { launchGrandBirthdayConfetti } from '../utils/confetti';

const PICKUP_POINTS = [
  'Kütüphane / KPSS Çalışma Masası',
  'Aşk Bahçesi (Canları Beslerken)',
  'Spor Salonu & Koşu Parkuru',
  'İş / Kurs / Şehir Merkezi',
  'Herhangi Bir Yer (Konum Gönder Yeter)'
];

const DESTINATION_POINTS = [
  'Eve Güvenle Bırak (Yorgunluk Atma)',
  'Kahve & Kruvasan Molası',
  'Komagene / Çiğköfte & Künefe Ziyafeti',
  'Galatasaray RAMS Park Maçı',
  'Sahilde Akşamüstü Yürüyüşü',
  'Dünyanın En Güzel Köşesi'
];

interface UberMustafaProps {
  onUnlockAchievement?: (id: string) => void;
}

export const UberMustafa: React.FC<UberMustafaProps> = ({ onUnlockAchievement }) => {
  const [pickup, setPickup] = useState(PICKUP_POINTS[0]);
  const [destination, setDestination] = useState(DESTINATION_POINTS[0]);
  const [hasCoffee, setHasCoffee] = useState(true);
  const [playYalin, setPlayYalin] = useState(true);
  const [isCalling, setIsCalling] = useState(false);
  const [rideStatus, setRideStatus] = useState<{
    active: boolean;
    step: string;
    eta: string;
  } | null>(null);

  const handleCallUberMustafa = () => {
    soundManager.playAchievement();
    soundManager.playPop();
    setIsCalling(true);
    if (onUnlockAchievement) {
      onUnlockAchievement('uber-mustafa');
    }

    setTimeout(() => {
      setRideStatus({
        active: true,
        step: 'Mustafa Can yola çıktı! Konforlu VIP araç kapına yanaşıyor.',
        eta: '1-2 Dakika'
      });
      setIsCalling(false);
      launchGrandBirthdayConfetti();
    }, 1200);
  };

  const handleCancelRide = () => {
    soundManager.playPop();
    setRideStatus(null);
  };

  return (
    <section id="uber-mustafa-section" className="py-20 px-4 sm:px-6 relative">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/70 border border-purple-700/50 text-purple-300 text-xs font-mono-code mb-3 shadow-lg">
            <Car className="w-4 h-4 text-pink-400" />
            <span>7/24 SINIRSIZ VIP TRANSFER</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            Uber Mustafa — Özel Şoförün 🚗
          </h2>
          
          <p className="text-sm sm:text-base text-purple-200/80 max-w-xl mx-auto mt-2 font-light">
            İloş yorulmasın. Gece veya gündüz fark etmeksizin, seni bulunduğun yerden alıp istediğin yere götürmek Mustafa'nın görevidir.
          </p>
        </div>

        {/* Uber Mustafa Deck */}
        <div className="bg-gradient-to-br from-[#1b0a31]/95 via-[#130724]/95 to-[#0e051c]/95 border border-purple-600/40 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-purple-950/70 relative overflow-hidden">
          
          {/* Driver Profile Header */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-purple-800/40">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-600 via-pink-500 to-purple-800 flex items-center justify-center text-white font-display font-black text-xl shadow-lg border border-purple-400/50">
                MC
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-display font-bold text-white">
                    Mustafa Can
                  </h3>
                  <span className="px-2 py-0.5 rounded-full bg-pink-900/60 border border-pink-500/40 text-pink-300 text-[10px] font-mono-code font-bold">
                    VIP ŞOFÖR
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-0.5 text-xs text-purple-300">
                  <div className="flex items-center text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span className="font-bold ml-1">5.0</span>
                  </div>
                  <span className="text-purple-600">•</span>
                  <span>10.000+ Kusursuz Yolculuk</span>
                  <span className="text-purple-600">•</span>
                  <span className="text-emerald-400 font-medium">Aktif & Hazır</span>
                </div>
              </div>
            </div>

            <div className="text-right sm:border-l sm:border-purple-800/40 sm:pl-6 w-full sm:w-auto flex sm:flex-col justify-between items-center sm:items-end">
              <span className="text-[10px] text-purple-400 uppercase font-mono-code">YOLCULUK ÜCRETİ</span>
              <span className="text-xl font-display font-extrabold text-emerald-400 font-mono-code">0.00 TL</span>
              <span className="text-[10px] text-pink-300/80 font-serif-italic">Ömür Boyu Ücretsiz</span>
            </div>
          </div>

          {/* Mustafa Can Guarantee Note */}
          <div className="my-6 p-4 rounded-2xl bg-purple-950/50 border border-purple-800/40 text-xs sm:text-sm text-purple-100 font-serif-italic text-center">
            “Mustafa Can Notu: Nerede olursan ol tek tuşa bas. Trafik, saat, mesafe fark etmez; İloş'u kapısından alır, en güvenli şekilde evine veya kahveye bırakırım.”
          </div>

          {/* Ride Booking Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
            
            {/* Pickup Point Selection */}
            <div>
              <label className="text-xs font-mono-code text-purple-300 flex items-center gap-1.5 mb-2">
                <MapPin className="w-3.5 h-3.5 text-pink-400" />
                <span>NEREDEN ALINACAKSIN? (KALKIŞ)</span>
              </label>
              <select
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-purple-950/80 border border-purple-700/50 text-white text-xs sm:text-sm focus:outline-none focus:border-pink-500 font-medium"
              >
                {PICKUP_POINTS.map((pt, idx) => (
                  <option key={idx} value={pt} className="bg-[#18092d]">
                    {pt}
                  </option>
                ))}
              </select>
            </div>

            {/* Destination Selection */}
            <div>
              <label className="text-xs font-mono-code text-purple-300 flex items-center gap-1.5 mb-2">
                <Navigation className="w-3.5 h-3.5 text-emerald-400" />
                <span>NEREYE GİTMEK İSTERSİN? (VARIŞ)</span>
              </label>
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-purple-950/80 border border-purple-700/50 text-white text-xs sm:text-sm focus:outline-none focus:border-pink-500 font-medium"
              >
                {DESTINATION_POINTS.map((dest, idx) => (
                  <option key={idx} value={dest} className="bg-[#18092d]">
                    {dest}
                  </option>
                ))}
              </select>
            </div>

          </div>

          {/* In-Car VIP Amenities */}
          <div className="flex flex-wrap items-center gap-3 py-3 border-t border-b border-purple-800/40 mb-6">
            <span className="text-xs text-purple-300 font-mono-code mr-1">ARAÇ İÇİ İKRAMLAR:</span>
            
            <button
              onClick={() => setPlayYalin(!playYalin)}
              className={`px-3 py-1 rounded-xl text-xs font-mono-code flex items-center gap-1.5 border transition-all ${
                playYalin
                  ? 'bg-pink-950/70 border-pink-500/50 text-pink-200'
                  : 'bg-purple-950/40 border-purple-800/40 text-purple-400'
              }`}
            >
              <Music className="w-3 h-3 text-pink-400" />
              <span>Yalın — Akşamüstü Çalsın {playYalin ? '✓' : ''}</span>
            </button>

            <button
              onClick={() => setHasCoffee(!hasCoffee)}
              className={`px-3 py-1 rounded-xl text-xs font-mono-code flex items-center gap-1.5 border transition-all ${
                hasCoffee
                  ? 'bg-amber-950/70 border-amber-500/50 text-amber-200'
                  : 'bg-purple-950/40 border-purple-800/40 text-purple-400'
              }`}
            >
              <span>☕ Sıcak Kahve & Termos Hazır {hasCoffee ? '✓' : ''}</span>
            </button>

            <span className="px-3 py-1 rounded-xl bg-purple-950/40 border border-purple-800/40 text-purple-300 text-xs font-mono-code">
              ❄️ Mor Ambiyans & Konfor Klima ✓
            </span>
          </div>

          {/* Action Button & Active Ride Card */}
          {!rideStatus ? (
            <div className="text-center pt-2">
              <button
                id="call-uber-mustafa-btn"
                disabled={isCalling}
                onClick={handleCallUberMustafa}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-pink-600 via-purple-600 to-fuchsia-600 hover:from-pink-500 hover:to-purple-500 text-white font-display font-bold text-base shadow-xl shadow-purple-950 transition-all hover:scale-105 inline-flex items-center justify-center gap-3"
              >
                <Car className="w-5 h-5" />
                <span>{isCalling ? 'Mustafa Can Çağrılıyor...' : 'Uber Mustafa\'yı Çağır 🚗💨'}</span>
              </button>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-6 rounded-2xl bg-gradient-to-r from-purple-950/90 via-pink-950/80 to-purple-950/90 border-2 border-pink-500/60 shadow-xl text-center space-y-4"
            >
              <div className="flex items-center justify-center gap-2 text-pink-300 text-sm font-bold font-mono-code">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>MUSTAFA CAN YOLDA! 🚗💨</span>
              </div>

              <p className="text-base font-display font-extrabold text-white">
                {pickup} <span className="text-pink-400 font-sans">➔</span> {destination}
              </p>

              <div className="flex items-center justify-center gap-4 text-xs font-mono-code text-purple-200">
                <span>Tahmini Varış: <strong className="text-pink-300">{rideStatus.eta}</strong></span>
                <span>•</span>
                <span>Yalın Çalıyor ♫</span>
                <span>•</span>
                <span className="text-emerald-400 font-bold">Ücret: 0 TL</span>
              </div>

              <p className="text-xs text-purple-300/90 font-serif-italic max-w-md mx-auto">
                “Mustafa Can kapının önünde bekliyor, istediğin zaman çıkabilirsin İloş.”
              </p>

              <button
                onClick={handleCancelRide}
                className="px-4 py-2 rounded-xl bg-purple-900/60 hover:bg-purple-800 text-purple-300 text-xs font-mono-code transition-all"
              >
                Yolculuğu Tamamla / Kapat
              </button>
            </motion.div>
          )}

        </div>

      </div>
    </section>
  );
};
