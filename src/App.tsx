import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Trophy } from 'lucide-react';
import { initialAchievements } from './data/ilosData';
import { Achievement } from './types';
import { soundManager } from './utils/audio';

import { Preloader } from './components/Preloader';
import { CountdownLock } from './components/CountdownLock';
import { Navbar } from './components/Navbar';
import { HeroScene } from './components/HeroScene';
import { AksamustuPlayer } from './components/AksamustuPlayer';
import { MustafaBank } from './components/MustafaBank';
import { UberMustafa } from './components/UberMustafa';
import { IlosOS } from './components/IlosOS';
import { StarterPack } from './components/StarterPack';
import { Quiz } from './components/Quiz';
import { AskBahcesi } from './components/AskBahcesi';
import { KPSSModule } from './components/KPSSModule';
import { DreamGarage } from './components/DreamGarage';
import { TrainingMode } from './components/TrainingMode';
import { ApprovedMenu } from './components/ApprovedMenu';
import { StadiumMode } from './components/StadiumMode';
import { MorCicekBahcesi } from './components/MorCicekBahcesi';
import { Daha17Cinema } from './components/Daha17Cinema';
import { NuraySection } from './components/NuraySection';
import { MuratKenks } from './components/MuratKenks';
import { MustafaSolutionEngine } from './components/MustafaSolutionEngine';
import { EnGuzelKadin } from './components/EnGuzelKadin';
import { IlosTarot } from './components/IlosTarot';
import { SanalMorOrkide } from './components/SanalMorOrkide';
import { IlosGunesi } from './components/IlosGunesi';
import { EmotionalSection } from './components/EmotionalSection';
import { FinalSurpriseModal } from './components/FinalSurpriseModal';
import { AchievementsModal } from './components/AchievementsModal';
import { FloatingEasterEggs } from './components/FloatingEasterEggs';
import { Footer } from './components/Footer';

export const TARGET_DATE_TRT = new Date('2026-08-20T00:00:00+03:00').getTime(); // 20 August 2026 00:00:00 TRT
export const TARGET_DATE_LOCAL = new Date(2026, 7, 20, 0, 0, 0).getTime(); // 20 August 2026 00:00:00 Device Time

export function isTargetDateReached(): boolean {
  if (typeof window !== 'undefined') {
    if (localStorage.getItem('ilos_unlocked_confirmed') === 'true') {
      return true;
    }
  }
  const now = Date.now();
  const target = Math.min(TARGET_DATE_TRT, TARGET_DATE_LOCAL);
  return now >= target;
}

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLocked, setIsLocked] = useState<boolean>(() => {
    return !isTargetDateReached();
  });
  const [hydrationCount, setHydrationCount] = useState(0);
  const [achievements, setAchievements] = useState<Achievement[]>(initialAchievements);
  const [activeAchievementToast, setActiveAchievementToast] = useState<Achievement | null>(null);
  const [isAchievementsOpen, setIsAchievementsOpen] = useState(false);
  const [isFinalSurpriseOpen, setIsFinalSurpriseOpen] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [morLevel, setMorLevel] = useState(1);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Scroll progress tracker
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = Math.round((window.scrollY / totalScroll) * 100);
        setScrollProgress(currentProgress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const unlockAchievement = (id: string) => {
    setAchievements((prev) => {
      const target = prev.find((a) => a.id === id);
      if (target && !target.unlocked) {
        const updated = prev.map((a) => (a.id === id ? { ...a, unlocked: true } : a));
        soundManager.playAchievement();
        setActiveAchievementToast({ ...target, unlocked: true });
        setTimeout(() => setActiveAchievementToast(null), 4000);
        return updated;
      }
      return prev;
    });
  };

  const handleAddHydration = () => {
    setHydrationCount((prev) => {
      const next = prev + 1;
      if (next === 5) {
        unlockAchievement('hidrasyon-kralicesi');
      }
      return Math.min(5, next);
    });
  };

  const handleToggleMusic = () => {
    soundManager.toggleMusic((playing) => {
      setIsPlayingMusic(playing);
      if (playing) {
        unlockAchievement('aksamustu-dinleyici');
      }
    });
  };

  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    soundManager.setMuted(nextMuted);
  };

  const handleIncreaseMor = () => {
    setMorLevel((prev) => (prev >= 5 ? 1 : prev + 1));
  };

  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  return (
    <div className="min-h-screen bg-[#0b0514] text-[#f4effa] selection:bg-purple-500 selection:text-white relative">
      
      {/* Background YouTube Audio Stream (Yalın - Akşamüstü) - Single centralized player */}
      <div className="fixed -bottom-96 -left-96 w-10 h-10 opacity-0 pointer-events-none overflow-hidden">
        {isPlayingMusic && !isMuted && (
          <iframe
            id="youtube-global-audio-stream"
            width="320"
            height="240"
            src="https://www.youtube-nocookie.com/embed/h0mQWe-EPcw?autoplay=1&loop=1&playlist=h0mQWe-EPcw&enablejsapi=1"
            title="Yalın - Akşamüstü"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        )}
      </div>

      {/* Preloader */}
      {!isLoaded && <Preloader onComplete={() => setIsLoaded(true)} />}

      {/* Countdown Lock Gatekeeper (active until 20 August 2026 unless bypassed) */}
      {isLocked ? (
        <CountdownLock
          onUnlockPreview={() => {
            if (typeof window !== 'undefined') {
              localStorage.setItem('ilos_unlocked_confirmed', 'true');
            }
            setIsLocked(false);
            soundManager.playAchievement();
          }}
          isPlayingMusic={isPlayingMusic}
          onToggleMusic={handleToggleMusic}
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
        />
      ) : (
        <>
          {/* Sticky Navbar */}
          <Navbar
            hydrationCount={hydrationCount}
            onAddHydration={handleAddHydration}
            unlockedAchievementsCount={unlockedCount}
            totalAchievementsCount={achievements.length}
            onOpenAchievements={() => setIsAchievementsOpen(true)}
            isPlayingMusic={isPlayingMusic}
            onToggleMusic={handleToggleMusic}
            isMuted={isMuted}
            onToggleMute={handleToggleMute}
            scrollProgress={scrollProgress}
          />

          {/* Main Content Experience */}
          <main className="relative z-10">
            <HeroScene
              morLevel={morLevel}
              onIncreaseMor={handleIncreaseMor}
              onEnterUniverse={() => {}}
            />

            {/* Embedded Yalın - Akşamüstü Official Soundtrack Section */}
            <AksamustuPlayer
              isPlaying={isPlayingMusic}
              onTogglePlay={handleToggleMusic}
              isMuted={isMuted}
              onToggleMute={handleToggleMute}
            />

            {/* MustafaBank - Tüm Masrafları Mustafa Can Öder */}
            <MustafaBank
              onUnlockAchievement={unlockAchievement}
            />

            {/* Uber Mustafa - 7/24 Özel VIP Ulaşım */}
            <UberMustafa
              onUnlockAchievement={unlockAchievement}
            />

            {/* Günün Moduna Göre Mustafa'dan Çözüm Üretici */}
            <MustafaSolutionEngine
              onUnlockAchievement={unlockAchievement}
            />

            <IlosOS
              onUnlockAchievement={unlockAchievement}
            />

            <StarterPack />

            {/* Neden Dünyanın En Güzel Kadını? */}
            <EnGuzelKadin
              onUnlockAchievement={unlockAchievement}
            />

            <Quiz onUnlockAchievement={unlockAchievement} />

            {/* Aşk Bahçesi & Canlı Besleme Simülatörü */}
            <AskBahcesi onUnlockAchievement={unlockAchievement} />

            {/* İloş Mor Tarot & Günlük Fal */}
            <IlosTarot onUnlockAchievement={unlockAchievement} />

            <KPSSModule onUnlockAchievement={unlockAchievement} />

            <DreamGarage onUnlockAchievement={unlockAchievement} />

            <TrainingMode onUnlockAchievement={unlockAchievement} />

            <ApprovedMenu onUnlockAchievement={unlockAchievement} />

            <StadiumMode onUnlockAchievement={unlockAchievement} />

            <MorCicekBahcesi onUnlockAchievement={unlockAchievement} />

            {/* Sanal Mor Orkide Ekin & Büyütün */}
            <SanalMorOrkide onUnlockAchievement={unlockAchievement} />

            <Daha17Cinema />

            <NuraySection />

            <MuratKenks onUnlockAchievement={unlockAchievement} />

            {/* İloş Güneş Modu & Sıcak Işık Huzmesi */}
            <IlosGunesi onUnlockAchievement={unlockAchievement} />

            <EmotionalSection onOpenFinalSurprise={() => setIsFinalSurpriseOpen(true)} />
          </main>

          {/* Footer */}
          <Footer />

          {/* Floating Easter Eggs & listeners */}
          <FloatingEasterEggs onUnlockAchievement={unlockAchievement} />

          {/* Achievements Modal */}
          <AchievementsModal
            isOpen={isAchievementsOpen}
            onClose={() => setIsAchievementsOpen(false)}
            achievements={achievements}
          />

          {/* Final Surprise Modal */}
          <FinalSurpriseModal
            isOpen={isFinalSurpriseOpen}
            onClose={() => setIsFinalSurpriseOpen(false)}
          />
        </>
      )}

      {/* Unlocked Achievement Toast Notification */}
      <AnimatePresence>
        {activeAchievementToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-[#1b0d36] border border-pink-500/60 shadow-2xl shadow-purple-950 flex items-center gap-3 max-w-sm"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300 shrink-0">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono-code text-pink-400 font-bold block">
                BAŞARIM AÇILDI!
              </span>
              <h5 className="text-sm font-bold text-white">
                {activeAchievementToast.title}
              </h5>
              <p className="text-xs text-purple-200/80 font-serif-italic line-clamp-1">
                {activeAchievementToast.description}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
