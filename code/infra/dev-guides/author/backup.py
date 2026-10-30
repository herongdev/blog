#!/usr/bin/env python3
"""Private daily content backup. Archives are never served by Nginx."""
from pathlib import Path
from datetime import datetime, timezone
import os
import tarfile

os.umask(0o077)
source = Path('/var/lib/herong-dev-guides-author')
destination = Path('/var/backups/herong-dev-guides-author')
destination.mkdir(parents=True, exist_ok=True, mode=0o700)
name = datetime.now(timezone.utc).strftime('%Y%m%dT%H%M%SZ')
target = destination / (name + '.tar.gz')
with tarfile.open(target, 'x:gz') as archive:
    for relative in ['project', 'auth', 'publish/state.json']:
        item = source / relative
        if item.exists():
            archive.add(item, arcname=relative, recursive=True)
print('Private author backup created:', target.name)
# Keep all backups; pruning is an explicit maintenance action.
