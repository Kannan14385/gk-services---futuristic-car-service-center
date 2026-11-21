import React, { useState } from 'react';
import { X, Download, Copy, Check, Code2, FileCode } from 'lucide-react';
import JSZip from 'jszip';

interface CodePreviewAndZipModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CodePreviewAndZipModal: React.FC<CodePreviewAndZipModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'App.tsx' | 'Car3DCanvas.tsx' | 'Car360Viewer.tsx' | 'HeroSection.tsx' | 'mockCarData.ts'>('App.tsx');
  const [isCopied, setIsCopied] = useState(false);
  const [isZipping, setIsZipping] = useState(false);
  const [zipSuccess, setZipSuccess] = useState(false);

  if (!isOpen) return null;

  const codeSnippets: Record<string, string> = {
    'App.tsx': `/**
 * GK SERVICES - Futuristic Professional Car Service Center Webpage
 * High-performance 100% Pure React 19 + TypeScript + Tailwind CSS application.
 * Features:
 * - Opposite & Compatible Light / Dark mode with persistent CSS variables
 * - Single-car 360° rotation (drag, step, orbit) + Under-chassis & Over-roof views
 * - Three.js WebGL native React 3D Car Studio & Customizer
 * - Back to top button with circular progress and percentage scroll
 * - Futuristic typography: Chakra Petch & Michroma
 * - 6 unique sections with -30px container hover dynamics
 * - Sticky 3-division header with responsive mobile drawer
 */
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { Car360Viewer } from './components/Car360Viewer';
import { ServicesSection } from './components/ServicesSection';
import { TechBaySection } from './components/TechBaySection';
import { CostCalculatorSection } from './components/CostCalculatorSection';
import { TestimonialsFaqSection } from './components/TestimonialsFaqSection';
import { Footer } from './components/Footer';
import { BeforeAfterModal } from './components/BeforeAfterModal';
import { ContactModal } from './components/ContactModal';
import { CodePreviewAndZipModal } from './components/CodePreviewAndZipModal';
import { BackToTopWithScrollPercentage } from './components/BackToTopWithScrollPercentage';
import { CarHotspot } from './types';

export default function App() {
  const [selectedHotspot, setSelectedHotspot] = useState<CarHotspot | null>(null);
  const [contactModalOpen, setContactModalOpen] = useState<boolean>(false);
  const [codeZipModalOpen, setCodeZipModalOpen] = useState<boolean>(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [prefillContact, setPrefillContact] = useState<{
    serviceName?: string;
    vehicleType?: string;
    totalEstimate?: number;
  } | undefined>(undefined);

  useEffect(() => {
    const savedTheme = localStorage.getItem('gk_theme') as 'dark' | 'light' | null;
    const initialTheme = savedTheme || 'dark';
    setTheme(initialTheme);
    if (initialTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('gk_theme', nextTheme);
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300">
      <Header
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenContact={() => setContactModalOpen(true)}
        onOpenCodeZip={() => setCodeZipModalOpen(true)}
      />

      <main>
        <HeroSection
          onOpenContact={() => setContactModalOpen(true)}
          onExplore360={() => {
            document.getElementById('inspection360')?.scrollIntoView({ behavior: 'smooth' });
          }}
        />
        <Car360Viewer onSelectHotspot={(hotspot) => setSelectedHotspot(hotspot)} />
        <ServicesSection onBookService={(service) => {
          setPrefillContact({ serviceName: service });
          setContactModalOpen(true);
        }} />
        <TechBaySection />
        <CostCalculatorSection onOpenBookingModal={(data) => {
          setPrefillContact({
            serviceName: data.serviceTier,
            vehicleType: data.vehicleType,
            totalEstimate: data.totalEstimate,
          });
          setContactModalOpen(true);
        }} />
        <TestimonialsFaqSection />
      </main>

      <Footer onOpenContact={() => setContactModalOpen(true)} />
      <BeforeAfterModal hotspot={selectedHotspot} onClose={() => setSelectedHotspot(null)} onBookService={() => {}} />
      <ContactModal isOpen={contactModalOpen} onClose={() => setContactModalOpen(false)} prefillData={prefillContact} />
      <CodePreviewAndZipModal isOpen={codeZipModalOpen} onClose={() => setCodeZipModalOpen(false)} />
      <BackToTopWithScrollPercentage theme={theme} onToggleTheme={toggleTheme} />
    </div>
  );
}`,
    'Car3DCanvas.tsx': `/**
 * Car3DCanvas.tsx - Pure React Three.js WebGL 3D Sports Car Studio
 * 100% Native React Component with Draco GLTF streaming, real-time shaders & telemetry
 */
import React, { useRef, useEffect, useState, useCallback } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

export const Car3DCanvas: React.FC<{ onSelectHotspot: (hotspot: any) => void }> = ({ onSelectHotspot }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedPaint, setSelectedPaint] = useState<string>('#00f0ff');
  const [paintFinish, setPaintFinish] = useState<'metallic' | 'matte' | 'pearl'>('metallic');
  const [rimStyle, setRimStyle] = useState('forged-5');
  const [spoilerStyle, setSpoilerStyle] = useState('gt-wing');
  const [modelLoaded, setModelLoaded] = useState(false);
  const [isAutoRotating, setIsAutoRotating] = useState(false);
  const [isRevving, setIsRevving] = useState(false);

  // Sync state refs to prevent re-initializing Three.js scene on user interaction
  const isAutoRotatingRef = useRef(isAutoRotating);
  useEffect(() => { isAutoRotatingRef.current = isAutoRotating; }, [isAutoRotating]);

  // Scene lifecycle initialization runs strictly once
  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, container.clientWidth / container.clientHeight, 0.1, 100);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Load authentic Draco-compressed sports-car.glb
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/draco/');
    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);
    loader.load('/models/sports-car.glb', (gltf) => {
      scene.add(gltf.scene);
      setModelLoaded(true);
    });

    const animate = () => {
      requestAnimationFrame(animate);
      if (isAutoRotatingRef.current) { scene.rotation.y += 0.008; }
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      renderer.dispose();
      scene.clear();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="relative w-full h-[580px]">
      <div ref={mountRef} className="w-full h-full cursor-grab" />
    </div>
  );
};`,
    'Car360Viewer.tsx': `/**
 * Car360Viewer.tsx - 360° Hyper-Inspection Studio & Fleet Gallery
 * Pure React Architecture with 3D WebGL & Multi-Axis Turntable Switching
 */
import React, { useState, useRef, useEffect } from 'react';
import { RotateCw, Sparkles, Layers, Crosshair } from 'lucide-react';
import { STUDIO_CAR_GALLERY } from '../data/mockCarData';
import { Car3DCanvas } from './Car3DCanvas';

export const Car360Viewer: React.FC<{ onSelectHotspot: (h: any) => void }> = ({ onSelectHotspot }) => {
  const [displayEngine, setDisplayEngine] = useState<'3d' | 'multiAxis'>('3d');
  const [elevation, setElevation] = useState<'orbit' | 'over' | 'under'>('orbit');
  const [selectedCarId, setSelectedCarId] = useState('car-apex-1');

  return (
    <section id="inspection360" className="py-24 px-6 bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto">
        {/* React Studio Mode Switcher */}
        <div className="flex justify-center gap-4 mb-6">
          <button onClick={() => setDisplayEngine('3d')} className="px-5 py-2.5 rounded-xl text-xs font-mono-tech font-bold uppercase">
            <Sparkles className="w-4 h-4 text-cyan-300 inline mr-2" />
            3D Interactive Studio (Pure React · WebGL)
          </button>
          <button onClick={() => setDisplayEngine('multiAxis')} className="px-5 py-2.5 rounded-xl text-xs font-mono-tech font-bold uppercase">
            <RotateCw className="w-4 h-4 inline mr-2" />
            Multi-Elevation Studio (Fleet Gallery · 360°)
          </button>
        </div>

        {/* 100% React Studio Container */}
        <div className="rounded-3xl bg-[var(--bg-card)] border border-[var(--border-color)] overflow-hidden">
          {displayEngine === '3d' ? (
            <Car3DCanvas onSelectHotspot={onSelectHotspot} />
          ) : (
            <div>Multi-Axis Photographic Turntable</div>
          )}
        </div>
      </div>
    </section>
  );
};`,
    'HeroSection.tsx': `/**
 * HeroSection.tsx - Mission Control & Real-Time Facility Telemetry
 * Pure React Functional Component with Interactive Service Dock Previews
 */
import React, { useState } from 'react';
import { ShieldCheck, Cpu, Play, Zap, Radio } from 'lucide-react';

export const HeroSection: React.FC<{ onOpenContact: () => void; onExplore360: () => void }> = ({ onOpenContact, onExplore360 }) => {
  const [activeBayIndex, setActiveBayIndex] = useState(0);

  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--accent-cyan)] text-xs font-mono-tech">
            <Radio className="w-3.5 h-3.5 animate-pulse text-emerald-400" />
            <span>Autonomous Robotics Dock · ISO-7 Certified</span>
          </div>
          <h1 className="font-primary font-black text-4xl sm:text-6xl text-[var(--text-primary)]">
            AEROSPACE ENGINEERING FOR <span className="text-[var(--accent-cyan)]">HYPERCARS</span>
          </h1>
          <p className="text-sm sm:text-base text-[var(--text-secondary)]">
            Sub-micron optical LiDAR scans, molecular ceramic armor, and quantum dyno telemetry.
          </p>
          <div className="flex gap-4">
            <button onClick={onOpenContact} className="gk-btn px-6 py-3 rounded-xl font-bold">Reserve Service Dock</button>
            <button onClick={onExplore360} className="px-6 py-3 rounded-xl border border-[var(--border-color)]">Launch 3D Studio</button>
          </div>
        </div>
      </div>
    </section>
  );
};`,
    'mockCarData.ts': `// Typed Telemetry, Cleanroom Docks, and Hotspot Definitions
export const CAR_HOTSPOTS = [
  { id: 'optics-radar', name: 'Sub-Micron Solid-State LiDAR', part: 'Front Fascia Array', category: 'Calibration' },
  { id: 'aero-diffuser', name: 'Carbon Venturi Ground Tunnel', part: 'Under-Chassis Diffuser', category: 'Aerodynamics' },
  { id: 'carbon-ceramic-brakes', name: 'Matrix Carbon Ceramic Rotors', part: 'Braking System', category: 'Performance' },
];`,
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippets[activeTab]);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleDownloadZip = async () => {
    try {
      setIsZipping(true);
      const zip = new JSZip();

      zip.file('src/App.tsx', codeSnippets['App.tsx']);
      zip.file('src/components/Car3DCanvas.tsx', codeSnippets['Car3DCanvas.tsx']);
      zip.file('src/components/Car360Viewer.tsx', codeSnippets['Car360Viewer.tsx']);
      zip.file('src/components/HeroSection.tsx', codeSnippets['HeroSection.tsx']);
      zip.file('src/data/mockCarData.ts', codeSnippets['mockCarData.ts']);

      const content = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(content);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'gk-services-react-platform.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setZipSuccess(true);
      setTimeout(() => setZipSuccess(false), 3000);
    } catch (err) {
      console.error('Error bundling ZIP:', err);
    } finally {
      setIsZipping(false);
    }
  };

  return (
    <div
      id="code-preview-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/80 backdrop-blur-xl animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        id="code-preview-modal-container"
        className="relative w-full max-w-4xl max-h-[90vh] flex flex-col bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-[var(--border-color)] flex items-center justify-between bg-[var(--bg-card-subtle)]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--accent-cyan)]">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono-tech uppercase tracking-widest text-[var(--accent-cyan)]">
                100% PURE REACT 19 ARCHITECTURE
              </span>
              <h3 className="font-primary font-bold text-lg text-[var(--text-primary)]">
                REACT CODE INSPECTOR & 1-CLICK ZIP
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              id="download-project-zip-btn"
              onClick={handleDownloadZip}
              disabled={isZipping}
              className="gk-btn text-xs py-2 px-4 flex items-center gap-1.5 cursor-pointer"
            >
              {isZipping ? (
                <span>Generating ZIP...</span>
              ) : zipSuccess ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>ZIP Downloaded!</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Download React ZIP</span>
                </>
              )}
            </button>

            <button
              onClick={onClose}
              className="p-2 text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] hover:bg-[var(--accent-cyan)]/10 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="px-6 pt-3 pb-1 border-b border-[var(--border-color)] bg-[var(--bg-card-subtle)] flex items-center justify-between overflow-x-auto gap-2">
          <div className="flex items-center gap-2">
            {(Object.keys(codeSnippets) as Array<'App.tsx' | 'Car3DCanvas.tsx' | 'Car360Viewer.tsx' | 'HeroSection.tsx' | 'mockCarData.ts'>).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-t-lg text-xs font-mono-tech transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === tab
                    ? 'bg-[var(--bg-card)] text-[var(--accent-cyan)] border-t-2 border-x border-[var(--accent-cyan)] font-semibold'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                <FileCode className="w-3.5 h-3.5" />
                <span>{tab}</span>
              </button>
            ))}
          </div>

          <button
            onClick={handleCopy}
            className="px-3 py-1 text-xs font-mono-tech text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] flex items-center gap-1 bg-[var(--bg-card)] border border-[var(--border-color)] rounded cursor-pointer"
          >
            {isCopied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy React Code</span>
              </>
            )}
          </button>
        </div>

        {/* Code Content View */}
        <div className="p-6 flex-1 overflow-y-auto bg-[var(--bg-primary)] font-mono-tech text-xs leading-relaxed text-[var(--text-secondary)]">
          <pre className="overflow-x-auto p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-primary)]">
            <code>{codeSnippets[activeTab]}</code>
          </pre>
        </div>

        {/* Footer Hint */}
        <div className="px-6 py-3 border-t border-[var(--border-color)] bg-[var(--bg-card-subtle)] flex items-center justify-between text-xs font-mono-tech text-[var(--text-secondary)]">
          <span>100% PURE REACT 19 ARCHITECTURE · ZERO EXTERNAL IFRAMES</span>
          <span className="text-[var(--accent-cyan)]">MODULAR COMPONENTS · TYPESCRIPT · THREE.JS WEBGL</span>
        </div>
      </div>
    </div>
  );
};
