"use client";

import { useState, useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star, Github, Globe } from "lucide-react";

// --- Types ---
interface TechBadge {
  label: string;
  icon?: any;
}

interface Project {
  id: string;
  title: string;
  label: string;
  description: string;
  features: string[];
  techStack: TechBadge[];
  image: string;
  images?: string[]; // Optional array for slideshows
  link: string;
  github?: string;
  color: string; // For the card background/glow
}

// --- Data ---
const projects: Project[] = [
  {
    id: "video-summarization",
    title: "Dynamic Video Summarization",
    label: "AI / ML Research",
    description:
      "Developed an AI-driven video summarization model leveraging Transformer architectures to generate concise video highlights dynamically. Integrated frame-level feature extraction with deep learning models and attention mechanisms.",
    features: [
      "Transformer architectures for video highlights",
      "Frame-level feature extraction with Deep Learning",
      "Applied attention mechanisms for context",
      "Streamlined visualization interface",
    ],
    techStack: [
      { label: "Python" },
      { label: "PyTorch" },
      { label: "Transformers" },
      { label: "OpenCV" },
      { label: "Scikit-learn" },
    ],
    image: "/Images/VideoSummarizer/dashboard.png", // Placeholder - User can update
    link: "https://github.com/aadarshreddydepa",
    github: "https://github.com/aadarshreddydepa",
    color: "from-pink-500 to-rose-500",
  },
  {
    id: "syndicator",
    title: "Syndicator",
    label: "Mobile Finance Manager",
    description:
      "An intuitive mobile companion for organizing your digital wallets and analyzing your financial health through interactive charts. Take control of your financial life with Finote, a powerful personal finance manager.",
    features: [
      "Create and manage multiple wallets",
      "Visualize spending trends with charts",
      "Secure login and authentication",
      "Real-time cloud sync",
    ],
    techStack: [
      { label: "React Native" },
      { label: "Expo" },
      { label: "Firebase" },
      { label: "TypeScript" },
    ],
    image: "/Images/Syndicator/Dashboard_dark.png",
    images: [
      "/Images/Syndicator/Dashboard_dark.png",
      "/Images/Syndicator/Login_dark.png",
    ],
    link: "#",
    github: "#",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "cold-mail",
    title: "Cold Mail Generator",
    label: "Generative AI Tool",
    description:
      "Built a full-stack app to generate personalized cold/job application emails using user resumes. Integrated LLaMA 3.1 via Groq for dynamic, context-aware email content creation.",
    features: [
      "LLaMA 3.1 & Groq integration",
      "Context-aware email generation",
      "Resume parsing & job matching",
      "Glassmorphism UI design",
    ],
    techStack: [
      { label: "Next.js" },
      { label: "FastAPI" },
      { label: "LangChain" },
      { label: "ChromaDB" },
      { label: "Groq" },
    ],
    image: "/Images/ColdMail/home.png",
    link: "#",
    github: "#",
    color: "from-purple-500 to-indigo-500",
  },
  {
    id: "saloon-app",
    title: "Saloon App",
    label: "Mobile Application",
    description:
      "Developed a full-featured salon booking application supporting three distinct user roles (customer, barber, salon owner). Engineered real-time appointment management and role-based dashboards.",
    features: [
      "Three distinct user roles (RBAC)",
      "Real-time appointment management",
      "Cloudinary image uploads",
      "Secure JWT Authentication",
    ],
    techStack: [
      { label: "React Native" },
      { label: "Django REST" },
      { label: "Expo" },
      { label: "PostgreSQL" },
    ],
    image: "/Images/salon_mockup.png", // Fallback
    images: [
      "/Images/Saloon/login.png",
      "/Images/Saloon/home.png",
      "/Images/Saloon/list.png",
    ],
    link: "#",
    github: "#",
    color: "from-orange-500 to-red-500",
  },
];

// --- Components ---

const SparkleIcon = ({ className }: { className?: string }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
  </svg>
);

import {
  Code,
  Terminal,
  Atom,
  Database,
  Cpu,
  Layers,
  FileCode,
  Smartphone,
  Zap,
  Server,
} from "lucide-react";

const getTechIcon = (label: string) => {
  const lower = label.toLowerCase();
  if (lower.includes("react")) return Atom;
  if (lower.includes("python") || lower.includes("django")) return Terminal;
  if (
    lower.includes("data") ||
    lower.includes("sql") ||
    lower.includes("firebase") ||
    lower.includes("chromadb") ||
    lower.includes("postgresql")
  )
    return Database;
  if (lower.includes("next") || lower.includes("web") || lower.includes("vite"))
    return Globe;
  if (
    lower.includes("ai") ||
    lower.includes("ml") ||
    lower.includes("gpt") ||
    lower.includes("llama") ||
    lower.includes("groq") ||
    lower.includes("pytorch") ||
    lower.includes("transformers") ||
    lower.includes("opencv") ||
    lower.includes("scikit-learn") ||
    lower.includes("langchain")
  )
    return Cpu;
  if (lower.includes("expo") || lower.includes("mobile")) return Smartphone;
  if (lower.includes("fastapi")) return Zap;
  return Code; // Default
};

const Badge = ({ label }: TechBadge) => {
  const Icon = getTechIcon(label);
  return (
    <span className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-300 bg-[#1A1A1A] border border-white/10 rounded-lg shadow-sm hover:border-white/20 hover:text-white transition-colors cursor-default">
      <Icon size={14} className="text-gray-500" />
      {label}
    </span>
  );
};

const ProjectCard = ({
  project,
  index,
  setActiveProject,
}: {
  project: Project;
  index: number;
  setActiveProject: (id: string) => void;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-50% 0px -50% 0px" });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (isInView) {
      setActiveProject(project.id);
    }
  }, [isInView, project.id, setActiveProject]);

  // Slideshow Effect for multi-image projects
  useEffect(() => {
    if (!project.images || project.images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % project.images!.length);
    }, 3000); // Change image every 3 seconds
    return () => clearInterval(interval);
  }, [project.images]);

  return (
    <div
      ref={ref}
      className="min-h-screen flex items-center justify-center p-6 md:p-12"
    >
      <Link
        href={project.link}
        className="block w-full max-w-3xl transform transition-transform duration-500 hover:scale-[1.02]"
      >
        {/* Outer Frame */}
        <div
          className={`relative aspect-[4/3.2] rounded-[2.5rem] p-3 md:p-4 border border-white/10 bg-[#0a0a0a] shadow-2xl group overflow-hidden`}
        >
          {/* Background Color / Glow from the project color */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-10 group-hover:opacity-20 transition-opacity duration-500`}
          />

          {/* Glossy/Glassy Inner Border Container */}
          <div className="relative h-full w-full rounded-[2rem] border border-white/20 bg-white/5 backdrop-blur-sm p-[1px] shadow-[inset_0_0_20px_rgba(255,255,255,0.05)]">
            {/* Actual Image Container */}
            <div className="relative h-full w-full rounded-[2rem] overflow-hidden bg-black">
              {project.images ? (
                // Slideshow Mapping
                project.images.map((img, i) => (
                  <div
                    key={i}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                      i === currentImageIndex ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${project.title} - screen ${i + 1}`}
                      fill
                      className="object-cover transition-transform duration-[3000ms] ease-linear group-hover:scale-105"
                    />
                  </div>
                ))
              ) : (
                // Single Image Fallback
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              )}

              {/* Subtle glossy sheen overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default function CuratedWork() {
  const [activeProjectId, setActiveProjectId] = useState(projects[0].id);
  const activeProject =
    projects.find((p) => p.id === activeProjectId) || projects[0];

  return (
    <section className="bg-black py-24 relative">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Header */}
        <div className="relative text-center mb-32 py-12 flex flex-col items-center justify-center overflow-hidden">
          {/* Background Text Image */}
          <div className="absolute inset-0 z-0 flex items-center justify-center opacity-40 select-none pointer-events-none">
            <div className="relative w-full max-w-4xl h-40 md:h-64">
              <Image
                src="/Images/project_text_bg.png"
                alt="PROJECT"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Foreground Content */}
          <div className="relative z-10">
            <span className="text-xs font-bold tracking-[0.2em] text-white/40 uppercase mb-4 block">
              Featured Case Studies
            </span>
            <h2 className="text-4xl md:text-6xl font-serif text-white">
              Curated{" "}
              <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 pr-4">
                work
              </span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative">
          {/* Left Column: Scrollable Images */}
          <div className="flex flex-col gap-0">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                setActiveProject={setActiveProjectId}
              />
            ))}
          </div>

          {/* Right Column: Sticky Details */}
          <div className="hidden lg:block h-screen sticky top-0 flex items-start justify-center pt-32">
            <div className="w-full max-w-lg pl-12">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProject.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  {/* Active Project Details */}
                  <div className="flex items-center gap-4 mb-6">
                    <div
                      className={`h-[2px] w-12 bg-gradient-to-r ${activeProject.color}`}
                    />
                    <h3 className="text-3xl md:text-5xl font-serif font-bold text-white">
                      {activeProject.title}
                    </h3>
                  </div>

                  <p className="text-[17px] text-white/60 leading-relaxed mb-8 font-light">
                    {activeProject.description}
                  </p>

                  {/* Features List */}
                  <ul className="space-y-4 mb-10">
                    {activeProject.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <SparkleIcon className="w-5 h-5 shrink-0 text-pink-500 mt-0.5" />
                        <span className="text-white/80 text-[15px]">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech Stack & Links */}
                  <div className="flex flex-wrap gap-2 mb-10">
                    {activeProject.techStack.map((tech, i) => (
                      <Badge key={i} {...tech} />
                    ))}
                  </div>

                  <div className="flex gap-6">
                    {activeProject.github && (
                      <Link
                        href={activeProject.github}
                        className="flex items-center gap-2 text-white/50 hover:text-white transition-colors"
                      >
                        <Github size={20} />
                        <span className="text-sm uppercase tracking-widest font-bold">
                          Code
                        </span>
                      </Link>
                    )}
                    {activeProject.link && (
                      <Link
                        href={activeProject.link}
                        className="flex items-center gap-2 text-white/50 hover:text-white transition-colors"
                      >
                        <Globe size={20} />
                        <span className="text-sm uppercase tracking-widest font-bold">
                          Live Demo
                        </span>
                      </Link>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
