/** 宣言横滚带：Hero 与 About 之间的"首滑钩子"，纯 CSS keyframes */
const WORDS = [
  "BUILD",
  "LEARN",
  "SHIP",
  "REPEAT",
  "代码",
  "算法",
  "系统",
  "无限循环",
];

export default function Marquee() {
  const row = (
    <>
      {WORDS.map((w) => (
        <span key={w} className="flex shrink-0 items-center gap-8 pr-8">
          <span className="text-4xl font-bold tracking-tight text-foreground/90 sm:text-6xl">
            {w}
          </span>
          <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-accent-3/80" />
        </span>
      ))}
    </>
  );

  return (
    <section
      aria-hidden
      className="relative overflow-hidden border-y border-line py-8 sm:py-10"
    >
      <div className="marquee-track flex w-max">
        <div className="flex">{row}</div>
        <div className="flex">{row}</div>
      </div>
    </section>
  );
}
