import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Dialog } from '@herongxhr/ui-react';
import { Copy, Plus, X } from 'lucide-react';
import { api, ApiError, text } from './api';
import { Button, DialogForm, Field, SelectField, date, errorText, id, platformRoles, roleOptions, roles, statusOptions, useToast } from './ui';
import type { App, Client, Invite, Member, Page, Permission, Role, User } from './types';

export interface Secret { title: string; value: string; configuration?: unknown; note?: string }
export interface Saved { message?: string; app?: App; secret?: Secret }
export type Editor =
  | { kind: 'app'; app?: App }
  | { kind: 'client'; app: App; client?: Client }
  | { kind: 'rotate'; client: Client }
  | { kind: 'user'; user: User }
  | { kind: 'revoke-user'; user: User }
  | { kind: 'member'; appId: string; member: Member }
  | { kind: 'add-member'; appId: string; members: Member[] }
  | { kind: 'invite'; appId: string }
  | { kind: 'change-invite'; invite: Invite; approve: boolean }
  | { kind: 'secret'; secret: Secret };
interface Props { editor: Editor; onClose: () => void; onSaved: (result: Saved) => void }
function useCompletion(onClose: () => void, onSaved: (result: Saved) => void) {
  const result = useRef<Saved>({});
  return { result, finish: (saved: boolean) => { onClose(); if (saved) onSaved(result.current); } };
}
export function Editors({ editor, onClose, onSaved }: Props) {
  if (editor.kind === 'app') return <AppEditor app={editor.app} onClose={onClose} onSaved={onSaved} />;
  if (editor.kind === 'client') return <ClientEditor {...editor} onClose={onClose} onSaved={onSaved} />;
  if (editor.kind === 'add-member') return <AddMember {...editor} onClose={onClose} onSaved={onSaved} />;
  if (editor.kind === 'invite') return <InviteEditor appId={editor.appId} onClose={onClose} onSaved={onSaved} />;
  if (editor.kind === 'secret') return <SecretDialog secret={editor.secret} onClose={onClose} />;
  return <SimpleEditor editor={editor} onClose={onClose} onSaved={onSaved} />;
}
function AppEditor({ app, onClose, onSaved }: { app?: App; onClose: () => void; onSaved: (value: Saved) => void }) {
  const { result, finish } = useCompletion(onClose, onSaved);
  const nextId = useRef(0);
  const [permissions, setPermissions] = useState(() => (app?.permissionCatalog || []).map((p) => ({ ...p, rowId: nextId.current++ })));
  const [status, setStatus] = useState(app?.status || 'active');
  const addRef = useRef<HTMLButtonElement>(null);
  const change = (index: number, update: Partial<Permission>) => setPermissions((rows) => rows.map((row, i) => i === index ? { ...row, ...update } : row));
  return <DialogForm title={app ? '编辑应用' : '创建应用'} submitLabel={app ? '保存修改' : '创建应用'} wide onClose={finish} onSubmit={async (data) => {
    const permissionCatalog = permissions.map(({ key, label, roles }) => ({ key: key.trim(), label: label.trim(), roles }));
    const prefix = `${app?.slug || text(data, 'id')}.`;
    if (permissionCatalog.some((p) => !p.key.startsWith(prefix))) throw new Error(`权限标识必须以 ${prefix} 开头。`);
    if (new Set(permissionCatalog.map((p) => p.key)).size !== permissionCatalog.length) throw new Error('权限标识不能重复。');
    const body = { ...(app ? { version: app.version, status: text(data, 'status') } : { id: text(data, 'id') }), name: text(data, 'name'), description: text(data, 'description'), homepageUrl: text(data, 'homepageUrl'), permissionCatalog };
    const response = await api<{ item: App }>(app ? `/apps/${id(app.id)}` : '/apps', { method: app ? 'PATCH' : 'POST', body });
    result.current = { app: response.item, message: app ? '应用已更新。' : '应用已创建。' };
  }}>
    <Field label="应用标识" name="id" defaultValue={app?.slug || ''} required readOnly={!!app} maxLength={64} minLength={2} pattern="[a-z](?:[a-z0-9_]|-){1,63}" help="2 到 64 位，以小写字母开头，可含小写字母、数字、下划线或短横线。创建后不可修改。" />
    <Field label="应用名称" name="name" defaultValue={app?.name || ''} required maxLength={100} />
    <Field label="应用说明" name="description" defaultValue={app?.description || ''} textarea maxLength={1000} />
    <Field label="主页地址" name="homepageUrl" defaultValue={app?.homepageUrl || ''} type="url" maxLength={2048} />
    {app && <SelectField label="状态" name="status" options={statusOptions(app.status)} value={status} onValueChange={setStatus} />}
    <section className="permission-editor"><div className="section-title compact"><div><h3>权限目录</h3><p>按应用真实能力填写，留空表示尚未定义。</p></div><button ref={addRef} type="button" className="button" disabled={permissions.length >= 64} onClick={() => setPermissions((rows) => [...rows, { rowId: nextId.current++, key: '', label: '', roles: ['owner'] }])}><Plus aria-hidden="true" />添加权限</button></div>
      {permissions.map((permission, index) => <fieldset key={permission.rowId} className="permission-editor-row"><legend className="sr-only">一项应用权限</legend><Field label="权限标识" name={`permission-key-${permission.rowId}`} value={permission.key} onChange={(e) => change(index, { key: e.target.value })} maxLength={128} required /><Field label="权限名称" name={`permission-label-${permission.rowId}`} value={permission.label} onChange={(e) => change(index, { label: e.target.value })} maxLength={100} required /><div className="role-checks"><span>适用角色</span>{Object.entries(roles).map(([key, label]) => <label key={key}><input type="checkbox" checked={key === 'owner' || permission.roles.includes(key as Role)} disabled={key === 'owner'} onChange={(e) => change(index, { roles: e.target.checked ? [...permission.roles, key as Role] : permission.roles.filter((r) => r !== key) })} />{label}</label>)}</div><button type="button" className="icon-button" aria-label="移除此权限" onClick={() => { setPermissions((rows) => rows.filter((_, i) => i !== index)); addRef.current?.focus(); }}><X aria-hidden="true" /></button></fieldset>)}
    </section>
  </DialogForm>;
}
function ClientEditor({ app, client, onClose, onSaved }: { app: App; client?: Client; onClose: () => void; onSaved: (value: Saved) => void }) {
  const { result, finish } = useCompletion(onClose, onSaved);
  const [enabled, setEnabled] = useState(String(client?.enabled ?? true));
  return <DialogForm title={client ? '编辑登录客户端' : '创建登录客户端'} submitLabel={client ? '保存修改' : '创建并显示密钥'} onClose={finish} onSubmit={async (data) => {
    const redirectUris = text(data, 'redirectUris').split(/\r?\n/).map((uri) => uri.trim()).filter(Boolean);
    if (redirectUris.length < 1 || redirectUris.length > 8) throw new Error('请填写 1 到 8 个回调地址。');
    for (const uri of redirectUris) { try { const parsed = new URL(uri); if (uri.length > 2048 || parsed.protocol !== 'https:' || parsed.search || parsed.hash || parsed.username || parsed.password || parsed.href !== uri) throw new Error(); } catch { throw new Error('回调地址必须是规范 HTTPS 地址，不能含查询参数、片段或用户名密码。根路径地址请保留末尾的 /。'); } }
    const body = { name: text(data, 'name'), redirectUris, ...(client ? { enabled: text(data, 'enabled') === 'true', version: client.version } : { clientId: text(data, 'clientId') }) };
    const response = await api<{ item: Client; secret?: string; configuration?: unknown }>(client ? `/clients/${id(client.clientId)}` : `/apps/${id(app.id)}/clients`, { method: client ? 'PATCH' : 'POST', body });
    result.current = { message: client ? '客户端已更新。' : '客户端已创建。', ...(response.secret ? { secret: { title: '保存客户端密钥', value: response.secret, configuration: response.configuration } } : {}) };
  }}>
    <Field label="客户端标识" name="clientId" defaultValue={client?.clientId || ''} required readOnly={!!client} maxLength={64} minLength={2} pattern="[a-z](?:[a-z0-9_]|-){1,63}" />
    <Field label="客户端名称" name="name" defaultValue={client?.name || ''} required maxLength={100} />
    <Field label="允许的回调地址" name="redirectUris" defaultValue={client?.redirectUris.join('\n') || ''} required textarea help="每行一个规范 HTTPS 地址，共 1 到 8 个；不能含查询参数、片段或用户名密码。必须与接入服务配置一致。" />
    {client ? <SelectField label="状态" name="enabled" options={[{ value: 'true', label: '启用' }, { value: 'false', label: '停用' }]} value={enabled} onValueChange={setEnabled} /> : <p className="context-note">创建成功后仅显示一次客户端密钥，请在接入服务的安全配置中保存。</p>}
  </DialogForm>;
}
function SimpleEditor({ editor, onClose, onSaved }: { editor: Extract<Editor, { kind: 'rotate' | 'user' | 'revoke-user' | 'member' | 'change-invite' }>; onClose: () => void; onSaved: (value: Saved) => void }) {
  const { result, finish } = useCompletion(onClose, onSaved);
  let title = '', submitLabel = '', danger = false, children: ReactNode;
  let submit: (data: FormData) => Promise<void>;
  if (editor.kind === 'rotate') {
    const client = editor.client; title = '轮换客户端密钥'; submitLabel = '轮换并显示新密钥';
    children = <><p>为 <strong>{client.name || client.clientId}</strong> 生成新密钥。请准备更新接入服务的安全配置。</p><p className="context-note">旧密钥的有效截止时间由服务端返回；轮换完成后会一并显示。</p></>;
    submit = async () => { const response = await api<{ secret: string; previousSecretUntil?: string | number }>(`/clients/${id(client.clientId)}/rotate-secret`, { method: 'POST', body: { version: client.version } }); result.current = { secret: { title: '保存新客户端密钥', value: response.secret, note: response.previousSecretUntil ? `旧密钥有效至 ${date(response.previousSecretUntil)}` : '服务端未提供旧密钥有效截止时间，请及时更新接入服务。' } }; };
  } else if (editor.kind === 'user') {
    const user = editor.user; title = '编辑用户'; submitLabel = '保存修改';
    children = <><Field label="显示名称" name="name" defaultValue={user.name} required maxLength={80} /><SelectField label="状态" name="status" options={statusOptions(user.status)} defaultValue={user.status} /><SelectField label="平台角色" name="platformRole" options={Object.entries(platformRoles).map(([value, label]) => ({ value, label }))} defaultValue={user.platformRole} /><p className="context-note">平台角色管理此身份后台。应用内权限在“权限分配”中单独设置。</p></>;
    submit = async (data) => { await api(`/users/${id(user.id)}`, { method: 'PATCH', body: { name: text(data, 'name'), status: text(data, 'status'), platformRole: text(data, 'platformRole'), version: user.version } }); result.current = { message: '用户已更新。' }; };
  } else if (editor.kind === 'revoke-user') {
    const user = editor.user; title = '撤销用户会话'; submitLabel = '确认撤销会话'; danger = true;
    children = <p>撤销 <strong>{user.name}</strong> 当前的登录会话。用户需要重新完成正常身份验证。</p>;
    submit = async () => { await api(`/users/${id(user.id)}/revoke-sessions`, { method: 'POST', body: { version: user.version } }); result.current = { message: '用户会话已撤销。' }; };
  } else if (editor.kind === 'member') {
    const member = editor.member; const subject = member.subject || member.userId || member.id || ''; title = '编辑成员权限'; submitLabel = '保存权限';
    children = <><p className="context-note">成员：{member.name || member.userName || '未命名用户'} · 内部标识末六位 {subject.slice(-6)}</p><SelectField label="应用角色" name="role" options={roleOptions} defaultValue={member.role} /><SelectField label="状态" name="status" options={statusOptions(member.status)} defaultValue={member.status} /></>;
    submit = async (data) => { if (!subject) throw new Error('缺少成员内部标识，请刷新后重试。'); await api(`/apps/${id(editor.appId)}/members/${id(subject)}`, { method: 'PUT', body: { role: text(data, 'role'), status: text(data, 'status'), version: member.version } }); result.current = { message: '成员权限已更新。' }; };
  } else {
    const { invite, approve } = editor; const claimant = invite.claimedBy || invite.claimantId || invite.claimantSubject || '';
    title = approve ? '确认领取人并批准加入' : '撤销邀请'; submitLabel = approve ? '核对无误，批准加入' : '确认撤销'; danger = !approve;
    children = approve ? <><p>请核对领取人后批准加入 <strong>{invite.appName || invite.appId}</strong>。</p><dl className="confirmation-facts"><div><dt>领取人</dt><dd>{invite.claimantName || '未提供'}</dd></div><div><dt>内部标识末六位</dt><dd>{claimant.slice(-6) || '未提供'}</dd></div><div><dt>邀请备注</dt><dd>{invite.label}</dd></div><div><dt>应用角色</dt><dd>{roles[invite.role]}</dd></div></dl></> : <p>撤销邀请“{invite.label || invite.id}”。撤销后，此邀请不能再用于加入应用。</p>;
    submit = async () => { if (approve && (!invite.claimantName || !claimant)) throw new Error('缺少可核对的领取人信息，请刷新后重试。'); await api(`/invites/${id(invite.id)}/${approve ? 'approve' : 'revoke'}`, { method: 'POST', body: { version: invite.version } }); result.current = { message: approve ? '已批准加入。' : '邀请已撤销。' }; };
  }
  return <DialogForm title={title} submitLabel={submitLabel} danger={danger} onClose={finish} onSubmit={submit}>{children}</DialogForm>;
}
function AddMember({ appId, members, onClose, onSaved }: { appId: string; members: Member[]; onClose: () => void; onSaved: (value: Saved) => void }) {
  const { result, finish } = useCompletion(onClose, onSaved);
  const [users, setUsers] = useState<Page<User>>({ items: [], total: 0, page: 1, pageSize: 50 }); const [query, setQuery] = useState(''); const [selected, setSelected] = useState(''); const [searching, setSearching] = useState(true); const [searchError, setSearchError] = useState('');
  const controller = useRef<AbortController | null>(null);
  const find = async (q: string) => { controller.current?.abort(); const next = new AbortController(); controller.current = next; setSearching(true); setSearchError(''); try { const response = await api<Page<User>>(`/users?${new URLSearchParams({ page: '1', pageSize: '50', status: 'active', q })}`, { signal: next.signal }); if (!next.signal.aborted) { setUsers(response); setSelected(''); } } catch (error) { if (!next.signal.aborted) setSearchError(errorText(error)); } finally { if (!next.signal.aborted) setSearching(false); } };
  useEffect(() => { void find(''); return () => controller.current?.abort(); }, []);
  return <DialogForm title="添加现有用户" submitLabel="添加成员" onClose={finish} onSubmit={async (data) => {
    const userId = text(data, 'userId'); if (!userId || !users.items.some((u) => u.id === userId && u.status === 'active')) throw new Error('请选择一位已验证用户。');
    if (members.some((m) => (m.subject || m.userId || m.id) === userId)) throw new Error('该用户已在此应用的成员列表中，请使用“编辑权限”修改或重新启用。');
    try { await api(`/apps/${id(appId)}/members/${id(userId)}`, { method: 'PUT', body: { role: text(data, 'role'), status: 'active', version: 0 } }); } catch (error) { if (error instanceof ApiError && error.status === 409) throw new Error(`${error.message} 如该用户已是应用成员，请刷新列表并使用“编辑权限”，本次不会覆盖已有权限。`); throw error; }
    result.current = { message: '已添加应用成员。' };
  }}>
    <p className="context-note">为已经完成身份验证的用户分配当前应用的角色，不改变其平台权限。</p>
    <div className="inline-search"><label className="field"><span>查找用户</span><input name="userQuery" value={query} maxLength={100} placeholder="用户名称或内部标识" onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); void find(query.trim()); } }} /></label><Button disabled={searching} onClick={() => void find(query.trim())}>{searching ? '查找中…' : '查找'}</Button></div>
    <SelectField label="已验证用户" name="userId" required disabled={searching} options={[{ value: '', label: '请选择已验证用户' }, ...users.items.map((u) => ({ value: u.id, label: `${u.name} · 内部标识末六位 ${u.id.slice(-6)}` }))]} value={selected} onValueChange={setSelected} />
    {searchError ? <p className="form-error" role="alert">{searchError}</p> : <p className="field-hint">{users.total > 50 ? '仅显示前 50 个匹配用户，请搜索缩小范围。' : users.total ? `找到 ${users.total} 位已验证用户。` : searching ? '正在读取用户…' : '暂无匹配的已验证用户。新用户请通过邀请完成身份验证。'}</p>}
    <SelectField label="应用角色" name="role" options={roleOptions} defaultValue="viewer" />
  </DialogForm>;
}
function InviteEditor({ appId, onClose, onSaved }: { appId: string; onClose: () => void; onSaved: (value: Saved) => void }) {
  const { result, finish } = useCompletion(onClose, onSaved);
  const [apps, setApps] = useState<Page<App>>({ items: [], total: 0, page: 1, pageSize: 50 }); const [query, setQuery] = useState(''); const [selected, setSelected] = useState(appId); const [searching, setSearching] = useState(true); const [searchError, setSearchError] = useState('');
  const controller = useRef<AbortController | null>(null);
  const find = async (q: string, initial = false) => { controller.current?.abort(); const next = new AbortController(); controller.current = next; setSearching(true); setSearchError(''); try { const response = await api<Page<App>>(`/apps?${new URLSearchParams({ page: '1', pageSize: '50', q })}`, { signal: next.signal }); if (initial && appId && !response.items.some((a) => a.id === appId)) { for (let page = 1; page <= 3; page++) { const exact = await api<Page<App>>(`/apps?page=${page}&pageSize=50`, { signal: next.signal }); const app = exact.items.find((a) => a.id === appId); if (app) { response.items.unshift(app); break; } if (page * 50 >= exact.total) break; } } if (!next.signal.aborted) { setApps(response); if (!initial || !response.items.some((a) => a.id === appId)) setSelected(''); } } catch (error) { if (!next.signal.aborted) setSearchError(errorText(error)); } finally { if (!next.signal.aborted) setSearching(false); } };
  useEffect(() => { void find('', true); return () => controller.current?.abort(); }, []);
  return <DialogForm title="创建邀请" submitLabel="创建一次性链接" onClose={finish} onSubmit={async (data) => {
    const chosen = text(data, 'appId'); if (!chosen || !apps.items.some((app) => app.id === chosen)) throw new Error('请选择应用。');
    const response = await api<{ item: Invite; url: string }>('/invites', { method: 'POST', body: { appId: chosen, role: text(data, 'role'), label: text(data, 'label') } });
    result.current = { secret: { title: '保存邀请链接', value: response.url, note: '请只发送给预期的领取人。链接不会在列表中再次显示。' } };
  }}>
    <div className="inline-search"><label className="field"><span>查找应用</span><input name="appQuery" value={query} maxLength={100} placeholder="应用名称或标识" onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); void find(query.trim()); } }} /></label><Button disabled={searching} onClick={() => void find(query.trim())}>{searching ? '查找中…' : '查找'}</Button></div>
    <SelectField label="邀请加入的应用" name="appId" options={[{ value: '', label: '请选择应用' }, ...apps.items.map((a) => ({ value: a.id, label: `${a.name} · ${a.slug}` }))]} required disabled={searching} value={selected} onValueChange={setSelected} />
    {searchError ? <p className="form-error" role="alert">{searchError}</p> : apps.total > 50 && <p className="field-hint">仅显示前 50 个匹配应用，请搜索缩小范围。</p>}
    <SelectField label="加入后的角色" name="role" options={roleOptions} defaultValue="viewer" />
    <Field label="邀请备注" name="label" required maxLength={200} help="填写便于核对领取人的说明。领取人验证身份后，仍需管理员确认。" />
  </DialogForm>;
}
function SecretDialog({ secret, onClose }: { secret: Secret; onClose: () => void }) {
  const [open, setOpen] = useState(true); const [value, setValue] = useState(secret.value); const [copying, setCopying] = useState(false); const field = useRef<HTMLTextAreaElement>(null); const notify = useToast();
  const opener = useRef(document.activeElement instanceof HTMLElement ? document.activeElement : null);
  const close = () => { setValue(''); setOpen(false); };
  return <Dialog.Root open={open} onOpenChange={(next) => { if (!next) close(); }} onOpenChangeComplete={(next) => { if (!next) onClose(); }}><Dialog.Portal><Dialog.Backdrop /><Dialog.Viewport><Dialog.Popup className="dialog" finalFocus={() => opener.current?.isConnected ? opener.current : document.querySelector<HTMLElement>('#main')}><header className="dialog-header"><Dialog.Title>{secret.title}</Dialog.Title><Dialog.Close className="icon-button" aria-label="关闭并清除本次显示内容"><X aria-hidden="true" /></Dialog.Close></header><div className="dialog-body"><Dialog.Description className="warning-text">以下内容仅显示一次。请复制并安全保存，关闭后无法再次查看。</Dialog.Description><label className="field"><span>需要保存的内容</span><textarea ref={field} rows={3} readOnly value={value} onCopy={() => setTimeout(close, 0)} /></label><Button disabled={copying || !value} onClick={async () => { setCopying(true); try { await navigator.clipboard.writeText(value); close(); notify('已复制，本次显示内容已清除，请妥善保存。'); } catch { field.current?.focus(); field.current?.select(); notify('无法自动复制，请复制已选中的内容。'); } finally { setCopying(false); } }}><Copy aria-hidden="true" />复制</Button>{secret.note && <p className="context-note">{secret.note}</p>}{secret.configuration !== undefined && <><h3>接入配置</h3><pre className="configuration">{JSON.stringify(secret.configuration, null, 2)}</pre></>}</div><footer className="dialog-footer"><Dialog.Close className="button primary">已保存，关闭</Dialog.Close></footer></Dialog.Popup></Dialog.Viewport></Dialog.Portal></Dialog.Root>;
}
