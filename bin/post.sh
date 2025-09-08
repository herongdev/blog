#!/usr/bin/env bash
set -e
CAT_PATH="$1"
TITLE="$2"
FILENAME="${3:-$TITLE.md}"
hexo new post "$TITLE" --path "$CAT_PATH/$FILENAME"
