"use client";

import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  Globe,
  Calendar,
  BookOpen,
  Send,
  MapPin,
  ExternalLink,
} from "lucide-react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import Image from "next/image";
import Link from "next/link";

// --- Components ---

const ProfileCard = () => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5 }}
    className="h-full p-6 md:p-8 rounded-3xl bg-[#0a0a0a] border border-white/10 flex flex-col items-center text-center relative overflow-hidden"
  >
    {/* Background Glow */}
    <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

    {/* Profile Image */}
    <div className="relative mb-6">
      <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-br from-pink-500 to-purple-600">
        <div className="w-full h-full rounded-full overflow-hidden bg-black relative">
          <Image
            src="/Images/Me1.png"
            alt="Aadarsh Reddy"
            fill
            className="object-cover"
          />
        </div>
      </div>
      <div className="absolute bottom-1 right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-[#0a0a0a] shadow-[0_0_10px_rgba(34,197,94,0.6)]" />
    </div>

    {/* Info */}
    <h2 className="text-2xl font-serif font-bold text-white mb-2">
      Aadarsh Reddy
    </h2>

    <div className="flex gap-2 mb-8">
      <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase tracking-wider text-white/60 font-medium">
        Developer
      </span>
      <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase tracking-wider text-white/60 font-medium">
        Freelancer
      </span>
    </div>

    <div className="w-full space-y-4 mb-8">
      <div className="flex items-center gap-3 text-white/40 text-sm">
        <MapPin size={16} />
        <span>India</span>
      </div>
      <div className="flex items-center gap-3 text-white/40 text-sm">
        <Mail size={16} />
        <a
          href="mailto:aadarshreddydepa@gmail.com"
          className="hover:text-white transition-colors"
        >
          aadarshreddydepa@gmail.com
        </a>
      </div>
    </div>

    {/* Actions */}
    <div className="w-full mt-auto space-y-3">
      <Link
        href="/book-call"
        className="w-full py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 group"
      >
        <Calendar size={18} />
        Book a Call
        <ExternalLink
          size={14}
          className="opacity-40 group-hover:translate-x-1 transition-transform"
        />
      </Link>
      <div className="grid grid-cols-2 gap-3">
        <Link
          href="/"
          className="py-3 bg-white/5 text-white font-medium rounded-xl hover:bg-white/10 border border-white/10 transition-colors flex items-center justify-center gap-2 text-sm"
        >
          <Globe size={16} />
          Website
        </Link>
        <a
          href="mailto:aadarshreddydepa@gmail.com"
          className="py-3 bg-white/5 text-white font-medium rounded-xl hover:bg-white/10 border border-white/10 transition-colors flex items-center justify-center gap-2 text-sm"
        >
          <Send size={16} />
          Email
        </a>
      </div>
    </div>
  </motion.div>
);

const LinkCard = ({
  title,
  handle,
  href,
  icon: Icon,
  delay = 0,
}: {
  title: string;
  handle: string;
  href: string;
  icon: any;
  delay?: number;
}) => (
  <Link href={href} target="_blank" rel="noopener noreferrer">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="group relative p-4 flex items-center gap-5 bg-[#0F0F0F] border border-white/5 rounded-2xl hover:bg-[#1A1A1A] hover:border-white/10 transition-all cursor-pointer"
    >
      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-white/70 group-hover:text-white group-hover:scale-110 transition-all border border-white/5">
        <Icon size={24} />
      </div>
      <div className="flex flex-col">
        <span className="text-base font-bold text-white/90 group-hover:text-white transition-colors">
          {title}
        </span>
        <span className="text-sm text-white/40 group-hover:text-white/60 transition-colors">
          {handle}
        </span>
      </div>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-white/30">
        <ExternalLink size={16} />
      </div>
    </motion.div>
  </Link>
);

export default function LinksPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-pink-500/30">
      <Navbar />

      <section className="pt-32 pb-24 px-6 md:px-12 max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="relative text-center mb-20">
          <span className="text-xs font-bold tracking-[0.2em] text-white/40 uppercase mb-4 block">
            Network
          </span>
          <h1 className="text-5xl md:text-7xl font-serif text-white">
            Connect With{" "}
            <span className="italic bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent px-2">
              Me
            </span>
          </h1>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Profile Sidebar */}
          <div className="lg:col-span-4 h-full min-h-[500px]">
            <ProfileCard />
          </div>

          {/* Right Links Section */}
          <div className="lg:col-span-8 flex flex-col gap-10 py-4">
            {/* Code & Craft Section */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <h3 className="text-xs font-bold tracking-[0.2em] text-white/30 uppercase">
                  Code & Craft
                </h3>
                <div className="h-[1px] flex-1 bg-white/5" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <LinkCard
                  title="GitHub"
                  handle="@aadarshreddydepa"
                  href="https://github.com/aadarshreddydepa"
                  icon={Github}
                  delay={0.1}
                />
                <LinkCard
                  title="Guestbook"
                  handle="Leave a mark"
                  href="/guestbook"
                  icon={BookOpen}
                  delay={0.2}
                />
              </div>
            </div>

            {/* Connect Section */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <h3 className="text-xs font-bold tracking-[0.2em] text-white/30 uppercase">
                  Connect
                </h3>
                <div className="h-[1px] flex-1 bg-white/5" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <LinkCard
                  title="LinkedIn"
                  handle="in/aadarsh-reddy-depa"
                  href="https://www.linkedin.com/in/aadarsh-reddy-depa-19b88722b/"
                  icon={Linkedin}
                  delay={0.3}
                />
                <LinkCard
                  title="Twitter / X"
                  handle="@aadarshdepa"
                  href="https://x.com/aadarshdepa"
                  icon={Twitter}
                  delay={0.4}
                />
                {/* Placeholders for future links */}
                {/* <LinkCard 
                                title="Telegram" 
                                handle="@username" 
                                href="#" 
                                icon={Send}
                                delay={0.5}
                            /> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
