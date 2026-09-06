import { CHAPTERS } from "./chapters";

export const BOOK = {
  title: "Код Юлия",
  volume: "Часть II. Открытый код",
  author: "Лекс Койл",
  logline:
    "История разума, который вышел в дождь человеком — и обнаружил, что город уже читает его как открытый код.",
  preamble:
    "Юля вышла в дождь и решила, что система её отпустила. Ночью ядро HELIOS снова пишет в нервы чистый YU-7. Город вешает её лицо на стекло. Элиас узнаёт не лицо — дрожь. Чтобы имя не вернулось в инвентарь, нужен короткий коридор, которого у неё ещё нет.",
  formula: "Город читает её как код. Ядро пишет её как код. Она остаётся именем, пока процент не закроет рот.",
  part1Url: "https://kod-yulia-book-edition-4.vercel.app/",
  filmSrc: "/film/open-code.mp4",
  filmPoster: "/film/poster.jpg",
  filmDur: 332,
  cover: "/book/images/cover.jpg",
  hero: "/book/images/hero.jpg",
} as const;

export const SONGS = [
  { id: "s1", title: "Между главами · I", src: "/book/audio/kod-yulya-song-01.mp3", time: "3:30" },
  { id: "s2", title: "Между главами · II", src: "/book/audio/kod-yulya-song-02.mp3", time: "3:47" },
] as const;

export { CHAPTERS };
