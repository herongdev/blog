#!/bin/bash
set -euo pipefail
PROJECT_DIR="$(cd -- "$(/usr/bin/dirname -- "$0")" && pwd)"
cd "$PROJECT_DIR"
/bin/mkdir -p "$PROJECT_DIR/output/launcher-logs"
LOG="$PROJECT_DIR/output/launcher-logs/full-$(/bin/date +%Y%m%d-%H%M%S)-$$.log"
if [ ! -x "$PROJECT_DIR/.venv/bin/python" ]; then
  printf '已验证的 Python 不存在：%s\n已停止，不会自动安装或改用全局 Python。\n' "$PROJECT_DIR/.venv/bin/python" | /usr/bin/tee "$LOG"
  exit 1
fi
"$PROJECT_DIR/.venv/bin/python" "$PROJECT_DIR/pipeline.py" full "$@" 2>&1 | /usr/bin/tee "$LOG"
