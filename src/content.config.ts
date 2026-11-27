import { defineCollection } from "astro:content"
import { glob } from "astro/loaders"
import { z } from "astro/zod"

/**
 * One post per folder (`src/content/posts/my-post/index.md`, with its images
 * beside it) or per file (`src/content/posts/my-post.md`). Both become
 * /blog/my-post/. Files and folders starting with "_" are ignored.
 */
const posts = defineCollection({
  loader: glob({
    base: "./src/content/posts",
    pattern: "**/[^_]*.{md,mdx}",
    generateId: ({ entry, data }) =>
      typeof data.slug === "string" ? data.slug : entry.replace(/(\/index)?\.mdx?$/, "")
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().optional(),
      date: z.coerce.date(),
      cover: image().optional(),
      coverAlt: z.string().optional(),
      game: z.string().optional(),
      platform: z.string().optional(),
      year: z.coerce.string().optional(),
      draft: z.boolean().default(false)
    })
})

export const collections = { posts }
