export type NoteCategory =
  | "技术"
  | "工程"
  | "设计"
  | "产品"
  | "读书"
  | "随想"
  | "情感"
  | "生活";

export type NotePost = {
  id: string;
  serial: number;
  title: string;
  excerpt: string;
  category: NoteCategory;
  date: string;
  readTime: string;
  coverClass: string;
  coverImage?: string;
  pinned?: boolean;
  content: string[];
};

const BASE_POSTS: NotePost[] = [
  {
    id: "engineering-scroll-experience",
    serial: 100594,
    title: "滚动体验的工程化拆解",
    excerpt:
      "从滚动阈值、节流锁到视觉过渡，如何把“看起来顺滑”拆成可以迭代的参数系统。",
    category: "技术",
    date: "2026-03-09",
    readTime: "8 分钟",
    coverClass: "from-sky-200/80 via-blue-100/70 to-cyan-50/60",
    pinned: true,
    content: [
      "顺滑并不是一个单一属性，它来自多段交互的组合：输入触发阈值、状态切换延迟、目标位置计算和视觉缓冲动画。",
      "我更倾向先建立可解释的参数表，例如滚轮阈值、锁定时间、曲线类型，再通过真实场景逐项回归。",
      "当参数可解释后，调优就不再依赖手感猜测，而是可以通过现象映射到具体节点进行修正。",
    ],
  },
  {
    id: "night-writing-fragment",
    serial: 100593,
    title: "夜深时写下的一段情绪",
    excerpt:
      "有些情绪不会在白天出现。它们只会在安静时浮出水面，提醒你别忘了真正想表达的东西。",
    category: "情感",
    date: "2026-03-05",
    readTime: "4 分钟",
    coverClass: "from-rose-200/75 via-pink-100/65 to-orange-50/55",
    content: [
      "表达不是为了证明自己，而是为了把内心那些含混的东西慢慢整理出来。",
      "当一句话终于被写对，情绪会有一个很轻的落点，像夜里窗边的一口慢呼吸。",
      "记录这些片段并不宏大，但它们构成了我理解世界的微小坐标。",
    ],
  },
  {
    id: "small-ideas-notes",
    serial: 100592,
    title: "一些还不成熟的小想法",
    excerpt:
      "关于界面、内容和节奏的随手记。它们也许松散，但能帮助我保留探索阶段的直觉。",
    category: "随想",
    date: "2026-02-28",
    readTime: "6 分钟",
    coverClass: "from-violet-200/70 via-indigo-100/60 to-slate-50/50",
    content: [
      "很多想法一开始都不完整，但只要及时记下关键动词，后续就能重新长出结构。",
      "我会把灵感当成草图，而不是结论，它更像方向提示，而不是立即执行的命令。",
      "有时候最有价值的不是答案，而是那个让你愿意继续追问的问题。",
    ],
  },
  {
    id: "component-boundary-thinking",
    serial: 100591,
    title: "组件边界该如何决定",
    excerpt:
      "拆分组件不只是技术问题，也和协作、维护和语义表达有关。边界清晰，项目会轻很多。",
    category: "技术",
    date: "2026-02-20",
    readTime: "7 分钟",
    coverClass: "from-emerald-200/70 via-teal-100/60 to-cyan-50/50",
    content: [
      "组件边界最常见的问题是按视觉切分而非按职责切分，结果导致状态和逻辑反复穿透。",
      "更稳妥的方式是先找数据所有权，再找交互闭环，最后才是样式抽离。",
      "当组件边界和业务语义一致时，重构成本会显著降低。",
    ],
  },
  {
    id: "design-rhythm-balance",
    serial: 100590,
    title: "留白与节奏：信息密度如何拿捏",
    excerpt:
      "我把页面密度当成呼吸频率。不是越满越专业，而是让视觉和阅读都有短暂停顿。",
    category: "随想",
    date: "2026-02-12",
    readTime: "5 分钟",
    coverClass: "from-amber-200/70 via-orange-100/60 to-rose-50/55",
    content: [
      "留白不是浪费，它是信息分组和节奏控制最直接的工具。",
      "当页面每个区域都在强调自己时，用户反而找不到重点。",
      "可读性和表达力并不矛盾，关键是给关键信息足够呼吸空间。",
    ],
  },
];

function pad2(value: number) {
  return String(value).padStart(2, "0");
}

function shiftDate(base: string, daysToShift: number) {
  const date = new Date(`${base}T00:00:00`);
  date.setDate(date.getDate() - daysToShift);
  const year = date.getFullYear();
  const month = pad2(date.getMonth() + 1);
  const day = pad2(date.getDate());
  return `${year}-${month}-${day}`;
}

function buildDemoPosts(posts: NotePost[], targetCount: number): NotePost[] {
  if (posts.length >= targetCount) {
    return posts;
  }

  const result: NotePost[] = [...posts];
  const seedDate = posts[0]?.date ?? "2026-03-09";
  const categories: NoteCategory[] = [
    "技术",
    "工程",
    "设计",
    "产品",
    "读书",
    "随想",
    "情感",
    "生活",
  ];

  for (let i = posts.length; i < targetCount; i += 1) {
    const base = posts[i % posts.length];
    const serial = 100000 + (targetCount - i);
    const category = categories[i % categories.length];

    result.push({
      ...base,
      id: `${base.id}-demo-${i}`,
      serial,
      category,
      pinned: i % 11 === 0,
      date: shiftDate(seedDate, i),
      title: `${base.title} · Demo ${i}`,
      excerpt: `${base.excerpt}（用于演示长列表滚动效果）`,
    });
  }

  return result;
}

// 开发演示：把列表拉长，方便调“文章/分类很多时”的滚动与选中态。
export const NOTE_POSTS: NotePost[] = buildDemoPosts(BASE_POSTS, 60);

export function getNoteHref(serial: number) {
  return `/notes/${serial}`;
}

export function getNoteBySerial(serialParam: string) {
  const serial = Number.parseInt(serialParam, 10);
  if (!Number.isFinite(serial)) {
    return null;
  }

  return NOTE_POSTS.find((post) => post.serial === serial) ?? null;
}
