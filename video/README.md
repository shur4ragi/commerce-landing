# Vídeo de apresentação — Aurora Café

`aurora-cafe-apresentacao.mp4` — 1920×1080, 30 fps, 77 s, H.264 + AAC. Feito para mostrar ao cliente a landing page do Aurora Café.

## Roteiro

| Tempo | Cena | O que o cliente vê |
|---|---|---|
| 0:00 | Abertura | Logo animado (o sol nasce sobre a xícara), "Aurora Café · Vila Madalena", *Seu novo site chegou.* |
| 0:05 | Conceito | Tipografia animada do headline do site: *O dia começa quando o café encontra a luz.* |
| 0:10 | 01 · Primeira impressão | Navegador com a abertura real do site: loader e carrossel orbital |
| 0:21 | 02 · Sua história / 03 · Do grão à xícara | Rolagem real pelo hero, manifesto "Feito sem pressa" e processo |
| 0:32 | 04 · Cardápio que vende | Pedido real: Cappuccino → leite vegetal → 2 unidades → carrinho → dados de entrega → Pix |
| 0:45 | 05 · O pedido chega pronto | A mensagem que chega no WhatsApp da casa (mesmo texto que o site gera) |
| 0:50 | 06 · Perfeito no celular | Versão mobile real dentro de um smartphone |
| 0:61 | Tudo incluso | Reservas, cardápio com pedidos, mapa e horários, galeria, depoimentos, SEO |
| 0:69 | Encerramento | *Do grão, à xícara, à tela.* |

As telas são gravações reais do site (`npm run build` + `vite preview`), sem mockups estáticos. A trilha é original, gerada em `music.py` (lo-fi a 90 BPM, com os cortes no tempo dos compassos).

## Como regenerar

```bash
bash video/src/build.sh
```

Requisitos: Node 22, Chromium do Playwright, Python 3 (`numpy`, `scipy`, `pillow`) e `ffmpeg`.

- `rec.mjs` grava o site via screencast do Chromium, com o tempo da página desacelerado 4× (JS e animações CSS), o que dá cerca de 60 fps efetivos.
- `rec_*.mjs` são os roteiros de cada captura. As posições de rolagem de `rec_scroll.mjs` e `rec_mobile.mjs` seguem o layout atual e precisam de ajuste se as seções mudarem de altura.
- `comp.html` é a composição: cada quadro é renderizado por `render(t)`, de forma determinística. `render.mjs` captura os quadros e gera o vídeo com o ffmpeg.
- Para outro cliente, troque os textos de `comp.html` (títulos, mensagem do WhatsApp, URL) e as imagens em `img/`.
