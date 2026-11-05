"""Private, bounded evidence of the live identity-verification surface.

No authentication decision or public protocol event depends on this module.
Only fixed markers/counts are read; URLs, input values and page text are not
retained. Screenshots stay in the private publishing data directory.
"""
import asyncio
import json
import os
from pathlib import Path
import re
from urllib.parse import urlsplit
from uuid import UUID, uuid4


TEXT_MARKERS = {
    'identity': '身份验证',
    'verifyIdentity': '验证身份',
    'identityCheck': '身份核验',
    'security': '安全验证',
    'receiveSms': '接收短信验证',
    'sms': '短信验证',
    'smsCode': '短信验证码',
    'phone': '手机验证',
    'face': '人脸识别',
    'faceVerification': '刷脸验证',
    'getCode': '获取验证码',
    'anotherMethod': '换一种验证方式',
}
SMS_BUTTON = '.uc-ui-verify_sms-verify_button'
CODE_INPUT = 'input[placeholder*="验证码"], input[autocomplete="one-time-code"]'
MASK = 'input, textarea, img[src^="data:image"], img[aria-label="二维码"], #animate_qrcode_container img'
TAGS = frozenset({'start', 'unmatched'})
MAX_PNG = 3 * 1024 * 1024


def _origin(url):
    """Return only an HTTPS hostname and a narrowly scoped DOM-read flag."""
    try:
        parsed = urlsplit(url)
        host = parsed.hostname
        if (parsed.scheme != 'https' or not isinstance(host, str)
                or not re.fullmatch(r'[a-z0-9](?:[a-z0-9.-]{0,251}[a-z0-9])?', host)
                or parsed.username is not None or parsed.password is not None):
            return None, False
        trusted = (parsed.port in (None, 443)
                   and (host == 'douyin.com' or host.endswith('.douyin.com')))
        return host, trusted
    except (TypeError, ValueError):
        return None, False


async def _count_visible(locator):
    count = await locator.count()
    if type(count) is not int or count < 0:
        return {'count': 0, 'visible': False}
    visible = await asyncio.gather(*(locator.nth(i).is_visible() for i in range(min(count, 8))))
    return {'count': min(count, 64), 'visible': any(visible)}


class VerificationEvidence:
    def __init__(self, bridge):
        self.session = None
        self.root = None
        self.attempted = set()
        try:
            session = bridge.request.get('session_id')
            account = Path(bridge.request['account_file'])
            if (isinstance(session, str) and str(UUID(session)) == session
                    and account.is_absolute() and '..' not in account.parts
                    and account.parent.name == 'accounts'):
                self.session = session
                self.root = account.parent.parent
                self.accounts = account.parent
        except (KeyError, TypeError, ValueError, AttributeError):
            pass

    def _directory(self):
        # Refuse every existing symlink component, then anchor all writes to an
        # opened no-follow directory so screenshot filenames cannot redirect.
        if self.root is None:
            return None
        if any(p.is_symlink() for p in [self.accounts, self.root, *self.root.parents]):
            return None
        flags = os.O_RDONLY | os.O_DIRECTORY | os.O_NOFOLLOW
        root_fd = os.open(self.root, flags)
        try:
            try:
                os.mkdir('diagnostics', mode=0o700, dir_fd=root_fd)
            except FileExistsError:
                pass
            directory = os.open('diagnostics', flags, dir_fd=root_fd)
        finally:
            os.close(root_fd)
        try:
            os.fchmod(directory, 0o700)
        except BaseException:
            os.close(directory)
            raise
        return directory

    @staticmethod
    def _exists(directory, name):
        try:
            os.stat(name, dir_fd=directory, follow_symlinks=False)
            return True  # Existing files, including symlinks, are never replaced.
        except FileNotFoundError:
            return False

    @staticmethod
    def _write(directory, name, data):
        if VerificationEvidence._exists(directory, name):
            return False
        temporary = '.verification-' + uuid4().hex + '.tmp'
        try:
            descriptor = os.open(temporary, os.O_WRONLY | os.O_CREAT | os.O_EXCL | os.O_NOFOLLOW,
                                 0o600, dir_fd=directory)
            with os.fdopen(descriptor, 'wb') as output:
                os.fchmod(output.fileno(), 0o600)
                output.write(data)
                output.flush()
                os.fsync(output.fileno())
            if VerificationEvidence._exists(directory, name):
                return False
            os.replace(temporary, name, src_dir_fd=directory, dst_dir_fd=directory)
            return True
        finally:
            try:
                os.unlink(temporary, dir_fd=directory)
            except FileNotFoundError:
                pass

    async def _frame(self, frame, main, entry):
        # Host/visibility metadata is useful even for an unknown verification
        # origin. Never read its contents to guess whether it is trustworthy.
        entry.update({'host': None, 'visible': False})
        try:
            host, trusted = _origin(frame.url)
            entry.update({'host': host, 'visible': frame is main})
            if frame is not main:
                element = await frame.frame_element()
                entry['visible'] = bool(await element.is_visible())
        except Exception:
            return
        if not trusted or not entry['visible']:
            return
        try:
            values = await asyncio.gather(
                *(_count_visible(frame.get_by_text(text, exact=True)) for text in TEXT_MARKERS.values()),
                _count_visible(frame.locator(SMS_BUTTON)),
                _count_visible(frame.locator(CODE_INPUT)),
            )
            entry['textVisible'] = {key: value['visible'] for key, value in zip(TEXT_MARKERS, values)}
            entry['smsButtons'], entry['codeInputs'] = values[-2:]
        except Exception:
            entry['domUnavailable'] = True

    async def _metadata(self, page, result):
        tasks = []
        try:
            pages = [page]
            for candidate in list(page.context.pages)[:3]:
                if all(candidate is not existing for existing in pages):
                    pages.append(candidate)
                if len(pages) == 3:
                    break
            for candidate in pages:
                host, _ = _origin(candidate.url)
                record = {'host': host, 'frames': []}
                result['pages'].append(record)
                for frame in list(candidate.frames)[:12]:
                    entry = {}
                    record['frames'].append(entry)
                    tasks.append(asyncio.create_task(self._frame(frame, candidate.main_frame, entry)))
            await asyncio.gather(*tasks)
        finally:
            for task in tasks:
                if not task.done():
                    task.cancel()
            await asyncio.gather(*tasks, return_exceptions=True)

    async def capture(self, page, tag):
        """Capture each fixed tag once; deliberately return no path or payload."""
        if not isinstance(tag, str) or tag not in TAGS or tag in self.attempted or self.root is None:
            return
        self.attempted.add(tag)
        directory = None
        try:
            directory = self._directory()
            if directory is None:
                return
            stem = f'{self.session}-verification-{tag}'
            if self._exists(directory, stem + '.json') or self._exists(directory, stem + '.png'):
                return
            result = {'version': 1, 'tag': tag, 'pages': [], 'collectionIncomplete': False,
                      'screenshotSaved': False}
            try:
                await asyncio.wait_for(self._metadata(page, result), 2)
            except Exception:
                result['collectionIncomplete'] = True
            # Masking locators do not return iframe values or text. Refuse a
            # screenshot if there are too many frames to cover them all safely.
            frames = list(page.frames)
            _, trusted = _origin(page.url)
            if trusted and frames and page.main_frame in frames and len(frames) <= 12:
                try:
                    masks = [frame.locator(MASK) for frame in frames]
                    png = await asyncio.wait_for(page.screenshot(type='png', full_page=False,
                        mask=masks, mask_color='#333333', timeout=2500), 3)
                    if isinstance(png, bytes) and len(png) <= MAX_PNG and png.startswith(b'\x89PNG\r\n\x1a\n'):
                        result['screenshotSaved'] = self._write(directory, stem + '.png', png)
                except Exception:
                    pass
            self._write(directory, stem + '.json', json.dumps(result, ensure_ascii=False).encode('utf-8'))
        except Exception:
            pass  # Diagnostics never become a login error or expose exceptions.
        finally:
            if directory is not None:
                os.close(directory)
