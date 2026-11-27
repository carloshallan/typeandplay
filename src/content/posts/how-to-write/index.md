---
title: Como escrever um texto
description: Um modelo para copiar. Ele só aparece no npm run dev, porque está marcado como rascunho.
date: 2026-11-27
cover: ./console.png
coverAlt: A tela do console do type & play, com um cursor de texto e um botão de play.
game: Nome do jogo
platform: Console
year: 2000
draft: true
---

Cada texto mora numa pasta dentro de `src/content/posts/`. O nome da pasta vira o endereço: esta pasta se chama `how-to-write`, então o texto abre em `/posts/how-to-write/`. Use letras minúsculas e hífens no nome da pasta, sem acentos.

## O cabeçalho

Entre os dois `---` do começo do arquivo ficam os dados do texto:

- `title`: o título.
- `description`: uma frase que aparece na lista de textos e quando alguém compartilha o link.
- `date`: a data, no formato ano-mês-dia.
- `cover` e `coverAlt`: a imagem de capa e a descrição dela, para quem usa leitor de tela. As duas são opcionais.
- `game`, `platform` e `year`: o jogo de que o texto fala. Aparecem juntos numa etiqueta de cartucho. Opcionais.
- `draft: true`: guarda o texto como rascunho. Ele aparece no `npm run dev`, mas não vai para o site. Apague a linha quando for publicar.

## Imagens

Coloque a imagem na mesma pasta do texto e chame assim:

![A tela do console do type & play](./console.png)

O site gera versões menores sozinho, então pode usar a foto original.

## Citações e pausas

> Uma citação aparece dentro de uma tela, como esta.

Uma linha só com três hífens separa partes do texto:

---

**Negrito** e *itálico* funcionam como em qualquer Markdown.

## Vídeos do canal

Para pôr um vídeo do YouTube no meio do texto, troque a extensão do arquivo de `.md` para `.mdx` e escreva `<YouTube id="código-do-vídeo" />` numa linha. O código é o que vem depois de `watch?v=` no link do vídeo.

## Publicar

Salve, faça commit e push para a branch `main`. O GitHub monta o site e publica em uns dois minutos.
