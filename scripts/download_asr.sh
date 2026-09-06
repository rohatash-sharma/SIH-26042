#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
mkdir -p models/asr/.download
cd models/asr/.download
URL="https://github.com/k2-fsa/sherpa-onnx/releases/download/asr-models/sherpa-onnx-omnilingual-asr-1600-languages-300M-ctc-int8-2025-11-12.tar.bz2"
wget -O model.tar.bz2 "$URL"
tar -xjf model.tar.bz2
MODEL_DIR=$(find . -maxdepth 1 -type d -name 'sherpa-onnx-omnilingual-asr-*' | head -n 1)
cp "$MODEL_DIR/model.int8.onnx" ../model.int8.onnx
cp "$MODEL_DIR/tokens.txt" ../tokens.txt
cd "$ROOT"
rm -rf models/asr/.download
echo "ASR model installed under models/asr/"
