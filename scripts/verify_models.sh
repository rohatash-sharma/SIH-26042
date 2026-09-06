#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"

fail=0
check() {
  if [[ ! -f "$1" ]]; then
    echo "MISSING: $1"
    fail=1
  else
    echo "OK:      $1"
  fi
}

ASR_MODEL="$ROOT/models/asr/model.int8.onnx"
ASR_TOKENS="$ROOT/models/asr/tokens.txt"
if [[ ! -f "$ASR_MODEL" ]]; then
  ASR_MODEL="$(find "$ROOT/models/asr" -type f -name model.int8.onnx -print -quit)"
fi
if [[ ! -f "$ASR_TOKENS" ]]; then
  ASR_TOKENS="$(find "$ROOT/models/asr" -type f -name tokens.txt -print -quit)"
fi
check "$ASR_MODEL"
check "$ASR_TOKENS"

if [[ ! -f "$ROOT/models/nmt/indictrans2/manifest.json" ]]; then
  echo "MISSING: models/nmt/indictrans2/manifest.json"
  fail=1
fi

if [[ $fail -ne 0 ]]; then
  echo "Model verification failed."
  exit 1
fi

echo "Basic model verification passed."
