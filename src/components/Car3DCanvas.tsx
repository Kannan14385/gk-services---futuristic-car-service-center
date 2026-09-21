import React, { useRef, useEffect, useState, useCallback } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import {
  RotateCw, Play, Pause, Compass, Layers, ZoomIn, ZoomOut, Sparkles,
  RefreshCw, Eye, ArrowUp, ArrowDown, Palette, Disc, Shield, Gauge,
  Volume2, VolumeX, Shuffle, Zap, Sliders, ChevronRight, CheckCircle2
} from 'lucide-react';
import { CAR_HOTSPOTS } from '../data/mockCarData';
import { CarHotspot } from '../types';

interface Car3DCanvasProps {
  onSelectHotspot: (hotspot: CarHotspot) => void;
}

// 3D Hotspot Definition mapped to real 3D Coordinates
interface Hotspot3D {
  id: string;
  name: string;
  part: string;
  position: THREE.Vector3;
  data: CarHotspot;
}

// Available Body Paint Colors (incorporating user's primary/secondary themes)
export const PAINT_FINISHES = [
  { name: 'Rosso Corsa (Dark Secondary)', hex: '#D75151', emissive: '#8a2424' },
  { name: 'Bronze Warm (Light Secondary)', hex: '#8A6A4A', emissive: '#523a23' },
  { name: 'Stealth Onyx (Dark Primary)', hex: '#171719', emissive: '#242429' },
  { name: 'Midnight Navy (Light Primary)', hex: '#252642', emissive: '#161729' },
  { name: 'Cyber Cyan', hex: '#00f0ff', emissive: '#006680' },
  { name: 'Apex Cobalt', hex: '#2563eb', emissive: '#0284c7' },
  { name: 'Titanium Silver', hex: '#e2e8f0', emissive: '#94a3b8' },
  { name: 'Solar Gold', hex: '#f59e0b', emissive: '#d97706' },
  { name: 'Toxic Lime', hex: '#84cc16', emissive: '#4d7c0f' },
  { name: 'Pearl White', hex: '#f8fafc', emissive: '#cbd5e1' },
];

// Rim Styles
export type RimStyle = 'forged-5' | 'turbine-aero' | 'cyber-mesh' | 'concave-star';
export const RIM_STYLES: { id: RimStyle; label: string; desc: string }[] = [
  { id: 'forged-5', label: 'Forged 5-Spoke', desc: 'Lightweight monobloc racing spokes' },
  { id: 'turbine-aero', label: 'Aero-Turbine Disc', desc: 'Solid low-drag vortex turbine covers' },
  { id: 'cyber-mesh', label: 'Cyber Dual-Mesh', desc: 'High-density aerospace titanium weave' },
  { id: 'concave-star', label: 'Deep Concave Star', desc: 'Aggressive wide-offset racing star' },
];

export const RIM_COLORS = [
  { name: 'Liquid Chrome', hex: '#f1f5f9' },
  { name: 'Solar Gold', hex: '#f59e0b' },
  { name: 'Gloss Obsidian', hex: '#18181b' },
  { name: 'Cyber Cyan', hex: '#00f0ff' },
];

// Tire Options
export type TireType = 'slicks' | 'grooved' | 'neonglow' | 'allweather';
export const TIRE_OPTIONS: { id: TireType; label: string; desc: string }[] = [
  { id: 'slicks', label: 'Track Racing Slicks', desc: 'Zero-tread ultra-high grip tarmac compound' },
  { id: 'grooved', label: 'Sport Directional Grooves', desc: 'High-velocity water evacuation channels' },
  { id: 'neonglow', label: 'Cyber Neon Glow Ring', desc: 'Photonic light ring embedded in sidewall' },
  { id: 'allweather', label: 'All-Weather Heavy Rib', desc: 'Deep multi-siped rain & tarmac grip' },
];

// Caliper Colors
export const CALIPER_COLORS = [
  { name: 'Electric Cyan', hex: '#00f0ff' },
  { name: 'Track Red', hex: '#dc2626' },
  { name: 'Speed Yellow', hex: '#eab308' },
  { name: 'Solar Orange', hex: '#f97316' },
  { name: 'Titanium Grey', hex: '#64748b' },
];

// Spoiler Options
export type SpoilerStyle = 'gt-wing' | 'ducktail' | 'active-twin' | 'wingless';
export const SPOILER_OPTIONS: { id: SpoilerStyle; label: string; desc: string }[] = [
  { id: 'gt-wing', label: 'GT Carbon Wing', desc: 'High-downforce dual-pylon with endplates' },
  { id: 'ducktail', label: 'Carbon Ducktail Lip', desc: 'Integrated low-drag bootlid spoiler' },
  { id: 'active-twin', label: 'Active Twin Airbrakes', desc: 'Split dynamic variable aero vanes' },
  { id: 'wingless', label: 'Flush Streamline', desc: 'Minimalist high top-speed profile' },
];

// Neon Underglow Colors
export const UNDERGLOW_COLORS = [
  { name: 'Neon Cyan', hex: '#00f0ff' },
  { name: 'Cyber Magenta', hex: '#ec4899' },
  { name: 'Solar Amber', hex: '#f59e0b' },
  { name: 'Acid Green', hex: '#22c55e' },
  { name: 'Stealth Off', hex: 'off' },
];

export const Car3DCanvas: React.FC<Car3DCanvasProps> = ({ onSelectHotspot }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  // Customization States
  const [selectedPaint, setSelectedPaint] = useState<string>('#00f0ff');
  const [paintFinish, setPaintFinish] = useState<'metallic' | 'matte' | 'pearl'>('metallic');
  const [rimStyle, setRimStyle] = useState<RimStyle>('forged-5');
  const [rimColor, setRimColor] = useState<string>('#f1f5f9');
  const [tireType, setTireType] = useState<TireType>('neonglow');
  const [caliperColor, setCaliperColor] = useState<string>('#00f0ff');
  const [spoilerStyle, setSpoilerStyle] = useState<SpoilerStyle>('gt-wing');
  const [underglowColor, setUnderglowColor] = useState<string>('#00f0ff');
  const [headlightsOn, setHeadlightsOn] = useState<boolean>(true);

  // Interactive Play States
  const [isAutoRotating, setIsAutoRotating] = useState<boolean>(false);
  const [wireframeMode, setWireframeMode] = useState<boolean>(false);
  const [isRevving, setIsRevving] = useState<boolean>(false);
  const [showHotspots, setShowHotspots] = useState<boolean>(true);
  const [activeCustomTab, setActiveCustomTab] = useState<'paint' | 'wheels' | 'aero' | 'presets'>('paint');

  // Telemetry HUD States
  const [cameraAzimuth, setCameraAzimuth] = useState<number>(45);
  const [cameraElevation, setCameraElevation] = useState<number>(20);
  const [hotspotScreenPositions, setHotspotScreenPositions] = useState<{ [key: string]: { x: number; y: number; visible: boolean } }>({});
  const [modelLoaded, setModelLoaded] = useState<boolean>(false);
  const [loadProgress, setLoadProgress] = useState<number>(0);

  // Three.js References
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const carGroupRef = useRef<THREE.Group | null>(null);
  const proceduralBodyRef = useRef<THREE.Group | null>(null);
  const loadedCarModelRef = useRef<THREE.Group | null>(null);
  const wheelsGroupRef = useRef<THREE.Group | null>(null);
  const rotatingRimsRef = useRef<THREE.Group[]>([]);
  const spoilerGroupRef = useRef<THREE.Group | null>(null);
  const underglowLightRef = useRef<THREE.PointLight | null>(null);
  const exhaustGlowLightsRef = useRef<THREE.PointLight[]>([]);
  const headlightConesRef = useRef<THREE.SpotLight[]>([]);
  const paintMaterialsRef = useRef<THREE.MeshPhysicalMaterial[]>([]);
  const allMeshesRef = useRef<THREE.Mesh[]>([]);
  const animFrameIdRef = useRef<number | null>(null);
  const spinSpeedRef = useRef<number>(0);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Orbit state
  const orbitState = useRef({
    isDragging: false,
    prevMouseX: 0,
    prevMouseY: 0,
    theta: Math.PI / 4,
    phi: Math.PI / 3,
    radius: 7.5,
    target: new THREE.Vector3(0, 0.4, 0),
    damping: 0.08,
    targetTheta: Math.PI / 4,
    targetPhi: Math.PI / 3,
    targetRadius: 7.5,
  });

  // Hotspots mapped to 3D space
  const hotspots3D = useRef<Hotspot3D[]>([
    {
      id: 'hotspot-hood',
      name: 'Autonomous Laser Sensor',
      part: 'Front Hood Sensor Pod',
      position: new THREE.Vector3(0, 0.75, 1.8),
      data: CAR_HOTSPOTS[0],
    },
    {
      id: 'hotspot-wheel',
      name: 'Carbon-Ceramic Braking & Wheels',
      part: 'Right Wheel Assembly',
      position: new THREE.Vector3(1.18, 0.45, 1.3),
      data: CAR_HOTSPOTS[1],
    },
    {
      id: 'hotspot-wing',
      name: 'Active Aerodynamic Wing & Dyno',
      part: 'Rear Downforce GT Wing',
      position: new THREE.Vector3(0, 1.25, -2.1),
      data: CAR_HOTSPOTS[2],
    },
    {
      id: 'hotspot-diffuser',
      name: 'Ground-Effect Venturi Diffuser',
      part: 'Sub-Chassis Undercarriage',
      position: new THREE.Vector3(0, -0.05, -1.1),
      data: CAR_HOTSPOTS[3],
    },
    {
      id: 'hotspot-cockpit',
      name: 'Holographic HUD & 9H Glass',
      part: 'Smart Cockpit Canopy',
      position: new THREE.Vector3(0, 0.98, 0.15),
      data: CAR_HOTSPOTS[4],
    },
  ]);

  // Sound Synthesizer via Web Audio API for Engine Rev Rumble
  const playRevSound = useCallback(() => {
    try {
      if (!audioContextRef.current) {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioContextRef.current = new AudioContextClass();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'sawtooth';
      const now = ctx.currentTime;
      osc.frequency.setValueAtTime(55, now);
      osc.frequency.exponentialRampToValueAtTime(260, now + 0.4);
      osc.frequency.exponentialRampToValueAtTime(70, now + 1.2);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(320, now);
      filter.frequency.exponentialRampToValueAtTime(1400, now + 0.4);
      filter.frequency.exponentialRampToValueAtTime(380, now + 1.2);

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.18, now + 0.2);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 1.25);
    } catch {
      // Audio context policy safe
    }
  }, []);

  // Camera presets
  const setCameraPreset = (thetaDeg: number, phiDeg: number, radius = 7.5) => {
    setIsAutoRotating(false);
    orbitState.current.targetTheta = (thetaDeg * Math.PI) / 180;
    orbitState.current.targetPhi = Math.max(0.1, Math.min(Math.PI - 0.1, (phiDeg * Math.PI) / 180));
    orbitState.current.targetRadius = radius;
  };

  const handleZoom = (delta: number) => {
    orbitState.current.targetRadius = Math.max(4.2, Math.min(11.0, orbitState.current.targetRadius + delta));
  };

  // 1. Scene Initialization
  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    cameraRef.current = camera;
    camera.position.set(5, 3.5, 5);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    rendererRef.current = renderer;
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // Lighting Rig
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.95);
    scene.add(ambientLight);

    const mainKeyLight = new THREE.DirectionalLight(0xffffff, 2.0);
    mainKeyLight.position.set(6, 10, 6);
    mainKeyLight.castShadow = true;
    mainKeyLight.shadow.mapSize.width = 2048;
    mainKeyLight.shadow.mapSize.height = 2048;
    mainKeyLight.shadow.bias = -0.0005;
    scene.add(mainKeyLight);

    const cyanRimLight = new THREE.DirectionalLight(0x00f0ff, 1.5);
    cyanRimLight.position.set(-6, 5, -6);
    scene.add(cyanRimLight);

    // Underglow ground point light
    const underGlowLight = new THREE.PointLight(0x00f0ff, 3.2, 6.5);
    underGlowLight.position.set(0, -0.3, 0);
    scene.add(underGlowLight);
    underglowLightRef.current = underGlowLight;

    // Twin Exhaust Flame Point Lights
    const exhaustLeft = new THREE.PointLight(0x00f0ff, 0, 3);
    exhaustLeft.position.set(0.3, 0.35, -2.25);
    scene.add(exhaustLeft);

    const exhaustRight = new THREE.PointLight(0x00f0ff, 0, 3);
    exhaustRight.position.set(-0.3, 0.35, -2.25);
    scene.add(exhaustRight);
    exhaustGlowLightsRef.current = [exhaustLeft, exhaustRight];

    // Headlight Spotlights
    const leftHeadBeam = new THREE.SpotLight(0xffffff, 3.5, 12, Math.PI / 7, 0.4);
    leftHeadBeam.position.set(0.65, 0.44, 2.2);
    leftHeadBeam.target.position.set(0.65, 0, 6);
    scene.add(leftHeadBeam);
    scene.add(leftHeadBeam.target);

    const rightHeadBeam = new THREE.SpotLight(0xffffff, 3.5, 12, Math.PI / 7, 0.4);
    rightHeadBeam.position.set(-0.65, 0.44, 2.2);
    rightHeadBeam.target.position.set(-0.65, 0, 6);
    scene.add(rightHeadBeam);
    scene.add(rightHeadBeam.target);
    headlightConesRef.current = [leftHeadBeam, rightHeadBeam];

    // Studio Stage Floor
    const groundGroup = new THREE.Group();
    scene.add(groundGroup);

    const floorGeo = new THREE.CircleGeometry(4.8, 64);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0xdfeaf7,
      roughness: 0.35,
      metalness: 0.45,
    });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.position.y = -0.01;
    floorMesh.receiveShadow = true;
    groundGroup.add(floorMesh);

    // Glowing Neon Stage Perimeter Rings
    [4.7, 3.6, 2.2].forEach((radius, idx) => {
      const ringGeo = new THREE.RingGeometry(radius - 0.02, radius + 0.02, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color: idx === 0 ? 0x7ad7ff : 0x8aa5ff,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: idx === 0 ? 0.7 : 0.25,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = -Math.PI / 2;
      ring.position.y = 0.001;
      groundGroup.add(ring);
    });

    // Outer Stage Radial Grid Marks
    for (let i = 0; i < 24; i++) {
      const angle = (i * Math.PI * 2) / 24;
      const markerGeo = new THREE.BoxGeometry(0.04, 0.005, 0.3);
      const markerMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.3 });
      const marker = new THREE.Mesh(markerGeo, markerMat);
      marker.position.set(Math.cos(angle) * 4.2, 0.005, Math.sin(angle) * 4.2);
      marker.rotation.y = -angle;
      groundGroup.add(marker);
    }

    // Car Body Assembly
    const carGroup = new THREE.Group();
    carGroup.position.set(0, 0, 0);
    scene.add(carGroup);
    carGroupRef.current = carGroup;

    // Materials Library
    const paintMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(selectedPaint),
      metalness: 0.85,
      roughness: 0.15,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
    });
    paintMaterialsRef.current = [paintMat];

    const carbonMat = new THREE.MeshStandardMaterial({
      color: 0x111622,
      roughness: 0.45,
      metalness: 0.65,
    });

    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x0a1628,
      metalness: 0.9,
      roughness: 0.05,
      transmission: 0.75,
      transparent: true,
      opacity: 0.82,
    });

    const ledGlowMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0x00f0ff,
      emissiveIntensity: 3.5,
    });

    const tailGlowMat = new THREE.MeshStandardMaterial({
      color: 0xff2222,
      emissive: 0xff0033,
      emissiveIntensity: 4.0,
    });

    allMeshesRef.current = [];
    const collectMesh = (mesh: THREE.Mesh) => {
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      allMeshesRef.current.push(mesh);
      return mesh;
    };

    // Main Monocoque Chassis Tub (Sleek sports car waistline)
    const mainTubGeo = new THREE.BoxGeometry(1.88, 0.38, 4.45);
    const mainTub = collectMesh(new THREE.Mesh(mainTubGeo, carbonMat));
    mainTub.position.set(0, 0.34, 0);
    carGroup.add(mainTub);

    // Front Hood & Aerodynamic Sloping Hood Wedge
    const hoodGeo = new THREE.BoxGeometry(1.78, 0.22, 1.8);
    const hood = collectMesh(new THREE.Mesh(hoodGeo, paintMat));
    hood.position.set(0, 0.44, 1.25);
    hood.rotation.x = 0.085;
    carGroup.add(hood);

    // Dual Hood Vent Scoops (Supercar heat extraction)
    [-0.38, 0.38].forEach((xPos) => {
      const ventGeo = new THREE.BoxGeometry(0.24, 0.03, 0.55);
      const vent = collectMesh(new THREE.Mesh(ventGeo, carbonMat));
      vent.position.set(xPos, 0.54, 1.15);
      vent.rotation.x = 0.12;
      carGroup.add(vent);
    });

    // Aerodynamic Nose Cone & Front Bumper Valence
    const noseConeGeo = new THREE.ConeGeometry(0.94, 0.75, 4);
    const noseCone = collectMesh(new THREE.Mesh(noseConeGeo, paintMat));
    noseCone.rotation.x = Math.PI / 2;
    noseCone.rotation.y = Math.PI / 4;
    noseCone.scale.set(1.42, 0.76, 0.36);
    noseCone.position.set(0, 0.33, 2.32);
    carGroup.add(noseCone);

    // Front Center Radiator Air Dam Grille (Matte black honeycomb appearance)
    const frontGrilleGeo = new THREE.BoxGeometry(1.25, 0.16, 0.12);
    const grilleMat = new THREE.MeshStandardMaterial({ color: 0x050508, roughness: 0.85 });
    const frontGrille = collectMesh(new THREE.Mesh(frontGrilleGeo, grilleMat));
    frontGrille.position.set(0, 0.22, 2.36);
    carGroup.add(frontGrille);

    // Front Aerodynamic Carbon Splitter & Winglets
    const splitterGeo = new THREE.BoxGeometry(2.08, 0.04, 0.95);
    const splitter = collectMesh(new THREE.Mesh(splitterGeo, carbonMat));
    splitter.position.set(0, 0.14, 2.02);
    carGroup.add(splitter);

    // Front Splitter Side Winglets
    [-1.04, 1.04].forEach((xPos) => {
      const wingletGeo = new THREE.BoxGeometry(0.04, 0.14, 0.35);
      const winglet = collectMesh(new THREE.Mesh(wingletGeo, carbonMat));
      winglet.position.set(xPos, 0.2, 2.12);
      carGroup.add(winglet);
    });

    // Front Sculpted Wheel Arches / Fenders
    const leftFenderGeo = new THREE.BoxGeometry(0.32, 0.44, 1.25);
    const leftFender = collectMesh(new THREE.Mesh(leftFenderGeo, paintMat));
    leftFender.position.set(0.96, 0.47, 1.35);
    carGroup.add(leftFender);

    const rightFender = collectMesh(new THREE.Mesh(leftFenderGeo, paintMat));
    rightFender.position.set(-0.96, 0.47, 1.35);
    carGroup.add(rightFender);

    // Front Fender Aero Louvers (Wheel arch pressure vents)
    [-0.98, 0.98].forEach((xPos) => {
      for (let l = 0; l < 3; l++) {
        const louverGeo = new THREE.BoxGeometry(0.2, 0.015, 0.05);
        const louver = collectMesh(new THREE.Mesh(louverGeo, carbonMat));
        louver.position.set(xPos, 0.69 + l * 0.01, 1.3 + l * 0.08);
        carGroup.add(louver);
      }
    });

    // Rear Muscular Haunches (Widebody Quarters)
    const rearFenderGeo = new THREE.BoxGeometry(0.42, 0.52, 1.45);
    const leftRearFender = collectMesh(new THREE.Mesh(rearFenderGeo, paintMat));
    leftRearFender.position.set(1.02, 0.52, -1.35);
    carGroup.add(leftRearFender);

    const rightRearFender = collectMesh(new THREE.Mesh(rearFenderGeo, paintMat));
    rightRearFender.position.set(-1.02, 0.52, -1.35);
    carGroup.add(rightRearFender);

    // Sculpted Carbon Side Skirts (Ground effect rockers)
    [-1.02, 1.02].forEach((xPos) => {
      const skirtGeo = new THREE.BoxGeometry(0.14, 0.06, 2.1);
      const skirt = collectMesh(new THREE.Mesh(skirtGeo, carbonMat));
      skirt.position.set(xPos, 0.16, 0);
      carGroup.add(skirt);
    });

    // Sleek Aerodynamic Cockpit Glass Canopy
    const canopyGeo = new THREE.SphereGeometry(0.96, 32, 24);
    const canopy = collectMesh(new THREE.Mesh(canopyGeo, glassMat));
    canopy.scale.set(0.8, 0.58, 1.62);
    canopy.position.set(0, 0.58, -0.05);
    carGroup.add(canopy);

    // Windshield A-Pillars & Roof Trim (High-end supercar roofline)
    const roofSpineGeo = new THREE.BoxGeometry(0.92, 0.04, 1.25);
    const roofSpine = collectMesh(new THREE.Mesh(roofSpineGeo, carbonMat));
    roofSpine.position.set(0, 0.95, -0.15);
    carGroup.add(roofSpine);

    // Aerodynamic Carbon Side Mirrors
    [-0.92, 0.92].forEach((xPos) => {
      const mirrorStalkGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.16, 8);
      const mirrorStalk = collectMesh(new THREE.Mesh(mirrorStalkGeo, carbonMat));
      mirrorStalk.rotation.z = xPos > 0 ? -0.4 : 0.4;
      mirrorStalk.position.set(xPos * 0.96, 0.65, 0.55);
      carGroup.add(mirrorStalk);

      const mirrorHousingGeo = new THREE.BoxGeometry(0.18, 0.09, 0.12);
      const mirrorHousing = collectMesh(new THREE.Mesh(mirrorHousingGeo, carbonMat));
      mirrorHousing.position.set(xPos * 1.04, 0.72, 0.53);
      carGroup.add(mirrorHousing);

      const mirrorGlassGeo = new THREE.PlaneGeometry(0.16, 0.07);
      const mirrorGlassMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.95, roughness: 0.05 });
      const mirrorGlass = collectMesh(new THREE.Mesh(mirrorGlassGeo, mirrorGlassMat));
      mirrorGlass.rotation.y = xPos > 0 ? -Math.PI / 2 : Math.PI / 2;
      mirrorGlass.position.set(xPos * 1.03, 0.72, 0.49);
      carGroup.add(mirrorGlass);
    });

    // Cockpit Roof Spine & Ram-Air Scoop
    const scoopGeo = new THREE.BoxGeometry(0.28, 0.12, 1.2);
    const scoop = collectMesh(new THREE.Mesh(scoopGeo, carbonMat));
    scoop.position.set(0, 1.02, -0.2);
    carGroup.add(scoop);

    // Side Radiator Pods & Intakes (Mid-engine side scoops)
    const podGeo = new THREE.BoxGeometry(0.26, 0.36, 1.8);
    const leftPod = collectMesh(new THREE.Mesh(podGeo, paintMat));
    leftPod.position.set(0.98, 0.44, -0.15);
    carGroup.add(leftPod);

    const rightPod = collectMesh(new THREE.Mesh(podGeo, paintMat));
    rightPod.position.set(-0.98, 0.44, -0.15);
    carGroup.add(rightPod);

    // Side Air Intake Ducts (Carbon recessed openings)
    [-1.02, 1.02].forEach((xPos) => {
      const intakeCavityGeo = new THREE.BoxGeometry(0.06, 0.22, 0.65);
      const intakeCavity = collectMesh(new THREE.Mesh(intakeCavityGeo, carbonMat));
      intakeCavity.position.set(xPos, 0.44, -0.25);
      carGroup.add(intakeCavity);
    });

    // Rear Engine Cover / Louvered Decklid
    const decklidGeo = new THREE.BoxGeometry(1.2, 0.15, 1.1);
    const decklid = collectMesh(new THREE.Mesh(decklidGeo, carbonMat));
    decklid.position.set(0, 0.64, -1.25);
    decklid.rotation.x = -0.06;
    carGroup.add(decklid);

    // Rear Venturi Diffuser & Strakes
    const diffuserGeo = new THREE.BoxGeometry(1.9, 0.16, 0.7);
    const diffuser = collectMesh(new THREE.Mesh(diffuserGeo, carbonMat));
    diffuser.position.set(0, 0.22, -2.18);
    diffuser.rotation.x = -0.2;
    carGroup.add(diffuser);

    [-0.6, -0.3, 0, 0.3, 0.6].forEach((xPos) => {
      const finGeo = new THREE.BoxGeometry(0.03, 0.18, 0.65);
      const fin = collectMesh(new THREE.Mesh(finGeo, carbonMat));
      fin.position.set(xPos, 0.2, -2.18);
      carGroup.add(fin);
    });

    // LED Projector Headlights
    const leftHeadlightGeo = new THREE.BoxGeometry(0.45, 0.05, 0.2);
    const leftHeadlight = collectMesh(new THREE.Mesh(leftHeadlightGeo, ledGlowMat));
    leftHeadlight.position.set(0.65, 0.44, 2.14);
    leftHeadlight.rotation.y = 0.2;
    carGroup.add(leftHeadlight);

    const rightHeadlight = collectMesh(new THREE.Mesh(leftHeadlightGeo, ledGlowMat));
    rightHeadlight.position.set(-0.65, 0.44, 2.14);
    rightHeadlight.rotation.y = -0.2;
    carGroup.add(rightHeadlight);

    // Rear Laser LED Taillight Bar
    const taillightGeo = new THREE.BoxGeometry(1.7, 0.04, 0.08);
    const taillight = collectMesh(new THREE.Mesh(taillightGeo, tailGlowMat));
    taillight.position.set(0, 0.52, -2.21);
    carGroup.add(taillight);

    // Twin Exhaust Cannons
    [-0.3, 0.3].forEach((xPos) => {
      const exhaustGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.25, 16);
      const exhaustMat = new THREE.MeshStandardMaterial({ color: 0x222226, metalness: 0.95, roughness: 0.2 });
      const pipe = collectMesh(new THREE.Mesh(exhaustGeo, exhaustMat));
      pipe.rotation.x = Math.PI / 2;
      pipe.position.set(xPos, 0.35, -2.2);
      carGroup.add(pipe);
    });

    // Autonomous LiDAR Sensor Pod on Hood
    const sensorGeo = new THREE.CylinderGeometry(0.12, 0.14, 0.1, 16);
    const sensor = collectMesh(new THREE.Mesh(sensorGeo, carbonMat));
    sensor.position.set(0, 0.66, 1.82);
    carGroup.add(sensor);

    const sensorLensGeo = new THREE.SphereGeometry(0.08, 16, 16);
    const sensorLens = collectMesh(new THREE.Mesh(sensorLensGeo, ledGlowMat));
    sensorLens.position.set(0, 0.72, 1.82);
    carGroup.add(sensorLens);

    // Consolidate procedural body meshes into proceduralBody group for clean fallback/loading transition
    const proceduralBody = new THREE.Group();
    while (carGroup.children.length > 0) {
      proceduralBody.add(carGroup.children[0]);
    }
    carGroup.add(proceduralBody);
    proceduralBodyRef.current = proceduralBody;

    // Dynamic Spoiler Group
    const spoilerGroup = new THREE.Group();
    carGroup.add(spoilerGroup);
    spoilerGroupRef.current = spoilerGroup;

    // Dynamic Wheels Group
    const wheelsGroup = new THREE.Group();
    carGroup.add(wheelsGroup);
    wheelsGroupRef.current = wheelsGroup;

    // Load High-Fidelity 3D Sports Car Model (.glb with Draco compression)
    try {
      const dracoLoader = new DRACOLoader();
      const assetBaseUrl = import.meta.env.BASE_URL;
      dracoLoader.setDecoderPath(`${assetBaseUrl}draco/`);
      const gltfLoader = new GLTFLoader();
      gltfLoader.setDRACOLoader(dracoLoader);

      gltfLoader.load(
        `${assetBaseUrl}models/sports-car.glb`,
        (gltf) => {
          const model = gltf.scene;

          // Align ground plane so tires sit flat on the floor (y = 0)
          const box = new THREE.Box3().setFromObject(model);
          const center = box.getCenter(new THREE.Vector3());

          model.position.x = -center.x;
          model.position.y = -box.min.y;
          model.position.z = -center.z;

          // Traverse meshes and enhance materials & shadows
          model.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
              const mesh = child as THREE.Mesh;
              mesh.castShadow = true;
              mesh.receiveShadow = true;
              allMeshesRef.current.push(mesh);

              const meshName = mesh.name.toLowerCase();
              const matName = mesh.material && 'name' in mesh.material ? (mesh.material as THREE.Material).name.toLowerCase() : '';

              if (meshName.includes('body') || matName.includes('body')) {
                const bodyPaintMat = new THREE.MeshPhysicalMaterial({
                  color: new THREE.Color(selectedPaint),
                  metalness: paintFinish === 'metallic' ? 0.85 : paintFinish === 'matte' ? 0.2 : 0.6,
                  roughness: paintFinish === 'metallic' ? 0.15 : paintFinish === 'matte' ? 0.65 : 0.12,
                  clearcoat: paintFinish === 'matte' ? 0.0 : 1.0,
                  clearcoatRoughness: 0.08,
                });
                mesh.material = bodyPaintMat;
                paintMaterialsRef.current.push(bodyPaintMat);
              } else if (meshName.includes('glass') || matName.includes('glass')) {
                mesh.material = new THREE.MeshPhysicalMaterial({
                  color: 0x07111e,
                  metalness: 0.9,
                  roughness: 0.05,
                  transmission: 0.85,
                  transparent: true,
                  opacity: 0.75,
                });
              } else if (meshName.includes('carbon') || matName.includes('carbon')) {
                mesh.material = new THREE.MeshStandardMaterial({
                  color: 0x111622,
                  roughness: 0.45,
                  metalness: 0.65,
                });
              } else if (meshName.includes('rim') || matName.includes('rim')) {
                mesh.material = new THREE.MeshStandardMaterial({
                  color: new THREE.Color(rimColor),
                  metalness: 0.92,
                  roughness: 0.14,
                });
              } else if (meshName.includes('brake') || meshName.includes('caliper') || matName.includes('brake')) {
                mesh.material = new THREE.MeshStandardMaterial({
                  color: new THREE.Color(caliperColor),
                  metalness: 0.7,
                  roughness: 0.25,
                });
              }
            }
          });

          // Replace procedural body with the authentic 3D sports car model
          if (proceduralBodyRef.current) {
            proceduralBodyRef.current.visible = false;
          }
          if (wheelsGroupRef.current) {
            wheelsGroupRef.current.visible = false;
          }

          carGroup.add(model);
          loadedCarModelRef.current = model;
          setModelLoaded(true);
        },
        (xhr) => {
          if (xhr.total > 0) {
            setLoadProgress(Math.round((xhr.loaded / xhr.total) * 100));
          }
        },
        (err) => {
          console.warn('3D Sports car model load notice:', err);
        }
      );
    } catch (err) {
      console.warn('Draco GLTF loader setup error:', err);
    }

    // Mouse & Touch Controls for Orbit Scrubbing
    const onMouseDown = (e: MouseEvent) => {
      orbitState.current.isDragging = true;
      orbitState.current.prevMouseX = e.clientX;
      orbitState.current.prevMouseY = e.clientY;
      setIsAutoRotating(false);
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!orbitState.current.isDragging) return;
      const deltaX = e.clientX - orbitState.current.prevMouseX;
      const deltaY = e.clientY - orbitState.current.prevMouseY;

      orbitState.current.targetTheta -= deltaX * 0.007;
      orbitState.current.targetPhi = Math.max(
        0.1,
        Math.min(Math.PI * 0.88, orbitState.current.targetPhi - deltaY * 0.007)
      );

      orbitState.current.prevMouseX = e.clientX;
      orbitState.current.prevMouseY = e.clientY;
    };

    const onMouseUp = () => {
      orbitState.current.isDragging = false;
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      handleZoom(e.deltaY * 0.004);
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches[0]) {
        orbitState.current.isDragging = true;
        orbitState.current.prevMouseX = e.touches[0].clientX;
        orbitState.current.prevMouseY = e.touches[0].clientY;
        setIsAutoRotating(false);
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!orbitState.current.isDragging || !e.touches[0]) return;
      const deltaX = e.touches[0].clientX - orbitState.current.prevMouseX;
      const deltaY = e.touches[0].clientY - orbitState.current.prevMouseY;

      orbitState.current.targetTheta -= deltaX * 0.008;
      orbitState.current.targetPhi = Math.max(
        0.1,
        Math.min(Math.PI * 0.88, orbitState.current.targetPhi - deltaY * 0.008)
      );

      orbitState.current.prevMouseX = e.touches[0].clientX;
      orbitState.current.prevMouseY = e.touches[0].clientY;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    domElement.addEventListener('wheel', onWheel, { passive: false });
    domElement.addEventListener('touchstart', onTouchStart);
    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('touchend', onMouseUp);

    // Animation Render Loop
    const clock = new THREE.Clock();

    const animate = () => {
      animFrameIdRef.current = requestAnimationFrame(animate);

      if (isAutoRotating) {
        orbitState.current.targetTheta += 0.008;
      }

      // Smooth Orbit Damping
      const state = orbitState.current;
      state.theta += (state.targetTheta - state.theta) * state.damping;
      state.phi += (state.targetPhi - state.phi) * state.damping;
      state.radius += (state.targetRadius - state.radius) * state.damping;

      camera.position.x = state.target.x + state.radius * Math.sin(state.phi) * Math.sin(state.theta);
      camera.position.y = state.target.y + state.radius * Math.cos(state.phi);
      camera.position.z = state.target.z + state.radius * Math.sin(state.phi) * Math.cos(state.theta);
      camera.lookAt(state.target);

      const elapsedTime = clock.getElapsedTime();

      // Underglow Pulsation
      if (underGlowLight && underGlowLight.intensity > 0) {
        underGlowLight.intensity = 2.4 + Math.sin(elapsedTime * 3) * 0.6;
      }

      // Spin Wheels when revving or driving
      if (isRevving) {
        spinSpeedRef.current = Math.min(spinSpeedRef.current + 0.05, 0.48);
        exhaustGlowLightsRef.current.forEach((light) => {
          light.intensity = 2.5 + Math.random() * 2.0;
        });
        carGroup.position.y = Math.sin(elapsedTime * 45) * 0.008;
      } else {
        spinSpeedRef.current = Math.max(spinSpeedRef.current - 0.015, 0);
        exhaustGlowLightsRef.current.forEach((light) => {
          light.intensity = 0;
        });
        carGroup.position.y = 0;
      }

      if (spinSpeedRef.current > 0) {
        rotatingRimsRef.current.forEach((rimMesh) => {
          rimMesh.rotation.y += spinSpeedRef.current;
        });
        if (loadedCarModelRef.current) {
          loadedCarModelRef.current.traverse((child) => {
            const name = child.name.toLowerCase();
            if (name.includes('rim') || name.includes('tire') || name.includes('wheel')) {
              child.rotation.x += spinSpeedRef.current;
            }
          });
        }
      }

      // HUD Telemetry Angles
      const azimuthDeg = Math.round(((state.theta * 180) / Math.PI) % 360);
      const normalizedAzimuth = (azimuthDeg + 360) % 360;
      const elevationDeg = Math.round(90 - (state.phi * 180) / Math.PI);
      setCameraAzimuth(normalizedAzimuth);
      setCameraElevation(elevationDeg);

      // Project Hotspots to 2D
      if (showHotspots) {
        const newPositions: { [key: string]: { x: number; y: number; visible: boolean } } = {};
        const containerRect = container.getBoundingClientRect();

        hotspots3D.current.forEach((spot) => {
          const worldPos = spot.position.clone();
          carGroup.localToWorld(worldPos);

          const screenVec = worldPos.clone().project(camera);
          const isBehind = screenVec.z > 1;
          const x = ((screenVec.x + 1) / 2) * containerRect.width;
          const y = ((-screenVec.y + 1) / 2) * containerRect.height;

          newPositions[spot.id] = {
            x,
            y,
            visible: !isBehind && x >= 10 && x <= containerRect.width - 10 && y >= 10 && y <= containerRect.height - 10,
          };
        });

        setHotspotScreenPositions(newPositions);
      }

      renderer.render(scene, camera);
    };

    animate();

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: newWidth, height: newHeight } = entry.contentRect;
        if (newWidth > 0 && newHeight > 0) {
          camera.aspect = newWidth / newHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(newWidth, newHeight);
        }
      }
    });

    resizeObserver.observe(container);

    return () => {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      resizeObserver.disconnect();

      domElement.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      domElement.removeEventListener('wheel', onWheel);
      domElement.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onMouseUp);

      if (container.contains(domElement)) {
        container.removeChild(domElement);
      }
      renderer.dispose();
      scene.clear();
    };
  }, [isAutoRotating, isRevving, showHotspots]);

  // 2. Dynamic Spoiler Rebuilder
  useEffect(() => {
    const spoilerGroup = spoilerGroupRef.current;
    if (!spoilerGroup) return;

    while (spoilerGroup.children.length > 0) {
      spoilerGroup.remove(spoilerGroup.children[0]);
    }

    if (spoilerStyle === 'wingless') return;

    const carbonMat = new THREE.MeshStandardMaterial({
      color: 0x111622,
      roughness: 0.45,
      metalness: 0.65,
    });

    if (spoilerStyle === 'gt-wing') {
      const wingGeo = new THREE.BoxGeometry(2.15, 0.04, 0.44);
      const wing = new THREE.Mesh(wingGeo, carbonMat);
      wing.position.set(0, 1.18, 2.15);
      wing.rotation.x = 0.08;
      spoilerGroup.add(wing);

      [-1.08, 1.08].forEach((xPos) => {
        const endplateGeo = new THREE.BoxGeometry(0.04, 0.24, 0.5);
        const endplate = new THREE.Mesh(endplateGeo, carbonMat);
        endplate.position.set(xPos, 1.18, 2.15);
        spoilerGroup.add(endplate);
      });

      [-0.48, 0.48].forEach((xPos) => {
        const pylonGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.65, 8);
        const pylon = new THREE.Mesh(pylonGeo, carbonMat);
        pylon.position.set(xPos, 0.85, 2.05);
        pylon.rotation.x = -0.22;
        spoilerGroup.add(pylon);
      });
    } else if (spoilerStyle === 'ducktail') {
      const lipGeo = new THREE.BoxGeometry(1.85, 0.18, 0.25);
      const lip = new THREE.Mesh(lipGeo, carbonMat);
      lip.position.set(0, 0.68, 2.12);
      lip.rotation.x = 0.42;
      spoilerGroup.add(lip);
    } else if (spoilerStyle === 'active-twin') {
      [-0.55, 0.55].forEach((xPos) => {
        const flapGeo = new THREE.BoxGeometry(0.85, 0.04, 0.38);
        const flap = new THREE.Mesh(flapGeo, carbonMat);
        flap.position.set(xPos, 0.95, 2.1);
        flap.rotation.x = 0.28;
        flap.rotation.z = xPos > 0 ? 0.06 : -0.06;
        spoilerGroup.add(flap);

        const strutGeo = new THREE.CylinderGeometry(0.025, 0.025, 0.42, 8);
        const strut = new THREE.Mesh(strutGeo, carbonMat);
        strut.position.set(xPos, 0.75, 2.05);
        spoilerGroup.add(strut);
      });
    }
  }, [spoilerStyle]);

  // 3. Dynamic Wheels Rebuilder (Tires + Rims + Calipers)
  useEffect(() => {
    const wheelsGroup = wheelsGroupRef.current;
    if (!wheelsGroup) return;

    while (wheelsGroup.children.length > 0) {
      wheelsGroup.remove(wheelsGroup.children[0]);
    }
    rotatingRimsRef.current = [];

    const wheelPositions = [
      { x: 0.96, z: 1.35, isRight: true },
      { x: -0.96, z: 1.35, isRight: false },
      { x: 0.98, z: -1.35, isRight: true },
      { x: -0.98, z: -1.35, isRight: false },
    ];

    let tireRubberMat: THREE.Material;
    if (tireType === 'slicks') {
      tireRubberMat = new THREE.MeshStandardMaterial({
        color: 0x141416,
        roughness: 0.85,
        metalness: 0.1,
      });
    } else if (tireType === 'allweather') {
      tireRubberMat = new THREE.MeshStandardMaterial({
        color: 0x0c0c0e,
        roughness: 0.95,
        metalness: 0.05,
      });
    } else {
      tireRubberMat = new THREE.MeshStandardMaterial({
        color: 0x18181b,
        roughness: 0.78,
        metalness: 0.12,
      });
    }

    const rimMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(rimColor),
      metalness: 0.92,
      roughness: rimColor === '#18181b' ? 0.3 : 0.12,
    });

    const caliperMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(caliperColor),
      emissive: new THREE.Color(caliperColor),
      emissiveIntensity: 0.6,
      roughness: 0.2,
      metalness: 0.8,
    });

    const rotorMat = new THREE.MeshStandardMaterial({
      color: 0x222630,
      metalness: 0.85,
      roughness: 0.35,
    });

    wheelPositions.forEach((wp) => {
      const wheelAssembly = new THREE.Group();
      wheelAssembly.position.set(wp.x, 0.36, wp.z);

      const rotatingGroup = new THREE.Group();
      rotatingGroup.rotation.z = Math.PI / 2;
      wheelAssembly.add(rotatingGroup);
      rotatingRimsRef.current.push(rotatingGroup);

      const tireGeo = new THREE.CylinderGeometry(0.36, 0.36, 0.26, 32);
      const tire = new THREE.Mesh(tireGeo, tireRubberMat);
      rotatingGroup.add(tire);

      if (tireType === 'neonglow') {
        const glowRingGeo = new THREE.TorusGeometry(0.33, 0.015, 8, 32);
        const glowRingMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
        const glowRing = new THREE.Mesh(glowRingGeo, glowRingMat);
        glowRing.rotation.x = Math.PI / 2;
        glowRing.position.y = wp.isRight ? 0.132 : -0.132;
        rotatingGroup.add(glowRing);
      } else if (tireType === 'slicks') {
        [-0.132, 0.132].forEach((yPos) => {
          const decalGeo = new THREE.RingGeometry(0.28, 0.32, 24);
          const decalMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b, side: THREE.DoubleSide });
          const decal = new THREE.Mesh(decalGeo, decalMat);
          decal.rotation.x = Math.PI / 2;
          decal.position.y = yPos;
          rotatingGroup.add(decal);
        });
      } else if (tireType === 'allweather') {
        for (let g = 0; g < 16; g++) {
          const grooveGeo = new THREE.BoxGeometry(0.04, 0.24, 0.015);
          const grooveMat = new THREE.MeshBasicMaterial({ color: 0x050505 });
          const groove = new THREE.Mesh(grooveGeo, grooveMat);
          groove.rotation.y = (g * Math.PI * 2) / 16;
          groove.position.set(Math.sin((g * Math.PI * 2) / 16) * 0.362, 0, Math.cos((g * Math.PI * 2) / 16) * 0.362);
          rotatingGroup.add(groove);
        }
      }

      const rimGeo = new THREE.CylinderGeometry(0.26, 0.26, 0.27, 24);
      const rim = new THREE.Mesh(rimGeo, rimMat);
      rotatingGroup.add(rim);

      if (rimStyle === 'forged-5') {
        for (let s = 0; s < 5; s++) {
          const spokeGeo = new THREE.BoxGeometry(0.04, 0.12, 0.46);
          const spoke = new THREE.Mesh(spokeGeo, rimMat);
          spoke.rotation.y = (s * Math.PI * 2) / 5;
          spoke.position.y = wp.isRight ? 0.08 : -0.08;
          rotatingGroup.add(spoke);
        }
      } else if (rimStyle === 'turbine-aero') {
        const discGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.03, 32);
        const disc = new THREE.Mesh(discGeo, rimMat);
        disc.position.y = wp.isRight ? 0.12 : -0.12;
        rotatingGroup.add(disc);

        for (let v = 0; v < 8; v++) {
          const ventGeo = new THREE.BoxGeometry(0.03, 0.04, 0.16);
          const ventMat = new THREE.MeshBasicMaterial({ color: 0x09090b });
          const vent = new THREE.Mesh(ventGeo, ventMat);
          vent.rotation.y = (v * Math.PI * 2) / 8 + 0.3;
          vent.position.set(
            Math.sin((v * Math.PI * 2) / 8) * 0.14,
            wp.isRight ? 0.13 : -0.13,
            Math.cos((v * Math.PI * 2) / 8) * 0.14
          );
          rotatingGroup.add(vent);
        }
      } else if (rimStyle === 'cyber-mesh') {
        for (let s = 0; s < 10; s++) {
          const spokeGeo = new THREE.BoxGeometry(0.025, 0.1, 0.48);
          const spoke = new THREE.Mesh(spokeGeo, rimMat);
          spoke.rotation.y = (s * Math.PI * 2) / 10;
          spoke.position.y = wp.isRight ? 0.08 : -0.08;
          rotatingGroup.add(spoke);
        }
      } else if (rimStyle === 'concave-star') {
        for (let s = 0; s < 6; s++) {
          const spokeGeo = new THREE.BoxGeometry(0.045, 0.1, 0.45);
          const spoke = new THREE.Mesh(spokeGeo, rimMat);
          spoke.rotation.y = (s * Math.PI * 2) / 6;
          spoke.position.y = wp.isRight ? 0.05 : -0.05;
          rotatingGroup.add(spoke);
        }
      }

      const capGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.04, 16);
      const capMat = new THREE.MeshStandardMaterial({ color: 0x00f0ff, metalness: 0.9, roughness: 0.2 });
      const cap = new THREE.Mesh(capGeo, capMat);
      cap.position.y = wp.isRight ? 0.13 : -0.13;
      rotatingGroup.add(cap);

      const rotorGeo = new THREE.CylinderGeometry(0.22, 0.22, 0.04, 24);
      const rotor = new THREE.Mesh(rotorGeo, rotorMat);
      rotor.rotation.z = Math.PI / 2;
      rotor.position.x = wp.isRight ? -0.04 : 0.04;
      wheelAssembly.add(rotor);

      const caliperGeo = new THREE.BoxGeometry(0.12, 0.16, 0.09);
      const caliper = new THREE.Mesh(caliperGeo, caliperMat);
      caliper.position.set(wp.isRight ? -0.03 : 0.03, 0.14, 0.1);
      wheelAssembly.add(caliper);

      wheelsGroup.add(wheelAssembly);
    });
  }, [rimStyle, rimColor, tireType, caliperColor]);

  // 4. Update Body Paint Finish and Material Properties
  const applyPaintProperties = useCallback((hex: string, finish: 'metallic' | 'matte' | 'pearl') => {
    setSelectedPaint(hex);
    setPaintFinish(finish);

    paintMaterialsRef.current.forEach((mat) => {
      mat.color.set(hex);
      if (finish === 'metallic') {
        mat.metalness = 0.85;
        mat.roughness = 0.15;
        mat.clearcoat = 1.0;
        mat.clearcoatRoughness = 0.08;
      } else if (finish === 'matte') {
        mat.metalness = 0.18;
        mat.roughness = 0.65;
        mat.clearcoat = 0.0;
        mat.clearcoatRoughness = 0.0;
      } else if (finish === 'pearl') {
        mat.metalness = 0.6;
        mat.roughness = 0.12;
        mat.clearcoat = 1.0;
        mat.clearcoatRoughness = 0.15;
      }
      mat.needsUpdate = true;
    });

    if (loadedCarModelRef.current) {
      loadedCarModelRef.current.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          const meshName = mesh.name.toLowerCase();
          const matName = mesh.material && 'name' in mesh.material ? (mesh.material as THREE.Material).name.toLowerCase() : '';
          if (meshName.includes('body') || matName.includes('body')) {
            if (mesh.material && 'color' in mesh.material) {
              (mesh.material as THREE.MeshPhysicalMaterial).color.set(hex);
              if (finish === 'metallic') {
                (mesh.material as THREE.MeshPhysicalMaterial).metalness = 0.85;
                (mesh.material as THREE.MeshPhysicalMaterial).roughness = 0.15;
                (mesh.material as THREE.MeshPhysicalMaterial).clearcoat = 1.0;
              } else if (finish === 'matte') {
                (mesh.material as THREE.MeshPhysicalMaterial).metalness = 0.18;
                (mesh.material as THREE.MeshPhysicalMaterial).roughness = 0.65;
                (mesh.material as THREE.MeshPhysicalMaterial).clearcoat = 0.0;
              } else if (finish === 'pearl') {
                (mesh.material as THREE.MeshPhysicalMaterial).metalness = 0.6;
                (mesh.material as THREE.MeshPhysicalMaterial).roughness = 0.12;
                (mesh.material as THREE.MeshPhysicalMaterial).clearcoat = 1.0;
              }
              (mesh.material as THREE.Material).needsUpdate = true;
            }
          }
        }
      });
    }
  }, []);

  // Update Rims & Caliper Colors on Loaded Model
  useEffect(() => {
    if (!loadedCarModelRef.current) return;
    loadedCarModelRef.current.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        const meshName = mesh.name.toLowerCase();
        const matName = mesh.material && 'name' in mesh.material ? (mesh.material as THREE.Material).name.toLowerCase() : '';
        if ((meshName.includes('rim') || matName.includes('rim')) && mesh.material && 'color' in mesh.material) {
          (mesh.material as THREE.MeshStandardMaterial).color.set(rimColor);
          (mesh.material as THREE.Material).needsUpdate = true;
        }
        if ((meshName.includes('brake') || meshName.includes('caliper') || matName.includes('brake')) && mesh.material && 'color' in mesh.material) {
          (mesh.material as THREE.MeshStandardMaterial).color.set(caliperColor);
          (mesh.material as THREE.Material).needsUpdate = true;
        }
      }
    });
  }, [rimColor, caliperColor]);

  // 5. Update Underglow Lighting
  useEffect(() => {
    const light = underglowLightRef.current;
    if (!light) return;

    if (underglowColor === 'off') {
      light.intensity = 0;
    } else {
      light.color.set(underglowColor);
      light.intensity = 3.2;
    }
  }, [underglowColor]);

  // 6. Update Headlights
  useEffect(() => {
    headlightConesRef.current.forEach((beam) => {
      beam.intensity = headlightsOn ? 3.8 : 0;
    });
  }, [headlightsOn]);

  // 7. Wireframe LiDAR Toggle
  const toggleWireframe = () => {
    const next = !wireframeMode;
    setWireframeMode(next);
    allMeshesRef.current.forEach((mesh) => {
      if (Array.isArray(mesh.material)) {
        mesh.material.forEach((m) => {
          if ('wireframe' in m) (m as THREE.MeshStandardMaterial).wireframe = next;
        });
      } else if (mesh.material && 'wireframe' in mesh.material) {
        (mesh.material as THREE.MeshStandardMaterial).wireframe = next;
      }
    });
  };

  // 8. Rev Engine and Spin Wheels Action
  const handleRevTrigger = () => {
    playRevSound();
    setIsRevving(true);
    setTimeout(() => {
      setIsRevving(false);
    }, 1200);
  };

  // 9. Randomize Custom Build (Surprise Me)
  const handleRandomizeBuild = () => {
    const randomPaint = PAINT_FINISHES[Math.floor(Math.random() * PAINT_FINISHES.length)].hex;
    const finishes: ('metallic' | 'matte' | 'pearl')[] = ['metallic', 'matte', 'pearl'];
    const randomFinish = finishes[Math.floor(Math.random() * finishes.length)];
    applyPaintProperties(randomPaint, randomFinish);

    const rimStyles: RimStyle[] = ['forged-5', 'turbine-aero', 'cyber-mesh', 'concave-star'];
    setRimStyle(rimStyles[Math.floor(Math.random() * rimStyles.length)]);

    const randomRimColor = RIM_COLORS[Math.floor(Math.random() * RIM_COLORS.length)].hex;
    setRimColor(randomRimColor);

    const tireTypes: TireType[] = ['slicks', 'grooved', 'neonglow', 'allweather'];
    setTireType(tireTypes[Math.floor(Math.random() * tireTypes.length)]);

    const randomCaliper = CALIPER_COLORS[Math.floor(Math.random() * CALIPER_COLORS.length)].hex;
    setCaliperColor(randomCaliper);

    const spoilers: SpoilerStyle[] = ['gt-wing', 'ducktail', 'active-twin', 'wingless'];
    setSpoilerStyle(spoilers[Math.floor(Math.random() * spoilers.length)]);

    const underglows = ['#00f0ff', '#ec4899', '#f59e0b', '#22c55e'];
    setUnderglowColor(underglows[Math.floor(Math.random() * underglows.length)]);

    handleRevTrigger();
  };

  // 10. Reset to Factory Spec
  const handleResetFactory = () => {
    applyPaintProperties('#00f0ff', 'metallic');
    setRimStyle('forged-5');
    setRimColor('#f1f5f9');
    setTireType('neonglow');
    setCaliperColor('#00f0ff');
    setSpoilerStyle('gt-wing');
    setUnderglowColor('#00f0ff');
    setHeadlightsOn(true);
    setCameraPreset(45, 68);
  };

  return (
    <div className="relative w-full flex flex-col bg-[var(--bg-primary)] rounded-3xl overflow-hidden border border-[var(--border-color)] shadow-2xl">
      {/* Top Telemetry HUD Header */}
      <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        {/* Left Telemetry: Model & Status */}
        <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[var(--bg-card)]/90 border border-[var(--border-color)] shadow-md backdrop-blur-md pointer-events-auto text-xs font-mono-tech">
          <span className={`w-2 h-2 rounded-full ${modelLoaded ? 'bg-emerald-400' : 'bg-amber-400 animate-ping'}`} />
          <span className="font-bold text-[var(--text-primary)] uppercase">
            {modelLoaded ? 'AUTHENTIC 3D SPORTS CAR MODEL' : `LOADING 3D MODEL ${loadProgress}%`}
          </span>
          <span className="text-[var(--accent-cyan)] font-semibold">· INTERACTIVE LAB</span>
        </div>

        {/* Right HUD Controls: Rev Engine, LiDAR Scan, Auto Orbit, Zoom */}
        <div className="flex items-center gap-2 pointer-events-auto">
          {/* Rev & Spin Wheels Button */}
          <button
            id="rev-spin-wheels-btn"
            onClick={handleRevTrigger}
            disabled={isRevving}
            className={`px-3.5 py-1.5 rounded-xl border text-xs font-mono-tech uppercase font-bold transition-all flex items-center gap-1.5 cursor-pointer backdrop-blur-md shadow-md ${
              isRevving
                ? 'bg-amber-500 text-white border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.6)] animate-pulse'
                : 'bg-gradient-to-r from-[var(--accent-cyan)] to-blue-600 text-white border-[var(--accent-cyan)] hover:opacity-90'
            }`}
            title="Rev Engine, pulse exhausts and spin tires at high speed!"
          >
            <Zap className={`w-3.5 h-3.5 ${isRevving ? 'animate-bounce text-yellow-200' : ''}`} />
            <span>{isRevving ? 'REVVING 8,500 RPM!' : 'Rev & Spin'}</span>
          </button>

          {/* Wireframe LiDAR Mode */}
          <button
            id="toggle-3d-wireframe-btn"
            onClick={toggleWireframe}
            className={`px-3 py-1.5 rounded-xl border text-xs font-mono-tech transition-all flex items-center gap-1.5 cursor-pointer backdrop-blur-md ${
              wireframeMode
                ? 'bg-[var(--accent-cyan)] text-white border-[var(--accent-cyan)] shadow-[0_0_15px_var(--accent-glow)]'
                : 'bg-[var(--bg-card)]/90 text-[var(--text-secondary)] border-[var(--border-color)] hover:text-[var(--accent-cyan)]'
            }`}
            title="Toggle Real-Time LiDAR Wireframe Scan"
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">LiDAR</span>
          </button>

          {/* Auto Orbit Toggle */}
          <button
            id="toggle-3d-autorotate-btn"
            onClick={() => setIsAutoRotating(!isAutoRotating)}
            className="gk-btn text-xs py-1.5 px-3 flex items-center gap-1.5 cursor-pointer backdrop-blur-md"
            title="Auto-rotate vehicle"
          >
            {isAutoRotating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{isAutoRotating ? 'Pause' : 'Orbit'}</span>
          </button>

          {/* Zoom In / Out */}
          <div className="flex items-center bg-[var(--bg-card)]/90 border border-[var(--border-color)] rounded-xl overflow-hidden backdrop-blur-md shadow-sm">
            <button
              onClick={() => handleZoom(0.8)}
              className="p-1.5 text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] hover:bg-[var(--accent-cyan)]/10 transition-colors cursor-pointer"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <div className="w-[1px] h-4 bg-[var(--border-color)]" />
            <button
              onClick={() => handleZoom(-0.8)}
              className="p-1.5 text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] hover:bg-[var(--accent-cyan)]/10 transition-colors cursor-pointer"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 3D WebGL Canvas Container */}
      <div
        ref={mountRef}
        id="webgl-car-canvas-mount"
        className="relative w-full h-[450px] sm:h-[520px] md:h-[580px] cursor-grab active:cursor-grabbing select-none"
      >
        {/* Floating 3D Interactive Hotspot Markers */}
        {showHotspots &&
          hotspots3D.current.map((spot) => {
            const pos = hotspotScreenPositions[spot.id];
            if (!pos || !pos.visible) return null;

            return (
              <button
                key={spot.id}
                id={`3d-hotspot-${spot.id}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectHotspot(spot.data);
                }}
                style={{
                  left: `${pos.x}px`,
                  top: `${pos.y}px`,
                }}
                className="absolute z-30 -translate-x-1/2 -translate-y-1/2 group cursor-pointer animate-fadeIn"
              >
                <div className="relative flex items-center justify-center">
                  <span className="absolute w-8 h-8 rounded-full bg-[var(--accent-cyan)]/30 animate-ping pointer-events-none" />
                  <span className="w-6 h-6 rounded-full bg-[var(--bg-card)] border-2 border-[var(--accent-cyan)] flex items-center justify-center shadow-[0_0_20px_var(--accent-cyan)] group-hover:scale-125 transition-transform">
                    <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent-cyan)]" />
                  </span>
                </div>

                <div className="absolute left-1/2 -top-16 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-40 whitespace-nowrap">
                  <div className="px-3 py-1.5 rounded-lg bg-[var(--bg-card)] border border-[var(--accent-cyan)] text-left shadow-[0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-md">
                    <div className="text-[10px] font-mono-tech text-[var(--accent-cyan)] uppercase font-semibold">
                      INSPECT COMPONENT · {spot.part}
                    </div>
                    <div className="text-xs font-primary font-bold text-[var(--text-primary)]">
                      {spot.name}
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-mono-tech pt-0.5">
                      <span className="text-rose-400">Before: {spot.data.before.conditionScore}%</span>
                      <span className="text-[var(--text-secondary)]">→</span>
                      <span className="text-emerald-400">After: {spot.data.after.conditionScore}%</span>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}

        {/* Live Azimuth & Pitch Telemetry Overlay */}
        <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--bg-card)]/90 border border-[var(--border-color)] shadow-md backdrop-blur-md pointer-events-auto text-xs font-mono-tech text-[var(--text-secondary)]">
          <Compass className="w-3.5 h-3.5 text-[var(--accent-cyan)]" />
          <span>
            AZIMUTH: <strong className="text-[var(--accent-cyan)]">{cameraAzimuth}°</strong> · ELEVATION: <strong className="text-[var(--accent-cyan)]">{cameraElevation}°</strong>
          </span>
        </div>

        {/* Floating Quick Play Buttons */}
        <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2 pointer-events-auto">
          <button
            onClick={handleRandomizeBuild}
            className="px-3 py-1.5 rounded-xl bg-[var(--bg-card)]/90 border border-[var(--border-color)] text-[var(--text-primary)] hover:text-[var(--accent-cyan)] hover:border-[var(--accent-cyan)] text-xs font-mono-tech uppercase flex items-center gap-1.5 shadow-md backdrop-blur-md transition-colors cursor-pointer"
            title="Randomize custom paint, wheels, tires, spoiler and underglow!"
          >
            <Shuffle className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Surprise Me</span>
          </button>

          <button
            onClick={handleResetFactory}
            className="px-3 py-1.5 rounded-xl bg-[var(--bg-card)]/90 border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] hover:border-[var(--accent-cyan)] text-xs font-mono-tech uppercase flex items-center gap-1.5 shadow-md backdrop-blur-md transition-colors cursor-pointer"
            title="Reset to factory GK Apex-1 spec"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset Spec</span>
          </button>
        </div>
      </div>

      {/* Interactive Customizer Studio Control Panel (Playable Workshop) */}
      <div className="p-4 sm:p-6 border-t border-[var(--border-color)] bg-[var(--bg-card)] space-y-4">
        {/* Customizer Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[var(--border-color)]">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => setActiveCustomTab('paint')}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold tracking-wide transition-all flex items-center gap-2 cursor-pointer ${
                activeCustomTab === 'paint'
                  ? 'bg-[var(--accent-cyan)] text-white shadow-[0_0_15px_var(--accent-glow)]'
                  : 'bg-[var(--bg-card-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              <Palette className="w-4 h-4" />
              <span>Paint & Finish</span>
            </button>

            <button
              onClick={() => setActiveCustomTab('wheels')}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold tracking-wide transition-all flex items-center gap-2 cursor-pointer ${
                activeCustomTab === 'wheels'
                  ? 'bg-[var(--accent-cyan)] text-white shadow-[0_0_15px_var(--accent-glow)]'
                  : 'bg-[var(--bg-card-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              <Disc className="w-4 h-4" />
              <span>Rims & Tires</span>
            </button>

            <button
              onClick={() => setActiveCustomTab('aero')}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold tracking-wide transition-all flex items-center gap-2 cursor-pointer ${
                activeCustomTab === 'aero'
                  ? 'bg-[var(--accent-cyan)] text-white shadow-[0_0_15px_var(--accent-glow)]'
                  : 'bg-[var(--bg-card-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              <Shield className="w-4 h-4" />
              <span>Aero & Underglow</span>
            </button>

            <button
              onClick={() => setActiveCustomTab('presets')}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold tracking-wide transition-all flex items-center gap-2 cursor-pointer ${
                activeCustomTab === 'presets'
                  ? 'bg-[var(--accent-cyan)] text-white shadow-[0_0_15px_var(--accent-glow)]'
                  : 'bg-[var(--bg-card-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              <Eye className="w-4 h-4" />
              <span>Camera Angles</span>
            </button>
          </div>

          {/* Hotspot Toggle */}
          <button
            onClick={() => setShowHotspots(!showHotspots)}
            className={`px-3 py-1.5 rounded-xl border text-xs font-mono-tech transition-all flex items-center gap-1.5 cursor-pointer ${
              showHotspots
                ? 'bg-[var(--bg-card-subtle)] text-[var(--accent-cyan)] border-[var(--accent-cyan)]/40'
                : 'bg-[var(--bg-card-subtle)] text-[var(--text-muted)] border-[var(--border-color)]'
            }`}
          >
            <span>{showHotspots ? '● Inspection Pins: ON' : '○ Pins: OFF'}</span>
          </button>
        </div>

        {/* Tab 1: Paint Colors & Finishes */}
        {activeCustomTab === 'paint' && (
          <div className="space-y-4 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-mono-tech uppercase text-[var(--text-muted)] tracking-wider block">
                  BODYWORK COATING PALETTE:
                </span>
                <span className="font-primary font-bold text-sm text-[var(--text-primary)]">
                  {PAINT_FINISHES.find((p) => p.hex === selectedPaint)?.name || 'Custom Finish'}
                </span>
              </div>

              {/* Finish Type (Metallic / Matte / Pearl) */}
              <div className="flex items-center gap-1.5 p-1 bg-[var(--bg-card-subtle)] rounded-xl border border-[var(--border-color)]">
                {(['metallic', 'matte', 'pearl'] as const).map((finish) => (
                  <button
                    key={finish}
                    onClick={() => applyPaintProperties(selectedPaint, finish)}
                    className={`px-3 py-1 rounded-lg text-xs font-mono-tech uppercase transition-all cursor-pointer ${
                      paintFinish === finish
                        ? 'bg-[var(--accent-cyan)] text-white font-bold shadow-sm'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    {finish}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Swatches Grid */}
            <div className="grid grid-cols-3 sm:grid-cols-9 gap-2.5">
              {PAINT_FINISHES.map((paint) => {
                const isSelected = selectedPaint === paint.hex;
                return (
                  <button
                    key={paint.hex}
                    onClick={() => applyPaintProperties(paint.hex, paintFinish)}
                    className={`group relative p-2 rounded-2xl border transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                      isSelected
                        ? 'bg-[var(--bg-card-subtle)] border-[var(--accent-cyan)] shadow-[0_0_15px_var(--accent-glow)] scale-105'
                        : 'bg-[var(--bg-card-subtle)]/50 border-[var(--border-color)] hover:border-[var(--accent-cyan)]/50'
                    }`}
                  >
                    <div
                      className="w-7 h-7 rounded-full shadow-md border border-white/20 transition-transform group-hover:scale-110"
                      style={{ backgroundColor: paint.hex }}
                    />
                    <span className="text-[10px] font-mono-tech text-[var(--text-secondary)] truncate w-full text-center">
                      {paint.name.split(' ')[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 2: Rims & Tires Customization */}
        {activeCustomTab === 'wheels' && (
          <div className="space-y-4 animate-fadeIn">
            {/* Rim Styles Grid */}
            <div>
              <span className="text-xs font-mono-tech uppercase text-[var(--text-muted)] tracking-wider block mb-2">
                FORGED WHEEL RIM ARCHITECTURE:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {RIM_STYLES.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => setRimStyle(style.id)}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                      rimStyle === style.id
                        ? 'bg-[var(--bg-card-subtle)] border-[var(--accent-cyan)] shadow-[0_0_15px_var(--accent-glow)]'
                        : 'bg-[var(--bg-card-subtle)]/60 border-[var(--border-color)] hover:border-[var(--accent-cyan)]/40'
                    }`}
                  >
                    <div className="font-primary font-bold text-xs text-[var(--text-primary)] flex items-center justify-between">
                      <span>{style.label}</span>
                      {rimStyle === style.id && <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-cyan)]" />}
                    </div>
                    <span className="text-[10px] font-mono-tech text-[var(--text-muted)] block mt-0.5 leading-tight">
                      {style.desc}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Rim Finish & Brake Caliper Colors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {/* Rim Colors */}
              <div>
                <span className="text-xs font-mono-tech uppercase text-[var(--text-muted)] tracking-wider block mb-2">
                  RIM FINISH COLOR:
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  {RIM_COLORS.map((rc) => (
                    <button
                      key={rc.hex}
                      onClick={() => setRimColor(rc.hex)}
                      className={`px-3 py-1.5 rounded-xl border text-xs font-mono-tech flex items-center gap-2 cursor-pointer transition-all ${
                        rimColor === rc.hex
                          ? 'border-[var(--accent-cyan)] bg-[var(--bg-card-subtle)] shadow-sm'
                          : 'border-[var(--border-color)] hover:border-[var(--accent-cyan)]/40'
                      }`}
                    >
                      <span className="w-3.5 h-3.5 rounded-full border border-white/20" style={{ backgroundColor: rc.hex }} />
                      <span className="text-[var(--text-primary)]">{rc.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Caliper Colors */}
              <div>
                <span className="text-xs font-mono-tech uppercase text-[var(--text-muted)] tracking-wider block mb-2">
                  CARBON-CERAMIC BRAKE CALIPERS:
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  {CALIPER_COLORS.map((cc) => (
                    <button
                      key={cc.hex}
                      onClick={() => setCaliperColor(cc.hex)}
                      className={`px-3 py-1.5 rounded-xl border text-xs font-mono-tech flex items-center gap-2 cursor-pointer transition-all ${
                        caliperColor === cc.hex
                          ? 'border-[var(--accent-cyan)] bg-[var(--bg-card-subtle)] shadow-sm'
                          : 'border-[var(--border-color)] hover:border-[var(--accent-cyan)]/40'
                      }`}
                    >
                      <span className="w-3.5 h-3.5 rounded-full border border-white/20" style={{ backgroundColor: cc.hex }} />
                      <span className="text-[var(--text-primary)]">{cc.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Tire Compound & Tread */}
            <div className="pt-2">
              <span className="text-xs font-mono-tech uppercase text-[var(--text-muted)] tracking-wider block mb-2">
                TIRE COMPOUND & TREAD PATTERN:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {TIRE_OPTIONS.map((tire) => (
                  <button
                    key={tire.id}
                    onClick={() => setTireType(tire.id)}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                      tireType === tire.id
                        ? 'bg-[var(--bg-card-subtle)] border-[var(--accent-cyan)] shadow-[0_0_15px_var(--accent-glow)]'
                        : 'bg-[var(--bg-card-subtle)]/60 border-[var(--border-color)] hover:border-[var(--accent-cyan)]/40'
                    }`}
                  >
                    <div className="font-primary font-bold text-xs text-[var(--text-primary)] flex items-center justify-between">
                      <span>{tire.label}</span>
                      {tireType === tire.id && <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-cyan)]" />}
                    </div>
                    <span className="text-[10px] font-mono-tech text-[var(--text-muted)] block mt-0.5 leading-tight">
                      {tire.desc}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Aero & Underglow */}
        {activeCustomTab === 'aero' && (
          <div className="space-y-4 animate-fadeIn">
            {/* Spoiler / Downforce Selection */}
            <div>
              <span className="text-xs font-mono-tech uppercase text-[var(--text-muted)] tracking-wider block mb-2">
                AERODYNAMIC REAR WING / SPOILER:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {SPOILER_OPTIONS.map((spoiler) => (
                  <button
                    key={spoiler.id}
                    onClick={() => setSpoilerStyle(spoiler.id)}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                      spoilerStyle === spoiler.id
                        ? 'bg-[var(--bg-card-subtle)] border-[var(--accent-cyan)] shadow-[0_0_15px_var(--accent-glow)]'
                        : 'bg-[var(--bg-card-subtle)]/60 border-[var(--border-color)] hover:border-[var(--accent-cyan)]/40'
                    }`}
                  >
                    <div className="font-primary font-bold text-xs text-[var(--text-primary)] flex items-center justify-between">
                      <span>{spoiler.label}</span>
                      {spoilerStyle === spoiler.id && <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-cyan)]" />}
                    </div>
                    <span className="text-[10px] font-mono-tech text-[var(--text-muted)] block mt-0.5 leading-tight">
                      {spoiler.desc}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Neon Underglow & Headlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <span className="text-xs font-mono-tech uppercase text-[var(--text-muted)] tracking-wider block mb-2">
                  NEON GROUND UNDERGLOW:
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  {UNDERGLOW_COLORS.map((ug) => (
                    <button
                      key={ug.name}
                      onClick={() => setUnderglowColor(ug.hex)}
                      className={`px-3 py-1.5 rounded-xl border text-xs font-mono-tech flex items-center gap-2 cursor-pointer transition-all ${
                        underglowColor === ug.hex
                          ? 'border-[var(--accent-cyan)] bg-[var(--bg-card-subtle)] shadow-sm'
                          : 'border-[var(--border-color)] hover:border-[var(--accent-cyan)]/40'
                      }`}
                    >
                      {ug.hex !== 'off' ? (
                        <span className="w-3.5 h-3.5 rounded-full border border-white/20" style={{ backgroundColor: ug.hex }} />
                      ) : (
                        <span className="w-3.5 h-3.5 rounded-full border border-rose-400/50 bg-rose-500/20" />
                      )}
                      <span className="text-[var(--text-primary)]">{ug.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Headlights Toggle */}
              <div>
                <span className="text-xs font-mono-tech uppercase text-[var(--text-muted)] tracking-wider block mb-2">
                  LASER HEADLIGHT PROJECTORS:
                </span>
                <button
                  onClick={() => setHeadlightsOn(!headlightsOn)}
                  className={`px-4 py-2 rounded-xl border text-xs font-mono-tech font-bold uppercase transition-all flex items-center gap-2 cursor-pointer ${
                    headlightsOn
                      ? 'bg-amber-500/10 border-amber-500 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                      : 'bg-[var(--bg-card-subtle)] border-[var(--border-color)] text-[var(--text-muted)]'
                  }`}
                >
                  <Zap className="w-4 h-4" />
                  <span>{headlightsOn ? 'Projector High-Beams: ACTIVE' : 'Headlights: STANDBY'}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Camera Presets */}
        {activeCustomTab === 'presets' && (
          <div className="space-y-3 animate-fadeIn">
            <span className="text-xs font-mono-tech uppercase text-[var(--text-muted)] tracking-wider block">
              INSTANT 3D STUDIO PERSPECTIVES:
            </span>
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setCameraPreset(0, 75)}
                className="px-3.5 py-1.5 rounded-xl text-xs font-mono-tech uppercase bg-[var(--bg-card-subtle)] text-[var(--text-secondary)] border border-[var(--border-color)] hover:text-[var(--accent-cyan)] hover:border-[var(--accent-cyan)] transition-colors cursor-pointer"
              >
                0° Front Fascia
              </button>
              <button
                onClick={() => setCameraPreset(45, 68)}
                className="px-3.5 py-1.5 rounded-xl text-xs font-mono-tech uppercase bg-[var(--bg-card-subtle)] text-[var(--text-secondary)] border border-[var(--border-color)] hover:text-[var(--accent-cyan)] hover:border-[var(--accent-cyan)] transition-colors cursor-pointer"
              >
                45° Dynamic Quarter
              </button>
              <button
                onClick={() => setCameraPreset(90, 75)}
                className="px-3.5 py-1.5 rounded-xl text-xs font-mono-tech uppercase bg-[var(--bg-card-subtle)] text-[var(--text-secondary)] border border-[var(--border-color)] hover:text-[var(--accent-cyan)] hover:border-[var(--accent-cyan)] transition-colors cursor-pointer"
              >
                90° Side Profile
              </button>
              <button
                onClick={() => setCameraPreset(180, 75)}
                className="px-3.5 py-1.5 rounded-xl text-xs font-mono-tech uppercase bg-[var(--bg-card-subtle)] text-[var(--text-secondary)] border border-[var(--border-color)] hover:text-[var(--accent-cyan)] hover:border-[var(--accent-cyan)] transition-colors cursor-pointer"
              >
                180° Rear Aero & Wing
              </button>
              <button
                onClick={() => setCameraPreset(0, 15, 6.5)}
                className="px-3.5 py-1.5 rounded-xl text-xs font-mono-tech uppercase bg-[var(--bg-card-subtle)] text-[var(--text-secondary)] border border-[var(--border-color)] hover:text-[var(--accent-cyan)] hover:border-[var(--accent-cyan)] transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <ArrowUp className="w-3.5 h-3.5" />
                <span>Over Canopy Aerial</span>
              </button>
              <button
                onClick={() => setCameraPreset(0, 140, 6.5)}
                className="px-3.5 py-1.5 rounded-xl text-xs font-mono-tech uppercase bg-[var(--bg-card-subtle)] text-[var(--text-secondary)] border border-[var(--border-color)] hover:text-[var(--accent-cyan)] hover:border-[var(--accent-cyan)] transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <ArrowDown className="w-3.5 h-3.5" />
                <span>Under Chassis Undercarriage</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
