#!/bin/bash
set -eu
PROJECT_DIR="$(cd -- "$(dirname -- "$0")" && pwd)"
exec "$PROJECT_DIR/生成视频.command" "$@"
