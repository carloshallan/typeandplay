import { StrictMode, useState } from "react"
import { createRoot } from "react-dom/client"
import "./tokens.css"
import "./marca.css"

const CAPA = "/marca/capa-youtube.png"
const LOGO = "/marca/logo-youtube.png"

/** The channel art, with YouTube's crop areas, ready to download. */
function MarcaPage() {
  const [areas, setAreas] = useState(true)

  return (
    <main className="mk">
      <header className="mk-head">
        <a href="/">← type &amp; play</a>
        <h1>Marca do canal</h1>
      </header>

      <section className="mk-block">
        <div className="mk-title">
          <h2>Capa</h2>
          <span>2560 × 1440 · PNG</span>
        </div>
        <div className="mk-capa">
          <img src={CAPA} alt="Capa do canal type & play" />
          {areas && (
            <>
              <span className="mk-area is-desktop">
                <b>Computador</b>
              </span>
              <span className="mk-area is-all">
                <b>Todos os aparelhos</b>
              </span>
            </>
          )}
        </div>
        <div className="mk-actions">
          <a className="mk-button" href={CAPA} download="type-and-play-capa.png">
            Baixar a capa
          </a>
          <label className="mk-toggle">
            <input type="checkbox" checked={areas} onChange={event => setAreas(event.target.checked)} />
            Mostrar as áreas de corte
          </label>
        </div>
        <p className="mk-note">
          Na TV aparece a imagem inteira. No computador, só a faixa do meio. No celular, só o retângulo
          central, que é onde ficam o nome e a frase.
        </p>
      </section>

      <section className="mk-block">
        <div className="mk-title">
          <h2>Foto do canal</h2>
          <span>800 × 800 · PNG</span>
        </div>
        <div className="mk-logos">
          <img className="mk-square" src={LOGO} alt="Logo do type & play" />
          <div className="mk-sizes">
            <img className="mk-round" src={LOGO} alt="" width={160} height={160} />
            <img className="mk-round" src={LOGO} alt="" width={98} height={98} />
            <img className="mk-round" src={LOGO} alt="" width={40} height={40} />
          </div>
        </div>
        <div className="mk-actions">
          <a className="mk-button" href={LOGO} download="type-and-play-logo.png">
            Baixar o logo
          </a>
        </div>
        <p className="mk-note">O YouTube recorta a foto em círculo; acima, como ela aparece no canal, na busca e nos comentários.</p>
      </section>

      <p className="mk-note">
        Para trocar no canal: YouTube Studio › Personalização › Branding. Para gerar de novo depois de mudar o
        desenho: <code>npm run marca</code>
      </p>
    </main>
  )
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MarcaPage />
  </StrictMode>
)
