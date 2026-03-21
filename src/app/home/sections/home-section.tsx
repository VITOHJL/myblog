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
            <h1 className="font-poem text-3xl font-semibold leading-[1.5] tracking-[0.2em] text-white sm:text-7xl drop-shadow-[0_18px_38px_rgba(0,0,0,0.35)]">
              <span className="block text-white/95">
                世事<span className="text-sky-200">漫</span>随流水，
              </span>
              <span className="block translate-x-[40%] text-white/92">
                算来一梦<span className="text-sky-300">浮</span>生
              </span>
            </h1>
          </div>  
        </main>
      </div>
    </SectionFrame>
  );
}
