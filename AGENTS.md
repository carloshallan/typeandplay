# AGENTS.md

Rules for anyone (person or agent) working in this repository. The README explains how the project works; this file is what must always be followed.

## Post covers: always 1600×700

- **Every post cover is 1600×700 px** (16:7), saved as `cover.png` (or `.jpg`) next to the post's `index.md` and set in front matter as `cover: ./cover.png`, with `coverAlt` describing it.
- On the post page the cover runs the **full width of the window**, edge to edge, between the post's head and its text. In the blog list it shows as a 16:7 thumbnail. Because the frame is always 16:7, nothing is cropped: keep the subject anywhere, but keep text and small details away from the outer 40 px.
- An illustration made for a cover keeps its editable source beside it (`cover.svg`), and the PNG is rendered from it at 1600×700 (`sharp` is already installed with Astro).
- Covers follow the identity below: flat 2D, solid colours, ink outlines. They do not have to be turquoise.

## Writing

- Posts are the author's own essays. **Never invent the author's memories, people or feelings.** When drafting, use only what the author said; mark everything else as a question for the author.
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
- Two typefaces: Fraunces (serif, the writing) and VT323 (pixel, the game).
- The blog pages use Momo's E-ink reading colours (`--reader-*` in `src/tokens.css`); the header and footer stay turquoise.
- In post text, `##` headings carry the turquoise menu cursor, `###` headings are ink labels, `####` headings get the red power-light square.
- No Nintendo (or other console maker's) names, logos or sounds in the brand: the channel art, logo, intro and site chrome. Writing about games inside posts is fine.
