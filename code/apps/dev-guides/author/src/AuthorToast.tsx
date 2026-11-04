import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import * as Toast from '@radix-ui/react-toast';
import { Check, Info, X } from 'lucide-react';
import IconButton from './IconButton';

type Tone = 'success' | 'info';
type Notice = { id: number; message: string; tone: Tone };
type Notify = (message: string, tone?: Tone) => void;
const ToastContext = createContext<Notify | null>(null);

function ToastNotice({ notice, remove }: { notice: Notice; remove: (id: number) => void }) {
  const [open, setOpen] = useState(true);
  useEffect(() => {
    if (open) return;
    // Radix Presence keeps the closed item for its exit animation. Remove the
    // application entry afterwards, including when reduced motion skips it.
    const timer = window.setTimeout(() => remove(notice.id), 180);
    return () => window.clearTimeout(timer);
  }, [open, notice.id, remove]);
  const Icon = notice.tone === 'success' ? Check : Info;
  return <Toast.Root className="author-toast" data-tone={notice.tone} open={open} onOpenChange={setOpen} duration={notice.message.length > 50 ? 7000 : 5000} type="foreground">
    <Icon className="author-toast-icon" size={18} aria-hidden="true" />
    <Toast.Description className="author-toast-description">{notice.message}</Toast.Description>
    <Toast.Close asChild><IconButton className="author-toast-close" aria-label="关闭提示"><X size={16} aria-hidden="true" /></IconButton></Toast.Close>
  </Toast.Root>;
}

/** Transient operation feedback belongs outside page flow and survives tab changes. */
export function AuthorToastProvider({ children }: { children: ReactNode }) {
  const [notices, setNotices] = useState<Notice[]>([]);
  const nextId = useRef(0);
  const notify = useCallback<Notify>((message, tone = 'success') => {
    if (!message.trim()) return;
    const notice = { id: ++nextId.current, message, tone };
    // Bound bursts without collapsing a later repeat of the same operation.
    setNotices((current) => [...current, notice].slice(-3));
  }, []);
  const remove = useCallback((id: number) => setNotices((current) => current.filter((notice) => notice.id !== id)), []);
  return <ToastContext.Provider value={notify}><Toast.Provider label="操作提示" swipeDirection="right">
    {children}
    {notices.map((notice) => <ToastNotice key={notice.id} notice={notice} remove={remove} />)}
    {typeof document !== 'undefined' && createPortal(<Toast.Viewport className="author-toast-viewport" label="操作提示（按 {hotkey} 聚焦）" hotkey={['F8']} />, document.body)}
  </Toast.Provider></ToastContext.Provider>;
}

export function useToast(): Notify {
  const notify = useContext(ToastContext);
  if (!notify) throw new Error('useToast must be used within AuthorToastProvider');
  return notify;
}
