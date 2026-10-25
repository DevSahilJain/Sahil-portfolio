"use client";

import { useEffect, useState, useRef } from "react";

const FULL_TEXT =
  "I am a curious and aspiring software developer exploring artificial intelligence, programming, and real-world problem-solving through hands-on projects and hackathons. I am continuously developing my technical skills, learning new technologies, and transforming creative ideas into practical solutions while building a strong foundation for my future in technology.";

// How many chars to type per "tick"
const TYPE_SPEED   = 38;  // ms per character
const START_DELAY  = 900; // ms before typing begins
const CURSOR_BLINK = 530; // ms cursor blink interval

export default function TypewriterText() {
  const [displayed, setDisplayed]     = useState("");
  const [done, setDone]               = useState(false);
  const [cursorOn, setCursorOn]       = useState(true);
  const [started, setStarted]         = useState(false);
  const indexRef  = useRef(0);
  const timerRef  = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cursorRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Start typing after initial delay
  useEffect(() => {
    const delay = setTimeout(() => setStarted(true), START_DELAY);
    return () => clearTimeout(delay);
  }, []);

  // Typewriter loop
  useEffect(() => {
    if (!started) return;

    const tick = () => {
      if (indexRef.current < FULL_TEXT.length) {
        indexRef.current += 1;
        setDisplayed(FULL_TEXT.slice(0, indexRef.current));
        timerRef.current = setTimeout(tick, TYPE_SPEED);
      } else {
        setDone(true);
      }
    };

    timerRef.current = setTimeout(tick, 0);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [started]);

  // Cursor blink
  useEffect(() => {
    cursorRef.current = setInterval(
      () => setCursorOn((v) => !v),
      CURSOR_BLINK
    );
    return () => { if (cursorRef.current) clearInterval(cursorRef.current); };
  }, []);

  // After done, stop cursor after 4 s
  useEffect(() => {
    if (!done) return;
    const t = setTimeout(() => {
      if (cursorRef.current) clearInterval(cursorRef.current);
      setCursorOn(false);
    }, 4000);
    return () => clearTimeout(t);
  }, [done]);

  return (
    <p
      className="font-pixel text-[11px] sm:text-[13px] md:text-[14.5px] lg:text-[16px] text-zinc-300 text-center leading-[1.68] mt-6 sm:mt-8 select-none max-w-2xl px-2"
      aria-label={FULL_TEXT}
    >
      {/* Typed characters */}
      <span>{displayed}</span>

      {/* Blinking cursor */}
      <span
        aria-hidden="true"
        style={{
          display: "inline-block",
          width: "2px",
          height: "1.1em",
          background: cursorOn ? "#E989FF" : "transparent",
          marginLeft: "2px",
          verticalAlign: "text-bottom",
          borderRadius: "1px",
          boxShadow: cursorOn ? "0 0 8px #E989FF, 0 0 3px #E989FF" : "none",
          transition: "background 0.08s ease, box-shadow 0.08s ease",
        }}
      />
    </p>
  );
}
