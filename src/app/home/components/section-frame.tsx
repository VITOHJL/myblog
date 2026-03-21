import type { ReactNode } from "react";
import type { SectionId } from "../constants";

type SectionFrameProps = {
  id: SectionId;
  leftPanel?: ReactNode;
  rightPanel?: ReactNode;
  background?: ReactNode;
  children: ReactNode;
};

export function SectionFrame({
  id,
  leftPanel,
  rightPanel,
  background,
  children,
}: SectionFrameProps) {
  return (
    <section id={id} className="relative h-full w-full snap-start snap-always bg-transparent">
      {background ? <div className="absolute inset-0 z-0">{background}</div> : null}
      <div className="relative z-10 flex h-full w-full">
        <div className="hidden w-1/5 flex-shrink-0 md:block">
          {leftPanel ?? (
            <div className="pt-[12vh]">
              <div
                className="h-96 w-full bg-contain bg-left bg-no-repeat"
                style={{
                  backgroundImage:
                    "url('https://www.mihoyo.com/_nuxt/img/line.a3e37b6.png')",
                }}
              />
            </div>
          )}
        </div>
        <div className="w-full flex-shrink-0 px-8 sm:px-12 md:w-3/5 lg:px-20">
          <div className="mx-auto h-full max-w-3xl">{children}</div>
        </div>
        <div className="hidden w-1/5 flex-shrink-0 md:block">{rightPanel}</div>
      </div>
    </section>
  );
}
