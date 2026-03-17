import { SectionFrame } from "../components/section-frame";

type HomeSectionProps = {
  animationClass: string;
};

export function HomeSection({ animationClass }: HomeSectionProps) {
  return (
    <SectionFrame id="home">
      <div className="relative h-full">
        <main className={`relative z-10 flex h-full flex-col justify-center gap-8 ${animationClass}`}>
          <div className="space-y-3">
            <p className="text-xs font-medium tracking-[0.2em] text-slate-500">HOME</p>
            <h1 className="text-3xl font-light tracking-[0.08em] text-slate-900 sm:text-4xl">
              个人博客工作台
            </h1>
          </div>
          <p className="max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
            这里展示我的项目、技术沉淀和随笔记录。当前版本先完成页面骨架与整页翻屏交互。
          </p>
          <div className="grid max-w-xl grid-cols-2 gap-3">
            {["简洁结构", "整页翻屏", "固定导航", "逐页浏览"].map((item) => (
              <div
                key={item}
                className="rounded-xl border border-slate-200 bg-white/70 px-4 py-3 text-xs text-slate-600 shadow-sm"
              >
                {item}
              </div>
            ))}
          </div>
        </main>
      </div>
    </SectionFrame>
  );
}
