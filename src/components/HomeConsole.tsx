import { Console } from "./Console"
import { SaveScreen, type LatestPost } from "./SaveScreen"

/** The console on the home page, showing the save menu. Rendered to static HTML. */
export function HomeConsole({ latest }: { latest?: LatestPost }) {
  return (
    <Console className="home-device" label="Tela de salvar jogo">
      <SaveScreen latest={latest} />
    </Console>
  )
}
