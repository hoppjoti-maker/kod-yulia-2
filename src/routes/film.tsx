import { createFileRoute, Link } from "@tanstack/react-router";
import { BottomNav } from "@/components/bottom-nav";
import { FilmStage } from "@/components/film-stage";
import { SiteHeader } from "@/components/site-header";
import { BOOK } from "@/data/book";

export const Route = createFileRoute("/film")({
  component: FilmPage,
  head: () => ({
    meta: [{ title: `Город уже читает — ${BOOK.title}` }],
  }),
});

function FilmPage() {
  return (
    <main className="min-h-dvh bg-bg pb-24 text-fg md:pb-0">
      <SiteHeader active="film" />

      <section className="mx-auto max-w-6xl px-4 py-4 md:px-8 md:py-6">
        <p className="font-display text-xs tracking-[0.32em] text-accent uppercase">
          Короткий метр · Часть II · Открытый код
        </p>
        <h2 className="mt-1 font-display text-2xl font-medium text-balance md:mt-2 md:text-4xl">
          Город уже читает
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-pretty text-muted">
          Стекло держит лицо. Хлеб. Жест. «Нет». Рот ещё её. Это не двенадцать ударов Части I.
        </p>
        <div className="mt-4 md:mt-6">
          <FilmStage
            endHref="/ch/01"
            endLabel="Глава 01 · Тишина"
            endQuote="Рот ещё мой."
          />
        </div>
      </section>

      <footer className="border-t border-line px-4 py-10 text-center md:px-8">
        <p className="font-display text-2xl italic">Рот ещё мой.</p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/ch/$id"
            params={{ id: "01" }}
            className="inline-flex min-h-12 items-center rounded-md border border-accent px-5 font-display text-sm tracking-[0.18em] text-accent uppercase hover:bg-raised"
          >
            Глава 01 · Тишина
          </Link>
          <a
            href={BOOK.part1Url}
            className="inline-flex min-h-12 items-center rounded-md border border-line px-5 font-display text-sm tracking-[0.18em] uppercase hover:bg-raised"
          >
            Часть I отдельно
          </a>
        </div>
      </footer>
      <BottomNav />
    </main>
  );
}
