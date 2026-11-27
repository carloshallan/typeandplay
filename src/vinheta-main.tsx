import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { Player } from "@remotion/player"
import { Vinheta, VINHETA } from "./video/Vinheta"
import "./tokens.css"
import "./vinheta-page.css"

/** A page to watch and scrub the opening sequence; `npm run vinheta` renders the MP4. */
function VinhetaPage() {
  return (
    <main className="vp">
      <header className="vp-head">
        <a href="/">← type &amp; play</a>
        <h1>Vinheta</h1>
      </header>
      <div className="vp-frame">
        <Player
          component={Vinheta}
          durationInFrames={VINHETA.durationInFrames}
          fps={VINHETA.fps}
          compositionWidth={VINHETA.width}
          compositionHeight={VINHETA.height}
          style={{ width: "100%" }}
          controls
          loop
          autoPlay
          clickToPlay
        />
      </div>
      <p className="vp-note">
        {VINHETA.durationInFrames / VINHETA.fps} segundos, {VINHETA.width}×{VINHETA.height}, {VINHETA.fps} quadros
        por segundo. Para gerar o MP4: <code>npm run vinheta</code>
      </p>
    </main>
  )
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <VinhetaPage />
  </StrictMode>
)
