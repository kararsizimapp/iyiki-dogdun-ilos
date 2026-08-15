import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CreditCard, Sparkles, CheckCircle2, DollarSign, ShieldCheck, Heart, Coffee, Utensils, Award, Car, ShoppingBag } from 'lucide-react';
import { soundManager } from '../utils/audio';
import { launchGrandBirthdayConfetti } from '../utils/confetti';

interface BillItem {
  id: string;
  title: string;
  category: string;
  amount: string;
  icon: string;
  paid: boolean;
}

const INITIAL_BILLS: BillItem[] = [
  { id: '1', title: 'Sabah Filtre Kahvesi & Tatlı', category: 'Kahve & İçecek', amount: '220 TL', icon: '☕', paid: false },
  { id: '2', title: 'Komagene Bol Nar Ekşili Dürüm', category: 'Moral Paketi', amount: '280 TL', icon: '🌯', paid: false },
  { id: '3', title: 'Aşk Bahçesi Sokak Canlarına Mama', category: 'Hayvan Dostları', amount: '1.500 TL', icon: '🐾', paid: false },
  { id: '4', title: 'Galatasaray Derbi Maç Biletleri', category: 'Tribün Ruhu', amount: '6.000 TL', icon: '🦁', paid: false },
  { id: '5', title: 'Hummel & Mor Spor Kombinleri', category: 'Stil & Giyim', amount: '4.200 TL', icon: '🛍️', paid: false },
  { id: '6', title: 'Hayalindeki Mor Tesla & Mini', category: 'Rüya Garaj', amount: '3.500.000 TL', icon: '🚗', paid: false }
];

interface MustafaBankProps {
  onUnlockAchievement?: (id: string) => void;
}

export const MustafaBank: React.FC<MustafaBankProps> = ({ onUnlockAchievement }) => {
  const [bills, setBills] = useState<BillItem[]>(INITIAL_BILLS);
  const [customTitle, setCustomTitle] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [lastPaidItem, setLastPaidItem] = useState<string | null>(null);

  const handlePayBill = (id: string, title: string) => {
    soundManager.playAchievement();
    soundManager.playCash();
    launchGrandBirthdayConfetti();
    if (onUnlockAchievement) {
      onUnlockAchievement('mustafabank');
    }
    setBills((prev) =>
      prev.map((b) => (b.id === id ? { ...b, paid: true } : b))
    );
    setLastPaidItem(title);
    setTimeout(() => setLastPaidItem(null), 3500);
  };

  const handlePayAll = () => {
    soundManager.playAchievement();
    soundManager.playCash();
    launchGrandBirthdayConfetti();
    if (onUnlockAchievement) {
      onUnlockAchievement('mustafabank');
    }
    setBills((prev) => prev.map((b) => ({ ...b, paid: true })));
    setLastPaidItem('Tüm Harcamalar ve Faturalar');
    setTimeout(() => setLastPaidItem(null), 3500);
  };

  const handleAddCustomBill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTitle.trim()) return;
    const newBill: BillItem = {
      id: Date.now().toString(),
      title: customTitle.trim(),
      category: 'Özel İstek',
      amount: customAmount.trim() ? `${customAmount.trim()} TL` : 'Sınırsız Bütçe',
      icon: '✨',
      paid: true // Automatically paid by Mustafa!
    };
    soundManager.playAchievement();
    soundManager.playCash();
    launchGrandBirthdayConfetti();
    if (onUnlockAchievement) {
      onUnlockAchievement('mustafabank');
    }
    setBills((prev) => [newBill, ...prev]);
    setLastPaidItem(newBill.title);
    setCustomTitle('');
    setCustomAmount('');
    setTimeout(() => setLastPaidItem(null), 3500);
  };

  const paidCount = bills.filter((b) => b.paid).length;

  return (
    <section id="mustafabank-section" className="py-20 px-4 sm:px-6 relative">
      <div className="max-w-4xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/70 border border-purple-700/50 text-purple-300 text-xs font-mono-code mb-3 shadow-lg">
            <CreditCard className="w-4 h-4 text-pink-400" />
            <span>MUSTAFABANK VIP PROTOKOLÜ</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            MustafaBank — İloş Black Card 💳
          </h2>
          
          <p className="text-sm sm:text-base text-purple-200/80 max-w-xl mx-auto mt-2 font-light">
            İloş bu dünyada hiçbir şeyin hesabını ödemez. Tüm harcamalar, kahveler, tatlılar ve hayaller doğrudan Mustafa Can'a fatura edilir.
          </p>
        </div>

        {/* The Platinum VIP Black Card */}
        <div className="relative mb-12 flex justify-center">
          <motion.div
            whileHover={{ scale: 1.02, rotateY: 5 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="w-full max-w-md bg-gradient-to-tr from-[#120422] via-[#220a3e] to-[#40126f] border-2 border-purple-400/50 rounded-3xl p-6 sm:p-7 shadow-2xl shadow-purple-950 relative overflow-hidden text-white"
          >
            {/* Card Hologram shimmer */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-pink-500/20 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-400/20 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center justify-between mb-8 relative z-10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center font-display font-extrabold text-white text-xs shadow-md">
                  MB
                </div>
                <span className="font-display font-black text-sm tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-pink-300">
                  MUSTAFABANK
                </span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-pink-900/60 border border-pink-500/40 text-[10px] font-mono-code text-pink-300 font-bold tracking-widest">
                VIP BLACK
              </span>
            </div>

            {/* Chip & NFC */}
            <div className="flex items-center gap-3 mb-6 relative z-10">
              <div className="w-11 h-8 rounded-lg bg-gradient-to-tr from-yellow-300 via-amber-400 to-yellow-600 border border-yellow-200/50 shadow-inner flex items-center justify-center">
                <div className="w-7 h-5 border border-amber-800/40 rounded grid grid-cols-2 gap-0.5 opacity-60" />
              </div>
              <span className="text-purple-300/80 text-xs font-mono-code">))) VIP NFC</span>
            </div>

            {/* Card Number */}
            <div className="font-mono-code text-lg sm:text-xl font-bold tracking-widest text-purple-100 mb-6 relative z-10 drop-shadow-md">
              5500 •••• •••• 1998
            </div>

            {/* Card Footer Details */}
            <div className="flex items-end justify-between relative z-10 text-xs font-mono-code">
              <div>
                <span className="text-[9px] text-purple-400/70 block uppercase tracking-wider">KART SAHİBİ</span>
                <span className="text-white font-bold tracking-wide">İLOŞ GÜNEŞ</span>
              </div>
              <div className="text-right">
                <span className="text-[9px] text-purple-400/70 block uppercase tracking-wider">LİMİT / SORUMLU</span>
                <span className="text-pink-300 font-bold">∞ SINIRSIZ (Mustafa Can)</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Mustafa Can Guarantee Quote */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-950/60 via-pink-950/30 to-purple-950/60 border border-purple-700/40 backdrop-blur-md mb-8 text-center max-w-2xl mx-auto shadow-lg">
          <p className="text-xs sm:text-sm text-purple-100 font-serif-italic leading-relaxed">
            “Mustafa Can Notu: Sen canın ne çekiyorsa ye, nereye gitmek istiyorsan git. 
            Bu hayatta senin tek görevin gülümsemek; kalan tüm hesaplar MustafaBank güvencesiyle ödenmiştir.”
          </p>
        </div>

        {/* Notification Toast for Paid Item */}
        <AnimatePresence>
          {lastPaidItem && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-pink-900/90 to-purple-900/90 border border-pink-400/60 text-center shadow-xl text-white text-sm font-semibold flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>
                <strong>{lastPaidItem}</strong> tutarı MustafaBank tarafından anında karşılandı! (Mustafa Can Ödedi ✓)
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Bar: Pay All & Status */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 bg-purple-950/40 p-4 rounded-2xl border border-purple-800/40">
          <div className="text-xs font-mono-code text-purple-200">
            <span>Ödenen Harcamalar: </span>
            <span className="text-pink-300 font-bold">{paidCount} / {bills.length}</span>
            <span className="text-purple-400/80 ml-2">({paidCount === bills.length ? 'Tüm faturalar 0 TL' : 'İloş\'un cebinden 0 TL çıktı'})</span>
          </div>

          <button
            onClick={handlePayAll}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white text-xs font-semibold shadow-md transition-all flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tüm Hesapları Mustafa'ya Yansıt</span>
          </button>
        </div>

        {/* Bills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-8">
          {bills.map((bill) => (
            <div
              key={bill.id}
              className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                bill.paid
                  ? 'bg-purple-950/30 border-purple-800/30 opacity-90'
                  : 'bg-purple-950/60 border-purple-700/50 hover:border-pink-500/50 shadow-md'
              }`}
            >
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <span className="text-2xl shrink-0">{bill.icon}</span>
                <div className="min-w-0 flex-1">
                  <h4 className="text-sm font-semibold text-white tracking-tight">
                    {bill.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                    <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-purple-900/60 text-purple-300">
                      {bill.category}
                    </span>
                    <span className="text-xs font-bold text-pink-300 font-mono-code">
                      {bill.amount}
                    </span>
                  </div>
                </div>
              </div>

              <div className="w-full sm:w-auto flex justify-end">
                {bill.paid ? (
                  <div className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-[11px] font-mono-code font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>ÖDENDİ ✓</span>
                  </div>
                ) : (
                  <button
                    onClick={() => handlePayBill(bill.id, bill.title)}
                    className="w-full sm:w-auto text-center px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-xs font-semibold shadow-md transition-all whitespace-nowrap"
                  >
                    Mustafa Ödesin 💳
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Custom Wish / Expense Submission by İloş */}
        <div className="bg-[#18092d]/90 border border-purple-600/40 rounded-3xl p-6 sm:p-7 shadow-xl">
          <h3 className="text-base sm:text-lg font-display font-bold text-white mb-2 flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-pink-400" />
            <span>Özel Harcama / İstek Ekle</span>
          </h3>
          <p className="text-xs text-purple-300/80 mb-4">
            Canın başka ne istiyorsa yaz; MustafaBank anında ödesin!
          </p>

          <form onSubmit={handleAddCustomBill} className="flex flex-col sm:flex-row gap-2.5">
            <input
              type="text"
              value={customTitle}
              onChange={(e) => setCustomTitle(e.target.value)}
              placeholder="Örn: Sıcak Latte, Yeni Hummel Eşofman, Çilekli Pasta..."
              className="flex-1 px-4 py-2.5 rounded-xl bg-purple-950/80 border border-purple-700/50 text-white text-xs placeholder-purple-400/40 focus:outline-none focus:border-pink-500 font-sans"
            />
            <input
              type="text"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              placeholder="Tutar (Opsiyonel)"
              className="w-full sm:w-36 px-4 py-2.5 rounded-xl bg-purple-950/80 border border-purple-700/50 text-white text-xs placeholder-purple-400/40 focus:outline-none focus:border-pink-500 font-mono-code"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white text-xs font-bold shadow-lg transition-all whitespace-nowrap"
            >
              Mustafa'ya Yansıt ✨
            </button>
          </form>
        </div>

      </div>
    </section>
  );
};
