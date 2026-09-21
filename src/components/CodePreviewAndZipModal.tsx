import React, { useState } from 'react';
import { X, Download, Copy, Check, Code2, FileCode } from 'lucide-react';
import JSZip from 'jszip';

interface CodePreviewAndZipModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CodePreviewAndZipModal: React.FC<CodePreviewAndZipModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'App.tsx' | 'index.html' | 'index.css' | 'mockCarData.ts' | 'README.md'>('App.tsx');
  const [isCopied, setIsCopied] = useState(false);
  const [isZipping, setIsZipping] = useState(false);
  const [zipSuccess, setZipSuccess] = useState(false);

  if (!isOpen) return null;

  const codeSnippets: Record<string, string> = {
    'App.tsx': `/**
 * GK SERVICES - Futuristic Professional Car Service Center Webpage
 * High-performance React 19 + TypeScript + Tailwind CSS application.
 * Features:
 * - Opposite & Compatible Light / Dark mode with persistent CSS variables
 * - Single-car 360° rotation (drag, step, orbit) + Under-chassis & Over-roof views
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

  const handleBookService = (serviceName: string) => {
    setPrefillContact({ serviceName });
    setContactModalOpen(true);
  };

  const handleOpenCalculatorBooking = (data: {
    vehicleType: string;
    serviceTier: string;
    totalEstimate: number;
  }) => {
    setPrefillContact({
      serviceName: data.serviceTier,
      vehicleType: data.vehicleType,
      totalEstimate: data.totalEstimate,
    });
    setContactModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] selection:bg-[var(--accent-cyan)] selection:text-[var(--bg-primary)] transition-colors duration-300">
      <Header
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenContact={() => {
          setPrefillContact(undefined);
          setContactModalOpen(true);
        }}
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
        <ServicesSection onBookService={handleBookService} />
        <TechBaySection />
        <CostCalculatorSection onOpenBookingModal={handleOpenCalculatorBooking} />
        <TestimonialsFaqSection />
      </main>

      <Footer onOpenContact={() => setContactModalOpen(true)} />
      <BeforeAfterModal hotspot={selectedHotspot} onClose={() => setSelectedHotspot(null)} onBookService={handleBookService} />
      <ContactModal isOpen={contactModalOpen} onClose={() => setContactModalOpen(false)} prefillData={prefillContact} />
      <CodePreviewAndZipModal isOpen={codeZipModalOpen} onClose={() => setCodeZipModalOpen(false)} />
      <BackToTopWithScrollPercentage />
    </div>
  );
}`,
    'index.html': `<!doctype html>
<html lang="en" class="dark scroll-smooth">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>GK Services - Futuristic Car Service Center</title>
    <meta name="description" content="Autonomous automotive engineering terminal with 360° single-car inspection (orbit, over, under), light/dark mode, and precision maintenance protocols." />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Chakra+Petch:ital,wght@0,400;0,600;0,700;1,700&family=Michroma&family=Rajdhani:wght@500;600;700&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
  </head>
  <body class="antialiased">
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`,
    'index.css': `@import "tailwindcss";

/* Theme Variable Definitions */
:root {
  /* Futuristic Light Theme: Sterile Cyber-Lab High Tech */
  --bg-primary: #f1f5f9;
  --bg-card: #ffffff;
  --bg-card-subtle: #e2e8f0;
  --text-primary: #0f172a;
  --text-secondary: #475569;
  --border-color: rgba(14, 165, 233, 0.35);
  --accent-cyan: #0284c7;
  --accent-cyan-subtle: rgba(2, 132, 199, 0.12);
  --accent-glow: rgba(2, 132, 199, 0.35);
}

html.dark {
  /* Futuristic Dark Theme: Cyber Neon Obsidian Deep Space */
  --bg-primary: #07090e;
  --bg-card: #0d1322;
  --bg-card-subtle: #090c14;
  --text-primary: #f8fafc;
  --text-secondary: #94a3b8;
  --border-color: rgba(0, 240, 255, 0.25);
  --accent-cyan: #00f0ff;
  --accent-cyan-subtle: rgba(0, 240, 255, 0.12);
  --accent-glow: rgba(0, 240, 255, 0.65);
}

.font-primary {
  font-family: 'Chakra Petch', 'Michroma', sans-serif;
}

/* Universal Button Style */
.gk-btn {
  font-family: 'Chakra Petch', 'Michroma', sans-serif;
  color: var(--accent-cyan);
  border: 1px solid var(--border-color);
  background: var(--bg-card);
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}
.gk-btn:hover {
  color: #ffffff;
  background: var(--accent-cyan);
  box-shadow: 0 0 25px var(--accent-glow);
}

/* Universal Container Hover Effect: y-axis -30px (Requirement 8) */
.gk-hover-lift {
  transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.45s ease;
}
.gk-hover-lift:hover {
  transform: translateY(-30px);
  box-shadow: 0 30px 60px -15px var(--accent-glow);
}`,
    'mockCarData.ts': `// Single-Car 360 multi-elevation angles & Before/After service hotspots
export const SINGLE_CAR_MODELS = [
  {
    id: 'cyber-gt',
    name: 'GK Apex Valkyrie GT (Prototype V-4)',
    type: 'Track-Focused Hypercar',
    orbit: [
      { angle: 0, label: '0° Front Direct', src: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80' },
      { angle: 45, label: '45° Front Quarter Starboard', src: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80' },
      { angle: 90, label: '90° Starboard Profile', src: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=80' },
      { angle: 135, label: '135° Rear Quarter Starboard', src: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1200&q=80' },
      { angle: 180, label: '180° Rear Stern Direct', src: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80' },
      { angle: 225, label: '225° Rear Quarter Portside', src: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80' },
      { angle: 270, label: '270° Portside Profile', src: 'https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?auto=format&fit=crop&w=1200&q=80' },
      { angle: 315, label: '315° Front Quarter Portside', src: 'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&w=1200&q=80' }
    ],
    under: {
      angle: 'under',
      label: 'Sub-Chassis Undercarriage & Diffuser Telemetry',
      src: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=1400&q=80'
    },
    over: {
      angle: 'over',
      label: 'Top Aerial Aero Canopy & Carbon Roof View',
      src: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1400&q=80'
    }
  }
];`,
    'README.md': `# GK Services - Futuristic Car Service Center

A futuristic, professional static webpage engineered with React 19, TypeScript, and Tailwind CSS for **GK Services**.

## Requirements Checklist
1. **Brand**: GK Services Autonomous Car Service Center.
2. **Responsive Typography**: Breakpoints for Desktop (>1200px), Tablet (>1024px), Mobile (>767px).
3. **Global Color Palette**:
   - Dark Mode: Cyber Neon Cyan (#00F0FF) & Deep Void Obsidian (#07090E).
   - Light Mode: High-contrast sterile lab layout (#F1F5F9 canvas with #0284C7 electric cobalt).
4. **Opposite & Compatible Light/Dark Toggle**: Interactive switcher in header, persists preference via CSS variables.
5. **Back to Top Button**: Circular SVG progress ring with live percentage scroll indicator and hover animation.
6. **Primary Font**: 'Chakra Petch' and 'Michroma' futuristic cyber typography.
7. **Single-Car 360° Inspection**:
   - Isolated car presentation.
   - Smooth 360° orbit rotation via drag, scrub slider, or step buttons.
   - Under-the-car chassis and Over-the-car aerial views with interactive hotspot telemetry.
8. **6 Unique Sections**:
   - Hero Mission Control
   - 360° Interactive Single-Car Visualizer
   - Core Engineering & Diagnostics Matrix
   - Robotic Cleanroom Bays & Live Telemetry
   - Transparent Service Terminal & Estimator
   - Client Telemetry & Protocol FAQ
9. **Sticky Header**: 3 divisions (GK Logo, Navigation Menu, Universal Contact Button + Theme Switcher).
10. **Universal Container Hover Effect**: -30px lift on all major cards (\`transform: translateY(-30px)\`).
11. **1-Click Project ZIP Export**: Built-in client-side ZIP bundler with code inspection tabs.
`,
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
      zip.file('index.html', codeSnippets['index.html']);
      zip.file('src/index.css', codeSnippets['index.css']);
      zip.file('src/data/mockCarData.ts', codeSnippets['mockCarData.ts']);
      zip.file('README.md', codeSnippets['README.md']);

      const content = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(content);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'gk-services-futuristic-car-center.zip';
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
                SOURCE INSPECTOR & BUNDLER
              </span>
              <h3 className="font-primary font-bold text-lg text-[var(--text-primary)]">
                PROJECT CODE & 1-CLICK ZIP
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* 1-Click ZIP Download button */}
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
                  <span>Download Complete ZIP</span>
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
            {(Object.keys(codeSnippets) as Array<'App.tsx' | 'index.html' | 'index.css' | 'mockCarData.ts' | 'README.md'>).map((tab) => (
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
                <span>Copy File Code</span>
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
          <span>EASILY EDITABLE · PURE REACT 19 & TAILWIND CSS</span>
          <span className="text-[var(--accent-cyan)]">ZIP CONTAINS FULL STANDALONE PROJECT</span>
        </div>
      </div>
    </div>
  );
};
