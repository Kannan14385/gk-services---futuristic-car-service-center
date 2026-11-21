import React, { useState } from 'react';
import { ShieldCheck, Cpu, ArrowUpRight, Play, Zap, Compass, Activity, CheckCircle2, Sparkles, Layers, Sliders, Eye } from 'lucide-react';

interface HeroSectionProps {
  onOpenContact: () => void;
  onExplore360: () => void;
}

// Curated high-resolution hypercar service bay perspectives
const HERO_SHOWCASE_IMAGES = [
  {
    id: 'bay-1',
    title: 'Precision Aero Bay',
    subtitle: 'Robotic Surface Restoration & 9H Molecular Shield',
    url: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80',
    tag: 'Chamber 01 · Active',
    metric: '99.8% Restoration',
  },
  {
    id: 'bay-2',
    title: 'Dyno & Powertrain Dock',
    subtitle: 'Active Lambda Mapping & Twin-Turbine Calibrations',
    url: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=80',
    tag: 'Chamber 02 · Active',
    metric: '+48 BHP Dyno Gain',
  },
  {
    id: 'bay-3',
    title: 'Trackside Setup Pit',
    subtitle: 'Pushrod Suspension Tuning & Laser Camber Alignment',
    url: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80',
    tag: 'Chamber 03 · Standby',
    metric: '±0.01mm Tolerance',
  },
  {
    id: 'bay-4',
    title: 'Ceramic Curing Cleanroom',
    subtitle: 'Infrared Graphene Matrix Molecular Polymerization',
    url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
    tag: 'Chamber 04 · Active',
    metric: 'Class-100 Cleanroom',
  },
];

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenContact, onExplore360 }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const currentHero = HERO_SHOWCASE_IMAGES[activeImageIndex];

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex flex-col justify-center pt-10 pb-24 px-4 sm:px-6 lg:px-8 border-b-2 border-[var(--border-highlight)] bg-[var(--bg-primary)] cyber-radial-glow overflow-hidden"
    >
      {/* Cinematic Workshop Environment Backdrop Overlay with subtle blur & gradient wash */}
      <div 
        className="absolute inset-0 opacity-15 dark:opacity-20 pointer-events-none transition-all duration-700 bg-cover bg-center filter blur-[1px] scale-105"
        style={{
          backgroundImage: `url(${currentHero.url})`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-primary)]/80 via-[var(--bg-primary)]/90 to-[var(--bg-primary)] pointer-events-none" />

      {/* Laser Light Strands & Grid Matrix */}
      <div className="absolute inset-0 cyber-grid opacity-25 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-[var(--accent-cyan)]/15 rounded-full blur-[160px] pointer-events-none" />

      {/* Subtle Section Header Divider Notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-[var(--accent-cyan)] to-transparent" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Top Telemetry Status Pill */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--bg-card)] border border-[var(--border-color)] text-xs font-mono-tech text-[var(--accent-cyan)] shadow-[0_0_15px_var(--accent-glow)] backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
              </span>
              <span className="uppercase tracking-widest font-semibold">GK DOCK TELEMETRY · 4 ROBOTIC BAYS ACTIVE</span>
            </div>

            <div className="hidden sm:inline-flex items-center gap-2 text-xs font-mono-tech text-[var(--text-secondary)]">
              <Activity className="w-3.5 h-3.5 text-[var(--accent-cyan)]" />
              <span>CALIBRATION PROTOCOL: ISO-9001-AERO</span>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-2 text-xs font-mono-tech text-[var(--text-muted)] bg-[var(--bg-card)]/60 px-3 py-1 rounded-full border border-[var(--border-color)]">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>AUTHENTIC HYPERCAR CLEANROOM WORKSHOP</span>
          </div>
        </div>

        {/* Main Headline & Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Mission Content */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-mono-tech text-[var(--accent-cyan)] uppercase tracking-widest block font-bold">
                AEROSPACE-GRADE AUTOMOTIVE SURGERY
              </span>
              <h1 className="gk-font-display font-primary font-black tracking-tight text-[var(--text-primary)] uppercase leading-none">
                NEXT-GEN <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-cyan)] via-sky-400 to-blue-500 drop-shadow-[0_0_30px_var(--accent-glow)]">
                  PRECISION
                </span>{' '}
                CAR SERVICE
              </h1>
            </div>

            <p className="gk-font-body font-rajdhani text-lg sm:text-xl text-[var(--text-secondary)] max-w-xl font-medium tracking-wide leading-relaxed">
              Welcome to <strong className="text-[var(--text-primary)]">GK Services</strong> — where aerospace engineering meets autonomous robotic maintenance. We eliminate human margin of error using sub-micron optical LiDAR scans, molecular ceramic armor, and quantum dyno telemetry.
            </p>

            {/* Live Chamber Preview Strip with Authentic Supercar Imagery */}
            <div className="p-3.5 rounded-2xl bg-[var(--bg-card)]/80 border border-[var(--border-color)] backdrop-blur-md space-y-2.5">
              <div className="flex items-center justify-between text-xs font-mono-tech">
                <span className="text-[var(--text-muted)] uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  CURRENT DOCK OPERATIONS
                </span>
                <span className="text-[var(--accent-cyan)] font-semibold">ALL BAYS MONITORED</span>
              </div>
              <div className="grid grid-cols-3 gap-2.5">
                <div className="flex items-center gap-2 p-1.5 rounded-xl bg-[var(--bg-primary)]/60 border border-[var(--border-color)] overflow-hidden group">
                  <img
                    src="https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&w=200&q=80"
                    alt="Ferrari 488 Pista"
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-lg object-cover group-hover:scale-110 transition-transform shrink-0"
                  />
                  <div className="min-w-0 flex-1 text-left">
                    <div className="text-[11px] font-bold text-[var(--text-primary)] truncate">Ferrari 488</div>
                    <div className="text-[9px] font-mono-tech text-[var(--accent-cyan)] truncate">9H Ceramic Shield</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-1.5 rounded-xl bg-[var(--bg-primary)]/60 border border-[var(--border-color)] overflow-hidden group">
                  <img
                    src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=200&q=80"
                    alt="Porsche 911 GT3"
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-lg object-cover group-hover:scale-110 transition-transform shrink-0"
                  />
                  <div className="min-w-0 flex-1 text-left">
                    <div className="text-[11px] font-bold text-[var(--text-primary)] truncate">Porsche GT3</div>
                    <div className="text-[9px] font-mono-tech text-emerald-400 truncate">Laser Camber Spec</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-1.5 rounded-xl bg-[var(--bg-primary)]/60 border border-[var(--border-color)] overflow-hidden group">
                  <img
                    src="https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=200&q=80"
                    alt="McLaren 720S"
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-lg object-cover group-hover:scale-110 transition-transform shrink-0"
                  />
                  <div className="min-w-0 flex-1 text-left">
                    <div className="text-[11px] font-bold text-[var(--text-primary)] truncate">McLaren 720S</div>
                    <div className="text-[9px] font-mono-tech text-[var(--accent-cyan)] truncate">Quantum Dyno +48HP</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Universal Buttons with Universal Hover Effects */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                id="hero-book-btn"
                onClick={onOpenContact}
                className="gk-btn text-sm sm:text-base py-3.5 px-8"
              >
                <Zap className="w-4 h-4 text-[var(--accent-cyan)] group-hover:text-white transition-colors" />
                <span>Reserve Diagnostic Dock</span>
              </button>

              <button
                id="hero-360-btn"
                onClick={onExplore360}
                className="gk-btn gk-btn-secondary text-sm sm:text-base py-3.5 px-7"
              >
                <Compass className="w-4 h-4 text-[var(--accent-cyan)]" />
                <span>Launch 360° Inspection</span>
              </button>
            </div>

            {/* Quick Guarantees checklist */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-[var(--border-color)]">
              <div className="flex items-center gap-2 text-xs font-mono-tech text-[var(--text-secondary)]">
                <CheckCircle2 className="w-4 h-4 text-[var(--accent-cyan)] shrink-0" />
                <span>Zero Margin of Error</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono-tech text-[var(--text-secondary)]">
                <CheckCircle2 className="w-4 h-4 text-[var(--accent-cyan)] shrink-0" />
                <span>5-Year Ceramic Defense</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono-tech text-[var(--text-secondary)]">
                <CheckCircle2 className="w-4 h-4 text-[var(--accent-cyan)] shrink-0" />
                <span>Instant HUD Telemetry</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Concept Visual Card with Interactive Live Bay Showcase */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl p-1 bg-gradient-to-b from-[var(--accent-cyan)]/50 via-[var(--accent-cyan)]/20 to-transparent shadow-[0_0_60px_var(--accent-glow)]">
              <div className="relative rounded-[22px] overflow-hidden bg-[var(--bg-card)] border border-[var(--border-color)] shadow-2xl">
                {/* Hero Car Showcase Graphic */}
                <div className="relative h-80 sm:h-96 md:h-[420px] w-full overflow-hidden group">
                  <img
                    key={currentHero.id}
                    src={currentHero.url}
                    alt={currentHero.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center filter contrast-110 group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  {/* High-tech Vignette & Gradients */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)] via-black/20 to-black/40" />

                  {/* Laser Scan HUD Overlay Top */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs font-mono-tech text-[var(--accent-cyan)] bg-[var(--bg-card)]/85 backdrop-blur-md px-3.5 py-2 rounded-xl border border-[var(--border-color)] shadow-md">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[var(--accent-cyan)] animate-ping" />
                      <span className="font-bold">{currentHero.tag}</span>
                    </span>
                    <span className="text-[11px] text-[var(--text-secondary)]">LASER SCAN: 0.005mm TOLERANCE</span>
                  </div>

                  {/* Hotspot indicator on hero */}
                  <div
                    onClick={onExplore360}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer group/pin"
                  >
                    <span className="animate-radar absolute inline-flex h-14 w-14 -top-3 -left-3 rounded-full bg-[var(--accent-cyan)]/40" />
                    <div className="relative px-4 py-2 rounded-full bg-[var(--bg-card)]/90 border border-[var(--accent-cyan)] text-xs font-mono-tech text-[var(--accent-cyan)] flex items-center gap-2 shadow-[0_0_25px_var(--accent-glow)] group-hover/pin:scale-110 transition-transform">
                      <Compass className="w-4 h-4 animate-spin text-[var(--accent-cyan)]" />
                      <span className="font-bold">LAUNCH 3D CAR LAB</span>
                    </div>
                  </div>

                  {/* Active Bay Title Badge (Bottom of Image) */}
                  <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between text-white pointer-events-none">
                    <div>
                      <div className="text-xs font-mono-tech uppercase text-[var(--accent-cyan)] tracking-wider">
                        {currentHero.subtitle}
                      </div>
                      <div className="font-primary font-bold text-lg sm:text-xl drop-shadow-md">
                        {currentHero.title}
                      </div>
                    </div>
                    <div className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/20 text-xs font-mono-tech text-emerald-400">
                      {currentHero.metric}
                    </div>
                  </div>
                </div>

                {/* Interactive Multi-Bay Image Thumbnails Selector (Rich Visual Experience) */}
                <div className="p-3 sm:p-4 bg-[var(--bg-card-subtle)] border-t border-[var(--border-color)]">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-mono-tech uppercase text-[var(--text-muted)] tracking-wider">
                      SELECT WORKSHOP PERSPECTIVE:
                    </span>
                    <span className="text-[11px] font-mono-tech text-[var(--accent-cyan)]">
                      BAY {activeImageIndex + 1} OF {HERO_SHOWCASE_IMAGES.length}
                    </span>
                  </div>

                  <div className="grid grid-cols-4 gap-2">
                    {HERO_SHOWCASE_IMAGES.map((bay, idx) => (
                      <button
                        key={bay.id}
                        onClick={() => setActiveImageIndex(idx)}
                        className={`relative rounded-xl overflow-hidden h-14 border transition-all cursor-pointer group ${
                          activeImageIndex === idx
                            ? 'border-[var(--accent-cyan)] shadow-[0_0_12px_var(--accent-glow)] scale-102 ring-1 ring-[var(--accent-cyan)]'
                            : 'border-[var(--border-color)] opacity-65 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={bay.url}
                          alt={bay.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />
                        <div className="absolute bottom-1 left-1.5 right-1.5 text-[9px] font-mono-tech text-white font-bold truncate">
                          {bay.title.split(' ')[0]}
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Telemetry Stats Bar */}
                  <div className="grid grid-cols-3 gap-2 text-center mt-3 pt-3 border-t border-[var(--border-color)]/60">
                    <div className="p-2 rounded-lg bg-[var(--bg-card)] border border-[var(--border-color)]">
                      <div className="text-[10px] font-mono-tech text-[var(--text-muted)]">RESTORE RATE</div>
                      <div className="font-primary font-bold text-xs sm:text-sm text-[var(--accent-cyan)]">99.8% Optical</div>
                    </div>
                    <div className="p-2 rounded-lg bg-[var(--bg-card)] border border-[var(--border-color)]">
                      <div className="text-[10px] font-mono-tech text-[var(--text-muted)]">TOLERANCE</div>
                      <div className="font-primary font-bold text-xs sm:text-sm text-emerald-400">±0.01mm Laser</div>
                    </div>
                    <div className="p-2 rounded-lg bg-[var(--bg-card)] border border-[var(--border-color)]">
                      <div className="text-[10px] font-mono-tech text-[var(--text-muted)]">DYNO CALIBRATION</div>
                      <div className="font-primary font-bold text-xs sm:text-sm text-[var(--accent-cyan)]">+48 BHP Gain</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Metric Summary Containers with Rich Workshop Imagery & -30px Hover Lift */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            id="hero-stat-card-1"
            className="gk-hover-lift rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] overflow-hidden backdrop-blur-md shadow-md flex flex-col"
          >
            <div className="relative h-36 w-full overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=600&q=80"
                alt="LiDAR 48-Pt Scan"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)] via-[var(--bg-card)]/40 to-transparent" />
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="text-[10px] font-mono-tech text-[var(--accent-cyan)] bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full border border-[var(--border-color)] font-semibold">
                  PILLAR I · OPTICS
                </span>
              </div>
              <div className="absolute bottom-2 right-3">
                <span className="text-[10px] font-mono-tech text-emerald-400 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded border border-emerald-500/30">
                  ±0.005mm
                </span>
              </div>
            </div>
            <div className="p-6 pt-2 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-primary font-bold text-xl text-[var(--text-primary)] mb-2 flex items-center justify-between">
                  <span>LiDAR 48-Pt Scan</span>
                  <Cpu className="w-5 h-5 text-[var(--accent-cyan)]" />
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Every vehicle undergoes full robotic laser verification detecting frame twisting, wheel camber deviations, and suspension deflection in seconds.
                </p>
              </div>
            </div>
          </div>

          <div
            id="hero-stat-card-2"
            className="gk-hover-lift rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] overflow-hidden backdrop-blur-md shadow-md flex flex-col"
          >
            <div className="relative h-36 w-full overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=600&q=80"
                alt="9H Graphene Shield"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)] via-[var(--bg-card)]/40 to-transparent" />
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="text-[10px] font-mono-tech text-[var(--accent-cyan)] bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full border border-[var(--border-color)] font-semibold">
                  PILLAR II · ARMOR
                </span>
              </div>
              <div className="absolute bottom-2 right-3">
                <span className="text-[10px] font-mono-tech text-emerald-400 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded border border-emerald-500/30">
                  9H Diamond
                </span>
              </div>
            </div>
            <div className="p-6 pt-2 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-primary font-bold text-xl text-[var(--text-primary)] mb-2 flex items-center justify-between">
                  <span>9H Graphene Shield</span>
                  <ShieldCheck className="w-5 h-5 text-[var(--accent-cyan)]" />
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Molecular ceramic synthesis cured under shortwave infrared arrays, providing extreme hardness, UV immunity, and self-healing elasticity.
                </p>
              </div>
            </div>
          </div>

          <div
            id="hero-stat-card-3"
            className="gk-hover-lift rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] overflow-hidden backdrop-blur-md shadow-md flex flex-col"
          >
            <div className="relative h-36 w-full overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=600&q=80"
                alt="Synchronized Dyno"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)] via-[var(--bg-card)]/40 to-transparent" />
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="text-[10px] font-mono-tech text-[var(--accent-cyan)] bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full border border-[var(--border-color)] font-semibold">
                  PILLAR III · TORQUE
                </span>
              </div>
              <div className="absolute bottom-2 right-3">
                <span className="text-[10px] font-mono-tech text-amber-400 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded border border-amber-500/30">
                  +48 BHP
                </span>
              </div>
            </div>
            <div className="p-6 pt-2 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-primary font-bold text-xl text-[var(--text-primary)] mb-2 flex items-center justify-between">
                  <span>Synchronized Dyno</span>
                  <Zap className="w-5 h-5 text-[var(--accent-cyan)]" />
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Aero-ducted dynamometer chamber capable of logging 1,400 ECU telemetry channels with real-time lambda air-fuel optimization.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

