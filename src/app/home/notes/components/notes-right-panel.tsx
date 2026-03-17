import type { CategoryItem, NoteCategoryFilter } from "../../types";

type NotesRightPanelProps = {
  categoryItems: CategoryItem[];
  activeCategory: NoteCategoryFilter;
  onCategoryChange: (category: NoteCategoryFilter) => void;
};

export function NotesRightPanel({
  categoryItems,
  activeCategory,
  onCategoryChange,
}: NotesRightPanelProps) {
  return (
    <aside className="h-full pr-6 pt-[13vh]">
      <p className="text-xs font-semibold tracking-[0.18em] text-slate-500">分类</p>
      <div className="mt-4 space-y-2">
        {categoryItems.map((item) => {
          const active = activeCategory === item.label;
          return (
            <button
              key={item.label}
              type="button"
              onClick={() => onCategoryChange(item.label)}
              className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm transition ${
                active
                  ? "bg-sky-50 text-sky-700"
                  : "text-slate-600 hover:bg-white/60 hover:text-slate-900"
              }`}
            >
              <span>{item.label}</span>
              <span className="text-xs">{item.count}</span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
