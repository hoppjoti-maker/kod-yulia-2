const NBSP = "\u00a0";
const SHORT = /(?:^|[\s\u00a0])((?:в|во|к|ко|с|со|у|о|об|от|до|из|за|на|по|и|а|но|не|ни|да|же|бы|ли|я))(\s+)/giu;

/** Display-only: non-breaking spaces after short Russian particles. Source stays verbatim. */
export function typograph(text: string): string {
  return text.replace(SHORT, (full, word: string, space: string) => {
    const prefix = full.slice(0, full.length - word.length - space.length);
    return `${prefix}${word}${NBSP}`;
  });
}
