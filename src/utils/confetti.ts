import confetti from 'canvas-confetti';

export const launchPurpleConfetti = () => {
  try {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#a855f7', '#c084fc', '#e879f9', '#f472b6', '#ffffff']
    });
  } catch {
    // ignore
  }
};

export const launchMorKonfeti = launchPurpleConfetti;

export const launchGalatasarayConfetti = () => {
  try {
    confetti({
      particleCount: 80,
      spread: 75,
      origin: { y: 0.7 },
      colors: ['#f59e0b', '#dc2626', '#a855f7', '#fbbf24', '#ffffff']
    });
  } catch {
    // ignore
  }
};

export const launchGrandBirthdayConfetti = () => {
  try {
    const duration = 3.5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

    const interval: number = window.setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#a855f7', '#ec4899', '#c084fc', '#f43f5e', '#ffd700', '#ffffff']
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#a855f7', '#ec4899', '#c084fc', '#f43f5e', '#ffd700', '#ffffff']
      });
    }, 250);
  } catch {
    // ignore
  }
};

function randomInRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}
