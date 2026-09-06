export interface SkillNode {
  name: string;
  /** 相对坐标 (0-100)，用于星座图布局 */
  x: number;
  y: number;
  level: "core" | "learning" | "exploring";
}

export const skillNodes: SkillNode[] = [
  { name: "Python", x: 22, y: 30, level: "core" },
  { name: "C++", x: 55, y: 18, level: "core" },
  { name: "JavaScript", x: 82, y: 28, level: "core" },
  { name: "TypeScript", x: 88, y: 58, level: "learning" },
  { name: "FastAPI", x: 62, y: 52, level: "core" },
  { name: "MySQL", x: 35, y: 62, level: "core" },
  { name: "Git", x: 55, y: 84, level: "core" },
  { name: "Next.js", x: 80, y: 84, level: "learning" },
];

/** 星座图中的连接（按索引对） */
export const skillLinks: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [1, 4],
  [4, 3],
  [4, 5],
  [5, 6],
  [6, 7],
  [3, 7],
];

export interface LearningNode {
  name: string;
  /** 地图坐标 (0-100) */
  x: number;
  y: number;
  status: "done" | "active" | "upcoming";
  note?: string;
}

export const learningNodes: LearningNode[] = [
  { name: "C++", x: 10, y: 42, status: "done", note: "语法 / STL" },
  { name: "Data Structures", x: 30, y: 22, status: "done", note: "链表 / 树 / 图" },
  { name: "Python", x: 30, y: 66, status: "done", note: "脚本 / 爬虫" },
  { name: "Operating Systems", x: 50, y: 42, status: "active", note: "正在学习" },
  { name: "FastAPI", x: 50, y: 82, status: "done", note: "REST / ORM" },
  { name: "Computer Networks", x: 70, y: 20, status: "active", note: "TCP / HTTP" },
  { name: "Computer Organization", x: 70, y: 62, status: "upcoming", note: "计划中" },
  { name: "AI", x: 90, y: 42, status: "upcoming", note: "下一个目标" },
];

export const learningLinks: [number, number][] = [
  [0, 1],
  [0, 2],
  [1, 3],
  [2, 4],
  [3, 5],
  [3, 6],
  [5, 7],
  [6, 7],
];
