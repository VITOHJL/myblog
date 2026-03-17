import type { NotePost } from "../data/notes";

export type NoteCategoryFilter = "全部" | NotePost["category"];

export type CategoryItem = {
  label: NoteCategoryFilter;
  count: number;
};
