import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Terminal, Coffee, CheckCircle, Zap } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface IlosOSProps {
  onUnlockAchievement: (id: string) => void;
}

export const IlosOS: React.FC<IlosOSProps> = ({ onUnlockAchievement }) => {
  const [isRebooting, setIsRebooting] = useState(false);
  const [rebootProgress, setRebootProgress] = useState(0);
  const [rebootFinished, setRebootFinished] = useState(false);

  const handleCoffeeClick = () => {
    if (isRebooting) return;
    soundManager.playPop();
    setIsRebooting(true);
    setRebootFinished(false);
    setRebootProgress(0);

    const interval = setInterval(() => {
      setRebootProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsRebooting(false);
          setRebootFinished(true);
          soundManager.playAchievement();
          onUnlockAchievement('ilos-os');
          return 100;
        }
        return prev + 25;
      });
    }, 450);
  };

  const systemSpecs = [
    { label: 'Sistem Rengi', value: 'Asil Mor (#8b5cf6)', tag: 'En Sevdiği' },
    { label: 'Ana Yakıt', value: 'Taze Sıcak Kahve', tag: 'Vazgeçilmez' },
    { label: 'Soğutma Sistemi', value: 'Ice Tea Şeftali', tag: 'Buz Gibi' },
    { label: 'Resmi Aksesuar', value: 'Pembe Su Termosu', tag: 'Yanından Ayırmaz' },
    { label: 'Takım / Gönül', value: 'Galatasaray', tag: 'Sarı-Kırmızı' },
    { label: 'Favori Yıldızlar', value: 'Mauro Icardi & Barış Alper', tag: '90+4 Gol' },
    { label: 'Sistem Bildirim Sesi', value: '“Zaateeen”', tag: 'İmza Cümle' },
    { label: 'Hayvan Modu', value: 'Sürekli Açık (Aşk Bahçesi)', tag: 'Koşulsuz Sevgi' },
    { label: 'KPSS Modülü', value: 'Geleceğin Memuru (Yükleniyor)', tag: 'Hedefe Kilitli' },
    { label: 'Kenks Protokolü', value: 'Murat ile %100 Uyumlu', tag: 'Kenksim' }
  ];

  return (
    <section id="os-section" className="py-20 px-4 sm:px-6 relative">
      <div className="max-w-4xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-800/40 text-purple-300 text-xs font-mono-code mb-3">
            <Terminal className="w-3.5 h-3.5 text-purple-400" />
            <span>SAHNE 02 • SİSTEM MİMARİSİ</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            İLOŞ OS v28.0
          </h2>
          <p className="text-sm sm:text-base text-purple-300/70 max-w-lg mx-auto mt-2">
            Selin İlayda Güneş'in karakter çekirdeği, favori alışkanlıkları ve çalışma parametreleri.
          </p>
        </div>

        {/* Retro Window Container */}
        <div className="bg-[#120a21]/90 backdrop-blur-xl border border-purple-700/40 rounded-3xl overflow-hidden shadow-2xl shadow-purple-950/60">
          
          {/* Mac / Terminal Window Bar */}
          <div className="bg-[#1a0f30] px-3.5 sm:px-4 py-3 border-b border-purple-800/40 flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80 border border-red-400/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80 border border-yellow-400/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/80 border border-green-400/50" />
              <span className="ml-2 text-xs font-mono-code text-purple-300/80 hidden sm:inline">
                ilos-core@kernel: ~ /sys/characteristics.json
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] sm:text-[11px] font-mono-code px-2 py-0.5 rounded bg-purple-900/60 text-purple-200 border border-purple-700/40">
                STATUS: ÇALIŞIYOR (28 YAŞINDA)
              </span>
            </div>
          </div>

          {/* Window Body */}
          <div className="p-4 sm:p-8">
            
            {/* Specs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {systemSpecs.map((spec, index) => (
                <div
                  key={index}
                  className="p-3 sm:p-3.5 rounded-2xl bg-purple-950/30 border border-purple-800/30 hover:border-purple-600/50 hover:bg-purple-900/20 transition-all flex flex-row items-center justify-between gap-2"
                >
                  <div className="flex flex-col min-w-0 pr-2">
                    <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-purple-400 font-mono-code">
                      {spec.label}
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-purple-100 mt-0.5 truncate">
                      {spec.value}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-900/50 border border-purple-700/30 text-purple-300 font-medium whitespace-nowrap">
                      {spec.tag}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Coffee Reboot Interactive Module */}
            <div className="bg-gradient-to-r from-purple-950/70 via-[#1c0e35] to-purple-950/70 border border-purple-600/40 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-inner">
              <div className="flex items-center gap-4 text-left">
                
                {/* Coffee Cup Icon with Steam */}
                <div className="relative group cursor-pointer" onClick={handleCoffeeClick}>
                  <motion.div
                    animate={{ y: [0, -3, 0] }}
                    transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
                    className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-700 to-yellow-600 flex items-center justify-center text-white shadow-lg shadow-amber-950/80 border border-amber-400/40 group-hover:scale-105 transition-transform"
                  >
                    <Coffee className="w-8 h-8 text-amber-100" />
                  </motion.div>
                  {/* Steam particles */}
                  <motion.div
                    animate={{ opacity: [0.2, 0.8, 0], y: [-5, -20], x: [0, 4] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute -top-3 left-6 text-xs text-amber-200"
                  >
                    ~
                  </motion.div>
                </div>

                <div>
                  <h4 className="text-base font-bold text-white flex items-center gap-2">
                    <span>İloş OS Kahve Modülü</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-amber-900/60 text-amber-300 font-mono-code">
                      ETKİLEŞİMLİ
                    </span>
                  </h4>
                  <p className="text-xs text-purple-300/80 mt-1 max-w-sm">
                    Fincana dokunarak sistemi taze kahveyle yeniden başlat ve enerji parametrelerini fulle.
                  </p>
                </div>
              </div>

              {/* Action Button / Progress */}
              <div className="flex flex-col items-center sm:items-end w-full sm:w-auto">
                <button
                  id="os-reboot-coffee-btn"
                  onClick={handleCoffeeClick}
                  disabled={isRebooting}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-medium text-xs sm:text-sm shadow-md shadow-amber-950/50 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Zap className="w-4 h-4 text-yellow-300" />
                  <span>{isRebooting ? 'Sistem Yenileniyor...' : 'Kahveyle Yeniden Başlat'}</span>
                </button>
              </div>
            </div>

            {/* Reboot Progress Bar */}
            {isRebooting && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-4"
              >
                <div className="flex justify-between text-xs font-mono-code text-purple-300 mb-1">
                  <span>İloş OS yeniden başlatılıyor...</span>
                  <span>%{rebootProgress}</span>
                </div>
                <div className="w-full bg-purple-950 rounded-full h-2 overflow-hidden border border-purple-800/40">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 transition-all duration-300"
                    style={{ width: `${rebootProgress}%` }}
                  />
                </div>
              </motion.div>
            )}

            {/* Reboot Success Message & Buffs */}
            {rebootFinished && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 rounded-xl bg-purple-900/40 border border-purple-500/40"
              >
                <div className="flex items-center gap-2 text-green-400 font-bold text-sm mb-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>KAHVE ALGILANDI ✓ (İşletim Sistemi Aktif)</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono-code">
                  <div className="p-2 rounded bg-purple-950/60 text-purple-200 border border-purple-800/30">
                    ⚡ Enerji: <span className="text-yellow-400 font-bold">+37</span>
                  </div>
                  <div className="p-2 rounded bg-purple-950/60 text-purple-200 border border-purple-800/30">
                    🧘‍♀️ Sabır: <span className="text-green-400 font-bold">+14</span>
                  </div>
                  <div className="p-2 rounded bg-purple-950/60 text-purple-200 border border-purple-800/30">
                    📚 KPSS Dayanıklılığı: <span className="text-pink-400 font-bold">+28</span>
                  </div>
                  <div className="p-2 rounded bg-purple-950/60 text-purple-200 border border-purple-800/30">
                    ✨ Zaateeen Seviyesi: <span className="text-purple-300 font-bold">+9</span>
                  </div>
                </div>
              </motion.div>
            )}

          </div>
        </div>

      </div>
    </section>
  );
};
