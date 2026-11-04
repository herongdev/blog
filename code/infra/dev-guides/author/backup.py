#!/usr/bin/env python3
"""Private daily content backup. Archives are never served by Nginx."""
from pathlib import Path
from datetime import datetime, timezone
import os
import pwd
import tarfile
import subprocess
import sys
import tempfile

os.umask(0o077)
source = Path('/var/lib/herong-dev-guides-author')
publishing_root = Path(os.environ.get('PUBLISHER_DATA_DIR', str(source / 'publishing')))
if not publishing_root.is_absolute():
    raise RuntimeError('PUBLISHER_DATA_DIR must be absolute')
destination = Path('/var/backups/herong-dev-guides-author')
destination.mkdir(parents=True, exist_ok=True, mode=0o700)
name = datetime.now(timezone.utc).strftime('%Y%m%dT%H%M%SZ')
target = destination / (name + '.tar.gz')
with tempfile.TemporaryDirectory(prefix='author-backup-') as temporary:
    publishing_db = publishing_root / 'publishing.sqlite'
    snapshot = Path(temporary) / 'publishing.sqlite'
    if publishing_db.exists():
        if publishing_root.is_symlink() or publishing_db.is_symlink():
            raise RuntimeError('Publishing backup source must not be a symlink')
        # SQLite's backup API includes committed WAL pages without copying a live DB/WAL pair.
        # A WAL database may need to recreate -wal/-shm even for mode=ro when
        # the author has stopped. Use its owner so these files remain accessible
        # on restart; the parent retains root-only ownership of the archive.
        owner = publishing_db.stat()
        account = pwd.getpwnam('dev-guides-author')
        if (owner.st_uid, owner.st_gid) != (account.pw_uid, account.pw_gid):
            raise RuntimeError('Publishing database must belong to the author service')
        os.chown(temporary, owner.st_uid, owner.st_gid)
        subprocess.run([sys.executable, '-c', '''import sqlite3, sys
from pathlib import Path
original = sqlite3.connect(Path(sys.argv[1]).as_uri() + '?mode=ro', uri=True)
copy = sqlite3.connect(sys.argv[2])
try:
    original.backup(copy)
finally:
    copy.close()
    original.close()
''', str(publishing_db), str(snapshot)], check=True,
            user=owner.st_uid, group=owner.st_gid, extra_groups=[])
    with tarfile.open(target, 'x:gz') as archive:
        for relative in ['project', 'auth', 'publish/state.json', 'publish/publication-history.json']:
            item = source / relative
            if item.exists():
                archive.add(item, arcname=relative, recursive=True)
        for relative in ['assets', 'accounts']:
            item = publishing_root / relative
            if item.exists():
                archive.add(item, arcname='publishing/' + relative, recursive=True)
        if snapshot.exists():
            archive.add(snapshot, arcname='publishing/publishing.sqlite')
print('Private author backup created:', target.name)
# Keep all backups; pruning is an explicit maintenance action.
