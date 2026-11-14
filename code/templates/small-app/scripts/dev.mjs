import { spawn } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const repository = fileURLToPath(new URL('../', import.meta.url));
let child;
let interrupted = false;
let interruptCode = 0;
for (const signal of ['SIGINT', 'SIGTERM']) {
  process.once(signal, () => {
    interrupted = true;
    interruptCode = signal === 'SIGINT' ? 130 : 143;
    child?.kill(signal);
  });
}

function run(command, args, options = {}) {
  return new Promise((resolveRun, rejectRun) => {
    child = spawn(command, args, { cwd: repository, stdio: 'inherit', ...options });
    child.once('error', rejectRun);
    child.once('exit', (code, signal) => {
      child = undefined;
      resolveRun(code ?? (signal === 'SIGINT' ? 130 : 1));
    });
  });
}

async function main() {
  const product = JSON.parse(await readFile(new URL('../packages/config/product.json', import.meta.url), 'utf8'));
  const port = String(process.env.APP_PORT || product.dev.port);
  if (!/^\d{1,5}$/.test(port) || Number(port) < 1 || Number(port) > 65535) throw new Error('Invalid preview port.');
  const buildCode = await run(process.platform === 'win32' ? 'corepack.cmd' : 'corepack', ['pnpm', 'run', 'build'], { shell: process.platform === 'win32' });
  if (buildCode !== 0 || interrupted) { process.exitCode = interruptCode || buildCode; return; }
  process.exitCode = await run(process.execPath, ['--env-file-if-exists=.env', 'services/api/src/server.mjs'], {
    env: { ...process.env, APP_PORT: port, APP_ORIGIN: `http://127.0.0.1:${port}`, APP_ALLOW_HTTP: '1' },
  });
  if (interrupted) process.exitCode = interruptCode;
}

main().catch(() => { console.error('预览未能启动，请检查依赖和构建配置。'); process.exitCode = 1; });
