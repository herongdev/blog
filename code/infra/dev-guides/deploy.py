#!/usr/bin/env python3
"""Build and release only the public Astro site; never upload authoring secrets."""

from __future__ import annotations

import argparse
from datetime import datetime, timezone
import hashlib
from html.parser import HTMLParser
import ipaddress
import json
import os
from pathlib import Path
import re
import shlex
import stat
import subprocess
import tarfile
import tempfile
from urllib.parse import urlsplit

INFRA = Path(__file__).resolve().parent
CODE = INFRA.parent.parent
APP = CODE / "apps/dev-guides"
DIST = APP / "dist"
PROFILES = {
    "production": {"root": "/var/www/herong-dev-guides", "domain": "dev.herong.info", "preview_base": "/dev/"},
    "staging": {"root": "/var/www/herong-dev-guides-staging", "domain": "test-dev.herong.info", "preview_base": "/test-dev/"},
}
RELEASE_RE = re.compile(r"^[A-Za-z0-9][A-Za-z0-9._-]{0,79}$")
REQUIRED = {"index.html", "404.html", "robots.txt", "sitemap.xml", "search-index.json"}


def digest(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


class PageMetadata(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.robots: set[str] = set()
        self.canonical: str | None = None

    def handle_starttag(self, tag: str, attributes: list[tuple[str, str | None]]) -> None:
        attrs = dict(attributes)
        if tag == "meta" and attrs.get("name", "").lower() == "robots":
            self.robots.update(value.strip().lower() for value in (attrs.get("content") or "").split(","))
        if tag == "link" and attrs.get("rel") == "canonical":
            self.canonical = attrs.get("href")


def artifacts(site: str, base_path: str, preview: bool) -> list[dict]:
    if not DIST.is_dir() or DIST.is_symlink():
        raise RuntimeError("Astro dist must be an ordinary directory")
    files = []
    for path in sorted(DIST.rglob("*")):
        relative = path.relative_to(DIST)
        if path.is_symlink():
            raise RuntimeError(f"Refusing symlink in public output: {relative}")
        if path.is_dir():
            continue
        if not path.is_file() or any(p.startswith(".") or p in {"author", "drafts", "node_modules"} for p in relative.parts):
            raise RuntimeError(f"Refusing private or irregular output: {relative}")
        if path.suffix.lower() not in {".html", ".css", ".js", ".json", ".xml", ".txt", ".svg", ".png", ".jpg", ".jpeg", ".webp", ".ico", ".woff", ".woff2"}:
            raise RuntimeError(f"Unexpected public output type: {relative}")
        data = path.read_bytes()
        if b"MEDIA_S3_SECRET_ACCESS_KEY=" in data or b"MEDIA_S3_ACCESS_KEY_ID=" in data:
            raise RuntimeError(f"Possible private configuration in output: {relative}")
        if path.suffix.lower() == ".html":
            page = PageMetadata()
            page.feed(data.decode("utf-8"))
            if preview and not {"noindex", "nofollow", "noarchive"}.issubset(page.robots):
                raise RuntimeError(f"Preview page must be noindex, nofollow, noarchive: {relative}")
            if page.canonical and not page.canonical.startswith(site + base_path):
                raise RuntimeError(f"Canonical belongs to another origin/base: {relative}")
        files.append({"path": relative.as_posix(), "sha256": digest(data), "size": len(data)})
    if not REQUIRED.issubset({item["path"] for item in files}):
        raise RuntimeError("Required static routes are missing")
    robots = (DIST / "robots.txt").read_text()
    if preview:
        if not re.search(r"(?im)^Disallow:\s*/\s*$", robots):
            raise RuntimeError("IP/staging preview robots.txt must disallow all crawling")
    elif f"Sitemap: {site}{base_path}sitemap.xml" not in robots:
        raise RuntimeError("robots.txt does not reference the production sitemap")
    return files


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--environment", required=True, choices=PROFILES)
    parser.add_argument("--public-url", help="actual public HTTPS origin without a path")
    parser.add_argument("--base-path", choices=("/", "/dev/", "/test-dev/"), help="IP production /dev/, IP staging /test-dev/, future domains /")
    parser.add_argument("--host", default=os.environ.get("DEV_GUIDES_DEPLOY_HOST", "101.96.210.172"))
    parser.add_argument("--user", default=os.environ.get("DEV_GUIDES_DEPLOY_USER", "root"))
    parser.add_argument("--port", type=int, default=int(os.environ.get("DEV_GUIDES_DEPLOY_PORT", "22")))
    parser.add_argument("--identity-file", default=os.environ.get("DEV_GUIDES_DEPLOY_IDENTITY_FILE", "/Users/ronnie/.ssh/beszel_101_96_210_172"), help="existing SSH private key path; checked without reading its contents")
    parser.add_argument("--release", help="unique release ID; defaults to UTC timestamp plus artifact hash")
    parser.add_argument("--build-only", action="store_true", help="check/build/inspect locally without any SSH")
    parser.add_argument("--stage-only", action="store_true", help="upload and verify without changing current")
    parser.add_argument("--rollback", metavar="RELEASE", help="verify and activate an existing release")
    args = parser.parse_args()
    profile = PROFILES[args.environment]
    if not re.fullmatch(r"[A-Za-z0-9][A-Za-z0-9.-]{0,252}", args.host) or not re.fullmatch(r"[A-Za-z_][A-Za-z0-9_-]{0,31}", args.user):
        parser.error("invalid SSH host or user")
    if not 1 <= args.port <= 65535:
        parser.error("invalid SSH port")
    identity = Path(args.identity_file).expanduser().absolute()
    try:
        identity_mode = identity.lstat().st_mode
    except OSError:
        parser.error("SSH identity file is unavailable")
    if not stat.S_ISREG(identity_mode):
        parser.error("SSH identity must be an ordinary file, not a symlink or directory")
    if args.rollback and (args.release or args.stage_only or args.build_only):
        parser.error("--rollback cannot be combined with release/build/stage options")
    for value in (args.release, args.rollback):
        if value and not RELEASE_RE.fullmatch(value):
            parser.error("invalid release ID")
    if args.rollback and (args.public_url or args.base_path):
        parser.error("--rollback reuses the saved release origin/base; omit --public-url and --base-path")
    if not args.rollback and not args.public_url:
        parser.error("--public-url is required; use the existing IP HTTPS origin until domain filing is complete")
    site = (args.public_url or "").rstrip("/")
    base_path = args.base_path or "/"
    preview = args.environment == "staging"
    if not args.rollback:
        parsed = urlsplit(site)
        try:
            origin_port = parsed.port
        except ValueError:
            parser.error("invalid public URL port")
        if parsed.scheme != "https" or not parsed.hostname or parsed.username or parsed.password or parsed.path or parsed.query or parsed.fragment:
            parser.error("--public-url must be an HTTPS origin without credentials, path, query or fragment")
        try:
            ipaddress.ip_address(parsed.hostname)
            preview = True
            if parsed.hostname != args.host or origin_port not in {None, 443}:
                parser.error("IP previews must use the SSH target IP on the existing HTTPS port 443")
            if base_path != profile["preview_base"]:
                parser.error(f"{args.environment} IP preview requires --base-path {profile['preview_base']}")
            site = "https://" + parsed.hostname
        except ValueError:
            if parsed.hostname != profile["domain"] or parsed.scheme != "https" or origin_port is not None:
                parser.error("domain origin must match the selected environment's approved HTTPS domain")
            if base_path != "/":
                parser.error("future domain deployments require --base-path /")
    target = f"{args.user}@{args.host}"
    ssh_options = ["-i", str(identity), "-o", "IdentitiesOnly=yes", "-o", "BatchMode=yes", "-o", "ConnectTimeout=10", "-o", "StrictHostKeyChecking=yes"]
    remote_source = (INFRA / "remote-release.py").read_text()

    def remote(*parameters: str) -> None:
        command = "python3 - " + " ".join(shlex.quote(p) for p in (args.environment, *parameters))
        subprocess.run(["ssh", "-p", str(args.port), *ssh_options, target, command], input=remote_source, text=True, check=True)

    if args.rollback:
        remote("activate", args.rollback)
        return
    env = {**os.environ, "PUBLIC_SITE_URL": site, "PUBLIC_BASE_PATH": base_path, "PUBLIC_DEPLOY_ENV": args.environment}
    subprocess.run(["pnpm", "--filter", "@herong/dev-guides", "check"], cwd=CODE, env=env, check=True)
    subprocess.run(["pnpm", "--filter", "@herong/dev-guides", "build"], cwd=CODE, env=env, check=True)
    files = artifacts(site, base_path, preview)
    manifest = json.dumps({"version": 1, "files": files}, sort_keys=True, separators=(",", ":")).encode()
    manifest_hash = digest(manifest)
    release = args.release or datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%SZ-") + manifest_hash[:12]
    print(json.dumps({"environment": args.environment, "site": site, "base_path": base_path, "public_url": site + base_path, "preview": preview, "release": release, "files": len(files), "bytes": sum(item["size"] for item in files), "manifest_sha256": manifest_hash}), flush=True)
    if args.build_only:
        return
    metadata = {
        "release": release,
        "environment": args.environment,
        "site": site,
        "base_path": base_path,
        "public_url": site + base_path,
        "preview": preview,
        "manifest_sha256": manifest_hash,
        "built_at_utc": datetime.now(timezone.utc).isoformat(),
        "git_head": subprocess.check_output(["git", "rev-parse", "HEAD"], cwd=CODE, text=True).strip(),
        "working_tree_changes": bool(subprocess.check_output(["git", "status", "--porcelain", "--", "code/apps/dev-guides", "code/pnpm-lock.yaml"], cwd=CODE.parent, text=True)),
    }
    with tempfile.TemporaryDirectory(prefix="herong-dev-guides-") as staging:
        stage = Path(staging)
        (stage / "manifest.json").write_bytes(manifest)
        (stage / "release.json").write_text(json.dumps(metadata, ensure_ascii=False, indent=2))
        archive = stage / f"{release}.tar.gz"
        with tarfile.open(archive, "w:gz") as tar:
            for item in files:
                tar.add(DIST / item["path"], arcname="web/" + item["path"], recursive=False)
            for name in ("manifest.json", "release.json"):
                tar.add(stage / name, arcname=name, recursive=False)
        archive_hash = digest(archive.read_bytes())
        remote("prepare", release, str(archive.stat().st_size))
        subprocess.run(["scp", "-P", str(args.port), *ssh_options, str(archive), f"{target}:{profile['root']}/incoming/{release}.tar.gz"], check=True)
        remote("install", release, archive_hash, "stage" if args.stage_only else "activate")
    print(f"{'Staged' if args.stage_only else 'Activated'} {args.environment}/{release}: {site}{base_path}", flush=True)


if __name__ == "__main__":
    main()
