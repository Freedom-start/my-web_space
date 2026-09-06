import Hero from "@/components/hero/Hero";
import Marquee from "@/components/ui/Marquee";
import SectionDivider from "@/components/ui/SectionDivider";
import About from "@/components/about/About";
import Projects from "@/components/projects/Projects";
import Blog from "@/components/blog/Blog";
import Learning from "@/components/learning/Learning";
import Contact from "@/components/contact/Contact";

export default function Home() {
  return (
    <>
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
    </>
  );
}
