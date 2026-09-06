import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-chrome";
import { BOOK } from "@/data/book";

const FACES = [
  { src: "/book/images/portrait-yulia.jpg", name: "Юля", line: "Имя вне инвентаря." },
  { src: "/book/images/portrait-yu9.jpg", name: "YU-9", line: "То же лицо. Без трещин." },
  { src: "/book/images/portrait-elias.jpg", name: "Элиас", line: "Узнаёт дрожь, не имя." },
] as const;

export const Route = createFileRoute("/about")({ component: AboutPage });

function AboutPage() {
  return (
    <SiteShell solid>
      <main className="mx-auto max-w-3xl px-4 py-8 md:px-8 md:py-12">
        <p className="font-display text-xs tracking-[0.32em] text-accent uppercase">О книге</p>
        <h1 className="mt-2 font-display text-4xl leading-tight md:text-5xl">
          {BOOK.title}
          <span className="mt-2 block text-2xl text-muted md:text-3xl">{BOOK.volume}</span>
        </h1>
        <p className="mt-6 font-body text-lg leading-relaxed text-pretty">{BOOK.logline}</p>
        <p className="mt-4 font-body text-base leading-relaxed text-pretty text-muted">{BOOK.preamble}</p>
        <p className="mt-4 font-body text-base leading-relaxed text-pretty text-muted">{BOOK.formula}</p>

        <ul className="mt-10 grid gap-3 sm:grid-cols-3">
          {FACES.map((f) => (
            <li key={f.name} className="overflow-hidden rounded-lg border border-line bg-surface">
              <img src={f.src} alt="" className="aspect-[4/5] w-full object-cover object-center" />
              <div className="p-3">
                <p className="font-display text-base">{f.name}</p>
                <p className="mt-0.5 text-xs text-muted">{f.line}</p>
              </div>
            </li>
          ))}
        </ul>

        <dl className="mt-10 grid gap-4 border-t border-line pt-8 sm:grid-cols-2">
          <div>
            <dt className="font-display text-[11px] tracking-[0.2em] text-muted uppercase">Автор</dt>
            <dd className="mt-1 font-display text-lg">{BOOK.author}</dd>
          </div>
          <div>
            <dt className="font-display text-[11px] tracking-[0.2em] text-muted uppercase">Форма</dt>
            <dd className="mt-1 font-display text-lg">15 глав · фильм · голос 01–07</dd>
          </div>
          <div>
            <dt className="font-display text-[11px] tracking-[0.2em] text-muted uppercase">Раневая шкала</dt>
            <dd className="mt-1 text-sm leading-relaxed text-muted">
              W0 главы 01–06. W1 — 07–08. W2 — 09–12. W3 — 13–15.
            </dd>
          </div>
          <div>
            <dt className="font-display text-[11px] tracking-[0.2em] text-muted uppercase">Часть I</dt>
            <dd className="mt-1">
              <a
                href={BOOK.part1Url}
                className="font-display text-lg text-accent underline-offset-4 hover:underline"
              >
                Код Юлия · Редакция 4.0
              </a>
            </dd>
          </div>
        </dl>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            to="/ch/$id"
            params={{ id: "01" }}
            className="inline-flex min-h-12 items-center rounded-md bg-accent px-5 font-display text-sm tracking-[0.16em] text-accent-fg uppercase"
          >
            К главе 01
          </Link>
          <Link
            to="/film"
            className="inline-flex min-h-12 items-center rounded-md border border-line px-5 font-display text-sm tracking-[0.16em] uppercase hover:border-accent"
          >
            Фильм
          </Link>
        </div>
      </main>
    </SiteShell>
  );
}
