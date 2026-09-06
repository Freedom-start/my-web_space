"use client";

import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { posts } from "@/data/posts";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

/** Editorial / Knowledge Archive：编号移动 + 标题位移 + 边缘高亮 */
export default function Blog() {
  return (
    <section id="blog" className="relative mx-auto max-w-6xl px-6 py-28 sm:py-36">
      <SectionHeading
        eyebrow="Blog / 03"
        title="Knowledge archive"
        accent={["archive"]}
        description="写作是最好的思考方式。这里存放着学习过程中的推导、复盘与沉淀。"
      />

      <div className="mt-14 flex flex-col">
        {posts.map((post, i) => (
          <Reveal key={post.index} delay={i * 0.06}>
            {/* 文章详情页未上线：暂以非链接行呈现，避免伪造 slug 造成错误跳转 */}
            <motion.article
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
                {post.index}
              </motion.span>

              <motion.span
                variants={{ rest: { x: 0 }, hover: { x: 14 } }}
                transition={{ type: "spring", stiffness: 260, damping: 24 }}
                className="flex-1 text-lg font-medium tracking-tight sm:text-2xl"
              >
                {post.title}
              </motion.span>

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
            </motion.article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
