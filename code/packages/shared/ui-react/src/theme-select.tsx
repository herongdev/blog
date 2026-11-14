import { useEffect, useId, useState } from 'react';
import { Check, ChevronDown, Monitor, Moon, Sun } from 'lucide-react';
import { Select } from './select.js';

export type ThemeChoice = 'system' | 'light' | 'dark';
export interface ThemeSelectProps { storageKey?: string; className?: string; defaultTheme?: ThemeChoice }
const themeItems = [
  { value: 'system', label: '跟随系统', icon: Monitor },
  { value: 'light', label: '浅色', icon: Sun },
  { value: 'dark', label: '深色', icon: Moon },
] satisfies { value: ThemeChoice; label: string; icon: typeof Sun }[];
function isTheme(value: unknown): value is ThemeChoice { return value === 'system' || value === 'light' || value === 'dark'; }

export function ThemeSelect({ storageKey = 'herong-theme', className, defaultTheme = 'system' }: ThemeSelectProps) {
  // Stable initial markup keeps server rendering and the hydration render equal.
  // Each application's pre-paint theme adapter remains the source of truth.
  const [theme, setTheme] = useState<ThemeChoice>(defaultTheme);
  const [status, setStatus] = useState({ message: '', warning: false });
  const statusId = useId();
  const CurrentIcon = themeItems.find((item) => item.value === theme)!.icon;
  useEffect(() => {
    const initial = document.documentElement.dataset.theme;
    setTheme(isTheme(initial) ? initial : defaultTheme);
    let storage: Storage | undefined;
    try { storage = window.localStorage; } catch { /* Storage can be unavailable while theme switching still works. */ }
    const onStorage = (event: StorageEvent) => {
      if ((storage && event.storageArea !== storage) || (event.key !== storageKey && event.key !== null)) return;
      const next = isTheme(event.newValue) ? event.newValue : defaultTheme;
      document.documentElement.dataset.theme = next;
      setTheme(next);
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [storageKey, defaultTheme]);
  const changeTheme = (value: ThemeChoice | null) => {
    if (!isTheme(value)) return;
    document.documentElement.dataset.theme = value;
    setTheme(value);
    try { localStorage.setItem(storageKey, value); setStatus({ message: '外观已保存', warning: false }); }
    catch { setStatus({ message: '外观已切换，但当前浏览器无法保存偏好。', warning: true }); }
  };
  return <div className={['hrui-theme-control', className].filter(Boolean).join(' ')} data-theme-choice={theme}>
    <Select.Root<ThemeChoice> items={themeItems} value={theme} onValueChange={changeTheme}>
      <Select.Trigger variant="ghost" aria-label="页面外观" aria-describedby={statusId}>
        <CurrentIcon aria-hidden="true" /><Select.Value /><Select.Icon><ChevronDown aria-hidden="true" /></Select.Icon>
      </Select.Trigger>
      <Select.Portal><Select.Positioner align="end" sideOffset={8}><Select.Popup className="hrui-theme-popup"><Select.List>
        {themeItems.map(({ value, label, icon: Icon }) => <Select.Item key={value} value={value}>
          <Icon aria-hidden="true" /><Select.ItemText>{label}</Select.ItemText><Select.ItemIndicator><Check aria-hidden="true" /></Select.ItemIndicator>
        </Select.Item>)}
      </Select.List></Select.Popup></Select.Positioner></Select.Portal>
    </Select.Root>
    <span id={statusId} className="hrui-theme-status" data-warning={status.warning || undefined} role="status" aria-live="polite">{status.message}</span>
  </div>;
}
