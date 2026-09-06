import * as Dialog from "@radix-ui/react-dialog";
import { Link } from "@tanstack/react-router";
import { List, Minus, Moon, Plus, Sun, X } from "lucide-react";
import { CHAPTERS, type Chapter } from "@/data/chapters";
import { applyPrefs, loadPrefs, savePrefs, type FontSize, type Theme } from "@/lib/progress";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const FONTS: FontSize[] = ["sm", "md", "lg", "xl"];

export function ReaderToolbar({ chapter }: { chapter: Chapter }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [font, setFont] = useState<FontSize>("md");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const p = loadPrefs();
    setTheme(p.theme);
    setFont(p.font);
    applyPrefs(p);
  }, []);

  function commit(next: { theme?: Theme; font?: FontSize }) {
    const p = { theme: next.theme ?? theme, font: next.font ?? font };
    setTheme(p.theme);
    setFont(p.font);
    savePrefs(p);
  }

  const i = FONTS.indexOf(font);

  return (
    <div className="sticky top-14 z-30 border-b border-line bg-bg/90 backdrop-blur-md md:top-16">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-3 py-2 md:px-8">
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger asChild>
            <button
              type="button"
              className="inline-flex min-h-11 items-center gap-2 rounded-sm px-2 font-display text-xs tracking-[0.16em] text-muted uppercase hover:text-fg"
            >
              <List className="size-4" />
              Оглавление
            </button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 z-50 bg-bg/70" />
            <Dialog.Content className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col border-l border-line bg-surface p-5">
              <div className="flex items-center justify-between">
                <Dialog.Title className="font-display text-lg">Пятнадцать глав</Dialog.Title>
                <Dialog.Close className="flex size-11 items-center justify-center rounded-sm text-muted hover:text-fg">
                  <X className="size-4" />
                </Dialog.Close>
              </div>
              <ol className="mt-4 flex-1 space-y-1 overflow-y-auto">
                {CHAPTERS.map((c) => (
                  <li key={c.id}>
                    <Dialog.Close asChild>
                      <Link
                        to="/ch/$id"
                        params={{ id: c.id }}
                        className={cn(
                          "flex min-h-12 items-baseline justify-between gap-3 rounded-md px-3 py-2 hover:bg-raised",
                          c.id === chapter.id && "bg-raised",
                        )}
                      >
                        <span>
                          <span className="font-display text-[11px] tracking-[0.18em] text-muted uppercase">
                            {c.id} · {c.wound}
                          </span>
                          <span className="mt-0.5 block font-display text-base">{c.title}</span>
                        </span>
                        <span className="shrink-0 text-[11px] tabular-nums text-subtle">
                          {c.audio ? c.audio.time : "текст"}
                        </span>
                      </Link>
                    </Dialog.Close>
                  </li>
                ))}
              </ol>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>

        <div className="flex items-center gap-1">
          <button
            type="button"
            className="flex size-11 items-center justify-center rounded-sm text-muted hover:text-fg"
            aria-label="Меньше шрифт"
            disabled={i <= 0}
            onClick={() => commit({ font: FONTS[Math.max(0, i - 1)] })}
          >
            <Minus className="size-4" />
          </button>
          <span className="w-8 text-center font-display text-[11px] tabular-nums tracking-wide text-muted uppercase">
            {font}
          </span>
          <button
            type="button"
            className="flex size-11 items-center justify-center rounded-sm text-muted hover:text-fg"
            aria-label="Больше шрифт"
            disabled={i >= FONTS.length - 1}
            onClick={() => commit({ font: FONTS[Math.min(FONTS.length - 1, i + 1)] })}
          >
            <Plus className="size-4" />
          </button>
          <button
            type="button"
            className="ml-1 flex size-11 items-center justify-center rounded-sm text-muted hover:text-fg"
            aria-label={theme === "dark" ? "Светлая тема" : "Тёмная тема"}
            onClick={() => commit({ theme: theme === "dark" ? "light" : "dark" })}
          >
            {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}
