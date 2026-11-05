import asyncio
import io
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
from auth_network import LoginNetworkObservation, polling_failure, polling_state
from runner import Bridge

URL = 'https://sso.douyin.com/passport/web/check_qrconnect/?token=PRIVATE_TOKEN'


class AuthNetworkTests(unittest.IsolatedAsyncioTestCase):
    async def test_platform_code_is_advisory_not_an_authentication_decision(self):
        for code in (2046, 1, -1):
            with self.subTest(code=code):
                value = polling_state(URL, 200, {'data': {'status': 'error', 'error_code': code, 'description': 'PRIVATE_DESCRIPTION', 'token': 'PRIVATE_TOKEN'}})
                self.assertEqual(polling_failure(value), {
                    'state': 'verification_required' if code == 2046 else 'platform_error',
                    'platformErrorCode': code,
                    'message': f'抖音登录尚未完成（平台错误码 {code}），请在平台页面查看登录要求',
                })
                self.assertNotIn('auth_status', polling_failure(value))
                self.assertNotIn('PRIVATE_', json.dumps(polling_failure(value)))

    async def test_transport_state_and_untrusted_response_do_not_imply_refusal(self):
        for state in ('new', 'scanned', 'confirmed', 'success', 'expired', 'canceled', 'error'):
            for http in (200, 401, 429, 500, 503):
                with self.subTest(state=state, http=http):
                    self.assertIsNone(polling_failure(polling_state(URL, http, {'data': {'status': state, 'error_code': 0}})))
        for code in (None, True, False, '2046', 2046.0, 10**9, -10**9):
            self.assertIsNone(polling_failure(polling_state(URL, 200, {'data': {'error_code': code}})))
        self.assertIsNone(polling_failure(None))
        self.assertIsNone(polling_failure(polling_state('https://attacker.invalid/check_qrconnect', 200, {'data': {'error_code': 2046}})))

    async def test_verification_observation_does_not_raise_or_emit_auth_result(self):
        with tempfile.TemporaryDirectory() as directory:
            bridge = Bridge({'data_dir': directory, 'account_file': directory + '/account.json', 'session_id': '../../outside'}, io.StringIO())
            network = LoginNetworkObservation(bridge)
            response = SimpleNamespace(url=URL, status=200, json=AsyncMock(return_value={'data': {'status': 'error', 'error_code': 2046, 'description': 'PRIVATE_DESCRIPTION'}}))
            network.save = lambda: (_ for _ in ()).throw(OSError('PRIVATE_DISK_ERROR'))
            await network.response(response)
            self.assertEqual(network.failure['state'], 'verification_required')
            self.assertEqual(network.failure['platformErrorCode'], 2046)
            self.assertNotIn('auth_status', network.failure)
            self.assertNotIn('auth_status', bridge.output.getvalue())
            self.assertNotIn('PRIVATE_', json.dumps(network.failure))
            # Later transient response failures do not replace the bounded
            # observation or escape the observer's existing error boundary.
            response.json.side_effect = RuntimeError('PRIVATE_RESPONSE_ERROR')
            await network.response(response)
            self.assertEqual(network.failure['state'], 'verification_required')
            # Keep collecting later responses without replacing the active
            # identity-verification UI with a stale QR progress message.
            response.json.side_effect = None
            response.json.return_value = {'data': {'status': 'confirmed', 'error_code': 0}}
            await network.response(response)
            self.assertNotIn('verifying', bridge.output.getvalue())
            self.assertEqual(network.transitions[-1]['state'], 'confirmed')
            self.assertNotIn('auth_status', bridge.output.getvalue())

    async def test_cancellation_is_preserved(self):
        with tempfile.TemporaryDirectory() as directory:
            bridge = Bridge({'data_dir': directory, 'account_file': directory + '/account.json', 'session_id': '../../outside'}, io.StringIO())
            network = LoginNetworkObservation(bridge)
            response = SimpleNamespace(url=URL, status=200, json=AsyncMock(side_effect=asyncio.CancelledError))
            with self.assertRaises(asyncio.CancelledError):
                await network.response(response)
            self.assertIsNone(network.failure)

    async def test_verification_lock_survives_other_errors_and_late_qr_messages(self):
        with tempfile.TemporaryDirectory() as directory:
            bridge = Bridge({'data_dir': directory, 'account_file': directory + '/account.json'}, io.StringIO())
            network = LoginNetworkObservation(bridge)
            response = SimpleNamespace(url=URL, status=200, json=AsyncMock())
            for code, state in ((2046, 'error'), (1, 'error'), (-1, 'error'),
                                (0, 'scanned'), (0, 'confirmed'), (0, 'expired')):
                response.json.return_value = {'data': {'error_code': code, 'status': state}}
                await network.response(response)
                self.assertEqual(network.failure['state'], 'verification_required')
                self.assertEqual(network.failure['platformErrorCode'], 2046)
            self.assertEqual(bridge.output.getvalue(), '')
            self.assertEqual([entry['errorCode'] for entry in network.transitions], [2046, 1, -1, 0, 0, 0])
            self.assertIsNone(LoginNetworkObservation(bridge).failure)

    async def test_only_polling_enum_and_boolean_evidence_is_retained(self):
        value = polling_state(URL, 200, {'data': {'status': 'scanned', 'error_code': 0, 'ticket': 'PRIVATE_TICKET', 'redirect_url': 'PRIVATE_URL', 'cookie': 'PRIVATE_COOKIE'}})
        self.assertEqual(value, {'state': 'scanned', 'http': 200, 'errorCode': 0, 'hasCaptcha': False, 'hasRedirect': True, 'hasTicket': True})
        self.assertNotIn('PRIVATE_', json.dumps(value))
        for url in ['http://sso.douyin.com/passport/web/check_qrconnect/', 'https://sso.douyin.com.attacker.invalid/passport/web/check_qrconnect/', 'https://sso.douyin.com/other/']:
            self.assertIsNone(polling_state(url, 200, {'data': {'status': 'success'}}))
        self.assertIsNone(polling_state(URL, 200, None))

    async def test_bounded_private_file_deduplicates_and_does_not_mark_login_valid(self):
        with tempfile.TemporaryDirectory() as directory:
            account = Path(directory) / 'accounts' / f'{uuid4()}.json'
            bridge = Bridge({'data_dir': directory, 'account_file': str(account), 'session_id': str(uuid4())}, io.StringIO())
            network = LoginNetworkObservation(bridge)
            response = SimpleNamespace(url=URL, status=200, json=AsyncMock(return_value={'data': {'status': 'new', 'error_code': 0}}))
            await network.response(response); await network.response(response)
            self.assertEqual(len(network.transitions), 1)
            self.assertIsNone(network.failure)
            response.json.return_value = {'data': {'status': 'scanned', 'error_code': 0, 'ticket': 'PRIVATE_TICKET'}}
            await network.response(response)
            self.assertIn('waiting_confirmation', bridge.output.getvalue())
            self.assertNotIn('auth_status', bridge.output.getvalue())
            for i in range(20):
                bridge.qr_version = i
                await network.response(response)
            saved = json.loads(network.path.read_text())
            self.assertEqual(len(saved['transitions']), 12)
            self.assertEqual(stat.S_IMODE(network.path.stat().st_mode), 0o600)
            self.assertNotIn('PRIVATE_', network.path.read_text())

    async def test_bad_identity_and_callback_failure_do_not_affect_login(self):
        with tempfile.TemporaryDirectory() as directory:
            bridge = Bridge({'data_dir': directory, 'account_file': directory + '/account.json', 'session_id': '../../outside'}, io.StringIO())
            network = LoginNetworkObservation(bridge)
            self.assertIsNone(network.path)
            response = SimpleNamespace(url=URL, status=200, json=AsyncMock(side_effect=RuntimeError('PRIVATE_FAILURE')))
            await network.response(response)
            self.assertEqual(network.transitions, [])
            self.assertIsNone(network.failure)
            page = SimpleNamespace(on=lambda *args: None)
            network.attach(page); network.attach(page)
            self.assertEqual(len(network.pages), 1)
