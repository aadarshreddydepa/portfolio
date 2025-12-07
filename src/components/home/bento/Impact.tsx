"use client";

import { ArrowRight } from "lucide-react";

export default function Impact() {
  return (
    <div className="h-full flex flex-col p-8 bg-[#0a0a0a] border border-white/10 rounded-3xl relative overflow-hidden group">
      {/* Browser Window Mockup */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90%] h-[80%] bg-[#111] border border-white/10 rounded-2xl shadow-2xl transition-transform duration-500 group-hover:-translate-y-2">
        {/* Browser Header */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/20" />
          </div>
          <div className="flex-1 flex justify-center">
            <div className="w-32 h-1.5 rounded-full bg-white/5" />
          </div>
        </div>

        {/* Browser Content */}
        <div className="p-8 flex flex-col items-center justify-center h-full relative overflow-hidden">
          {/* Grid Background */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />

          <div className="relative z-10 text-center">
            <h4 className="text-xl font-medium text-white mb-1">
              Websites that
            </h4>
            <h4 className="text-3xl font-bold text-blue-500 mb-6">Impact.</h4>

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-black text-xs font-bold">
              Start <ArrowRight size={12} />
            </div>
          </div>

          {/* Glow */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[150px] h-[100px] bg-blue-500/20 blur-[60px] rounded-full pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
