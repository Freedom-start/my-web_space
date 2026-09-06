import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import TechConstellation from "./TechConstellation";
import { ownerName } from "@/data/profile";

const FACTS = [
  { label: "Major", value: "Software Engineering" },
  { label: "Focus", value: "Systems · Web · Algorithms" },
  { label: "Status", value: "Building & learning" },
];

/** About：左侧个人档案式介绍，右侧技术星座 */
export default function About() {
  return (
    <section id="about" className="relative mx-auto max-w-6xl px-6 py-28 sm:py-36">
      <SectionHeading
        eyebrow="About / 01"
        title="A developer profile, not a resume"
        accent={["not", "a", "resume"]}
      />

      <div className="mt-14 grid items-center gap-16 lg:grid-cols-2">
        <div className="flex flex-col gap-8">
          <Reveal delay={0.1}>
            <div className="space-y-5 text-[15px] leading-relaxed text-muted sm:text-base">
              <p>
                你好，我是{" "}
                <span className="text-foreground">{ownerName}</span>，
                一名软件工程专业的学生。比起“简历”，我更希望这里是一个
                不断生长的数字空间——记录我写过的代码、踩过的坑和正在探索的方向。
              </p>
              <p>
                目前我主要在学习 <span className="text-accent">Python</span> 与{" "}
                <span className="text-accent">C++</span>，
                通过算法题训练思维方式，也在用 FastAPI 和 Next.js 动手做项目——
                你现在看到的这个网站，就是其中之一。我对系统底层
                （操作系统、网络、体系结构）如何支撑上层应用特别感兴趣。
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <dl className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
              {FACTS.map((fact) => (
                <div key={fact.label} className="bg-background-soft/60 px-5 py-4">
                  <dt className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
                    {fact.label}
                  </dt>
                  <dd className="mt-1.5 text-sm text-foreground">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="flex justify-center">
          <TechConstellation />
        </Reveal>
      </div>
    </section>
  );
}
