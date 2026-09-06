import { useState } from "react";
import { createPortal } from "react-dom";
import { BookOpen, Send, X } from "lucide-react";
import { OFFER, unlockKit } from "@/lib/kit";

type TelegramBookGateProps = {
  className?: string;
  label?: string;
};

export function TelegramBookGate({
  className = "",
  label = "Получить книгу",
}: TelegramBookGateProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button type="button" className={className} onClick={() => setIsOpen(true)}>
        <BookOpen aria-hidden="true" className="h-4 w-4" />
        {label}
      </button>

      {isOpen
        ? createPortal(
            <div
              className="fixed inset-0 z-[100] flex min-h-[100dvh] items-end justify-center overflow-y-auto bg-bg/80 px-3 backdrop-blur-sm sm:items-center sm:p-4"
              style={{
                paddingTop: "max(1rem, env(safe-area-inset-top))",
                paddingBottom: "max(5rem, calc(1rem + env(safe-area-inset-bottom)))",
              }}
              role="presentation"
              onMouseDown={(event) => {
                if (event.target === event.currentTarget) setIsOpen(false);
              }}
            >
              <section
                role="dialog"
                aria-modal="true"
                aria-labelledby="telegram-book-gate-title"
                className="max-h-full w-full max-w-md overflow-y-auto rounded-md border border-accent/70 bg-bg shadow-[0_0_70px_rgba(139,184,176,0.16)]"
              >
                <div className="flex items-center justify-between border-b border-line px-5 py-4">
                  <span className="font-display text-xs tracking-[0.3em] text-accent uppercase">
                    Софт-пейвол
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="rounded-sm p-1 text-muted transition-colors hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                    aria-label="Закрыть окно"
                  >
                    <X aria-hidden="true" className="h-5 w-5" />
                  </button>
                </div>

                <div className="p-5 sm:p-6">
                  <h2 id="telegram-book-gate-title" className="font-display text-3xl font-medium text-fg">
                    Не часы. Плотность.
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-pretty text-muted">
                    Три главы и фильм — дегустация. Дальше том целиком: голос пакета, досье лиц,
                    главы 04–15 до «не ноль». Платите за погружение, не за минуты.
                  </p>
                  <ul className="mt-5 space-y-2 border border-line bg-surface p-4 text-sm">
                    <li className="flex justify-between gap-3">
                      <span className="text-muted">Тишина · Рот · Стекло</span>
                      <span className="font-display tracking-[0.12em] text-accent uppercase">открыто</span>
                    </li>
                    <li className="flex justify-between gap-3">
                      <span className="text-muted">Канал · полный комплект</span>
                      <span className="tabular-nums text-fg">{OFFER.channel}/мес</span>
                    </li>
                    <li className="flex justify-between gap-3">
                      <span className="text-muted">Разовый бандл тома</span>
                      <span className="tabular-nums text-fg">
                        {OFFER.bundle}–{OFFER.bundleHigh}
                      </span>
                    </li>
                  </ul>
                  <a
                    href={OFFER.telegram}
                    onClick={() => unlockKit()}
                    className="mt-6 flex min-h-12 w-full items-center justify-center gap-2 rounded-sm border border-accent bg-accent px-4 font-display text-sm tracking-[0.12em] text-bg uppercase transition-transform hover:brightness-110 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    <Send aria-hidden="true" className="h-4 w-4" />
                    Telegram · забрать комплект
                  </a>
                  <p className="mt-3 text-center text-xs leading-relaxed text-muted">
                    После канала том открывается здесь. Это не комплект Части I.
                  </p>
                </div>
              </section>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
