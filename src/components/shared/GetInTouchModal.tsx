"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Calendar,
  Mail,
  MessageSquare,
  Twitter,
  Github,
  Linkedin,
} from "lucide-react";
import Link from "next/link";

interface GetInTouchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GetInTouchModal({
  isOpen,
  onClose,
}: GetInTouchModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center sm:px-4 pb-4 md:pb-0">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg bg-[#0e0e0e] border border-white/10 rounded-2xl md:rounded-3xl p-6 md:p-8 overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-white/40 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>

            {/* Handle Bar (mobile only visual) */}
            <div className="w-12 h-1 bg-white/10 rounded-full mx-auto mb-6 md:hidden" />

            <h2 className="text-3xl font-serif text-white mb-8">
              Get in touch
            </h2>

            <div className="grid grid-cols-2 gap-4 mb-4">
              {/* Book a Call */}
              <Link
                href="/book-call"
                className="flex flex-col p-4 bg-[#1a1a1a] hover:bg-[#222] border border-white/5 hover:border-white/10 rounded-2xl transition-all group"
              >
                <div className="w-10 h-10 rounded-full bg-[#2a2a2a] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <span className="text-white font-medium mb-1">Book a Call</span>
                <span className="text-xs text-white/40">
                  Schedule a 30-min chat
                </span>
              </Link>

              {/* Email Me */}
              <Link
                href="mailto:aadarshreddydepa@gmail.com"
                className="flex flex-col p-4 bg-[#1a1a1a] hover:bg-[#222] border border-white/5 hover:border-white/10 rounded-2xl transition-all group"
              >
                <div className="w-10 h-10 rounded-full bg-[#2a2a2a] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <span className="text-white font-medium mb-1">Email Me</span>
                <span className="text-xs text-white/40">
                  aadarshreddydepa@gmail.com
                </span>
              </Link>
            </div>

            {/* Message Button */}
            <button className="w-full flex items-center justify-between p-4 bg-[#1a1a1a] hover:bg-[#222] border border-white/5 hover:border-white/10 rounded-2xl transition-all group mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#2a2a2a] flex items-center justify-center">
                  <MessageSquare className="w-4 h-4 text-white" />
                </div>
                <span className="text-white font-medium">
                  Or write me a message here
                </span>
              </div>
              <span className="text-xs text-white/40 group-hover:text-white transition-colors">
                Tap to open
              </span>
            </button>

            {/* Socials */}
            <div className="border-t border-white/5 pt-6">
              <p className="text-[10px] items-center text-center font-bold tracking-widest text-white/40 uppercase mb-4">
                Connect on Socials
              </p>
              <div className="flex justify-center gap-6">
                <Link
                  href="#"
                  className="text-white/40 hover:text-white transition-colors"
                >
                  <Linkedin size={20} />
                </Link>
                <Link
                  href="#"
                  className="text-white/40 hover:text-white transition-colors"
                >
                  <Github size={20} />
                </Link>
                <Link
                  href="#"
                  className="text-white/40 hover:text-white transition-colors"
                >
                  <Twitter size={20} />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
