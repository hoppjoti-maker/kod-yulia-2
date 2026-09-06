import { Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-chrome";

export function NotFoundPage() {
  return (
    <SiteShell solid>
      <main className="mx-auto max-w-lg px-4 py-24 text-center md:px-8">
        <p className="font-display text-xs tracking-[0.32em] text-muted uppercase">Страница не найдена</p>
        <h1 className="mt-3 font-display text-4xl tracking-[-0.03em]">Этой строки нет в томе</h1>
        <p className="mt-4 text-sm leading-relaxed text-pretty text-muted">
          Коридор закрыт. Вернитесь к оглавлению — пятнадцать глав на месте.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex min-h-12 items-center rounded-md bg-accent px-5 font-display text-sm tracking-[0.16em] text-accent-fg uppercase"
        >
          К оглавлению
        </Link>
      </main>
    </SiteShell>
  );
}
