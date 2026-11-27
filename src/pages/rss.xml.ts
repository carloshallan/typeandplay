import rss from "@astrojs/rss"
import type { APIContext } from "astro"
import { getPosts, postUrl } from "../lib/posts"
import { SITE } from "../lib/site"

export async function GET(context: APIContext) {
  const posts = (await getPosts()).filter(post => !post.data.draft)
  return rss({
    title: SITE.name,
    description: SITE.description,
    site: context.site!,
    customData: "<language>pt-br</language>",
    items: posts.map(post => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: postUrl(post)
    }))
  })
}
