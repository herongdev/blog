"""Local editing operations shared by the desktop app and STDIO MCP. No startup side effects."""
from __future__ import annotations

import copy
import datetime as dt
import fcntl
import hashlib
import json
import math
import os
from pathlib import Path
import re
import subprocess
import threading
import uuid

BASE = Path(__file__).resolve().parent
LESSON = BASE / 'lesson.json'
OUT = BASE / 'output'
VOICE = {'voice': 'zh-CN-YunxiNeural', 'opening_rate': '-3%', 'body_rate': '-5%',
         'pitch': '+0Hz', 'volume': '+0%'}
VISUALS = {
    'plain': '文字画面', 'intro': '聊天窗口', 'mixed': '混合话题', 'worries': '聊天困扰',
    'question': '同一件事', 'search': '搜索任务', 'continue': '继续聊天', 'drift': '理解偏差',
    'check': '核对目标', 'check-goal': '当前目标', 'check-rules': '有效要求',
    'check-next': '下一步', 'check-result': '核对结果', 'correct': '纠正要求',
    'handoff': '交接卡', 'handoff-details': '完整交接卡', 'searchdone': '搜索完成',
    'project': '网站项目', 'project-new': '新建聊天', 'project-question': '旧决定',
    'three': '三条决定', 'extract': '提取结论', 'extract-done': '带入结论',
    'fork': '方案分叉', 'fork-limit': '分叉说明', 'quiz': '练习题',
    'quiz-answer': '练习答案', 'quiz2': '三条决定练习', 'quiz2-answer': '提取结论答案',
    'close': '总结', 'end': '片尾',
}
_mutex = threading.RLock()
_job = None


class ConflictError(RuntimeError):
    pass


def _read(path, fallback=None):
    try:
        return json.loads(path.read_text())
    except (OSError, ValueError):
        return fallback


def _atomic(path, data):
    path.parent.mkdir(parents=True, exist_ok=True)
    tmp = path.with_name(path.name + '.' + uuid.uuid4().hex + '.tmp')
    try:
        tmp.write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n')
        os.replace(tmp, path)
    finally:
        tmp.unlink(missing_ok=True)


def _revision():
    return hashlib.sha256(LESSON.read_bytes()).hexdigest()


def _locked_edit():
    lock = (BASE / '.pipeline.lock').open('a+')
    try:
        fcntl.flock(lock, fcntl.LOCK_EX | fcntl.LOCK_NB)
    except BlockingIOError:
        lock.close()
        raise ConflictError('视频正在生成，请完成后再修改文稿。')
    return lock


def _validate(lesson):
    if not isinstance(lesson, dict) or not isinstance(lesson.get('title'), str):
        raise ValueError('文稿缺少标题。')
    scenes = lesson.get('scenes')
    if not isinstance(scenes, list) or not scenes:
        raise ValueError('请至少保留一个段落。')
    ids = set()
    for scene in scenes:
        sid = scene.get('id')
        if not isinstance(sid, str) or not re.fullmatch(r'[A-Za-z0-9_-]+', sid) or sid in ids:
            raise ValueError('段落标识无效或重复。')
        ids.add(sid)
        rate = '-3%' if sid == 'intro' else '-5%'
        if scene.get('suggested_rate') != rate:
            raise ValueError('开场必须使用 -3%，正文必须使用 -5%。')
        captions, cues = scene.get('captions'), scene.get('cues')
        if not isinstance(captions, list) or not isinstance(cues, list) or len(captions) != len(cues) or not cues:
            raise ValueError('段落字幕和台词不一致。')
        for text, cue in zip(captions, cues):
            if not isinstance(text, str) or not text.strip() or cue.get('text') != text:
                raise ValueError('台词不能为空，且必须与字幕一致。')
            if cue.get('visual_state') not in VISUALS:
                raise ValueError('请选择已有画面模板。')
            pause = cue.get('pause_after_min_seconds', 0)
            if isinstance(pause, bool) or not isinstance(pause, (float, int)) or not math.isfinite(pause) or not 0 <= pause <= 30:
                raise ValueError('停顿请输入 0 到 30 秒之间的数字。')
    if scenes[0]['id'] != 'intro':
        raise ValueError('第一个段落必须是开场。')


def get_project():
    with _mutex:
        raw = LESSON.read_bytes()
        lesson = json.loads(raw)
        return {'revision': hashlib.sha256(raw).hexdigest(), 'lesson': lesson, 'voice': VOICE}


def list_visuals():
    return [{'id': key, 'label': value} for key, value in VISUALS.items()]


def _save(lesson, expected_revision):
    if not isinstance(expected_revision, str) or expected_revision != _revision():
        raise ConflictError('文稿已被其他窗口修改，请重新载入后再保存。')
    _validate(lesson)
    stamp = dt.datetime.now().strftime('%Y%m%d-%H%M%S') + '-' + uuid.uuid4().hex[:6]
    backup = BASE / 'projects' / 'history' / (stamp + '.json')
    backup.parent.mkdir(parents=True, exist_ok=True)
    backup.write_bytes(LESSON.read_bytes())
    _atomic(LESSON, lesson)
    result = get_project()
    result['backup_path'] = str(backup)
    return result


def update_project(edits, expected_revision):
    if not isinstance(edits, list) or not edits:
        raise ValueError('请提供要保存的台词或停顿。')
    with _mutex, _locked_edit():
        lesson = copy.deepcopy(get_project()['lesson'])
        by_id = {s['id']: s for s in lesson['scenes']}
        for edit in edits:
            if not isinstance(edit, dict):
                raise ValueError('修改内容格式不正确。')
            if set(edit) - {'scene_id', 'cue_index', 'text', 'pause_after_min_seconds', 'visual_state'}:
                raise ValueError('修改包含不支持的字段。')
            scene = by_id.get(edit.get('scene_id'))
            index = edit.get('cue_index')
            if scene is None or isinstance(index, bool) or not isinstance(index, int) or not 0 <= index < len(scene['cues']):
                raise ValueError('找不到对应台词。')
            cue = scene['cues'][index]
            for field in ('text', 'pause_after_min_seconds', 'visual_state'):
                if field in edit:
                    cue[field] = edit[field]
            scene['captions'][index] = cue['text']
        return _save(lesson, expected_revision)


def import_text(text, title, expected_revision):
    if not isinstance(text, str) or not text.strip():
        raise ValueError('请先粘贴需要配音的完整文本。')
    if not isinstance(title, str) or not title.strip():
        raise ValueError('请填写视频标题。')
    # Preserve all spoken characters. Blank lines separate paragraphs; sentence punctuation separates editable cues.
    paragraphs = [p.strip() for p in re.split(r'\n\s*\n', text.strip()) if p.strip()]
    scenes = []
    for index, paragraph in enumerate(paragraphs):
        pieces = re.findall(r'.+?(?:[。！？!?；;]+[”’」』]*|\n|$)', paragraph, re.S)
        captions = [part.strip() for part in pieces if part.strip()]
        if not captions:
            captions = [paragraph]
        sid = 'intro' if index == 0 else f'paragraph-{index + 1:03d}'
        scenes.append({'id': sid, 'captions': captions, 'suggested_rate': '-3%' if index == 0 else '-5%',
                       'cues': [{'text': part, 'visual_state': 'plain', 'pause_after_min_seconds': .75} for part in captions]})
    lesson = {'title': title.strip(), 'approved_script_source': '本机文本导入；未经模型改写',
              'scenes': scenes, 'variants': {'full': {'scene_ids': [s['id'] for s in scenes]}}}
    with _mutex, _locked_edit():
        return _save(lesson, expected_revision)


def _job_file():
    return OUT / 'editor-job.json'


def start_generation(mode):
    global _job
    if mode not in ('full', 'render-only'):
        raise ValueError('请选择完整生成或仅更新画面。')
    with _mutex:
        status = get_status()
        if status['running']:
            raise ConflictError('已有生成任务，请等待它完成。')
        _validate(get_project()['lesson'])
        job_id = uuid.uuid4().hex
        OUT.mkdir(exist_ok=True)
        log_path = OUT / ('editor-' + job_id + '.log')
        env = dict(os.environ)
        env['PATH'] = str(BASE / '.bin') + ':/usr/bin:/bin:/usr/sbin:/sbin'
        env['PYTHONUNBUFFERED'] = '1'
        with log_path.open('wb') as log:
            process = subprocess.Popen([str(BASE / '.venv/bin/python'), str(BASE / 'pipeline.py'), mode, '--no-open'],
                                       cwd=BASE, env=env, stdout=log, stderr=subprocess.STDOUT, start_new_session=True)
        _job = {'job_id': job_id, 'status': 'running', 'mode': mode, 'pid': process.pid,
                'started_at': dt.datetime.now().astimezone().isoformat(), 'log_path': str(log_path)}
        _atomic(_job_file(), _job)

        def monitor():
            code = process.wait()
            with _mutex:
                if _job and _job.get('job_id') == job_id:
                    _job['status'] = 'success' if code == 0 else 'failed'
                    _job['exit_code'] = code
                    _job['finished_at'] = dt.datetime.now().astimezone().isoformat()
                    if code:
                        _job['error'] = '生成已停止，请查看日志中的具体原因。'
                    _atomic(_job_file(), _job)
        threading.Thread(target=monitor, daemon=True).start()
        return dict(_job)


def get_status():
    with _mutex:
        job = copy.deepcopy(_job) if _job else _read(_job_file())
        last_run = _read(OUT / 'last-run.json')
        running = False
        with (BASE / '.pipeline.lock').open('a+') as lock:
            try:
                fcntl.flock(lock, fcntl.LOCK_EX | fcntl.LOCK_NB)
            except BlockingIOError:
                running = True
        if job and job.get('status') == 'running' and not running:
            try:
                os.kill(job.get('pid', 0), 0)
                running = True
            except (OSError, ValueError):
                job['status'] = 'success' if last_run and last_run.get('status') == 'success' and last_run.get('pid') == job.get('pid') else 'failed'
        return {'running': running, 'job': job, 'last_run': last_run,
                'output_available': (OUT / 'full-course-original-voice.mp4').is_file(),
                'output_url': '/media/final.mp4'}


def recent_log():
    state = get_status()
    records = [record for record in (state.get('job'), state.get('last_run')) if record]
    def timestamp(record):
        try:
            return dt.datetime.fromisoformat(record.get('started_at', '')).timestamp()
        except (ValueError, TypeError):
            return 0
    newest = max(records, key=timestamp, default={})
    path = newest.get('log_path')
    if not path:
        return {'text': '尚无本次生成日志。'}
    target = Path(path).resolve()
    if not target.is_relative_to(OUT.resolve()) or not target.is_file():
        return {'text': '日志尚未创建。'}
    with target.open('rb') as stream:
        stream.seek(0, 2)
        size = stream.tell()
        stream.seek(max(0, size - 16000))
        return {'text': stream.read().decode('utf-8', errors='replace')}
