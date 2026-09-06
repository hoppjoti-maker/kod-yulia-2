import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { BottomNav } from "@/components/bottom-nav";
import { ChapterAudio, audioBus, stopAudioChain } from "@/components/chapter-audio";
import { PercentBar } from "@/components/percent-bar";
import { SiteHeader } from "@/components/site-header";
import { BOOK, getChapter, neighbors, saveProgress } from "@/data/book";

export const Route = createFileRoute("/ch/$id")({
  component: ChapterPage,
  loader: ({ params }) => {
    const chapter = getChapter(params.id);
    if (!chapter) throw notFound();
    return { chapter };
  },
  head: ({ params }) => {
    const chapter = getChapter(params.id);
    const title = chapter
      ? `Глава ${chapter.id}. ${chapter.title} — ${BOOK.title}`
      : BOOK.title;
    return { meta: [{ title }] };
  },
});

function ChapterPage() {
  const { chapter } = Route.useLoaderData();
  const { prev, next } = neighbors(chapter.id);
  const navigate = useNavigate();

  useEffect(() => {
    saveProgress(chapter.id);
  }, [chapter.id]);

  return (
    <main className="min-h-dvh bg-bg pb-36 text-fg md:pb-8">
      <SiteHeader active="book" />

      <article className="mx-auto max-w-xl px-5 py-5 md:max-w-3xl md:px-8 md:py-8">
        <p className="text-xs tabular-nums tracking-[0.22em] text-accent uppercase">
          Глава {chapter.id} · {chapter.wound} · {chapter.audioTime || BOOK.volume}
        </p>
        <h2 className="mt-1 font-display text-3xl font-medium leading-tight text-balance md:text-5xl">
          {chapter.title}
        </h2>
        <p className="mt-2 font-display text-lg italic text-muted">{chapter.line}</p>

        <div className="mt-4">
          <PercentBar value={chapter.percent} />
        </div>

        <figure className="mt-5 overflow-hidden rounded-md border border-line">
          <img
            src={chapter.image}
            alt={chapter.caption}
            className="aspect-video max-h-64 w-full object-cover object-top md:max-h-none"
          />
          <figcaption className="px-3 py-2 text-xs tracking-wide text-muted">
            {chapter.caption}
          </figcaption>
        </figure>

        <button
          type="button"
          onClick={() => audioBus.dispatchEvent(new Event("toggle"))}
          className="mt-4 flex min-h-12 w-full items-center justify-center rounded-md border border-accent bg-surface font-display text-sm tracking-[0.16em] text-accent uppercase md:hidden"
        >
          Слушать главу · {chapter.audioTime || "голос"}
        </button>

        <ChapterAudio
          dock
          src={chapter.audio}
          title={`${chapter.id}. ${chapter.title}`}
          label={chapter.audioTime || "голос"}
          onEnded={() => {
            if (typeof window === "undefined") return;
            if (sessionStorage.getItem("kod-yulia-2-chain") !== "1") return;
            if (next) {
              void navigate({ to: "/ch/$id", params: { id: next.id } });
            } else {
              stopAudioChain();
            }
          }}
        />

        <div className="book-prose mt-7">
          {chapter.paragraphs.map((b, i) => (
            <p key={i} className={b.kind}>
              {b.text}
            </p>
          ))}
        </div>

        <p className="mt-12 text-center text-xs tracking-[0.28em] text-muted uppercase">
          /// конец фрагмента {chapter.id} ///
        </p>

        {!next && (
          <section className="relative mt-10 overflow-hidden rounded-md border border-line">
            <img
              src={chapter.image}
              alt=""
              className="aspect-video w-full object-cover object-center opacity-40"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-bg/55 px-6 text-center">
              <p className="font-display text-xs tracking-[0.32em] text-accent uppercase">
                Код Юлия · Часть II
              </p>
              <p className="mt-3 font-display text-3xl italic text-fg md:text-5xl">Рот ещё мой.</p>
              <p className="mt-4 max-w-md text-sm text-pretty text-muted">
                Внутри не ноль. Город будет охотиться по мёртвому коду.
              </p>
            </div>
          </section>
        )}

        <nav className="mt-8 grid gap-3 border-t border-line pt-6 sm:grid-cols-2">
          {prev ? (
            <Link
              to="/ch/$id"
              params={{ id: prev.id }}
              className="min-h-14 rounded-md border border-line bg-surface p-4 transition-[border-color] duration-150 hover:border-accent"
            >
              <span className="block text-xs tracking-[0.18em] text-muted uppercase">
                ← предыдущая
              </span>
              <span className="mt-1 block font-display text-xl">
                {prev.id}. {prev.title}
              </span>
            </Link>
          ) : (
            <Link
              to="/"
              hash="film"
              className="min-h-14 rounded-md border border-line bg-surface p-4 transition-[border-color] duration-150 hover:border-accent"
            >
              <span className="block text-xs tracking-[0.18em] text-muted uppercase">
                ← начало
              </span>
              <span className="mt-1 block font-display text-xl">Короткий метр</span>
            </Link>
          )}
          {next ? (
            <Link
              to="/ch/$id"
              params={{ id: next.id }}
              className="min-h-14 rounded-md border border-line bg-surface p-4 text-right transition-[border-color] duration-150 hover:border-accent"
            >
              <span className="block text-xs tracking-[0.18em] text-muted uppercase">
                следующая →
              </span>
              <span className="mt-1 block font-display text-xl">
                {next.id}. {next.title}
              </span>
            </Link>
          ) : (
            <div className="min-h-14 rounded-md border border-accent/40 bg-surface p-4 text-right">
              <span className="block text-xs tracking-[0.18em] text-accent uppercase">
                конец тома
              </span>
              <span className="mt-1 block font-display text-xl italic">Рот ещё мой.</span>
            </div>
          )}
        </nav>
      </article>
      <BottomNav nextId={next?.id} />
    </main>
  );
}
