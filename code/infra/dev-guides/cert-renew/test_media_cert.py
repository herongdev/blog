"""Offline safety and retry tests. Run with `python -m unittest -v test_media_cert`."""

from __future__ import annotations

from pathlib import Path
from contextlib import redirect_stderr
import io
import tempfile
import unittest
from unittest.mock import Mock, patch

import media_cert as m


class FakeTos:
    def __init__(self, cert_id=None):
        self.rule = type("Rule", (), {"domain": m.DOMAIN, "cert_id": cert_id})()
        self.put_calls = []
        self.delete_calls = []
        self.bind_calls = []

    def put_object(self, *args, **kwargs):
        self.put_calls.append((args, kwargs))

    def delete_object(self, *args):
        self.delete_calls.append(args)

    def list_bucket_custom_domain(self, bucket):
        assert bucket == m.BUCKET
        return type("Output", (), {"rules": [self.rule]})()

    def put_bucket_custom_domain(self, bucket, rule):
        self.bind_calls.append((bucket, rule))
        self.rule.cert_id = rule.cert_id


class ChallengeSafetyTests(unittest.TestCase):
    def setUp(self):
        self.key = m.challenge_key("A" * 43)
        self.validation = b"A" * 43 + b"." + b"B" * 43

    def test_key_rejects_path_escape(self):
        for token in ("../other", "bad/slash", "A" * 129, "short"):
            with self.subTest(token=token), self.assertRaises(m.MediaCertError):
                m.challenge_key(token)

    def test_upload_requires_exact_public_body(self):
        cloud = FakeTos()
        reads = iter([None, self.validation])
        m.publish_challenge(cloud, self.key, self.validation, read_public=lambda _: next(reads), sleep=lambda _: None)
        args, opts = cloud.put_calls[0]
        self.assertEqual(args[:2], (m.BUCKET, self.key))
        self.assertTrue(opts["forbid_overwrite"])
        self.assertEqual(opts["cache_control"], "no-store")

        with self.assertRaises(m.MediaCertError):
            m.publish_challenge(cloud, self.key, self.validation, read_public=lambda _: b"wrong", sleep=lambda _: None)

    def test_cleanup_never_deletes_a_changed_object_and_is_idempotent(self):
        cloud = FakeTos()
        m.cleanup_challenge(cloud, self.key, self.validation, read_public=lambda _: None)
        with self.assertRaises(m.MediaCertError):
            m.cleanup_challenge(cloud, self.key, self.validation, read_public=lambda _: b"wrong")
        self.assertEqual(cloud.delete_calls, [])
        m.cleanup_challenge(cloud, self.key, self.validation, read_public=lambda _: self.validation)
        self.assertEqual(cloud.delete_calls, [(m.BUCKET, self.key)])


class TlsEdgeChecks(unittest.TestCase):
    def setUp(self):
        self.ipv4 = (m.socket.AF_INET, m.socket.SOCK_STREAM, 6, ("192.0.2.10", 443))
        self.ipv6 = (m.socket.AF_INET6, m.socket.SOCK_STREAM, 6, ("2001:db8::10", 443, 0, 0))

    def test_resolves_every_unique_a_and_aaaa_address(self):
        records = [
            (*self.ipv4[:3], "", self.ipv4[3]),
            (*self.ipv4[:3], "", self.ipv4[3]),
            (*self.ipv6[:3], "", self.ipv6[3]),
        ]
        with patch.object(m.socket, "getaddrinfo", return_value=records) as lookup:
            self.assertEqual(m.tls_addresses(), [self.ipv4, self.ipv6])
        lookup.assert_called_once_with(m.DOMAIN, 443, type=m.socket.SOCK_STREAM)

    def test_samples_every_address_in_multiple_rounds(self):
        seen = []
        resolutions = []
        def resolve():
            resolutions.append(True)
            return [self.ipv4, self.ipv6]
        def probe(address):
            seen.append(address)
            return "a" * 64
        result = m.served_fingerprint(rounds=3,
                                      resolve=resolve, probe=probe)
        self.assertEqual(result, "a" * 64)
        self.assertEqual(len(resolutions), 3)
        self.assertEqual(seen, [self.ipv4, self.ipv6] * 3)

    def test_one_intermittent_old_leaf_fails_check(self):
        samples = iter(["a" * 64] * 5 + ["b" * 64])
        result = m.served_fingerprint(rounds=3,
                                      resolve=lambda: [self.ipv4, self.ipv6],
                                      probe=lambda _: next(samples))
        self.assertIsNone(result)
        with patch.object(m, "load_local_certificate", return_value=("chain", "key", "a" * 64)), \
             patch.object(m, "served_fingerprint", return_value=result), \
             redirect_stderr(io.StringIO()):
            self.assertEqual(m.main(["check"]), 1)

    def test_resolution_or_tls_failure_is_not_current(self):
        with self.subTest("DNS failure"):
            self.assertIsNone(m.served_fingerprint(
                rounds=1, resolve=Mock(side_effect=m.socket.gaierror("DNS unavailable"))))
        with self.subTest("TLS failure"):
            self.assertIsNone(m.served_fingerprint(
                rounds=1, resolve=lambda: [self.ipv4],
                probe=Mock(side_effect=m.ssl.SSLError("handshake failed"))))


class DeploymentRetryTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.state = Path(self.temp.name) / "state" / "state.json"
        self.fingerprint = "a" * 64
        self.cert = Mock()
        self.cert.ImportCertificateRequest = Mock(return_value="request")
        self.cert.CertificateInfoForImportCertificateInput = Mock(return_value="info")
        self.api = Mock()
        self.api.import_certificate.return_value = type("Response", (), {"instance_id": "cert-a1b2c3d4", "repeat_id": None})()
        self.patch_local = patch.object(m, "load_local_certificate", return_value=("chain", "key", self.fingerprint))
        self.patch_local.start()
        self.addCleanup(self.patch_local.stop)

    def test_first_import_then_noop_when_tls_matches(self):
        cloud = FakeTos()
        served = iter([None, self.fingerprint])
        result = m.reconcile(cloud, self.cert, self.api, Path("/unused"), self.state,
                             read_served=lambda: next(served), sleep=lambda _: None)
        self.assertEqual(result, "deployed")
        self.assertEqual(cloud.bind_calls[0][1].cert_id, "cert-a1b2c3d4")
        self.assertEqual(m.load_state(self.state)["fingerprint_sha256"], self.fingerprint)
        self.assertEqual(self.api.import_certificate.call_count, 1)

        result = m.reconcile(cloud, self.cert, self.api, Path("/unused"), self.state,
                             read_served=lambda: self.fingerprint)
        self.assertEqual(result, "already-current")
        self.assertEqual(self.api.import_certificate.call_count, 1)
        self.assertEqual(len(cloud.bind_calls), 1)

    def test_tls_propagation_failure_retries_without_reimport(self):
        cloud = FakeTos()
        with self.assertRaises(m.MediaCertError):
            m.reconcile(cloud, self.cert, self.api, Path("/unused"), self.state,
                        read_served=lambda: None, wait_seconds=-1, sleep=lambda _: None)
        self.assertEqual(self.api.import_certificate.call_count, 1)
        self.assertEqual(len(cloud.bind_calls), 1)
        result = m.reconcile(cloud, self.cert, self.api, Path("/unused"), self.state,
                             read_served=lambda: self.fingerprint)
        self.assertEqual(result, "already-current")
        self.assertEqual(self.api.import_certificate.call_count, 1)

    def test_matching_tls_repairs_changed_tos_certificate_id(self):
        m.save_state(self.state, self.fingerprint, "cert-a1b2c3d4")
        cloud = FakeTos(cert_id="cert-other123")
        result = m.reconcile(cloud, self.cert, self.api, Path("/unused"), self.state,
                             read_served=lambda: self.fingerprint)
        self.assertEqual(result, "deployed")
        self.assertEqual(len(cloud.bind_calls), 1)
        self.assertEqual(cloud.bind_calls[0][1].cert_id, "cert-a1b2c3d4")
        self.assertEqual(m.load_state(self.state)["instance_id"], "cert-a1b2c3d4")
        self.api.import_certificate.assert_not_called()

    def test_missing_existing_binding_fails_without_import(self):
        cloud = FakeTos()
        cloud.rule.domain = "unexpected.example"
        with self.assertRaises(m.MediaCertError):
            m.reconcile(cloud, self.cert, self.api, Path("/unused"), self.state,
                        read_served=lambda: None)
        self.api.import_certificate.assert_not_called()


class SdkConfigTests(unittest.TestCase):
    def test_certificate_client_uses_explicit_api_host_and_role(self):
        creds = Mock()
        provider = Mock()
        creds.provider.return_value = provider
        _, api = m.cert_client(creds)
        config = api.api_client.configuration
        self.assertEqual(config.region, "cn-beijing")
        self.assertEqual(config.host, "certificate-service.volcengineapi.com")
        self.assertIs(config.credential_provider, provider)


class CredentialSelectionTests(unittest.TestCase):
    def setUp(self):
        self.file = Path("/unused/media-account.env")
        self.values = {
            "VOLCENGINE_ACCESS_KEY": "test-media-account-ak",
            "VOLCENGINE_SECRET_KEY": "test-media-account-sk",
        }

    def test_explicit_file_ignores_available_other_account_instance_role(self):
        with patch.object(m, "read_root_only_env", return_value=self.values) as read_file, \
             patch("volcenginesdkcore.auth.providers.ecs_role_provider.EcsRoleCredentialProvider") as ecs:
            ecs.return_value.get_credentials.return_value = Mock(
                ak="test-other-account-ak", sk="test-other-account-sk", session_token="test-other-token")
            creds = m.CloudCredentials(self.file, role_name="OtherAccountRole")
            self.assertIsNone(creds.provider())
            self.assertEqual(creds.values(), ("test-media-account-ak", "test-media-account-sk", None))
            read_file.assert_called_once_with(self.file)
            ecs.assert_not_called()

    def test_invalid_explicit_file_fails_without_using_instance_role(self):
        with patch.object(m, "read_root_only_env", side_effect=m.MediaCertError("credential file must be a root-owned regular file with mode 0600")), \
             patch("volcenginesdkcore.auth.providers.ecs_role_provider.EcsRoleCredentialProvider") as ecs:
            with self.assertRaises(m.MediaCertError):
                m.CloudCredentials(self.file).values()
            ecs.assert_not_called()

    def test_omitting_file_retains_instance_role_and_refresh(self):
        first = Mock(ak="test-first-ak", sk="test-first-sk", session_token="test-first-token")
        refreshed = Mock(ak="test-next-ak", sk="test-next-sk", session_token="test-next-token")
        with patch("volcenginesdkcore.auth.providers.ecs_role_provider.EcsRoleCredentialProvider") as ecs, \
             patch.object(m, "read_root_only_env") as read_file:
            ecs.return_value.get_credentials.side_effect = [first, first, refreshed]
            creds = m.CloudCredentials(role_name="MediaAccountRole")
            self.assertEqual(creds.values(), ("test-first-ak", "test-first-sk", "test-first-token"))
            self.assertEqual(creds.values(), ("test-next-ak", "test-next-sk", "test-next-token"))
            ecs.assert_called_once_with(role_name="MediaAccountRole")
            read_file.assert_not_called()

    def test_explicit_file_exception_does_not_expose_values_in_cli_error(self):
        errors = io.StringIO()
        with patch.object(m, "read_root_only_env", side_effect=OSError("test-private-key-value")), \
             patch.object(m, "locked_state", return_value=123), \
             patch.object(m.os, "close"), redirect_stderr(errors):
            self.assertEqual(m.main(["reconcile", "--env-file", str(self.file)]), 1)
        self.assertIn("OSError", errors.getvalue())
        self.assertNotIn("test-private-key-value", errors.getvalue())


if __name__ == "__main__":
    unittest.main()
