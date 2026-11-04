#!/usr/bin/env bash
# Upload only the independent static site; never touch the blog root.
set -euo pipefail
infra_dir=$(cd "$(dirname "$0")" && pwd)
site_dir=$(cd "$infra_dir/../../apps/tingji-site" && pwd)
host=${TINGJI_DEPLOY_HOST:-root@115.190.214.176}
if [[ "$host" != root@115.190.214.176 ]]; then
  printf 'Refusing unexpected Tingji deploy host: %s\n' "$host" >&2
  exit 1
fi
release_id=$(date -u +%Y%m%dT%H%M%SZ)
[[ "$release_id" =~ ^[0-9]{8}T[0-9]{6}Z$ ]]
remote_dir=/var/www/tingji
ssh_options=(-o BatchMode=yes -o StrictHostKeyChecking=yes -o ConnectTimeout=10)

remote_action() {
  ssh "${ssh_options[@]}" "$host" bash -s -- "$1" "$release_id" <<'REMOTE'
set -euo pipefail
action=$1
release_id=$2
[[ "$release_id" =~ ^[0-9]{8}T[0-9]{6}Z$ ]]
remote_dir=/var/www/tingji
release_dir="$remote_dir/releases/$release_id"
previous_file="$remote_dir/previous-$release_id.txt"
# This is an update script for the existing independent site, not a first install.
test -d "$remote_dir/releases"
test ! -L "$remote_dir"
test ! -L "$remote_dir/releases"
exec 9>"$remote_dir/.deploy.lock"
flock -x 9

validate_target() {
  local target=$1 name
  case "$target" in
    releases/*) name=${target#releases/} ;;
    "$remote_dir"/releases/*) name=${target#"$remote_dir"/releases/} ;;
    *) printf 'Refusing current target outside Tingji releases\n' >&2; return 1 ;;
  esac
  [[ "$name" =~ ^[A-Za-z0-9][A-Za-z0-9._-]*$ ]]
  test -d "$remote_dir/releases/$name"
  test ! -L "$remote_dir/releases/$name"
}

case "$action" in
  prepare)
    previous=$(readlink "$remote_dir/current")
    validate_target "$previous"
    test ! -e "$release_dir"
    test ! -L "$release_dir"
    test ! -e "$previous_file"
    test ! -L "$previous_file"
    install -d -m 755 "$release_dir"
    (set -o noclobber; printf '%s\n' "$previous" > "$previous_file")
    ;;
  activate)
    validate_target "releases/$release_id"
    test -s "$release_dir/index.html"
    test -s "$release_dir/privacy/index.html"
    test -s "$release_dir/support/index.html"
    test -s "$release_dir/privacy-policy.json"
    previous=$(cat "$previous_file")
    validate_target "$previous"
    if [[ "$(readlink "$remote_dir/current")" != "$previous" ]]; then
      printf 'Tingji current changed during upload; refusing activation\n' >&2
      exit 1
    fi
    next="$remote_dir/next-$release_id"
    test ! -e "$next"
    test ! -L "$next"
    ln -s "releases/$release_id" "$next"
    mv -Tf "$next" "$remote_dir/current"
    ;;
  rollback)
    if [[ "$(readlink "$remote_dir/current")" != "releases/$release_id" ]]; then
      printf 'Rollback skipped: current is no longer this release\n' >&2
      exit 0
    fi
    previous=$(cat "$previous_file")
    validate_target "$previous"
    next="$remote_dir/rollback-$release_id"
    test ! -e "$next"
    test ! -L "$next"
    ln -s "$previous" "$next"
    mv -Tf "$next" "$remote_dir/current"
    printf 'Restored Tingji current to %s\n' "$previous" >&2
    ;;
  *) exit 2 ;;
esac
REMOTE
}

activation_attempted=0
on_exit() {
  status=$?
  trap - EXIT
  if (( status != 0 && activation_attempted == 1 )); then
    if ! remote_action rollback; then
      printf 'Automatic rollback failed; inspect %s/previous-%s.txt before retrying\n' "$remote_dir" "$release_id" >&2
    fi
  fi
  exit "$status"
}
trap on_exit EXIT
trap 'exit 130' INT
trap 'exit 143' TERM

remote_action prepare
rsync -az --no-owner --no-group \
  -e 'ssh -o BatchMode=yes -o StrictHostKeyChecking=yes -o ConnectTimeout=10' \
  "$site_dir/" "$host:$remote_dir/releases/$release_id/"
# Arm recovery before SSH: a lost connection can occur after the remote rename.
activation_attempted=1
remote_action activate
for path in / /privacy/ /support/ /privacy-policy.json; do
  curl --fail --silent --show-error --connect-timeout 10 --max-time 20 \
    --resolve tingji.herong.info:443:115.190.214.176 \
    "https://tingji.herong.info$path" >/dev/null
done
activation_attempted=0
printf 'Published https://tingji.herong.info/ (%s)\n' "$release_id"
