"use client";

import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { useRef, type ReactNode, type PointerEvent } from "react";

/** CTA 磁吸效果（签名动效：元素级）。仅在支持 hover 的指针设备生效。 */
export function Magnetic({
  children,
  strength = 0.35,
}: {
  children: ReactNode;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 14 });
  const sy = useSpring(y, { stiffness: 180, damping: 14 });

  function onMove(e: PointerEvent<HTMLDivElement>) {
    if (reduce) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left - rect.width / 2) * strength);
    y.set((e.clientY - rect.top - rect.height / 2) * strength);
  }

  function onLeave() {
    x.set(0);
    y.set(0);
  }

  if (reduce) return <div ref={ref}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ x: sx, y: sy }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}
