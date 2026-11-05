// This is a conservative refresh window. It does not describe a platform-guaranteed QR lifetime.
export function loginQrExpiresAt(session, event, at = Date.now()) {
  const maximum = Date.parse(session.expires_at);
  let expires;
  if (session.platform === 'douyin') {
    const supplied = event.refresh_after_seconds;
    const seconds = typeof supplied === 'number' && Number.isFinite(supplied) ? Math.min(45, Math.max(1, supplied)) : 45;
    expires = at + seconds * 1000;
  } else {
    expires = Date.parse(event.expires_at) || at + 5 * 60_000;
  }
  return new Date(Number.isFinite(maximum) ? Math.min(maximum, expires) : at).toISOString();
}

export function hasCurrentLoginQr(session, at = Date.now()) {
  const expires = Date.parse(session.qr_expires_at ?? '');
  return Boolean(session.qr_path && ['running', 'waiting_user'].includes(session.status) && Number.isFinite(expires) && expires > at);
}
