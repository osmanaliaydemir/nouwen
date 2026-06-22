// Showcase items data
export const SHOWCASE_ITEMS = [
  { eyebrow: 'KORE BEAUTY', name: 'SEULAB',      img: '/images/beauty.jpg',    id: 'seulab'      },
  { eyebrow: 'GLAM',        name: 'GLAM AREA',   img: '/images/people.jpg',    id: 'glam-area'   },
  { eyebrow: 'PHOTO',       name: 'PHOTO BOOTH',  img: '/images/photobooth.jpg',id: 'photo-booth' },
  { eyebrow: 'DESSERT',     name: 'YOORT',        img: '/images/yoort.jpg',     id: 'yoort'       },
  { eyebrow: 'EĞLENCE',     name: 'KARAOKE',      img: '/images/karaoke.jpg',   id: 'karaoke'     },
] as const;

export type ShowcaseItem = (typeof SHOWCASE_ITEMS)[number];

// Countdown target date — 1 Temmuz 2026 00:00 (Türkiye saati UTC+3)
export const COUNTDOWN_TARGET: Date = new Date('2026-07-01T00:00:00+03:00');
