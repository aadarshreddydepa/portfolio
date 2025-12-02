"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, Plus, Eye } from "lucide-react";

// Project Data with specific tech stack details
const projects = [
  {
    id: 1,
    title: "Syndicator",
    description:
      "Built a scalable full-stack platform integrating a Python-based backend (Django) and a modern React + TypeScript + Vite frontend for seamless and high-performance user experience.",
    features: [
      "Implemented RESTful APIs enabling efficient data exchange.",
      "Designed a responsive, type-safe UI with advanced linting.",
      "Optimized module bundling using Vite and ESLint configurations.",
    ],
    techStack: [
      { name: "Python", icon: "/icons/python.svg" },
      { name: "Django", icon: "/icons/django.svg" },
      { name: "React", icon: "/icons/react.svg" },
      { name: "TypeScript", icon: "/icons/typescript.svg" },
      { name: "Vite", icon: "/icons/vite.svg" },
    ],
    img1: "/Images/Syndicator/Login.png",
    img2: "/Images/Syndicator/Dashboard.png",
    color: "#EC4899", // Pink-500 to match reference
  },
  {
    id: 2,
    title: "Himalaya Travel",
    description:
      "An immersive travel guide for the Himalayas, showcasing breathtaking visuals and interactive maps to help travelers plan their perfect adventure.",
    features: [
      "Interactive 3D maps with Three.js.",
      "Smooth scroll animations using GSAP.",
      "Responsive design for all devices.",
    ],
    techStack: [
      { name: "React", icon: "/icons/react.svg" },
      { name: "Three.js", icon: "/icons/threejs.svg" },
      { name: "Framer", icon: "/icons/framer.svg" },
      { name: "GSAP", icon: "/icons/gsap.svg" },
    ],
    img1: "/Images/Himalaya.png",
    img2: "/Images/Himalaya.png", // Fallback for now
    color: "#4ECDC4",
  },
  {
    id: 3,
    title: "Global Analytics",
    description:
      "Real-time data visualization platform for tracking global trends and metrics. Provides actionable insights through intuitive dashboards.",
    features: [
      "Data visualization with D3.js.",
      "Type-safe backend with Prisma.",
      "High-performance rendering.",
    ],
    techStack: [
      { name: "Next.js", icon: "/icons/nextjs.svg" },
      { name: "TypeScript", icon: "/icons/typescript.svg" },
      { name: "D3.js", icon: "/icons/d3.svg" },
      { name: "Prisma", icon: "/icons/prisma.svg" },
    ],
    img1: "/Images/Map.png",
    img2: "/Images/Map.png", // Fallback for now
    color: "#FFE66D",
  },
];

export default function CuratedWork() {
  const [activeProject, setActiveProject] = useState(0);

  return (
    <section className="relative bg-black py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center mb-32">
          <span className="text-xs font-bold tracking-[0.2em] text-white/40 uppercase mb-4 block">
            Featured Case Studies
          </span>
          <h2 className="text-5xl md:text-7xl font-serif text-white">
            Curated <span className="italic text-pink-500">work</span>
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Left Column: Scrolling Images */}
          <div className="w-full lg:w-3/5 flex flex-col gap-[15vh]">
            {projects.map((project, index) => (
              <ProjectImage
                key={project.id}
                project={project}
                index={index}
                setActiveProject={setActiveProject}
              />
            ))}
          </div>

          {/* Right Column: Sticky Text */}
          <div className="hidden lg:flex w-2/5 h-screen sticky top-0 flex-col justify-center">
            <div className="relative h-[60vh] w-full">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{
                    opacity: activeProject === index ? 1 : 0,
                    x: activeProject === index ? 0 : 20,
                    pointerEvents: activeProject === index ? "auto" : "none",
                  }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 flex flex-col justify-center p-8 md:p-10 border border-white/10 bg-white/5 rounded-3xl backdrop-blur-sm"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-[2px] w-10 bg-pink-500" />
                    <h3 className="text-4xl font-serif font-bold text-white">
                      {project.title}
                    </h3>
                  </div>

                  <p className="text-base md:text-lg text-white/70 leading-relaxed mb-6 font-light font-sans">
                    {project.description}
                  </p>

                  {/* Features List */}
                  <div className="space-y-2 mb-8">
                    {project.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <Plus
                          size={16}
                          className="text-pink-500 mt-1 shrink-0"
                        />
                        <span className="text-white/60 text-sm font-sans">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack Badges */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.techStack.map((tech) => (
                      <div
                        key={tech.name}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
                      >
                        {/* Placeholder for Icon - In real app, use Image or SVG */}
                        <div className="w-4 h-4 rounded-full bg-white/20" />
                        <span className="text-xs font-medium text-white/80 font-mono">
                          {tech.name}
                        </span>
                      </div>
                    ))}
                  </div>

                  <button className="flex items-center gap-2 text-white font-medium hover:gap-3 transition-all group w-fit text-sm tracking-wide uppercase border-b border-white/20 pb-1 hover:border-white font-sans">
                    View Case Study
                    <ArrowUpRight size={16} className="text-pink-500" />
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectImage({
  project,
  index,
  setActiveProject,
}: {
  project: any;
  index: number;
  setActiveProject: (index: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  // Trigger when 95% of the image is visible in the viewport
  const isInView = useInView(ref, { amount: 0.95 });
  const [isHovered, setIsHovered] = useState(false);

  // Mouse tracking for custom cursor
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 300 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (isInView) {
      setActiveProject(index);
    }
  }, [isInView, setActiveProject, index]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <div
      ref={ref}
      className="w-full aspect-[4/3] rounded-3xl overflow-hidden relative group border border-white/10 bg-[#111] cursor-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Background Color/Gradient */}
      <div
        className="absolute inset-0 transition-opacity duration-500 z-0"
        style={{
          background: project.color, // Use solid color as base
          opacity: 0.9, // High opacity for vibrant look
        }}
      >
        {/* Add a subtle gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-black/20" />
      </div>

      {/* Images Container - Reduced inner border (inset-3 instead of inset-4) */}
      <div className="absolute inset-3 md:inset-4 rounded-xl overflow-hidden shadow-2xl transition-transform duration-700 group-hover:scale-[1.02] z-10 bg-black">
        {/* Primary Image (Login) */}
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${
            isHovered ? "opacity-0" : "opacity-100"
          }`}
        >
          <Image
            src={project.img1}
            alt={`${project.title} - Main`}
            fill
            className="object-cover"
          />
        </div>

        {/* Secondary Image (Dashboard) - Visible on Hover */}
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={project.img2}
            alt={`${project.title} - Detail`}
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Custom Cursor / Hover Overlay */}
      <motion.div
        className="absolute z-20 pointer-events-none flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1 : 0.5,
        }}
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          top: 0,
          left: 0,
          position: "absolute",
        }}
      >
        <div className="relative w-24 h-24 md:w-32 md:h-32 flex items-center justify-center bg-black/80 backdrop-blur-sm rounded-full border border-white/20 shadow-2xl">
          {/* Rotating Text */}
          <div className="absolute inset-0 animate-[spin_10s_linear_infinite]">
            <svg viewBox="0 0 100 100" width="100%" height="100%">
              <path
                id="circlePath"
                d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                fill="transparent"
              />
              <text className="text-[11px] font-bold uppercase tracking-widest fill-white">
                <textPath href="#circlePath" startOffset="0%">
                  View Details • View Details • View Details •
                </textPath>
              </text>
            </svg>
          </div>
          {/* Eye Icon */}
          <Eye className="w-8 h-8 text-white" />
        </div>
      </motion.div>
    </div>
  );
}
