#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
ADB="${ADB:-adb}"
APP="${APP_ID:-in.sih26042}"

if ! command -v "$ADB" >/dev/null 2>&1; then
  echo "adb is required" >&2
  exit 1
fi

ASR_DIR="$ROOT/models/asr"
MODEL_DIR="$ASR_DIR"
if [[ ! -f "$MODEL_DIR/model.int8.onnx" ]]; then
  MODEL_DIR="$(find "$ASR_DIR" -type f -name model.int8.onnx -printf '%h\n' | head -1)"
fi
[[ -n "${MODEL_DIR:-}" && -f "$MODEL_DIR/model.int8.onnx" && -f "$MODEL_DIR/tokens.txt" ]] || {
  echo "ASR model files are missing; run scripts/download_asr.sh first" >&2
  exit 1
}

echo "Installing ASR model into $APP private storage..."
"$ADB" shell "run-as $APP mkdir -p files/models/asr"
"$ADB" push "$MODEL_DIR/model.int8.onnx" /sdcard/sih-asr.onnx >/dev/null
"$ADB" push "$MODEL_DIR/tokens.txt" /sdcard/sih-tokens.txt >/dev/null
"$ADB" shell "run-as $APP cp /sdcard/sih-asr.onnx files/models/asr/model.int8.onnx"
"$ADB" shell "run-as $APP cp /sdcard/sih-tokens.txt files/models/asr/tokens.txt"
"$ADB" shell rm -f /sdcard/sih-asr.onnx /sdcard/sih-tokens.txt
echo "ASR model installed. NMT/TTS packs must be installed separately."
