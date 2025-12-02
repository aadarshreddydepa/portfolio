"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="py-12 border-t border-border bg-black relative overflow-hidden">
      {/* Marquee Effect */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden py-4 bg-accent/30 backdrop-blur-sm border-b border-border">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
          className="flex whitespace-nowrap"
        >
          {Array.from({ length: 10 }).map((_, i) => (
            <span
              key={i}
              className="text-4xl md:text-6xl font-bold text-white/10 mx-8 uppercase tracking-widest"
            >
              Open to Work • Available for Hire • Let's Build Together •
            </span>
          ))}
        </motion.div>
      </div>

      <div className="container mx-auto px-6 md:px-12 pt-24 pb-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold mb-2">Let's work together</h2>
            <p className="text-white/60">hello@portfolio.com</p>
          </div>

          <div className="flex gap-6 text-sm font-medium text-white/60">
            <a href="#" className="hover:text-white transition-colors">
              Twitter
            </a>
            <a href="#" className="hover:text-white transition-colors">
              LinkedIn
            </a>
            <a href="#" className="hover:text-white transition-colors">
              GitHub
            </a>
          </div>
        </div>

        <div className="mt-12 text-center md:text-left text-xs text-white/40">
          © {new Date().getFullYear()} Portfolio. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
