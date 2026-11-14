import { randomUUID } from 'node:crypto';
import { lstat, mkdir, readFile, readdir, rename, rm, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';
import { parseArgs } from 'node:util';

const root = fileURLToPath(new URL('../', import.meta.url));
const registry = 'https://registry.npmjs.org/';
const packageNames = ['@herongxhr/design-tokens', '@herongxhr/ui-react', '@herongxhr/identity-client'];
const plainObject = (value) => value !== null && typeof value === 'object' && !Array.isArray(value);
const serialize = (value) => `${JSON.stringify(value, null, 2)}\n`;

async function existingBytes(path) {
  try { return await readFile(path); }
  catch (error) { if (error.code === 'ENOENT') return null; throw error; }
}

async function regularJson(path) {
  const info = await lstat(path);
  if (!info.isFile() || info.isSymbolicLink() || info.size > 1024 * 1024) throw new Error(`Invalid package configuration: ${path}`);
  const bytes = await readFile(path);
  const data = JSON.parse(bytes.toString('utf8'));
  if (!plainObject(data)) throw new Error(`Invalid JSON configuration: ${path}`);
  return { path, bytes, data };
}

function stableVersion(value) {
  return typeof value === 'string' && value.length <= 64 && /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/.test(value);
}

async function packageMetadata(name, version) {
  const url = new URL(`${encodeURIComponent(name)}/${encodeURIComponent(version)}`, registry);
  const response = await fetch(url, { headers: { Accept: 'application/json' }, redirect: 'error', signal: AbortSignal.timeout(10_000) });
  if (!response.ok || !response.body) throw new Error(`npm does not provide ${name}@${version} (HTTP ${response.status}). No project files were changed.`);
  if (Number(response.headers.get('content-length')) > 1024 * 1024) throw new Error(`npm returned oversized metadata for ${name}.`);
  const reader = response.body.getReader();
  const chunks = [];
  let size = 0;
  try {
    while (true) {
      const part = await reader.read();
      if (part.done) break;
      size += part.value.length;
      if (size > 1024 * 1024) throw new Error(`npm returned oversized metadata for ${name}.`);
      chunks.push(Buffer.from(part.value));
    }
  } finally { await reader.cancel().catch(() => {}); }
  const metadata = JSON.parse(Buffer.concat(chunks).toString('utf8'));
  if (!plainObject(metadata) || metadata.name !== name || metadata.version !== version || !plainObject(metadata.dist)
      || typeof metadata.dist.integrity !== 'string' || !/^sha512-[A-Za-z0-9+/]+={0,2}$/.test(metadata.dist.integrity)
      || typeof metadata.dist.tarball !== 'string') throw new Error(`npm metadata identity or integrity is invalid for ${name}@${version}.`);
  const tarball = new URL(metadata.dist.tarball);
  if (tarball.origin !== new URL(registry).origin || tarball.username || tarball.password || tarball.search || tarball.hash) {
    throw new Error(`npm supplied an unexpected archive origin for ${name}@${version}.`);
  }
  return metadata;
}

async function workspaceManifests() {
  const found = [];
  for (const category of ['apps', 'packages', 'services']) {
    const directory = join(root, category);
    const entries = await readdir(directory, { withFileTypes: true }).catch((error) => {
      if (error.code === 'ENOENT') return [];
      throw error;
    });
    for (const entry of entries.sort((left, right) => left.name.localeCompare(right.name))) {
      if (entry.isSymbolicLink()) throw new Error(`Workspace directories must not be symbolic links: ${entry.name}`);
      if (!entry.isDirectory()) continue;
      const path = join(directory, entry.name, 'package.json');
      if (await existingBytes(path)) found.push(await regularJson(path));
    }
  }
  return found;
}

async function atomicWrite(path, bytes) {
  const temporary = join(dirname(path), `.${randomUUID()}.tmp`);
  try { await writeFile(temporary, bytes, { flag: 'wx' }); await rename(temporary, path); }
  finally { await rm(temporary, { force: true }); }
}

async function install() {
  const windows = process.platform === 'win32';
  const child = spawn(windows ? 'corepack.cmd' : 'corepack', ['pnpm', 'install', '--ignore-scripts', '--no-frozen-lockfile', '--registry', registry], {
    cwd: root, stdio: 'inherit', shell: windows,
  });
  const forward = (signal) => child.kill(signal);
  process.once('SIGINT', forward);
  process.once('SIGTERM', forward);
  try {
    await new Promise((resolveInstall, rejectInstall) => {
      child.once('error', rejectInstall);
      child.once('exit', (code, signal) => code === 0 ? resolveInstall() : rejectInstall(new Error(`pnpm install did not finish (${signal || code}).`)));
    });
  } finally { process.removeListener('SIGINT', forward); process.removeListener('SIGTERM', forward); }
}

async function main() {
  const { values } = parseArgs({ options: { help: { type: 'boolean' } }, allowPositionals: false, strict: true });
  if (values.help) {
    console.log('Usage: pnpm ui:update\nEdit package.json → herong.sharedPackages to select the three exact stable npm versions.\nThis command verifies their public registry metadata, updates workspace dependencies and installs with lifecycle scripts disabled. It never selects latest or upgrades across versions automatically.');
    return;
  }
  const project = await regularJson(join(root, 'package.json'));
  const versions = project.data.herong?.sharedPackages;
  if (!plainObject(versions) || Object.keys(versions).length !== packageNames.length
      || packageNames.some((name) => !stableVersion(versions[name]))) {
    throw new Error('package.json → herong.sharedPackages must contain the three exact stable npm versions.');
  }
  const lockDirectory = join(root, '.local');
  await mkdir(lockDirectory, { recursive: true });
  const updateLock = join(lockDirectory, 'shared-packages-update.lock');
  await writeFile(updateLock, `${process.pid}\n`, { flag: 'wx', mode: 0o600 });
  try {
    const metadata = await Promise.all(packageNames.map((name) => packageMetadata(name, versions[name])));
    // Currently shared packages use exact mutual peer versions. Catch a mixed
    // release before changing manifests; wider external peers remain pnpm's job.
    for (const item of metadata) {
      for (const [name, required] of Object.entries(item.peerDependencies || {})) {
        if (packageNames.includes(name) && stableVersion(required) && versions[name] !== required) {
          throw new Error(`${item.name}@${item.version} requires ${name}@${required}; select matching versions in herong.sharedPackages.`);
        }
      }
    }
    const manifests = [project, ...await workspaceManifests()];
    const changes = [];
    for (const item of manifests) {
      for (const field of ['dependencies', 'devDependencies', 'optionalDependencies', 'peerDependencies']) {
        if (item.data[field] !== undefined && !plainObject(item.data[field])) throw new Error(`Invalid ${field} in ${item.path}`);
        if (!item.data[field]) continue;
        for (const name of packageNames) if (Object.hasOwn(item.data[field], name)) item.data[field][name] = versions[name];
      }
      if (item === project && item.data.pnpm?.overrides) {
        if (!plainObject(item.data.pnpm.overrides)) throw new Error('Invalid pnpm overrides configuration.');
        for (const name of packageNames) delete item.data.pnpm.overrides[name];
        if (Object.keys(item.data.pnpm.overrides).length === 0) delete item.data.pnpm.overrides;
        if (Object.keys(item.data.pnpm).length === 0) delete item.data.pnpm;
      }
      const bytes = Buffer.from(serialize(item.data));
      if (!bytes.equals(item.bytes)) changes.push({ ...item, next: bytes });
    }
    const lockPath = join(root, 'pnpm-lock.yaml');
    const previousLock = await existingBytes(lockPath);
    const written = [];
    try {
      for (const change of changes) {
        if (!(await readFile(change.path)).equals(change.bytes)) throw new Error('A package manifest changed during update; retry after other edits finish.');
        await atomicWrite(change.path, change.next);
        written.push(change);
      }
      await install();
    } catch (error) {
      for (const change of written.reverse()) {
        if ((await readFile(change.path)).equals(change.next)) await atomicWrite(change.path, change.bytes);
      }
      if (previousLock) await atomicWrite(lockPath, previousLock);
      else await rm(lockPath, { force: true });
      throw new Error(`${error.message} Dependency manifests and lockfile were restored. Run pnpm install --ignore-scripts to restore installed dependencies before retrying.`);
    }
    console.log(`Updated ${packageNames.map((name) => `${name}@${versions[name]}`).join(', ')} from npm.`);
    console.log('Next: pnpm check and pnpm build.');
  } finally { await rm(updateLock, { force: true }); }
}

main().catch((error) => { console.error(error instanceof Error ? error.message : String(error)); process.exitCode = 1; });
