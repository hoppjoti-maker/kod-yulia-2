import type { ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { BookOpen, Clapperboard, Headphones, Info } from "lucide-react";
import { BOOK } from "@/data/book";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Книга", icon: BookOpen, match: (p: string) => p === "/" || p.startsWith("/ch/") },
  { to: "/film", label: "Фильм", icon: Clapperboard, match: (p: string) => p.startsWith("/film") },
  { to: "/audio", label: "Аудио", icon: Headphones, match: (p: string) => p.startsWith("/audio") },
  { to: "/about", label: "О книге", icon: Info, match: (p: string) => p.startsWith("/about") },
] as const;

export function SiteHeader({ solid = false }: { solid?: boolean }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b border-line",
        solid ? "bg-bg" : "bg-bg/85 backdrop-blur-md",
      )}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 md:h-16 md:px-8">
        <Link to="/" className="min-w-0">
          <span className="block font-display text-[11px] tracking-[0.28em] text-accent uppercase">
            {BOOK.volume}
          </span>
          <span className="block truncate font-display text-base leading-tight md:text-lg">{BOOK.title}</span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex" aria-label="Разделы издания">
          {NAV.map((item) => {
            const active = item.match(pathname);
            return (
              <Link
                key={item.label}
                to={item.to}
                className={cn(
                  "rounded-sm px-3 py-2 font-display text-xs tracking-[0.16em] uppercase transition-colors duration-150",
                  active ? "text-fg" : "text-muted hover:text-fg",
                )}
              >
                {item.label}
              </Link>
            );
          })}
          <a
            href={BOOK.part1Url}
            className="rounded-sm px-3 py-2 font-display text-xs tracking-[0.16em] text-muted uppercase transition-colors duration-150 hover:text-fg"
          >
            Часть I
          </a>
        </nav>
      </div>
    </header>
  );
}

export function BottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-bg/92 pb-[env(safe-area-inset-bottom)] backdrop-blur-md md:hidden"
      aria-label="Мобильная навигация"
    >
      <ul className="grid grid-cols-5">
        {NAV.map((item) => {
          const Icon = item.icon;
          const active = item.match(pathname);
          return (
            <li key={item.label}>
              <Link
                to={item.to}
                className={cn(
                  "flex min-h-14 flex-col items-center justify-center gap-1 font-display text-[10px] tracking-[0.14em] uppercase",
                  active ? "text-accent" : "text-muted",
                )}
              >
                <Icon className="size-4" strokeWidth={1.6} />
                {item.label}
              </Link>
            </li>
          );
        })}
        <li>
          <a
            href={BOOK.part1Url}
            className="flex min-h-14 flex-col items-center justify-center gap-1 font-display text-[10px] tracking-[0.14em] text-muted uppercase"
          >
            <span className="font-display text-[11px] leading-none">I</span>
            Часть I
          </a>
        </li>
      </ul>
    </nav>
  );
}

export function SiteShell({ children, solid }: { children: ReactNode; solid?: boolean }) {
  return (
    <div className="min-h-dvh bg-bg pb-20 text-fg md:pb-0">
      <SiteHeader solid={solid} />
      {children}
      <BottomNav />
    </div>
  );
}
