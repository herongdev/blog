import { Menu } from '@base-ui/react/menu';
import { ChevronDown, LogOut } from 'lucide-react';
import { Avatar } from './avatar.js';

export interface AccountMenuProps {
  name: string;
  description?: string;
  avatarUrl?: string;
  loggingOut?: boolean;
  logoutDisabled?: boolean;
  onLogout: () => void;
  className?: string;
}

export function AccountMenu({ name, description, avatarUrl, loggingOut = false, logoutDisabled = false, onLogout, className }: AccountMenuProps) {
  const displayName = name.trim() || '已登录账号';
  const detail = description?.trim();
  return <div className={['hrui-account-menu', className].filter(Boolean).join(' ')}>
    <Menu.Root modal={false}>
      <Menu.Trigger className="hrui-account-trigger" aria-label={`打开${displayName}的账号菜单`}>
        <Avatar src={avatarUrl} alt="" size="small" />
        <span className="hrui-account-trigger-name">{displayName}</span>
        <ChevronDown className="hrui-account-chevron" aria-hidden="true" />
      </Menu.Trigger>
      <Menu.Portal><Menu.Positioner className="hrui-account-positioner" side="bottom" align="end" sideOffset={8}>
        <Menu.Popup className="hrui-account-popup" aria-label={`${displayName}的账号菜单`}>
          <div className="hrui-account-summary">
            <Avatar src={avatarUrl} alt="" />
            <div className="hrui-account-identity"><strong>{displayName}</strong>{detail && <span>{detail}</span>}</div>
          </div>
          <Menu.Separator className="hrui-account-separator" />
          <Menu.Item className="hrui-account-logout" closeOnClick={false} disabled={loggingOut || logoutDisabled} aria-busy={loggingOut || undefined} label="退出登录" onClick={() => { if (!loggingOut && !logoutDisabled) onLogout(); }}>
            <LogOut aria-hidden="true" /><span>{loggingOut ? '正在退出…' : '退出登录'}</span>
          </Menu.Item>
        </Menu.Popup>
      </Menu.Positioner></Menu.Portal>
    </Menu.Root>
  </div>;
}
