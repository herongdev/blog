import { createRoot } from 'react-dom/client';
import { CSPProvider } from '@herongxhr/ui-react';
import product from '@app/config/product.json';
import '@app/brand/base.css';
import '@herongxhr/ui-react/styles.css';
import './styles.css';
import { App } from './App';

document.title = `${product.name} · 管理后台`;
try {
  const theme = localStorage.getItem(`${product.id}-theme`);
  if (theme === 'light' || theme === 'dark' || theme === 'system') document.documentElement.dataset.theme = theme;
} catch {}
const root = document.querySelector<HTMLDivElement>('#app');
if (!root) throw new Error('Application root is missing.');
createRoot(root).render(<CSPProvider disableStyleElements><App /></CSPProvider>);
