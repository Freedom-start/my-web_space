# DESIGN.md

> 在接近黑色的深蓝宇宙里，让内容像星座一样浮现——克制、深邃、有生命感。

## 1. Visual Theme & Atmosphere

**Style**: Digital Space / Personal Universe（Futuristic Dark Editorial）
**Keywords**: futuristic · premium · dark · immersive · developer · cyber · elegant · cinematic
**Tone**: 深空中缓慢发光的星图 — NOT 模板化卡片墙、玻璃拟态堆砌、鲜艳大面积纯色
**Feel**: 像在深夜的观测站里浏览一位工程师的记忆：远处有微光，近处是清晰的等宽字标注。

**Interaction Tier**: L3 沉浸体验（Three.js 背景 + GSAP 逐字标题 + Lenis 惯性滚动）
**Dependencies**: framer-motion · GSAP · Lenis · three/@react-three/fiber · lucide-react

## 2. Color Palette & Roles

```css
:root {
  /* Backgrounds */
  --background: #05060f;            /* 页面背景，近黑深蓝 */
  --background-soft: #0a0c1c;       /* 交替 section / 表格块 */
  --card: rgba(16, 20, 42, 0.55);   /* 卡片表面（半透明，供 backdrop-blur） */

  /* Borders */
  --line: rgba(140, 160, 255, 0.14);  /* 默认边框，光感弱线 */

  /* Text */
  --foreground: #e6e9f5;            /* 标题、重要文字 */
  --muted: #9aa3c0;                 /* 正文、描述、标签 */

  /* Accents */
  --accent: #5b8cff;                /* 电光蓝：CTA、链接、active */
  --accent-2: #a06bff;              /* 紫：次级强调、渐变中段 */
  --accent-3: #38e8d0;              /* 青：状态点、在线感、细节高光 */
}
[data-theme="light"] { /* 柔和日间变体，色相不变、明度翻转 */ }
```

**Color Rules:**
- 所有颜色通过 CSS 变量引用；WebGL 场景除外，但必须集中在 `lib/scene-colors.ts` 单点维护，与 CSS 变量保持同步。
- 单个 section 内只使用一个主强调色，紫/青只作渐变配角与状态色。
- 强调色只出现在文字、边框光晕、状态点上；禁止大面积色块。

## 3. Typography Rules

**Font Stack**（通过 next/font 加载，等效于以下 @import）:
```css
@import url('https://fonts.googleapis.com/css2?family=Geist:wght@400..700&family=Geist+Mono:wght@400..600&family=Noto+Sans+SC:wght@400;500;700&display=swap');
font-family: var(--font-noto-sc), var(--font-geist-sans), system-ui, sans-serif;
```

| Role | Font | Size | Weight | Line Height | Letter Spacing |
|------|------|------|--------|-------------|----------------|
| Hero H1 第一行 | Geist + Noto Sans SC | clamp(3rem → 6rem) | 300 | 1.02 | -0.03em |
| Hero H1 第二行（渐变） | Geist + Noto Sans SC | 同上 | 600 | 1.02 | 同上 |
| Section H2 | Geist + Noto Sans SC | clamp(1.875rem → 3rem) | 600 | 1.15 | -0.01em |
| H3（项目名） | Geist + Noto Sans SC | 1.5–1.875rem | 600 | 1.3 | — |
| Body | Noto Sans SC 优先 | 15–16px | 400 | 1.75 | 0.02em |
| Label / Eyebrow | Geist Mono | 11–12px | 500 | 1.5 | 0.35em |
| Mono / Code | Geist Mono | 12–14px | 400 | 1.6 | — |

**Typography Rules:**
- 中文页面必须显式引入中文字族（Noto Sans SC 在 font-family 链最前，英文 Geist 作 fallback）。
- 正文行高 ≥ 1.7，字距 0.02em；正文字号 ≥ 15px。
- Hero 采用 300/600 编辑排版字重对比：第一行细体，第二行 semibold 渐变，形成 editorial 层级。
- Heading weight ≥ 600；eyebrow 一律 Geist Mono 全大写 + 宽字距。
- **NEVER use**: Inter/Roboto 单独作为中文页主字体、系统宋体、Comic Sans、<13px 正文。

**Text Decoration:**
- Hero H1 第二行：允许渐变（accent → accent-2 → accent-3），无投影。
- Section H2 中的强调词：允许同款渐变；禁止标题发光（text-shadow）。

## 4. Component Stylings

### Buttons
```css
.btn { /* primary */
  border-radius: 9999px; padding: 0.75rem 1.75rem; font-size: 0.875rem;
  background: var(--accent); color: #fff;
  box-shadow: 0 0 30px -8px var(--accent);
  transition: all .3s ease;
}
.btn:hover { transform: translateY(-2px); box-shadow: 0 0 44px -6px var(--accent); }
.btn:active { transform: translateY(0); }
.btn:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }
.btn-ghost { background: transparent; border: 1px solid var(--line); color: var(--foreground); }
.btn-ghost:hover { border-color: var(--accent); color: var(--accent); }
```

### Cards
```css
.card {
  background: var(--card); border: 1px solid var(--line);
  border-radius: 1rem; backdrop-filter: blur(4px);
}
.card:hover {
  border-color: color-mix(in srgb, var(--accent) 40%, transparent);
  box-shadow: 0 0 40px -12px color-mix(in srgb, var(--accent) 55%, transparent);
}
```

### Navigation（Floating）
```css
.nav {
  position: fixed; top: 1.5rem; border-radius: 9999px;
  border: 1px solid var(--line); backdrop-filter: blur(12px);
  transition: transform .5s, opacity .5s, background .5s;
}
.nav.scrolled { background: var(--card); }
.nav.hidden-down { transform: translateY(-5rem); opacity: 0; }
.nav a.active { color: var(--accent); }
.nav a:focus-visible, .nav button:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; border-radius: 9999px; }
```

### Links
```css
.link { color: var(--muted); transition: color .3s; }
.link:hover { color: var(--accent); }
.link:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; border-radius: 4px; }
```

### Tags / Badges
```css
.chip {
  border: 1px solid var(--line); border-radius: 9999px;
  padding: 0.25rem 0.625rem; font-family: Geist Mono; font-size: 11px; color: var(--muted);
}
```

## 5. Layout Principles

**Container:**
- Max width: 1152px（max-w-6xl）；Hero 全屏居中
- Padding: 24px（移动）→ 24px（桌面，容器自身限制宽度）

**Spacing Scale:**
- Section padding: 112px（移动）→ 144px（桌面）
- Section 内标题→内容: 56px；组件 gap: 24–40px；卡片内边距: 16–24px

**Grid:**
```css
.grid-2 { display: grid; gap: 4rem; }           /* About: lg 起双列 */
.project-featured { grid-template-columns: 3fr 2fr; } /* lg 起，视觉 5 列分 3+2 */
.project-split { grid-template-columns: 1fr 1fr; }    /* md 起，左右交替 */
```

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| Flat | 无阴影，仅 1px var(--line) 边框 | chips、列表行 |
| Subtle | `0 0 40px -12px accent 55%` 光晕 | hover 卡片、主按钮 |
| Ambient | 大半径 radial-gradient 光斑（accent 8–14%） | Hero 背后、section 氛围层 |
| Depth | Three.js 雾 + 粒子远近 | 全局背景层（-z-10） |

## 7. Animation & Interaction

**Motion Philosophy**: 动画服务于内容——元素只从"微弱偏移 + 透明"进入视线，永远不抢阅读。
**Tier**: L3

**签名动效（6 类，对应红线）：**
1. Hero H1：GSAP 逐字 rotateX + 上移入场（一次性 timeline）
2. Section H2：WordReveal 逐词 rotateX/上移，滚动触发
3. Eyebrow/Label：ScrambleText 字符扰动→落定
4. CTA：Magnetic 磁吸 + 光泽扫过（pointer-fine 才启用）
5. 项目卡：SpotlightCard（radial-gradient 跟随指针）+ 3D tilt（max 4°）
6. 全局背景：Three.js 粒子星场 + 鼠标视差 + 滚动位移；CSS 噪点覆盖层

### Scroll Behavior
- Lenis：`lerp 0.1 / duration 1.1 / anchors: true`
- 入场统一 framer-motion `whileInView`，once，margin -80px，ease `[0.22, 1, 0.36, 1]`
- Hero→About 之间：纯 CSS 宣言横滚带（translateX keyframes）

### Special Effects
- 宣言横滚带、滚动到底小惊喜（Contact 复制邮箱的 sparkle 反馈）
- 鼠标视差：Hero 分层 depth 0.6/1，rAF 节流；背景场景 rotation lerp

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  .animate-float-y, .animate-pulse-dot, .marquee-track { animation: none; }
}
```
- framer-motion：`MotionConfig reducedMotion="user"`
- GSAP：检测 `prefers-reduced-motion` 后跳过 hero timeline
- Three.js：移动端粒子 500、dpr 1、frameloop demand

## 8. Do's and Don'ts

### Do
- 动画只操作 transform/opacity，入场一次性，不循环干扰阅读
- 每个可交互元素有 hover + focus-visible 两态
- 深色默认，光晕半径大、透明度低（≤14%）作为氛围而非装饰
- 内容真实可读：正文 15px+、行高 1.7、对比度达标
- 单页 WebGL 场景仅 1 个，rAF 驱动，tab 隐藏自动暂停（浏览器 rAF 机制）

### Don't
- ❌ 硬编码 hex（WebGL 集中到 lib/scene-colors.ts 除外）
- ❌ backdrop-filter > 14px 或覆盖大面积滚动区
- ❌ filter: blur() 用在持续移动的元素上
- ❌ 无限旋转、大弹跳、过度缩放等影响阅读的动画
- ❌ 等大三列卡片墙、Bootstrap 式布局、emoji 当图标
- ❌ 纯色块当图片占位
- ❌ 移动端直接缩放桌面布局；触摸目标 < 44×44px
- ❌ ScrollTrigger pin 超过 2 处；Lenis 与 pin-scrub/WebGL 叠加导致主线程阻塞

## 9. Responsive Behavior

**Breakpoints:**
| Name | Width | Key Changes |
|------|-------|-------------|
| Desktop | > 1024px | About 双列 + 星座图右侧；Featured 项目 3:2；导航完整展示 |
| Tablet | 768–1024px | 导航链接保留；项目 split 单列；星座图居中 |
| Mobile | < 768px | 汉堡菜单；所有 grid 单列；3D 粒子减半 + dpr 1 + frameloop demand；星座图 max-w-sm |

**Touch Targets:** minimum 44×44px（导航图标按钮 h-11 w-11）
**Collapsing Strategy:** 网格全部单列化；横滚带保留（纯 CSS 无性能成本）；TiltCard 在无 hover 设备自动不触发。

```css
@media (max-width: 768px) {
  .constellation { max-width: 24rem; }
  .nav-blur { backdrop-filter: blur(12px); }
}
```
