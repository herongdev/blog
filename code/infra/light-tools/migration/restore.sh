#!/usr/bin/env bash
# Run on the new host after loading the verified original LightTools image.
set -euo pipefail
umask 077
backup=${1:?Usage: restore.sh /absolute/private/backup-directory}
volume=${TOOLS_DATA_VOLUME:-herong-light-tools-data}
[[ "$backup" == /* && -f "$backup/data.tar.gz" && -f "$backup/source-image.txt" ]] || exit 2
[[ "$volume" =~ ^[A-Za-z0-9][A-Za-z0-9_.-]+$ ]] || exit 2
(cd "$backup" && sha256sum --check --status SHA256SUMS)
image=$(cat "$backup/source-image.txt")
[[ "$image" =~ ^sha256:[a-f0-9]{64}$ ]] || exit 2
docker image inspect "$image" >/dev/null
if [[ -n "$(docker ps -aq --filter "volume=$volume")" ]]; then
  echo 'Target volume is attached to a container; refusing to restore.' >&2
  exit 2
fi
if ! docker volume inspect "$volume" >/dev/null 2>&1; then docker volume create "$volume" >/dev/null; fi
docker run --rm --network none --read-only --user 0 \
  --mount "type=volume,src=$volume,dst=/data" \
  --mount "type=bind,src=$backup,dst=/backup,readonly" \
  --entrypoint sh "$image" -c '
    test -z "$(ls -A /data)" || { echo "Target volume is not empty; refusing to overwrite." >&2; exit 2; }
    tar -C /data -xzf /backup/data.tar.gz
  '
echo 'Data restored into the empty target volume. Configure private runtime settings and secrets separately before starting.'
