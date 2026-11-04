import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile, writeFile, rm, readlink, symlink } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { createHash } from 'node:crypto';
import { createArticleRevisions } from '../article-revisions.mjs';
import { createPublishManager } from '../publish-manager.mjs';

const hash = (bytes) => createHash('sha256').update(bytes).digest('hex');
const article = (title, body = title) => `---\ntitle: '${title}'\nstatus: published\nsummary: 'A fully written test article for isolated revision validation.'\n---\n\n${body}\n`;
async function fixture(t, bootstrapPublished = false) {
  const root = await mkdtemp(join(tmpdir(), 'author-revisions-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  const projectRoot = join(root, 'project');
  const contentRoot = join(projectRoot, 'src/content/tutorials');
  for (const path of [contentRoot, join(projectRoot, 'drafts'), join(projectRoot, 'templates'), join(projectRoot, 'scripts'), join(projectRoot, 'node_modules')]) await mkdir(path, { recursive: true });
  for (const name of ['package.json', 'astro.config.mjs', 'tsconfig.json']) await writeFile(join(projectRoot, name), '{}');
  const a = article('First original article'), b = article('Second original article');
  await writeFile(join(contentRoot, 'first.md'), a); await writeFile(join(contentRoot, 'second.md'), b);
  const revisions = await createArticleRevisions({ projectRoot, bootstrapPublished });
  return { root, projectRoot, contentRoot, revisions, a, b };
}
async function fakeBuild({ snapshotRoot, profile, onPhase }) {
  await onPhase('building');
  const dist = join(snapshotRoot, 'dist');
  await mkdir(dist, { recursive: true });
  const html = `<meta name="robots" content="noindex, nofollow, noarchive"><link rel="canonical" href="${profile.site}${profile.basePath}">`;
  for (const name of ['index.html', '404.html']) await writeFile(join(dist, name), html);
  await writeFile(join(dist, 'robots.txt'), 'Disallow: /\n');
  await writeFile(join(dist, 'sitemap.xml'), '<urlset/>');
  await writeFile(join(dist, 'search-index.json'), '[]');
}
async function manager(f, runBuild = fakeBuild) {
  return createPublishManager({ projectRoot: f.projectRoot, contentRoot: f.contentRoot, stateRoot: join(f.root, 'publish-state'), articleRevisions: f.revisions, runBuild, profiles: { staging: { root: join(f.root, 'staging'), site: 'https://test-dev.herong.info', basePath: '/' }, production: { root: join(f.root, 'production'), site: 'https://dev.herong.info', basePath: '/' } } });
}
async function publish(instance, environment, selection) {
  const started = await instance.start(environment, selection);
  await instance.waitForIdle();
  return { started, finished: instance.getStatus().lastJob };
}

test('existing author content is not inferred to be published, and the first revision survives edits', async (t) => {
  const f = await fixture(t);
  const initial = await f.revisions.read({ kind: 'content', slug: 'first' });
  assert.equal(initial.status, 'draft'); assert.equal(initial.publishedRevision, null);
  await f.revisions.recordBeforeSave({ kind: 'content', slug: 'first' });
  await writeFile(join(f.contentRoot, 'first.md'), article('First changed article'));
  const changed = await f.revisions.read({ kind: 'content', slug: 'first' });
  assert.equal(changed.history.length, 2);
  assert.equal((await f.revisions.version({ kind: 'content', slug: 'first' }, initial.workingRevision)).body, 'First original article\n');
  await assert.rejects(f.revisions.published({ kind: 'content', slug: 'first' }), { status: 404 });
});

test('selected preview freezes A and excludes B unconfirmed changes, including later saves', async (t) => {
  const f = await fixture(t, true);
  const nextA = article('First selected revision'), nextB = article('Second private work revision');
  await writeFile(join(f.contentRoot, 'first.md'), nextA); await writeFile(join(f.contentRoot, 'second.md'), nextB);
  const selection = { kind: 'content', slug: 'first', revision: hash(nextA), action: 'publish' };
  const plan = await f.revisions.prepareSelection(selection);
  assert.equal(await readFile(join(plan.contentRoot, 'first.md'), 'utf8'), nextA);
  assert.equal(await readFile(join(plan.contentRoot, 'second.md'), 'utf8'), f.b);
  await writeFile(join(f.contentRoot, 'first.md'), article('First saved after preview'));
  assert.equal(await readFile(join((await f.revisions.plan(plan.id)).contentRoot, 'first.md'), 'utf8'), nextA);
  await assert.rejects(f.revisions.prepareSelection(selection), { status: 409 });
});

test('history restore checks working revision and only changes the work draft', async (t) => {
  const f = await fixture(t, true);
  const initial = await f.revisions.read({ kind: 'content', slug: 'first' });
  await writeFile(join(f.contentRoot, 'first.md'), article('A changed working article'));
  const working = await f.revisions.read({ kind: 'content', slug: 'first' });
  await assert.rejects(f.revisions.restore({ kind: 'content', slug: 'first', revision: initial.workingRevision, targetRevision: initial.workingRevision }), { status: 409 });
  await f.revisions.restore({ kind: 'content', slug: 'first', revision: initial.workingRevision, targetRevision: working.workingRevision });
  assert.equal(await readFile(join(f.contentRoot, 'first.md'), 'utf8'), f.a);
  assert.equal((await f.revisions.published({ kind: 'content', slug: 'first' })).revision, initial.workingRevision);
  assert.equal((await f.revisions.read({ kind: 'content', slug: 'first' })).history.length, 2);
});

test('website production activates exactly the selected preview and commits only after success', async (t) => {
  const f = await fixture(t, true);
  const nextA = article('A preview version'), nextB = article('B private unconfirmed');
  await writeFile(join(f.contentRoot, 'first.md'), nextA); await writeFile(join(f.contentRoot, 'second.md'), nextB);
  const snapshots = [];
  const instance = await manager(f, async (args) => {
    snapshots.push({ environment: args.environment, a: await readFile(join(args.snapshotRoot, 'src/content/tutorials/first.md'), 'utf8'), b: await readFile(join(args.snapshotRoot, 'src/content/tutorials/second.md'), 'utf8') });
    await fakeBuild(args);
  });
  const preview = await publish(instance, 'staging', { kind: 'content', slug: 'first', revision: hash(nextA), action: 'publish' });
  assert.equal(preview.finished.status, 'succeeded');
  assert.equal((await f.revisions.read({ kind: 'content', slug: 'first' })).publishedRevision, hash(f.a));
  await writeFile(join(f.contentRoot, 'first.md'), article('A edited after preview'));
  const production = await publish(instance, 'production', { previewId: preview.started.previewId });
  assert.equal(production.finished.status, 'succeeded');
  assert.match(snapshots[1].a, /A preview version/); assert.doesNotMatch(snapshots[1].a, /A edited after preview/);
  assert.match(snapshots[1].b, /Second original article/); assert.doesNotMatch(snapshots[1].b, /private unconfirmed/);
  const a = await f.revisions.read({ kind: 'content', slug: 'first' });
  assert.equal(a.status, 'modified'); assert.equal(a.publishedRevision, hash(nextA));
  assert.equal((await f.revisions.read({ kind: 'content', slug: 'second' })).publishedRevision, hash(f.b));
  const release = await readlink(join(f.root, 'production/current'));
  assert.equal(JSON.parse(await readFile(join(release, 'release.json'))).articleRevisionPlan, preview.started.previewId);
});

test('failed production does not commit a new published pointer and wrong preview cannot publish', async (t) => {
  const f = await fixture(t, true);
  const next = article('A candidate'); await writeFile(join(f.contentRoot, 'first.md'), next);
  const instance = await manager(f, async (args) => { if (args.environment === 'production') throw new Error('private/path/secret'); await fakeBuild(args); });
  const preview = await publish(instance, 'staging', { kind: 'content', slug: 'first', revision: hash(next) });
  await assert.rejects(instance.start('production', { previewId: '00000000-0000-0000-0000-000000000000' }), { status: 409 });
  assert.equal((await publish(instance, 'production', { previewId: preview.started.previewId })).finished.status, 'failed');
  assert.equal((await f.revisions.read({ kind: 'content', slug: 'first' })).publishedRevision, hash(f.a));
  assert.doesNotMatch(instance.getStatus().lastJob.error, /private\/path|secret/);
  await assert.rejects(readlink(join(f.root, 'production/current')), { code: 'ENOENT' });
});

test('unpublish excludes only the selected article, keeps its work file, and invalidates stale previews', async (t) => {
  const f = await fixture(t, true);
  const stale = await f.revisions.prepareSelection({ kind: 'content', slug: 'second', revision: hash(f.b) });
  const plan = await f.revisions.prepareSelection({ kind: 'content', slug: 'first', action: 'unpublish' });
  await assert.rejects(readFile(join(plan.contentRoot, 'first.md')), { code: 'ENOENT' });
  assert.equal(await readFile(join(plan.contentRoot, 'second.md'), 'utf8'), f.b);
  await f.revisions.commit(plan);
  assert.equal((await f.revisions.read({ kind: 'content', slug: 'first' })).status, 'unpublished');
  assert.equal(await readFile(join(f.contentRoot, 'first.md'), 'utf8'), f.a);
  await assert.rejects(f.revisions.assertBaseline(stale), { status: 409 });
});

test('global publisher controls cannot include unconfirmed work when revisions are enabled', async (t) => {
  const f = await fixture(t, true);
  await writeFile(join(f.contentRoot, 'first.md'), article('PRIVATE_WORK_MARKER'));
  const instance = await manager(f, async (args) => {
    assert.doesNotMatch(await readFile(join(args.snapshotRoot, 'src/content/tutorials/first.md'), 'utf8'), /PRIVATE_WORK_MARKER/);
    await fakeBuild(args);
  });
  assert.equal((await publish(instance, 'staging')).finished.status, 'succeeded');
  assert.equal((await publish(instance, 'production')).finished.status, 'succeeded');
  assert.equal((await f.revisions.read({ kind: 'content', slug: 'first' })).publishedRevision, hash(f.a));
});

test('prototype-like slugs are ordinary entries and symlinked article files are rejected', async (t) => {
  const f = await fixture(t);
  await writeFile(join(f.contentRoot, 'constructor.md'), article('Constructor article'));
  assert.equal((await f.revisions.read({ kind: 'content', slug: 'constructor' })).history.length, 1);
  await symlink(join(f.contentRoot, 'first.md'), join(f.contentRoot, 'symlink.md'));
  await assert.rejects(f.revisions.read({ kind: 'content', slug: 'symlink' }), { status: 422 });
});

test('incomplete working YAML and missing draft images remain editable, but cannot publish', async (t) => {
  const f = await fixture(t);
  await writeFile(join(f.contentRoot, 'first.md'), "---\ntitle: [broken\nstatus: published\n---\n\n![draft](./first/missing.png)\n");
  const working = await f.revisions.read({ kind: 'content', slug: 'first' });
  await f.revisions.recordBeforeSave({ kind: 'content', slug: 'first' });
  await assert.rejects(f.revisions.prepareSelection({ kind: 'content', slug: 'first', revision: working.workingRevision }), { status: 422 });
  await writeFile(join(f.contentRoot, 'first.md'), article('Fixed article', '![draft](./first/missing.png)'));
  const fixed = await f.revisions.read({ kind: 'content', slug: 'first' });
  assert.equal(fixed.history.length, 2);
  await assert.rejects(f.revisions.prepareSelection({ kind: 'content', slug: 'first', revision: fixed.workingRevision }), { status: 422 });
});

test('only referenced local images are frozen and the build projection is disposable', async (t) => {
  const f = await fixture(t);
  await mkdir(join(f.contentRoot, 'first'));
  await writeFile(join(f.contentRoot, 'first/used.png'), 'used-image-original');
  await writeFile(join(f.contentRoot, 'first/private-unused.png'), 'PRIVATE_UNUSED_IMAGE');
  const content = article('Article with local image', '![image](./first/used.png)');
  await writeFile(join(f.contentRoot, 'first.md'), content);
  const frozen = await f.revisions.prepareSelection({ kind: 'content', slug: 'first', revision: hash(content) });
  assert.equal(await readFile(join(frozen.contentRoot, 'first/used.png'), 'utf8'), 'used-image-original');
  await assert.rejects(readFile(join(frozen.contentRoot, 'first/private-unused.png')), { code: 'ENOENT' });
  await f.revisions.releaseProjection(frozen.id);
  await writeFile(join(f.contentRoot, 'first/used.png'), 'later-image-change');
  const recovered = await f.revisions.plan(frozen.id);
  assert.equal(await readFile(join(recovered.contentRoot, 'first/used.png'), 'utf8'), 'used-image-original');
});

test('an interrupted projection cannot be reused as a partial confirmed article set', async (t) => {
  const f = await fixture(t, true);
  const frozen = await f.revisions.prepareSelection({ kind: 'content', slug: 'first', revision: hash(f.a) });
  await f.revisions.releaseProjection(frozen.id);
  const missingObject = join(f.projectRoot, '.article-revisions/objects', hash(f.b));
  await rm(missingObject);
  await assert.rejects(f.revisions.plan(frozen.id), { code: 'ENOENT' });
  await assert.rejects(readFile(join(frozen.contentRoot, 'first.md')), { code: 'ENOENT' });
  // Restoring the missing immutable object allows a complete retry, including B.
  await writeFile(missingObject, f.b);
  const recovered = await f.revisions.plan(frozen.id);
  assert.equal(await readFile(join(recovered.contentRoot, 'first.md'), 'utf8'), f.a);
  assert.equal(await readFile(join(recovered.contentRoot, 'second.md'), 'utf8'), f.b);
});

test('a legacy production website blocks revision publishing until a verified baseline is explicitly imported', async (t) => {
  const f = await fixture(t);
  const profiles = { staging: { root: join(f.root, 'staging'), site: 'https://test-dev.herong.info', basePath: '/' }, production: { root: join(f.root, 'production'), site: 'https://dev.herong.info', basePath: '/' } };
  const options = { projectRoot: f.projectRoot, contentRoot: f.contentRoot, stateRoot: join(f.root, 'publish-state'), profiles, runBuild: fakeBuild };
  const legacy = await createPublishManager(options);
  await publish(legacy, 'staging'); await publish(legacy, 'production');
  const previous = await readlink(join(f.root, 'production/current'));
  const revised = await createPublishManager({ ...options, articleRevisions: f.revisions });
  assert.equal(await f.revisions.baselineReady(), false);
  await assert.rejects(revised.start('staging', { kind: 'content', slug: 'first', revision: hash(f.a) }), /发布基线迁移/);
  await assert.rejects(revised.start('production'), /发布基线迁移/);
  assert.equal(await readlink(join(f.root, 'production/current')), previous);
  // This is an explicit maintenance action using an audited content copy, not
  // an automatic assumption based on files in the working directory.
  await f.revisions.initialize({ seedPublished: true });
  assert.equal(await f.revisions.baselineReady(), true);
  const preview = await publish(revised, 'staging', { kind: 'content', slug: 'first', revision: hash(f.a) });
  assert.equal(preview.finished.status, 'succeeded');
  assert.equal((await publish(revised, 'production', { previewId: preview.started.previewId })).finished.status, 'succeeded');
  assert.equal((await f.revisions.published({ kind: 'content', slug: 'second' })).revision, hash(f.b));
});

test('historical image URLs serve only bytes referenced by that article version', async (t) => {
  const f = await fixture(t);
  await mkdir(join(f.contentRoot, 'first'));
  const png = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aTnQAAAAASUVORK5CYII=', 'base64');
  await writeFile(join(f.contentRoot, 'first/image.png'), png);
  const content = article('Article with image history', '![image](./first/image.png)');
  await writeFile(join(f.contentRoot, 'first.md'), content);
  const plan = await f.revisions.prepareSelection({ kind: 'content', slug: 'first', revision: hash(content) });
  await f.revisions.commit(plan);
  await writeFile(join(f.contentRoot, 'first/image.png'), 'changed-original-file');
  const published = await f.revisions.published({ kind: 'content', slug: 'first' });
  const previous = await f.revisions.version({ kind: 'content', slug: 'first' }, hash(content));
  assert.equal(published.images['./first/image.png'], previous.images['./first/image.png']);
  let headers, result;
  const response = { writeHead: (status, values) => { assert.equal(status, 200); headers = values; }, end: (bytes) => { result = bytes; } };
  const imageUrl = previous.images['./first/image.png'];
  assert.equal(await f.revisions.handle({ method: 'GET' }, response, { url: new URL(imageUrl, 'http://127.0.0.1') }), true);
  assert.deepEqual(result, png);
  assert.equal(headers['Cache-Control'], 'private, no-store');
  assert.equal(headers['Content-Type'], 'image/png');
  assert.equal(headers['Content-Security-Policy'], "default-src 'none'; sandbox");
  await assert.rejects(f.revisions.handle({ method: 'GET' }, response, { url: new URL(imageUrl.replace('image.png', 'unused.png'), 'http://127.0.0.1') }), { status: 404 });
  await assert.rejects(f.revisions.handle({ method: 'GET' }, response, { url: new URL(imageUrl.replace('/content/first/', '/content/second/'), 'http://127.0.0.1') }), { status: 404 });
});
