import { ArrowUpRight } from 'lucide-react';
import { AccountMenu, ThemeToggle } from '@herongxhr/ui-react';
import product from '@app/config/product.json';
import { accountName, roleName, safeAvatarUrl, type Session } from './api';

export function Header({ session, loggingOut, onLogout }: { session: Session; loggingOut: boolean; onLogout: () => void }) {
  const avatar = safeAvatarUrl(session.avatarUrl);
  const name = accountName(session);
  return <header className="topbar">
    <div className="shell topbar-inner">
      <a className="brand admin-brand" href="/"><strong>{product.name}</strong><span>管理后台</span></a>
      <div className="top-actions">
        <a className="view-site" href="/">查看官网<ArrowUpRight aria-hidden="true" /></a>
        <ThemeToggle storageKey={`${product.id}-theme`} defaultTheme="system" />
      </div>
      {session.authenticated && <AccountMenu className="header-account" name={name} description={roleName(session.role)} avatarUrl={avatar} loggingOut={loggingOut} onLogout={onLogout} />}
    </div>
  </header>;
}
