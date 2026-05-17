"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin, CheckCircle2 } from "lucide-react";

export default function WorkExperience() {
  const experiences = [
    {
      role: "Associate Software Engineer Trainee",
      company: "Mphasis",
      location: "Chennai, Tamil Nadu",
      logo: "/Logo/image.png",
      color: "from-blue-500 to-cyan-500",
      contributions: [
        "Engineered and maintained enterprise-grade applications across the full SDLC in Agile sprints using .NET Framework, C#, Angular.js, and SQL Express.",
        "Architected 20+ RESTful APIs, enabling modular frontend-backend communication with secure endpoints and efficient data transfer.",
        "Reduced API response latency by 25% through database indexing and query restructuring.",
        "Resolved production-level issues, improving system stability and reducing recurring defects by 30%.",
        "Facilitated AWS EC2 deployments and S3 integrations for scalable cloud-hosted applications, resulting in 36% increase in application availability.",
        "Automated CI/CD workflows using Jenkins, reducing deployment turnaround time by 40%.",
        "Enhanced Git branching strategies and peer code reviews, leading to 27% reduction in code defects and improved maintainability.",
      ]
    }
  ];

  return (
    <section className="relative overflow-hidden bg-transparent">
      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-bold tracking-[0.2em] text-white/40 uppercase mb-4 block">
              Career Journey
            </span>
            <h2 className="text-4xl md:text-6xl font-serif text-white">
              Work{" "}
              <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500 pr-4">
                Experience
              </span>
            </h2>
          </motion.div>
        </div>

        <div className="max-w-4xl mx-auto">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative group"
            >
              {/* Card Container */}
              <div className="relative bg-transparent p-8 md:p-12 overflow-hidden">

                <div className="flex flex-col md:flex-row gap-8 md:gap-12 relative z-10">
                  {/* Left Column - Logo & Meta */}
                  <div className="flex-shrink-0 flex flex-col items-start gap-6 w-full md:w-[280px]">
                    <div className="relative w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center p-4 overflow-hidden">
                      <Image 
                        src={exp.logo} 
                        alt={`${exp.company} logo`} 
                        fill 
                        className="object-contain p-3"
                      />
                    </div>
                    
                    <div>
                      <h3 className="text-2xl font-serif font-bold text-white mb-2">{exp.company}</h3>
                      <p className="text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-4">{exp.role}</p>
                      
                      <div className="space-y-3 text-sm text-white/60">
                        <div className="flex items-center gap-2">
                          <MapPin size={16} className="text-white/40" />
                          <span>{exp.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Contributions */}
                  <div className="flex-grow">
                    <div className="h-[2px] w-12 bg-gradient-to-r from-blue-500 to-cyan-500 mb-6 hidden md:block" />
                    <h4 className="text-sm uppercase tracking-widest font-bold text-white/40 mb-6">Key Contributions</h4>
                    <ul className="space-y-4">
                      {exp.contributions.map((item, i) => (
                        <motion.li 
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: 0.1 * i }}
                          className="flex items-start gap-3 group/item"
                        >
                          <CheckCircle2 size={18} className="text-blue-500 mt-1 flex-shrink-0 opacity-70 group-hover/item:opacity-100 transition-opacity" />
                          <span className="text-white/70 leading-relaxed text-[15px] group-hover/item:text-white/90 transition-colors">
                            {item}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
