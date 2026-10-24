import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const code = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const base = process.env.PUBLIC_BASE_PATH || '/';
if (!/^\/(?:[a-zA-Z0-9_-]+\/)*$/.test(base)) {
  throw new Error('PUBLIC_BASE_PATH must be / or a slash-delimited path such as /site-preview/');
}
const site = new URL(process.env.PUBLIC_SITE_URL || 'https://herong.info');
if (site.username || site.password || site.search || site.hash || site.pathname !== '/') {
  throw new Error('PUBLIC_SITE_URL must contain only the public origin');
}
const env = {
  ...process.env,
  PUBLIC_SITE_URL: site.origin,
  PUBLIC_BASE_PATH: base,
  PUBLIC_DEPLOY_ENV: process.env.PUBLIC_DEPLOY_ENV || 'production',
  PUBLIC_GUIDES_URL: process.env.PUBLIC_GUIDES_URL || 'https://101.96.210.172/dev/',
  PUBLIC_TOOLS_URL: process.env.PUBLIC_TOOLS_URL || 'https://herong.info/file-tools',
  SITE_URL: site.origin,
  BASE: base,
  OUT_DIR: '.vitepress/dist-legacy',
  ARCHIVE_BUILD: '1',
  ENABLE_PAGE_VIEWS: '0',
};
env.GUIDES_URL = env.PUBLIC_GUIDES_URL;
env.LIGHT_TOOLS_URL = env.PUBLIC_TOOLS_URL;

function run(command, args) {
  const result = spawnSync(command, args, { cwd: code, env, stdio: 'inherit' });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status || 1);
}

run('pnpm', ['--filter', '@herong/site', 'check']);
run('pnpm', ['--filter', '@herong/blog', 'build']);
run('pnpm', ['--filter', '@herong/site', 'build']);
run(process.execPath, ['apps/site/scripts/merge-static.mjs', '--base', base, '--site-url', site.origin]);
run(process.execPath, ['apps/site/scripts/verify-static.mjs', '--dir', 'apps/site/dist-bundle', '--base', base, '--site-url', site.origin]);
