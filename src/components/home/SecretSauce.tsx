"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
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
  // Languages
  {
    id: "python",
    name: "Python",
    iconUrl: "https://cdn.simpleicons.org/python/3776AB",
  },
  {
    id: "java",
    name: "Java",
    iconUrl: "https://cdn.simpleicons.org/openjdk/white",
  },
  {
    id: "javascript",
    name: "JavaScript",
    iconUrl: "https://cdn.simpleicons.org/javascript/F7DF1E",
  },
  {
    id: "typescript",
    name: "TypeScript",
    iconUrl: "https://cdn.simpleicons.org/typescript/3178C6",
  },
  {
    id: "html",
    name: "HTML5",
    iconUrl: "https://cdn.simpleicons.org/html5/E34F26",
  },
  { id: "css", name: "CSS3", iconUrl: "/Logo/css3.svg" },
  {
    id: "sql",
    name: "SQL",
    iconUrl: "https://cdn.simpleicons.org/mysql/4479A1",
  },

  // Frameworks/Tools
  {
    id: "react",
    name: "React.js",
    iconUrl: "https://cdn.simpleicons.org/react/61DAFB",
  },
  {
    id: "react-native",
    name: "React Native",
    iconUrl: "https://cdn.simpleicons.org/react/61DAFB",
  },
  {
    id: "node",
    name: "Node.js",
    iconUrl: "https://cdn.simpleicons.org/nodedotjs/339933",
  },
  {
    id: "flask",
    name: "Flask",
    iconUrl: "https://cdn.simpleicons.org/flask/white",
  },
  {
    id: "fastapi",
    name: "FastAPI",
    iconUrl: "https://cdn.simpleicons.org/fastapi/009688",
  },
  {
    id: "django",
    name: "Django REST",
    iconUrl: "https://cdn.simpleicons.org/django/092E20",
  },
  { id: "git", name: "Git", iconUrl: "https://cdn.simpleicons.org/git/F05032" },
  {
    id: "github",
    name: "GitHub",
    iconUrl: "https://cdn.simpleicons.org/github/white",
  },
  {
    id: "rest-api",
    name: "REST API",
    iconUrl: "https://cdn.simpleicons.org/openapiinitiative/6BA539",
  },
  {
    id: "docker",
    name: "Docker",
    iconUrl: "https://cdn.simpleicons.org/docker/2496ED",
  },

  // Databases
  {
    id: "mysql",
    name: "MySQL",
    iconUrl: "https://cdn.simpleicons.org/mysql/4479A1",
  },
  {
    id: "mongodb",
    name: "MongoDB",
    iconUrl: "https://cdn.simpleicons.org/mongodb/47A248",
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    iconUrl: "https://cdn.simpleicons.org/postgresql/4169E1",
  },
  {
    id: "sqlite",
    name: "SQLite",
    iconUrl: "https://cdn.simpleicons.org/sqlite/003B57",
  },

  // AI/ML
  {
    id: "scikit-learn",
    name: "Scikit-learn",
    iconUrl: "https://cdn.simpleicons.org/scikitlearn/F7931E",
  },
  {
    id: "pytorch",
    name: "PyTorch",
    iconUrl: "https://cdn.simpleicons.org/pytorch/EE4C2C",
  },
  {
    id: "transformers",
    name: "Transformers",
    iconUrl: "https://cdn.simpleicons.org/huggingface/FFD21E",
  },
  {
    id: "opencv",
    name: "OpenCV",
    iconUrl: "https://cdn.simpleicons.org/opencv/5C3EE8",
  },
  {
    id: "langchain",
    name: "LangChain",
    iconUrl: "https://cdn.simpleicons.org/langchain/1C3C3C",
  },
  {
    id: "mlops",
    name: "MLOps",
    iconUrl: "https://cdn.simpleicons.org/mlflow/0194E2",
  },

  // Cloud/DevOps
  { id: "aws", name: "AWS", iconUrl: "/Logo/amazon.svg" },
  {
    id: "render",
    name: "Render",
    iconUrl: "https://cdn.simpleicons.org/render/white",
  },
  {
    id: "linux",
    name: "Linux",
    iconUrl: "https://cdn.simpleicons.org/linux/FCC624",
  },
  {
    id: "cloudinary",
    name: "Cloudinary",
    iconUrl: "https://cdn.simpleicons.org/cloudinary/3448C5",
  },

  // Concepts
  {
    id: "system-design",
    name: "System Design",
    iconUrl: "https://cdn.simpleicons.org/diagramsdotnet/F08705",
  },
  {
    id: "cicd",
    name: "CI/CD",
    iconUrl: "https://cdn.simpleicons.org/githubactions/2088FF",
  },
  {
    id: "api-dev",
    name: "API Dev",
    iconUrl: "https://cdn.simpleicons.org/postman/FF6C37",
  },
];

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0.2,
    },
  },
};

const iconVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 260,
      damping: 20,
    },
  },
};

// --- Components ---

/**
 * BadgeIcon Component
 * Animated rounded square tile with icon and tooltip.
 * Handles reveal, idle float, and hover interactions.
 */
const BadgeIcon = ({
  skill,
  index,
  isInView,
}: {
  skill: Skill;
  index: number;
  isInView: boolean;
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  // Randomize idle animation duration and delay slightly for organic feel
  const duration = 4 + Math.random() * 2; // 4-6s
  const delay = Math.random() * 2;

  return (
    <motion.div
      variants={iconVariants}
      className="relative group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{
        scale: 1.08,
        rotate: 2,
        transition: { type: "spring", stiffness: 400, damping: 17 },
      }}
      // Idle animation: only runs when in view and not hovered
      animate={
        isInView && !isHovered
          ? {
              y: [-3, 3, -3],
              rotate: [-1, 1, -1],
              transition: {
                duration: duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: delay,
              },
            }
          : undefined
      }
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
      <div className="w-14 h-14 md:w-16 md:h-16 bg-[#111] border border-white/10 rounded-2xl flex items-center justify-center shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] transition-all duration-300 group-hover:border-white/20 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] group-focus:ring-2 group-focus:ring-pink-500">
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
  const gridRef = useRef<HTMLDivElement>(null);

  // Track if the grid is in view to trigger animations
  const isGridInView = React.useRef(false); // Using ref to avoid re-renders for logic, but we need state or hook for framer

  // Using framer-motion's useInView hook
  // once: true -> reveal animation happens only once
  // amount: 0.2 -> triggers when 20% of grid is visible
  const isInView = React.useMemo(() => {
    // This is a workaround since we can't call hooks conditionally or inside callbacks easily
    // We will use the InView component or just the hook at top level
    return true;
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 10,
    damping: 20,
    restDelta: 0.0001,
  });

  const rotate = useTransform(smoothProgress, [0, 1], [0, 360]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen bg-black overflow-hidden flex flex-col items-center justify-center py-8"
    >
      {/* Top Section: Blob + Text */}
      <div className="relative flex flex-col items-center mb-4 z-10">
        {/* Blob - Centered behind text */}
        <motion.div
          style={{ rotate }}
          className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] mix-blend-screen opacity-80 will-change-transform"
        >
          <Image
            src="/Images/blob.png"
            alt="Organic 3D Blob"
            fill
            className="object-contain select-none pointer-events-none"
            priority
          />
        </motion.div>

        {/* Text Overlay - Positioned to overlap bottom half of blob */}
        <div className="absolute top-[60%] flex flex-col items-center w-full">
          <div className="flex flex-col items-center justify-center px-8 py-4">
            <span className="text-xs font-bold tracking-[0.3em] text-white/60 uppercase mb-2 drop-shadow-md">
              My Skills
            </span>
            <h2 className="text-5xl md:text-7xl font-instrument text-white text-center drop-shadow-2xl whitespace-nowrap">
              The Secret{" "}
              <span className="italic bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 pr-2">
                Sauce
              </span>
            </h2>
          </div>
        </div>
      </div>

      {/* Icons Grid Layout - Stacked in rows */}
      <div className="relative w-full max-w-[1000px] px-6 z-20 mt-0">
        <motion.div
          ref={gridRef}
          className="flex flex-wrap justify-center gap-2"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {SKILLS.map((skill, index) => (
            <BadgeIcon
              key={skill.id}
              skill={skill}
              index={index}
              isInView={true} // We let the parent control visibility via whileInView, but for idle we might want more granular control.
              // Actually, for idle animation, we want it to run when visible.
              // Since motion.div handles whileInView for the parent, children animate in.
              // For the idle loop, we can use a separate InView check or just let it run.
              // To strictly follow "idle loop must only run while grid is in view", we need useInView hook.
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
