"""Local checkout regressions; no downloads, installed vendor, or browser use."""
import hashlib
import importlib.util
import os
from pathlib import Path
import subprocess
import tempfile
import unittest
from unittest.mock import patch


ROOT = Path(__file__).resolve().parents[1]
SPEC = importlib.util.spec_from_file_location('publisher_setup', ROOT / 'setup.py')
SETUP = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(SETUP)


class ForkSetupTests(unittest.TestCase):
    def setUp(self):
        self.temporary = tempfile.TemporaryDirectory(prefix='publisher-setup-test-')
        self.addCleanup(self.temporary.cleanup)
        self.root = Path(self.temporary.name)
        self.vendor = self.root / 'fork'
        self.vendor.mkdir()
        self.environment = patch.dict(os.environ, {
            'GIT_CONFIG_NOSYSTEM': '1', 'GIT_CONFIG_GLOBAL': os.devnull,
            'GIT_AUTHOR_NAME': 'Fixture', 'GIT_AUTHOR_EMAIL': 'fixture@example.invalid',
            'GIT_COMMITTER_NAME': 'Fixture', 'GIT_COMMITTER_EMAIL': 'fixture@example.invalid',
        })
        self.environment.start()
        self.addCleanup(self.environment.stop)
        self.git('init', '-q')
        self.write('main.py', 'original uploader\n')
        self.write('utils/base_social_media.py', 'resource_from_runtime\n')
        self.write('README.md', 'fixture\n')
        self.git('add', '.')
        self.git('commit', '-qm', 'baseline')
        baseline = self.git('rev-parse', 'HEAD').strip()
        self.write('main.py', 'guarded uploader\n')
        self.write('utils/publishing_hooks.py', 'guarded hooks\n')
        self.git('add', '.')
        self.git('commit', '-qm', 'historical guarded integration')
        historical = self.git('rev-parse', 'HEAD').strip()
        self.write('utils/base_social_media.py', 'resource_from_module\n')
        self.patch_file = self.root / 'reviewed.patch'
        self.patch_file.write_text(self.git('diff', baseline, '--'))
        self.expected = {name: (self.vendor / name).read_bytes() for name in (
            'main.py', 'utils/publishing_hooks.py', 'utils/base_social_media.py')}
        self.lock = {
            'baseline_sha': baseline, 'patched_sha': historical,
            'patched_files': {name: hashlib.sha256(data).hexdigest() for name, data in self.expected.items()},
        }
        self.write('utils/base_social_media.py', 'resource_from_runtime\n')

    def git(self, *args):
        return subprocess.check_output(['git', '-C', str(self.vendor), *args], text=True, stderr=subprocess.PIPE)

    def write(self, name, contents):
        path = self.vendor / name
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(contents)

    def prepare(self):
        SETUP.prepare_fork(self.vendor, self.lock, self.patch_file)

    def assertExpected(self):
        self.assertEqual({name: (self.vendor / name).read_bytes() for name in self.expected}, self.expected)

    def test_clean_baseline_applies_full_patch_and_can_be_checked_again(self):
        self.git('checkout', '--detach', self.lock['baseline_sha'])
        self.prepare()
        self.assertExpected()
        self.prepare()
        self.assertExpected()
        self.assertEqual(self.git('rev-parse', 'HEAD').strip(), self.lock['baseline_sha'])

    def test_clean_historical_commit_applies_only_resource_fix(self):
        self.prepare()
        self.assertExpected()
        self.assertEqual(self.git('diff', '--name-only', 'HEAD').splitlines(), ['utils/base_social_media.py'])
        self.prepare()
        self.assertExpected()
        self.assertEqual(self.git('rev-parse', 'HEAD').strip(), self.lock['patched_sha'])

    def test_complete_patch_does_not_allow_an_unknown_commit(self):
        self.prepare()
        self.git('add', '.')
        self.git('commit', '-qm', 'unreviewed revision')
        with self.assertRaisesRegex(RuntimeError, 'unreviewed commit'):
            self.prepare()

    def test_complete_patch_does_not_allow_unrelated_tracked_changes(self):
        self.prepare()
        self.write('README.md', 'author changes to preserve\n')
        with self.assertRaisesRegex(RuntimeError, 'unknown changes'):
            self.prepare()
        self.assertEqual((self.vendor / 'README.md').read_text(), 'author changes to preserve\n')

    def test_modified_historical_file_is_not_overwritten(self):
        self.write('main.py', 'unreviewed uploader change\n')
        with self.assertRaisesRegex(RuntimeError, 'differs from the reviewed patch'):
            self.prepare()
        self.assertEqual((self.vendor / 'main.py').read_text(), 'unreviewed uploader change\n')
        self.assertEqual((self.vendor / 'utils/base_social_media.py').read_text(), 'resource_from_runtime\n')

    def test_unrelated_staged_change_is_not_hidden_by_worktree_contents(self):
        self.prepare()
        self.write('README.md', 'staged author change\n')
        self.git('add', 'README.md')
        self.write('README.md', 'fixture\n')
        with self.assertRaisesRegex(RuntimeError, 'unknown changes'):
            self.prepare()
        self.assertEqual(self.git('show', ':README.md'), 'staged author change\n')

    def test_unknown_untracked_source_is_not_accepted(self):
        self.write('extra.py', 'unreviewed source\n')
        with self.assertRaisesRegex(RuntimeError, 'unknown changes'):
            self.prepare()
        self.assertTrue((self.vendor / 'extra.py').is_file())

    def test_mismatched_historical_digest_stops_before_apply(self):
        self.lock['patched_files']['main.py'] = '0' * 64
        with self.assertRaisesRegex(RuntimeError, 'Historical fork does not match'):
            self.prepare()
        self.assertEqual((self.vendor / 'utils/base_social_media.py').read_text(), 'resource_from_runtime\n')


if __name__ == '__main__':
    unittest.main()
