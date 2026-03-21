import type { NotePost } from "../../data/notes";
import type { CategoryItem, NoteCategoryFilter } from "../types";
import { toDateValue } from "../utils";

export function buildCategoryItems(posts: NotePost[]): CategoryItem[] {
  const countMap = posts.reduce<Partial<Record<NotePost["category"], number>>>((acc, post) => {
    acc[post.category] = (acc[post.category] ?? 0) + 1;
    return acc;
  }, {});

  return [
    { label: "全部", count: posts.length },
    { label: "技术", count: countMap.技术 ?? 0 },
    { label: "工程", count: countMap.工程 ?? 0 },
    { label: "设计", count: countMap.设计 ?? 0 },
    { label: "产品", count: countMap.产品 ?? 0 },
    { label: "读书", count: countMap.读书 ?? 0 },
    { label: "随想", count: countMap.随想 ?? 0 },
    { label: "情感", count: countMap.情感 ?? 0 },
    { label: "生活", count: countMap.生活 ?? 0 },
  ];
}

export function filterNotesByCategory(posts: NotePost[], category: NoteCategoryFilter) {
  if (category === "全部") {
    return posts;
  }

  return posts.filter((post) => post.category === category);
}

export function sortNotesByPinnedAndDate(posts: NotePost[]) {
  return [...posts].sort((a, b) => {
    const pinDiff = (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0);
    if (pinDiff !== 0) {
      return pinDiff;
    }

    return toDateValue(b.date) - toDateValue(a.date);
  });
}

export function resolveSelectedPost(posts: NotePost[], selectedPostId: string) {
  return posts.find((post) => post.id === selectedPostId) ?? posts[0] ?? null;
}
