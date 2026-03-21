type SectionHeadingProps = {
  title: string;
};

export function SectionHeading({ title }: SectionHeadingProps) {
  return (
    <div className="flex items-center gap-4 mt-10 mb-10">
      <h2 className="text-2xl font-semibold tracking-[0.1em] text-slate-800">{title}</h2>
      <div className="h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent" />
    </div>
  );
}
