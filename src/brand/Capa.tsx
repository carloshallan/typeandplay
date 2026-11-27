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
export const CAPA = { id: "Capa", width: 2560, height: 1440 } as const

const SPEAKER = Array.from({ length: 36 }, (_, i) => i)

export function Capa() {
  return (
    <AbsoluteFill className="capa">
      <div className="capa-seam" />

      <svg className="capa-dpad" viewBox="0 0 90 90" aria-hidden="true">
        <path className="cross" d="M32 4h26v28h28v26H58v28H32V58H4V32h28z" />
        <circle className="dimple" cx="45" cy="45" r="6" />
        <path className="arrow" d="M45 13 51 22H39zM45 77 39 68h12zM13 45l9-6v12zM77 45l-9 6V39z" />
      </svg>

      <div className="capa-bezel">
        <p className="capa-power">
          <span className="capa-led" />
          <span>Power</span>
        </p>
        <div className="capa-screen">
          <p className="capa-hud">
            <span>Arquivo 01 · Novo jogo</span>
            <span>Cartão A</span>
          </p>
          <p className="capa-word">
            <span className="w-type">type</span>
            <span className="w-amp"> &amp; </span>
            <span className="w-play">play</span>
            <span className="capa-caret" />
          </p>
          <p className="capa-line">Alguns jogos guardam mais do que o progresso.</p>
        </div>
      </div>

      <span className="capa-btn is-b">B</span>
      <span className="capa-btn is-a">A</span>

      <span className="capa-pills">
        <i />
        <i />
      </span>
      <span className="capa-speaker">
        {SPEAKER.map(hole => (
          <i key={hole} />
        ))}
      </span>
    </AbsoluteFill>
  )
}
