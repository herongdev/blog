#!/usr/bin/env bash
set -euo pipefail

release=${1:-}
[[ "$release" =~ ^[a-f0-9]{12}$ ]] || { echo "无效的发布标识。" >&2; exit 1; }
base=/opt/zhixu-chat
releases="$base/releases"
next="zhixu-chat:$release"
archive="$releases/zhixu-chat-$release.tar.gz"
next_compose="$releases/compose-$release.yaml"
next_local="$releases/compose-local-$release.yaml"
compose_file="$base/compose.yaml"
local_file="$base/compose.local.yaml"
candidate_compose="$base/.compose-$release.yaml"
candidate_local="$base/.compose-local-$release.yaml"
env_file="$base/.env.deploy"
install -d -m 700 "$base/output/deploy"
lock="$base/output/deploy/lock"
mkdir "$lock" || { echo "已有聊天应用发布正在运行。" >&2; exit 1; }
cleanup() {
  status=$?
  rm -f -- "$candidate_compose" "$candidate_local" || true
  rmdir "$lock" || true
  trap - EXIT
  exit "$status"
}
trap cleanup EXIT

for path in "$archive" "$next_compose" "$next_local" "$env_file"; do
  [[ -f "$path" ]] || { echo "缺少发布文件：$path" >&2; exit 1; }
done

docker load --input "$archive" >/dev/null
revision=$(docker image inspect "$next" --format '{{index .Config.Labels "org.opencontainers.image.revision"}}')
[[ "$revision" == "$release" ]] || { echo "镜像发布标识不匹配。" >&2; exit 1; }

current=$(APP_IMAGE="$next" docker compose --project-name zhixu-chat \
  --project-directory "$base" --env-file "$env_file" \
  -f "$compose_file" -f "$local_file" ps --all --quiet app)
previous=
if [[ -n "$current" ]]; then
  previous=$(docker inspect "$current" --format '{{.Image}}')
  install -d -m 700 "$base/output/deploy/logs"
  log="$base/output/deploy/logs/app-before-$release-$(date -u +%Y%m%dT%H%M%SZ).log"
  (umask 077; docker logs --timestamps "$current" > "$log" 2>&1) || rm -f "$log"
fi

cp "$next_compose" "$candidate_compose"
cp "$next_local" "$candidate_local"
APP_IMAGE="$next" docker compose --project-name zhixu-chat \
  --project-directory "$base" --env-file "$env_file" \
  -f "$candidate_compose" -f "$candidate_local" config --quiet
cp -p "$compose_file" "$releases/compose-before-$release.yaml"
cp -p "$local_file" "$releases/compose-local-before-$release.yaml"
cp -p "$env_file" "$releases/env-before-$release"
cp "$candidate_compose" "$compose_file"
cp "$candidate_local" "$local_file"

start() {
  APP_IMAGE="$1" docker compose --project-name zhixu-chat \
    --project-directory "$base" --env-file "$env_file" \
    -f "$compose_file" -f "$local_file" up --detach --no-build --wait \
    --wait-timeout 60 app
}

record_release() {
  python3 - "$next" "$previous" "$release" "$env_file" "$base" <<'PY'
from pathlib import Path
import datetime, json, re, sys
image, previous, release, env_file, base = sys.argv[1:]
p = Path(env_file)
text = p.read_text()
text, count = re.subn(r"^APP_IMAGE=.*$", f"APP_IMAGE={image}", text, flags=re.M)
if not count:
    text = text.rstrip() + f"\nAPP_IMAGE={image}\n"
p.write_text(text)
record = {
    "release": release,
    "image": image,
    "previousImage": previous or None,
    "deployedAt": datetime.datetime.now(datetime.timezone.utc).isoformat(),
}
out = Path(base) / "output" / "deploy" / f"release-{release}.json"
out.parent.mkdir(parents=True, exist_ok=True)
out.write_text(json.dumps(record, ensure_ascii=False, indent=2) + "\n")
PY
}

if start "$next" && curl --fail --silent --max-time 10 \
  http://127.0.0.1:24301/api/healthz >/dev/null && record_release; then
  :
else
  echo "发布失败，恢复上一版。" >&2
  cp "$releases/compose-before-$release.yaml" "$compose_file"
  cp "$releases/compose-local-before-$release.yaml" "$local_file"
  cp "$releases/env-before-$release" "$env_file"
  rm -f -- "$base/output/deploy/release-$release.json"
  if [[ -n "$previous" ]]; then start "$previous"; fi
  exit 1
fi

docker inspect zhixu-chat-app-1 \
  --format 'revision={{index .Config.Labels "org.opencontainers.image.revision"}} health={{.State.Health.Status}}'
