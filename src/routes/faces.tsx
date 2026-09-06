import { createFileRoute, Link } from "@tanstack/react-router";
import { BottomNav } from "@/components/bottom-nav";
import { SiteHeader } from "@/components/site-header";
import { BOOK, DOSSIER, PORTRAITS } from "@/data/book";

export const Route = createFileRoute("/faces")({ component: Faces });

function Faces() {
  return (
    <main className="min-h-dvh bg-bg pb-24 text-fg md:pb-0">
      <SiteHeader active="faces" />

      <section className="relative isolate overflow-hidden border-b border-line">
        <img
          src={PORTRAITS[0].image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-top opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/70 to-bg/20" />
        <div className="relative mx-auto max-w-6xl px-4 py-14 md:px-8 md:py-20">
          <p className="font-display text-xs tracking-[0.32em] text-accent uppercase">
            Досье · одно лицо
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-4xl font-medium leading-[1.05] md:text-6xl">
            Юля. YU-7. YU-9.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-pretty text-muted md:text-lg">
            Не три актрисы. Один контур. Задержка века отличает имя от инвентаря.
            Элиас смотрит на жест.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8 md:px-8 md:py-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PORTRAITS.map((p) => (
            <figure key={p.id} className="overflow-hidden rounded-md border border-line bg-surface">
              <img
                src={p.image}
                alt={p.name}
                className="aspect-[2/3] w-full object-cover object-top"
              />
              <figcaption className="p-4">
                <p className="font-mono text-[11px] tracking-[0.22em] text-accent uppercase">
                  {p.code}
                </p>
                <p className="mt-1 font-display text-2xl">{p.name}</p>
                <p className="mt-1 text-sm leading-relaxed text-pretty text-muted">{p.note}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl border-t border-line px-4 py-8 md:px-8 md:py-10">
        <p className="font-display text-xs tracking-[0.28em] text-muted uppercase">
          Поворот · YU-7
        </p>
        <h2 className="mt-2 font-display text-3xl font-medium">Три угла одного тела</h2>
        <figure className="mt-5 overflow-hidden rounded-md border border-line bg-surface">
          <img
            src={DOSSIER.turnaround}
            alt="Поворот Юлии"
            className="aspect-[16/9] w-full object-contain bg-fg/5 object-center md:aspect-[21/9]"
          />
        </figure>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <figure className="overflow-hidden rounded-md border border-line bg-surface">
            <img src={DOSSIER.body} alt="" className="aspect-[3/2] w-full object-cover object-top" />
            <figcaption className="p-3 text-sm text-muted">Студия. Тело, которое списали.</figcaption>
          </figure>
          <figure className="overflow-hidden rounded-md border border-line bg-surface">
            <img src={DOSSIER.sheet} alt="" className="aspect-[3/2] w-full object-cover object-top" />
            <figcaption className="p-3 text-sm text-muted">Лист. Метка YU-7 на коже.</figcaption>
          </figure>
        </div>
      </section>

      <section className="mx-auto max-w-6xl border-t border-line px-4 py-8 md:px-8 md:py-10">
        <p className="font-display text-xs tracking-[0.28em] text-muted uppercase">Ключ</p>
        <h2 className="mt-2 font-display text-3xl font-medium">Два контура. Одна теплица.</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <figure className="overflow-hidden rounded-md border border-line bg-surface">
            <img src={DOSSIER.twins} alt="Код Юлия" className="aspect-[2/3] w-full object-cover object-top md:aspect-[3/4]" />
            <figcaption className="p-4 text-sm leading-relaxed text-muted">
              Постер тома. Слева — закрытый код. Справа — имя, которое ещё дышит.
            </figcaption>
          </figure>
          <div className="grid gap-4">
            <figure className="overflow-hidden rounded-md border border-line bg-surface">
              <img src={DOSSIER.rain} alt="" className="aspect-video w-full object-cover object-center" />
              <figcaption className="p-3 text-sm text-muted">Стекло. Элиас в кадре. Дождь — погода, не поэзия.</figcaption>
            </figure>
            <figure className="overflow-hidden rounded-md border border-line bg-surface">
              <img src={DOSSIER.lab} alt="" className="aspect-video w-full object-cover object-center" />
              <figcaption className="p-3 text-sm text-muted">Стол. Пробуждение инвентаря. Часть I сидит в теле.</figcaption>
            </figure>
            <figure className="overflow-hidden rounded-md border border-line bg-surface">
              <video
                className="aspect-video w-full object-cover"
                src={DOSSIER.labClip}
                poster={DOSSIER.lab}
                playsInline
                muted
                loop
                autoPlay
                preload="metadata"
              />
              <figcaption className="p-3 text-sm text-muted">Клип. YU-7 поднимает руку. Без английского.</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <footer className="border-t border-line px-4 py-10 text-center md:px-8">
        <p className="font-display text-2xl italic">Рот ещё мой.</p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/"
            hash="film"
            className="min-h-12 rounded-md border border-line px-5 py-3 font-display text-sm tracking-[0.18em] uppercase hover:bg-raised"
          >
            Короткий метр
          </Link>
          <Link
            to="/ch/$id"
            params={{ id: "01" }}
            className="min-h-12 rounded-md border border-accent bg-accent px-5 py-3 font-display text-sm tracking-[0.18em] text-bg uppercase"
          >
            Читать с первой
          </Link>
        </div>
        <p className="mt-5 text-sm text-muted">
          {BOOK.title} · {BOOK.volume} · {BOOK.author}
        </p>
      </footer>
      <BottomNav />
    </main>
  );
}
