import { SectionHeading } from "@/components/ui/SectionHeading";
import LearningMap from "./LearningMap";

export default function Learning() {
  return (
    <section id="learning" className="relative mx-auto max-w-6xl px-6 py-28 sm:py-36">
      <SectionHeading
        eyebrow="Learning / 04"
        title="My learning journey"
        accent={["journey"]}
        description="一张还在生长的地图：从语言基础到系统底层，再到 Web 与 AI。虚线是我正在走的路。"
      />
      <LearningMap />
    </section>
  );
}
