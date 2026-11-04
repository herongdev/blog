import type { ReactNode, Ref } from 'react';
import * as Select from '@radix-ui/react-select';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';

export type AuthorSelectOption = { value: string; label: string; disabled?: boolean };
type Props = {
  value: string;
  onValueChange: (value: string) => void;
  options: readonly AuthorSelectOption[];
  label: string;
  id?: string;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  icon?: ReactNode;
  triggerRef?: Ref<HTMLButtonElement>;
};

// Radix reserves an empty item value for clearing. Encode every option so an
// explicit business choice such as “default cover” can still round-trip ''.
const encode = (value: string) => `option:${value}`;
const decode = (value: string) => value.slice('option:'.length);

export default function AuthorSelect({ value, onValueChange, options, label, id, disabled, placeholder = '请选择', className = '', icon, triggerRef }: Props) {
  const selected = options.find((option) => option.value === value);
  const unavailable = value !== '' && !selected;
  const choices = unavailable ? [{ value, label: '原选项已不可用', disabled: true }, ...options] : options;
  const radixValue = selected || unavailable ? encode(value) : '';
  return <Select.Root value={radixValue} onValueChange={(next) => onValueChange(decode(next))} disabled={disabled || options.length === 0}>
    <Select.Trigger ref={triggerRef} id={id} className={`author-select-trigger ${className}`} aria-label={label}>
      {icon}<span className="author-select-value"><Select.Value placeholder={placeholder}>{selected?.label ?? (unavailable ? '原选项已不可用' : undefined)}</Select.Value></span>
      <Select.Icon className="author-select-icon"><ChevronDown size={16} aria-hidden="true" /></Select.Icon>
    </Select.Trigger>
    <Select.Portal><Select.Content className="author-select-content" position="popper" align="start" sideOffset={5} collisionPadding={12}>
      <Select.ScrollUpButton className="author-select-scroll" aria-label="向上滚动选项"><ChevronUp size={16} aria-hidden="true" /></Select.ScrollUpButton>
      <Select.Viewport className="author-select-viewport">{choices.map((option) => <Select.Item key={option.value} value={encode(option.value)} textValue={option.label} disabled={option.disabled} className="author-select-item"><Select.ItemText>{option.label}</Select.ItemText><Select.ItemIndicator className="author-select-indicator"><Check size={16} aria-hidden="true" /></Select.ItemIndicator></Select.Item>)}</Select.Viewport>
      <Select.ScrollDownButton className="author-select-scroll" aria-label="向下滚动选项"><ChevronDown size={16} aria-hidden="true" /></Select.ScrollDownButton>
    </Select.Content></Select.Portal>
  </Select.Root>;
}
