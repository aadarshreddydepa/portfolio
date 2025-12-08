"use client";

import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import AboutMe from "@/components/about/AboutMe";
import ExperienceTimeline from "@/components/about/Experience";
import IdeaToApp from "@/components/home/IdeaToApp";

export default function About() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-pink-500/30">
      <Navbar />

      {/* Main Content */}
      <div className="pt-20">
        <AboutMe />
        <ExperienceTimeline />
      </div>

      <Footer />
    </main>
  );
}
