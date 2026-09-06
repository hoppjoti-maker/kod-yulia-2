import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { cn, fmtTime } from "@/lib/utils";

const AUDIO_PLAY = "kod-yulia-audio-play";

export function AudioPlayer({
  src,
  title,
  subtitle,
}: {
  src: string;
  title: string;
  subtitle?: string;
}) {
  const ref = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [t, setT] = useState(0);
  const [d, setD] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onTime = () => setT(el.currentTime);
    const onMeta = () => setD(el.duration || 0);
    const onEnd = () => setPlaying(false);
    const onForeign = (e: Event) => {
      const other = (e as CustomEvent<string>).detail;
      if (other !== src && !el.paused) {
        el.pause();
        setPlaying(false);
      }
    };
    el.addEventListener("timeupdate", onTime);
    el.addEventListener("loadedmetadata", onMeta);
    el.addEventListener("ended", onEnd);
    window.addEventListener(AUDIO_PLAY, onForeign);
    return () => {
      el.removeEventListener("timeupdate", onTime);
      el.removeEventListener("loadedmetadata", onMeta);
      el.removeEventListener("ended", onEnd);
      window.removeEventListener(AUDIO_PLAY, onForeign);
    };
  }, [src]);

  function toggle() {
    const el = ref.current;
    if (!el) return;
    if (el.paused) {
      window.dispatchEvent(new CustomEvent(AUDIO_PLAY, { detail: src }));
      void el.play();
      setPlaying(true);
    } else {
      el.pause();
      setPlaying(false);
    }
  }

  const pct = d > 0 ? (t / d) * 100 : 0;

  return (
    <div className="rounded-lg border border-line bg-surface p-4">
      <audio ref={ref} src={src} preload="metadata" />
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={toggle}
          className="flex size-11 shrink-0 items-center justify-center rounded-md bg-accent text-accent-fg transition-transform duration-150 hover:opacity-90 active:scale-[0.96]"
          aria-label={playing ? "Пауза" : "Слушать"}
        >
          {playing ? <Pause className="size-4" /> : <Play className="size-4 translate-x-px" />}
        </button>
        <div className="min-w-0 flex-1">
          <p className="truncate font-display text-base leading-tight">{title}</p>
          {subtitle ? <p className="mt-0.5 text-xs text-muted">{subtitle}</p> : null}
          <div className="mt-2">
            <input
              type="range"
              min={0}
              max={100}
              value={pct}
              aria-label="Позиция"
              className="h-1.5 w-full accent-accent"
              onChange={(e) => {
                const el = ref.current;
                if (!el || !d) return;
                el.currentTime = (Number(e.target.value) / 100) * d;
              }}
            />
            <div className="mt-1 flex justify-between font-display text-[11px] tabular-nums tracking-wide text-muted">
              <span>{fmtTime(t)}</span>
              <span>{fmtTime(d)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TextModeCard({ title, id }: { title: string; id: string }) {
  return (
    <div className={cn("rounded-lg border border-line bg-surface p-4")}>
      <p className="font-display text-base">{title}</p>
      <p className="mt-1 text-xs tracking-wide text-muted uppercase">Текстовый режим</p>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        Голос этой главы не записывался. Читать — единственный канон.
      </p>
      <Link
        to="/ch/$id"
        params={{ id }}
        className="mt-3 inline-flex min-h-11 items-center font-display text-xs tracking-[0.16em] text-accent uppercase"
      >
        Открыть текст
      </Link>
    </div>
  );
}
