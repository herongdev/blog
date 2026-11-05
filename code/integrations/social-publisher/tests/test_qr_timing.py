"""Offline QR event contracts; no image decoding, browsers, or network."""
from datetime import datetime, timedelta, timezone
import io
import json
from pathlib import Path
import sys
import tempfile
import unittest

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))
import runner


class QrTimingTests(unittest.IsolatedAsyncioTestCase):
    def setUp(self):
        temporary = tempfile.TemporaryDirectory()
        self.addCleanup(temporary.cleanup)
        self.root = Path(temporary.name)
        self.source = self.root / "source.png"
        self.source.write_bytes(b"private QR image fixture A")
        self.bridges = []

    def bridge(self, platform="douyin"):
        directory = self.root / f"operation-{len(self.bridges)}"
        directory.mkdir()
        output = io.StringIO()
        bridge = runner.Bridge({"data_dir": str(directory), "platform": platform}, output)
        self.bridges.append(bridge)
        self.addCleanup(bridge.cleanup)
        return bridge, output

    @staticmethod
    def events(output):
        return [json.loads(line) for line in output.getvalue().splitlines()]

    def qr_events(self, output):
        return [event for event in self.events(output) if event["type"] == "qrcode"]

    async def test_douyin_exposes_a_refresh_window_without_claiming_platform_expiry(self):
        bridge, output = self.bridge()
        await bridge.qrcode({
            "image_path": str(self.source),
            "expires_at": "2099-01-01T00:00:00Z",
            "image_data_url": "data:image/png;base64,PRIVATE_QR_CONTENT",
            "src": "https://private.invalid/?token=PRIVATE_TOKEN",
            "token": "PRIVATE_TOKEN",
            "decoded": "PRIVATE_QR_CONTENT",
        })
        event, = self.qr_events(output)
        self.assertEqual(set(event), {"type", "seq", "at", "image_path", "version", "refresh_after_seconds"})
        self.assertEqual(event["refresh_after_seconds"], 45)
        self.assertTrue(bridge.qrcode_seen)
        self.assertNotIn("expires_at", event)
        for secret in ("PRIVATE_QR_CONTENT", "PRIVATE_TOKEN", "private.invalid", "2099-01-01"):
            self.assertNotIn(secret, output.getvalue())

    async def test_invalid_refresh_values_use_the_safe_default(self):
        for value in (None, True, False, "10", [], {}, 0, -1, -(10 ** 400), float("nan"), float("inf"), float("-inf")):
            with self.subTest(value=repr(value)):
                bridge, output = self.bridge()
                await bridge.qrcode({"image_path": str(self.source), "refresh_after_seconds": value})
                event, = self.qr_events(output)
                self.assertEqual(event["refresh_after_seconds"], 45)
                self.assertNotIn("expires_at", event)

    async def test_positive_refresh_values_are_bounded_to_one_through_45_seconds(self):
        for value, expected in ((0.25, 1), (1, 1), (12.5, 12.5), (45, 45), (46, 45), (10 ** 400, 45)):
            with self.subTest(value=repr(value)):
                bridge, output = self.bridge()
                await bridge.qrcode({"image_path": str(self.source), "refresh_after_seconds": value})
                event, = self.qr_events(output)
                self.assertEqual(event["refresh_after_seconds"], expected)

    async def test_same_image_under_a_new_filename_does_not_renew_the_window(self):
        duplicate = self.root / "renamed.png"
        duplicate.write_bytes(self.source.read_bytes())
        bridge, output = self.bridge()
        await bridge.qrcode({"image_path": str(self.source), "refresh_after_seconds": 15})
        original_output = output.getvalue()
        await bridge.qrcode({"image_path": str(duplicate), "refresh_after_seconds": 45})
        self.assertEqual(output.getvalue(), original_output)
        self.assertEqual(bridge.qr_version, 1)
        self.assertEqual(len(bridge.qr_files), 1)
        self.assertEqual(self.qr_events(output)[0]["refresh_after_seconds"], 15)

    async def test_changed_bytes_create_a_new_version_and_all_private_copies_are_cleaned(self):
        replacement = self.root / "replacement.png"
        replacement.write_bytes(b"private QR image fixture B")
        bridge, output = self.bridge()
        await bridge.qrcode({"image_path": str(self.source)})
        await bridge.qrcode({"image_path": str(replacement)})
        events = self.qr_events(output)
        self.assertEqual([event["version"] for event in events], [1, 2])
        copies = [Path(event["image_path"]) for event in events]
        self.assertEqual(len(set(copies)), 2)
        for copy, source in zip(copies, (self.source, replacement)):
            self.assertNotEqual(copy, source)
            self.assertEqual(copy.read_bytes(), source.read_bytes())
            self.assertEqual(copy.stat().st_mode & 0o777, 0o600)
        bridge.cleanup()
        bridge.cleanup()
        self.assertTrue(all(not copy.exists() for copy in copies))
        self.assertTrue(self.source.exists())
        self.assertTrue(replacement.exists())

    async def test_deduplication_is_isolated_to_each_bridge(self):
        first, first_output = self.bridge()
        second, second_output = self.bridge()
        for bridge in (first, second):
            await bridge.qrcode({"image_path": str(self.source)})
        first_event, = self.qr_events(first_output)
        second_event, = self.qr_events(second_output)
        self.assertEqual((first_event["version"], second_event["version"]), (1, 1))
        self.assertNotEqual(first_event["image_path"], second_event["image_path"])

    async def test_other_platforms_keep_the_five_minute_expiry_contract(self):
        for platform in ("xiaohongshu", "tencent"):
            with self.subTest(platform=platform):
                bridge, output = self.bridge(platform)
                before = datetime.now(timezone.utc)
                payload = {"image_path": str(self.source), "refresh_after_seconds": 1, "expires_at": "2099-01-01T00:00:00Z", "token": "PRIVATE_TOKEN"}
                await bridge.qrcode(payload)
                await bridge.qrcode(payload)
                after = datetime.now(timezone.utc)
                events = self.qr_events(output)
                self.assertEqual([event["version"] for event in events], [1, 2])
                for event in events:
                    expiry = datetime.fromisoformat(event["expires_at"])
                    self.assertGreaterEqual(expiry, before + timedelta(minutes=5))
                    self.assertLessEqual(expiry, after + timedelta(minutes=5))
                    self.assertNotIn("refresh_after_seconds", event)
                self.assertNotIn("PRIVATE_TOKEN", output.getvalue())
                self.assertNotIn("2099-01-01", output.getvalue())

    async def test_missing_image_never_emits_a_qr_or_opens_a_window(self):
        bridge, output = self.bridge()
        with self.assertRaises(runner.SafeError) as error:
            await bridge.qrcode({"refresh_after_seconds": 45})
        self.assertEqual(error.exception.code, "QR_UNAVAILABLE")
        self.assertEqual(output.getvalue(), "")
        self.assertEqual(bridge.qr_version, 0)
        self.assertFalse(bridge.qrcode_seen)


if __name__ == "__main__":
    unittest.main()
