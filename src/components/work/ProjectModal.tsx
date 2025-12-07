"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Github, ExternalLink, Calendar, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

interface Project {
  title: string;
  description: string;
  tags: string[];
  image: string;
  link: string;
  github?: string;
  longDescription?: string;
  date?: string;
  role?: string;
}

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({
  project,
  isOpen,
  onClose,
}: ProjectModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-4xl max-h-[90vh] bg-[#0F0F0F] border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white/70 hover:text-white hover:bg-black/70 transition-all"
            >
              <X size={20} />
            </button>

            {/* Image Section */}
            <div className="w-full md:w-1/2 h-64 md:h-auto relative bg-[#1a1a1a]">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-transparent to-transparent md:bg-gradient-to-r" />
            </div>

            {/* Content Section */}
            <div className="w-full md:w-1/2 p-6 md:p-10 overflow-y-auto custom-scrollbar">
              <div className="flex flex-col h-full">
                <div className="mb-6">
                  <h2 className="text-3xl md:text-4xl font-bold mb-2">
                    {project.title}
                  </h2>
                  <div className="flex flex-wrap gap-3 text-sm text-white/50 mb-4">
                    {project.date && (
                      <span className="flex items-center gap-1">
                        <Calendar size={14} /> {project.date}
                      </span>
                    )}
                    {project.role && (
                      <span className="flex items-center gap-1">
                        <Tag size={14} /> {project.role}
                      </span>
                    )}
                  </div>
                </div>

                <div className="prose prose-invert max-w-none mb-8">
                  <p className="text-white/70 leading-relaxed">
                    {project.longDescription || project.description}
                  </p>
                </div>

                <div className="mt-auto">
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs font-medium rounded-full bg-white/5 border border-white/10 text-white/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    <Link
                      href={project.link}
                      target="_blank"
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-white text-black rounded-full font-medium hover:bg-white/90 transition-colors"
                    >
                      <ExternalLink size={18} />
                      Live Demo
                    </Link>
                    {project.github && (
                      <Link
                        href={project.github}
                        target="_blank"
                        className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-full font-medium hover:bg-white/10 transition-colors"
                      >
                        <Github size={18} />
                        Source Code
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
