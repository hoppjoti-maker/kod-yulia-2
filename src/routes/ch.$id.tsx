import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect } from "react";
import { AudioPlayer } from "@/components/audio-player";
import { ChapterBody } from "@/components/chapter-body";
import { NotFoundPage } from "@/components/not-found";
import { ReaderToolbar } from "@/components/reader-toolbar";
import { SiteShell } from "@/components/site-chrome";
import { getChapter, neighbors } from "@/data/chapters";
import { loadProgress, saveProgress } from "@/lib/progress";

export const Route = createFileRoute("/ch/$id")({
  component: ChapterPage,
  notFoundComponent: NotFoundPage,
});

function ChapterPage() {
  const { id } = Route.useParams();
  const chapter = getChapter(id);
  if (!chapter) throw notFound();
  const { prev, next } = neighbors(chapter.id);

  useEffect(() => {
    const saved = loadProgress();
    if (saved?.chapterId === chapter.id && saved.scroll > 0) {
      requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        window.scrollTo({ top: saved.scroll * Math.max(max, 1), behavior: "auto" });
      });
    } else {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
    saveProgress(chapter.id, saved?.chapterId === chapter.id ? saved.scroll : 0);
  }, [chapter.id]);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = max > 0 ? window.scrollY / max : 0;
      saveProgress(chapter.id, ratio);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [chapter.id]);

  return (
    <SiteShell solid>
      <ReaderToolbar chapter={chapter} />
      <article className="px-4 pb-16 pt-8 md:px-8 md:pt-12">
        <header className="mx-auto max-w-[38rem]">
          <img
            src={chapter.image}
            alt=""
            className="mb-8 aspect-[16/9] w-full rounded-lg object-cover object-center"
          />
          <p className="font-display text-xs tracking-[0.28em] text-muted uppercase">
            Глава {chapter.id} · {chapter.wound}
            {chapter.percent != null ? ` · ${chapter.percent}%` : ""}
          </p>
          <h1 className="mt-2 font-display text-4xl tracking-[-0.03em] md:text-5xl">{chapter.title}</h1>
        </header>

        {chapter.audio ? (
          <div className="mx-auto mt-8 max-w-[38rem]">
            <AudioPlayer
              src={chapter.audio.src}
              title={`${chapter.id}. ${chapter.title}`}
              subtitle={`${chapter.audio.time} · канонический голос`}
            />
          </div>
        ) : (
          <p className="mx-auto mt-8 max-w-[38rem] font-display text-xs tracking-[0.18em] text-muted uppercase">
            Текстовый режим · голос этой главы не записывался
          </p>
        )}

        <div className="mt-10">
          <ChapterBody paragraphs={chapter.paragraphs} />
        </div>

        <nav className="mx-auto mt-16 flex max-w-[38rem] items-stretch justify-between gap-3 border-t border-line pt-8">
          {prev ? (
            <Link
              to="/ch/$id"
              params={{ id: prev.id }}
              className="min-h-12 flex-1 rounded-md border border-line px-4 py-3 hover:border-accent"
            >
              <span className="block font-display text-[11px] tracking-[0.18em] text-muted uppercase">Назад</span>
              <span className="mt-1 block font-display text-base">{prev.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              to="/ch/$id"
              params={{ id: next.id }}
              className="min-h-12 flex-1 rounded-md border border-line px-4 py-3 text-right hover:border-accent"
            >
              <span className="block font-display text-[11px] tracking-[0.18em] text-muted uppercase">Вперёд</span>
              <span className="mt-1 block font-display text-base">{next.title}</span>
            </Link>
          ) : (
            <Link
              to="/"
              className="min-h-12 flex-1 rounded-md border border-line px-4 py-3 text-right hover:border-accent"
            >
              <span className="block font-display text-[11px] tracking-[0.18em] text-muted uppercase">Том</span>
              <span className="mt-1 block font-display text-base">К оглавлению</span>
            </Link>
          )}
        </nav>
      </article>
    </SiteShell>
  );
}
