"use client";

import { useEffect, useState } from "react";
import { INTRO_FLAG } from "@/lib/intro";
import { siteName } from "@/data/profile";

const LOG_BOOT = "INITIALIZING SPACE…";
const LOG_STARS = "CALIBRATING STARS…";
const LOG_READY = "SPACE READY";
const LOG_WELCOME = "欢迎进入";
const LOG_BACK = "WELCOME BACK";

/**
 * 轻量 Intro：siteName + 0→100% 计数 + 启动日志，计数时长不延长。
 * 时序：INITIALIZING(前半) → CALIBRATING(后半) → SPACE READY → 欢迎进入（淡出）
 * 回访者（同会话第二次进入）：仅显示 WELCOME BACK 轻量闪现；
 * reduced motion 下完全跳过。内容在遮罩下正常渲染（不阻塞、不影响 SEO）。
 */
export default function Intro() {
  const [phase, setPhase] = useState<"show" | "fade" | "done">("show");
  const [count, setCount] = useState(0);
  const [log, setLog] = useState(LOG_BOOT);
  const [welcome, setWelcome] = useState(false);

  useEffect(() => {
    const timers: number[] = [];
    const push = (fn: () => void, ms: number) =>
      timers.push(window.setTimeout(fn, ms));

    // 回访者：轻量 WELCOME BACK，不重播计数
    if (window.sessionStorage.getItem(INTRO_FLAG)) {
      push(() => setWelcome(true), 0);
      push(() => setPhase("fade"), 650);
      push(() => setPhase("done"), 1200);
      return () => timers.forEach((id) => window.clearTimeout(id));
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      push(() => {
        window.sessionStorage.setItem(INTRO_FLAG, "1");
        setPhase("done");
      }, 0);
      return () => timers.forEach((id) => window.clearTimeout(id));
    }

    const mobile = window.matchMedia("(max-width: 768px)").matches;
    const duration = mobile ? 600 : 950;
    const t0 = performance.now();

    const fadeOut = () => {
      window.sessionStorage.setItem(INTRO_FLAG, "1");
      setPhase("fade");
    };

    const step = () => {
      const t = Math.min(1, (performance.now() - t0) / duration);
      const eased = 1 - Math.pow(1 - t, 2);
      setCount(Math.round(eased * 100));
      setLog(t < 0.5 ? LOG_BOOT : LOG_STARS);
      if (t < 1) timers.push(window.setTimeout(step, 50));
    };

    timers.push(window.setTimeout(step, 50));
    // 兜底时序：到点必须依次进入 READY → 欢迎进入 → 淡出
    timers.push(
      window.setTimeout(() => {
        setCount(100);
        setLog(LOG_READY);
      }, duration + 100),
      window.setTimeout(() => {
        setLog(LOG_WELCOME);
        fadeOut();
      }, duration + 550),
      window.setTimeout(() => setPhase("done"), duration + 1150)
    );

    return () => timers.forEach((id) => window.clearTimeout(id));
  }, []);

  if (phase === "done") return null;

  return (
    <div
      aria-hidden
      className={`fixed inset-0 z-[90] flex flex-col items-center justify-center gap-5 bg-background transition-opacity duration-500 ease-out ${
        phase === "fade" ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <p className="font-mono text-xs uppercase tracking-[0.5em] text-muted">
        {siteName}
      </p>

      {welcome ? (
        <p className="font-mono text-lg tracking-[0.35em] text-accent-3">
          {LOG_BACK}
        </p>
      ) : (
        <>
          <div className="flex items-baseline gap-1.5 font-mono">
            <span className="text-4xl font-semibold tabular-nums text-foreground">
              {count}
            </span>
            <span className="text-sm text-muted">%</span>
          </div>
          <div className="h-px w-44 overflow-hidden bg-line">
            <div
              className="intro-bar h-full bg-accent"
              style={{ "--intro-duration": "950ms" } as React.CSSProperties}
            />
          </div>
        </>
      )}

      {!welcome ? (
        <p
          className={`font-mono text-[11px] tracking-[0.35em] transition-colors duration-300 ${
            log === LOG_READY || log === LOG_WELCOME
              ? "text-accent-3"
              : "text-muted"
          }`}
        >
          {log}
        </p>
      ) : null}
    </div>
  );
}
