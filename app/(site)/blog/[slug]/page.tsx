import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getPost, getAllSlugs } from "@/lib/blog";
import { Reveal } from "@/components/ui/Reveal";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} — Freedom's Space`,
    description: post.summary,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const { Content } = post;

  return (
    <article className="relative mx-auto max-w-3xl px-6 pb-24 pt-32 sm:pt-36">
      <Reveal>
        <Link
          href="/#blog"
          className="inline-flex items-center gap-1.5 font-mono text-xs tracking-[0.25em] text-muted transition-colors hover:text-accent"
        >
          <ArrowLeft size={14} /> BLOG
        </Link>
      </Reveal>

      <header className="mt-10 flex flex-col gap-5">
        <Reveal delay={0.05}>
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-accent">
            {post.category}
            {post.draft ? (
              <span className="rounded-full border border-accent-2/40 px-2.5 py-1 text-[11px] text-accent-2">
                DRAFT · 草稿
              </span>
            ) : null}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h1 className="text-balance text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">
            {post.title}
          </h1>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="text-[15px] leading-relaxed text-muted sm:text-base">
            {post.summary}
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="flex items-center gap-3 font-mono text-xs text-muted">
            <span>{post.date}</span>
            <span aria-hidden className="h-1 w-1 rounded-full bg-accent-3" />
            <span>{post.readingTime}</span>
          </div>
        </Reveal>
      </header>

      <div
        aria-hidden
        className="my-12 h-px bg-gradient-to-r from-transparent via-line to-transparent"
      />

      {post.draft ? (
        <Reveal delay={0.25}>
          <div className="mb-10 rounded-2xl border border-accent-2/40 bg-card p-5 font-mono text-xs leading-relaxed text-muted backdrop-blur-sm">
            <span className="text-accent-2">DRAFT</span>{" "}
            — 这篇文章仍在准备阶段，当前内容为写作提纲，不代表已完成的技术内容。
          </div>
        </Reveal>
      ) : null}

      <Reveal delay={post.draft ? 0.3 : 0.25}>
        <div className="article-body">
          <Content />
        </div>
      </Reveal>

      <div
        aria-hidden
        className="my-16 h-px bg-gradient-to-r from-transparent via-line to-transparent"
      />

      <Reveal>
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/#blog"
            className="group inline-flex items-center gap-2 font-mono text-sm text-muted transition-colors hover:text-accent"
          >
            <ArrowLeft
              size={15}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />
            返回 Blog
          </Link>
          <span className="font-mono text-xs text-muted/70">
            更多文章陆续上线
          </span>
        </div>
      </Reveal>
    </article>
  );
}
