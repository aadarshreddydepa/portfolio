"use client";

import { motion } from "framer-motion";

const WORDS = [
  "ACCESSIBLE",
  "RESPONSIVE",
  "DYNAMIC",
  "SCALABLE",
  "SEARCH OPTIMIZED",
  "INTERACTIVE",
  "SECURE",
  "RELIABLE",
  "ENGAGING",
];

export default function ScrollingText() {
  return (
    <div className="relative w-full py-32 overflow-hidden bg-black z-20">
      {/* Visual Container for the bands */}
      <div className="relative w-full flex items-center justify-center">
        {/* Band 1 - Rotated Positive */}
        <div className="absolute w-[120%] bg-orange-800/90 py-3 -rotate-2 shadow-lg z-10 flex overflow-hidden">
          <ScrollingContent direction="left" />
        </div>

        {/* Band 2 - Rotated Negative */}
        <div className="absolute w-[120%] bg-orange-700 py-3 rotate-2 shadow-xl z-20 flex overflow-hidden">
          <ScrollingContent direction="left" />
        </div>
      </div>
    </div>
  );
}

const ScrollingContent = ({
  direction = "left",
}: {
  direction?: "left" | "right";
}) => {
  return (
    <div className="flex whitespace-nowrap overflow-hidden">
      <motion.div
        initial={{ x: direction === "left" ? 0 : "-50%" }}
        animate={{ x: direction === "left" ? "-50%" : 0 }}
        transition={{
          duration: 30,
          ease: "linear",
          repeat: Infinity,
        }}
        className="flex gap-8 px-4 will-change-transform transform-gpu"
      >
        {[...WORDS, ...WORDS].map((word, i) => (
          <div key={i} className="flex items-center gap-8">
            <span className="text-white/90 font-caveat font-bold tracking-widest text-lg md:text-xl">
              {word}
            </span>
            <span className="text-white/40 text-xl">✦</span>
          </div>
        ))}
      </motion.div>
      <motion.div
        initial={{ x: direction === "left" ? 0 : "-50%" }}
        animate={{ x: direction === "left" ? "-50%" : 0 }}
        transition={{
          duration: 30,
          ease: "linear",
          repeat: Infinity,
        }}
        className="flex gap-8 px-4 will-change-transform transform-gpu"
      >
        {[...WORDS, ...WORDS].map((word, i) => (
          <div key={i} className="flex items-center gap-8">
            <span className="text-white/90 font-caveat font-bold tracking-widest text-lg md:text-xl">
              {word}
            </span>
            <span className="text-white/40 text-xl">✦</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};
