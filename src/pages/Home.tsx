import { Console } from "../components/Console"
import { CHANNEL_URL, SaveScreen } from "../components/SaveScreen"
import "./home.css"

export function Home() {
  return (
    <>
      <header className="top">
        <a className="brand" href="./" aria-label="type & play, início">
          <img src="/logo.svg" alt="" width={36} height={36} />
          <span className="wordmark">
            <span className="w-type">type</span> <span className="w-amp">&amp;</span>{" "}
            <span className="w-play">play</span>
          </span>
        </a>
        <a className="top-link" href={CHANNEL_URL} target="_blank" rel="noopener">
          YouTube <span aria-hidden="true">↗</span>
        </a>
      </header>

      <main className="stage">
        <section className="intro">
          <p className="hud">Arquivo 01 · Novo jogo</p>
          <h1>
            Alguns jogos <em>guardam</em> mais do que o progresso.
            <span className="caret" aria-hidden="true" />
          </h1>
          <p className="lede">
            Ensaios em vídeo sobre os jogos que atravessaram a minha vida: a história de cada um, as
            lembranças que ficaram presas neles e as pessoas que estavam na sala enquanto eu jogava.
          </p>
          <div className="actions">
            <a className="button" href={CHANNEL_URL} target="_blank" rel="noopener">
              <span className="play" aria-hidden="true">
                ▶
              </span>{" "}
              Assistir no YouTube
            </a>
            <a className="quiet" href={`${CHANNEL_URL}?sub_confirmation=1`} target="_blank" rel="noopener">
              Inscrever-se no canal
            </a>
          </div>
        </section>

        <Console className="home-device" label="Tela de salvar jogo">
          <SaveScreen />
        </Console>
      </main>

      <footer className="bottom">
        <span>© 2026 type &amp; play</span>
        <span>Feito com palavras e controles.</span>
      </footer>
    </>
  )
}
