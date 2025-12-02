"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { MouseEvent } from "react";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  image: string;
  link: string;
  github?: string;
  index: number;
  onClick: () => void;
}

export default function ProjectCard({
  title,
  description,
  tags,
  image,
  link,
  github,
  index,
  onClick,
}: ProjectCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

  function onMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    x.set(clientX - left - width / 2);
    y.set(clientY - top - height / 2);
  }

  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const rotateX = useTransform(mouseY, [-300, 300], [10, -10]);
  const rotateY = useTransform(mouseX, [-300, 300], [-10, 10]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{
        perspective: 1000,
      }}
      className="h-full"
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
        className="group relative h-full rounded-3xl bg-[#0F0F0F] border border-white/10 overflow-hidden hover:border-white/20 transition-colors cursor-pointer"
      >
        {/* Image Container */}
        <div className="aspect-[4/3] w-full overflow-hidden bg-black/50 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-transparent to-transparent z-10 opacity-60" />
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />

          {/* Overlay Icon */}
          <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
            <div className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white">
              <ArrowUpRight size={20} />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 relative z-20 flex flex-col h-[calc(100%-aspect-[4/3])]">
          <div className="mb-4">
            <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-400 transition-colors">
              {title}
            </h3>
            <p className="text-white/60 line-clamp-2 text-sm leading-relaxed">
              {description}
            </p>
          </div>

          <div className="mt-auto flex flex-wrap gap-2">
            {tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-medium rounded-full bg-white/5 border border-white/10 text-white/50"
              >
                {tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span className="px-3 py-1 text-xs font-medium rounded-full bg-white/5 border border-white/10 text-white/50">
                +{tags.length - 3}
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
