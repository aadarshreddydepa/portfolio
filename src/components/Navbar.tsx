"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  Command,
  ChevronDown,
  Link as LinkIcon,
  Book,
  Heart,
  List,
  CreditCard,
} from "lucide-react";
import CommandPalette from "./CommandPalette";

import { usePathname } from "next/navigation";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Work", href: "/work" },
  { name: "Blog", href: "/blog" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [greeting, setGreeting] = useState("");
  const [showMenu, setShowMenu] = useState(pathname !== "/");
  const timeoutRef = useRef<any>(null);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");

    if (pathname === "/") {
      const timer = setTimeout(() => {
        setShowMenu(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-40 px-6 py-6 md:px-12 pointer-events-none"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left: Logo */}
          <div className="pointer-events-auto">
            <Link href="/" className="block">
              <Image
                src="/Logo/AR.png"
                alt="Logo"
                width={40}
                height={40}
                className="w-10 h-10 object-contain"
              />
            </Link>
          </div>

          {/* Center: Navigation Pill */}
          <div className="hidden md:flex pointer-events-auto items-center justify-center p-1.5 rounded-full bg-[#111] border border-white/10 shadow-2xl relative min-w-[140px] min-h-[54px]">
            <AnimatePresence mode="wait">
              {!showMenu ? (
                <motion.span
                  key="greeting"
                  initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                  transition={{ duration: 0.5 }}
                  className="text-white/90 font-medium px-6 py-2 text-base whitespace-nowrap"
                >
                  {greeting}
                </motion.span>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center gap-1"
                >
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={`relative px-5 py-2 text-sm font-medium rounded-full ${
                        pathname === link.href
                          ? "text-white bg-white/10 border border-white/10"
                          : "text-white/60"
                      }`}
                    >
                      {link.name}
                    </Link>
                  ))}

                  {/* More Dropdown Trigger */}
                  <div
                    className="relative"
                    onMouseEnter={() => {
                      if (timeoutRef.current) clearTimeout(timeoutRef.current);
                      timeoutRef.current = setTimeout(
                        () => setIsMoreOpen(true),
                        500
                      );
                    }}
                    onMouseLeave={() => {
                      if (timeoutRef.current) clearTimeout(timeoutRef.current);
                      setIsMoreOpen(false);
                    }}
                  >
                    <button
                      className={`flex items-center gap-1 px-5 py-2 text-sm font-medium rounded-full ${
                        isMoreOpen ? "text-white" : "text-white/60"
                      }`}
                    >
                      More{" "}
                      <ChevronDown
                        size={14}
                        className={`${isMoreOpen ? "rotate-180" : ""}`}
                      />
                    </button>

                    {/* Dropdown Content */}
                    <AnimatePresence>
                      {isMoreOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[950px] p-2 rounded-3xl bg-[#0F0F0F] border border-white/10 shadow-2xl grid grid-cols-3 gap-2 z-50"
                        >
                          {/* Invisible Bridge to prevent closing when moving mouse */}
                          <div className="absolute -top-6 left-0 w-full h-6 bg-transparent" />
                          {/* Guestbook Card */}
                          <Link
                            href="#guestbook"
                            className="group relative col-span-1 h-[320px] rounded-2xl overflow-hidden bg-[#1A1A1A]"
                          >
                            <Image
                              src="/Images/GuestBook.png"
                              alt="Guestbook"
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-6 flex flex-col justify-end">
                              <span className="text-xl font-bold text-white mb-1">
                                Guestbook
                              </span>
                              <span className="text-sm text-white/60">
                                Let me know you were here
                              </span>
                            </div>
                          </Link>

                          {/* Bucket List Card */}
                          <Link
                            href="#bucket-list"
                            className="group relative col-span-1 h-[320px] rounded-2xl overflow-hidden bg-[#1A1A1A]"
                          >
                            <Image
                              src="/Images/Himalaya.png"
                              alt="Bucket List"
                              fill
                              className="object-cover group-hover:scale-105 transition-all duration-500 opacity-40 group-hover:opacity-[0.76]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-6 flex flex-col justify-end">
                              <span className="text-xl font-bold text-white mb-1">
                                Bucket List
                              </span>
                              <span className="text-sm text-white/60">
                                Things to do at least once in my life
                              </span>
                            </div>
                          </Link>

                          {/* Right Column Links */}
                          <div className="col-span-1 flex flex-col gap-2 h-full">
                            <Link
                              href="#links"
                              className="flex-1 flex items-center gap-4 p-4 rounded-2xl bg-[#1A1A1A] hover:bg-[#222] border border-white/5 transition-colors group"
                            >
                              <div className="p-3 rounded-xl bg-white/5 text-white/70 group-hover:text-white border border-white/5">
                                <LinkIcon size={20} />
                              </div>
                              <div className="flex flex-col">
                                <span className="text-base font-bold text-white">
                                  Links
                                </span>
                                <span className="text-sm text-white/40">
                                  All my links are here
                                </span>
                              </div>
                            </Link>

                            <Link
                              href="#uses"
                              className="flex-1 flex items-center gap-4 p-4 rounded-2xl bg-[#1A1A1A] hover:bg-[#222] border border-white/5 transition-colors group"
                            >
                              <div className="p-3 rounded-xl bg-white/5 text-white/70 group-hover:text-white border border-white/5">
                                <List size={20} />
                              </div>
                              <div className="flex flex-col">
                                <span className="text-base font-bold text-white">
                                  Uses
                                </span>
                                <span className="text-sm text-white/40">
                                  A peek into my digital...
                                </span>
                              </div>
                            </Link>

                            <Link
                              href="#attribution"
                              className="flex-1 flex items-center gap-4 p-4 rounded-2xl bg-[#1A1A1A] hover:bg-[#222] border border-white/5 transition-colors group"
                            >
                              <div className="p-3 rounded-xl bg-white/5 text-white/70 group-hover:text-white border border-white/5">
                                <CreditCard size={20} />
                              </div>
                              <div className="flex flex-col">
                                <span className="text-base font-bold text-white">
                                  Attribution
                                </span>
                                <span className="text-sm text-white/40">
                                  Journey to create this site
                                </span>
                              </div>
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <Link
                    href="#contact"
                    className="ml-2 px-6 py-2 text-sm font-medium bg-white/10 text-white rounded-full border border-white/10"
                  >
                    Book a Call
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right: Command Trigger */}
          <div className="pointer-events-auto flex items-center gap-4">
            <button
              onClick={() => setIsCommandOpen(true)}
              className="p-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md transition-all group"
              aria-label="Open Command Palette"
            >
              <Command
                size={22}
                className="text-white/70 group-hover:text-white"
              />
            </button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md text-white/70 hover:text-white transition-all"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-[#0a0a0a] border-b border-white/10 p-6 md:hidden flex flex-col gap-4 shadow-2xl pointer-events-auto"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-lg font-medium text-white/70 hover:text-white transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="#contact"
              className="text-lg font-medium text-white/70 hover:text-white transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Book a Call
            </Link>
          </motion.div>
        )}
      </motion.nav>

      {/* Command Palette Modal */}
      <CommandPalette isOpen={isCommandOpen} setIsOpen={setIsCommandOpen} />
    </>
  );
}
