"use client";

import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import type { PostMeta } from "@/lib/blog";

/** 单行文章条目：编号移动 + 标题位移 + 边缘高亮 + 草稿标识 */
export default function BlogRow({ post, index }: { post: PostMeta; index: number }) {
  return (
    <motion.a
      href={`/blog/${post.slug}`}
      className="group relative flex items-center gap-6 border-b border-line py-7 transition-colors duration-300 first:border-t hover:border-accent/40 sm:gap-10 sm:py-8"
      whileHover="hover"
      initial="rest"
      animate="rest"
    >
      <motion.span
        variants={{ rest: { x: 0 }, hover: { x: 8 } }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        className="font-mono text-sm text-muted transition-colors duration-300 group-hover:text-accent sm:text-base"
      >
        {String(index + 1).padStart(2, "0")}
      </motion.span>

      <motion.span
        variants={{ rest: { x: 0 }, hover: { x: 14 } }}
        transition={{ type: "spring", stiffness: 260, damping: 24 }}
        className="flex-1 text-lg font-medium tracking-tight sm:text-2xl"
      >
        {post.title}
      </motion.span>

      {post.draft ? (
        <span className="hidden rounded-full border border-accent-2/40 px-2.5 py-1 font-mono text-[11px] text-accent-2 sm:block">
          DRAFT
        </span>
      ) : null}

      <span className="hidden font-mono text-[11px] uppercase tracking-[0.2em] text-muted sm:block">
        {post.category}
      </span>
      <span className="hidden font-mono text-[11px] text-muted md:block">
        {post.date} · {post.readingTime}
      </span>

      <ArrowUpRight
        size={18}
        className="shrink-0 text-muted opacity-0 transition-all duration-300 group-hover:text-accent group-hover:opacity-100"
      />
    </motion.a>
  );
}
