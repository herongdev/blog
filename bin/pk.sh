#!/usr/bin/env bash
#!/usr/bin/env bash
set -e
TITLE="$1"
FILENAME="${2:-$TITLE.md}"
hexo new post "$TITLE" --path "需求实现/登录鉴权/$FILENAME"
