import type { Metadata, Viewport } from "next";
// 字体自托管：Geist 通过 geist 包（内部使用 next/font/local），
// Noto Sans SC 通过 @fontsource-variable/noto-sans-sc（unicode-range 分包）。
// 目的：摆脱对 fonts.gstatic.com 的构建期网络依赖（该域名在当前网络下不稳定，
// 会导致 Turbopack dev 报 Can't resolve '@vercel/turbopack-next/internal/font/google/font'）。
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "@fontsource-variable/noto-sans-sc";
import { siteName, ownerName, siteUrl } from "@/data/profile";
import "./globals.css";

const DESCRIPTION = `欢迎进入 ${ownerName} 的数字空间：这里记录代码、正在学习的东西，以及不断尝试的新想法。`;
const TITLE = `${siteName} — Digital Universe`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "/",
    siteName,
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#05060f",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="zh-CN"
      data-theme="dark"
      className={`${GeistSans.variable} ${GeistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="noise-overlay min-h-full">{children}</body>
    </html>
  );
}
