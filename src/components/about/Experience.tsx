"use client";

import { useScroll, motion, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { MapPin, Briefcase } from "lucide-react";

const experiences = [
  {
    startDate: "JAN 2025 - PRESENT",
    company: "Mphasis",
    role: "Software Engineering Intern",
    location: "Bangalore, India",
    type: "On-site",
    description: [
      "Joining the engineering team to contribute to scalable enterprise applications, focusing on backend optimization and seamless API integrations.",
      "Working closely with senior engineers and product managers in an Agile environment to translate complex requirements into robust, maintainable code.",
      "Gaining hands-on experience with cloud infrastructure and microservices architecture, ensuring high availability and performance for mission-critical systems.",
    ],
    tech: ["Java", "Spring Boot", "React", "AWS", "Microservices", "Docker"],
  },
  {
    startDate: "2024 - PRESENT",
    company: "GitHub",
    role: "Open Source Contributor",
    location: "Remote",
    type: "Personal Growth",
    description: [
      "Actively contributing to diverse open-source repositories, ranging from developer tools to UI libraries, improving code quality and documentation.",
      "Building and deploying a new project every day to explore emerging technologies like Next.js 14, Server Actions, and AI integrations.",
      "Collaborating with a global community of developers, reviewing pull requests, and resolving issues to foster a collaborative ecosystem.",
    ],
    tech: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Prisma",
      "PostgreSQL",
      "Vercel",
    ],
  },
  {
    startDate: "2023 - PRESENT",
    company: "LeetCode",
    role: "Competitive Programmer",
    location: "Remote",
    type: "Self-paced",
    description: [
      "Solved over 200+ algorithmic problems across varying difficulty levels, mastering data structures like Graphs, Trees, and Dynamic Programming.",
      "Consistently participating in weekly contests to sharpen problem-solving speed and accuracy under pressure, maintaining a rank in the top 5%.",
      "Optimizing time and space complexity of solutions, developing a deep understanding of efficient algorithm design suitable for high-performance computing.",
    ],
    tech: ["C++", "Python", "Algorithms", "Data Structures", "System Design"],
  },
];

export default function ExperienceTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end end"],
  });

  const scrollY = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
    mass: 0.5,
    restDelta: 0.001,
  });

  return (
    <section
      className="bg-black text-white py-24 relative overflow-hidden"
      ref={containerRef}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="mb-24 text-center">
          <span className="text-xs font-bold tracking-[0.2em] text-white/40 uppercase mb-4 block">
            The Experience
          </span>
          <h2 className="text-5xl md:text-6xl font-serif text-white">
            Experience That <br />
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Brings Ideas to Life
            </span>
          </h2>
        </div>

        <div className="relative">
          {/* Main Vertical Line Container */}
          <div className="absolute left-[20px] md:left-1/3 top-0 bottom-0 w-[3px] bg-white/10 h-full transform -translate-x-1/2">
            {/* The Animated Gradient Line */}
            <motion.div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 origin-top"
              style={{ height: useTransform(scrollY, [0, 1], ["0%", "100%"]) }}
            >
              {/* Glowing Avatar/Head at the tip of the line */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-8 h-8 rounded-full border border-blue-500/50 bg-black overflow-hidden shadow-[0_0_20px_rgba(59,130,246,0.6)] flex items-center justify-center z-20">
                <Image
                  src="/Logo/AR.png"
                  alt="Head"
                  width={32}
                  height={32}
                  className="object-cover w-full h-full p-0.5"
                />
              </div>
            </motion.div>
          </div>

          <div className="space-y-24">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="relative grid grid-cols-1 md:grid-cols-[1fr_auto_2fr] gap-x-16 group"
              >
                {/* Left Column: Metadata (Desktop) */}
                <div className="hidden md:flex flex-col items-end text-right py-2 pr-8 md:pr-0">
                  <span className="text-xs font-bold text-white/40 tracking-widest uppercase mb-2">
                    {exp.startDate}
                  </span>
                  <h3 className="text-4xl font-serif font-medium text-white mb-3">
                    {exp.company}
                  </h3>
                  <div className="flex flex-col gap-1 text-sm text-white/50 items-end">
                    <div className="flex items-center gap-2">
                      <span>{exp.location}</span>
                      <MapPin size={14} />
                    </div>
                    <div className="flex items-center gap-2">
                      <span>{exp.type}</span>
                      <Briefcase size={14} />
                    </div>
                  </div>
                </div>

                {/* CenterColumn: Dots/Nodes */}
                <div className="hidden md:flex justify-center relative">
                  {/* Static Node on the background line */}
                  {/* <div className="sticky top-1/2 w-3 h-3 rounded-full bg-[#111] border border-white/20 z-10 mt-3" /> */}

                  {/* Extra 'Bubbles' (Fixed: increased gap so they don't overlap with text) */}
                  <div className="absolute left-full top-0 ml-8 flex flex-col gap-12 pt-4">
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 0.2, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 }}
                      className="w-2 h-2 rounded-full bg-white/20"
                    />
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 0.1, scale: 0.8 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 }}
                      className="w-1.5 h-1.5 rounded-full bg-white/20 ml-6"
                    />
                  </div>
                </div>

                {/* Right Column: Content */}
                <div className="pl-12 md:pl-0 py-2 max-w-2xl">
                  {/* Mobile Only Header */}
                  <div className="md:hidden mb-6 relative">
                    {/* Mobile line dot */}
                    <div className="absolute -left-[34px] top-1.5 w-3 h-3 rounded-full bg-[#111] border border-white/20 z-10" />

                    <span className="text-xs font-bold text-white/40 tracking-widest uppercase mb-1 block">
                      {exp.startDate}
                    </span>
                    <h3 className="text-3xl font-serif text-white mb-2">
                      {exp.company}
                    </h3>
                    <div className="flex items-center gap-4 text-xs text-white/50 mb-4">
                      <span className="flex items-center gap-1">
                        <MapPin size={12} /> {exp.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Briefcase size={12} /> {exp.type}
                      </span>
                    </div>
                  </div>

                  {/* Role Title */}
                  <h4 className="text-3xl font-serif text-white/90 mb-8">
                    {exp.role}
                  </h4>

                  {/* Description - CLEANER, no bullets, wider spacing */}
                  <div className="space-y-8 text-white/60 leading-relaxed mb-10 font-light text-[17px]">
                    {exp.description.map((item, i) => (
                      <p key={i}>{item}</p>
                    ))}
                  </div>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-3">
                    {exp.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-4 py-2 text-xs font-medium text-white/40 bg-white/5 border border-white/10 rounded-full hover:text-white hover:border-white/30 transition-all hover:bg-white/10 cursor-default tracking-wide uppercase"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
