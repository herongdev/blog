#!/bin/sh
# Install as /opt/herong-media-cert/certbot-cross-account-hook.sh.
set -eu
umask 077
case "${1:-}" in
  auth|cleanup) ;;
  *) echo 'expected auth or cleanup' >&2; exit 2 ;;
esac
exec /opt/herong-media-cert/venv/bin/python /opt/herong-media-cert/media_cert.py "$1" \
  --env-file /etc/herong-media-cert/cloud.env
