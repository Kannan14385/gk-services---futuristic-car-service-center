import React, { useState } from 'react';
import { ExternalLink, Maximize2, Minimize2, RefreshCw, Sparkles, Shield, Compass, Layers, Info } from 'lucide-react';
import { CAR_HOTSPOTS } from '../data/mockCarData';
import { CarHotspot } from '../types';

interface SketchfabCarViewerProps {
  onSelectHotspot: (hotspot: CarHotspot) => void;
}

export const SketchfabCarViewer: React.FC<SketchfabCarViewerProps> = ({ onSelectHotspot }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Sketchfab model ID from the user's provided link:
  // https://sketchfab.com/3d-models/sports-car-dba4f043e0974054b5756d601ff5c256
  const modelId = 'dba4f043e0974054b5756d601ff5c256';
  const embedUrl = `https://sketchfab.com/models/${modelId}/embed?autostart=1&internal=1&tracking=0&ui_infos=0&ui_snapshots=0&ui_stop=0&ui_watermark=0&ui_theme=dark&dnt=1`;

  const reloadIframe = () => {
    setIsLoading(true);
    setIframeKey((prev) => prev + 1);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div
      id="sketchfab-viewer-container"
      className={`relative w-full flex flex-col transition-all duration-300 ${
        isFullscreen
          ? 'fixed inset-0 z-[99999] bg-[#080a10] p-4 sm:p-6 flex flex-col justify-between'
          : 'h-[540px] sm:h-[620px] md:h-[680px]'
      }`}
    >
      {/* Top HUD Telemetry Bar */}
      <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        {/* Left Telemetry: Model badge from the user's requested link */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--bg-card)]/90 border border-[var(--border-color)] shadow-lg backdrop-blur-md pointer-events-auto text-xs font-mono-tech">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-bold text-[var(--text-primary)] uppercase">SPORTS CAR · 3D MODEL</span>
          <span className="text-[var(--accent-cyan)] font-semibold hidden sm:inline">· SKETCHFAB WEBGL</span>
        </div>

        {/* Right HUD Controls: Reload, External Source, Fullscreen */}
        <div className="flex items-center gap-2 pointer-events-auto">
          {/* Reload 3D Scene */}
          <button
            id="reload-3d-model-btn"
            onClick={reloadIframe}
            className="p-2 rounded-xl bg-[var(--bg-card)]/90 border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] hover:border-[var(--accent-cyan)] transition-all cursor-pointer backdrop-blur-md shadow-sm"
            title="Reload 3D Model Scene"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          {/* Direct link to the official Sketchfab 3D Model */}
          <a
            id="sketchfab-original-link"
            href="https://sketchfab.com/3d-models/sports-car-dba4f043e0974054b5756d601ff5c256"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-xl bg-[var(--bg-card)]/90 border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] hover:border-[var(--accent-cyan)] transition-all flex items-center gap-1.5 text-xs font-mono-tech cursor-pointer backdrop-blur-md shadow-sm"
            title="View Original Sports Car Model on Sketchfab"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[var(--accent-cyan)]" />
            <span className="hidden sm:inline">Sketchfab Source</span>
          </a>

          {/* Expand Fullscreen */}
          <button
            id="toggle-3d-fullscreen-btn"
            onClick={toggleFullscreen}
            className="p-2 rounded-xl bg-[var(--bg-card)]/90 border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] hover:border-[var(--accent-cyan)] transition-all cursor-pointer backdrop-blur-md shadow-sm"
            title={isFullscreen ? 'Exit Fullscreen' : 'Expand 3D Stage'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4 text-[var(--accent-cyan)]" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* 3D WebGL Embedded Canvas Frame */}
      <div className="relative w-full flex-1 rounded-2xl overflow-hidden bg-[#0a0d16] border border-[var(--border-color)]">
        {/* Loading Spinner Indicator */}
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#080a10]/90 z-10 text-center p-4">
            <div className="w-12 h-12 rounded-full border-2 border-[var(--accent-cyan)]/20 border-t-[var(--accent-cyan)] animate-spin mb-4" />
            <span className="text-xs font-mono-tech tracking-widest text-[var(--accent-cyan)] uppercase font-semibold">
              INITIALIZING 3D WEBGL SPORTS CAR MODEL...
            </span>
            <span className="text-[11px] font-mono-tech text-[var(--text-secondary)] mt-1">
              Loading textures, materials & spatial geometry
            </span>
          </div>
        )}

        <iframe
          key={iframeKey}
          id="sketchfab-sports-car-iframe"
          title="Sports Car 3D Model"
          src={embedUrl}
          className="w-full h-full border-0 select-none"
          allow="autoplay; fullscreen; xr-spatial-tracking"
          allowFullScreen
          onLoad={() => setIsLoading(false)}
        />
      </div>

      {/* Interactive Telemetry Diagnostic Bar Below The 3D Model */}
      <div className="p-3 sm:p-4 bg-[var(--bg-card-subtle)] border-t border-[var(--border-color)] flex flex-wrap items-center justify-between gap-3 text-xs font-mono-tech">
        <div className="flex items-center gap-2 text-[var(--text-secondary)]">
          <Compass className="w-4 h-4 text-[var(--accent-cyan)] animate-spin-slow" />
          <span>
            3D CONTROLS: <strong>Drag</strong> to Orbit 360° · <strong>Scroll</strong> to Zoom · <strong>Right-Click</strong> to Pan
          </span>
        </div>

        {/* Quick Diagnostic Inspection Hotspots */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider hidden lg:inline">
            Telemetry Diagnostics:
          </span>
          {CAR_HOTSPOTS.map((hotspot) => (
            <button
              key={hotspot.id}
              id={`quick-inspect-${hotspot.id}`}
              onClick={() => onSelectHotspot(hotspot)}
              className="px-2.5 py-1 rounded-lg bg-[var(--bg-card)] border border-[var(--border-color)] hover:border-[var(--accent-cyan)] text-[var(--text-primary)] hover:text-[var(--accent-cyan)] text-[11px] font-mono-tech transition-all flex items-center gap-1.5 cursor-pointer"
              title={`Inspect condition data for ${hotspot.name}`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-cyan)]" />
              <span>{hotspot.part.split(' ')[0]}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
