"""Normal DOM interaction with Douyin's visible identity-verification form.

The caller first establishes that the current login requires verification.
This helper never decides that login succeeded and never sends extra requests.
"""
import asyncio
import re
from urllib.parse import urlsplit


SMS_BUTTON = '.uc-ui-verify_sms-verify_button'
CODE_INPUT = 'input[placeholder*="验证码"], input[autocomplete="one-time-code"]'
SMS_SCOPE = 'xpath=ancestor::*[contains(@class,"uc-ui-verify_sms") and .//input][1]'
ERROR_TEXTS = ('验证码错误', '验证码不正确', '验证码已过期')
SMS_MESSAGE = '抖音需要身份验证，请输入平台发送的短信验证码'


def _trusted_url(url):
    try:
        parsed = urlsplit(url)
        return (parsed.scheme == 'https' and not parsed.username and not parsed.password
                and parsed.port in (None, 443)
                and (parsed.hostname == 'douyin.com' or (parsed.hostname or '').endswith('.douyin.com')))
    except (ValueError, TypeError):
        return False


async def _visible(locator, limit=8):
    result = []
    count = await locator.count()
    if count > limit:
        return result  # Too many matches to establish a unique safe target.
    for index in range(count):
        item = locator.nth(index)
        if await item.is_visible():
            result.append(item)
    return result


class DouyinLoginVerification:
    def __init__(self, bridge):
        self.bridge = bridge
        self.status = 'pending'
        self.attempts = 0
        self._choice_clicked = False
        self._submitted = False
        self._old_errors = ()
        self._blocked = False

    async def _candidates(self, page):
        if not _trusted_url(page.url):
            return []
        candidates = [page]
        main = page.main_frame
        for frame in list(page.frames)[:9]:
            if frame is main or frame is page:
                continue
            if len(candidates) >= 9:
                break
            # Do not read arbitrary third-party iframe contents. Checking the
            # iframe element itself also excludes hidden verification frames.
            if not _trusted_url(frame.url):
                continue
            element = await frame.frame_element()
            if not await element.is_visible():
                continue
            candidates.append(frame)
        return candidates

    async def _find(self, page):
        choice = None
        for frame in await self._candidates(page):
            buttons = await _visible(frame.locator(SMS_BUTTON), 4)
            if len(buttons) == 1:
                button = buttons[0]
                scopes = await _visible(button.locator(SMS_SCOPE), 1)
                if len(scopes) == 1:
                    scope = scopes[0]
                    inputs = await _visible(scope.locator(CODE_INPUT))
                    # Both controls must belong to the known identity SMS
                    # component. A unique input elsewhere in the frame can be
                    # the ordinary phone-login form while this one is loading.
                    if len(inputs) == 1:
                        return (inputs[0], button, scope), choice
            identity = await _visible(frame.get_by_text('身份验证', exact=True), 2)
            options = await _visible(frame.get_by_text('接收短信验证', exact=True), 2)
            if len(identity) == 1 and len(options) == 1:
                choice = options[0]
        return None, choice

    async def _errors(self, scope):
        found = []
        for text in ERROR_TEXTS:
            if await _visible(scope.get_by_text(text), 2):
                found.append(text)
        return tuple(found)

    async def handle(self, page):
        if self._blocked:
            self.status = 'unsupported'
            return self.status
        try:
            form, choice = await asyncio.wait_for(self._find(page), 1)
            if form is None:
                if choice is not None and not self._choice_clicked:
                    # A click timeout may still mean the click happened. Never
                    # click this choice again or automatically resend an SMS.
                    self._choice_clicked = True
                    self.status = 'pending'
                    await choice.click(timeout=750)
                else:
                    self.status = 'pending' if self._choice_clicked else 'unsupported'
                return self.status
            field, button, scope = form
            if self._submitted:
                errors = await asyncio.wait_for(self._errors(scope), 1)
                if not errors:
                    self._old_errors = ()
                    self.status = 'pending'
                    return self.status
                if errors == self._old_errors:
                    self.status = 'pending'
                    return self.status
                # Only a newly observed, fixed verification-error indicator
                # allows another code attempt; a still-visible form does not.
                self._submitted = False
            if self.attempts >= 3:
                self.status = 'failed'
                return self.status
            self.attempts += 1
            code = None
            try:
                code = await self.bridge.hook('challenge', kind='sms', message=SMS_MESSAGE)
                if not isinstance(code, str) or not re.fullmatch(r'\d{4,8}', code):
                    self.status = 'pending'
                    return self.status
                # The user may take time to respond. Recheck the actual form
                # before filling; do not retain a stale iframe/input locator.
                current, _ = await asyncio.wait_for(self._find(page), 1)
                if current is None:
                    self.status = 'unsupported'
                    self._blocked = True
                    return self.status
                field, button, scope = current
                await field.fill(code, timeout=400)
                self._old_errors = await asyncio.wait_for(self._errors(scope), 1)
                # Record intent before clicking, including an ambiguous click
                # timeout. A later tick must observe an error before retrying.
                self._submitted = True
                await button.click(timeout=750)
                self.status = 'handled'
            finally:
                code = None
        except Exception:
            # DOM/platform errors never expose exception text or the code and
            # never close the live browser. Cancellation remains a BaseException.
            self.status = 'pending' if self._submitted or self._choice_clicked else 'unsupported'
        return self.status
