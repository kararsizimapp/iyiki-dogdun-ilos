import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LayoutGrid, Sparkles, Heart, Coffee, Droplets, Zap, ShieldAlert, Award } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface StarterItem {
  id: string;
  emoji: string;
  title: string;
  subtitle: string;
  tag: string;
  description: string;
  colorClass: string;
  borderClass: string;
}

const items: StarterItem[] = [
  {
    id: 'kahve',
    emoji: '☕',
    title: 'Kahve',
    subtitle: 'Temel Yakıt',
    tag: 'Sistem Gereksinimi',
    description: 'Sabahları gözlerin açılabilmesi ve İloş OS\'in sorunsuz çalışması için mutlak gereklilik.',
    colorClass: 'from-amber-950/40 to-stone-900/40',
    borderClass: 'border-amber-700/40'
  },
  {
    id: 'termos',
    emoji: '💗',
    title: 'Pembe Termos',
    subtitle: 'Resmi Aksesuar',
    tag: 'Hidrasyon Kiti',
    description: 'Nereye giderse gitsin yanında olan, içinden düzenli su içilen efsanevi pembe termos.',
    colorClass: 'from-pink-950/40 to-rose-900/40',
    borderClass: 'border-pink-700/40'
  },
  {
    id: 'icetea',
    emoji: '🧋',
    title: 'Ice Tea Şeftali',
    subtitle: 'Milli İçecek',
    tag: 'Serinletici',
    description: 'Buz gibi bir kutu açıldığı anda ortamın tüm harareti söner.',
    colorClass: 'from-orange-950/40 to-amber-900/40',
    borderClass: 'border-orange-700/40'
  },
  {
    id: 'cheeseburger',
    emoji: '🍔',
    title: 'Cheeseburger',
    subtitle: 'Güvenli Karar',
    tag: 'İloş Onaylı',
    description: 'Ne yiyeceğine karar verilemeyen günlerin tartışmasız kurtarıcısı.',
    colorClass: 'from-yellow-950/40 to-amber-950/40',
    borderClass: 'border-yellow-700/40'
  },
  {
    id: 'komagene',
    emoji: '🌯',
    title: 'Komagene',
    subtitle: 'Acil Durum',
    tag: 'Moral Paketi',
    description: 'Mod düştüğünde nar ekşili çiğköfte dürümü devreye girer.',
    colorClass: 'from-red-950/40 to-rose-950/40',
    borderClass: 'border-red-700/40'
  },
  {
    id: 'kunefe',
    emoji: '🍮',
    title: 'Künefe',
    subtitle: 'Tatlı Aşkı',
    tag: 'Peyniri Uzayan',
    description: 'Peyniri uzadıkça mutluluk endeksinin tavan yaptığı tatlı şöleni.',
    colorClass: 'from-amber-900/30 to-yellow-900/30',
    borderClass: 'border-amber-500/40'
  },
  {
    id: 'mor',
    emoji: '💜',
    title: 'Mor',
    subtitle: 'Resmi Renk',
    tag: 'En Asil Ton',
    description: 'Dünyadaki her şey mor olsaydı İloş muhtemelen itiraz etmezdi zaateeen.',
    colorClass: 'from-purple-950/60 to-fuchsia-950/50',
    borderClass: 'border-purple-500/50'
  },
  {
    id: 'mor-cicek',
    emoji: '🌸',
    title: 'Mor Çiçek',
    subtitle: 'Zayıf Nokta',
    tag: 'Görünce Mutlu',
    description: 'Bir demet mor çiçek görünce kalbinde açan o sıcacık tebessüm.',
    colorClass: 'from-fuchsia-950/40 to-purple-900/40',
    borderClass: 'border-fuchsia-600/40'
  },
  {
    id: 'kopek',
    emoji: '🐕',
    title: 'Köpekler',
    subtitle: 'Aşk Bahçesi',
    tag: 'Sadık Dost',
    description: 'Evin önündeki canların kuyruk sallayan neşeli koruyucusu.',
    colorClass: 'from-stone-900/50 to-purple-950/40',
    borderClass: 'border-purple-800/40'
  },
  {
    id: 'kedi',
    emoji: '🐈',
    title: 'Kediler',
    subtitle: 'Mırıldayanlar',
    tag: 'Misafirler',
    description: 'Aşk Bahçesi\'nde güneşlenen ve İloş\'tan mama bekleyen patili dostlar.',
    colorClass: 'from-purple-950/40 to-indigo-950/40',
    borderClass: 'border-indigo-700/40'
  },
  {
    id: 'galatasaray',
    emoji: '⚽',
    title: 'Galatasaray',
    subtitle: 'Icardi & Barış',
    tag: 'Sarı-Kırmızı',
    description: '90+4\'te gol gelince tribün coşkusunu evde yaşatan tutku.',
    colorClass: 'from-yellow-950/40 to-red-950/40',
    borderClass: 'border-yellow-600/40'
  },
  {
    id: 'hummel',
    emoji: '👟',
    title: 'Hummel Fit',
    subtitle: 'Spor & Tarz',
    tag: 'Antrenman',
    description: 'Hummel tayt, tişört ve ayakkabılarla spor salonuna hazır enerji.',
    colorClass: 'from-sky-950/40 to-purple-950/40',
    borderClass: 'border-sky-700/40'
  },
  {
    id: 'kpss',
    emoji: '📚',
    title: 'KPSS',
    subtitle: 'Devlet Memuru',
    tag: 'Hedefe Doğru',
    description: 'Soru bankaları, denemeler ve hak edilen o güzel atama hayali.',
    colorClass: 'from-emerald-950/40 to-purple-950/40',
    borderClass: 'border-emerald-700/40'
  },
  {
    id: 'mustafabank-card',
    emoji: '💳',
    title: 'MustafaBank VIP',
    subtitle: 'Limitsiz Bütçe',
    tag: 'Tüm Masraflar',
    description: 'İloş\'un cüzdan taşımasına gerek yok. Bütün hesaplar otomatik olarak Mustafa Can\'a iletilir.',
    colorClass: 'from-fuchsia-950/60 to-purple-950/60',
    borderClass: 'border-fuchsia-500/50'
  },
  {
    id: 'uber-mustafa-card',
    emoji: '🚗',
    title: 'Uber Mustafa',
    subtitle: '7/24 Özel Şoför',
    tag: 'Kapıda Hazır',
    description: 'Nerede olursan ol, tek tuşla kapına gelen ve seni istediğin yere götüren VIP servis.',
    colorClass: 'from-purple-950/60 to-pink-950/50',
    borderClass: 'border-pink-500/50'
  },
  {
    id: 'en-guzel-gozler',
    emoji: '✨',
    title: 'Büyüleyici Gözler',
    subtitle: 'Dünyanın En Güzeli',
    tag: 'Mustafa Can Onaylı',
    description: 'Mustafa Can der ki: Baktığı her yere huzur ve neşe veren, dünyanın en güzel gözleri.',
    colorClass: 'from-pink-950/60 to-purple-900/60',
    borderClass: 'border-pink-400/60'
  },
  {
    id: 'mini',
    emoji: '🚗',
    title: 'Mini Cooper',
    subtitle: 'Rüya Garaj',
    tag: 'İkonik Stil',
    description: 'Yollarda süzülen tatlı ve havalı sürüş keyfi.',
    colorClass: 'from-slate-900/50 to-purple-950/40',
    borderClass: 'border-purple-700/40'
  },
  {
    id: 'tesla',
    emoji: '⚡',
    title: 'Mor Tesla',
    subtitle: 'Geleceğin Arabası',
    tag: 'Özel Sipariş',
    description: 'Sessiz, güçlü ve özellikle mor rengiyle İloş\'a çok yakışacak teknoloji.',
    colorClass: 'from-purple-900/40 to-cyan-950/40',
    borderClass: 'border-purple-500/50'
  }
];

export const StarterPack: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<StarterItem | null>(null);

  const handleCardClick = (item: StarterItem) => {
    soundManager.playPop();
    setSelectedItem(item);
  };

  return (
    <section id="starter-pack-section" className="py-20 px-4 sm:px-6 relative">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-800/40 text-purple-300 text-xs font-mono-code mb-3">
            <LayoutGrid className="w-3.5 h-3.5 text-purple-400" />
            <span>SAHNE 03 • KARAKTER BENTO GRID</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            İloş Starter Pack
          </h2>
          <p className="text-sm sm:text-base text-purple-300/70 max-w-xl mx-auto mt-2">
            İloş'u İloş yapan vazgeçilmez parçalar. Her karta tıklayarak detaylı notları inceleyebilirsin.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
          {items.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleCardClick(item)}
              className={`cursor-pointer rounded-2xl p-4 bg-gradient-to-br ${item.colorClass} border ${item.borderClass} backdrop-blur-md flex flex-col justify-between h-36 shadow-lg shadow-purple-950/40 transition-all group`}
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl sm:text-3xl group-hover:scale-110 transition-transform">
                  {item.emoji}
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-900/60 text-purple-200 border border-purple-700/30 font-mono-code">
                  {item.tag}
                </span>
              </div>

              <div>
                <h4 className="text-sm font-bold text-white group-hover:text-pink-300 transition-colors">
                  {item.title}
                </h4>
                <p className="text-[11px] text-purple-300/70 font-medium">
                  {item.subtitle}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Subtle note */}
        <p className="text-center text-xs text-purple-400/60 mt-8 font-serif-italic">
          “Bir insanı anlatmak için sayfalarca metin yerine bu kartlar fazlasıyla yeterli zaateeen.”
        </p>

      </div>

      {/* Item Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#180d2b] border border-purple-600/50 rounded-3xl p-6 max-w-sm w-full shadow-2xl text-center relative"
            >
              <div className="text-5xl mb-3">{selectedItem.emoji}</div>
              <span className="text-[10px] px-2.5 py-1 rounded-full bg-purple-900/60 text-purple-300 font-mono-code border border-purple-700/40 uppercase">
                {selectedItem.tag}
              </span>
              <h3 className="text-xl font-bold text-white mt-2 mb-1">{selectedItem.title}</h3>
              <p className="text-xs text-purple-300/80 mb-4">{selectedItem.subtitle}</p>
              
              <div className="bg-purple-950/60 p-4 rounded-2xl border border-purple-800/40 text-sm text-purple-200/90 leading-relaxed font-light">
                {selectedItem.description}
              </div>

              <button
                onClick={() => setSelectedItem(null)}
                className="mt-5 w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition-colors"
              >
                Kapat
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
