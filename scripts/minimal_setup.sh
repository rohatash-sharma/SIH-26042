#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
MIN_FREE_GB="${MIN_FREE_GB:-8}"
available_kb=$(df -Pk "$ROOT" | awk 'NR==2 {print $4}')
available_gb=$((available_kb / 1024 / 1024))
if (( available_gb < MIN_FREE_GB )); then
  echo "At least ${MIN_FREE_GB} GB free space is recommended; found ${available_gb} GB." >&2
  exit 1
fi

echo "Minimal Hindi → Santali setup"
echo "Workspace: $ROOT"
echo "Free space: ${available_gb} GB"
echo
echo "Required artifacts (download separately, without duplicate archives):"
echo "  1. Sherpa-ONNX Hindi ASR INT8 model (~365 MB extracted)"
echo "  2. IndicTrans2 Hindi → Santali CTranslate2 pack"
echo "  3. Santali TTS ONNX pack"
echo
echo "Ho/Mundari are intentionally excluded from this milestone."
echo "Run scripts/verify_models.sh after placing model packs."
