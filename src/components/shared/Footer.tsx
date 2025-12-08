"use client";

import Image from "next/image";
import Link from "next/link";
import { Github, Linkedin, Twitter, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import IdeaToApp from "@/components/home/IdeaToApp";

export default function Footer() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const socialLinks = [
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/aadarsh-reddy-depa-19b88722b/",
      label: "LinkedIn",
    },
    {
      icon: Github,
      href: "https://github.com/aadarshreddydepa",
      label: "GitHub",
    },
    {
      icon: Twitter,
      href: "https://x.com/aadarshdepa",
      label: "Twitter",
    },
  ];

  const footerLinks = [
    {
      title: "General",
      links: [
        { name: "Home", href: "/" },
        { name: "About", href: "/about" },
        { name: "Projects", href: "/work" },
        { name: "Blog", href: "/blog" },
      ],
    },
    {
      title: "Specifics",
      links: [
        { name: "Guest Book", href: "/guestbook" },
        { name: "Bucket List", href: "/bucket-list" },
        { name: "Uses", href: "/uses" },
        { name: "Attribution", href: "/attribution" },
      ],
    },
    {
      title: "More",
      links: [
        { name: "Book a call", href: "/book-call" },
        { name: "Links", href: "/links" },
        { name: "RSS", href: "/rss" },
      ],
    },
  ];

  return (
    <>
      <IdeaToApp />
      <footer className="w-full bg-black pt-20 pb-8 px-6 md:px-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between gap-12 mb-20">
            {/* Left Side - Brand & Description */}
            <div className="flex flex-col gap-6 max-w-sm">
              <Link href="/" className="relative w-10 h-10">
                <Image
                  src="/Logo/AR.png"
                  alt="Logo"
                  fill
                  className="object-contain"
                />
              </Link>
              <p className="text-lg text-white/60 leading-relaxed">
                I'm Aadarsh - a full-stack developer, freelancer & problem
                solver. Thanks for checking out my site!
              </p>
            </div>

            {/* Right Side - Navigation Columns */}
            <div className="flex flex-wrap gap-12 md:gap-24">
              {footerLinks.map((column) => (
                <div key={column.title} className="flex flex-col gap-4">
                  <h3 className="text-sm font-bold text-white/40 tracking-widest uppercase">
                    {column.title}
                  </h3>
                  <div className="flex flex-col gap-3">
                    {column.links.map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        className="text-white/60 hover:text-white transition-colors text-base"
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 text-sm text-white/40">
            <div className="flex flex-wrap justify-center md:justify-start gap-8">
              <span>
                © {new Date().getFullYear()} Aadarsh Reddy. All rights reserved
              </span>
              <Link
                href="/privacy"
                className="hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="hover:text-white transition-colors"
              >
                Terms of Use
              </Link>
            </div>

            <div className="flex items-center gap-6">
              {/* Theme Toggle */}
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Toggle Theme"
              >
                {mounted && theme === "dark" ? (
                  <Moon size={16} />
                ) : (
                  <Sun size={16} />
                )}
              </button>

              {/* Social Icons */}
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  <social.icon size={16} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
