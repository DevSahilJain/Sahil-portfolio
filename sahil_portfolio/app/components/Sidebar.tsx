"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  FaXTwitter,
  FaGithub,
  FaLinkedinIn,
  FaInstagram,
  FaSpotify,
} from "react-icons/fa6";
import { usePageTransition } from "./PageTransition";

const NAV_ITEMS = [
  { label: "HOME", href: "/", id: "nav-home", accent: "#F2B7AA", accentSoft: "rgba(242,183,170,0.18)", accentBorder: "rgba(242,183,170,0.5)" },
  { label: "SKILLS", href: "/skills", id: "nav-skills", accent: "#BBD4D0", accentSoft: "rgba(187,212,208,0.18)", accentBorder: "rgba(187,212,208,0.5)" },
  { label: "PROJECTS", href: "/projects", id: "nav-projects", accent: "#52748F", accentSoft: "rgba(82,116,143,0.18)", accentBorder: "rgba(82,116,143,0.5)" },
  { label: "CERTIFICATIONS", href: "/certifications", id: "nav-certificates", accent: "#B95F43", accentSoft: "rgba(185,95,67,0.18)", accentBorder: "rgba(185,95,67,0.5)" },
];

const SOCIAL_LINKS = {
  twitter: "https://x.com/Jainwin_sahil",
  github: "https://github.com/DevSahilJain",
  linkedin: "https://www.linkedin.com/in/jainwinsahil?utm_source=share_via&utm_content=profile&utm_medium=member_android",
  instagram: "https://www.instagram.com/jainwin_sahil?dlrf=dWxmdzZrN2hkcnBu",
  spotify: "https://open.spotify.com/playlist/66NuhENVoqkEc5bl2H4ipX?si=k9mbRfK_R461KZbd1WT2dg&utm_source=copy-link",
};

const ACCENT = "#E989FF";
const LIME = "#9eff2e";
const PIXEL_FONT = "'DotGothic16','Silkscreen','Pixelify Sans','Space Mono',monospace";

const CSS_KEYFRAMES = `
@keyframes sbModalIn {
  0%   { opacity: 0; transform: translate(-50%, -50%) scale(0.82); }
  100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
}
@keyframes sbModalOut {
  0%   { opacity: 1; transform: translate(-50%, -50%) scale(1); }
  100% { opacity: 0; transform: translate(-50%, -50%) scale(0.82); }
}
@keyframes sbOverlayIn {
  0%   { opacity: 0; }
  100% { opacity: 1; }
}
@keyframes sbOverlayOut {
  0%   { opacity: 1; }
  100% { opacity: 0; }
}
@keyframes sbItemFlyIn {
  0%   { opacity: 0; transform: translateY(10px); }
  100% { opacity: 1; transform: translateY(0); }
}
@keyframes sbShimmer {
  0%   { background-position: -200% center; }
  100% { background-position: 200% center; }
}
@keyframes sbDotBlink {
  0%,100% { opacity: 1; }
  50%     { opacity: 0.2; }
}
@keyframes folderOpen {
  0%   { transform: translateY(0) scale(1) rotateX(0deg); box-shadow: 0 4px 20px rgba(0,0,0,0.3); }
  50%  { transform: translateY(-8px) scale(1.02) rotateX(5deg); box-shadow: 0 16px 40px rgba(0,0,0,0.4), 0 0 30px var(--folder-accent); }
  100% { transform: translateY(-4px) scale(1.01) rotateX(2deg); box-shadow: 0 12px 32px rgba(0,0,0,0.35), 0 0 20px var(--folder-accent); }
}
@keyframes folderClose {
  0%   { transform: translateY(-4px) scale(1.01) rotateX(2deg); box-shadow: 0 12px 32px rgba(0,0,0,0.35), 0 0 20px var(--folder-accent); }
  100% { transform: translateY(0) scale(1) rotateX(0deg); box-shadow: 0 4px 20px rgba(0,0,0,0.3); }
}
`;

export default function Sidebar() {
  const router = useRouter();
  const { startTransition } = usePageTransition();
  const [isOpen, setIsOpen] = useState(false);
  const [animState, setAnimState] = useState<"closed"|"opening"|"open"|"closing">("closed");
  const [activeNav, setActiveNav] = useState<string|null>(null);
  const [openingFolder, setOpeningFolder] = useState<string|null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout>|null>(null);
  const animationTimer = useRef<ReturnType<typeof setTimeout>|null>(null);

  const prefersReducedMotion = typeof window !== "undefined" 
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches 
    : false;

  useEffect(() => {
    if (document.getElementById("sb-keyframes")) return;
    const style = document.createElement("style");
    style.id = "sb-keyframes";
    style.textContent = CSS_KEYFRAMES;
    document.head.appendChild(style);
    return () => { style.remove(); };
  }, []);

  const openSidebar = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setIsOpen(true);
    setAnimState("opening");
    setTimeout(() => setAnimState("open"), 420);
  }, []);

  const closeSidebar = useCallback(() => {
    setAnimState("closing");
    closeTimer.current = setTimeout(() => {
      setIsOpen(false);
      setAnimState("closed");
    }, 360);
  }, []);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape" && isOpen) closeSidebar(); };
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, [isOpen, closeSidebar]);

  const handleNavClick = (href: string, id: string) => {
    if (prefersReducedMotion) {
      setActiveNav(id);
      router.push(href);
      closeSidebar();
      return;
    }

    setOpeningFolder(id);
    setActiveNav(id);

    if (animationTimer.current) clearTimeout(animationTimer.current);
    animationTimer.current = setTimeout(() => {
      setOpeningFolder(null);
      startTransition(href);
      closeSidebar();
    }, 500);
  };

  const panelVisible = isOpen || animState === "closing";

  return (
    <>
      <style>{`
        ${CSS_KEYFRAMES}
        .sb-hamburger-line { transition: width 0.25s ease, background 0.25s ease; }
        .sb-hamburger:hover .sb-hamburger-line:nth-child(1) { width: 22px; background: ${ACCENT}; }
        .sb-hamburger:hover .sb-hamburger-line:nth-child(2) { width: 14px; background: ${ACCENT}88; }
        .sb-hamburger:hover .sb-hamburger-line:nth-child(3) { width: 22px; background: ${ACCENT}; }
        .sb-social-btn { transition: all 0.22s cubic-bezier(0.34,1.56,0.64,1); }
        .sb-social-btn:hover { transform: translateY(-4px) scale(1.12); }
        .sb-close-btn:hover { background: rgba(233,137,255,0.18); color: ${ACCENT}; border-color: rgba(233,137,255,0.4); }
        
        .folder-item {
          perspective: 800px;
        }
        .folder-inner {
          transition: transform 0.35s cubic-bezier(0.34,1.2,0.64,1), box-shadow 0.35s cubic-bezier(0.34,1.2,0.64,1), border-color 0.35s ease;
          transform-style: preserve-3d;
        }
        .folder-item:hover .folder-inner:not(.opening) {
          transform: translateY(-3px) scale(1.015);
        }
        .folder-item.opening .folder-inner {
          animation: folderOpen 0.5s cubic-bezier(0.22,1,0.36,1) forwards;
        }
        
        @media (max-width: 480px) {
          .folder-grid {
            grid-template-columns: 1fr !important;
          }
        }
        .folder-item:nth-child(1) .folder-inner { animation: folderStackEnter 0.5s cubic-bezier(0.22,1,0.36,1) 0.1s both; }
        .folder-item:nth-child(2) .folder-inner { animation: folderStackEnter 0.5s cubic-bezier(0.22,1,0.36,1) 0.18s both; }
        .folder-item:nth-child(3) .folder-inner { animation: folderStackEnter 0.5s cubic-bezier(0.22,1,0.36,1) 0.26s both; }
        .folder-item:nth-child(4) .folder-inner { animation: folderStackEnter 0.5s cubic-bezier(0.22,1,0.36,1) 0.34s both; }
        
        @media (max-width: 480px) {
          .folder-stack { gap: 0; }
        }
      `}</style>

      <button
        id="sb-menu-toggle"
        onClick={openSidebar}
        aria-label="Open navigation menu"
        aria-expanded={isOpen}
        aria-controls="sb-modal-panel"
        className="sb-hamburger"
        style={{
          position: "fixed", top: 18, left: 18, zIndex: 60,
          display: "flex", flexDirection: "column", gap: 5,
          width: 42, height: 42, borderRadius: 12,
          background: "rgba(255,255,255,0.06)",
          backdropFilter: "blur(16px) saturate(140%)",
          WebkitBackdropFilter: "blur(16px) saturate(140%)",
          border: "1px solid rgba(255,255,255,0.14)",
          cursor: "pointer", transition: "all 0.25s ease",
        }}
      >
        <span className="sb-hamburger-line" style={{ display:"block", width:20, height:1.5, background:"#fff", borderRadius:2 }} />
        <span className="sb-hamburger-line" style={{ display:"block", width:15, height:1.5, background:"rgba(255,255,255,0.55)", borderRadius:2 }} />
        <span className="sb-hamburger-line" style={{ display:"block", width:20, height:1.5, background:"#fff", borderRadius:2 }} />
      </button>

      {panelVisible && (
        <div
          id="sb-overlay"
          onClick={closeSidebar}
          aria-hidden="true"
          style={{
            position: "fixed", inset: 0, zIndex: 55,
            background: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            animation: animState === "closing" ? "sbOverlayOut 0.3s ease forwards" : "sbOverlayIn 0.35s ease forwards",
          }}
        />
      )}

      {panelVisible && (
        <nav
          id="sb-modal-panel"
          role="navigation"
          aria-label="Main navigation"
          aria-hidden={!isOpen}
          style={{
            position: "fixed", top: "50%", left: "50%",
            width: 420, maxWidth: "92vw", maxHeight: "88vh",
            minHeight: 520,
            transform: animState === "closing"
              ? "translate(-50%, -50%) scale(0.82)"
              : "translate(-50%, -50%)",
            animation: animState === "opening" || animState === "open"
              ? "sbModalIn 0.42s cubic-bezier(0.22,1,0.36,1) forwards"
              : animState === "closing"
                ? "sbModalOut 0.32s cubic-bezier(0.55,0,0.88,0.6) forwards"
                : "none",
            zIndex: 70,
            display: "flex", flexDirection: "column",
            background: "rgba(14,14,14,0.42)",
            backdropFilter: "blur(28px) saturate(170%)",
            WebkitBackdropFilter: "blur(28px) saturate(170%)",
            border: "1px solid rgba(255,255,255,0.14)",
            borderRadius: 24,
            overflow: "hidden",
            boxShadow: `0 24px 80px rgba(0,0,0,0.6), 0 0 0 1px ${ACCENT}15, inset 0 0 40px rgba(255,255,255,0.03)`,
          }}
        >
          <div aria-hidden="true" style={{
            position: "absolute", top: 0, left: 0, right: 0, height: 2.5,
            background: `linear-gradient(90deg,transparent,${LIME}70 35%,${ACCENT} 65%,transparent)`,
            backgroundSize: "200% 100%",
            animation: "sbShimmer 5s linear infinite",
            zIndex: 0,
          }} />

          <div aria-hidden="true" style={{
            position: "absolute", top: -30, right: -30,
            width: 110, height: 110, borderRadius: "50%",
            background: `radial-gradient(circle,${ACCENT}20 0%,transparent 70%)`,
            pointerEvents: "none",
          }} />

          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "22px 24px 10px", position: "relative", zIndex: 1,
            animation: "sbItemFlyIn 0.35s 0.06s both",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{
                width: 34, height: 34, borderRadius: 10,
                display: "flex", alignItems: "center", justifyContent: "center",
                background: `linear-gradient(135deg,${ACCENT}28,${LIME}15)`,
                border: `1px solid ${ACCENT}45`,
                boxShadow: `0 0 14px ${ACCENT}20`,
              }}>
                <span className="font-signature" style={{ color: ACCENT, fontSize: 18, lineHeight: 1 }}>S</span>
              </div>
              <div>
                <div style={{ fontFamily: PIXEL_FONT, color: ACCENT, fontSize: 14, letterSpacing: "0.06em", lineHeight: 1.1 }}>
                  SAHIL JAIN
                </div>
                <div style={{ fontFamily: PIXEL_FONT, color: "rgba(255,255,255,0.28)", fontSize: 9, letterSpacing: "0.12em", marginTop: 2 }}>
                  PORTFOLIO
                </div>
              </div>
            </div>

            <button
              id="sb-close-btn"
              onClick={closeSidebar}
              aria-label="Close navigation menu"
              className="sb-close-btn"
              style={{
                width: 34, height: 34, borderRadius: 10,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "rgba(255,255,255,0.45)", background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                cursor: "pointer", transition: "all 0.2s ease",
              }}
            >
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                <path d="M1 1L12 12M12 1L1 12" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
              </svg>
            </button>
          </div>

          <div aria-hidden="true" style={{
            margin: "0 24px 10px", height: 1,
            background: `linear-gradient(90deg,transparent,${ACCENT}30 50%,transparent)`,
            animation: "sbItemFlyIn 0.35s 0.12s both",
          }} />

          <div style={{
            padding: "0 20px 8px", animation: "sbItemFlyIn 0.35s 0.2s both", position: "relative", zIndex: 1,
          }}>
            <div className="folder-grid" style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 12,
              width: "100%",
            }}>
              {NAV_ITEMS.map((item, i) => (
                <FolderItem
                  key={item.id}
                  item={item}
                  index={i}
                  isActive={activeNav === item.id}
                  isOpening={openingFolder === item.id}
                  onClick={() => handleNavClick(item.href, item.id)}
                />
              ))}
            </div>
          </div>

          <div style={{
            padding: "6px 24px 20px", position: "relative", zIndex: 1,
            animation: "sbItemFlyIn 0.35s 0.4s both",
          }}>
            <div aria-hidden="true" style={{
              marginBottom: 10, height: 1,
              background: `linear-gradient(90deg,transparent,${ACCENT}25 50%,transparent)`,
            }} />

            <div role="list" aria-label="Social media links"
              style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
              <SocialIcon id="social-twitter" href={SOCIAL_LINKS.twitter} label="Twitter / X" hoverColor="#1DA1F2"><FaXTwitter size={15}/></SocialIcon>
              <SocialIcon id="social-github" href={SOCIAL_LINKS.github} label="GitHub" hoverColor={LIME}><FaGithub size={15}/></SocialIcon>
              <SocialIcon id="social-linkedin" href={SOCIAL_LINKS.linkedin} label="LinkedIn" hoverColor="#0A66C2"><FaLinkedinIn size={15}/></SocialIcon>
              <SocialIcon id="social-instagram" href={SOCIAL_LINKS.instagram} label="Instagram" hoverColor="#E1306C"><FaInstagram size={15}/></SocialIcon>
              <SocialIcon id="social-spotify" href={SOCIAL_LINKS.spotify} label="Spotify" hoverColor="#1DB954"><FaSpotify size={15}/></SocialIcon>
            </div>

            <div style={{ marginTop: 14, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
              <span className="font-moontime" style={{ color: "#fff", fontSize: 11, letterSpacing: "0.08em", textShadow: "0 0 8px #fff, 0 0 16px #fff, 0 0 24px rgba(255,255,255,0.5)" }}>
                © 2026 SAHIL JAIN
              </span>
            </div>
          </div>

          <div aria-hidden="true" style={{
            position: "absolute", bottom: 0, left: 0, right: 0, height: 2,
            background: `linear-gradient(90deg,transparent,${ACCENT}50 60%,${LIME}40,transparent)`,
          }} />
        </nav>
      )}
    </>
  );
}

interface FolderItemProps {
  item: typeof NAV_ITEMS[0];
  index: number;
  isActive: boolean;
  isOpening: boolean;
  onClick: () => void;
}

function FolderItem({ item, index, isActive, isOpening, onClick }: FolderItemProps) {
  const [hovered, setHovered] = useState(false);
  const isInteractive = hovered || isOpening || isActive;

  const tabPosition = index % 2 === 0 ? "left" : "right";

  return (
    <div
      className={`folder-item ${isOpening ? "opening" : ""}`}
      style={{
        animationDelay: `${0.24 + index * 0.06}s`,
        perspective: "800px",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onClick(); }}}
      aria-label={`Navigate to ${item.label}`}
      aria-pressed={isActive}
    >
      <div className="folder-inner" style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: 110,
        padding: "24px 16px 16px",
        borderRadius: "16px 16px 12px 12px",
        background: isInteractive
          ? `linear-gradient(180deg, ${item.accentSoft} 0%, ${item.accentSoft} 35%, rgba(255,255,255,0.025) 35%, rgba(255,255,255,0.025) 100%)`
          : "rgba(255,255,255,0.025)",
        border: `1px solid ${isInteractive ? item.accentBorder : "rgba(255,255,255,0.06)"}`,
        boxShadow: isInteractive
          ? `0 12px 32px rgba(0,0,0,0.35), 0 0 20px ${item.accent}30, inset 0 1px 0 rgba(255,255,255,0.04)`
          : "0 4px 20px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.02)",
        cursor: "pointer",
        transition: "all 0.35s cubic-bezier(0.34,1.2,0.64,1)",
        transformStyle: "preserve-3d",
        clipPath: tabPosition === "left"
          ? "polygon(0 22px, 22px 22px, 22px 0, calc(100% - 4px) 0, calc(100% - 4px) calc(100% - 4px), 4px calc(100% - 4px), 4px 22px, 0 22px)"
          : "polygon(0 0, calc(100% - 22px) 0, calc(100% - 22px) 22px, calc(100% - 4px) 22px, calc(100% - 4px) calc(100% - 4px), 4px calc(100% - 4px), 4px 22px, 0 22px)",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute",
          top: 0,
          left: tabPosition === "left" ? 0 : "auto",
          right: tabPosition === "right" ? 0 : "auto",
          width: 80,
          height: 22,
          background: isInteractive
            ? `linear-gradient(180deg, ${item.accent} 0%, ${item.accent}dd 100%)`
            : "rgba(255,255,255,0.04)",
          borderRadius: tabPosition === "left" ? "0 0 0 12px" : "0 0 12px 0",
          borderBottom: `1px solid ${isInteractive ? item.accentBorder : "rgba(255,255,255,0.08)"}`,
          borderLeft: tabPosition === "left" ? `1px solid ${isInteractive ? item.accentBorder : "rgba(255,255,255,0.08)"}` : "none",
          borderRight: tabPosition === "right" ? `1px solid ${isInteractive ? item.accentBorder : "rgba(255,255,255,0.08)"}` : "none",
          boxShadow: isInteractive
            ? `inset 0 1px 0 rgba(255,255,255,0.1), 0 2px 8px ${item.accent}30`
            : "inset 0 1px 0 rgba(255,255,255,0.03)",
          zIndex: 2,
          transition: "all 0.3s ease",
          clipPath: tabPosition === "left"
            ? "polygon(0 0, 100% 0, 100% 100%, 12px 100%, 12px 4px, 0 4px)"
            : "polygon(0 0, 100% 0, calc(100% - 12px) 4px, calc(100% - 12px) 100%, 0 100%)",
        }} />
        
        <span style={{
          fontFamily: PIXEL_FONT,
          fontSize: 13,
          fontWeight: "700",
          letterSpacing: "0.1em",
          color: isInteractive ? "#fff" : "rgba(255,255,255,0.55)",
          textShadow: isInteractive ? `0 0 12px ${item.accent}60` : "none",
          transition: "all 0.3s ease",
          position: "relative",
          zIndex: 1,
          marginTop: 4,
        }}>
          {item.label}
        </span>
        
        {isActive && (
          <div style={{
            position: "absolute",
            bottom: 10,
            left: "50%",
            transform: "translateX(-50%)",
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: item.accent,
            boxShadow: `0 0 14px ${item.accent}, 0 0 28px ${item.accent}60`,
            animation: "sbDotBlink 1.8s ease-in-out infinite",
          }} />
        )}
      </div>
    </div>
  );
}

interface SocialIconProps {
  id: string; href: string; label: string; hoverColor: string; children: React.ReactNode;
}

function SocialIcon({ id, href, label, hoverColor, children }: SocialIconProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <a id={id} href={href} target="_blank" rel="noopener noreferrer"
      aria-label={label} role="listitem" className="sb-social-btn"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        width: 42, height: 42, borderRadius: 11, textDecoration: "none",
        color: hovered ? hoverColor : "rgba(255,255,255,0.4)",
        background: hovered ? `${hoverColor}1a` : "rgba(255,255,255,0.04)",
        border: `1px solid ${hovered ? `${hoverColor}50` : "rgba(255,255,255,0.07)"}`,
        boxShadow: hovered ? `0 4px 20px ${hoverColor}30` : "none",
      }}
    >
      {children}
    </a>
  );
}