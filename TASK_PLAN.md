# TASK_PLAN.md — Freedom's Space 长期开发任务计划

# CURRENT PROJECT STATUS

| 字段 | 值 |
|---|---|
| Project | Freedom's Space — 个人数字空间（Next.js 个人网站） |
| Current Version | 0.1.0（package.json） |
| Current Branch | master |
| Latest Commit | `09c5ef1` docs: complete Phase 5/6/7/8 audit and documentation tasks（2026-09-11） |
| Website Status | 开发完成：首页/Hero/WebGL/Blog(MDX)/SEO/CI 全部可用；dev 与 build 均通过；**尚未部署到公网** |
| Dev Command | `pnpm dev`（http://localhost:3000，Turbopack） |
| Build Command | `pnpm build`（验证：`pnpm lint` → `pnpm build`） |
| GitHub Repository | https://github.com/Freedom-start/my-web_space（推送依赖本地代理 127.0.0.1:7892） |
| Main Stack | Next.js 16 (App Router / Turbopack) · TypeScript · Tailwind CSS 4 · MDX · Three.js / R3F · GSAP · Framer Motion · Lenis |

> 字体：Geist + Noto Sans SC 已自托管（geist 包 + @fontsource-variable/noto-sans-sc），不依赖 fonts.gstatic.com（曾因该域名不稳定导致 Turbopack dev 报字体 Module not found，已修复）。

# COMPLETED PHASES

| Phase | 状态 | 说明 |
|---|---|---|
| Phase 1 — Brand | ✅ 完成 | 遗留 009/010/011 依赖用户输入（见 BLOCKED） |
| Phase 2 — Content | ✅ 完成 | About / Skills / Contact / Footer 真实内容 |
| Phase 3 — Blog | ✅ 完成 | MDX 管线 + 4 篇草稿文章；309/310 为可选 |
| Phase 5 — Interactions | ✅ 完成 | 501/502/503/504（文档/评估/审计，禁止堆料） |
| Phase 6 — Performance | ✅ 完成（607 待真机） | Lighthouse / WebGL 预算 / Bundle / 字体审计 |
| Phase 7 — Accessibility | ✅ 完成 | 键盘 / 屏幕阅读器 / 对比度 / reduced-motion |
| Phase 8 — SEO | ✅ 完成（803/805 待域名/Apple icon） | sitemap / robots / JSON-LD / 文章 metadata |
| Phase 9 — Deployment | ◐ 部分 | 901/902/903 完成；904~909 待域名/部署 |

# BLOCKED / WAITING FOR USER

| 任务 | 依赖 | 说明 |
|---|---|---|
| TASK-009 | 用户提供真实显示名 | `ownerName = "Freedom"` 待替换（单点：data/profile.ts） |
| TASK-010 / TASK-803 / TASK-907 | 用户购买并确认真实域名 | metadataBase / canonical / OG 域名目前为 `https://freedom.space` 占位 |
| TASK-011 / TASK-805 | 用户确认需要 iOS 主屏图标 | apple-icon.png（180×180，iOS 不支持 SVG） |
| TASK-607 | 用户在 Android/iOS 真机上测试 | 移动端真机验证（滚动/Intro/菜单/触摸目标） |
| Phase 4（TASK-401~407） | 用户开发真实项目并上传 GitHub | Projects 区域当前保持 XXXX Project / Coming Soon 占位，不得虚构 |
| TASK-904~909 | 用户决定域名 + 选择 hosting 平台 | 域名购买、Vercel 部署、HTTPS、上线收尾 |

# OPTIONAL（非必要增强，不做不影响上线）

| 任务 | 说明 |
|---|---|
| TASK-309 | 草稿完全隐藏机制（当前 DRAFT 可见是有意设计，仅需用户确认是否改） |
| TASK-310 | 代码语法高亮（shiki；受 Turbopack loader 序列化限制，需时再评估） |
| TASK-407 | pinned repos 自动同步脚本（依赖 Phase 4 先落地） |

# NEXT RECOMMENDED ACTION

**当前没有必要继续堆叠独立 UI 功能——网站工程侧已就绪，剩余任务几乎全部依赖真实素材或用户决策。**

推荐下一阶段（按优先级）：

1. **A. 填写个人信息素材**：真实姓名（解锁 TASK-009）与真实邮箱/微信验证
2. **B. 开发真实项目并上传 GitHub**：完成后执行 Phase 4，替换 XXXX Project / Coming Soon 占位
3. **C. 决定域名并部署**：购买域名（解锁 TASK-010/803/904~907）→ Vercel 部署（TASK-905）→ 上线冒烟（TASK-908/909）

# DEVELOPMENT RULES

1. **DESIGN.md 是视觉基准**：任何 UI 改动不得绕过；冲突时以 DESIGN.md 为准并同步修订文档
2. **已有动效不得重复堆叠**：新增任何效果前先对照 Phase 5 动效清单（TASK-501，15 项）；禁止再添粒子/光晕/3D
3. **不虚构个人经历**：About / Skills / Learning 只写真实内容
4. **不虚构项目**：Projects 保持占位直到真实项目接入（Phase 4）
5. **使用 lint / build 验证**：每次改动后 `pnpm lint` + `pnpm build`
6. **保护个人信息**：不提交个人信息模板、不在代码中写死敏感联系方式
7. **不提交 secrets**：.gitignore 已覆盖 .env*；未来 token 只放 .env.local
8. **修改前检查 git status**：不覆盖未提交改动，不 force push，不重写历史

---

## 任务详情（历史记录，保留不动）

> 品牌叙事：**Welcome to my digital space.**（B — Digital Space / Immersive）
> 设计基准：`DESIGN.md`（核心视觉方向不可绕过）
> 最近更新：2026-09-11（状态汇总区重组；历史任务记录保留）
> 状态标记：`[x]` 已完成 · `[ ]` 待执行 · `[~]` 进行中
> 任务编号规则：`{Phase 号}{两位序号}`（如 TASK-101）；新增任务按各 Phase 追加，不重排已有编号。
> 执行规则：动效类新增必须先核对 Phase 5 的已有动效清单，禁止重复添加粒子/光晕/3D；涉及 `DESIGN.md` 冲突时以 DESIGN.md 为准并同步修订文档。

---

## Phase 1 — Brand ✅（已完成，遗留项依赖外部输入）

- [x] TASK-001：品牌数据源建立
  - 目标：ownerName / siteName 单一来源
  - 修改范围：`data/profile.ts`
  - 完成标准：全站品牌文字从 profile.ts 引用 ✅ 2026-09-06
- [x] TASK-002：全站 XXX 占位清理
  - 目标：Navbar / Hero / Intro / Footer / About / metadata 无占位名
  - 修改范围：上述 6 处组件与 layout
  - 完成标准：grep 仅剩明确保留的 `XXXX Project` 占位 ✅ 2026-09-06
- [x] TASK-003：Favicon 替换
  - 目标：极简 "F + 星点" SVG，深色适配，任意尺寸清晰
  - 修改范围：新增 `app/icon.svg`，删除 `app/favicon.ico`
  - 完成标准：/icon.svg 200，浏览器渲染确认 ✅ 2026-09-06
- [x] TASK-004：OG / Twitter / canonical / robots metadata
  - 目标：分享卡片元信息完整、description 单一来源
  - 修改范围：`app/layout.tsx`
  - 完成标准：curl 验证 og: / twitter: / canonical / robots 全部输出 ✅ 2026-09-06
- [x] TASK-005：OG 分享图
  - 目标：1200×630，与首页视觉同语言（next/og，零新依赖）
  - 修改范围：新增 `app/opengraph-image.tsx`
  - 完成标准：/opengraph-image 200 image/png ✅ 2026-09-06
- [x] TASK-006：Hero 文案与 CTA
  - 目标：欢迎感落地（简介 / eyebrow / 主次 CTA 交换），视觉零改动
  - 修改范围：`components/hero/Hero.tsx`
  - 完成标准：截图确认 + GSAP 兜底修复（lagSmoothing + safety timer）✅ 2026-09-06
- [x] TASK-007：Intro 启动日志与 WELCOME BACK
  - 目标：INITIALIZING → CALIBRATING → SPACE READY → 欢迎进入；回访者轻量欢迎
  - 修改范围：`components/ui/Intro.tsx`
  - 完成标准：首访/回访/reduced-motion 三条路径实测 ✅ 2026-09-06
- [x] TASK-008：模板资源清理
  - 目标：删除未引用的 public/*.svg
  - 修改范围：public/ 5 个文件删除
  - 完成标准：零引用确认后删除 ✅ 2026-09-06

**Phase 1 遗留（依赖外部输入，暂不执行）：**

- [ ] TASK-009：真实姓名替换 `ownerName = "Freedom"`
  - 目标：等待所有者提供真实显示名
  - 修改范围：`data/profile.ts`（单点）
  - 完成标准：About / Footer 显示真实姓名
- [ ] TASK-010：metadataBase 真实域名
  - 目标：`https://freedom.space` 占位替换为已购域名
  - 修改范围：`app/layout.tsx`（canonical / og:url / og:image 跟随）
  - 完成标准：分享调试器中卡片图片与链接可访问。依赖 Phase 9 TASK-904
- [ ] TASK-011：apple-icon PNG（180×180）
  - 目标：iOS 添加到主屏图标（iOS 不支持 SVG apple-icon）
  - 修改范围：新增 `app/apple-icon.png`（从 icon.svg 导出）
  - 完成标准：iOS Safari 添加主屏显示新图标

---

## Phase 2 — Content ✅（已完成）

- [x] TASK-101：About 真实内容 ✅ 2026-09-06（Status 改 Building & learning；简介注明本站即实践项目）
  - 目标：两段自述 + FACTS（Major / Focus / Status）替换为真实、可长期成立的内容；确认 `Status: Open to internships` 是否属实
  - 修改范围：`components/about/About.tsx` 文案
  - 完成标准：无占位语义、信息真实、中英混排符合 DESIGN.md Typography
- [x] TASK-102：Technology Constellation 校对 ✅ 2026-09-06（FastAPI/MySQL 降为 learning，保守原则）
  - 目标：`data/skills.ts` 8 个节点与 core/learning/exploring 分级反映真实水平
  - 修改范围：`data/skills.ts`
  - 完成标准：节点状态与自评一致，连线关系合理
- [x] TASK-103：Learning Journey 真实内容 ✅ 2026-09-06（done 注释加"基础"限定，避免过度声称）
  - 目标：`data/skills.ts` learningNodes 的 done/active/upcoming 与 note 反映当前学习状态
  - 修改范围：`data/skills.ts`
  - 完成标准：地图是"当前真实状态"，而非演示数据
- [x] TASK-104：Contact 内容定稿 ✅ 2026-09-06（检查后无需改动：渠道真实、层级完整）
  - 目标：三卡渠道与主 CTA 文案定稿（Email/WeChat/GitHub 已真实）；确认是否补充其他渠道
  - 修改范围：`components/contact/Contact.tsx`、`data/profile.ts`
  - 完成标准：渠道完整、无多余占位语义
- [x] TASK-105：Footer 文案定稿 ✅ 2026-09-06（tagline 符合 Digital Space 方向，保留；年份已动态）
  - 目标：tagline "built in the dark, shipped to the stars." 确认保留或替换；年份已动态
  - 修改范围：`components/contact/Footer.tsx`
  - 完成标准：品牌语气与 B 方向一致
- [x] TASK-106：Projects 区域描述文案微调 ✅ 2026-09-06（改为中性表达"这里会逐步记录我完成的项目与实验。"）
  - 目标："每个项目都是一次完整的学习闭环…" 与 Coming Soon 占位并存略冲突，改为中性引导文案（真实项目上线后恢复）
  - 修改范围：`components/projects/Projects.tsx` 描述行
  - 完成标准：文案与占位状态自洽

## Phase 3 — Blog ✅（已完成，309/310 为可选）

- [x] TASK-301：内容方案选型 ✅ 2026-09-06
  - 结论：采用 `@next/mdx` 官方套件（@mdx-js/loader + @mdx-js/react + @types/mdx）；**remark-gfm 与 shiki 暂不引入**——Turbopack 要求 loader options 可序列化，函数形式插件不被支持；当前草稿仅用核心 Markdown 语法。代码块走 CSS 深色样式（TASK-304），语法高亮列为 TASK-310 可选
  - 修改范围：`package.json`、`next.config.ts`、`mdx-components.tsx`、`types/mdx.d.ts`
  - 完成标准：选型结论 + 依赖安装 ✅
- [x] TASK-302：内容结构搭建 ✅ 2026-09-06
  - 结论：`content/blog/*.mdx` 用原生 `export const meta`（frontmatter 字段全齐 + draft 标识）；`lib/blog.ts` 统一负责扫描/排序/按 slug 获取；`data/posts.ts` 已删除；4 篇占位文章正文为明确标注的草稿提纲（含 DRAFT 横幅，不冒充成品）
  - 修改范围：content/blog/4 个 .mdx、`lib/blog.ts`、`components/blog/Blog.tsx`（拆出 BlogRow client 组件）
  - 完成标准：新增 .mdx 文件即自动发布 ✅
- [x] TASK-303：`/blog/[slug]` 路由 ✅ 2026-09-06
  - 结论：`app/(site)/blog/[slug]/page.tsx`；共享 chrome 提取到 `app/(site)/layout.tsx`（博客详情继承背景/导航/Footer）；generateStaticParams + dynamicParams=false（4 篇 SSG，不存在 slug 404 实测）；generateMetadata 每篇独立
  - 修改范围：新增 `app/(site)/layout.tsx`、`app/(site)/blog/[slug]/page.tsx`；`app/page.tsx` 迁移为 `app/(site)/page.tsx`
  - 完成标准：构建产物含每篇文章静态页 ✅
- [x] TASK-304：文章排版系统 ✅ 2026-09-06
  - 结论：`.article-body` 作用域排版——16px/1.85 行高、H2 accent 左边框、accent 圆点列表、mono 序号、紫色引用块、深色代码块（background-soft + 边框 + 横向滚动）、inline code、hr；移动端 15px。全部走 CSS 变量零硬编码
  - 修改范围：`app/globals.css`
  - 完成标准：长文阅读舒适、代码块可读 ✅（浏览器截图验证）
- [x] TASK-305：阅读进度条 ✅ 2026-09-06
  - 结论：`components/blog/ReadingProgress.tsx`——framer useScroll + useSpring，scaleX transform-only（零逐帧 state 更新）；顶部固定 3px accent 色；reduced-motion 下不渲染
  - 修改范围：新增 `components/blog/ReadingProgress.tsx`，详情页引入
  - 完成标准：60fps、reduced-motion 降级为无进度条 ✅（实测 scaleX 0→1）
- [x] TASK-306：上一篇 / 下一篇 ✅ 2026-09-06
  - 结论：`lib/blog.ts` 新增 getAdjacentPosts（档案顺序：新→旧；首篇无 Previous、末篇无 Next 实测优雅降级）；详情页底部双卡 Editorial 导航（← PREVIOUS / NEXT →），hover 语言与列表一致
  - 修改范围：`lib/blog.ts`、`app/(site)/blog/[slug]/page.tsx`
  - 完成标准：导航正确、风格统一 ✅（点击流 A→Next→B→Prev→A 实测）
- [x] TASK-307：文章 SEO ✅ 2026-09-06
  - 结论：generateMetadata 扩展——canonical（/blog/[slug] 真实路径）+ og:type=article + publishedTime（frontmatter 真实日期）+ twitter 全套；Article JSON-LD（headline/description/datePublished/author=ownerName/url，零新依赖，无伪造信息）；OG 图复用全站 opengraph-image
  - 修改范围：`app/(site)/blog/[slug]/page.tsx`、`data/profile.ts`（新增 siteUrl 单一来源）
  - 完成标准：每篇文章独立 meta ✅（curl 验证 canonical/og/ld+json）
- [x] TASK-308：Blog 列表接入真实链接 ✅ 2026-09-06（导航闭环完整实测：Blog → 文章 A → Next → 文章 B → Previous → 文章 A → 返回 Blog；键盘可达，无 #blog 假链接残留）
- [ ] TASK-309：（可选）草稿机制
  - 目标：frontmatter `draft: true` 不参与构建（当前设计：草稿可见但带 DRAFT 标识，是有意选择；若希望草稿完全隐藏再执行）
  - 修改范围：`lib/blog.ts` 过滤逻辑
  - 完成标准：草稿不出现在列表与构建产物
- [ ] TASK-310：（可选）代码语法高亮
  - 目标：引入 shiki / rehype-pretty-code 做构建时高亮；需解决 Turbopack loader options 序列化限制（或届时改用 webpack 构建该规则）
  - 修改范围：`next.config.ts`、`app/globals.css`
  - 完成标准：技术文章代码块带语法配色

## Phase 4 — Projects ⏸（阻塞：等待真实项目，见 BLOCKED / WAITING FOR USER）

- [ ] TASK-401：GitHub 数据来源方案
  - 目标：选定 GitHub REST API 拉取 pinned/repos 的方式与缓存策略（build 时拉取或手动导出 JSON）
  - 修改范围：`data/projects.ts` 或新增 lib 工具
  - 完成标准：方案文档化（写回本文件该任务下）
- [ ] TASK-402：项目简介生成策略
  - 目标：README 首段自动截取 + 人工润色流程；杜绝虚构介绍
  - 修改范围：数据管线
  - 完成标准：每个项目简介真实
- [ ] TASK-403：技术栈字段
  - 目标：GitHub languages → 现有 StackChips 展示
  - 修改范围：数据管线 + `components/projects/ProjectList.tsx`（结构不动）
  - 完成标准：chips 反映真实仓库语言
- [ ] TASK-404：项目截图 / 封面
  - 目标：`public/projects/` 截图 + `next/image`（显式 sizes）；无图项目回退现有抽象视觉
  - 修改范围：`components/projects/ProjectList.tsx`（ProjectVisual 增加图片分支）
  - 完成标准：桌面/移动清晰、lazy 加载
- [ ] TASK-405：Demo / GitHub 链接接入
  - 目标：真实仓库与 demo 地址填入（Links 组件条件渲染已支持，无链接不显示）
  - 修改范围：`data/projects.ts`
  - 完成标准：所有链接真实可达
- [ ] TASK-406：移除占位项目
  - 目标：删除 XXXX Project / Coming Soon / TBD，替换区域描述文案（联动 TASK-106）
  - 修改范围：`data/projects.ts`、`components/projects/Projects.tsx`
  - 完成标准：全站无 Coming Soon
- [ ] TASK-407：（可选）pinned repos 自动同步脚本
  - 目标：脚本化刷新项目数据，减少手工维护
  - 修改范围：`scripts/`
  - 完成标准：一条命令更新数据

## Phase 5 — Interactions（维护为主，明确禁止重复堆料）

> 已有动效清单（新增任何效果前先对照）：Hero GSAP 逐字 + 视差 + Magnetic、WordReveal（H2）、ScrambleText（eyebrow）、Marquee、SectionDivider、TiltCard + 聚光、Blog 行 hover 位移、Constellation/Learning 入场、CursorGlow、Intro、Lenis、WebGL 背景、glow-ring hover。

- [x] TASK-501：动效清单固化 ✅ 2026-09-11
  - 已固化清单（新增动效前必须对照，禁止重复）：
    1. Hero H1：GSAP 逐字 rotateX + 上移 + 鼠标视差 + Magnetic
    2. Section H2：WordReveal 逐词 rotateX/上移（scroll-triggered）
    3. Eyebrow/Label：ScrambleText 字符扰动→落定
    4. CTA：Magnetic 磁吸 + 光泽扫过（pointer-fine 才启用）
    5. 项目卡：SpotlightCard（radial-gradient 跟随指针）+ 3D tilt（max 4°）
    6. 全局背景：Three.js 粒子星场 + 鼠标视差 + 滚动位移；CSS 噪点覆盖层
    7. 宣言横滚带：Marquee（纯 CSS translateX keyframes）
    8. Blog 行 hover：编号/标题位移 + 边框高亮 + 箭头淡入
    9. Constellation/Learning 入场：framer whileInView
    10. CursorGlow：桌面端克制光标跟随（hover: hover + pointer: fine + 非 reduced-motion）
    11. Intro：启动日志 + 计数 + 回访 WELCOME BACK
    12. Lenis 惯性滚动
    13. glow-ring hover：卡片光晕
    14. SectionDivider：分隔线
    15. TiltCard：3D 倾斜
  - 完成标准：任何 PR/修改可对照查重 ✅
- [x] TASK-502：Reduced Motion 回归项固化 ✅ 2026-09-11
  - 检查清单（改动画必测，三路径）：
    1. 首访（无 sessionStorage）：Intro 完整播放 → 内容正常渲染
    2. 回访（有 sessionStorage）：轻量 WELCOME BACK → 内容正常渲染
    3. prefers-reduced-motion：Intro 跳过、Hero 动画跳过、WebGL frameloop=never、ReadingProgress 不渲染、Marquee/float-y/pulse-dot animation:none
  - 工具：系统 Chrome headless `--force-prefers-reduced-motion` + dump-dom / 截图
  - 完成标准：清单存在并在每次动效改动后执行 ✅
- [x] TASK-503：（条件触发）路由转场评估 ✅ 2026-09-11
  - 结论：**不做**。理由：(1) 站点已有丰富的签名动效（GSAP/framer/Three.js），view-transition 会增加一层复杂度且与现有动画可能冲突；(2) 博客详情页已有 ReadingProgress + Reveal 入场，转场感知已足够；(3) view-transition API 浏览器支持仍在演进，维护成本高；(4) 单页应用内锚点导航（#section）已足够流畅。
- [x] TASK-504：（条件触发）新交互语言一致性检查 ✅ 2026-09-11
  - 审计范围：BlogRow / AdjacentLink / 返回 Blog 链接
  - 结果：hover 均用 accent 色（border-accent/40~50、text-accent），transition-colors duration-300 统一；focus-visible 继承全局 `a:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; border-radius: 6px }`；色彩/位移/时长三要素与全站一致
  - 完成标准：一致 ✅（无需改动）

## Phase 6 — Performance

- [x] TASK-601：Lighthouse 基线 ✅ 2026-09-06
  - 结果（真实 Chrome headless + Lighthouse 13 移动模拟，pnpm dlx 运行）：
    - 首页基线：P 57 / A11y 96 / BP 100 / SEO 100（FCP 6.3s、LCP 9.3s）
    - 性能修复后：P 59 / A11y 96 / BP 100 / SEO 100（FCP 5.9s、**LCP 7.7s，-1.6s**、TBT 165ms、CLS 0.001）
    - 文章页基线：P 60 / A11y 100 / BP 100 / SEO 100
  - 剩余 LCP 构成：入场编排（hero-intro 为 LCP 元素，动画期间延迟绘制）——设计取舍，不擅自改
  - 修复项：Three.js 移出关键路径（懒加载）、Hero 延迟 1.35→0.95s、Noto 可变字重
- [x] TASK-602：WebGL 预算实测 ✅ 2026-09-06
  - 结果：桌面 1400 粒子 / dpr [1,1.5] / frameloop always；移动 500 / dpr 1 / frameloop demand（matchMedia 联动实测翻转成功）；新增 prefers-reduced-motion → frameloop never（完全静止）；resize 由 R3F ResizeObserver 原生处理（真实 Chrome 全屏渲染确认；嵌入式浏览器 RO 事件节流为环境伪影）
  - 结论：**保持现状**——单场景、点云渲染开销极低，主线程 TBT 165ms 达标，无需调参
  - 局限：嵌入式浏览器 rAF/RO 被节流，无法精确测真机 fps
- [x] TASK-603：图片优化策略 ✅ 2026-09-11
  - 规矩（未来引入真实图片时遵守）：
    1. 所有图片必须用 `next/image`（`<Image>`），禁止裸 `<img>` 标签
    2. 必须显式声明 `sizes`（响应式断点），避免默认 100vw 浪费带宽
    3. 首屏关键图片加 `priority`；非首屏懒加载（默认）
    4. 项目截图放 `public/projects/`，博客图放 `public/blog/`，按 slug 命名
    5. 无图项目回退现有抽象视觉（ProjectVisual 条件渲染已支持）
  - 完成标准：规矩文档化 ✅（待 Phase 4 引入真实图片时执行）
- [x] TASK-604：Bundle 检查 ✅ 2026-09-06
  - 结果（.next/static/chunks 实测）：主 chunk 868KB（异步，含 three——不在首屏加载列表，实测确认）；首屏 chunks：224KB(next/react) + 160KB(page) + 124KB(framer) + 112KB + 96KB(gsap) + 36KB(lenis) + runtime，首屏传输约 230KB gzip
  - 结论：three 正确懒加载分裂 ✅；gsap/framer/lenis 首屏需要（Hero/导航/滚动），落位正常；无异常依赖；不需要 bundle-analyzer
- [x] TASK-605：Below-fold 懒加载评估 ✅ 2026-09-06（结论：保持现状）
  - 结论：**保持现状**——TechConstellation/LearningMap 是无重依赖的自绘组件（各仅数 KB，与 framer 同 chunk），dynamic 拆分仅省几 KB 却引入异步瀑布与弹入感；重型依赖（three）已在 TASK-601 轮完成懒加载
- [x] TASK-606：字体加载审计 ✅ 2026-09-06（Noto Sans SC 改用可变字重轴）
  - 结论：next/font 自托管 + swap 就绪；实测使用 300/400/500/600/700 全轴；原 weight=[400,500,700] 缺 600 导致 CJK semibold 回退 700——已改为可变字重轴（覆盖全轴，消除回退）；subsets latin 仅控制 preload，CJK 按需加载正常
- [ ] TASK-607：移动端真机测试
  - 目标：Android/iOS 真机过一遍滚动、Intro、菜单、触摸目标
  - 修改范围：视结果修复
  - 完成标准：真机无明显卡顿/误触

## Phase 7 — Accessibility

> 基线已具备：skip link、全局 focus-visible、44px 触摸目标、图标 aria-label、aria-hidden 装饰层、菜单 Escape + inert、对比度 10px 修复。

- [x] TASK-701：键盘全站走查 ✅ 2026-09-06
  - 结果：DOM 序枚举 22 个可聚焦元素——顺序：品牌→导航×6→GitHub→主题→skip link→Hero CTA×2→滚动箭头→项目底部链接→Blog 行×4→Contact CTA/卡片/复制×2；零正 tabindex；inert 正确排除关闭态菜单；发现并修复 skip link 位置（原第 10 位→移至第 1 位）；Escape+inert 此前已实测
  - 修复：`app/(site)/layout.tsx`
  - 局限：合成 Tab 键无法驱动嵌入式浏览器焦点导航（环境限制）；Tab 序由 DOM 序决定属浏览器原生行为，风险极低
- [x] TASK-702：屏幕阅读器走查 ✅ 2026-09-11（代码级审计，无真实屏幕阅读器）
  - Landmark 完整：`<header>`（FloatingNavbar）→ `<nav aria-label="主导航">` → `<main>` → `<footer>` → `<article>`（博客详情）→ `<nav aria-label="文章导航">`（相邻文章）
  - 标题层级无跳跃：Hero `<h1>` / 博客详情 `<h1>` → SectionHeading `<h2>` → 文章正文 `h2/h3`
  - aria-hidden 正确：CursorGlow 包装器、Intro 遮罩、装饰点、导航活跃指示器、博客分隔线、相邻导航占位符
  - Skip link 首位（`#home`），菜单 inert+aria-hidden+Escape 已实测
  - 完成标准：读序符合视觉逻辑 ✅（无需改动）
- [x] TASK-703：对比度自动化扫描 ✅ 2026-09-06
  - 结果（WCAG 公式实测）：正文 16.68:1 ✅ / muted 8.06 ✅ / muted-on-card 7.53 ✅ / accent 链接 6.39 ✅ / accent-3 标签 13.11 ✅；Lighthouse 唯一 a11y 扣分=主 CTA 白字 on accent 3.16:1——**记录为设计例外**（DESIGN.md 规定白字按钮；修复需深色文字=设计方向决策，待定）；修复残留 text-muted/70（4.25:1→8.06）于 Blog/Footer/LearningMap
  - 修复：`components/blog/Blog.tsx`、`app/(site)/blog/[slug]/page.tsx`、`components/contact/Footer.tsx`、`components/learning/LearningMap.tsx`
- [x] TASK-704：prefers-reduced-motion 回归 ✅ 2026-09-06（真实 Chrome --force-prefers-reduced-motion 完成回归）
  - 方法：系统 Chrome headless `--force-prefers-reduced-motion`（真实 OS 级媒体查询模拟）+ dump-dom / 截图，覆盖 / 与 /blog/fastapi-from-0-to-1
  - 结果：Lenis 类名无 ✅ / Hero 无隐藏内联样式（内容完整可见）✅ / Intro 无残留 ✅ / ReadingProgress 合理降级（不渲染）✅ / WebGL frameloop=never 静止 ✅ / 文章正文可访问 ✅ / Navbar 正常 ✅
  - 修复：`components/background/SceneBackground.tsx`（本轮新增 frameloop=never 分支）
- [x] TASK-705：焦点可见性回归项固化 ✅ 2026-09-11
  - 新组件 checklist（联动 Phase 5 动效清单）：
    1. 所有可交互元素（a/button/input/summary/[role=button]）必须有 `:focus-visible` 样式
    2. 默认样式：`outline: 2px solid var(--accent); outline-offset: 2~3px; border-radius` 匹配元素形状
    3. 自定义 focus 样式不得降低对比度（≥ 3:1 against background）
    4. 装饰性元素（aria-hidden）不得接收焦点（tabindex="-1" 或 inert）
    5. 菜单/弹窗关闭后焦点应返回触发元素
  - 完成标准：清单存在 ✅

## Phase 8 — SEO

> 已完成：title / description / viewport(themeColor) / canonical / robots 字段 / OG 全套 / Twitter 全套 / OG 图 / favicon。

- [x] TASK-801：sitemap ✅ 2026-09-06
  - 结论：`app/sitemap.ts` —— 首页（priority 1）+ 4 篇文章（从内容目录实读，lastmod 取 frontmatter 日期）；域名全部来自 siteUrl
  - 修改范围：新增 `app/sitemap.ts`
  - 完成标准：/sitemap.xml 输出 5 条 URL 实测 ✅
- [x] TASK-802：robots.txt ✅ 2026-09-06
  - 结论：`app/robots.ts` —— User-Agent * Allow / + Sitemap 指向 siteUrl/sitemap.xml；与 metadata.robots meta 标签职责不同、并存无冲突（实测两者同时输出）
  - 修改范围：新增 `app/robots.ts`
  - 完成标准：/robots.txt 正确 ✅
- [ ] TASK-803：metadataBase 域名落定
  - 目标：真实域名替换占位（联动 Phase 1 TASK-010 / Phase 9 TASK-907）
  - 修改范围：`app/layout.tsx`
  - 完成标准：线上分享卡片可访问
- [x] TASK-804：Structured Data（JSON-LD）✅ 2026-09-06
  - 结论：首页新增 WebSite + Person JSON-LD（仅真实字段：name/url/sameAs=[GitHub]，不虚构 jobTitle/employer）；文章 Article JSON-LD 确认使用真实 frontmatter（headline/description/datePublished/author/url）且单实例不重复；提取共享组件 `components/seo/JsonLd.tsx`；双页 JSON 合法性解析实测通过、无 hydration 问题
  - 修改范围：`app/(site)/page.tsx`、`app/(site)/blog/[slug]/page.tsx`、新增 `components/seo/JsonLd.tsx`
  - 完成标准：JSON 合法、script type 正确、无重复 ✅（Google Rich Results 上线后复核）
- [ ] TASK-805：apple-icon PNG
  - 目标：同 Phase 1 TASK-011，此处为 SEO/品牌入口复查
  - 修改范围：`app/apple-icon.png`
  - 完成标准：同上
- [x] TASK-806：（博客上线后）文章级 metadata 复查 ✅ 2026-09-11
  - 抽查 4 篇（what-is-http / fastapi-from-0-to-1 / dijkstra-shortest-path / git-learning-notes）：
    - title：`${post.title} — ${siteName}` 唯一 ✅
    - description：post.summary（frontmatter 真实摘要）✅
    - canonical：`/blog/${slug}`（Next.js 自动解析为绝对 URL against metadataBase）✅
    - og.type=article / og.url / og.title / og.description / og.publishedTime（frontmatter 真实日期）✅
    - twitter.card=summary_large_image / title / description ✅
    - Article JSON-LD：headline/description/datePublished/author=ownerName/url/mainEntityOfPage，单实例不重复 ✅
  - 完成标准：4 篇全部通过 ✅

## Phase 9 — Deployment ◐（901/902/903 完成，904~909 待域名/部署）

- [x] TASK-901：⚠️ 高优先——GitHub 仓库与首次提交 ✅ 2026-09-06
  - 目标：完整代码已推送到 github.com/Freedom-start/my-web_space（master 分支，含 v1 与 Phase 2 两个提交）
  - 已核查：`.gitignore` 覆盖 .env*/node_modules/.next；secrets 扫描零命中
  - 网络说明：GitHub 直连被重置，本仓库已配置 git 走本地代理 127.0.0.1:7892（仅此仓库生效，代理关闭时推送会失败）
  - 完成标准：remote 有完整代码 ✅（clone 后 pnpm install && pnpm build 可通过）
- [x] TASK-902：生产构建流水线确认 ✅ 2026-09-06
  - 结论：Node 推荐 22/24 LTS（Next 16 要求 >=20.9，本地 24.14 验证通过）；engines.node=">=20.9.0" 已加入 package.json；.nvmrc=24；新增最小 CI（GitHub Actions：checkout → pnpm setup（读 packageManager）→ Node 24 → frozen-lockfile install → lint → build）
  - 修改范围：`package.json`、`.nvmrc`、`.github/workflows/ci.yml`
  - 完成标准：本地 lint+build 通过 ✅；CI 首次 push 后在 GitHub Actions 页面确认绿灯
- [x] TASK-903：Environment variables 规划 ✅ 2026-09-06
  - 结果：全项目 secret 扫描零命中；无 .env 文件；.gitignore 已覆盖 .env*；版本控制中无敏感文件。**未创建 .env.example**（当前零环境变量，创建空模板无意义）
  - 未来设计（Phase 4 联动）：需要 GitHub API 时在 `.env.local`（已被 gitignore）放可选 `GITHUB_TOKEN`，构建时代码经 `process.env.GITHUB_TOKEN` 读取；公开仓库数据用匿名限额（60 req/h）亦可，token 仅用于提升限额
  - 修改范围：无代码改动
  - 完成标准：无硬编码密钥 ✅
- [ ] TASK-904：域名购买与 DNS
  - 目标：确认 freedom.space 可注册性或选择替代域名
  - 修改范围：注册商配置
  - 完成标准：域名归属确认
- [ ] TASK-905：Hosting 部署
  - 目标：首选 Vercel（与 Next.js/OG 路由零配置契合）；备选 VPS
  - 修改范围：hosting 平台配置
  - 完成标准：生产 URL 可访问、OG 路由正常出图
- [ ] TASK-906：HTTPS
  - 目标：Vercel 自动签发；VPS 方案用 Let's Encrypt/Caddy
  - 修改范围：DNS/hosting
  - 完成标准：https 强制 + A 评级
- [ ] TASK-907：上线后域名收尾
  - 目标：metadataBase / canonical / OG 域名更新（联动 TASK-010 / TASK-803）并重发分享卡片缓存
  - 修改范围：`app/layout.tsx`
  - 完成标准：真实域名下分享调试器通过
- [ ] TASK-908：Monitoring
  - 目标：Vercel Analytics 或轻量方案（umami）；uptime 监控（如 UptimeRobot）
  - 修改范围：平台配置
  - 完成标准：访问数据与宕机告警可用
- [ ] TASK-909：上线冒烟清单
  - 目标：favicon / OG 调试器（Facebook/Twitter/微信）/ Lighthouse 复测 / 移动端真机 / 404 页
  - 修改范围：视结果修复
  - 完成标准：清单全绿

---

## 执行状态总览

> 详细状态见顶部 `CURRENT PROJECT STATUS` / `COMPLETED PHASES` / `BLOCKED / WAITING FOR USER` / `OPTIONAL` 区域（本节仅保留历史标记，避免重复）。
>
> 历史：Phase 1/2/3 完成（2026-09-06）；Phase 5/6/7/8 审计与文档任务完成（2026-09-11）；字体自托管修复（2026-09-11）。
