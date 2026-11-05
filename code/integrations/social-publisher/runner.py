#!/usr/bin/env python3
"""One isolated SAU operation; stdout is NDJSON, stdin is an independent control pipe."""
from __future__ import annotations

import asyncio
import hashlib
import importlib
import json
import math
import os
import re
import shutil
import signal
import sys
import uuid
from datetime import datetime, timezone, timedelta
from pathlib import Path
from urllib.parse import urlsplit
from auth_network import LoginNetworkObservation
from login_verification import DouyinLoginVerification
from verification_evidence import VerificationEvidence

ROOT = Path(__file__).resolve().parent
PROTOCOL_OUT = sys.stdout
os.environ.setdefault("PLAYWRIGHT_BROWSERS_PATH", str(ROOT / ".vendor/browsers"))
PLATFORMS = {"douyin": ("DouYinVideo", "douyin_setup"), "xiaohongshu": ("XiaoHongShuVideo", "xiaohongshu_setup"), "tencent": ("TencentVideo", "tencent_setup")}


def now():
    return datetime.now(timezone.utc).isoformat()


class SafeError(Exception):
    def __init__(self, code, message):
        self.code, self.message = code, message
        super().__init__(message)


class PrivateLog:
    def __init__(self, stream, private_paths):
        self.stream = stream
        self.private_paths = sorted((str(p) for p in private_paths if p), key=len, reverse=True)
    def write(self, value):
        for path in self.private_paths:
            value = value.replace(path, "[private]")
        # Upstream terminal QR dumps are disabled; never preserve cookie/code values.
        if re.search(r'(?:cookie|token|验证码)\s*[:=]', value, re.I):
            value = "[sensitive log omitted]\n"
        return self.stream.write(value)
    def flush(self):
        self.stream.flush()
    def isatty(self):
        return False


class Bridge:
    def __init__(self, request, output=PROTOCOL_OUT):
        self.request, self.output = request, output
        self.seq = 0
        self.pending = {}
        self.submission_possible = False
        self.runtime = Path(request["data_dir"]).resolve()
        self.qr_version = 0
        self.qr_files = []
        self.qrcode_seen = False
        self.qrcode_digest = None
    def emit(self, event_type, **fields):
        self.seq += 1
        event = {"type": event_type, "seq": self.seq, "at": now(), **{k: self.request[k] for k in ("session_id", "target_id", "attempt_id", "account_id") if k in self.request}, **fields}
        self.output.write(json.dumps(event, ensure_ascii=False) + "\n")
        self.output.flush()
    async def controls(self, reader):
        while line := await reader.readline():
            try:
                message = json.loads(line)
            except (ValueError, UnicodeError):
                continue
            kind = message.get("type")
            key = message.get("request_id") if kind == "submit_authorized" else message.get("challenge_id") if kind == "challenge_response" else None
            pending = self.pending.get(key)
            if pending and pending[0] == kind and not pending[1].done():
                pending[1].set_result(message)
        for _, future in list(self.pending.values()):
            if not future.done():
                future.set_exception(SafeError("CONTROL_CLOSED", "控制连接已断开"))
    async def ask(self, event_type, key_name, timeout, **fields):
        key = uuid.uuid4().hex
        future = asyncio.get_running_loop().create_future()
        self.pending[key] = ("submit_authorized" if event_type == "before_submit" else "challenge_response", future)
        self.emit(event_type, **{key_name: key}, expires_at=(datetime.now(timezone.utc) + timedelta(seconds=timeout)).isoformat(), **fields)
        try:
            return await asyncio.wait_for(future, timeout)
        finally:
            self.pending.pop(key, None)
    async def hook(self, event, **fields):
        if event == "before_submit":
            if self.submission_possible:
                raise SafeError("REPEAT_SUBMIT_BLOCKED", "已进入提交阶段，禁止再次提交")
            self.submission_possible = True
            response = await self.ask("before_submit", "request_id", 30)
            if response.get("authorized") is not True:
                self.submission_possible = False
                raise SafeError("SUBMIT_DENIED", "提交授权已失效或任务已取消")
            self.emit("stage", stage="submitting")
        elif event == "challenge":
            source = fields.pop("image_path", None)
            if source:
                fields["image_path"] = str(self.copy_qr(source))
            response = await self.ask("challenge", "challenge_id", 600, **fields)
            value = str(response.get("value", "")).strip()
            if fields.get("kind") == "sms" and not re.fullmatch(r"\d{4,8}", value):
                raise SafeError("INVALID_CHALLENGE_RESPONSE", "验证码格式不正确")
            return value
        else:
            self.emit(event, **fields)
    def copy_qr(self, source):
        self.qr_version += 1
        destination = self.runtime / f"qr-{self.qr_version}-{uuid.uuid4().hex}.png"
        shutil.copyfile(source, destination)
        destination.chmod(0o600)
        self.qr_files.append(destination)
        return destination
    async def qrcode(self, payload):
        if not payload.get("image_path"):
            raise SafeError("QR_UNAVAILABLE", "平台未提供可用的二维码")
        douyin = self.request.get("platform") == "douyin"
        digest = hashlib.sha256(Path(payload["image_path"]).read_bytes()).hexdigest() if douyin else None
        if douyin and digest == self.qrcode_digest:
            return  # Re-sending the same image must not renew its display window.
        path = self.copy_qr(payload["image_path"])
        if douyin:
            seconds = payload.get("refresh_after_seconds", 45)
            if type(seconds) not in (int, float) or (isinstance(seconds, float) and not math.isfinite(seconds)) or seconds <= 0:
                seconds = 45
            # This is a host display-refresh window, not the platform's TTL.
            timing = {"refresh_after_seconds": min(45, max(1, seconds))}
        else:
            timing = {"expires_at": (datetime.now(timezone.utc) + timedelta(minutes=5)).isoformat()}
        self.emit("qrcode", image_path=str(path), version=self.qr_version, **timing)
        self.qrcode_digest = digest
        self.qrcode_seen = True
        self.emit("stage", stage="waiting_scan")
    def cleanup(self):
        for path in self.qr_files:
            path.unlink(missing_ok=True)


def sau_root():
    return Path(os.environ.get("PUBLISHER_SAU_ROOT", ROOT / ".vendor" / "social-auto-upload")).resolve()


def verify_fork():
    lock = json.loads((ROOT / "fork-lock.json").read_text())
    for name, digest in lock.get("patched_files", {}).items():
        source = sau_root() / name
        if not source.is_file() or hashlib.sha256(source.read_bytes()).hexdigest() != digest:
            raise SafeError("FORK_PATCH_MISMATCH", "发布依赖补丁不完整，请重新运行初始化")
    if not lock.get("patched_files"):
        raise SafeError("FORK_NOT_LOCKED", "发布依赖尚未锁定")


def health():
    verify_fork()
    os.environ["PUBLISHER_INTEGRATION"] = "1"
    sys.path.insert(0, str(sau_root()))
    for platform, (klass, setup) in PLATFORMS.items():
        module = importlib.import_module(f"uploader.{platform}_uploader.main")
        if not callable(getattr(getattr(module, klass), "main", None)) or not callable(getattr(module, setup, None)):
            raise SafeError("ENTRYPOINT_MISSING", "平台入口缺失")
    from utils.publishing_hooks import INTEGRATION_PROTOCOL_VERSION
    if INTEGRATION_PROTOCOL_VERSION != 1:
        raise SafeError("PROTOCOL_MISMATCH", "执行器补丁协议不匹配")
    from patchright.sync_api import sync_playwright
    with sync_playwright() as playwright:
        browser = Path(playwright.chromium.executable_path)
        if not browser.is_file() or not os.access(browser, os.X_OK):
            raise SafeError("BROWSER_NOT_INSTALLED", "投稿浏览器尚未安装")
    platforms = list(PLATFORMS)
    try:
        biliup_binary()
        platforms.append("bilibili")
    except SafeError:
        pass
    return {"type": "result", "seq": 1, "at": now(), "status": "ready", "protocol_version": 1, "platforms": platforms}


def prepare(request):
    verify_fork()
    platform = {"weixin": "tencent", "weixin_video": "tencent"}.get(request.get("platform"), request.get("platform"))
    request["platform"] = platform
    if platform not in {*PLATFORMS, "bilibili"} or request.get("operation") not in {"check", "login", "publish"}:
        raise SafeError("INVALID_OPERATION", "不支持的平台或操作")
    for key in ("data_dir", "account_file"):
        if not request.get(key) or not Path(request[key]).is_absolute():
            raise SafeError("INVALID_PRIVATE_PATH", "执行器缺少私有数据目录配置")
    runtime = Path(request["data_dir"])
    runtime.mkdir(parents=True, exist_ok=True, mode=0o700)
    runtime.chmod(0o700)
    Path(request["account_file"]).parent.mkdir(parents=True, exist_ok=True, mode=0o700)
    os.umask(0o077)
    os.environ.update(PUBLISHER_INTEGRATION="1", PUBLISHER_DATA_DIR=str(runtime), PUBLISHER_RUNTIME_DIR=str(runtime))
    sys.path.insert(0, str(sau_root()))
    content = request.get("content") or {}
    for field in ("title", "description", "tags"):
        request.setdefault(field, content.get(field, [] if field == "tags" else ""))
    request["video_file"] = request.get("video_file") or request.get("video_path")
    request["cover_file"] = request.get("cover_file") or request.get("cover_path")
    if request["operation"] == "publish":
        if not request["video_file"] or not Path(request["video_file"]).is_file():
            raise SafeError("VIDEO_MISSING", "视频文件不存在")
        if request["cover_file"] and not Path(request["cover_file"]).is_file():
            raise SafeError("COVER_MISSING", "封面文件不存在")
        limits = {"douyin": 30, "xiaohongshu": 20, "tencent": 1000, "bilibili": 80}
        if not str(request["title"]).strip() or len(request["title"]) > limits[platform]:
            raise SafeError("INVALID_TITLE", f"标题不能为空，且不超过 {limits[platform]} 个字符")
        if not isinstance(request["tags"], list) or any(not isinstance(tag, str) for tag in request["tags"]):
            raise SafeError("INVALID_TAGS", "话题必须是文本列表")
        if platform == "xiaohongshu" and len(request["tags"]) > 10:
            raise SafeError("INVALID_TAGS", "小红书最多支持 10 个话题")
    return request


AUTH_FAILURE_MESSAGES = {
    "LOGIN_PAGE_UNAVAILABLE": "平台登录页面暂时无法打开，请稍后重试或检查执行节点网络",
    "QR_UNAVAILABLE": "未能获取平台登录二维码，请重新发起扫码登录",
    "LOGIN_TIMEOUT": "等待扫码登录超时，请重新获取二维码",
    "LOGIN_NOT_COMPLETED": "扫码登录尚未完成，请重试；若平台要求验证，请按提示处理",
    "LOGIN_VERIFICATION_REQUIRED": "抖音要求额外身份验证，当前验证方式尚未完成，请检查平台验证要求",
    "LOGIN_VERIFICATION_FAILED": "抖音身份验证未通过，请核对验证码后重新登录",
    "AUTH_CHECK_FAILED": "暂时无法检查账号会话，请稍后重试",
}
# SAU can return a caught browser exception as a failed result. Inspect it only
# for known navigation failures; never expose its URL, paths, or raw text.
NAVIGATION_FAILURE = re.compile(
    r"\b(?:Page|Frame)\.goto:\s|\bnet::ERR_[A-Z_]+\b|"
    r"\bNavigation (?:failed|timeout|to\s+[\"']|was (?:interrupted|cancelled)|is interrupted)"
)


def auth_failure_result(bridge, detail=None, error=None):
    detail = detail if isinstance(detail, dict) else {}
    if bridge.request["operation"] == "check":
        if detail.get("success") is False and detail.get("status") == "cookie_invalid":
            return {"status": "completed", "auth_status": "invalid", "message": "账号会话无效，请重新登录", "checked_at": now()}
        code = "AUTH_CHECK_FAILED"
    else:
        message = str(error) if error is not None else str(detail.get("message", ""))
        verification_code = getattr(bridge, 'login_failure_code', None)
        if verification_code in {'LOGIN_VERIFICATION_REQUIRED', 'LOGIN_VERIFICATION_FAILED'}:
            code = verification_code
        elif bridge.qrcode_seen:
            timed_out = detail.get("status") == "timeout" or type(error).__name__ == "TimeoutError"
            code = "LOGIN_TIMEOUT" if timed_out else "LOGIN_NOT_COMPLETED"
        else:
            code = "LOGIN_PAGE_UNAVAILABLE" if NAVIGATION_FAILURE.search(message) else "QR_UNAVAILABLE"
    return {"status": "failed", "auth_status": "unknown", "error_code": code, "message": AUTH_FAILURE_MESSAGES[code], "checked_at": now()}


async def _any_visible(locator):
    for index in range(min(8, await locator.count())):
        if await locator.nth(index).is_visible():
            return True
    return False


async def _douyin_auth_observation(page, checker_result):
    # Only enum/bool/count values leave this function. Never serialize page
    # text, URLs, cookie objects, screenshots, or authentication material.
    pages = [page]
    for candidate in page.context.pages:
        if all(candidate is not existing for existing in pages):
            pages.append(candidate)
        if len(pages) >= 3:
            break
    cookies = await page.context.cookies("https://creator.douyin.com/")
    has_session = any(cookie.get("name") == "sessionid" and bool(cookie.get("value")) for cookie in cookies)
    observations = []
    for candidate in pages:
        url = urlsplit(candidate.url)
        route = "other"
        if url.scheme == "https" and url.hostname == "creator.douyin.com":
            if url.path in ("", "/"):
                route = "creator_root"
            elif url.path == "/creator-micro" or url.path.startswith("/creator-micro/"):
                route = "creator_micro"
        login_markers = [candidate.get_by_text(text, exact=True) for text in ("扫码登录", "手机号登录", "二维码失效")]
        login_markers.append(candidate.get_by_role("img", name="二维码", exact=True))
        # These are independent reads. Run together so diagnostics fit their
        # budget even on a busy creator page instead of delaying normal login.
        flags = await asyncio.gather(
            *(_any_visible(marker) for marker in login_markers),
            _any_visible(candidate.get_by_role("button", name="发布视频", exact=True)),
            _any_visible(candidate.get_by_role("link", name="发布视频", exact=True)),
            _any_visible(candidate.get_by_text(re.compile("已扫码|扫码成功|请在手机确认"))),
            _any_visible(candidate.locator('input[autocomplete="one-time-code"], input[placeholder*="验证码"], input[placeholder*="短信"]')),
            _any_visible(candidate.locator('iframe[src*="captcha"], iframe[title*="验证码"], [class*="captcha"], [id*="captcha"]')),
        )
        observations.append({
            "route": route,
            "hasSessionCookie": bool(has_session),
            "any_visible_login_marker": any(flags[:4]),
            "scan_confirmation_visible": flags[6],
            "visible_code_input": flags[7],
            "captcha_visible": flags[8],
            "creator_publish_control": flags[4] or flags[5],
        })
    return {"checkerResult": bool(checker_result), "pageCount": len(pages), "pages": observations, "observationUnavailable": False}


def _observed_douyin_checker(bridge, original):
    previous = None
    network = LoginNetworkObservation(bridge)
    verification = DouyinLoginVerification(bridge)
    evidence = VerificationEvidence(bridge)
    verification_since = None
    async def observed(page):
        nonlocal previous, verification_since
        result = await original(page)
        try:
            network.attach(page)
        except Exception:
            pass
        try:
            observation = await asyncio.wait_for(_douyin_auth_observation(page, result), timeout=2)
        except Exception:
            observation = {"checkerResult": bool(result), "pageCount": 0, "pages": [], "observationUnavailable": True}
        if observation != previous:
            try:
                bridge.emit("auth_observation", observation=observation)
                previous = observation
            except Exception:
                pass  # Diagnostics must not change the platform's result.
        if not result and network.failure and network.failure['state'] == 'verification_required':
            # The official page handles error 2046 through its identity dialog.
            # Keep that browser alive; bridge only normal SMS form interaction.
            loop = asyncio.get_running_loop()
            if verification_since is None:
                verification_since = loop.time()
                bridge.emit('stage', stage='waiting_challenge')
                await evidence.capture(page, 'start')
            bridge.login_failure_code = 'LOGIN_VERIFICATION_REQUIRED'
            deadline = getattr(bridge, 'login_deadline', verification_since + 240)
            # The QR behind the verification dialog may expire. Keep control
            # here so the uploader cannot click/renew it mid-verification.
            while loop.time() < deadline:
                await verification.handle(page)
                if await original(page):
                    return True
                if getattr(verification, 'attempts', 0) == 0 and loop.time() - verification_since >= 8:
                    await evidence.capture(page, 'unmatched')
                if verification.status == 'failed':
                    bridge.login_failure_code = 'LOGIN_VERIFICATION_FAILED'
                    break
                if verification.status == 'unsupported' and loop.time() - verification_since > 25:
                    break
                await asyncio.sleep(2)
            raise SafeError(bridge.login_failure_code, AUTH_FAILURE_MESSAGES[bridge.login_failure_code])
        return result
    return observed


def _interactive_douyin_login(original):
    async def generate(*args, **kwargs):
        # Keep the browser alive for a human to finish mobile confirmation.
        # QR rotation and the host's ten-minute process limit remain in force.
        return await original(*args, **{**kwargs, 'poll_interval': 2, 'max_checks': 240})
    return generate


async def browser_operation(bridge):
    request = bridge.request
    platform, operation = request["platform"], request["operation"]
    account = request["account_file"]
    bridge.emit("stage", stage="checking" if operation != "login" else "logging_in")
    if platform == 'douyin' and operation == 'login':
        bridge.login_deadline = asyncio.get_running_loop().time() + 480
    if operation != "publish":
        if operation == "check" and not Path(account).is_file():
            return {"status": "completed", "auth_status": "invalid", "message": "账号尚未登录，请先扫码登录", "checked_at": now()}
        try:
            module = importlib.import_module(f"uploader.{platform}_uploader.main")
            original_checker = getattr(module, "_is_douyin_login_completed", None) if platform == "douyin" and operation == "login" else None
            original_generator = getattr(module, 'douyin_cookie_gen', None) if platform == 'douyin' and operation == 'login' else None
            if callable(original_checker):
                module._is_douyin_login_completed = _observed_douyin_checker(bridge, original_checker)
            if callable(original_generator):
                module.douyin_cookie_gen = _interactive_douyin_login(original_generator)
            try:
                result = await getattr(module, PLATFORMS[platform][1])(account, handle=operation == "login", return_detail=True, qrcode_callback=bridge.qrcode, headless=True)
            finally:
                if callable(original_checker):
                    module._is_douyin_login_completed = original_checker
                if callable(original_generator):
                    module.douyin_cookie_gen = original_generator
        except Exception as error:
            return auth_failure_result(bridge, error=error)
        if isinstance(result, dict) and result.get("success") is True:
            return {"status": "completed", "auth_status": "valid", "message": "账号会话有效", "checked_at": now()}
        return auth_failure_result(bridge, detail=result)
    module = importlib.import_module(f"uploader.{platform}_uploader.main")
    if not Path(account).is_file():
        raise SafeError("ACCOUNT_LOGIN_REQUIRED", "请先登录目标账号")
    options = request.get("platform_options") or {}
    ai = options.get("ai_declaration")
    ai_enabled = ai is True or ai == "ai_generated"
    origin = options.get("content_origin", "unspecified")
    if platform in {"douyin", "tencent"} and origin not in (None, "unspecified"):
        raise SafeError("UNSUPPORTED_DECLARATION", "该平台尚未接入此来源声明")
    kwargs = dict(title=request["title"], file_path=request["video_file"], tags=request["tags"], publish_date=0, account_file=account, desc=request["description"], debug=False, headless=True)
    if platform == "douyin":
        kwargs.update(thumbnail_portrait_path=request["cover_file"], declaration="内容由AI生成" if ai_enabled else None)
    elif platform == "xiaohongshu":
        if ai_enabled:
            raise SafeError("UNSUPPORTED_DECLARATION", "小红书 AI 声明暂未接入")
        kwargs["thumbnail_path"] = request["cover_file"]
        if origin == "repost" and not str(options.get("source", "")).strip():
            raise SafeError("SOURCE_REQUIRED", "转载内容必须填写来源")
    else:
        kwargs["thumbnail_portrait_path"] = request["cover_file"]
    uploader = getattr(module, PLATFORMS[platform][0])(**kwargs)
    uploader.integration_hooks = bridge.hook
    if platform == "xiaohongshu":
        uploader.content_origin = origin
        uploader.repost_source = options.get("source", "")
    if platform == "tencent":
        uploader.content_label = "含AI生成内容" if ai_enabled else None
    bridge.emit("stage", stage="uploading")
    await uploader.main()
    evidence = getattr(uploader, "publish_evidence", None)
    if not evidence:
        raise SafeError("ACCEPTANCE_UNCONFIRMED", "未获取平台受理证据，请人工核对")
    return {"status": "submitted", "evidence": evidence, "platform_status": "unknown", "post_id": None, "post_url": None, "message": "已提交平台，审核状态未确认"}


def biliup_binary():
    lock = json.loads((ROOT / "fork-lock.json").read_text())
    binary = ROOT / ".vendor" / "biliup" / "biliup"
    metadata = ROOT / ".vendor" / "biliup" / "installed.json"
    if not binary.is_file() or not os.access(binary, os.X_OK) or not metadata.is_file():
        raise SafeError("BILIUP_NOT_INSTALLED", "尚未安装锁定版本的 B站执行程序，请按启动说明初始化")
    installed = json.loads(metadata.read_text())
    if installed.get("version") != lock["biliup"]["version"] or hashlib.sha256(binary.read_bytes()).hexdigest() != installed.get("sha256"):
        raise SafeError("BILIUP_VERSION_MISMATCH", "B站执行程序与安装记录不一致")
    return binary


async def bilibili_operation(bridge):
    request = bridge.request
    if request["operation"] == "login":
        raise SafeError("LOCAL_LOGIN_REQUIRED", "B站需在执行节点本地终端完成登录，再从后台检查会话")
    if not Path(request["account_file"]).is_file():
        if request["operation"] == "check":
            return {"status": "completed", "auth_status": "invalid", "message": "尚未完成执行节点本地登录", "checked_at": now()}
        raise SafeError("ACCOUNT_LOGIN_REQUIRED", "请先在执行节点本地登录 B站账号")
    account = Path(request["account_file"])
    temporary_account = bridge.runtime / "bilibili-session.json"
    shutil.copyfile(account, temporary_account)
    temporary_account.chmod(0o600)
    command = [str(biliup_binary()), "-u", str(temporary_account)]
    if request["operation"] == "check":
        command += ["renew"]
    else:
        options = request.get("platform_options") or {}
        if not isinstance(options.get("tid"), int) or options["tid"] <= 0:
            raise SafeError("CATEGORY_REQUIRED", "请选择 B站投稿分区")
        origin = options.get("content_origin")
        if origin not in ("original", "repost"):
            raise SafeError("ORIGIN_REQUIRED", "请选择原创或转载")
        source = str(options.get("source", "")).strip()
        if origin == "repost" and not source:
            raise SafeError("SOURCE_REQUIRED", "转载内容必须填写来源")
        command += ["upload", request["video_file"], "--title", request["title"], "--desc", request["description"], "--tid", str(options["tid"]), "--copyright", "1" if origin == "original" else "2"]
        if source and origin == "repost": command += ["--source", source]
        if request["tags"]: command += ["--tag", ",".join(request["tags"])]
        if request["cover_file"]: command += ["--cover", request["cover_file"]]
        # biliup exposes no commit callback, so conservatively mark before invoking upload.
        await bridge.hook("before_submit")
    process = await asyncio.create_subprocess_exec(*command, cwd=bridge.runtime, stdout=asyncio.subprocess.PIPE, stderr=asyncio.subprocess.PIPE)
    try:
        stdout, stderr = await asyncio.wait_for(process.communicate(), 7200 if request["operation"] == "publish" else 120)
    finally:
        if process.returncode is None:
            process.terminate()
            try: await asyncio.wait_for(process.wait(), 5)
            except asyncio.TimeoutError:
                process.kill()
                await process.wait()
    if process.returncode == 0:
        json.loads(temporary_account.read_text())
        replacement = account.with_name(account.name + "." + uuid.uuid4().hex + ".tmp")
        shutil.copyfile(temporary_account, replacement)
        replacement.chmod(0o600)
        os.replace(replacement, account)
    temporary_account.unlink(missing_ok=True)
    if request["operation"] == "check":
        return {"status": "completed", "auth_status": "valid" if process.returncode == 0 else "invalid", "checked_at": now(), "message": "会话检查完成"}
    # CLI stdout is not a documented structured acceptance result; no success-log guessing.
    return {"status": "submission_unknown", "evidence": None, "message": "B站投稿命令已结束，请到创作中心核对结果", "platform_status": "unknown"}


async def run(request):
    bridge = Bridge(request)
    reader = asyncio.StreamReader(limit=65536)
    protocol = asyncio.StreamReaderProtocol(reader)
    transport, _ = await asyncio.get_running_loop().connect_read_pipe(lambda: protocol, sys.stdin.buffer)
    controls = asyncio.create_task(bridge.controls(reader))
    async def heartbeat():
        while True:
            await asyncio.sleep(10)
            bridge.emit("heartbeat")
    heart = asyncio.create_task(heartbeat())
    task = asyncio.current_task()
    for sig in (signal.SIGTERM, signal.SIGINT):
        asyncio.get_running_loop().add_signal_handler(sig, task.cancel)
    try:
        timeout = 7200 if request["operation"] == "publish" else 660 if request["operation"] == "login" else 120
        async with asyncio.timeout(timeout):
            result = await (bilibili_operation(bridge) if request["platform"] == "bilibili" else browser_operation(bridge))
        bridge.emit("result", submission_intent_recorded=bridge.submission_possible, **result)
    except BaseException as exc:
        if isinstance(exc, SafeError):
            code, message = exc.code, exc.message
        elif str(exc) in {"指定封面未能设置，停止投稿", "指定封面入口不可用，停止投稿", "封面保存未确认，停止投稿", "封面保存未确认"}:
            code, message = "COVER_NOT_APPLIED", "指定封面未能确认保存，已在提交前停止"
        elif str(exc) in {"转载声明未能设置，停止投稿", "指定视频声明未能设置，停止投稿", "指定视频声明无法设置"}:
            code, message = "DECLARATION_NOT_APPLIED", "指定声明未能设置，已在提交前停止"
        elif str(exc) == "指定话题未能设置，停止投稿":
            code, message = "TAGS_NOT_APPLIED", "指定话题未能设置，已在提交前停止"
        elif isinstance(exc, (TimeoutError, asyncio.CancelledError)):
            code, message = "OPERATION_STOPPED", "操作超时或已停止"
        else:
            # Avoid exposing platform HTML, credentials or server paths through exception strings.
            code, message = "PLATFORM_OPERATION_FAILED", "平台操作未完成，请检查账号、素材及平台页面后重试"
            sys.stderr.write(f"publisher exception type={type(exc).__name__}\n")
        result = {"status": "submission_unknown" if bridge.submission_possible else "failed", "error_code": code, "message": message, "evidence": None}
        if request["operation"] != "publish": result["auth_status"] = "unknown"
        bridge.emit("result", submission_intent_recorded=bridge.submission_possible, **result)
    finally:
        controls.cancel(); heart.cancel(); transport.close(); bridge.cleanup()
        await asyncio.gather(controls, heart, return_exceptions=True)


def main():
    try:
        request = json.loads(sys.stdin.buffer.readline(1024 * 1024))
        if request.get("operation") == "health":
            sys.stdout = PrivateLog(sys.stderr, [str(ROOT)])
            result = health()
            PROTOCOL_OUT.write(json.dumps(result) + "\n"); PROTOCOL_OUT.flush()
            return 0
        request = prepare(request)
        log = PrivateLog(sys.stderr, [request.get("account_file"), request.get("data_dir"), request.get("video_file"), request.get("cover_file"), str(ROOT)])
        sys.stdout = log
        sys.stderr = log
        asyncio.run(run(request))
    except Exception as exc:
        payload = {"type": "result", "seq": 1, "at": now(), "status": "failed", "error_code": getattr(exc, "code", "INVALID_REQUEST"), "message": getattr(exc, "message", "执行器请求无效或运行环境未配置"), "evidence": None}
        PROTOCOL_OUT.write(json.dumps(payload, ensure_ascii=False) + "\n"); PROTOCOL_OUT.flush()
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
