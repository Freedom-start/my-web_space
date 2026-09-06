"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

/** 文章阅读进度条：顶部固定 3px，accent 色，scaleX 驱动（transform-only，无逐帧 state 更新）；
 *  reduced-motion 时不渲染（进度动画取消）。 */
export default function ReadingProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });

  if (reduce) return null;

  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[55] h-[3px] origin-left bg-accent"
      style={{ scaleX }}
    />
  );
}
