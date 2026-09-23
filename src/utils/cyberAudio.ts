/**
 * CYBRAVION Cyber Audio Engine
 * Pure Web Audio API synthetic sound design (zero audio file downloads, instant 0-latency).
 * Designed for subtle, high-tech tactical feedback.
 */

class CyberAudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('cybravions_audio_muted');
      this.isMuted = saved === 'true';
    }
  }

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (typeof window !== 'undefined') {
      localStorage.setItem('cybravions_audio_muted', String(this.isMuted));
    }
    if (!this.isMuted) {
      this.playChirp();
    }
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  /** Subtle high-tech micro click */
  public playClick(): void {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1400, now);
      osc.frequency.exponentialRampToValueAtTime(700, now + 0.04);

      gain.gain.setValueAtTime(0.045, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.04);
    } catch {
      // Audio autoplay policy fallback
    }
  }

  /** Tactical Hover Chirp */
  public playChirp(): void {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(1600, now + 0.05);

      gain.gain.setValueAtTime(0.03, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.05);
    } catch {}
  }

  /** Threat Neutralized / Defense Shield Activation Sound */
  public playShieldActivate(): void {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      
      // Harmonic Triad Chord
      const freqs = [196, 293.66, 392, 587.33]; // G major resonant chord
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = idx === 0 ? 'sawtooth' : 'sine';
        osc.frequency.setValueAtTime(freq * 0.8, now);
        osc.frequency.exponentialRampToValueAtTime(freq, now + 0.25);

        gain.gain.setValueAtTime(0.04 / (idx + 1), now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.6);
      });
    } catch {}
  }

  /** Radar Sweep Pulse */
  public playRadarSweep(): void {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.18);

      gain.gain.setValueAtTime(0.035, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.18);
    } catch {}
  }
}

export const cyberAudio = new CyberAudioEngine();
