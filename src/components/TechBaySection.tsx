import React, { useState } from 'react';
import { Radio, Activity, Cpu, Thermometer, ShieldCheck, Play, CheckCircle, Terminal } from 'lucide-react';
import { TECH_CHAMBERS } from '../data/mockCarData';

export const TechBaySection: React.FC = () => {
  const [activeChamberId, setActiveChamberId] = useState<string>(TECH_CHAMBERS[0].id);

  const activeChamber = TECH_CHAMBERS.find((c) => c.id === activeChamberId) || TECH_CHAMBERS[0];

  return (
    <section
      id="technology"
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-b border-[var(--border-color)] bg-[var(--bg-primary)] cyber-grid overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--accent-cyan)] text-xs font-mono-tech uppercase tracking-widest mb-3">
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              <span>Section 04 · Autonomous Infrastructure</span>
            </div>
            <h2 className="gk-font-h2 font-primary font-black tracking-tight text-[var(--text-primary)]">
              ROBOTIC BAYS & <span className="text-[var(--accent-cyan)]">CLEANROOM STACK</span>
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[var(--text-secondary)] max-w-2xl font-rajdhani font-medium tracking-wide">
              Step inside our four hermetically sealed robotics chambers. Real-time air purification, infrared curing grids, and automated multi-axis LiDAR gantries execute maintenance without human contamination.
            </p>
          </div>

          {/* Chamber Switcher Tabs */}
          <div className="flex flex-wrap gap-2 p-1.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)]">
            {TECH_CHAMBERS.map((chamber) => (
              <button
                key={chamber.id}
                id={`chamber-tab-${chamber.id}`}
                onClick={() => setActiveChamberId(chamber.id)}
                className={`px-3 py-2 text-xs font-mono-tech uppercase rounded-lg transition-all flex items-center gap-2 ${
                  chamber.id === activeChamberId
                    ? 'bg-[var(--accent-cyan)] text-white font-bold shadow-[0_0_15px_var(--accent-glow)]'
                    : 'text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] hover:bg-[var(--accent-cyan)]/10'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${chamber.status === 'ACTIVE' ? 'bg-emerald-400 animate-ping' : 'bg-[var(--accent-cyan)]'}`} />
                <span>{chamber.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Chamber Display Box with -30px Hover Lift (Requirement 8) */}
        <div
          id="chamber-active-container"
          className="gk-hover-lift relative rounded-3xl bg-[var(--bg-card)] border border-[var(--border-color)] p-6 sm:p-10 shadow-lg"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Side: Chamber Telemetry & Description */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded bg-[var(--bg-primary)] border border-[var(--border-color)] text-xs font-mono-tech text-[var(--accent-cyan)]">
                  {activeChamber.codename}
                </span>
                <span className="flex items-center gap-1 text-xs font-mono-tech text-emerald-400">
                  <CheckCircle className="w-3.5 h-3.5" />
                  STATUS: {activeChamber.status}
                </span>
              </div>

              <h3 className="font-primary font-bold text-2xl sm:text-3xl text-[var(--text-primary)]">
                {activeChamber.name}
              </h3>

              <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                {activeChamber.description}
              </p>

              {/* Environmental Sensor Stats */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[var(--border-color)]">
                <div className="p-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)]">
                  <span className="text-[10px] font-mono-tech text-[var(--text-secondary)] block uppercase">
                    SCAN PRECISION
                  </span>
                  <span className="font-primary font-bold text-sm sm:text-base text-[var(--accent-cyan)]">
                    {activeChamber.scanPrecision}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)]">
                  <span className="text-[10px] font-mono-tech text-[var(--text-secondary)] block uppercase">
                    ENVIRONMENT TEMP
                  </span>
                  <span className="font-primary font-bold text-sm sm:text-base text-amber-400">
                    {activeChamber.temperature}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)]">
                  <span className="text-[10px] font-mono-tech text-[var(--text-secondary)] block uppercase">
                    AIR PURITY
                  </span>
                  <span className="font-primary font-bold text-sm sm:text-base text-emerald-400">
                    {activeChamber.atmosphere}
                  </span>
                </div>
              </div>

              {/* Hardware Features Bullet List */}
              <div className="space-y-2.5 pt-2">
                <span className="text-xs font-mono-tech text-[var(--accent-cyan)] uppercase block">
                  DEPLOYED SUBSYSTEMS
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeChamber.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-mono-tech text-[var(--text-secondary)]">
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-cyan)]" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Side: Chamber Live Telemetry Terminal */}
            <div className="lg:col-span-5 relative">
              <div className="rounded-2xl bg-[var(--bg-card-subtle)] border border-[var(--border-color)] p-5 shadow-inner">
                {/* Simulated Terminal Header */}
                <div className="flex items-center justify-between pb-3 border-b border-[var(--border-color)] text-xs font-mono-tech text-[var(--text-secondary)]">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-3.5 h-3.5 text-[var(--accent-cyan)]" />
                    <span className="text-[var(--text-primary)] font-semibold">TERMINAL://GK-CHAMBER-STREAM</span>
                  </div>
                  <span className="text-emerald-400">ONLINE</span>
                </div>

                {/* Telemetry Metrics Gauges */}
                <div className="py-6 space-y-4">
                  {activeChamber.telemetryMetrics.map((metric, i) => (
                    <div key={i} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs font-mono-tech">
                        <span className="text-[var(--text-secondary)]">{metric.label}</span>
                        <span className="font-primary text-[var(--accent-cyan)] font-bold">
                          {metric.value} <span className="text-xs text-[var(--text-secondary)] font-normal">{metric.unit}</span>
                        </span>
                      </div>
                      {/* Animated Laser Bar */}
                      <div className="w-full h-1.5 bg-[var(--bg-primary)] rounded-full overflow-hidden border border-[var(--border-color)]">
                        <div
                          className="h-full bg-gradient-to-r from-[var(--accent-cyan)] to-sky-400 rounded-full"
                          style={{ width: `${65 + i * 14}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Chamber Live Video Feed Placeholder with Laser Scan Lines */}
                <div className="relative h-44 rounded-xl overflow-hidden border border-[var(--border-color)] bg-black/80 flex items-center justify-center">
                  <img
                    src="https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=800&q=80"
                    alt="Autonomous Robotic Chamber Feed"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover opacity-60"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
                  
                  {/* Glowing Laser Scan Line */}
                  <div className="absolute inset-x-0 h-[2px] bg-[var(--accent-cyan)] shadow-[0_0_10px_var(--accent-cyan)] animate-bounce top-1/3" />

                  <div className="absolute top-2 left-2 text-[10px] font-mono-tech text-emerald-400 bg-black/80 px-2 py-0.5 rounded border border-emerald-500/30">
                    REC · CAM_BAY_0{activeChamber.id.slice(-1)}
                  </div>
                  <div className="absolute bottom-2 right-2 text-[10px] font-mono-tech text-[var(--accent-cyan)] bg-black/80 px-2 py-0.5 rounded">
                    LASER SPECTROMETRY ACTIVE
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
