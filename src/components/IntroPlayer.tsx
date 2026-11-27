import { useState } from "react"
import { Player } from "@remotion/player"
import { Intro, INTRO, type IntroLanguage } from "../video/Intro"

const LANGUAGES: { id: IntroLanguage; label: string }[] = [
  { id: "pt", label: "Português" },
  { id: "en", label: "English" }
]

/** Plays the opening sequence in the browser, in either language. */
export function IntroPlayer() {
  const [language, setLanguage] = useState<IntroLanguage>("pt")

  return (
    <>
      <div className="tool-switch" role="group" aria-label="Idioma">
        {LANGUAGES.map(option => (
          <button
            key={option.id}
            type="button"
            aria-pressed={language === option.id}
            onClick={() => setLanguage(option.id)}
          >
            {option.label}
          </button>
        ))}
      </div>
      <div className="tool-frame">
        <Player
          component={Intro}
          inputProps={{ language }}
          durationInFrames={INTRO.durationInFrames}
          fps={INTRO.fps}
          compositionWidth={INTRO.width}
          compositionHeight={INTRO.height}
          style={{ width: "100%" }}
          controls
          loop
          autoPlay
          clickToPlay
        />
      </div>
    </>
  )
}
