import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { parseArgs } from 'node:util';
import { setTimeout } from 'node:timers/promises';

const root = fileURLToPath(new URL('../', import.meta.url));
const registry = 'https://registry.npmjs.org/';
const { values } = parseArgs({ options: { apply: { type: 'boolean', default: false }, help: { type: 'boolean' }, resume: { type: 'string' } } });
if (values.help) {
  console.log('pnpm shared:publish [--apply] [--resume <release-directory>]\nBuilds and reviews three public packages. Publishing requires --apply and npm login. Resume preserves submitted packages while npm is processing them.');
  process.exit(0);
}
function run(command, args, capture = false) {
  const result = spawnSync(command, args, { cwd: root, stdio: capture ? 'pipe' : 'inherit', encoding: 'utf8' });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`${command} ${args[0]} failed; publishing stopped.`);
  return result.stdout;
}
function published(name, version) {
  const result = spawnSync('npm', ['view', `${name}@${version}`, 'name', 'version', 'dist.integrity', '--json', `--registry=${registry}`, '--fetch-retries=0', '--fetch-timeout=15000'], { cwd: root, encoding: 'utf8' });
  if (result.error) throw result.error;
  if (result.status === 0) return JSON.parse(result.stdout);
  let error;
  try { error = JSON.parse(result.stdout).error; } catch { /* Never replay credential-bearing diagnostic logs. */ }
  if (error?.code === 'E404') return null;
  throw new Error(`Cannot verify ${name}@${version}; check npm login and registry access.`);
}
async function waitForPublication(name, version) {
  const deadline = Date.now() + 5 * 60 * 1000;
  let announced = false;
  while (true) {
    const result = published(name, version);
    if (result) return result;
    if (Date.now() >= deadline) throw new Error(`npm is still processing ${name}@${version}; verify its public registry entry before resuming.`);
    if (!announced) { console.log(`npm is processing ${name}@${version}; waiting for its public registry entry.`); announced = true; }
    await setTimeout(5000);
  }
}

const release = new Date().toISOString().replaceAll(/[-:.]/g, '');
const output = values.resume ? resolve(values.resume) : join(root, 'outputs/npm-releases', release);
await mkdir(dirname(output), { recursive: true });
if (!values.resume) run('corepack', ['pnpm', 'exec', 'node', 'packages/shared/pack.mjs', '--with-identity', '--out', output]);
const manifest = JSON.parse(await readFile(join(output, 'release-manifest.json'), 'utf8'));
if (manifest.packages.length !== 3 || manifest.packages.some((item) => !/^@herongxhr\/(design-tokens|ui-react|identity-client)$/.test(item.name))) throw new Error('Unexpected public package manifest.');
if (values.apply) console.log(`npm publisher: ${run('npm', ['whoami', `--registry=${registry}`], true).trim()}`);
const statePath = join(output, 'publish-state.json');
let state = { submitted: {} };
try { state = JSON.parse(await readFile(statePath, 'utf8')); } catch (error) { if (error.code !== 'ENOENT') throw error; }
const pending = [];

for (const item of manifest.packages) {
  const archive = join(output, item.filename);
  const bytes = await readFile(archive);
  if (createHash('sha256').update(bytes).digest('hex') !== item.sha256) throw new Error(`Archive changed: ${item.name}`);
  const integrity = `sha512-${createHash('sha512').update(bytes).digest('base64')}`;
  if (values.apply) {
    const previous = published(item.name, item.version);
    if (previous) {
      if (previous['dist.integrity'] !== integrity) throw new Error(`${item.name}@${item.version} already has different contents. Increase its version.`);
      console.log(`Already published and verified: ${item.name}@${item.version}`);
      continue;
    }
    if (state.submitted[item.name] === integrity) {
      console.log(`Already submitted; npm is processing: ${item.name}@${item.version}`);
      pending.push({ ...item, integrity });
      continue;
    }
  }
  run('npm', ['publish', archive, '--access=public', `--registry=${registry}`, '--browser=false', '--ignore-scripts', ...(values.apply ? [] : ['--dry-run'])]);
  if (values.apply) {
    state.submitted[item.name] = integrity;
    await writeFile(statePath, `${JSON.stringify(state, null, 2)}\n`);
    pending.push({ ...item, integrity });
  }
}
for (const item of pending) {
  const result = await waitForPublication(item.name, item.version);
  if (result['dist.integrity'] !== item.integrity) throw new Error(`Registry integrity verification failed: ${item.name}`);
  console.log(`Published and verified: ${item.name}@${item.version}`);
}
console.log(values.apply ? 'All three packages are published with verified registry integrity.' : 'Dry run complete. No package was uploaded. Use --apply to publish.');
