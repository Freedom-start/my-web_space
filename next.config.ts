import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["mdx", "md", "tsx", "ts"],
};

// Turbopack 要求 loader options 可序列化，因此这里不传函数形式的 remark 插件。
// 当前文章仅使用核心 Markdown 语法；未来需要 GFM（表格等）时再评估方案。
const withMDX = createMDX({
  options: {},
});

export default withMDX(nextConfig);
