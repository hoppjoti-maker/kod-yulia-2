/** Soft kit flag after Telegram CTA. First 3 chapters stay open. */
export const KIT_KEY = "kod-yulia-2-kit";
export const FREE_UNTIL = 3;

export const OFFER = {
  freeLabel: "01–03 открыты",
  bundle: "590 ₽",
  bundleHigh: "890 ₽",
  channel: "199 ₽",
  telegram: "https://t.me/neuralbookk",
  yandex: "https://music.yandex.ru/search?text=%D0%9A%D0%BE%D0%B4%20%D0%AE%D0%BB%D1%8F",
  spotify: "https://open.spotify.com/search/%D0%9A%D0%BE%D0%B4%20%D0%AE%D0%BB%D1%8F",
} as const;

export function unlockKit() {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(KIT_KEY, "1");
    window.dispatchEvent(new Event("kod-kit"));
  } catch {
    /* private mode */
  }
}

export function hasKit(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return localStorage.getItem(KIT_KEY) === "1";
  } catch {
    return false;
  }
}

export function isChapterOpen(id: string): boolean {
  const n = Number(id);
  if (!Number.isFinite(n) || n <= FREE_UNTIL) return true;
  return hasKit();
}
