"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";

// --- Types ---
interface TechBadge {
  label: string;
  icon?: React.ElementType;
  href?: string;
}

interface Project {
  id: string;
  title: string;
  label: string;
  description: string;
  features: string[];
  techStack: TechBadge[];
  image: string;
  link: string;
  github?: string;
}

// --- Data ---
const projects: Project[] = [
  {
    id: "syndicator",
    title: "Syndicator",
    label: "Full Stack Platform",
    description:
      "A scalable full-stack platform integrating a Python-based backend (Django) and a modern React + TypeScript + Vite frontend. Designed for seamless data exchange and high-performance user experience.",
    features: [
      "RESTful APIs for efficient data exchange",
      "Responsive, type-safe UI with advanced linting",
      "Optimized module bundling with Vite",
    ],
    techStack: [
      { label: "React" },
      { label: "TypeScript" },
      { label: "Django" },
      { label: "Python" },
      { label: "Vite" },
    ],
    image: "/Images/Syndicator/Dashboard.png", // Using existing path
    link: "#",
  },
  {
    id: "himalaya",
    title: "Himalaya Travel",
    label: "Immersive Experience",
    description:
      "An immersive travel guide for the Himalayas, showcasing breathtaking visuals and interactive maps to help travelers plan their perfect adventure.",
    features: [
      "Interactive 3D maps with Three.js",
      "Smooth scroll animations using GSAP",
      "Responsive design for all devices",
    ],
    techStack: [
      { label: "React" },
      { label: "Three.js" },
      { label: "Framer Motion" },
      { label: "GSAP" },
    ],
    image: "/Images/Himalaya.png",
    link: "#",
  },
  {
    id: "analytics",
    title: "Global Analytics",
    label: "Data Visualization",
    description:
      "Real-time data visualization platform for tracking global trends and metrics. Provides actionable insights through intuitive dashboards.",
    features: [
      "Data visualization with D3.js",
      "Type-safe backend with Prisma",
      "High-performance rendering",
    ],
    techStack: [
      { label: "Next.js" },
      { label: "TypeScript" },
      { label: "D3.js" },
      { label: "Prisma" },
    ],
    image: "/Images/Map.png",
    link: "#",
  },
];

// --- Components ---

/**
 * Reusable Badge Component
 * Pill badges with a subtle dark background, border, and inner shadow.
 */
const Badge = ({ label, icon: Icon, href }: TechBadge) => {
  const content = (
    <span className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium tracking-wide text-white/80 bg-white/5 border border-white/10 rounded-full shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] transition-all duration-300 hover:bg-white/10 hover:text-white hover:border-white/20 focus:outline-none focus:ring-2 focus:ring-pink-500/50">
      {Icon && <Icon size={12} />}
      {label}
    </span>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block focus:outline-none rounded-full"
      >
        {content}
      </a>
    );
  }

  return (
    <div className="inline-block" tabIndex={0}>
      {content}
    </div>
  );
};

/**
 * Project Card Component (Left Column)
 */
const ProjectCard = ({
  project,
  index,
}: {
  project: Project;
  index: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Parallax effect: Card translates vertically slower than scroll
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.98, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <motion.div
      ref={ref}
      style={{ y, scale, opacity }}
      className="relative w-full aspect-[4/3] group rounded-3xl p-1"
    >
      <Link
        href={project.link}
        className="block w-full h-full focus:outline-none focus:ring-4 focus:ring-pink-500/50 rounded-3xl"
      >
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-pink-500 via-fuchsia-500 to-purple-500 opacity-80 blur-sm transition-all duration-500 group-hover:opacity-100 group-hover:blur-md animate-gradient" />

        {/* Card Container */}
        <div className="relative h-full w-full rounded-[22px] bg-black/90 overflow-hidden border border-white/10 shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
          {/* Inner Glow */}
          <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_40px_rgba(236,72,153,0.1)] rounded-[22px]" />

          {/* Mockup Image */}
          <div className="absolute inset-4 md:inset-8 rounded-xl overflow-hidden shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] bg-[#1a1a1a]">
            <Image
              src={project.image}
              alt={`${project.title} Mockup`}
              fill
              className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 60vw"
              priority={index === 0}
            />
          </div>

          {/* Hover CTA */}
          <div className="absolute top-6 right-6 opacity-0 transform translate-x-2 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0">
            <div className="p-3 bg-white text-black rounded-full shadow-lg">
              <ArrowRight size={20} />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

/**
 * Project Details Component (Right Column)
 */
const ProjectDetails = ({ project }: { project: Project }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="flex flex-col justify-center h-full py-8 md:py-0"
    >
      {/* Label */}
      <motion.span
        variants={itemVariants}
        className="text-xs font-bold tracking-[0.2em] text-white/40 uppercase mb-4"
      >
        {project.label}
      </motion.span>

      {/* Title */}
      <motion.h3
        variants={itemVariants}
        className="text-4xl md:text-5xl font-serif font-bold text-white mb-6"
      >
        {project.title}
      </motion.h3>

      {/* Description */}
      <motion.p
        variants={itemVariants}
        className="text-base md:text-lg text-white/70 leading-relaxed mb-8 font-light"
      >
        {project.description}
      </motion.p>

      {/* Features */}
      <motion.ul variants={itemVariants} className="space-y-4 mb-10">
        {project.features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3">
            <Star className="w-5 h-5 text-pink-500 shrink-0 mt-0.5 fill-pink-500/20" />
            <span className="text-white/80 text-sm md:text-base leading-relaxed">
              {feature}
            </span>
          </li>
        ))}
      </motion.ul>

      {/* Tech Stack */}
      <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
        {project.techStack.map((tech, i) => (
          <Badge key={i} {...tech} />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default function CuratedWork() {
  return (
    <section className="relative bg-black py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center mb-24 md:mb-32">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold tracking-[0.2em] text-white/40 uppercase mb-4 block"
          >
            Case Studies
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-instrument text-white"
          >
            Curated{" "}
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 pr-2">
              Work
            </span>
          </motion.h2>
        </div>

        <div className="flex flex-col gap-32 md:gap-48">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="flex flex-col-reverse md:flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-16 items-start"
            >
              {/* Left Column: Visual (Spans 7-8) */}
              <div className="w-full lg:col-span-7 xl:col-span-8">
                <ProjectCard project={project} index={index} />
              </div>

              {/* Right Column: Text (Spans 4-5) */}
              <div className="w-full lg:col-span-5 xl:col-span-4 lg:sticky lg:top-[120px]">
                <ProjectDetails project={project} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
