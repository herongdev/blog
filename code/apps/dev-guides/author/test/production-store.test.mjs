import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, realpathSync, rmSync, statSync, symlinkSync, mkdirSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { randomUUID } from 'node:crypto';
import { DatabaseSync } from 'node:sqlite';
import { createProductionStore } from '../production/store.mjs';
import { PRODUCTION_STAGES, ARTIFACT_CHECKS } from '../production/definitions.mjs';

const actor = { id: 'author', kind: 'user', source: 'web' };
const agent = { id: 'author', kind: 'agent', source: 'mcp' };
const hash = 'a'.repeat(64);
function fixture(t) {
  const root = mkdtempSync(join(realpathSync(tmpdir()), 'production-store-'));
  const path = join(root, 'private', 'production.sqlite');
  const store = createProductionStore({ path, clock: () => new Date('2026-11-09T08:00:00.000Z') });
  t.after(() => { try { store.close(); } catch {} rmSync(root, { recursive: true, force: true }); });
  const contentId = randomUUID();
  const action = (operation, values = {}, who = actor) => store.apply(contentId, { operation, expectedVersion: store.get(contentId)?.rowVersion ?? 0, idempotencyKey: randomUUID(), ...values }, who);
  const start = () => action('start', { slug: 'test-course', title: '制作流程测试课程' });
  const save = (stageId, content = '本阶段实际稿件', values = {}) => action('save_stage_revision', { stageId, content, ...values });
  const artifact = (kind, values = {}) => action('register_artifact', { kind, filename: `${kind}.mp4`, contentHash: hash, sizeBytes: 128, storageRef: { type: 'workspace_asset', assetId: randomUUID(), slug: 'test-course' }, ...values });
  const check = (targetRevisionId, checkId, method, values = {}) => action('record_check', { targetRevisionId, checkId, method, result: 'passed', ...values });
  return { root, path, store, contentId, action, start, save, artifact, check };
}
const status = (context, stageId) => context.stages.find((stage) => stage.id === stageId);
const current = (context, stageId) => context.stageRevisions.find((item) => item.stageId === stageId && item.current);

test('production identity, fixed workflow, persistence and private file modes', (t) => {
  const f = fixture(t);
  assert.equal(f.store.context(f.contentId).episode, null);
  assert.equal(f.store.context(f.contentId).stages.length, 9);
  f.start(); const saved = f.save('S01', '标题真实、封面承诺明确');
  assert.equal(saved.episode.id, f.contentId); assert.equal(saved.episode.rowVersion, 2);
  assert.equal(saved.episode.workflowVersion, 'microcourse-v1');
  assert.equal(status(saved, 'S01').status, 'in_progress');
  const second = createProductionStore({ path: f.path });
  assert.equal(current(second.context(f.contentId), 'S01').content, '标题真实、封面承诺明确'); second.close();
  assert.equal(statSync(join(f.root, 'private')).mode & 0o777, 0o700);
  assert.equal(statSync(f.path).mode & 0o777, 0o600);
});

test('committed retry returns original result before version conflicts and rejects changed body', (t) => {
  const f = fixture(t); f.start();
  const input = { operation: 'save_stage_revision', expectedVersion: 1, idempotencyKey: randomUUID(), stageId: 'S01', content: '第一次保存的稿件' };
  const first = f.store.apply(f.contentId, input, actor); f.save('S02');
  const retried = f.store.apply(f.contentId, input, actor);
  assert.equal(retried.replayed, true); assert.equal(retried.episode.rowVersion, first.episode.rowVersion);
  assert.deepEqual(retried.stageRevisions, first.stageRevisions);
  assert.equal(f.store.get(f.contentId).rowVersion, 3);
  assert.throws(() => f.store.apply(f.contentId, { ...input, content: '不同请求' }, actor), { code: 'IDEMPOTENCY_CONFLICT' });
});

test('normalized source metadata does not change client request idempotency', (t) => {
  const f = fixture(t);
  const request = { operation: 'start', expectedVersion: 0, idempotencyKey: randomUUID() };
  const result = f.store.apply(f.contentId, { ...request, slug: 'test-course', title: '第一次的标题' }, actor, { request });
  assert.equal(f.store.replay(f.contentId, request, actor).episode.title, '第一次的标题');
  assert.equal(f.store.apply(f.contentId, { ...request, slug: 'test-course', title: '后来的标题' }, actor, { request }).episode.rowVersion, result.episode.rowVersion);
});

test('two SQLite connections reject stale writer without changing new draft', (t) => {
  const f = fixture(t); f.start();
  const second = createProductionStore({ path: f.path }); t.after(() => second.close());
  f.save('S06', '第一位作者刚保存的新稿');
  assert.throws(() => second.apply(f.contentId, { operation: 'save_stage_revision', expectedVersion: 1, idempotencyKey: randomUUID(), stageId: 'S06', content: '过期聊天的旧稿' }, actor), { status: 409, code: 'VERSION_CONFLICT' });
  assert.equal(current(second.context(f.contentId), 'S06').content, '第一位作者刚保存的新稿');
});

test('author approval binds exact revision and requires relevant checks', (t) => {
  const f = fixture(t); f.start();
  let result = f.save('S01'); const id = current(result, 'S01').id;
  assert.throws(() => f.action('record_decision', { targetRevisionId: id, decision: 'approved' }), { status: 422 });
  f.check(id, 'title_promise', 'document_review');
  result = f.action('record_decision', { targetRevisionId: id, decision: 'approved' });
  assert.equal(status(result, 'S01').status, 'approved');
  result = f.save('S01', '新的封面承诺');
  assert.equal(status(result, 'S01').status, 'in_progress');
  assert.equal(result.decisions[0].targetRevisionId, id); assert.equal(result.decisions[0].valid, false);
  assert.equal(result.decisions.length, 1);
});

test('agent may report a user decision but cannot approve, grant or finalize', (t) => {
  const f = fixture(t); f.start();
  const id = current(f.save('S01'), 'S01').id;
  const result = f.action('record_decision', { targetRevisionId: id, decision: 'approved', sourceInstruction: '模型转述用户的话' }, agent);
  assert.equal(result.decisions[0].decision, 'reported_decision');
  assert.equal(status(result, 'S01').status, 'in_progress');
  assert.throws(() => f.action('set_execution_grant', { allowedStageIds: ['S01'], allowedActions: ['draft'], stopConditions: '改变方向时停止', sourceInstruction: '继续制作' }, agent), { status: 403 });
  assert.throws(() => f.action('complete', {}, agent), { status: 403 });
  assert.throws(() => f.action('save_stage_revision', { stageId: 'S01', content: '稿件', ownerId: 'other' }), { status: 422 });
});

test('continuous execution stays separate from content approval and may be revoked', (t) => {
  const f = fixture(t); f.start(); f.save('S01');
  let result = f.action('set_execution_grant', { allowedStageIds: ['S01', 'S02'], allowedActions: ['draft'], stopConditions: '事实不足或改变方向时停止', sourceInstruction: '按这个方向继续做' });
  assert.equal(status(result, 'S01').canProceed, true);
  assert.equal(status(result, 'S01').status, 'in_progress');
  result = f.action('set_execution_grant', { revoke: true });
  assert.equal(status(result, 'S01').canProceed, false); assert.ok(result.grants[0].revokedAt);
});

test('narration changes invalidate dependent audio, video, article and checks transitively', (t) => {
  const f = fixture(t); f.start();
  const narration = current(f.save('S06', '旧版口播'), 'S06');
  let result = f.artifact('audio', { inputRevisionIds: [narration.id] }); const audio = result.artifacts[0];
  result = f.artifact('video', { inputRevisionIds: [audio.id] }); const video = result.artifacts[1];
  const review = current(f.save('S08', '旧版成片检查说明'), 'S08');
  f.check(review.id, 'media_playback', 'playback', { evidenceRef: video.id });
  f.save('S09', '文章与旧版成片一致');
  result = f.save('S06', '改了需要念的台词');
  assert.equal(result.artifacts.find((item) => item.id === audio.id).valid, false);
  assert.equal(result.artifacts.find((item) => item.id === video.id).valid, false);
  assert.equal(status(result, 'S08').status, 'needs_review');
  assert.equal(status(result, 'S09').status, 'needs_review');
  assert.equal(result.checks[0].valid, false);
  assert.equal(result.checks[0].result, 'passed');
});

test('article typo revision does not invalidate upstream video or its checks', (t) => {
  const f = fixture(t); f.start();
  const narration = current(f.save('S06'), 'S06');
  const video = f.artifact('video', { inputRevisionIds: [narration.id] }).artifacts[0];
  f.check(video.id, 'media_playback', 'playback', { evidenceRef: video.id });
  f.save('S09', '文章有一个错别字');
  const result = f.save('S09', '只修文章错别字');
  assert.equal(result.artifacts.find((item) => item.id === video.id).valid, true);
  assert.equal(result.checks[0].valid, true);
});

test('cross-episode revisions, foreign actors and unknown fields are rejected atomically', (t) => {
  const f = fixture(t); f.start();
  const own = current(f.save('S01'), 'S01'); const other = randomUUID();
  f.store.apply(other, { operation: 'start', expectedVersion: 0, idempotencyKey: randomUUID(), slug: 'another-course', title: '另一条内容' }, actor);
  assert.throws(() => f.store.apply(other, { operation: 'save_stage_revision', expectedVersion: 1, idempotencyKey: randomUUID(), stageId: 'S02', content: '稿件', inputRevisionIds: [own.id] }, actor), { status: 422 });
  assert.equal(f.store.get(other).rowVersion, 1);
  assert.throws(() => f.action('save_stage_revision', { stageId: 'S02', content: '稿件' }, { ...actor, id: 'different' }), { status: 403 });
  assert.throws(() => f.action('register_artifact', { kind: 'video', contentHash: hash, sizeBytes: 10, storageRef: { type: 'url', url: 'https://example.com/movie.mp4' } }), { status: 422 });
});

test('automated and static checks cannot masquerade as actual media playback', (t) => {
  const f = fixture(t); f.start();
  const review = current(f.save('S08'), 'S08');
  assert.throws(() => f.check(review.id, 'media_playback', 'automated'), { status: 422 });
  assert.throws(() => f.check(review.id, 'media_playback', 'playback'), { status: 422 });
  assert.throws(() => f.check(review.id, 'media_sync', 'playback', { result: 'not_applicable', limitations: '没有听查' }), { status: 422 });
  assert.throws(() => f.action('record_decision', { targetRevisionId: review.id, decision: 'approved' }), { status: 422 });
});

test('each current platform video needs its own real checks', (t) => {
  const f = fixture(t); f.start(); f.save('S06');
  const first = f.artifact('video', { variant: 'website' }).artifacts.at(-1);
  const second = f.artifact('video', { variant: 'douyin' }).artifacts.at(-1);
  const review = current(f.save('S08'), 'S08');
  for (const definition of f.store.context(f.contentId).stages.find((item) => item.id === 'S08').requiredChecks) f.check(review.id, definition.id, definition.methods[0], { evidenceRef: first.id });
  let result = f.store.context(f.contentId);
  assert.ok(status(result, 'S08').missingChecks.some((item) => item.includes('douyin')));
  assert.throws(() => f.action('record_decision', { targetRevisionId: review.id, decision: 'approved' }), { status: 422 });
  for (const definition of result.stages.find((item) => item.id === 'S08').requiredChecks) f.check(second.id, definition.id, definition.methods[0], { evidenceRef: second.id });
  result = f.action('record_decision', { targetRevisionId: review.id, decision: 'approved' });
  assert.equal(status(result, 'S08').status, 'approved');
});

test('a platform video cannot borrow another video as its own playback evidence', (t) => {
  const f = fixture(t); f.start(); f.save('S06');
  const first = f.artifact('video', { variant: 'website' }).artifacts.at(-1);
  const second = f.artifact('video', { variant: 'douyin' }).artifacts.at(-1);
  const review = current(f.save('S08'), 'S08');
  const before = f.store.get(f.contentId).rowVersion;
  const definitions = status(f.store.context(f.contentId), 'S08').requiredChecks;
  for (const definition of definitions) assert.throws(() => f.check(second.id, definition.id, definition.methods[0], { evidenceRef: first.id }), { status: 422 });
  assert.throws(() => f.check(second.id, 'media_playback', 'playback', { result: 'failed', evidenceRef: first.id }), { status: 422 });
  assert.equal(f.store.get(f.contentId).rowVersion, before);
  assert.equal(f.store.context(f.contentId).checks.length, 0);
  // A stage-level review can still describe the actual file inspected, while each
  // additional deliverable needs an explicit check of its own revision.
  for (const definition of definitions) f.check(review.id, definition.id, definition.methods[0], { evidenceRef: first.id });
  assert.throws(() => f.action('record_decision', { targetRevisionId: review.id, decision: 'approved' }), { status: 422 });
  for (const definition of definitions) f.check(second.id, definition.id, definition.methods[0]);
  assert.equal(status(f.action('record_decision', { targetRevisionId: review.id, decision: 'approved' }), 'S08').status, 'approved');
});

test('previously stored cross-video evidence is historical and cannot make a deliverable ready', (t) => {
  const f = fixture(t); f.start(); f.save('S06');
  const first = f.artifact('video', { variant: 'website' }).artifacts.at(-1);
  const second = f.artifact('video', { variant: 'douyin' }).artifacts.at(-1);
  const review = current(f.save('S08'), 'S08');
  const definitions = status(f.store.context(f.contentId), 'S08').requiredChecks;
  for (const definition of definitions) f.check(review.id, definition.id, definition.methods[0], { evidenceRef: first.id });
  const legacyIds = definitions.map(() => randomUUID());
  const db = new DatabaseSync(f.path);
  try {
    for (const [index, definition] of definitions.entries()) {
      const check = { id: legacyIds[index], episodeId: f.contentId, targetRevisionId: second.id, checkId: definition.id, method: definition.methods[0], result: 'passed', evidenceRef: first.id, limitations: '旧版曾错误允许交叉引用', checkedBy: actor.id, actorKind: actor.kind, checkedAt: '2026-11-09T08:00:00.000Z' };
      db.prepare('INSERT INTO records VALUES(?,?,?,?)').run(check.id, f.contentId, 'check', JSON.stringify(check));
    }
  } finally { db.close(); }
  const result = f.store.context(f.contentId);
  assert.equal(result.checks.filter(check => legacyIds.includes(check.id)).length, definitions.length);
  assert.ok(result.checks.filter(check => legacyIds.includes(check.id)).every(check => !check.valid));
  assert.ok(status(result, 'S08').missingChecks.some(item => item.includes('douyin')));
  assert.throws(() => f.action('record_decision', { targetRevisionId: review.id, decision: 'approved' }), { status: 422 });
});

test('delivery artifacts cannot evade media checks by choosing an unrelated stage', (t) => {
  const f = fixture(t); f.start();
  assert.throws(() => f.artifact('video', { stageId: 'S01' }), { status: 422 });
  assert.throws(() => f.artifact('audio', { stageId: 'S05' }), { status: 422 });
  assert.throws(() => f.artifact('article', { stageId: 'S08' }), { status: 422 });
  assert.equal(f.store.context(f.contentId).artifacts.length, 0);
});

test('replacing a media variant supersedes its checks without invalidating another variant', (t) => {
  const f = fixture(t); f.start(); f.save('S06');
  const first = f.artifact('video', { variant: 'website' }).artifacts.at(-1);
  const second = f.artifact('video', { variant: 'douyin' }).artifacts.at(-1);
  f.check(second.id, 'media_playback', 'playback');
  const result = f.artifact('video', { artifactId: first.artifactId, variant: 'website', contentHash: 'b'.repeat(64) });
  assert.equal(result.artifacts.find((item) => item.id === first.id).current, false);
  assert.equal(result.artifacts.find((item) => item.id === second.id).valid, true);
  assert.equal(result.checks[0].valid, true);
});

test('pause preserves drafts and blocker restoration does not claim checks passed', (t) => {
  const f = fixture(t); f.start(); f.save('S06');
  f.action('set_blocker', { stageId: 'S08', reason: '指定音色服务不可用', nextAction: '恢复指定音色后重新合成' }, agent);
  let result = f.action('set_pause', { paused: true, reason: '明天继续' });
  assert.equal(result.episode.status, 'paused'); assert.equal(status(result, 'S08').status, 'blocked');
  result = f.save('S08', '保留已经完成的画面与待查音轨');
  assert.equal(result.episode.status, 'paused'); assert.equal(status(result, 'S08').status, 'blocked');
  result = f.action('set_pause', { paused: false });
  assert.equal(status(result, 'S08').status, 'blocked');
  result = f.action('clear_blocker', { stageId: 'S08' }, agent);
  assert.equal(status(result, 'S08').status, 'in_progress'); assert.equal(result.checks.length, 0);
  const handoff = f.store.exportHandoff(f.contentId);
  assert.equal(handoff.snapshot.episode.rowVersion, result.episode.rowVersion);
  assert.match(handoff.markdown, /恢复前读取后台最新档案版本/);
  assert.match(handoff.markdown, /S08/);
});

test('complete requires current versions, all checks and user confirmation, without publishing', (t) => {
  const f = fixture(t); f.start();
  assert.throws(() => f.action('complete'), { status: 422 });
  for (let n = 1; n <= 7; n++) {
    const stageId = `S0${n}`; const rev = current(f.save(stageId, `第 ${n} 阶段的实际稿件`), stageId);
    for (const definition of status(f.store.context(f.contentId), stageId).requiredChecks) f.check(rev.id, definition.id, definition.methods[0]);
    f.action('record_decision', { targetRevisionId: rev.id, decision: 'approved' });
  }
  const video = f.artifact('video').artifacts.at(-1);
  const review = current(f.save('S08'), 'S08');
  for (const definition of status(f.store.context(f.contentId), 'S08').requiredChecks) f.check(review.id, definition.id, definition.methods[0], { evidenceRef: video.id });
  f.action('record_decision', { targetRevisionId: review.id, decision: 'approved' });
  const article = f.artifact('article', { storageRef: { type: 'article_revision', kind: 'draft', slug: 'test-course', revision: hash }, filename: 'article.md' }).artifacts.at(-1);
  const draft = current(f.save('S09'), 'S09');
  for (const definition of status(f.store.context(f.contentId), 'S09').requiredChecks) f.check(draft.id, definition.id, definition.methods[0], { evidenceRef: article.id });
  assert.throws(() => f.action('complete'), { status: 422 });
  f.action('record_decision', { targetRevisionId: draft.id, decision: 'approved' });
  let result = f.action('complete');
  assert.equal(result.episode.status, 'completed');
  assert.match(result.episode.nextAction, /实际发布另行/);
  assert.equal(f.store.context(f.contentId, { displayTitle: '完成后修改了标题承诺' }).episode.status, 'active');
  assert.equal(f.store.get(f.contentId).status, 'completed');
  result = f.save('S06', '新台词使本期需要重新检查');
  assert.equal(result.episode.status, 'active');
  assert.equal(status(result, 'S08').status, 'needs_review');
  assert.throws(() => f.action('complete'), { status: 422 });
});

test('a later failed check supersedes earlier pass and revokes derived approval', (t) => {
  const f = fixture(t); f.start();
  const rev = current(f.save('S01'), 'S01');
  f.check(rev.id, 'title_promise', 'document_review');
  f.action('record_decision', { targetRevisionId: rev.id, decision: 'approved' });
  const result = f.check(rev.id, 'title_promise', 'document_review', { result: 'failed', limitations: '标题夸大了效果' });
  assert.notEqual(status(result, 'S01').status, 'approved');
  assert.equal(status(result, 'S01').canProceed, false);
  assert.equal(result.checks.length, 2);
});

test('a changed canonical title derives needs-review without writing or losing exact approval history', (t) => {
  const f = fixture(t); f.start();
  const first = current(f.save('S01', '旧标题与封面的承诺'), 'S01');
  assert.equal(first.titleSnapshot, '制作流程测试课程');
  f.check(first.id, 'title_promise', 'document_review');
  f.action('record_decision', { targetRevisionId: first.id, decision: 'approved' });
  const version = f.store.get(f.contentId).rowVersion;
  const result = f.store.context(f.contentId, { displayTitle: '新的标题承诺需要重新核对' });
  assert.equal(result.titleMismatch, true); assert.equal(result.titleSnapshot, '制作流程测试课程');
  assert.equal(result.episode.title, '新的标题承诺需要重新核对');
  assert.equal(status(result, 'S01').status, 'needs_review');
  assert.equal(status(result, 'S01').canProceed, false);
  assert.equal(result.checks[0].valid, false); assert.equal(result.decisions[0].valid, false);
  assert.equal(result.decisions[0].decision, 'approved');
  assert.equal(f.store.get(f.contentId).rowVersion, version);
  assert.equal(status(f.store.context(f.contentId), 'S01').status, 'approved');
  const handoff = f.store.exportHandoff(f.contentId, { displayTitle: '新的标题承诺需要重新核对' });
  assert.match(handoff.markdown, /^# 新的标题承诺需要重新核对：制作交接/);
  assert.equal(handoff.snapshot.titleMismatch, true);
  assert.equal(f.store.get(f.contentId).rowVersion, version);
});

test('pending title review rejects passing checks, approval and completion but allows drafts', (t) => {
  const f = fixture(t); f.start();
  const rev = current(f.save('S01'), 'S01'), displayTitle = '更改标题后尚未核对';
  const write = (operation, values = {}) => f.store.apply(f.contentId, { operation, expectedVersion: f.store.get(f.contentId).rowVersion, idempotencyKey: randomUUID(), ...values }, actor, { displayTitle });
  const version = f.store.get(f.contentId).rowVersion;
  assert.throws(() => write('record_check', { targetRevisionId: rev.id, checkId: 'title_promise', method: 'document_review', result: 'passed' }), { status: 409, code: 'TITLE_REVIEW_REQUIRED' });
  assert.throws(() => write('record_decision', { targetRevisionId: rev.id, decision: 'approved' }), { status: 409, code: 'TITLE_REVIEW_REQUIRED' });
  assert.throws(() => write('complete'), { status: 409, code: 'TITLE_REVIEW_REQUIRED' });
  assert.equal(f.store.get(f.contentId).rowVersion, version);
  const draft = write('save_stage_revision', { stageId: 'S06', content: '标题待复核时先保存不丢失的口播', inputRevisionIds: [rev.id] });
  assert.equal(current(draft, 'S06').content, '标题待复核时先保存不丢失的口播');
  assert.equal(status(draft, 'S06').status, 'needs_review');
  for (const forged of [{ displayTitle }, { titleSnapshot: displayTitle }]) assert.throws(() => f.action('save_stage_revision', { stageId: 'S01', content: '不能由客户端伪造标题绑定', ...forged }), { status: 422 });
});

test('new S01 title binding persistently invalidates even undeclared downstream dependencies and preserves retries', (t) => {
  const f = fixture(t); f.start();
  const request = { operation: 'save_stage_revision', expectedVersion: 1, idempotencyKey: randomUUID(), stageId: 'S01', content: '旧标题已选定方向' };
  const saved = f.store.apply(f.contentId, request, actor, { displayTitle: '制作流程测试课程' });
  const oldTitle = current(saved, 'S01');
  f.check(oldTitle.id, 'title_promise', 'document_review');
  f.action('record_decision', { targetRevisionId: oldTitle.id, decision: 'approved' });
  const goal = current(f.save('S02', '手动没有登记标题依赖的目标', { inputRevisionIds: [] }), 'S02');
  f.check(goal.id, 'single_goal', 'document_review');
  f.action('record_decision', { targetRevisionId: goal.id, decision: 'approved' });
  const video = f.artifact('video', { inputRevisionIds: [] }).artifacts.at(-1);
  f.check(video.id, 'media_playback', 'playback');
  const displayTitle = '新的标题承诺';
  const rebound = f.store.apply(f.contentId, { operation: 'save_stage_revision', expectedVersion: f.store.get(f.contentId).rowVersion, idempotencyKey: randomUUID(), stageId: 'S01', content: '根据新标题重新核对的封面方向' }, actor, { displayTitle });
  assert.equal(rebound.titleMismatch, false); assert.equal(current(rebound, 'S01').titleSnapshot, displayTitle);
  assert.equal(status(rebound, 'S01').status, 'in_progress');
  assert.equal(status(rebound, 'S02').status, 'needs_review');
  assert.equal(rebound.artifacts.find((item) => item.id === video.id).valid, false);
  assert.ok(rebound.checks.every(item => !item.valid)); assert.ok(rebound.decisions.every(item => !item.valid));
  assert.equal(status(f.store.context(f.contentId), 'S02').status, 'needs_review');
  const retried = f.store.apply(f.contentId, request, actor, { displayTitle });
  assert.equal(retried.replayed, true); assert.equal(retried.episode.rowVersion, saved.episode.rowVersion);
  assert.deepEqual(retried.stageRevisions, saved.stageRevisions);
  const returnedTitle = f.store.context(f.contentId, { displayTitle: '制作流程测试课程' });
  assert.equal(status(returnedTitle, 'S01').status, 'needs_review');
  assert.equal(returnedTitle.decisions.find(item => item.targetRevisionId === oldTitle.id).valid, false);
});

test('episode snapshots freeze rules and methods even when shipped definitions later change', (t) => {
  const f = fixture(t); f.start();
  const original = f.store.context(f.contentId), ruleRef = original.episode.rulesRef;
  const oldLabel = PRODUCTION_STAGES[0].requiredChecks[0].label;
  const oldMethods = [...ARTIFACT_CHECKS.audio[0].methods];
  try {
    PRODUCTION_STAGES[0].requiredChecks.push({ id: 'later_requirement', label: '升级后新增的门槛', methods: ['document_review'] });
    PRODUCTION_STAGES[0].requiredChecks[0].label = '新版标签';
    ARTIFACT_CHECKS.audio[0].methods.push('automated');
    let result = f.save('S01');
    assert.equal(status(result, 'S01').requiredChecks.length, 1);
    assert.equal(status(result, 'S01').requiredChecks[0].label, oldLabel);
    assert.equal(result.episode.rulesRef, ruleRef);
    assert.match(ruleRef, /^sha256:[a-f0-9]{64}$/);
    const audio = f.artifact('audio').artifacts.at(-1);
    assert.throws(() => f.check(audio.id, 'audio_voice', 'automated'), { status: 422 });
    const second = createProductionStore({ path: f.path });
    result = second.context(f.contentId); second.close();
    assert.equal(status(result, 'S01').requiredChecks.length, 1);
    assert.equal(result.episode.rulesRef, ruleRef);
    assert.deepEqual(result.episode.rulesSnapshot.artifactChecks.audio[0].methods, oldMethods);
  } finally {
    PRODUCTION_STAGES[0].requiredChecks.pop();
    PRODUCTION_STAGES[0].requiredChecks[0].label = oldLabel;
    ARTIFACT_CHECKS.audio[0].methods.splice(0, ARTIFACT_CHECKS.audio[0].methods.length, ...oldMethods);
  }
});

test('legacy episode without a rule snapshot requires explicit migration', (t) => {
  const f = fixture(t); f.start();
  const db = new DatabaseSync(f.path);
  const episode = f.store.get(f.contentId); delete episode.rulesSnapshot;
  db.prepare('UPDATE episodes SET payload=? WHERE id=?').run(JSON.stringify(episode), f.contentId); db.close();
  assert.throws(() => f.store.context(f.contentId), { status: 409, code: 'RULES_MIGRATION_REQUIRED' });
  assert.throws(() => f.save('S01'), { status: 409, code: 'RULES_MIGRATION_REQUIRED' });
  assert.equal(f.store.get(f.contentId).rowVersion, 1);
});

test('continuous grant cannot proceed past missing media, failed artifact checks or stale artifacts', (t) => {
  const f = fixture(t); f.start(); f.save('S06'); f.save('S08');
  let result = f.action('set_execution_grant', { allowedStageIds: ['S08'], allowedActions: ['draft'], sourceInstruction: '继续做完试看', stopConditions: '遇到事实或媒体问题时停止' });
  assert.equal(status(result, 'S08').canProceed, false);
  const video = f.artifact('video').artifacts.at(-1);
  const stage = current(f.save('S08'), 'S08');
  for (const definition of status(f.store.context(f.contentId), 'S08').requiredChecks) f.check(stage.id, definition.id, definition.methods[0], { evidenceRef: video.id });
  assert.equal(status(f.store.context(f.contentId), 'S08').canProceed, true);
  result = f.check(video.id, 'media_playback', 'playback', { result: 'failed', limitations: '实际音轨不符合指定音色' });
  assert.equal(status(result, 'S08').canProceed, false);
  f.save('S06', '需要重新录制的台词');
  result = f.save('S08', '新一轮检查说明，旧片尚未重制');
  assert.equal(status(result, 'S08').canProceed, false);
});

test('path validation refuses symlink directories, database symlinks and relative paths', (t) => {
  const root = mkdtempSync(join(realpathSync(tmpdir()), 'production-path-')); t.after(() => rmSync(root, { recursive: true, force: true }));
  mkdirSync(join(root, 'actual')); symlinkSync(join(root, 'actual'), join(root, 'alias'));
  assert.throws(() => createProductionStore({ path: join(root, 'alias', 'production.sqlite') }), /不安全/);
  writeFileSync(join(root, 'actual', 'target'), 'data'); symlinkSync(join(root, 'actual', 'target'), join(root, 'actual', 'linked.sqlite'));
  assert.throws(() => createProductionStore({ path: join(root, 'actual', 'linked.sqlite') }), /不安全/);
  assert.throws(() => createProductionStore({ path: 'relative.sqlite' }), /绝对/);
});
