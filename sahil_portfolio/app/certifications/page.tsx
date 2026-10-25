"use client";

import React, { useState, useEffect, useRef } from "react";
import { TransitionLink } from "@/app/components/PageTransition";
import Sidebar from "@/app/components/Sidebar";
import ScrollIndicator from "@/app/components/ScrollIndicator";

const certificates = [
  {
    id: 1,
    title: "AI & DATA SCIENCE — IITM",
    issuer: "IIT Madras",
    date: "2024",
    description: "Certificate in AI and Data Science from IIT Madras. Comprehensive program covering machine learning, deep learning, and data analytics.",
    buttonLabel: "View Credential",
    url: "https://drive.google.com/file/d/1C7UoWs13v9-WdqFGvK6BIIhWqnNi04GK/view",
    type: "academic",
    color: "#9eff2e",
  },
  {
    id: 2,
    title: "QUIZ OFF 2026: India's Biggest AI Quiz",
    issuer: "Campus Crew × Unstop",
    date: "2026",
    description: "India's biggest AI quiz competition, organized by Campus Crew and hosted by Unstop. Demonstrated expertise in AI concepts and applications.",
    buttonLabel: "View Certificate",
    url: "https://www.linkedin.com/safety/go/?url=https%3A%2F%2Fcdn%2Eunstop%2Ecom%2Fquiz_off_certs_v2%2Fb2c7eff5-bacb-4cd7-a583-7ebad696f537%2Epng&urlhash=Y1IG&mt=kQ8aQEFNDisjXM58q4RLvbG_Y5KXsHkxMlx08sAH5nXbkuNLbkKKyDTC4eFEISWWE3NqguoZA8P-LbeE-Wtbif_nnctk&isSdui=true&li_theme=light",
    type: "competition",
    color: "#00d4ff",
  },
  {
    id: 3,
    title: "CODE CLASH 2.0",
    issuer: "Code Clash",
    date: "2024",
    description: "Coding competition achievement recognizing problem-solving skills and algorithmic thinking under time constraints.",
    buttonLabel: "View Certificate",
    url: "https://drive.google.com/file/d/1F85buzsJt2J4QWsRhd2J0ZIE-3czfrgD/view",
    type: "competition",
    color: "#ff6b9d",
  },
  {
    id: 4,
    title: "HCLTech — Naukri Campus Young Turks 26",
    issuer: "HCLTech × Naukri Campus",
    date: "2026",
    description: "Certificate of achievement for Young Turks 26, Round 1. Recognized for innovative thinking and technical aptitude.",
    buttonLabel: "View Credential",
    url: "https://www.naukri.com/campus/certificates/young_turks26_round_1_achievement/v0/6acf47d696ebe313e740b34c?utm_source=certificate&utm_medium=copy&utm_campaign=6acf47d696ebe313e740b34c",
    type: "corporate",
    color: "#ffd93d",
  },
];

const typeStyles = {
  academic: { label: "Academic", icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M22 10v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10" />
      <path d="M6 10V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v5" />
      <path d="M12 3v2" />
      <path d="M9 3v2" />
      <path d="M15 3v2" />
    </svg>
  )},
  competition: { label: "Competition", icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  )},
  corporate: { label: "Corporate", icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <path d="M8 21h8" />
      <path d="M12 17v4" />
    </svg>
  )},
};

function CertificateCard({ cert, index }: { cert: typeof certificates[0]; index: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const typeStyle = typeStyles[cert.type as keyof typeof typeStyles];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => setIsVisible(true), index * 150);
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
      key={cert.id}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative border-4 border-white bg-zinc-950 overflow-hidden transition-all duration-500 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } hover:shadow-[12px_12px_0px_0px_rgb(255,255,255)]`}
      style={{ 
        transform: isVisible 
          ? (isHovered ? "rotate(-0.5deg) scale(1.02)" : "rotate(-0.5deg)") 
          : "rotate(-0.5deg) translateY(30px)" 
      }}
    >
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r" style={{ background: `linear-gradient(90deg, ${cert.color}, transparent)` }} />
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-l" style={{ background: `linear-gradient(270deg, ${cert.color}, transparent)` }} />
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b" style={{ background: `linear-gradient(180deg, ${cert.color}, transparent)` }} />
      
      <div className="p-6 md:p-8 relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="px-3 py-1 border-2 border-white text-xs font-mono uppercase tracking-wider flex items-center gap-1.5" style={{ color: cert.color, borderColor: cert.color }}>
            {typeStyle.icon}
            {typeStyle.label}
          </span>
          <span className="font-mono text-xs text-zinc-500 ml-auto px-2 py-1 border border-white/30" style={{ transform: "rotate(1deg)" }}>
            {cert.date}
          </span>
        </div>

        <h3 className="font-mono text-lg md:text-xl font-bold mb-4 leading-tight text-white">
          {cert.title}
        </h3>
        
        <p className="text-zinc-300 text-base md:text-lg mb-6 leading-relaxed">
          {cert.description}
        </p>

        <div className="flex items-center justify-between pt-4 border-t-2 border-white/20">
          <div className="flex items-center gap-3 text-zinc-400 text-sm font-mono">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" style={{ color: cert.color }}>
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span className="font-sans">{cert.issuer}</span>
          </div>
          
          <a
            href={cert.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 border-4 border-white bg-transparent hover:bg-white hover:text-black transition-all duration-300 font-mono text-sm md:text-base font-bold relative overflow-hidden group"
            style={{ borderColor: cert.color }}
          >
            <span className="relative z-10">{cert.buttonLabel}</span>
            <div className="absolute inset-0 bg-white scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300" style={{ backgroundColor: cert.color }} />
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="relative z-10">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        </div>
      </div>
      <div className="absolute -bottom-3 -right-3 w-16 h-16 bg-zinc-900 border-4 border-white border-t-transparent border-r-transparent transform rotate-3" style={{ borderColor: cert.color }} />
      <div className="absolute -top-3 -left-3 w-12 h-12 bg-zinc-900 border-4 border-white border-b-transparent border-l-transparent transform -rotate-3 opacity-50" style={{ borderColor: cert.color }} />
    </article>
  );
}

function StatsSection() {
  const stats = [
    { value: certificates.length, label: "Certificates" },
    { value: certificates.filter(c => c.type === "academic").length, label: "Academic" },
    { value: certificates.filter(c => c.type === "competition").length, label: "Competitions" },
    { value: certificates.filter(c => c.type === "corporate").length, label: "Corporate" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12" role="region" aria-label="Certificate statistics">
      {stats.map((stat, i) => (
        <div
          key={stat.label}
          className="bg-zinc-900 border-4 border-white p-6 text-center relative overflow-hidden group"
          style={{ transitionDelay: `${i * 100}ms` }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#9eff2e] via-[#00d4ff] to-[#ff6b9d]" />
          <div className="relative z-10">
            <div className="font-mono text-4xl md:text-5xl font-bold mb-2" style={{ color: "#9eff2e" }}>
              {stat.value}
            </div>
            <div className="font-mono text-xs text-zinc-500 uppercase tracking-wider">
              {stat.label}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function CertificationsPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white overflow-y-auto relative">
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[40vw] h-[40vh] opacity-5">
          <svg viewBox="0 0 400 300" fill="none" className="w-full h-full">
            <defs>
              <linearGradient id="certGridGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#9eff2e" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#00d4ff" stopOpacity="0.05" />
              </linearGradient>
            </defs>
            <pattern id="certGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="url(#certGridGradient)" strokeWidth="0.5" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#certGrid)" />
          </svg>
        </div>
        <div className="absolute bottom-0 left-0 w-[35vw] h-[35vh] opacity-5">
          <svg viewBox="0 0 350 250" fill="none" className="w-full h-full">
            <defs>
              <radialGradient id="certRadialGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ff6b9d" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#ff6b9d" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx="175" cy="125" r="150" fill="url(#certRadialGradient)" />
          </svg>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vh] opacity-3">
          <svg viewBox="0 0 600 400" fill="none" className="w-full h-full">
            <defs>
              <pattern id="dots" width="60" height="60" patternUnits="userSpaceOnUse">
                <circle cx="30" cy="30" r="1" fill="white" opacity="0.1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
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
              My Certifications
            </h1>
            <p className="font-sans text-lg md:text-xl text-zinc-400 mt-4 max-w-2xl relative z-10">
              Credentials, achievements, and milestones from my learning journey.
            </p>
          </header>

          <nav className="flex flex-wrap gap-3 mb-12 pb-6 border-b-2 border-white relative" aria-label="Quick links">
            <div className="absolute bottom-[-2px] left-0 w-24 h-2 border-4 border-white" />
            <TransitionLink href="/" className="px-4 py-2 border-2 border-white bg-transparent hover:bg-white hover:text-black transition-colors font-mono text-sm">
              Home
            </TransitionLink>
            <TransitionLink href="/skills" className="px-4 py-2 border-2 border-white bg-transparent hover:bg-white hover:text-black transition-colors font-mono text-sm">
              Skills
            </TransitionLink>
            <TransitionLink href="/projects" className="px-4 py-2 border-2 border-white bg-transparent hover:bg-white hover:text-black transition-colors font-mono text-sm">
              Projects
            </TransitionLink>
            <TransitionLink href="/certifications" className="px-4 py-2 border-2 border-white bg-white text-black font-mono text-sm relative z-10">
              Certifications
            </TransitionLink>
          </nav>

          <StatsSection />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8" role="list" aria-label="Certificates">
            {certificates.map((cert, index) => (
              <CertificateCard key={cert.id} cert={cert} index={index} />
            ))}
          </div>

          <div className="mt-16 bg-zinc-900 border-4 border-white p-8 md:p-12 text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-[#9eff2e]/10 via-transparent to-[#00d4ff]/10" />
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#9eff2e] via-[#00d4ff] to-[#ff6b9d]" />
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#ff6b9d] via-[#ffd93d] to-[#9eff2e]" />
            
            <div className="relative z-10">
              <p className="font-sans text-lg md:text-xl text-zinc-300 mb-6 leading-relaxed max-w-3xl mx-auto">
                Continuously building credibility through recognized programs and competitive achievements.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {["Academic", "Competition", "Corporate", "Online Courses"].map((type, i) => (
                  <span
                    key={type}
                    className="px-4 py-2 border-2 border-white bg-transparent font-mono text-xs hover:bg-white hover:text-black transition-all duration-300 relative overflow-hidden group/item"
                    style={{ borderColor: ["#9eff2e", "#00d4ff", "#ff6b9d", "#ffd93d"][i] }}
                  >
                    <span className="relative z-10">{type}</span>
                    <div className="absolute inset-0 bg-white scale-x-0 origin-left group-hover/item:scale-x-100 transition-transform duration-300" style={{ backgroundColor: ["#9eff2e", "#00d4ff", "#ff6b9d", "#ffd93d"][i] }} />
                  </span>
                ))}
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 w-20 h-20 border-4 border-white/10 transform rotate-12" />
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
    </main>
  );
}