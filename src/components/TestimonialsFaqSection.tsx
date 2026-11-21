import React, { useState } from 'react';
import { ShieldCheck, Star, ChevronDown, ChevronUp, HelpCircle, Award, CheckCircle2 } from 'lucide-react';
import { TESTIMONIALS, FAQ_ITEMS } from '../data/mockCarData';

export const TestimonialsFaqSection: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <section
      id="reviews"
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-b border-[var(--border-color)] bg-[var(--bg-primary)] cyber-radial-glow overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--accent-cyan)] text-xs font-mono-tech uppercase tracking-widest mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>Section 06 · Certified Reputation & Protocols</span>
          </div>
          <h2 className="gk-font-h2 font-primary font-black tracking-tight text-[var(--text-primary)]">
            CLIENT TELEMETRY & <span className="text-[var(--accent-cyan)]">FREQUENT INQUIRIES</span>
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[var(--text-secondary)] font-rajdhani font-medium tracking-wide">
            Read field reports from supercar owners, track champions, and electric fleet pilots who trust GK Services for zero-tolerance reliability.
          </p>
        </div>

        {/* 3 Testimonials Cards with -30px Hover Lift (Requirement 8) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {TESTIMONIALS.map((test) => (
            <div
              key={test.id}
              id={`testimonial-card-${test.id}`}
              className="gk-hover-lift rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] p-6 flex flex-col justify-between shadow-md"
            >
              <div>
                {/* Rating & Telemetry Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-amber-400 gap-1">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono-tech text-emerald-400 bg-emerald-950/25 border border-emerald-500/30 px-2 py-0.5 rounded">
                    {test.telemetryScore}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[var(--text-secondary)] italic leading-relaxed mb-6">
                  "{test.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-[var(--border-color)] space-y-1">
                <div className="font-primary font-bold text-sm text-[var(--text-primary)]">
                  {test.client}
                </div>
                <div className="text-xs font-mono-tech text-[var(--accent-cyan)]">
                  {test.vehicleModel}
                </div>
                <div className="text-[10px] font-mono-tech text-[var(--text-secondary)]">
                  {test.serviceCompleted} · {test.date}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* The GK Guarantee Protocol Banner with -30px Hover Lift (Requirement 8) */}
        <div
          id="gk-guarantee-banner"
          className="gk-hover-lift rounded-3xl bg-[var(--bg-card)] border border-[var(--border-color)] p-8 sm:p-10 mb-20 shadow-lg"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <span className="text-xs font-mono-tech uppercase tracking-widest text-[var(--accent-cyan)] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                THE GK ZERO-TOLERANCE CODE
              </span>
              <h3 className="font-primary font-bold text-xl sm:text-2xl text-[var(--text-primary)]">
                UNCONDITIONAL 100% PRECISION STANDARD
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                If our post-service LiDAR telemetry or dynamometer readout reveals even a 0.05% deviation from factory-optimal tolerances, we re-calibrate the entire subsystem at zero cost. That is our aerospace promise.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-xs font-mono-tech text-[var(--text-primary)]">
                <CheckCircle2 className="w-4 h-4 text-[var(--accent-cyan)]" />
                <span>5-Year Hydrophobic Coating Warranty</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono-tech text-[var(--text-primary)]">
                <CheckCircle2 className="w-4 h-4 text-[var(--accent-cyan)]" />
                <span>2-Year / 50,000 KM Mechanical Guarantee</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono-tech text-[var(--text-primary)]">
                <CheckCircle2 className="w-4 h-4 text-[var(--accent-cyan)]" />
                <span>100% Cryptographic Log Traceability</span>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive FAQ Accordion */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="font-primary font-bold text-xl text-[var(--text-primary)] flex items-center justify-center gap-2">
              <HelpCircle className="w-5 h-5 text-[var(--accent-cyan)]" />
              FREQUENTLY ANSWERED PROTOCOLS
            </h3>
          </div>

          <div className="space-y-4">
            {FAQ_ITEMS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  id={`faq-item-${idx}`}
                  className="rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] overflow-hidden transition-all shadow-sm"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-[var(--accent-cyan)]/5 transition-colors cursor-pointer"
                  >
                    <span className="font-primary font-semibold text-sm sm:text-base text-[var(--text-primary)]">
                      {faq.question}
                    </span>
                    <span className="p-1 rounded bg-[var(--bg-primary)] text-[var(--accent-cyan)] border border-[var(--border-color)]">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed border-t border-[var(--border-color)] bg-[var(--bg-card-subtle)]">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
