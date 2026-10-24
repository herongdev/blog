#!/usr/bin/env python3
"""Security-boundary checks for the static-only privileged publisher."""
import hashlib
import gzip
import importlib.util
import io
import json
import os
from pathlib import Path
import stat
import sys
import tarfile
import tempfile
import unittest
from unittest.mock import patch

sys.dont_write_bytecode = True
spec = importlib.util.spec_from_file_location('publisher', Path(__file__).with_name('ci-publish.py'))
publisher = importlib.util.module_from_spec(spec)
spec.loader.exec_module(publisher)
pack_spec = importlib.util.spec_from_file_location('packer', Path(__file__).with_name('pack-static.py'))
packer = importlib.util.module_from_spec(pack_spec)
pack_spec.loader.exec_module(packer)


class StaticPublisherTests(unittest.TestCase):
    def archive(self, directory, members):
        path = directory / 'bundle.tar'
        with tarfile.open(path, 'w') as archive:
            for name, kind, value in members:
                entry = tarfile.TarInfo(name)
                entry.type = kind
                entry.mode = 0o7777
                if kind == tarfile.REGTYPE:
                    entry.size = len(value)
                    archive.addfile(entry, io.BytesIO(value))
                else:
                    entry.linkname = value
                    archive.addfile(entry)
        return path

    def test_valid_files_become_plain_readable_files(self):
        with tempfile.TemporaryDirectory() as temporary:
            directory = Path(temporary)
            archive = self.archive(directory, [('./', tarfile.DIRTYPE, ''), ('nested/index.html', tarfile.REGTYPE, b'HTML')])
            old_umask = os.umask(0o077)
            try:
                files = publisher.unpack_checked(archive, directory / 'public')
            finally:
                os.umask(old_umask)
            self.assertEqual(files, {'nested/index.html': 4})
            self.assertEqual(stat.S_IMODE((directory / 'public/nested').stat().st_mode), 0o755)
            self.assertEqual(stat.S_IMODE((directory / 'public/nested/index.html').stat().st_mode), 0o644)

    def test_fixed_nginx_templates_remain_readable_under_private_umask(self):
        with tempfile.TemporaryDirectory() as temporary:
            directory = Path(temporary)
            source = directory / 'trusted-template'
            source.write_text('fixed nginx config')
            original = os.umask(0o077)
            try:
                for name in ('Dockerfile', 'nginx.conf', 'site.conf'):
                    target = directory / name
                    publisher.copy_public_template(source, target)
                    self.assertEqual(stat.S_IMODE(target.stat().st_mode), 0o644)
            finally:
                os.umask(original)

    def test_unsafe_paths_and_file_types_are_rejected(self):
        for name, kind, value in [('../escape', tarfile.REGTYPE, b'x'), ('/escape', tarfile.REGTYPE, b'x'), ('a/../escape', tarfile.REGTYPE, b'x'), ('a\\escape', tarfile.REGTYPE, b'x'), ('a\nescape', tarfile.REGTYPE, b'x'), ('link', tarfile.SYMTYPE, '/etc/passwd'), ('hard', tarfile.LNKTYPE, 'index.html'), ('pipe', tarfile.FIFOTYPE, ''), ('device', tarfile.CHRTYPE, '')]:
            with self.subTest(path=name, kind=kind), tempfile.TemporaryDirectory() as temporary:
                directory = Path(temporary)
                with self.assertRaises(ValueError):
                    publisher.unpack_checked(self.archive(directory, [(name, kind, value)]), directory / 'public')
                self.assertFalse((directory / 'escape').exists())

    def test_duplicate_aliases_and_size_limits_are_rejected(self):
        with tempfile.TemporaryDirectory() as temporary:
            directory = Path(temporary)
            archive = self.archive(directory, [('a', tarfile.REGTYPE, b'one'), ('./a', tarfile.REGTYPE, b'two')])
            with self.assertRaises(ValueError):
                publisher.unpack_checked(archive, directory / 'duplicate')
            archive = self.archive(directory, [('a', tarfile.REGTYPE, b'ab')])
            with patch.object(publisher, 'MAX_FILE', 1), self.assertRaises(ValueError):
                publisher.unpack_checked(archive, directory / 'too-big')
            with patch.object(publisher, 'MAX_BYTES', 1), self.assertRaises(ValueError):
                publisher.unpack_checked(archive, directory / 'too-total')
            with patch.object(publisher, 'MAX_FILES', 0), self.assertRaises(ValueError):
                publisher.unpack_checked(archive, directory / 'too-many')

    def test_actual_built_bundle_health_when_available(self):
        directory = Path(__file__).resolve().parents[2] / 'apps/site/dist-bundle'
        if not directory.is_dir():
            self.skipTest('Build site before checking its actual bundle')
        files = {path.relative_to(directory).as_posix(): path.stat().st_size for path in directory.rglob('*') if path.is_file()}
        health = publisher.verify_bundle(directory, files)
        self.assertEqual(health['status'], 'ok')
        changed = dict(files)
        changed['index.html'] += 1
        with self.assertRaises(ValueError):
            publisher.verify_bundle(directory, changed)

    def test_production_inventory_refuses_preview_and_bad_identity(self):
        directory = Path(__file__).resolve().parents[2] / 'apps/site/dist-bundle'
        if not directory.is_dir():
            self.skipTest('Build site before checking its actual bundle')
        files = {path.relative_to(directory).as_posix(): path.stat().st_size for path in directory.rglob('*') if path.is_file()}
        original = publisher.read_small
        def altered(path, limit=8 * 1024 * 1024):
            data = original(path, limit)
            if path.name == 'route-manifest.json':
                manifest = json.loads(data)
                manifest['base'] = '/site-preview/'
                return json.dumps(manifest).encode()
            return data
        with patch.object(publisher, 'read_small', altered), self.assertRaises(ValueError):
            publisher.verify_bundle(directory, files)
        def bad_health(path, limit=8 * 1024 * 1024):
            data = original(path, limit)
            if path.name == '__site-health.json':
                value = json.loads(data)
                value['buildId'] = '0' * 16
                return json.dumps(value).encode()
            return data
        with patch.object(publisher, 'read_small', bad_health), self.assertRaises(ValueError):
            publisher.verify_bundle(directory, files)

    def test_release_id_is_a_single_ci_identifier(self):
        self.assertTrue(publisher.RELEASE.fullmatch('a' * 40 + '-1234-1'))
        for value in ['../other', 'a' * 40 + '-1-1;id', 'a' * 40 + '-1-1 --help', 'latest', 'a' * 40 + '-1-1\n']:
            self.assertIsNone(publisher.RELEASE.fullmatch(value))

    def test_portable_packer_roundtrip_without_extended_attribute_files(self):
        with tempfile.TemporaryDirectory() as temporary:
            directory = Path(temporary)
            source = directory / 'source'
            source.mkdir()
            (source / '中文教程').mkdir()
            example = source / '中文教程/index.html'
            example.write_bytes(b'HTML')
            try:
                os.setxattr(example, 'user.fixture', b'not an archive member')
            except (AttributeError, OSError):
                pass
            first, second = directory / 'one.tar.gz', directory / 'two.tar.gz'
            packer.pack(source, first)
            packer.pack(source, second)
            self.assertEqual(first.read_bytes(), second.read_bytes())
            raw = directory / 'bundle.tar'
            raw.write_bytes(gzip.decompress(first.read_bytes()))
            files = publisher.unpack_checked(raw, directory / 'public')
            self.assertEqual(files, {'中文教程/index.html': 4})
            self.assertFalse(any('/._' in name or name.startswith('._') for name in files))


if __name__ == '__main__':
    unittest.main()
