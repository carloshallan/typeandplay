# AGENTS.md

Rules for anyone (person or agent) working in this repository. The README explains how the project works; this file is what must always be followed.

## Post covers: always 1600×700

- **Every post cover is 1600×700 px** (16:7), saved as `cover.jpg` (paintings, photos) or `cover.png` (flat art) next to the post's `index.md` and set in front matter as `cover: ./cover.jpg`, with `coverAlt` describing it.
- On the post page the cover **opens the page**, the full width of the window, edge to edge, and the head (title, subtitle, byline, tags) sits over its lower part on a paper card. In the blog list it shows as a 16:7 thumbnail. Its height is capped (`min(74vh, 700px)`), so wide screens trim the top and bottom, and the title card covers roughly the lowest third in the middle: keep the subject in the upper middle (roughly y 80 to 420) and nothing important within 40 px of the sides.
- Covers are free of the site's flat identity: a painting, a cinematic illustration or a photo is welcome. A vector cover keeps its editable source beside it (`cover.svg`) and is rendered to 1600×700 with `sharp`. Generated covers come from the Codex CLI (a `BRIEF.md` and `codex exec` with image generation), are cropped to 16:7 and saved as JPEG at quality 90.
- No text, logos, trademarks, recognisable game characters or close-up faces in a cover.

## Writing

- Posts are the author's own essays, signed **CHBLACKSMITH** (linked to chblacksmith.com.br, set in `SITE.author`).
- When the author asks for a post, write it **complete and ready to read**, not an outline: the author edits it afterwards. Build it on what the author told you; anything you had to imagine about their life (a scene, a feeling, who was in the room) goes in the list you hand back with the draft, so they can confirm or replace it.
- Every post has `categories` (a short list, in Portuguese). Reuse existing names before making new ones; each becomes /blog/category/<slug>/.
- New posts start with `draft: true` (shown in `npm run dev` only). The author removes it to publish.
- Facts about games and consoles carry their sources at the end of the draft.
- Reader-facing copy is Portuguese (pt-BR).

## Code

- **All code is in English**: identifiers, file and folder names, comments, CSS classes, npm scripts, Remotion composition ids, asset names. Only text a reader sees stays in Portuguese.
- Internal links go through `withBase()` (`src/lib/site.ts`); never hard-code a root-relative path.
- Check with `npm run build` (runs `astro check` first) before committing.

## Commits

- **Never add `Co-Authored-By`, "Generated with" or any other attribution trailer** to commits or PRs.
- Conventional prefixes: `feat:`, `fix:`, `style:`, `docs:`, `chore:`. Subject in English, imperative, lower case.
- Pushing `main` publishes the site (Cloudflare Pages), so only push what is meant to go live.

## Identity

- Solid colours; no gradients, shadows or transparency. Thick ink borders (3 to 4 px). Cards and boxes take their border on all four sides, never a single coloured edge.
- Two typefaces: Fraunces (serif, the writing) and VT323 (pixel, the game). Page titles (`h1`) wear the logo's "type": Fraunces italic, weight 420.
- The blog pages and every post card use Momo's E-ink reading colours (`--reader-*` in `src/tokens.css`); the footer stays turquoise.
- No header bar: the logo and links are floating pills in the top-right corner (like momoparaescritores.com.br), tucked away while scrolling down and back on scrolling up, so the text starts at the top of the window. A page can put its own lead on the left of that row through Base's `header-lead` slot; the blog uses it for its title and search (`BlogHeaderLead.astro`).
- Moving between pages, a curtain of ink pixel blocks sweeps left to right, covering and then uncovering (`PageCurtain.astro`). Animations always respect reduced motion.
- In post text, `##` headings carry the turquoise menu cursor, `###` headings are ink labels, `####` headings get the red power-light square.
- No Nintendo (or other console maker's) names, logos or sounds in the brand: the channel art, logo, intro and site chrome. Writing about games inside posts is fine.

## The book page (`/livro`)

- The 3D book is `src/scripts/book3d.js` (three.js), modelled on chblacksmith-site's Book3D. The same file is copied into the print cover's source in Dropbox (`C.H. Blacksmith/type & play/print/cover-source/`), which has a "Ver em 3D" button; change both together.
- `public/book/front.jpg`, `spine.jpg` and `back.jpg` are cut from that print cover, already trimmed to the finished book (103 × 138 mm, spine 16.5 mm), 1400 px tall. When the cover changes, cut them again.
