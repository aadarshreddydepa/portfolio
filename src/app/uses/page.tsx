"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import Image from "next/image";
import {
  Code,
  Terminal,
  Music,
  PenTool,
  Figma,
  Slack,
  Database,
  Globe,
  Cpu,
  Layers,
  Box,
  GitBranch,
  Radio,
  MessageSquare,
  Zap,
  Layout,
  Server,
  Cloud,
  Command,
  Monitor,
  Atom, // Added
} from "lucide-react";

// --- Types ---
interface Tool {
  name: string;
  category: string;
  icon: any; // Lucide Icon or Custom SVG Component
  color: string; // Tailwind text color class for icon
}

interface Section {
  id: string;
  number: string;
  title: string;
  type: "hero" | "grid";
  content?: any;
}

// --- Data ---
const tools: Tool[] = [
  { name: "VS Code", category: "Editor", icon: Code, color: "text-blue-500" },
  {
    name: "Cursor",
    category: "AI Editor",
    icon: Cpu,
    color: "text-purple-400",
  }, // AI -> Cpu
  {
    name: "Python",
    category: "Language",
    icon: Terminal,
    color: "text-yellow-400",
  }, // Python -> Terminal
  {
    name: "Notion",
    category: "Organization",
    icon: PenTool,
    color: "text-white",
  },
  { name: "Spotify", category: "Music", icon: Music, color: "text-green-500" },
  { name: "Arc", category: "Browser", icon: Globe, color: "text-pink-400" },
  {
    name: "Raycast",
    category: "Productivity",
    icon: Command,
    color: "text-red-400",
  },
  { name: "Figma", category: "Design", icon: Figma, color: "text-purple-500" },
  {
    name: "Linear",
    category: "Management",
    icon: Zap,
    color: "text-indigo-400",
  },
  {
    name: "Slack",
    category: "Communication",
    icon: Slack,
    color: "text-yellow-500",
  },
  {
    name: "Discord",
    category: "Community",
    icon: MessageSquare,
    color: "text-indigo-500",
  },
  { name: "Docker", category: "DevOps", icon: Box, color: "text-blue-600" },
  {
    name: "Git",
    category: "Version Control",
    icon: GitBranch,
    color: "text-orange-500",
  },
  {
    name: "Postman",
    category: "API Testing",
    icon: Radio,
    color: "text-orange-600",
  },
  { name: "Vercel", category: "Deployment", icon: Globe, color: "text-white" }, // Deployment/Web -> Globe
  {
    name: "Node.js",
    category: "Runtime",
    icon: Server,
    color: "text-green-600",
  },
  { name: "React", category: "Frontend", icon: Atom, color: "text-cyan-400" }, // React -> Atom
  { name: "Next.js", category: "Framework", icon: Globe, color: "text-white" }, // Next.js -> Globe
  {
    name: "Tailwind",
    category: "Styling",
    icon: Layers,
    color: "text-cyan-300",
  },
];

const ToolCard = ({ tool }: { tool: Tool }) => (
  <div className="group relative flex flex-col items-center justify-center p-4 bg-[#0F0F0F] border border-white/5 rounded-2xl hover:bg-[#1A1A1A] hover:border-white/10 transition-all cursor-default aspect-square">
    <motion.div
      whileHover={{ scale: 1.1, rotate: 5 }}
      className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-3 transition-colors ${tool.color}`}
    >
      <tool.icon size={20} strokeWidth={1.5} />
    </motion.div>
    <h3 className="text-xs font-medium text-white/90 mb-0.5">{tool.name}</h3>
    <p className="text-[9px] text-white/40 uppercase tracking-wider">
      {tool.category}
    </p>
  </div>
);

export default function UsesPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-pink-500/30">
      <Navbar />

      <div className="max-w-5xl mx-auto border-x border-dashed border-white/10 min-h-screen bg-[url('/Images/noise.png')]">
        <section className="pt-32 pb-24 px-6 md:px-12">
          {/* Header */}
          <div className="relative text-center mb-32 py-12 border-b border-dashed border-white/10">
            <span className="text-xs font-bold tracking-[0.2em] text-white/40 uppercase mb-4 block">
              The Gear
            </span>
            <h1 className="text-5xl md:text-7xl font-serif text-white">
              What Powers{" "}
              <span className="italic bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent px-2">
                My Work
              </span>
            </h1>
          </div>

          {/* Section 01: Workstation */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 mb-32 relative border-b border-dashed border-white/10 pb-32">
            {/* Sidebar */}
            <div className="lg:col-span-4 lg:sticky lg:top-32 self-start pr-12">
              <span className="text-xs font-bold tracking-[0.2em] text-white/40 uppercase mb-4 block">
                01
              </span>
              <h2 className="text-3xl md:text-4xl font-serif text-white mb-6">
                Workstation
              </h2>
            </div>

            {/* Content */}
            <div className="lg:col-span-8 border-l border-dashed border-white/10 pl-12">
              <div className="rounded-3xl overflow-hidden border border-white/10 bg-[#0a0a0a]">
                <div className="relative aspect-video w-full">
                  <Image
                    src="/Images/Uses/mac.webp"
                    alt="MacBook Air M2"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-8 border-t border-white/10 bg-[#0F0F0F]">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    MacBook Air M2
                  </h3>
                  <p className="text-white/60 font-mono text-sm">
                    16GB Unified Memory • 256GB SSD • Starlight
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 02: Development */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 mb-32 relative border-b border-dashed border-white/10 pb-32">
            {/* Sidebar */}
            <div className="lg:col-span-4 lg:sticky lg:top-32 self-start pr-12">
              <span className="text-xs font-bold tracking-[0.2em] text-white/40 uppercase mb-4 block">
                02
              </span>
              <h2 className="text-3xl md:text-4xl font-serif text-white mb-6">
                Development
              </h2>
            </div>

            {/* Content */}
            <div className="lg:col-span-8 border-l border-dashed border-white/10 pl-12">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {tools.map((tool) => (
                  <ToolCard key={tool.name} tool={tool} />
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
