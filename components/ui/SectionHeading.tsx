import { WordReveal } from "./WordReveal";
import { ScrambleText } from "./ScrambleText";
import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  eyebrow: string;
  /** H2 文案，按空格分词逐词入场 */
  title: string;
  /** title 中需要渐变强调的词 */
  accent?: string[];
  description?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  eyebrow,
  title,
  accent = [],
  description,
  align = "left",
}: SectionHeadingProps) {
  const alignCls =
    align === "center"
      ? "items-center text-center"
      : "items-start text-left";
  return (
    <div className={`flex flex-col gap-4 ${alignCls}`}>
      <Reveal>
        <ScrambleText
          text={eyebrow}
          className="block font-mono text-xs uppercase tracking-[0.35em] text-accent"
        />
      </Reveal>
      <WordReveal
        text={title}
        accent={accent}
        className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl"
      />
      {description ? (
        <Reveal delay={0.15}>
          <p className="max-w-xl text-[15px] leading-relaxed text-muted sm:text-base">
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
