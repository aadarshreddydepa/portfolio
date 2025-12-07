"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import GetInTouchModal from "@/components/shared/GetInTouchModal";

export default function IdeaToApp() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="relative w-full min-h-[80vh] bg-black flex flex-col items-center justify-center overflow-hidden py-24">
      {/* Background Abstract Liquid/Smoke Effect */}
      {/* Using a CSS gradient and blur to mimic the dark, fluid background */}
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/Images/background.png"
          alt="Background"
          fill
          className="object-cover opacity-40"
          priority
        />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-4">
        {/* Logo with Wings/Glow Effect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative mb-12"
        >
          {/* Wing-like graphics could be SVGs, here using a glow effect for simplicity as per prompt "same kind of thing" */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-blue-600/30 rounded-full blur-2xl" />
          <div className="relative w-20 h-20 md:w-24 md:h-24 bg-black/50 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center shadow-2xl">
            <Image
              src="/Logo/AR.png"
              alt="AR Logo"
              width={60}
              height={60}
              className="object-contain opacity-90"
            />
          </div>
        </motion.div>

        {/* Main Heading */}
        <div className="flex flex-col items-center overflow-hidden w-full">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-cinzel-decorative font-light text-white tracking-wide mb-2">
              FROM IDEA TO <span className="font-bold text-white">APP</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-4"
          >
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-orbitron font-light text-white tracking-wide flex items-center gap-4">
              LET'S MAKE IT{" "}
              <span className="font-bold text-white">HAPPEN!</span>
            </h2>

            {/* Spinning Badge */}
            <div className="relative w-16 h-16 md:w-24 md:h-24 ml-4 hidden md:block">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="w-full h-full rounded-full border border-blue-500/30 flex items-center justify-center bg-blue-900/20 backdrop-blur-sm"
              >
                <svg viewBox="0 0 100 100" className="w-full h-full p-2">
                  <path
                    id="curve"
                    d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                    fill="transparent"
                  />
                  <text className="text-[11px] font-bold uppercase fill-blue-400 tracking-[0.18em]">
                    <textPath href="#curve">
                      Open to Work • Open to Work •
                    </textPath>
                  </text>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full shadow-[0_0_10px_white]" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12"
        >
          <button
            onClick={() => setIsModalOpen(true)}
            className="group flex items-center gap-3 px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/10 rounded-full backdrop-blur-md transition-all duration-300"
          >
            <span className="text-white font-medium tracking-wide">
              Get In Touch
            </span>
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center group-hover:translate-x-1 transition-transform">
              <ArrowRight size={16} className="text-black" />
            </div>
          </button>
        </motion.div>

        {/* Subtext */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 space-y-4 max-w-2xl"
        >
          <h3 className="text-xl md:text-2xl font-doto text-white">
            I'm available for full-time roles & freelance projects.
          </h3>
          <p className="text-white/50 font-orbitron text-lg">
            I thrive on crafting dynamic web applications, and <br />
            delivering seamless user experiences.
          </p>
        </motion.div>
      </div>

      <GetInTouchModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
