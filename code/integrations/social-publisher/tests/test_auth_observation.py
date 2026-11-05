"""Read-only auth diagnostics: strict metadata, unchanged login decisions."""
import io
import json
from pathlib import Path
import sys
import tempfile
from types import SimpleNamespace
import unittest
from unittest.mock import AsyncMock, patch

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))
import runner


class Locator:
    def __init__(self, visible=()):
        self.visible = visible
        self.inspected = []
    async def count(self):
        return len(self.visible)
    def nth(self, index):
        self.inspected.append(index)
        return SimpleNamespace(is_visible=AsyncMock(return_value=self.visible[index]))


class Page:
    def __init__(self, url='https://creator.douyin.com/?token=PRIVATE_URL'):
        self.url = url
        self.flags = {}
        self.context = SimpleNamespace(pages=[self], cookies=AsyncMock(return_value=[]))
    def get_by_text(self, text, **kwargs):
        key = text if isinstance(text, str) else 'scan_confirmation'
        return self.flags.get(key, Locator())
    def get_by_role(self, role, **kwargs):
        return self.flags.get((role, kwargs.get('name')), Locator())
    def locator(self, selector):
        if 'autocomplete' in selector:
            if 'input[type="tel"]' in selector or '手机号' in selector:
                raise AssertionError('A telephone field is not a verification code')
            return self.flags.get('code_input', Locator())
        return self.flags.get('captcha', Locator())


class AuthObservationTests(unittest.IsolatedAsyncioTestCase):
    def setUp(self):
        temporary = tempfile.TemporaryDirectory()
        self.addCleanup(temporary.cleanup)
        self.output = io.StringIO()
        self.bridge = runner.Bridge({'data_dir': temporary.name, 'platform': 'douyin', 'operation': 'login', 'account_file': str(Path(temporary.name) / 'private-account.json')}, self.output)

    def observations(self):
        return [json.loads(line)['observation'] for line in self.output.getvalue().splitlines() if json.loads(line)['type'] == 'auth_observation']

    async def test_metadata_has_exact_schema_without_auth_material(self):
        page = Page()
        page.flags = {'扫码登录': Locator([False, True]), 'scan_confirmation': Locator([True]), 'code_input': Locator([True]), 'captcha': Locator([True]), ('button', '发布视频'): Locator([False, True])}
        page.context.cookies.return_value = [{'name': 'sessionid', 'value': 'PRIVATE_COOKIE'}, {'name': 'PRIVATE_COOKIE_NAME', 'value': 'PRIVATE_COOKIE_VALUE'}]
        checker = runner._observed_douyin_checker(self.bridge, AsyncMock(return_value=False))
        self.assertIs(await checker(page), False)
        observation, = self.observations()
        self.assertEqual(set(observation), {'checkerResult', 'pageCount', 'pages', 'observationUnavailable'})
        self.assertEqual(observation['pages'], [{'route': 'creator_root', 'hasSessionCookie': True, 'any_visible_login_marker': True, 'scan_confirmation_visible': True, 'visible_code_input': True, 'captcha_visible': True, 'creator_publish_control': True}])
        for value in ('PRIVATE_URL', 'PRIVATE_COOKIE', 'PRIVATE_COOKIE_NAME', 'private-account.json', 'creator.douyin.com'):
            self.assertNotIn(value, self.output.getvalue())
        page.context.cookies.assert_awaited_once_with('https://creator.douyin.com/')

    async def test_existing_pages_and_locator_inspection_are_bounded(self):
        page = Page()
        candidates = [page, Page('https://creator.douyin.com/creator-micro/home?private=VALUE'), Page('https://private.example/?token=SECRET'), Page()]
        page.context.pages = candidates
        for candidate in candidates:
            candidate.context = page.context
        marker = Locator([False] * 8 + [True])
        page.flags['扫码登录'] = marker
        result = await runner._douyin_auth_observation(page, False)
        self.assertEqual(result['pageCount'], 3)
        self.assertEqual([value['route'] for value in result['pages']], ['creator_root', 'creator_micro', 'other'])
        self.assertFalse(result['pages'][0]['any_visible_login_marker'])
        self.assertEqual(marker.inspected, list(range(8)))
        self.assertNotIn('SECRET', json.dumps(result))

    async def test_spoofed_host_and_route_are_never_classified_as_creator(self):
        for url in ('https://creator.douyin.com.attacker.invalid/creator-micro', 'https://creator.douyin.com/creator-micro-fake', 'http://creator.douyin.com/creator-micro'):
            with self.subTest(url=url):
                observation = await runner._douyin_auth_observation(Page(url), True)
                self.assertEqual(observation['pages'][0]['route'], 'other')

    async def test_emits_only_state_changes_and_preserves_original_checker_result(self):
        page = Page()
        original = AsyncMock(side_effect=[False, False, True])
        checker = runner._observed_douyin_checker(self.bridge, original)
        self.assertIs(await checker(page), False)
        self.assertIs(await checker(page), False)
        page.url = 'https://creator.douyin.com/creator-micro/home'
        self.assertIs(await checker(page), True)
        self.assertEqual(len(self.observations()), 2)
        self.assertEqual([value['checkerResult'] for value in self.observations()], [False, True])
        self.assertEqual(original.await_count, 3)

    async def test_collection_failure_never_changes_result_or_exposes_exception(self):
        page = Page()
        page.context.cookies.side_effect = RuntimeError('PRIVATE_EXCEPTION_COOKIE_URL')
        checker = runner._observed_douyin_checker(self.bridge, AsyncMock(return_value=True))
        self.assertIs(await checker(page), True)
        self.assertIs(await checker(page), True)
        self.assertEqual(self.observations(), [{'checkerResult': True, 'pageCount': 0, 'pages': [], 'observationUnavailable': True}])
        self.assertNotIn('PRIVATE_EXCEPTION', self.output.getvalue())

    async def test_event_write_failure_does_not_change_checker_result(self):
        checker = runner._observed_douyin_checker(self.bridge, AsyncMock(return_value=True))
        with patch.object(self.bridge, 'emit', side_effect=RuntimeError('closed diagnostics')):
            self.assertIs(await checker(Page()), True)

    async def test_slow_observation_has_a_two_second_budget_without_changing_result(self):
        async def timed_out(awaitable, *, timeout):
            self.assertEqual(timeout, 2)
            awaitable.close()
            raise TimeoutError('PRIVATE_STALLED_PAGE')
        checker = runner._observed_douyin_checker(self.bridge, AsyncMock(return_value=True))
        with patch.object(runner.asyncio, 'wait_for', new=timed_out):
            self.assertIs(await checker(Page()), True)
        self.assertTrue(self.observations()[0]['observationUnavailable'])
        self.assertNotIn('PRIVATE_STALLED_PAGE', self.output.getvalue())

    async def test_original_checker_exception_propagates_without_fabricated_observation(self):
        checker = runner._observed_douyin_checker(self.bridge, AsyncMock(side_effect=RuntimeError('original failure')))
        with self.assertRaisesRegex(RuntimeError, 'original failure'):
            await checker(Page())
        self.assertEqual(self.observations(), [])

    async def test_login_wrapper_is_restored_after_success_and_setup_failure(self):
        for fail in (False, True):
            with self.subTest(fail=fail):
                original = AsyncMock(return_value=False)
                module = SimpleNamespace(_is_douyin_login_completed=original)
                async def setup(*args, **kwargs):
                    self.assertIsNot(module._is_douyin_login_completed, original)
                    self.assertIs(await module._is_douyin_login_completed(Page()), False)
                    if fail:
                        raise RuntimeError('PRIVATE_SETUP_FAILURE')
                    return {'success': True}
                module.douyin_setup = setup
                with patch.object(runner.importlib, 'import_module', return_value=module):
                    result = await runner.browser_operation(self.bridge)
                self.assertIs(module._is_douyin_login_completed, original)
                self.assertEqual(result['status'], 'failed' if fail else 'completed')

    async def test_check_and_other_platforms_are_not_wrapped(self):
        for platform, operation in (('douyin', 'check'), ('xiaohongshu', 'login'), ('tencent', 'login')):
            with self.subTest(platform=platform, operation=operation):
                original = AsyncMock(return_value=False)
                module = SimpleNamespace(_is_douyin_login_completed=original)
                async def setup(*args, **kwargs):
                    self.assertIs(module._is_douyin_login_completed, original)
                    return {'success': True}
                setattr(module, runner.PLATFORMS[platform][1], setup)
                self.bridge.request.update(platform=platform, operation=operation)
                Path(self.bridge.request['account_file']).write_text('{}')
                with patch.object(runner.importlib, 'import_module', return_value=module):
                    await runner.browser_operation(self.bridge)
                self.assertIs(module._is_douyin_login_completed, original)
        self.assertEqual(self.observations(), [])


if __name__ == '__main__':
    unittest.main()
