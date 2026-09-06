import SceneBackground from "@/components/background/SceneBackground";
import FloatingNavbar from "@/components/navigation/FloatingNavbar";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { MotionProvider } from "@/components/providers/MotionProvider";
import Hero from "@/components/hero/Hero";
import Marquee from "@/components/ui/Marquee";
import SectionDivider from "@/components/ui/SectionDivider";
import Intro from "@/components/ui/Intro";
import CursorGlow from "@/components/ui/CursorGlow";
import About from "@/components/about/About";
import Projects from "@/components/projects/Projects";
import Blog from "@/components/blog/Blog";
import Learning from "@/components/learning/Learning";
import Contact from "@/components/contact/Contact";
import Footer from "@/components/contact/Footer";

export default function Home() {
  return (
    <>
      <Intro />
      <SceneBackground />
      <CursorGlow />
      <FloatingNavbar />
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        跳到主要内容
      </a>
      <SmoothScroll>
        <MotionProvider>
          <main>
            <Hero />
            <Marquee />
            <About />
            <SectionDivider />
            <Projects />
            <SectionDivider />
            <Blog />
            <SectionDivider />
            <Learning />
            <SectionDivider />
            <Contact />
          </main>
          <Footer />
        </MotionProvider>
      </SmoothScroll>
    </>
  );
}
