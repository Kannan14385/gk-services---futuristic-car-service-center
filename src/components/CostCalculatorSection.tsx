import React, { useState } from 'react';
import { Calculator, Check, Zap, Calendar, ArrowRight } from 'lucide-react';

interface CostCalculatorSectionProps {
  onOpenBookingModal: (prefillData?: any) => void;
}

export const CostCalculatorSection: React.FC<CostCalculatorSectionProps> = ({ onOpenBookingModal }) => {
  const [vehicleType, setVehicleType] = useState<'hypercar' | 'ev' | 'super-sedan' | 'performance-suv'>('hypercar');
  const [selectedTier, setSelectedTier] = useState<'telemetry' | 'overhaul' | 'apex'>('overhaul');
  const [addOns, setAddOns] = useState<string[]>(['ceramic', 'cryo']);

  const vehicleMultipliers = {
    'hypercar': { name: 'Hypercar / Track Spec', multiplier: 1.25, badge: 'High-Mu Composite' },
    'ev': { name: 'Next-Gen EV / Hybrid', multiplier: 1.15, badge: '800V Isolated' },
    'super-sedan': { name: 'Performance Sedan', multiplier: 1.0, badge: 'Standard Rig' },
    'performance-suv': { name: 'Performance SUV', multiplier: 1.1, badge: 'Heavy-Duty Lift' },
  };

  const serviceTiers = [
    {
      id: 'telemetry',
      name: 'Tier 1: Telemetry Diagnostic',
      basePrice: 220,
      description: '48-Point LiDAR frame verification, CAN-bus sweep, and fluid spectrometry.',
      turnaround: '1.5 Hours',
    },
    {
      id: 'overhaul',
      name: 'Tier 2: Precision Overhaul',
      basePrice: 680,
      description: 'Complete brake caliper rejuvenation, wheel road-force balancing, and dyno mapping.',
      turnaround: '4 Hours',
      popular: true,
    },
    {
      id: 'apex',
      name: 'Tier 3: Apex Restoration & Armor',
      basePrice: 1450,
      description: 'Full Graphene 9H ceramic shield, cryogenic valve purge, and chassis laser alignment.',
      turnaround: 'Full Day Protocol',
    },
  ];

  const optionalAddons = [
    { id: 'ceramic', name: 'Ceramic Caliper & Barrel Bake', price: 180 },
    { id: 'cryo', name: 'Cryogenic -78.5°C Valve Purge', price: 240 },
    { id: 'adas', name: 'Level 3/4 ADAS Radar Realignment', price: 160 },
    { id: 'hud', name: 'Cryptographic Telemetry Pass (NFT)', price: 90 },
  ];

  const toggleAddon = (id: string) => {
    setAddOns((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const selectedTierObj = serviceTiers.find((t) => t.id === selectedTier) || serviceTiers[1];
  const tierPrice = selectedTierObj.basePrice * vehicleMultipliers[vehicleType].multiplier;
  const addonsPrice = addOns.reduce((total, addonId) => {
    const item = optionalAddons.find((a) => a.id === addonId);
    return total + (item ? item.price : 0);
  }, 0);

  const totalPrice = Math.round(tierPrice + addonsPrice);

  return (
    <section
      id="calculator"
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-b border-[var(--border-color)] bg-[var(--bg-primary)] cyber-radial-glow overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--accent-cyan)] text-xs font-mono-tech uppercase tracking-widest mb-3">
              <Calculator className="w-3.5 h-3.5" />
              <span>Section 05 · Transparent Estimation</span>
            </div>
            <h2 className="gk-font-h2 font-primary font-black tracking-tight text-[var(--text-primary)]">
              SERVICE TERMINAL & <span className="text-[var(--accent-cyan)]">ESTIMATOR</span>
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[var(--text-secondary)] max-w-2xl font-rajdhani font-medium tracking-wide">
              Calculate instant protocol pricing for your vehicle architecture. No hidden fees, zero ambiguity, all backed by certified technician logs.
            </p>
          </div>

          <div className="text-xs font-mono-tech text-[var(--text-secondary)]">
            PRICING MATRIX REFRESHED DAILY · FIXED RATES
          </div>
        </div>

        {/* The Calculator Box with -30px Hover Lift (Requirement 8) */}
        <div
          id="calculator-container"
          className="gk-hover-lift rounded-3xl bg-[var(--bg-card)] border border-[var(--border-color)] p-6 sm:p-10 shadow-xl"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column: Form Controls */}
            <div className="lg:col-span-7 space-y-8">
              {/* Step 1: Vehicle Platform */}
              <div>
                <label className="text-xs font-mono-tech uppercase tracking-wider text-[var(--accent-cyan)] block mb-3">
                  STEP 1: SELECT VEHICLE PLATFORM ARCHITECTURE
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {(Object.keys(vehicleMultipliers) as (keyof typeof vehicleMultipliers)[]).map((vKey) => {
                    const item = vehicleMultipliers[vKey];
                    const isSelected = vehicleType === vKey;
                    return (
                      <button
                        key={vKey}
                        id={`vehicle-type-${vKey}`}
                        type="button"
                        onClick={() => setVehicleType(vKey)}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          isSelected
                            ? 'bg-[var(--accent-cyan)]/15 border-[var(--accent-cyan)] shadow-[0_0_15px_var(--accent-glow)]'
                            : 'bg-[var(--bg-primary)] border-[var(--border-color)] text-[var(--text-secondary)] hover:border-[var(--accent-cyan)]/40'
                        }`}
                      >
                        <span className="text-[10px] font-mono-tech block text-[var(--text-secondary)] uppercase">
                          {item.badge}
                        </span>
                        <span className="font-primary text-xs font-bold text-[var(--text-primary)] block mt-1">
                          {item.name.split('/')[0]}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Protocol Tier */}
              <div>
                <label className="text-xs font-mono-tech uppercase tracking-wider text-[var(--accent-cyan)] block mb-3">
                  STEP 2: CHOOSE ENHANCEMENT TIER
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {serviceTiers.map((tier) => {
                    const isSelected = selectedTier === tier.id;
                    return (
                      <div
                        key={tier.id}
                        id={`tier-card-${tier.id}`}
                        onClick={() => setSelectedTier(tier.id as any)}
                        className={`cursor-pointer p-4 rounded-xl border transition-all flex flex-col justify-between relative ${
                          isSelected
                            ? 'bg-[var(--accent-cyan)]/15 border-[var(--accent-cyan)] shadow-[0_0_20px_var(--accent-glow)]'
                            : 'bg-[var(--bg-primary)] border-[var(--border-color)] hover:border-[var(--accent-cyan)]/40'
                        }`}
                      >
                        {tier.popular && (
                          <span className="absolute -top-2.5 right-3 px-2 py-0.5 rounded-full text-[9px] font-mono-tech uppercase bg-[var(--accent-cyan)] text-white font-extrabold shadow-md">
                            RECOMMENDED
                          </span>
                        )}
                        <div>
                          <span className="text-[11px] font-mono-tech text-[var(--text-secondary)]">
                            {tier.turnaround}
                          </span>
                          <h4 className="font-primary font-bold text-sm text-[var(--text-primary)] mt-1">
                            {tier.name.split(':')[1]}
                          </h4>
                          <p className="text-xs text-[var(--text-secondary)] mt-2 line-clamp-2">
                            {tier.description}
                          </p>
                        </div>
                        <div className="mt-4 pt-2 border-t border-[var(--border-color)] flex items-baseline justify-between">
                          <span className="text-[10px] font-mono-tech text-[var(--text-secondary)]">BASE:</span>
                          <span className="font-primary font-bold text-base text-[var(--accent-cyan)]">
                            ${tier.basePrice}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step 3: High-Tech Optional Add-Ons */}
              <div>
                <label className="text-xs font-mono-tech uppercase tracking-wider text-[var(--accent-cyan)] block mb-3">
                  STEP 3: AUTONOMOUS UPGRADE PACKAGES
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {optionalAddons.map((addon) => {
                    const isChecked = addOns.includes(addon.id);
                    return (
                      <div
                        key={addon.id}
                        id={`addon-toggle-${addon.id}`}
                        onClick={() => toggleAddon(addon.id)}
                        className={`cursor-pointer p-3 rounded-xl border flex items-center justify-between transition-all ${
                          isChecked
                            ? 'bg-[var(--accent-cyan)]/10 border-[var(--accent-cyan)] text-[var(--text-primary)]'
                            : 'bg-[var(--bg-primary)] border-[var(--border-color)] text-[var(--text-secondary)] hover:border-[var(--accent-cyan)]/30'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`w-5 h-5 rounded flex items-center justify-center border transition-all ${
                              isChecked ? 'bg-[var(--accent-cyan)] border-[var(--accent-cyan)] text-white' : 'border-[var(--border-color)]'
                            }`}
                          >
                            {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                          <span className="text-xs font-mono-tech">{addon.name}</span>
                        </div>
                        <span className="font-primary text-xs font-bold text-[var(--accent-cyan)]">
                          +${addon.price}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column: Live Estimate Terminal HUD */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div className="rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-color)] p-6 space-y-6 shadow-xl">
                <div className="flex items-center justify-between pb-3 border-b border-[var(--border-color)]">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-[var(--accent-cyan)]" />
                    <span className="font-primary text-xs font-bold uppercase text-[var(--text-primary)]">
                      ESTIMATE RECEIPT
                    </span>
                  </div>
                  <span className="text-[10px] font-mono-tech text-emerald-400 bg-emerald-950/30 px-2 py-0.5 rounded border border-emerald-500/30">
                    REAL-TIME RATE
                  </span>
                </div>

                <div className="space-y-3 text-xs font-mono-tech">
                  <div className="flex justify-between py-1 border-b border-[var(--border-color)] text-[var(--text-secondary)]">
                    <span>PLATFORM:</span>
                    <span className="text-[var(--text-primary)]">{vehicleMultipliers[vehicleType].name}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[var(--border-color)] text-[var(--text-secondary)]">
                    <span>SERVICE TIER:</span>
                    <span className="text-[var(--accent-cyan)] font-semibold">{selectedTierObj.name}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[var(--border-color)] text-[var(--text-secondary)]">
                    <span>BASE TIER CALCULATION:</span>
                    <span className="text-[var(--text-primary)]">${Math.round(tierPrice)}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[var(--border-color)] text-[var(--text-secondary)]">
                    <span>UPGRADES ADDED ({addOns.length}):</span>
                    <span className="text-[var(--text-primary)]">+${addonsPrice}</span>
                  </div>
                  <div className="flex justify-between py-1 text-[var(--text-secondary)]">
                    <span>ESTIMATED DURATION:</span>
                    <span className="text-emerald-400">{selectedTierObj.turnaround}</span>
                  </div>
                </div>

                {/* Total Cost Display */}
                <div className="p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)]">
                  <span className="text-[11px] font-mono-tech text-[var(--text-secondary)] uppercase block">
                    TOTAL ESTIMATED INVESTMENT
                  </span>
                  <div className="flex items-baseline justify-between mt-1">
                    <span className="font-primary font-black text-3xl sm:text-4xl text-[var(--accent-cyan)] drop-shadow-[0_0_20px_var(--accent-glow)]">
                      ${totalPrice}
                    </span>
                    <span className="text-[11px] font-mono-tech text-emerald-400">
                      FIXED PRICING LOCK
                    </span>
                  </div>
                </div>

                {/* Booking Call to Action */}
                <button
                  id="calc-reserve-dock-btn"
                  onClick={() =>
                    onOpenBookingModal({
                      vehicleType: vehicleMultipliers[vehicleType].name,
                      serviceTier: selectedTierObj.name,
                      totalEstimate: totalPrice,
                    })
                  }
                  className="gk-btn w-full justify-center text-sm py-3.5"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Confirm & Lock Dock Slot</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-[11px] text-[var(--text-secondary)] text-center font-mono-tech">
                  Zero deposit required to reserve slot · Free rescheduling up to 4h prior
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
