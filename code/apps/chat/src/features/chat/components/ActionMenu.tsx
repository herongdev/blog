import { useRef, useState } from "react";
import {
  autoUpdate,
  flip,
  offset,
  shift,
  size,
  FloatingFocusManager,
  FloatingPortal,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useListNavigation,
  useRole,
} from "@floating-ui/react";
import { Ellipsis, type LucideIcon } from "lucide-react";
import { Icon } from "@/components/Icon/Icon";
import { overlayGap, overlayPadding } from "@/styles/overlayGeometry";
import styles from "./ActionMenu.module.css";

export function ActionMenu<T extends string>({
  label,
  options,
  onAction,
}: {
  label: string;
  options: readonly {
    action: T;
    label: string;
    icon: LucideIcon;
    separator?: boolean;
    destructive?: boolean;
  }[];
  onAction: (action: T) => void;
}) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const list = useRef<Array<HTMLButtonElement | null>>([]);
  const { refs, context, floatingStyles } = useFloating<HTMLButtonElement>({
    open,
    onOpenChange: setOpen,
    placement: "bottom-start",
    strategy: "fixed",
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(overlayGap),
      flip((s) => ({ padding: overlayPadding(s) })),
      shift((s) => ({ padding: overlayPadding(s) })),
      size((s) => ({
        padding: overlayPadding(s),
        apply({ availableHeight, availableWidth, elements }) {
          elements.floating.style.setProperty(
            "--select-available-height",
            `${Math.max(0, availableHeight)}px`,
          );
          elements.floating.style.setProperty(
            "--select-available-width",
            `${Math.max(0, availableWidth)}px`,
          );
        },
      })),
    ],
  });
  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions(
    [
      useClick(context),
      useDismiss(context, { bubbles: { escapeKey: false } }),
      useRole(context, { role: "menu" }),
      useListNavigation(context, {
        listRef: list,
        activeIndex,
        onNavigate: setActiveIndex,
        loop: true,
      }),
    ],
  );
  return (
    <>
      <button
        ref={refs.setReference}
        type="button"
        className={styles.more}
        aria-label={label}
        title={label}
        {...getReferenceProps()}
      >
        <Icon icon={Ellipsis} size="md" />
      </button>
      {open && (
        <FloatingPortal>
          <FloatingFocusManager
            context={context}
            modal={false}
            initialFocus={-1}
          >
            <div
              ref={refs.setFloating}
              style={floatingStyles}
              className={styles.menu}
              aria-label={label}
              {...getFloatingProps()}
            >
              {options.map((option, index) => (
                <button
                  key={option.action}
                  type="button"
                  role="menuitem"
                  ref={(node) => {
                    list.current[index] = node;
                  }}
                  className={styles.action}
                  data-action={option.action}
                  data-separator={option.separator}
                  data-danger={option.destructive}
                  tabIndex={activeIndex === index ? 0 : -1}
                  {...getItemProps({
                    onClick: () => {
                      refs.domReference.current?.focus();
                      setOpen(false);
                      onAction(option.action);
                    },
                  })}
                >
                  <Icon icon={option.icon} size="md" />
                  {option.label}
                </button>
              ))}
            </div>
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </>
  );
}
