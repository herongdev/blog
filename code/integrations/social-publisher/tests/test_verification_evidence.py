import asyncio
import base64
import json
from pathlib import Path
import stat
import sys
import tempfile
from types import SimpleNamespace
import unittest
from unittest.mock import AsyncMock
from uuid import uuid4

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from verification_evidence import CODE_INPUT, MASK, MAX_PNG, SMS_BUTTON, TEXT_MARKERS, VerificationEvidence

PNG = base64.b64decode('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=')


class Locator:
    def __init__(self, visible=()):
        self.visible = tuple(visible)

    async def count(self):
        return len(self.visible)

    def nth(self, index):
        return SimpleNamespace(is_visible=AsyncMock(return_value=self.visible[index]))


class Frame:
    def __init__(self, url='https://creator.douyin.com/?token=PRIVATE_TOKEN', *, visible=True, trusted=True):
        self.url, self.visible, self.trusted = url, visible, trusted
        self.texts = {'身份验证': (True,), '接收短信验证': (True,)}
        self.selectors = {SMS_BUTTON: (False, True), CODE_INPUT: (True,)}
        self.reads = []
        self.mask_error = None

    async def frame_element(self):
        return SimpleNamespace(is_visible=AsyncMock(return_value=self.visible))

    def get_by_text(self, text, *, exact):
        if not self.trusted:
            raise AssertionError('Unknown iframe contents must not be read')
        if not exact or text not in TEXT_MARKERS.values():
            raise AssertionError('Only fixed text markers may be read')
        self.reads.append(('text', text))
        return Locator(self.texts.get(text, ()))

    def locator(self, selector):
        if selector == MASK:
            if self.mask_error:
                raise self.mask_error
            return ('mask', id(self), selector)
        if not self.trusted:
            raise AssertionError('Unknown iframe contents must not be read')
        if selector not in (SMS_BUTTON, CODE_INPUT):
            raise AssertionError('Only fixed selectors may be read')
        self.reads.append(('selector', selector))
        return Locator(self.selectors.get(selector, ()))


class Page:
    def __init__(self, frame=None):
        self.main_frame = frame or Frame()
        self.url = self.main_frame.url
        self.frames = [self.main_frame]
        self.context = SimpleNamespace(pages=[self])
        self.screenshot = AsyncMock(return_value=PNG)


class VerificationEvidenceTests(unittest.IsolatedAsyncioTestCase):
    def setUp(self):
        temporary = tempfile.TemporaryDirectory()
        self.addCleanup(temporary.cleanup)
        # macOS /var is a system symlink; pass the actual private directory so
        # the production rule can continue rejecting symlink path components.
        self.root = Path(temporary.name).resolve()
        (self.root / 'accounts').mkdir()
        self.session = str(uuid4())
        self.bridge = SimpleNamespace(request={'session_id': self.session,
            'account_file': str(self.root / 'accounts' / (str(uuid4()) + '.json'))}, emit=lambda *a, **kw: self.fail('No public protocol events allowed'))

    def paths(self, tag='start'):
        stem = self.root / 'diagnostics' / f'{self.session}-verification-{tag}'
        return stem.with_suffix('.json'), stem.with_suffix('.png')

    async def test_private_bounded_metadata_and_masked_png_exclude_auth_material(self):
        page = Page()
        unknown = Frame('https://verify.example.invalid/path?ticket=PRIVATE_TICKET', trusted=False)
        hidden = Frame('https://sso.douyin.com/?code=PRIVATE_CODE', visible=False)
        page.frames.extend([unknown, hidden])
        evidence = VerificationEvidence(self.bridge)
        self.assertIsNone(await evidence.capture(page, 'start'))
        metadata, screenshot = self.paths()
        data = json.loads(metadata.read_text())
        self.assertEqual(set(data), {'version', 'tag', 'pages', 'collectionIncomplete', 'screenshotSaved'})
        self.assertEqual(data['pages'][0]['host'], 'creator.douyin.com')
        frames = data['pages'][0]['frames']
        self.assertEqual(frames[0]['smsButtons'], {'count': 2, 'visible': True})
        self.assertEqual(frames[0]['codeInputs'], {'count': 1, 'visible': True})
        self.assertTrue(frames[0]['textVisible']['identity'])
        self.assertEqual(frames[1], {'host': 'verify.example.invalid', 'visible': True})
        self.assertEqual(frames[2], {'host': 'sso.douyin.com', 'visible': False})
        self.assertEqual(unknown.reads, [])
        self.assertEqual(hidden.reads, [])
        for secret in ('PRIVATE_', 'token=', 'ticket=', '/path', 'account_file', 'sessionid'):
            self.assertNotIn(secret, metadata.read_text())
        self.assertEqual(screenshot.read_bytes(), PNG)
        self.assertEqual(stat.S_IMODE(metadata.stat().st_mode), 0o600)
        self.assertEqual(stat.S_IMODE(screenshot.stat().st_mode), 0o600)
        self.assertEqual(stat.S_IMODE(metadata.parent.stat().st_mode), 0o700)
        options = page.screenshot.call_args.kwargs
        self.assertEqual(options['mask_color'], '#333333')
        self.assertEqual(options['full_page'], False)
        self.assertEqual(options['timeout'], 2500)
        self.assertEqual(options['mask'], [('mask', id(frame), MASK) for frame in page.frames])

    async def test_page_and_frame_counts_are_bounded_and_large_frame_sets_have_no_png(self):
        pages = [Page() for _ in range(5)]
        pages[0].frames.extend(Frame() for _ in range(15))
        pages[0].context.pages = pages
        await VerificationEvidence(self.bridge).capture(pages[0], 'start')
        metadata, screenshot = self.paths()
        data = json.loads(metadata.read_text())
        self.assertEqual(len(data['pages']), 3)
        self.assertEqual(len(data['pages'][0]['frames']), 12)
        self.assertFalse(data['screenshotSaved'])
        self.assertFalse(screenshot.exists())
        pages[0].screenshot.assert_not_awaited()

    async def test_tags_are_fixed_once_even_for_a_second_collector_instance(self):
        page = Page()
        evidence = VerificationEvidence(self.bridge)
        for tag in ('../outside', 'START', None, ['start']):
            await evidence.capture(page, tag)
        page.screenshot.assert_not_awaited()
        await evidence.capture(page, 'start')
        await evidence.capture(page, 'start')
        await evidence.capture(page, 'unmatched')
        await evidence.capture(page, 'unmatched')
        await VerificationEvidence(self.bridge).capture(page, 'start')
        self.assertEqual(page.screenshot.await_count, 2)
        self.assertEqual(len(list((self.root / 'diagnostics').iterdir())), 4)

    async def test_invalid_session_or_account_path_is_a_fast_noop(self):
        for change in ({'session_id': '../../outside'}, {'session_id': str(uuid4()).upper()},
                       {'account_file': str(self.root / 'account.json')},
                       {'account_file': 'relative/accounts/account.json'},
                       {'account_file': str(self.root / '..' / self.root.name / 'accounts/a.json')}):
            with self.subTest(change=change):
                page = Page()
                bridge = SimpleNamespace(request={**self.bridge.request, **change})
                await VerificationEvidence(bridge).capture(page, 'start')
                page.screenshot.assert_not_awaited()
        self.assertFalse((self.root / 'diagnostics').exists())

    async def test_symlink_directory_account_ancestor_and_destination_are_refused(self):
        outside = self.root / 'outside'
        outside.mkdir()
        diagnostics = self.root / 'diagnostics'
        diagnostics.symlink_to(outside, target_is_directory=True)
        page = Page()
        await VerificationEvidence(self.bridge).capture(page, 'start')
        self.assertEqual(list(outside.iterdir()), [])
        page.screenshot.assert_not_awaited()
        diagnostics.unlink()
        (self.root / 'accounts').rmdir()
        (self.root / 'accounts').symlink_to(outside, target_is_directory=True)
        await VerificationEvidence(self.bridge).capture(page, 'start')
        self.assertFalse(diagnostics.exists())
        (self.root / 'accounts').unlink()
        (self.root / 'accounts').mkdir()
        diagnostics.mkdir()
        target = outside / 'keep.txt'
        target.write_text('preserve')
        metadata, _ = self.paths()
        metadata.symlink_to(target)
        await VerificationEvidence(self.bridge).capture(page, 'start')
        self.assertEqual(target.read_text(), 'preserve')
        self.assertTrue(metadata.is_symlink())
        page.screenshot.assert_not_awaited()
        metadata.unlink()
        alias = self.root / 'alias'
        alias.symlink_to(self.root, target_is_directory=True)
        request = {**self.bridge.request, 'account_file': str(alias / 'accounts/a.json')}
        await VerificationEvidence(SimpleNamespace(request=request)).capture(page, 'start')
        page.screenshot.assert_not_awaited()

    async def test_failed_masks_or_bad_png_never_fall_back_to_unmasked_screenshot(self):
        for tag, bad in (('start', b'not a png'), ('unmatched', b'\x89PNG\r\n\x1a\n' + b'x' * MAX_PNG)):
            page = Page()
            page.screenshot.return_value = bad
            await VerificationEvidence(self.bridge).capture(page, tag)
            metadata, screenshot = self.paths(tag)
            self.assertFalse(json.loads(metadata.read_text())['screenshotSaved'])
            self.assertFalse(screenshot.exists())
        for path in (self.root / 'diagnostics').iterdir():
            path.unlink()
        page = Page()
        child = Frame('https://verify.example.invalid/', trusted=False)
        child.mask_error = RuntimeError('PRIVATE_MASK_ERROR')
        page.frames.append(child)
        await VerificationEvidence(self.bridge).capture(page, 'start')
        metadata, screenshot = self.paths()
        self.assertFalse(screenshot.exists())
        self.assertNotIn('PRIVATE_', metadata.read_text())
        page.screenshot.assert_not_awaited()

    async def test_untrusted_root_does_not_read_dom_or_capture_image(self):
        page = Page(Frame('https://douyin.com.attacker.invalid/?token=PRIVATE_TOKEN', trusted=False))
        await VerificationEvidence(self.bridge).capture(page, 'start')
        metadata, screenshot = self.paths()
        self.assertFalse(screenshot.exists())
        self.assertEqual(json.loads(metadata.read_text())['pages'][0]['frames'],
                         [{'host': 'douyin.com.attacker.invalid', 'visible': True}])
        self.assertEqual(page.main_frame.reads, [])
        page.screenshot.assert_not_awaited()

    async def test_capture_failure_is_private_and_cancelled_error_propagates(self):
        page = Page()
        page.screenshot.side_effect = RuntimeError('PRIVATE_COOKIE_ERROR')
        await VerificationEvidence(self.bridge).capture(page, 'start')
        metadata, screenshot = self.paths()
        self.assertFalse(screenshot.exists())
        self.assertNotIn('PRIVATE_', metadata.read_text())
        page.screenshot.side_effect = asyncio.CancelledError()
        with self.assertRaises(asyncio.CancelledError):
            await VerificationEvidence(self.bridge).capture(page, 'unmatched')
        self.assertFalse(self.paths('unmatched')[0].exists())
        self.assertEqual(list((self.root / 'diagnostics').glob('*.tmp')), [])

    async def test_cancellation_during_frame_collection_is_not_swallowed(self):
        page = Page()
        def cancelled(*args, **kwargs):
            raise asyncio.CancelledError()
        page.main_frame.get_by_text = cancelled
        with self.assertRaises(asyncio.CancelledError):
            await VerificationEvidence(self.bridge).capture(page, 'start')
        page.screenshot.assert_not_awaited()
        self.assertFalse(self.paths()[0].exists())


if __name__ == '__main__':
    unittest.main()
