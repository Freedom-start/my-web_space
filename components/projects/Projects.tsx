import { SectionHeading } from "@/components/ui/SectionHeading";
import ProjectList from "./ProjectList";

export default function Projects() {
  return (
    <section id="projects" className="relative mx-auto max-w-6xl px-6 py-28 sm:py-36">
      <SectionHeading
        eyebrow="Projects / 02"
        title="Selected work & experiments"
        accent={["work", "&", "experiments"]}
        description="这里会逐步记录我完成的项目与实验。"
      />
      <ProjectList />
    </section>
  );
}
