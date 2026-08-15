class SoundManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private isPlayingMusic: boolean = false;
  private musicInterval: number | null = null;
  private customAudio: HTMLAudioElement | null = null;

  constructor() {
    // Lazy initialized on first user interaction
  }

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.customAudio) {
      this.customAudio.muted = muted;
    }
    if (muted && this.isPlayingMusic) {
      this.stopMusic();
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
      // High sparkling coin chime (like a cash register kaching)
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

  public toggleMusic(onStateChange?: (playing: boolean) => void): boolean {
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
    if (this.isPlayingMusic) return;
    this.initContext();

    // Check if custom audio exists
    try {
      if (!this.customAudio) {
        this.customAudio = new Audio('/assets/aksamustu.mp3');
        this.customAudio.loop = true;
        this.customAudio.volume = 0.45;
      }
      
      const playPromise = this.customAudio.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          this.isPlayingMusic = true;
        }).catch(() => {
          // If file not found or blocked, fallback to gentle synthesized ambient
          this.startSynthesizedAmbient();
        });
      }
    } catch {
      this.startSynthesizedAmbient();
    }
  }

  private startSynthesizedAmbient() {
    this.isPlayingMusic = true;
    if (!this.ctx) return;

    // A rich, warm acoustic progression + melody motif of Yalın - Akşamüstü
    const chordProgressions = [
      { chords: [293.66, 369.99, 440.00, 554.37], melody: [554.37, 587.33, 659.25, 587.33] }, // Dmaj7
      { chords: [369.99, 440.00, 554.37, 739.99], melody: [659.25, 739.99, 880.00, 739.99] }, // F#m7
      { chords: [392.00, 493.88, 587.33, 739.99], melody: [739.99, 659.25, 587.33, 554.37] }, // Gmaj7
      { chords: [440.00, 587.33, 659.25, 880.00], melody: [587.33, 554.37, 493.88, 440.00] }  // A7sus
    ];

    let patternIndex = 0;

    const playAmbientChord = () => {
      if (!this.isPlayingMusic || !this.ctx || this.isMuted) return;

      const current = chordProgressions[patternIndex % chordProgressions.length];
      patternIndex++;
      const now = this.ctx.currentTime;

      // Play soft warm background chord
      current.chords.forEach((freq, i) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.04);

        gain.gain.setValueAtTime(0.001, now + i * 0.04);
        gain.gain.linearRampToValueAtTime(0.04, now + i * 0.04 + 0.6);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.04 + 3.8);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + i * 0.04);
        osc.stop(now + i * 0.04 + 3.9);
      });

      // Play gentle acoustic guitar/rhodes melody note
      current.melody.forEach((melFreq, mIdx) => {
        if (!this.ctx) return;
        const melOsc = this.ctx.createOscillator();
        const melGain = this.ctx.createGain();
        melOsc.type = 'triangle';
        const noteTime = now + 0.3 + mIdx * 0.7;

        melOsc.frequency.setValueAtTime(melFreq, noteTime);

        melGain.gain.setValueAtTime(0.001, noteTime);
        melGain.gain.linearRampToValueAtTime(0.035, noteTime + 0.05);
        melGain.gain.exponentialRampToValueAtTime(0.0001, noteTime + 0.65);

        melOsc.connect(melGain);
        melGain.connect(this.ctx.destination);

        melOsc.start(noteTime);
        melOsc.stop(noteTime + 0.68);
      });
    };

    playAmbientChord();
    this.musicInterval = window.setInterval(playAmbientChord, 3500);
  }

  public stopMusic() {
    this.isPlayingMusic = false;
    if (this.customAudio) {
      this.customAudio.pause();
    }
    if (this.musicInterval) {
      clearInterval(this.musicInterval);
      this.musicInterval = null;
    }
  }
}

export const soundManager = new SoundManager();
