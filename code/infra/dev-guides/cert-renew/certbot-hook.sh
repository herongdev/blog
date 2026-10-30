#!/bin/sh
# Configure this absolute path as both Certbot --manual-auth-hook and
# --manual-cleanup-hook, with auth or cleanup as its sole argument.
set -eu
umask 077
case "${1:-}" in
  auth|cleanup) ;;
  *) echo 'expected auth or cleanup' >&2; exit 2 ;;
esac
exec /opt/herong-media-cert/venv/bin/python /opt/herong-media-cert/media_cert.py "$1"
