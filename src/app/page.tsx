"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const SECTION_IDS = ["home", "works", "about-page", "notes"] as const;
const WHEEL_THRESHOLD = 8;
const SCROLL_LOCK_MS = 620;

type SectionId = (typeof SECTION_IDS)[number];

function clampIndex(value: number) {
  return Math.min(Math.max(value, 0), SECTION_IDS.length - 1);
}

function getIndexFromHash(hash: string) {
  const index = SECTION_IDS.findIndex((id) => id === hash.replace("#", ""));
  return index >= 0 ? index : 0;
}

function SectionFrame({
  id,
  children,
}: {
  id: SectionId;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="h-full w-full snap-start snap-always bg-white">
      <div className="flex h-full w-full">
        <div className="hidden w-1/4 flex-shrink-0 pt-[12vh] md:block">
          <div
            className="h-96 w-full bg-contain bg-left bg-no-repeat"
            style={{
              backgroundImage:
                "url('https://www.mihoyo.com/_nuxt/img/line.a3e37b6.png')",
            }}
          />
        </div>
        <div className="w-full flex-shrink-0 px-6 sm:px-8 md:w-2/4 lg:px-10">{children}</div>
        <div className="hidden w-1/4 flex-shrink-0 md:block" />
      </div>
    </section>
  );
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollLockRef = useRef(false);
  const [activeIndex, setActiveIndex] = useState(() => {
    if (typeof window === "undefined") {
      return 0;
    }

    return getIndexFromHash(window.location.hash || "#home");
  });
  const previousIndexRef = useRef(activeIndex);
  const lastReportedIndexRef = useRef(activeIndex);
  const [motionDirection, setMotionDirection] = useState<1 | -1>(1);
  const [hasPageTransition, setHasPageTransition] = useState(false);

  const scrollToIndex = useCallback(
    (index: number, behavior: ScrollBehavior = "smooth") => {
      const container = containerRef.current;
      if (!container) {
        return;
      }

      const nextTop = clampIndex(index) * container.clientHeight;
      container.scrollTo({ top: nextTop, behavior });
    },
    [],
  );

  const getCurrentIndex = useCallback(() => {
    const container = containerRef.current;
    if (!container || container.clientHeight === 0) {
      return 0;
    }

    return clampIndex(Math.round(container.scrollTop / container.clientHeight));
  }, []);

  const emitSectionChange = useCallback((index: number) => {
    const id = SECTION_IDS[index];
    const targetHash = `#${id}`;

    if (window.location.hash !== targetHash) {
      window.history.replaceState(null, "", targetHash);
    }

    window.dispatchEvent(new CustomEvent("sectionchange", { detail: { id } }));
  }, []);

  const scrollToHash = useCallback(
    (hash: string, behavior: ScrollBehavior = "smooth") => {
      const target = hash.replace("#", "");
      const targetIndex = SECTION_IDS.findIndex((id) => id === target);

      if (targetIndex < 0) {
        return;
      }

      scrollToIndex(targetIndex, behavior);
    },
    [scrollToIndex],
  );

  const scrollByDirection = useCallback(
    (direction: 1 | -1) => {
      const currentIndex = getCurrentIndex();
      const nextIndex = clampIndex(currentIndex + direction);

      if (nextIndex === currentIndex) {
        return;
      }

      scrollLockRef.current = true;
      scrollToIndex(nextIndex);

      window.setTimeout(() => {
        scrollLockRef.current = false;
      }, SCROLL_LOCK_MS);
    },
    [getCurrentIndex, scrollToIndex],
  );

  const getParallaxLayerClass = useCallback(
    (index: number, layer: "content" | "bg") => {
      if (!hasPageTransition || activeIndex !== index) {
        return "";
      }

      if (motionDirection === 1) {
        return layer === "content"
          ? "section-content-enter-up"
          : "section-bg-enter-up";
      }

      return layer === "content"
        ? "section-content-enter-down"
        : "section-bg-enter-down";
    },
    [activeIndex, hasPageTransition, motionDirection],
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) < WHEEL_THRESHOLD) {
        return;
      }

      event.preventDefault();

      if (scrollLockRef.current) {
        return;
      }

      scrollByDirection(event.deltaY > 0 ? 1 : -1);
    };

    container.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      container.removeEventListener("wheel", onWheel);
    };
  }, [scrollByDirection]);

  useEffect(() => {
    const initialHash = window.location.hash || "#home";
    const initialIndex = getIndexFromHash(initialHash);
    previousIndexRef.current = initialIndex;
    lastReportedIndexRef.current = initialIndex;
    emitSectionChange(initialIndex);
    scrollToHash(initialHash, "auto");

    const handleHashChange = () => {
      scrollToHash(window.location.hash || "#home", "smooth");
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [emitSectionChange, scrollToHash]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const onScroll = () => {
      const currentIndex = getCurrentIndex();

      if (currentIndex !== lastReportedIndexRef.current) {
        emitSectionChange(currentIndex);
        lastReportedIndexRef.current = currentIndex;
      }

      if (currentIndex !== previousIndexRef.current) {
        setHasPageTransition(true);
        setMotionDirection(currentIndex > previousIndexRef.current ? 1 : -1);
        setActiveIndex(currentIndex);
        previousIndexRef.current = currentIndex;
      }
    };

    container.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      container.removeEventListener("scroll", onScroll);
    };
  }, [emitSectionChange, getCurrentIndex]);

  useEffect(() => {
    const onResize = () => {
      scrollToIndex(getCurrentIndex(), "auto");
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [getCurrentIndex, scrollToIndex]);

  return (
    <div
      ref={containerRef}
      className="fullpage-scroll h-full overflow-y-auto overscroll-y-contain snap-y snap-mandatory scroll-smooth"
    >
      <SectionFrame id="home">
        <div className="relative h-full">
          <div
            className={`pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(circle_at_top,_rgba(191,219,254,0.25)_0,_rgba(221,214,254,0.22)_45%,_transparent_72%)] ${getParallaxLayerClass(0, "bg")}`}
          />
          <main
            className={`relative z-10 flex h-full flex-col justify-center gap-8 ${getParallaxLayerClass(0, "content")}`}
          >
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

      <SectionFrame id="works">
        <div className="relative h-full">
          <div
            className={`pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,_rgba(186,230,253,0.2)_0,_rgba(224,231,255,0.2)_42%,_transparent_72%)] ${getParallaxLayerClass(1, "bg")}`}
          />
          <main
            className={`relative z-10 flex h-full flex-col justify-center gap-8 ${getParallaxLayerClass(1, "content")}`}
          >
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-semibold tracking-[0.1em] text-slate-800">作品</h2>
              <div className="h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent" />
            </div>
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

      <SectionFrame id="about-page">
        <div className="relative h-full">
          <div
            className={`pointer-events-none absolute inset-x-0 top-0 h-96 bg-[radial-gradient(circle_at_top,_rgba(191,219,254,0.25)_0,_rgba(221,214,254,0.2)_40%,_transparent_70%)] ${getParallaxLayerClass(2, "bg")}`}
          />
          <main
            className={`relative z-10 flex h-full w-full flex-col justify-center gap-16 py-8 ${getParallaxLayerClass(2, "content")}`}
          >
            <section id="vision" className="space-y-6">
              <div className="flex items-center gap-4">
                <h2 className="text-xl font-semibold tracking-[0.1em] text-slate-800">
                  我的愿景
                </h2>
                <div className="h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent" />
              </div>

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
              <div className="flex items-center gap-4">
                <h2 className="text-xl font-semibold tracking-[0.1em] text-slate-800">
                  关于我
                </h2>
                <div className="h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent" />
              </div>

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
                    全栈开发、前端工程化、交互设计与动效实现。致力于构建高质量、高性能的 Web
                    应用。
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

      <SectionFrame id="notes">
        <div className="relative h-full">
          <div
            className={`pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,_rgba(254,226,226,0.2)_0,_rgba(254,240,138,0.16)_42%,_transparent_72%)] ${getParallaxLayerClass(3, "bg")}`}
          />
          <main
            className={`relative z-10 flex h-full flex-col justify-center gap-8 ${getParallaxLayerClass(3, "content")}`}
          >
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-semibold tracking-[0.1em] text-slate-800">随笔</h2>
              <div className="h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent" />
            </div>
            <div className="space-y-4">
              {[
                "设计系统中的留白和节奏",
                "组件拆分的边界如何确定",
                "从动画细节提升页面质感",
              ].map((note) => (
                <article
                  key={note}
                  className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm"
                >
                  <h3 className="text-sm font-medium text-slate-900">{note}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600">
                    先放摘要占位，后续替换为真实内容即可沿用当前版式。
                  </p>
                </article>
              ))}
            </div>
          </main>
        </div>
      </SectionFrame>
    </div>
  );
}
