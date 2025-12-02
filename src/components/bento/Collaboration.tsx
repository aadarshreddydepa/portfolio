"use client";

import { Handshake, ArrowRight } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

const satellites = [
  { id: 1, x: -80, y: -60, img: "https://i.pravatar.cc/100?img=19" },
  { id: 2, x: 80, y: -60, img: "https://i.pravatar.cc/100?img=53" },
  { id: 3, x: -100, y: 40, img: "https://i.pravatar.cc/100?img=13" },
  { id: 4, x: 100, y: 40, img: "https://i.pravatar.cc/100?img=3" },
];

export default function Collaboration() {
  return (
    <motion.div
      initial="initial"
      whileHover="hover"
      className="h-full flex flex-col justify-between p-8 bg-[#0a0a0a] border border-white/10 rounded-3xl relative overflow-hidden cursor-pointer"
    >
      {/* Network Animation Container */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Central Avatar Container */}
        <div className="relative w-[400px] h-[300px] flex items-center justify-center -translate-y-12">
          {/* Satellites */}
          {satellites.map((sat, i) => (
            <motion.div
              key={sat.id}
              variants={{
                initial: { opacity: 0, scale: 0, x: 0, y: 0 },
                hover: {
                  opacity: 1,
                  scale: 1,
                  x: sat.x,
                  y: sat.y,
                  transition: { duration: 0.4, delay: i * 0.05 },
                },
              }}
              className="absolute z-10"
            >
              {/* Connection Line */}
              <motion.div
                variants={{
                  initial: { opacity: 0, width: 0 },
                  hover: {
                    opacity: 0.2,
                    width: Math.sqrt(sat.x * sat.x + sat.y * sat.y),
                    transition: { duration: 0.4, delay: i * 0.05 },
                  },
                }}
                className="absolute top-1/2 left-1/2 h-[2px] bg-white origin-left -z-10"
                style={{
                  transform: `rotate(${Math.atan2(sat.y, sat.x)}rad)`,
                }}
              />

              <div className="w-12 h-12 rounded-full border-2 border-white/10 overflow-hidden relative shadow-lg bg-[#111]">
                <Image
                  src={sat.img}
                  alt="Client"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          ))}

          {/* Center Avatar */}
          <motion.div
            variants={{
              initial: { scale: 1 },
              hover: { scale: 1.05 },
            }}
            transition={{ duration: 0.3 }}
            className="relative z-20 w-24 h-24 rounded-full overflow-hidden border-4 border-[#0a0a0a] shadow-2xl"
          >
            <Image
              src="/Images/ME.png"
              alt="Me"
              fill
              className="object-cover"
            />
            {/* Photoshop/Tool Icon Overlay */}
            <div className="absolute bottom-0 right-0 bg-[#001e36] p-1.5 rounded-tl-xl">
              <div className="text-[10px] font-bold text-[#31a8ff]">Ps</div>
            </div>
          </motion.div>

          {/* Pulsing Rings */}
          <div className="absolute inset-0 z-0 flex items-center justify-center">
            <div className="w-[300px] h-[300px] border border-white/5 rounded-full absolute" />
            <div className="w-[450px] h-[450px] border border-white/5 rounded-full absolute" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-30 mt-auto pointer-events-none">
        <div className="flex items-center gap-2 text-white/40 text-sm font-bold tracking-widest uppercase mb-3">
          <Handshake size={16} />
          <span>Collaboration</span>
        </div>
        <p className="text-2xl font-medium text-white/90 leading-relaxed max-w-lg mb-6">
          I prioritize client collaboration, fostering open communication
        </p>

        <motion.div
          variants={{
            initial: { x: 0 },
            hover: { x: 8 },
          }}
          transition={{ duration: 0.2 }}
          className="flex items-center gap-2 text-white font-medium"
        >
          Book a call <ArrowRight size={16} />
        </motion.div>
      </div>
    </motion.div>
  );
}
