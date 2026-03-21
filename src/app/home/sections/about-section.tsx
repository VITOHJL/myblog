import { SectionFrame } from "../components/section-frame";
import { SectionHeading } from "../components/section-heading";
import Image from "next/image";
import { NOTE_POSTS } from "../../data/notes";
import { buildCategoryItems } from "../notes/model";
import { StaluxSocialMedia } from "../about/components/stalux-social-media";

type AboutSectionProps = {
  animationClass: string;
};

export function AboutSection({ animationClass }: AboutSectionProps) {
  const categoryCount = buildCategoryItems(NOTE_POSTS).filter((item) => item.count > 0).length;
  const postCount = NOTE_POSTS.length;

  return (
    <SectionFrame
      id="about-page"
      rightPanel={
        <aside className="flex h-full min-h-0 flex-col justify-center pr-10">
          <div className="rounded-2xl border border-slate-200/70 bg-white/70 p-6 shadow-[0_22px_60px_-40px_rgba(15,23,42,0.45)] backdrop-blur-md">
            <div className="flex items-center gap-4">
              <div className="relative h-14 w-14 overflow-hidden rounded-full ring-1 ring-slate-200">
                <Image
                  src="/shanghaitech.png"
                  alt="avatar"
                  fill
                  sizes="56px"
                  className="object-cover"
                  priority={false}
                />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold tracking-[0.14em] text-slate-900">
                  VITOHJL
                </p>
                <p className="mt-1 text-xs tracking-[0.18em] text-slate-500">
                  全栈开发 · 交互与动效
                </p>
              </div>
            </div>

            <p className="mt-5 text-sm leading-relaxed text-slate-600">
              是什么样的人，做什么样的事
            </p>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <a
                href="/#notes"
                className="group rounded-xl border border-slate-200/70 bg-white/60 px-4 py-3 transition hover:border-sky-200 hover:bg-white"
              >
                <p className="text-[11px] tracking-[0.22em] text-slate-500">随笔</p>
                <p className="mt-1 text-xl font-semibold text-slate-900 transition group-hover:text-sky-700">
                  {postCount}
                </p>
              </a>
              <a
                href="/#notes"
                className="group rounded-xl border border-slate-200/70 bg-white/60 px-4 py-3 transition hover:border-sky-200 hover:bg-white"
              >
                <p className="text-[11px] tracking-[0.22em] text-slate-500">分类</p>
                <p className="mt-1 text-xl font-semibold text-slate-900 transition group-hover:text-sky-700">
                  {categoryCount}
                </p>
              </a>
            </div>

            <div className="mt-6 space-y-6">
              <p className="text-[11px] font-medium tracking-[0.22em] text-slate-500">
                LINKS
              </p>
              <StaluxSocialMedia/>
            </div>
          </div>
        </aside>
      }
    >
      <div className="relative h-full">
        <main className={`relative z-10 flex h-full w-full flex-col justify-center gap-16 py-16 ${animationClass}`}>
          <section id="vision" className="space-y-6">
            <SectionHeading title="我的愿景" />

            <div className="space-y-4">
              <h1 className="relative text-balance text-4xl font-light leading-tight tracking-[0.1em] sm:text-4xl">
                <span className="inline-block align-top">
                  <span className="block translate-x-[16%] bg-[linear-gradient(-135deg,#418ae0,#56a0d8,#dc8bc3,#56a0d8,#418ae0,#56a0d8,#dc8bc3,#56a0d8,#418ae0)] bg-[length:200%_100%] bg-clip-text text-transparent [animation:gradient-move_7s_linear_infinite]">
                    "以AI重构应用生态
                  </span>
                  <span className="block translate-x-[80%] mt-[5%] bg-[linear-gradient(-135deg,#418ae0,#56a0d8,#dc8bc3,#56a0d8,#418ae0,#56a0d8,#dc8bc3,#56a0d8,#418ae0)] bg-[length:200%_100%] bg-clip-text text-transparent [animation:gradient-move_7s_linear_infinite]">
                    为每个人的生活赋能"
                  </span>
                </span>
              </h1>

                {/* <p className="max-w-2xl text-pretty text-sm leading-relaxed text-slate-600 sm:text-base">
                  一个简洁的个人空间，用于记录项目、长文笔记与实验。注重清晰度、动效与工程品质。
                </p> */}
            </div>
          </section>

          <section id="about" className="space-y-8">
            <SectionHeading title="关于我" />

            <p className="max-w-3xl text-sm leading-relaxed text-slate-600">
            你好，欢迎来到我的数字空间。
            我是上海科技大学的一名大三学生，主攻前端与后端开发、Agent 底层研究以及 AI 应用构建。我始终以理想主义作为技术探索的底色，也以 VibeCoding 作为贯穿始终的实践方式 —— 我并不拥有无可挑剔的计算机基础，却始终热爱这门能将思想具象化的学科，沉迷于把一个个模糊的念头，打磨成可以运行、可以触摸的项目。
            在追逐实习、秋招与 AI 风口的过程里，我也曾被普遍的焦虑裹挟：担心自己会被技术取代，怀疑日复一日的工作不过是复制与粘贴。但我渐渐确信，AI 或许可以在技能层面超越大多数人，却无法替代人对意义的追问、对创造的渴望，以及那些只属于个体的选择与坚持。
            在这里，我愿意分享我的学习路径、项目经验与技术思考，也愿意坦诚记录那些伴随成长而来的焦虑、迷茫与自我怀疑。我们从来都不是独自在这条路上行走。
            我的人生始终在矛盾中展开：自卑与自负相互拉扯，迷茫与坚定彼此共生，焦虑与期待并行不悖，喜乐与困顿往复循环。这并非缺陷，而是我作为一个思考者、一个创造者最真实的模样。
                      
              

              如果你对某篇内容感兴趣，或者想聊聊，随时可以找到我。希望你能在这里有所收获。
            </p>
          </section>
        </main>
      </div>
    </SectionFrame>
  );
}
