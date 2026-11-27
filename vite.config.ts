import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { fileURLToPath } from "node:url"

const page = (name: string) => fileURLToPath(new URL(name, import.meta.url))

// Three pages: the home page, the opening sequence and the channel art.
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: page("index.html"),
        vinheta: page("vinheta.html"),
        marca: page("marca.html")
      }
    }
  }
})
