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

  // Initialize theme from storage or default to dark
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

  const handleExplore360 = () => {
    const el = document.getElementById('inspection360');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] selection:bg-[var(--accent-cyan)] selection:text-[var(--bg-primary)] transition-colors duration-300">
      {/* Sticky Header with 3 Divisions + Light/Dark Switcher (Requirement 5 & 9) */}
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
        {/* Section 01: Hero Mission Hub */}
        <HeroSection
          onOpenContact={() => {
            setPrefillContact(undefined);
            setContactModalOpen(true);
          }}
          onExplore360={handleExplore360}
        />

        {/* Section Divider 1 -> 2 */}
        <div className="relative h-px w-full bg-gradient-to-r from-transparent via-[var(--accent-cyan)]/40 to-transparent">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-0.5 rounded-full bg-[var(--bg-primary)] border border-[var(--border-color)] text-[10px] font-mono-tech text-[var(--accent-cyan)] tracking-widest uppercase">
            01 // 3D HYPER-STUDIO
          </div>
        </div>

        {/* Section 02: 360° Rotatable Single-Car Visualizer (Orbit, Under, Over) */}
        <div className="bg-[var(--bg-secondary)]/40">
          <Car360Viewer
            onSelectHotspot={(hotspot) => setSelectedHotspot(hotspot)}
          />
        </div>

        {/* Section Divider 2 -> 3 */}
        <div className="relative h-px w-full bg-gradient-to-r from-transparent via-[var(--accent-cyan)]/40 to-transparent">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-0.5 rounded-full bg-[var(--bg-primary)] border border-[var(--border-color)] text-[10px] font-mono-tech text-[var(--accent-cyan)] tracking-widest uppercase">
            02 // ENGINEERING PILLARS
          </div>
        </div>

        {/* Section 03: Core Engineering & Diagnostics Matrix */}
        <ServicesSection onBookService={handleBookService} />

        {/* Section Divider 3 -> 4 */}
        <div className="relative h-px w-full bg-gradient-to-r from-transparent via-[var(--accent-cyan)]/40 to-transparent">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-0.5 rounded-full bg-[var(--bg-primary)] border border-[var(--border-color)] text-[10px] font-mono-tech text-[var(--accent-cyan)] tracking-widest uppercase">
            03 // ROBOTIC CLEANROOM
          </div>
        </div>

        {/* Section 04: Robotic Cleanroom Bays & Live Sensor Feeds */}
        <div className="bg-[var(--bg-secondary)]/40">
          <TechBaySection />
        </div>

        {/* Section Divider 4 -> 5 */}
        <div className="relative h-px w-full bg-gradient-to-r from-transparent via-[var(--accent-cyan)]/40 to-transparent">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-0.5 rounded-full bg-[var(--bg-primary)] border border-[var(--border-color)] text-[10px] font-mono-tech text-[var(--accent-cyan)] tracking-widest uppercase">
            04 // INSTANT ESTIMATOR
          </div>
        </div>

        {/* Section 05: Transparent Service Terminal & Estimator */}
        <CostCalculatorSection onOpenBookingModal={handleOpenCalculatorBooking} />

        {/* Section Divider 5 -> 6 */}
        <div className="relative h-px w-full bg-gradient-to-r from-transparent via-[var(--accent-cyan)]/40 to-transparent">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-0.5 rounded-full bg-[var(--bg-primary)] border border-[var(--border-color)] text-[10px] font-mono-tech text-[var(--accent-cyan)] tracking-widest uppercase">
            05 // CLIENT REPORTS & FAQ
          </div>
        </div>

        {/* Section 06: Client Telemetry, Guarantee & FAQ */}
        <div className="bg-[var(--bg-secondary)]/40">
          <TestimonialsFaqSection />
        </div>
      </main>

      {/* Professional Futuristic Footer (Requirement 7) */}
      <Footer
        onOpenContact={() => {
          setPrefillContact(undefined);
          setContactModalOpen(true);
        }}
      />

      {/* Before & After Service Enhancement Popup (Requirement 13) */}
      <BeforeAfterModal
        hotspot={selectedHotspot}
        onClose={() => setSelectedHotspot(null)}
        onBookService={handleBookService}
      />

      {/* Reserve Priority Service Dock Modal */}
      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
        prefillData={prefillContact}
      />

      {/* Code Preview & 1-Click ZIP Download Modal (Requirement 11) */}
      <CodePreviewAndZipModal
        isOpen={codeZipModalOpen}
        onClose={() => setCodeZipModalOpen(false)}
      />

      {/* Back to Top with Live Circular Scroll Percentage Indicator & Floating Theme Toggle (Requirement 1) */}
      <BackToTopWithScrollPercentage theme={theme} onToggleTheme={toggleTheme} />
    </div>
  );
}
