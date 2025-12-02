"use client";

import { Copy, Check } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const email = "aadarshreddydepa@gmail.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="h-full flex flex-col justify-center items-center p-8 bg-[#0a0a0a] border border-white/10 rounded-3xl relative overflow-hidden text-center">
      <div className="relative z-10">
        <h3 className="text-4xl md:text-5xl font-serif text-white mb-3">
          Let's work together
        </h3>
        <h3 className="text-4xl md:text-5xl font-serif text-white mb-10">
          on your next project
        </h3>

        <button
          onClick={handleCopy}
          className="group flex items-center gap-4 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition-all mx-auto"
        >
          <span className="text-xl text-white/60 group-hover:text-white transition-colors">
            {email}
          </span>
          <div className="p-2 rounded-xl bg-white/5 text-white/40 group-hover:text-white transition-colors">
            {copied ? <Check size={18} /> : <Copy size={18} />}
          </div>
        </button>
      </div>

      {/* Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-white/5 blur-[80px] rounded-full pointer-events-none" />
    </div>
  );
}
