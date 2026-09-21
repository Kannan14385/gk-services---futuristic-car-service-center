import React, { useState } from 'react';
import { X, CheckCircle, AlertTriangle, Cpu, ArrowRight, Sparkles } from 'lucide-react';
import { CarHotspot } from '../types';

interface BeforeAfterModalProps {
  hotspot: CarHotspot | null;
  onClose: () => void;
  onBookService: (serviceName: string) => void;
}

export const BeforeAfterModal: React.FC<BeforeAfterModalProps> = ({
  hotspot,
  onClose,
  onBookService,
}) => {
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'interactive' | 'side-by-side'>('interactive');

  if (!hotspot) return null;

  const handleSliderMove = (clientX: number, rect: DOMRect) => {
    const x = clientX - rect.left;
    const pos = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(pos);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const rect = e.currentTarget.getBoundingClientRect();
    handleSliderMove(e.clientX, rect);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    if (e.touches[0]) {
      handleSliderMove(e.touches[0].clientX, rect);
    }
  };

  return (
    <div
      id="before-after-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/80 backdrop-blur-xl animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        id="before-after-modal-container"
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Futuristic Modal Header */}
        <div className="relative px-5 py-4 border-b border-[var(--border-color)] flex items-center justify-between bg-[var(--bg-card-subtle)]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--accent-cyan)]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono-tech uppercase tracking-widest text-[var(--accent-cyan)] bg-[var(--accent-cyan)]/15 px-2 py-0.5 rounded border border-[var(--border-color)]">
                  {hotspot.category}
                </span>
                <span className="text-[10px] font-mono-tech text-[var(--text-secondary)]">
                  TARGET: {hotspot.part}
                </span>
              </div>
              <h2 className="font-primary font-bold text-lg sm:text-xl text-[var(--text-primary)] mt-0.5">
                {hotspot.name}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* View Mode Toggle */}
            <div className="hidden sm:flex items-center bg-[var(--bg-primary)] p-0.5 rounded-lg border border-[var(--border-color)]">
              <button
                onClick={() => setViewMode('interactive')}
                className={`px-2.5 py-1 text-xs font-mono-tech rounded ${
                  viewMode === 'interactive' ? 'bg-[var(--accent-cyan)] text-white font-semibold' : 'text-[var(--text-secondary)]'
                }`}
              >
                Reveal Slider
              </button>
              <button
                onClick={() => setViewMode('side-by-side')}
                className={`px-2.5 py-1 text-xs font-mono-tech rounded ${
                  viewMode === 'side-by-side' ? 'bg-[var(--accent-cyan)] text-white font-semibold' : 'text-[var(--text-secondary)]'
                }`}
              >
                Side-by-Side
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] hover:border-[var(--accent-cyan)] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-5 sm:p-6 space-y-6">
          {/* Comparison Viewer: Interactive Split Slider Mode */}
          {viewMode === 'interactive' ? (
            <div className="space-y-3">
              <div
                className="relative h-64 sm:h-80 md:h-96 rounded-xl overflow-hidden cursor-ew-resize select-none border border-[var(--border-color)] shadow-inner"
                onMouseDown={() => setIsDragging(true)}
                onMouseUp={() => setIsDragging(false)}
                onMouseLeave={() => setIsDragging(false)}
                onMouseMove={handleMouseMove}
                onTouchStart={() => setIsDragging(true)}
                onTouchEnd={() => setIsDragging(false)}
                onTouchMove={handleTouchMove}
              >
                {/* AFTER Image (Full background layer) */}
                <div className="absolute inset-0">
                  <img
                    src={hotspot.after.image}
                    alt="After Enhancement"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute bottom-3 right-3 px-3 py-1 rounded bg-black/80 border border-emerald-500 text-xs font-mono-tech text-emerald-400">
                    AFTER: {hotspot.after.conditionScore}% RESTORED
                  </div>
                </div>

                {/* BEFORE Image (Clipped overlay layer) */}
                <div
                  className="absolute inset-y-0 left-0 overflow-hidden border-r-2 border-[var(--accent-cyan)] shadow-[0_0_20px_var(--accent-glow)]"
                  style={{ width: `${sliderPosition}%` }}
                >
                  <div className="relative w-full h-full" style={{ width: '100%', minWidth: '100%' }}>
                    <img
                      src={hotspot.before.image}
                      alt="Before Enhancement"
                      referrerPolicy="no-referrer"
                      className="absolute top-0 left-0 w-full h-full object-cover object-center"
                    />
                    <div className="absolute bottom-3 left-3 px-3 py-1 rounded bg-black/80 border border-rose-500 text-xs font-mono-tech text-rose-400">
                      BEFORE: {hotspot.before.conditionScore}% DEGRADED
                    </div>
                  </div>
                </div>

                {/* Slider Handle Divider Knob */}
                <div
                  className="absolute top-0 bottom-0 -translate-x-1/2 flex items-center justify-center pointer-events-none"
                  style={{ left: `${sliderPosition}%` }}
                >
                  <div className="w-9 h-9 rounded-full bg-[var(--accent-cyan)] text-white flex items-center justify-center shadow-[0_0_25px_var(--accent-glow)] font-mono-tech text-xs font-bold">
                    ⇄
                  </div>
                </div>
              </div>

              {/* Slider Scrub Bar */}
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono-tech text-rose-400 font-semibold">BEFORE (0%)</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderPosition}
                  onChange={(e) => setSliderPosition(Number(e.target.value))}
                  className="w-full accent-[var(--accent-cyan)] cursor-pointer"
                />
                <span className="text-xs font-mono-tech text-emerald-400 font-semibold">AFTER (100%)</span>
              </div>
            </div>
          ) : (
            /* Side-by-Side Mode */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl overflow-hidden border border-rose-500/40 relative">
                <img
                  src={hotspot.before.image}
                  alt="Before condition"
                  referrerPolicy="no-referrer"
                  className="w-full h-56 object-cover"
                />
                <div className="p-3 bg-[var(--bg-card-subtle)] border-t border-rose-500/30">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono-tech text-rose-400 font-bold">BEFORE CONDITION</span>
                    <span className="text-xs font-mono-tech text-rose-400">{hotspot.before.conditionScore}%</span>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] mt-1">{hotspot.before.status}</p>
                </div>
              </div>

              <div className="rounded-xl overflow-hidden border border-emerald-500/40 relative">
                <img
                  src={hotspot.after.image}
                  alt="After restoration"
                  referrerPolicy="no-referrer"
                  className="w-full h-56 object-cover"
                />
                <div className="p-3 bg-[var(--bg-card-subtle)] border-t border-emerald-500/30">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono-tech text-emerald-400 font-bold">AFTER RESTORATION</span>
                    <span className="text-xs font-mono-tech text-emerald-400">{hotspot.after.conditionScore}%</span>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] mt-1">{hotspot.after.status}</p>
                </div>
              </div>
            </div>
          )}

          {/* Diagnostic Metrics Matrix: Before vs After Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Before Metrics */}
            <div className="p-4 rounded-xl bg-rose-950/15 border border-rose-500/30">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono-tech text-rose-400 uppercase font-semibold flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                  PRE-INSPECTION ANOMALIES
                </span>
                <span className="text-sm font-primary font-bold text-rose-400">
                  {hotspot.before.conditionScore}% RATING
                </span>
              </div>
              <p className="text-xs text-[var(--text-secondary)] mb-3">{hotspot.before.status}</p>
              <div className="space-y-2 text-xs font-mono-tech">
                <div className="flex justify-between py-1 border-b border-rose-500/20 text-[var(--text-secondary)]">
                  <span>WEAR LEVEL:</span>
                  <span className="text-rose-400">{hotspot.before.telemetry.wearLevel}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-rose-500/20 text-[var(--text-secondary)]">
                  <span>THERMAL RESISTANCE:</span>
                  <span className="text-rose-400">{hotspot.before.telemetry.thermalStress}</span>
                </div>
                <div className="flex justify-between py-1 text-[var(--text-secondary)]">
                  <span>TOLERANCE DELTA:</span>
                  <span className="text-rose-400">{hotspot.before.telemetry.toleranceDelta}</span>
                </div>
              </div>
            </div>

            {/* After Metrics */}
            <div className="p-4 rounded-xl bg-emerald-950/15 border border-emerald-500/30">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono-tech text-emerald-400 uppercase font-semibold flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  POST-SERVICE ENHANCEMENT
                </span>
                <span className="text-sm font-primary font-bold text-emerald-400">
                  {hotspot.after.conditionScore}% RATING
                </span>
              </div>
              <p className="text-xs text-[var(--text-secondary)] mb-3">{hotspot.after.status}</p>
              <div className="space-y-2 text-xs font-mono-tech">
                <div className="flex justify-between py-1 border-b border-emerald-500/20 text-[var(--text-secondary)]">
                  <span>WEAR LEVEL:</span>
                  <span className="text-emerald-400">{hotspot.after.telemetry.wearLevel}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-emerald-500/20 text-[var(--text-secondary)]">
                  <span>THERMAL RESISTANCE:</span>
                  <span className="text-emerald-400">{hotspot.after.telemetry.thermalStress}</span>
                </div>
                <div className="flex justify-between py-1 text-[var(--text-secondary)]">
                  <span>TOLERANCE DELTA:</span>
                  <span className="text-emerald-400">{hotspot.after.telemetry.toleranceDelta}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Technician Protocol & Specifications */}
          <div className="p-4 rounded-xl bg-[var(--bg-card-subtle)] border border-[var(--border-color)] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono-tech text-[var(--accent-cyan)]">
                <Cpu className="w-4 h-4" />
                <span>GK PROTOCOL CERTIFICATION</span>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono-tech text-[var(--text-secondary)]">
                <span>WARRANTY: <strong className="text-[var(--text-primary)]">{hotspot.warranty}</strong></span>
                <span>TIME: <strong className="text-[var(--text-primary)]">{hotspot.estimatedEnhancementTime}</strong></span>
              </div>
            </div>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              <strong className="text-[var(--text-primary)]">Technician Laboratory Log: </strong>
              {hotspot.techNotes}
            </p>
          </div>
        </div>

        {/* Modal Footer CTA */}
        <div className="px-5 py-4 border-t border-[var(--border-color)] bg-[var(--bg-card-subtle)] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs font-mono-tech text-[var(--text-secondary)]">
            RECOMMENDED PROTOCOL: <span className="text-[var(--accent-cyan)] font-semibold">{hotspot.serviceName}</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-1/2 sm:w-auto px-4 py-2 text-xs font-mono-tech text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
            >
              Close Telemetry
            </button>
            <button
              id="book-enhancement-service-btn"
              onClick={() => {
                onBookService(hotspot.serviceName);
                onClose();
              }}
              className="gk-btn w-1/2 sm:w-auto text-xs py-2 px-5"
            >
              <span>Schedule Enhancement</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
