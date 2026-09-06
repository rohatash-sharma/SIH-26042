#!/usr/bin/env bash
set -euo pipefail
PACKAGE="in.sih26042"

adb shell dumpsys meminfo "$PACKAGE"

echo
printf '%s\n' "To capture CPU:"
echo "adb shell top -H -p \$(adb shell pidof $PACKAGE)"

echo
printf '%s\n' "To test airplane mode:"
echo "adb shell cmd connectivity airplane-mode enable"
