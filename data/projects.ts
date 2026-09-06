export interface Project {
  id: string;
  index: string;
  name: string;
  tagline: string;
  description: string;
  stack: string[];
  github?: string;
  demo?: string;
  year: string;
  layout: "featured" | "split";
  accent: string;
}

export const projects: Project[] = [
  {
    id: "project-01",
    index: "01",
    name: "XXXX Project",
    tagline: "Coming Soon",
    description: "项目详情整理中，敬请期待。",
    stack: [],
    year: "TBD",
    layout: "featured",
    accent: "var(--accent)",
  },
  {
    id: "project-02",
    index: "02",
    name: "XXXX Project",
    tagline: "Coming Soon",
    description: "项目详情整理中，敬请期待。",
    stack: [],
    year: "TBD",
    layout: "split",
    accent: "var(--accent-2)",
  },
  {
    id: "project-03",
    index: "03",
    name: "XXXX Project",
    tagline: "Coming Soon",
    description: "项目详情整理中，敬请期待。",
    stack: [],
    year: "TBD",
    layout: "split",
    accent: "var(--accent-3)",
  },
];
