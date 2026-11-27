import {
  AbsoluteFill,
  Easing,
  Html5Audio,
  Sequence,
  staticFile,
  interpolate,
  interpolateColors,
  spring,
  useCurrentFrame,
  useVideoConfig
} from "remotion"
import { Console } from "../components/Console"
import "./fonts"
import "./intro.css"

const FPS = 60
const SECONDS = 5.5

export const INTRO = {
  fps: FPS,
  durationInFrames: FPS * SECONDS,
  width: 1920,
  height: 1080
} as const

/** Seconds to frames, so the timing holds whatever the frame rate. */
const at = (seconds: number) => Math.round(seconds * FPS)

/** When each thing happens. */
const T = {
  ledOn: at(0.87),
  lcdFrom: at(0.93),
  lcdTo: at(1.2),
  /** One key per entry: t, y, p, e, &, p, l, a, y. */
  keys: [1.33, 1.43, 1.53, 1.63, 1.83, 2.03, 2.13, 2.23, 2.33].map(at),
  pressA: at(2.73),
  releaseA: at(2.93),
  saveFrom: at(3.07),
  saveTo: at(3.93),
  saved: at(4.07),
  /** Caret blink, on and off. */
  blink: at(0.27)
}

/**
 * Sound: one key of Momo's electric typewriter per letter (CC0, see
 * public/sounds/LICENSE-typewriter.txt), the wide key for the A button, and an
 * original 8-bit power-on chime when the memory is saved.
 */
const KEY_SOUNDS = [1, 2, 3, 4, 5, 6, 7].map(n => `sounds/typewriter${n}.wav`)
const PRESS_SOUND = "sounds/typewriter8.wav"
const CHIME = "sounds/power-on.wav"

function Soundtrack() {
  // staticFile() runs here, not at import, so the browser player can set the site's base first.
  return (
    <>
      {T.keys.map((key, i) => (
        <Sequence key={key} from={key} durationInFrames={at(0.7)} layout="none">
          <Html5Audio src={staticFile(KEY_SOUNDS[i % KEY_SOUNDS.length])} volume={0.85} />
        </Sequence>
      ))}
      <Sequence from={T.pressA} durationInFrames={at(0.7)} layout="none">
        <Html5Audio src={staticFile(PRESS_SOUND)} volume={0.9} />
      </Sequence>
      <Sequence from={T.saved} layout="none">
        <Html5Audio src={staticFile(CHIME)} volume={0.8} />
      </Sequence>
    </>
  )
}

/** The words on the screen, one set per channel language. */
const COPY = {
  pt: { newGame: "Novo jogo", saving: "Salvando memória", saved: "Memória salva." },
  en: { newGame: "New game", saving: "Saving memory", saved: "Memory saved." }
} as const

export type IntroLanguage = keyof typeof COPY
export type IntroProps = { language: IntroLanguage }

const SAVE_BLOCKS = 10
const COLOR = { screen: "#dfe0cf", screenOff: "#8e9283" }

/** The screen, frame by frame: lights up, types the name, saves. */
function Screen({ frame, language }: { frame: number; language: IntroLanguage }) {
  const copy = COPY[language]
  const lit = frame >= T.lcdTo
  const typed = T.keys.filter(key => frame >= key).length
  const lastKey = T.keys[T.keys.length - 1]
  const typing = frame < lastKey + at(0.07)
  const caretOn = typing || Math.floor((frame - lastKey) / T.blink) % 2 === 0
  const saving = frame >= T.saveFrom
  const filled = Math.floor(
    interpolate(frame, [T.saveFrom, T.saveTo], [0, SAVE_BLOCKS], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp"
    })
  )

  if (!lit) return null

  return (
    <div className="intro-screen">
      <p className="intro-hud">
        <span>{copy.newGame}</span>
        <span>01</span>
      </p>

      <p className="intro-word">
        <span className="w-type">{"type".slice(0, Math.min(typed, 4))}</span>
        {typed >= 5 && <span className="w-amp"> &amp; </span>}
        <span className="w-play">{"play".slice(0, Math.max(0, typed - 5))}</span>
        <span className="intro-caret" style={{ visibility: caretOn ? "visible" : "hidden" }} />
      </p>

      <div className="intro-save" style={{ visibility: saving ? "visible" : "hidden" }}>
        <span className="intro-bar">
          {Array.from({ length: SAVE_BLOCKS }, (_, i) => (
            <i key={i} className={i < filled ? "is-full" : undefined} />
          ))}
        </span>
        <span className="intro-label">{frame >= T.saved ? copy.saved : copy.saving}</span>
      </div>
    </div>
  )
}

export function Intro({ language }: IntroProps) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const enter = spring({ frame, fps, config: { damping: 15, mass: 0.9 } })
  const y = interpolate(enter, [0, 1], [1000, 0])
  const tilt = interpolate(enter, [0, 1], [-5, 0])
  const lcd = interpolateColors(frame, [T.lcdFrom, T.lcdTo], [COLOR.screenOff, COLOR.screen])
  const pressed = frame >= T.pressA && frame < T.releaseA ? "a" : null
  // A small kick when the button goes down.
  const kick = interpolate(frame, [T.pressA, T.pressA + at(0.1), T.releaseA + at(0.13)], [0, 6, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad)
  })

  return (
    <AbsoluteFill className="intro-stage">
      <Soundtrack />
      <Console
        className="intro-device"
        ledOn={frame >= T.ledOn}
        screenColor={lcd}
        pressed={pressed}
        style={{ transform: `translateY(${y + kick}px) rotate(${tilt}deg) scale(1.6)` }}
      >
        <Screen frame={frame} language={language} />
      </Console>
    </AbsoluteFill>
  )
}
