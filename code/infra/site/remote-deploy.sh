#!/usr/bin/env bash
set -euo pipefail
umask 077

release=${1:?Expected release ID}
[[ "$release" =~ ^[A-Za-z0-9][A-Za-z0-9._-]{1,100}$ ]] || exit 2
deploy_dir=/opt/herong-site
release_dir="$deploy_dir/releases/$release"
[[ "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)" == "$release_dir" ]] || { echo 'Run the script from its uploaded versioned release.' >&2; exit 2; }
[[ -f "$release_dir/compose.yaml" && -f "$release_dir/site.env" ]] || exit 2
port=$(sed -n 's/^SITE_PORT=//p' "$release_dir/site.env")
image=$(sed -n 's/^SITE_IMAGE=//p' "$release_dir/site.env")
[[ "$port" =~ ^[0-9]+$ && "$port" -ge 1024 && "$port" -le 65535 ]] || exit 2
[[ "$image" == "herong-site:$release" ]] || exit 2

compose_at() {
  docker compose --project-name herong-site --env-file "$1/site.env" -f "$1/compose.yaml" "${@:2}"
}
previous=$(readlink "$deploy_dir/current" || true)
if [[ -n "$previous" ]]; then
  [[ "$previous" =~ ^releases/[A-Za-z0-9][A-Za-z0-9._-]{1,100}$ && -f "$deploy_dir/$previous/site.env" ]] || { echo 'Invalid current release; refusing to overwrite it.' >&2; exit 2; }
fi
if [[ -f "$release_dir/image.tar.gz" ]]; then
  (cd "$release_dir" && sha256sum --check --status image.sha256)
  docker load --input "$release_dir/image.tar.gz" >/dev/null
  # Remove only this verified transport archive, never unrelated images or data.
  rm -- "$release_dir/image.tar.gz"
fi
docker image inspect "$image" >/dev/null
compose_at "$release_dir" config --quiet
check_bundle() {
  local result expected
  result=$(curl --fail --silent --show-error --max-time 10 "http://127.0.0.1:$port/__site-health.json") || return 1
  [[ "$result" == *'"status":"ok"'* && "$result" == *'"app":"herong-site"'* ]] || return 1
  if [[ -f "$release_dir/expected-build-id" ]]; then
    expected=$(cat "$release_dir/expected-build-id")
    [[ "$expected" =~ ^[a-f0-9]{16}$ && "$result" == *"\"buildId\":\"$expected\""* ]] || return 1
  fi
}
if compose_at "$release_dir" up -d --no-build --wait --wait-timeout 90 && \
   curl --fail --silent --show-error --max-time 10 "http://127.0.0.1:$port/healthz" >/dev/null && \
   check_bundle && \
   curl --fail --silent --show-error --max-time 10 "http://127.0.0.1:$port/" >/dev/null; then
  if [[ -n "$previous" && "$previous" != "releases/$release" ]]; then
    ln -s "$previous" "$deploy_dir/.previous-$release"
    mv -Tf "$deploy_dir/.previous-$release" "$deploy_dir/previous"
  fi
  ln -s "releases/$release" "$deploy_dir/.current-$release"
  mv -Tf "$deploy_dir/.current-$release" "$deploy_dir/current"
  echo "Healthy site release activated: $release"
else
  echo 'Site health check failed; restoring the previous deployment.' >&2
  if [[ -n "$previous" ]]; then
    compose_at "$deploy_dir/$previous" up -d --no-build --wait --wait-timeout 90
  else
    compose_at "$release_dir" down
  fi
  exit 1
fi
