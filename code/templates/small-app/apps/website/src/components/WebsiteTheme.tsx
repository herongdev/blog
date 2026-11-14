import { CSPProvider, ThemeToggle } from '@herongxhr/ui-react';

export function WebsiteTheme({ storageKey }: { storageKey: string }) {
  return <CSPProvider disableStyleElements><ThemeToggle storageKey={storageKey} defaultTheme="system" /></CSPProvider>;
}
