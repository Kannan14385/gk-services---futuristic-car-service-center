import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, ShieldCheck, ArrowUpRight, Radio, Send, Check } from 'lucide-react';

interface FooterProps {
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenContact }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSubscribed(true);
    setTimeout(() => {
      setNewsletterEmail('');
    }, 3000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="relative bg-[var(--bg-card)] border-t border-[var(--border-color)] text-[var(--text-secondary)] pt-16 pb-12 overflow-hidden">
      {/* Subtle bottom grid */}
      <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />

      <div className="w-full px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[var(--border-color)]">
          {/* Col 1: GK Brand & Mission */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 flex items-center justify-center bg-gradient-to-br from-[var(--bg-primary)] to-[var(--bg-card)] border border-[var(--accent-cyan)]/70 rounded-xl overflow-hidden shadow-[0_0_15px_var(--accent-glow)]">
                <div className="absolute inset-0 bg-gradient-to-tr from-[var(--accent-cyan)]/25 via-transparent to-transparent opacity-70" />
                <span className="font-primary font-black text-lg tracking-tighter text-[var(--text-primary)]">
                  G<span className="text-[var(--accent-cyan)]">K</span>
                </span>
              </div>
              <div>
                <span className="font-primary font-black text-xl tracking-wider text-[var(--text-primary)] block">
                  GK <span className="text-[var(--accent-cyan)]">SERVICES</span>
                </span>
              </div>
            </div>

            <p className="text-xs leading-relaxed text-[var(--text-secondary)]">
              Next-generation automotive engineering terminal. Operating 4 hermetic robotics chambers delivering zero-tolerance maintenance, ceramic 9H armor, and optical LiDAR verification.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs font-mono-tech text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>FACILITY STATUS: 100% OPERATIONAL</span>
            </div>
          </div>

          {/* Col 2: Headquarters & GPS Coordinates */}
          <div className="space-y-3">
            <h4 className="font-primary font-bold text-sm text-[var(--text-primary)] uppercase tracking-wider flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[var(--accent-cyan)]" />
              LOCATION & DOCK TERMINAL
            </h4>
            <div className="text-xs space-y-1.5 text-[var(--text-secondary)] font-rajdhani text-sm">
              <p>GK Engineering Complex, Gate 4</p>
              <p>742 Quantum Boulevard, Cyber Valley</p>
              <p className="font-mono-tech text-[11px] text-[var(--accent-cyan)]">GPS: 37.7749° N, 122.4194° W</p>
            </div>

            <div className="pt-2 text-xs font-mono-tech space-y-1">
              <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                <Clock className="w-3.5 h-3.5 text-[var(--accent-cyan)]" />
                <span>MON - SAT: 07:00 - 21:00 UTC</span>
              </div>
              <div className="text-amber-400 text-[11px]">
                24/7 RAPID RECOVERY TELEMETRY DISPATCH
              </div>
            </div>
          </div>

          {/* Col 3: Emergency Dispatch & Contacts */}
          <div className="space-y-3">
            <h4 className="font-primary font-bold text-sm text-[var(--text-primary)] uppercase tracking-wider flex items-center gap-2">
              <Phone className="w-4 h-4 text-[var(--accent-cyan)]" />
              COMMUNICATIONS LINK
            </h4>

            <div className="space-y-2 text-xs font-mono-tech">
              <div>
                <span className="text-[10px] text-[var(--text-secondary)] block">SERVICE BAY HOTLINE:</span>
                <a href="tel:+18005550199" className="text-[var(--text-primary)] hover:text-[var(--accent-cyan)] font-semibold text-sm">
                  +1 (800) 555-GK-AUTO
                </a>
              </div>

              <div>
                <span className="text-[10px] text-[var(--text-secondary)] block">TELEMETRY DATA DISPATCH:</span>
                <a href="mailto:dock@gkservices.auto" className="text-[var(--accent-cyan)] hover:underline">
                  dock@gkservices.auto
                </a>
              </div>

              <div>
                <span className="text-[10px] text-[var(--text-secondary)] block">CERTIFIED AUDITS:</span>
                <span className="text-emerald-400">ISO 9001:2026 Aerospace-Auto</span>
              </div>
            </div>

            <button
              onClick={onOpenContact}
              className="gk-btn text-xs py-2 px-4 mt-2"
            >
              <span>Connect Operator</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Col 4: Dispatch Newsletter & Firmware Updates */}
          <div className="space-y-3">
            <h4 className="font-primary font-bold text-sm text-[var(--text-primary)] uppercase tracking-wider flex items-center gap-2">
              <Radio className="w-4 h-4 text-[var(--accent-cyan)]" />
              TELEMETRY BULLETINS
            </h4>
            <p className="text-xs text-[var(--text-secondary)]">
              Receive technical whitepapers, ceramic chemical breakthroughs, and track alignment advisories.
            </p>

            <form onSubmit={handleNewsletter} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="pilot@domain.com"
                  required
                  className="w-full bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg px-3 py-2 text-xs font-mono-tech text-[var(--text-primary)] placeholder-[var(--text-secondary)]/50 focus:outline-none focus:border-[var(--accent-cyan)]"
                />
              </div>
              <button
                type="submit"
                className="gk-btn w-full justify-center text-xs py-2"
              >
                {newsletterSubscribed ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>SUBSCRIBED TO DOCK</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>SUBSCRIBE TELEMETRY</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar with Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-tech">
          <div className="text-center sm:text-left">
            <span>© 2026 GK Services Inc. All Rights Reserved. · Autonomous Automotive Engineering.</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>RETURN TO TOP</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
