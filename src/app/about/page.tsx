"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function About() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-white/20">
      <Navbar />

      <section className="pt-32 pb-24 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-12">About Me</h1>
          <div className="prose prose-invert prose-lg text-white/70">
            <p className="mb-6">
              I am a passionate developer with a keen eye for design and a drive
              for creating seamless digital experiences. With a background in
              both frontend and backend technologies, I enjoy bridging the gap
              between design and engineering.
            </p>
            <p className="mb-6">
              My journey in web development started with a curiosity for how
              things work on the internet, which quickly turned into a career
              obsession. I love experimenting with new technologies and pushing
              the boundaries of what's possible on the web.
            </p>
            <p>
              When I'm not coding, you can find me exploring new places, reading
              about the latest tech trends, or contributing to open-source
              projects.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
