import type { CSSProperties } from "react";
import { getNoteHref, type NotePost } from "../../../data/notes";
import { formatDateLabel } from "../../utils";

type NotesFeatureCardProps = {
  selectedPost: NotePost;
};

export function NotesFeatureCard({ selectedPost }: NotesFeatureCardProps) {
  // 占位图：请将 shanghaitech.png 放到项目的 public 目录下
  const fallbackImage = "/shanghaitech.png";

  const selectedPostVisualClass = "";
  const coverUrl = selectedPost.coverImage ?? fallbackImage;

  const [year, month, day] = selectedPost.date.split("-");
  const dateYear = year ?? "";
  const dateMd = month && day ? `${month}/${day}` : "";

  return (
    <a
      href={getNoteHref(selectedPost.serial)}
      aria-label={`阅读：${selectedPost.title}`}
      className="group relative block h-full"
    >
      <div className="grid h-full grid-cols-1 gap-8 md:grid-cols-[minmax(0,1fr)_70%]">
        <div className="flex min-h-0 flex-col justify-start gap-10 pb-4 pt-10">
          <div className="text-slate-500">
            <p className="text-6xl tracking-[0.16em]">{dateYear}</p>  
            <p className="mt-2 text-2xl tracking-[0.22em]">{dateMd}</p>
          </div>
          <div className="space-y-4 pb-1">
            <h3 className="max-w-xl text-3xl font-semibold leading-tight text-slate-900 transition group-hover:text-sky-700 sm:text-4xl">
              {selectedPost.title}
            </h3>
            <p className="max-w-md text-sm leading-relaxed text-slate-600 sm:text-base">
              {selectedPost.excerpt}
            </p>
            <p className="text-xs text-slate-500">
              {selectedPost.category} · {selectedPost.readTime}
            </p>
          </div>
        </div>

        <div className="relative min-h-[240px] md:min-h-0">
          {/* 背后的正方形图片 */}
          <div
            className="float-roll absolute top-0 left-[20%] h-[70%] aspect-square overflow-hidden rounded-2xl opacity-50 shadow-[0_16px_32px_-18px_rgba(15,23,42,0.5)] z-0"
            style={{
              // 使用与主卡片相同的图片源，自动裁剪为正方形
              backgroundImage: `url(${coverUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* 轻微暗化底膜：保证斜线在亮图上也可见 */}
            <div className="pointer-events-none absolute inset-0 bg-slate-950/10" />
            {/* 斜向黑线网格 */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                // 使用 repeating-linear-gradient 覆盖整个区域，使每条线是连续的整根斜线
                backgroundImage:
                  "repeating-linear-gradient(135deg, rgba(0,0,0,0.85) 0, rgba(0,0,0,0.85) 1px, transparent 1px, transparent 4px)",
                mixBlendMode: "multiply",
                opacity: 1,
              }}
            />
          </div>
          {/* <div
            className={`absolute -left-10 top-1/2 h-56 w-56 -translate-y-1/2 overflow-hidden rounded-[2.2rem] opacity-65 blur-2xl md:-left-12 md:h-72 md:w-72 ${selectedPostVisualClass}`}
            style={selectedPostVisualStyle}
          /> */}
          <div
            className={`float-roll absolute top-[20%] bottom-[40%] right-[20%] w-[80%] overflow-hidden rounded-2xl shadow-[0_18px_38px_-20px_rgba(15,23,42,0.45)] transform transition-transform duration-520 ease-[cubic-bezier(0.18,0.72,0.18,1)] group-hover:translate-y-[-2px] group-hover:scale-[1.03] ${selectedPostVisualClass}`}
          >
            {/* 内部图片：默认略放大，悬停时略缩小，配合外框放大形成“剪裁展开”的感觉 */}
            <div className="relative h-full w-full">
              <div
                className="absolute inset-0 bg-cover bg-center transform scale-[1.36] transition-transform duration-520 ease-[cubic-bezier(0.18,0.72,0.18,1)] group-hover:scale-100"
                style={{
                  backgroundImage: `url(${coverUrl})`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}
