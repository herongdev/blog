#!/usr/bin/env bash
# Run locally on the verified new Linux host. This script never opens SSH.
set -euo pipefail
umask 077

usage() {
  cat <<'USAGE'
Usage: install-edge.sh --target 101.96.210.172 --staged-dir /absolute/nginx-staged

Run as root on the verified target. If its public IP is NATed rather than present
on an interface, set SITE_EXPECTED_MACHINE_ID_SHA256 to the independently verified
SHA256 of that host's /etc/machine-id. No certificates or keys are copied.
USAGE
}
target=
staged_dir=
while [[ $# -gt 0 ]]; do
  case "$1" in
    --target) target=${2:?Missing target}; shift 2 ;;
    --staged-dir) staged_dir=${2:?Missing staged directory}; shift 2 ;;
    --help|-h) usage; exit 0 ;;
    *) usage >&2; exit 2 ;;
  esac
done
[[ "$target" == 101.96.210.172 && "$staged_dir" == /* && -d "$staged_dir" ]] || { usage >&2; exit 2; }
[[ "$(uname -s)" == Linux && "$EUID" == 0 ]] || { echo 'Run locally as root on the verified new Linux host.' >&2; exit 2; }
[[ ! -e /.dockerenv && ! -e /run/.containerenv ]] || { echo 'Run on the host, not inside a container.' >&2; exit 2; }
for command in nginx systemctl sha256sum ip stat install cp mv mktemp flock; do
  command -v "$command" >/dev/null || { echo "Missing command: $command" >&2; exit 2; }
done
if [[ -n "${SITE_EXPECTED_MACHINE_ID_SHA256:-}" ]]; then
  [[ "$SITE_EXPECTED_MACHINE_ID_SHA256" =~ ^[a-f0-9]{64}$ ]] || { echo 'Invalid expected machine identity digest.' >&2; exit 2; }
  actual_machine=$(sha256sum /etc/machine-id)
  [[ "${actual_machine%% *}" == "$SITE_EXPECTED_MACHINE_ID_SHA256" ]] || { echo 'Machine identity does not match the independently verified target.' >&2; exit 2; }
else
  ip -4 -o address show | awk '{split($4, address, "/"); print address[1]}' | \
    grep -Fxq "$target" || { echo 'Target IP is not on a local interface. For a NATed host supply its independently verified SITE_EXPECTED_MACHINE_ID_SHA256.' >&2; exit 2; }
fi
[[ -f /etc/nginx/nginx.conf && -d /etc/nginx/conf.d && -d /etc/nginx/snippets ]] || { echo 'Expected existing host Nginx directories.' >&2; exit 2; }
systemctl is-active --quiet nginx || { echo 'Existing nginx service must already be active.' >&2; exit 2; }
exec 9>/run/lock/herong-site-edge.lock
flock -n 9 || { echo 'Another site edge installation is running.' >&2; exit 2; }

source_names=(herong.info.conf edge-enterprise-origin.conf edge-tools.conf edge-production.conf enterprise-origin-headers.conf)
target_names=(
  /etc/nginx/conf.d/herong.info.conf
  /etc/nginx/snippets/herong-site-enterprise-origin.conf
  /etc/nginx/snippets/herong-site-tools.conf
  /etc/nginx/snippets/herong-site-root.conf
  /etc/nginx/snippets/herong-enterprise-origin-headers.conf
)
sources=()
for index in "${!source_names[@]}"; do
  source_file="$staged_dir/${source_names[$index]}"
  target_basename=${target_names[$index]##*/}
  alternate="$staged_dir/$target_basename"
  if [[ ! -f "$source_file" ]]; then source_file=$alternate; fi
  [[ -f "$source_file" && ! -L "$source_file" && "$(stat -c %u "$source_file")" == 0 ]] || { echo "Missing root-owned regular staged file: ${source_names[$index]}" >&2; exit 2; }
  file_mode=$(stat -c %a "$source_file")
  (( (8#$file_mode & 022) == 0 )) || { echo 'Staged configurations must not be group/world writable.' >&2; exit 2; }
  if [[ "$source_file" != "$alternate" && -f "$alternate" ]]; then
    cmp -s "$source_file" "$alternate" || { echo "Conflicting staged aliases for $target_basename" >&2; exit 2; }
  fi
  sources+=("$source_file")
done
# Refuse to layer a migration onto an already invalid baseline configuration.
nginx -t
install -d -m 0700 /var/backups/herong-site
backup_dir=$(mktemp -d "/var/backups/herong-site/$(date -u +%Y%m%dT%H%M%SZ)-edge.XXXXXX")
states=()
for destination in "${target_names[@]}"; do
  if [[ -e "$destination" || -L "$destination" ]]; then
    [[ ! -d "$destination" ]] || { echo 'A target config name is a directory; refusing to replace it.' >&2; exit 2; }
    backup_file="$backup_dir/files${destination}"
    install -d -m 0700 "${backup_file%/*}"
    cp -a -- "$destination" "$backup_file"
    states+=(present)
    printf 'present\t%s\n' "$destination" >> "$backup_dir/manifest.tsv"
  else
    states+=(absent)
    printf 'absent\t%s\n' "$destination" >> "$backup_dir/manifest.tsv"
  fi
done

mutating=0
temporary_file=
rollback_on_failure() {
  status=$?
  trap - EXIT INT TERM
  if [[ -n "$temporary_file" ]]; then rm -f -- "$temporary_file"; fi
  if [[ "$status" != 0 && "$mutating" == 1 ]]; then
    echo "Edge install failed; restoring original files from $backup_dir" >&2
    for index in "${!target_names[@]}"; do
      destination=${target_names[$index]}
      if [[ "${states[$index]}" == present ]]; then
        temporary_file=$(mktemp "${destination%/*}/.herong-edge-restore.XXXXXX")
        rm -f -- "$temporary_file"
        cp -a -- "$backup_dir/files${destination}" "$temporary_file"
        mv -Tf -- "$temporary_file" "$destination"
      else
        rm -f -- "$destination"
      fi
    done
    if nginx -t; then
      systemctl reload nginx || echo 'Original files restored; nginx reload still needs operator attention.' >&2
    else
      echo 'Original files restored; baseline validation needs operator attention. Do not restart unrelated services.' >&2
    fi
  fi
  exit "$status"
}
trap rollback_on_failure EXIT
trap 'exit 130' INT
trap 'exit 143' TERM
mutating=1
for index in "${!target_names[@]}"; do
  destination=${target_names[$index]}
  temporary_file=$(mktemp "${destination%/*}/.herong-edge-install.XXXXXX")
  install -m 0644 -- "${sources[$index]}" "$temporary_file"
  mv -Tf -- "$temporary_file" "$destination"
  temporary_file=
done
nginx -t
systemctl reload nginx
mutating=0
echo "Site edge installed. Previous files: $backup_dir"
