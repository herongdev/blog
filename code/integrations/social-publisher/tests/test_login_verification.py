import asyncio
import contextlib
import io
from pathlib import Path
import sys
import unittest

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from login_verification import CODE_INPUT, SMS_BUTTON, SMS_MESSAGE, SMS_SCOPE, DouyinLoginVerification


class Locator:
    def __init__(self, items=()):
        self.items = list(items)

    async def count(self):
        return len(self.items)

    def nth(self, index):
        return self.items[index]


class Element:
    def __init__(self, frame, kind, visible=True):
        self.frame, self.kind, self.visible = frame, kind, visible
        self.clicks = 0
        self.fills = []
        self.click_error = None

    async def is_visible(self):
        return self.visible

    async def click(self, **options):
        if set(options) != {'timeout'}:
            raise AssertionError('Only a normal timed DOM click is allowed')
        self.clicks += 1
        if self.click_error:
            raise self.click_error

    async def fill(self, value, **options):
        self.fills.append(value)
        if self.frame.clear_error_on_fill:
            self.frame.errors = []

    def locator(self, selector):
        if selector != SMS_SCOPE:
            raise AssertionError('Unknown scope selector')
        return Locator([self.frame.scope] if self.frame.scoped else [])


class Scope:
    def __init__(self, frame):
        self.frame = frame

    async def is_visible(self):
        return True

    def locator(self, selector):
        if selector != CODE_INPUT:
            raise AssertionError('Unknown input selector')
        return Locator(self.frame.fields[:1])

    def get_by_text(self, text):
        return Locator([Element(self.frame, 'error')] if text in self.frame.errors else [])


class Frame:
    def __init__(self, *, sms=False, choice=False, generic=False, scoped=None,
                 url='https://creator.douyin.com/', visible=True):
        self.url, self.visible = url, visible
        self.scoped = sms if scoped is None else scoped
        self.errors = []
        self.clear_error_on_fill = True
        self.scope = Scope(self)
        self.fields = [Element(self, 'code')] if sms or generic else []
        self.buttons = [Element(self, 'verify')] if sms else []
        self.identity = Element(self, 'identity') if choice else None
        self.choice = Element(self, 'choice') if choice else None
        self.main_frame = self
        self.frames = [self]

    async def frame_element(self):
        return Element(self, 'iframe', self.visible)

    def locator(self, selector):
        if selector == SMS_BUTTON:
            return Locator(self.buttons)
        if selector == CODE_INPUT:
            return Locator(self.fields)
        raise AssertionError('Unknown form selector')

    def get_by_text(self, text, exact=False):
        if text == '身份验证':
            return Locator([self.identity] if self.identity else [])
        if text == '接收短信验证':
            return Locator([self.choice] if self.choice else [])
        return Locator([Element(self, 'error')] if text in self.errors else [])


class Bridge:
    def __init__(self, codes=()):
        self.codes = list(codes)
        self.events = []

    async def hook(self, event, **fields):
        self.events.append((event, fields))
        value = self.codes.pop(0)
        if isinstance(value, BaseException):
            raise value
        return value


class LoginVerificationTests(unittest.IsolatedAsyncioTestCase):
    async def test_normal_login_code_field_is_not_a_verification_challenge(self):
        bridge = Bridge()
        flow = DouyinLoginVerification(bridge)
        self.assertEqual(await flow.handle(Frame(generic=True)), 'unsupported')
        self.assertEqual(bridge.events, [])

    async def test_sms_choice_is_clicked_once_without_resending(self):
        page = Frame(choice=True)
        bridge = Bridge()
        flow = DouyinLoginVerification(bridge)
        self.assertEqual(await flow.handle(page), 'pending')
        self.assertEqual(await flow.handle(page), 'pending')
        self.assertEqual(page.choice.clicks, 1)
        self.assertEqual(bridge.events, [])
        # An ambiguous click timeout must not cause a second send/choice click.
        another = Frame(choice=True)
        another.choice.click_error = TimeoutError('PRIVATE_PAGE_DATA')
        second = DouyinLoginVerification(bridge)
        await second.handle(another)
        await second.handle(another)
        self.assertEqual(another.choice.clicks, 1)

    async def test_real_sms_uses_normal_dom_and_waits_for_result(self):
        page = Frame(sms=True)
        bridge = Bridge(['123456'])
        flow = DouyinLoginVerification(bridge)
        self.assertEqual(await flow.handle(page), 'handled')
        self.assertEqual(page.fields[0].fills, ['123456'])
        self.assertEqual(page.buttons[0].clicks, 1)
        for _ in range(4):
            self.assertEqual(await flow.handle(page), 'pending')
        self.assertEqual(len(bridge.events), 1)
        self.assertEqual(bridge.events[0], ('challenge', {'kind': 'sms', 'message': SMS_MESSAGE}))

    async def test_trusted_visible_iframe_is_supported(self):
        page = Frame(generic=True)
        child = Frame(sms=True, url='https://sso.douyin.com/verification/')
        page.frames.append(child)
        flow = DouyinLoginVerification(Bridge(['123456']))
        self.assertEqual(await flow.handle(page), 'handled')
        self.assertEqual(page.fields[0].fills, [])
        self.assertEqual(child.fields[0].fills, ['123456'])

    async def test_unknown_hidden_and_excess_iframes_are_not_read(self):
        for child in (Frame(sms=True, url='https://douyin.com.attacker.invalid/'),
                      Frame(sms=True, visible=False), Frame(sms=True, url='about:blank')):
            page = Frame()
            page.frames.append(child)
            bridge = Bridge()
            self.assertEqual(await DouyinLoginVerification(bridge).handle(page), 'unsupported')
            self.assertEqual(bridge.events, [])
        page = Frame()
        page.frames.extend(Frame() for _ in range(8))
        page.frames.append(Frame(sms=True))
        self.assertEqual(await DouyinLoginVerification(Bridge()).handle(page), 'unsupported')

    async def test_specific_scope_avoids_generic_login_input_and_ambiguous_forms(self):
        page = Frame(sms=True, scoped=False)
        generic = Element(page, 'generic')
        page.fields.append(generic)
        self.assertEqual(await DouyinLoginVerification(Bridge()).handle(page), 'unsupported')
        page.scoped = True
        self.assertEqual(await DouyinLoginVerification(Bridge(['123456'])).handle(page), 'handled')
        self.assertEqual(generic.fills, [])

    async def test_unknown_sms_scope_never_uses_the_sole_ordinary_login_field(self):
        for is_iframe in (False, True):
            with self.subTest(iframe=is_iframe):
                component = Frame(sms=True, scoped=False)
                component.fields[0].kind = 'ordinary-login-code'
                page = Frame() if is_iframe else component
                if is_iframe:
                    page.frames.append(component)
                bridge = Bridge()
                self.assertEqual(await DouyinLoginVerification(bridge).handle(page), 'unsupported')
                self.assertEqual(bridge.events, [])
                self.assertEqual(component.fields[0].fills, [])
                self.assertEqual(component.buttons[0].clicks, 0)

    async def test_only_new_explicit_code_error_allows_maximum_three_attempts(self):
        page = Frame(sms=True)
        bridge = Bridge(['123456', '234567', '345678'])
        flow = DouyinLoginVerification(bridge)
        await flow.handle(page)
        for expected_attempts in (2, 3):
            page.errors = ['验证码错误']
            self.assertEqual(await flow.handle(page), 'handled')
            self.assertEqual(flow.attempts, expected_attempts)
            self.assertEqual(await flow.handle(page), 'pending')
        page.errors = ['验证码已过期']
        self.assertEqual(await flow.handle(page), 'failed')
        self.assertEqual(len(bridge.events), 3)
        self.assertEqual(page.buttons[0].clicks, 3)

    async def test_same_stale_error_does_not_prompt_again(self):
        page = Frame(sms=True)
        page.clear_error_on_fill = False
        bridge = Bridge(['123456', '234567'])
        flow = DouyinLoginVerification(bridge)
        await flow.handle(page)
        page.errors = ['验证码不正确']
        await flow.handle(page)
        for _ in range(3):
            self.assertEqual(await flow.handle(page), 'pending')
        self.assertEqual(len(bridge.events), 2)

    async def test_cancelled_user_challenge_propagates_without_fill(self):
        page = Frame(sms=True)
        flow = DouyinLoginVerification(Bridge([asyncio.CancelledError()]))
        with self.assertRaises(asyncio.CancelledError):
            await flow.handle(page)
        self.assertEqual(page.fields[0].fills, [])
        self.assertEqual(page.buttons[0].clicks, 0)

    async def test_bad_code_and_private_errors_never_leave_the_bridge(self):
        for value in ('PRIVATE_CODE', RuntimeError('PRIVATE_CODE')):
            page = Frame(sms=True)
            bridge = Bridge([value])
            flow = DouyinLoginVerification(bridge)
            output = io.StringIO()
            with contextlib.redirect_stdout(output), contextlib.redirect_stderr(output):
                await flow.handle(page)
            self.assertEqual(output.getvalue(), '')
            self.assertNotIn('PRIVATE_CODE', repr(bridge.events))
            self.assertEqual(page.fields[0].fills, [])


if __name__ == '__main__':
    unittest.main()
