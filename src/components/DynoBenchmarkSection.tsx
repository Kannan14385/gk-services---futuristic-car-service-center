import React, { useState } from 'react';
import { Gauge, Zap, Flame, ShieldAlert, Award, Activity, ArrowUpRight, Play, CheckCircle2 } from 'lucide-react';
import { soundscape } from '../utils/audioSystem';

interface DynoBenchmarkSectionProps {
  onBookService: (serviceName: string) => void;
}

export type DynoStage = 'stock' | 'stage1' | 'stage2' | 'stage3';

const DYNO_STAGES = [
  {
    id: 'stock' as DynoStage,
    title: 'Factory Stock',
    tag: 'OEM Benchmark',
    hp: 720,
    torque: 850,
    acceleration: 2.95,
    topSpeed: 340,
    downforce: 420,
    braking: 31.5,
    boostBar: 1.2,
    redline: '7,800 RPM',
    calibration: 'Factory Restricted',
    badgeColor: 'border-slate-500/40 text-slate-300',
  },
  {
    id: 'stage1' as DynoStage,
    title: 'Stage 1 Hyper',
    tag: 'ECU & Intake Pulse',
    hp: 940,
    torque: 1080,
    acceleration: 2.45,
    topSpeed: 375,
    downforce: 610,
    braking: 28.2,
    boostBar: 1.8,
    redline: '8,200 RPM',
    calibration: '98-RON High Flow',
    badgeColor: 'border-cyan-500/40 text-cyan-300',
  },
  {
    id: 'stage2' as DynoStage,
    title: 'Stage 2 Track',
    tag: 'Twin Hybrid Turbines',
    hp: 1120,
    torque: 1310,
    acceleration: 2.08,
    topSpeed: 405,
    downforce: 780,
    braking: 25.4,
    boostBar: 2.4,
    redline: '8,500 RPM',
    calibration: 'Titanium Inconel Catless',
    badgeColor: 'border-amber-500/40 text-amber-300',
  },
  {
    id: 'stage3' as DynoStage,
    title: 'Stage 3 Quantum',
    tag: 'Dual Axial-Flux Hybrid',
    hp: 1280,
    torque: 1520,
    acceleration: 1.78,
    topSpeed: 435,
    downforce: 920,
    braking: 23.1,
    boostBar: 3.1,
    redline: '9,200 RPM',
    calibration: 'Full Autonomous Telemetry',
    badgeColor: 'border-rose-500/40 text-rose-300',
  },
];

export const DynoBenchmarkSection: React.FC<DynoBenchmarkSectionProps> = ({ onBookService }) => {
  const [activeStage, setActiveStage] = useState<DynoStage>('stage3');
  const [isPulling, setIsPulling] = useState<boolean>(false);

  const stageData = DYNO_STAGES.find((s) => s.id === activeStage) || DYNO_STAGES[3];

  const handleStageSelect = (stageId: DynoStage) => {
    setActiveStage(stageId);
    soundscape.playServoClick();
  };

  const handleTestDynoPull = () => {
    setIsPulling(true);
    soundscape.playEngineRev(() => {
      setIsPulling(false);
    });
  };

  return (
    <section id="dyno-lab" className="relative py-24 px-4 sm:px-6 lg:px-8 border-b border-[var(--border-color)] bg-[var(--bg-secondary)]/50 overflow-hidden">
      {/* Background Matrix Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[var(--accent-cyan)]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--accent-cyan)] text-xs font-space-mono uppercase tracking-widest mb-4 shadow-sm">
            <Activity className="w-3.5 h-3.5 animate-pulse text-[var(--accent-cyan)]" />
            <span>Section 04 · Quantum Telemetry & Dyno Lab</span>
          </div>

          <h2 className="gk-font-h2 font-syncopate font-black tracking-wider text-[var(--text-primary)] uppercase">
            DYNO PERFORMANCE <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--accent-crimson)]">BENCHMARK</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[var(--text-secondary)] font-rajdhani font-medium tracking-wide">
            Drag through our aerospace dyno stages to simulate real-time horsepower, torque curve optimization, and aerodynamic velocity gains.
          </p>
        </div>

        {/* Stage Selector Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 mb-10">
          {DYNO_STAGES.map((stg) => {
            const isSelected = activeStage === stg.id;
            return (
              <button
                key={stg.id}
                onClick={() => handleStageSelect(stg.id)}
                className={`relative px-5 py-3 rounded-2xl text-xs sm:text-sm font-space-mono font-bold uppercase transition-all duration-300 flex items-center gap-2.5 cursor-pointer border ${
                  isSelected
                    ? 'bg-[var(--accent-cyan)] text-black border-[var(--accent-cyan)] shadow-[0_0_25px_var(--accent-glow)] scale-105'
                    : 'bg-[var(--bg-card)] text-[var(--text-secondary)] border-[var(--border-color)] hover:border-[var(--accent-cyan)] hover:text-[var(--text-primary)]'
                }`}
              >
                <span>{stg.title}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${isSelected ? 'bg-black/20 text-black' : 'bg-[var(--bg-primary)] text-[var(--text-muted)]'}`}>
                  {stg.hp} BHP
                </span>
              </button>
            );
          })}
        </div>

        {/* Main Dyno Dashboard Card with HUD Brackets */}
        <div className="hud-bracket relative rounded-3xl bg-[var(--bg-card)]/90 border border-[var(--border-color)] p-6 sm:p-8 lg:p-10 shadow-2xl backdrop-blur-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left 5 Cols: Primary Power Gauges */}
            <div className="lg:col-span-5 space-y-6">
              <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-4">
                <div>
                  <div className="text-xs font-space-mono text-[var(--accent-cyan)] uppercase tracking-wider font-semibold">
                    CURRENT CALIBRATION
                  </div>
                  <div className="text-2xl sm:text-3xl font-syncopate font-black text-[var(--text-primary)] mt-1">
                    {stageData.title}
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full border text-xs font-space-mono font-bold ${stageData.badgeColor}`}>
                  {stageData.tag}
                </div>
              </div>

              {/* Big KPI Metric Blocks */}
              <div className="grid grid-cols-2 gap-4">
                {/* Horsepower */}
                <div className="p-4 rounded-2xl bg-[var(--bg-primary)]/80 border border-[var(--border-color)] relative overflow-hidden group">
                  <div className="flex items-center justify-between text-xs font-space-mono text-[var(--text-muted)] mb-1">
                    <span>HORSEPOWER</span>
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                  </div>
                  <div className="text-3xl sm:text-4xl font-space-mono font-black text-[var(--text-primary)]">
                    {stageData.hp}
                    <span className="text-xs font-normal text-[var(--text-muted)] ml-1">BHP</span>
                  </div>
                  <div className="mt-2 text-[11px] font-space-mono text-emerald-400 flex items-center gap-1">
                    <span>+{stageData.hp - 720} BHP GAIN</span>
                  </div>
                </div>

                {/* Torque */}
                <div className="p-4 rounded-2xl bg-[var(--bg-primary)]/80 border border-[var(--border-color)] relative overflow-hidden group">
                  <div className="flex items-center justify-between text-xs font-space-mono text-[var(--text-muted)] mb-1">
                    <span>TORQUE</span>
                    <Flame className="w-3.5 h-3.5 text-rose-400" />
                  </div>
                  <div className="text-3xl sm:text-4xl font-space-mono font-black text-[var(--text-primary)]">
                    {stageData.torque}
                    <span className="text-xs font-normal text-[var(--text-muted)] ml-1">NM</span>
                  </div>
                  <div className="mt-2 text-[11px] font-space-mono text-emerald-400 flex items-center gap-1">
                    <span>+{stageData.torque - 850} NM GAIN</span>
                  </div>
                </div>

                {/* 0-100 kph */}
                <div className="p-4 rounded-2xl bg-[var(--bg-primary)]/80 border border-[var(--border-color)] relative overflow-hidden group">
                  <div className="flex items-center justify-between text-xs font-space-mono text-[var(--text-muted)] mb-1">
                    <span>0-100 KM/H</span>
                    <Gauge className="w-3.5 h-3.5 text-[var(--accent-cyan)]" />
                  </div>
                  <div className="text-3xl sm:text-4xl font-space-mono font-black text-[var(--accent-cyan)]">
                    {stageData.acceleration}
                    <span className="text-xs font-normal text-[var(--text-muted)] ml-1">SEC</span>
                  </div>
                  <div className="mt-2 text-[11px] font-space-mono text-emerald-400 flex items-center gap-1">
                    <span>{(2.95 - stageData.acceleration).toFixed(2)}s FASTER</span>
                  </div>
                </div>

                {/* Top Speed */}
                <div className="p-4 rounded-2xl bg-[var(--bg-primary)]/80 border border-[var(--border-color)] relative overflow-hidden group">
                  <div className="flex items-center justify-between text-xs font-space-mono text-[var(--text-muted)] mb-1">
                    <span>TOP SPEED</span>
                    <Award className="w-3.5 h-3.5 text-sky-400" />
                  </div>
                  <div className="text-3xl sm:text-4xl font-space-mono font-black text-[var(--text-primary)]">
                    {stageData.topSpeed}
                    <span className="text-xs font-normal text-[var(--text-muted)] ml-1">KM/H</span>
                  </div>
                  <div className="mt-2 text-[11px] font-space-mono text-emerald-400 flex items-center gap-1">
                    <span>+{stageData.topSpeed - 340} KM/H TOP</span>
                  </div>
                </div>
              </div>

              {/* Action: Test Dyno Pull Sound Burst */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  id="dyno-pull-audio-btn"
                  onClick={handleTestDynoPull}
                  disabled={isPulling}
                  className={`flex-1 py-3 px-5 rounded-2xl text-xs sm:text-sm font-space-mono uppercase font-bold transition-all flex items-center justify-center gap-2 cursor-pointer border ${
                    isPulling
                      ? 'bg-rose-500 text-white border-rose-400 shadow-[0_0_30px_rgba(244,63,94,0.6)] animate-pulse'
                      : 'bg-gradient-to-r from-[var(--accent-cyan)] to-blue-600 text-black border-transparent hover:opacity-95 shadow-[0_0_20px_var(--accent-glow)]'
                  }`}
                >
                  <Play className={`w-4 h-4 ${isPulling ? 'animate-spin' : ''}`} />
                  <span>{isPulling ? 'SIMULATING 9,200 RPM PULL...' : 'Test Dyno Pull Audio'}</span>
                </button>

                <button
                  id="book-dyno-stage-btn"
                  onClick={() => onBookService(`${stageData.title} Tuning Calibration`)}
                  className="py-3 px-6 rounded-2xl text-xs sm:text-sm font-space-mono uppercase font-bold bg-[var(--bg-card)] border border-[var(--border-highlight)] text-[var(--accent-cyan)] hover:bg-[var(--accent-cyan)] hover:text-black transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                >
                  <span>Book Flash</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right 7 Cols: Interactive SVG Dyno Power & Torque Curve Visualizer */}
            <div className="lg:col-span-7 bg-[var(--bg-primary)]/80 p-5 sm:p-7 rounded-2xl border border-[var(--border-color)] space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border-color)] pb-3 text-xs font-space-mono">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5 text-rose-400 font-bold">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                    BHP CURVE (POWER)
                  </span>
                  <span className="flex items-center gap-1.5 text-[var(--accent-cyan)] font-bold">
                    <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent-cyan)]" />
                    TORQUE (NM)
                  </span>
                </div>
                <div className="text-[var(--text-muted)] text-[11px]">
                  PEAK BOOST: <span className="text-[var(--accent-cyan)] font-bold">{stageData.boostBar} BAR</span>
                </div>
              </div>

              {/* Dynamic SVG Dyno Chart with animated gradient fills */}
              <div className="relative w-full h-56 sm:h-64">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 500 220">
                  <defs>
                    <linearGradient id="hpGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#ff2a54" stopOpacity="0.45" />
                      <stop offset="100%" stopColor="#ff2a54" stopOpacity="0.0" />
                    </linearGradient>
                    <linearGradient id="tqGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#00f2fe" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#00f2fe" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Grid Lines */}
                  {[40, 90, 140, 190].map((y) => (
                    <line key={y} x1="20" y1={y} x2="480" y2={y} stroke="currentColor" strokeOpacity="0.1" strokeDasharray="3 3" />
                  ))}
                  {[100, 200, 300, 400].map((x) => (
                    <line key={x} x1={x} y1="20" x2={x} y2="195" stroke="currentColor" strokeOpacity="0.1" strokeDasharray="3 3" />
                  ))}

                  {/* Dynamic Power Curves Calculated based on stage multipliers */}
                  {(() => {
                    const mult = stageData.hp / 1280;
                    const cp1Y = Math.round(165 - 55 * mult);
                    const cp2Y = Math.round(110 - 75 * mult);
                    const endHpY = Math.round(55 - 35 * mult);

                    const tqCp1Y = Math.round(120 - 60 * mult);
                    const tqCp2Y = Math.round(80 - 50 * mult);
                    const endTqY = Math.round(125 - 40 * mult);

                    const hpPath = `M 30 185 C 160 ${cp1Y}, 320 ${cp2Y}, 460 ${endHpY}`;
                    const hpArea = `${hpPath} L 460 195 L 30 195 Z`;

                    const tqPath = `M 30 170 C 140 ${tqCp1Y}, 290 ${tqCp2Y}, 460 ${endTqY}`;
                    const tqArea = `${tqPath} L 460 195 L 30 195 Z`;

                    return (
                      <>
                        <path d={tqArea} fill="url(#tqGrad)" className="transition-all duration-700 ease-out" />
                        <path d={tqPath} fill="none" stroke="#00f2fe" strokeWidth="3" className="transition-all duration-700 ease-out" />

                        <path d={hpArea} fill="url(#hpGrad)" className="transition-all duration-700 ease-out" />
                        <path d={hpPath} fill="none" stroke="#ff2a54" strokeWidth="3.5" className="transition-all duration-700 ease-out" />

                        {/* Peak Power Indicator Dot */}
                        <circle cx="460" cy={endHpY} r="5" fill="#ff2a54" className="animate-ping opacity-75" />
                        <circle cx="460" cy={endHpY} r="4" fill="#ff2a54" stroke="#ffffff" strokeWidth="1.5" />
                      </>
                    );
                  })()}

                  {/* RPM Axis Labels */}
                  <text x="30" y="212" fill="currentColor" opacity="0.5" fontSize="10" fontFamily="Space Mono">2,000 RPM</text>
                  <text x="140" y="212" fill="currentColor" opacity="0.5" fontSize="10" fontFamily="Space Mono">4,000</text>
                  <text x="250" y="212" fill="currentColor" opacity="0.5" fontSize="10" fontFamily="Space Mono">6,000</text>
                  <text x="360" y="212" fill="currentColor" opacity="0.5" fontSize="10" fontFamily="Space Mono">8,000</text>
                  <text x="440" y="212" fill="#ff2a54" fontWeight="bold" fontSize="10" fontFamily="Space Mono">{stageData.redline}</text>
                </svg>
              </div>

              {/* Bottom Specs Strip: Downforce & Braking */}
              <div className="pt-3 border-t border-[var(--border-color)] grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-space-mono">
                <div>
                  <div className="text-[var(--text-muted)] text-[10px]">AERO DOWNFORCE</div>
                  <div className="font-bold text-[var(--text-primary)]">{stageData.downforce} KG @ 250 KM/H</div>
                </div>
                <div>
                  <div className="text-[var(--text-muted)] text-[10px]">100-0 KM/H BRAKING</div>
                  <div className="font-bold text-emerald-400">{stageData.braking} METERS</div>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <div className="text-[var(--text-muted)] text-[10px]">CALIBRATION</div>
                  <div className="font-bold text-[var(--accent-cyan)] truncate">{stageData.calibration}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
