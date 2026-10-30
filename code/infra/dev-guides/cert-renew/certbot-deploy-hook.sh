#!/bin/sh
# Certbot invokes this only after a successful issuance/renewal.
set -eu
umask 077
[ "${RENEWED_LINEAGE:-}" = /etc/letsencrypt/live/media.herong.info ] || exit 0
exec /opt/herong-media-cert/venv/bin/python /opt/herong-media-cert/media_cert.py reconcile \
  --lineage "$RENEWED_LINEAGE"
