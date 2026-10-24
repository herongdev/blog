#!/usr/bin/env python3
"""Portable static packer: no AppleDouble, extended attributes or links."""
import gzip
import os
from pathlib import Path
import stat
import sys
import tarfile


def pack(source, destination):
    source = Path(source).resolve(strict=True)
    with Path(destination).open('xb') as output:
        with gzip.GzipFile(filename='', mode='wb', fileobj=output, compresslevel=4, mtime=0) as zipped:
            with tarfile.open(fileobj=zipped, mode='w', format=tarfile.PAX_FORMAT) as archive:
                for path in sorted(source.rglob('*')):
                    details = path.lstat()
                    name = path.relative_to(source).as_posix()
                    entry = tarfile.TarInfo(name)
                    entry.uid = entry.gid = 0
                    entry.mtime = 0
                    if stat.S_ISDIR(details.st_mode):
                        entry.type = tarfile.DIRTYPE
                        entry.mode = 0o755
                        archive.addfile(entry)
                    elif stat.S_ISREG(details.st_mode):
                        entry.type = tarfile.REGTYPE
                        entry.mode = 0o644
                        entry.size = details.st_size
                        descriptor = os.open(path, os.O_RDONLY | os.O_NOFOLLOW)
                        with os.fdopen(descriptor, 'rb') as stream:
                            archive.addfile(entry, stream)
                    else:
                        raise ValueError('Static bundle must contain only ordinary files and directories')


if __name__ == '__main__':
    if len(sys.argv) != 3:
        raise SystemExit('Usage: pack-static.py BUNDLE_DIR NEW_ARCHIVE.tar.gz')
    pack(sys.argv[1], sys.argv[2])
