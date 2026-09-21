import React, { useState, useRef, useEffect } from 'react';
import { RotateCw, Play, Pause, Compass, Sparkles, Layers, Maximize2, Crosshair, ChevronRight, ArrowUp, ArrowDown, Eye, Sliders, RefreshCw, ZoomIn, ZoomOut, Box, Car, Shield, Gauge, Zap, CheckCircle2 } from 'lucide-react';
import { SINGLE_CAR_MODELS, CAR_HOTSPOTS, STUDIO_CAR_GALLERY } from '../data/mockCarData';
import { CarHotspot, ElevationView, GalleryCar } from '../types';
import { Car3DCanvas } from './Car3DCanvas';
import { SketchfabCarViewer } from './SketchfabCarViewer';

interface Car360ViewerProps {
  onSelectHotspot: (hotspot: CarHotspot) => void;
}

export const Car360Viewer: React.FC<Car360ViewerProps> = ({ onSelectHotspot }) => {
  const [displayEngine, setDisplayEngine] = useState<'sketchfab' | 'multiAxis' | '3d'>('sketchfab');
  const [elevation, setElevation] = useState<ElevationView>('orbit');
  const [selectedCarId, setSelectedCarId] = useState<string>('car-apex-1');
  const [galleryCategory, setGalleryCategory] = useState<string>('ALL');
  const [currentAngleIndex, setCurrentAngleIndex] = useState<number>(0);
  const [isAutoRotating, setIsAutoRotating] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [startY, setStartY] = useState<number>(0);
  const [hudWireframeMode, setHudWireframeMode] = useState<boolean>(false);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoRotateTimerRef = useRef<number | null>(null);

  // Active vehicle from Fleet Gallery
  const activeCar: GalleryCar = STUDIO_CAR_GALLERY.find((c) => c.id === selectedCarId) || STUDIO_CAR_GALLERY[0];
  const orbitAngles = activeCar.orbit;
  const totalAngles = orbitAngles.length;
  const currentView = orbitAngles[Math.min(currentAngleIndex, totalAngles - 1)] || orbitAngles[0];
  const currentAngleDeg = currentView.angle;

  // Filtered gallery cars
  const filteredCars = galleryCategory === 'ALL'
    ? STUDIO_CAR_GALLERY
    : STUDIO_CAR_GALLERY.filter((car) => car.category.toUpperCase() === galleryCategory.toUpperCase());

  // Auto-rotation loop (only active during orbit elevation)
  useEffect(() => {
    if (isAutoRotating && elevation === 'orbit') {
      autoRotateTimerRef.current = window.setInterval(() => {
        setCurrentAngleIndex((prev) => (prev + 1) % totalAngles);
      }, 1700);
    } else if (autoRotateTimerRef.current) {
      clearInterval(autoRotateTimerRef.current);
    }

    return () => {
      if (autoRotateTimerRef.current) clearInterval(autoRotateTimerRef.current);
    };
  }, [isAutoRotating, totalAngles, elevation]);

  // Mouse drag handlers for 360 scrubbing and vertical tilt gestures
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setStartY(e.clientY);
    setIsAutoRotating(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;

    // Horizontal scrub for 360 rotation
    if (Math.abs(deltaX) > 28) {
      const steps = Math.sign(deltaX);
      setCurrentAngleIndex((prev) => {
        const next = prev - steps;
        if (next < 0) return totalAngles - 1;
        return next % totalAngles;
      });
      setStartX(e.clientX);
    }

    // Vertical gesture: drag down to look under the car, drag up to look over the car
    if (Math.abs(deltaY) > 65) {
      if (deltaY < -65 && elevation !== 'over') {
        setElevation('over');
        setStartY(e.clientY);
      } else if (deltaY > 65 && elevation !== 'under') {
        setElevation('under');
        setStartY(e.clientY);
      } else if (Math.abs(deltaY) > 80 && (elevation === 'over' || elevation === 'under')) {
        setElevation('orbit');
        setStartY(e.clientY);
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch drag handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      setIsDragging(true);
      setStartX(e.touches[0].clientX);
      setStartY(e.touches[0].clientY);
      setIsAutoRotating(false);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !e.touches[0]) return;
    const deltaX = e.touches[0].clientX - startX;
    const deltaY = e.touches[0].clientY - startY;

    if (Math.abs(deltaX) > 24) {
      const steps = Math.sign(deltaX);
      setCurrentAngleIndex((prev) => {
        const next = prev - steps;
        if (next < 0) return totalAngles - 1;
        return next % totalAngles;
      });
      setStartX(e.touches[0].clientX);
    }

    if (Math.abs(deltaY) > 60) {
      if (deltaY < -60 && elevation !== 'over') {
        setElevation('over');
        setStartY(e.touches[0].clientY);
      } else if (deltaY > 60 && elevation !== 'under') {
        setElevation('under');
        setStartY(e.touches[0].clientY);
      }
    }
  };

  // Scroll wheel to rotate car playfully
  const handleWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaX) > 10 || Math.abs(e.deltaY) > 15) {
      const direction = e.deltaX !== 0 ? Math.sign(e.deltaX) : Math.sign(e.deltaY);
      setCurrentAngleIndex((prev) => {
        const next = prev + direction;
        if (next < 0) return totalAngles - 1;
        return next % totalAngles;
      });
    }
  };

  // Filter hotspots based on current elevation and angle
  const activeHotspots = CAR_HOTSPOTS.filter((spot) => {
    if (spot.elevation) {
      if (spot.elevation !== elevation) return false;
    }
    if (elevation === 'orbit') {
      return spot.visibleAngles.includes(currentAngleDeg);
    }
    return true;
  });

  // Determine current image and description based on elevation and active gallery car
  let activeImageSrc = currentView.src;
  let activeImageAlt = currentView.alt;
  let viewTitle = `${activeCar.name} · ${currentView.label}`;
  let viewDescription = 'Drag horizontally or use wheel to spin 360°. Click any glowing pulse node to inspect Before & After telemetry.';

  if (elevation === 'over') {
    activeImageSrc = activeCar.over.src;
    activeImageAlt = activeCar.over.alt;
    viewTitle = `${activeCar.name} · ${activeCar.over.label}`;
    viewDescription = activeCar.over.description;
  } else if (elevation === 'under') {
    activeImageSrc = activeCar.under.src;
    activeImageAlt = activeCar.under.alt;
    viewTitle = `${activeCar.name} · ${activeCar.under.label}`;
    viewDescription = activeCar.under.description;
  }

  return (
    <section
      id="inspection360"
      className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-b border-[var(--border-color)] bg-[var(--bg-primary)] cyber-radial-glow overflow-hidden select-none"
    >
      {/* Background cyber grid */}
      <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--accent-cyan)] text-xs font-mono-tech uppercase tracking-widest mb-3">
            <Crosshair className="w-3.5 h-3.5 animate-spin text-[var(--accent-cyan)]" />
            <span>Section 02 · 3D Multi-Elevation Inspection Studio</span>
          </div>
          <h2 className="gk-font-h2 font-primary font-black tracking-tight text-[var(--text-primary)]">
            360° HYPER-INSPECTION <span className="text-[var(--accent-cyan)]">STUDIO</span>
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[var(--text-secondary)] font-rajdhani font-medium tracking-wide">
            Inspect our prototype from every dimension: orbit 360° sideways, view over the carbon canopy, or look directly under the ground-effect chassis.
          </p>
        </div>

        {/* Primary Engine Switcher: 1. Sports Car 3D -> 2. Multi-Elevation Studio -> 3. 3D Car Customizer */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-6">
          {/* Option 1: Sports Car 3D (Sketchfab - Direct from user's provided link) */}
          <button
            id="engine-sketchfab-btn"
            onClick={() => setDisplayEngine('sketchfab')}
            className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-mono-tech font-bold uppercase transition-all flex items-center gap-2 cursor-pointer ${
              displayEngine === 'sketchfab'
                ? 'bg-[var(--accent-cyan)] text-white shadow-[0_0_30px_var(--accent-glow)] scale-105'
                : 'bg-[var(--bg-card)] text-[var(--text-secondary)] border border-[var(--border-color)] hover:text-[var(--accent-cyan)] hover:border-[var(--accent-cyan)]'
            }`}
          >
            <Car className="w-4 h-4 text-emerald-300" />
            <span>Sports Car 3D</span>
            <span className="px-1.5 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Interactive 3D
            </span>
          </button>

          {/* Option 2: Multi-Elevation Studio */}
          <button
            id="engine-multiaxis-btn"
            onClick={() => setDisplayEngine('multiAxis')}
            className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-mono-tech font-bold uppercase transition-all flex items-center gap-2 cursor-pointer ${
              displayEngine === 'multiAxis'
                ? 'bg-[var(--accent-cyan)] text-white shadow-[0_0_30px_var(--accent-glow)] scale-105'
                : 'bg-[var(--bg-card)] text-[var(--text-secondary)] border border-[var(--border-color)] hover:text-[var(--accent-cyan)] hover:border-[var(--accent-cyan)]'
            }`}
          >
            <RotateCw className="w-4 h-4" />
            <span>Multi-Elevation Studio</span>
            <span className="px-1.5 py-0.5 rounded text-[10px] bg-[var(--accent-cyan)]/20 text-[var(--accent-cyan)] border border-[var(--accent-cyan)]/30">
              Fleet Gallery
            </span>
          </button>

          {/* Option 3: 3D Car Customizer (Moved to last tab) */}
          <button
            id="engine-3d-btn"
            onClick={() => setDisplayEngine('3d')}
            className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-mono-tech font-bold uppercase transition-all flex items-center gap-2 cursor-pointer ${
              displayEngine === '3d'
                ? 'bg-[var(--accent-cyan)] text-white shadow-[0_0_30px_var(--accent-glow)] scale-105'
                : 'bg-[var(--bg-card)] text-[var(--text-secondary)] border border-[var(--border-color)] hover:text-[var(--accent-cyan)] hover:border-[var(--accent-cyan)]'
            }`}
          >
            <Sparkles className="w-4 h-4 text-cyan-300 animate-pulse" />
            <span>3D Car Customizer</span>
            <span className="px-1.5 py-0.5 rounded text-[10px] bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              Customizer Studio
            </span>
          </button>
        </div>

        {/* If Multi-Elevation Studio is active, display the Car Fleet Gallery Bar & View Controls */}
        {displayEngine === 'multiAxis' && (
          <div className="mb-6 space-y-4 animate-fadeIn">
            {/* Gallery Category Filter & Header */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-sm">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[var(--accent-cyan)]/15 border border-[var(--accent-cyan)]/30 flex items-center justify-center text-[var(--accent-cyan)]">
                  <Car className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold font-primary uppercase tracking-wide text-[var(--text-primary)]">
                    Chamber Fleet Gallery
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] font-mono-tech">
                    Select a supercar to inspect multi-elevation telemetry
                  </p>
                </div>
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1 sm:pb-0">
                {['ALL', 'PROTOTYPE', 'TRACK', 'SUPERCAR', 'HYPERCAR'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setGalleryCategory(cat)}
                    className={`px-3 py-1 rounded-lg text-xs font-mono-tech font-bold uppercase transition-all whitespace-nowrap cursor-pointer ${
                      galleryCategory === cat
                        ? 'bg-[var(--accent-cyan)] text-white shadow-[0_0_15px_var(--accent-glow)]'
                        : 'bg-[var(--bg-card-subtle)] text-[var(--text-secondary)] border border-[var(--border-color)] hover:text-[var(--accent-cyan)]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Gallery Car Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {filteredCars.map((car) => {
                const isSelected = selectedCarId === car.id;
                return (
                  <button
                    key={car.id}
                    onClick={() => {
                      setSelectedCarId(car.id);
                      setCurrentAngleIndex(0);
                    }}
                    className={`group relative p-3 rounded-2xl text-left transition-all duration-300 cursor-pointer overflow-hidden border ${
                      isSelected
                        ? 'bg-[var(--bg-card)] border-[var(--accent-cyan)] shadow-[0_0_25px_var(--accent-glow)] scale-[1.02]'
                        : 'bg-[var(--bg-card)]/80 border-[var(--border-color)] hover:border-[var(--accent-cyan)]/60 hover:bg-[var(--bg-card)]'
                    }`}
                  >
                    {/* Top Thumbnail Image */}
                    <div className="relative h-24 w-full rounded-xl overflow-hidden bg-slate-950 mb-2.5">
                      <img
                        src={car.thumbnail}
                        alt={car.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded text-[9px] font-mono-tech font-bold uppercase bg-black/70 text-white backdrop-blur-md border border-white/10">
                        {car.category}
                      </div>
                      {isSelected && (
                        <div className="absolute top-1.5 right-1.5 p-1 rounded-full bg-[var(--accent-cyan)] text-white shadow-[0_0_10px_var(--accent-glow)]">
                          <CheckCircle2 className="w-3 h-3" />
                        </div>
                      )}
                    </div>

                    {/* Car Info */}
                    <div className="space-y-1">
                      <div className="text-[10px] font-mono-tech text-[var(--accent-cyan)] truncate font-semibold">
                        {car.brand}
                      </div>
                      <div className="text-xs font-bold font-primary text-[var(--text-primary)] truncate">
                        {car.name}
                      </div>
                      <div className="flex items-center justify-between text-[10px] font-mono-tech text-[var(--text-secondary)] pt-1 border-t border-[var(--border-color)]">
                        <span>{car.hp}</span>
                        <span>{car.topSpeed}</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Perspective View Buttons (Over / Orbit / Under) */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 pt-1">
              <button
                id="view-over-btn"
                onClick={() => {
                  setElevation('over');
                  setIsAutoRotating(false);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-mono-tech font-bold uppercase transition-all flex items-center gap-2 cursor-pointer ${
                  elevation === 'over'
                    ? 'bg-[var(--accent-cyan)] text-white shadow-[0_0_20px_var(--accent-glow)] scale-105'
                    : 'bg-[var(--bg-card)] text-[var(--text-secondary)] border border-[var(--border-color)] hover:text-[var(--accent-cyan)] hover:border-[var(--accent-cyan)]'
                }`}
              >
                <ArrowUp className="w-4 h-4" />
                <span>Over The Car (Top-Down Aerial)</span>
              </button>

              <button
                id="view-orbit-btn"
                onClick={() => setElevation('orbit')}
                className={`px-4 py-2 rounded-xl text-xs font-mono-tech font-bold uppercase transition-all flex items-center gap-2 cursor-pointer ${
                  elevation === 'orbit'
                    ? 'bg-[var(--accent-cyan)] text-white shadow-[0_0_20px_var(--accent-glow)] scale-105'
                    : 'bg-[var(--bg-card)] text-[var(--text-secondary)] border border-[var(--border-color)] hover:text-[var(--accent-cyan)] hover:border-[var(--accent-cyan)]'
                }`}
              >
                <RotateCw className="w-4 h-4" />
                <span>Sideways (360° Orbit)</span>
              </button>

              <button
                id="view-under-btn"
                onClick={() => {
                  setElevation('under');
                  setIsAutoRotating(false);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-mono-tech font-bold uppercase transition-all flex items-center gap-2 cursor-pointer ${
                  elevation === 'under'
                    ? 'bg-[var(--accent-cyan)] text-white shadow-[0_0_20px_var(--accent-glow)] scale-105'
                    : 'bg-[var(--bg-card)] text-[var(--text-secondary)] border border-[var(--border-color)] hover:text-[var(--accent-cyan)] hover:border-[var(--accent-cyan)]'
                }`}
              >
                <ArrowDown className="w-4 h-4" />
                <span>Under The Car (Chassis & Venturi)</span>
              </button>
            </div>
          </div>
        )}

        {/* Main 360 Studio Container with -30px Hover Lift */}
        <div
          id="car-360-container"
          className="gk-hover-lift relative rounded-3xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-[0_25px_70px_rgba(0,0,0,0.4)] overflow-hidden"
        >
          {displayEngine === 'sketchfab' ? (
            /* Official 3D Sports Car Model from User's Link (Sketchfab WebGL) */
            <SketchfabCarViewer onSelectHotspot={onSelectHotspot} />
          ) : displayEngine === '3d' ? (
            /* Interactive 3D WebGL Model Engine (Three.js LiDAR) */
            <Car3DCanvas onSelectHotspot={onSelectHotspot} />
          ) : (
            /* Photographic Multi-Elevation Studio Engine */
            <>
              {/* Top HUD Telemetry Bar */}
              <div className="px-6 py-4 border-b border-[var(--border-color)] flex flex-wrap items-center justify-between gap-4 bg-[var(--bg-card-subtle)] text-xs font-mono-tech">
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-bold text-[var(--text-primary)] uppercase tracking-wider">
                    {viewTitle}
                  </span>
                  <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--accent-cyan)] text-[11px]">
                    SINGLE VEHICLE · ISOLATED CHASSIS
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  {/* Wireframe toggle */}
                  <button
                    onClick={() => setHudWireframeMode(!hudWireframeMode)}
                    className={`p-1.5 rounded-md border transition-all flex items-center gap-1 text-[11px] ${
                      hudWireframeMode
                        ? 'bg-[var(--accent-cyan)] text-white border-[var(--accent-cyan)]'
                        : 'bg-[var(--bg-card)] text-[var(--text-secondary)] border-[var(--border-color)] hover:text-[var(--accent-cyan)]'
                    }`}
                    title="Toggle LiDAR Grid Scan"
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span className="hidden md:inline">LiDAR Grid</span>
                  </button>

                  {/* Zoom controls */}
                  <div className="flex items-center border border-[var(--border-color)] rounded-md overflow-hidden">
                    <button
                      onClick={() => setZoomLevel((z) => Math.max(1, z - 0.2))}
                      className="p-1.5 bg-[var(--bg-card)] text-[var(--text-secondary)] hover:text-[var(--accent-cyan)]"
                      title="Zoom Out"
                    >
                      <ZoomOut className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-2 text-[10px] text-[var(--accent-cyan)] bg-[var(--bg-primary)]">
                      {Math.round(zoomLevel * 100)}%
                    </span>
                    <button
                      onClick={() => setZoomLevel((z) => Math.min(1.8, z + 0.2))}
                      className="p-1.5 bg-[var(--bg-card)] text-[var(--text-secondary)] hover:text-[var(--accent-cyan)]"
                      title="Zoom In"
                    >
                      <ZoomIn className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Auto Orbit Play/Pause (orbit view) */}
                  {elevation === 'orbit' && (
                    <button
                      onClick={() => setIsAutoRotating(!isAutoRotating)}
                      className="gk-btn text-xs py-1.5 px-3 flex items-center gap-1.5"
                    >
                      {isAutoRotating ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                      <span>{isAutoRotating ? 'Pause Orbit' : 'Auto Orbit'}</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Holographic Turntable Stage (Single Car Without Background) */}
              <div
                ref={containerRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleMouseUp}
                onWheel={handleWheel}
                className="relative w-full h-[480px] sm:h-[560px] md:h-[620px] flex items-center justify-center cursor-grab active:cursor-grabbing overflow-hidden"
              >
                {/* Holographic 3D Turntable Pad / Floor Grid */}
                <div className="absolute inset-x-0 bottom-8 h-44 flex items-center justify-center pointer-events-none opacity-80">
                  <div
                    className="w-[500px] sm:w-[680px] md:w-[840px] h-[160px] sm:h-[220px] rounded-[100%] border border-[var(--accent-cyan)]/40 flex items-center justify-center shadow-[0_0_50px_var(--accent-glow)] transition-transform duration-700"
                    style={{
                      transform: `perspective(600px) rotateX(${elevation === 'over' ? '80deg' : elevation === 'under' ? '-30deg' : '65deg'}) rotateZ(${elevation === 'orbit' ? currentAngleDeg : 0}deg)`,
                    }}
                  >
                    <div className="w-[82%] h-[82%] rounded-[100%] border border-dashed border-[var(--accent-cyan)]/30 flex items-center justify-center">
                      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                        <span
                          key={deg}
                          className="absolute text-[10px] font-mono-tech text-[var(--accent-cyan)]/70 font-semibold"
                          style={{
                            transform: `rotate(${deg}deg) translateY(-85px) rotate(-${deg}deg)`,
                          }}
                        >
                          {deg}°
                        </span>
                      ))}
                      <div className="w-[50%] h-[50%] rounded-[100%] border border-[var(--accent-cyan)]/20 animate-radar" />
                    </div>
                  </div>
                </div>

                {/* Wireframe Holographic Overlay */}
                {hudWireframeMode && (
                  <div className="absolute inset-0 bg-[radial-gradient(#00f0ff_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none z-10" />
                )}

                {/* Single Car Render (Isolated without background) */}
                <div
                  className="relative w-full max-w-4xl h-full flex items-center justify-center px-4 transition-transform duration-300 ease-out"
                  style={{
                    transform: `scale(${zoomLevel})`,
                  }}
                >
                  <div className="relative w-full max-w-3xl flex items-center justify-center">
                    <div
                      className="absolute bottom-4 sm:bottom-6 w-[80%] h-12 rounded-full bg-black/60 blur-xl transition-all duration-500"
                      style={{
                        transform: `scale(${elevation === 'over' ? 0.9 : 1})`,
                        opacity: elevation === 'under' ? 0.3 : 0.8,
                      }}
                    />

                    <img
                      src={activeImageSrc}
                      alt={activeImageAlt}
                      referrerPolicy="no-referrer"
                      className="w-full h-auto max-h-[360px] sm:max-h-[460px] object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)] select-none pointer-events-none transition-opacity duration-300"
                    />

                    {/* Interactive Pulsing Hotspot Pins on the Car */}
                    {activeHotspots.map((spot) => (
                      <button
                        key={spot.id}
                        id={`hotspot-${spot.id}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectHotspot(spot);
                        }}
                        style={{
                          left: `${spot.xPercent}%`,
                          top: `${spot.yPercent}%`,
                        }}
                        className="absolute z-30 -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                      >
                        <div className="relative flex items-center justify-center">
                          <span className="absolute w-8 h-8 rounded-full bg-[var(--accent-cyan)]/25 animate-ping" />
                          <span className="w-5 h-5 rounded-full bg-[var(--bg-card)] border-2 border-[var(--accent-cyan)] flex items-center justify-center shadow-[0_0_15px_var(--accent-cyan)] group-hover:scale-125 transition-transform">
                            <span className="w-2 h-2 rounded-full bg-[var(--accent-cyan)]" />
                          </span>
                        </div>

                        <div className="absolute left-1/2 -top-16 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-40 whitespace-nowrap">
                          <div className="px-3 py-1.5 rounded-lg bg-[var(--bg-card)] border border-[var(--accent-cyan)] text-left shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
                            <div className="text-[10px] font-mono-tech text-[var(--accent-cyan)] uppercase font-semibold">
                              CLICK TO INSPECT · {spot.part}
                            </div>
                            <div className="text-xs font-primary font-bold text-[var(--text-primary)]">
                              {spot.name}
                            </div>
                            <div className="flex items-center gap-2 text-[10px] font-mono-tech pt-0.5">
                              <span className="text-rose-400">Before: {spot.before.conditionScore}%</span>
                              <span className="text-[var(--text-secondary)]">→</span>
                              <span className="text-emerald-400">After: {spot.after.conditionScore}%</span>
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Elevation / Gestures Overlay Hint */}
                <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row items-center justify-between gap-2 pointer-events-none text-[11px] font-mono-tech text-[var(--text-secondary)]">
                  <div className="px-3 py-1 rounded-full bg-[var(--bg-card)]/80 border border-[var(--border-color)] backdrop-blur-md">
                    <span>{viewDescription}</span>
                  </div>

                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-card)]/80 border border-[var(--border-color)] backdrop-blur-md text-[var(--accent-cyan)]">
                    <Compass className="w-3.5 h-3.5" />
                    <span>
                      {elevation === 'orbit'
                        ? `AZIMUTH: ${currentAngleDeg}°`
                        : elevation === 'over'
                        ? 'ELEVATION: +75° (AERIAL TOP-DOWN)'
                        : 'ELEVATION: -35° (UNDERBODY CHASSIS)'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Interactive Angle Scrub Bar & Quick Snap Controls */}
              <div className="p-4 sm:p-6 border-t border-[var(--border-color)] bg-[var(--bg-card-subtle)] space-y-4">
                {elevation === 'orbit' && (
                  <>
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-mono-tech text-[var(--text-secondary)] whitespace-nowrap">
                        0° FRONT
                      </span>
                      <input
                        type="range"
                        min="0"
                        max={totalAngles - 1}
                        value={currentAngleIndex}
                        onChange={(e) => {
                          setCurrentAngleIndex(Number(e.target.value));
                          setIsAutoRotating(false);
                        }}
                        className="w-full accent-[var(--accent-cyan)] cursor-pointer"
                      />
                      <span className="text-xs font-mono-tech text-[var(--text-secondary)] whitespace-nowrap">
                        360° ORBIT
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                      {orbitAngles.map((angleObj, idx) => (
                        <button
                          key={angleObj.angle}
                          onClick={() => {
                            setCurrentAngleIndex(idx);
                            setIsAutoRotating(false);
                          }}
                          className={`px-3 py-1 rounded-lg text-xs font-mono-tech uppercase transition-all ${
                            currentAngleIndex === idx
                              ? 'bg-[var(--accent-cyan)] text-white font-bold shadow-[0_0_15px_var(--accent-glow)]'
                              : 'bg-[var(--bg-card)] text-[var(--text-secondary)] border border-[var(--border-color)] hover:text-[var(--accent-cyan)]'
                          }`}
                        >
                          {angleObj.label.split(' ')[0]}
                        </button>
                      ))}
                    </div>
                  </>
                )}

                {/* Telemetry Footer of Selected Vehicle */}
                <div className="flex flex-wrap items-center justify-between gap-4 p-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] text-xs font-mono-tech">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-[var(--accent-cyan)]" />
                    <span className="font-bold text-[var(--text-primary)]">{activeCar.name}</span>
                    <span className="text-[var(--text-secondary)]">({activeCar.engine})</span>
                  </div>
                  <div className="flex items-center gap-4 text-[var(--text-secondary)]">
                    <span>0-100: <strong className="text-[var(--text-primary)]">{activeCar.zeroToSixty}</strong></span>
                    <span>Downforce: <strong className="text-[var(--text-primary)]">{activeCar.downforce}</strong></span>
                    <span>Chassis Score: <strong className="text-emerald-400">{activeCar.chassisScore}%</strong></span>
                  </div>
                </div>

                <div className="text-center text-xs font-mono-tech text-[var(--text-secondary)]">
                  <span>PRO TIP: Switch between <strong>Over The Car</strong>, <strong>Sideways</strong>, and <strong>Under The Car</strong> above to inspect all exterior, roof, and undercarriage components.</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};
