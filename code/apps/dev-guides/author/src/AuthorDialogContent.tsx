import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import IconButton from './IconButton';

const surfaces = {
  library: { content: 'library-dialog', overlay: 'library-dialog-overlay', heading: '', description: 'library-dialog-description', close: 'library-dialog-close' },
  workspace: { content: 'cw-dialog', overlay: 'cw-dialog-overlay', heading: 'cw-section-heading', description: '', close: 'cw-button cw-icon' },
  publishing: { content: 'publishing-dialog', overlay: 'publishing-overlay', heading: 'publishing-section-heading', description: 'publishing-muted', close: 'publishing-icon-button' },
};
type Props = Omit<ComponentPropsWithoutRef<typeof Dialog.Content>, 'title'> & {
  title: ReactNode;
  description: ReactNode;
  surface?: keyof typeof surfaces;
  closeLabel?: string;
  closeDisabled?: boolean;
  descriptionId?: string;
  descriptionClassName?: string;
};

/** The shared Radix surface only; callers own open state, forms and focus rules. */
const AuthorDialogContent = forwardRef<HTMLDivElement, Props>(function AuthorDialogContent({ title, description, surface = 'library', closeLabel, closeDisabled, descriptionId, descriptionClassName, className = '', children, ...contentProps }, ref) {
  const styles = surfaces[surface];
  const heading = <Dialog.Title>{title}</Dialog.Title>;
  const close = closeLabel && <Dialog.Close asChild><IconButton className={styles.close} aria-label={closeLabel} disabled={closeDisabled}><X size={surface === 'publishing' ? 20 : 19} aria-hidden="true" /></IconButton></Dialog.Close>;
  return <Dialog.Portal><Dialog.Overlay className={styles.overlay} /><Dialog.Content {...contentProps} ref={ref} className={`${styles.content} ${className}`.trim()}>
    {styles.heading && close ? <div className={styles.heading}>{heading}{close}</div> : heading}
    <Dialog.Description {...(descriptionId ? { id: descriptionId } : {})} className={descriptionClassName ?? (styles.description || undefined)}>{description}</Dialog.Description>
    {!styles.heading && close}
    {children}
  </Dialog.Content></Dialog.Portal>;
});

export default AuthorDialogContent;
