# type & play

Site do canal [type & play](https://www.youtube.com/@typeandplay): ensaios em vídeo sobre os jogos que atravessaram a minha vida.

## Identidade

- **Ideia:** escrever e jogar. A serifa (Fraunces, em itálico no "type") é a escrita; a fonte de pixel (VT323, no "PLAY") é o jogo.
- **Cor:** o turquesa de um portátil de cartucho, chapado.
- **Regras:** cores sólidas, sem degradê, sem sombra, sem transparência. Bordas grossas de tinta (3 a 4 px) fazem o papel da profundidade.
- **Elementos:** o console desenhado plano, a tela de salvar jogo, o cursor piscando.
- Nada de nomes, logos ou sons da Nintendo: a inspiração é a cor e o clima.

| Token | Cor | Uso |
| --- | --- | --- |
| `--shell` | `#1fa9b1` | fundo, carcaça |
| `--ink` | `#0e2326` | texto, bordas |
| `--paper` | `#f6f1e4` | destaques |
| `--bezel` | `#3a3e48` | moldura da tela |
| `--screen` | `#dfe0cf` | a tela (LCD) |
| `--key` | `#8a817b` | botões |
| `--led` | `#e5483f` | luz de ligado |

Os tokens ficam em `src/tokens.css`. O console é um componente só (`src/components/Console.tsx`), usado no site e na vinheta.

## Comandos

```sh
npm install
npm run dev        # site em http://localhost:5173, vinheta em /vinheta.html, marca em /marca.html
npm run build      # site estático em dist/
npm run studio     # Remotion Studio, para editar a vinheta quadro a quadro
npm run vinheta    # gera out/vinheta.mp4 (1920×1080, 60 fps, com som)
npm run marca      # gera a capa (2560×1440) e o logo (800×800) em public/marca/
```

Se o `npm run vinheta` (ou `capa`, `logo`) reclamar de "Target closed", use o Chrome do Mac:

```sh
npm run vinheta -- --browser-executable="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
```

## Vinheta

`src/video/Vinheta.tsx`. Os tempos estão em segundos (no objeto `T`), então mudar o fps não muda a duração de nada.

- O console sobe, o LED acende, a tela liga.
- "type & PLAY" é digitado com o som da máquina de escrever elétrica do Momo, uma tecla por letra.
- O botão A é apertado e a memória é salva, com um som de ligar 8-bit original (`public/sounds/ligar.wav`, sintetizado).

Os sons das teclas são CC0 (Cassie-OrbitGames, OpenGameArt); a licença está em `public/sounds/LICENCA-teclas.txt`.

## Marca do canal

`src/brand/Capa.tsx` e `src/brand/Logo.tsx`, gerados como imagens pelo Remotion. A página `/marca.html` mostra a capa com as áreas de corte do YouTube (TV, computador, todos os aparelhos) e o logo no recorte redondo, com botões para baixar.

- **Capa:** a tela com o nome e a frase fica no retângulo central de 1546×423, o único que aparece no celular. Direcional e botões ficam nas laterais da faixa do meio (computador). Emenda, botões de pílula e alto-falante, só na TV.
- **Logo:** a tela do console com o cursor e o play, bem dentro do círculo.
