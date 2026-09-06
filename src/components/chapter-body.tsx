import type { Block } from "@/data/chapters";
import { typograph } from "@/lib/typography";
import { cn } from "@/lib/utils";

export function ChapterBody({ paragraphs }: { paragraphs: Block[] }) {
  return (
    <div className="reader-prose mx-auto max-w-[38rem]">
      {paragraphs.map((b, i) => {
        const text = typograph(b.text);
        if (b.kind === "dialog") {
          return (
            <p
              key={i}
              className={cn(
                "my-[0.9em] pl-4 font-body text-[length:var(--reader-size)] leading-[var(--reader-lead)]",
              )}
            >
              {text}
            </p>
          );
        }
        if (b.kind === "log") {
          return (
            <p
              key={i}
              className="my-[1.1em] font-display text-[0.92em] tracking-[0.08em] text-accent uppercase"
            >
              {b.text}
            </p>
          );
        }
        if (b.kind === "said") {
          return (
            <p
              key={i}
              className="my-[1.15em] font-body text-[length:var(--reader-size)] leading-[var(--reader-lead)] italic"
            >
              {text}
            </p>
          );
        }
        return (
          <p
            key={i}
            className="my-[0.95em] font-body text-[length:var(--reader-size)] leading-[var(--reader-lead)] text-pretty"
          >
            {text}
          </p>
        );
      })}
    </div>
  );
}
