export const navLinks = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "blog", label: "Blog" },
  { id: "learning", label: "Learning" },
  { id: "contact", label: "Contact" },
] as const;

/** 网站所有者显示名（暂定，有真实姓名后只改这里） */
export const ownerName = "Freedom";

/** 网站品牌名：用于 Navbar / Intro / metadata / Footer 等品牌位置；Hero 不机械重复它 */
export const siteName = "Freedom's Space";

export const githubUrl = "https://github.com/Freedom-start";
export const email = "freedomwahh@gmail.com";
export const wechat = "XQ_0Freedom";

/** 从 githubUrl 自动派生显示用 handle（如 @Freedom-start），改 githubUrl 即全站生效 */
export const githubHandle = `@${githubUrl.replace(/\/+$/, "").split("/").pop()}`;
