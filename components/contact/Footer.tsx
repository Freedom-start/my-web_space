import { ownerName } from "@/data/profile";

export default function Footer() {
  return (
    <footer className="border-t border-line py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 font-mono text-[11px] text-muted sm:flex-row">
        <span>
          © {new Date().getFullYear()} {ownerName} — built in the dark,
          shipped to the stars.
        </span>
        <span className="flex items-center gap-2">
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent-3 animate-pulse-dot" />
          Next.js · Three.js · GSAP · Lenis
        </span>
      </div>
    </footer>
  );
}
