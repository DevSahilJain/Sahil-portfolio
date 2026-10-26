"use client";

import React, { useState, useRef, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import TypewriterText from "./components/TypewriterText";

export default function Home() {
  return (
    <>
      <style jsx global>{`
        /* Contact Email Button Styles */
        .contact-email-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem 2rem;
          min-width: 280px;
          border: 2px solid white;
          background: rgba(17, 17, 17, 0.8);
          border-radius: 0.75rem;
          cursor: pointer;
          user-select: none;
          text-decoration: none;
          transition: transform 0.3s ease-out, box-shadow 0.3s ease-out;
          will-change: transform, box-shadow;
          box-shadow: 4px 4px 0px 0px rgb(255,255,255);
          transform: translateY(0) scale(1);
        }
        
        .contact-email-btn:hover,
        .contact-email-btn:focus-visible {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 
            0 20px 40px -10px rgba(158, 255, 46, 0.15), 
            0 0 0 1px rgba(158, 255, 46, 0.2), 
            8px 8px 0px 0px rgb(255,255,255);
          outline: none;
        }
        
        .contact-email-btn:focus-visible {
          ring: 4px;
          ring-color: rgba(158, 255, 46, 0.4);
          ring-offset: 2px;
          ring-offset-color: #18181b;
        }

        .btn-bg-sweep {
          position: absolute;
          inset: 0;
          background: linear-gradient(to right, #9eff2e, #00d4ff, #ff6b9d);
          border-radius: 0.75rem;
          opacity: 0;
          transition: opacity 0.3s;
        }
        .contact-email-btn:hover .btn-bg-sweep,
        .contact-email-btn:focus-visible .btn-bg-sweep {
          opacity: 0.1;
        }

        .btn-shine {
          position: absolute;
          inset: 0;
          background: linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent);
          border-radius: 0.75rem;
          transform: translateX(-100%);
          transition: transform 0.5s ease-out;
        }
        .contact-email-btn:hover .btn-shine,
        .contact-email-btn:focus-visible .btn-shine {
          transform: translateX(100%);
        }

        .btn-icon {
          position: relative;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2.5rem;
          height: 2.5rem;
          background: linear-gradient(to bottom right, #9eff2e, #00d4ff);
          border-radius: 0.5rem;
          color: #18181b;
          transition: transform 0.3s ease-out;
        }
        .contact-email-btn:hover .btn-icon,
        .contact-email-btn:focus-visible .btn-icon {
          transform: scale(1.1) rotate(3deg);
        }
        .icon-svg {
          width: 1.25rem;
          height: 1.25rem;
        }
        @media (min-width: 768px) {
          .icon-svg { width: 1.5rem; height: 1.5rem; }
        }

        .icon-pulse {
          position: absolute;
          inset: 0;
          border-radius: 0.5rem;
          border: 2px solid #9eff2e;
          opacity: 0;
          transform: scale(0.9);
          transition: opacity 0.3s ease-out, transform 0.3s ease-out;
        }
        .contact-email-btn:hover .icon-pulse,
        .contact-email-btn:focus-visible .icon-pulse {
          opacity: 1;
          transform: scale(1.1);
        }

        .btn-text-content {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.125rem;
          text-align: left;
          min-width: 180px;
        }

        .btn-main-label {
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          font-size: 0.875rem;
          font-weight: 700;
          color: white;
          transition: transform 0.3s ease-out;
        }
        .contact-email-btn:hover .btn-main-label,
        .contact-email-btn:focus-visible .btn-main-label {
          transform: translateX(0.25rem);
        }
        @media (min-width: 768px) {
          .btn-main-label { font-size: 1rem; }
        }

        .btn-revealed-label {
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          font-size: 0.75rem;
          font-weight: 500;
          color: #9eff2e;
          opacity: 0;
          visibility: hidden;
          transform: translateY(0.5rem);
          transition: opacity 0.3s ease-out, visibility 0.3s ease-out, transform 0.3s ease-out;
          white-space: nowrap;
        }
        .btn-revealed-label.visible {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }
        @media (min-width: 768px) {
          .btn-revealed-label { font-size: 0.875rem; }
        }

        .revealed-arrow {
          display: inline-block;
          transition: transform 0.3s ease-out;
        }
        .contact-email-btn:hover .revealed-arrow {
          transform: translateX(0.25rem);
        }

        .btn-corner {
          position: absolute;
          width: 1rem;
          height: 1rem;
          border: 2px solid transparent;
          opacity: 0;
          transform: scale(0.5);
          transition: opacity 0.3s ease-out, transform 0.3s ease-out;
        }
        .corner-tl { top: -0.5rem; right: -0.5rem; border-top-color: #9eff2e; border-right-color: #9eff2e; }
        .corner-br { bottom: -0.5rem; left: -0.5rem; border-bottom-color: #00d4ff; border-left-color: #00d4ff; }
        .contact-email-btn:hover .btn-corner,
        .contact-email-btn:focus-visible .btn-corner {
          opacity: 1;
          transform: scale(1);
        }

        .btn-arrow {
          position: relative;
          flex-shrink: 0;
          margin-left: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2rem;
          height: 2rem;
          border: 2px solid rgba(255,255,255,0.3);
          border-radius: 50%;
          background: rgba(255,255,255,0.05);
          transition: transform 0.3s ease-out, background 0.3s ease-out, border-color 0.3s ease-out;
        }
        .contact-email-btn:hover .btn-arrow,
        .contact-email-btn:focus-visible .btn-arrow {
          background: rgba(255,255,255,0.1);
          border-color: rgba(255,255,255,0.6);
          transform: scale(1.05) rotate(45deg);
        }
        @media (min-width: 768px) {
          .btn-arrow { width: 2.5rem; height: 2.5rem; }
        }
        .arrow-svg {
          width: 1rem;
          height: 1rem;
          color: rgba(255,255,255,0.6);
          transition: color 0.3s;
        }
        .contact-email-btn:hover .arrow-svg {
          color: white;
        }
        @media (min-width: 768px) {
          .arrow-svg { width: 1.25rem; height: 1.25rem; }
        }

        /* Resume Button Styles */
        .resume-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem 2rem;
          min-width: 220px;
          border: 2px solid white;
          background: white;
          border-radius: 0.75rem;
          cursor: pointer;
          user-select: none;
          text-decoration: none;
          transition: transform 0.3s ease-out, box-shadow 0.3s ease-out;
          will-change: transform, box-shadow;
          box-shadow: 4px 4px 0px 0px rgb(0,0,0);
          transform: translateY(0) scale(1);
        }
        
        .resume-btn:hover,
        .resume-btn:focus-visible {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 
            0 20px 40px -10px rgba(255, 255, 255, 0.2), 
            0 0 0 1px rgba(255, 255, 255, 0.3), 
            8px 8px 0px 0px rgb(0,0,0);
          outline: none;
        }
        
        .resume-btn:focus-visible {
          ring: 4px;
          ring-color: rgba(255, 255, 255, 0.4);
          ring-offset: 2px;
          ring-offset-color: #18181b;
        }

        .resume-bg-sweep {
          position: absolute;
          inset: 0;
          background: #18181b;
          border-radius: 0.75rem;
          opacity: 0;
          transition: opacity 0.3s;
        }
        .resume-btn:hover .resume-bg-sweep,
        .resume-btn:focus-visible .resume-bg-sweep {
          opacity: 1;
        }

        .resume-shine {
          position: absolute;
          inset: 0;
          background: linear-gradient(to right, transparent, rgba(24,24,27,0.2), transparent);
          border-radius: 0.75rem;
          transform: translateX(-100%);
          transition: transform 0.5s ease-out;
        }
        .resume-btn:hover .resume-shine,
        .resume-btn:focus-visible .resume-shine {
          transform: translateX(100%);
        }

        .resume-icon {
          position: relative;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2.5rem;
          height: 2.5rem;
          background: #18181b;
          color: white;
          border-radius: 0.5rem;
          transition: transform 0.3s ease-out;
        }
        .resume-btn:hover .resume-icon,
        .resume-btn:focus-visible .resume-icon {
          transform: scale(1.1) rotate(3deg);
        }
        .icon-svg {
          width: 1.25rem;
          height: 1.25rem;
        }
        @media (min-width: 768px) {
          .icon-svg { width: 1.5rem; height: 1.5rem; }
        }

        .icon-pulse {
          position: absolute;
          inset: 0;
          border-radius: 0.5rem;
          border: 2px solid white;
          opacity: 0;
          transform: scale(0.9);
          transition: opacity 0.3s ease-out, transform 0.3s ease-out;
        }
        .resume-btn:hover .icon-pulse,
        .resume-btn:focus-visible .icon-pulse {
          opacity: 1;
          transform: scale(1.1);
        }

        .resume-text-content {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.125rem;
          text-align: left;
          min-width: 140px;
        }

        .resume-main-label {
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          font-size: 0.875rem;
          font-weight: 700;
          color: #18181b;
          transition: transform 0.3s ease-out;
        }
        .resume-btn:hover .resume-main-label,
        .resume-btn:focus-visible .resume-main-label {
          transform: translateX(0.25rem);
        }
        @media (min-width: 768px) {
          .resume-main-label { font-size: 1rem; }
        }

        .resume-revealed-label {
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          font-size: 0.75rem;
          font-weight: 500;
          color: #71717a;
          opacity: 0;
          visibility: hidden;
          transform: translateY(0.5rem);
          transition: opacity 0.3s ease-out, visibility 0.3s ease-out, transform 0.3s ease-out;
          white-space: nowrap;
        }
        .resume-revealed-label.visible {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }
        @media (min-width: 768px) {
          .resume-revealed-label { font-size: 0.875rem; }
        }

        .resume-corner {
          position: absolute;
          width: 1rem;
          height: 1rem;
          border: 2px solid transparent;
          opacity: 0;
          transform: scale(0.5);
          transition: opacity 0.3s ease-out, transform 0.3s ease-out;
        }
        .corner-tl { top: -0.5rem; right: -0.5rem; border-top-color: white; border-right-color: white; }
        .corner-br { bottom: -0.5rem; left: -0.5rem; border-bottom-color: #18181b; border-left-color: #18181b; }
        .resume-btn:hover .resume-corner,
        .resume-btn:focus-visible .resume-corner {
          opacity: 1;
          transform: scale(1);
        }

        /* Mobile/Touch optimizations - disable hover effects on touch devices */
        @media (hover: none) and (pointer: coarse) {
          .contact-email-btn:hover,
          .resume-btn:hover {
            transform: translateY(0) scale(1) !important;
            box-shadow: 4px 4px 0px 0px rgb(255,255,255) !important;
          }
          .contact-email-btn:hover .btn-main-label,
          .contact-email-btn:hover .revealed-arrow,
          .contact-email-btn:hover .btn-icon,
          .contact-email-btn:hover .btn-arrow,
          .contact-email-btn:hover .btn-corner,
          .contact-email-btn:hover .icon-pulse,
          .contact-email-btn:hover .btn-bg-sweep,
          .contact-email-btn:hover .btn-shine {
            transform: none !important;
            opacity: 0 !important;
            background: none !important;
            border-color: transparent !important;
          }
          .contact-email-btn:hover .btn-revealed-label {
            opacity: 0 !important;
            visibility: hidden !important;
          }
          .resume-btn:hover .resume-main-label,
          .resume-btn:hover .resume-icon,
          .resume-btn:hover .resume-corner,
          .resume-btn:hover .icon-pulse,
          .resume-btn:hover .resume-bg-sweep,
          .resume-btn:hover .resume-shine {
            transform: none !important;
            opacity: 0 !important;
          }
          .resume-btn:hover .resume-revealed-label {
            opacity: 0 !important;
            visibility: hidden !important;
          }
        }
        @media (max-width: 768px) {
          .contact-email-btn,
          .resume-btn {
            backdrop-filter: none !important;
            -webkit-backdrop-filter: none !important;
          }
        }

        @keyframes slowRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
      <main id="home" className="relative w-screen h-screen min-h-screen overflow-hidden bg-[#1f1f1f] text-white flex flex-col justify-between items-center select-none">
        <Sidebar />
      {/* 2. Neon-lime green flowing contour lines (top & upper-right) - OPTIMIZED: 2 paths instead of 7 */}
      <div className="absolute -top-1 -right-1 w-[60vw] md:w-[56vw] lg:w-[52vw] h-[52vh] min-h-[300px] pointer-events-none select-none z-0 overflow-visible">
        <svg
          viewBox="110 -25 550 430"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-full overflow-visible"
          style={{ willChange: "transform" }}
        >
          <g>
            <path d="M 660 137 L 575 137 C 550 135, 500 130, 450 125 C 400 120, 350 115, 300 110 C 250 105, 200 100, 150 95 C 100 90, 50 85, 0 80 L 0 -30" stroke="#9eff2e" strokeWidth="2.2" strokeLinecap="round" opacity="0.6" />
            <path d="M 660 200 L 575 200 C 550 198, 500 193, 450 188 C 400 183, 350 178, 300 173 C 250 168, 200 163, 150 158 C 100 153, 50 148, 0 143 L 0 -30" stroke="#9eff2e" strokeWidth="1.8" strokeLinecap="round" opacity="0.4" />
          </g>
        </svg>
      </div>

      {/* 7. Angular grey polygon shape (left-middle edge) */}
      <div className="absolute -left-1 top-[38%] -translate-y-1/2 w-[15vw] min-w-[110px] max-w-[220px] h-[32vh] min-h-[180px] max-h-[340px] pointer-events-none select-none z-0 overflow-visible">
        <svg
          viewBox="0 0 145 290"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full overflow-visible"
          preserveAspectRatio="none"
          style={{ animation: "slowRotate 30s linear infinite", transformOrigin: "center", willChange: "transform" }}
        >
          <polygon points="-10,-10 145,155 -10,300" fill="#636363" />
        </svg>
      </div>

      {/* 7. Angular grey polygon shape (lower-right edge) */}
      <div className="absolute -right-1 bottom-[13%] w-[17vw] min-w-[130px] max-w-[260px] h-[32vh] min-h-[180px] max-h-[340px] pointer-events-none select-none z-0 overflow-visible">
        <svg
          viewBox="0 0 155 285"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full overflow-visible"
          preserveAspectRatio="none"
        >
          <polygon points="165,-10 0,130 165,295" fill="#636363" />
        </svg>
      </div>

      {/* 6. Pristine flowing contour lines (lower-left & bottom) - OPTIMIZED: 3 paths instead of 11 */}
      <div className="absolute -bottom-1 -left-1 w-[55vw] md:w-[52vw] lg:w-[48vw] h-[52vh] min-h-[300px] pointer-events-none select-none z-0 overflow-visible">
        <svg
          viewBox="-40 580 500 480"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-full opacity-90 overflow-visible"
          style={{ willChange: "transform" }}
        >
          <g>
            <path d="M -60 760 C 0 760, 100 785, 180 785 C 268 874, 320 1024, 335 1090" stroke="#cfcfcf" strokeWidth="1.9" strokeLinecap="round" opacity="0.5" />
            <path d="M -60 700 C 0 700, 100 733, 212 733 C 340 862, 424 1024, 439 1090" stroke="#cfcfcf" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
            <path d="M -60 640 C 0 640, 100 681, 244 681 C 412 850, 528 1024, 543 1090" stroke="#cfcfcf" strokeWidth="1.2" strokeLinecap="round" opacity="0.2" />
          </g>
        </svg>
      </div>

      {/* Top spacer for balanced vertical alignment */}
      <div className="w-full h-8 sm:h-14" aria-hidden="true" />

      {/* Center content container */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 sm:px-12 text-center my-auto max-w-4xl">
        {/* 3. Oversized, bold, white heading stacked on 2 lines */}
        <h1 className="font-heading font-black text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[6.75rem] leading-[0.98] tracking-[-0.03em] text-center select-none">
          <div className="whitespace-nowrap">Sahil Jain ,</div>
          <div className="whitespace-nowrap">Programmer</div>
        </h1>

        {/* 4. Typewriter-animated subtitle */}
        <TypewriterText />

        {/* Interactive Email Contact Button - Split Action */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
          <ContactEmailButton />
          <ResumeButton />
        </div>

        {/* Made with love text */}
        <p className="font-mono text-xs sm:text-sm text-[#9eff2e] mt-6 tracking-wider uppercase opacity-80">
          made with love
        </p>

      </div>

      {/* 8. Elegant white cursive "Sahiljain" signature near bottom center */}
      <footer className="relative z-10 pb-8 sm:pb-12 pt-4 flex flex-col items-center justify-center select-none">
        <span className="font-signature text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] text-white font-normal tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] inline-block">
          Sahiljain
        </span>
      </footer>
    </main>
    </>
  );
}

function ContactEmailButton() {
  const [isHovered, setIsHovered] = useState(false);
  const isNavigatingRef = useRef(false);

  const gmailUrl = "https://mail.google.com/mail/?view=cm&fs=1&to=sahilj4218%40gmail.com";

  const handleMouseDown = () => {
    isNavigatingRef.current = true;
    // Reset after navigation completes or user returns
    setTimeout(() => { isNavigatingRef.current = false; }, 500);
  };

  const handleMouseEnter = () => { if (!isNavigatingRef.current) setIsHovered(true); };
  const handleMouseLeave = () => { if (!isNavigatingRef.current) setIsHovered(false); };

  return (
    <div className="relative mt-12 flex items-center justify-center">
      <a
        href={gmailUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseDown={handleMouseDown}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        aria-label="Send me an email via Gmail"
        className="contact-email-btn"
      >
        {/* Animated background sweep - simplified */}
        <span className="btn-bg-sweep" aria-hidden="true" />
        
        {/* Shine effect on hover - simplified */}
        <span className="btn-shine" aria-hidden="true" />

        {/* Mail Icon */}
        <span className="btn-icon" aria-hidden="true">
          <svg className="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="M22 6L12 13L2 6" />
          </svg>
          {/* Icon pulse ring on hover */}
          <span className="icon-pulse" aria-hidden="true" />
        </span>

        {/* Button Text Content */}
        <span className="btn-text-content">
          {/* Main Label */}
          <span className="btn-main-label">
            Let&apos;s Connect
          </span>
          
          {/* Revealed Label on Hover - controlled by JS state */}
          <span className={`btn-revealed-label ${isHovered ? "visible" : ""}`}>
            Email Me <span className="revealed-arrow">↗</span>
          </span>
        </span>

        {/* Corner Accents */}
        <span className="btn-corner corner-tl" aria-hidden="true" />
        <span className="btn-corner corner-br" aria-hidden="true" />

        {/* Subtle arrow indicator */}
        <span className="btn-arrow" aria-hidden="true">
          <svg className="arrow-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </span>
      </a>

      <style jsx>{`
        .contact-email-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem 2rem;
          min-width: 280px;
          border: 2px solid white;
          background: rgba(17, 17, 17, 0.8);
          border-radius: 0.75rem;
          cursor: pointer;
          user-select: none;
          text-decoration: none;
          transition: transform 0.3s ease-out, box-shadow 0.3s ease-out;
          will-change: transform, box-shadow;
          box-shadow: 4px 4px 0px 0px rgb(255,255,255);
          transform: translateY(0) scale(1);
        }
        
        .contact-email-btn:hover,
        .contact-email-btn:focus-visible {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 
            0 20px 40px -10px rgba(158, 255, 46, 0.15), 
            0 0 0 1px rgba(158, 255, 46, 0.2), 
            8px 8px 0px 0px rgb(255,255,255);
          outline: none;
        }
        
        .contact-email-btn:focus-visible {
          ring: 4px;
          ring-color: rgba(158, 255, 46, 0.4);
          ring-offset: 2px;
          ring-offset-color: #18181b;
        }

        .btn-bg-sweep {
          position: absolute;
          inset: 0;
          background: linear-gradient(to right, #9eff2e, #00d4ff, #ff6b9d);
          border-radius: 0.75rem;
          opacity: 0;
          transition: opacity 0.3s;
        }
        .contact-email-btn:hover .btn-bg-sweep,
        .contact-email-btn:focus-visible .btn-bg-sweep {
          opacity: 0.1;
        }

        .btn-shine {
          position: absolute;
          inset: 0;
          background: linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent);
          border-radius: 0.75rem;
          transform: translateX(-100%);
          transition: transform 0.5s ease-out;
        }
        .contact-email-btn:hover .btn-shine,
        .contact-email-btn:focus-visible .btn-shine {
          transform: translateX(100%);
        }

        .btn-icon {
          position: relative;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2.5rem;
          height: 2.5rem;
          background: linear-gradient(to bottom right, #9eff2e, #00d4ff);
          border-radius: 0.5rem;
          color: #18181b;
          transition: transform 0.3s ease-out;
        }
        .contact-email-btn:hover .btn-icon,
        .contact-email-btn:focus-visible .btn-icon {
          transform: scale(1.1) rotate(3deg);
        }
        .icon-svg {
          width: 1.25rem;
          height: 1.25rem;
        }
        @media (min-width: 768px) {
          .icon-svg { width: 1.5rem; height: 1.5rem; }
        }

        .icon-pulse {
          position: absolute;
          inset: 0;
          border-radius: 0.5rem;
          border: 2px solid #9eff2e;
          opacity: 0;
          transform: scale(0.9);
          transition: opacity 0.3s ease-out, transform 0.3s ease-out;
        }
        .contact-email-btn:hover .icon-pulse,
        .contact-email-btn:focus-visible .icon-pulse {
          opacity: 1;
          transform: scale(1.1);
        }

        .btn-text-content {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.125rem;
          text-align: left;
          min-width: 180px;
        }

        .btn-main-label {
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          font-size: 0.875rem;
          font-weight: 700;
          color: white;
          transition: transform 0.3s ease-out;
        }
        .contact-email-btn:hover .btn-main-label,
        .contact-email-btn:focus-visible .btn-main-label {
          transform: translateX(0.25rem);
        }
        @media (min-width: 768px) {
          .btn-main-label { font-size: 1rem; }
        }

        .btn-revealed-label {
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          font-size: 0.75rem;
          font-weight: 500;
          color: #9eff2e;
          opacity: 0;
          visibility: hidden;
          transform: translateY(0.5rem);
          transition: opacity 0.3s ease-out, visibility 0.3s ease-out, transform 0.3s ease-out;
          white-space: nowrap;
        }
        .btn-revealed-label.visible {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }
        @media (min-width: 768px) {
          .btn-revealed-label { font-size: 0.875rem; }
        }

        .revealed-arrow {
          display: inline-block;
          transition: transform 0.3s ease-out;
        }
        .contact-email-btn:hover .revealed-arrow {
          transform: translateX(0.25rem);
        }

        .btn-corner {
          position: absolute;
          width: 1rem;
          height: 1rem;
          border: 2px solid transparent;
          opacity: 0;
          transform: scale(0.5);
          transition: opacity 0.3s ease-out, transform 0.3s ease-out;
        }
        .corner-tl { top: -0.5rem; right: -0.5rem; border-top-color: #9eff2e; border-right-color: #9eff2e; }
        .corner-br { bottom: -0.5rem; left: -0.5rem; border-bottom-color: #00d4ff; border-left-color: #00d4ff; }
        .contact-email-btn:hover .btn-corner,
        .contact-email-btn:focus-visible .btn-corner {
          opacity: 1;
          transform: scale(1);
        }

        .btn-arrow {
          position: relative;
          flex-shrink: 0;
          margin-left: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2rem;
          height: 2rem;
          border: 2px solid rgba(255,255,255,0.3);
          border-radius: 50%;
          background: rgba(255,255,255,0.05);
          transition: transform 0.3s ease-out, background 0.3s ease-out, border-color 0.3s ease-out;
        }
        .contact-email-btn:hover .btn-arrow,
        .contact-email-btn:focus-visible .btn-arrow {
          background: rgba(255,255,255,0.1);
          border-color: rgba(255,255,255,0.6);
          transform: scale(1.05) rotate(45deg);
        }
        @media (min-width: 768px) {
          .btn-arrow { width: 2.5rem; height: 2.5rem; }
        }
        .arrow-svg {
          width: 1rem;
          height: 1rem;
          color: rgba(255,255,255,0.6);
          transition: color 0.3s;
        }
        .contact-email-btn:hover .arrow-svg {
          color: white;
        }
        @media (min-width: 768px) {
          .arrow-svg { width: 1.25rem; height: 1.25rem; }
        }

        @media (hover: none) and (pointer: coarse) {
          .contact-email-btn:hover {
            transform: translateY(0) scale(1) !important;
            box-shadow: 4px 4px 0px 0px rgb(255,255,255) !important;
          }
          .contact-email-btn:hover .btn-main-label,
          .contact-email-btn:hover .revealed-arrow,
          .contact-email-btn:hover .btn-icon,
          .contact-email-btn:hover .btn-arrow,
          .contact-email-btn:hover .btn-corner,
          .contact-email-btn:hover .icon-pulse,
          .contact-email-btn:hover .btn-bg-sweep,
          .contact-email-btn:hover .btn-shine {
            transform: none !important;
            opacity: 0 !important;
            background: none !important;
            border-color: transparent !important;
          }
          .contact-email-btn:hover .btn-revealed-label {
            opacity: 0 !important;
            visibility: hidden !important;
          }
        }
        @media (max-width: 768px) {
          .contact-email-btn {
            backdrop-filter: none !important;
            -webkit-backdrop-filter: none !important;
          }
        }
      `}</style>
    </div>
  );
}

function ResumeButton() {
  const [isHovered, setIsHovered] = useState(false);
  const isNavigatingRef = useRef(false);

  // Replace with your actual resume URL
  const resumeUrl = "#";

  const handleMouseDown = () => {
    isNavigatingRef.current = true;
    setTimeout(() => { isNavigatingRef.current = false; }, 500);
  };

  const handleMouseEnter = () => { if (!isNavigatingRef.current) setIsHovered(true); };
  const handleMouseLeave = () => { if (!isNavigatingRef.current) setIsHovered(false); };

  return (
    <a
      href={resumeUrl}
      target="_blank"
      rel="noopener noreferrer"
      onMouseDown={handleMouseDown}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label="View my resume"
      className="resume-btn"
    >
      {/* Background sweep */}
      <span className="resume-bg-sweep" aria-hidden="true" />
      
      {/* Shine effect */}
      <span className="resume-shine" aria-hidden="true" />

      {/* Document icon */}
      <span className="resume-icon" aria-hidden="true">
        <svg className="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
        {/* Icon pulse ring */}
        <span className="icon-pulse" aria-hidden="true" />
      </span>

      {/* Button Text */}
      <span className="resume-text-content">
        <span className="resume-main-label">
          View Resume
        </span>
        <span className={`resume-revealed-label ${isHovered ? "visible" : ""}`}>
          PDF ↗
        </span>
      </span>

      {/* Corner accents */}
      <span className="resume-corner corner-tl" aria-hidden="true" />
      <span className="resume-corner corner-br" aria-hidden="true" />
    </a>
  );
}