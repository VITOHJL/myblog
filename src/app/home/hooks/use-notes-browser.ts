"use client";

import { useMemo, useState } from "react";
import { NOTE_POSTS, type NotePost } from "../../data/notes";
import {
  buildCategoryItems,
  filterNotesByCategory,
  resolveSelectedPost,
  sortNotesByPinnedAndDate,
} from "../notes/model";
import type { CategoryItem, NoteCategoryFilter } from "../types";

export type UseNotesBrowserResult = {
  activeCategory: NoteCategoryFilter;
  setActiveCategory: (category: NoteCategoryFilter) => void;
  selectedPostId: string;
  setSelectedPostId: (postId: string) => void;
  categoryItems: CategoryItem[];
  orderedNotes: NotePost[];
  selectedPost: NotePost | null;
};

export function useNotesBrowser(): UseNotesBrowserResult {
  const [activeCategory, setActiveCategory] = useState<NoteCategoryFilter>("全部");
  const [selectedPostId, setSelectedPostId] = useState(() => NOTE_POSTS[0]?.id ?? "");

  const categoryItems = useMemo(() => buildCategoryItems(NOTE_POSTS), []);

  const filteredNotes = useMemo(
    () => filterNotesByCategory(NOTE_POSTS, activeCategory),
    [activeCategory],
  );

  const orderedNotes = useMemo(() => sortNotesByPinnedAndDate(filteredNotes), [filteredNotes]);

  const selectedPost = useMemo(
    () => resolveSelectedPost(orderedNotes, selectedPostId),
    [orderedNotes, selectedPostId],
  );

  return {
    activeCategory,
    setActiveCategory,
    selectedPostId,
    setSelectedPostId,
    categoryItems,
    orderedNotes,
    selectedPost,
  };
}
