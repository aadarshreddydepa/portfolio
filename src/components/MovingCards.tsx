"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const cards = [
  {
    title: "Skydiving",
    status: "Pending",
    image: "https://placehold.co/400x600/111/FFF?text=Skydiving",
  },
  {
    title: "Create Portfolio",
    status: "Completed",
    image: "https://placehold.co/400x600/222/FFF?text=Portfolio",
  },
  {
    title: "10K Marathon",
    status: "Pending",
    image: "https://placehold.co/400x600/333/FFF?text=Marathon",
  },
  {
    title: "Open Source",
    status: "Completed",
    image: "https://placehold.co/400x600/444/FFF?text=Open+Source",
  },
  {
    title: "Travel Japan",
    status: "Pending",
    image: "https://placehold.co/400x600/555/FFF?text=Japan",
  },
];

export default function MovingCards() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  return (
    <section
      ref={containerRef}
      className="py-24 overflow-hidden bg-black relative"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-10 pointer-events-none" />

      <div className="mb-12 px-6 md:px-12 text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">
          Bucket List & Goals
        </h2>
        <p className="text-white/60">
          Things I want to do at least once in my life.
        </p>
      </div>

      <motion.div style={{ x }} className="flex gap-8 px-12 w-max">
        {[...cards, ...cards].map((card, index) => (
          <div
            key={index}
            className="relative w-[300px] h-[400px] rounded-2xl overflow-hidden group border border-white/10"
          >
            <Image
              src={card.image}
              alt={card.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-6 flex flex-col justify-end">
              <div className="flex justify-between items-center mb-2">
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    card.status === "Completed"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-yellow-500/20 text-yellow-400"
                  }`}
                >
                  {card.status}
                </span>
              </div>
              <h3 className="text-2xl font-bold">{card.title}</h3>
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
