import Hero from "@/components/hero/Hero";
import Marquee from "@/components/ui/Marquee";
import SectionDivider from "@/components/ui/SectionDivider";
import JsonLd from "@/components/seo/JsonLd";
import About from "@/components/about/About";
import Projects from "@/components/projects/Projects";
import Blog from "@/components/blog/Blog";
import Learning from "@/components/learning/Learning";
import Contact from "@/components/contact/Contact";
import { siteName, ownerName, siteUrl, githubUrl } from "@/data/profile";

/** 首页结构化数据：WebSite + Person（仅使用真实信息，不虚构职业字段） */
const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: siteUrl,
  },
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: ownerName,
    url: siteUrl,
    sameAs: [githubUrl],
  },
];

export default function Home() {
  return (
    <>
      <JsonLd data={structuredData} />
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
