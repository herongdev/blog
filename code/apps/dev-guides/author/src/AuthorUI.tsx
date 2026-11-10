import { Children, cloneElement, forwardRef, isValidElement, useId, useImperativeHandle, useRef, type InputHTMLAttributes, type ReactNode, type TextareaHTMLAttributes } from 'react';
import { Search, X } from 'lucide-react';
import { AuthorButton, type AuthorControlSize } from './AuthorButton';
import HelpTip from './HelpTip';
import './author-ui.css';

export { AuthorButton, AuthorButtonLink } from './AuthorButton';
export type { AuthorControlSize, AuthorButtonProps, AuthorButtonVariant } from './AuthorButton';
const classes = (...values: (string | undefined)[]) => values.filter(Boolean).join(' ');

export const AuthorInput = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement> & { controlSize?: AuthorControlSize }>(function AuthorInput({ controlSize = 'default', className, ...props }, ref) {
  return <input {...props} ref={ref} className={classes('author-input', className)} data-size={controlSize} />;
});

export const AuthorTextarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(function AuthorTextarea({ className, rows = 3, ...props }, ref) {
  return <textarea {...props} ref={ref} rows={rows} className={classes('author-textarea', className)} />;
});

type FieldControl = { id?: string; 'aria-describedby'?: string; 'aria-invalid'?: boolean | 'true' | 'false' | 'grammar' | 'spelling' };
export function AuthorField({ label, children, help, error, requiredHint, className, htmlFor }: { label: ReactNode; children: ReactNode; help?: ReactNode; error?: ReactNode; requiredHint?: ReactNode; className?: string; htmlFor?: string }) {
  const generated = useId();
  const child = Children.count(children) === 1 && isValidElement<FieldControl>(children) ? children : null;
  const id = htmlFor ?? child?.props.id ?? generated;
  const descriptions = [child?.props['aria-describedby'], error ? `${generated}-error` : ''].filter(Boolean).join(' ') || undefined;
  return <div className={classes('author-field', className)}>
    <div className="author-field-heading"><label htmlFor={id} className="author-field-label">{label}{requiredHint && <span className="author-field-required">{requiredHint}</span>}</label>{help && <HelpTip label={`${typeof label === 'string' ? label : '字段'}说明`}>{help}</HelpTip>}</div>
    {child ? cloneElement(child, { id, 'aria-describedby': descriptions, 'aria-invalid': error ? true : child.props['aria-invalid'] }) : children}
    {error && <p id={`${generated}-error`} className="author-field-error" role="alert">{error}</p>}
  </div>;
}

type SearchProps = { value: string; onValueChange: (value: string) => void; label: string; placeholder?: string; className?: string; inputProps?: Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'defaultValue' | 'onChange' | 'type' | 'className' | 'size'> };
export const AuthorSearchField = forwardRef<HTMLInputElement, SearchProps>(function AuthorSearchField({ value, onValueChange, label, placeholder, className, inputProps }, ref) {
  const input = useRef<HTMLInputElement>(null);
  useImperativeHandle(ref, () => input.current!, []);
  return <div className={classes('author-search-field', className)}>
    <Search aria-hidden="true" />
    <input {...inputProps} ref={input} type="search" aria-label={label} placeholder={placeholder} value={value} onChange={event => onValueChange(event.target.value)} />
    {value && <AuthorButton className="author-icon-button author-search-clear" variant="ghost" aria-label={`清空${label}`} disabled={inputProps?.disabled || inputProps?.readOnly} onClick={() => { onValueChange(''); input.current?.focus(); }}><X aria-hidden="true" /></AuthorButton>}
  </div>;
});

/** Layout only: all search/filter/action controls keep their own shared semantics. */
export function AuthorToolbar({ search, filters, actions, className }: { search: ReactNode; filters?: ReactNode; actions?: ReactNode; className?: string }) {
  return <div className={classes('author-toolbar', className)}>
    <div className="author-toolbar-search">{search}</div>
    <div className="author-toolbar-filters">{filters}</div>
    <div className="author-toolbar-actions">{actions}</div>
  </div>;
}
