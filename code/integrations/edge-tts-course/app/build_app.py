#!/usr/bin/env python3
"""Package a local macOS app with the installed system compiler. Installs nothing."""
from pathlib import Path
import plistlib
import shutil
import subprocess

root = Path(__file__).resolve().parents[1]
bundle = root / '微课视频.app'
contents = bundle / 'Contents'
(contents / 'MacOS').mkdir(parents=True, exist_ok=True)
(contents / 'Resources').mkdir(exist_ok=True)
shutil.copy2(root / 'assets/hr-elephant.png', contents / 'Resources/hr-elephant.png')
info = {'CFBundleName': '微课视频', 'CFBundleDisplayName': '微课视频',
        'CFBundleIdentifier': 'local.course.video.editor', 'CFBundleExecutable': 'CourseVideo',
        'CFBundlePackageType': 'APPL', 'CFBundleShortVersionString': '1.2', 'CFBundleVersion': '3',
        'LSMinimumSystemVersion': '13.0', 'NSHighResolutionCapable': True,
        'CFBundleIconFile': 'hr-elephant.png', 'CourseProjectRoot': str(root),
        'NSAppTransportSecurity': {'NSAllowsLocalNetworking': True},
        'NSDocumentsFolderUsageDescription': '读取当前微课工程的文稿、配音缓存，并保存生成的视频。'}
with (contents / 'Info.plist').open('wb') as stream:
    plistlib.dump(info, stream)
subprocess.run(['/usr/bin/swiftc', '-O', '-o', str(contents / 'MacOS/CourseVideo'),
                str(root / 'app/main.swift'), '-framework', 'Cocoa', '-framework', 'WebKit'], check=True)
entitlements = root / 'output' / 'app-entitlements.plist'
entitlements.parent.mkdir(exist_ok=True)
with entitlements.open('wb') as stream:
    plistlib.dump({'com.apple.security.files.bookmarks.app-scope': True,
                  'com.apple.security.files.user-selected.read-write': True}, stream)
subprocess.run(['/usr/bin/codesign', '--force', '--sign', '-', '--entitlements', str(entitlements), str(bundle)], check=True)
print(bundle)
