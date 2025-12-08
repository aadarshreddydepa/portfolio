"use client";

import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import CuratedWork from "@/components/work/CuratedWork";
import IdeaToApp from "@/components/home/IdeaToApp";

export default function Work() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-pink-500/30">
      <Navbar />

      {/* Main Content: Just the Curated Work Section + Footer */}
      <div className="pt-10">
        <CuratedWork />
      </div>

      <Footer />
    </main>
  );
}
