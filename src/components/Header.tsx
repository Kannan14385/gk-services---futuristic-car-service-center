import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Menu, X, Shield, Radio, Sparkles, Code2, Download, Sun, Moon, ArrowRight, Activity } from 'lucide-react';

interface HeaderProps {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onOpenContact: () => void;
  onOpenCodeZip: () => void;
}

export const Header: React.FC<HeaderProps> = ({ theme, onToggleTheme, onOpenContact, onOpenCodeZip }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Prevent background scrolling when offcanvas menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['hero', 'inspection360', 'services', 'technology', 'calculator', 'reviews'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Concise, spacious navigation headings to eliminate congestion
  const navLinks = [
    { label: 'Overview', href: '#hero', id: 'hero', index: '01', desc: 'Mission & Facility' },
    { label: '3D Inspection', href: '#inspection360', id: 'inspection360', index: '02', desc: 'Sports Car & WebGL' },
    { label: 'Services', href: '#services', id: 'services', index: '03', desc: 'Calibration & Ceramic' },
    { label: 'Technology', href: '#technology', id: 'technology', index: '04', desc: 'Robotic Docks' },
    { label: 'Estimator', href: '#calculator', id: 'calculator', index: '05', desc: 'Instant Live Pricing' },
    { label: 'Reviews', href: '#reviews', id: 'reviews', index: '06', desc: 'Customer Telemetry' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-header"
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-[var(--bg-card)]/90 backdrop-blur-xl border-b border-[var(--border-color)] shadow-[0_10px_30px_rgba(0,0,0,0.3)]'
          : 'bg-gradient-to-b from-[var(--bg-primary)] via-[var(--bg-primary)]/85 to-transparent border-b border-transparent'
      }`}
    >
      <div className="relative w-full px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Division 1: Futuristic GK Logo */}
        <div id="header-logo-division" className="flex items-center">
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#hero');
            }}
            className="group flex items-center gap-2.5 sm:gap-3 cursor-pointer"
          >
            {/* Futuristic GK Cyber-Monogram */}
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center bg-gradient-to-br from-[var(--bg-card)] to-[var(--bg-primary)] border border-[var(--accent-cyan)]/70 rounded-xl overflow-hidden group-hover:border-[var(--accent-cyan)] group-hover:shadow-[0_0_20px_var(--accent-glow)] transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-tr from-[var(--accent-cyan)]/25 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-[var(--accent-cyan)]" />
              <span className="font-primary font-black text-xl tracking-tighter text-[var(--text-primary)] group-hover:scale-105 transition-transform">
                G<span className="text-[var(--accent-cyan)]">K</span>
              </span>
              <div className="absolute bottom-0 inset-x-1 h-0.5 bg-gradient-to-r from-transparent via-[var(--accent-cyan)] to-transparent" />
            </div>

            <span className="font-primary font-black text-xl sm:text-2xl tracking-wider text-[var(--text-primary)] whitespace-nowrap">
              GK <span className="text-[var(--accent-cyan)]">SERVICES</span>
            </span>
          </a>
        </div>

        {/* Division 2: Mathematically Centered Navigation Menu */}
        <nav
          id="header-nav-division"
          className="hidden lg:flex items-center absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 gap-1 xl:gap-2 px-3.5 py-1.5 bg-[var(--bg-card)]/95 border border-[var(--border-color)] rounded-full backdrop-blur-md shadow-sm"
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                id={`nav-link-${link.id}`}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className={`inline-flex items-center justify-center px-3.5 py-1.5 rounded-full text-xs xl:text-sm font-semibold tracking-wide transition-all duration-200 leading-none ${
                  isActive
                    ? 'text-white bg-[var(--accent-cyan)] shadow-[0_0_15px_var(--accent-glow)]'
                    : 'text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] hover:bg-[var(--accent-cyan)]/10'
                }`}
              >
                <span>{link.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Division 3: Actions + Mobile/Tablet Hamburger Toggle */}
        <div id="header-contact-division" className="flex items-center gap-2 sm:gap-3">
          {/* Universal Contact Button (Strictly hidden on Mobile & Tablet < 1024px to keep mobile header to ONLY Logo + Hamburger) */}
          <button
            id="header-contact-btn"
            onClick={onOpenContact}
            className="hidden lg:inline-flex gk-btn group text-xs sm:text-sm py-2 sm:py-2.5 px-4 sm:px-5"
          >
            <Radio className="w-3.5 h-3.5 animate-pulse text-[var(--accent-cyan)] group-hover:text-white transition-colors" />
            <span>Connect Bay</span>
          </button>

          {/* Mobile & Tablet Hamburger Toggle */}
          <button
            id="header-hamburger-toggle"
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-2.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--accent-cyan)] hover:bg-[var(--accent-cyan)]/10 focus:outline-none focus:ring-2 focus:ring-[var(--accent-cyan)] cursor-pointer transition-colors shadow-sm"
            aria-label="Open Navigation Menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* True Overlapping Offcanvas Drawer rendered via React Portal directly onto document.body */}
      {mobileMenuOpen && typeof document !== 'undefined' && createPortal(
        <div
          id="offcanvas-navigation-overlay"
          className="fixed inset-0 z-[99999] flex justify-end bg-black/80 backdrop-blur-md transition-opacity duration-300 animate-fadeIn"
          onClick={() => setMobileMenuOpen(false)}
        >
          {/* Offcanvas Sliding Drawer Panel - Covers full height and overlaps all content */}
          <div
            id="offcanvas-drawer-panel"
            className="relative w-full max-w-sm sm:max-w-md h-[100dvh] bg-[var(--bg-card)] border-l border-[var(--border-color)] shadow-[0_0_80px_rgba(0,0,0,0.8)] p-6 sm:p-8 flex flex-col justify-between overflow-y-auto z-[100000] animate-slideLeft"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar of Offcanvas: Logo + Close Button */}
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[var(--border-color)]">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 flex items-center justify-center bg-gradient-to-br from-[var(--bg-card)] to-[var(--bg-primary)] border border-[var(--accent-cyan)]/70 rounded-xl overflow-hidden shadow-sm">
                    <span className="font-primary font-black text-lg text-[var(--accent-cyan)]">GK</span>
                  </div>
                  <span className="font-primary font-black text-lg tracking-wider text-[var(--text-primary)]">
                    GK <span className="text-[var(--accent-cyan)]">SERVICES</span>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    id="offcanvas-close-btn"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-xl bg-[var(--bg-card-subtle)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] hover:border-[var(--accent-cyan)] transition-colors cursor-pointer"
                    aria-label="Close Menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Offcanvas Telemetry Status Badge */}
              <div className="my-5 p-3 rounded-xl bg-[var(--bg-card-subtle)] border border-[var(--border-color)] flex items-center justify-between text-xs font-mono-tech">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[var(--text-secondary)]">Robotic Bays:</span>
                </div>
                <span className="text-[var(--accent-cyan)] font-bold">12/12 ONLINE</span>
              </div>

              {/* Navigation Menu in the Offcanvas with rewritten headings */}
              <nav className="flex flex-col gap-2 py-2">
                <span className="text-[11px] font-mono-tech uppercase tracking-widest text-[var(--text-muted)] px-3 mb-1">
                  SECTOR NAVIGATION
                </span>
                {navLinks.map((link) => {
                  const isActive = activeSection === link.id;
                  return (
                    <a
                      key={link.id}
                      id={`offcanvas-nav-${link.id}`}
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(link.href);
                      }}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm transition-all duration-200 ${
                        isActive
                          ? 'bg-[var(--accent-cyan)] text-white font-bold shadow-[0_0_20px_var(--accent-glow)]'
                          : 'text-[var(--text-primary)] hover:bg-[var(--bg-card-subtle)] hover:text-[var(--accent-cyan)]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`text-xs font-mono-tech font-bold ${isActive ? 'text-white/80' : 'text-[var(--accent-cyan)]'}`}>
                          {link.index}
                        </span>
                        <div className="flex flex-col">
                          <span className="font-primary text-base uppercase tracking-wider">{link.label}</span>
                          <span className={`text-[11px] font-mono-tech ${isActive ? 'text-white/70' : 'text-[var(--text-secondary)]'}`}>
                            {link.desc}
                          </span>
                        </div>
                      </div>
                      <ArrowRight className={`w-4 h-4 transition-transform ${isActive ? 'translate-x-1 text-white' : 'text-[var(--text-muted)]'}`} />
                    </a>
                  );
                })}
              </nav>
            </div>

            {/* Bottom Actions of Offcanvas (Accessible directly on mobile without cluttering the top header) */}
            <div className="pt-6 border-t border-[var(--border-color)] space-y-3">
              <button
                id="offcanvas-contact-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenContact();
                }}
                className="gk-btn w-full justify-center text-sm py-3.5 cursor-pointer shadow-lg"
              >
                <Radio className="w-4 h-4 text-[var(--accent-cyan)] group-hover:text-white" />
                <span>Book Priority Service Dock</span>
              </button>

              <button
                id="offcanvas-zip-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCodeZip();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[var(--bg-card-subtle)] border border-[var(--border-color)] hover:border-[var(--accent-cyan)] text-xs font-mono-tech uppercase text-[var(--accent-cyan)] rounded-xl transition-all cursor-pointer"
              >
                <Code2 className="w-4 h-4" />
                <span>Inspect Source & Export ZIP</span>
              </button>

              <div className="text-center pt-2 text-[11px] font-mono-tech text-[var(--text-muted)]">
                <span>Emergency AI Dispatch: +1 (800) 457-CYBER · Dock #04</span>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </header>
  );
};

