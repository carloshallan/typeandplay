import { SITE } from "../lib/site"
import "./SaveScreen.css"

export type LatestPost = { title: string; href: string }

function EmptySlot({ n, title, meta }: { n: string; title: string; meta: string }) {
  return (
    <li>
      <div className="slot is-empty">
        <span className="slot-n">{n}</span>
        <span className="slot-body">
          <span className="slot-title">{title}</span>
          <span className="slot-meta">{meta}</span>
        </span>
      </div>
    </li>
  )
}

/** The save menu on the console's screen: the channel is slot 01, the newest post slot 02. */
export function SaveScreen({ latest }: { latest?: LatestPost }) {
  return (
    <>
      <p className="save-head">
        <span>Salvar jogo</span>
        <span>Cartão A</span>
      </p>
      <ol className="slots">
        <li>
          <a className="slot is-current" href={SITE.channelUrl} target="_blank" rel="noopener">
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
        {latest ? (
          <li>
            <a className="slot" href={latest.href}>
              <span className="slot-n">02</span>
              <span className="slot-body">
                <span className="slot-title">{latest.title}</span>
                <span className="slot-meta">Texto mais recente</span>
              </span>
              <span className="slot-go" aria-hidden="true">
                ▶
              </span>
            </a>
          </li>
        ) : (
          <EmptySlot n="02" title="Espaço livre" meta="O primeiro texto" />
        )}
        <EmptySlot n="03" title="Espaço livre" meta="O próximo vídeo" />
      </ol>
      <p className="save-foot">Não desligue o console enquanto a memória é gravada.</p>
    </>
  )
}
