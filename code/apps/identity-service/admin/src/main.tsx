import { createRoot } from 'react-dom/client';
import '@herong/site-chrome/brand.css';
import { initSiteChrome } from '@herong/site-chrome/client';
import { CSPProvider } from '@herongxhr/ui-react';
import '@herongxhr/design-tokens/tokens.css';
import '@herongxhr/ui-react/styles.css';
import './theme.css';
import './styles.css';
import { ToastProvider } from './ui';
import { AdminApp } from './app';
import { InvitePage } from './invite';

initSiteChrome(document);
createRoot(document.getElementById('app')!).render(<CSPProvider disableStyleElements><ToastProvider>{location.pathname.startsWith('/invite') ? <InvitePage /> : <AdminApp />}</ToastProvider></CSPProvider>);
