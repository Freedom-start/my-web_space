export interface Post {
  index: string;
  title: string;
  category: string;
  date: string;
  readingTime: string;
}

export const posts: Post[] = [
  {
    index: "01",
    title: "FastAPI 从 0 到 1",
    category: "Backend",
    date: "2025-08",
    readingTime: "12 min",
  },
  {
    index: "02",
    title: "HTTP 到底是什么",
    category: "Network",
    date: "2025-06",
    readingTime: "8 min",
  },
  {
    index: "03",
    title: "Dijkstra 最短路算法",
    category: "Algorithm",
    date: "2025-04",
    readingTime: "10 min",
  },
  {
    index: "04",
    title: "Git 学习记录",
    category: "Tooling",
    date: "2025-02",
    readingTime: "6 min",
  },
];
