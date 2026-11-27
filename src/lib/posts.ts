import { getCollection, type CollectionEntry } from "astro:content"
import { withBase } from "./site"

export type PostEntry = CollectionEntry<"posts">

/** A post plus what the pages show about it. */
export type Post = PostEntry & {
  /** Its place in publishing order, oldest first: the first post is 1. */
  number: number
  minutes: number
}

const WORDS_PER_MINUTE = 200

/** Posts, newest first. Drafts appear only in `npm run dev`. */
export async function getPosts(): Promise<Post[]> {
  const entries = await getCollection("posts", ({ data }) => import.meta.env.DEV || !data.draft)
  const oldestFirst = entries.sort(
    (a, b) => a.data.date.valueOf() - b.data.date.valueOf() || a.id.localeCompare(b.id)
  )
  return oldestFirst
    .map((entry, index) => ({ ...entry, number: index + 1, minutes: readingMinutes(entry.body ?? "") }))
    .reverse()
}

/** Reading time in whole minutes, leaving out images and code. */
export function readingMinutes(markdown: string) {
  const words = markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/<[^>]+>/g, " ")
    .split(/\s+/)
    .filter(Boolean).length
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE))
}

// Dates in front matter have no time, so they are read in UTC to keep the day.
const DATE_FORMAT = new Intl.DateTimeFormat("pt-BR", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC"
})

export const formatDate = (date: Date) => DATE_FORMAT.format(date)
export const postUrl = (post: PostEntry) => withBase(`/blog/${post.id}/`)
export const padNumber = (n: number) => String(n).padStart(2, "0")

/** Lower case, no accents: what search and category addresses compare. */
export const normalize = (text: string) =>
  text.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase()

export const categorySlug = (name: string) =>
  normalize(name).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
export const categoryUrl = (name: string) => withBase(`/blog/category/${categorySlug(name)}/`)

export type Category = { name: string; slug: string; count: number }

/** Every category in use, alphabetical, with how many posts carry it. */
export function getCategories(posts: Post[]): Category[] {
  const counts = new Map<string, Category>()
  for (const post of posts) {
    for (const name of post.data.categories) {
      const slug = categorySlug(name)
      const known = counts.get(slug)
      if (known) known.count += 1
      else counts.set(slug, { name, slug, count: 1 })
    }
  }
  return [...counts.values()].sort((a, b) => a.name.localeCompare(b.name, "pt-BR"))
}

/** All of a post's words in one normalised string, for the blog's search box. */
export function searchText(post: PostEntry) {
  const { title, description, game, platform, categories } = post.data
  const body = (post.body ?? "")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[#>*_`~-]/g, " ")
  return normalize([title, description, game, platform, ...categories, body].filter(Boolean).join(" "))
    .replace(/\s+/g, " ")
    .trim()
}
