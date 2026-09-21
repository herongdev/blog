#!/usr/bin/env bash
set -euo pipefail

infra_dir=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
code_dir=$(cd "$infra_dir/../.." && pwd)
app_dir="$code_dir/apps/chat"
host=${CHAT_DEPLOY_HOST:-root@115.190.214.176}
remote_dir=/opt/zhixu-chat
public_url=${CHAT_PUBLIC_URL:-https://chat.herong.info}
node_image=${CHAT_NODE_IMAGE:-docker.m.daocloud.io/library/node:22-bookworm-slim@sha256:83f487e0a63425e5b4d146fb5e5be574bcbe1b7b843d3ebafdd95eaf7767a7e5}
release=$(node "$infra_dir/release-id.mjs")
image="zhixu-chat:$release"
if [[ ${1:-} == "--" ]]; then shift; fi
mode=${1:-deploy}

[[ "$release" =~ ^[a-f0-9]{12}$ ]] || { echo "无法生成有效的发布标识。" >&2; exit 1; }
if [[ "$mode" != "deploy" && "$mode" != "--build-only" ]]; then
  echo "用法：pnpm deploy:chat [--build-only]" >&2
  exit 1
fi
if [[ "$mode" == "deploy" ]]; then
  online_release=$(ssh "$host" \
    "docker inspect zhixu-chat-app-1 --format '{{index .Config.Labels \"org.opencontainers.image.revision\"}}'" \
    2>/dev/null || true)
  if [[ "$online_release" == "$release" ]] && \
    curl --fail --silent --compressed --max-time 10 "$public_url/api/healthz" >/dev/null; then
    echo "线上已是当前版本：$release"
    exit 0
  fi
fi

echo "构建 ${image}（linux/amd64）"
docker build --platform linux/amd64 \
  --build-arg "NODE_IMAGE=$node_image" \
  --build-arg "APP_REVISION=$release" -t "$image" "$app_dir"
if [[ "$mode" == "--build-only" ]]; then
  echo "镜像构建完成：${image}"
  exit 0
fi

stage=$(mktemp -d "${TMPDIR:-/tmp}/zhixu-chat-release.XXXXXX")
trap 'rm -r -- "$stage"' EXIT
archive="$stage/zhixu-chat-$release.tar.gz"
cp "$infra_dir/remote-deploy.sh" "$stage/remote-deploy-$release.sh"
cp "$app_dir/compose.yaml" "$stage/compose-$release.yaml"
cp "$app_dir/compose.local.yaml" "$stage/compose-local-$release.yaml"
docker save "$image" | gzip > "$archive"

ssh "$host" "install -d -m 700 '$remote_dir/releases'"
scp "$archive" "$stage/remote-deploy-$release.sh" \
  "$stage/compose-$release.yaml" "$stage/compose-local-$release.yaml" \
  "$host:$remote_dir/releases/"
ssh "$host" "bash '$remote_dir/releases/remote-deploy-$release.sh' '$release'"
curl --fail --silent --show-error --compressed --max-time 20 "$public_url/api/healthz"
echo
echo "发布完成：${public_url}（$release）"
