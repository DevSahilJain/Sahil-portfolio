"use client";

import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react";

interface TransitionContextType {
  startTransition: (href: string) => void;
  isTransitioning: boolean;
}

const TransitionContext = createContext<TransitionContextType | null>(null);

export function usePageTransition() {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error("usePageTransition must be used within a PageTransitionProvider");
  }
  return context;
}

function TransitionOverlay({ isActive, onComplete }: { isActive: boolean; onComplete: () => void }) {
  const [phase, setPhase] = useState<"enter" | "exit" | "idle">("idle");

  useEffect(() => {
    if (isActive) {
      setPhase("enter");
      const timer1 = setTimeout(() => {
        setPhase("exit");
        onComplete();
        const timer2 = setTimeout(() => setPhase("idle"), 350);
        return () => clearTimeout(timer2);
      }, 450);
      return () => clearTimeout(timer1);
    } else {
      setPhase("idle");
    }
  }, [isActive, onComplete]);

  if (phase === "idle") return null;

  return (
    <div
      className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-zinc-950" />
      
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="transitionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9eff2e" />
            <stop offset="50%" stopColor="#00d4ff" />
            <stop offset="100%" stopColor="#ff6b9d" />
          </linearGradient>
        </defs>
        
        {/* Expanding geometric shapes - only during enter */}
        <g style={{ transformOrigin: "50% 50%" }}>
          {phase === "enter" && Array.from({ length: 8 }).map((_, i) => (
            <rect
              key={i}
              x="50" y="50"
              width="0" height="0"
              fill="url(#transitionGradient)"
              style={{
                transform: `translate(-50%, -50%) rotate(${i * 45}deg)`,
                transformOrigin: "0 0",
                animation: `expandRect 0.45s cubic-bezier(0.76, 0, 0.24, 1) ${i * 0.025}s forwards`,
                opacity: 0,
              }}
            />
          ))}
        </g>
        
        {/* Sweeping diagonal lines - continuous through enter and exit */}
        {Array.from({ length: 12 }).map((_, i) => (
          <line
            key={`line-${i}`}
            x1={-20 + i * 10} y1="120"
            x2={20 + i * 10} y2="-20"
            stroke="url(#transitionGradient)"
            strokeWidth="3"
            strokeLinecap="round"
            style={{
              strokeDasharray: "1000",
              strokeDashoffset: phase === "enter" ? "1000" : "0",
              animation: phase === "enter" 
                ? `drawLine 0.55s cubic-bezier(0.76, 0, 0.24, 1) ${i * 0.02}s forwards`
                : `undrawLine 0.35s cubic-bezier(0.87, 0, 0.13, 1) ${i * 0.015}s forwards`,
              opacity: phase === "enter" ? 0.8 : 0.8,
            }}
          />
        ))}
      </svg>

      <style jsx>{`
        @keyframes expandRect {
          0% { width: 0; height: 0; opacity: 0; }
          50% { opacity: 1; }
          100% { width: 150; height: 150; opacity: 0.15; }
        }
        @keyframes drawLine {
          0% { stroke-dashoffset: 1000; opacity: 0; }
          20% { opacity: 0.8; }
          100% { stroke-dashoffset: 0; opacity: 0; }
        }
        @keyframes undrawLine {
          0% { stroke-dashoffset: 0; opacity: 0.8; }
          100% { stroke-dashoffset: -1000; opacity: 0; }
        }
      `}</style>
    </div>
  );
}

export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [pendingHref, setPendingHref] = useState<string | null>(null);

  const startTransition = useCallback((href: string) => {
    setPendingHref(href);
    setIsTransitioning(true);
  }, []);

  const handleTransitionEnd = useCallback(() => {
    setIsTransitioning(false);
    if (pendingHref) {
      window.location.href = pendingHref;
      setPendingHref(null);
    }
  }, [pendingHref]);

  return (
    <TransitionContext.Provider value={{ startTransition, isTransitioning }}>
      {children}
      <TransitionOverlay isActive={isTransitioning} onComplete={handleTransitionEnd} />
    </TransitionContext.Provider>
  );
}

export function TransitionLink({
  href,
  children,
  className = "",
}: { href: string; children: React.ReactNode; className?: string }) {
  const { startTransition } = usePageTransition();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    if (href.startsWith("http") || href.startsWith("#")) return;
    e.preventDefault();
    startTransition(href);
  };

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}