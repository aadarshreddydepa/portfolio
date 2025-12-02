"use client";

import { useState, useEffect, useRef } from "react";
import { MapPin } from "lucide-react";
import * as THREE from "three";
import { useTheme } from "next-themes";

const LOCATIONS = [
  {
    id: "uk",
    name: "UK",
    label: "United Kingdom",
    flag: "🇬🇧",
    lat: 51.5074,
    lon: -0.1278,
    description: "Available for GMT time zone sync.",
  },
  {
    id: "india",
    name: "India",
    label: "India",
    flag: "🇮🇳",
    lat: 20.5937,
    lon: 78.9629,
    description: "Flexible with IST working hours.",
  },
  {
    id: "usa",
    name: "USA",
    label: "United States",
    flag: "🇺🇸",
    lat: 37.0902,
    lon: -95.7129,
    description: "Open to EST/PST overlapping.",
  },
];

export default function TimeZone() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeLocation, setActiveLocation] = useState(LOCATIONS[1]); // Default India
  const [isReady, setIsReady] = useState(false);
  const { theme } = useTheme();

  const targetRotation = useRef({ x: 0, y: 0 });
  const globeGroup = useRef<THREE.Group>(null);
  const sceneRef = useRef<THREE.Scene>(null);
  const rendererRef = useRef<THREE.WebGLRenderer>(null);

  // --- 3D Logic ---
  useEffect(() => {
    if (!mountRef.current) return;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    scene.fog = new THREE.FogExp2(0x000000, 0.05);

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 12;
    camera.position.y = 3;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 2. Create the "Pixelated" Globe (Points)
    const globeRadius = 4.5;
    const particles = 4000;
    const geometry = new THREE.BufferGeometry();
    const positions = [];
    const sizes = [];
    const colors = [];

    const color1 = new THREE.Color("#f97316"); // Orange-500
    const color2 = new THREE.Color("#c2410c"); // Orange-700

    for (let i = 0; i < particles; i++) {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / particles);
      const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);

      // Y-up orientation
      const x = globeRadius * Math.sin(phi) * Math.cos(theta);
      const y = globeRadius * Math.cos(phi);
      const z = globeRadius * Math.sin(phi) * Math.sin(theta);

      positions.push(x, y, z);

      sizes.push(Math.random() * 0.15 + 0.05);

      const mixedColor = color1.clone().lerp(color2, (y / globeRadius + 1) / 2);
      colors.push(mixedColor.r, mixedColor.g, mixedColor.b);
    }

    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geometry.setAttribute("size", new THREE.Float32BufferAttribute(sizes, 1));
    geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.12,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
    });

    const points = new THREE.Points(geometry, material);

    const group = new THREE.Group();
    group.add(points);
    scene.add(group);
    globeGroup.current = group;

    // 3. Atmosphere Glow
    const atmosphereGeo = new THREE.SphereGeometry(globeRadius - 0.1, 64, 64);
    const atmosphereMat = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.6 - dot(vNormal, vec3(0, 0, 1.0)), 4.0);
          gl_FragColor = vec4(1.0, 0.6, 0.2, 1.0) * intensity * 1.5; 
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
    });
    const atmosphere = new THREE.Mesh(atmosphereGeo, atmosphereMat);
    scene.add(atmosphere);

    // Animation Loop
    const clock = new THREE.Clock();

    const animate = () => {
      requestAnimationFrame(animate);

      const delta = clock.getDelta();

      if (globeGroup.current) {
        globeGroup.current.rotation.x +=
          (targetRotation.current.x - globeGroup.current.rotation.x) *
          2 *
          delta;
        globeGroup.current.rotation.y +=
          (targetRotation.current.y - globeGroup.current.rotation.y) *
          2 *
          delta;

        // Idle spin
        globeGroup.current.rotation.y += 0.001 * delta;
      }

      renderer.render(scene, camera);
    };

    animate();
    setIsReady(true);

    const handleResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
    };
  }, []);

  // --- Rotation Logic ---
  useEffect(() => {
    if (!activeLocation) return;

    const latRad = activeLocation.lat * (Math.PI / 180);
    const lonRad = activeLocation.lon * (Math.PI / 180);

    const targetX = latRad;
    const targetY = -lonRad + Math.PI / 2;

    targetRotation.current = {
      x: targetX,
      y: targetY,
    };
  }, [activeLocation]);

  return (
    <div className="h-full flex flex-col p-8 bg-white dark:bg-[#0a0a0a] border border-black/5 dark:border-white/10 rounded-3xl relative overflow-hidden transition-colors duration-300">
      {/* Header Section */}
      <div className="relative z-10 mb-4 text-center">
        <h3 className="text-3xl font-serif text-black/90 dark:text-white/90 mb-2 transition-colors">
          I'm very flexible with time
        </h3>
        <h3 className="text-3xl font-serif text-orange-500 dark:text-orange-400 italic mb-8 transition-colors">
          zone communications
        </h3>

        {/* Location Toggles */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {LOCATIONS.map((loc) => (
            <button
              key={loc.id}
              onClick={() => setActiveLocation(loc)}
              className={`
                  relative flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300
                  ${
                    activeLocation.id === loc.id
                      ? "bg-orange-500/10 border-orange-500/50 shadow-[0_0_20px_rgba(249,115,22,0.2)]"
                      : "bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/10"
                  }
                `}
            >
              <span className="text-base">{loc.flag}</span>
              <span
                className={`text-sm font-medium tracking-wide ${
                  activeLocation.id === loc.id
                    ? "text-orange-600 dark:text-orange-100"
                    : "text-black/60 dark:text-white/40"
                }`}
              >
                {loc.name}
              </span>

              {/* Active Indicator Dot */}
              {activeLocation.id === loc.id && (
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 3D Map Container */}
      <div
        ref={mountRef}
        className="absolute inset-0 top-[100px] w-full h-full opacity-0 transition-opacity duration-1000"
        style={{ opacity: isReady ? 1 : 0 }}
      />

      {/* Floating Info (Bottom Left) */}
      <div className="absolute bottom-8 left-8 z-20">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-orange-500/20 text-orange-500 dark:text-orange-400">
            <MapPin size={20} />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-orange-500 dark:text-orange-400 tracking-widest uppercase">
              Remote
            </span>
            <span className="text-xl font-bold text-black dark:text-white transition-colors">
              {activeLocation.label}
            </span>
          </div>
        </div>
      </div>

      {/* Globe Overlay Effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#0a0a0a] via-transparent to-transparent pointer-events-none transition-colors duration-300" />
    </div>
  );
}
