#!/usr/bin/env bash
# A CI identity uploads static files only; it never uploads executable deploy code.
set -euo pipefail
infra_dir=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
code_dir=$(cd "$infra_dir/../.." && pwd)
release=${SITE_RELEASE:?Set CI release ID}
[[ "$release" =~ ^[a-f0-9]{40}-[0-9]{1,20}-[0-9]{1,6}$ ]] || { echo 'Expected commit-run-attempt release ID.' >&2; exit 2; }
host=${SITE_SSH_HOST:-101.96.210.172}
user=${SITE_SSH_USER:-site-ci}
port=${SITE_SSH_PORT:-22}
[[ "$host" == 101.96.210.172 && "$user" == site-ci && "$port" =~ ^[0-9]+$ ]] || { echo 'The CI uploader is restricted to site-ci on 101.96.210.172.' >&2; exit 2; }
bundle=${SITE_BUNDLE_DIR:-$code_dir/apps/site/dist-bundle}
[[ -f "$bundle/__site-health.json" && -f "$bundle/route-manifest.json" && -f "$bundle/index.html" ]] || { echo 'Build and verify the complete site bundle before uploading.' >&2; exit 2; }
ssh_options=(-o StrictHostKeyChecking=yes -o BatchMode=yes -o IdentitiesOnly=yes)
if [[ -n "${SITE_SSH_IDENTITY_FILE:-}" ]]; then ssh_options+=(-i "$SITE_SSH_IDENTITY_FILE"); fi
stage=$(mktemp -d "${TMPDIR:-/tmp}/herong-site-ci.XXXXXX")
trap 'rm -rf -- "$stage"' EXIT
python3 "$infra_dir/pack-static.py" "$bundle" "$stage/$release.tar.gz"
remote="$user@$host"
incoming="/opt/herong-site/incoming/$release"
# The remote identity cannot write releases, fixed publisher templates, or Docker.
ssh "${ssh_options[@]}" -p "$port" "$remote" "test ! -e '$incoming.tar.gz' && test ! -e '$incoming.upload'"
scp "${ssh_options[@]}" -P "$port" "$stage/$release.tar.gz" "$remote:$incoming.upload"
ssh "${ssh_options[@]}" -p "$port" "$remote" \
  "mv '$incoming.upload' '$incoming.tar.gz' && sudo -n /usr/local/sbin/herong-site-publish '$release'"
