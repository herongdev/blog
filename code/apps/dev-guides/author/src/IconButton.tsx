import { forwardRef } from 'react';
import { AuthorButton, type AuthorButtonProps } from './AuthorButton';

type Props = AuthorButtonProps & { 'aria-label': string };

/** A named native button; DOM props and refs remain intact for Radix asChild. */
const IconButton = forwardRef<HTMLButtonElement, Props>(function IconButton({ type = 'button', variant = 'ghost', className = '', ...props }, ref) {
  return <AuthorButton type={type} variant={variant} {...props} className={`author-icon-button ${className}`} ref={ref} />;
});

export default IconButton;
