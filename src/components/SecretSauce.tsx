"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import Image from "next/image";
import clsx from "clsx";

// --- Types ---
interface Skill {
  id: string;
  name: string;
  iconUrl: string;
}

// --- Data ---
const SKILLS: Skill[] = [
  {
    id: "react",
    name: "React",
    iconUrl: "https://cdn.simpleicons.org/react/61DAFB",
  },
  {
    id: "nextjs",
    name: "Next.js",
    iconUrl: "https://cdn.simpleicons.org/nextdotjs/white",
  },
  {
    id: "typescript",
    name: "TypeScript",
    iconUrl: "https://cdn.simpleicons.org/typescript/3178C6",
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    iconUrl: "https://www.flaticon.com/free-icon/css-3_732007?term=css&page=1&position=4&origin=search&related_id=732007",
  },
  {
    id: "css",
    name: "CSS3",
    iconUrl: "https://cdn.simpleicons.org/css3/1572B6",
  },
  {
    id: "javascript",
    name: "JavaScript",
    iconUrl: "https://cdn.simpleicons.org/javascript/F7DF1E",
  },
  {
    id: "html",
    name: "HTML5",
    iconUrl: "https://cdn.simpleicons.org/html5/E34F26",
  },
  {
    id: "figma",
    name: "Figma",
    iconUrl: "https://cdn.simpleicons.org/figma/F24E1E",
  },
  {
    id: "notion",
    name: "Notion",
    iconUrl: "https://cdn.simpleicons.org/notion/white",
  },
  {
    id: "markdown",
    name: "Markdown",
    iconUrl: "https://cdn.simpleicons.org/markdown/white",
  },
  {
    id: "node",
    name: "Node.js",
    iconUrl: "https://cdn.simpleicons.org/nodedotjs/339933",
  },
  {
    id: "express",
    name: "Express",
    iconUrl: "https://cdn.simpleicons.org/express/white",
  },
  {
    id: "redis",
    name: "Redis",
    iconUrl: "https://cdn.simpleicons.org/redis/DC382D",
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    iconUrl: "https://cdn.simpleicons.org/postgresql/4169E1",
  },
  {
    id: "mongodb",
    name: "MongoDB",
    iconUrl: "https://cdn.simpleicons.org/mongodb/47A248",
  },
  {
    id: "prisma",
    name: "Prisma",
    iconUrl: "https://cdn.simpleicons.org/prisma/white",
  },
  {
    id: "threejs",
    name: "Three.js",
    iconUrl: "https://cdn.simpleicons.org/threedotjs/white",
  },
  {
    id: "framer",
    name: "Framer",
    iconUrl: "https://cdn.simpleicons.org/framer/0055FF",
  },
  { id: "git", name: "Git", iconUrl: "https://cdn.simpleicons.org/git/F05032" },
  {
    id: "github",
    name: "GitHub",
    iconUrl: "https://cdn.simpleicons.org/github/white",
  },
  {
    id: "docker",
    name: "Docker",
    iconUrl: "https://cdn.simpleicons.org/docker/2496ED",
  },
  {
    id: "aws",
    name: "AWS",
    iconUrl: "https://cdn.simpleicons.org/amazonaws/232F3E",
  },
  {
    id: "python",
    name: "Python",
    iconUrl: "https://cdn.simpleicons.org/python/3776AB",
  },
  {
    id: "linux",
    name: "Linux",
    iconUrl: "https://cdn.simpleicons.org/linux/FCC624",
  },
  {
    id: "nginx",
    name: "Nginx",
    iconUrl: "https://cdn.simpleicons.org/nginx/009639",
  },
  {
    id: "jest",
    name: "Jest",
    iconUrl: "https://cdn.simpleicons.org/jest/C21325",
  },
];

// --- Components ---

/**
 * BadgeIcon Component
 * Rounded square tile with icon and tooltip.
 * Animates from a scattered position to (0,0) based on scroll progress.
 */
const BadgeIcon = ({
  skill,
  index,
  progress,
}: {
  skill: Skill;
  index: number;
  progress: MotionValue<number>;
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  // Deterministic random positions based on index to avoid hydration mismatch
  // Increased spread range for more dramatic effect
  const randomX = (((index * 17) % 200) - 100) * 4;
  const randomY = (((index * 23) % 200) - 100) * 4;

  // Map scroll progress (0 to 1) to position (random to 0)
  const x = useTransform(progress, [0, 1], [randomX, 0]);
  const y = useTransform(progress, [0, 1], [randomY, 0]);
  const opacity = useTransform(progress, [0, 0.8], [0, 1]);
  const scale = useTransform(progress, [0, 1], [0.5, 1]);

  return (
    <motion.div
      className="relative group cursor-pointer"
      style={{ x, y, opacity, scale }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      tabIndex={0}
      role="img"
      aria-label={skill.name}
    >
      {/* Tooltip */}
      <div
        className={clsx(
          "absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-xs font-medium text-white whitespace-nowrap transition-all duration-300 pointer-events-none z-20",
          isHovered ? "opacity-100 -translate-y-2" : "opacity-0 translate-y-0"
        )}
      >
        {skill.name}
      </div>

      {/* Rounded Square Tile */}
      <div className="w-14 h-14 md:w-16 md:h-16 bg-[#111] border border-white/5 rounded-2xl flex items-center justify-center shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] transition-all duration-300 group-hover:scale-110 group-hover:border-white/20 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] group-focus:ring-2 group-focus:ring-pink-500">
        {/* Icon */}
        <div className="w-7 h-7 md:w-8 md:h-8 relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={skill.iconUrl}
            alt={skill.name}
            className="w-full h-full object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300"
          />
        </div>
      </div>
    </motion.div>
  );
};

/**
 * Main SecretSauce Component
 */
export default function SecretSauce() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress of the container
  // "start end" -> when top of container hits bottom of viewport (0)
  // "center center" -> when center of container hits center of viewport (1)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"],
  });

  // Add spring physics to smooth out the scroll value
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
    restDelta: 0.001,
  });

  // Blob rotation: rotates clockwise as you scroll
  const blobRotate = useTransform(smoothProgress, [0, 1], [0, 180]);

  // Blob scale: slight pulse effect
  const blobScale = useTransform(smoothProgress, [0, 0.5, 1], [0.8, 1.1, 1]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen bg-black overflow-hidden flex flex-col items-center justify-center py-24 md:py-32"
    >
      {/* Background Noise/Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)] pointer-events-none" />

      {/* Header Container with Blob Behind */}
      <div className="relative w-full max-w-4xl mx-auto flex flex-col items-center justify-center mb-16 h-[300px]">
        {/* 3D Blob - Positioned Absolute Behind Text */}
        <motion.div
          style={{ rotate: blobRotate, scale: blobScale }}
          className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none"
        >
          <div className="relative w-80 h-80 md:w-96 md:h-96 mix-blend-screen opacity-80">
            <Image
              src="/Images/blob.png"
              alt="Organic 3D Blob"
              fill
              className="object-contain"
              priority
            />
          </div>
        </motion.div>

        {/* Heading - Relative z-10 to sit on top */}
        <div className="relative z-10 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-xs font-bold tracking-[0.3em] text-white/40 uppercase block mb-4"
          >
            My Skills
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
            className="text-5xl md:text-7xl font-serif text-white drop-shadow-2xl"
          >
            The Secret{" "}
            <span className="italic bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 animate-gradient-text">
              Sauce
            </span>
          </motion.h2>
        </div>
      </div>

      {/* Icons Grid Layout */}
      <div className="relative w-full max-w-5xl mx-auto px-6 z-20">
        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
          {SKILLS.map((skill, index) => (
            <BadgeIcon
              key={skill.id}
              skill={skill}
              index={index}
              progress={smoothProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
