import { forwardRef, type AnchorHTMLAttributes, type ButtonHTMLAttributes } from 'react';
import './author-ui.css';

export type AuthorControlSize = 'default' | 'touch' | 'compact';
export type AuthorButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'soft';
export type AuthorButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: AuthorButtonVariant; size?: AuthorControlSize; density?: 'default' | 'tight'; responsiveIcon?: boolean };

/** Native props/ref are preserved, including Radix asChild handlers. Submit is explicit. */
export const AuthorButton = forwardRef<HTMLButtonElement, AuthorButtonProps>(function AuthorButton({ variant = 'secondary', size = 'default', density = 'default', responsiveIcon, type = 'button', className = '', ...props }, ref) {
  return <button {...props} ref={ref} type={type} className={`author-button ${responsiveIcon ? 'author-button-responsive-icon' : ''} ${className}`} data-variant={variant} data-size={size} data-density={density} />;
});

export const AuthorButtonLink = forwardRef<HTMLAnchorElement, AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: AuthorButtonVariant; size?: AuthorControlSize; iconOnly?: boolean }>(function AuthorButtonLink({ variant = 'secondary', size = 'default', iconOnly, className = '', ...props }, ref) {
  return <a {...props} ref={ref} className={`author-button ${iconOnly ? 'author-icon-button' : ''} ${className}`} data-variant={variant} data-size={size} />;
});
