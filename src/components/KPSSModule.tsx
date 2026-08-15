import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GraduationCap, Award, CheckCircle2, ShieldCheck, Sparkles, BookOpen, UserCheck } from 'lucide-react';
import { soundManager } from '../utils/audio';
import { launchPurpleConfetti } from '../utils/confetti';

interface KPSSModuleProps {
  onUnlockAchievement: (id: string) => void;
}

export const KPSSModule: React.FC<KPSSModuleProps> = ({ onUnlockAchievement }) => {
  const [progress, setProgress] = useState(98);
  const [statusStep, setStatusStep] = useState(0);
  const [isFullyLoaded, setIsFullyLoaded] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showIdCard, setShowIdCard] = useState(false);

  const statusLogs = [
    'Son %1 yükleniyor...',
    'Kahve kontrol ediliyor... ✓',
    'Pembe termos dolduruluyor... ✓',
    'Motivasyon aranıyor... ✓',
    '“Zaateeen yapacağım” protokolü başlatılıyor... ✓'
  ];

  const handleStartLoading = () => {
    if (isProcessing || isFullyLoaded) return;
    soundManager.playPop();
    setIsProcessing(true);
    setProgress(99);

    let step = 0;
    const interval = setInterval(() => {
      step++;
      setStatusStep(step);
      soundManager.playClick();

      if (step >= statusLogs.length) {
        clearInterval(interval);
        setProgress(100);
        setIsFullyLoaded(true);
        setIsProcessing(false);
        soundManager.playAchievement();
        launchPurpleConfetti();
        onUnlockAchievement('kpss-warrior');
      }
    }, 800);
  };

  return (
    <section id="kpss-section" className="py-20 px-4 sm:px-6 relative">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-800/40 text-purple-300 text-xs font-mono-code mb-3">
            <GraduationCap className="w-3.5 h-3.5 text-purple-400" />
            <span>SAHNE 06 • DEVLET MEMURU MODÜLÜ</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            Devlet Memuru Yükleniyor...
          </h2>
          <p className="text-sm sm:text-base text-purple-300/70 max-w-lg mx-auto mt-2">
            KPSS denemeleri, soru bankaları ve hedefe adım adım yaklaşan kararlılık.
          </p>
        </div>

        {/* Loading Progress Box */}
        <div className="bg-[#150b28]/90 backdrop-blur-xl border border-purple-700/40 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-purple-950/60">
          
          <div className="flex items-center justify-between mb-3 text-sm font-mono-code">
            <span className="text-purple-300 font-semibold flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-pink-400" />
              <span>ATAMA PROTOKOLÜ v2026</span>
            </span>
            <span className={`font-bold ${progress === 100 ? 'text-green-400' : 'text-pink-400'}`}>
              %{progress}
            </span>
          </div>

          {/* Big Progress Bar */}
          <div className="w-full bg-purple-950/80 rounded-full h-4 p-0.5 border border-purple-800/50 mb-6 overflow-hidden">
            <motion.div
              className={`h-full rounded-full transition-all duration-500 ${
                progress === 100
                  ? 'bg-gradient-to-r from-emerald-500 via-teal-400 to-green-400'
                  : 'bg-gradient-to-r from-purple-600 via-fuchsia-500 to-pink-500'
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Step Log Box */}
          <div className="bg-purple-950/40 rounded-2xl p-4 border border-purple-800/30 mb-6 font-mono-code text-xs space-y-1.5 min-h-[90px]">
            {!isProcessing && !isFullyLoaded && (
              <p className="text-purple-300/70">
                Sistem %98 seviyesinde bekliyor. Son %1'lik aşamayı başlatmak için aşağıdaki butona tıkla.
              </p>
            )}

            {isProcessing && (
              <div className="space-y-1">
                {statusLogs.slice(0, statusStep + 1).map((log, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-pink-300 flex items-center gap-2"
                  >
                    <span>▶</span>
                    <span>{log}</span>
                  </motion.div>
                ))}
              </div>
            )}

            {isFullyLoaded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-green-300 space-y-1"
              >
                <p className="font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  <span>%100 — Atama paketi hazır.</span>
                </p>
                <p className="text-purple-200/80 text-[11px]">
                  (Sadece evraktan önce biraz daha soru çözmemiz gerekiyor zaateeen.)
                </p>
              </motion.div>
            )}
          </div>

          {/* Action Trigger Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {!isFullyLoaded ? (
              <button
                id="kpss-resolve-last-percent-btn"
                onClick={handleStartLoading}
                disabled={isProcessing}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:opacity-50 text-white font-semibold text-xs sm:text-sm shadow-md shadow-purple-950 transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-yellow-300" />
                <span>{isProcessing ? 'Protokol Çalışıyor...' : 'Son %1\'i Yükle & Atamayı Başlat'}</span>
              </button>
            ) : (
              <button
                id="kpss-open-badge-btn"
                onClick={() => {
                  soundManager.playAchievement();
                  setShowIdCard(true);
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-emerald-950/60 transition-all flex items-center justify-center gap-2 animate-bounce"
              >
                <UserCheck className="w-4 h-4" />
                <span>Göreve Başla (Resmi Kimlik Kartını Aç)</span>
              </button>
            )}

            <span className="text-xs text-purple-300/60 font-serif-italic">
              Hedef: 2026 Resmî Kadro 🎯
            </span>
          </div>

          {/* Sincere Motivation Message */}
          <div className="mt-8 pt-6 border-t border-purple-800/40 text-center space-y-2">
            <p className="text-sm text-purple-200/90 font-serif-italic">
              “Şakası bir yana… Umarım bugün uğruna çalıştığın her şey, yarının sıradan bir günü olur.”
            </p>
            <p className="text-xs text-pink-300/90 font-medium">
              “Ve o gün geldiğinde ‘ben demiştim zaateeen’ deme hakkın tamamen sana ait.”
            </p>
          </div>

        </div>

      </div>

      {/* Official Government ID Badge Modal */}
      <AnimatePresence>
        {showIdCard && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              className="bg-gradient-to-b from-[#1e0e38] to-[#120724] border-2 border-purple-400/50 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative overflow-hidden"
            >
              {/* Badge Ribbon */}
              <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-red-600 via-purple-600 to-yellow-500" />

              <div className="text-center pb-4 border-b border-purple-700/40 mb-5">
                <span className="text-[10px] uppercase font-mono-code tracking-widest text-purple-300">
                  TÜRKİYE CUMHURİYETİ
                </span>
                <h3 className="text-xl font-display font-extrabold text-white tracking-wide mt-0.5">
                  T.C. İLOŞ BAKANLIĞI
                </h3>
                <span className="text-xs text-pink-300 font-mono-code">
                  Resmî Personel Kimlik Belgesi
                </span>
              </div>

              {/* ID Body */}
              <div className="space-y-3.5 text-xs font-mono-code">
                <div className="flex justify-between p-2.5 rounded-xl bg-purple-950/60 border border-purple-800/40">
                  <span className="text-purple-400">PERSONEL:</span>
                  <span className="text-white font-bold">Selin İlayda Güneş</span>
                </div>

                <div className="flex justify-between p-2.5 rounded-xl bg-purple-950/60 border border-purple-800/40">
                  <span className="text-purple-400">UNVAN:</span>
                  <span className="text-pink-300 font-bold">Geleceğin Çok Havalı Devlet Memuru</span>
                </div>

                {/* Special Skills */}
                <div className="p-3 rounded-xl bg-purple-950/70 border border-purple-800/40">
                  <span className="text-purple-400 block mb-2 font-bold uppercase tracking-wider text-[11px]">
                    ÖZEL YETENEKLER & DONANIMLAR:
                  </span>
                  <ul className="space-y-1.5 text-purple-200 text-[11px]">
                    <li className="flex items-center gap-1.5">☕ Kahveyle hayatta kalma</li>
                    <li className="flex items-center gap-1.5">💗 Pembe termos operasyonları</li>
                    <li className="flex items-center gap-1.5">🐾 Hayvan sevgisi ve Aşk Bahçesi koruması</li>
                    <li className="flex items-center gap-1.5">✨ “Zaateeen” ile tartışma kazanma</li>
                    <li className="flex items-center gap-1.5">💪 Moral bozukluğundan hızla geri dönme</li>
                    <li className="flex items-center gap-1.5">🌯 Komagene çiğköfte molası verme</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setShowIdCard(false)}
                  className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition-all shadow-md shadow-purple-950"
                >
                  Belgeyi Onayla & Kapat ✓
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
