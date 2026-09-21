import { useI18n } from "@/i18n/useI18n";
import { Fragment, type ReactNode } from "react";
import { FloatingFocusManager, FloatingPortal } from "@floating-ui/react";
import { Check, ChevronDown } from "lucide-react";
import { Icon } from "@/components/Icon/Icon";
import { useSelect, type SelectOption } from "./useSelect";
import styles from "./Select.module.css";

export function Select<Value extends string>({
  value,
  options,
  onChange,
  label,
  disabled = false,
  leading,
  variant = "default",
  className = "",
  footer,
  selectedLabel,
}: {
  value: Value;
  options: readonly SelectOption<Value>[];
  onChange: (value: Value) => void;
  label: string;
  disabled?: boolean;
  leading?: ReactNode;
  variant?: "default" | "tinted" | "quiet";
  className?: string;
  footer?: ReactNode;
  selectedLabel?: ReactNode;
}) {
  const { t } = useI18n();

  const select = useSelect({ value, options, onChange, disabled });
  const optionList = (
    <>
      {options.map((option, index) => (
        <Fragment key={option.value}>
          {option.group && option.group !== options[index - 1]?.group && (
            <div className={styles.group} role="presentation">
              {option.group}
            </div>
          )}
          <button
            data-option-group={option.group}
            type="button"
            ref={(node) => {
              select.listRef.current[index] = node;
            }}
            tabIndex={select.activeIndex === index ? 0 : -1}
            className={styles.option}
            data-active={select.activeIndex === index || undefined}
            {...select.getItemProps({
              selected: select.selectedIndex === index,
              active: select.activeIndex === index,
              onClick: (event) => {
                // Portal events bubble through React's form tree.
                event.preventDefault();
                select.select(index);
              },
            })}
          >
            <span className={styles.check} aria-hidden="true">
              {select.selectedIndex === index && (
                <Icon icon={Check} size="sm" />
              )}
            </span>
            <span className={styles["option-label"]}>{option.label}</span>
          </button>
        </Fragment>
      ))}
    </>
  );
  return (
    <>
      <button
        ref={select.refs.setReference}
        type="button"
        disabled={disabled || !options.length}
        aria-label={label}
        className={`${styles.trigger} ${styles[variant] ?? ""} ${className}`}
        {...select.getReferenceProps()}
      >
        {leading}
        <span className={styles.label}>
          {selectedLabel ??
            options[select.selectedIndex]?.label ??
            t("common.choose")}
        </span>
        <Icon icon={ChevronDown} size="xs" className={styles.chevron} />
      </button>
      {select.open && (
        <FloatingPortal>
          <FloatingFocusManager context={select.context} modal={false}>
            <div
              ref={select.refs.setFloating}
              style={select.floatingStyles}
              className={styles.popup}
              {...(!footer
                ? { "aria-label": label, ...select.getFloatingProps() }
                : {})}
            >
              {footer ? (
                <div
                  className={styles.options}
                  aria-label={label}
                  {...select.getFloatingProps()}
                >
                  {optionList}
                </div>
              ) : (
                optionList
              )}
              {footer && <div className={styles.footer}>{footer}</div>}
            </div>
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </>
  );
}
