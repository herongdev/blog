import assert from 'node:assert/strict';
import { createServer as createHttpServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { createServer } from 'vite';
import ts from 'typescript';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

const root = fileURLToPath(new URL('../', import.meta.url));
const prefix = '/projects/enterprise/sampling-station/';
const originalFetch = globalThis.fetch;
const source = await readFile(new URL('../src/lib/api-client.ts', import.meta.url), 'utf8');
const js = ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext } }).outputText;
const { createApiClient, ApiError } = await import(`data:text/javascript;base64,${Buffer.from(js).toString('base64')}`);
const requests = [];
try {
  globalThis.fetch = async (url, options) => {
    requests.push({ url, method: options.method || 'GET' });
    return new Response(JSON.stringify({ code: 'OK', data: [] }), { headers: { 'Content-Type': 'application/json' } });
  };
  const api = createApiClient(`${prefix}api/`);
  await api.listStations();
  await api.getSystemInfo();
  await api.getSamplingSnapshot('station /中');
  await api.startSamplingScenario('station /中', 'NORMAL');
  await api.resetSamplingScenario('station /中');
  assert.deepEqual(requests, [
    { url: `${prefix}api/stations`, method: 'GET' },
    { url: `${prefix}api/system/info`, method: 'GET' },
    { url: `${prefix}api/v1/sampling/stations/station%20%2F%E4%B8%AD/snapshot`, method: 'GET' },
    { url: `${prefix}api/v1/simulation/stations/station%20%2F%E4%B8%AD/scenarios/NORMAL/start`, method: 'POST' },
    { url: `${prefix}api/v1/simulation/stations/station%20%2F%E4%B8%AD/reset`, method: 'POST' },
  ]);
  assert.equal(api.samplingEventsUrl('station /中'), `${prefix}api/v1/sampling/stations/station%20%2F%E4%B8%AD/events`);
  globalThis.fetch = async () => new Response('<html>wrong service</html>', { headers: { 'Content-Type': 'text/html' } });
  await assert.rejects(api.listStations(), error => error instanceof ApiError && error.code === 'INVALID_RESPONSE');
} finally {
  globalThis.fetch = originalFetch;
}

// Exercise the real Vite proxy against a loopback fixture, never a live API.
const upstreamPaths = [];
const upstream = createHttpServer((request, response) => {
  upstreamPaths.push(request.url);
  response.setHeader('Content-Type', request.url.endsWith('/events') ? 'text/event-stream' : 'application/json');
  response.end(request.url.endsWith('/events') ? 'event: snapshot\ndata: {}\n\n' : JSON.stringify({ code: 'OK', data: { dataMode: 'local-demo' } }));
});
await new Promise(resolve => upstream.listen(0, '127.0.0.1', resolve));
const names = ['API_PROXY_TARGET', 'VITE_BASE_PATH', 'VITE_API_BASE_URL'];
const previous = Object.fromEntries(names.map(name => [name, process.env[name]]));
let vite;
try {
  process.env.API_PROXY_TARGET = `http://127.0.0.1:${upstream.address().port}`;
  process.env.VITE_BASE_PATH = '';
  process.env.VITE_API_BASE_URL = '';
  vite = await createServer({ root, configFile: `${root}vite.config.ts`, server: { host: '127.0.0.1', port: 0, strictPort: false, hmr: false } });
  await vite.listen();
  assert.equal(vite.config.base, prefix);
  const origin = `http://127.0.0.1:${vite.httpServer.address().port}`;
  const info = await fetch(`${origin}${prefix}api/system/info`);
  assert.equal(info.status, 200);
  assert.equal((await info.json()).data.dataMode, 'local-demo');
  const stream = await fetch(`${origin}${prefix}api/v1/sampling/stations/demo-station/events`);
  assert.match(stream.headers.get('content-type'), /text\/event-stream/);
  assert.match(await stream.text(), /event: snapshot/);
  assert.deepEqual(upstreamPaths, ['/api/system/info', '/api/v1/sampling/stations/demo-station/events']);
  const { OperationsRail } = await vite.ssrLoadModule('/src/components/OperationsRail.tsx');
  const waiting = renderToStaticMarkup(createElement(OperationsRail));
  assert.match(waiting, /等待告警数据/);
  assert.doesNotMatch(waiting, /系统运行正常|XXXXXX|12:34|实际\/方案/);
  const snapshot = { source: { simulated: true }, task: { completedPoints: 0 }, activeAlarms: [], recentRecords: [], realtimeValues: [] };
  const empty = renderToStaticMarkup(createElement(OperationsRail, { snapshot }));
  assert.match(empty, /暂无活动告警/);
  assert.doesNotMatch(empty, /XXXXXX|12:34|轴分反馈/);
  snapshot.activeAlarms.push({ id: 'fixture-alarm', occurredAt: '2026-11-04T00:00:00Z', message: '接口给出的测试告警' });
  assert.match(renderToStaticMarkup(createElement(OperationsRail, { snapshot })), /接口给出的测试告警/);
} finally {
  await vite?.close();
  await new Promise(resolve => upstream.close(resolve));
  for (const name of names) {
    if (previous[name] === undefined) delete process.env[name];
    else process.env[name] = previous[name];
  }
}
console.log('Sampling checks passed: API prefixes, encoded IDs, HTML rejection, Vite JSON/SSE proxy and honest missing/empty/alarm states (SSR).');
