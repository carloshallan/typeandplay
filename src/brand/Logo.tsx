import { AbsoluteFill } from "remotion"
import "../tokens.css"
import "../video/fonts"
import "./brand.css"

/**
 * Channel picture, 800×800. YouTube crops it to a circle, so everything sits
 * well inside it: the console's screen with the mark (a text cursor and a
 * play button) and the power light.
 */
export const LOGO = { id: "Logo", width: 800, height: 800 } as const

export function Logo() {
  return (
    <AbsoluteFill className="logo">
      <div className="logo-bezel">
        <span className="logo-led" />
        <div className="logo-screen">
          <svg viewBox="0 0 64 64" className="logo-mark" aria-hidden="true">
            <path d="M15 16h10M20 16v32M15 48h10" className="logo-cursor" />
            <path d="M29 18.5 49.5 32 29 45.5z" className="logo-play" />
          </svg>
        </div>
      </div>
    </AbsoluteFill>
  )
}
