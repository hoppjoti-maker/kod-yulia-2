import { Link, useRouterState } from "@tanstack/react-router";
import { BookOpen, Clapperboard, ScanFace, ChevronRight } from "lucide-react";
import { startAudioChain } from "@/components/chapter-audio";

export function BottomNav({ nextId }: { nextId?: string }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const onFilm = pathname === "/" || pathname === "/film";
  const onBook = pathname.startsWith("/ch/");
  const onFaces = pathname === "/faces";
  const tab = (on: boolean) =>
    "flex min-h-14 flex-col items-center justify-center gap-0.5 text-xs tracking-wide " +
    (on ? "text-accent" : "text-muted");

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-bg/95 backdrop-blur-md md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      aria-label="Разделы"
    >
      <ul className="grid grid-cols-4">
        <li>
          <Link to="/film" className={tab(onFilm)}>
            <Clapperboard className="h-5 w-5" />
            Фильм
          </Link>
        </li>
        <li>
          <a href="/#chapters" className={tab(onBook)}>
            <BookOpen className="h-5 w-5" />
            Главы
          </a>
        </li>
        <li>
          <Link to="/faces" className={tab(onFaces)}>
            <ScanFace className="h-5 w-5" />
            Лица
          </Link>
        </li>
        <li>
          {nextId ? (
            <Link to="/ch/$id" params={{ id: nextId }} className={tab(false)}>
              <ChevronRight className="h-5 w-5" />
              Дальше
            </Link>
          ) : (
            <Link
              to="/ch/$id"
              params={{ id: "01" }}
              onClick={() => startAudioChain()}
              className={tab(false)}
            >
              <BookOpen className="h-5 w-5" />
              С первой
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}