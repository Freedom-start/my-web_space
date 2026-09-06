"use client";

import { useEffect } from "react";

const STORAGE_KEY = "my-space-theme";

/** 主题切换：dark 默认，light 为柔和变体。挂在 html data-theme 上。 */
export function useTheme() {
  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "light" || saved === "dark") {
      document.documentElement.dataset.theme = saved;
    }
  }, []);

  function toggle() {
    const current = document.documentElement.dataset.theme === "light" ? "light" : "dark";
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    window.localStorage.setItem(STORAGE_KEY, next);
  }

  return { toggle };
}
