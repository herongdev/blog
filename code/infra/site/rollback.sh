#!/usr/bin/env bash
set -euo pipefail
deploy_dir=/opt/herong-site
target=${1:-$(readlink "$deploy_dir/previous" || true)}
[[ "$target" =~ ^releases/[A-Za-z0-9][A-Za-z0-9._-]{1,100}$ ]] || { echo 'Expected releases/<release-id>.' >&2; exit 2; }
release=${target#releases/}
exec bash "$deploy_dir/$target/remote-deploy.sh" "$release"
