#!/usr/bin/env python3
"""Install the reviewed fork patch and pinned runtimes. Does not log in or publish."""
import argparse
import hashlib
import json
import os
from pathlib import Path
import platform
import shutil
import subprocess
import tarfile
import tempfile
import urllib.request
import zipfile

ROOT = Path(__file__).resolve().parent
LOCK = json.loads((ROOT / 'fork-lock.json').read_text())


def command(*args, **kwargs):
    subprocess.run([str(arg) for arg in args], check=True, **kwargs)


def prepare_fork(vendor, lock, patch_file):
    """Validate a local checkout and apply only a reviewed, reproducible patch."""
    vendor, patch_file = Path(vendor).resolve(), Path(patch_file).resolve()

    def git(*args):
        return subprocess.check_output(['git', '-C', str(vendor), *args], text=True)

    def matches(names):
        return all((vendor / name).is_file()
                   and hashlib.sha256((vendor / name).read_bytes()).hexdigest() == lock['patched_files'][name]
                   for name in names)

    expected = set(lock['patched_files'])
    if not expected:
        raise RuntimeError('Fork patch has no reviewed file digests')
    head = git('rev-parse', 'HEAD').strip()
    if head not in {lock['baseline_sha'], lock.get('patched_sha')}:
        raise RuntimeError('Existing fork has an unreviewed commit; preserve it and review manually')
    changed = set(filter(None, git('diff', '--name-only', '-z', 'HEAD', '--').split('\0')))
    changed.update(filter(None, git('diff', '--cached', '--name-only', '-z', 'HEAD', '--').split('\0')))
    untracked = set(filter(None, git('ls-files', '--others', '--exclude-standard', '-z').split('\0')))
    if (changed | untracked) - expected:
        raise RuntimeError('Existing fork contains unknown changes; preserve them and review manually')
    if matches(expected):
        return
    if changed or untracked:
        raise RuntimeError('Existing fork differs from the reviewed patch; preserve changes and review manually')

    include = []
    if head != lock['baseline_sha']:
        # The historical seven-file commit predates the bundled-resource fix.
        resource_file = 'utils/base_social_media.py'
        if resource_file not in expected or not matches(expected - {resource_file}):
            raise RuntimeError('Historical fork does not match its reviewed files; review manually')
        include = ['--include=' + resource_file]
    command('git', '-C', vendor, 'apply', '--check', *include, patch_file)
    command('git', '-C', vendor, 'apply', *include, patch_file)
    if not matches(expected):
        raise RuntimeError('Applied fork patch does not match the reviewed file digests')


def install_biliup():
    system = {'Darwin': 'macos', 'Linux': 'linux', 'Windows': 'windows'}.get(platform.system())
    machine = {'arm64': 'aarch64', 'AMD64': 'x86_64', 'amd64': 'x86_64'}.get(platform.machine(), platform.machine())
    suffix = f'{machine}-{system}.'
    matches = [(name, data) for name, data in LOCK['biliup']['assets'].items() if suffix in name]
    if len(matches) != 1:
        raise RuntimeError(f'No reviewed biliup artifact for {system}/{machine}')
    name, asset = matches[0]
    if not asset['sha256']:
        raise RuntimeError('Release has no SHA256 digest; review before installation')
    destination = ROOT / '.vendor/biliup'
    destination.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory(prefix='publisher-biliup-') as directory:
        archive = Path(directory) / name
        urllib.request.urlretrieve(asset['url'], archive)
        if hashlib.sha256(archive.read_bytes()).hexdigest() != asset['sha256']:
            raise RuntimeError('biliup archive checksum mismatch')
        extract = Path(directory) / 'extract'
        extract.mkdir()
        if name.endswith('.zip'):
            with zipfile.ZipFile(archive) as zipped:
                for member in zipped.infolist():
                    if not (extract / member.filename).resolve().is_relative_to(extract.resolve()):
                        raise RuntimeError('Archive path escapes extraction directory')
                zipped.extractall(extract)
        else:
            with tarfile.open(archive) as tar:
                tar.extractall(extract, filter='data')
        candidates = [p for p in extract.rglob('*') if p.name in ('biliup', 'biliup.exe') and p.is_file()]
        if len(candidates) != 1: raise RuntimeError('Unexpected biliup executable layout')
        binary = destination / 'biliup'
        shutil.copy2(candidates[0], binary)
        binary.chmod(0o700)
        (destination / 'installed.json').write_text(json.dumps({'version': LOCK['biliup']['version'], 'sha256': hashlib.sha256(binary.read_bytes()).hexdigest()}) + '\n')
        for notice in extract.rglob('*NOTICES*'):
            shutil.copy2(notice, destination / notice.name)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--skip-browser', action='store_true')
    parser.add_argument('--skip-biliup', action='store_true')
    args = parser.parse_args()
    vendor = Path(os.environ.get('PUBLISHER_SAU_ROOT', ROOT / '.vendor/social-auto-upload')).resolve()
    if not vendor.exists():
        vendor.parent.mkdir(parents=True, exist_ok=True)
        command('git', 'clone', '--no-checkout', '--filter=blob:none', LOCK['repository'], vendor)
        command('git', '-C', vendor, 'checkout', '-b', LOCK['branch'], LOCK['baseline_sha'])
    prepare_fork(vendor, LOCK, ROOT / LOCK['patch_file'])
    if not (vendor / 'conf.py').exists():
        shutil.copyfile(vendor / 'conf.example.py', vendor / 'conf.py')
    venv = ROOT / '.venv'
    if not venv.exists(): command('uv', 'venv', '--python', '3.12', venv)
    python = venv / 'bin/python'
    command('uv', 'pip', 'install', '--python', python, '-r', ROOT / 'requirements.lock')
    if not args.skip_browser:
        env = {**os.environ, 'PLAYWRIGHT_SKIP_BROWSER_GC': '1'}
        env.setdefault('PLAYWRIGHT_BROWSERS_PATH', str(ROOT / '.vendor/browsers'))
        command(python, '-m', 'patchright', 'install', 'chromium', env=env)
    if not args.skip_biliup: install_biliup()
    print('Installed. Real account login and video posting have not been tested.')


if __name__ == '__main__': main()
