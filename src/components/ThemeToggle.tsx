"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative flex items-center justify-center p-2 rounded-full bg-white/10 border border-white/10 backdrop-blur-md shadow-lg hover:bg-white/20 transition-all duration-300 group overflow-hidden"
      aria-label="Toggle Theme"
    >
      {/* Glossy Effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10 w-8 h-8 flex items-center justify-center">
        <motion.div
          initial={false}
          animate={{
            scale: isDark ? 1 : 0,
            opacity: isDark ? 1 : 0,
            rotate: isDark ? 0 : 90,
          }}
          transition={{ duration: 0.2 }}
          className="absolute"
        >
          <Moon size={20} className="text-blue-300 fill-blue-300/20" />
        </motion.div>

        <motion.div
          initial={false}
          animate={{
            scale: isDark ? 0 : 1,
            opacity: isDark ? 0 : 1,
            rotate: isDark ? -90 : 0,
          }}
          transition={{ duration: 0.2 }}
          className="absolute"
        >
          <Sun size={20} className="text-orange-400 fill-orange-400/20" />
        </motion.div>
      </div>
    </button>
  );
}
