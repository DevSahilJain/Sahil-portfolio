"use client";

import React, { useState, useEffect, useRef } from "react";
import { TransitionLink } from "@/app/components/PageTransition";
import Sidebar from "@/app/components/Sidebar";
import ScrollIndicator from "@/app/components/ScrollIndicator";

const skills = [
  {
    id: 1,
    category: "AI / ML",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z" />
        <path d="M12 6v6l4 2" />
        <path d="M8 14c0 2.5 2 5 5 5" />
        <circle cx="19" cy="5" r="2" />
        <circle cx="5" cy="19" r="2" />
      </svg>
    ),
    color: "#9eff2e",
    items: [
      { name: "Prompt Engineering", level: 90 },
      { name: "Loop Engineering", level: 85 },
      { name: "AI / ML Fundamentals", level: 87 },
    ],
  },
  {
    id: 2,
    category: "Programming",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    color: "#00d4ff",
    items: [
      { name: "C", level: 88 },
      { name: "Python", level: 92 },
      { name: "Web Development", level: 85 },
    ],
  },
  {
    id: 3,
    category: "Creative",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
    color: "#ff6b9d",
    items: [
      { name: "Adobe Lightroom", level: 80 },
      { name: "UX/UI Design", level: 78 },
      { name: "Autodesk Fusion 360", level: 83 },
    ],
  },
  {
    id: 4,
    category: "Data Science",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
    color: "#ffd93d",
    items: [
      { name: "Supervised Learning", level: 82 },
      { name: "KNN Regression", level: 75 },
    ],
  },
];

const learningItems = [
  { name: "Rust", color: "#dea584" },
  { name: "LLM Fine-tuning", color: "#9eff2e" },
  { name: "Generative AI", color: "#ff6b9d" },
  { name: "Docker", color: "#0db7ed" },
  { name: "Kubernetes", color: "#326ce5" },
];

function SkillCard({ skill, index, groupColor }: { skill: typeof skills[0]["items"][0]; index: number; groupColor: string }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => setIsVisible(true), index * 80);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "50px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [index]);

  return (
    <article
      ref={ref}
      className={`relative border-4 border-white bg-zinc-950 overflow-hidden transition-all duration-500 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } hover:shadow-[8px_8px_0px_0px_rgb(255,255,255)]`}
      style={{ transform: isVisible ? "rotate(-0.5deg)" : "rotate(-0.5deg) translateY(20px)" }}
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r" style={{ background: `linear-gradient(90deg, ${groupColor}, transparent)` }} />
      <div className="absolute bottom-0 right-0 w-1/3 h-1 bg-gradient-to-l" style={{ background: `linear-gradient(270deg, ${groupColor}, transparent)` }} />
      
      <div className="p-6 md:p-8 relative z-10">
        <div className="flex items-center justify-between gap-4 mb-4">
          <h3 className="font-mono text-lg md:text-xl font-bold leading-tight flex-1">
            {skill.name}
          </h3>
          <span className="font-mono text-sm font-bold whitespace-nowrap px-3 py-1 border-2 border-white bg-zinc-950" style={{ transform: "rotate(1deg)" }}>
            {skill.level}%
          </span>
        </div>

        <div className="relative h-3 bg-zinc-800 border-2 border-white overflow-hidden">
          <div
            className="h-full bg-white transition-all duration-1500 ease-out"
            style={{ width: isVisible ? `${skill.level}%` : "0%" }}
            role="progressbar"
            aria-valuenow={skill.level}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`${skill.name} proficiency: ${skill.level}%`}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shine" />
        </div>

        <div className="mt-3 flex items-center justify-between text-xs font-mono text-zinc-500">
          <span>Novice</span>
          <span>Expert</span>
        </div>

        <div className="mt-4 flex gap-2" role="list" aria-label="Skill tags">
          {["Core", "Active", "Production"].slice(0, Math.ceil(skill.level / 35)).map((tag, i) => (
            <span key={i} className="px-2 py-0.5 border border-white/30 text-xs font-mono text-zinc-400 hover:text-white hover:border-white transition-colors">
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="absolute -bottom-3 -right-3 w-16 h-16 bg-zinc-900 border-4 border-white border-t-transparent border-r-transparent transform rotate-3" />
    </article>
  );
}

function CategorySection({ group, index }: { group: typeof skills[0]; index: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => setIsVisible(true), index * 120);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "50px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [index]);

  return (
    <section
      ref={ref}
      key={group.id}
      className={`bg-zinc-900 border-4 border-white p-8 md:p-12 relative overflow-hidden transition-all duration-700 ${
        isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
      }`}
      role="region"
      aria-label={`${group.category} skills`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b" style={{ background: `linear-gradient(180deg, ${group.color}, transparent)` }} />
      
      <div className="relative z-10 flex items-baseline justify-between gap-4 mb-8 pb-4 border-b-2 border-white">
        <div className="flex items-center gap-4">
          <div className="p-3 border-2 border-white bg-zinc-950" style={{ transform: "rotate(-2deg)" }}>
            <span className="block" style={{ color: group.color }}>{group.icon}</span>
          </div>
          <h2 className="font-mono text-2xl md:text-3xl font-bold tracking-tight">
            {group.category}
          </h2>
        </div>
        <span className="font-mono text-xs text-zinc-500 uppercase tracking-wider flex items-center gap-2">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: group.color }} />
          {group.items.length} skills
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10" role="list">
        {group.items.map((skill, i) => (
          <SkillCard key={skill.name} skill={skill} index={i} groupColor={group.color} />
        ))}
      </div>
    </section>
  );
}

export default function SkillsPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white overflow-y-auto relative">
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[40vw] h-[40vh] opacity-5">
          <svg viewBox="0 0 400 300" fill="none" className="w-full h-full">
            <defs>
              <linearGradient id="gridGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#9eff2e" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#00d4ff" stopOpacity="0.05" />
              </linearGradient>
            </defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="url(#gridGradient)" strokeWidth="0.5" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        <div className="absolute bottom-0 left-0 w-[35vw] h-[35vh] opacity-5">
          <svg viewBox="0 0 350 250" fill="none" className="w-full h-full">
            <defs>
              <radialGradient id="radialGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ff6b9d" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#ff6b9d" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx="175" cy="125" r="150" fill="url(#radialGradient)" />
          </svg>
        </div>
      </div>

      <Sidebar />

      <div className="pt-20 pb-16 px-6 md:px-12 lg:px-20 relative z-10">
        <div className="max-w-6xl mx-auto">
          <header className="mb-16 relative">
            <div className="absolute -top-4 -left-4 w-32 h-32 border-4 border-white/10 transform rotate-12" />
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-2 border-white/10 transform -rotate-6" />
            
            <h1 className="font-mono text-4xl md:text-6xl font-bold tracking-tight border-b-4 border-white pb-4 inline-block relative z-10">
              My Skills
            </h1>
            <p className="font-sans text-lg md:text-xl text-zinc-400 mt-4 max-w-2xl relative z-10">
              Technical competencies across AI, engineering, creative tools, and data science.
            </p>
          </header>

          <nav className="flex flex-wrap gap-3 mb-12 pb-6 border-b-2 border-white relative" aria-label="Quick links">
            <div className="absolute bottom-[-2px] left-0 w-24 h-2 border-4 border-white" />
            <TransitionLink href="/" className="px-4 py-2 border-2 border-white bg-transparent hover:bg-white hover:text-black transition-colors font-mono text-sm">
              Home
            </TransitionLink>
            <TransitionLink href="/skills" className="px-4 py-2 border-2 border-white bg-white text-black font-mono text-sm relative z-10">
              Skills
            </TransitionLink>
            <TransitionLink href="/projects" className="px-4 py-2 border-2 border-white bg-transparent hover:bg-white hover:text-black transition-colors font-mono text-sm">
              Projects
            </TransitionLink>
            <TransitionLink href="/certifications" className="px-4 py-2 border-2 border-white bg-transparent hover:bg-white hover:text-black transition-colors font-mono text-sm">
              Certifications
            </TransitionLink>
          </nav>

          <div className="space-y-12" role="region" aria-label="Skills">
            {skills.map((group, index) => (
              <CategorySection key={group.id} group={group} index={index} />
            ))}

            <div className="bg-zinc-900 border-4 border-white p-8 md:p-12 text-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-[#9eff2e]/10 via-transparent to-[#00d4ff]/10" />
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#9eff2e] via-[#00d4ff] to-[#ff6b9d]" />
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#ff6b9d] via-[#ffd93d] to-[#9eff2e]" />
              
              <div className="relative z-10">
                <p className="font-sans text-lg md:text-xl text-zinc-300 mb-6 leading-relaxed max-w-3xl mx-auto">
                  Always expanding the toolkit. Currently exploring: 
                  <span className="font-mono font-bold text-white">Rust</span>, 
                  <span className="font-mono font-bold text-white">LLM Fine-tuning</span>, 
                  and 
                  <span className="font-mono font-bold text-white">Generative AI</span>.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  {learningItems.map((item, i) => (
                    <span
                      key={item.name}
                      className="px-4 py-2 border-2 border-white bg-transparent font-mono text-xs hover:bg-white hover:text-black transition-all duration-300 relative overflow-hidden group/item"
                      style={{ borderColor: item.color }}
                    >
                      <span className="relative z-10">{item.name}</span>
                      <div className="absolute inset-0 bg-white scale-x-0 origin-left group-hover/item:scale-x-100 transition-transform duration-300" style={{ backgroundColor: item.color }} />
                    </span>
                  ))}
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-20 h-20 border-4 border-white/10 transform rotate-12" />
            </div>
          </div>

          <div className="mt-12">
            <TransitionLink
              href="/"
              className="inline-flex items-center gap-2 px-5 py-3 border-4 border-white bg-transparent hover:bg-white hover:text-black transition-colors font-mono text-sm md:text-base font-bold relative overflow-hidden group"
            >
              <span className="relative z-10">← Back to Home</span>
              <div className="absolute inset-0 bg-white scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300" />
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="relative z-10">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
            </TransitionLink>
          </div>
        </div>
      </div>

      <footer className="border-t-2 border-white py-8 px-6 relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-sm text-zinc-500">
            © 2026 Sahil Jain. Built with Next.js.
          </p>
          <div className="flex gap-6">
            <a href="https://github.com/DevSahilJain" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors font-mono text-sm flex items-center gap-1">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/jainwinsahil?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors font-mono text-sm flex items-center gap-1">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </a>
            <a href="https://x.com/Jainwin_sahil" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors font-mono text-sm flex items-center gap-1">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              Twitter
            </a>
          </div>
        </div>
      </footer>
      <ScrollIndicator />
      <style jsx>{`
        @keyframes shine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shine {
          animation: shine 2s infinite;
        }
      `}</style>
    </main>
  );
}