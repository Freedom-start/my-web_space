"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, type ReactNode, type PointerEvent } from "react";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  /** 最大倾斜角度 */
  maxTilt?: number;
  glow?: boolean;
}

/**
 * 3D tilt 卡片：跟随鼠标轻微倾斜，边缘产生 glow。
 * 桌面端 pointer 精细设备才生效逻辑保持简单——移动端没有 hover 不会触发。
 */
export function TiltCard({
  children,
  className,
  maxTilt = 6,
  glow = true,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rx = useSpring(useTransform(py, [0, 1], [maxTilt, -maxTilt]), {
    stiffness: 150,
    damping: 20,
  });
  const ry = useSpring(useTransform(px, [0, 1], [-maxTilt, maxTilt]), {
    stiffness: 150,
    damping: 20,
  });
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const glowBg = useTransform(
    [glowX, glowY],
    ([x, y]) =>
      `radial-gradient(600px circle at ${x}% ${y}%, color-mix(in srgb, var(--accent) 12%, transparent), transparent 45%)`
  );

  function handlePointerMove(e: PointerEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const nx = (e.clientX - rect.left) / rect.width;
    const ny = (e.clientY - rect.top) / rect.height;
    px.set(nx);
    py.set(ny);
    glowX.set(nx * 100);
    glowY.set(ny * 100);
  }

  function handlePointerLeave() {
    px.set(0.5);
    py.set(0.5);
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      className={`group relative ${className ?? ""}`}
    >
      {glow ? (
        <motion.div
          aria-hidden
          style={{ background: glowBg }}
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
      ) : null}
      {children}
    </motion.div>
  );
}
