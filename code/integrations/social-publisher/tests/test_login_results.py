"""Offline login result regressions: stub platform entrypoints, no browser/network."""
import base64
import io
import json
from pathlib import Path
import sys
import tempfile
from types import SimpleNamespace
import unittest
from unittest.mock import patch

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))
import runner


class LoginResultTests(unittest.IsolatedAsyncioTestCase):
    async def invoke(self, result=None, *, operation="login", platform="douyin", qr=False, error=None, existing=True):
        with tempfile.TemporaryDirectory() as directory:
            account = Path(directory) / "account.json"
            if existing:
                account.write_text('{"cookies": []}')
            output = io.StringIO()
            bridge = runner.Bridge({"data_dir": directory, "account_file": str(account), "platform": platform, "operation": operation}, output)
            calls = []

            async def setup(path, **options):
                calls.append((path, options))
                if qr:
                    image = Path(directory) / "source.png"
                    image.write_bytes(base64.b64decode("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII="))
                    await options["qrcode_callback"]({"image_path": str(image)})
                if error is not None:
                    raise error
                return result

            module = SimpleNamespace(**{runner.PLATFORMS[platform][1]: setup})
            with patch.object(runner.importlib, "import_module", return_value=module):
                answer = await runner.browser_operation(bridge)
            events = [json.loads(line) for line in output.getvalue().splitlines()]
            self.assertEqual(bridge.qrcode_seen, qr and bool(calls))
            self.assertEqual(any(event["type"] == "qrcode" for event in events), qr and bool(calls))
            if calls:
                self.assertEqual(calls[0][1]["handle"], operation == "login")
                self.assertTrue(calls[0][1]["return_detail"])
            return answer, calls

    async def test_successful_setup_remains_valid_across_platforms(self):
        for platform in runner.PLATFORMS:
            with self.subTest(platform=platform):
                answer, _ = await self.invoke({"success": True, "status": "success"}, platform=platform)
                self.assertEqual((answer["status"], answer["auth_status"]), ("completed", "valid"))
                self.assertNotIn("error_code", answer)

    async def test_missing_check_session_does_not_invoke_the_platform(self):
        answer, calls = await self.invoke(operation="check", existing=False)
        self.assertEqual(calls, [])
        self.assertEqual((answer["status"], answer["auth_status"]), ("completed", "invalid"))
        self.assertNotIn("error_code", answer)

    async def test_explicit_cookie_invalid_check_remains_invalid(self):
        answer, _ = await self.invoke({"success": False, "status": "cookie_invalid"}, operation="check")
        self.assertEqual((answer["status"], answer["auth_status"]), ("completed", "invalid"))
        self.assertNotIn("error_code", answer)

    async def test_check_runtime_error_is_unknown_instead_of_expired(self):
        for platform in runner.PLATFORMS:
            with self.subTest(platform=platform):
                answer, _ = await self.invoke(operation="check", platform=platform, error=RuntimeError("Page.goto: net::ERR_CONNECTION_RESET https://private.test/?token=secret"))
                self.assertEqual((answer["status"], answer["auth_status"]), ("failed", "unknown"))
                self.assertEqual(answer["error_code"], "AUTH_CHECK_FAILED")
                self.assertNotIn("secret", json.dumps(answer))

    async def test_caught_navigation_failure_before_qr_is_not_an_expired_account(self):
        for failure in ("Page.goto: Page crashed", "Page.goto: Timeout 30000ms exceeded."):
            with self.subTest(failure=failure):
                answer, _ = await self.invoke({"success": False, "status": "failed", "message": failure + ' https://private.test/?token=secret', "account_file": "/private/account.json", "current_url": "https://private.test/"})
                self.assertEqual((answer["status"], answer["auth_status"]), ("failed", "unknown"))
                self.assertEqual(answer["error_code"], "LOGIN_PAGE_UNAVAILABLE")
                serialized = json.dumps(answer)
                for value in ("private.test", "secret", "account.json", "Page.goto", "current_url"):
                    self.assertNotIn(value, serialized)

    async def test_thrown_navigation_failure_uses_the_same_safe_category(self):
        for text in ("net::ERR_NAME_NOT_RESOLVED", "Navigation failed because page crashed", 'Navigation to "https://private.test/" is interrupted'):
            with self.subTest(text=text):
                answer, _ = await self.invoke(error=RuntimeError(text))
                self.assertEqual(answer["error_code"], "LOGIN_PAGE_UNAVAILABLE")
                self.assertEqual(answer["auth_status"], "unknown")

    async def test_locator_failure_before_qr_reports_missing_qr_not_page_navigation(self):
        answer, _ = await self.invoke({"success": False, "status": "failed", "message": "Locator.wait_for: Timeout 60000ms exceeded"})
        self.assertEqual(answer["error_code"], "QR_UNAVAILABLE")
        self.assertEqual(answer["auth_status"], "unknown")

    async def test_unrelated_navigation_text_is_not_classified_as_navigation_failure(self):
        answer, _ = await self.invoke({"success": False, "status": "failed", "message": "Could not locate Navigation menu"})
        self.assertEqual(answer["error_code"], "QR_UNAVAILABLE")

    async def test_scan_timeout_requires_a_qr_actually_emitted_to_the_host(self):
        detail = {"success": False, "status": "timeout", "message": "waiting for scan"}
        before, _ = await self.invoke(detail)
        after, _ = await self.invoke(detail, qr=True)
        self.assertEqual(before["error_code"], "QR_UNAVAILABLE")
        self.assertEqual(after["error_code"], "LOGIN_TIMEOUT")
        self.assertEqual(after["auth_status"], "unknown")

    async def test_runtime_timeout_after_qr_keeps_auth_unknown(self):
        answer, _ = await self.invoke(qr=True, error=TimeoutError("private browser state"))
        self.assertEqual(answer["error_code"], "LOGIN_TIMEOUT")
        self.assertEqual(answer["auth_status"], "unknown")
        self.assertNotIn("private browser state", json.dumps(answer))

    async def test_unfinished_login_after_qr_is_not_mislabeled_expired(self):
        answer, _ = await self.invoke({"success": False, "status": "cookie_invalid", "message": "private failure"}, qr=True)
        self.assertEqual(answer["error_code"], "LOGIN_NOT_COMPLETED")
        self.assertEqual(answer["auth_status"], "unknown")

    async def test_malformed_and_truthy_nonboolean_success_never_mark_account_valid(self):
        for detail in (None, False, [], {"success": "false"}, {"success": 1}):
            with self.subTest(detail=detail):
                answer, _ = await self.invoke(detail, operation="check")
                self.assertEqual(answer["error_code"], "AUTH_CHECK_FAILED")
                self.assertEqual(answer["auth_status"], "unknown")


if __name__ == "__main__":
    unittest.main()
