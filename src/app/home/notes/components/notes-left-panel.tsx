import type { RefObject } from "react";
import type { NotePost } from "../../../data/notes";
import { formatDateLabel } from "../../utils";

type NotesLeftPanelProps = {
  notesListRef: RefObject<HTMLDivElement | null>;
  orderedNotes: NotePost[];
  selectedPostId?: string;
  onPostSelect: (postId: string) => void;
};

export function NotesLeftPanel({
  notesListRef,
  orderedNotes,
  selectedPostId,
  onPostSelect,
}: NotesLeftPanelProps) {
  return (
    <aside className="flex h-full flex-col pb-8 pl-2 pr-4 pt-[12vh]">
      <p className="text-xs font-semibold tracking-[0.18em] text-slate-500">文章</p>
      <div ref={notesListRef} className="mt-4 min-h-0 flex-1 space-y-1.5 overflow-y-auto pr-1">
        {orderedNotes.map((post) => {
          const active = selectedPostId === post.id;
          return (
            <button
              key={post.id}
              type="button"
              onClick={() => onPostSelect(post.id)}
              className={`w-full rounded-xl px-3 py-2 text-left transition ${
                active
                  ? "bg-white/80 text-slate-900 shadow-sm"
                  : "text-slate-600 hover:bg-white/55 hover:text-slate-900"
              }`}
            >
              <div className="flex items-center gap-2 text-[10px] tracking-[0.08em] text-slate-500">
                <span>{formatDateLabel(post.date)}</span>
                {post.pinned ? (
                  <span className="rounded-full bg-sky-100 px-1.5 py-0.5 text-[9px] text-sky-700">
                    置顶
                  </span>
                ) : null}
              </div>
              <p className="mt-1 text-xs leading-relaxed">{post.title}</p>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
