import { Avatar as BaseAvatar } from '@base-ui/react/avatar';
import { UserRound } from 'lucide-react';

export interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'small' | 'medium';
  className?: string;
}

export function Avatar({ src, alt = '用户头像', size = 'medium', className }: AvatarProps) {
  return <BaseAvatar.Root key={src || ''} className={['hrui-avatar', className].filter(Boolean).join(' ')} data-size={size} aria-hidden={alt === '' || undefined}>
    {src && <BaseAvatar.Image className="hrui-avatar-image" src={src} alt={alt} referrerPolicy="no-referrer" />}
    <BaseAvatar.Fallback className="hrui-avatar-fallback" role={alt ? 'img' : undefined} aria-label={alt || undefined}>
      <UserRound aria-hidden="true" />
    </BaseAvatar.Fallback>
  </BaseAvatar.Root>;
}
