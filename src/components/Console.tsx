import type { CSSProperties, ReactNode } from "react"
import "../tokens.css"
import "./Console.css"

export interface ConsoleProps {
  /** What the screen shows. */
  children?: ReactNode
  /** Label for assistive technology; the drawing itself is decorative. */
  label?: string
  ledOn?: boolean
  /** The LCD colour, so the opening sequence can light it up. */
  screenColor?: string
  pressed?: "a" | "b" | null
  className?: string
  style?: CSSProperties
}

const SPEAKER_HOLES = Array.from({ length: 30 }, (_, i) => i)

/**
 * The turquoise handheld, drawn flat. Used by the home page (with the save
 * screen inside) and by the opening sequence (animated frame by frame).
 */
export function Console({
  children,
  label,
  ledOn = true,
  screenColor,
  pressed = null,
  className,
  style
}: ConsoleProps) {
  return (
    <div
      className={["device", className].filter(Boolean).join(" ")}
      style={style}
      role={label ? "group" : undefined}
      aria-label={label}
    >
      <div className="bezel">
        <p className="power" aria-hidden="true">
          <span className={ledOn ? "led" : "led is-off"} />
          <span>Power</span>
        </p>
        <div className="screen" style={screenColor ? { background: screenColor } : undefined}>
          {children}
        </div>
        <p className="bezel-brand" aria-hidden="true">
          <span className="w-type">type</span> <span className="w-amp">&amp;</span>{" "}
          <span className="w-play">play</span>
        </p>
      </div>

      <div className="controls" aria-hidden="true">
        <svg className="dpad" viewBox="0 0 90 90">
          <path className="cross" d="M32 4h26v28h28v26H58v28H32V58H4V32h28z" />
          <circle className="dimple" cx="45" cy="45" r="6" />
          <path className="arrow" d="M45 13 51 22H39zM45 77 39 68h12zM13 45l9-6v12zM77 45l-9 6V39z" />
        </svg>
        <span className="ab">
          <span className={`btn is-b${pressed === "b" ? " is-pressed" : ""}`}>B</span>
          <span className={`btn is-a${pressed === "a" ? " is-pressed" : ""}`}>A</span>
        </span>
      </div>

      <div className="lower" aria-hidden="true">
        <span className="pills">
          <i />
          <i />
        </span>
        <span className="speaker">
          {SPEAKER_HOLES.map(hole => (
            <i key={hole} />
          ))}
        </span>
      </div>
    </div>
  )
}
