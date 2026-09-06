import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { fmtTime } from "@/data/book";

export const audioBus = new EventTarget();
export const AUDIO_CHAIN_KEY = "kod-yulia-2-chain";

export function startAudioChain() {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(AUDIO_CHAIN_KEY, "1");
}

export function stopAudioChain() {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(AUDIO_CHAIN_KEY);
}

function chainOn() {
  return typeof window !== "undefined" && sessionStorage.getItem(AUDIO_CHAIN_KEY) === "1";
}

export function ChapterAudio({
  src,
  title,
  label,
  dock,
  onEnded,
}: {
  src: string;
  title: string;
  label: string;
  dock?: boolean;
  onEnded?: () => void;
}) {
  const ref = useRef<HTMLAudioElement>(null);
  const idRef = useRef(`a-${src}`);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [dur, setDur] = useState(0);
  const [rate, setRate] = useState(1);
  const [available, setAvailable] = useState(true);
  const [space, setSpace] = useState(true);
  const onEndedRef = useRef(onEnded);
  onEndedRef.current = onEnded;
  const ctxRef = useRef<AudioContext | null>(null);
  const delayRef = useRef<DelayNode | null>(null);
  const wiredRef = useRef(false);

  const wireSpace = () => {
    const el = ref.current;
    if (!el || wiredRef.current) return;
    try {
      const Ctor =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!Ctor) return;
      const ctx = new Ctor();
      const src = ctx.createMediaElementSource(el);
      const delay = ctx.createDelay(0.03);
      delay.delayTime.value = space ? 0.012 : 0;
      const filter = ctx.createBiquadFilter();
      filter.type = "highshelf";
      filter.frequency.value = 3500;
      filter.gain.value = -2.5;
      const merger = ctx.createChannelMerger(2);
      src.connect(merger, 0, 0);
      src.connect(delay);
      delay.connect(filter);
      filter.connect(merger, 0, 1);
      merger.connect(ctx.destination);
      ctxRef.current = ctx;
      delayRef.current = delay;
      wiredRef.current = true;
      void ctx.resume();
    } catch {
      /* keep element graph */
    }
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.pause();
    el.currentTime = 0;
    setPlaying(false);
    setTime(0);
    setAvailable(true);
  }, [src]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onTime = () => setTime(el.currentTime);
    const onMeta = () => setDur(el.duration || 0);
    const onPlay = () => {
      setPlaying(true);
      audioBus.dispatchEvent(new CustomEvent("play", { detail: idRef.current }));
      wireSpace();
      void ctxRef.current?.resume();
    };
    const onPause = () => setPlaying(false);
    const onStop = () => {
      setPlaying(false);
      onEndedRef.current?.();
    };
    const onErr = () => setAvailable(false);
    const onForeign = (e: Event) => {
      const other = (e as CustomEvent<string>).detail;
      if (other !== idRef.current) el.pause();
    };
    const onAsk = () => {
      if (!available) return;
      if (el.paused) void el.play().catch(() => setAvailable(false));
      else el.pause();
    };
    el.addEventListener("timeupdate", onTime);
    el.addEventListener("loadedmetadata", onMeta);
    el.addEventListener("durationchange", onMeta);
    el.addEventListener("play", onPlay);
    el.addEventListener("pause", onPause);
    el.addEventListener("ended", onStop);
    el.addEventListener("error", onErr);
    audioBus.addEventListener("play", onForeign);
    audioBus.addEventListener("toggle", onAsk);
    if (Number.isFinite(el.duration) && el.duration > 0) setDur(el.duration);
    if (chainOn()) {
      void el.play().catch(() => setAvailable(false));
    }
    return () => {
      el.removeEventListener("timeupdate", onTime);
      el.removeEventListener("loadedmetadata", onMeta);
      el.removeEventListener("durationchange", onMeta);
      el.removeEventListener("play", onPlay);
      el.removeEventListener("pause", onPause);
      el.removeEventListener("ended", onStop);
      el.removeEventListener("error", onErr);
      audioBus.removeEventListener("play", onForeign);
      audioBus.removeEventListener("toggle", onAsk);
    };
  }, [src, available]);

  useEffect(() => {
    if (ref.current) ref.current.playbackRate = rate;
  }, [rate]);

  useEffect(() => {
    if (delayRef.current) delayRef.current.delayTime.value = space ? 0.012 : 0;
  }, [space]);

  const toggle = () => {
    const el = ref.current;
    if (!el || !available) return;
    if (el.paused) void el.play().catch(() => setAvailable(false));
    else el.pause();
  };

  const seek = (t: number) => {
    const el = ref.current;
    if (!el || !available) return;
    el.currentTime = t;
    if (el.paused) void el.play().catch(() => setAvailable(false));
  };

  const progress = dur > 0 ? Math.min(1, time / dur) : 0;

  return (
    <>
      {dock ? (
        <div
          className="h-20 md:hidden"
          aria-hidden
          style={{ marginBottom: "env(safe-area-inset-bottom)" }}
        />
      ) : null}
      <div
        className={
          dock
            ? "fixed inset-x-0 bottom-16 z-40 border-t border-line bg-bg/95 px-3 py-2 backdrop-blur-md md:static md:z-20 md:mt-4 md:rounded-md md:border md:bg-surface md:p-4 md:backdrop-blur-none"
            : "rounded-md border border-line bg-surface p-3 md:p-4"
        }
      >
        <audio ref={ref} src={src} preload="metadata" playsInline />
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggle}
            disabled={!available}
            className="flex min-h-12 min-w-12 shrink-0 items-center justify-center rounded-md border border-line bg-raised text-fg transition-[border-color,transform] duration-150 ease-out hover:border-accent active:scale-[0.96] disabled:opacity-40"
            aria-label={playing ? "Пауза" : "Слушать главу"}
          >
            {playing ? <Pause className="h-5 w-5" /> : <Play className="ml-0.5 h-5 w-5 fill-fg" />}
          </button>
          <div className="min-w-0 flex-1">
            <p className="truncate font-display text-base leading-tight text-fg md:text-lg">{title}</p>
            <p className="mt-0.5 text-xs tabular-nums tracking-wide text-muted">
              {available
                ? `${fmtTime(time)} · ${dur ? fmtTime(dur) : label || "голос"}`
                : "Голос готовится · читайте главу"}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setSpace((v) => !v)}
            className={
              "min-h-11 shrink-0 rounded-sm px-2 font-display text-xs tracking-[0.14em] uppercase " +
              (space ? "text-accent" : "text-muted")
            }
            aria-pressed={space}
            aria-label="Пространственный звук"
          >
            {space ? "объём" : "моно"}
          </button>
          <div className="flex shrink-0 gap-0.5" role="group" aria-label="Темп">
            {[0.9, 1, 1.1].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRate(r)}
                className={
                  "min-h-11 min-w-11 rounded-sm font-sans text-xs tabular-nums " +
                  (rate === r ? "bg-raised text-accent" : "text-muted")
                }
              >
                {r === 1 ? "1×" : `${r}×`}
              </button>
            ))}
          </div>
        </div>
        <div className="relative mt-2">
          <div className="pointer-events-none absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-line" />
          {dur > 180 ? (
            <span
              className="pointer-events-none absolute top-1/2 h-2 w-px -translate-y-1/2 bg-accent"
              style={{ left: `${(180 / dur) * 100}%` }}
              aria-hidden
            />
          ) : null}
          <div
            className={
              "pointer-events-none absolute top-1/2 left-0 h-0.5 -translate-y-1/2 bg-accent " +
              (playing ? "pulse-bar" : "")
            }
            style={{ width: `${progress * 100}%` }}
          />
          <input
            type="range"
            min={0}
            max={dur || 1}
            step={0.1}
            value={Math.min(time, dur || 0)}
            onChange={(e) => seek(Number(e.target.value))}
            className="relative z-10 h-8 w-full accent-accent"
            aria-label="Таймлайн главы"
            disabled={!available}
          />
        </div>
      </div>
    </>
  );
}
