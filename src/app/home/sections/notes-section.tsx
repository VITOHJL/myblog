import type { RefObject } from "react";
import type { NotePost } from "../../data/notes";
import { SectionHeading } from "../components/section-heading";
import { SectionFrame } from "../components/section-frame";
import { NotesFeatureCard } from "../notes/components/notes-feature-card";
import { NotesLeftPanel } from "../notes/components/notes-left-panel";
import { NotesRightPanel } from "../notes/components/notes-right-panel";
import type { CategoryItem, NoteCategoryFilter } from "../types";

type NotesSectionProps = {
  animationClass: string;
  notesListRef: RefObject<HTMLDivElement | null>;
  notesEnterKey: number;
  isActive: boolean;
  animateLists: boolean;
  categoryItems: CategoryItem[];
  activeCategory: NoteCategoryFilter;
  onCategoryChange: (category: NoteCategoryFilter) => void;
  orderedNotes: NotePost[];
  selectedPost: NotePost | null;
  onPostSelect: (postId: string) => void;
};

export function NotesSection({
  animationClass,
  notesListRef,
  notesEnterKey,
  isActive,
  animateLists,
  categoryItems,
  activeCategory,
  onCategoryChange,
  orderedNotes,
  selectedPost,
  onPostSelect,
}: NotesSectionProps) {
  return (
    <SectionFrame
      id="notes"
      leftPanel={
        <NotesLeftPanel
          notesListRef={notesListRef}
          orderedNotes={orderedNotes}
          selectedPostId={selectedPost?.id}
          onPostSelect={onPostSelect}
          enterKey={notesEnterKey}
          isActive={isActive}
          animate={animateLists}
        />
      }
      rightPanel={
        <NotesRightPanel
          categoryItems={categoryItems}
          activeCategory={activeCategory}
          onCategoryChange={onCategoryChange}
          enterKey={notesEnterKey}
          isActive={isActive}
        />
      }
    >
      <div className="relative h-full">
        <main className={`relative z-10 flex h-full flex-col justify-center gap-8 ${animationClass}`}>
          <SectionHeading title="随笔" />
          <div className="min-h-0 flex-1">
            {selectedPost ? (
              <NotesFeatureCard selectedPost={selectedPost} />
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-slate-500">
                当前分类还没有文章
              </div>
            )}
          </div>
        </main>
      </div>
    </SectionFrame>
  );
}
