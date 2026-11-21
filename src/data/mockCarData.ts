import { CarHotspot, ServicePillar, TechChamber, TestimonialItem, FAQItem, GalleryCar } from '../types';

// Single Hypercar Multi-Axis Views (Isolated, NO background, transparent cutout)
// The single "GK Apex-1 Cyber Hypercar" across all 360° orbital angles, plus Over-The-Car (Aerial) and Under-The-Car (Chassis)

export const SINGLE_CAR_MODELS = {
  // 360° Horizontal Orbit (Eye-Level / Sideways)
  orbit: [
    {
      angle: 0,
      label: '0° Front Fascia',
      src: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80',
      vectorCutout: 'front',
      alt: 'GK Apex-1 Front Direct 0°'
    },
    {
      angle: 45,
      label: '45° Front-Right Quarter',
      src: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80',
      vectorCutout: 'front-quarter-right',
      alt: 'GK Apex-1 Front-Right 45°'
    },
    {
      angle: 90,
      label: '90° Sideways Profile (Right)',
      src: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=80',
      vectorCutout: 'profile-right',
      alt: 'GK Apex-1 Profile Right 90°'
    },
    {
      angle: 135,
      label: '135° Rear-Right Quarter',
      src: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80',
      vectorCutout: 'rear-quarter-right',
      alt: 'GK Apex-1 Rear-Right 135°'
    },
    {
      angle: 180,
      label: '180° Rear Exhaust & Wing',
      src: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80',
      vectorCutout: 'rear',
      alt: 'GK Apex-1 Rear 180°'
    },
    {
      angle: 225,
      label: '225° Rear-Left Quarter',
      src: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80',
      vectorCutout: 'rear-quarter-left',
      alt: 'GK Apex-1 Rear-Left 225°'
    },
    {
      angle: 270,
      label: '270° Sideways Profile (Left)',
      src: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=80',
      vectorCutout: 'profile-left',
      alt: 'GK Apex-1 Profile Left 270°'
    },
    {
      angle: 315,
      label: '315° Front-Left Quarter',
      src: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80',
      vectorCutout: 'front-quarter-left',
      alt: 'GK Apex-1 Front-Left 315°'
    }
  ],

  // Over-The-Car (Top-Down Aerial View looking down on the carbon roof, NACA ducts, cockpit, and rear aero wing)
  over: {
    label: 'Over The Car (Top-Down Aerial Inspection)',
    description: 'Orthographic top-down inspection of carbon canopy, NACA cooling channels, twin-plane active wing, and solar telemetry skin.',
    src: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=80',
    alt: 'GK Apex-1 Top-Down Aerial View'
  },

  // Under-The-Car (Chassis Undercarriage View looking up at the flat-bottom venturi ground-effect floor, titanium exhaust bypass, and suspension)
  under: {
    label: 'Under The Car (Chassis & Undercarriage Inspection)',
    description: 'Ground-effect carbon fiber venturi undertray, titanium high-velocity exhaust channels, magnesium skid plates, and active pushrod dampers.',
    src: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=1400&q=80',
    alt: 'GK Apex-1 Under The Car Chassis View'
  }
};

// Comprehensive Multi-Studio Elevation Gallery of Cars
export const STUDIO_CAR_GALLERY: GalleryCar[] = [
  {
    id: 'car-apex-1',
    name: 'GK Apex-1 Prototype',
    codename: 'CHAMBER-01 // EXPERIMENTAL',
    brand: 'GK Autonomous Works',
    category: 'Prototype',
    tagline: 'Pure Aero Prototype with Tri-Motor Quantum Hybrid',
    thumbnail: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=600&q=80',
    hp: '1,050 BHP',
    topSpeed: '355 km/h',
    zeroToSixty: '2.1s',
    engine: 'Tri-Motor Quantum Flux Hybrid',
    downforce: '1,200 kg @ 250 km/h',
    chassisScore: 99,
    orbit: SINGLE_CAR_MODELS.orbit,
    over: SINGLE_CAR_MODELS.over,
    under: SINGLE_CAR_MODELS.under
  },
  {
    id: 'car-gt3rs',
    name: 'Porsche 911 GT3 RS',
    codename: 'CHAMBER-02 // WEISSACH',
    brand: 'Porsche Motorsport',
    category: 'Track',
    tagline: 'High-Downforce DRS Track Weapon with 4.0L Boxer Engine',
    thumbnail: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80',
    hp: '518 BHP',
    topSpeed: '296 km/h',
    zeroToSixty: '3.0s',
    engine: '4.0L Naturally Aspirated Boxer-6',
    downforce: '860 kg @ 285 km/h',
    chassisScore: 98,
    orbit: [
      { angle: 0, label: '0° Front Aero Grille', src: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80', alt: 'Porsche 911 GT3 RS Front 0°' },
      { angle: 45, label: '45° Front Carbon Winglet', src: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=80', alt: 'Porsche 911 GT3 RS 45°' },
      { angle: 90, label: '90° Side Aero Louvers', src: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=80', alt: 'Porsche 911 GT3 RS Profile 90°' },
      { angle: 135, label: '135° Rear DRS Wing', src: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80', alt: 'Porsche 911 GT3 RS 135°' },
      { angle: 180, label: '180° Rear Dual Titanium Exhaust', src: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80', alt: 'Porsche 911 GT3 RS Rear 180°' },
      { angle: 225, label: '225° Rear-Left Quarter', src: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80', alt: 'Porsche 911 GT3 RS 225°' },
      { angle: 270, label: '270° Left Profile Intake', src: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=80', alt: 'Porsche 911 GT3 RS 270°' },
      { angle: 315, label: '315° Front-Left Splitter', src: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80', alt: 'Porsche 911 GT3 RS 315°' }
    ],
    over: {
      label: 'GT3 RS Aerial Roof & DRS Flow Inspection',
      description: 'Single central-radiator hood extractors, double-bubble magnesium roof fins, and active hydraulic DRS top element.',
      src: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=80',
      alt: 'Porsche 911 GT3 RS Top-Down Aerial View'
    },
    under: {
      label: 'GT3 RS Double-Wishbone & Underbody Blades',
      description: 'Aerodynamically teardrop-profiled front double wishbones generating 40kg downforce, flat underfloor NACA brake ducts.',
      src: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=1400&q=80',
      alt: 'Porsche 911 GT3 RS Underbody Chassis View'
    }
  },
  {
    id: 'car-296gtb',
    name: 'Ferrari 296 GTB Assetto',
    codename: 'CHAMBER-03 // FIORANO',
    brand: 'Ferrari Maranello',
    category: 'Supercar',
    tagline: 'Twin-Turbo 120° V6 Plug-In Hybrid with Multimatic Suspension',
    thumbnail: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=600&q=80',
    hp: '819 BHP',
    topSpeed: '330 km/h',
    zeroToSixty: '2.9s',
    engine: '3.0L Twin-Turbo 120° V6 + MGU-K Hybrid',
    downforce: '360 kg @ 250 km/h',
    chassisScore: 97,
    orbit: [
      { angle: 0, label: '0° Front Tea-Tray Aero', src: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1200&q=80', alt: 'Ferrari 296 GTB Front 0°' },
      { angle: 45, label: '45° Front-Right Arch', src: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&w=1200&q=80', alt: 'Ferrari 296 GTB 45°' },
      { angle: 90, label: '90° B-Pillar Air Scoop', src: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1200&q=80', alt: 'Ferrari 296 GTB 90°' },
      { angle: 135, label: '135° Rear Active Spoiler', src: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&w=1200&q=80', alt: 'Ferrari 296 GTB 135°' },
      { angle: 180, label: '180° Center Exhaust Port', src: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80', alt: 'Ferrari 296 GTB Rear 180°' },
      { angle: 225, label: '225° Rear-Left Buttress', src: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&w=1200&q=80', alt: 'Ferrari 296 GTB 225°' },
      { angle: 270, label: '270° Left Profile Carbon Skirt', src: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1200&q=80', alt: 'Ferrari 296 GTB 270°' },
      { angle: 315, label: '315° Front-Left Headlamp Vent', src: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1200&q=80', alt: 'Ferrari 296 GTB 315°' }
    ],
    over: {
      label: 'Ferrari 296 Flying Buttress & Glass Engine Bay',
      description: 'Assetto Fiorano Lexan ultralight rear window, carbon fiber front bib, and roofline air channel directing high-speed airflow into the intercoolers.',
      src: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1400&q=80',
      alt: 'Ferrari 296 GTB Top-Down Aerial View'
    },
    under: {
      label: 'Multimatic Spool-Valve Dampers & Underbody Venturi',
      description: 'Fixed-rate race-derived Multimatic spool-valve shock absorbers, front inverted spoiler underbody channel, and ceramic thermal shielding.',
      src: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=1400&q=80',
      alt: 'Ferrari 296 GTB Underbody Chassis View'
    }
  },
  {
    id: 'car-sto',
    name: 'Lamborghini Huracán STO',
    codename: 'CHAMBER-04 // CORSE',
    brand: 'Squadra Corse',
    category: 'Track',
    tagline: 'Naturally Aspirated V10 Homologation with One-Piece Cofango',
    thumbnail: 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=600&q=80',
    hp: '631 BHP',
    topSpeed: '310 km/h',
    zeroToSixty: '3.0s',
    engine: '5.2L Naturally Aspirated High-Rev V10',
    downforce: '420 kg @ 280 km/h',
    chassisScore: 97,
    orbit: [
      { angle: 0, label: '0° Cofango Integrated Air Ducts', src: 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1200&q=80', alt: 'Huracán STO Front 0°' },
      { angle: 45, label: '45° Front Carbon Splitter', src: 'https://images.unsplash.com/photo-1519245659620-e859806a8d3b?auto=format&fit=crop&w=1200&q=80', alt: 'Huracán STO 45°' },
      { angle: 90, label: '90° Side Shark Fin & Louvers', src: 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1200&q=80', alt: 'Huracán STO 90°' },
      { angle: 135, label: '135° Manual 3-Position Wing', src: 'https://images.unsplash.com/photo-1519245659620-e859806a8d3b?auto=format&fit=crop&w=1200&q=80', alt: 'Huracán STO 135°' },
      { angle: 180, label: '180° Rear High-Mount Dual Pipes', src: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80', alt: 'Huracán STO Rear 180°' },
      { angle: 225, label: '225° Rear Carbon Diffuser Arch', src: 'https://images.unsplash.com/photo-1519245659620-e859806a8d3b?auto=format&fit=crop&w=1200&q=80', alt: 'Huracán STO 225°' },
      { angle: 270, label: '270° Left Profile Intake Strakes', src: 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1200&q=80', alt: 'Huracán STO 270°' },
      { angle: 315, label: '315° Front-Left Wheel Well Pressure Vents', src: 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1200&q=80', alt: 'Huracán STO 315°' }
    ],
    over: {
      label: 'STO Integrated Roof Scoop & Shark Fin',
      description: 'Rear engine decklid louvers for rapid thermal extraction, aerodynamic shark fin enhancing yaw stability through apex curves.',
      src: 'https://images.unsplash.com/photo-1519245659620-e859806a8d3b?auto=format&fit=crop&w=1400&q=80',
      alt: 'Huracán STO Top-Down Aerial View'
    },
    under: {
      label: 'CCM-R F1 Carbon Brakes & Titanium Skid Plate',
      description: 'Brembo CCM-R carbon-ceramic discs with 4x thermal conductivity, rear air diffusers directing flow past rear axle.',
      src: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=1400&q=80',
      alt: 'Huracán STO Underbody Chassis View'
    }
  },
  {
    id: 'car-765lt',
    name: 'McLaren 765LT Spider',
    codename: 'CHAMBER-05 // LONGTAIL',
    brand: 'McLaren Woking',
    category: 'Hypercar',
    tagline: 'Carbon Fiber Monocage II with Active Longtail Airbrake',
    thumbnail: 'https://images.unsplash.com/photo-1621135802920-133df287f89c?auto=format&fit=crop&w=600&q=80',
    hp: '755 BHP',
    topSpeed: '330 km/h',
    zeroToSixty: '2.7s',
    engine: '4.0L Twin-Turbo Flat-Plane V8 (M840T)',
    downforce: 'Active Longtail DRS Airbrake',
    chassisScore: 99,
    orbit: [
      { angle: 0, label: '0° Low-Nose Splitter & Laser Eyes', src: 'https://images.unsplash.com/photo-1621135802920-133df287f89c?auto=format&fit=crop&w=1200&q=80', alt: 'McLaren 765LT Front 0°' },
      { angle: 45, label: '45° Carbon Front Blade', src: 'https://images.unsplash.com/photo-1621135802920-133df287f89c?auto=format&fit=crop&w=1200&q=80', alt: 'McLaren 765LT 45°' },
      { angle: 90, label: '90° Extended Longtail Profile', src: 'https://images.unsplash.com/photo-1621135802920-133df287f89c?auto=format&fit=crop&w=1200&q=80', alt: 'McLaren 765LT 90°' },
      { angle: 135, label: '135° Active Airbrake Extended', src: 'https://images.unsplash.com/photo-1621135802920-133df287f89c?auto=format&fit=crop&w=1200&q=80', alt: 'McLaren 765LT 135°' },
      { angle: 180, label: '180° Quad-Center Titanium Exhaust Pipes', src: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80', alt: 'McLaren 765LT Rear 180°' },
      { angle: 225, label: '225° Rear Carbon Diffuser Blades', src: 'https://images.unsplash.com/photo-1621135802920-133df287f89c?auto=format&fit=crop&w=1200&q=80', alt: 'McLaren 765LT 225°' },
      { angle: 270, label: '270° Left Carbon Side Skirt & Door Blades', src: 'https://images.unsplash.com/photo-1621135802920-133df287f89c?auto=format&fit=crop&w=1200&q=80', alt: 'McLaren 765LT 270°' },
      { angle: 315, label: '315° Front Left Fenders with Air Extraction', src: 'https://images.unsplash.com/photo-1621135802920-133df287f89c?auto=format&fit=crop&w=1200&q=80', alt: 'McLaren 765LT 315°' }
    ],
    over: {
      label: 'McLaren Monocage II Carbon Cockpit & Deck',
      description: 'One-piece carbon fiber canopy structure, glazed C-pillars improving 360 rear visibility, and high-velocity central quad exhaust shielding.',
      src: 'https://images.unsplash.com/photo-1621135802920-133df287f89c?auto=format&fit=crop&w=1400&q=80',
      alt: 'McLaren 765LT Top-Down Aerial View'
    },
    under: {
      label: 'McLaren Full Carbon Floor & Proactive Chassis Control II',
      description: 'Hydraulically cross-linked suspension eliminating physical anti-roll bars, carbon fiber full venturi tunnel flat undertray.',
      src: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=1400&q=80',
      alt: 'McLaren 765LT Underbody Chassis View'
    }
  }
];

export const CAR_360_ANGLES = SINGLE_CAR_MODELS.orbit;

export const CAR_HOTSPOTS: CarHotspot[] = [
  // --- SIDEWAYS / 360° ORBIT HOTSPOTS ---
  {
    id: 'spot-paint',
    name: 'Ceramic 9H Nano-Shield Paint',
    part: 'Front Hood & Aerodynamic Cowl',
    category: 'Exterior Surface Restoration',
    elevation: 'orbit',
    xPercent: 52,
    yPercent: 48,
    visibleAngles: [0, 45, 90, 270, 315],
    description: 'Autonomous multi-stage orbital paint correction followed by aerospace 9H graphene-ceramic molecular bond.',
    before: {
      status: 'Micro-scratched & Acid-Rain Etched',
      conditionScore: 38,
      image: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=800&q=80',
      issues: ['Severe swirl marks under direct halogen', 'Heavy mineral oxidation & clear coat haze', 'Zero hydrophobic repellency (water pooling)'],
      telemetry: {
        wearLevel: 'Critical (62% Clear-Coat Erosion)',
        thermalStress: 'UV Grade 4 Degradation',
        toleranceDelta: '+18 Micron Micro-Grit Variance'
      }
    },
    after: {
      status: '9H Diamond-Mirror Hydrophobic Shield',
      conditionScore: 99,
      image: 'https://images.unsplash.com/photo-1507136566006-cfc505b114fc?auto=format&fit=crop&w=800&q=80',
      improvements: ['99.4% Optical clarity reflection index', 'Super-hydrophobic 112° water contact angle', 'Self-healing elastomeric top-layer at 60°C'],
      telemetry: {
        wearLevel: 'Restored (0.02% variance)',
        thermalStress: 'Heat Deflection rated to 750°C',
        toleranceDelta: 'Sub-micron 0.1nm smooth gloss finish'
      }
    },
    serviceName: 'GK Molecular Nano-Glass Armor',
    techNotes: 'Dual-pass infrared curing at 75°C in sterile Chamber Gamma. Applied 3 layers of Graphene Matrix with 5-year hydrophobic warranty.',
    warranty: '5-Year Certified Warranty',
    estimatedEnhancementTime: '4 Hours Precision Labor'
  },
  {
    id: 'spot-brakes',
    name: 'Carbon-Ceramic Calipers & Rotors',
    part: 'Front Wheel Assembly & Brembo Carbon',
    category: 'Chassis & Braking Systems',
    elevation: 'orbit',
    xPercent: 32,
    yPercent: 64,
    visibleAngles: [45, 90, 270, 315],
    description: 'Ultrasonic rotor resurfacing, high-temperature fluid flush, and Brembo monobloc caliper ultrasonic cleansing.',
    before: {
      status: 'Corroded Rotors & Glazed Brake Pads',
      conditionScore: 42,
      image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80',
      issues: ['Rotor lip groove depth 1.4mm beyond tolerance', 'Pad material glazing causing 14m longer stopping distance', 'Boiling point of DOT4 brake fluid degraded to 142°C'],
      telemetry: {
        wearLevel: 'Pad Depth: 2.1mm (Recommended Min 3.5mm)',
        thermalStress: 'High Thermal Warp detected (+0.08mm)',
        toleranceDelta: 'Braking Force Imbalance: 18.2%'
      }
    },
    after: {
      status: 'Zero-Tolerance Monobloc Carbon Overhaul',
      conditionScore: 100,
      image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80',
      improvements: ['Stopping distance shortened by 8.4 meters at 100km/h', 'Endless RF-650 high-temp racing fluid installed', 'Precision titanium brake shims eliminated all chatter'],
      telemetry: {
        wearLevel: 'Pad Depth: 12.0mm High-Mu Kevlar Carbon',
        thermalStress: 'Operating range up to 920°C fade-free',
        toleranceDelta: 'Braking Force Imbalance: 0.01% (Laser Verified)'
      }
    },
    serviceName: 'GK Hyper-Stop Carbon Overhaul',
    techNotes: 'Calipers disassembled, bead-blasted, re-coated in GK Electric Cyan ceramic bake, reassembled with aerospace titanium bleed nipples.',
    warranty: '3-Year / 50,000 KM Protocol',
    estimatedEnhancementTime: '2.5 Hours Precision Labor'
  },
  {
    id: 'spot-headlights',
    name: 'Digital Laser Matrix Optics',
    part: 'Front Fascia Headlamp Cluster',
    category: 'Optics & Sensor Calibration',
    elevation: 'orbit',
    xPercent: 68,
    yPercent: 44,
    visibleAngles: [0, 45, 315],
    description: 'Polycarbonate lens defogging, UV protective re-polymerization, and micro-stepper beam laser realignment.',
    before: {
      status: 'Yellowed Polycarbonate & Beam Misalignment',
      conditionScore: 35,
      image: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=800&q=80',
      issues: ['Oxidized milky yellow lens blocking 48% lux output', 'Left projector pointing 3.2° high (blinding oncoming traffic)', 'Internal seal failed causing moisture condensation droplets'],
      telemetry: {
        wearLevel: 'Photometric Loss: -52% Beam Intensity',
        thermalStress: 'Laser Diode Junction Temp: 88°C (High)',
        toleranceDelta: 'Beam Angle Offset: +3.2° Pitch'
      }
    },
    after: {
      status: 'Crystalline 4K Lumens Laser Beam',
      conditionScore: 98,
      image: 'https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?auto=format&fit=crop&w=800&q=80',
      improvements: ['Restored full 600-meter high-beam projection range', '3D laser calibration according to SAE J599 standard', 'Vacuum-sealed chamber with nitrogen purge to stop fogging forever'],
      telemetry: {
        wearLevel: 'Photometric Output: 100% (4,800 Lumens / Lamp)',
        thermalStress: 'Cooling Micro-fan Re-greased (42°C Steady)',
        toleranceDelta: 'Beam Alignment: 0.00° Deviation'
      }
    },
    serviceName: 'GK Photonics Laser Matrix Refurbishment',
    techNotes: 'Diamond-abrasive micro-polishing executed via robotic arm, capped with optical UV cured resin.',
    warranty: 'Lifetime Crystal Clarity Guarantee',
    estimatedEnhancementTime: '1.5 Hours Precision Labor'
  },
  {
    id: 'spot-wheels',
    name: 'Forged Monobloc Alloy Wheels',
    part: 'Rear Right Titanium Wheel & Tire',
    category: 'Rotational Dynamics & Suspension',
    elevation: 'orbit',
    xPercent: 78,
    yPercent: 68,
    visibleAngles: [90, 135, 180, 225],
    description: 'Laser radial runout measurement, CNC curb repair, dynamic road-force tire balancing, and ceramic barrel coating.',
    before: {
      status: 'Curb Rash & High-Speed Vibration',
      conditionScore: 51,
      image: 'https://images.unsplash.com/photo-1578844251758-2f71da64c96f?auto=format&fit=crop&w=800&q=80',
      issues: ['Outer rim lip suffered 35mm deep gouge rash', 'Dynamic wheel balance off by 45g causing steering shudder at 110km/h', 'Inner barrel encrusted with baked-on metallic brake dust'],
      telemetry: {
        wearLevel: 'Radial Runout: +1.12mm (Spec Limit 0.4mm)',
        thermalStress: 'Tire Bead Heat Cycle: Grade D Hardened',
        toleranceDelta: 'Harmonic Force Vibration: 82 N'
      }
    },
    after: {
      status: 'Diamond-Cut CNC Finish & Zero Vibration',
      conditionScore: 100,
      image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80',
      improvements: ['5-Axis robotic CNC reprofiled outer lip to 0.01mm tolerance', 'Hunter RoadForce match-mounted tire with 0g residual imbalance', 'High-gloss ceramic barrier repels brake dust for 30,000 km'],
      telemetry: {
        wearLevel: 'Radial Runout: 0.08mm (Better than Factory)',
        thermalStress: 'Nitrogen inflation at 32.0 PSI (ambient stable)',
        toleranceDelta: 'Harmonic Vibration: 2 N (Near Zero)'
      }
    },
    serviceName: 'GK Precision CNC Wheel Restoration',
    techNotes: 'Color-matched with OEM titanium liquid metal bake. High-temperature clear powder coat cured in Chamber Gamma.',
    warranty: '2-Year Finish Guarantee',
    estimatedEnhancementTime: '2 Hours Precision Labor'
  },

  // --- OVER THE CAR (TOP-DOWN AERIAL) HOTSPOTS ---
  {
    id: 'spot-over-roof',
    name: 'Monocoque Carbon Roof & NACA Ducts',
    part: 'Aerodynamic Canopy & Intake Scoop',
    category: 'Aerospace Carbon Composite',
    elevation: 'over',
    xPercent: 50,
    yPercent: 46,
    visibleAngles: [0, 45, 90, 135, 180, 225, 270, 315],
    description: 'High-altitude UV clear coat rejuvenation and autoclave resin infusion to eliminate micro-delamination along roof air channels.',
    before: {
      status: 'UV Clouding & Resin Micro-Fractures',
      conditionScore: 44,
      image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80',
      issues: ['Solar radiation clouding weave pattern clarity', 'Clear resin blistering near rear engine cooling hatch', 'NACA duct lip chipped from debris impacts'],
      telemetry: {
        wearLevel: 'Resin Depth: -35 Micron Oxidation',
        thermalStress: 'Solar Peak Temp: 94°C Heat Soak',
        toleranceDelta: 'Aero Laminar Flow Drag: +4.8%'
      }
    },
    after: {
      status: 'Autoclave Cured High-Gloss Weave',
      conditionScore: 100,
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
      improvements: ['Restored 100% optical carbon fiber 3K twill depth', 'Infused with anti-UV ceramic blockers rated to 1,000 sun hours', 'Re-profiled NACA duct edges for laminar airflow'],
      telemetry: {
        wearLevel: 'Surface Uniformity: 99.8%',
        thermalStress: 'Reflects 88% of ambient infrared radiation',
        toleranceDelta: 'Laminar Drag: Zero Penalty'
      }
    },
    serviceName: 'GK Carbon Monocoque Curing',
    techNotes: 'Surface heated with infrared lamps in Chamber Gamma and finished with 4 coats of ceramic clear.',
    warranty: '5-Year Structural Coating Guarantee',
    estimatedEnhancementTime: '3.5 Hours Precision Labor'
  },
  {
    id: 'spot-over-wing',
    name: 'Dual-Plane Active Aerodynamic Wing',
    part: 'Rear Upper Downforce Assembly',
    category: 'Aerodynamics & Telemetry',
    elevation: 'over',
    xPercent: 50,
    yPercent: 82,
    visibleAngles: [0, 45, 90, 135, 180, 225, 270, 315],
    description: 'Active hydraulic wing servo calibration, carbon endplate balancing, and variable angle-of-attack telemetry audit.',
    before: {
      status: 'Servo Sticking at 12° & Asymmetric Downforce',
      conditionScore: 40,
      image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80',
      issues: ['Hydraulic actuator pressure drop causing sluggish deployment', 'Right side endplate loose by 1.8mm at 200 km/h', 'Downforce deficit causing high-speed tail wag'],
      telemetry: {
        wearLevel: 'Actuator Seal Leak: 0.4 bar/min',
        thermalStress: 'Exhaust plume turbulence distortion',
        toleranceDelta: 'Downforce Deficit: -110 kg at speed'
      }
    },
    after: {
      status: 'Zero-Latency DRS Calibration (450kg Peak)',
      conditionScore: 99,
      image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80',
      improvements: ['Titanium hydraulic cylinders with 35ms response time', 'Aero balance laser verified across full 0° to 42° range', 'DRS air-brake mode tested in Chamber Delta wind tunnel'],
      telemetry: {
        wearLevel: 'Hydraulic Pressure: 180 Bar Constant',
        thermalStress: 'Thermal Shielded to 450°C',
        toleranceDelta: 'Angle Precision: ±0.02° Synchronized'
      }
    },
    serviceName: 'GK Apex Active Wing Dynamics',
    techNotes: 'Calibrated using dual digital inclinometers and Chamber Delta dynamic airflow nozzles.',
    warranty: '3-Year Aerodynamic Warranty',
    estimatedEnhancementTime: '2.5 Hours Precision Labor'
  },

  // --- UNDER THE CAR (CHASSIS & UNDERTRAY) HOTSPOTS ---
  {
    id: 'spot-under-venturi',
    name: 'Ground-Effect Venturi Tunnels & Diffuser',
    part: 'Underbody Carbon Undertray',
    category: 'Ground-Effect Downforce',
    elevation: 'under',
    xPercent: 50,
    yPercent: 70,
    visibleAngles: [0, 45, 90, 135, 180, 225, 270, 315],
    description: 'Flat-bottom floor alignment, carbon strake replacement, suction vortex calibration, and underfloor debris removal.',
    before: {
      status: 'Scraped Venturi Strakes & Vacuum Loss',
      conditionScore: 36,
      image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80',
      issues: ['Bottoming out scraped 60% of center strake height', 'Underfloor suction lost due to air leak at front seam', 'Rock impact punched 15mm fissure into left vortex generator'],
      telemetry: {
        wearLevel: 'Ground Clearance: -12mm sagged under tray',
        thermalStress: 'Direct Transmission Heat Transfer: 140°C',
        toleranceDelta: 'Downforce Loss: -38% Ground Effect'
      }
    },
    after: {
      status: 'Aero-Sealed Flat Floor & High-Modulus Strakes',
      conditionScore: 100,
      image: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=800&q=80',
      improvements: ['Installed replaceable titanium skid pucks on carbon strakes', 'Vacuum-sealed underside restores 100% venturi suction', 'Laser mapped ground clearance to precise 90mm track spec'],
      telemetry: {
        wearLevel: 'Floor Flatness: 0.05mm variance end-to-end',
        thermalStress: 'Gold-foil thermal blanket drops cabin heat 40%',
        toleranceDelta: 'Suction Force: 420kg at 200 km/h'
      }
    },
    serviceName: 'GK Ground-Effect Venturi Overhaul',
    techNotes: 'Vehicle raised in Chamber Alpha dock. Laser scanned undertray with sub-millimeter LiDAR.',
    warranty: '2-Year Chassis Integrity Guarantee',
    estimatedEnhancementTime: '3 Hours Precision Labor'
  },
  {
    id: 'spot-under-exhaust',
    name: 'Inconel & Titanium High-Flow Exhaust',
    part: 'Center Underbody Exhaust Run & Bypass Valves',
    category: 'Exhaust & Thermal Management',
    elevation: 'under',
    xPercent: 50,
    yPercent: 42,
    visibleAngles: [0, 45, 90, 135, 180, 225, 270, 315],
    description: 'High-temperature ultrasonic leak check, electric bypass valve rebuild, and ceramic thermal wrapping to protect gearbox.',
    before: {
      status: 'Cracked Flange Weld & Valve Carbon Seize',
      conditionScore: 48,
      image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=800&q=80',
      issues: ['Exhaust leak at catalytic junction smelling inside cabin', 'Electronic bypass valve stuck 30% open (loss of low-end torque)', 'Thermal wrap disintegrated, overheating differential fluid'],
      telemetry: {
        wearLevel: 'Backpressure: +0.42 Bar Restriction',
        thermalStress: 'Exhaust Surface Temp: 840°C Radiant Heat',
        toleranceDelta: 'Acoustic Decibel Spike: 108 dB (Illegal)'
      }
    },
    after: {
      status: 'Titanium TIG Welded & Ceramic Thermal Shield',
      conditionScore: 99,
      image: 'https://images.unsplash.com/photo-1507136566006-cfc505b114fc?auto=format&fit=crop&w=800&q=80',
      improvements: ['Micro-TIG welded with argon gas shielding for zero porosity', 'Installed ceramic thermal coating dropping heat soak by 220°C', 'High-speed stepper valve programmed for optimal backpressure'],
      telemetry: {
        wearLevel: 'Backpressure: 0.08 Bar (Unrestricted Flow)',
        thermalStress: 'Gearbox Proximity Temp: 68°C Safe Zone',
        toleranceDelta: 'Power Gain: +18 BHP / +24 Nm Torque'
      }
    },
    serviceName: 'GK Inconel & Titanium Exhaust Restoration',
    techNotes: 'Pressure tested to 5 Bar cold and checked with thermal imaging camera during dyno run.',
    warranty: '5-Year Anti-Crack Protocol',
    estimatedEnhancementTime: '3.5 Hours Precision Labor'
  }
];

export const SERVICE_PILLARS: ServicePillar[] = [
  {
    id: 'service-laser',
    code: 'SRV-01',
    title: 'Autonomous Laser Diagnostic Scan',
    subtitle: 'Micro-millimeter chassis & CAN-bus telemetry sweep',
    description: 'We deploy multi-axis optical LiDAR scanners and deep ECU protocol interrogators to uncover micro-fractures, electrical variances, and chassis alignment shifts down to 0.01mm.',
    specs: ['48-Point LiDAR Frame Scan', '1,400 PID Real-Time Interrogation', 'Thermal Infrared Sensor Map', 'Instant Holographic Report'],
    iconName: 'Cpu',
    laserFrequency: '635nm Precision Beam',
    accuracy: '±0.01 mm',
    priceStarting: '$180',
    turnaround: '45 Minutes'
  },
  {
    id: 'service-ceramic',
    code: 'SRV-02',
    title: 'Graphene Nano-Shield Coating',
    subtitle: '9H molecular cross-linking for lifetime paint defense',
    description: 'Infrared-baked molecular ceramic bonding creates an impenetrable hydrophobic armor repelling acid rain, micro-scratches, rock chips, and UV discoloration with deep liquid gloss.',
    specs: ['Triple-layer Graphene Matrix', '112° Super-Hydrophobic Beading', 'Self-Healing Heat Activation', 'Scratch Resistance Rating 9H'],
    iconName: 'ShieldCheck',
    laserFrequency: 'Infrared Cured 75°C',
    accuracy: 'Sub-nanometer bond',
    priceStarting: '$650',
    turnaround: '4 Hours'
  },
  {
    id: 'service-dyno',
    code: 'SRV-03',
    title: 'Quantum Dyno Tuning & Powertrain',
    subtitle: 'ECU telemetry remapping & volumetric efficiency peak',
    description: 'All-wheel synchronized dynamometer testing with closed-loop wideband lambda logging, optimizing ignition timing, boost pressure, and dual-clutch transmission shift thresholds.',
    specs: ['All-Wheel Drive Synchronized Dyno', 'Custom ECU/TCU Calibration', 'Torque-Vectoring Optimization', 'Fuel Octane Adaptive Mapping'],
    iconName: 'Gauge',
    laserFrequency: '10,000 RPM Rated',
    accuracy: '±1 BHP / 1 Nm',
    priceStarting: '$420',
    turnaround: '2.5 Hours'
  },
  {
    id: 'service-brakes',
    code: 'SRV-04',
    title: 'Carbon-Ceramic Braking Overhaul',
    subtitle: 'Zero-fade stopping power under extreme thermal loads',
    description: 'Complete ultrasonic rejuvenation of monobloc calipers, titanium hardware shims, micro-crack rotor inspection, and high-boiling racing fluid purging for instantaneous deceleration.',
    specs: ['Monobloc Caliper Rebuild', 'Diamond Disc Micro-Lapping', 'High-Temp RF-650 Fluid Purge', 'Aero Brake Duct Cleaning'],
    iconName: 'Disc',
    laserFrequency: 'Thermal Stress Tested',
    accuracy: '0.00° Runout',
    priceStarting: '$340',
    turnaround: '2 Hours'
  },
  {
    id: 'service-sensor',
    code: 'SRV-05',
    title: 'Autonomous ADAS & Radar Calibration',
    subtitle: 'Sensor realignment for Level 2/3 autonomous driving',
    description: 'Precision digital target arrays and radar reflectors calibrate forward-facing cameras, blind-spot radar modules, and emergency steering systems with factory-exceeding accuracy.',
    specs: ['Millimeter-Wave Radar Tuning', 'Front Optical Camera Alignment', 'Surround LiDAR Array Target Sync', 'Dynamic Road-Test Verification'],
    iconName: 'Radio',
    laserFrequency: '77 GHz Radar Target',
    accuracy: '±0.05° Angle',
    priceStarting: '$260',
    turnaround: '1.5 Hours'
  },
  {
    id: 'service-cryo',
    code: 'SRV-06',
    title: 'Cryogenic Carbon Blast & Fluid Flush',
    subtitle: '-78.5°C intake valve decontamination & ester fluids',
    description: 'Pelletized dry-ice blasting removes stubborn carbon bake from intake tracts and valves without abrasive wear, complemented by aerospace-grade ester synthetic lubricants.',
    specs: ['Dry-Ice Cryogenic Blast', 'Zero-Solvent Eco Friendly', 'PAO Synthetic Fluid Infusion', 'Magnetic Particle Purge'],
    iconName: 'Flame',
    laserFrequency: 'Non-Abrasive Cryo',
    accuracy: '100% Clean Bore',
    priceStarting: '$310',
    turnaround: '2 Hours'
  }
];

export const TECH_CHAMBERS: TechChamber[] = [
  {
    id: 'chamber-alpha',
    name: 'Chamber Alpha',
    codename: 'THE LASER DOCK',
    status: 'ACTIVE',
    scanPrecision: '±0.005 mm',
    temperature: '21.0°C Stable',
    atmosphere: 'Class 10,000 Cleanroom',
    description: 'Equipped with eight synchronized industrial LiDAR gantries and sub-surface ultrasonic sensors that map complete structural integrity within 90 seconds.',
    features: ['360° Synchronized Robotic Gantry', 'Underbody Sonar Profiler', 'Chassis Torsional Rigidity Sensor', 'Dynamic HUD Overlay Mapping'],
    telemetryMetrics: [
      { label: 'LASER REFRESH', value: '120', unit: 'Hz' },
      { label: 'RESOLUTION', value: '48.2', unit: 'Million Pts' },
      { label: 'FRAME VARIANCE', value: '0.002', unit: 'mm' }
    ]
  },
  {
    id: 'chamber-beta',
    name: 'Chamber Beta',
    codename: 'ZERO-GRAVITY FLUID STATION',
    status: 'ONLINE',
    scanPrecision: '0.1 mL Accuracy',
    temperature: '19.5°C',
    atmosphere: 'Vacuum Sealed',
    description: 'Pressurized pneumatic extraction removes 99.9% of old fluid sediments and replaces with aerospace poly-alpha-olefin synthetics under controlled temperature.',
    features: ['De-oxygenated Fluid Injection', 'Spectral Particle Contamination Sensor', 'Continuous Viscosity Monitoring', 'Rapid Flush Vacuum Lines'],
    telemetryMetrics: [
      { label: 'PRESSURE', value: '14.2', unit: 'BAR' },
      { label: 'PURGE PURITY', value: '99.98', unit: '%' },
      { label: 'CYCLE DURATION', value: '18', unit: 'min' }
    ]
  },
  {
    id: 'chamber-gamma',
    name: 'Chamber Gamma',
    codename: 'MOLECULAR CURING VAULT',
    status: 'ACTIVE',
    scanPrecision: 'Sub-micron layer',
    temperature: '75.0°C IR Target',
    atmosphere: 'HEPA Filtered Airflow',
    description: 'Sterile electrostatic paint and ceramic application vault with carbon-wave shortwave infrared lamps that cure graphene coatings into rock-hard diamond defense.',
    features: ['Automated Electrostatic Guns', 'Shortwave Infrared Array', 'Air Ionization Anti-Static Bars', 'Spectrophotometer Color Match'],
    telemetryMetrics: [
      { label: 'IR INTENSITY', value: '3,800', unit: 'W/m²' },
      { label: 'DUST PPM', value: '0', unit: 'PPM' },
      { label: 'CURING BOND', value: '100', unit: '%' }
    ]
  },
  {
    id: 'chamber-delta',
    name: 'Chamber Delta',
    codename: 'QUANTUM DYNO SIMULATOR',
    status: 'ONLINE',
    scanPrecision: '±0.5 HP',
    temperature: '20.0°C Air Intake',
    atmosphere: 'High-Volume Blower 180 km/h',
    description: 'Quad-roller synchronized dynamometer capable of handling up to 2,000 HP and 350 km/h simulated velocities with real-time exhaust gas analysis.',
    features: ['Dual Eddy Current Retarders', '120,000 CFM Airflow Fans', 'OBD-III CAN Bus High-Speed Stream', 'Acoustic Harmonics Analyzer'],
    telemetryMetrics: [
      { label: 'MAX TORQUE', value: '2,400', unit: 'Nm' },
      { label: 'MAX SPEED', value: '380', unit: 'km/h' },
      { label: 'RESPONSE LATENCY', value: '2', unit: 'ms' }
    ]
  }
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'test-1',
    client: 'Marcus Vance',
    designation: 'Track Competitor & Collector',
    vehicleModel: 'Porsche 911 GT3 RS (992)',
    vinSnippet: '...WP0AF2A97PS',
    serviceCompleted: 'GK Hyper-Stop Carbon + Aero Laser Alignment',
    quote: 'The 360 inspection was mindblowing. Being able to see the worn caliper telemetry before and the restored mirror finish after gave me 100% confidence on the Nürburgring.',
    rating: 5,
    date: '14 Days Ago',
    telemetryScore: '99.8% Precision'
  },
  {
    id: 'test-2',
    client: 'Elena Rostova',
    designation: 'Aero Dynamics Consultant',
    vehicleModel: 'Audi RS e-tron GT Carbon',
    vinSnippet: '...WAUZZZF84NA',
    serviceCompleted: 'Graphene Nano-Shield 9H + Level 3 ADAS Calibration',
    quote: 'GK Services operates like a Formula 1 skunkworks lab. My paint has zero orange peel, the hydrophobic runoff is unreal, and their robotic technician telemetry is unmatched.',
    rating: 5,
    date: '3 Weeks Ago',
    telemetryScore: '100% Certified'
  },
  {
    id: 'test-3',
    client: 'David Sterling',
    designation: 'Tech Venture Principal',
    vehicleModel: 'McLaren 720S Performance',
    vinSnippet: '...SBM14ABA4HW',
    serviceCompleted: 'Quantum Dyno Tuning + Cryogenic Carbon Blast',
    quote: 'Gained +52 wheel horsepower and throttle response is instantaneous. The before-and-after breakdown for my twin-turbo intake was astonishingly transparent.',
    rating: 5,
    date: '1 Month Ago',
    telemetryScore: '99.4% Precision'
  }
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    category: 'Inspection & Process',
    question: 'How does the GK 360° Interactive Telemetry Inspection work?',
    answer: 'Upon entering our reception dock, your vehicle undergoes a 90-second LiDAR drive-through scan. We capture optical surfaces, wheel radial runout, and thermal brake patterns. You receive a cryptographic link to rotate your car in 360°, inspect every hotspot, and compare before/after metrics in real-time.'
  },
  {
    category: 'Warranty & Guarantee',
    question: 'What warranties accompany the GK Services enhancements?',
    answer: 'All ceramic and graphene coatings carry a 5-Year Certified Hydrophobic Warranty. Powertrain and braking overhauls include our 2-Year / 50,000 KM Zero-Tolerance Guarantee with complimentary bi-annual telemetry re-checks.'
  },
  {
    category: 'Vehicle Compatibility',
    question: 'Do you service electric, hybrid, and traditional combustion vehicles?',
    answer: 'Yes. Our bays are certified for 800V high-voltage architectures, hybrid powertrains, and high-strung naturally aspirated or forced-induction supercars. Each chamber is equipped with isolated grounding and specialized diagnostic nodes.'
  },
  {
    category: 'Turnaround Time',
    question: 'Can I wait in the GK Executive Telemetry Lounge during service?',
    answer: 'Absolutely. For express services (Laser Diagnostics, Wheel Road-Force Balance, Express Nano-Shield), enjoy our high-speed workstation lounge with live multi-angle feeds of your car in Chamber Alpha or Gamma.'
  }
];
