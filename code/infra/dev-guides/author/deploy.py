#!/usr/bin/env python3
"""Deploy author code only; never overwrite online articles, drafts or auth state."""
from pathlib import Path
from datetime import datetime, timezone
import argparse
import hashlib
import os
import re
import shlex
import subprocess
import tarfile
import tempfile

INFRA = Path(__file__).resolve().parent
CODE = INFRA.parents[2]
APP = CODE / 'apps/dev-guides'
BASE = '/opt/herong-dev-guides-author'

def read_author_base_path(ssh):
    # Read only this non-secret setting; do not source or print service.env.
    script = '''from pathlib import Path
import re
config = Path('/etc/herong-dev-guides-author/service.env')
if not config.exists():
    base = '/admin/'
else:
    values = [line.partition('=')[2] for line in config.read_text().splitlines() if line.startswith('AUTHOR_BASE_PATH=')]
    if len(values) != 1:
        raise RuntimeError('Existing service.env must contain exactly one AUTHOR_BASE_PATH')
    base = values[0]
if not re.fullmatch(r'/(?:[a-z0-9-]+/)*', base):
    raise RuntimeError('Invalid configured author base path')
print(base)
'''
    result = subprocess.run([*ssh, shlex.join(['python3', '-c', script])], capture_output=True, text=True, check=True)
    base = result.stdout.strip()
    if not re.fullmatch(r'/(?:[a-z0-9-]+/)*', base):
        raise RuntimeError('Invalid author base path received from server')
    return base

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--runtime-archive', type=Path)
    parser.add_argument('--identity-file', type=Path, default=Path('/Users/ronnie/.ssh/beszel_101_96_210_172'))
    args = parser.parse_args()
    ssh = ['ssh', '-i', str(args.identity_file), '-o', 'IdentitiesOnly=yes', '-o', 'BatchMode=yes', '-o', 'StrictHostKeyChecking=yes', 'root@101.96.210.172']
    scp = ['scp', '-i', str(args.identity_file), '-o', 'IdentitiesOnly=yes', '-o', 'StrictHostKeyChecking=yes']
    base_path = read_author_base_path(ssh)
    subprocess.run(['pnpm', '--filter', '@herong/dev-guides-author', 'build'], cwd=CODE, env=dict(os.environ, AUTHOR_BASE_PATH=base_path), check=True)
    release = datetime.now(timezone.utc).strftime('%Y%m%dT%H%M%SZ')
    def remote(command):
        subprocess.run([*ssh, command], check=True)
    remote('install -d -m 0755 /opt/herong-dev-guides-author/incoming')
    if args.runtime_archive:
        subprocess.run([*scp, str(args.runtime_archive), 'root@101.96.210.172:' + BASE + '/incoming/'], check=True)
    with tempfile.TemporaryDirectory(prefix='dev-guides-author-') as temporary:
        archive = Path(temporary) / (release + '.tar.gz')
        def safe(member):
            parts = Path(member.name).parts
            if any(part in {'node_modules', 'drafts', '.git', '.astro', '.vite', 'test-results', '.history', '.library.json', '__pycache__'} or part.startswith('.env') or part.endswith('.env') for part in parts):
                return None
            if not (member.isfile() or member.isdir()):
                raise RuntimeError('Do not bundle symlinks or irregular source files')
            member.uid = member.gid = 0
            member.uname = member.gname = ''
            member.mode = 0o755 if member.isdir() else 0o644
            return member
        with tarfile.open(archive, 'w:gz') as bundle:
            for name in ['package.json', 'pnpm-lock.yaml', 'pnpm-workspace.yaml']:
                bundle.add(CODE / name, arcname='code/' + name, filter=safe)
            for name in ['src', 'public', 'scripts', 'templates', 'author', 'package.json', 'astro.config.mjs', 'tsconfig.json']:
                bundle.add(APP / name, arcname='code/apps/dev-guides/' + name, filter=safe)
            bundle.add(INFRA, arcname='code/infra/dev-guides/author', filter=safe)
        checksum = hashlib.sha256(archive.read_bytes()).hexdigest()
        subprocess.run([*scp, str(archive), 'root@101.96.210.172:' + BASE + '/incoming/'], check=True)
        installer = BASE + '/incoming/install.py'
        subprocess.run([*scp, str(INFRA / 'install.py'), 'root@101.96.210.172:' + installer], check=True)
        remote(shlex.join(['python3', installer, release, checksum]))
    print('Author code deployed:', release)

if __name__ == '__main__':
    main()
