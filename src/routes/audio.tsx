import { createFileRoute } from "@tanstack/react-router";
import { AudioPlayer, TextModeCard } from "@/components/audio-player";
import { SiteShell } from "@/components/site-chrome";
import { SONGS } from "@/data/book";
import { CHAPTERS } from "@/data/chapters";

export const Route = createFileRoute("/audio")({ component: AudioPage });

function AudioPage() {
  const voiced = CHAPTERS.filter((c) => c.audio);
  const text = CHAPTERS.filter((c) => !c.audio);
  const total = voiced.reduce((s, c) => s + (c.audio?.seconds ?? 0), 0);
  const m = Math.floor(total / 60);

  return (
    <SiteShell solid>
      <main className="mx-auto max-w-3xl px-4 py-8 md:px-8 md:py-12">
        <p className="font-display text-xs tracking-[0.32em] text-accent uppercase">Аудиозал</p>
        <h1 className="mt-2 font-display text-4xl md:text-5xl">Голос 01–07</h1>
        <p className="mt-3 text-sm leading-relaxed text-pretty text-muted md:text-base">
          Семь канонических глав, {m} мин. Музыка только между главами. Ночной пакет звучит в тишине.
          Главы 08–15 остаются текстом: чужой синтез сюда не ставится.
        </p>

        <ul className="mt-8 space-y-3">
          {voiced.map((c) => (
            <li key={c.id}>
              <AudioPlayer
                src={c.audio!.src}
                title={`${c.id}. ${c.title}`}
                subtitle={`${c.audio!.time} · ${c.wound}${c.percent != null ? ` · ${c.percent}%` : ""}`}
              />
            </li>
          ))}
        </ul>

        <h2 className="mt-12 font-display text-2xl">Между главами</h2>
        <p className="mt-2 text-sm text-muted">Не под пакет. Не вместо главы.</p>
        <ul className="mt-4 space-y-3">
          {SONGS.map((s) => (
            <li key={s.id}>
              <AudioPlayer src={s.src} title={s.title} subtitle={s.time} />
            </li>
          ))}
        </ul>

        <h2 className="mt-12 font-display text-2xl">08–15 · текстовый режим</h2>
        <ul className="mt-4 space-y-3">
          {text.map((c) => (
            <li key={c.id}>
              <TextModeCard title={`${c.id}. ${c.title}`} id={c.id} />
            </li>
          ))}
        </ul>
      </main>
    </SiteShell>
  );
}
