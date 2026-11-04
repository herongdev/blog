#!/usr/bin/env python3
"""Exercise deploy.sh in temporary directories; never invoke real network tools."""
import json
import os
from pathlib import Path
import subprocess
import tempfile
import unittest

DEPLOY = Path(__file__).with_name("deploy.sh")
RELEASE = "20261104T050000Z"
FAKE_TOOL = r'''#!/usr/bin/env python3
import json, os, pathlib, shutil, subprocess, sys
root = pathlib.Path(os.environ["FAKE_TINGJI_ROOT"])
tool, args = pathlib.Path(sys.argv[0]).name, sys.argv[1:]
with open(root.parent / "calls.jsonl", "a") as log:
    log.write(json.dumps({"tool": tool, "args": args}) + "\n")
mode = os.environ["FAKE_TINGJI_MODE"]
if tool == "date":
    assert args == ["-u", "+%Y%m%dT%H%M%SZ"]
    print("20261104T050000Z")
elif tool == "ssh":
    assert args[:6] == ["-o", "BatchMode=yes", "-o", "StrictHostKeyChecking=yes", "-o", "ConnectTimeout=10"]
    assert args[6:10] == ["root@115.190.214.176", "bash", "-s", "--"]
    action, release = args[10:]
    source = sys.stdin.read().replace("/var/www/tingji", str(root))
    result = subprocess.run(["/bin/bash", "-s", "--", action, release], input=source, text=True)
    if action == "activate" and result.returncode == 0 and mode == "lost_activation_reply":
        sys.exit(255)
    sys.exit(result.returncode)
elif tool == "rsync":
    assert args[:4] == ["-az", "--no-owner", "--no-group", "-e"]
    assert args[4] == "ssh -o BatchMode=yes -o StrictHostKeyChecking=yes -o ConnectTimeout=10"
    assert args[6] == "root@115.190.214.176:/var/www/tingji/releases/20261104T050000Z/"
    if mode == "upload_fail":
        sys.exit(23)
    shutil.copytree(args[5], root / "releases/20261104T050000Z", dirs_exist_ok=True)
    if mode == "changed_during_upload":
        (root / "current").unlink()
        (root / "current").symlink_to("releases/other")
elif tool == "curl":
    assert args[args.index("--resolve") + 1] == "tingji.herong.info:443:115.190.214.176"
    assert args[-1] in ["https://tingji.herong.info" + path for path in ["/", "/privacy/", "/support/", "/privacy-policy.json"]]
    if mode == "changed_after_activation":
        (root / "current").unlink()
        (root / "current").symlink_to("releases/other")
        sys.exit(22)
    if mode == "health_fail":
        sys.exit(22)
elif tool == "flock":
    # Cases run serially; preserve the remote lock call without requiring Linux flock.
    assert args == ["-x", "9"]
elif tool == "mv":
    assert args[0] == "-Tf"
    assert pathlib.Path(args[2]) == root / "current"
    assert pathlib.Path(args[1]).parent == root
    os.replace(args[1], args[2])
else:
    raise AssertionError(tool)
'''


class DeployTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory(prefix="tingji-deploy-test-")
        self.addCleanup(self.temp.cleanup)
        self.base = Path(self.temp.name)
        self.root = self.base / "remote"
        for name in ("old", "other"):
            (self.root / "releases" / name).mkdir(parents=True)
        (self.root / "current").symlink_to("releases/old")
        fake_bin = self.base / "bin"
        fake_bin.mkdir()
        for tool in ("ssh", "rsync", "curl", "date", "flock", "mv"):
            path = fake_bin / tool
            path.write_text(FAKE_TOOL)
            path.chmod(0o755)
        self.env = os.environ.copy()
        self.env.update({
            "PATH": str(fake_bin) + os.pathsep + self.env["PATH"],
            "FAKE_TINGJI_ROOT": str(self.root),
            "FAKE_TINGJI_MODE": "success",
            "TINGJI_DEPLOY_HOST": "root@115.190.214.176",
        })

    def run_deploy(self, mode="success", target="root@115.190.214.176"):
        self.env.update(FAKE_TINGJI_MODE=mode, TINGJI_DEPLOY_HOST=target)
        return subprocess.run(["bash", str(DEPLOY)], env=self.env, text=True,
                              capture_output=True, timeout=15)

    def current(self):
        return os.readlink(self.root / "current")

    def calls(self):
        path = self.base / "calls.jsonl"
        return [json.loads(line) for line in path.read_text().splitlines()] if path.exists() else []

    def test_success_preserves_previous_and_checks_four_pages(self):
        result = self.run_deploy()
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(self.current(), "releases/" + RELEASE)
        self.assertEqual((self.root / f"previous-{RELEASE}.txt").read_text(), "releases/old\n")
        self.assertEqual(len([c for c in self.calls() if c["tool"] == "curl"]), 4)
        self.assertTrue((self.root / "releases/old").is_dir())

    def test_health_failure_restores_previous_but_keeps_candidate(self):
        result = self.run_deploy("health_fail")
        self.assertNotEqual(result.returncode, 0)
        self.assertEqual(self.current(), "releases/old")
        self.assertIn("Restored Tingji current", result.stderr)
        self.assertTrue((self.root / "releases" / RELEASE / "index.html").is_file())

    def test_lost_activation_reply_recovers_switched_release(self):
        result = self.run_deploy("lost_activation_reply")
        self.assertEqual(result.returncode, 255)
        self.assertEqual(self.current(), "releases/old")

    def test_upload_failure_never_activates(self):
        result = self.run_deploy("upload_fail")
        self.assertEqual(result.returncode, 23)
        self.assertEqual(self.current(), "releases/old")
        self.assertFalse(any(c["tool"] == "curl" for c in self.calls()))

    def test_changed_current_during_upload_is_not_overwritten(self):
        result = self.run_deploy("changed_during_upload")
        self.assertNotEqual(result.returncode, 0)
        self.assertEqual(self.current(), "releases/other")
        self.assertIn("refusing activation", result.stderr)
        self.assertFalse(any(c["tool"] == "curl" for c in self.calls()))

    def test_changed_current_after_activation_is_not_rolled_back(self):
        result = self.run_deploy("changed_after_activation")
        self.assertNotEqual(result.returncode, 0)
        self.assertEqual(self.current(), "releases/other")
        self.assertIn("Rollback skipped", result.stderr)

    def test_wrong_host_rejected_before_any_tool_call(self):
        result = self.run_deploy(target="root@101.96.210.172")
        self.assertNotEqual(result.returncode, 0)
        self.assertEqual(self.current(), "releases/old")
        self.assertEqual(self.calls(), [])

    def test_target_traversal_is_rejected(self):
        (self.root / "current").unlink()
        (self.root / "current").symlink_to("releases/../outside")
        result = self.run_deploy()
        self.assertNotEqual(result.returncode, 0)
        self.assertEqual(self.current(), "releases/../outside")
        self.assertFalse(any(c["tool"] == "rsync" for c in self.calls()))

    def test_existing_release_is_not_overwritten(self):
        candidate = self.root / "releases" / RELEASE
        candidate.mkdir()
        (candidate / "keep.txt").write_text("untouched")
        result = self.run_deploy()
        self.assertNotEqual(result.returncode, 0)
        self.assertEqual((candidate / "keep.txt").read_text(), "untouched")
        self.assertFalse(any(c["tool"] == "rsync" for c in self.calls()))

    def test_absolute_previous_target_is_preserved(self):
        (self.root / "current").unlink()
        (self.root / "current").symlink_to(str(self.root / "releases/old"))
        result = self.run_deploy("health_fail")
        self.assertNotEqual(result.returncode, 0)
        self.assertEqual(self.current(), str(self.root / "releases/old"))
        self.assertIn("Restored Tingji current", result.stderr)


if __name__ == "__main__":
    unittest.main(verbosity=2)
