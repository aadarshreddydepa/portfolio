"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Blog() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-white/20">
      <Navbar />

      <section className="pt-32 pb-24 px-6 md:px-12 min-h-[60vh] flex flex-col justify-center items-center text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Blog</h1>
        <p className="text-white/60 text-xl">
          Thoughts, ideas, and stories coming soon.
        </p>
      </section>

      <Footer />
    </main>
  );
}
