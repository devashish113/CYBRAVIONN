/**
 * CYBRAVION Cyber Audio Engine
 * Completely silenced / disabled sound engine.
 */

class CyberAudioEngine {
  public toggleMute(): boolean {
    return true;
  }

  public getMuted(): boolean {
    return true;
  }

  public playClick(): void {}
  public playSuccess(): void {}
  public playChirp(): void {}
  public playShieldActivate(): void {}
  public playRadarSweep(): void {}
}

export const cyberAudio = new CyberAudioEngine();

