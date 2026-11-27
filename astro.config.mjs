import { defineConfig } from "astro/config"
import mdx from "@astrojs/mdx"
import react from "@astrojs/react"
import sitemap from "@astrojs/sitemap"

// Workshop pages (the intro player and the channel art) stay out of the sitemap.
const WORKSHOP = /\/(intro|brand)\/?$/

export default defineConfig({
  // Served as a project page of the personal GitHub account, under /typeandplay/.
  site: "https://carloshallan.github.io",
  base: "/typeandplay",
  devToolbar: { enabled: false },
  integrations: [mdx(), react(), sitemap({ filter: page => !WORKSHOP.test(new URL(page).pathname) })]
})
