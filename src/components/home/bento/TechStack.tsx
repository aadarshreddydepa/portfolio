"use client";

import { motion } from "framer-motion";
import {
  Code2,
  Database,
  Layout,
  Server,
  Smartphone,
  Terminal,
  Cpu,
  Cloud,
  GitBranch,
  Layers,
  Github,
  Zap,
  Brain,
  Eye,
  Box,
} from "lucide-react";

const row1 = [
  { name: "Python", icon: Terminal },
  { name: "Java", icon: Code2 },
  { name: "JavaScript", icon: Code2 },
  { name: "TypeScript", icon: Code2 },
  { name: "HTML", icon: Layout },
  { name: "CSS", icon: Layout },
  { name: "SQL", icon: Database },
];

const row2 = [
  { name: "React.js", icon: Code2 },
  { name: "React Native", icon: Smartphone },
  { name: "Node.js", icon: Server },
  { name: "Flask", icon: Server },
  { name: "FastAPI", icon: Zap },
  { name: "Docker", icon: Box },
  { name: "Git", icon: GitBranch },
];

const row3 = [
  { name: "PostgreSQL", icon: Database },
  { name: "MongoDB", icon: Database },
  { name: "AWS", icon: Cloud },
  { name: "Linux", icon: Terminal },
  { name: "PyTorch", icon: Brain },
  { name: "OpenCV", icon: Eye },
  { name: "LangChain", icon: Brain },
];

const MarqueeRow = ({
  items,
  direction = "left",
  speed = 20,
}: {
  items: typeof row1;
  direction?: "left" | "right";
  speed?: number;
}) => {
  return (
    <div className="flex overflow-hidden relative w-full">
      <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10" />

      <motion.div
        initial={{ x: direction === "left" ? 0 : "-50%" }}
        animate={{ x: direction === "left" ? "-50%" : 0 }}
        transition={{
          duration: speed,
          ease: "linear",
          repeat: Infinity,
        }}
        className="flex gap-4 pr-4 whitespace-nowrap"
      >
        {[...items, ...items, ...items, ...items].map((tech, index) => (
          <div
            key={index}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          >
            <tech.icon size={16} />
            <span className="text-sm font-medium">{tech.name}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default function TechStack() {
  return (
    <div className="h-full flex flex-col justify-between p-8 bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden relative">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-serif text-white/90 mb-1">
          Passionate about cutting-edge
        </h3>
        <h3 className="text-2xl font-serif text-purple-400 italic">
          technologies
        </h3>
      </div>

      <div className="flex flex-col gap-4 -mx-4 w-[calc(100%+2rem)]">
        <MarqueeRow items={row1} direction="left" speed={25} />
        <MarqueeRow items={row2} direction="right" speed={20} />
        <MarqueeRow items={row3} direction="left" speed={30} />
      </div>

      {/* Background Gradient */}
      <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-purple-500/5 to-transparent pointer-events-none" />
    </div>
  );
}
