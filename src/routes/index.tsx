import { createFileRoute, Link } from "@tanstack/react-router";
import { BottomNav } from "@/components/bottom-nav";
import { startAudioChain } from "@/components/chapter-audio";
import { FilmStage } from "@/components/film-stage";
import { SiteHeader } from "@/components/site-header";
import { BOOK, CHAPTERS, PORTRAITS } from "@/data/book";

export const Route = createFileRoute("/")({ component: Edition });

function Edition() {
  return (
    <main className="min-h-dvh bg-bg pb-24 text-fg md:pb-0">
      <SiteHeader active="film" />

      <section id="film" className="mx-auto max-w-6xl scroll-mt-16 px-4 py-4 md:scroll-mt-20 md:px-8 md:py-6">
        <p className="font-display text-xs tracking-[0.32em] text-accent uppercase">
          Короткий метр · Открытый код · 5:32
        </p>
        <h2 className="mt-1 font-display text-2xl font-medium text-balance md:mt-2 md:text-4xl">
          Город уже читает
        </h2>
        <p className="mt-2 hidden max-w-2xl text-sm leading-relaxed text-pretty text-muted md:mt-3 md:block">
          {BOOK.formula} Пятнадцать глав. Лицо на стекле. Голос, который читает до «не ноль».
        </p>
        <div className="mt-4 md:mt-6">
          <FilmStage />
        </div>
      </section>

      <section
        id="chapters"
        className="mx-auto max-w-6xl scroll-mt-16 border-t border-line px-4 py-8 md:scroll-mt-20 md:px-8 md:py-10"
      >
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-display text-xs tracking-[0.28em] text-muted uppercase">
              {BOOK.volume} · {BOOK.author}
            </p>
            <h2 className="mt-2 font-display text-3xl font-medium md:text-4xl">Пятнадцать глав</h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-pretty text-muted">
              {BOOK.subtitle}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/ch/$id"
              params={{ id: "01" }}
              className="min-h-12 rounded-md border border-accent px-5 py-3 font-display text-sm tracking-[0.18em] text-accent uppercase transition-[transform,background-color] duration-150 hover:bg-raised active:scale-[0.96]"
            >
              Глава 01 · Тишина
            </Link>
            <Link
              to="/ch/$id"
              params={{ id: "01" }}
              onClick={() => startAudioChain()}
              className="min-h-12 rounded-md border border-line px-5 py-3 font-display text-sm tracking-[0.18em] uppercase transition-[transform,background-color] duration-150 hover:border-accent hover:bg-raised active:scale-[0.96]"
            >
              Слушать с первой
            </Link>
          </div>
        </div>

        <ol className="mt-6 grid gap-3 md:mt-8 md:grid-cols-2 md:gap-4">
          {CHAPTERS.map((c) => (
            <li key={c.id}>
              <Link
                to="/ch/$id"
                params={{ id: c.id }}
                className="group flex flex-col overflow-hidden rounded-md border border-line bg-surface transition-[border-color] duration-150 hover:border-accent sm:flex-row sm:items-stretch"
              >
                <img
                  src={c.image}
                  alt=""
                  className="aspect-video w-full object-cover object-top sm:h-40 sm:w-36 sm:shrink-0 sm:aspect-auto"
                />
                <span className="flex min-w-0 flex-1 flex-col justify-center gap-1 p-3 sm:p-4">
                  <span className="text-xs tabular-nums tracking-[0.2em] text-muted uppercase">
                    Глава {c.id}
                    {c.percent != null ? ` · ${c.percent}%` : ""} · {c.wound} · {c.audioTime}
                  </span>
                  <span className="font-display text-xl leading-tight md:text-2xl">{c.title}</span>
                  <span className="text-sm text-pretty text-muted">{c.line}</span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section
        id="faces"
        className="mx-auto max-w-6xl scroll-mt-16 border-t border-line px-4 py-8 md:scroll-mt-20 md:px-8 md:py-10"
      >
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-display text-xs tracking-[0.28em] text-muted uppercase">Досье тома</p>
            <h2 className="mt-2 font-display text-3xl font-medium">Юля. YU-7. YU-9. Элиас.</h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-pretty text-muted">
              Не инвентарь Части I. Задержка века отличает имя. Элиас смотрит на жест, не на скулы.
            </p>
          </div>
          <Link
            to="/faces"
            className="min-h-12 rounded-md border border-line px-5 py-3 font-display text-sm tracking-[0.18em] uppercase hover:border-accent"
          >
            Открыть досье
          </Link>
        </div>
        <ul className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {PORTRAITS.map((p) => (
            <li key={p.id}>
              <Link to="/faces" className="group block overflow-hidden rounded-md border border-line bg-surface">
                <img src={p.image} alt={p.name} className="aspect-[2/3] w-full object-cover object-top" />
                <span className="block p-3">
                  <span className="block font-mono text-[11px] tracking-[0.22em] text-accent uppercase">
                    {p.code}
                  </span>
                  <span className="mt-1 block font-display text-xl">{p.name}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <footer className="border-t border-line px-4 py-10 text-center md:px-8">
        <p className="font-display text-2xl italic">Рот ещё мой.</p>
        <p className="mt-3 text-sm text-muted">
          {BOOK.title} · {BOOK.volume} · {BOOK.author}
        </p>
        <p className="mt-4 text-xs tracking-wide text-muted">
          Песни и двенадцать ударов живут в{" "}
          <a href={BOOK.part1Url} className="text-accent underline-offset-4 hover:underline">
            Части I
          </a>
          . Здесь — открытый код.
        </p>
      </footer>
      <BottomNav />
    </main>
  );
}
