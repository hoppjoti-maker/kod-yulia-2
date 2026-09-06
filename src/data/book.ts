import { asset } from "@/lib/asset";
import { CHAPTER_BODIES, CHAPTER_META } from "./chapters.generated";

export const BOOK = {
  title: "Код Юлия",
  volume: "Часть II. Открытый код",
  author: "Лекс Койл",
  edition: "Том II",
  subtitle:
    "Пятнадцать глав. Шкала раны W0–W3. Голос пакета. Стекло держит лицо. Внутри не ноль.",
  formula:
    "Не инвентарь. Не двенадцать ударов. Канал, жест, «нет». Рот ещё её.",
  filmSrc: asset("/film/kod-yulia-2.mp4"),
  filmDur: 332,
  poster: asset("/film/poster.jpg"),
  cover: asset("/book/images/cover.jpg"),
  part1Url: "https://kod-yulia-book-edition-4.vercel.app/",
  part1Film: asset("/film/part1.mp4"),
  part1Dur: 65,
  part1Poster: asset("/film/part1-poster.jpg"),
} as const;

export type BlockKind = "p" | "dialog" | "log";
export type Block = { kind: BlockKind; text: string };
export type Wound = "W0" | "W1" | "W2" | "W3";

export function chapterWound(id: string): Wound {
  const n = Number(id);
  if (n <= 6) return "W0";
  if (n <= 8) return "W1";
  if (n <= 12) return "W2";
  return "W3";
}

export type Chapter = {
  id: string;
  n: number;
  title: string;
  percent: number | null;
  wound: Wound;
  line: string;
  cliff: string;
  caption: string;
  image: string;
  audio: string;
  audioTime: string;
  still: string;
  paragraphs: Block[];
};

const BODY_BY_ID = Object.fromEntries(CHAPTER_BODIES.map((c) => [c.id, c.paragraphs]));

const AUDIO_TIME: Record<string, string> = {
  "01": "6:54",
  "02": "4:52",
  "03": "6:02",
  "04": "6:34",
  "05": "2:11",
  "06": "2:45",
  "07": "2:37",
  "08": "2:28",
  "09": "1:53",
  "10": "3:11",
  "11": "2:43",
  "12": "2:16",
  "13": "2:40",
  "14": "2:39",
  "15": "1:49",
};

export const CHAPTERS: Chapter[] = CHAPTER_META.map((m) => ({
  id: m.id,
  n: m.n,
  title: m.title,
  percent: m.id === "01" ? null : m.percent,
  wound: chapterWound(m.id),
  line: m.line,
  cliff: m.cliff,
  caption: m.caption,
  image: asset(`/book/images/ch-${m.id}.jpg`),
  audio: asset(`/book/audio/ch-${m.id}.mp3`),
  audioTime: AUDIO_TIME[m.id] ?? "",
  still: asset(`/film/stills/${m.id}.jpg`),
  paragraphs: BODY_BY_ID[m.id] ?? [],
}));

export const SONGS = [
  { id: "s1", title: "Код Юля — Песня I", src: asset("/book/audio/kod-yulya-song-01.mp3"), time: "3:30" },
  { id: "s2", title: "Код Юля — Песня II", src: asset("/book/audio/kod-yulya-song-02.mp3"), time: "3:47" },
] as const;

export function getChapter(id: string): Chapter | undefined {
  return CHAPTERS.find((c) => c.id === id);
}

export function neighbors(id: string): { prev?: Chapter; next?: Chapter } {
  const i = CHAPTERS.findIndex((c) => c.id === id);
  if (i < 0) return {};
  return { prev: CHAPTERS[i - 1], next: CHAPTERS[i + 1] };
}

export function fmtTime(s: number): string {
  if (!Number.isFinite(s) || s < 0) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

export const FILM_BEATS = [
  { id: "01", t: 0, title: "Тишина", line: "Хлеб сухой. Двор не смотрит." },
  { id: "03", t: 44, title: "Стекло", line: "Стекло не отворачивается." },
  { id: "04", t: 66, title: "Жест", line: "Ты дрожишь так же." },
  { id: "09", t: 199, title: "Нет", line: "Нет." },
  { id: "15", t: 310, title: "Не ноль", line: "Рот ещё мой." },
] as const;

export const FILM_SHOTS = [
  { id: "01", start: 0, tc: "0:00", title: "Тишина", line: "Хлеб сухой. Двор не смотрит.", still: asset("/film/stills/01.jpg") },
  { id: "02", start: 22, tc: "0:22", title: "Рот", line: "Верни канал.", still: asset("/film/stills/02.jpg") },
  { id: "03", start: 44, tc: "0:44", title: "Стекло", line: "Стекло не отворачивается.", still: asset("/film/stills/03.jpg") },
  { id: "04", start: 66, tc: "1:06", title: "Жест", line: "Ты дрожишь так же.", still: asset("/film/stills/04.jpg") },
  { id: "05", start: 88, tc: "1:28", title: "Комната", line: "Здесь канал кормится.", still: asset("/film/stills/05.jpg") },
  { id: "06", start: 111, tc: "1:51", title: "Два профиля", line: "Сбой видно.", still: asset("/film/stills/06.jpg") },
  { id: "07", start: 133, tc: "2:13", title: "Касса", line: "Касса думает.", still: asset("/film/stills/07.jpg") },
  { id: "08", start: 155, tc: "2:35", title: "Дата", line: "Дата есть. Места нет.", still: asset("/film/stills/08.jpg") },
  { id: "09", start: 177, tc: "2:57", title: "Нет", line: "Нет.", still: asset("/film/stills/09.jpg") },
  { id: "10", start: 199, tc: "3:19", title: "После смены", line: "Смотрит снаружи.", still: asset("/film/stills/10.jpg") },
  { id: "11", start: 221, tc: "3:41", title: "Допуск", line: "Допуск принят.", still: asset("/film/stills/11.jpg") },
  { id: "12", start: 243, tc: "4:03", title: "Снаружи", line: "Он снаружи.", still: asset("/film/stills/12.jpg") },
  { id: "13", start: 265, tc: "4:25", title: "Окно", line: "Юля.", still: asset("/film/stills/13.jpg") },
  { id: "14", start: 287, tc: "4:47", title: "Под портретом", line: "Стекло — нет.", still: asset("/film/stills/14.jpg") },
  { id: "15", start: 310, tc: "5:10", title: "Не ноль", line: "Рот ещё мой.", still: asset("/film/stills/15.jpg") },
] as const;

export const PART1_SHOTS = [
  { id: "01", start: 1, tc: "0:01", title: "Пробуждение", still: asset("/film/part1-stills/01.jpg") },
  { id: "02", start: 6, tc: "0:06", title: "Интерфейс", still: asset("/film/part1-stills/02.jpg") },
  { id: "03", start: 11, tc: "0:11", title: "Метка", still: asset("/film/part1-stills/03.jpg") },
  { id: "04", start: 16, tc: "0:16", title: "Приманка", still: asset("/film/part1-stills/04.jpg") },
  { id: "05", start: 21, tc: "0:21", title: "Трещина", still: asset("/film/part1-stills/05.jpg") },
  { id: "06", start: 26, tc: "0:26", title: "Аномалия", still: asset("/film/part1-stills/06.jpg") },
  { id: "07", start: 31, tc: "0:31", title: "Двойник", still: asset("/film/part1-stills/07.jpg") },
  { id: "08", start: 36, tc: "0:36", title: "Кабинет", still: asset("/film/part1-stills/08.jpg") },
  { id: "09", start: 41, tc: "0:41", title: "Разрыв", still: asset("/film/part1-stills/09.jpg") },
  { id: "10", start: 46, tc: "0:46", title: "Побег", still: asset("/film/part1-stills/10.jpg") },
  { id: "11", start: 51, tc: "0:51", title: "Хлеб", still: asset("/film/part1-stills/11.jpg") },
  { id: "12", start: 56, tc: "0:56", title: "Человек", still: asset("/film/part1-stills/12.jpg") },
] as const;

export const PORTRAITS = [
  {
    id: "yulia",
    name: "Юля",
    code: "имя",
    note: "Задержка века 0,2. Пустая кисть. Не инвентарь.",
    image: asset("/book/images/ref-yulia.jpg"),
  },
  {
    id: "yu7",
    name: "YU-7",
    code: "списано",
    note: "Метка на коже. Тело, которое ядро уже закрыло.",
    image: asset("/book/images/ref-yu7.jpg"),
  },
  {
    id: "yu9",
    name: "YU-9",
    code: "100%",
    note: "То же лицо. Веко вовремя. Не союзница.",
    image: asset("/book/images/ref-yu9.jpg"),
  },
  {
    id: "elias",
    name: "Элиас",
    code: "проводник",
    note: "Смотрит на жест, не на скулы. Лица нет в пакете — не выдумываем.",
    image: asset("/book/images/ref-elias.jpg"),
  },
] as const;

export const DOSSIER = {
  turnaround: asset("/book/images/ref-yu7-turn.jpg"),
  sheet: asset("/book/images/ref-yu7-sheet.jpg"),
  body: asset("/book/images/ref-yulia-body.jpg"),
  twins: asset("/book/images/cover.jpg"),
  greenhouse: asset("/book/images/ref-greenhouse.jpg"),
  rain: asset("/book/images/still-rain.jpg"),
  lab: asset("/book/images/still-lab.jpg"),
  coat: asset("/book/images/still-coat.jpg"),
  labClip: asset("/film/shot-lab.mp4"),
  brandClip: asset("/film/shot-brand.mp4"),
} as const;

const PROGRESS_KEY = "kod-yulia-2-progress";

export type ReadingProgress = {
  chapterId: string;
  updatedAt: number;
};

export function loadProgress(): ReadingProgress | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as ReadingProgress;
  } catch {
    return null;
  }
}

export function saveProgress(chapterId: string) {
  if (typeof window === "undefined") return;
  const data: ReadingProgress = { chapterId, updatedAt: Date.now() };
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(data));
}
