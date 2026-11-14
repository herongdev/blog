import { createHash } from 'node:crypto';
import { copyFile, mkdir, mkdtemp, readFile, rename, rm, writeFile } from 'node:fs/promises';
import { constants } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { parseArgs } from 'node:util';

const { values } = parseArgs({ options: { out: { type: 'string' }, 'with-identity': { type: 'boolean', default: false } }, allowPositionals: false });
if (!values.out) throw new Error('Usage: node packages/shared/pack.mjs --out <release-directory>');
const output = resolve(values.out);
const sourceRoot = dirname(fileURLToPath(import.meta.url));
const temporary = await mkdtemp(resolve(tmpdir(), 'herong-shared-ui-'));
const digest = (data) => createHash('sha256').update(data).digest('hex');

function run(args, cwd) {
  const child = spawnSync('corepack', ['pnpm', ...args], { cwd, stdio: 'inherit' });
  if (child.error) throw child.error;
  if (child.status !== 0) throw new Error(`pnpm ${args[0]} failed (${child.status})`);
}

async function existingBytes(path) {
  try { return await readFile(path); }
  catch (error) { if (error.code === 'ENOENT') return null; throw error; }
}

try {
  const packages = [];
  const directories = ['design-tokens', 'ui-react', ...(values['with-identity'] ? ['identity-client'] : [])];
  for (const directory of directories) {
    const source = resolve(sourceRoot, directory);
    const metadata = JSON.parse(await readFile(resolve(source, 'package.json'), 'utf8'));
    run(['run', 'build'], source);
    run(['pack', '--pack-destination', temporary], source);
    const filename = `${metadata.name.replace(/^@/, '').replaceAll('/', '-')}-${metadata.version}.tgz`;
    const bytes = await readFile(resolve(temporary, filename));
    const existing = await existingBytes(resolve(output, filename));
    const sha256 = digest(bytes);
    if (existing && digest(existing) !== sha256) {
      throw new Error(`Refusing to overwrite ${filename}: bump the package version for changed contents.`);
    }
    packages.push({ name: metadata.name, version: metadata.version, filename, sha256 });
  }
  const manifest = { schemaVersion: 1, packages };
  const content = `${JSON.stringify(manifest, null, 2)}\n`;
  const manifestPath = resolve(output, 'release-manifest.json');
  const previousManifest = await existingBytes(manifestPath);
  if (previousManifest && previousManifest.toString('utf8') !== content) {
    throw new Error('The output directory contains a different release; choose a new output directory.');
  }
  await mkdir(output, { recursive: true });
  for (const { filename, sha256 } of packages) {
    try { await copyFile(resolve(temporary, filename), resolve(output, filename), constants.COPYFILE_EXCL); }
    catch (error) {
      if (error.code !== 'EEXIST' || digest(await readFile(resolve(output, filename))) !== sha256) throw error;
    }
  }
  if (!previousManifest) {
    const pending = resolve(output, `.release-manifest-${process.pid}.json`);
    await writeFile(pending, content, { flag: 'wx' });
    await rename(pending, manifestPath);
  }
  process.stdout.write(`${JSON.stringify(manifest, null, 2)}\nShared packages: ${output}\n`);
} finally {
  await rm(temporary, { recursive: true, force: true });
}
