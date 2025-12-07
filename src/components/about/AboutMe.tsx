"use client";

import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AboutMe() {
  return (
    <section className="relative w-full bg-black py-24 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative z-10">
        {/* Left Column: Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs font-bold tracking-[0.2em] text-white/40 uppercase mb-6 block">
            Know About Me
          </span>

          <h2 className="text-5xl md:text-6xl font-instrument text-white mb-8 leading-tight">
            Full-Stack Developer and <br />a little bit of{" "}
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 pr-2">
              everything
            </span>
          </h2>

          <div className="space-y-6 text-white/70 text-lg leading-relaxed font-light">
            <p>
              I'm Aadarsh Reddy Depa, a proactive full-stack developer
              passionate about creating dynamic web experiences. From frontend
              to backend, I thrive on solving complex problems with clean,
              efficient code. My expertise spans React, Next.js, and Node.js,
              and I'm always eager to learn more.
            </p>
            <p>
              When I'm not immersed in work, I'm exploring new ideas and staying
              curious. Life's about balance, and I love embracing every part of
              it.
            </p>
            <p className="font-medium text-white">
              I believe in waking up each day eager to make a difference!
            </p>
          </div>

          {/* Social Links */}
          <div className="flex gap-6 mt-8 mb-10">
            <Link
              href="#"
              className="text-white/60 hover:text-white transition-colors"
            >
              <Linkedin size={24} />
            </Link>
            <Link
              href="#"
              className="text-white/60 hover:text-white transition-colors"
            >
              <Github size={24} />
            </Link>
            <Link
              href="#"
              className="text-white/60 hover:text-white transition-colors"
            >
              <Twitter size={24} />
            </Link>
          </div>

          {/* CTA Button */}
          <Link
            href="/work"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all group"
          >
            <span className="text-sm font-medium text-white">
              Work Experience
            </span>
            <ArrowRight
              size={16}
              className="text-white group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </motion.div>

        {/* Right Column: Image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative flex justify-center"
        >
          {/* Squircle Background/Card */}
          <div className="relative w-[350px] h-[400px] md:w-[400px] md:h-[450px] group cursor-pointer">
            {/* Blue Aura/Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-900 rounded-[3rem] rotate-3 opacity-80 blur-sm transition-all duration-500 group-hover:rotate-6 group-hover:opacity-100" />

            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-[3rem] shadow-2xl overflow-hidden relative">
              {/* "AD" Text - Visible initially, fades out on hover */}
              <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-500 group-hover:opacity-0">
                <span className="text-white/30 text-6xl font-serif font-bold tracking-tighter">
                  AD
                </span>
              </div>

              {/* Image - Hidden initially, fades in on hover */}
              <div className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out z-10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/Images/Me1.png"
                  alt="Aadarsh Reddy Depa"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
