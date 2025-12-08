"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import Image from "next/image";

// --- Types ---
interface BucketItem {
  id: string;
  title: string;
  description: string;
  date: string;
  completed: boolean;
}

interface Section {
  id: string;
  number: string;
  title: string;
  description: string;
  items: BucketItem[];
}

// --- Data ---
const bucketData: Section[] = [
  {
    id: "milestones",
    number: "01",
    title: "Milestones",
    description:
      "Key professional and personal achievements that mark significant progress in my journey.",
    items: [
      {
        id: "m1",
        title: "Get 100+ followers on Github",
        description:
          "Reached this milestone by consistently contributing to open source and sharing useful repositories.",
        date: "N/A",
        completed: false,
      },
      {
        id: "m2",
        title: "Get 5,000+ organic LinkedIn followers",
        description:
          "Built a community around React, Next.js, and system design by sharing daily technical insights.",
        date: "N/A",
        completed: false,
      },
      {
        id: "m3",
        title: "Get a Remote Job",
        description:
          "Transitioned to a full-time remote role at a forward-thinking tech company, enabling a location-independent lifestyle.",
        date: "N/A",
        completed: false,
      },
      {
        id: "m4",
        title: "First OpenSource contribution",
        description:
          "Merged a PR into a popular library, fixing a critical accessibility bug.",
        date: "N/A",
        completed: false,
      },
      {
        id: "m5",
        title: "Remote working with client from abroad",
        description:
          "Secured my first international contract via cold outreach on LinkedIn. Delivered a full-stack SaaS MVP.",
        date: "N/A",
        completed: false,
      },
      {
        id: "m6",
        title: "Create portfolio website ↗",
        description:
          "Launched v2.0 of this digital garden. Focused on performance, micro-interactions, and a clean bento-grid aesthetic.",
        date: "Dec 2025",
        completed: true,
      },
      {
        id: "m7",
        title: "Simple offline notes app",
        description:
          "My 'Hello World' to React. Built a local-first notes app to understand state management and hooks.",
        date: "Nov 2024",
        completed: true,
      },
    ],
  },
  {
    id: "the-list",
    number: "02",
    title: "The List",
    description:
      "Goals, dreams, and technical ambitions I'm actively working towards.",
    items: [
      {
        id: "l1",
        title: "Skydiving",
        description:
          "To experience freefall and conquer the fear of heights from 13,000 feet.",
        date: "Planned",
        completed: false,
      },
      {
        id: "l2",
        title: "Do 10K marathon",
        description:
          "Training to build endurance and mental toughness. Target time: Sub 60 mins.",
        date: "In Progress",
        completed: false,
      },
      {
        id: "l3",
        title: "Solo travel to another country",
        description:
          "To immerse myself in a completely different culture without a safety net.",
        date: "Dreaming",
        completed: false,
      },
      {
        id: "l4",
        title: "Write a book about programming",
        description:
          "Compile my learnings into a practical handbook for junior developers entering the industry.",
        date: "Idea",
        completed: false,
      },
      {
        id: "l5",
        title: "Write 10 technical articles",
        description:
          "Publish deep-dives on advanced frontend patterns on a personal blog or Medium.",
        date: "Ongoing",
        completed: false,
      },
      {
        id: "l6",
        title: "Get a muscular body",
        description:
          "Commit to a consistent strength training routine. Health is wealth.",
        date: "Ongoing",
        completed: true,
      },
      {
        id: "l7",
        title: "Featured once in media",
        description:
          "Share my journey or a project on a recognized tech podcast or publication.",
        date: "Goal",
        completed: false,
      },
      {
        id: "l8",
        title: "3 months Eurotrip!",
        description:
          "Backpack across Europe for a summer, working from cafes in Prague, Berlin, and Lisbon.",
        date: "Goal",
        completed: false,
      },
      {
        id: "l9",
        title: "Speak at an international conference",
        description:
          "Give a technical talk on stage at a React or Next.js conference.",
        date: "Goal",
        completed: false,
      },
      {
        id: "l10",
        title: "Travel India by Bike/Car",
        description:
          "Complete travelling entrie India and meeting new cultures and traditions.",
        date: "Goal",
        completed: false,
      },
    ],
  },
];

// --- Components ---

const Checkbox = ({ completed }: { completed: boolean }) => (
  <div
    className={`w-6 h-6 rounded-md flex items-center justify-center border transition-all duration-300 ${
      completed
        ? "bg-white border-white text-black"
        : "bg-transparent border-white/20 border-dashed"
    }`}
  >
    {completed && <Check size={14} strokeWidth={4} />}
  </div>
);

const BucketItemCard = ({ item }: { item: BucketItem }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5 }}
    className="group relative flex gap-6 p-6 border-b border-white/5 hover:bg-white/5 transition-colors"
  >
    {/* Animated Status Line (Left) */}
    <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-white/10 to-transparent group-hover:via-pink-500/50 transition-all duration-500" />

    {/* Checkbox Column */}
    <div className="pt-1 shrink-0">
      <Checkbox completed={item.completed} />
    </div>

    {/* Content Column */}
    <div className="flex-1 space-y-2">
      <div className="flex items-start justify-between gap-4">
        <h3
          className={`text-xl font-medium transition-colors ${
            item.completed
              ? "text-white"
              : "text-white/60 group-hover:text-white/90"
          }`}
        >
          {item.title}
        </h3>
        <span className="shrink-0 text-[10px] font-mono uppercase tracking-wider px-2 py-1 rounded bg-white/5 text-white/40 border border-white/5">
          {item.date}
        </span>
      </div>
      <p className="text-sm text-white/40 font-light leading-relaxed max-w-2xl">
        {item.description}
      </p>
    </div>
  </motion.div>
);

const SectionBlock = ({ section }: { section: Section }) => (
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-32 relative">
    {/* Left Sidebar (Sticky) */}
    <div className="lg:col-span-4 lg:sticky lg:top-32 self-start">
      <span className="text-xs font-bold tracking-[0.2em] text-white/40 uppercase mb-4 block">
        {section.number}
      </span>
      <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">
        {section.title}
      </h2>
      <p className="text-white/50 leading-relaxed font-light">
        {section.description}
      </p>
    </div>

    {/* Right List */}
    <div className="lg:col-span-8 border-l border-white/5 pl-0 md:pl-0">
      <div className="flex flex-col">
        {section.items.map((item) => (
          <BucketItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  </div>
);

export default function BucketListPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-pink-500/30">
      <Navbar />

      <section className="pt-32 pb-24 px-6 md:px-12 max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="relative text-center mb-32 py-12 flex flex-col items-center justify-center">
          <span className="text-xs font-bold tracking-[0.2em] text-white/40 uppercase mb-4 block">
            Lifetime
          </span>
          <h1 className="text-5xl md:text-7xl font-serif text-white">
            The Bucket{" "}
            <span className="italic bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent px-2">
              Roadmap
            </span>
          </h1>
        </div>

        {/* Sections */}
        {bucketData.map((section) => (
          <SectionBlock key={section.id} section={section} />
        ))}
      </section>

      <Footer />
    </main>
  );
}
