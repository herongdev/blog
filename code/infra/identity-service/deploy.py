#!/usr/bin/env python3
"""Prepare or explicitly apply the isolated Herong identity service release."""
import argparse
from datetime import datetime, timezone
import hashlib
import io
import json
import os
from pathlib import Path
import re
import shlex
import stat
import subprocess
import tarfile
import tempfile
import time
import uuid

INFRA = Path(__file__).resolve().parent
APP = INFRA.parents[1] / 'apps/identity-service'
PUBLIC = APP / 'admin/dist'
HOST = '101.96.210.172'
KEY = Path('/Users/ronnie/.ssh/beszel_101_96_210_172')
KNOWN_HOSTS = Path('/Users/ronnie/.ssh/known_hosts')
REQUIRED_SOURCE_NAMES = ('package.json', 'config.mjs', 'store.mjs', 'server.mjs', 'manage.mjs')

# The remote installer has no embedded credentials and is sent through SSH stdin.
REMOTE = r'''
from pathlib import Path
import fcntl
import hashlib
import http.client
import json
import os
import pwd
import re
import shlex
import shutil
import socket
import stat
import subprocess
import sys
import tarfile
import tempfile
import time

os.umask(0o077)
RELEASE, EXPECTED_HASH, ARCHIVE_NAME = sys.argv[1:]
if not re.fullmatch(r'\d{8}T\d{6}Z-[a-f0-9]{8}', RELEASE):
    raise SystemExit('Invalid release identifier')
if not re.fullmatch(r'[a-f0-9]{64}', EXPECTED_HASH):
    raise SystemExit('Invalid archive checksum')
ARCHIVE = Path(ARCHIVE_NAME)
if ARCHIVE != Path('/var/tmp') / ('herong-identity-' + RELEASE + '.tar.gz'):
    raise SystemExit('Invalid upload path')
if os.geteuid() != 0:
    raise SystemExit('Identity deployment requires the fixed root SSH account')

BASE = Path('/opt/herong-identity')
RELEASES = BASE / 'releases'
TARGET = RELEASES / RELEASE
CURRENT = BASE / 'current'
PREVIOUS = BASE / 'previous'
DATA = Path('/var/lib/herong-identity')
CONFIG = Path('/etc/herong-identity')
ENV_FILE = CONFIG / 'service.env'
CLIENTS_FILE = CONFIG / 'clients.json'
UNIT = Path('/etc/systemd/system/herong-identity.service')
SNIPPET = Path('/etc/nginx/snippets/herong-identity.conf')
VHOST = Path('/etc/nginx/conf.d/herong-dev-guides-domains.conf')
AUTH_VHOST = Path('/etc/nginx/conf.d/auth.herong.info.conf')
AUTHOR_INCLUDE = '/etc/nginx/snippets/herong-dev-guides-author-domain.conf'
OWNER_SOURCE = Path('/var/lib/herong-dev-guides-author/auth/wechat-account.json')
WECHAT_ENV = Path('/etc/herong-dev-guides-author/wechat.env')
NODE_SOURCE = Path('/opt/herong-dev-guides-author/runtime/bin/node')
NODE = Path('/opt/herong-runtime/node-v24.22.0/bin/node')
NODE_SIZE = 126816376
RESERVE = 200 * 1024 * 1024
BACKUP = Path('/var/backups/herong-identity') / RELEASE
SERVICE = 'herong-identity.service'
REQUIRED_MEMBERS = {'source/' + name for name in ('package.json', 'config.mjs', 'store.mjs', 'server.mjs', 'manage.mjs')}
REQUIRED_MEMBERS.update({'infra/herong-identity.service', 'infra/nginx-auth.conf', 'infra/nginx-auth-domain.conf', 'public/index.html'})

def diagnostic(value):
    text = str(value)
    # Never print credential-bearing query parameters, authorization headers, or control characters.
    text = re.sub(r'(?i)(\b(?:client_secret|appsecret|secret|code|state|access_token|refresh_token|token)\s*[=:]\s*)[^\s&;,]+', r'\1[redacted]', text)
    text = re.sub(r'(?i)(\bBearer\s+)\S+', r'\1[redacted]', text)
    text = ''.join(char for char in text if char in '\n\t' or ord(char) >= 32)
    return '\n'.join(text.splitlines()[-4:])[:1600]

def command(args, *, env=None, accepted=(0,)):
    result = subprocess.run(args, env=env, capture_output=True, text=True, timeout=45)
    if result.returncode not in accepted:
        # Only these fixed, non-secret checks may expose bounded stderr. In particular,
        # never forward Node/manage output or a private environment's contents.
        public_check = args == ['nginx', '-t'] or (args[0] == 'curl' and args[-1] == 'https://dev.herong.info/auth/health')
        if public_check and result.stderr.strip():
            print(Path(args[0]).name + ' diagnostic: ' + diagnostic(result.stderr), file=sys.stderr, flush=True)
        raise RuntimeError(Path(args[0]).name + ' failed with exit ' + str(result.returncode))
    return result

def plain_file(path, maximum=None, private=False):
    info = path.lstat()
    if not stat.S_ISREG(info.st_mode) or (maximum is not None and info.st_size > maximum):
        raise RuntimeError('Expected a bounded regular file')
    if private and info.st_mode & 0o077:
        raise RuntimeError('Expected a private file with no group or other access')
    return info

def directory(path, mode=0o755):
    if path.is_symlink():
        raise RuntimeError('Managed directory must not be a symlink')
    path.mkdir(parents=True, exist_ok=True, mode=mode)
    if not path.is_dir():
        raise RuntimeError('Managed path is not a directory')
    os.chown(path, 0, 0)
    os.chmod(path, mode)

def sha256(path):
    digest = hashlib.sha256()
    with path.open('rb') as source:
        while chunk := source.read(1024 * 1024):
            digest.update(chunk)
    return digest.hexdigest()

def read_env(path):
    plain_file(path, 16384, private=True)
    values = {}
    for line in path.read_text().splitlines():
        line = line.strip()
        if not line or line.startswith('#'):
            continue
        key, separator, value = line.partition('=')
        if not separator or not re.fullmatch(r'[A-Z][A-Z0-9_]*', key) or key in values:
            raise RuntimeError('Invalid private environment file')
        parsed = shlex.split(value, comments=True, posix=True)
        if len(parsed) != 1:
            raise RuntimeError('Invalid private environment assignment')
        values[key] = parsed[0]
    return values

def link_target(path):
    if not path.exists() and not path.is_symlink():
        return None
    if not path.is_symlink():
        raise RuntimeError('Release pointers must be symlinks')
    destination = path.resolve(strict=True)
    if destination.parent != RELEASES or not destination.is_dir():
        raise RuntimeError('Release pointer leaves the managed release directory')
    return os.readlink(path)

def atomic_link(path, destination):
    temporary = path.with_name(path.name + '.next-' + RELEASE)
    if temporary.exists() or temporary.is_symlink():
        raise RuntimeError('Unexpected pending release pointer')
    try:
        temporary.symlink_to(destination)
        os.replace(temporary, path)
    finally:
        temporary.unlink(missing_ok=True)

def write_file(path, content, mode, uid=0, gid=0):
    if path.parent.is_symlink() or not path.parent.is_dir():
        raise RuntimeError('Configuration parent must be an existing regular directory')
    descriptor, temporary_name = tempfile.mkstemp(prefix='.' + path.name + '-', dir=path.parent)
    temporary = Path(temporary_name)
    try:
        with os.fdopen(descriptor, 'wb') as target:
            target.write(content)
            target.flush()
            os.fsync(target.fileno())
            os.fchmod(target.fileno(), mode)
            os.fchown(target.fileno(), uid, gid)
        os.replace(temporary, path)
    finally:
        temporary.unlink(missing_ok=True)

def data_size(path):
    if not path.exists():
        if path.is_symlink():
            raise RuntimeError('Unexpected data symlink')
        return 0
    if path.is_symlink() or not path.is_dir():
        raise RuntimeError('Unexpected identity data directory')
    size = 0
    for child in path.rglob('*'):
        info = child.lstat()
        if stat.S_ISREG(info.st_mode):
            size += info.st_size
        elif not stat.S_ISDIR(info.st_mode):
            raise RuntimeError('Identity data must not contain links or special files')
    if size > 96 * 1024 * 1024:
        raise RuntimeError('Identity data exceeds the bounded backup budget')
    return size

def own_data(uid, gid, root=DATA):
    data_size(root)
    for path in [root, *root.rglob('*')]:
        info = path.lstat()
        os.chown(path, uid, gid)
        os.chmod(path, 0o700 if stat.S_ISDIR(info.st_mode) else 0o600)

def auth_counts(expiry_floor):
    if not (DATA / 'identity.sqlite').is_file():
        return {'browser_sessions': 0, 'access_tokens': 0}
    # Return counts only. No cookie, subject, OpenID, token or hash leaves Node.
    source = """
import { DatabaseSync } from 'node:sqlite';
const db = new DatabaseSync('/var/lib/herong-identity/identity.sqlite', {readOnly:true});
db.exec('PRAGMA query_only=ON');
const result = {};
for (const table of ['browser_sessions', 'access_tokens']) {
  result[table] = db.prepare(`SELECT count(*) AS n FROM ${table} WHERE expires > ?`).get(Number(process.argv[1])).n;
}
db.close();
process.stdout.write(JSON.stringify(result));
"""
    value = json.loads(command([str(NODE), '--input-type=module', '-e', source, str(expiry_floor)]).stdout)
    if set(value) != {'browser_sessions', 'access_tokens'} or any(type(n) is not int or n < 0 for n in value.values()):
        raise RuntimeError('Invalid session preservation count')
    return value

def verify_auth_counts(expected, expiry_floor):
    current = auth_counts(expiry_floor)
    if any(current[name] < amount for name, amount in expected.items()):
        raise RuntimeError('Existing identity sessions or access tokens were not preserved')
    print('Preserved authentication counts: browser sessions=' + str(current['browser_sessions'])
          + ', access tokens=' + str(current['access_tokens']), flush=True)

def restore_database_snapshot():
    restored = DATA.with_name(DATA.name + '.restore-' + RELEASE)
    failed = BACKUP / 'failed-data'
    if restored.exists() or restored.is_symlink() or failed.exists():
        raise RuntimeError('Unexpected pending database recovery directory')
    if had_data:
        shutil.copytree(BACKUP / 'data', restored)
        for relative, info in data_inventory.items():
            restored_file = restored / relative
            if restored_file.stat().st_size != info['bytes'] or sha256(restored_file) != info['sha256']:
                raise RuntimeError('Database recovery copy checksum mismatch')
        if account is not None:
            own_data(account.pw_uid, account.pw_gid, restored)
    if DATA.exists():
        if DATA.is_symlink():
            raise RuntimeError('Unexpected live data symlink during recovery')
        # Retain the failed migration for inspection; never delete live data to restore.
        os.replace(DATA, failed)
    if had_data:
        os.replace(restored, DATA)

def enclosing_server(text, position):
    stack, header = [], ''
    quoted, escaped, comment = None, False, False
    selected = None
    for index, char in enumerate(text):
        if index == position:
            selected = next((frame for frame in reversed(stack) if frame['header'] == 'server'), None)
            if selected is None:
                raise RuntimeError('Author include is outside a server block')
        if comment:
            if char == '\n':
                comment = False
                header += ' '
            continue
        if quoted:
            if escaped:
                escaped = False
            elif char == '\\':
                escaped = True
            elif char == quoted:
                quoted = None
            continue
        if char == '#':
            comment = True
        elif char in ('"', "'"):
            quoted = char
        elif char == '{':
            stack.append({'header': header.strip(), 'start': index + 1})
            header = ''
        elif char == '}':
            if not stack:
                raise RuntimeError('Unbalanced Nginx server configuration')
            frame = stack.pop()
            if frame is selected:
                return text[frame['start']:index]
            header = ''
        elif char == ';':
            header = ''
        else:
            header += char
    raise RuntimeError('Cannot locate the HTTPS server boundary')

def amended_vhost(original):
    text = original.decode('utf8')
    pattern = re.compile(r'(?m)^([ \t]*)include[ \t]+' + re.escape(AUTHOR_INCLUDE) + r';[ \t]*(\r?\n|$)')
    matches = list(pattern.finditer(text))
    if len(matches) != 1:
        raise RuntimeError('Expected exactly one existing author include')
    anchor = matches[0]
    server = enclosing_server(text, anchor.start())
    if not re.search(r'(?m)^\s*listen\s+[^;]*\bssl\b[^;]*;', server):
        raise RuntimeError('The author include is not in the HTTPS server')
    newline = '\r\n' if anchor.group(2) == '\r\n' else '\n'
    addition = anchor.group(1) + 'include ' + str(SNIPPET) + ';' + newline
    existing = re.findall(r'(?m)^\s*include\s+' + re.escape(str(SNIPPET)) + r';[^\n]*', text)
    if existing:
        if len(existing) != 1 or not text[anchor.end():].startswith(addition):
            raise RuntimeError('Identity include exists in an unexpected location')
        return original
    if not anchor.group(2):
        raise RuntimeError('Unexpected end of Nginx configuration')
    return (text[:anchor.end()] + addition + text[anchor.end():]).encode('utf8')

def health():
    deadline = time.monotonic() + 25
    while time.monotonic() < deadline:
        connection = http.client.HTTPConnection('127.0.0.1', 24321, timeout=3)
        try:
            connection.request('GET', '/auth/health', headers={'Host': 'dev.herong.info'})
            response = connection.getresponse()
            payload = response.read(4097)
            if response.status == 200 and len(payload) <= 4096:
                value = json.loads(payload)
                if value.get('service') == 'herong-identity' and value.get('ready') is True:
                    return
        except (OSError, ValueError, http.client.HTTPException):
            pass
        finally:
            connection.close()
        time.sleep(1)
    raise RuntimeError('Identity readiness did not become healthy')

def https_health():
    # Nginx reload returns before every old worker has retired. Retry only this
    # read-only readiness request, never a service/configuration mutation.
    deadline = time.monotonic() + 25
    last_status = 'HTTPS readiness was not reached'
    last_stderr = ''
    while time.monotonic() < deadline:
        result = command(['curl', '--fail', '--silent', '--show-error', '--connect-timeout', '2', '--max-time', '3', '--resolve', 'dev.herong.info:443:127.0.0.1', 'https://dev.herong.info/auth/health'], accepted=tuple(range(256)))
        last_stderr = result.stderr
        if result.returncode == 0:
            try:
                status = json.loads(result.stdout)
                if isinstance(status, dict) and status.get('service') == 'herong-identity' and status.get('ready') is True:
                    return
                last_status = 'HTTPS readiness returned unexpected JSON; body withheld'
            except ValueError:
                last_status = 'HTTPS readiness returned non-JSON; body withheld'
        else:
            last_status = 'curl failed with exit ' + str(result.returncode)
        remaining = deadline - time.monotonic()
        if remaining > 0:
            time.sleep(min(1, remaining))
    if last_stderr.strip():
        print('HTTPS readiness diagnostic: ' + diagnostic(last_stderr), file=sys.stderr, flush=True)
    raise RuntimeError('HTTPS readiness timed out: ' + last_status)

def canonical_health():
    connection = http.client.HTTPConnection('127.0.0.1', 24321, timeout=3)
    try:
        connection.request('GET', '/health', headers={'Host': 'auth.herong.info'})
        response = connection.getresponse()
        value = json.loads(response.read(4096))
        if response.status != 200 or value.get('ready') is not True:
            raise RuntimeError('Canonical local identity readiness failed')
    finally:
        connection.close()
    deadline = time.monotonic() + 25
    while time.monotonic() < deadline:
        result = command(['curl', '--fail', '--silent', '--show-error', '--connect-timeout', '2', '--max-time', '3', '--resolve', 'auth.herong.info:443:127.0.0.1', 'https://auth.herong.info/health'], accepted=tuple(range(256)))
        if result.returncode == 0:
            try:
                value = json.loads(result.stdout)
                if value.get('service') == 'herong-identity' and value.get('ready') is True:
                    return
            except (ValueError, AttributeError):
                pass
        time.sleep(1)
    raise RuntimeError('Canonical HTTPS identity readiness failed')

lock = open('/run/lock/herong-identity-deploy.lock', 'a')
fcntl.flock(lock, fcntl.LOCK_EX | fcntl.LOCK_NB)
stage = 'preflight'
mutated = False
was_active = False
was_enabled = False
old_current = None
old_previous = None
snapshot = {}
had_data = False
data_snapshot_ready = False
data_mutated = False
account = None
vhost_changed = False
auth_vhost_changed = False
is_upgrade = False
preserved_auth = None
expiry_floor = None
try:
    print('Identity deployment started: ' + RELEASE, flush=True)
    plain_file(ARCHIVE, 8 * 1024 * 1024, private=True)
    if sha256(ARCHIVE) != EXPECTED_HASH:
        raise RuntimeError('Uploaded archive checksum mismatch')
    members = {}
    with tarfile.open(ARCHIVE, 'r:gz') as bundle:
        for member in bundle.getmembers():
            path = Path(member.name)
            allowed = (member.name in REQUIRED_MEMBERS or member.name == 'clients.json'
                       or re.fullmatch(r'source/[A-Za-z0-9_-][A-Za-z0-9_.-]*\.mjs', member.name)
                       or member.name.startswith('public/'))
            if (not allowed or path.is_absolute() or any(part.startswith('.') for part in path.parts)
                    or member.name in members or not member.isfile() or member.size > 2 * 1024 * 1024):
                raise RuntimeError('Archive contains unexpected entries')
            members[member.name] = bundle.extractfile(member).read(2 * 1024 * 1024 + 1)
            if len(members[member.name]) != member.size:
                raise RuntimeError('Archive member is incomplete')
    release_bytes = sum(map(len, members.values()))
    if not REQUIRED_MEMBERS.issubset(members) or release_bytes > 16 * 1024 * 1024:
        raise RuntimeError('Archive source manifest does not match')
    is_upgrade = ENV_FILE.exists() or CURRENT.is_symlink() or (DATA / 'identity.sqlite').exists()
    incoming = None
    if is_upgrade:
        if 'clients.json' in members:
            raise RuntimeError('--client-env-file is for initial bootstrap only; omit it for an upgrade')
        if not CURRENT.is_symlink() or not (DATA / 'identity.sqlite').is_file():
            raise RuntimeError('Existing identity state is incomplete; upgrade requires an intact current release and database')
        identity_env = read_env(ENV_FILE)
        plain_file(CLIENTS_FILE, 65536, private=True)
        required_env = {'IDENTITY_PORT': '24321',
                        'IDENTITY_DATA_DIR': str(DATA), 'IDENTITY_CLIENTS_FILE': str(CLIENTS_FILE)}
        if (identity_env.get('IDENTITY_ISSUER') not in ('https://dev.herong.info/auth', 'https://auth.herong.info')
                or any(identity_env.get(key) != value for key, value in required_env.items())):
            raise RuntimeError('Existing identity environment does not match the isolated deployment')
        if not identity_env.get('IDENTITY_WECHAT_APP_ID') or not identity_env.get('IDENTITY_WECHAT_APP_SECRET'):
            raise RuntimeError('Existing identity provider configuration is incomplete')
    else:
        if 'clients.json' not in members:
            raise RuntimeError('Initial bootstrap requires --client-env-file')
        requested_clients = json.loads(members['clients.json'])
        if not isinstance(requested_clients, list) or len(requested_clients) != 1:
            raise RuntimeError('Expected one approved initial client registration')
        incoming = requested_clients[0]
        if (incoming.get('clientId') != 'disktrace-admin'
                or incoming.get('redirectUris') != ['https://disktrace.herong.info/api/auth/callback']
                or incoming.get('ownerRole') != 'owner'
                or not re.fullmatch(r'[a-f0-9]{64}', incoming.get('secretHash', ''))
                or 'secret' in incoming):
            raise RuntimeError('Invalid approved initial client registration')
        plain_file(OWNER_SOURCE, 16384, private=True)
        owner = json.loads(OWNER_SOURCE.read_text())
        credentials = read_env(WECHAT_ENV)
        app_id = credentials.get('AUTHOR_WECHAT_APP_ID', '')
        app_secret = credentials.get('AUTHOR_WECHAT_APP_SECRET', '')
        if not re.fullmatch(r'wx[a-f0-9]{16}', app_id) or not re.fullmatch(r'[A-Za-z0-9_-]{16,256}', app_secret):
            raise RuntimeError('Existing author website credentials are invalid')
        if owner.get('provider') != 'wechat' or owner.get('version') != 1 or owner.get('appId') != app_id:
            raise RuntimeError('Existing verified owner does not match the configured website application')
        identity_env = {'IDENTITY_ISSUER': 'https://auth.herong.info', 'IDENTITY_PORT': '24321',
                        'IDENTITY_DATA_DIR': str(DATA), 'IDENTITY_CLIENTS_FILE': str(CLIENTS_FILE),
                        'IDENTITY_WECHAT_APP_ID': app_id, 'IDENTITY_WECHAT_APP_SECRET': app_secret}
    # Change only the public issuer. Keep credentials, provider identity and registered clients intact.
    identity_env['IDENTITY_ISSUER'] = 'https://auth.herong.info'
    for filename in ('fullchain.pem', 'privkey.pem'):
        if not Path('/etc/letsencrypt/live/auth.herong.info', filename).is_file():
            raise RuntimeError('Prepare the auth.herong.info DNS and HTTPS certificate before activating this release')
    if not Path('/var/www/herong-identity-acme').is_dir():
        raise RuntimeError('The dedicated identity ACME webroot is missing')
    needs_node = not NODE.exists()
    if NODE.is_symlink():
        raise RuntimeError('Shared runtime must not be a symlink')
    if not needs_node:
        info = plain_file(NODE)
        if info.st_uid != 0 or stat.S_IMODE(info.st_mode) != 0o755 or info.st_size != NODE_SIZE:
            raise RuntimeError('Existing shared Node runtime differs; it will not be overwritten')
        if command([str(NODE), '--version']).stdout.strip() != 'v24.22.0':
            raise RuntimeError('Existing shared runtime version does not match')
    else:
        source_info = plain_file(NODE_SOURCE)
        if source_info.st_size != NODE_SIZE or command([str(NODE_SOURCE), '--version']).stdout.strip() != 'v24.22.0':
            raise RuntimeError('Existing Node runtime does not match the verified version and size')
        source_digest = sha256(NODE_SOURCE)
    old_current = link_target(CURRENT)
    old_previous = link_target(PREVIOUS)
    if TARGET.exists() or TARGET.is_symlink() or BACKUP.exists():
        raise RuntimeError('Release or backup directory already exists')
    previous_data_bytes = data_size(DATA)
    required = RESERVE + (NODE_SIZE if needs_node else 0) + previous_data_bytes * 3 + release_bytes + 20 * 1024 * 1024
    if min(shutil.disk_usage(path).free for path in ('/opt', '/var', '/etc')) < required:
        raise RuntimeError('Not enough free space to retain 200 MiB after runtime, backup and release overhead')
    plain_file(VHOST, 262144)
    original_vhost = VHOST.read_bytes()
    next_vhost = amended_vhost(original_vhost)
    if AUTH_VHOST.exists():
        plain_file(AUTH_VHOST, 262144)
    original_auth_vhost = AUTH_VHOST.read_bytes() if AUTH_VHOST.exists() else None
    next_auth_vhost = members['infra/nginx-auth-domain.conf']
    command(['nginx', '-t'])
    was_active = command(['systemctl', 'is-active', SERVICE], accepted=(0, 3, 4)).stdout.strip() == 'active'
    was_enabled = command(['systemctl', 'is-enabled', SERVICE], accepted=(0, 1, 3, 4)).stdout.strip() == 'enabled'
    author_was_active = command(['systemctl', 'is-active', 'herong-dev-guides-author.service'], accepted=(0, 3, 4)).stdout.strip() == 'active'
    if not was_active:
        probe = socket.socket()
        try:
            probe.bind(('127.0.0.1', 24321))
        finally:
            probe.close()
    try:
        account = pwd.getpwnam('herong-identity')
        if account.pw_uid == 0 or account.pw_dir != str(DATA) or not account.pw_shell.endswith(('/nologin', '/false')):
            raise RuntimeError('Existing identity service user is not the expected restricted account')
    except KeyError:
        account = None
    stage = 'backing up isolated service state'
    directory(BACKUP.parent, 0o700)
    directory(BACKUP, 0o700)
    mutated = True
    # Stop even an auto-restarting unit before snapshotting its config and SQLite/WAL files.
    command(['systemctl', 'stop', SERVICE], accepted=(0, 5))
    for path in (UNIT, ENV_FILE, CLIENTS_FILE, SNIPPET, VHOST, AUTH_VHOST):
        label = path.name
        if path.exists() or path.is_symlink():
            info = plain_file(path, 262144)
            content = path.read_bytes()
            write_file(BACKUP / label, content, 0o600)
            snapshot[str(path)] = {'file': label, 'mode': stat.S_IMODE(info.st_mode), 'uid': info.st_uid, 'gid': info.st_gid}
        else:
            snapshot[str(path)] = None
    had_data = DATA.exists()
    data_inventory = {}
    if had_data:
        data_size(DATA)
        if is_upgrade:
            # Exclude sessions already about to expire during a deployment window.
            expiry_floor = int(time.time() * 1000) + 15 * 60 * 1000
            preserved_auth = auth_counts(expiry_floor)
        shutil.copytree(DATA, BACKUP / 'data')
        for path in DATA.rglob('*'):
            if path.is_file():
                relative = path.relative_to(DATA).as_posix()
                data_inventory[relative] = {'bytes': path.stat().st_size, 'sha256': sha256(path)}
                if sha256(BACKUP / 'data' / relative) != data_inventory[relative]['sha256']:
                    raise RuntimeError('Stopped identity database backup checksum mismatch')
    data_snapshot_ready = True
    (BACKUP / 'state.json').write_text(json.dumps({'files': snapshot, 'current': old_current, 'previous': old_previous,
                                                'active': was_active, 'enabled': was_enabled, 'hadData': had_data,
                                                'dataFiles': data_inventory, 'authCounts': preserved_auth,
                                                'authExpiryFloor': expiry_floor}, indent=2) + '\n')

    stage = 'preparing isolated runtime and release'
    if account is None:
        command(['useradd', '--system', '--user-group', '--home-dir', str(DATA), '--no-create-home', '--shell', '/usr/sbin/nologin', 'herong-identity'])
        account = pwd.getpwnam('herong-identity')
    directory(Path('/opt/herong-runtime'))
    directory(NODE.parent.parent)
    directory(NODE.parent)
    if needs_node:
        descriptor, temporary_name = tempfile.mkstemp(prefix='.node-copy-', dir=NODE.parent)
        temporary = Path(temporary_name)
        try:
            with os.fdopen(descriptor, 'wb') as destination, NODE_SOURCE.open('rb') as source:
                shutil.copyfileobj(source, destination, 1024 * 1024)
                destination.flush()
                os.fsync(destination.fileno())
                os.fchown(destination.fileno(), 0, 0)
                os.fchmod(destination.fileno(), 0o755)
            if sha256(temporary) != source_digest or sha256(NODE_SOURCE) != source_digest:
                raise RuntimeError('Node source changed during the independent copy')
            if NODE.exists():
                info = plain_file(NODE)
                if info.st_uid != 0 or stat.S_IMODE(info.st_mode) != 0o755 or sha256(NODE) != source_digest:
                    raise RuntimeError('A different shared runtime appeared during deployment')
            else:
                os.replace(temporary, NODE)
        finally:
            temporary.unlink(missing_ok=True)
    if command([str(NODE), '--version']).stdout.strip() != 'v24.22.0':
        raise RuntimeError('Independent runtime version check failed')
    directory(BASE)
    directory(RELEASES)
    directory(TARGET)
    for name, content in members.items():
        if name.startswith('source/'):
            destination = TARGET / name.removeprefix('source/')
        elif name.startswith('public/'):
            destination = TARGET / name
        else:
            continue
        directory(destination.parent)
        write_file(destination, content, 0o644)
        if name.startswith('source/') and destination.suffix == '.mjs':
            command([str(NODE), '--check', str(destination)])
    directory(CONFIG, 0o700)
    # The service reads only the hashed client registry; systemd reads the root-only environment.
    os.chown(CONFIG, 0, account.pw_gid)
    os.chmod(CONFIG, 0o710)
    environment = dict(os.environ, **identity_env)
    write_file(ENV_FILE, ''.join(key + '=' + shlex.quote(value) + '\n' for key, value in identity_env.items()).encode(), 0o600)
    if not is_upgrade:
        write_file(CLIENTS_FILE, (json.dumps([incoming], ensure_ascii=False, indent=2) + '\n').encode(), 0o600, account.pw_uid, account.pw_gid)
    # Keep private config contents inaccessible while allowing only the service group to traverse.
    os.chown(CONFIG, 0, account.pw_gid)
    os.chmod(CONFIG, 0o710)
    data_mutated = True
    directory(DATA, 0o700)
    if not is_upgrade:
        stage = 'initial bootstrap of the existing verified owner'
        command([str(NODE), str(TARGET / 'manage.mjs'), 'import-owner', str(OWNER_SOURCE)], env=environment)
    own_data(account.pw_uid, account.pw_gid)

    stage = 'activating identity service and proxy'
    write_file(UNIT, members['infra/herong-identity.service'], 0o644)
    write_file(SNIPPET, members['infra/nginx-auth.conf'], 0o644)
    if (AUTH_VHOST.read_bytes() if AUTH_VHOST.exists() else None) != original_auth_vhost:
        raise RuntimeError('Auth Nginx vhost changed concurrently; refusing to overwrite it')
    write_file(AUTH_VHOST, next_auth_vhost, 0o644)
    auth_vhost_changed = True
    atomic_link(CURRENT, TARGET)
    command(['systemctl', 'daemon-reload'])
    command(['systemctl', 'enable', SERVICE])
    command(['systemctl', 'restart', SERVICE])
    health()
    if preserved_auth is not None:
        verify_auth_counts(preserved_auth, expiry_floor)
    if VHOST.read_bytes() != original_vhost:
        raise RuntimeError('Nginx vhost changed concurrently; refusing to overwrite it')
    if next_vhost != original_vhost:
        info = snapshot[str(VHOST)]
        write_file(VHOST, next_vhost, info['mode'], info['uid'], info['gid'])
        vhost_changed = True
    command(['nginx', '-t'])
    command(['systemctl', 'reload', 'nginx'])
    https_health()
    canonical_health()
    if author_was_active and command(['systemctl', 'is-active', 'herong-dev-guides-author.service'], accepted=(0, 3, 4)).stdout.strip() != 'active':
        raise RuntimeError('Existing author service is no longer active')
    if old_current is not None:
        atomic_link(PREVIOUS, old_current)
    if min(shutil.disk_usage(path).free for path in ('/opt', '/var', '/etc')) < RESERVE:
        raise RuntimeError('Post-deployment free space fell below the 200 MiB reserve')
    print('Identity release activated: ' + RELEASE, flush=True)
    print('Canonical issuer activated; existing provider credentials, client registry and owner were retained.' if is_upgrade
          else 'Initial owner and client registration were bootstrapped from read-only inputs.', flush=True)
    print('Local and HTTPS readiness passed; WeChat login was not exercised.', flush=True)
except BaseException as error:
    rollback_errors = []
    if mutated:
        def recover(action):
            try:
                action()
            except BaseException as recovery_error:
                rollback_errors.append(type(recovery_error).__name__)
        service_stopped = False
        try:
            command(['systemctl', 'stop', SERVICE], accepted=(0, 5))
            service_stopped = True
        except BaseException as recovery_error:
            rollback_errors.append(type(recovery_error).__name__)
        if not was_enabled:
            recover(lambda: command(['systemctl', 'disable', SERVICE], accepted=(0, 1, 5)))
        for name, info in snapshot.items():
            path = Path(name)
            # Do not overwrite another deployment's unrelated vhost edit.
            if path == VHOST and not vhost_changed:
                continue
            if path == VHOST:
                try:
                    matches = path.read_bytes() == next_vhost
                except OSError:
                    matches = False
                if not matches:
                    rollback_errors.append('ConcurrentNginxEdit')
                    continue
            if path == AUTH_VHOST and not auth_vhost_changed:
                continue
            if path == AUTH_VHOST:
                try:
                    matches = path.read_bytes() == next_auth_vhost
                except OSError:
                    matches = False
                if not matches:
                    rollback_errors.append('ConcurrentAuthNginxEdit')
                    continue
            if info is None:
                recover(lambda path=path: path.unlink(missing_ok=True))
            else:
                recover(lambda path=path, info=info: write_file(path, (BACKUP / info['file']).read_bytes(), info['mode'], info['uid'], info['gid']))
        if CONFIG.exists() and account is not None:
            recover(lambda: os.chown(CONFIG, 0, account.pw_gid))
            recover(lambda: os.chmod(CONFIG, 0o710))
        for path, destination in ((CURRENT, old_current), (PREVIOUS, old_previous)):
            if destination is None:
                recover(lambda path=path: path.unlink(missing_ok=True))
            else:
                recover(lambda path=path, destination=destination: atomic_link(path, destination))
        if data_mutated and data_snapshot_ready and service_stopped:
            recover(restore_database_snapshot)
        recover(lambda: command(['systemctl', 'daemon-reload']))
        if was_enabled:
            recover(lambda: command(['systemctl', 'enable', SERVICE]))
        if was_active and not rollback_errors:
            recover(lambda: command(['systemctl', 'start', SERVICE]))
            if not rollback_errors:
                recover(health)
                if preserved_auth is not None:
                    recover(lambda: verify_auth_counts(preserved_auth, expiry_floor))
        recover(lambda: command(['nginx', '-t']))
        if not rollback_errors:
            recover(lambda: command(['systemctl', 'reload', 'nginx']))
    print('Identity deployment failed during ' + stage + ' (' + type(error).__name__ + '): ' + diagnostic(error), file=sys.stderr, flush=True)
    print('Rollback requires manual review.' if rollback_errors else ('Previous service and proxy state restored.' if mutated else 'Live service and proxy were not changed.'), file=sys.stderr, flush=True)
    sys.exit(1)
finally:
    ARCHIVE.unlink(missing_ok=True)
    fcntl.flock(lock, fcntl.LOCK_UN)
    lock.close()
'''


def private_secret(path):
    descriptor = os.open(path, os.O_RDONLY | os.O_NOFOLLOW)
    try:
        info = os.fstat(descriptor)
        if not stat.S_ISREG(info.st_mode) or info.st_size > 16384 or info.st_mode & 0o077:
            raise RuntimeError('Client environment must be a regular 0600 file no larger than 16 KiB')
        with os.fdopen(descriptor, 'r', closefd=False) as source:
            lines = source.read(16385)
        if len(lines.encode()) > 16384:
            raise RuntimeError('Client environment exceeds the size limit')
    finally:
        os.close(descriptor)
    values = []
    for line in lines.splitlines():
        stripped = line.strip()
        if not stripped or stripped.startswith('#'):
            continue
        key, separator, value = stripped.partition('=')
        if separator and key == 'DISKTRACE_CLIENT_SECRET':
            parsed = shlex.split(value, comments=True, posix=True)
            if len(parsed) != 1:
                raise RuntimeError('Invalid client secret assignment')
            values.append(parsed[0])
    if len(values) != 1 or not 32 <= len(values[0]) <= 512 or any(ord(char) < 32 for char in values[0]):
        raise RuntimeError('Client environment must contain one strong DISKTRACE_CLIENT_SECRET assignment')
    return values[0]


def checked_source(path, maximum=262144):
    info = path.lstat()
    if not stat.S_ISREG(info.st_mode) or info.st_size > maximum:
        raise RuntimeError('Release inputs must be bounded regular files')
    return path.read_bytes()


def transport_options():
    for path in (KEY, KNOWN_HOSTS):
        if not path.is_file() or path.is_symlink():
            raise RuntimeError('The fixed SSH key and known_hosts must be existing regular files')
    if KEY.stat().st_mode & 0o077:
        raise RuntimeError('The fixed SSH private key must have no group or other access')
    return ['-i', str(KEY), '-o', 'IdentitiesOnly=yes', '-o', 'BatchMode=yes', '-o', 'StrictHostKeyChecking=yes', '-o', 'UserKnownHostsFile=' + str(KNOWN_HOSTS), '-o', 'ConnectTimeout=15', '-o', 'ServerAliveInterval=15', '-o', 'ServerAliveCountMax=2']


def transport(command, *, input_text=None):
    for attempt in range(2):
        result = subprocess.run(command, input=input_text, capture_output=True, text=True)
        handshake_failure = not result.stdout.strip() and any(fragment in result.stderr.lower() for fragment in ('kex_exchange_identification', 'banner exchange', 'connection closed by'))
        if result.returncode == 0:
            return result
        if attempt == 0 and handshake_failure:
            time.sleep(2)
            continue
        # Remote output never contains config values; do not replay a started or ambiguous deployment.
        if result.stdout:
            print(result.stdout.rstrip())
        if result.stderr:
            print(result.stderr.rstrip(), file=__import__('sys').stderr)
        raise RuntimeError('SSH transfer or deployment failed; no automatic mutation retry was performed')


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--client-env-file', type=Path, help='Initial bootstrap only: private DISKTRACE_CLIENT_SECRET environment; omit for upgrades to preserve existing clients and credentials')
    parser.add_argument('--apply', action='store_true', help='Apply to the fixed production host after review; the default is a local-only dry run')
    args = parser.parse_args()
    for name in REQUIRED_SOURCE_NAMES:
        checked_source(APP / name)
    source_names = ['package.json'] + sorted(path.name for path in APP.glob('*.mjs'))
    files = {'source/' + name: checked_source(APP / name) for name in source_names}
    if PUBLIC.is_symlink() or not (PUBLIC / 'index.html').is_file():
        raise RuntimeError('Build the identity admin frontend locally before preparing a release')
    for path in sorted(PUBLIC.rglob('*')):
        relative = path.relative_to(PUBLIC)
        if path.is_symlink() or any(part.startswith('.') for part in relative.parts):
            raise RuntimeError('Admin build must not contain symlinks or hidden files')
        if path.is_file():
            files['public/' + relative.as_posix()] = checked_source(path, 2 * 1024 * 1024)
    files['infra/herong-identity.service'] = checked_source(INFRA / 'herong-identity.service')
    files['infra/nginx-auth.conf'] = checked_source(INFRA / 'nginx-auth.conf')
    files['infra/nginx-auth-domain.conf'] = checked_source(INFRA / 'nginx-auth-domain.conf')
    if args.client_env_file:
        secret_hash = hashlib.sha256(private_secret(args.client_env_file).encode()).hexdigest()
        clients = [{'clientId': 'disktrace-admin', 'name': 'DiskTrace 管理后台', 'secretHash': secret_hash, 'redirectUris': ['https://disktrace.herong.info/api/auth/callback'], 'ownerRole': 'owner', 'enabled': True}]
        files['clients.json'] = (json.dumps(clients, ensure_ascii=False, indent=2) + '\n').encode()
    if sum(map(len, files.values())) > 16 * 1024 * 1024:
        raise RuntimeError('Source archive exceeds the bounded release size')
    if not args.apply:
        print('DRY RUN: no SSH, upload, credential import or remote changes were performed.')
        print('Target: root@' + HOST + '; fixed private key and strict known_hosts verification.')
        print('Bundle: ' + str(len(source_names)) + ' server files, ' + str(sum(name.startswith('public/') for name in files)) + ' admin assets, systemd unit and Nginx snippet.')
        print('Canonical issuer: https://auth.herong.info; legacy dev.herong.info/auth back-channel and WeChat callback remain available.')
        print('Bootstrap client registration: ' + ('included for first installation only' if args.client_env_file else 'omitted; existing credentials and registry will be retained'))
        print('Apply will stop only identity before a complete SQLite/WAL/config backup, preserve sessions, retain 200 MiB free, and roll back code and database together on failure.')
        print('Routine upgrades do not read author credentials/owner or rotate identity credentials/client configuration. No raw client secret is uploaded.')
        return
    options = transport_options()
    release = datetime.now(timezone.utc).strftime('%Y%m%dT%H%M%SZ') + '-' + uuid.uuid4().hex[:8]
    remote_archive = '/var/tmp/herong-identity-' + release + '.tar.gz'
    with tempfile.TemporaryDirectory(prefix='herong-identity-release-') as temporary:
        archive = Path(temporary) / (release + '.tar.gz')
        with tarfile.open(archive, 'w:gz') as bundle:
            for name, content in files.items():
                member = tarfile.TarInfo(name)
                member.size = len(content)
                member.mode = 0o600
                member.uid = member.gid = 0
                bundle.addfile(member, io.BytesIO(content))
        archive.chmod(0o600)
        checksum = hashlib.sha256(archive.read_bytes()).hexdigest()
        transport(['scp', '-p', *options, str(archive), 'root@' + HOST + ':' + remote_archive])
        result = transport(['ssh', *options, 'root@' + HOST, shlex.join(['python3', '-', release, checksum, remote_archive])], input_text=REMOTE)
        print(result.stdout.rstrip())


if __name__ == '__main__':
    try:
        main()
    except (OSError, ValueError, RuntimeError) as error:
        # Secret content is never passed to exception messages or subprocess arguments.
        raise SystemExit(str(error))
