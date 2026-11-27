import "./SaveScreen.css"

export const CHANNEL_URL = "https://www.youtube.com/@typeandplay"

/** The save menu on the console's screen: the channel is slot 01. */
export function SaveScreen() {
  return (
    <>
      <p className="save-head">
        <span>Salvar jogo</span>
        <span>Cartão A</span>
      </p>
      <ol className="slots">
        <li>
          <a className="slot is-current" href={CHANNEL_URL} target="_blank" rel="noopener">
            <span className="slot-n">01</span>
            <span className="slot-body">
              <span className="slot-title">type &amp; play</span>
              <span className="slot-meta">Tempo de jogo: uma vida</span>
            </span>
            <span className="slot-go" aria-hidden="true">
              ▶
            </span>
          </a>
        </li>
        <li>
          <div className="slot is-empty">
            <span className="slot-n">02</span>
            <span className="slot-body">
              <span className="slot-title">Espaço livre</span>
              <span className="slot-meta">O próximo vídeo</span>
            </span>
          </div>
        </li>
        <li>
          <div className="slot is-empty">
            <span className="slot-n">03</span>
            <span className="slot-body">
              <span className="slot-title">Espaço livre</span>
              <span className="slot-meta">Ainda não jogado</span>
            </span>
          </div>
        </li>
      </ol>
      <p className="save-foot">Não desligue o console enquanto a memória é gravada.</p>
    </>
  )
}
