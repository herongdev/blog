import { useState, type Ref } from "react";
import {
  autoUpdate,
  flip,
  offset,
  shift,
  FloatingPortal,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useMergeRefs,
  useRole,
} from "@floating-ui/react";
import type { LucideIcon } from "lucide-react";
import { Icon } from "@/components/Icon/Icon";
import { overlayGap, overlayPadding } from "@/styles/overlayGeometry";
import styles from "./AttachmentMenuItem.module.css";

export function AttachmentMenuItem({
  label,
  icon,
  disabledReason,
  itemRef,
  itemProps,
  tabIndex,
  onSelect,
}: {
  label: string;
  icon: LucideIcon;
  disabledReason?: string;
  itemRef: Ref<HTMLButtonElement>;
  itemProps: Record<string, unknown>;
  tabIndex: number;
  onSelect: () => void;
}) {
  const [requestedOpen, setOpen] = useState(false);
  const open = !!disabledReason && requestedOpen;
  const { refs, context, floatingStyles } = useFloating<HTMLButtonElement>({
    open,
    onOpenChange: setOpen,
    placement: "top-start",
    strategy: "fixed",
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(overlayGap),
      flip((state) => ({ padding: overlayPadding(state) })),
      shift((state) => ({ padding: overlayPadding(state) })),
    ],
  });
  const ref = useMergeRefs([itemRef, refs.setReference]);
  const { getReferenceProps, getFloatingProps } = useInteractions([
    useHover(context, { enabled: !!disabledReason, move: false }),
    useFocus(context, { enabled: !!disabledReason }),
    useDismiss(context),
    useRole(context, { role: "tooltip" }),
  ]);
  return (
    <>
      <button
        ref={ref}
        type="button"
        role="menuitem"
        tabIndex={tabIndex}
        aria-disabled={!!disabledReason}
        className={styles.item}
        {...getReferenceProps({
          ...itemProps,
          onClick: () => {
            // aria-disabled keeps the explanation reachable by keyboard and touch.
            if (disabledReason) {
              setOpen(true);
              return;
            }
            onSelect();
          },
        })}
      >
        <Icon icon={icon} size="md" />
        <span>{label}</span>
      </button>
      {open && (
        <FloatingPortal>
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            className={styles.tooltip}
            {...getFloatingProps()}
          >
            {disabledReason}
          </div>
        </FloatingPortal>
      )}
    </>
  );
}
