"use client";

import { motion } from "framer-motion";
import {
  Code2,
  Database,
  Figma,
  Globe,
  Layout,
  Server,
  Smartphone,
  Terminal,
  Cpu,
  Cloud,
  GitBranch,
  Layers,
} from "lucide-react";

const technologies = [
  { name: "React", icon: Code2 },
  { name: "Next.js", icon: Globe },
  { name: "TypeScript", icon: Terminal },
  { name: "Tailwind", icon: Layout },
  { name: "Node.js", icon: Server },
  { name: "PostgreSQL", icon: Database },
  { name: "React Native", icon: Smartphone },
  { name: "Figma", icon: Figma },
  { name: "AWS", icon: Cloud },
  { name: "Docker", icon: Layers },
  { name: "Git", icon: GitBranch },
  { name: "GraphQL", icon: Cpu },
];

export default function TechStack() {
  return (
    <section className="py-12 border-y border-white/5 bg-white/5 backdrop-blur-sm overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background z-10 pointer-events-none" />

      <div className="flex">
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: "-50%" }}
          transition={{
            duration: 20,
            ease: "linear",
            repeat: Infinity,
          }}
          className="flex gap-12 pr-12 whitespace-nowrap"
        >
          {[...technologies, ...technologies].map((tech, index) => (
            <div
              key={index}
              className="flex items-center gap-3 text-white/50 hover:text-white transition-colors cursor-default group"
            >
              <tech.icon
                size={24}
                className="group-hover:text-accent-foreground transition-colors"
              />
              <span className="text-lg font-medium">{tech.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
