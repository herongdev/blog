import { createContext, useContext, useEffect, useId, useRef, useState, type ButtonHTMLAttributes, type ChangeEventHandler, type ReactNode } from 'react';
import { Dialog, SelectControl, ThemeToggle, type SelectControlProps } from '@herongxhr/ui-react';
import { ClipboardList, X } from 'lucide-react';
import { BRAND_LOGO_LIGHT_DATA_URL, BRAND_LOGO_DARK_DATA_URL } from '@herong/site-chrome';
import { setSiteTheme } from '@herong/site-chrome/client';

export const roles = { owner: '所有者', admin: '管理员', editor: '编辑者', viewer: '查看者' };
export const platformRoles = { platform_owner: '平台所有者', platform_admin: '平台管理员', none: '普通用户' };
export const statusNames: Record<string, string> = { active: '启用', enabled: '启用', disabled: '停用', suspended: '停用', pending: '待确认', open: '待领取', created: '待领取', issued: '待领取', claimed: '待确认', approved: '已批准', revoked: '已撤销', expired: '已过期', success: '成功', failure: '失败', denied: '已拒绝' };
export const roleOptions = Object.entries(roles).map(([value, label]) => ({ value, label }));
export function statusOptions(selected = 'active') { return (selected === 'pending' ? ['pending', 'active', 'disabled'] : ['active', 'disabled']).map((value) => ({ value, label: statusNames[value] })); }
export const id = encodeURIComponent;
export function date(value: unknown) { if (!value) return '未提供'; const d = new Date(typeof value === 'number' ? (value < 100000000000 ? value * 1000 : value) : String(value)); return Number.isNaN(d.getTime()) ? '未提供' : d.toLocaleString('zh-CN', { hour12: false }); }
export function errorText(error: unknown) { return error instanceof Error ? error.message : '操作未完成，请重试。'; }
export function Brand() { return <a className="brand" href="/admin/" aria-label="Herong 身份管理首页"><img className="brand-light" src={BRAND_LOGO_LIGHT_DATA_URL} alt="Herong" /><img className="brand-dark" src={BRAND_LOGO_DARK_DATA_URL} alt="Herong" /><span>身份管理</span></a>; }
export function ThemeControls() {
  return <ThemeToggle className="theme-actions" storageKey="herong-theme" defaultTheme="system" showSystemControl onThemeChange={(choice) => setSiteTheme(document, choice)} />;
}
export function Button({ variant = '', className = '', type = 'button', ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: string }) { return <button {...props} type={type} className={`button ${variant} ${className}`} />; }
export function Badge({ value }: { value: unknown }) { const raw = String(value ?? ''); const tone = ['active', 'enabled', 'approved', 'success'].includes(raw) ? 'success' : ['disabled', 'suspended', 'revoked', 'expired', 'failure', 'denied'].includes(raw) ? 'muted' : 'pending'; return <span className={`badge ${tone}`}>{statusNames[raw] || raw || '未提供'}</span>; }
export function NameCell({ name, secondary = '' }: { name: string; secondary?: string }) { return <><strong className="row-name">{name || '未命名'}</strong>{secondary && <small className="row-secondary">{secondary}</small>}</>; }
export function Empty({ title, children, action }: { title: string; children: ReactNode; action?: ReactNode }) { return <div className="empty-state"><ClipboardList aria-hidden="true" /><h2>{title}</h2><p>{children}</p>{action}</div>; }
export function Table({ headers, children }: { headers: string[]; children: ReactNode }) { return <div className="table-scroll" tabIndex={0} role="region" aria-label="数据表格，可横向滚动"><table><thead><tr>{headers.map((h) => <th key={h} scope="col">{h}</th>)}</tr></thead><tbody>{children}</tbody></table></div>; }
export interface FieldProps { label: string; name: string; defaultValue?: string; value?: string; required?: boolean; type?: string; help?: string; textarea?: boolean; readOnly?: boolean; maxLength?: number; minLength?: number; pattern?: string; onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> }
export function Field({ label, name, help, textarea, ...props }: FieldProps) {
  const fieldId = useId(); const helpId = `${fieldId}-help`;
  return <label className="field" htmlFor={fieldId}><span>{label}{props.required && <span className="required">必填</span>}</span>{textarea ? <textarea id={fieldId} name={name} rows={3} aria-describedby={help ? helpId : undefined} {...props} /> : <input id={fieldId} name={name} type="text" aria-describedby={help ? helpId : undefined} {...props} />}{help && <small id={helpId}>{help}</small>}</label>;
}
export { SelectControl };
export type { Option } from '@herongxhr/ui-react';
export function SelectField(props: SelectControlProps) { const labelId = useId(); return <div className="field"><span id={labelId}>{props.label}{props.required && <span className="required">必填</span>}</span><SelectControl {...props} labelledBy={labelId} /></div>; }

const ToastContext = createContext<(message: string) => void>(() => {});
export function ToastProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState(''); const timeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timeout.current), []);
  const notify = (next: string) => { clearTimeout(timeout.current); setMessage(next); timeout.current = setTimeout(() => setMessage(''), 5000); };
  return <ToastContext.Provider value={notify}>{children}{message && <div className="toast" role="status">{message}</div>}</ToastContext.Provider>;
}
export const useToast = () => useContext(ToastContext);
export interface DialogFormProps { title: string; submitLabel: string; children: ReactNode; onSubmit: (data: FormData, form: HTMLFormElement) => Promise<void>; onClose: (saved: boolean) => void; wide?: boolean; danger?: boolean; onClosed?: () => void }
export function DialogForm({ title, submitLabel, children, onSubmit, onClose, wide, danger }: DialogFormProps) {
  const [open, setOpen] = useState(true); const [busy, setBusy] = useState(false); const [error, setError] = useState(''); const saved = useRef(false); const submitting = useRef(false);
  const opener = useRef(document.activeElement instanceof HTMLElement ? document.activeElement : null);
  const errorRef = useRef<HTMLParagraphElement>(null);
  return <Dialog.Root open={open} onOpenChange={(next, details) => { if (!next && submitting.current) { details.cancel(); return; } setOpen(next); }} onOpenChangeComplete={(next) => { if (!next) onClose(saved.current); }}>
    <Dialog.Portal><Dialog.Backdrop /><Dialog.Viewport><Dialog.Popup className={`dialog ${wide ? 'dialog-wide' : ''}`} finalFocus={() => opener.current?.isConnected ? opener.current : document.querySelector<HTMLElement>('#main')}>
      <form aria-busy={busy} onSubmit={async (event) => { event.preventDefault(); if (submitting.current) return; const form = event.currentTarget; if (!form.reportValidity()) return; const data = new FormData(form); submitting.current = true; setBusy(true); setError(''); try { await onSubmit(data, form); saved.current = true; submitting.current = false; setBusy(false); setOpen(false); } catch (cause) { setError(errorText(cause)); submitting.current = false; setBusy(false); requestAnimationFrame(() => errorRef.current?.scrollIntoView({ block: 'nearest' })); } }}>
        <header className="dialog-header"><Dialog.Title>{title}</Dialog.Title><Dialog.Close className="icon-button" disabled={busy} aria-label="关闭"><X aria-hidden="true" /></Dialog.Close></header>
        <div className="dialog-body"><Dialog.Description className="sr-only">填写并提交此表单；取消会关闭弹窗。</Dialog.Description><fieldset className="dialog-fields" disabled={busy}>{children}</fieldset>{error && <p ref={errorRef} className="form-error" role="alert">{error}</p>}</div>
        <footer className="dialog-footer"><Dialog.Close className="button" disabled={busy}>取消</Dialog.Close><Button type="submit" variant={danger ? 'danger' : 'primary'} disabled={busy}>{busy ? '正在提交…' : submitLabel}</Button></footer>
      </form>
    </Dialog.Popup></Dialog.Viewport></Dialog.Portal>
  </Dialog.Root>;
}
