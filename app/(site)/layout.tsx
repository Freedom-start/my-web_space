import type { ReactNode } from "react";
import SceneBackgroundLazy from "@/components/background/SceneBackgroundLazy";
import FloatingNavbar from "@/components/navigation/FloatingNavbar";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { MotionProvider } from "@/components/providers/MotionProvider";
import Intro from "@/components/ui/Intro";
import CursorGlow from "@/components/ui/CursorGlow";
import Footer from "@/components/contact/Footer";

/** 全站共享 chrome：背景 / 导航 / Intro / 光标 / 滚动 / Footer，所有页面继承 */
export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Intro />
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        跳到主要内容
      </a>
      <SceneBackgroundLazy />
      <CursorGlow />
      <FloatingNavbar />
      <SmoothScroll>
        <MotionProvider>
          <main>{children}</main>
          <Footer />
        </MotionProvider>
      </SmoothScroll>
    </>
  );
}
