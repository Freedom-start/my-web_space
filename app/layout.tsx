import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Noto_Sans_SC } from "next/font/google";
import { siteName, ownerName } from "@/data/profile";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSansSC = Noto_Sans_SC({
  variable: "--font-noto-sc",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const DESCRIPTION = `欢迎进入 ${ownerName} 的数字空间：这里记录代码、正在学习的东西，以及不断尝试的新想法。`;
const TITLE = `${siteName} — Digital Universe`;

export const metadata: Metadata = {
  metadataBase: new URL("https://freedom.space"),
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
      className={`${geistSans.variable} ${geistMono.variable} ${notoSansSC.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="noise-overlay min-h-full">{children}</body>
    </html>
  );
}
