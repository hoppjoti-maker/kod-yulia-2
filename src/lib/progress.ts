const PREFS_KEY = "kod-yulia-2-prefs";
const READ_KEY = "kod-yulia-2-reader";

export type Theme = "dark" | "light";
export type FontSize = "sm" | "md" | "lg" | "xl";

export type Prefs = {
  theme: Theme;
  font: FontSize;
};

export type ReadingProgress = {
  chapterId: string;
  scroll: number;
  updatedAt: number;
};

const DEFAULT_PREFS: Prefs = { theme: "dark", font: "md" };

function readJson<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export function loadPrefs(): Prefs {
  return { ...DEFAULT_PREFS, ...(readJson<Partial<Prefs>>(PREFS_KEY) ?? {}) };
}

export function savePrefs(prefs: Prefs) {
  if (typeof window === "undefined") return;
  localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
  document.documentElement.setAttribute("data-theme", prefs.theme);
  document.documentElement.setAttribute("data-font", prefs.font);
}

export function applyPrefs(prefs: Prefs) {
  if (typeof document === "undefined") return;
  document.documentElement.setAttribute("data-theme", prefs.theme);
  document.documentElement.setAttribute("data-font", prefs.font);
}

export function loadProgress(): ReadingProgress | null {
  return readJson<ReadingProgress>(READ_KEY);
}

export function saveProgress(chapterId: string, scroll: number) {
  if (typeof window === "undefined") return;
  const data: ReadingProgress = { chapterId, scroll, updatedAt: Date.now() };
  localStorage.setItem(READ_KEY, JSON.stringify(data));
}
