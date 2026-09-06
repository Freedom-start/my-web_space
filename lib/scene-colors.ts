/**
 * WebGL 场景专用色值（Three.js 无法读取 CSS 变量）。
 * 与 app/globals.css 中的 :root 变量保持同步——修改时两处一起改。
 */
export const SCENE_BG = "#05060f";
export const SCENE_COLOR_PRIMARY = "#5b8cff";
export const SCENE_COLOR_SECONDARY = "#a06bff";
export const SCENE_COLOR_TERTIARY = "#38e8d0";
export const SCENE_STAR_COLOR = "#8fa4ff";

/** CSS 层环境光晕（蓝/紫/青三向 radial-gradient），供 SceneBackground 覆盖层使用 */
export const SCENE_AMBIENT_GLOW = [
  "radial-gradient(ellipse 60% 50% at 20% 10%, rgba(91, 140, 255, 0.10), transparent 60%)",
  "radial-gradient(ellipse 50% 45% at 85% 75%, rgba(160, 107, 255, 0.08), transparent 60%)",
  "radial-gradient(ellipse 40% 35% at 50% 100%, rgba(56, 232, 208, 0.05), transparent 65%)",
].join(", ");
