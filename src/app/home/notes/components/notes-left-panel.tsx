import type { RefObject } from "react";
import type { NotePost } from "../../../data/notes";
import { formatDateLabel } from "../../utils";

type NotesLeftPanelProps = {
  notesListRef: RefObject<HTMLDivElement | null>;
  orderedNotes: NotePost[];
  selectedPostId?: string;
  onPostSelect: (postId: string) => void;
  enterKey?: number;
  isActive?: boolean;
  animate?: boolean;
};

export function NotesLeftPanel({
  notesListRef,
  orderedNotes,
  selectedPostId,
  onPostSelect,
  enterKey = 0,
  isActive = false,
  animate = false,
}: NotesLeftPanelProps) {
  return (
    <aside
      data-notes-left-panel
      className="flex h-full min-h-0 flex-col pb-16 pl-[6vh] pr-[2vh] pt-[6vh]"
    >
      <p className="text-2xl font-semibold tracking-[0.18em] text-slate-500">文章</p>
      <div className="relative mt-6 min-h-0 flex-1">
        {/*底部渐隐：提示可滚动 */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-6 bg-linear-to-t from-white/90 to-transparent" />

        <div ref={notesListRef} className="hide-scrollbar h-full space-y-2 overflow-y-auto pr-1">
        {orderedNotes.map((post, index) => {
          const active = selectedPostId === post.id;
          const delayIndex = Math.min(index, 8);
          return (
            <button
              key={animate && isActive ? `${enterKey}-${post.id}` : post.id}
              type="button"
              onClick={() => onPostSelect(post.id)}
              className={`group w-full px-6 py-2 text-left transition ${
                active
                  ? "text-sky-700"
                  : "text-slate-600 hover:text-sky-700"
              } ${
                isActive
                  ? animate
                    ? "notes-list-item-prep notes-list-item-enter"
                    : ""
                  : "opacity-0"
              }`}
              style={animate && isActive ? { animationDelay: `${delayIndex * 105}ms` } : undefined}
            >
              <div
                className={`flex items-center gap-2 text-[10px] tracking-[0.08em] ${
                  active ? "text-sky-600" : "text-slate-500 group-hover:text-sky-600"
                }`}
              >
                <span>{formatDateLabel(post.date)}</span>
                {post.pinned ? (
                  <span className="rounded-full bg-sky-100 px-1.5 py-0.5 text-[9px] text-sky-700">
                    置顶
                  </span>
                ) : null}
              </div>
              <p
                className={`relative mt-1 truncate pb-1 text-xs leading-relaxed after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:origin-left after:scale-x-0 after:bg-sky-500 after:transition-transform after:duration-500 after:ease-out ${
                  active
                    ? "after:scale-x-100"
                    : "after:bg-sky-400 after:group-hover:scale-x-100"
                }`}
              >
                {post.title}
              </p>
            </button>
          );
        })}
      </div>
      </div>
    </aside>
  );
}
