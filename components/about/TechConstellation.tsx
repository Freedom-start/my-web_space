"use client";

import { motion } from "framer-motion";
import { skillNodes, skillLinks } from "@/data/skills";

const levelColor: Record<string, string> = {
  core: "var(--accent)",
  learning: "var(--accent-3)",
  exploring: "var(--accent-2)",
};

/** Technology Constellation：技能节点组成的星座，连线 + 轻微浮动 */
export default function TechConstellation() {
  return (
    <div
      aria-label="技术栈星座图"
      className="relative aspect-square w-full max-w-lg"
    >
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full"
        aria-hidden
      >
        {skillLinks.map(([a, b], i) => {
          const na = skillNodes[a];
          const nb = skillNodes[b];
          return (
            <motion.line
              key={i}
              x1={na.x}
              y1={na.y}
              x2={nb.x}
              y2={nb.y}
              stroke="var(--line)"
              strokeWidth={0.3}
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, delay: 0.2 + i * 0.08 }}
            />
          );
        })}
      </svg>

      {skillNodes.map((node, i) => (
        <motion.div
          key={node.name}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
        >
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{
              duration: 4 + (i % 3),
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.4,
            }}
            className="group relative flex cursor-default flex-col items-center gap-1.5"
          >
            <span
              className="block h-2.5 w-2.5 rounded-full transition-transform duration-300 group-hover:scale-150"
              style={{
                background: levelColor[node.level],
                boxShadow: `0 0 14px 2px color-mix(in srgb, ${levelColor[node.level]} 55%, transparent)`,
              }}
            />
            <span className="whitespace-nowrap rounded-full border border-line bg-card px-2.5 py-1 font-mono text-[11px] text-foreground backdrop-blur-sm transition-colors duration-300 group-hover:border-accent group-hover:text-accent">
              {node.name}
            </span>
          </motion.div>
        </motion.div>
      ))}

      {/* 图例 */}
      <div className="absolute bottom-0 left-0 flex gap-4 font-mono text-[11px] text-muted">
        <span className="flex items-center gap-1.5">
          <i className="h-1.5 w-1.5 rounded-full bg-accent" /> core
        </span>
        <span className="flex items-center gap-1.5">
          <i className="h-1.5 w-1.5 rounded-full bg-accent-3" /> learning
        </span>
        <span className="flex items-center gap-1.5">
          <i className="h-1.5 w-1.5 rounded-full bg-accent-2" /> exploring
        </span>
      </div>
    </div>
  );
}
