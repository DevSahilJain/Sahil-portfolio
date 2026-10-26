"use client";

import React, { useEffect, useRef, useState } from "react";
import Sidebar from "@/app/components/Sidebar";

const HOBBIES = [
  { title: "I am an instrumentalist and vocalist with a deep passion for music, which allows me to express my creativity." },
  { title: "Beyond music, I enjoy playing chess and table tennis, and I have a keen interest in cricket and football." },
  { title: "I love trekking and travelling, exploring new places, experiencing different cultures, and stepping outside my comfort zone." },
  { title: "Alongside these interests, I have a strong curiosity about technology and the technical field, especially exploring new ideas, learning new skills, and building innovative projects. I believe in balancing creativity, strategy, adventure, and technology while constantly learning and growing as a person." },
];

const COLORS = {
  bg: "#080808",
  panel: "#111111",
  panelSecondary: "#181818",
  textPrimary: "#FFFFFF",
  textSecondary: "#B3B3B3",
  accentLime: "#C7FF4A",
  accentPink: "#FF789D",
  accentPurple: "#7950F2",
  borderLight: "#FFFFFF",
  borderDark: "#2D2D2D",
};

export default function AboutPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const hobbiesRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => setIsVisible(true), 100);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "50px" }
    );
    const target = hobbiesRef.current || photoRef.current || quoteRef.current;
    if (target) observer.observe(target);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  const panelStyle = (visible: boolean, delay: number = 0) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(20px)",
    transition: prefersReducedMotion
      ? "none"
      : `opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`,
    willChange: "opacity, transform",
  });

  return (
    <main
      className="min-h-screen relative overflow-y-auto"
      style={{ backgroundColor: COLORS.bg }}
    >
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          opacity: 0.5,
        }}
      />

      <Sidebar />

      <div className="relative z-10 pt-20 pb-16 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <header className="mb-12" style={panelStyle(isVisible, 0)}>
            <p className="font-mono text-xs uppercase tracking-widest mb-2" style={{ color: COLORS.accentLime }}>
              GET TO KNOW ME / 01
            </p>
            <h1 className="font-heading font-black text-4xl md:text-6xl lg:text-7xl leading-[0.9] tracking-tight" style={{ color: COLORS.textPrimary }}>
              ABOUT ME
            </h1>
          </header>

          <div
            className="grid grid-cols-1 lg:grid-cols-12 gap-6"
            style={{
              gridTemplateAreas: `
                "hobbies hobbies hobbies hobbies hobbies hobbies photo photo photo photo photo photo"
                "quote quote quote quote quote quote quote quote quote quote quote quote"
              `,
            }}
          >
            <section
              ref={hobbiesRef}
              className="lg:col-span-6"
              style={{
                gridArea: "hobbies",
                ...panelStyle(isVisible, 0.1),
              }}
            >
              <div
                className="relative p-6 md:p-8"
                style={{
                  backgroundColor: COLORS.panel,
                  border: `4px solid ${COLORS.borderLight}`,
                  boxShadow: `8px 8px 0px 0px ${COLORS.accentLime}`,
                  transition: prefersReducedMotion
                    ? "none"
                    : "transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
                }}
                onMouseEnter={(e) => {
                  if (!prefersReducedMotion) {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = `12px 12px 0px 0px ${COLORS.accentLime}`;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!prefersReducedMotion) {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = `8px 8px 0px 0px ${COLORS.accentLime}`;
                  }
                }}
              >
                <div
                  className="absolute -top-4 -left-4 w-8 h-8"
                  style={{
                    backgroundColor: COLORS.accentLime,
                    border: `4px solid ${COLORS.borderLight}`,
                  }}
                />
                <div
                  className="absolute -bottom-4 -right-4 w-8 h-8"
                  style={{
                    backgroundColor: COLORS.accentPink,
                    border: `4px solid ${COLORS.borderLight}`,
                  }}
                />

                <h2 className="font-heading font-bold text-xl md:text-2xl uppercase tracking-tight mb-8" style={{ color: COLORS.textPrimary }}>
                  HOBBIES & INTERESTS
                </h2>

                <ul className="space-y-6" role="list">
                  {HOBBIES.map((hobby, index) => (
                    <li
                      key={index}
                      style={{
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible ? "translateX(0)" : "translateX(-20px)",
                        transition: prefersReducedMotion
                          ? "none"
                          : `opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1) ${0.2 + index * 0.1}s, transform 0.5s cubic-bezier(0.22, 1, 0.36, 1) ${0.2 + index * 0.1}s`,
                      }}
                    >
                      <p className="font-heading font-medium text-lg md:text-xl leading-relaxed" style={{ color: COLORS.textPrimary }}>
                        {hobby.title}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section
              ref={photoRef}
              className="lg:col-span-6"
              style={{
                gridArea: "photo",
                ...panelStyle(isVisible, 0.2),
              }}
            >
              <div className="relative">
                <div
                  className="relative"
                  style={{
                    backgroundColor: COLORS.accentLime,
                    border: `4px solid ${COLORS.borderLight}`,
                    boxShadow: `8px 8px 0px 0px ${COLORS.borderLight}`,
                    aspectRatio: "3/4",
                    overflow: "hidden",
                  }}
                >
                  <div
                    className="absolute inset-0 z-10"
                    style={{
                      border: `4px solid ${COLORS.bg}`,
                      pointerEvents: "none",
                    }}
                  />
                  <img
                    src="/images/about-me.jpg"
                    alt="Sahil Jain"
                    className="w-full h-full object-cover"
                    style={{
                      filter: "grayscale(100%) contrast(1.2)",
                      objectPosition: "40%",
                      transition: prefersReducedMotion
                        ? "none"
                        : "filter 0.4s cubic-bezier(0.22, 1, 0.36, 1), transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
                    }}
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      e.currentTarget.nextElementSibling?.classList.remove("hidden");
                    }}
                  />
                  <div
                    className="hidden absolute inset-0 flex flex-col items-center justify-center"
                    style={{ backgroundColor: COLORS.panelSecondary }}
                  >
                    <span className="font-mono text-xs uppercase tracking-wider mb-2" style={{ color: COLORS.textSecondary }}>
                      YOUR PHOTO HERE
                    </span>
                    <span className="font-heading font-bold text-lg" style={{ color: COLORS.textPrimary }}>
                      Add /images/about-me.jpg
                    </span>
                  </div>
                </div>

                <div
                  className="absolute -bottom-6 -left-6 w-12 h-12 pointer-events-none"
                  style={{
                    backgroundColor: COLORS.accentPink,
                    border: `4px solid ${COLORS.borderLight}`,
                    opacity: 0.3,
                  }}
                />
                <div
                  className="absolute -top-6 -right-6 w-12 h-12 pointer-events-none"
                  style={{
                    backgroundColor: COLORS.accentPurple,
                    border: `4px solid ${COLORS.borderLight}`,
                    opacity: 0.3,
                  }}
                />

                <p className="font-mono text-xs uppercase tracking-widest mt-6 text-center" style={{ color: COLORS.accentLime }}>
                  A LITTLE ABOUT ME
                </p>
              </div>
            </section>

            <section
              ref={quoteRef}
              className="lg:col-span-12"
              style={{
                gridArea: "quote",
                ...panelStyle(isVisible, 0.3),
              }}
            >
              <div
                className="relative p-8 md:p-12 lg:p-16"
                style={{
                  backgroundColor: COLORS.accentPurple,
                  border: `4px solid ${COLORS.bg}`,
                  boxShadow: `8px 8px 0px 0px ${COLORS.bg}`,
                  transition: prefersReducedMotion
                    ? "none"
                    : "transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
                }}
                onMouseEnter={(e) => {
                  if (!prefersReducedMotion) {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = `12px 12px 0px 0px ${COLORS.bg}`;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!prefersReducedMotion) {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = `8px 8px 0px 0px ${COLORS.bg}`;
                  }
                }}
              >
                <div
                  className="absolute -top-4 -left-4 w-10 h-10"
                  style={{
                    backgroundColor: COLORS.accentLime,
                    border: `4px solid ${COLORS.bg}`,
                  }}
                />
                <div
                  className="absolute -bottom-4 -right-4 w-10 h-10"
                  style={{
                    backgroundColor: COLORS.accentPink,
                    border: `4px solid ${COLORS.bg}`,
                  }}
                />

                <p className="font-mono text-xs uppercase tracking-widest mb-6" style={{ color: COLORS.bg }}>
                  A THOUGHT I LIVE BY
                </p>

                <div className="relative">
                  <span
                    className="absolute -top-8 -left-2 font-mono"
                    style={{
                      fontSize: "12rem",
                      lineHeight: 1,
                      color: COLORS.bg,
                      opacity: 0.3,
                      fontWeight: "bold",
                    }}
                    aria-hidden="true"
                  >
                    "
                  </span>

                  <blockquote className="relative z-10">
                    <p className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-[1.1] tracking-tight" style={{ color: COLORS.bg }}>
                      Some dreams don't come true. They still leave behind the discipline to chase new ones, the courage to face failure, and the strength to begin again.
                    </p>
                  </blockquote>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}