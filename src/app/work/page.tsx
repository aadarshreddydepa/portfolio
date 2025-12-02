"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import ProjectModal from "@/components/ProjectModal";
import { useState } from "react";

const projects = [
  {
    title: "E-Commerce Dashboard",
    description:
      "A comprehensive dashboard for managing online stores, featuring real-time analytics, inventory management, and order processing.",
    longDescription:
      "This E-Commerce Dashboard is a powerful tool designed for store owners to manage their business efficiently. Built with Next.js and Prisma, it offers real-time insights into sales, inventory levels, and customer behavior. The dashboard features a clean, intuitive interface with interactive charts and tables. Key features include product management, order tracking, customer analytics, and revenue reports. The application is fully responsive and optimized for performance.",
    tags: ["Next.js", "Tailwind CSS", "Prisma", "PostgreSQL"],
    image: "https://placehold.co/600x400/222/FFF?text=E-Commerce",
    link: "#",
    github: "#",
    role: "Full Stack Developer",
    date: "2024",
  },
  {
    title: "AI Content Generator",
    description:
      "An AI-powered application that helps users generate high-quality content for blogs, social media, and marketing campaigns.",
    longDescription:
      "The AI Content Generator leverages OpenAI's GPT-4 API to assist content creators in producing high-quality text. Users can generate blog posts, social media captions, and marketing copy with just a few prompts. The application includes features like tone adjustment, length control, and SEO optimization suggestions. Built with React and Node.js, it ensures a smooth and responsive user experience.",
    tags: ["React", "OpenAI API", "Framer Motion", "Node.js"],
    image: "https://placehold.co/600x400/222/FFF?text=AI+Generator",
    link: "#",
    github: "#",
    role: "Frontend Developer",
    date: "2023",
  },
  {
    title: "Finance Tracker",
    description:
      "A personal finance tracking application that allows users to monitor their income, expenses, and savings goals with visual charts.",
    longDescription:
      "Finance Tracker is a personal finance management tool that helps users take control of their money. It allows for easy tracking of income and expenses, setting budgets, and visualizing financial health through dynamic charts. The app supports multiple currencies and recurring transactions. Secure authentication and data encryption ensure user privacy.",
    tags: ["Vue.js", "Firebase", "Chart.js", "Tailwind"],
    image: "https://placehold.co/600x400/222/FFF?text=Finance+Tracker",
    link: "#",
    github: "#",
    role: "Full Stack Developer",
    date: "2023",
  },
  {
    title: "Social Media App",
    description:
      "A modern social media platform connecting people with similar interests, featuring real-time chat and media sharing.",
    longDescription:
      "This Social Media App is designed to foster communities around shared interests. It features a real-time feed, instant messaging, and media sharing capabilities. Users can create groups, follow topics, and engage with content through likes and comments. The backend is powered by AWS Amplify and GraphQL for scalable and real-time data handling.",
    tags: ["React Native", "GraphQL", "AWS Amplify"],
    image: "https://placehold.co/600x400/222/FFF?text=Social+App",
    link: "#",
    github: "#",
    role: "Mobile Developer",
    date: "2022",
  },
];

export default function Work() {
  const [selectedProject, setSelectedProject] = useState<
    (typeof projects)[0] | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProjectClick = (project: (typeof projects)[0]) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-white/20">
      <Navbar />

      <section className="pt-32 pb-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Selected Work
            </h1>
            <p className="text-white/60 max-w-xl text-lg">
              A collection of projects that showcase my passion for building
              clean, efficient, and user-centric digital solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <ProjectCard
                key={index}
                {...project}
                index={index}
                onClick={() => handleProjectClick(project)}
              />
            ))}
          </div>
        </div>
      </section>

      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <Footer />
    </main>
  );
}
