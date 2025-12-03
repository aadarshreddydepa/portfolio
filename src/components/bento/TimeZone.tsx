"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const LOCATIONS = [
  {
    id: "uk",
    name: "UK",
    label: "United Kingdom",
    flag: "🇬🇧",
    image: "/Images/Continents/uk.png",
    description: "Available for GMT time zone sync.",
  },
  {
    id: "india",
    name: "India",
    label: "India",
    flag: "🇮🇳",
    image: "/Images/Continents/india.png",
    description: "Flexible with IST working hours.",
  },
  {
    id: "usa",
    name: "USA",
    label: "United States",
    flag: "🇺🇸",
    image: "/Images/Continents/usa.png",
    description: "Open to EST/PST overlapping.",
  },
];

export default function TimeZone() {
  const [activeLocation, setActiveLocation] = useState(LOCATIONS[1]); // Default India

  return (
    <div className="h-full flex flex-col p-8 bg-white dark:bg-[#0a0a0a] border border-black/5 dark:border-white/10 rounded-3xl relative overflow-hidden transition-colors duration-300">
      {/* Header Section */}
      <div className="relative z-20 mb-4 text-center">
        <h3 className="text-3xl font-serif text-black/90 dark:text-white/90 mb-2 transition-colors">
          I'm very flexible with time
        </h3>
        <h3 className="text-3xl font-serif text-orange-500 dark:text-orange-400 italic mb-8 transition-colors">
          zone communications
        </h3>

        {/* Location Toggles */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {LOCATIONS.map((loc) => (
            <button
              key={loc.id}
              onClick={() => setActiveLocation(loc)}
              className={`
                  relative flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300
                  ${
                    activeLocation.id === loc.id
                      ? "bg-orange-500/10 border-orange-500/50 shadow-[0_0_20px_rgba(249,115,22,0.2)]"
                      : "bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/10"
                  }
                `}
            >
              <span className="text-base">{loc.flag}</span>
              <span
                className={`text-sm font-medium tracking-wide ${
                  activeLocation.id === loc.id
                    ? "text-orange-600 dark:text-orange-100"
                    : "text-black/60 dark:text-white/40"
                }`}
              >
                {loc.name}
              </span>

              {/* Active Indicator Dot */}
              {activeLocation.id === loc.id && (
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 3D Map Container (Images) */}
      <div className="absolute inset-0 top-[100px] w-full h-full flex items-center justify-center pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeLocation.id}
            initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            exit={{ opacity: 0, scale: 0.8, rotateY: 90 }}
            transition={{ duration: 0.6, ease: "backOut" }}
            className="relative w-[600px] h-[600px] md:w-[700px] md:h-[700px]"
          >
            <Image
              src={activeLocation.image}
              alt={activeLocation.label}
              fill
              className="object-contain drop-shadow-2xl"
              priority
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Floating Info (Bottom Left) */}
      <div className="absolute bottom-8 left-8 z-20">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-orange-500/20 text-orange-500 dark:text-orange-400">
            <MapPin size={20} />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-orange-500 dark:text-orange-400 tracking-widest uppercase">
              Remote
            </span>
            <span className="text-xl font-bold text-black dark:text-white transition-colors">
              {activeLocation.label}
            </span>
          </div>
        </div>
      </div>

      {/* Globe Overlay Effect - Stronger fade to blend image edges */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/0 to-white dark:from-black/0 dark:via-black/0 dark:to-[#0a0a0a] pointer-events-none z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-white/0 via-white/0 to-white dark:from-black/0 dark:via-black/0 dark:to-[#0a0a0a] pointer-events-none z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/0 to-white dark:from-black/0 dark:via-black/0 dark:to-[#0a0a0a] pointer-events-none z-10" />
      <div className="absolute inset-0 bg-gradient-to-l from-white/0 via-white/0 to-white dark:from-black/0 dark:via-black/0 dark:to-[#0a0a0a] pointer-events-none z-10" />
    </div>
  );
}
