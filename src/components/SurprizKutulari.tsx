import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gift, Sparkles, Heart, Check, Lock, Star, Trophy, Smile, RefreshCw } from 'lucide-react';
import { soundManager } from '../utils/audio';
import { launchMorKonfeti } from '../utils/confetti';

interface SurprizKutulariProps {
  onUnlockAchievement: (id: string) => void;
}

interface MysteryBox {
  number: number;
  reason: string;
  category: 'vibe' | 'memory' | 'quality' | 'joke';
  emoji: string;
}

const surpriseReasons: MysteryBox[] = [
  { number: 1, reason: "Gözlerinin içiyle gülümsediğinde tüm ortama inanılmaz pozitif bir neşe ve enerji saçman.", category: 'quality', emoji: '✨' },
  { number: 2, reason: "Sokaktaki tüm hayvanlara gösterdiğin o sıcacık, kocaman merhametin.", category: 'quality', emoji: '🐾' },
  { number: 3, reason: "Yalın - Akşamüstü çalarken ritme kendini kaptırıp en havalı şekilde eşlik etmen.", category: 'memory', emoji: '🎵' },
  { number: 4, reason: "KPSS ve hedeflerin için sergilediğin o muazzam çalışma azmi, zekân ve disiplinin.", category: 'quality', emoji: '📚' },
  { number: 5, reason: "Mor rengi kainattaki en asil, en şık ve en büyüleyici renge dönüştürmen.", category: 'quality', emoji: '💜' },
  { number: 6, reason: "En ufak bir çiğköfte veya sıcak künefede çocuk gibi içten mutlu olabilen samimiyetin.", category: 'joke', emoji: '🥞' },
  { number: 7, reason: "Galatasaray gol attığında Icardi gibi o çılgın şampiyonluk sevincini yaşatman.", category: 'memory', emoji: '⚽' },
  { number: 8, reason: "Mini Cooper ve mor Tesla hayallerini kurarkenki o vizyoner ve tatlı enerjin.", category: 'memory', emoji: '🚗' },
  { number: 9, reason: "Daha 17 dizisindeki en ince detayları bile film eleştirmeni gibi tutkuyla anlatman.", category: 'memory', emoji: '🎬' },
  { number: 10, reason: "Trip atarken bile mimiklerinle dünyanın en sevimli ve komik insanı olmayı başarman.", category: 'joke', emoji: '😤' },
  { number: 11, reason: "Pembe termosunla su içmeyi her gün kraliyet sarayı ritüeline çeviren zarafetin.", category: 'joke', emoji: '🌸' },
  { number: 12, reason: "Ortamların en kafa dengi, en kaliteli ve en güvenilir insanı olman.", category: 'quality', emoji: '👑' },
  { number: 13, reason: "Ailene, Nuray teyzeye ve sevdiklerine olan o asil bağlılığın ve derin saygın.", category: 'quality', emoji: '💐' },
  { number: 14, reason: "Girdiğin her odayı ve masayı anında aydınlatan, ortama kalite katan asil auran.", category: 'quality', emoji: '🌟' },
  { number: 15, reason: "Birlikte kahve içerken saatlerin nasıl su gibi akıp geçtiğini unutturan sarıcı muhabbetin.", category: 'vibe', emoji: '☕' },
  { number: 16, reason: "Murat’la kenks muhabbetlerinizdeki o efsanevi mizah ve bitmek bilmeyen makara.", category: 'joke', emoji: '🤝' },
  { number: 17, reason: "Karakterindeki o dürüstlük, dobra duruşun ve kimseye eyvallahı olmayan asil tavrın.", category: 'quality', emoji: '💎' },
  { number: 18, reason: "Ses tonundaki o güven veren, insanı anında sakinleştiren içten sıcaklık.", category: 'quality', emoji: '🎙️' },
  { number: 19, reason: "En zor zamanlarda bile arkada dağ gibi duran o sağlam karakterin.", category: 'quality', emoji: '🛡️' },
  { number: 20, reason: "20 Ağustos gibi güzel bir tarihi herkes için neşeli bir bayram gününe çevirmen.", category: 'memory', emoji: '🎂' },
  { number: 21, reason: "En stresli anlarda bile içindeki o umut ışığını ve dik duruşunu asla kaybetmemen.", category: 'quality', emoji: '🕯️' },
  { number: 22, reason: "Arabada camı açıp rüzgara karşı gülümserkenki o doğal ve etkileyici tarzın.", category: 'memory', emoji: '🍃' },
  { number: 23, reason: "En saçma esprilere bile ortama moral ve neşe gelsin diye kahkahayla eşlik etmen.", category: 'joke', emoji: '😂' },
  { number: 24, reason: "Zevkli giyimin, kusursuz saçların ve her zaman şık olan o zarif tarzın.", category: 'quality', emoji: '👸' },
  { number: 25, reason: "Çevrendeki herkese hedeflerine koşma ve daha başarılı olma motivasyonu aşılaman.", category: 'quality', emoji: '🌱' },
  { number: 26, reason: "Gelecekte atanmış efsanevi bir uzman olarak imza atacağın o büyük başarıların.", category: 'vibe', emoji: '🏰' },
  { number: 27, reason: "Her geçen yaşta bilgeliği, asaleti ve güzelliğiyle daha da parlayan o altın kalbin.", category: 'quality', emoji: '🔮' },
  { number: 28, reason: "İyi ki varsın, iyi ki doğdun kraliçe! Yeni yaşında tüm hayallerin tek tek gerçek olsun!", category: 'vibe', emoji: '🎉' }
];

export const SurprizKutulari: React.FC<SurprizKutulariProps> = ({ onUnlockAchievement }) => {
  const [openedBoxes, setOpenedBoxes] = useState<Set<number>>(new Set([1, 28]));
  const [activeBox, setActiveBox] = useState<MysteryBox | null>(surpriseReasons[27]);

  const handleOpenBox = (box: MysteryBox) => {
    soundManager.playPop();
    setActiveBox(box);

    if (!openedBoxes.has(box.number)) {
      const nextOpened = new Set(openedBoxes);
      nextOpened.add(box.number);
      setOpenedBoxes(nextOpened);

      if (nextOpened.size === 28) {
        soundManager.playAchievement();
        launchMorKonfeti();
        onUnlockAchievement('surpriz-koleksiyoneri');
      }
    }
  };

  const handleOpenAll = () => {
    soundManager.playAchievement();
    launchMorKonfeti();
    const all = new Set<number>();
    for (let i = 1; i <= 28; i++) all.add(i);
    setOpenedBoxes(all);
    onUnlockAchievement('surpriz-koleksiyoneri');
  };

  return (
    <section id="surpriz-kutulari-section" className="py-20 px-4 sm:px-6 relative overflow-hidden bg-gradient-to-b from-[#0c0517] via-[#17082e] to-[#0b0514]">
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-950/80 border border-pink-700/50 text-pink-300 text-xs font-mono-code mb-4 shadow-inner">
            <Gift className="w-3.5 h-3.5 text-pink-400 animate-bounce" />
            <span>28 YAŞ • 28 ÖZEL SÜRPRİZ KUTUSU</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
            28 Yaş — <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-amber-300 bg-clip-text text-transparent">28 Gizli Sürpriz Kutusu</span>
          </h2>
          <p className="mt-2 text-sm sm:text-base text-purple-200/80 font-serif-italic">
            “İloş’un 28. yaşına özel 28 harika özellik, ikonik anlar ve efsane detaylar. Her kutuyu tıkla ve aç!”
          </p>

          <div className="mt-4 flex items-center justify-center gap-3">
            <span className="text-xs font-mono-code text-purple-300">
              Açılan Kutular: <strong className="text-pink-300">{openedBoxes.size}</strong>/28
            </span>
            {openedBoxes.size < 28 && (
              <button
                onClick={handleOpenAll}
                className="px-3 py-1 rounded-xl bg-purple-900/60 hover:bg-purple-800 text-[11px] font-mono-code text-purple-200 hover:text-white border border-purple-600/40 transition-all"
              >
                🎁 Hepsini Aç (+Konfeti)
              </button>
            )}
          </div>
        </div>

        {/* 28 Boxes Grid & Detail Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left / Grid of 28 interactive Boxes (7 cols) */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-4 sm:grid-cols-7 gap-2.5 sm:gap-3">
              {surpriseReasons.map((box) => {
                const isOpened = openedBoxes.has(box.number);
                const isActive = activeBox?.number === box.number;

                return (
                  <motion.button
                    key={box.number}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleOpenBox(box)}
                    className={`aspect-square rounded-2xl p-2 flex flex-col items-center justify-between transition-all cursor-pointer relative overflow-hidden ${
                      isActive
                        ? 'ring-4 ring-pink-400 bg-gradient-to-tr from-pink-600 to-purple-600 shadow-lg shadow-pink-950 scale-105 z-10'
                        : isOpened
                        ? 'bg-purple-950/80 border border-purple-700/60 text-purple-100'
                        : 'bg-[#120624] border border-purple-900/60 text-purple-400/80 hover:border-pink-500/50'
                    }`}
                  >
                    <div className="w-full flex items-center justify-between text-[10px] font-mono-code">
                      <span className="font-bold">#{box.number}</span>
                      {isOpened && <Check className="w-3 h-3 text-emerald-400" />}
                    </div>

                    <span className="text-xl sm:text-2xl my-auto">
                      {isOpened ? box.emoji : '🎁'}
                    </span>

                    <span className="text-[9px] font-mono-code text-purple-300 truncate w-full text-center">
                      {isOpened ? 'Açıldı' : 'Gizli'}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Right / Active Opened Box Reveal (5 cols) */}
          <div className="lg:col-span-5">
            <AnimatePresence mode="wait">
              {activeBox && (
                <motion.div
                  key={activeBox.number}
                  initial={{ opacity: 0, scale: 0.95, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -15 }}
                  className="rounded-3xl bg-gradient-to-b from-[#1f0d3d] to-[#120626] border-2 border-pink-500/40 p-6 sm:p-8 shadow-2xl shadow-purple-950 relative overflow-hidden"
                >
                  {/* Decorative number background watermark */}
                  <div className="absolute top-2 right-4 text-8xl opacity-10 pointer-events-none font-display font-bold text-pink-400">
                    {activeBox.number}
                  </div>

                  {/* Header Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full bg-pink-950/80 border border-pink-500/40 text-pink-300 text-xs font-mono-code font-bold flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      Özellik #{activeBox.number} / 28
                    </span>
                    <span className="text-3xl">{activeBox.emoji}</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-4">
                    Neden Bu Kadar Efsanesin:
                  </h3>

                  {/* Message Content Box */}
                  <div className="p-5 rounded-2xl bg-[#0d041a]/90 border border-purple-700/50 text-sm sm:text-base text-purple-100 font-serif-italic leading-relaxed shadow-inner mb-6">
                    “{activeBox.reason}”
                  </div>

                  {/* Footer Info */}
                  <div className="flex items-center justify-between pt-4 border-t border-purple-800/40 text-xs font-mono-code text-purple-400">
                    <span>Mustafa Can Not Defteri</span>
                    <button
                      onClick={() => {
                        soundManager.playSparkle();
                        launchMorKonfeti();
                      }}
                      className="px-3 py-1.5 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-bold transition-all shadow-md shadow-pink-950 flex items-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      Tebrik Et
                    </button>
                  </div>

                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
};
