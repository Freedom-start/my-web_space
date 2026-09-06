"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowDown, ArrowUpRight, Rocket } from "lucide-react";
import { GlowButton } from "@/components/ui/GlowButton";
import { Magnetic } from "@/components/ui/Magnetic";
import { INTRO_FLAG } from "@/lib/intro";

const TITLE_LINE_1 = "Building a";
const TITLE_LINE_2 = "Digital Space";
const SUBTITLE_LINES = ["Software Engineer", "Student / Builder"];
const INTRO =
  "这里记录我写过的代码、正在学习的东西，以及不断尝试的新想法。欢迎进来看看。";

/** 首屏：GSAP 时间轴驱动逐字标题、副标题与按钮入场；容器有轻微鼠标视差 */
export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    // Intro 存在时让标题动画等遮罩开始淡出后再播放（首访遮罩较久，回访者只有轻量 WELCOME BACK）
    const introDone = window.sessionStorage.getItem(INTRO_FLAG);
    const delayS = introDone ? 0.85 : 0.95;

    // 后台标签页 / rAF 饥饿时，GSAP 首帧直接跳到正确时间点，避免 Hero 永远停留在隐藏态
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: delayS,
      });
      tl.from(".hero-char", {
        y: 44,
        opacity: 0,
        rotateX: -50,
        duration: 0.9,
        stagger: 0.035,
      })
        .from(
          ".hero-line2",
          { y: 44, opacity: 0, rotateX: -50, duration: 0.9 },
          "-=0.55"
        )
        .from(
          ".hero-sub",
          { y: 18, opacity: 0, duration: 0.7, stagger: 0.12 },
          "-=0.5"
        )
        .from(".hero-intro", { y: 16, opacity: 0, duration: 0.7 }, "-=0.4")
        .from(
          ".hero-cta",
          { y: 14, opacity: 0, duration: 0.6, stagger: 0.1 },
          "-=0.4"
        )
        .from(".hero-meta", { opacity: 0, y: 10, duration: 0.8 }, "-=0.3");

      // 鼠标视差：quickTo 复用同一补间，避免每次移动创建新 tween
      const layers = Array.from(
        rootRef.current?.querySelectorAll<HTMLElement>(
          "[data-parallax-layer]"
        ) ?? []
      ).map((layer) => ({
        depth: Number(layer.dataset.parallaxLayer) || 1,
        qx: gsap.quickTo(layer, "x", { duration: 0.9, ease: "power2.out" }),
        qy: gsap.quickTo(layer, "y", { duration: 0.9, ease: "power2.out" }),
      }));

      let raf = 0;
      function onMove(e: PointerEvent) {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          const x = (e.clientX / window.innerWidth - 0.5) * 14;
          const y = (e.clientY / window.innerHeight - 0.5) * 10;
          for (const m of layers) {
            m.qx(x * m.depth);
            m.qy(y * m.depth);
          }
        });
      }
      window.addEventListener("pointermove", onMove, { passive: true });
      // 兜底：rAF 长期被节流时，用定时器强制完成入场动画
      const safety = window.setTimeout(
        () => tl.progress(1),
        delayS * 1000 + 4500
      );
      // ctx.revert 时一并移除监听与兜底
      return () => {
        window.removeEventListener("pointermove", onMove);
        cancelAnimationFrame(raf);
        window.clearTimeout(safety);
      };
    }, rootRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="home"
      ref={rootRef}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center"
    >
      <div
        data-parallax-layer="0.6"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(91,140,255,0.14),transparent_65%)] blur-2xl"
      />

      <div data-parallax-layer="1" className="relative z-10 flex flex-col items-center gap-6">
        <p className="hero-meta font-mono text-xs uppercase tracking-[0.4em] text-muted">
          Personal Universe · 欢迎进入
        </p>

        <h1 className="text-5xl leading-[1.02] tracking-[-0.03em] sm:text-7xl lg:text-8xl">
          <span className="block font-light">
            {TITLE_LINE_1.split("").map((ch, i) => (
              <span key={i} className="hero-char inline-block will-change-transform">
                {ch === " " ? "\u00A0" : ch}
              </span>
            ))}
          </span>
          <span className="hero-line2 text-gradient block pb-2 font-semibold will-change-transform">
            {TITLE_LINE_2}
          </span>
        </h1>

        <div className="flex items-center gap-3 font-mono text-sm text-muted sm:text-base">
          <span className="hero-sub">{SUBTITLE_LINES[0]}</span>
          <span aria-hidden className="h-1 w-1 rounded-full bg-accent-3" />
          <span className="hero-sub">{SUBTITLE_LINES[1]}</span>
        </div>

        <p className="hero-intro max-w-md text-balance text-[15px] leading-relaxed text-muted sm:text-base">
          {INTRO}
        </p>

        <div className="mt-2 flex flex-col items-center gap-3 sm:flex-row">
          <span className="hero-cta">
            <Magnetic>
              <GlowButton href="#about">
                Enter My Space <Rocket size={16} />
              </GlowButton>
            </Magnetic>
          </span>
          <span className="hero-cta">
            <Magnetic>
              <GlowButton href="#projects" variant="ghost">
                Explore <ArrowUpRight size={16} />
              </GlowButton>
            </Magnetic>
          </span>
        </div>
      </div>

      <a
        href="#about"
        aria-label="向下滚动"
        className="hero-meta absolute bottom-8 left-1/2 -translate-x-1/2 text-muted transition-colors hover:text-accent"
      >
        <ArrowDown size={20} className="animate-float-y" />
      </a>
    </section>
  );
}
