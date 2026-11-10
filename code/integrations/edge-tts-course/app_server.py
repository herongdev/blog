#!/usr/bin/env python3
"""Loopback-only desktop editor; uses the already verified project environment."""
from __future__ import annotations
import argparse
import io
import json
import mimetypes
import os
from pathlib import Path
import re
import signal
import subprocess
import threading
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import parse_qs, urlparse, unquote

import course_service as service

BASE = service.BASE
WEB = BASE / 'app/web'
_preview_lock = threading.Lock()
_renderer = None


def preview_image(state, text):
    global _renderer
    if state not in service.VISUALS:
        raise ValueError('画面模板不存在。')
    with _preview_lock:
        if _renderer is None:
            import importlib.util
            spec = importlib.util.spec_from_file_location('editor_visuals', BASE / 'source/render_v2.py')
            _renderer = importlib.util.module_from_spec(spec)
            spec.loader.exec_module(_renderer)
            font = '/System/Library/Fonts/STHeiti Light.ttc'
            _renderer.FONT = _renderer.BOLD = font
            _renderer.f.cache_clear()
        frame = _renderer.draw_frame(state, text)
        buffer = io.BytesIO()
        frame.save(buffer, format='PNG')
        return buffer.getvalue()


class Handler(BaseHTTPRequestHandler):
    server_version = 'LocalCourseEditor/1.0'

    def log_message(self, fmt, *args):
        # Request URLs may contain a user's draft text; leave content out of access logs.
        pass

    def send_bytes(self, data, content_type='application/json; charset=utf-8', status=200, headers=None):
        self.send_response(status)
        self.send_header('Content-Type', content_type)
        self.send_header('Content-Length', str(len(data)))
        self.send_header('Cache-Control', 'no-store')
        self.send_header('X-Content-Type-Options', 'nosniff')
        self.send_header('Cross-Origin-Resource-Policy', 'same-origin')
        for key, value in (headers or {}).items():
            self.send_header(key, value)
        self.end_headers()
        if self.command != 'HEAD':
            self.wfile.write(data)

    def json(self, value, status=200):
        self.send_bytes(json.dumps(value, ensure_ascii=False).encode(), status=status)

    def allowed_host(self):
        return self.headers.get('Host') == f'127.0.0.1:{self.server.server_port}'

    def guard(self, write=False):
        if not self.allowed_host():
            self.json({'error': '仅接受本机编辑器请求。'}, 403)
            return False
        site = self.headers.get('Sec-Fetch-Site', '')
        origin = self.headers.get('Origin')
        if site == 'cross-site' or (origin and origin != f'http://127.0.0.1:{self.server.server_port}'):
            self.json({'error': '请在本机编辑器中操作。'}, 403)
            return False
        if write and self.headers.get('Content-Type', '').split(';')[0].strip() != 'application/json':
            self.json({'error': '请求需要 JSON 内容。'}, 415)
            return False
        return True

    def media(self, path):
        size = path.stat().st_size
        start, end = 0, size - 1
        header = self.headers.get('Range')
        status = 200
        if header:
            match = re.fullmatch(r'bytes=(\d*)-(\d*)', header)
            if not match or not any(match.groups()):
                self.send_bytes(b'', status=416, headers={'Content-Range': f'bytes */{size}'})
                return
            a, b = match.groups()
            if a:
                start = int(a)
                end = min(int(b), size - 1) if b else size - 1
            else:
                start = max(0, size - int(b))
            if start >= size or end < start:
                self.send_bytes(b'', status=416, headers={'Content-Range': f'bytes */{size}'})
                return
            status = 206
        self.send_response(status)
        self.send_header('Content-Type', 'video/mp4')
        self.send_header('Content-Length', str(end - start + 1))
        self.send_header('Accept-Ranges', 'bytes')
        self.send_header('Cache-Control', 'no-store')
        if status == 206:
            self.send_header('Content-Range', f'bytes {start}-{end}/{size}')
        self.end_headers()
        if self.command == 'HEAD':
            return
        with path.open('rb') as stream:
            stream.seek(start)
            remaining = end - start + 1
            while remaining:
                block = stream.read(min(remaining, 128 * 1024))
                if not block:
                    break
                self.wfile.write(block)
                remaining -= len(block)

    def do_HEAD(self):
        self.do_GET()

    def do_GET(self):
        if not self.guard():
            return
        parsed = urlparse(self.path)
        path = unquote(parsed.path)
        try:
            if path == '/api/health':
                self.json({'ok': True, 'project': str(BASE), 'pid': os.getpid()})
            elif path == '/api/project':
                self.json(service.get_project())
            elif path == '/api/status':
                self.json(service.get_status())
            elif path == '/api/visuals':
                self.json(service.list_visuals())
            elif path == '/api/preferences':
                self.json(service._read(BASE / 'output/editor-preferences.json', {'theme': 'system'}))
            elif path == '/api/log':
                self.json(service.recent_log())
            elif path == '/api/preview':
                query = parse_qs(parsed.query)
                self.send_bytes(preview_image(query.get('state', ['plain'])[0], query.get('text', [''])[0]), 'image/png')
            elif path == '/media/final.mp4':
                final = BASE / 'output/full-course-original-voice.mp4'
                if not final.is_file():
                    self.json({'error': '尚无已生成的视频。'}, 404)
                else:
                    self.media(final)
            else:
                files = {'/': WEB / 'index.html', '/app.js': WEB / 'app.js', '/style.css': WEB / 'style.css',
                         '/tokens.css': WEB / 'tokens.css', '/assets/hr-elephant.png': BASE / 'assets/hr-elephant.png',
                         '/操作说明.html': BASE / '操作说明.html', '/docs/editor-guide.png': BASE / 'docs/editor-guide.png'}
                target = files.get(path)
                if target is None or not target.is_file():
                    self.json({'error': '页面不存在。'}, 404)
                else:
                    self.send_bytes(target.read_bytes(), mimetypes.guess_type(target.name)[0] or 'application/octet-stream')
        except (BrokenPipeError, ConnectionResetError):
            pass
        except Exception as exc:
            self.json({'error': str(exc)}, 500)

    def do_POST(self):
        if not self.guard(write=True):
            return
        try:
            size = int(self.headers.get('Content-Length', '0'))
            if size < 0 or size > 2_000_000:
                raise ValueError('文本过长，请分成几次导入。')
            body = json.loads(self.rfile.read(size))
            if not isinstance(body, dict):
                raise ValueError('请求内容不正确。')
            path = urlparse(self.path).path
            if path == '/api/project':
                result = service.update_project(body.get('edits'), body.get('revision'))
            elif path == '/api/preferences':
                if body.get('theme') not in ('system', 'light', 'dark'):
                    raise ValueError('外观设置不正确。')
                result = {'theme': body['theme']}
                service._atomic(BASE / 'output/editor-preferences.json', result)
            elif path == '/api/import':
                result = service.import_text(body.get('text'), body.get('title'), body.get('revision'))
            elif path == '/api/generate':
                result = service.start_generation(body.get('mode'))
            elif path == '/api/open-output':
                final = BASE / 'output/full-course-original-voice.mp4'
                if not final.is_file():
                    raise ValueError('请先成功生成视频。')
                subprocess.run(['/usr/bin/open', str(final)], check=True)
                result = {'ok': True}
            elif path == '/api/open-folder':
                subprocess.run(['/usr/bin/open', str(BASE / 'output')], check=True)
                result = {'ok': True}
            else:
                self.json({'error': '操作不存在。'}, 404)
                return
            self.json(result)
        except service.ConflictError as exc:
            self.json({'error': str(exc)}, 409)
        except (ValueError, TypeError, KeyError) as exc:
            self.json({'error': str(exc)}, 400)
        except Exception as exc:
            self.json({'error': str(exc)}, 500)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--port', type=int, default=0)
    parser.add_argument('--write-session', type=Path)
    args = parser.parse_args()
    server = ThreadingHTTPServer(('127.0.0.1', args.port), Handler)
    if args.write_session:
        service._atomic(args.write_session, {'url': f'http://127.0.0.1:{server.server_port}/', 'pid': os.getpid()})
    signal.signal(signal.SIGTERM, lambda *_: threading.Thread(target=server.shutdown, daemon=True).start())
    try:
        server.serve_forever()
    finally:
        server.server_close()


if __name__ == '__main__':
    main()
