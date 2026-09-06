import { SectionHeading } from "@/components/ui/SectionHeading";
import ProjectList from "./ProjectList";

export default function Projects() {
  return (
    <section id="projects" className="relative mx-auto max-w-6xl px-6 py-28 sm:py-36">
      <SectionHeading
        eyebrow="Projects / 02"
        title="Selected work & experiments"
        accent={["work", "&", "experiments"]}
        description="每个项目都是一次完整的学习闭环：从需求、架构到实现与优化。"
      />
      <ProjectList />
    </section>
  );
}
