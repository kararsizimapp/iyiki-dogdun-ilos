class SoundManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private isPlayingMusic: boolean = false;
  private musicTimeout: number | null = null;
  private musicStep: number = 0;
  private isInitialized: boolean = false;

  constructor() {
    // Lazy initialized on first user interaction
    if (typeof window !== 'undefined') {
      const unlockAudio = () => {
        this.initContext();
        window.removeEventListener('touchstart', unlockAudio);
        window.removeEventListener('touchend', unlockAudio);
        window.removeEventListener('click', unlockAudio);
      };
      window.addEventListener('touchstart', unlockAudio, { passive: true });
      window.addEventListener('touchend', unlockAudio, { passive: true });
      window.addEventListener('click', unlockAudio, { passive: true });
    }
  }

  public initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    this.isInitialized = true;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted && this.isPlayingMusic) {
      this.stopMelodyLoop();
    } else if (!muted && this.isPlayingMusic) {
      this.startMelodyLoop();
    }
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public getIsPlayingMusic(): boolean {
    return this.isPlayingMusic;
  }

  public playClick() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(480, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.06);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.06);
    } catch {
      // ignore
    }
  }

  public playPop() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.09);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.09);
    } catch {
      // ignore
    }
  }

  public playAchievement() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, i) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + i * 0.07);

        gain.gain.setValueAtTime(0.12, now + i * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.07 + 0.25);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + i * 0.07);
        osc.stop(now + i * 0.07 + 0.25);
      });
    } catch {
      // ignore
    }
  }

  public playCash() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const freqs = [987.77, 1318.51, 1567.98, 2093.00];
      freqs.forEach((freq, i) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + i * 0.04);

        gain.gain.setValueAtTime(0.12, now + i * 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.04 + 0.2);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + i * 0.04);
        osc.stop(now + i * 0.04 + 0.2);
      });
    } catch {
      // ignore
    }
  }

  public playBuzzer() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(160, now);
      osc.frequency.setValueAtTime(130, now + 0.12);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.28);
    } catch {
      // ignore
    }
  }

  public playGoal() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const chords = [
        [440, 554.37, 659.25], // A major
        [554.37, 659.25, 880], // higher
        [659.25, 880, 1108.73] // climax
      ];

      chords.forEach((chord, step) => {
        chord.forEach((freq) => {
          if (!this.ctx) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + step * 0.12);

          gain.gain.setValueAtTime(0.1, now + step * 0.12);
          gain.gain.exponentialRampToValueAtTime(0.001, now + step * 0.12 + 0.4);

          osc.connect(gain);
          gain.connect(this.ctx.destination);

          osc.start(now + step * 0.12);
          osc.stop(now + step * 0.12 + 0.4);
        });
      });
    } catch {
      // ignore
    }
  }

  public playMeow() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      const now = this.ctx.currentTime;
      osc.frequency.setValueAtTime(550, now);
      osc.frequency.exponentialRampToValueAtTime(900, now + 0.12);
      osc.frequency.exponentialRampToValueAtTime(650, now + 0.35);

      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.35);
    } catch {
      // ignore
    }
  }

  public playBark() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      const now = this.ctx.currentTime;
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.15);

      gain.gain.setValueAtTime(0.14, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.15);
    } catch {
      // ignore
    }
  }

  // --- Relaxing Lofi / Acoustic "Akşamüstü" Melodic WebAudio Engine ---
  private playNote(freq: number, duration: number, type: OscillatorType = 'sine', volume: number = 0.08) {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(volume, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + duration);
    } catch {
      // ignore
    }
  }

  private startMelodyLoop() {
    this.stopMelodyLoop();
    this.initContext();

    // Akşamüstü melodic motifs & chord progressions (Frequencies in Hz)
    // Em: E3 (164.81), G3 (196.00), B3 (246.94), E4 (329.63)
    // C : C3 (130.81), E3 (164.81), G3 (196.00), C4 (261.63)
    // G : G2 (98.00), D3 (146.83), G3 (196.00), B3 (246.94)
    // D : D3 (146.83), F#3 (185.00), A3 (220.00), D4 (293.66)
    const melodySteps = [
      // Measure 1: Em
      { bass: 164.81, chord: [246.94, 329.63], lead: 493.88, dur: 0.9 }, // B4
      { bass: 196.00, chord: [329.63, 392.00], lead: 440.00, dur: 0.6 }, // A4
      { bass: 246.94, chord: [392.00, 493.88], lead: 392.00, dur: 0.8 }, // G4
      { bass: 164.81, chord: [246.94, 329.63], lead: 329.63, dur: 0.7 }, // E4

      // Measure 2: C
      { bass: 130.81, chord: [196.00, 261.63], lead: 392.00, dur: 0.8 }, // G4
      { bass: 164.81, chord: [261.63, 329.63], lead: 440.00, dur: 0.6 }, // A4
      { bass: 196.00, chord: [329.63, 392.00], lead: 493.88, dur: 0.9 }, // B4
      { bass: 261.63, chord: [392.00, 523.25], lead: 587.33, dur: 0.8 }, // D5

      // Measure 3: G
      { bass: 98.00, chord: [196.00, 246.94], lead: 493.88, dur: 0.9 },  // B4
      { bass: 146.83, chord: [246.94, 293.66], lead: 440.00, dur: 0.6 }, // A4
      { bass: 196.00, chord: [293.66, 392.00], lead: 392.00, dur: 0.8 }, // G4
      { bass: 246.94, chord: [392.00, 493.88], lead: 329.63, dur: 0.7 }, // E4

      // Measure 4: D
      { bass: 146.83, chord: [220.00, 293.66], lead: 370.00, dur: 0.8 }, // F#4
      { bass: 185.00, chord: [293.66, 370.00], lead: 440.00, dur: 0.7 }, // A4
      { bass: 220.00, chord: [370.00, 440.00], lead: 493.88, dur: 0.9 }, // B4
      { bass: 146.83, chord: [220.00, 293.66], lead: 392.00, dur: 1.1 }  // G4
    ];

    this.musicStep = 0;

    const playNextStep = () => {
      if (!this.isPlayingMusic || this.isMuted) return;

      const step = melodySteps[this.musicStep % melodySteps.length];
      
      // Warm bass tone
      this.playNote(step.bass, step.dur * 1.2, 'triangle', 0.05);
      
      // Soft ambient harmony chords
      step.chord.forEach((freq) => {
        this.playNote(freq, step.dur * 0.9, 'sine', 0.03);
      });

      // Sweet mellow lead melody
      this.playNote(step.lead, step.dur * 0.8, 'sine', 0.07);

      this.musicStep++;
      // Next note timing (lofi chilled tempo ~680ms per beat)
      this.musicTimeout = window.setTimeout(playNextStep, 680);
    };

    playNextStep();
  }

  private stopMelodyLoop() {
    if (this.musicTimeout) {
      clearTimeout(this.musicTimeout);
      this.musicTimeout = null;
    }
  }

  public toggleMusic(onStateChange?: (playing: boolean) => void): boolean {
    this.initContext();
    if (this.isPlayingMusic) {
      this.stopMusic();
      onStateChange?.(false);
      return false;
    } else {
      this.startMusic();
      onStateChange?.(true);
      return true;
    }
  }

  public startMusic() {
    this.initContext();
    this.isPlayingMusic = true;
    if (!this.isMuted) {
      this.startMelodyLoop();
    }
  }

  public stopMusic() {
    this.isPlayingMusic = false;
    this.stopMelodyLoop();
  }
}

export const soundManager = new SoundManager();
