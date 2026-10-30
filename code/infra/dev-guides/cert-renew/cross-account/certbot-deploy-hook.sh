#!/bin/sh
# Install as /opt/herong-media-cert/certbot-cross-account-deploy-hook.sh.
set -eu
umask 077
[ "${RENEWED_LINEAGE:-}" = /etc/herong-media-acme/live/media.herong.info ] || exit 0
exec /opt/herong-media-cert/venv/bin/python /opt/herong-media-cert/media_cert.py reconcile \
  --env-file /etc/herong-media-cert/cloud.env \
  --lineage "$RENEWED_LINEAGE" \
  --state-file /var/lib/herong-media-cert/state.json
