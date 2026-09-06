import { readdirSync } from "node:fs";
import { join } from "node:path";
import type { ComponentType } from "react";

/** 文章元信息（与 MDX 文件内 export const meta 对应） */
export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  category: string;
  readingTime: string;
  summary: string;
  /** 草稿文章：列表与详情都会带草稿标识 */
  draft?: boolean;
}

export interface Post extends PostMeta {
  /** 编译后的 MDX 正文组件 */
  Content: ComponentType;
}

const CONTENT_DIR = join(process.cwd(), "content", "blog");

/** 扫描内容目录获取全部 slug（新增 .mdx 文件即自动发布） */
export function getAllSlugs(): string[] {
  return readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

type PostModule = { meta: PostMeta; default: ComponentType };

function importPostModule(slug: string): Promise<PostModule> {
  return import(`../content/blog/${slug}.mdx`) as Promise<PostModule>;
}

/** 全部文章元信息，按日期倒序 */
export async function getAllPosts(): Promise<PostMeta[]> {
  const slugs = getAllSlugs();
  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const mod = await importPostModule(slug);
      return { ...mod.meta, slug };
    })
  );
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

/** 按 slug 获取单篇文章（含正文组件）；不存在返回 null */
export async function getPost(slug: string): Promise<Post | null> {
  if (!getAllSlugs().includes(slug)) return null;
  const mod = await importPostModule(slug);
  return { ...mod.meta, slug, Content: mod.default };
}

export interface AdjacentPosts {
  /** 上一篇：档案顺序中的前一篇（更新）；第一篇为 null */
  prev: PostMeta | null;
  /** 下一篇：档案顺序中的后一篇（更早）；最后一篇为 null */
  next: PostMeta | null;
}

/** 按档案顺序（新 → 旧）计算相邻文章；首篇无 Previous，末篇无 Next */
export async function getAdjacentPosts(slug: string): Promise<AdjacentPosts> {
  const posts = await getAllPosts();
  const index = posts.findIndex((p) => p.slug === slug);
  if (index === -1) return { prev: null, next: null };
  return {
    prev: index > 0 ? posts[index - 1] : null,
    next: index < posts.length - 1 ? posts[index + 1] : null,
  };
}
