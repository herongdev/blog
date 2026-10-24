#!/usr/bin/env bash
# Run on the old Docker host. A brief tool-only stop creates a consistent backup.
set -euo pipefail
umask 077
container=${TOOLS_CONTAINER:-light-tools-web}
keep_stopped=${TOOLS_KEEP_STOPPED:-0}
[[ "$keep_stopped" == 0 || "$keep_stopped" == 1 ]] || { echo 'TOOLS_KEEP_STOPPED must be 0 or 1.' >&2; exit 2; }
destination=${1:?Usage: backup.sh /absolute/private/backup-directory}
[[ "$destination" == /* && ! -e "$destination" ]] || { echo 'Choose a new absolute backup directory.' >&2; exit 2; }
volume=$(docker inspect --format '{{range .Mounts}}{{if eq .Destination "/data"}}{{if eq .Type "volume"}}{{.Name}}{{end}}{{end}}{{end}}' "$container")
[[ "$volume" =~ ^[A-Za-z0-9][A-Za-z0-9_.-]+$ ]] || { echo 'Expected a named /data volume; inspect the deployment first.' >&2; exit 2; }
image=$(docker inspect --format '{{.Image}}' "$container")
was_running=$(docker inspect --format '{{.State.Running}}' "$container")
secrets_source=$(docker inspect --format '{{range .Mounts}}{{if eq .Destination "/run/secrets/light-tools"}}{{.Source}}{{end}}{{end}}' "$container")
mkdir -m 700 -p "$destination"
docker inspect "$container" > "$destination/container.private.json"
printf '%s\n' "$volume" > "$destination/source-volume.txt"
printf '%s\n' "$image" > "$destination/source-image.txt"
backup_succeeded=false
restart_if_needed() {
  status=$?
  trap - EXIT
  if [[ "$was_running" == true ]] && \
     [[ "$keep_stopped" != 1 || "$backup_succeeded" != true || "$status" != 0 ]]; then
    docker start "$container" >/dev/null || status=1
  fi
  exit "$status"
}
trap restart_if_needed EXIT
if [[ "$was_running" == true ]]; then docker stop --time 45 "$container" >/dev/null; fi
docker run --rm --network none --read-only --user 0 \
  --mount "type=volume,src=$volume,dst=/data,readonly" \
  --mount "type=bind,src=$destination,dst=/backup" \
  --entrypoint sh "$image" -c 'tar -C /data -czf /backup/data.tar.gz .'
if [[ -n "$secrets_source" ]]; then
  # Reuse Docker's actual bind mount, including with remote daemons/Desktop.
  # Do not assume inspect's host path is also readable on the CLI host.
  docker run --rm --network none --read-only --user 0 \
    --volumes-from "$container:ro" \
    --mount "type=bind,src=$destination,dst=/backup" \
    --entrypoint sh "$image" -c 'tar -C /run/secrets/light-tools -czf /backup/secrets.tar.gz .'
fi
(cd "$destination" && sha256sum data.tar.gz container.private.json source-image.txt source-volume.txt > SHA256SUMS)
if [[ -f "$destination/secrets.tar.gz" ]]; then
  (cd "$destination" && sha256sum secrets.tar.gz >> SHA256SUMS)
fi
chmod -R go-rwx "$destination"
backup_succeeded=true
echo 'Consistent backup created; private manifest and archives must stay outside Git and web roots.'
if [[ "$keep_stopped" == 1 && "$was_running" == true ]]; then
  echo 'TOOLS_KEEP_STOPPED=1: the old tools container stays stopped for the final traffic switch.'
fi
