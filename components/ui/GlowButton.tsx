"use client";

import type { ReactNode } from "react";

interface GlowButtonProps {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  external?: boolean;
}

/** Hero / Contact 使用的按钮，带 hover 光晕与滑块动效 */
export function GlowButton({
  href,
  children,
  variant = "primary",
  external = false,
}: GlowButtonProps) {
  const cls =
    variant === "primary"
      ? "bg-accent text-white shadow-[0_0_30px_-8px_var(--accent)] hover:shadow-[0_0_44px_-6px_var(--accent)]"
      : "border border-line text-foreground hover:border-accent hover:text-accent";

  const base =
    "group relative inline-flex items-center justify-center overflow-hidden rounded-full px-7 py-3 text-sm font-medium tracking-wide transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0";

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className={`${base} ${cls}`}
    >
      <span
        aria-hidden
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
      />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </a>
  );
}
