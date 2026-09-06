"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/** 尊重系统"减少动态效果"设置：transform 动画自动禁用，opacity 保留 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
