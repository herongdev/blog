#!/usr/bin/env python3
"""Fixed-root release helper, executed over SSH stdin by deploy.py."""

from __future__ import annotations

from datetime import datetime, timezone
import hashlib
import fcntl
import ipaddress
import json
import os
from pathlib import Path, PurePosixPath
import re
import shutil
import stat
import sys
import tarfile
from urllib.parse import urlsplit

ROOTS = {
    "production": Path("/var/www/herong-dev-guides"),
    "staging": Path("/var/www/herong-dev-guides-staging"),
}
ENVIRONMENT = "production"
BASE = ROOTS[ENVIRONMENT]
RELEASE_RE = re.compile(r"^[A-Za-z0-9][A-Za-z0-9._-]{0,79}$")
SITES = {
    "production": {"domain": "https://dev.herong.info", "preview_base": "/dev/"},
    "staging": {"domain": "https://test-dev.herong.info", "preview_base": "/test-dev/"},
}


def sha(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def directory(path: Path) -> None:
    if not path.exists() and not path.is_symlink():
        path.mkdir(mode=0o755)
    if not stat.S_ISDIR(path.lstat().st_mode) or path.is_symlink():
        raise RuntimeError(f"Not a real directory: {path}")


def current_target() -> Path | None:
    path = BASE / "current"
    if not path.exists() and not path.is_symlink():
        return None
    if not path.is_symlink():
        raise RuntimeError("current is not a managed symlink")
    target = path.resolve(strict=True)
    if target.parent != BASE / "releases" or not RELEASE_RE.fullmatch(target.name):
        raise RuntimeError("current points outside managed releases")
    return target


def verify(release: Path) -> dict:
    directory(release)
    directory(release / "web")
    for name in ("manifest.json", "release.json"):
        if (release / name).is_symlink() or not (release / name).is_file():
            raise RuntimeError("release metadata is not an ordinary file")
    manifest = json.loads((release / "manifest.json").read_text())
    metadata = json.loads((release / "release.json").read_text())
    if metadata.get("release") != release.name or metadata.get("environment") != ENVIRONMENT or metadata.get("manifest_sha256") != sha(release / "manifest.json"):
        raise RuntimeError("release metadata/manifest mismatch")
    site, base_path = metadata.get("site", ""), metadata.get("base_path", "")
    origin = urlsplit(site)
    try:
        ipaddress.ip_address(origin.hostname or "")
        valid_origin = origin.scheme == "https" and not origin.username and not origin.password and origin.port is None and not origin.path and not origin.query and not origin.fragment
        valid_base = base_path == SITES[ENVIRONMENT]["preview_base"]
    except ValueError:
        valid_origin = site == SITES[ENVIRONMENT]["domain"]
        valid_base = base_path == "/"
    if not valid_origin or not valid_base or metadata.get("public_url") != site + base_path:
        raise RuntimeError("release origin/base does not match its environment")
    files = manifest.get("files", [])
    names = {item["path"] for item in files}
    actual = {p.relative_to(release / "web").as_posix() for p in (release / "web").rglob("*") if p.is_file()}
    if any(p.is_symlink() for p in (release / "web").rglob("*")):
        raise RuntimeError("release contains a symlink")
    if manifest.get("version") != 1 or not files or len(names) != len(files) or names != actual:
        raise RuntimeError("release file set differs from manifest")
    for item in files:
        relative = PurePosixPath(item["path"])
        if relative.is_absolute() or any(p in {"", ".", "..", "author", "drafts", "node_modules"} or p.startswith(".") for p in relative.parts):
            raise RuntimeError("unsafe manifest path")
        path = release / "web" / item["path"]
        if path.is_symlink() or not path.is_file() or path.stat().st_size != item["size"] or sha(path) != item["sha256"]:
            raise RuntimeError(f"release hash mismatch: {item['path']}")
    return manifest


def activate(release: Path) -> None:
    manifest = verify(release)
    previous = current_target()
    directory(BASE / "shared")
    directory(BASE / "shared/_astro")
    # Hashed assets stay available to older browser tabs and rollback releases.
    for item in manifest["files"]:
        if not item["path"].startswith("_astro/"):
            continue
        source = release / "web" / item["path"]
        target = BASE / "shared" / item["path"]
        for parent in reversed(target.parent.relative_to(BASE / "shared").parents):
            directory(BASE / "shared" / parent)
        directory(target.parent)
        if target.exists() or target.is_symlink():
            if target.is_symlink() or not target.is_file() or sha(target) != item["sha256"]:
                raise RuntimeError("immutable shared asset collision")
            continue
        temporary = target.with_name(target.name + ".next")
        with temporary.open("xb") as destination, source.open("rb") as origin:
            shutil.copyfileobj(origin, destination)
        temporary.chmod(0o644)
        os.replace(temporary, target)
    if previous == release:
        print(json.dumps({"status": "already-current", "release": release.name}))
        return
    if previous:
        temporary_previous = BASE / ("previous." + release.name + ".next")
        temporary_previous.symlink_to(previous)
        os.replace(temporary_previous, BASE / "previous")
    temporary_current = BASE / ("current." + release.name + ".next")
    temporary_current.symlink_to(release)
    os.replace(temporary_current, BASE / "current")
    result = {"status": "activated", "environment": ENVIRONMENT, "release": release.name, "previous": previous.name if previous else None, "at_utc": datetime.now(timezone.utc).isoformat()}
    temporary_status = BASE / "last-deployment.json.next"
    temporary_status.write_text(json.dumps(result, indent=2))
    os.replace(temporary_status, BASE / "last-deployment.json")
    print(json.dumps(result))


def operation(mode: str, release_id: str, parameters: list[str]) -> None:
    if mode in {"prepare", "install"} and (BASE / ".author-managed").exists():
        raise RuntimeError("This site is managed by the online author. Publish from /dev-admin/; local content must not overwrite server articles.")
    expected = {"prepare": 1, "install": 2, "activate": 0}
    if mode not in expected or len(parameters) != expected[mode] or not RELEASE_RE.fullmatch(release_id):
        raise RuntimeError("invalid release operation")
    if mode == "install" and (not re.fullmatch(r"[a-f0-9]{64}", parameters[0]) or parameters[1] not in {"stage", "activate"}):
        raise RuntimeError("invalid install parameters")
    directory(BASE / "releases")
    directory(BASE / "incoming")
    release = BASE / "releases" / release_id
    if mode == "activate":
        activate(release)
        return
    if release.exists() or release.is_symlink():
        raise RuntimeError("release already exists; choose a new release ID")
    if mode == "prepare":
        size = int(parameters[0])
        free = shutil.disk_usage(BASE).free
        if size <= 0 or free < max(size * 5, 50 * 1024 * 1024):
            raise RuntimeError("insufficient space for release")
        previous = current_target()
        print(json.dumps({"status": "ready", "environment": ENVIRONMENT, "free_bytes": free, "current": previous.name if previous else None}))
        return
    archive = BASE / "incoming" / (release_id + ".tar.gz")
    if archive.is_symlink() or not archive.is_file() or sha(archive) != parameters[0]:
        raise RuntimeError("uploaded archive hash mismatch")
    release.mkdir(mode=0o755)
    total = 0
    seen = set()
    with tarfile.open(archive, "r:gz") as tar:
        for member in tar:
            relative = PurePosixPath(member.name)
            if member.name in seen or not member.isfile() or relative.is_absolute() or any(p in {"", ".", ".."} or p.startswith(".") for p in relative.parts):
                raise RuntimeError("unsafe archive member")
            if member.name not in {"manifest.json", "release.json"} and (relative.parts[0] != "web" or len(relative.parts) < 2):
                raise RuntimeError("unexpected archive member")
            seen.add(member.name)
            total += member.size
            if len(seen) > 10000 or total > 512 * 1024 * 1024:
                raise RuntimeError("archive exceeds public site limits")
            target = release / member.name
            target.parent.mkdir(mode=0o755, parents=True, exist_ok=True)
            with tar.extractfile(member) as source, target.open("xb") as destination:
                shutil.copyfileobj(source, destination)
            target.chmod(0o644)
    verify(release)
    archive.unlink()
    if parameters[1] == "activate":
        activate(release)
    else:
        print(json.dumps({"status": "staged", "environment": ENVIRONMENT, "release": release.name}))


def main() -> None:
    global ENVIRONMENT, BASE
    if len(sys.argv) < 4 or sys.argv[1] not in ROOTS:
        raise RuntimeError("required environment production|staging is missing")
    ENVIRONMENT, mode, release_id, *parameters = sys.argv[1:]
    BASE = ROOTS[ENVIRONMENT]
    directory(BASE)
    # Keep verification and current/previous updates serial within this environment.
    descriptor = os.open(BASE / ".release.lock", os.O_CREAT | os.O_RDWR | os.O_NOFOLLOW, 0o600)
    with os.fdopen(descriptor, "a") as lock:
        fcntl.flock(lock.fileno(), fcntl.LOCK_EX)
        operation(mode, release_id, parameters)


if __name__ == "__main__":
    main()
