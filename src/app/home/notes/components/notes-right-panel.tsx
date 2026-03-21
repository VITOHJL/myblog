import type { CategoryItem, NoteCategoryFilter } from "../../types";

type NotesRightPanelProps = {
  categoryItems: CategoryItem[];
  activeCategory: NoteCategoryFilter;
  onCategoryChange: (category: NoteCategoryFilter) => void;
  enterKey?: number;
  isActive?: boolean;
};

export function NotesRightPanel({
  categoryItems,
  activeCategory,
  onCategoryChange,
  enterKey = 0,
  isActive = false,
}: NotesRightPanelProps) {
  return (
    <aside className="flex h-full min-h-0 flex-col pr-6 pl-12 pt-[13vh]">
      <p className="text-2xl font-semibold tracking-[0.18em] text-slate-500">分类</p>
      <div className="relative mt-4 min-h-0 flex-1">
        {/* 底部渐隐：提示可滚动 */}  
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-6 bg-linear-to-t from-white/90 to-transparent" />

        <div className="hide-scrollbar h-full space-y-2 overflow-y-auto pr-1">
        {categoryItems.map((item, index) => {
          const active = activeCategory === item.label;
          const delayIndex = Math.min(index, 8);
          return (
            <button
              key={`${isActive ? enterKey : "idle"}-${item.label}`}
              type="button"
              onClick={() => onCategoryChange(item.label)}
              className={`group relative flex w-full items-center justify-between px-10 py-2 pb-2 text-sm transition after:absolute after:inset-x-10 after:bottom-0 after:h-0.5 after:origin-left after:scale-x-0 after:bg-sky-500 after:transition-transform after:duration-500 after:ease-out ${
                active
                  ? "text-sky-700 after:scale-x-100"
                  : "text-slate-600 hover:text-sky-700 after:bg-sky-400 after:group-hover:scale-x-100"
              } ${isActive ? "notes-category-item-prep notes-category-item-enter" : "opacity-0"}`}
              style={isActive ? { animationDelay: `${delayIndex * 105}ms` } : undefined}
            >
              <span>{item.label}</span>
              <span className={`text-xs ${active ? "text-sky-600" : "text-slate-400 group-hover:text-sky-600"}`}>
                {item.count}
              </span>
            </button>
          );
        })}
      </div>
      </div>
    </aside>
  );
}
