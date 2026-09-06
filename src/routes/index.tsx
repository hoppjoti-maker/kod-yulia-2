import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-chrome";
import { BOOK } from "@/data/book";
import { CHAPTERS } from "@/data/chapters";
import { loadProgress } from "@/lib/progress";
import { fmtTime } from "@/lib/utils";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const [resumeId, setResumeId] = useState("01");

  useEffect(() => {
    const p = loadProgress();
    if (p?.chapterId) setResumeId(p.chapterId);
  }, []);

  const resume = CHAPTERS.find((c) => c.id === resumeId) ?? CHAPTERS[0];

  return (
    <SiteShell>
      <section className="relative min-h-[88dvh] overflow-hidden">
        <img
          src={BOOK.hero}
          alt=""
          className="absolute inset-0 size-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/55 to-bg/25" />
        <div className="relative mx-auto flex min-h-[88dvh] max-w-6xl flex-col justify-end px-4 pb-16 pt-24 md:px-8 md:pb-24">
          <p className="font-display text-xs tracking-[0.32em] text-accent uppercase">{BOOK.volume}</p>
          <h1 className="mt-3 max-w-3xl font-display text-5xl leading-[0.95] tracking-[-0.04em] text-balance md:text-7xl">
            {BOOK.title}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-pretty text-fg/90 md:text-lg">
            {BOOK.logline}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/ch/$id"
              params={{ id: resume.id }}
              className="inline-flex min-h-12 items-center rounded-md bg-accent px-5 font-display text-sm tracking-[0.16em] text-accent-fg uppercase transition-transform duration-150 active:scale-[0.98]"
            >
              {resume.id === "01" ? "Читать книгу" : `Продолжить · ${resume.title}`}
            </Link>
            <Link
              to="/film"
              className="inline-flex min-h-12 items-center rounded-md border border-line px-5 font-display text-sm tracking-[0.16em] uppercase hover:border-accent"
            >
              Кинозал
            </Link>
          </div>
        </div>
      </section>

      <section id="book" className="mx-auto max-w-6xl scroll-mt-16 px-4 py-12 md:px-8 md:py-16">
        <p className="font-display text-xs tracking-[0.28em] text-muted uppercase">Пятнадцать глав</p>
        <h2 className="mt-2 font-display text-3xl md:text-4xl">Том открыт целиком</h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-pretty text-muted md:text-base">
          Главы 01–07 — текст и голос. Главы 08–15 — только текст. Музыка стоит между главами, не под пакетом.
        </p>
        <ol className="mt-8 grid gap-3 md:grid-cols-2">
          {CHAPTERS.map((c) => (
            <li key={c.id} className="min-w-0">
              <Link
                to="/ch/$id"
                params={{ id: c.id }}
                className="group flex min-w-0 overflow-hidden rounded-lg border border-line bg-surface transition-colors duration-150 hover:border-accent"
              >
                <img
                  src={c.image}
                  alt=""
                  className="h-28 w-24 shrink-0 object-cover object-center sm:h-32 sm:w-28"
                />
                <span className="flex min-w-0 flex-1 flex-col justify-center gap-1 p-3 sm:p-4">
                  <span className="truncate font-display text-[11px] tracking-[0.2em] text-muted uppercase">
                    {c.id} · {c.wound}
                    {c.percent != null ? ` · ${c.percent}%` : ""}
                    {c.audio ? ` · ${c.audio.time}` : " · текст"}
                  </span>
                  <span className="font-display text-xl leading-tight">{c.title}</span>
                  <span className="truncate text-sm text-muted">{c.line}</span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto grid max-w-6xl gap-3 px-4 pb-16 md:grid-cols-2 md:px-8">
        <Link
          to="/film"
          className="group min-w-0 overflow-hidden rounded-lg border border-line bg-surface hover:border-accent"
        >
          <img src={BOOK.filmPoster} alt="" className="aspect-video w-full object-cover object-center" />
          <div className="p-4">
            <p className="font-display text-[11px] tracking-[0.2em] text-muted uppercase">
              Кинозал · {fmtTime(BOOK.filmDur)} · стерео
            </p>
            <p className="mt-1 font-display text-2xl">Открытый код</p>
            <p className="mt-1 text-sm text-muted">Короткий метр тома. Без чужих плашек.</p>
          </div>
        </Link>
        <Link
          to="/audio"
          className="flex min-w-0 flex-col justify-between rounded-lg border border-line bg-surface p-4 hover:border-accent md:p-6"
        >
          <div>
            <p className="font-display text-[11px] tracking-[0.2em] text-muted uppercase">Аудиозал</p>
            <p className="mt-1 font-display text-2xl">Голос 01–07</p>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">
              Семь канонических глав. 08–15 остаются текстом. Музыка только между главами.
            </p>
          </div>
          <p className="mt-6 font-display text-xs tracking-[0.16em] text-accent uppercase">Слушать</p>
        </Link>
      </section>

      <footer className="border-t border-line px-4 py-12 text-center md:px-8">
        <p className="font-display text-2xl italic">Рот ещё мой.</p>
        <p className="mt-3 text-sm text-muted">
          {BOOK.title} · {BOOK.volume} · {BOOK.author}
        </p>
        <a
          href={BOOK.part1Url}
          className="mt-4 inline-block font-display text-xs tracking-[0.16em] text-muted uppercase hover:text-fg"
        >
          Часть I · Редакция 4.0
        </a>
      </footer>
    </SiteShell>
  );
}
