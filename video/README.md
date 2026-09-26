# Vídeo de apresentação — Aurora Café

Duas versões com a mesma montagem de 39 s (30 fps, H.264 + AAC), feitas para mostrar ao cliente a landing page do Aurora Café:

- `aurora-cafe-apresentacao-16x9.mp4`: 1920×1080, para computador, TV e YouTube.
- `aurora-cafe-apresentacao-9x16.mp4`: 1080×1920, para celular (Stories, Reels, Status do WhatsApp).

## Roteiro

| Tempo | Cena | O que o cliente vê |
|---|---|---|
| 0:00 | Abertura | Logo animado (o sol nasce sobre a xícara), "Aurora Café · Vila Madalena", *Seu novo site chegou.* |
| 0:04 | Conceito | Tipografia animada do headline do site: *O dia começa quando o café encontra a luz.* |
| 0:07 | 01 · Primeira impressão | Navegador com a abertura real do site: loader e carrossel orbital |
| 0:12 | 02 · Sua história, do grão à xícara | Rolagem real pelo hero, manifesto "Feito sem pressa" e processo |
| 0:18 | 04 · Cardápio que vende | Pedido real: Cappuccino → leite vegetal → 2 unidades → carrinho → formulário preenchido |
| 0:25 | 05 · O pedido chega pronto | A mensagem que chega no WhatsApp da casa (mesmo texto que o site gera) |
| 0:28 | 06 · Perfeito no celular | Versão mobile real dentro de um smartphone |
| 0:34 | Encerramento | *Do grão, à xícara, à tela.* |

As telas são gravações reais do site (`npm run build` + `vite preview`), sem mockups estáticos. A trilha é original, gerada em `music.py` (lo-fi a 90 BPM, com os cortes caindo nas batidas).

## Como regenerar

```bash
bash video/src/build.sh
```

Requisitos: Node 22, Chromium do Playwright, Python 3 (`numpy`, `scipy`, `pillow`) e `ffmpeg`.

- `rec.mjs` grava o site via screencast do Chromium, com o tempo da página desacelerado 4× (JS e animações CSS), o que dá cerca de 60 fps efetivos.
- `rec_*.mjs` são os roteiros de cada captura. As posições de rolagem de `rec_scroll.mjs` e `rec_mobile.mjs` seguem o layout atual e precisam de ajuste se as seções mudarem de altura.
- `comp.html` é a composição: cada quadro é renderizado por `render(t)`, de forma determinística. A tabela `WARP` condensa a montagem original de 77 s nos 39 s atuais. `comp.html#v` ativa o layout vertical. `render.mjs` captura os quadros (com `VERTICAL=1` para 9:16) e gera o vídeo com o ffmpeg.
- Para outro cliente, troque os textos de `comp.html` (títulos, mensagem do WhatsApp, URL) e as imagens em `img/`.
