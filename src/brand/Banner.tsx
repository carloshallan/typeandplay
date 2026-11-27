import { AbsoluteFill } from "remotion"
import "../tokens.css"
import "../video/fonts"
import "./brand.css"

/**
 * YouTube channel banner, 2560×1440. The console's face laid out sideways:
 * the screen in the middle (inside the 1546×423 area every device shows),
 * the cross pad and the buttons to the sides (seen on computers), and the
 * seam and speaker above and below (seen on TVs).
 */
export const BANNER_SIZE = { width: 2560, height: 1440 } as const

/** The words on the screen, one set per channel language. */
const COPY = {
  pt: { file: "Arquivo 01 · Novo jogo", card: "Cartão A", line: "Alguns jogos guardam mais do que o progresso." },
  en: { file: "File 01 · New game", card: "Card A", line: "Some games save more than your progress." }
} as const

export type BannerLanguage = keyof typeof COPY
export type BannerProps = { language: BannerLanguage }

const SPEAKER = Array.from({ length: 36 }, (_, i) => i)

export function Banner({ language }: BannerProps) {
  const copy = COPY[language]

  return (
    <AbsoluteFill className="banner">
      <div className="banner-seam" />

      <svg className="banner-dpad" viewBox="0 0 90 90" aria-hidden="true">
        <path className="cross" d="M32 4h26v28h28v26H58v28H32V58H4V32h28z" />
        <circle className="dimple" cx="45" cy="45" r="6" />
        <path className="arrow" d="M45 13 51 22H39zM45 77 39 68h12zM13 45l9-6v12zM77 45l-9 6V39z" />
      </svg>

      <div className="banner-bezel">
        <p className="banner-power">
          <span className="banner-led" />
          <span>Power</span>
        </p>
        <div className="banner-screen">
          <p className="banner-hud">
            <span>{copy.file}</span>
            <span>{copy.card}</span>
          </p>
          <p className="banner-word">
            <span className="w-type">type</span>
            <span className="w-amp"> &amp; </span>
            <span className="w-play">play</span>
            <span className="banner-caret" />
          </p>
          <p className="banner-line">{copy.line}</p>
        </div>
      </div>

      <span className="banner-btn is-b">B</span>
      <span className="banner-btn is-a">A</span>

      <span className="banner-pills">
        <i />
        <i />
      </span>
      <span className="banner-speaker">
        {SPEAKER.map(hole => (
          <i key={hole} />
        ))}
      </span>
    </AbsoluteFill>
  )
}
