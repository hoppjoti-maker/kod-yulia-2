import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-chrome";
import { BOOK } from "@/data/book";
import { fmtTime } from "@/lib/utils";

export const Route = createFileRoute("/film")({ component: FilmPage });

function FilmPage() {
  return (
    <SiteShell solid>
      <main className="mx-auto max-w-6xl px-4 py-8 md:px-8 md:py-12">
        <p className="font-display text-xs tracking-[0.32em] text-accent uppercase">Кинозал</p>
        <h1 className="mt-2 font-display text-4xl md:text-5xl">Открытый код</h1>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-pretty text-muted">
          Короткий метр тома. Без посторонних плашек и чужого бренда. {fmtTime(BOOK.filmDur)}, стерео.
        </p>
        <div className="mt-6 overflow-hidden rounded-lg border border-line bg-raised">
          <video
            className="aspect-video w-full bg-bg"
            controls
            playsInline
            preload="metadata"
            poster={BOOK.filmPoster}
            src={BOOK.filmSrc}
            controlsList="nodownload"
          >
            Фильм «Открытый код».
          </video>
        </div>
        <p className="mt-4 max-w-xl text-xs leading-relaxed text-subtle">
          Мастер-поток: H.264 / AAC stereo. Тишина под ночным пакетом сохранена. Клипы генерации сюда не ставятся.
        </p>
      </main>
    </SiteShell>
  );
}
