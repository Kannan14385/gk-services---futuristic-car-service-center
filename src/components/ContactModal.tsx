import React, { useState } from 'react';
import { X, Radio, CheckCircle, Send } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefillData?: {
    serviceName?: string;
    vehicleType?: string;
    totalEstimate?: number;
  };
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, prefillData }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [carModel, setCarModel] = useState(prefillData?.vehicleType || '');
  const [serviceRequested, setServiceRequested] = useState(prefillData?.serviceName || 'Autonomous Laser Diagnostic Scan');
  const [preferredDate, setPreferredDate] = useState('2026-09-25');
  const [preferredChamber, setPreferredChamber] = useState('Chamber Alpha (Laser Dock)');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div
      id="contact-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/80 backdrop-blur-xl animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        id="contact-modal-container"
        className="relative w-full max-w-xl bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="relative px-6 py-4 border-b border-[var(--border-color)] flex items-center justify-between bg-[var(--bg-card-subtle)]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--accent-cyan)]">
              <Radio className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <span className="text-[10px] font-mono-tech uppercase tracking-widest text-[var(--accent-cyan)]">
                DIRECT BAY DOCK DISPATCH
              </span>
              <h3 className="font-primary font-bold text-lg text-[var(--text-primary)]">
                RESERVE GK SERVICE DOCK
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] hover:bg-[var(--accent-cyan)]/10 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {isSubmitted ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-950/40 border-2 border-emerald-400 flex items-center justify-center text-emerald-400 shadow-[0_0_30px_rgba(52,211,153,0.4)]">
                <CheckCircle className="w-8 h-8" />
              </div>

              <span className="text-xs font-mono-tech text-emerald-400 uppercase tracking-widest block">
                RESERVATION CONFIRMED · TOKEN #GK-2026-{Math.floor(1000 + Math.random() * 9000)}
              </span>

              <h4 className="font-primary font-bold text-2xl text-[var(--text-primary)]">
                DOCK SLOT ALLOCATED
              </h4>

              <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-md mx-auto leading-relaxed">
                Thank you, <strong className="text-[var(--text-primary)]">{fullName || 'Pilot'}</strong>. Your priority service reservation for <strong className="text-[var(--accent-cyan)]">{carModel || 'your vehicle'}</strong> has been locked in <strong className="text-[var(--text-primary)]">{preferredChamber}</strong> for <strong className="text-[var(--text-primary)]">{preferredDate}</strong>.
              </p>

              <div className="p-4 rounded-xl bg-[var(--bg-card-subtle)] border border-[var(--border-color)] max-w-sm mx-auto text-xs font-mono-tech text-[var(--text-secondary)] text-left space-y-1.5">
                <div className="flex justify-between">
                  <span>TELEMETRY PASS:</span>
                  <span className="text-emerald-400">ACTIVE</span>
                </div>
                <div className="flex justify-between">
                  <span>FACILITY ADDRESS:</span>
                  <span className="text-[var(--text-primary)]">Gate 4, Quantum Blvd</span>
                </div>
                <div className="flex justify-between">
                  <span>PRE-CHECKIN TIME:</span>
                  <span className="text-[var(--accent-cyan)]">08:30 AM UTC</span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleResetAndClose}
                  className="gk-btn text-xs py-2.5 px-6"
                >
                  <span>Return to Mission Hub</span>
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-mono-tech text-[var(--accent-cyan)] uppercase block mb-1">
                    PILOT / OWNER NAME *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Alex Mercer"
                    className="w-full bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg px-3 py-2 text-xs font-mono-tech text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-cyan)]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono-tech text-[var(--accent-cyan)] uppercase block mb-1">
                    COMMUNICATIONS EMAIL *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="pilot@domain.com"
                    className="w-full bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg px-3 py-2 text-xs font-mono-tech text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-cyan)]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-mono-tech text-[var(--accent-cyan)] uppercase block mb-1">
                    TELEMETRY CONTACT (PHONE)
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 019-2834"
                    className="w-full bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg px-3 py-2 text-xs font-mono-tech text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-cyan)]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono-tech text-[var(--accent-cyan)] uppercase block mb-1">
                    VEHICLE MAKE & MODEL *
                  </label>
                  <input
                    type="text"
                    required
                    value={carModel}
                    onChange={(e) => setCarModel(e.target.value)}
                    placeholder="e.g. Porsche 911 GT3 RS / Model S"
                    className="w-full bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg px-3 py-2 text-xs font-mono-tech text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-cyan)]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-mono-tech text-[var(--accent-cyan)] uppercase block mb-1">
                    SERVICE PROTOCOL
                  </label>
                  <select
                    value={serviceRequested}
                    onChange={(e) => setServiceRequested(e.target.value)}
                    className="w-full bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg px-3 py-2 text-xs font-mono-tech text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-cyan)]"
                  >
                    <option>Autonomous Laser Diagnostic Scan ($180)</option>
                    <option>Graphene Nano-Shield 9H Armor ($650)</option>
                    <option>Quantum Dyno Tuning & Powertrain ($420)</option>
                    <option>Carbon-Ceramic Braking Overhaul ($340)</option>
                    <option>Cryogenic -78.5°C Carbon Blast ($310)</option>
                    <option>Complete Apex Overhaul Package</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-mono-tech text-[var(--accent-cyan)] uppercase block mb-1">
                    TARGET CALENDAR DATE
                  </label>
                  <input
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg px-3 py-2 text-xs font-mono-tech text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-cyan)]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-mono-tech text-[var(--accent-cyan)] uppercase block mb-1">
                  ASSIGNED ROBOTIC CHAMBER
                </label>
                <select
                  value={preferredChamber}
                  onChange={(e) => setPreferredChamber(e.target.value)}
                  className="w-full bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg px-3 py-2 text-xs font-mono-tech text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-cyan)]"
                >
                  <option>Chamber Alpha (LiDAR Scan & Alignment Dock)</option>
                  <option>Chamber Beta (Zero-Gravity Fluid Station)</option>
                  <option>Chamber Gamma (Graphene Infrared Curing Vault)</option>
                  <option>Chamber Delta (Quantum Dyno Chamber)</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="gk-btn w-full justify-center text-sm py-3"
                >
                  <Send className="w-4 h-4" />
                  <span>DISPATCH PRIORITY DOCK RESERVATION</span>
                </button>
              </div>

              <div className="flex items-center justify-between text-[10px] font-mono-tech text-[var(--text-secondary)] pt-1">
                <span>✓ ZERO DEPOSIT REQUIRED</span>
                <span>✓ CONFIRMATION TRANSMITTED IN 60s</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
