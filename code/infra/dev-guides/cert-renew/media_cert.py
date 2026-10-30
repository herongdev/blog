#!/usr/bin/env python3
"""Certbot HTTP-01 hooks and TOS certificate reconciliation for media.herong.info.

The cloud SDKs are deliberately imported only when a cloud operation starts, so
certificate and validation tests can run without network credentials. No command
prints credential values, challenge responses, PEM data, or SDK exception bodies.
"""

from __future__ import annotations

import argparse
import fcntl
import hashlib
import json
import os
from pathlib import Path
import re
import socket
import ssl
import stat
import sys
import time
from typing import Callable
from urllib.error import HTTPError, URLError
from urllib.request import HTTPRedirectHandler, Request, build_opener

DOMAIN = "media.herong.info"
BUCKET = "herong-media"
REGION = "cn-beijing"
TOS_ENDPOINT = "https://tos-cn-beijing.volces.com"
CERT_SERVICE_HOST = "certificate-service.volcengineapi.com"
CHALLENGE_PREFIX = ".well-known/acme-challenge/"
DEFAULT_LINEAGE = Path("/etc/letsencrypt/live/media.herong.info")
DEFAULT_STATE = Path("/var/lib/herong-media-cert/state.json")
TOKEN_RE = re.compile(r"^[A-Za-z0-9_-]{32,128}$")
INSTANCE_RE = re.compile(r"^cert-[A-Za-z0-9-]{8,128}$")


class MediaCertError(Exception):
    """Expected failure with a safe, non-secret message."""


def challenge_key(token: str) -> str:
    if not TOKEN_RE.fullmatch(token):
        raise MediaCertError("CERTBOT_TOKEN is invalid")
    return CHALLENGE_PREFIX + token


def challenge_from_environment() -> tuple[str, bytes]:
    if os.environ.get("CERTBOT_DOMAIN") != DOMAIN:
        raise MediaCertError("Certbot domain does not match media.herong.info")
    key = challenge_key(os.environ.get("CERTBOT_TOKEN", ""))
    validation = os.environ.get("CERTBOT_VALIDATION", "")
    if not 40 <= len(validation) <= 512 or not validation.isascii() or any(
        c.isspace() for c in validation
    ):
        raise MediaCertError("CERTBOT_VALIDATION is invalid")
    return key, validation.encode("ascii")


def read_root_only_env(path: Path) -> dict[str, str]:
    """Parse a deliberately supplied root-owned file; never invoke a shell."""
    file_stat = path.lstat()
    if not stat.S_ISREG(file_stat.st_mode) or file_stat.st_uid != 0 or file_stat.st_mode & 0o077:
        raise MediaCertError("credential file must be a root-owned regular file with mode 0600")
    values: dict[str, str] = {}
    for raw in path.read_text(encoding="utf-8").splitlines():
        line = raw.strip()
        if not line or line.startswith("#"):
            continue
        if "=" not in line:
            raise MediaCertError("credential file has invalid syntax")
        name, value = line.split("=", 1)
        name = name.strip()
        if name not in {"VOLCENGINE_ACCESS_KEY", "VOLCENGINE_SECRET_KEY", "VOLCENGINE_SESSION_TOKEN", "VOLCENGINE_ECS_METADATA"}:
            raise MediaCertError("credential file contains unsupported key")
        if name in values or not value or value.strip() != value:
            raise MediaCertError("credential file contains duplicate or invalid value")
        values[name] = value
    if not values.get("VOLCENGINE_ACCESS_KEY") or not values.get("VOLCENGINE_SECRET_KEY"):
        raise MediaCertError("credential file lacks AK/SK")
    return values


class CloudCredentials:
    """Use an explicit credential file exclusively; otherwise use ECS role STS."""

    def __init__(self, env_file: Path | None = None, role_name: str | None = None):
        self.env_file = env_file
        self.role_name = role_name
        self._provider = None
        self._static = None

    def provider(self):
        if self._provider is not None or self._static is not None:
            return self._provider
        # An explicit file may belong to the media account while this ECS is in
        # another account. Never replace it with an unrelated instance identity,
        # even when that identity is available or the file cannot be read.
        if self.env_file is not None:
            self._static = read_root_only_env(self.env_file)
            return None
        from volcenginesdkcore.auth.providers.ecs_role_provider import EcsRoleCredentialProvider

        provider = EcsRoleCredentialProvider(role_name=self.role_name)
        try:
            provider.get_credentials()
        except Exception as exc:
            raise MediaCertError("ECS role credentials unavailable; attach a scoped role") from exc
        self._provider = provider
        return provider

    def values(self) -> tuple[str, str, str | None]:
        provider = self.provider()
        if provider is not None:
            creds = provider.get_credentials()  # Refresh short-lived STS credentials.
            return creds.ak, creds.sk, creds.session_token
        assert self._static is not None
        return (
            self._static["VOLCENGINE_ACCESS_KEY"],
            self._static["VOLCENGINE_SECRET_KEY"],
            self._static.get("VOLCENGINE_SESSION_TOKEN"),
        )


def tos_client(credentials: CloudCredentials):
    import tos

    ak, sk, token = credentials.values()
    return tos.TosClientV2(ak, sk, TOS_ENDPOINT, REGION, security_token=token)


def cert_client(credentials: CloudCredentials):
    import volcenginesdkcertificateservice as cert
    import volcenginesdkcore as core

    config = core.Configuration()
    config.region = REGION
    config.host = CERT_SERVICE_HOST  # The generated SDK's default host is wrong for this API.
    config.scheme = "https"
    config.debug = False
    provider = credentials.provider()
    if provider is not None:
        config.credential_provider = provider
    else:
        config.ak, config.sk, config.session_token = credentials.values()
    return cert, cert.CERTIFICATESERVICEApi(core.ApiClient(config))


class NoRedirect(HTTPRedirectHandler):
    def redirect_request(self, request, fp, code, msg, headers, newurl):
        return None


def public_challenge_body(key: str) -> bytes | None:
    url = f"http://{DOMAIN}/{key}"
    request = Request(url, headers={"Cache-Control": "no-cache", "Pragma": "no-cache"})
    try:
        with build_opener(NoRedirect).open(request, timeout=8) as response:
            if response.status != 200 or response.url != url:
                raise MediaCertError("HTTP-01 URL did not serve directly over HTTP")
            body = response.read(1024)
            if len(body) > 512:
                raise MediaCertError("HTTP-01 object exceeds expected size")
            return body
    except HTTPError as exc:
        if exc.code == 404:
            return None
        raise MediaCertError(f"HTTP-01 URL returned HTTP {exc.code}") from exc
    except URLError as exc:
        raise MediaCertError("HTTP-01 URL could not be reached") from exc


def publish_challenge(client, key: str, expected: bytes, *, read_public: Callable[[str], bytes | None] = public_challenge_body,
                      wait_seconds: int = 90, sleep: Callable[[float], None] = time.sleep) -> None:
    try:
        client.put_object(
            BUCKET, key, content=expected, content_length=len(expected), content_type="text/plain",
            cache_control="no-store", forbid_overwrite=True,
        )
    except Exception:
        # A previous attempt may have uploaded this exact token before a lost
        # response. Do not overwrite a different object or hide other failures.
        if read_public(key) != expected:
            raise
    deadline = time.monotonic() + wait_seconds
    while True:
        observed = read_public(key)
        if observed == expected:
            return
        if observed is not None:
            raise MediaCertError("HTTP-01 public body differs from uploaded validation")
        if time.monotonic() >= deadline:
            raise MediaCertError("HTTP-01 object did not become publicly readable")
        sleep(2)


def cleanup_challenge(client, key: str, expected: bytes,
                      *, read_public: Callable[[str], bytes | None] = public_challenge_body) -> None:
    # A cleanup hook must never delete an object replaced by another actor.
    # Use anonymous HTTP, so the ECS role needs only Put/Delete on this prefix.
    body = read_public(key)
    if body is None:  # Already absent, e.g. Certbot retried the cleanup hook.
        return
    if body != expected:
        raise MediaCertError("HTTP-01 object changed; refusing to delete it")
    client.delete_object(BUCKET, key)


def load_local_certificate(lineage: Path) -> tuple[str, str, str]:
    from cryptography import x509
    from cryptography.hazmat.primitives import serialization
    from cryptography.hazmat.primitives.asymmetric import ec, rsa
    from datetime import datetime, timezone

    chain = (lineage / "fullchain.pem").read_text(encoding="ascii")
    private_key = (lineage / "privkey.pem").read_text(encoding="ascii")
    pem_match = re.search(r"-----BEGIN CERTIFICATE-----.*?-----END CERTIFICATE-----", chain, re.S)
    if pem_match is None:
        raise MediaCertError("lineage has no PEM certificate")
    leaf = x509.load_pem_x509_certificate(pem_match.group(0).encode("ascii"))
    sans = leaf.extensions.get_extension_for_class(x509.SubjectAlternativeName).value
    if DOMAIN not in sans.get_values_for_type(x509.DNSName):
        raise MediaCertError("lineage certificate does not cover media.herong.info")
    expires = getattr(leaf, "not_valid_after_utc", None) or leaf.not_valid_after.replace(tzinfo=timezone.utc)
    if expires <= datetime.now(timezone.utc):
        raise MediaCertError("lineage certificate is expired")
    key = serialization.load_pem_private_key(private_key.encode("ascii"), password=None)
    public = leaf.public_key()
    if not isinstance(key, (rsa.RSAPrivateKey, ec.EllipticCurvePrivateKey)) or key.public_key().public_numbers() != public.public_numbers():
        raise MediaCertError("lineage key does not match certificate")
    fingerprint = hashlib.sha256(leaf.public_bytes(serialization.Encoding.DER)).hexdigest()
    return chain, private_key, fingerprint


TLSAddress = tuple[int, int, int, tuple]


def tls_addresses() -> list[TLSAddress]:
    """Resolve every A/AAAA endpoint, dropping duplicate records."""
    addresses: list[TLSAddress] = []
    seen: set[tuple[int, tuple]] = set()
    for family, socktype, protocol, _, sockaddr in socket.getaddrinfo(
        DOMAIN, 443, type=socket.SOCK_STREAM
    ):
        if family not in (socket.AF_INET, socket.AF_INET6):
            continue
        key = (family, sockaddr)
        if key not in seen:
            seen.add(key)
            addresses.append((family, socktype, protocol, sockaddr))
    return addresses


def tls_leaf_fingerprint(address: TLSAddress) -> str | None:
    family, socktype, protocol, sockaddr = address
    # A fresh context and connection per sample avoids carrying a resumed TLS
    # session across edge nodes while still validating the requested hostname.
    context = ssl.create_default_context()
    with socket.socket(family, socktype, protocol) as sock:
        sock.settimeout(3)
        sock.connect(sockaddr)
        with context.wrap_socket(sock, server_hostname=DOMAIN) as tls:
            der = tls.getpeercert(binary_form=True)
            return hashlib.sha256(der).hexdigest() if der else None


def served_fingerprint(
    *, rounds: int = 6,
    resolve: Callable[[], list[TLSAddress]] = tls_addresses,
    probe: Callable[[TLSAddress], str | None] = tls_leaf_fingerprint,
) -> str | None:
    """Return one fingerprint only when every DNS endpoint agrees in every round.

    TOS can report a bound certificate while individual edge connections still
    serve the previous leaf. Re-resolve and reconnect several times to catch
    intermittent edges; a failed resolution or handshake is not current.
    """
    if rounds < 1:
        raise ValueError("rounds must be positive")
    observed: str | None = None
    deadline = time.monotonic() + 30
    for _ in range(rounds):
        try:
            addresses = resolve()
        except OSError:
            return None
        if not addresses:
            return None
        for address in addresses:
            if time.monotonic() >= deadline:
                return None
            try:
                fingerprint = probe(address)
            except (OSError, ssl.SSLError):
                return None
            if fingerprint is None or (observed is not None and fingerprint != observed):
                return None
            observed = fingerprint
    return observed


def secure_state_dir(state_path: Path) -> None:
    parent = state_path.parent
    parent.mkdir(mode=0o700, parents=True, exist_ok=True)
    info = parent.lstat()
    if not stat.S_ISDIR(info.st_mode) or info.st_mode & 0o077:
        raise MediaCertError("state directory must have mode 0700")


def load_state(state_path: Path) -> dict[str, str]:
    secure_state_dir(state_path)
    if not state_path.exists():
        return {}
    info = state_path.lstat()
    if not stat.S_ISREG(info.st_mode) or info.st_mode & 0o077:
        raise MediaCertError("state file must have mode 0600")
    data = json.loads(state_path.read_text(encoding="utf-8"))
    return data if isinstance(data, dict) else {}


def save_state(state_path: Path, fingerprint: str, instance_id: str) -> None:
    secure_state_dir(state_path)
    tmp = state_path.with_name(state_path.name + f".{os.getpid()}.tmp")
    payload = {"fingerprint_sha256": fingerprint, "instance_id": instance_id}
    fd = os.open(tmp, os.O_WRONLY | os.O_CREAT | os.O_EXCL, 0o600)
    try:
        with os.fdopen(fd, "w", encoding="utf-8") as stream:
            json.dump(payload, stream, separators=(",", ":"))
            stream.flush()
            os.fsync(stream.fileno())
        os.replace(tmp, state_path)
    finally:
        if tmp.exists():
            tmp.unlink()


def import_certificate(cert_module, api, chain: str, private_key: str) -> str:
    req = cert_module.ImportCertificateRequest(
        certificate_info=cert_module.CertificateInfoForImportCertificateInput(
            certificate_chain=chain, private_key=private_key,
        ),
        tag="media.herong.info / Certbot",
        repeatable=False,
        no_verify_and_fix_chain=False,
    )
    response = api.import_certificate(req)
    instance_id = response.instance_id or response.repeat_id
    if not instance_id or not INSTANCE_RE.fullmatch(instance_id):
        raise MediaCertError("Certificate Center returned no valid instance ID")
    return instance_id


def reconcile(client, cert_module, cert_api, lineage: Path, state_path: Path,
              *, read_served: Callable[[], str | None] = served_fingerprint,
              wait_seconds: int = 180, sleep: Callable[[float], None] = time.sleep) -> str:
    import tos

    chain, private_key, fingerprint = load_local_certificate(lineage)
    rules = [rule for rule in client.list_bucket_custom_domain(BUCKET).rules if rule.domain == DOMAIN]
    if len(rules) != 1:
        raise MediaCertError("expected exactly one pre-existing media.herong.info TOS binding")
    current_id = rules[0].cert_id
    state = load_state(state_path)
    saved_id = state.get("instance_id")
    managed_id = (
        saved_id
        if state.get("fingerprint_sha256") == fingerprint
        and isinstance(saved_id, str)
        and INSTANCE_RE.fullmatch(saved_id)
        else None
    )
    # A matching TLS leaf alone does not prove that TOS still points to the
    # imported certificate tracked in state. Repair a changed domain binding.
    if read_served() == fingerprint and current_id and (
        managed_id is None or current_id == managed_id
    ):
        save_state(state_path, fingerprint, current_id)
        return "already-current"

    if managed_id is not None:
        instance_id = managed_id
    else:
        instance_id = import_certificate(cert_module, cert_api, chain, private_key)
        # Persist immediately so a later TOS or TLS propagation failure can retry safely.
        save_state(state_path, fingerprint, instance_id)

    if current_id != instance_id:
        client.put_bucket_custom_domain(BUCKET, tos.models2.CustomDomainRule(domain=DOMAIN, cert_id=instance_id))

    deadline = time.monotonic() + wait_seconds
    while True:
        if read_served() == fingerprint:
            return "deployed"
        if time.monotonic() >= deadline:
            raise MediaCertError("TOS TLS certificate has not propagated yet; reconciliation will retry")
        sleep(5)


def locked_state(state_path: Path):
    """Return a held fd; caller closes it after reconcile."""
    secure_state_dir(state_path)
    lock_path = state_path.with_name("reconcile.lock")
    fd = os.open(lock_path, os.O_RDWR | os.O_CREAT, 0o600)
    fcntl.flock(fd, fcntl.LOCK_EX)
    return fd


def main(argv: list[str] | None = None) -> int:
    os.umask(0o077)
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("command", choices=["auth", "cleanup", "reconcile", "check"])
    parser.add_argument("--lineage", type=Path, default=DEFAULT_LINEAGE)
    parser.add_argument("--state-file", type=Path, default=DEFAULT_STATE)
    parser.add_argument("--env-file", type=Path, help="use only this root-owned 0600 AK/SK file instead of ECS credentials")
    parser.add_argument("--role-name", help="explicit ECS instance role name, otherwise auto-detect")
    args = parser.parse_args(argv)
    try:
        if args.command == "check":
            _, _, local = load_local_certificate(args.lineage)
            if served_fingerprint() != local:
                raise MediaCertError("served TLS leaf does not match local Certbot certificate")
            print("media TLS certificate matches local Certbot lineage")
            return 0
        credentials = CloudCredentials(args.env_file, args.role_name)
        if args.command in {"auth", "cleanup"}:
            key, validation = challenge_from_environment()
            client = tos_client(credentials)
            if args.command == "auth":
                publish_challenge(client, key, validation)
            else:
                cleanup_challenge(client, key, validation)
            return 0
        lock = locked_state(args.state_file)
        try:
            client = tos_client(credentials)
            cert_module, api = cert_client(credentials)
            result = reconcile(client, cert_module, api, args.lineage, args.state_file)
            print(f"media TLS: {result}")
        finally:
            os.close(lock)
        return 0
    except MediaCertError as exc:
        print(f"media cert {args.command} failed: {exc}", file=sys.stderr)
    except Exception as exc:
        # SDK exceptions can contain request payloads with private keys. Never log them.
        print(f"media cert {args.command} failed: {type(exc).__name__}", file=sys.stderr)
    return 1


if __name__ == "__main__":
    raise SystemExit(main())
