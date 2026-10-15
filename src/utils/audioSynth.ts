/**
 * Audio Manager for Real Ferrari Engine Sound Effects
 * Uses genuine recorded MP3 audio tracks with procedural fallback.
 */

class AudioSynthesizer {
  private isMuted: boolean = false;
  private currentAudio: HTMLAudioElement | null = null;
  private stopTimer: ReturnType<typeof setTimeout> | null = null;

  private introAudio: HTMLAudioElement | null = null;
  private launchAudio: HTMLAudioElement | null = null;
  private flybyAudio: HTMLAudioElement | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      try {
        this.introAudio = new Audio('/audio/ferrari-intro.mp3');
        this.introAudio.preload = 'auto';

        this.launchAudio = new Audio('/audio/ferrari-launch.mp3');
        this.launchAudio.preload = 'auto';

        this.flybyAudio = new Audio('/audio/ferrari-flyby.mp3');
        this.flybyAudio.preload = 'auto';
      } catch {
        // Audio element fallback
      }
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stopAll();
    }
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted) {
      this.stopAll();
    }
  }

  public stop5sTrack() {
    this.stopAll();
  }

  public stopAll() {
    if (this.stopTimer) {
      clearTimeout(this.stopTimer);
      this.stopTimer = null;
    }
    if (this.currentAudio) {
      try {
        this.currentAudio.pause();
        this.currentAudio.currentTime = 0;
      } catch {
        // ignore
      }
      this.currentAudio = null;
    }
    if (this.introAudio) {
      try {
        this.introAudio.pause();
        this.introAudio.currentTime = 0;
      } catch {
        // ignore
      }
    }
    if (this.launchAudio) {
      try {
        this.launchAudio.pause();
        this.launchAudio.currentTime = 0;
      } catch {
        // ignore
      }
    }
    if (this.flybyAudio) {
      try {
        this.flybyAudio.pause();
        this.flybyAudio.currentTime = 0;
      } catch {
        // ignore
      }
    }
  }

  // Soft haptic click
  public playClick(freq = 750, duration = 0.025, vol = 0.04) {
    if (this.isMuted || typeof window === 'undefined') return;
    try {
      const AudioCtxClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtxClass) return;
      const ctx = new AudioCtxClass();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(vol, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // safe
    }
  }

  // Chime sound for modal confirmations
  public playChime(freq = 580, type: OscillatorType = 'triangle', duration = 0.35, vol = 0.08) {
    if (this.isMuted || typeof window === 'undefined') return;
    try {
      const AudioCtxClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtxClass) return;
      const ctx = new AudioCtxClass();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(vol, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // safe
    }
  }

  // Headlights switch sound
  public playHeadlightsClick(turnOn: boolean) {
    if (this.isMuted) return;
    this.playClick(turnOn ? 880 : 320, 0.08, 0.05);
  }

  // Intro Engine Roar (Real Audio)
  public playIntroRoar() {
    if (this.isMuted) return;
    this.stopAll();

    try {
      if (!this.introAudio) {
        this.introAudio = new Audio('/audio/ferrari-intro.mp3');
      }
      this.introAudio.volume = 0.85;
      this.introAudio.currentTime = 0;
      const playPromise = this.introAudio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay blocked prior to user interaction
        });
      }
    } catch {
      // safe
    }
  }

  // Track 1 (5s): Ferrari V8 Launch (Real Audio)
  public playTrack1Launch5s(onFinish?: () => void) {
    if (this.isMuted) {
      if (onFinish) onFinish();
      return;
    }
    this.stopAll();

    try {
      if (!this.launchAudio) {
        this.launchAudio = new Audio('/audio/ferrari-launch.mp3');
      }
      this.launchAudio.volume = 0.95;
      this.launchAudio.currentTime = 0;
      this.currentAudio = this.launchAudio;

      const playPromise = this.launchAudio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          if (onFinish) onFinish();
        });
      }

      // Stop exactly after 5.0 seconds
      this.stopTimer = setTimeout(() => {
        try {
          if (this.launchAudio) {
            this.launchAudio.pause();
            this.launchAudio.currentTime = 0;
          }
        } catch {
          // ignore
        }
        if (onFinish) onFinish();
      }, 5000);
    } catch {
      if (onFinish) onFinish();
    }
  }

  // Track 2 (5s): High-RPM Flyby / Động cơ gầm (Real Audio)
  public playTrack2Flyby5s(onFinish?: () => void) {
    if (this.isMuted) {
      if (onFinish) onFinish();
      return;
    }
    this.stopAll();

    try {
      if (!this.flybyAudio) {
        this.flybyAudio = new Audio('/audio/ferrari-flyby.mp3');
      }
      this.flybyAudio.volume = 0.95;
      this.flybyAudio.currentTime = 0;
      this.currentAudio = this.flybyAudio;

      const playPromise = this.flybyAudio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          if (onFinish) onFinish();
        });
      }

      // Stop exactly after 5.0 seconds
      this.stopTimer = setTimeout(() => {
        try {
          if (this.flybyAudio) {
            this.flybyAudio.pause();
            this.flybyAudio.currentTime = 0;
          }
        } catch {
          // ignore
        }
        if (onFinish) onFinish();
      }, 5000);
    } catch {
      if (onFinish) onFinish();
    }
  }
}

export const soundManager = new AudioSynthesizer();
