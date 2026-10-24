#!/usr/bin/python3 -I
"""Root-owned, project-specific static publisher. Never execute uploaded code."""
import fcntl
import gzip
import hashlib
import json
import os
from pathlib import Path, PurePosixPath
import re
import shutil
import stat
import subprocess
import sys
import tarfile
import tempfile
from urllib.parse import urlsplit
import xml.etree.ElementTree as ET

ROOT = Path('/opt/herong-site')
TEMPLATES = ROOT / 'publisher'
BASE_IMAGE = 'herong-site-nginx:ci-base'
MAX_ARCHIVE = 256 * 1024 * 1024
MAX_TAR = 600 * 1024 * 1024
MAX_BYTES = 512 * 1024 * 1024
MAX_FILE = 128 * 1024 * 1024
MAX_FILES = 25000
RELEASE = re.compile(r'[a-f0-9]{40}-[0-9]{1,20}-[0-9]{1,6}\Z')
ENV = {'PATH': '/usr/sbin:/usr/bin:/sbin:/bin', 'HOME': '/root', 'LANG': 'C.UTF-8'}
GENERATED = {'route-manifest.json', '__site-health.json', 'sitemap.xml'}


def require_space(location, pending=0):
    if shutil.disk_usage(location).free < pending + 256 * 1024 * 1024:
        raise ValueError('Insufficient disk reserve for static publication')


def copy_public_template(source, destination):
    shutil.copyfile(source, destination)
    destination.chmod(0o644)


def safe_name(raw):
    if not isinstance(raw, str) or len(raw) > 4096 or '\\' in raw or any(ord(c) < 32 for c in raw):
        raise ValueError('Invalid archive path')
    if raw.startswith('/'):
        raise ValueError('Absolute archive path')
    parts = raw.split('/')
    if parts and parts[0] == '.':
        parts.pop(0)
    if parts and parts[-1] == '':
        parts.pop()
    if any(part in ('', '.', '..') for part in parts):
        raise ValueError('Noncanonical archive path')
    return '/'.join(parts)


def unpack_checked(tar_path, destination):
    """Manual extraction: no tarfile.extract/all, ownership, links or modes."""
    destination.mkdir(mode=0o700)
    seen = set()
    files = {}
    total = 0
    with tarfile.open(tar_path, mode='r:') as archive:
        for count, member in enumerate(archive, 1):
            if count > MAX_FILES:
                raise ValueError('Too many archive entries')
            name = safe_name(member.name)
            if not name:
                if member.isdir():
                    continue
                raise ValueError('Invalid root archive entry')
            if name in seen:
                raise ValueError('Duplicate archive path')
            seen.add(name)
            if not (member.isfile() or member.isdir()) or member.issparse():
                raise ValueError('Only ordinary files and directories are permitted')
            target = destination.joinpath(*PurePosixPath(name).parts)
            if member.isdir():
                target.mkdir(mode=0o755, parents=True, exist_ok=True)
                continue
            if member.size < 0 or member.size > MAX_FILE:
                raise ValueError('Archive member exceeds file limit')
            total += member.size
            if total > MAX_BYTES:
                raise ValueError('Archive exceeds expanded size limit')
            require_space(destination, member.size)
            target.parent.mkdir(mode=0o755, parents=True, exist_ok=True)
            source = archive.extractfile(member)
            if source is None:
                raise ValueError('Missing regular file payload')
            with source, target.open('xb') as output:
                remaining = member.size
                while remaining:
                    data = source.read(min(1024 * 1024, remaining))
                    if not data:
                        raise ValueError('Truncated archive payload')
                    output.write(data)
                    remaining -= len(data)
            target.chmod(0o644)
            files[name] = member.size
    for directory in destination.rglob('*'):
        if directory.is_dir():
            directory.chmod(0o755)
    destination.chmod(0o755)
    return files


def read_small(path, limit=8 * 1024 * 1024):
    if path.stat().st_size > limit:
        raise ValueError('Oversized build metadata')
    return path.read_bytes()


def verify_bundle(directory, files):
    required = GENERATED | {'index.html', '404.html', 'rss.xml', 'atom.xml', 'feed.json', 'posts/index.html'}
    if not required <= files.keys():
        raise ValueError('Incomplete portfolio and legacy bundle')
    manifest = json.loads(read_small(directory / 'route-manifest.json'))
    health = json.loads(read_small(directory / '__site-health.json', 65536))
    if manifest.get('schema') != 1 or manifest.get('siteRoot') != 'https://herong.info/' or manifest.get('base') != '/' or manifest.get('indexingDisabled', False) is not False:
        raise ValueError('Only the formal production build is accepted')
    if health.get('schema') != 1 or health.get('status') != 'ok' or health.get('app') != 'herong-site':
        raise ValueError('Invalid bundle health metadata')
    canonical = json.dumps(manifest, ensure_ascii=False, separators=(',', ':')).encode()
    expected = hashlib.sha256(canonical + read_small(directory / 'sitemap.xml')).hexdigest()[:16]
    if health.get('buildId') != expected:
        raise ValueError('Build identity does not match manifest and sitemap')
    counts = manifest.get('counts', {})
    actual = {'files': len(files) - len(GENERATED), 'bytes': sum(size for name, size in files.items() if name not in GENERATED), 'html': sum(name.endswith('.html') for name in files)}
    for key, value in actual.items():
        if type(counts.get(key)) is not int or counts[key] != value or health.get(key) != value:
            raise ValueError('Bundle file counts or byte counts do not match')
    routes = manifest.get('routes')
    if not isinstance(routes, list) or len(routes) != actual['html']:
        raise ValueError('Invalid route inventory')
    paths, html_files = set(), set()
    for route in routes:
        name = safe_name(route.get('file'))
        if name not in files or not name.endswith('.html') or name in html_files:
            raise ValueError('Invalid or duplicate HTML route file')
        expected_path = '/' if name == 'index.html' else '/' + (name[:-10] if name.endswith('/index.html') else name[:-5])
        if route.get('path') != expected_path or expected_path in paths or route.get('owner') not in ('site', 'legacy'):
            raise ValueError('Invalid or duplicate route')
        paths.add(expected_path)
        html_files.add(name)
    if not {'/', '/about/', '/products/', '/projects/', '/projects/ai-agent/', '/projects/enterprise/', '/projects/finance/', '/projects/fullstack/', '/projects/video-live/'} <= paths:
        raise ValueError('Required portfolio routes are missing')
    namespace = '{http://www.sitemaps.org/schemas/sitemap/0.9}'
    sitemap = ET.fromstring(read_small(directory / 'sitemap.xml'))
    if sitemap.tag != namespace + 'urlset':
        raise ValueError('Invalid production sitemap')
    urls = [entry.text for entry in sitemap.findall(namespace + 'url/' + namespace + 'loc')]
    if not urls or len(urls) != len(set(urls)):
        raise ValueError('Empty or duplicate production sitemap')
    for url in urls:
        parsed = urlsplit(url or '')
        if parsed.scheme != 'https' or parsed.netloc != 'herong.info' or parsed.query or parsed.fragment:
            raise ValueError('Sitemap contains a nonproduction URL')
    for key, value in {'legacyHtml': sum(route['owner'] == 'legacy' for route in routes), 'sitemap': len(urls)}.items():
        if type(counts.get(key)) is not int or counts[key] != value or type(health.get(key)) is not int or health[key] != value:
            raise ValueError('Legacy or sitemap counts do not match')
    return health


def trusted(path):
    info = path.lstat()
    if path.is_symlink() or info.st_uid != 0 or info.st_mode & 0o022:
        raise ValueError('Publisher templates and parents must be root-owned and not writable by other users')


def command(*args):
    subprocess.run(args, check=True, env=ENV, cwd='/', stdin=subprocess.DEVNULL)


def publish(release):
    if os.geteuid() != 0 or not RELEASE.fullmatch(release):
        raise ValueError('Expected root invocation with <40-char-commit>-<run-id>-<attempt>')
    os.umask(0o077)
    for directory in (ROOT, TEMPLATES, ROOT / 'releases'):
        trusted(directory)
    for name in ('Dockerfile', 'nginx.conf', 'site.conf', 'compose.yaml', 'remote-deploy.sh', 'target-machine.sha256'):
        trusted(TEMPLATES / name)
    expected_machine = (TEMPLATES / 'target-machine.sha256').read_text().strip()
    if not re.fullmatch(r'[a-f0-9]{64}', expected_machine) or hashlib.sha256(Path('/etc/machine-id').read_bytes()).hexdigest() != expected_machine:
        raise ValueError('Publisher is not installed on its independently verified target')
    lock = os.open('/run/lock/herong-site-ci.lock', os.O_CREAT | os.O_WRONLY | os.O_NOFOLLOW, 0o600)
    with os.fdopen(lock, 'w') as lock_file:
        lock_info = os.fstat(lock_file.fileno())
        if not stat.S_ISREG(lock_info.st_mode) or lock_info.st_uid != 0 or lock_info.st_mode & 0o022:
            raise ValueError('Unsafe publisher lock file')
        fcntl.flock(lock_file, fcntl.LOCK_EX | fcntl.LOCK_NB)
        incoming = ROOT / 'incoming' / f'{release}.tar.gz'
        descriptor = os.open(incoming, os.O_RDONLY | os.O_NOFOLLOW | os.O_NONBLOCK)
        with os.fdopen(descriptor, 'rb') as source:
            source_info = os.fstat(source.fileno())
            if not stat.S_ISREG(source_info.st_mode) or not 0 < source_info.st_size <= MAX_ARCHIVE:
                raise ValueError('Incoming archive is not a bounded regular file')
            if shutil.disk_usage(ROOT).free < 768 * 1024 * 1024:
                raise ValueError('Insufficient free disk; no images or other projects will be deleted')
            release_dir = ROOT / 'releases' / release
            if release_dir.exists():
                raise ValueError('Release already exists; retry with a new CI run attempt')
            command('docker', 'image', 'inspect', '--format', '{{.Id}}', BASE_IMAGE)
            with tempfile.TemporaryDirectory(prefix='.ci-work-', dir=ROOT) as work_name:
                work = Path(work_name)
                private_archive = work / 'bundle.tar.gz'
                digest = hashlib.sha256()
                with private_archive.open('xb') as output:
                    total = 0
                    while True:
                        chunk = source.read(1024 * 1024)
                        if not chunk:
                            break
                        total += len(chunk)
                        if total > MAX_ARCHIVE:
                            raise ValueError('Incoming archive grew past its limit')
                        require_space(work, len(chunk))
                        digest.update(chunk)
                        output.write(chunk)
                if total != source_info.st_size:
                    raise ValueError('Incoming archive changed during private snapshot')
                raw_tar = work / 'bundle.tar'
                with gzip.open(private_archive, 'rb') as zipped, raw_tar.open('xb') as output:
                    expanded = 0
                    while True:
                        chunk = zipped.read(1024 * 1024)
                        if not chunk:
                            break
                        expanded += len(chunk)
                        if expanded > MAX_TAR:
                            raise ValueError('Compressed archive exceeds decompression limit')
                        require_space(work, len(chunk))
                        output.write(chunk)
                context = work / 'context'
                context.mkdir()
                files = unpack_checked(raw_tar, context / 'public')
                health = verify_bundle(context / 'public', files)
                private_archive.unlink()
                raw_tar.unlink()
                for name in ('Dockerfile', 'nginx.conf', 'site.conf'):
                    copy_public_template(TEMPLATES / name, context / name)
                image = f'herong-site:{release}'
                require_space(ROOT, sum(files.values()) * 2)
                command('docker', 'build', '--platform', 'linux/amd64', '--network', 'none', '--pull=false', '--build-arg', f'NGINX_IMAGE={BASE_IMAGE}', '--build-arg', f'RELEASE_ID={release}', '-t', image, str(context))
                command('docker', 'run', '--rm', '--read-only', '--tmpfs', '/tmp:mode=1777', image, '-t')
                release_dir.mkdir(mode=0o700)
                for name in ('compose.yaml', 'remote-deploy.sh'):
                    shutil.copyfile(TEMPLATES / name, release_dir / name)
                (release_dir / 'site.env').write_text(f'SITE_IMAGE={image}\nSITE_PORT=24380\n')
                (release_dir / 'expected-build-id').write_text(health['buildId'] + '\n')
                (release_dir / 'ci-receipt.json').write_text(json.dumps({'release': release, 'archiveSha256': digest.hexdigest(), 'health': health}, indent=2) + '\n')
                command('/bin/bash', str(release_dir / 'remote-deploy.sh'), release)
        # Remove only the consumed incoming object, never another upload.
        current_info = incoming.lstat()
        if (current_info.st_dev, current_info.st_ino) == (source_info.st_dev, source_info.st_ino):
            incoming.unlink()
        print(f'Published static portfolio release {release}; buildId={health["buildId"]}')


if __name__ == '__main__':
    try:
        if len(sys.argv) != 2:
            raise ValueError('Expected exactly one release ID argument')
        publish(sys.argv[1])
    except Exception as error:
        print(f'Site publish refused or failed: {error}', file=sys.stderr)
        sys.exit(1)
