import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile, writeFile, readdir, rm, readlink, symlink, unlink, stat } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { parse } from 'yaml';
import { createPublishManager } from '../publish-manager.mjs';

const article = (status = 'published', extra = '') => `---\ntitle: A real tutorial\nstatus: ${status}\nupdatedAt: 2020-01-01\npublishedAt: 1999-01-01\n${extra}---\nBody remains unchanged.\n`;
const frontmatter = (text) => parse(/^---\n([\s\S]*?)\n---/.exec(text)[1]);

async function build({ snapshotRoot, profile, onPhase }) {
  await onPhase('building');
  const items = [];
  for (const name of await readdir(join(snapshotRoot, 'src/content/tutorials'))) {
    const content = frontmatter(await readFile(join(snapshotRoot, 'src/content/tutorials', name), 'utf8'));
    items.push({ url: `${profile.basePath}topics/${name.slice(0, -3)}/`, status: content.status, publishedAt: content.publishedAt ?? null });
  }
  const dist = join(snapshotRoot, 'dist');
  await mkdir(dist);
  const html = `<meta name="robots" content="noindex, nofollow, noarchive"><link rel="canonical" href="${profile.site}${profile.basePath}">`;
  for (const name of ['index.html', '404.html']) await writeFile(join(dist, name), html);
  await writeFile(join(dist, 'robots.txt'), 'Disallow: /');
  await writeFile(join(dist, 'sitemap.xml'), '<urlset/>');
  await writeFile(join(dist, 'search-index.json'), JSON.stringify(items));
}
async function fixture(t) {
  const root = await mkdtemp(join(tmpdir(), 'guides-dates-test-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  const projectRoot = join(root, 'code/apps/dev-guides');
  const contentRoot = join(root, 'persistent/content');
  const stateRoot = join(root, 'state');
  for (const name of ['src/content/tutorials', 'scripts', 'node_modules']) await mkdir(join(projectRoot, name), { recursive: true });
  await mkdir(contentRoot, { recursive: true });
  for (const name of ['astro.config.mjs', 'package.json', 'tsconfig.json']) await writeFile(join(projectRoot, name), '{}');
  await writeFile(join(contentRoot, 'first.md'), article());
  let time = '2026-10-30T07:00:00.000Z';
  const profiles = {
    staging: { root: join(root, 'staging'), site: 'https://test-dev.herong.info', basePath: '/' },
    production: { root: join(root, 'production'), site: 'https://dev.herong.info', basePath: '/' },
  };
  const options = { projectRoot, contentRoot, stateRoot, profiles, runBuild: build, clock: () => new Date(time) };
  const manager = await createPublishManager(options);
  const metadata = async (environment = 'production') => JSON.parse(await readFile(join(await readlink(join(profiles[environment].root, 'current')), 'release.json'), 'utf8'));
  const index = async (environment = 'production') => JSON.parse(await readFile(join(await readlink(join(profiles[environment].root, 'current')), 'web/search-index.json'), 'utf8'));
  const history = async () => JSON.parse(await readFile(join(stateRoot, 'publication-history.json'), 'utf8'));
  return { root, contentRoot, stateRoot, projectRoot, profiles, options, manager, metadata, index, history, setTime: (value) => { time = value; } };
}
async function publish(manager, environment) {
  await manager.start(environment); await manager.waitForIdle(); return manager.getStatus().lastJob;
}
async function both(manager) {
  assert.equal((await publish(manager, 'staging')).status, 'succeeded');
  assert.equal((await publish(manager, 'production')).status, 'succeeded');
}

test('staging dates are preview only; production uses the actual release day and never edits manuscripts', async (t) => {
  const f = await fixture(t);
  const source = await readFile(join(f.contentRoot, 'first.md'), 'utf8');
  assert.equal((await publish(f.manager, 'staging')).status, 'succeeded');
  assert.equal((await f.index('staging'))[0].publishedAt, '2026-10-30T07:00:00.000Z');
  assert.deepEqual((await f.metadata('staging')).firstPublishedAtBySlug, {});
  await assert.rejects(f.history(), { code: 'ENOENT' });
  f.setTime('2026-11-02T01:00:00.000Z');
  assert.equal((await publish(f.manager, 'production')).status, 'succeeded');
  assert.equal((await f.index())[0].publishedAt, '2026-11-02T01:00:00.000Z');
  assert.equal((await f.history()).firstPublishedAtBySlug.first, '2026-11-02T01:00:00.000Z');
  assert.equal(await readFile(join(f.contentRoot, 'first.md'), 'utf8'), source);
  assert.equal((await stat(join(f.stateRoot, 'publication-history.json'))).mode & 0o777, 0o600);
  assert.equal(f.manager.getStatus().environments.production.sourceFingerprint, f.manager.getStatus().environments.staging.sourceFingerprint);
});

test('edits and rebuilds retain first publication after a week boundary', async (t) => {
  const f = await fixture(t); await both(f.manager);
  f.setTime('2026-11-10T03:00:00.000Z');
  await writeFile(join(f.contentRoot, 'first.md'), article('published', 'summary: Changed later\n'));
  await both(f.manager);
  assert.equal((await f.index())[0].publishedAt, '2026-10-30T07:00:00.000Z');
  assert.equal((await f.metadata()).firstPublishedAtBySlug.first, '2026-10-30T07:00:00.000Z');
});

test('withdrawal and code rollback do not erase first publication history', async (t) => {
  const f = await fixture(t); await both(f.manager);
  const older = await readlink(join(f.profiles.production.root, 'current'));
  f.setTime('2026-11-02T03:00:00.000Z');
  await writeFile(join(f.contentRoot, 'second.md'), article()); await both(f.manager);
  await unlink(join(f.contentRoot, 'second.md')); await both(f.manager);
  assert.equal((await f.history()).firstPublishedAtBySlug.second, '2026-11-02T03:00:00.000Z');
  await unlink(join(f.profiles.production.root, 'current')); await symlink(older, join(f.profiles.production.root, 'current'));
  const restarted = await createPublishManager(f.options);
  f.setTime('2026-12-02T03:00:00.000Z');
  await writeFile(join(f.contentRoot, 'second.md'), article()); await both(restarted);
  assert.equal((await f.index()).find((item) => item.url.includes('/second/')).publishedAt, '2026-11-02T03:00:00.000Z');
});

test('active release restores a missing private history; abandoned releases are ignored', async (t) => {
  const f = await fixture(t); await both(f.manager);
  await unlink(join(f.stateRoot, 'publication-history.json'));
  const abandoned = join(f.profiles.production.root, 'releases/abandoned');
  await mkdir(abandoned);
  await writeFile(join(abandoned, 'release.json'), JSON.stringify({ environment: 'production', publicationHistoryVersion: 1, firstPublishedAtBySlug: { bogus: '1900-01-01T00:00:00.000Z' }, legacyUndatedSlugs: [] }));
  await createPublishManager(f.options);
  assert.deepEqual((await f.history()).firstPublishedAtBySlug, { first: '2026-10-30T07:00:00.000Z' });
});

test('failed production build cannot commit candidate dates or replace the active site', async (t) => {
  const f = await fixture(t); await both(f.manager);
  const active = await readlink(join(f.profiles.production.root, 'current'));
  await writeFile(join(f.contentRoot, 'second.md'), article());
  assert.equal((await publish(f.manager, 'staging')).status, 'succeeded');
  const failing = await createPublishManager({ ...f.options, runBuild: async () => { throw new Error('Build failed'); } });
  assert.equal((await publish(failing, 'production')).status, 'failed');
  assert.equal(await readlink(join(f.profiles.production.root, 'current')), active);
  assert.deepEqual(Object.keys((await f.history()).firstPublishedAtBySlug), ['first']);
});

test('new publication crossing Shanghai midnight is rejected before activation and can retry', async (t) => {
  const f = await fixture(t); await both(f.manager);
  const active = await readlink(join(f.profiles.production.root, 'current'));
  await writeFile(join(f.contentRoot, 'second.md'), article());
  f.setTime('2026-11-01T15:59:59.000Z');
  assert.equal((await publish(f.manager, 'staging')).status, 'succeeded');
  const crossing = await createPublishManager({ ...f.options, runBuild: async (args) => { await build(args); f.setTime('2026-11-01T16:00:01.000Z'); } });
  assert.match((await publish(crossing, 'production')).error, /跨越了日期/);
  assert.equal(await readlink(join(f.profiles.production.root, 'current')), active);
  assert.equal(Object.hasOwn((await f.history()).firstPublishedAtBySlug, 'second'), false);
  assert.equal((await publish(crossing, 'production')).status, 'succeeded');
  assert.equal((await f.history()).firstPublishedAtBySlug.second, '2026-11-01T16:00:01.000Z');
});

test('legacy published tutorials stay undated; edited dates, lead and private drafts are not trusted', async (t) => {
  const f = await fixture(t); await both(f.manager);
  const active = await readlink(join(f.profiles.production.root, 'current'));
  const metadata = await f.metadata();
  delete metadata.publicationHistoryVersion; delete metadata.firstPublishedAtBySlug; delete metadata.legacyUndatedSlugs;
  await writeFile(join(active, 'release.json'), JSON.stringify(metadata));
  await unlink(join(f.stateRoot, 'publication-history.json'));
  await mkdir(join(f.projectRoot, 'drafts')); await writeFile(join(f.projectRoot, 'drafts/private.md'), article());
  await writeFile(join(f.contentRoot, 'lead.md'), article('lead'));
  const migrated = await createPublishManager(f.options);
  f.setTime('2026-11-10T03:00:00.000Z'); await both(migrated);
  assert.equal((await f.index()).find((item) => item.url.includes('/first/')).publishedAt, null);
  assert.equal((await f.index()).find((item) => item.url.includes('/lead/')).publishedAt, null);
  assert.equal((await f.index()).length, 2);
  assert.deepEqual((await f.history()).legacyUndatedSlugs, ['first']);
  assert.deepEqual((await f.history()).firstPublishedAtBySlug, {});
});

test('publication history rejects unsafe files and invalid timestamps instead of silently resetting', async (t) => {
  const f = await fixture(t);
  const path = join(f.stateRoot, 'publication-history.json');
  const target = join(f.root, 'outside.json'); await writeFile(target, '{}'); await symlink(target, path);
  await assert.rejects(createPublishManager(f.options), /不安全/);
  await unlink(path);
  await writeFile(path, JSON.stringify({ version: 1, firstPublishedAtBySlug: { first: '2026-02-30T00:00:00.000Z' }, legacyUndatedSlugs: [] }));
  await assert.rejects(createPublishManager(f.options), /无效条目/);
});

test('a private history backup failure reports the activated release and is recoverable from current', async (t) => {
  const f = await fixture(t);
  assert.equal((await publish(f.manager, 'staging')).status, 'succeeded');
  const historyPath = join(f.stateRoot, 'publication-history.json');
  const manager = await createPublishManager({ ...f.options, runBuild: async (args) => {
    await build(args);
    // Simulate storage becoming unavailable after the build took its snapshot.
    await mkdir(historyPath);
  } });
  const job = await publish(manager, 'production');
  assert.equal(job.status, 'succeeded');
  assert.match(job.warning, /已发布/);
  assert.equal((await f.metadata()).firstPublishedAtBySlug.first, '2026-10-30T07:00:00.000Z');
  await rm(historyPath, { recursive: true });
  await createPublishManager(f.options);
  assert.equal((await f.history()).firstPublishedAtBySlug.first, '2026-10-30T07:00:00.000Z');
});
