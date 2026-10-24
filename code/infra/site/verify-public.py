#!/usr/bin/env python3
"""Verify the real HTTPS edge before or after the DNS cutover (read-only)."""
import argparse
import json
import subprocess
import tempfile
from pathlib import Path
from urllib.parse import quote, urlsplit


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--connect-ip', help='Verify an origin before switching DNS')
    parser.add_argument('--skip-tools', action='store_true')
    parser.add_argument('--report', type=Path)
    args = parser.parse_args()
    origin = 'https://herong.info'
    results = []

    def fetch(route, status=200, text=None, mime=None, location=None):
        with tempfile.TemporaryDirectory(prefix='herong-http-') as temp:
            body, headers = Path(temp) / 'body', Path(temp) / 'headers'
            command = ['curl', '--silent', '--show-error', '--compressed', '--connect-timeout', '10',
                       '--max-time', '60', '--output', str(body), '--dump-header', str(headers),
                       '--write-out', '%{http_code}']
            if args.connect_ip:
                command.extend(['--resolve', f'herong.info:443:{args.connect_ip}'])
            response = subprocess.run(command + [origin + route], check=True, capture_output=True, text=True)
            data = body.read_bytes()
            header = headers.read_text().lower()
            actual = int(response.stdout)
            assert actual == status, f'{route}: {actual} != {status}'
            if text:
                assert text in data.decode('utf-8'), f'{route}: required content missing'
            if mime:
                assert f'content-type: {mime}' in header, f'{route}: wrong MIME'
            if location:
                assert f'location: {location}\n' in header, f'{route}: wrong redirect'
            results.append({'path': route, 'status': actual, 'bytes': len(data)})
            return data

    fetch('/', text='技术落地的', mime='text/html')
    fetch('/__site-health.json', text='"app":"herong-site"', mime='application/json')
    for field in ['ai-agent', 'enterprise', 'finance', 'fullstack', 'video-live']:
        fetch(f'/projects/{field}/', mime='text/html')
    for field, project in [('ai-agent', 'ai-chat'), ('ai-agent', 'minicodex'),
                           ('finance', 'aurumchart'), ('finance', 'trading-system'),
                           ('fullstack', 'shopthrive'), ('enterprise', 'enterprise-platform')]:
        fetch(f'/projects/{field}/{project}/', text=f'https://herong.info/projects/{field}/{project}/')
        fetch(f'/projects/{project}/', status=301)
    for route in ['/posts/ai-agent-coding-career/mini-codex-v2-open-source', '/posts/', '/rss.xml',
                  '/sitemap.xml', '/robots.txt', '/about/', '/products/']:
        fetch(route)
    # A real archived article whose clean URL ends with a source-code extension.
    docs = Path(__file__).resolve().parents[2] / 'apps/blog/docs'
    article = next(iter(sorted((docs / 'posts').rglob('*.js.md'))), None)
    if article:
        fetch('/' + quote(article.relative_to(docs).as_posix()[:-3], safe='/'), mime='text/html')
    for route in ['/missing-migration-verification-page', '/_astro/missing-migration.js', '/404']:
        fetch(route, status=404)
    info = json.loads(fetch('/projects/enterprise/sampling-station/api/system/info'))
    assert info['code'] == 'OK' and info['data']['dataMode'] == 'local-demo'
    stations = json.loads(fetch('/projects/enterprise/sampling-station/api/stations'))
    station_id = quote(stations['data'][0]['id'], safe='')
    snapshot = json.loads(fetch(f'/projects/enterprise/sampling-station/api/v1/sampling/stations/{station_id}/snapshot'))
    assert snapshot['code'] == 'OK'
    event_url = origin + f'/projects/enterprise/sampling-station/api/v1/sampling/stations/{station_id}/events'
    command = ['curl', '--silent', '--show-error', '--no-buffer', '--max-time', '12']
    if args.connect_ip:
        command.extend(['--resolve', f'herong.info:443:{args.connect_ip}'])
    stream = subprocess.run(command + [event_url], capture_output=True, text=True)
    assert stream.returncode in (0, 28) and 'event:snapshot' in stream.stdout.replace('event: ', 'event:'), 'SSE snapshots missing'
    results.append({'path': urlsplit(event_url).path, 'snapshotEvents': stream.stdout.count('event:')})
    if not args.skip_tools:
        health = json.loads(fetch('/file-tools/api/health'))
        assert health.get('ok') is True
        fetch('/file-tools', status=307, location='/file-tools/tools')
        fetch('/file-tools/', status=308, location='/file-tools')
        fetch('/file-tools/tools', mime='text/html')
    report = {'origin': origin, 'connectIP': args.connect_ip, 'checks': len(results), 'results': results}
    if args.report:
        args.report.parent.mkdir(parents=True, exist_ok=True)
        args.report.write_text(json.dumps(report, ensure_ascii=False, indent=2) + '\n')
    print(json.dumps({'checks': len(results), 'allPassed': True, 'connectIP': args.connect_ip}))


if __name__ == '__main__':
    main()
