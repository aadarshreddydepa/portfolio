"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Copy, Check } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Hero() {
  const [copied, setCopied] = useState(false);
  const [particles, setParticles] = useState<
    { x: number; y: number; scale: number; duration: number; delay: number }[]
  >([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 30 }).map(() => ({
        x: Math.random() * 2000 - 1000,
        y: Math.random() * 1000 - 500,
        scale: Math.random() * 0.5 + 0.5,
        duration: Math.random() * 10 + 10,
        delay: Math.random() * 10,
      }))
    );
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText("aadarshreddydepa@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="min-h-screen flex flex-col justify-center items-center px-6 md:px-12 pt-20 relative overflow-hidden text-center">
      {/* Sharp Horizon Effect - Space Sunrise */}
      <div className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-[120%] h-[400px] bg-blue-900/20 rounded-[100%] blur-[90px] pointer-events-none" />
      <div className="absolute bottom-[-25%] left-1/2 -translate-x-1/2 w-[60%] h-[300px] bg-orange-500/30 rounded-[100%] blur-[80px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-[-400px] left-1/2 -translate-x-1/2 w-[200%] h-[500px] border-t border-orange-200/40 rounded-[100%] shadow-[0_-20px_60px_rgba(255,100,0,0.3)] pointer-events-none" />

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((p, i) => (
          <motion.div
            key={i}
            initial={{
              x: p.x,
              y: p.y,
              opacity: 0,
              scale: p.scale,
            }}
            animate={{
              y: [null, p.y - 100], // Move up by 100px from initial y
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "linear",
              delay: p.delay,
            }}
            className="absolute left-1/2 top-1/2 w-1 h-1 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]"
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="max-w-5xl z-10 flex flex-col items-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-medium text-blue-400 mb-8"
        >
          <span className="px-1.5 py-0.5 rounded bg-blue-500 text-white text-[10px] font-bold">
            Upcoming
          </span>
          ChitLedger is launching soon!👀
          <ArrowRight size={12} />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-4xl md:text-6xl lg:text-7xl font-serif font-medium tracking-tight mb-8 leading-[1.1]"
        >
          I'm passionate about turing ideas <br />
          into seamless{"  "}
          <span className="italic font-light text-white/80">
            real-world applications
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex items-center gap-3 text-lg md:text-xl text-white/60 mb-12"
        >
          <span>Hello, I'm Aadarsh Reddy</span>
          <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/20">
            <Image
              src="/Images/ME.png"
              alt="Avatar"
              fill
              className="object-cover"
            />
          </div>
          <span>a Full Stack Developer</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-6"
        >
          <Link
            href="#contact"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/10 rounded-full font-medium text-white transition-all backdrop-blur-sm"
          >
            Let's Connect
            <div className="bg-white text-black rounded-full p-1 group-hover:translate-x-1 transition-transform">
              <ArrowRight size={14} />
            </div>
          </Link>

          <button
            onClick={copyEmail}
            className="inline-flex items-center gap-3 px-6 py-4 text-white/60 hover:text-white transition-colors"
          >
            {copied ? (
              <Check size={20} className="text-green-500" />
            ) : (
              <Copy size={20} />
            )}
            aadarshreddydepa@gmail.com
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
