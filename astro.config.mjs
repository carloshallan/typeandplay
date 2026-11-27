import { defineConfig } from "astro/config"
import mdx from "@astrojs/mdx"
import react from "@astrojs/react"
import sitemap from "@astrojs/sitemap"

// Workshop pages (the intro player and the channel art) stay out of the sitemap.
const WORKSHOP = /^\/(intro|brand)\/?$/

export default defineConfig({
  site: "https://typeandplay.github.io",
  devToolbar: { enabled: false },
  integrations: [mdx(), react(), sitemap({ filter: page => !WORKSHOP.test(new URL(page).pathname) })]
})
