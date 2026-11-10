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
    snapshots = []
    databases = [(publishing_root / 'publishing.sqlite', 'publishing/publishing.sqlite')]
    workflow = source / 'project/.production-workflow'
    databases.extend((workflow / name, 'project/.production-workflow/' + name)
                     for name in ['production.sqlite', 'oauth.sqlite'])
    for index, (database, archive_path) in enumerate(databases):
        if not database.exists():
            continue
        if database.parent.is_symlink() or database.is_symlink() or not database.is_file() or database.stat().st_nlink != 1:
            raise RuntimeError('Private database backup source must be a regular file')
        snapshot = Path(temporary) / ('snapshot-' + str(index) + '.sqlite')
        # SQLite's backup API includes committed WAL pages without copying a live DB/WAL pair.
        # A WAL database may need to recreate -wal/-shm even for mode=ro when
        # the author has stopped. Use its owner so these files remain accessible
        # on restart; the parent retains root-only ownership of the archive.
        owner = database.stat()
        account = pwd.getpwnam('dev-guides-author')
        if (owner.st_uid, owner.st_gid) != (account.pw_uid, account.pw_gid):
            raise RuntimeError('Private database must belong to the author service')
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
''', str(database), str(snapshot)], check=True,
            user=owner.st_uid, group=owner.st_gid, extra_groups=[])
        snapshots.append((snapshot, archive_path))
    with tarfile.open(target, 'x:gz') as archive:
        # Replace live SQLite files and their WAL/SHM sidecars with committed snapshots.
        database_paths = {archive_path for _, archive_path in databases}
        def consistent_files(member):
            if member.name in database_paths or any(member.name == name + suffix
                   for name in database_paths for suffix in ['-wal', '-shm']):
                return None
            return member
        for relative in ['project', 'auth', 'publish/state.json', 'publish/publication-history.json']:
            item = source / relative
            if item.exists():
                archive.add(item, arcname=relative, recursive=True, filter=consistent_files)
        for relative in ['assets', 'accounts']:
            item = publishing_root / relative
            if item.exists():
                archive.add(item, arcname='publishing/' + relative, recursive=True)
        for snapshot, archive_path in snapshots:
            archive.add(snapshot, arcname=archive_path)
print('Private author backup created:', target.name)
# Keep all backups; pruning is an explicit maintenance action.
