import { SectionFrame } from "../components/section-frame";
import { SectionHeading } from "../components/section-heading";

type WorksSectionProps = {
  animationClass: string;
};

export function WorksSection({ animationClass }: WorksSectionProps) {
  return (
    <SectionFrame id="works">
      <div className="relative h-full">
        <main className={`relative z-10 flex h-full flex-col justify-center gap-8 ${animationClass}`}>
          <SectionHeading title="作品" />
          <div className="space-y-4">
            {[
              "博客系统重构：Next.js + TypeScript + Tailwind",
              "个人知识库：文档检索与结构化归档",
              "交互实验：滚动驱动动画与布局过渡",
            ].map((project) => (
              <article
                key={project}
                className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm"
              >
                <h3 className="text-sm font-medium text-slate-900">{project}</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">
                  页面先以占位内容完成结构搭建，后续可直接替换为真实项目介绍。
                </p>
              </article>
            ))}
          </div>
        </main>
      </div>
    </SectionFrame>
  );
}
