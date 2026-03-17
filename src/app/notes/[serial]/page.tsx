import Link from "next/link";
import { notFound } from "next/navigation";
import { getNoteBySerial } from "../../data/notes";

type NoteDetailPageProps = {
  params: Promise<{
    serial: string;
  }>;
};

function formatDateLabel(date: string) {
  return date.replaceAll("-", ".");
}

export default async function NoteDetailPage({ params }: NoteDetailPageProps) {
  const { serial } = await params;
  const post = getNoteBySerial(serial);

  if (!post) {
    notFound();
  }

  return (
    <div className="h-full overflow-y-auto">
      <article className="mx-auto flex min-h-full w-full max-w-3xl flex-col px-8 pb-24 pt-14 sm:px-12 lg:px-20">
        <div className="space-y-3">
          <p className="text-xs tracking-[0.14em] text-slate-500">
            #{post.serial} · {formatDateLabel(post.date)} · {post.category} · {post.readTime}
          </p>
          <h1 className="text-3xl font-semibold leading-tight text-slate-900 sm:text-4xl">
            {post.title}
          </h1>
          <p className="max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
            {post.excerpt}
          </p>
        </div>

        <div className="my-8 h-56 w-full rounded-3xl bg-gradient-to-br shadow-[0_20px_45px_-28px_rgba(15,23,42,0.55)] sm:h-72">
          <div className={`h-full w-full rounded-3xl ${post.coverClass}`} />
        </div>

        <div className="space-y-4">
          {post.content.map((paragraph, index) => (
            <p key={`${post.id}-${index}`} className="text-base leading-relaxed text-slate-700">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-10">
          <Link
            href="/#notes"
            className="inline-flex items-center rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm text-slate-700 transition hover:border-sky-200 hover:text-sky-700"
          >
            返回随笔页
          </Link>
        </div>
      </article>
    </div>
  );
}
