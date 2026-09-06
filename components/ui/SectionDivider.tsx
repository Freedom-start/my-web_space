"use client";

import { motion } from "framer-motion";

/** Section 之间的"空间门"：一条光线从中心展开 + 中心出现一个微光节点 */
export default function SectionDivider() {
  return (
    <div aria-hidden className="relative mx-auto max-w-6xl px-6">
      <motion.div
        className="h-px origin-center bg-gradient-to-r from-transparent via-line to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-3/70 shadow-[0_0_12px_2px_color-mix(in_srgb,var(--accent-3)_45%,transparent)]"
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, delay: 0.9 }}
      />
    </div>
  );
}
