# type & play

Blog and home of the [type & play](https://www.youtube.com/@typeandplay) channel: video and written essays about the games that went through my life. Built with Astro, published by Cloudflare Pages at https://typeandplay.pages.dev.

## Writing a post

1. Create a folder in `src/content/posts/`, named the way the address should read: `src/content/posts/my-post/` becomes `/posts/my-post/`. Lowercase, hyphens, no accents.
2. Write `index.md` inside it and put the images next to it.
3. Commit and push to `main`. Cloudflare Pages builds and publishes the site in a couple of minutes.

Front matter:

```yaml
---
title: O título
description: Uma frase para a lista de textos e para o link compartilhado.
date: 2026-11-27
cover: ./capa.jpg          # optional
coverAlt: O que a imagem mostra   # optional
game: Nome do jogo         # optional, shown as a cartridge label with platform and year
platform: Game Boy Color   # optional
year: 2000                 # optional
draft: true                # optional: shows in `npm run dev` only
---
```

Images: `![description](./photo.jpg)`. Astro resizes them at build time, so originals are fine.

Links to other posts: `[texto](../other-post/)`. Relative links keep working if the site ever moves under a sub-path.

Videos: rename the file to `index.mdx` and write `<YouTube id="VIDEO_ID" />` on its own line.

`src/content/posts/how-to-write/` is a draft with every option in use. It shows in `npm run dev` and never reaches the site.

## Identity

- **Idea:** writing and playing. The serif (Fraunces, italic in "type") is the writing; the pixel face (VT323, in "PLAY") is the game.
- **Colour:** the flat turquoise of a cartridge handheld.
- **Rules:** solid colours; no gradients, shadows or transparency. Thick ink borders (3 to 4 px) do the work of depth, on all four sides.
- **Elements:** the console drawn flat, the save screen, the blinking caret. Posts are "memórias salvas" (save slots).
- No Nintendo names, logos or sounds: the inspiration is the colour and the mood.

| Token | Colour | Use |
| --- | --- | --- |
| `--shell` | `#1fa9b1` | background, console shell |
| `--ink` | `#0e2326` | text, borders |
| `--paper` | `#f6f1e4` | reading pages, highlights |
| `--bezel` | `#3a3e48` | screen bezel |
| `--screen` | `#dfe0cf` | the LCD, quotes |
| `--key` | `#8a817b` | buttons |
| `--led` | `#e5483f` | power light |

Tokens live in `src/tokens.css`. The console is one React component (`src/components/Console.tsx`), used on the site, in the intro and nowhere else redrawn.

## Commands

```sh
npm install
npm run dev        # http://localhost:4321 (drafts included)
npm run build      # type-check and build the static site into dist/
npm run studio     # Remotion Studio, to edit the intro frame by frame
npm run intro      # out/intro-pt.mp4 and out/intro-en.mp4 (1920×1080, 60 fps, with sound)
npm run brand      # channel banners (pt, en) and picture in public/brand/
```

Renders use the installed Google Chrome when there is one (`remotion.config.ts`), because Remotion's own headless Chrome closes on start ("Target closed") on this Mac.

## Layout

```
src/
  content/posts/    posts, one folder each
  content.config.ts post front matter schema
  pages/            routes: /, /posts/, /posts/<slug>/, /rss.xml, /intro/, /brand/, 404
  layouts/Base.astro
  components/       Console, SaveScreen, PostSlots, YouTube embed, intro player
  styles/           site.css, post.css, tools.css (workshop pages)
  video/            Remotion: the intro, fonts, root
  brand/            Remotion stills: YouTube banner and picture
```

## Intro

`src/video/Intro.tsx`, in Portuguese and English (`language` prop; compositions `IntroPt` and `IntroEn`). Timings are in seconds (the `T` object), so changing the frame rate keeps every duration.

- The console rises, the LED lights, the screen turns on.
- "type & PLAY" is typed with Momo's electric typewriter, one key per letter.
- The A button is pressed and the memory is saved, closing on an original 8-bit power-on chime (`public/sounds/power-on.wav`, synthesised).

`/intro/` plays it in the browser with a language switch.

The key sounds are CC0 (Cassie-OrbitGames, OpenGameArt); see `public/sounds/LICENSE-typewriter.txt`.

## Channel art

`src/brand/Banner.tsx` (Portuguese and English, compositions `BannerPt` and `BannerEn`) and `src/brand/Logo.tsx`, rendered as PNGs by Remotion. `/brand/` shows the banners with YouTube's crop areas and the picture in its round crop, with download buttons.

- **Banner:** the screen with the name and the line sits inside the central 1546×423 area, the only part phones show. The cross pad and buttons fill the sides of the middle band (computers). The seam, pill buttons and speaker only show on TVs.
- **Picture:** the console screen with the caret and the play button, well inside the circle.

## Hosting

Cloudflare Pages, connected to this repository (Workers & Pages → the `typeandplay` project). Every push to `main` builds and publishes; other branches get preview URLs.

| Setting | Value |
| --- | --- |
| Framework preset | Astro |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node | from `.node-version` (24) |

`withBase()` in `src/lib/site.ts` prefixes internal links with Astro's `base`, so moving the site under a sub-path only needs `base` in `astro.config.mjs`.
