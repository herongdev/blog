"""Offline regressions against the actual reviewed Douyin QR methods.

Run with PUBLISHER_SAU_ROOT pointing to the complete reviewed fork projection.
No creator website, browser process, or real account is used.
"""
import asyncio
import base64
import importlib
import os
from pathlib import Path
import struct
import sys
import tempfile
import unittest
from unittest.mock import AsyncMock, patch
import zlib

ROOT = Path(__file__).resolve().parents[1]
os.environ['PUBLISHER_INTEGRATION'] = '1'
sys.path.insert(0, os.environ.get('PUBLISHER_SAU_ROOT', str(ROOT / '.vendor/social-auto-upload')))
douyin = importlib.import_module('uploader.douyin_uploader.main')


def image_src(color):
    """Small valid PNG fixture; the fixture contains no login QR/token."""
    def chunk(kind, payload):
        return struct.pack('!I', len(payload)) + kind + payload + struct.pack('!I', zlib.crc32(kind + payload) & 0xffffffff)
    data = b'\x89PNG\r\n\x1a\n'
    data += chunk(b'IHDR', struct.pack('!2I5B', 64, 64, 8, 2, 0, 0, 0))
    data += chunk(b'IDAT', zlib.compress((b'\0' + bytes(color) * 64) * 64))
    data += chunk(b'IEND', b'')
    return 'data:image/png;base64,' + base64.b64encode(data).decode()


FIRST, SECOND, THIRD = (image_src(color) for color in ((255, 255, 255), (0, 0, 0), (127, 127, 127)))


class Collection:
    def __init__(self, values=()):
        self.values = values
    async def count(self):
        return len(self.values)
    def nth(self, index):
        return self.values[index]
    def locator(self, selector):
        return self


class Image:
    def __init__(self, src, *, visible=True, loaded=True):
        self.src, self.visible, self.loaded = src, visible, loaded
        self.evaluations = 0
    async def is_visible(self):
        return self.visible
    async def evaluate(self, script):
        self.evaluations += 1
        return self.src if self.loaded else ''


class ExpiredControl:
    def __init__(self, action=None):
        self.visible = False
        self.clicks = 0
        self.action = action
    async def is_visible(self):
        return self.visible
    def locator(self, selector):
        return self
    async def click(self, **kwargs):
        self.clicks += 1
        self.visible = False
        if self.action:
            self.action()


class Page:
    def __init__(self, images):
        self.images = images
        self.expired = ExpiredControl()
        self.sms = []
        self.url = 'https://fixture.invalid/login'
    def locator(self, selector):
        return Collection(self.sms if selector.startswith('input') else self.images)
    def get_by_text(self, text, **kwargs):
        if text != '二维码失效':
            raise AssertionError('QR extraction must not wait for a scan-login tab')
        return Collection([self.expired])
    async def wait_for_load_state(self, *args, **kwargs):
        raise AssertionError('QR extraction must not wait for networkidle')


class DouyinQrSyncTests(unittest.IsolatedAsyncioTestCase):
    def setUp(self):
        self.temporary = tempfile.TemporaryDirectory()
        self.addCleanup(self.temporary.cleanup)
        self.directory = Path(self.temporary.name)
        self.environment = patch.dict(os.environ, {'PUBLISHER_INTEGRATION': '1', 'PUBLISHER_RUNTIME_DIR': str(self.directory)})
        self.environment.start()
        self.addCleanup(self.environment.stop)
        self.account = str(self.directory / 'account.json')

    async def test_hidden_first_image_and_unloaded_image_are_not_selected(self):
        hidden = Image(FIRST, visible=False)
        loading = Image(SECOND, loaded=False)
        page = Page([hidden, loading, Image(THIRD)])
        self.assertEqual(await douyin._visible_douyin_qrcode_src(page), THIRD)
        self.assertEqual(hidden.evaluations, 0)

    async def test_expired_overlay_prevents_sending_the_old_image(self):
        page = Page([Image(FIRST)])
        page.expired.visible = True
        self.assertEqual(await douyin._visible_douyin_qrcode_src(page), '')

    async def test_stability_window_restarts_when_the_visible_image_changes(self):
        image = Image(FIRST)
        page = Page([image])
        loop = asyncio.get_running_loop()
        start = loop.time()
        handle = loop.call_later(0.25, setattr, image, 'src', SECOND)
        self.addCleanup(handle.cancel)
        result = await douyin._extract_douyin_qrcode_src(page, timeout=2)
        self.assertEqual(result, SECOND)
        self.assertGreaterEqual(loop.time() - start, 0.75)

    async def test_previous_source_is_not_reemitted_when_refresh_does_not_replace_it(self):
        page = Page([Image(FIRST)])
        callback = AsyncMock()
        with self.assertRaises(douyin.DouyinQrcodeUnavailable):
            await douyin._save_douyin_qrcode(page, self.account, qrcode_callback=callback, previous_src=FIRST, timeout=0.1)
        callback.assert_not_awaited()
        self.assertEqual(list(self.directory.iterdir()), [])

    async def test_integration_sends_original_bytes_without_terminal_decoding(self):
        page = Page([Image(FIRST)])
        callback = AsyncMock()
        with patch.object(douyin, 'decode_qrcode_from_path', side_effect=AssertionError('terminal decode is unnecessary')):
            result = await douyin._save_douyin_qrcode(page, self.account, qrcode_callback=callback)
        self.assertEqual(Path(result['image_path']).read_bytes(), base64.b64decode(FIRST.split(',', 1)[1]))
        self.assertEqual(result['refresh_after_seconds'], 45)
        callback.assert_awaited_once_with(result)

    async def test_changed_source_is_checked_again_immediately_before_callback(self):
        page = Page([Image(SECOND)])
        callback = AsyncMock()
        # Model a replacement between stable extraction and the final DOM read.
        with patch.object(douyin, '_extract_douyin_qrcode_src', new=AsyncMock(side_effect=[FIRST, SECOND])):
            result = await douyin._save_douyin_qrcode(page, self.account, qrcode_callback=callback)
        self.assertEqual(result['image_data_url'], SECOND)
        callback.assert_awaited_once()
        self.assertEqual(len(list(self.directory.glob('*.png'))), 1)

    async def test_callback_failure_and_cancellation_clean_the_new_image(self):
        for error in (RuntimeError('fixture callback failed'), asyncio.CancelledError()):
            with self.subTest(error=type(error).__name__):
                page = Page([Image(FIRST)])
                callback = AsyncMock(side_effect=error)
                with patch.object(douyin, '_extract_douyin_qrcode_src', new=AsyncMock(return_value=FIRST)):
                    with self.assertRaises(type(error)):
                        await douyin._save_douyin_qrcode(page, self.account, qrcode_callback=callback)
                self.assertEqual(list(self.directory.iterdir()), [])

    async def test_automatic_rotation_without_expiry_text_emits_new_image_and_cleans_latest(self):
        image = Image(SECOND)
        page = Page([image])
        old = self.directory / 'initial.png'
        old.write_bytes(b'fixture old image')
        callback = AsyncMock()
        async def completed(_):
            return callback.await_count > 0
        with patch.object(douyin, '_is_douyin_login_completed', new=completed):
            result = await douyin._wait_for_douyin_login(
                page, self.account, {'image_path': str(old), 'image_data_url': FIRST},
                qrcode_callback=callback, poll_interval=0.1, max_checks=20,
            )
        self.assertTrue(result['success'])
        callback.assert_awaited_once()
        self.assertEqual(callback.await_args.args[0]['image_data_url'], SECOND)
        self.assertEqual(page.expired.clicks, 0)
        self.assertEqual(list(self.directory.iterdir()), [])

    async def test_url_change_without_visible_sms_does_not_skip_qr_sync(self):
        page = Page([Image(SECOND)])
        callback = AsyncMock()
        async def completed(_):
            page.url = 'https://fixture.invalid/login-next'
            return callback.await_count > 0
        with patch.object(douyin, '_is_douyin_login_completed', new=completed):
            result = await douyin._wait_for_douyin_login(
                page, self.account, {'image_data_url': FIRST},
                qrcode_callback=callback, poll_interval=0.1, max_checks=20,
            )
        self.assertTrue(result['success'])
        callback.assert_awaited_once()

    async def test_expired_refresh_waits_for_delayed_new_image(self):
        image = Image(FIRST)
        page = Page([image])
        handles = []
        def rotate_later():
            handles.append(asyncio.get_running_loop().call_later(0.2, setattr, image, 'src', SECOND))
        page.expired.action = rotate_later
        page.expired.visible = True
        callback = AsyncMock()
        async def completed(_):
            return callback.await_count > 0
        with patch.object(douyin, '_is_douyin_login_completed', new=completed):
            result = await douyin._wait_for_douyin_login(
                page, self.account, {'image_data_url': FIRST},
                qrcode_callback=callback, poll_interval=0.1, max_checks=20,
            )
        for handle in handles:
            handle.cancel()
        self.assertTrue(result['success'])
        self.assertEqual(page.expired.clicks, 1)
        callback.assert_awaited_once()
        self.assertEqual(callback.await_args.args[0]['image_data_url'], SECOND)

    async def test_visible_security_challenge_never_clicks_refresh(self):
        page = Page([Image(SECOND)])
        page.expired.visible = True
        page.sms = [Image('', visible=True)]
        callback = AsyncMock()
        async def not_complete(_):
            page.url = 'https://fixture.invalid/security-check'
            return False
        with patch.object(douyin, '_is_douyin_login_completed', new=not_complete):
            result = await douyin._wait_for_douyin_login(
                page, self.account, {'image_data_url': FIRST},
                qrcode_callback=callback, poll_interval=0.01, max_checks=1,
            )
        self.assertFalse(result['success'])
        self.assertEqual(page.expired.clicks, 0)
        callback.assert_not_awaited()

    async def test_callback_errors_are_not_swallowed_as_an_image_refresh_timeout(self):
        page = Page([Image(SECOND)])
        with patch.object(douyin, '_is_douyin_login_completed', new=AsyncMock(return_value=False)):
            with self.assertRaisesRegex(RuntimeError, 'fixture callback failed'):
                await douyin._wait_for_douyin_login(
                    page, self.account, {'image_data_url': FIRST},
                    qrcode_callback=AsyncMock(side_effect=RuntimeError('fixture callback failed')),
                    poll_interval=0.1, max_checks=20,
                )
        self.assertEqual(list(self.directory.iterdir()), [])


if __name__ == '__main__':
    unittest.main()
