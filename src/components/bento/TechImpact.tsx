"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const row1 = [
  { name: "Python", icon: "https://cdn.simpleicons.org/python" },
  { name: "Java", icon: "https://cdn.simpleicons.org/openjdk" },
  { name: "JavaScript", icon: "https://cdn.simpleicons.org/javascript" },
  { name: "TypeScript", icon: "https://cdn.simpleicons.org/typescript" },
  { name: "HTML", icon: "https://cdn.simpleicons.org/html5" },
  { name: "CSS", icon: "https://cdn.simpleicons.org/css3" },
];

const row2 = [
  { name: "React", icon: "https://cdn.simpleicons.org/react" },
  { name: "Node.js", icon: "https://cdn.simpleicons.org/nodedotjs" },
  { name: "Flask", icon: "https://cdn.simpleicons.org/flask/white" },
  { name: "FastAPI", icon: "https://cdn.simpleicons.org/fastapi" },
  { name: "Docker", icon: "https://cdn.simpleicons.org/docker" },
  { name: "Git", icon: "https://cdn.simpleicons.org/git" },
];

const row3 = [
  { name: "PostgreSQL", icon: "https://cdn.simpleicons.org/postgresql" },
  { name: "MongoDB", icon: "https://cdn.simpleicons.org/mongodb" },
  { name: "AWS", icon: "https://cdn.simpleicons.org/amazonwebservices" },
  { name: "Linux", icon: "https://cdn.simpleicons.org/linux/white" },
  { name: "PyTorch", icon: "https://cdn.simpleicons.org/pytorch" },
  { name: "OpenCV", icon: "https://cdn.simpleicons.org/opencv" },
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
    <div className="flex overflow-hidden relative w-full py-2">
      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10" />

      <motion.div
        initial={{ x: direction === "left" ? 0 : "-50%" }}
        animate={{ x: direction === "left" ? "-50%" : 0 }}
        transition={{
          duration: speed,
          ease: "linear",
          repeat: Infinity,
        }}
        className="flex gap-6 pr-6 whitespace-nowrap"
      >
        {[...items, ...items, ...items, ...items].map((tech, index) => (
          <div
            key={index}
            className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
          >
            <img src={tech.icon} alt={tech.name} className="w-5 h-5" />
            <span className="text-base font-medium text-white/80">
              {tech.name}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default function TechImpact() {
  return (
    <div className="h-full flex flex-col bg-[#0a0a0a] border border-white/10 rounded-3xl relative overflow-hidden">
      {/* Tech Stack Section */}
      <div className="p-8 pb-0 relative z-20">
        <div className="text-center mb-8">
          <h3 className="text-3xl font-serif text-white/90 mb-2">
            Passionate about cutting-edge
          </h3>
          <h3 className="text-3xl font-serif text-purple-400 italic">
            technologies
          </h3>
        </div>

        <div className="flex flex-col gap-4 mb-8">
          <MarqueeRow items={row1} direction="left" speed={30} />
          <MarqueeRow items={row2} direction="right" speed={25} />
          <MarqueeRow items={row3} direction="left" speed={35} />
        </div>
      </div>

      {/* Impact Section (Browser Mockup) */}
      <div className="flex-1 relative mt-4 mx-8 group">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[120%] bg-[#111] border border-white/10 rounded-t-2xl shadow-2xl transition-transform duration-500 group-hover:-translate-y-4">
          {/* Browser Header */}
          <div className="flex items-center gap-2 px-4 py-4 border-b border-white/5 bg-[#161616]">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/20" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
              <div className="w-3 h-3 rounded-full bg-green-500/20" />
            </div>
            <div className="flex-1 flex justify-center">
              <div className="w-40 h-2 rounded-full bg-white/5" />
            </div>
          </div>

          {/* Browser Content */}
          <div className="p-10 flex flex-col items-center justify-center h-full relative overflow-hidden bg-[#0a0a0a]">
            {/* Grid Background */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />

            <div className="relative z-10 text-center -mt-10">
              <h4 className="text-2xl font-medium text-white mb-2">
                Websites that
              </h4>
              <h4 className="text-5xl font-bold text-blue-500 mb-8">Impact.</h4>

              <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-black text-sm font-bold hover:scale-105 transition-transform cursor-pointer">
                Start Project <ArrowRight size={14} />
              </div>
            </div>

            {/* Glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[200px] h-[150px] bg-blue-500/20 blur-[80px] rounded-full pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Background Gradient */}
      <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-purple-500/5 to-transparent pointer-events-none" />
    </div>
  );
}
