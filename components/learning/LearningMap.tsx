"use client";

import { motion } from "framer-motion";
import { learningNodes, learningLinks } from "@/data/skills";

const statusStyle: Record<
  string,
  { dot: string; label: string; ring: string }
> = {
  done: {
    dot: "var(--accent)",
    label: "text-muted",
    ring: "border-line",
  },
  active: {
    dot: "var(--accent-3)",
    label: "text-foreground",
    ring: "border-accent-3/60",
  },
  upcoming: {
    dot: "var(--muted)",
    label: "text-muted/70",
    ring: "border-line",
  },
};

/** My Learning Journey：数字地图。节点依次出现，连接线生长，当前学习项高亮。 */
export default function LearningMap() {
  return (
    <div className="relative mx-auto mt-16 h-[420px] w-full max-w-4xl sm:h-[480px]">
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
        aria-hidden
      >
        {learningLinks.map(([a, b], i) => {
          const na = learningNodes[a];
          const nb = learningNodes[b];
          return (
            <motion.line
              key={i}
              x1={na.x}
              y1={na.y}
              x2={nb.x}
              y2={nb.y}
              stroke={na.status === "active" || nb.status === "active" ? "var(--accent-3)" : "var(--line)"}
              strokeOpacity={na.status === "active" || nb.status === "active" ? 0.55 : 1}
              strokeWidth={0.25}
              strokeDasharray={na.status === "active" || nb.status === "active" ? "1.5 1.5" : undefined}
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.06, ease: "easeInOut" }}
            />
          );
        })}
      </svg>

      {learningNodes.map((node, i) => {
        const s = statusStyle[node.status];
        return (
          <motion.div
            key={node.name}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
            initial={{ opacity: 0, scale: 0.4 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.15 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className={`flex flex-col items-center gap-1.5 rounded-2xl border ${s.ring} bg-card px-3.5 py-2.5 backdrop-blur-sm transition-colors duration-300 hover:border-accent`}
            >
              <span className="flex items-center gap-2">
                <span
                  className={`block h-2 w-2 rounded-full ${
                    node.status === "active" ? "animate-pulse-dot" : ""
                  }`}
                  style={{ background: s.dot }}
                />
                <span className={`whitespace-nowrap font-mono text-xs sm:text-sm ${s.label}`}>
                  {node.name}
                </span>
              </span>
              {node.note ? (
                <span className="whitespace-nowrap font-mono text-[11px] text-muted">
                  {node.note}
                </span>
              ) : null}
            </div>
          </motion.div>
        );
      })}

      {/* 图例 */}
      <div className="absolute -bottom-10 left-0 flex gap-5 font-mono text-[11px] text-muted">
        <span className="flex items-center gap-1.5">
          <i className="h-1.5 w-1.5 rounded-full bg-accent" /> done
        </span>
        <span className="flex items-center gap-1.5">
          <i className="h-1.5 w-1.5 rounded-full bg-accent-3" /> active
        </span>
        <span className="flex items-center gap-1.5">
          <i className="h-1.5 w-1.5 rounded-full bg-muted" /> upcoming
        </span>
      </div>
    </div>
  );
}
