import { useEffect, useId, useRef, useState } from 'react';
import { Monitor, Moon, Sun } from 'lucide-react';
import type { ThemeChoice } from './theme-select.js';

export type ResolvedTheme = 'light' | 'dark';
export interface ThemeToggleProps {
  storageKey?: string;
  defaultTheme?: ThemeChoice;
  className?: string;
  showSystemControl?: boolean;
  /** Runs only after a user action. A boolean result reports adapter persistence. */
  onThemeChange?: (choice: ThemeChoice, resolved: ResolvedTheme) => boolean | void;
}
const CHANGE_EVENT = 'herong:ui-theme-change';
function choice(value: unknown): ThemeChoice | null {
  return value === 'auto' ? 'system' : value === 'light' || value === 'dark' || value === 'system' ? value : null;
}

export function ThemeToggle({ storageKey = 'herong-theme', defaultTheme = 'system', className, showSystemControl = false, onThemeChange }: ThemeToggleProps) {
  const [mounted, setMounted] = useState(false);
  const [preference, setPreference] = useState<ThemeChoice>(defaultTheme);
  const [resolved, setResolved] = useState<ResolvedTheme>('light');
  const [status, setStatus] = useState({ message: '', warning: false });
  const preferenceRef = useRef<ThemeChoice>(defaultTheme);
  const callbackRef = useRef(onThemeChange);
  const changeRef = useRef<((next: ThemeChoice | 'toggle') => void) | null>(null);
  const statusId = useId();
  callbackRef.current = onThemeChange;

  useEffect(() => {
    const root = document.documentElement;
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    let storage: Storage | undefined;
    let saved: ThemeChoice | null = null;
    try { storage = window.localStorage; saved = choice(storage.getItem(storageKey)); } catch { /* The current page can still change its theme. */ }
    const resolveChoice = (next: ThemeChoice): ResolvedTheme => next === 'system' ? media.matches ? 'dark' : 'light' : next;
    const rootPreference = () => choice(root.dataset.hrThemePreference) || choice(root.dataset.themePreference);
    const rootResolved = (): ResolvedTheme => {
      const current = choice(root.dataset.theme);
      return current === 'light' || current === 'dark' ? current : resolveChoice(preferenceRef.current);
    };
    function apply(next: ThemeChoice) {
      preferenceRef.current = next;
      setPreference(next);
      const actual = resolveChoice(next);
      root.dataset.themePreference = next;
      // Keep the established Herong pre-paint preference meaningful; its adapter
      // synchronizes the legacy controller and storage keys after user actions.
      if (root.dataset.hrThemePreference !== undefined) root.dataset.hrThemePreference = next === 'system' ? 'auto' : next;
      root.dataset.theme = actual;
      setResolved(actual);
      return actual;
    }
    apply(rootPreference() || saved || (root.dataset.theme === 'system' ? 'system' : defaultTheme));
    function onSystemChange() { if (preferenceRef.current === 'system') apply('system'); }
    function onStorage(event: StorageEvent) {
      if ((storage && event.storageArea !== storage) || (event.key !== storageKey && event.key !== null)) return;
      apply(choice(event.newValue) || defaultTheme);
      setStatus({ message: '', warning: false });
    }
    function onSharedChange(event: Event) {
      const detail = (event as CustomEvent<{ storageKey?: string; choice?: unknown; saved?: boolean }>).detail;
      const next = choice(detail?.choice);
      if (detail?.storageKey !== storageKey || !next) return;
      apply(next);
      if (detail.saved) setStatus({ message: '', warning: false });
    }
    const observer = new MutationObserver(() => {
      // A resolved dark/light attribute changing does not turn a system
      // preference into an explicit choice. Observe preference separately.
      const next = rootPreference();
      if (next) { preferenceRef.current = next; setPreference(next); }
      setResolved(rootResolved());
    });
    observer.observe(root, { attributes: true, attributeFilter: ['data-theme', 'data-theme-preference', 'data-hr-theme-preference'] });
    media.addEventListener('change', onSystemChange);
    window.addEventListener('storage', onStorage);
    window.addEventListener(CHANGE_EVENT, onSharedChange);
    changeRef.current = (requested) => {
      const next = requested === 'toggle' ? rootResolved() === 'dark' ? 'light' : 'dark' : requested;
      const actual = apply(next);
      let persisted = true;
      try { window.localStorage.setItem(storageKey, next); } catch { persisted = false; }
      try {
        const adapted = callbackRef.current?.(next, actual);
        if (typeof adapted === 'boolean') persisted = adapted;
      } catch { persisted = false; }
      // Notify other controls in this document without synthesizing native
      // storage events or rereading stale storage after a failed save.
      window.dispatchEvent(new CustomEvent(CHANGE_EVENT, { detail: { storageKey, choice: next, saved: persisted } }));
      setStatus(persisted
        ? { message: next === 'system' ? '已跟随系统主题' : next === 'dark' ? '已切换为深色模式' : '已切换为浅色模式', warning: false }
        : { message: '外观已切换，但当前浏览器无法保存偏好。', warning: true });
    };
    setMounted(true);
    return () => {
      changeRef.current = null;
      observer.disconnect();
      media.removeEventListener('change', onSystemChange);
      window.removeEventListener('storage', onStorage);
      window.removeEventListener(CHANGE_EVENT, onSharedChange);
    };
  }, [storageKey, defaultTheme]);

  const action = mounted ? resolved === 'dark' ? '切换为浅色模式' : '切换为深色模式' : '切换外观';
  return <div className={['hrui-theme-toggle', className].filter(Boolean).join(' ')} data-theme-choice={preference}>
    <button type="button" className="hrui-theme-toggle-button" disabled={!mounted} aria-label={action} title={action} aria-describedby={statusId} onClick={() => changeRef.current?.('toggle')}>
      <span className="hrui-theme-toggle-icons" aria-hidden="true"><Sun className="hrui-theme-toggle-icon hrui-theme-toggle-sun" /><Moon className="hrui-theme-toggle-icon hrui-theme-toggle-moon" /></span>
    </button>
    {showSystemControl && <button type="button" className="hrui-theme-toggle-button hrui-theme-toggle-system" disabled={!mounted} aria-label="跟随系统主题" title="跟随系统主题" aria-pressed={mounted && preference === 'system'} aria-describedby={statusId} onClick={() => changeRef.current?.('system')}><Monitor aria-hidden="true" /></button>}
    <span id={statusId} className="hrui-theme-status" data-warning={status.warning || undefined} role="status" aria-live="polite" aria-atomic="true">{status.message}</span>
  </div>;
}
