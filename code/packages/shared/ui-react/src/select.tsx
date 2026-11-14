import { useState, type ComponentProps } from 'react';
import { Select as BaseSelect } from '@base-ui/react/select';
import { Check, ChevronDown } from 'lucide-react';
import { withClass } from './classes.js';

export const SelectRoot = BaseSelect.Root;
export const SelectValue = BaseSelect.Value;
export const SelectPortal = BaseSelect.Portal;

export function SelectTrigger({ className, variant = 'field', ...props }: ComponentProps<typeof BaseSelect.Trigger> & { variant?: 'field' | 'ghost' }) {
  return <BaseSelect.Trigger {...props} data-variant={variant} className={withClass('hrui-select-trigger', className)} />;
}
export function SelectIcon({ className, ...props }: ComponentProps<typeof BaseSelect.Icon>) {
  return <BaseSelect.Icon {...props} className={withClass('hrui-select-icon', className)} />;
}
export function SelectPositioner({ className, ...props }: ComponentProps<typeof BaseSelect.Positioner>) {
  return <BaseSelect.Positioner alignItemWithTrigger={false} side="bottom" align="start" sideOffset={4} {...props} className={withClass('hrui-select-positioner', className)} />;
}
export function SelectPopup({ className, ...props }: ComponentProps<typeof BaseSelect.Popup>) {
  return <BaseSelect.Popup {...props} className={withClass('hrui-select-popup', className)} />;
}
export function SelectList({ className, ...props }: ComponentProps<typeof BaseSelect.List>) {
  return <BaseSelect.List {...props} className={withClass('hrui-select-list', className)} />;
}
export function SelectItem({ className, ...props }: ComponentProps<typeof BaseSelect.Item>) {
  return <BaseSelect.Item {...props} className={withClass('hrui-select-item', className)} />;
}
export function SelectItemText({ className, ...props }: ComponentProps<typeof BaseSelect.ItemText>) {
  return <BaseSelect.ItemText {...props} className={withClass('hrui-select-item-text', className)} />;
}
export function SelectItemIndicator({ className, ...props }: ComponentProps<typeof BaseSelect.ItemIndicator>) {
  return <BaseSelect.ItemIndicator {...props} className={withClass('hrui-select-item-indicator', className)} />;
}

export const Select = {
  Root: SelectRoot, Trigger: SelectTrigger, Value: SelectValue, Icon: SelectIcon,
  Portal: SelectPortal, Positioner: SelectPositioner, Popup: SelectPopup,
  List: SelectList, Item: SelectItem, ItemText: SelectItemText, ItemIndicator: SelectItemIndicator,
};

export interface Option { value: string; label: string; disabled?: boolean }
export interface SelectControlProps {
  label: string;
  name?: string;
  options: Option[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  labelledBy?: string;
}

export function SelectControl({ label, name, options, value, defaultValue = '', onValueChange, required, disabled, className, labelledBy }: SelectControlProps) {
  const [ownValue, setOwnValue] = useState(defaultValue);
  return <Select.Root<string> items={options} name={name} value={value === undefined ? ownValue : value} required={required} disabled={disabled} onValueChange={(next) => { const nextValue = next ?? ''; setOwnValue(nextValue); onValueChange?.(nextValue); }}>
    <Select.Trigger className={className} aria-label={labelledBy ? undefined : label} aria-labelledby={labelledBy}>
      <Select.Value /><Select.Icon><ChevronDown aria-hidden="true" /></Select.Icon>
    </Select.Trigger>
    <Select.Portal><Select.Positioner><Select.Popup><Select.List>
      {options.map((option) => <Select.Item key={option.value} value={option.value} label={option.label} disabled={option.disabled}>
        <Select.ItemText>{option.label}</Select.ItemText><Select.ItemIndicator><Check aria-hidden="true" /></Select.ItemIndicator>
      </Select.Item>)}
    </Select.List></Select.Popup></Select.Positioner></Select.Portal>
  </Select.Root>;
}
