"use client";

import { useEffect, useRef, useState } from "react";

interface ScrambleTextProps {
  text: string;
  className?: string;
  /** 单个字符从扰动到落定的总时长 */
  duration?: number;
}

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>{}[]/*";

/** eyebrow/标签字符扰动落定（签名动效：Text Animation — Body / Label） */
export function ScrambleText({ text, className, duration = 700 }: ScrambleTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const rafRef = useRef(0);
  const [output, setOutput] = useState(text);
  const played = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || played.current) return;
        played.current = true;
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const settled = Math.floor(t * text.length);
          let out = text.slice(0, settled);
          for (let i = settled; i < text.length; i++) {
            out += text[i] === " " ? " " : GLYPHS[(Math.random() * GLYPHS.length) | 0];
          }
          setOutput(out);
          if (t < 1) rafRef.current = requestAnimationFrame(tick);
        };
        rafRef.current = requestAnimationFrame(tick);
      },
      { rootMargin: "-40px" }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
  }, [text, duration]);

  return (
    <span ref={ref} className={className}>
      {output}
    </span>
  );
}
