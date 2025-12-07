"use client";

import { LayoutTemplate } from "lucide-react";

export default function InsideScoop() {
  return (
    <div className="h-full flex flex-col justify-end p-8 bg-[#0a0a0a] border border-white/10 rounded-3xl relative overflow-hidden">
      <div className="relative z-10">
        <div className="mb-6 text-white/40">
          <LayoutTemplate size={40} />
        </div>
        <span className="text-sm font-bold tracking-widest text-white/40 uppercase mb-3 block">
          The Inside Scoop
        </span>
        <h3 className="text-3xl font-medium text-white/90">
          Currently building a Saas Application
        </h3>
      </div>

      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />
    </div>
  );
}
