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
import { IlosStats } from './components/IlosStats';
import { EmotionalSection } from './components/EmotionalSection';
import { FinalSurpriseModal } from './components/FinalSurpriseModal';
import { AchievementsModal } from './components/AchievementsModal';
import { FloatingEasterEggs } from './components/FloatingEasterEggs';
import { Footer } from './components/Footer';

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLocked, setIsLocked] = useState<boolean>(() => {
    // Check if current date is before 20 August 2026
    const targetDate = new Date('2026-08-20T00:00:00');
    return new Date() < targetDate;
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
      
      {/* Preloader */}
      {!isLoaded && <Preloader onComplete={() => setIsLoaded(true)} />}

      {/* Countdown Lock Gatekeeper (active until 20 August 2026 unless bypassed) */}
      {isLocked ? (
        <CountdownLock
          onUnlockPreview={() => {
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

            <IlosOS
              onUnlockAchievement={unlockAchievement}
            />

            <StarterPack />

            <Quiz onUnlockAchievement={unlockAchievement} />

            <AskBahcesi onUnlockAchievement={unlockAchievement} />

            <KPSSModule onUnlockAchievement={unlockAchievement} />

            <DreamGarage onUnlockAchievement={unlockAchievement} />

            <TrainingMode onUnlockAchievement={unlockAchievement} />

            <ApprovedMenu onUnlockAchievement={unlockAchievement} />

            <StadiumMode onUnlockAchievement={unlockAchievement} />

            <MorCicekBahcesi onUnlockAchievement={unlockAchievement} />

            <Daha17Cinema />

            <NuraySection />

            <MuratKenks onUnlockAchievement={unlockAchievement} />

            <IlosStats />

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
