import { SectionFrame } from "../components/section-frame";
import { SectionHeading } from "../components/section-heading";

type AboutSectionProps = {
  animationClass: string;
};

export function AboutSection({ animationClass }: AboutSectionProps) {
  return (
    <SectionFrame id="about-page">
      <div className="relative h-full">
        <main className={`relative z-10 flex h-full w-full flex-col justify-center gap-16 py-8 ${animationClass}`}>
          <section id="vision" className="space-y-6">
            <SectionHeading title="我的愿景" />

            <div className="space-y-4">
              <h1 className="text-balance bg-[linear-gradient(-135deg,#418ae0,#56a0d8,#dc8bc3,#56a0d8,#418ae0,#56a0d8,#dc8bc3,#56a0d8,#418ae0)] bg-[length:200%_100%] bg-clip-text text-4xl font-light leading-tight tracking-[0.1em] text-transparent sm:text-5xl lg:text-4xl [animation:gradient-move_7s_linear_infinite]">
                专注于
                <br />
                代码、设计与写作
              </h1>

              <p className="max-w-2xl text-pretty text-sm leading-relaxed text-slate-600 sm:text-base">
                一个简洁的个人空间，用于记录项目、长文笔记与实验。注重清晰度、动效与工程品质。
              </p>
            </div>
          </section>

          <section id="about" className="space-y-8">
            <SectionHeading title="关于我" />

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-slate-900">技术栈</h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Next.js",
                    "Node.js",
                    "React",
                    "TypeScript",
                    "Tailwind CSS",
                    "Framer Motion",
                  ].map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700 shadow-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium text-slate-900">专注领域</h3>
                <p className="text-sm leading-relaxed text-slate-600">
                  全栈开发、前端工程化、交互设计与动效实现。致力于构建高质量、高性能的 Web 应用。
                </p>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <h3 className="text-sm font-medium text-slate-900">简介</h3>
              <p className="max-w-3xl text-sm leading-relaxed text-slate-600">
                全栈开发者，专注于现代 Web 技术栈。喜欢探索新技术，注重代码质量与用户体验。
                通过这个空间分享项目、技术思考与实践经验。
              </p>
            </div>
          </section>
        </main>
      </div>
    </SectionFrame>
  );
}
