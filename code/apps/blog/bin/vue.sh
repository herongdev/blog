#!/usr/bin/env bash
#!/usr/bin/env bash
set -e
TITLE="$1"
FILENAME="${2:-$TITLE.md}"
hexo new post "$TITLE" --path "web应用开发/前端/前端框架/vue/$FILENAME"
