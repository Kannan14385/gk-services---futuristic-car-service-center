import React from 'react';
import { Cpu, ShieldCheck, Gauge, Disc, Radio, Flame, ArrowRight, Sparkles, Sliders } from 'lucide-react';
import { SERVICE_PILLARS } from '../data/mockCarData';

interface ServicesSectionProps {
  onBookService: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onBookService }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu':
        return <Cpu className="w-6 h-6 text-[var(--accent-cyan)]" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-[var(--accent-cyan)]" />;
      case 'Gauge':
        return <Gauge className="w-6 h-6 text-[var(--accent-cyan)]" />;
      case 'Disc':
        return <Disc className="w-6 h-6 text-[var(--accent-cyan)]" />;
      case 'Radio':
        return <Radio className="w-6 h-6 text-[var(--accent-cyan)]" />;
      case 'Flame':
        return <Flame className="w-6 h-6 text-[var(--accent-cyan)]" />;
      default:
        return <Sparkles className="w-6 h-6 text-[var(--accent-cyan)]" />;
    }
  };

  return (
    <section
      id="services"
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-b border-[var(--border-color)] bg-[var(--bg-primary)] cyber-radial-glow overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--accent-cyan)] text-xs font-mono-tech uppercase tracking-widest mb-3">
              <Sliders className="w-3.5 h-3.5" />
              <span>Section 03 · Engineering Matrix</span>
            </div>
            <h2 className="gk-font-h2 font-primary font-black tracking-tight text-[var(--text-primary)]">
              CORE ENGINEERING & <span className="text-[var(--accent-cyan)]">DIAGNOSTICS</span>
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[var(--text-secondary)] max-w-2xl font-rajdhani font-medium tracking-wide">
              Every procedure executed at GK Services follows strict aerospace tolerances. Discover our 6 foundational maintenance pillars calibrated to eliminate mechanical failure.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono-tech text-[var(--text-secondary)]">
              ALL PROTOCOLS BACKED BY GK ZERO-TOLERANCE GUARANTEE
            </span>
          </div>
        </div>

        {/* 6 Service Cards with y-axis -30px Hover Lift (Requirement 8) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICE_PILLARS.map((service) => (
            <div
              key={service.id}
              id={`service-card-${service.id}`}
              className="gk-hover-lift group relative rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] p-6 flex flex-col justify-between overflow-hidden shadow-md"
            >
              {/* Corner Sci-Fi Tech Accent */}
              <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden pointer-events-none">
                <div className="absolute transform rotate-45 bg-[var(--accent-cyan)]/20 text-[9px] font-mono-tech text-[var(--accent-cyan)] text-center w-20 top-2 -right-6 py-0.5 border-b border-[var(--accent-cyan)]/40">
                  {service.code}
                </div>
              </div>

              <div>
                {/* Header with Icon & Accuracy Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] shadow-sm group-hover:scale-110 group-hover:border-[var(--accent-cyan)] transition-all duration-300">
                    {getIcon(service.iconName)}
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] font-mono-tech text-[var(--text-secondary)] uppercase block">
                      TOLERANCE
                    </span>
                    <span className="text-xs font-mono-tech text-[var(--accent-cyan)] font-bold">
                      {service.accuracy}
                    </span>
                  </div>
                </div>

                <h3 className="font-primary font-bold text-lg text-[var(--text-primary)] group-hover:text-[var(--accent-cyan)] transition-colors">
                  {service.title}
                </h3>
                <p className="text-xs font-mono-tech text-[var(--accent-cyan)] mt-1 mb-3">
                  {service.subtitle}
                </p>

                <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-5">
                  {service.description}
                </p>

                {/* Specs List */}
                <div className="space-y-2 py-3 border-y border-[var(--border-color)]">
                  {service.specs.map((spec, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-mono-tech text-[var(--text-secondary)]">
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-cyan)]" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer with Price, Turnaround & Universal Button (Requirement 5) */}
              <div className="mt-6 pt-3 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono-tech text-[var(--text-secondary)] uppercase block">
                    INVESTMENT
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="font-primary font-bold text-lg text-[var(--text-primary)]">
                      {service.priceStarting}
                    </span>
                    <span className="text-[10px] font-mono-tech text-[var(--text-secondary)]">
                      / {service.turnaround}
                    </span>
                  </div>
                </div>

                <button
                  id={`book-service-${service.id}`}
                  onClick={() => onBookService(service.title)}
                  className="gk-btn text-xs py-2 px-4"
                >
                  <span>Book Protocol</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
