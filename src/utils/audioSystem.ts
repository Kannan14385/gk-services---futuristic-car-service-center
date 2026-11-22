// Web Audio API Sound Synthesizer for GK Services Futuristic Hangar
class SoundscapeEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private droneGain: GainNode | null = null;
  private droneOsc1: OscillatorNode | null = null;
  private droneOsc2: OscillatorNode | null = null;
  private isDroneActive: boolean = false;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.droneGain && this.ctx) {
      this.droneGain.gain.setValueAtTime(muted ? 0 : 0.04, this.ctx.currentTime);
    }
  }

  public toggleMute(): boolean {
    this.setMuted(!this.isMuted);
    return this.isMuted;
  }

  // 1. Robotic Servo / Pneumatic Air Tool Click (on customization clicks)
  public playServoClick() {
    if (this.isMuted) return;
    try {
      const ctx = this.initContext();
      const now = ctx.currentTime;

      // Transient pneumatic burst
      const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 0.05, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < noiseBuffer.length; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;

      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.setValueAtTime(1400, now);
      noiseFilter.Q.setValueAtTime(3, now);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.08, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      whiteNoise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(ctx.destination);

      whiteNoise.start(now);
      whiteNoise.stop(now + 0.05);

      // Mechanical servo tone
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(750, now);
      osc.frequency.exponentialRampToValueAtTime(220, now + 0.08);

      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.08);
    } catch {
      // Audio not permitted yet
    }
  }

  // 2. Futuristic Laser Scan Sweep (LiDAR / X-Ray toggle)
  public playLaserScan() {
    if (this.isMuted) return;
    try {
      const ctx = this.initContext();
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(1800, now + 0.28);
      osc.frequency.exponentialRampToValueAtTime(600, now + 0.45);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1200, now);
      filter.frequency.exponentialRampToValueAtTime(3400, now + 0.28);
      filter.frequency.exponentialRampToValueAtTime(800, now + 0.45);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.08, now + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.46);
    } catch {
      // Audio not permitted yet
    }
  }

  // 3. Supercar Twin-Turbine Engine Rev & Wastegate Purge
  public playEngineRev(onComplete?: () => void) {
    if (this.isMuted) {
      if (onComplete) setTimeout(onComplete, 1200);
      return;
    }
    try {
      const ctx = this.initContext();
      const now = ctx.currentTime;

      // Engine Rumble Osc 1 (Sub rumble)
      const subOsc = ctx.createOscillator();
      const subGain = ctx.createGain();
      subOsc.type = 'sawtooth';
      subOsc.frequency.setValueAtTime(55, now);
      subOsc.frequency.exponentialRampToValueAtTime(280, now + 0.45); // RPM climbing to 8,500
      subOsc.frequency.exponentialRampToValueAtTime(70, now + 1.2);

      subGain.gain.setValueAtTime(0.01, now);
      subGain.gain.linearRampToValueAtTime(0.22, now + 0.35);
      subGain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

      // Lowpass Filter for exhaust chamber tone
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(280, now);
      filter.frequency.exponentialRampToValueAtTime(1800, now + 0.45);
      filter.frequency.exponentialRampToValueAtTime(320, now + 1.2);

      subOsc.connect(filter);
      filter.connect(subGain);
      subGain.connect(ctx.destination);

      subOsc.start(now);
      subOsc.stop(now + 1.25);

      // Wastegate Blow-off Valve Hiss at 0.5s
      setTimeout(() => {
        try {
          const hissNow = ctx.currentTime;
          const hissBuffer = ctx.createBuffer(1, ctx.sampleRate * 0.25, ctx.sampleRate);
          const hissData = hissBuffer.getChannelData(0);
          for (let i = 0; i < hissBuffer.length; i++) {
            hissData[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.08));
          }
          const hiss = ctx.createBufferSource();
          hiss.buffer = hissBuffer;

          const hissFilter = ctx.createBiquadFilter();
          hissFilter.type = 'highpass';
          hissFilter.frequency.setValueAtTime(3000, hissNow);

          const hissGain = ctx.createGain();
          hissGain.gain.setValueAtTime(0.07, hissNow);
          hissGain.gain.exponentialRampToValueAtTime(0.001, hissNow + 0.25);

          hiss.connect(hissFilter);
          hissFilter.connect(hissGain);
          hissGain.connect(ctx.destination);

          hiss.start(hissNow);
          hiss.stop(hissNow + 0.26);
        } catch {
          // ignore
        }
      }, 480);

      if (onComplete) {
        setTimeout(onComplete, 1200);
      }
    } catch {
      if (onComplete) onComplete();
    }
  }

  // 4. Ambient Sci-Fi Hangar Reactor Drone
  public toggleHangarDrone(): boolean {
    if (this.isDroneActive) {
      this.stopHangarDrone();
      return false;
    } else {
      this.startHangarDrone();
      return true;
    }
  }

  public startHangarDrone() {
    try {
      const ctx = this.initContext();
      if (this.isDroneActive) return;

      const now = ctx.currentTime;
      this.droneGain = ctx.createGain();
      this.droneGain.gain.setValueAtTime(0.0001, now);
      this.droneGain.gain.linearRampToValueAtTime(this.isMuted ? 0 : 0.035, now + 1.5);

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(140, now);

      this.droneOsc1 = ctx.createOscillator();
      this.droneOsc1.type = 'sine';
      this.droneOsc1.frequency.setValueAtTime(54, now); // 54Hz cleanroom hum

      this.droneOsc2 = ctx.createOscillator();
      this.droneOsc2.type = 'triangle';
      this.droneOsc2.frequency.setValueAtTime(56.5, now); // Detuned for atmospheric chorus

      this.droneOsc1.connect(filter);
      this.droneOsc2.connect(filter);
      filter.connect(this.droneGain);
      this.droneGain.connect(ctx.destination);

      this.droneOsc1.start(now);
      this.droneOsc2.start(now);
      this.isDroneActive = true;
    } catch {
      // audio suspended until interaction
    }
  }

  public stopHangarDrone() {
    if (!this.isDroneActive || !this.droneGain || !this.ctx) return;
    const now = this.ctx.currentTime;
    this.droneGain.gain.linearRampToValueAtTime(0.0001, now + 0.8);
    setTimeout(() => {
      try {
        this.droneOsc1?.stop();
        this.droneOsc2?.stop();
        this.droneOsc1?.disconnect();
        this.droneOsc2?.disconnect();
      } catch {
        // ignore
      }
      this.isDroneActive = false;
    }, 850);
  }

  public isDroneRunning(): boolean {
    return this.isDroneActive;
  }
}

export const soundscape = new SoundscapeEngine();

export const playServoClick = () => soundscape.playServoClick();
export const playLaserScan = () => soundscape.playLaserScan();
export const playEngineRev = () => soundscape.playEngineRev();
export const playHoloBeep = (freq?: number) => soundscape.playHoloBeep(freq);
export const toggleHangarDrone = () => soundscape.toggleHangarDrone();
export const startHangarDrone = () => soundscape.startHangarDrone();
export const stopHangarDrone = () => soundscape.stopHangarDrone();
export const isDroneRunning = () => soundscape.isDroneRunning();
export const toggleMute = () => soundscape.toggleMute();
export const getMuted = () => soundscape.getMuted();
