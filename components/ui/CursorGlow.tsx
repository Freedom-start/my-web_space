"use client";

import { useEffect, useRef } from "react";

const INTERACTIVE_SELECTOR =
  "a, button, [role='button'], input, textarea, select, summary";

/**
 * 桌面端克制的光标跟随：保留原生光标，不替换、不遮挡。
 * 小圆点即时跟随，外圈轻微延迟并轻微放大；hover 交互元素时变青色。
 * 仅在 (hover: hover) + (pointer: fine) 且无减动效偏好时启用。
 */
export default function CursorGlow() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const ringInnerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduced.matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const ringInner = ringInnerRef.current;
    if (!dot || !ring || !ringInner) return;
    const dotEl = dot;
    const ringEl = ring;
    const ringInnerEl = ringInner;

    let raf = 0;
    let running = false;
    let px = -100;
    let py = -100;
    let rx = -100;
    let ry = -100;

    function render() {
      rx += (px - rx) * 0.18;
      ry += (py - ry) * 0.18;
      dotEl.style.transform = `translate3d(${px}px, ${py}px, 0)`;
      ringEl.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      raf = requestAnimationFrame(render);
    }

    function start() {
      if (!running) {
        running = true;
        raf = requestAnimationFrame(render);
      }
    }

    function onMove(e: PointerEvent) {
      px = e.clientX;
      py = e.clientY;
      dotEl.style.opacity = "1";
      ringEl.style.opacity = "1";
      const target = e.target as HTMLElement | null;
      const interactive = Boolean(target?.closest?.(INTERACTIVE_SELECTOR));
      ringInnerEl.dataset.state = interactive ? "active" : "idle";
      start();
    }

    function onLeave() {
      dotEl.style.opacity = "0";
      ringEl.style.opacity = "0";
    }

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[70]">
      <div ref={ringRef} className="cursor-ring">
        <div ref={ringInnerRef} data-state="idle" className="cursor-ring-inner" />
      </div>
      <div ref={dotRef} className="cursor-dot" />
    </div>
  );
}
