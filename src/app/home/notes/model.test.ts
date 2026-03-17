import { describe, expect, it } from "vitest";
import type { NotePost } from "../../data/notes";
import {
  buildCategoryItems,
  filterNotesByCategory,
  resolveSelectedPost,
  sortNotesByPinnedAndDate,
} from "./model";

const SAMPLE_POSTS: NotePost[] = [
  {
    id: "pinned-older",
    serial: 1001,
    title: "Pinned Older",
    excerpt: "Pinned older post",
    category: "技术",
    date: "2026-01-01",
    readTime: "5 分钟",
    coverClass: "from-sky-100 to-sky-50",
    pinned: true,
    content: [],
  },
  {
    id: "normal-newer",
    serial: 1002,
    title: "Normal Newer",
    excerpt: "Normal newer post",
    category: "情感",
    date: "2026-03-01",
    readTime: "4 分钟",
    coverClass: "from-rose-100 to-rose-50",
    content: [],
  },
  {
    id: "normal-oldest",
    serial: 1003,
    title: "Normal Oldest",
    excerpt: "Normal oldest post",
    category: "随想",
    date: "2025-12-01",
    readTime: "6 分钟",
    coverClass: "from-indigo-100 to-indigo-50",
    content: [],
  },
];

describe("notes model", () => {
  it("builds category items with correct counts", () => {
    const items = buildCategoryItems(SAMPLE_POSTS);
    expect(items).toEqual([
      { label: "全部", count: 3 },
      { label: "技术", count: 1 },
      { label: "情感", count: 1 },
      { label: "随想", count: 1 },
    ]);
  });

  it("filters notes by selected category", () => {
    const items = filterNotesByCategory(SAMPLE_POSTS, "情感");
    expect(items).toHaveLength(1);
    expect(items[0]?.id).toBe("normal-newer");
  });

  it("keeps all notes when category is 全部", () => {
    const items = filterNotesByCategory(SAMPLE_POSTS, "全部");
    expect(items).toHaveLength(3);
  });

  it("sorts pinned first, then by date desc", () => {
    const sorted = sortNotesByPinnedAndDate(SAMPLE_POSTS);
    expect(sorted.map((post) => post.id)).toEqual([
      "pinned-older",
      "normal-newer",
      "normal-oldest",
    ]);
  });

  it("resolves selected post by id", () => {
    const selected = resolveSelectedPost(SAMPLE_POSTS, "normal-newer");
    expect(selected?.id).toBe("normal-newer");
  });

  it("falls back to first post when selected id is missing", () => {
    const selected = resolveSelectedPost(SAMPLE_POSTS, "unknown");
    expect(selected?.id).toBe("pinned-older");
  });

  it("returns null when post list is empty", () => {
    const selected = resolveSelectedPost([], "unknown");
    expect(selected).toBeNull();
  });
});
