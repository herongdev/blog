#!/usr/bin/env bash
set -euo pipefail

infra_dir=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
code_dir=$(cd "$infra_dir/../.." && pwd)
mode=${1:---build-only}
release=${SITE_RELEASE:-$(date -u +%Y%m%dT%H%M%SZ)-$(git -C "$code_dir" rev-parse --short=12 HEAD)}
image="herong-site:$release"
bundle=${SITE_BUNDLE_DIR:-$code_dir/apps/site/dist-bundle}
port=${SITE_PORT:-24380}

[[ "$mode" == --build-only || "$mode" == --deploy ]] || { echo 'Usage: deploy.sh [--build-only|--deploy]' >&2; exit 2; }
[[ "$release" =~ ^[A-Za-z0-9][A-Za-z0-9._-]{1,100}$ ]] || { echo 'Invalid SITE_RELEASE' >&2; exit 2; }
[[ "$port" =~ ^[0-9]+$ && "$port" -ge 1024 && "$port" -le 65535 ]] || { echo 'Invalid SITE_PORT' >&2; exit 2; }
[[ -f "$bundle/index.html" && -f "$bundle/404.html" && -f "$bundle/__site-health.json" ]] || { echo 'Build the complete site bundle first (index.html, 404.html and __site-health.json required).' >&2; exit 2; }
if [[ "$mode" == --deploy ]]; then
  : "${SITE_SSH_HOST:?Set SITE_SSH_HOST explicitly}"
  : "${SITE_SSH_USER:?Set SITE_SSH_USER explicitly}"
  [[ "$SITE_SSH_HOST" == 101.96.210.172 ]] || { echo 'This migration deploys only to 101.96.210.172.' >&2; exit 2; }
  ssh_port=${SITE_SSH_PORT:-22}
  [[ "$ssh_port" =~ ^[0-9]+$ ]] || { echo 'Invalid SITE_SSH_PORT' >&2; exit 2; }
  [[ "$SITE_SSH_USER" =~ ^[a-z_][a-z0-9_-]*$ ]] || { echo 'Invalid SITE_SSH_USER' >&2; exit 2; }
  ssh_options=(-o StrictHostKeyChecking=yes -o BatchMode=yes -o IdentitiesOnly=yes)
  if [[ -n "${SITE_SSH_IDENTITY_FILE:-}" ]]; then
    [[ -f "$SITE_SSH_IDENTITY_FILE" ]] || { echo 'SITE_SSH_IDENTITY_FILE does not exist.' >&2; exit 2; }
    ssh_options+=(-i "$SITE_SSH_IDENTITY_FILE")
  fi
fi

stage=$(mktemp -d "${TMPDIR:-/tmp}/herong-site.XXXXXX")
trap 'rm -rf -- "$stage"' EXIT
mkdir "$stage/context"
cp "$infra_dir/Dockerfile" "$stage/context/Dockerfile"
cp "$infra_dir/nginx/nginx.conf" "$stage/context/nginx.conf"
cp "$infra_dir/nginx/site.conf" "$stage/context/site.conf"
cp -R "$bundle" "$stage/context/public"
# Only verified public output and Nginx files enter this context; no repo secrets.
docker build --platform linux/amd64 --build-arg "RELEASE_ID=$release" \
  --build-arg "NGINX_IMAGE=${NGINX_IMAGE:-nginx:stable-alpine}" \
  -t "$image" "$stage/context"
docker run --rm --read-only --tmpfs /tmp:mode=1777 "$image" -t
echo "Image ready: $image"
[[ "$mode" == --deploy ]] || exit 0

mkdir "$stage/release"
cp "$infra_dir/compose.yaml" "$stage/release/compose.yaml"
cp "$infra_dir/remote-deploy.sh" "$stage/release/remote-deploy.sh"
printf 'SITE_IMAGE=%s\nSITE_PORT=%s\n' "$image" "$port" > "$stage/release/site.env"
docker save "$image" | gzip > "$stage/release/image.tar.gz"
if command -v sha256sum >/dev/null; then
  (cd "$stage/release" && sha256sum image.tar.gz > image.sha256)
else
  (cd "$stage/release" && shasum -a 256 image.tar.gz > image.sha256)
fi
remote="${SITE_SSH_USER}@${SITE_SSH_HOST}"
remote_dir="/opt/herong-site/releases/$release"
ssh "${ssh_options[@]}" -p "$ssh_port" "$remote" \
  "umask 077; test ! -e '$remote_dir'; mkdir -p '$remote_dir'"
scp "${ssh_options[@]}" -P "$ssh_port" "$stage/release/"* "$remote:$remote_dir/"
ssh "${ssh_options[@]}" -p "$ssh_port" "$remote" "bash '$remote_dir/remote-deploy.sh' '$release'"
echo "Deployment complete: $image (edge configuration and DNS are separate)."
