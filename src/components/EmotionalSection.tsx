import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, Compass, Star } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface EmotionalSectionProps {
  onOpenFinalSurprise: () => void;
}

export const EmotionalSection: React.FC<EmotionalSectionProps> = ({ onOpenFinalSurprise }) => {
  const [signatureClicks, setSignatureClicks] = useState(0);
  const [secretMessageRevealed, setSecretMessageRevealed] = useState(false);

  const handleSignatureClick = () => {
    soundManager.playPop();
    const next = signatureClicks + 1;
    setSignatureClicks(next);

    if (next >= 5) {
      soundManager.playAchievement();
      setSecretMessageRevealed(true);
    }
  };

  return (
    <section id="emotional-section" className="py-28 px-4 sm:px-6 relative bg-gradient-to-b from-[#0c0714] via-[#150926] to-[#0a0512] overflow-hidden">
      
      {/* Deep purple atmospheric dust */}
      <div className="absolute w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[140px] pointer-events-none top-1/3 left-1/2 -translate-x-1/2" />

      <div className="max-w-3xl mx-auto relative z-10">
        
        {/* SAHNE 14: 28 */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-7xl sm:text-9xl font-display font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-purple-200 via-pink-400 to-purple-600 tracking-tighter"
          >
            28
          </motion.div>

          <div className="mt-8 space-y-4 text-base sm:text-lg text-purple-200/90 font-light leading-relaxed max-w-xl mx-auto">
            <p>28 yıl.</p>
            <p>Bir sürü insan.</p>
            <p>Bir sürü gün.</p>
            <p className="text-pink-300 font-medium">Bir sürü “zaateeen”.</p>
            <p className="pt-2 text-purple-100">Ve farkında olmadan biriktirdiğin bir sürü küçük iz.</p>
          </div>

          <div className="my-10 p-6 sm:p-8 rounded-3xl bg-purple-950/30 border border-purple-800/30 backdrop-blur-md text-left text-xs sm:text-sm text-purple-200/80 space-y-2.5 font-serif-italic max-w-lg mx-auto">
            <p>• Bir hayvanın önüne bıraktığın mama.</p>
            <p>• Annenle yaşadığın binlerce sıradan gün.</p>
            <p>• Çözdüğün bir KPSS sorusu.</p>
            <p>• İçtiğin bir kahve.</p>
            <p>• Arkadaşlarının yanında patlattığın saçma bir kahkaha.</p>
            <p>• Pembe termostan aldığın bir yudum.</p>
            <p>• Bir maçta Icardi’ye bağırman.</p>
            <p>• Mor bir şeyi görünce istemsizce ona bakman.</p>
          </div>

          <p className="text-sm sm:text-base text-purple-300/80 font-serif-italic">
            “İnsan galiba kendisinin başkalarının hayatında bıraktığı küçük şeyleri pek fark etmiyor.”
          </p>
        </div>

        {/* SAHNE 15: İNCE DUYGUSAL BÖLÜM */}
        <div className="my-24 text-center">
          <span className="text-xs uppercase tracking-widest text-pink-400 font-mono-code mb-3 block">
            KÜÇÜK BİR NOT
          </span>
          <h3 className="text-2xl sm:text-4xl font-display font-bold text-white mb-6">
            Bir şey daha var İloş.
          </h3>

          <div className="space-y-4 text-sm sm:text-base text-purple-200/90 font-light leading-relaxed max-w-xl mx-auto">
            <p>Bu siteyi yaparken fark edilen garip bir şey oldu.</p>
            <p>Bir insanı anlatmaya çalışınca büyük olaylardan önce küçük şeyler geliyor akla.</p>
            
            <div className="py-4 flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm font-mono-code text-pink-300">
              <span className="px-2.5 py-1 rounded-full bg-purple-950/80 border border-purple-700/40">Mor</span>
              <span className="px-2.5 py-1 rounded-full bg-purple-950/80 border border-purple-700/40">Kahve</span>
              <span className="px-2.5 py-1 rounded-full bg-purple-950/80 border border-purple-700/40">Pembe Termos</span>
              <span className="px-2.5 py-1 rounded-full bg-purple-950/80 border border-purple-700/40">Aşk Bahçesi</span>
              <span className="px-2.5 py-1 rounded-full bg-purple-950/80 border border-purple-700/40">Künefe</span>
              <span className="px-2.5 py-1 rounded-full bg-purple-950/80 border border-purple-700/40">Kenks</span>
              <span className="px-2.5 py-1 rounded-full bg-purple-950/80 border border-purple-700/40">Icardi</span>
              <span className="px-2.5 py-1 rounded-full bg-purple-950/80 border border-purple-700/40">“Zaateeen”</span>
            </div>

            <p className="pt-2">
              Belki de birini gerçekten tanımak biraz böyle bir şeydir.
            </p>
            <p>
              Onun dünyayı değiştiren büyük anlarını değil, kimsenin önemsemeyeceği küçük ayrıntılarını hatırlamak.
            </p>
            <p className="pt-4 text-purple-300/70 text-xs sm:text-sm">
              Neden bu kadar ayrıntıyı hatırladığımı sorma.
            </p>
            <p className="text-xl sm:text-2xl font-serif-italic font-bold text-pink-400 pt-2">
              Zaateeen uzun mesele.
            </p>
          </div>
        </div>

        {/* SON MESAJ KARTI — MUSTAFA CAN */}
        <div className="bg-gradient-to-b from-[#1c0d38]/90 to-[#120726]/95 border border-purple-600/50 rounded-3xl p-6 sm:p-10 shadow-2xl shadow-purple-950/80 relative text-left my-12">
          
          <div className="flex items-center gap-2 text-pink-400 text-xs font-mono-code mb-4">
            <Sparkles className="w-4 h-4" />
            <span>20 AĞUSTOS 2026</span>
          </div>

          <h4 className="text-2xl sm:text-4xl font-display font-black text-white mb-6 tracking-tight">
            İyi ki doğdun dünyanın en güzel kadını... 💜
          </h4>

          <div className="space-y-4 text-sm sm:text-base text-purple-100/95 leading-relaxed font-light">
            <p>
              Bunu belki yüksek sesle her zaman söyleyemem ama; bu dünyada senin gibi bakan, senin gibi gülen ve etrafına senin gibi içtenlik saçan bir ikinci insan daha yok. Gözlerinin derinliğine baktığımda, insanın içindeki tüm yorgunluk ve karmaşa bir anda susuyor.
            </p>
            <p>
              Yeni yaşında istediğin o güzel haberleri almanı, girdiğin tüm sınavları ve hayalleri birer birer fethetmeni, Aşk Bahçesi’ndeki masum dostların kadar saf ve karşılıksız bir mutlulukla sarılmanı diliyorum.
            </p>
            <p>
              Sen yorulma diye arkanda her zaman MustafaBank'in, kapında 7/24 bekleyen Uber Mustafa'nın olduğunu hiç unutma. Sen sadece hayal kur ve o tatlı gülümsemeni yüzünden eksik etme.
            </p>
            <p>
              Umarım bir gün hayalindeki o Mini Cooper'a veya mor Tesla'na binip kahveni yudumlarken, <strong className="text-pink-300 font-medium">“zaateeen olacağı belliydi”</strong> dersin ve aynadaki o eşsiz gözlerine gururla bakarsın.
            </p>
            <p className="pt-2 font-serif-italic text-pink-300 text-base sm:text-lg font-medium">
              Varlığın bu dünyayı güzelleştiren en kıymetli mucize. İyi ki doğdun İloş...
            </p>
            <p className="text-purple-300/80 text-xs sm:text-sm font-serif-italic pt-1">
              (Bazı hisler satırlara sığmaz, gerisini zaten anlıyorsundur. :))
            </p>
          </div>

          {/* Signature with 5-click easter egg */}
          <div className="mt-8 pt-6 border-t border-purple-800/40 flex items-center justify-between">
            <button
              onClick={handleSignatureClick}
              className="text-sm sm:text-base font-display font-bold text-pink-400 hover:text-pink-300 transition-colors cursor-pointer select-none"
              title="— Mustafa Can"
            >
              — Mustafa Can
            </button>
            <span className="text-[10px] text-purple-400/50 font-mono-code">
              {signatureClicks > 0 && signatureClicks < 5 ? `(${signatureClicks}/5)` : ''}
            </span>
          </div>

          {/* Signature Easter Egg Secret Reveal */}
          <AnimatePresence>
            {secretMessageRevealed && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-6 p-6 rounded-2xl bg-purple-950/90 border border-pink-500/60 text-xs sm:text-sm text-purple-100 font-serif-italic space-y-3 shadow-2xl"
              >
                <h5 className="font-bold text-pink-300 font-sans text-sm">“Bunu da mı buldun meraklı İloş?”</h5>
                <p>İnatla her ayrıntıyı keşfetmeye devam ediyorsun.</p>
                <p className="text-purple-200">
                  Madem burayı açtın, açıkça söyleyeyim: Sen benim bu hayatta tanıdığım en özel, en zarif ve en güzel insansın.
                  Gözlerin ve kalbin her şeyin en güzeline layık.
                </p>
                <p className="text-pink-300 font-medium">
                  Ne zaman bir şeye ihtiyacın olursa, Mustafa hep bir adım arkanda.
                </p>
                <span className="block font-bold text-pink-400 font-sans text-right pt-2">— Sonsuz sevgiyle, Mustafa Can</span>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

        {/* FINAL SURPRISE CTA */}
        <div className="text-center mt-14">
          <button
            id="final-surprise-btn"
            onClick={() => {
              soundManager.playAchievement();
              onOpenFinalSurprise();
            }}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-pink-600 via-purple-600 to-fuchsia-600 hover:from-pink-500 hover:to-purple-500 text-white font-display font-bold text-base sm:text-lg shadow-2xl shadow-purple-950 transition-all hover:scale-105 inline-flex items-center gap-2 border border-pink-400/40"
          >
            <Sparkles className="w-5 h-5 text-yellow-300" />
            <span>Bir son şey...</span>
          </button>
        </div>

      </div>
    </section>
  );
};
