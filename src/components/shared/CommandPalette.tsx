"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Home,
  Briefcase,
  FileText,
  User,
  Link as LinkIcon,
  List,
  X,
  ArrowRight,
  Command,
  Linkedin,
  Github,
  Twitter,
} from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";

interface CommandPaletteProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const navItems = [
  {
    icon: Home,
    name: "Home",
    description: "Welcome to my forever work-in-progress!",
    href: "/",
  },
  {
    icon: Briefcase,
    name: "Projects",
    description: "Showcase of my projects",
    href: "/work",
  },
  {
    icon: FileText,
    name: "Blog",
    description: "Thoughts, mental models, and tutorials",
    href: "/blog",
  },
  {
    icon: User,
    name: "About",
    description: "Learn more about me!",
    href: "/about",
  },
  {
    icon: LinkIcon,
    name: "Links",
    description: "All my links are here",
    href: "/links",
  },
  {
    icon: List,
    name: "Bucket List",
    description: "Things to do at least once in my life",
    href: "/bucket-list",
  },
];

const socialItems = [
  {
    icon: Linkedin,
    name: "LinkedIn",
    description: "Connect professionally",
    href: "https://www.linkedin.com/in/aadarsh-reddy-depa-19b88722b/",
  },
  {
    icon: Github,
    name: "GitHub",
    description: "Check out my code",
    href: "https://github.com/aadarshreddydepa",
  },
  {
    icon: Twitter,
    name: "Twitter",
    description: "Follow my thoughts",
    href: "https://x.com/aadarshdepa",
  },
];

export default function CommandPalette({
  isOpen,
  setIsOpen,
}: CommandPaletteProps) {
  const [search, setSearch] = useState("");

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(!isOpen);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setIsOpen, isOpen]);

  const filteredNav = navItems.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase())
  );

  const filteredSocials = socialItems.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase())
  );

  const hasResults = filteredNav.length > 0 || filteredSocials.length > 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Palette Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[70vh]"
          >
            {/* Search Input */}
            <div className="flex items-center px-6 py-5 border-b border-white/10">
              <Search className="w-6 h-6 text-white/40 mr-4" />
              <input
                autoFocus
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-white/40 text-xl"
              />
              <span className="text-xs font-medium text-white/20 border border-white/10 px-2 py-1 rounded">
                ESC
              </span>
            </div>

            {/* Navigation Group */}
            <div className="p-3 overflow-y-auto custom-scrollbar">
              {hasResults ? (
                <>
                  {filteredNav.length > 0 && (
                    <>
                      <div className="text-sm font-medium text-white/40 px-4 py-2 mb-1">
                        Navigation
                      </div>
                      {filteredNav.map((item, index) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className="flex items-center gap-4 px-4 py-4 rounded-xl hover:bg-white/5 group transition-colors cursor-pointer"
                        >
                          <div className="p-3 rounded-lg bg-white/5 text-white/70 group-hover:text-white group-hover:bg-white/10 transition-colors border border-white/5">
                            <item.icon size={24} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-lg font-medium text-white group-hover:text-white transition-colors">
                                {item.name}
                              </span>
                            </div>
                            <div className="text-sm text-white/40 group-hover:text-white/60 transition-colors">
                              {item.description}
                            </div>
                          </div>
                          <ArrowRight
                            size={20}
                            className="text-white/20 group-hover:text-white/50 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0"
                          />
                        </Link>
                      ))}
                    </>
                  )}

                  {filteredSocials.length > 0 && (
                    <>
                      <div className="text-sm font-medium text-white/40 px-4 py-2 mb-1 mt-2">
                        Socials
                      </div>
                      {filteredSocials.map((item, index) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setIsOpen(false)}
                          className="flex items-center gap-4 px-4 py-4 rounded-xl hover:bg-white/5 group transition-colors cursor-pointer"
                        >
                          <div className="p-3 rounded-lg bg-white/5 text-white/70 group-hover:text-white group-hover:bg-white/10 transition-colors border border-white/5">
                            <item.icon size={24} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-lg font-medium text-white group-hover:text-white transition-colors">
                                {item.name}
                              </span>
                            </div>
                            <div className="text-sm text-white/40 group-hover:text-white/60 transition-colors">
                              {item.description}
                            </div>
                          </div>
                          <ArrowRight
                            size={20}
                            className="text-white/20 group-hover:text-white/50 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0"
                          />
                        </Link>
                      ))}
                    </>
                  )}
                </>
              ) : (
                <div className="px-4 py-8 text-center text-white/40 text-base">
                  No results found.
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-4 py-3 bg-white/5 border-t border-white/10 flex items-center justify-between text-xs text-white/40">
              <div className="flex gap-4">
                {socialItems.map((social) => (
                  <Link
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    className="flex items-center gap-1.5 hover:text-white transition-colors"
                  >
                    <social.icon size={14} />
                    {social.name}
                  </Link>
                ))}
              </div>
              <div className="flex gap-4">
                <span className="flex items-center gap-1">
                  <span className="bg-white/10 px-1 rounded">↑</span>{" "}
                  <span className="bg-white/10 px-1 rounded">↓</span> navigate
                </span>
                <span className="flex items-center gap-1">
                  <span className="bg-white/10 px-1 rounded">↵</span> select
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
