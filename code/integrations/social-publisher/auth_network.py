"""Bounded, credential-free evidence from the creator page's own QR polling."""
import asyncio
import json
import os
from pathlib import Path
import time
from urllib.parse import urlsplit
from uuid import UUID, uuid4

STATES = {'new', 'scanned', 'scaned', 'confirmed', 'success', 'expired', 'canceled', 'error'}


def polling_state(url, http_status, body):
    parsed = urlsplit(url)
    if parsed.scheme != 'https' or not (parsed.hostname == 'douyin.com' or (parsed.hostname or '').endswith('.douyin.com')):
        return None
    if not parsed.path.rstrip('/').endswith('/check_qrconnect'):
        return None
    data = body.get('data') if isinstance(body, dict) else None
    if not isinstance(data, dict):
        return None
    code = data.get('error_code')
    state = data.get('status')
    return {
        'state': state if isinstance(state, str) and state in STATES else 'other',
        'http': http_status if type(http_status) is int and 100 <= http_status <= 599 else 0,
        'errorCode': code if type(code) is int and abs(code) < 10**9 else None,
        'hasCaptcha': bool(data.get('captcha')),
        'hasRedirect': bool(data.get('redirect_url') or data.get('desc_url')),
        'hasTicket': bool(data.get('ticket')),
    }


def polling_failure(value):
    """Classify a platform response without deciding whether login must stop.

    ``value`` is the bounded result of ``polling_state``. A platform error code
    is evidence of an unsuccessful request, not evidence of an invalid account
    or a terminal refusal. The verification classification is advisory: the
    caller must keep the live browser available and inspect its actual state.
    """
    if not isinstance(value, dict):
        return None
    code = value.get('errorCode')
    if type(code) is not int or code == 0 or abs(code) >= 10**9:
        return None
    return {
        'state': 'verification_required' if code == 2046 else 'platform_error',
        'platformErrorCode': code,
        'message': f'抖音登录尚未完成（平台错误码 {code}），请在平台页面查看登录要求',
    }


class LoginNetworkObservation:
    def __init__(self, bridge):
        self.bridge = bridge
        self.pages = set()
        self.transitions = []
        # Advisory only. Observation callbacks never stop the live browser,
        # decide authentication status, or cancel the login task.
        self.failure = None
        self.started = time.monotonic()
        self.path = None
        session = bridge.request.get('session_id', '')
        account = Path(bridge.request['account_file'])
        try:
            if str(UUID(session)) == session and account.parent.name == 'accounts':
                self.path = account.parent.parent / 'diagnostics' / f'{session}-network.json'
        except (ValueError, TypeError, AttributeError):
            pass

    def attach(self, page):
        if id(page) in self.pages:
            return
        self.pages.add(id(page))
        page.on('response', self.response)

    async def response(self, response):
        try:
            # Inspect only the existing page's QR status response, never issue
            # additional authentication requests or capture response bodies.
            parsed = urlsplit(response.url)
            if not parsed.path.rstrip('/').endswith('/check_qrconnect'):
                return
            value = polling_state(response.url, response.status, await asyncio.wait_for(response.json(), 2))
            if value is None:
                return
            failure = polling_failure(value)
            # Once the platform starts identity verification, later QR errors
            # belong to the QR behind that dialog. They must not unlock its UI
            # or return control to QR renewal before this login ends.
            verifying = self.failure and self.failure['state'] == 'verification_required'
            if failure is not None and not verifying:
                self.failure = failure
            value['qrVersion'] = self.bridge.qr_version
            if self.transitions and all(self.transitions[-1].get(k) == v for k, v in value.items()):
                return
            self.transitions.append({**value, 'elapsedSeconds': round(time.monotonic() - self.started, 1)})
            self.transitions = self.transitions[-12:]
            if self.failure and self.failure['state'] == 'verification_required':
                pass  # Later QR messages cannot replace the active verification UI.
            elif value['state'] in ('scanned', 'scaned'):
                self.bridge.emit('stage', stage='waiting_confirmation')
            elif value['state'] in ('confirmed', 'success'):
                self.bridge.emit('stage', stage='verifying')
            self.save()
        except Exception:
            pass  # Failed evidence collection cannot change a login decision.

    def save(self):
        if self.path is None:
            return
        directory = self.path.parent
        directory.mkdir(mode=0o700, parents=True, exist_ok=True)
        if directory.is_symlink():
            return
        temporary = directory / f'.network-{uuid4().hex}.tmp'
        try:
            fd = os.open(temporary, os.O_WRONLY | os.O_CREAT | os.O_EXCL | os.O_NOFOLLOW, 0o600)
            with os.fdopen(fd, 'w') as output:
                json.dump({'version': 1, 'transitions': self.transitions}, output)
            os.replace(temporary, self.path)
        finally:
            temporary.unlink(missing_ok=True)
