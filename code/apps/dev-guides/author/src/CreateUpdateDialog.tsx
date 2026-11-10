import { AuthorButton, AuthorField, AuthorTextarea } from './AuthorUI';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { ArrowRight, LoaderCircle, RefreshCw } from 'lucide-react';
import AuthorDialogContent from './AuthorDialogContent';
import AuthorSelect from './AuthorSelect';
import { updateReasons, updateScopes, type ContentUpdate, type ContentUpdates, type UpdateReason, type UpdateScope } from './content-updates';
import './content-updates.css';

type Entry = { slug: string; kind: 'draft' | 'content'; title: string };
type Request = <T>(path: string, options?: RequestInit) => Promise<T>;
export default function CreateUpdateDialog({ entry, sourceWeek, request, onClose, onCreated, onContinue }: {
  entry: Entry | null; sourceWeek?: string; request: Request; onClose: () => void;
  onCreated: (task: ContentUpdate) => void; onContinue: (task: ContentUpdate) => void;
}) {
  const [reason, setReason] = useState<UpdateReason>('adapt');
  const [scope, setScope] = useState<UpdateScope>('both');
  const [note, setNote] = useState(''); const [error, setError] = useState('');
  const [busy, setBusy] = useState(false); const [existing, setExisting] = useState<ContentUpdate | null>(null);
  const [expectedRevision, setExpectedRevision] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const requestId = useRef(''); const lock = useRef(false); const trigger = useRef<HTMLElement | null>(null);
  const submitPayload = useRef<Record<string, unknown> | null>(null);
  useEffect(() => {
    if (!entry) return;
    trigger.current = document.activeElement as HTMLElement; requestId.current = crypto.randomUUID(); submitPayload.current = null;
    setReason('adapt'); setScope('both'); setNote(''); setError(''); setExisting(null); setExpectedRevision(null); setLoading(true);
    let active = true;
    void Promise.all([request<{ workingRevision: string }>(`/api/article-revisions/${entry.kind}/${entry.slug}`), request<ContentUpdates>(`/api/content-updates?slug=${encodeURIComponent(entry.slug)}`)]).then(([revision, updates]) => { if (active) { setExpectedRevision(revision.workingRevision); setExisting(updates.activeTask); } }).catch((problem) => { if (active) setError((problem as Error).message); }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [entry?.slug, entry?.kind, entry?.title, request]);
  const submit = async (event: FormEvent) => {
    event.preventDefault(); if (!entry || lock.current || loading || !expectedRevision || existing) return;
    lock.current = true; setBusy(true); setError('');
    // Retain the exact payload after uncertain network errors. A retry uses the
    // same request identity and cannot create a second production round.
    submitPayload.current ??= { slug: entry.slug, kind: entry.kind, reason, scope, note: note.trim(), ...(sourceWeek ? { sourceWeek } : {}), expectedRevision, requestId: requestId.current };
    try {
      const result = await request<{ task: ContentUpdate }>('/api/content-updates', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(submitPayload.current) });
      onCreated(result.task); onClose();
    } catch (problem) {
      setError((problem as Error).message);
      if ((problem as Error & { status?: number }).status === 409) {
        submitPayload.current = null; requestId.current = crypto.randomUUID();
        try { const updates = await request<ContentUpdates>(`/api/content-updates?slug=${encodeURIComponent(entry.slug)}`); setExisting(updates.activeTask); const current = await request<{ workingRevision: string }>(`/api/article-revisions/${entry.kind}/${entry.slug}`); setExpectedRevision(current.workingRevision); } catch { setExpectedRevision(null); }
      }
    } finally { lock.current = false; setBusy(false); }
  };
  const locked = busy || loading || Boolean(submitPayload.current);
  return <Dialog.Root open={Boolean(entry)} onOpenChange={(open) => { if (!open && !lock.current) onClose(); }}><AuthorDialogContent className="update-create-dialog" title="创建更新任务" description="沿用这篇教程的正文和素材，旧版本与发布记录保留。新任务会加入候选列表最前。" closeLabel="关闭创建更新" closeDisabled={busy} onEscapeKeyDown={(event) => { if (lock.current) event.preventDefault(); }} onPointerDownOutside={(event) => { if (lock.current) event.preventDefault(); }} onCloseAutoFocus={(event) => { event.preventDefault(); if (trigger.current?.isConnected) trigger.current.focus(); }}>
    <p className="update-content-title">{entry?.title}</p>
    {loading ? <p className="update-muted" role="status"><LoaderCircle size={17} className="spin" aria-hidden="true" />正在核对当前版本…</p> : existing ? <div className="update-existing"><p>这篇教程已有进行中的更新：{updateReasons[existing.reason]} · {updateScopes[existing.scope]}。</p><AuthorButton variant="primary" type="button"  onClick={() => { onContinue(existing); onClose(); }}>继续这次更新<ArrowRight size={17} aria-hidden="true" /></AuthorButton></div> : <form onSubmit={(event) => void submit(event)}>
      <div className="update-create-fields"><AuthorField className="update-field" label="更新原因"><AuthorSelect value={reason} onValueChange={(value) => setReason(value as UpdateReason)} label="更新原因" disabled={locked} options={Object.entries(updateReasons).map(([value, label]) => ({ value, label }))} /></AuthorField><AuthorField className="update-field" label="更新范围"><AuthorSelect value={scope} onValueChange={(value) => setScope(value as UpdateScope)} label="更新范围" disabled={locked} options={Object.entries(updateScopes).map(([value, label]) => ({ value, label }))} /></AuthorField></div>
      <AuthorField className="update-field" label="这次改什么（选填）"><AuthorTextarea rows={3} maxLength={2000} value={note} disabled={locked} onChange={(event) => setNote(event.target.value)} placeholder="例如：补录新版入口，修正第二步操作" /></AuthorField>
      {error && <p className="field-error" role="alert">{error}</p>}{!loading && !expectedRevision && <AuthorButton variant="secondary" type="button"  onClick={async () => { if (!entry || lock.current) return; setLoading(true); setError(''); try { const [revision, updates] = await Promise.all([request<{ workingRevision: string }>(`/api/article-revisions/${entry.kind}/${entry.slug}`), request<ContentUpdates>(`/api/content-updates?slug=${encodeURIComponent(entry.slug)}`)]); setExpectedRevision(revision.workingRevision); setExisting(updates.activeTask); } catch (problem) { setError((problem as Error).message); } finally { setLoading(false); } }}>重新读取版本</AuthorButton>}
      <div className="library-dialog-actions"><Dialog.Close asChild><AuthorButton variant="secondary" type="button"  disabled={busy}>取消</AuthorButton></Dialog.Close><AuthorButton variant="primary" type="submit"  disabled={busy || loading || !expectedRevision}>{busy ? <LoaderCircle size={17} className="spin" aria-hidden="true" /> : <RefreshCw size={17} aria-hidden="true" />}{busy ? '正在创建…' : submitPayload.current ? '重试创建' : '创建并加入候选'}</AuthorButton></div>
    </form>}{existing && error && <p className="field-error" role="alert">{error}</p>}
  </AuthorDialogContent></Dialog.Root>;
}
