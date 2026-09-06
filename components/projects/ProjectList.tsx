"use client";

import { ArrowUpRight, Code } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { projects as data, type Project } from "@/data/projects";
import { githubUrl, githubHandle } from "@/data/profile";
import { Reveal } from "@/components/ui/Reveal";
import { TiltCard } from "@/components/ui/TiltCard";

/** 项目视觉占位：CSS 渐变场景 + 网格 + 悬浮几何 */
function ProjectVisual({ project }: { project: Project }) {
  return (
    <div
      aria-hidden
      className="relative h-full min-h-56 w-full overflow-hidden rounded-2xl border border-line"
      style={{
        background: `linear-gradient(135deg, rgba(10,12,28,0.9), color-mix(in srgb, ${project.accent} 14%, rgba(5,6,15,0.95)))`,
      }}
    >
      <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(var(--line)_1px,transparent_1px),linear-gradient(90deg,var(--line)_1px,transparent_1px)] [background-size:32px_32px]" />
      <motion.div
        className="absolute h-24 w-24 rounded-2xl border border-line/60"
        style={{
          right: "12%",
          top: "18%",
          background: `linear-gradient(135deg, color-mix(in srgb, ${project.accent} 35%, transparent), transparent)`,
        }}
        animate={{ y: [0, -10, 0], rotate: [0, 6, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute h-14 w-14 rounded-full border border-line/60"
        style={{
          left: "14%",
          bottom: "16%",
          background: `radial-gradient(circle, color-mix(in srgb, ${project.accent} 40%, transparent), transparent 70%)`,
        }}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <span className="absolute bottom-4 right-5 font-mono text-6xl font-bold text-white/5 sm:text-8xl">
        {project.index}
      </span>
    </div>
  );
}

function StackChips({ stack }: { stack: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {stack.map((s) => (
        <li
          key={s}
          className="rounded-full border border-line px-2.5 py-1 font-mono text-[11px] text-muted"
        >
          {s}
        </li>
      ))}
    </ul>
  );
}

function Links({ project }: { project: Project }) {
  return (
    <div className="flex items-center gap-4">
      {project.github ? (
        <a
          href={project.github}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-accent"
        >
          <Code size={15} /> GitHub
        </a>
      ) : null}
      {project.demo ? (
        <a
          href={project.demo}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 text-sm text-accent transition-colors hover:text-accent-3"
        >
          Demo <ArrowUpRight size={15} />
        </a>
      ) : null}
    </div>
  );
}

/** 单个项目卡片：TiltCard 3D 倾斜 + glow；featured 全宽 / split 左右交替 */
function ProjectCard({ project }: { project: Project }) {
  const reduce = useReducedMotion();
  const featured = project.layout === "featured";

  return (
    <TiltCard maxTilt={reduce ? 0 : 4} className="h-full">
      <article className="glow-ring group relative h-full rounded-2xl border border-line bg-card p-2 backdrop-blur-sm sm:p-3">
        <div
          className={`grid gap-6 p-4 sm:gap-8 sm:p-6 ${
            featured
              ? "lg:grid-cols-5 lg:items-center"
              : "md:grid-cols-2 md:items-center"
          }`}
        >
          <div className={featured ? "lg:col-span-3" : "md:order-2"}>
            <ProjectVisual project={project} />
          </div>
          <div
            className={`flex flex-col gap-4 ${featured ? "lg:col-span-2" : "md:order-1"}`}
          >
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-sm" style={{ color: project.accent }}>
                {featured ? "Featured Project" : "Project"}
              </span>
              <span className="font-mono text-xs text-muted">{project.year}</span>
            </div>
            <div>
              <h3 className="text-2xl font-semibold tracking-tight transition-colors duration-300 group-hover:text-accent sm:text-3xl">
                {project.name}
              </h3>
              <p className="mt-1 font-mono text-xs text-muted">{project.tagline}</p>
            </div>
            <p className="text-[15px] leading-relaxed text-muted">
              {project.description}
            </p>
            <StackChips stack={project.stack} />
            <Links project={project} />
          </div>
        </div>
      </article>
    </TiltCard>
  );
}

export default function ProjectList() {
  return (
    <div className="mt-14 flex flex-col gap-10">
      {data.map((p, i) => (
        <Reveal key={p.id} delay={i * 0.05}>
          <ProjectCard project={p} />
        </Reveal>
      ))}

      <Reveal>
        <p className="text-center font-mono text-xs text-muted">
          More experiments live on my GitHub —
          <a
            href={githubUrl}
            target="_blank"
            rel="noreferrer"
            className="ml-1 text-accent hover:underline"
          >
            {githubHandle}
          </a>
        </p>
      </Reveal>
    </div>
  );
}
