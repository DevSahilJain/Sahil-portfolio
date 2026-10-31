"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "@/app/components/Sidebar";
import ScrollIndicator from "@/app/components/ScrollIndicator";
import { TransitionLink } from "@/app/components/PageTransition";

export default function Projects() {
  const [progress, setProgress] = useState(0);
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => (p + 1) % 101);
    }, 80);

    const dotInterval = setInterval(() => {
      setDots((d) => (d.length >= 3 ? "" : d + "."));
    }, 500);

    return () => {
      clearInterval(interval);
      clearInterval(dotInterval);
    };
  }, []);

  return (
    <main className="relative w-screen min-h-screen bg-[#1f1f1f] text-white flex flex-col items-center select-none overflow-y-auto">
      <Sidebar />

      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[50vw] h-[50vh] opacity-5">
          <svg viewBox="0 0 500 400" fill="none" className="w-full h-full">
            <defs>
              <linearGradient id="projGridGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#9eff2e" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#00d4ff" stopOpacity="0.05" />
              </linearGradient>
            </defs>
            <pattern id="projGrid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="url(#projGridGradient)" strokeWidth="0.5" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#projGrid)" />
          </svg>
        </div>
        <div className="absolute bottom-0 left-0 w-[40vw] h-[40vh] opacity-5">
          <svg viewBox="0 0 400 300" fill="none" className="w-full h-full">
            <defs>
              <radialGradient id="projRadialGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ff6b9d" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#ff6b9d" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx="200" cy="150" r="180" fill="url(#projRadialGradient)" />
          </svg>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] opacity-2">
          <svg viewBox="0 0 800 600" fill="none" className="w-full h-full">
            <defs>
              <pattern id="projDots" width="80" height="80" patternUnits="userSpaceOnUse">
                <circle cx="40" cy="40" r="1.5" fill="white" opacity="0.1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#projDots)" />
          </svg>
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center py-20">
        <div className="max-w-4xl w-full">
          <div className="mb-12 relative">
            <div className="inline-flex items-center gap-3 px-6 py-3 border-4 border-white bg-zinc-950 mb-8" style={{ transform: "rotate(-1deg)" }}>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500 animate-pulse" />
                <span className="font-mono text-xs text-zinc-400 uppercase tracking-wider">Building</span>
              </div>
              <span className="font-mono text-xs text-zinc-500 ml-4">{progress}%</span>
            </div>

            <h1 className="font-mono text-5xl md:text-7xl lg:text-9xl font-bold tracking-tight border-b-4 border-white pb-4 inline-block relative">
              Under Construction
              <span className="absolute bottom-[-2px] right-[-60px] font-mono text-xs text-zinc-500 opacity-70 animate-blink">{dots}</span>
            </h1>

            <div className="mt-8 flex items-center justify-center gap-4">
              <div className="w-64 h-1.5 bg-zinc-800 border-2 border-white rounded overflow-hidden relative">
                <div
                  className="h-full bg-gradient-to-r from-[#9eff2e] via-[#00d4ff] to-[#ff6b9d] transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="font-mono text-sm text-zinc-400 whitespace-nowrap">
                {progress}% Complete
              </span>
            </div>
          </div>

          <div className="bg-zinc-900 border-4 border-white p-8 md:p-12 mb-12 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#9eff2e]/5 via-transparent to-[#00d4ff]/5" />
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#9eff2e] via-[#00d4ff] to-[#ff6b9d]" />
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#ff6b9d] via-[#ffd93d] to-[#9eff2e]" />

            <div className="relative z-10 text-left">
              {/* Featured Project: Enviroova */}
              <article
                className="relative border-4 border-white bg-zinc-950 overflow-hidden transition-all duration-500 hover:shadow-[12px_12px_0px_0px_rgb(255,255,255)] mb-12"
                style={{ transform: "rotate(-0.3deg)" }}
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r" style={{ background: "linear-gradient(90deg, #9eff2e, transparent)" }} />
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-l" style={{ background: "linear-gradient(270deg, #00d4ff, transparent)" }} />

                <div className="p-8 md:p-10 relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 border-2 border-white text-xs font-mono uppercase tracking-wider flex items-center gap-1.5" style={{ color: "#9eff2e", borderColor: "#9eff2e" }}>
                      <span style={{ color: "#9eff2e" }}>🌱</span>
                      Side Project
                    </span>
                    <span className="font-mono text-xs text-zinc-500 ml-auto px-2 py-1 border border-white/30" style={{ transform: "rotate(1deg)" }}>
                      2026
                    </span>
                  </div>

                  <h3 className="font-mono text-2xl md:text-3xl font-bold mb-4 leading-tight text-white">
                    Enviroova
                  </h3>
                  <p className="text-zinc-300 text-base md:text-lg mb-6 leading-relaxed">
                    Campus energy sustainability dashboard that tracks energy usage, cost, and carbon footprint across university buildings. Built with real-time data visualization and tariff-based payback calculations.
                  </p>

                  <div className="flex flex-wrap gap-3 mb-6">
                    {["Next.js", "TypeScript", "Tailwind CSS", "Recharts", "Vercel"].map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 border border-white/30 bg-zinc-900 font-mono text-xs rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Project Logo */}
                  <div className="mb-6 flex justify-center">
                    <img
                      src="/images/enviroova.jpg"
                      alt="Enviroova logo"
                      className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-white/20 shadow-[0_0_25px_rgba(158,255,46,0.35)] transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  <div className="mb-6">
                    <h4 className="font-mono text-xs text-zinc-500 uppercase tracking-wider mb-3">Contributors</h4>
                    <div className="flex flex-wrap gap-4 md:gap-6">
                      {[
                        { name: "Vedant Jain", url: "https://www.linkedin.com/in/vedant-jain-a89919420?utm_source=share_via&utm_content=profile&utm_medium=member_android" },
                        { name: "Jeet Kotadiya", url: "https://www.linkedin.com/in/jeet-kotadiya-47b426444?utm_source=share_via&utm_content=profile&utm_medium=member_android" },
                        { name: "Kislay Agrawal", url: "https://www.linkedin.com/in/kislay-agrawal-198786416?utm_source=share_via&utm_content=profile&utm_medium=member_android" },
                      ].map((contributor) => (
                        <a
                          key={contributor.name}
                          href={contributor.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 border-2 border-white/30 bg-zinc-900 hover:bg-white hover:text-black transition-all duration-300 font-mono text-sm relative overflow-hidden group"
                        >
                          <span className="relative z-10">{contributor.name}</span>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="relative z-10">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                          </svg>
                          <div className="absolute inset-0 bg-white scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300" />
                        </a>
                      ))}
                    </div>
                  </div>

                  <a
                    href="https://ecoloop-vkv5-3gch2gurm-devsahiljain.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 border-4 border-[#9eff2e] bg-transparent hover:bg-[#9eff2e] hover:text-black transition-all duration-300 font-mono text-sm md:text-base font-bold relative overflow-hidden group"
                  >
                    <span className="relative z-10">Live Demo ↗</span>
                    <div className="absolute inset-0 bg-[#9eff2e] scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300" />
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="relative z-10">
                      <line x1="18" y1="13" x2="12" y2="7" />
                      <line x1="12" y1="7" x2="6" y2="13" />
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    </svg>
                  </a>
                </div>
                <div className="absolute -bottom-3 -right-3 w-16 h-16 bg-zinc-900 border-4 border-white border-t-transparent border-r-transparent transform rotate-3" style={{ borderColor: "#9eff2e" }} />
                <div className="absolute -top-3 -left-3 w-12 h-12 bg-zinc-900 border-4 border-white border-b-transparent border-l-transparent transform -rotate-3 opacity-50" style={{ borderColor: "#00d4ff" }} />
              </article>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {[
                  { icon: "🚀", title: "Hackathon Projects", desc: "Rapid prototypes from 24-48hr builds" },
                  { icon: "🔬", title: "Experiments", desc: "R&D prototypes exploring new tech" },
                  { icon: "🛠️", title: "Side Projects", desc: "Tools & apps built for fun & utility" },
                ].map((item, i) => (
                  <div
                    key={item.title}
                    className="p-6 border-2 border-white/20 bg-zinc-950 hover:border-white/50 hover:shadow-[8px_8px_0px_0px_rgb(255,255,255)] transition-all duration-300 relative"
                    style={{ transform: `rotate(${i === 1 ? "-0.5" : i === 2 ? "0.5" : "-0.3"}deg)` }}
                  >
                    <div className="text-3xl mb-3">{item.icon}</div>
                    <h3 className="font-mono text-lg font-bold mb-2">{item.title}</h3>
                    <p className="text-zinc-400 text-sm font-sans">{item.desc}</p>
                    <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-zinc-900 border-2 border-white border-t-transparent border-r-transparent transform rotate-3 opacity-50" />
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap justify-center gap-3 mb-8">
                {["React/Next.js", "Python/AI", "Rust/WASM", "Docker/K8s", "Three.js/WebGL", "LLM Apps"].map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 border-2 border-white/30 bg-transparent font-mono text-xs hover:bg-white/10 hover:border-white transition-all duration-300 relative overflow-hidden group/item"
                  >
                    <span className="relative z-10">{tag}</span>
                    <div className="absolute inset-0 bg-white/5 scale-x-0 origin-left group-hover/item:scale-x-100 transition-transform duration-300" />
                  </span>
                ))}
              </div>

              <TransitionLink
                href="/"
                className="inline-flex items-center gap-2 px-6 py-4 border-4 border-white bg-transparent hover:bg-white hover:text-black transition-colors font-mono text-sm md:text-base font-bold relative overflow-hidden group"
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

          <div className="flex items-center justify-center gap-8 text-zinc-500 font-mono text-xs">
            <div className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
              <span>Est. Launch: Q1 2026</span>
            </div>
            <div className="w-px h-6 bg-white/20" />
            <div className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>Notify me when ready</span>
            </div>
          </div>
        </div>
      </div>

      <footer className="border-t-2 border-white py-8 px-6 relative z-10 w-full">
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
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 1s infinite;
        }
      `}</style>
    </main>
  );
}