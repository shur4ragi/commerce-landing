#!/usr/bin/env bash
# Regenera o vídeo de apresentação. Requisitos: Node 22 + Playwright (Chromium), Python 3 com numpy/scipy/pillow, ffmpeg.
# Uso: a partir da raiz do repositório, `bash video/src/build.sh`
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
WORK="$ROOT/video/.build"
mkdir -p "$WORK" && cp "$ROOT"/video/src/* "$WORK"/ && ln -sfn "$ROOT/src/assets/images" "$WORK/img"
cd "$ROOT" && npm run build >/dev/null
npx vite preview --port 4173 >/dev/null 2>&1 & SITE=$!
cd "$WORK" && python3 -m http.server 8765 >/dev/null 2>&1 & COMP=$!
trap 'kill $SITE $COMP 2>/dev/null' EXIT
sleep 2
cd "$WORK" && [ -d node_modules/playwright ] || npm i --no-save --no-package-lock playwright >/dev/null
for clip in intro scroll order mobile; do node "rec_$clip.mjs"; done   # capturas reais do site (tempo desacelerado 4x)
python3 clips.py
node render.mjs video                                                  # motion graphics quadro a quadro (30 fps), 16:9
VERTICAL=1 node render.mjs video 0 1180 video_v_noaudio.mp4             # mesma montagem em 9:16
python3 music.py                                                       # trilha original sincronizada aos cortes
ffmpeg -hide_banner -loglevel error -y -i video_noaudio.mp4 -i music.wav -map 0:v -map 1:a \
  -c:v libx264 -preset slow -crf 19 -pix_fmt yuv420p -profile:v high -movflags +faststart \
  -c:a aac -b:a 192k -shortest "$ROOT/video/aurora-cafe-apresentacao-16x9.mp4"
ffmpeg -hide_banner -loglevel error -y -i video_v_noaudio.mp4 -i music.wav -map 0:v -map 1:a \
  -c:v libx264 -preset slow -crf 20 -pix_fmt yuv420p -profile:v high -movflags +faststart \
  -c:a aac -b:a 192k -shortest "$ROOT/video/aurora-cafe-apresentacao-9x16.mp4"
echo "OK → video/aurora-cafe-apresentacao-16x9.mp4 e video/aurora-cafe-apresentacao-9x16.mp4"
