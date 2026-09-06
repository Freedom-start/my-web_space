"use client";

import dynamic from "next/dynamic";

/** Three.js 体量较大：客户端懒加载，移出首屏关键路径 */
const SceneBackground = dynamic(
  () => import("@/components/background/SceneBackground"),
  { ssr: false }
);

export default function SceneBackgroundLazy() {
  return <SceneBackground />;
}
