export function PercentBar({
  value,
  label,
}: {
  value: number | null;
  label?: string;
}) {
  const shown = value == null ? 0 : Math.max(0, Math.min(100, value));
  const dead = value == null;

  return (
    <div className="w-full">
      <div className="flex items-baseline justify-between gap-3">
        <p className="font-mono text-[11px] tracking-[0.22em] text-muted uppercase">
          {label ?? (dead ? "статус · нет" : "внутреннее я")}
        </p>
        <p className="font-mono text-xs tabular-nums tracking-wide text-accent">
          {dead ? "—" : `${shown.toString().padStart(2, "0")}%`}
        </p>
      </div>
      <div className="mt-1.5 h-px w-full bg-line">
        <div
          className={"h-px " + (dead ? "bg-line" : "bg-accent")}
          style={{ width: dead ? "0%" : `${shown}%` }}
        />
      </div>
    </div>
  );
}
