export type ElevationView = 'orbit' | 'over' | 'under';

export interface CarHotspot {
  id: string;
  name: string;
  part: string;
  category: string;
  elevation?: ElevationView; // 'orbit' (sideways), 'over' (top), 'under' (chassis)
  xPercent: number; // base position on car at neutral angle
  yPercent: number;
  visibleAngles: number[]; // range or specific angle indices where hotspot is visible
  description: string;
  before: {
    status: string;
    conditionScore: number; // e.g. 38%
    image: string;
    issues: string[];
    telemetry: {
      wearLevel: string;
      thermalStress: string;
      toleranceDelta: string;
    };
  };
  after: {
    status: string;
    conditionScore: number; // e.g. 99%
    image: string;
    improvements: string[];
    telemetry: {
      wearLevel: string;
      thermalStress: string;
      toleranceDelta: string;
    };
  };
  serviceName: string;
  techNotes: string;
  warranty: string;
  estimatedEnhancementTime: string;
}

export interface ServicePillar {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  description: string;
  specs: string[];
  iconName: string;
  laserFrequency: string;
  accuracy: string;
  priceStarting: string;
  turnaround: string;
}

export interface TechChamber {
  id: string;
  name: string;
  codename: string;
  status: 'ONLINE' | 'CALIBRATING' | 'ACTIVE';
  scanPrecision: string;
  temperature: string;
  atmosphere: string;
  description: string;
  features: string[];
  telemetryMetrics: {
    label: string;
    value: string;
    unit: string;
  }[];
}

export interface TestimonialItem {
  id: string;
  client: string;
  designation: string;
  vehicleModel: string;
  vinSnippet: string;
  serviceCompleted: string;
  quote: string;
  rating: number;
  date: string;
  telemetryScore: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export interface GalleryCar {
  id: string;
  name: string;
  codename: string;
  category: 'Prototype' | 'Track' | 'Supercar' | 'Hypercar';
  brand: string;
  tagline: string;
  thumbnail: string;
  hp: string;
  topSpeed: string;
  zeroToSixty: string;
  engine: string;
  downforce: string;
  chassisScore: number;
  orbit: {
    angle: number;
    label: string;
    src: string;
    alt: string;
  }[];
  over: {
    label: string;
    description: string;
    src: string;
    alt: string;
  };
  under: {
    label: string;
    description: string;
    src: string;
    alt: string;
  };
}
