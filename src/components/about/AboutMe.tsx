"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

const images = [
  {
    src: "/Images/Me1.png",
    caption: "I Code",
    color: "from-blue-500 to-cyan-500",
  },
  {
    src: "/Images/travel.png", // Assuming this is for Travel
    caption: "I Travel",
    color: "from-emerald-500 to-green-500",
  },
  {
    src: "/Images/gym.jpg", // Placeholder for Lift/Other
    caption: "I Lift",
    color: "from-orange-500 to-red-500",
  },
];

export default function AboutMe() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-rotate every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const getPosition = (index: number) => {
    // 0 = Center, 1 = Right, 2 = Left (relative to activeIndex)
    if (index === activeIndex) return "center";
    if (index === (activeIndex + 1) % images.length) return "right";
    return "left";
  };

  const variants = {
    center: {
      x: "0%",
      scale: 1,
      zIndex: 20,
      opacity: 1,
      rotate: 0,
      filter: "blur(0px)",
    },
    left: {
      x: "-60%",
      scale: 0.8,
      zIndex: 10,
      opacity: 0.6,
      rotate: -10,
      filter: "blur(2px)",
    },
    right: {
      x: "60%",
      scale: 0.8,
      zIndex: 10,
      opacity: 0.6,
      rotate: 10,
      filter: "blur(2px)",
    },
  };

  return (
    <section className="relative w-full bg-black py-24 px-6 overflow-hidden min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative z-10 w-full">
        {/* Left Column: Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs font-bold tracking-[0.2em] text-white/40 uppercase mb-6 block">
            More About Me
          </span>

          <h2 className="text-5xl md:text-7xl font-serif text-white mb-8 leading-tight">
            I'm Aadarsh, a <br />
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 pr-4">
              creative engineer
            </span>
          </h2>

          <div className="space-y-6 text-white/70 text-lg leading-relaxed font-light max-w-xl">
            <p>
              I'm Aadarsh Reddy Depa, a proactive full-stack developer
              passionate about creating dynamic web experiences. From frontend
              to backend, I thrive on solving complex problems with clean,
              efficient code. My expertise spans React, Next.js, and Node.js,
              and I'm always eager to learn more.
            </p>
            <p>
              When I'm not immersed in work, I'm exploring new ideas and staying
              curious. Life's about balance, and I love embracing every part of
              it.
            </p>
            <p className="font-medium text-white">
              I believe in waking up each day eager to make a difference!
            </p>
          </div>

          <div className="flex gap-6 mt-8">
            <Link
              href="#"
              className="text-white/40 hover:text-white transition-colors"
            >
              <Linkedin size={20} />
            </Link>
            <Link
              href="#"
              className="text-white/40 hover:text-white transition-colors"
            >
              <Github size={20} />
            </Link>
            <Link
              href="#"
              className="text-white/40 hover:text-white transition-colors"
            >
              <Twitter size={20} />
            </Link>
          </div>
        </motion.div>

        {/* Right Column: Image Slider */}
        <div className="relative h-[600px] flex items-center justify-center -ml-20 md:ml-0">
          {images.map((img, index) => {
            const position = getPosition(index);
            return (
              <motion.div
                key={index}
                className="absolute w-[280px] h-[380px] md:w-[350px] md:h-[450px] cursor-pointer"
                initial={false}
                animate={position}
                variants={variants}
                transition={{
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1], // Custom bouncy ease similar to iOS
                }}
                onClick={() => setActiveIndex(index)}
              >
                {/* Image Container */}
                <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                  <img
                    src={img.src}
                    alt={img.caption}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Caption - Below Image */}
                <motion.div
                  className="absolute -bottom-16 left-0 right-0 text-center"
                  animate={{
                    opacity: position === "center" ? 1 : 0,
                    y: position === "center" ? 0 : -20,
                  }}
                >
                  <h3 className="text-3xl font-serif text-white tracking-wide">
                    {img.caption}
                  </h3>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
