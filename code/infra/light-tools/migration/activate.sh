#!/usr/bin/env bash
set -euo pipefail
umask 077
release=${1:?Expected release ID}
[[ "$release" =~ ^[A-Za-z0-9][A-Za-z0-9._-]{1,100}$ ]] || exit 2
deploy_dir=/opt/herong-light-tools
release_dir="$deploy_dir/releases/$release"
[[ -f "$release_dir/compose.yaml" && -f "$release_dir/release.env" ]] || { echo 'Prepare the release directory first.' >&2; exit 2; }
compose_at() {
  docker compose --project-name herong-light-tools --env-file "$1/release.env" -f "$1/compose.yaml" "${@:2}"
}
previous=$(readlink "$deploy_dir/current" || true)
if [[ -n "$previous" ]]; then
  [[ "$previous" =~ ^releases/[A-Za-z0-9][A-Za-z0-9._-]{1,100}$ && -f "$deploy_dir/$previous/release.env" ]] || exit 2
fi
# --quiet is deliberate: expanded runtime settings may contain credentials.
compose_at "$release_dir" config --quiet
if compose_at "$release_dir" up -d --no-build --wait --wait-timeout 120; then
  if [[ -n "$previous" && "$previous" != "releases/$release" ]]; then
    ln -s "$previous" "$deploy_dir/.previous-$release"
    mv -Tf "$deploy_dir/.previous-$release" "$deploy_dir/previous"
  fi
  ln -s "releases/$release" "$deploy_dir/.current-$release"
  mv -Tf "$deploy_dir/.current-$release" "$deploy_dir/current"
  echo "Healthy tools release activated: $release"
else
  echo 'Tools health check failed; restoring the previous image (data is not overwritten).' >&2
  if [[ -n "$previous" ]]; then
    compose_at "$deploy_dir/$previous" up -d --no-build --wait --wait-timeout 120
  else
    compose_at "$release_dir" down
  fi
  exit 1
fi
