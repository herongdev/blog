#!/usr/bin/env python3
"""Generate with the already verified local runtime; never install or select Python."""
from __future__ import annotations
import argparse
from contextlib import contextmanager
from datetime import datetime
import fcntl
import hashlib
from importlib import metadata
import json
import math
import os
from pathlib import Path
import platform
import re
import shutil
import signal
import subprocess
import sys
import uuid

BASE = Path(__file__).resolve().parent
OUT = BASE / 'output'
LOCK_FILE = BASE / '.pipeline.lock'
FINAL_NAME = 'full-course-original-voice.mp4'


def now():
    return datetime.now().astimezone().isoformat(timespec='seconds')


def process_ancestry():
    """Record process names only, so Terminal launches can be distinguished without environment secrets."""
    result = []
    pid = os.getpid()
    for _ in range(10):
        line = subprocess.check_output(['/bin/ps', '-p', str(pid), '-o', 'pid=,ppid=,comm='], text=True).strip()
        if not line:
            break
        parts = line.split(None, 2)
        result.append({'pid': int(parts[0]), 'ppid': int(parts[1]), 'command': parts[2]})
        pid = int(parts[1])
        if pid <= 0:
            break
    return result


def sha(path):
    return hashlib.sha256(Path(path).read_bytes()).hexdigest()


def atomic_json(path, value):
    path = Path(path)
    path.parent.mkdir(parents=True, exist_ok=True)
    temporary = path.with_name(path.name + '.' + uuid.uuid4().hex + '.tmp')
    temporary.write_text(json.dumps(value, ensure_ascii=False, indent=2) + '\n')
    temporary.replace(path)


@contextmanager
def project_lock(blocking=False):
    """The editor also takes this lock while changing lesson.json."""
    with LOCK_FILE.open('a+') as handle:
        try:
            fcntl.flock(handle, fcntl.LOCK_EX | (0 if blocking else fcntl.LOCK_NB))
        except BlockingIOError as exc:
            raise RuntimeError('已有生成任务正在运行，请等待完成后再试。') from exc
        try:
            yield
        finally:
            fcntl.flock(handle, fcntl.LOCK_UN)


def validate_runtime():
    lock = json.loads((BASE / 'runtime-lock.json').read_text())
    expected_python = BASE / lock['python']['entrypoint']
    if Path(sys.executable).absolute() != expected_python.absolute():
        raise RuntimeError(f'必须使用工程已验证的 Python：{expected_python}。不会改用全局 Python 或安装依赖。')
    if (platform.python_version() != lock['python']['version']
            or Path(sys._base_executable).resolve() != Path(lock['python']['base_executable'])
            or sha(sys._base_executable) != lock['python']['sha256']
            or platform.machine() != lock['python']['architecture']):
        raise RuntimeError('Python 运行环境与已验证记录不符，已停止；不会自动安装或升级。')
    for name, expected in lock['distributions'].items():
        try:
            actual = metadata.version(name)
        except metadata.PackageNotFoundError as exc:
            raise RuntimeError(f'缺少已验证依赖 {name}=={expected}，已停止；不会自动安装。') from exc
        if actual != expected:
            raise RuntimeError(f'依赖已变化：{name} 当前 {actual}，需要 {expected}。已停止，不会自动升级。')
    for name in ('ffmpeg', 'ffprobe', 'font'):
        entry = lock[name]
        path = Path(entry['path'])
        if not path.is_file() or sha(path) != entry['sha256']:
            raise RuntimeError(f'已验证的 {name} 不存在或已变化：{path}。已停止，不会自动替换。')
        if name != 'font':
            first_line = subprocess.check_output([str(path), '-version'], text=True).splitlines()[0]
            if first_line != entry['version_line']:
                raise RuntimeError(f'{name} 版本与已验证记录不符。')
    bindir = BASE / '.bin'
    bindir.mkdir(exist_ok=True)
    for name in ('ffmpeg', 'ffprobe'):
        link = bindir / name
        target = Path(lock[name]['path'])
        if link.is_symlink():
            if link.resolve() != target:
                link.unlink()
                link.symlink_to(target)
        elif link.exists():
            if sha(link) != lock[name]['sha256']:
                raise RuntimeError(f'{link} 与固定环境不一致，已停止。')
        else:
            link.symlink_to(target)
    return lock


def validate_lesson(lesson):
    scenes = lesson.get('scenes')
    if not isinstance(scenes, list) or not scenes:
        raise RuntimeError('文稿至少需要一个场景。')
    ids = []
    for scene in scenes:
        sid = scene.get('id', '')
        if not re.fullmatch(r'[A-Za-z0-9_-]{1,80}', sid) or sid in ids:
            raise RuntimeError('场景标识为空、重复或含无效字符。')
        ids.append(sid)
        rate = '-3%' if sid == 'intro' else '-5%'
        if scene.get('suggested_rate', '-5%') != rate:
            raise RuntimeError(f'{sid} 必须保持云希固定语速 {rate}。')
        captions, cues = scene.get('captions'), scene.get('cues')
        if not isinstance(captions, list) or not captions or not isinstance(cues, list) or len(captions) != len(cues):
            raise RuntimeError(f'{sid} 台词与画面提示数量不一致。')
        for text, cue in zip(captions, cues):
            if not isinstance(text, str) or not text.strip() or cue.get('text') != text:
                raise RuntimeError(f'{sid} 含空台词或台词与字幕不一致。')
            pause = cue.get('pause_after_min_seconds', 0)
            if isinstance(pause, bool) or not isinstance(pause, (int, float)) or not math.isfinite(pause) or not 0 <= pause <= 30:
                raise RuntimeError(f'{sid} 停顿必须是 0 到 30 秒之间的数值。')
            if not isinstance(cue.get('visual_state'), str):
                raise RuntimeError(f'{sid} 缺少画面状态。')
    if lesson.get('variants', {}).get('full', {}).get('scene_ids') != ids:
        raise RuntimeError('完整视频的场景顺序与文稿不一致。')


def child_environment(lock, snapshot, stage):
    env = os.environ.copy()
    for key in ('PYTHONHOME', 'PYTHONPATH'):
        env.pop(key, None)
    env.update(PATH=str(BASE / '.bin') + ':/usr/bin:/bin:/usr/sbin:/sbin',
               PYTHONNOUSERSITE='1', PYTHONUNBUFFERED='1', COURSE_FONT=lock['font']['path'],
               COURSE_LESSON_FILE=str(snapshot), COURSE_OUTPUT_DIR=str(stage), COURSE_NO_OPEN='1')
    return env


def run_child(arguments, env, log):
    log.write('\n$ ' + ' '.join(map(str, arguments)) + '\n'); log.flush()
    process = subprocess.Popen(list(map(str, arguments)), cwd=BASE, env=env,
                               stdout=log, stderr=subprocess.STDOUT, start_new_session=True)
    try:
        code = process.wait(timeout=1800)
        if code:
            raise RuntimeError(f'{Path(arguments[1]).name} 执行失败（退出码 {code}），请查看本次日志。')
    except BaseException:
        if process.poll() is None:
            os.killpg(process.pid, signal.SIGTERM)
            try:
                process.wait(timeout=8)
            except subprocess.TimeoutExpired:
                os.killpg(process.pid, signal.SIGKILL)
                process.wait()
        raise


def archive_previous(run_id):
    names = (FINAL_NAME, 'subtitles.srt', 'actual-timing.json', 'verification.json',
             'delivery-validation.json', 'narration.wav', 'last-success.json')
    history = OUT / 'history' / run_id
    history.mkdir(parents=True, exist_ok=True)
    for name in names:
        source = OUT / name
        if source.is_file():
            destination = history / name
            try:
                os.link(source, destination)
            except OSError:
                shutil.copy2(source, destination)
    return history


def publish(stage, run_id):
    archive_previous(run_id)
    # Prepare every replacement before publishing. The MP4 is the final commit.
    names = ('subtitles.srt', 'actual-timing.json', 'verification.json',
             'delivery-validation.json', 'narration.wav', FINAL_NAME)
    replacements = []
    for name in names:
        temporary = OUT / ('.' + name + '.' + run_id + '.tmp')
        shutil.copy2(stage / name, temporary)
        replacements.append((temporary, OUT / name))
    for temporary, target in replacements:
        temporary.replace(target)


def execute(mode, no_open=False):
    OUT.mkdir(exist_ok=True)
    run_id = datetime.now().strftime('%Y%m%d-%H%M%S') + '-' + uuid.uuid4().hex[:8]
    folder = OUT / 'runs' / run_id
    folder.mkdir(parents=True)
    stage = folder / 'render'
    stage.mkdir()
    record = {'run_id': run_id, 'mode': mode, 'status': 'running', 'phase': 'preflight',
              'pid': os.getpid(), 'started_at': now(), 'finished_at': None,
              'log_path': str(folder / 'run.log'), 'output_path': None, 'error': None,
              'process_ancestry': process_ancestry()}
    acquired = False

    def update(**fields):
        record.update(fields)
        atomic_json(folder / 'run.json', record)
        if acquired:
            atomic_json(OUT / 'last-run.json', record)

    with (folder / 'run.log').open('w', buffering=1) as log:
        print('本次日志：' + str(folder / 'run.log'), flush=True)
        try:
            with project_lock():
                acquired = True
                update()
                lock = validate_runtime()
                lesson_bytes = (BASE / 'lesson.json').read_bytes()
                lesson = json.loads(lesson_bytes)
                validate_lesson(lesson)
                snapshot = folder / 'lesson.json'
                snapshot.write_bytes(lesson_bytes)
                record['lesson_sha256'] = hashlib.sha256(lesson_bytes).hexdigest()
                record['runtime_lock_sha256'] = sha(BASE / 'runtime-lock.json')
                env = child_environment(lock, snapshot, stage)
                update(phase='generating')
                print('正在生成视频；原始配音缓存保持保留。' if mode == 'full'
                      else '正在复用原声更新画面和停顿；不会请求配音服务。', flush=True)
                args = [sys.executable, BASE / 'run.py']
                if mode == 'render-only': args.append('--render-only')
                run_child(args, env, log)
                scene_records = [json.loads((BASE / 'narration' / (scene['id'] + '.metadata.json')).read_text())
                                 for scene in lesson['scenes']]
                record.update(scene_count=len(scene_records),
                              caption_count=sum(len(scene['captions']) for scene in lesson['scenes']),
                              tts_requests=sum(bool(scene.get('tts_requested')) for scene in scene_records),
                              cached_scenes=sum(bool(scene.get('raw_cache_reused')) for scene in scene_records))
                update(phase='validating')
                run_child([sys.executable, BASE / 'verify_delivery.py'], env, log)
                final = stage / FINAL_NAME
                validation = json.loads((stage / 'delivery-validation.json').read_text())
                if not final.is_file() or final.stat().st_size == 0 or validation.get('status') != 'passed':
                    raise RuntimeError('本次视频或核验结果缺失，未发布。')
                if (BASE / 'lesson.json').read_bytes() != lesson_bytes:
                    raise RuntimeError('生成期间文稿已发生变化，本次结果未发布；请重新生成。')
                candidate_sha = sha(final)
                update(phase='publishing')
                publish(stage, run_id)
                update(status='success', phase='complete', finished_at=now(),
                       output_path=str(OUT / FINAL_NAME), output_sha256=candidate_sha,
                       duration_seconds=validation['duration_seconds'],
                       audio_seconds=validation['pcm_seconds'], validation_path=str(stage / 'delivery-validation.json'))
                atomic_json(OUT / 'last-success.json', record)
                log.write('\n本次已重新生成、完整解码并独立核验，发布成功。\n')
                print('生成成功：' + str(OUT / FINAL_NAME), flush=True)
                if not no_open:
                    opened = subprocess.run(['/usr/bin/open', str(OUT / FINAL_NAME)], capture_output=True, text=True)
                    log.write(f'macOS open exit={opened.returncode}\n')
                    if opened.returncode:
                        print('成片已保存；系统未能自动打开，请双击成片播放。', flush=True)
                print(json.dumps(record, ensure_ascii=False), flush=True)
                return 0
        except BaseException as exc:
            message = '已取消生成。' if isinstance(exc, KeyboardInterrupt) else str(exc)
            log.write('\nFAILED: ' + message + '\n')
            record.update(status='failed', phase='failed', finished_at=now(), error=message, output_path=None)
            atomic_json(folder / 'run.json', record)
            if acquired:
                # The exception may have released our lock. Never replace a newer run's state.
                with project_lock(blocking=True):
                    try:
                        current = json.loads((OUT / 'last-run.json').read_text())
                    except (OSError, ValueError):
                        current = {}
                    if current.get('run_id') == run_id:
                        atomic_json(OUT / 'last-run.json', record)
            print('生成已停止：' + message + '\n本次没有发布新成片，旧成片保持保留。\n日志：' + record['log_path'], file=sys.stderr, flush=True)
            print(json.dumps(record, ensure_ascii=False), flush=True)
            return 130 if isinstance(exc, KeyboardInterrupt) else 1


def main():
    parser = argparse.ArgumentParser(description='复用已验证环境生成云希视频，不安装、不升级。')
    parser.add_argument('mode', choices=('full', 'render-only'))
    parser.add_argument('--no-open', action='store_true')
    args = parser.parse_args()
    def interrupted(signum, frame):
        raise KeyboardInterrupt()
    signal.signal(signal.SIGTERM, interrupted)
    signal.signal(signal.SIGINT, interrupted)
    return execute(args.mode, args.no_open)


if __name__ == '__main__':
    raise SystemExit(main())
