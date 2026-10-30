#!/usr/bin/env python3
"""Install an already uploaded, verified author release. Run as root via SSH."""
from pathlib import Path, PurePosixPath
import hashlib
import json
import os
import pwd
import secrets
import shutil
import subprocess
import sys
import tarfile
from datetime import datetime, timezone

BASE = Path('/opt/herong-dev-guides-author')
DATA = Path('/var/lib/herong-dev-guides-author')
CONFIG = Path('/etc/herong-dev-guides-author')
USER = 'dev-guides-author'
release, expected = sys.argv[1:3]
if not release or any(c not in '0123456789TZ-' for c in release):
    raise RuntimeError('Invalid release ID')
archive = BASE / 'incoming' / (release + '.tar.gz')
if hashlib.sha256(archive.read_bytes()).hexdigest() != expected:
    raise RuntimeError('Upload checksum mismatch')
target = BASE / 'releases' / release
target.mkdir(parents=True, exist_ok=False)
with tarfile.open(archive) as bundle:
    for member in bundle.getmembers():
        path = PurePosixPath(member.name)
        if path.is_absolute() or '..' in path.parts or not (member.isfile() or member.isdir()):
            raise RuntimeError('Unsafe author archive')
    bundle.extractall(target)
for path in target.rglob('*'):
    path.chmod(0o755 if path.is_dir() else 0o644)
runtime = BASE / 'runtime'
node = runtime / 'bin/node'
if not node.is_file():
    node_archive = BASE / 'incoming/node-v24.22.0-linux-x64.tar.xz'
    if hashlib.sha256(node_archive.read_bytes()).hexdigest() != 'cc2f601cee82d9a5a233302fe307abc600727035fd7d2c3a3571755989e95008':
        raise RuntimeError('Node archive checksum mismatch')
    runtime.mkdir(exist_ok=True)
    with tarfile.open(node_archive) as bundle:
        for member in bundle.getmembers():
            parts = PurePosixPath(member.name).parts[1:]
            if not parts:
                continue
            if '..' in parts or PurePosixPath(*parts).is_absolute():
                raise RuntimeError('Unsafe Node archive')
            member.name = str(PurePosixPath(*parts))
            bundle.extract(member, runtime)
env = dict(os.environ, PATH=str(runtime / 'bin') + ':/usr/bin:/bin')
if not (runtime / 'bin/pnpm').exists():
    subprocess.run([str(runtime / 'bin/npm'), 'install', '--global', '--prefix', str(runtime), 'pnpm@10.28.0', '--registry=https://registry.npmjs.org'], env=env, check=True)
subprocess.run([str(runtime / 'bin/pnpm'), 'install', '--filter', '@herong/dev-guides', '--filter', '@herong/dev-guides-author', '--frozen-lockfile', '--registry=https://registry.npmjs.org'], cwd=target / 'code', env=env, check=True)
try:
    account = pwd.getpwnam(USER)
except KeyError:
    subprocess.run(['useradd', '--system', '--home-dir', str(DATA), '--shell', '/sbin/nologin', '--no-create-home', USER], check=True)
    account = pwd.getpwnam(USER)
DATA.mkdir(exist_ok=True, mode=0o700)
project = DATA / 'project'
app = target / 'code/apps/dev-guides'
first_install = not project.exists()
if first_install:
    project.mkdir(mode=0o700)
    (project / 'src/content').mkdir(parents=True, mode=0o700)
    shutil.copytree(app / 'src/content/tutorials', project / 'src/content/tutorials')
    (project / 'drafts').mkdir(mode=0o700)
# Templates are code, articles and drafts are persistent user data.
shutil.copytree(app / 'templates', project / 'templates', dirs_exist_ok=True)
auth = DATA / 'auth'
auth.mkdir(exist_ok=True, mode=0o700)
token = auth / 'bootstrap-token'
if not (auth / 'account.json').exists() and not (auth / 'wechat-account.json').exists() and not token.exists():
    token.write_text(secrets.token_urlsafe(32) + '\n')
for path in [DATA, *DATA.rglob('*')]:
    if path.is_symlink():
        continue
    os.chown(path, account.pw_uid, account.pw_gid)
    path.chmod(0o700 if path.is_dir() else 0o600)
CONFIG.mkdir(exist_ok=True, mode=0o700)
config = CONFIG / 'service.env'
if not config.exists():
    config.write_text('AUTHOR_PUBLIC_ORIGIN=https://dev.herong.info\nAUTHOR_BASE_PATH=/admin/\nAUTHOR_DATA_ROOT=/var/lib/herong-dev-guides-author\nAUTHOR_PORT=24320\nAUTHOR_PNPM_COMMAND=/opt/herong-dev-guides-author/runtime/bin/pnpm\nAUTHOR_PUBLISH_TARGET=domains\nAUTHOR_AUTH_PROVIDER=wechat\n')
config.chmod(0o600)
media = CONFIG / 'media.env'
if not media.exists():
    raise RuntimeError('Secure media.env must be provisioned separately before activation')
media.chmod(0o600)
for root in [Path('/var/www/herong-dev-guides'), Path('/var/www/herong-dev-guides-staging')]:
    for path in [root, root / 'releases', root / 'shared', root / 'shared/_astro']:
        if not path.is_dir() or path.is_symlink():
            raise RuntimeError('Unexpected publishing directory')
        os.chown(path, account.pw_uid, account.pw_gid)
        path.chmod(0o755)
    (root / '.author-managed').write_text('Content is maintained by the online author service. Do not deploy local article copies.\n')
    (root / '.author-managed').chmod(0o644)
backup_root = Path('/var/backups/herong-dev-guides-author')
backup_root.mkdir(exist_ok=True, mode=0o700)
infra = target / 'code/infra/dev-guides/author'
for name in ['herong-dev-guides-author.service', 'herong-dev-guides-author-backup.service', 'herong-dev-guides-author-backup.timer']:
    subprocess.run(['systemd-analyze', 'verify', str(infra / name)], env=env, check=True)
    shutil.copyfile(infra / name, Path('/etc/systemd/system') / name)
    (Path('/etc/systemd/system') / name).chmod(0o644)
previous = (BASE / 'current').resolve() if (BASE / 'current').exists() else None
if previous:
    previous_link = BASE / 'previous.next'
    previous_link.symlink_to(previous)
    previous_link.replace(BASE / 'previous')
temporary = BASE / 'current.next'
temporary.symlink_to(target)
temporary.replace(BASE / 'current')
subprocess.run(['systemctl', 'daemon-reload'], check=True)
subprocess.run(['systemctl', 'enable', '--now', 'herong-dev-guides-author'], check=True)
subprocess.run(['systemctl', 'restart', 'herong-dev-guides-author'], check=True)
subprocess.run(['systemctl', 'enable', '--now', 'herong-dev-guides-author-backup.timer'], check=True)
subprocess.run(['systemctl', 'start', 'herong-dev-guides-author-backup.service'], check=True)
print(json.dumps({'release':release,'initialized':first_install,'previous':str(previous) if previous else None}))
