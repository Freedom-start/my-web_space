"use client";

import { Code, Moon, Sun, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navLinks, githubUrl, ownerName } from "@/data/profile";
import { useTheme } from "@/components/providers/useTheme";

/** Floating Navbar：半透明 + 模糊，滚动向下隐藏 / 向上出现，当前 section 高亮 */
export default function FloatingNavbar() {
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const { toggle } = useTheme();
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    function onScroll() {
      const y = window.scrollY;
      setScrolled(y > 24);
      setVisible(y < lastY || y < 80);
      lastY = y;
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsLight(document.documentElement.dataset.theme === "light");
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  // 菜单打开时支持 Escape 关闭
  useEffect(() => {
    if (!menuOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-4 z-50 flex justify-center px-4 transition-all duration-500 sm:top-6 ${
        visible ? "translate-y-0 opacity-100" : "-translate-y-20 opacity-0"
      }`}
    >
      <nav
        aria-label="主导航"
        className={`flex w-full max-w-3xl items-center justify-between gap-2 rounded-full border border-line px-4 py-2 backdrop-blur-md transition-colors duration-500 sm:px-5 ${
          scrolled ? "bg-card" : "bg-transparent"
        }`}
      >
        <a
          href="#home"
          className="font-mono text-sm font-semibold tracking-tight text-foreground transition-colors hover:text-accent"
        >
          {ownerName}
          <span className="text-accent">.space</span>
        </a>

        {/* 桌面端链接 */}
        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className={`relative rounded-full px-3 py-1.5 text-sm transition-colors duration-300 ${
                  active === link.id
                    ? "text-accent"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {link.label}
                {active === link.id ? (
                  <span
                    aria-hidden
                    className="absolute inset-x-3 -bottom-0.5 h-px bg-gradient-to-r from-transparent via-accent to-transparent"
                  />
                ) : null}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1">
          <a
            href={githubUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="grid h-11 w-11 place-items-center rounded-full text-muted transition-colors hover:bg-white/5 hover:text-accent"
          >
            <Code size={18} />
          </a>
          <button
            type="button"
            onClick={toggle}
            aria-label="切换主题"
            className="grid h-11 w-11 place-items-center rounded-full text-muted transition-colors hover:bg-white/5 hover:text-accent"
          >
            {isLight ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "关闭菜单" : "打开菜单"}
            aria-expanded={menuOpen}
            className="grid h-11 w-11 place-items-center rounded-full text-muted transition-colors hover:text-accent md:hidden"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* 移动端下拉菜单：始终挂载以获得开合过渡，关闭时移出 Tab 序 */}
      <div
        inert={!menuOpen}
        aria-hidden={!menuOpen}
        className={`absolute top-full mt-2 w-[calc(100%-2rem)] max-w-3xl origin-top rounded-2xl border border-line bg-card p-2 backdrop-blur-md transition-all duration-300 ease-out md:hidden ${
          menuOpen
            ? "translate-y-0 scale-100 opacity-100"
            : "pointer-events-none -translate-y-1 scale-95 opacity-0"
        }`}
      >
        <ul className="flex flex-col">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                onClick={() => setMenuOpen(false)}
                className={`block rounded-xl px-4 py-2.5 text-sm transition-colors ${
                  active === link.id
                    ? "bg-white/5 text-accent"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
