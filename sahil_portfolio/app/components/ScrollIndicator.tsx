"use client";

import React, { useState, useEffect } from "react";

export default function ScrollIndicator() {
  const [show, setShow] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShow(false);
      } else {
        setShow(true);
      }
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!show) return null;

  return (
    <div
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 pointer-events-none select-none"
      style={{ animation: "scrollPulse 2s ease-in-out infinite" }}
      aria-hidden="true"
    >
      <div className="flex flex-col items-center gap-1.5">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-bounce"
          style={{ color: "#000" }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
        <span className="font-mono text-xs tracking-widest uppercase" style={{ color: "#000" }}>
          Scroll
        </span>
      </div>
      <style jsx>{`
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.6; transform: translateX(-50%) translateY(0); }
          50% { opacity: 1; transform: translateX(-50%) translateY(4px); }
        }
      `}</style>
    </div>
  );
}