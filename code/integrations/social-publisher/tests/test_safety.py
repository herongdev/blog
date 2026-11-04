"""Offline regressions for actual patched methods; never visit creator websites."""
import asyncio
import importlib.util
import io
import json
import os
import sqlite3
import time
from pathlib import Path
import sys
import tempfile
from types import SimpleNamespace
import unittest
from unittest.mock import AsyncMock

ROOT = Path(__file__).resolve().parents[1]
os.environ['PUBLISHER_INTEGRATION'] = '1'
os.environ['PUBLISHER_DATA_DIR'] = tempfile.gettempdir()
sys.path.insert(0, os.environ.get('PUBLISHER_SAU_ROOT', str(ROOT / '.vendor/social-auto-upload')))
sys.path.insert(0, str(ROOT))
from runner import Bridge, SafeError
from local_login import LoginLease
from utils.publishing_hooks import submit_once, save_storage_state
from uploader.xiaohongshu_uploader.main import XiaoHongShuVideo
from uploader.tencent_uploader.main import TencentVideo
from uploader.douyin_uploader.main import DouYinVideo


class ProtocolTests(unittest.IsolatedAsyncioTestCase):
    async def test_static_script_is_loaded_from_source_not_private_runtime(self):
        import utils.base_social_media as base
        with tempfile.TemporaryDirectory() as directory:
            context = SimpleNamespace(add_init_script=AsyncMock())
            self.assertEqual(list(Path(directory).iterdir()), [])
            # The module must work while BASE_DIR is a per-operation private
            # directory, with no utils/ or other source files copied into it.
            previous = getattr(base, 'BASE_DIR', None)
            base.BASE_DIR = Path(directory)
            try:
                self.assertIs(await base.set_init_script(context), context)
            finally:
                if previous is None: del base.BASE_DIR
                else: base.BASE_DIR = previous
            path = context.add_init_script.await_args.kwargs['path']
            self.assertEqual(path, Path(base.__file__).resolve().with_name('stealth.min.js'))
            self.assertTrue(path.is_file())
            self.assertEqual(list(Path(directory).iterdir()), [])
    async def test_wrong_challenge_cannot_authorize_submission(self):
        with tempfile.TemporaryDirectory() as directory:
            output = io.StringIO()
            bridge = Bridge({'data_dir': directory}, output)
            reader = asyncio.StreamReader()
            controls = asyncio.create_task(bridge.controls(reader))
            action = asyncio.create_task(bridge.hook('before_submit'))
            await asyncio.sleep(0)
            event = json.loads(output.getvalue())
            reader.feed_data((json.dumps({'type': 'challenge_response', 'challenge_id': event['request_id'], 'authorized': True})+'\n').encode())
            await asyncio.sleep(0)
            self.assertFalse(action.done(), 'challenge response must not authorize publishing')
            reader.feed_data((json.dumps({'type': 'submit_authorized', 'request_id': event['request_id'], 'authorized': False})+'\n').encode())
            with self.assertRaises(SafeError): await action
            self.assertFalse(bridge.submission_possible)
            reader.feed_eof(); await controls
    async def test_atomic_storage_preserves_prior_session_on_failed_save(self):
        with tempfile.TemporaryDirectory() as directory:
            destination = Path(directory) / 'account.json'
            destination.write_text('{"old":true}')
            async def interrupted(path):
                Path(path).write_text('{')
                raise RuntimeError('crash')
            with self.assertRaises(RuntimeError):
                await save_storage_state(SimpleNamespace(storage_state=interrupted), destination)
            self.assertEqual(json.loads(destination.read_text()), {'old': True})
            self.assertEqual(list(Path(directory).glob('*.tmp')), [])
    async def test_original_does_not_choose_repost_or_default_ai(self):
        page = SimpleNamespace(get_by_text=lambda *a, **k: self.fail('declaration must not touch page'))
        xhs = XiaoHongShuVideo('标题', 'video.mp4', [], 0, 'account.json')
        xhs.content_origin = 'original'
        await xhs.check_original_declaration(page)
        tencent = TencentVideo('标题', 'video.mp4', [], 0, 'account.json')
        await tencent.apply_original_statement(page)
        douyin = DouYinVideo('标题', 'video.mp4', [], 0, 'account.json')
        await douyin.apply_self_declaration(page)
    async def test_explicit_repost_without_source_stops_before_page(self):
        xhs = XiaoHongShuVideo('标题', 'video.mp4', [], 0, 'account.json')
        xhs.content_origin = 'repost'
        with self.assertRaises(ValueError): await xhs.check_original_declaration(None)
    async def test_requested_cover_failure_is_not_silently_ignored(self):
        xhs = XiaoHongShuVideo('标题', 'video.mp4', [], 0, 'account.json')
        with self.assertRaises(RuntimeError): await xhs.set_thumbnail(None, 'cover.png')
        tencent = TencentVideo('标题', 'video.mp4', [], 0, 'account.json')
        tencent.open_thumbnail_dialog = AsyncMock(return_value=None)
        with self.assertRaises(RuntimeError):
            await tencent.set_single_thumbnail(None, 'cover.png', [], [], 'portrait')


class LocalLoginLeaseTests(unittest.TestCase):
    def setUp(self):
        self.temporary = tempfile.TemporaryDirectory()
        self.root = Path(self.temporary.name)
        db = sqlite3.connect(self.root / 'publishing.sqlite')
        db.executescript("""CREATE TABLE accounts(id TEXT,payload TEXT);
          CREATE TABLE executor(id INTEGER,owner TEXT,expires INTEGER);
          INSERT INTO executor VALUES(1,NULL,0);
          CREATE TABLE sessions(id TEXT,account_id TEXT,status TEXT,created_at TEXT,payload TEXT);
          CREATE TABLE targets(id TEXT,account_id TEXT,status TEXT,payload TEXT);""")
        db.execute('INSERT INTO accounts VALUES(?,?)',('account',json.dumps({'platform':'bilibili'})))
        db.commit(); db.close()
    def tearDown(self): self.temporary.cleanup()
    def test_active_host_lease_blocks_local_login(self):
        lease = LoginLease(self.root,'account')
        lease.db.execute('UPDATE executor SET owner=?,expires=?',('host',int(time.time()*1000)+30000))
        with self.assertRaisesRegex(RuntimeError,'执行槽'): lease.acquire()
        self.assertEqual(lease.db.execute('SELECT count(*) FROM sessions').fetchone()[0],0)
        lease.close()
    def test_local_login_holds_slot_until_stop(self):
        lease = LoginLease(self.root,'account'); lease.acquire()
        second = LoginLease(self.root,'account')
        with self.assertRaises(RuntimeError): second.acquire()
        lease.heartbeat(); lease.finish(True)
        self.assertEqual(lease.db.execute('SELECT owner FROM executor').fetchone()[0],None)
        self.assertEqual(lease.db.execute('SELECT status FROM sessions').fetchone()[0],'completed')
        second.close(); lease.close()
    def test_lost_lease_does_not_replace_session(self):
        lease=LoginLease(self.root,'account'); lease.acquire()
        old=self.root/'account.json'; old.write_text('{"old":true}')
        new=self.root/'new.json'; new.write_text('{"new":true}')
        lease.db.execute('UPDATE executor SET owner=?',('replacement',))
        with self.assertRaises(RuntimeError): lease.save(new,old)
        self.assertEqual(json.loads(old.read_text()),{'old':True})
        lease.close()


class BrowserFixtureTests(unittest.IsolatedAsyncioTestCase):
    async def asyncSetUp(self):
        from patchright.async_api import async_playwright
        self.playwright = await async_playwright().start()
        self.browser = await self.playwright.chromium.launch(headless=True, channel='chromium')
        self.page = await self.browser.new_page()
        await self.page.route('**/*', lambda route: route.abort())
    async def asyncTearDown(self):
        await self.browser.close(); await self.playwright.stop()
    async def test_denied_authorization_never_clicks(self):
        await self.page.set_content('<button onclick="document.body.dataset.clicks=Number(document.body.dataset.clicks||0)+1">发布</button>')
        async def denied(*a, **k): raise SafeError('DENIED', 'denied')
        uploader = SimpleNamespace(integration_hooks=denied)
        with self.assertRaises(SafeError):
            await submit_once(uploader, self.page, self.page.get_by_role('button'), timeout_seconds=0.1)
        self.assertEqual(await self.page.evaluate('Number(document.body.dataset.clicks||0)'), 0)
    async def test_lost_result_clicks_once_and_never_reports_acceptance(self):
        await self.page.set_content('<button onclick="document.body.dataset.clicks=Number(document.body.dataset.clicks||0)+1;this.remove()">发表</button>')
        uploader = SimpleNamespace(integration_hooks=AsyncMock())
        with self.assertRaisesRegex(RuntimeError, 'SUBMISSION_UNKNOWN'):
            await submit_once(uploader, self.page, self.page.get_by_role('button'), timeout_seconds=0.1)
        self.assertEqual(await self.page.evaluate('Number(document.body.dataset.clicks||0)'), 1)
        self.assertFalse(hasattr(uploader, 'publish_evidence'))
        with self.assertRaisesRegex(RuntimeError, '禁止重复提交'):
            await submit_once(uploader, self.page, self.page.get_by_role('button'), timeout_seconds=0.1)
    async def test_visible_acceptance_returns_evidence(self):
        await self.page.set_content('<button onclick="document.body.dataset.clicks=Number(document.body.dataset.clicks||0)+1;document.querySelector(\'p\').hidden=false">发布</button><p hidden>发布成功</p>')
        uploader = SimpleNamespace(integration_hooks=AsyncMock())
        result = await submit_once(uploader, self.page, self.page.get_by_role('button'), timeout_seconds=2)
        self.assertEqual(result['kind'], 'platform_acceptance')
        self.assertEqual(await self.page.evaluate('Number(document.body.dataset.clicks||0)'), 1)


if __name__ == '__main__': unittest.main()
