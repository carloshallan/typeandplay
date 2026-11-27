export const SITE = {
  name: "type & play",
  description:
    "Ensaios em vídeo e em texto sobre os jogos que atravessaram a minha vida: a história de cada um, as lembranças que ficaram presas neles e as pessoas que estavam na sala enquanto eu jogava.",
  channelUrl: "https://www.youtube.com/@typeandplay",
  author: { name: "CHBLACKSMITH", url: "https://chblacksmith.com.br" }
} as const

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "")

/** A path on this site, with the base the site is served under: withBase("/blog/"). */
export const withBase = (path: string) => `${BASE}${path}`

export const SUBSCRIBE_URL = `${SITE.channelUrl}?sub_confirmation=1`
