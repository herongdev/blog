import { useEffect, useRef, useState } from "react";
import {
  autoUpdate,
  flip,
  offset,
  shift,
  size,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useListNavigation,
  useRole,
} from "@floating-ui/react";
import { overlayGap, overlayPadding } from "@/styles/overlayGeometry";

export function useComposerTools(disabled: boolean) {
  const [requestedOpen, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const list = useRef<Array<HTMLButtonElement | null>>([]);
  const open = requestedOpen && !disabled;
  useEffect(() => {
    if (disabled) setOpen(false);
  }, [disabled]);
  const floating = useFloating<HTMLButtonElement>({
    open,
    onOpenChange: setOpen,
    placement: "top-start",
    strategy: "fixed",
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(overlayGap),
      flip((state) => ({ padding: overlayPadding(state) })),
      shift((state) => ({ padding: overlayPadding(state) })),
      size((state) => ({
        padding: overlayPadding(state),
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
  const interactions = useInteractions([
    useClick(floating.context, { enabled: !disabled }),
    useDismiss(floating.context),
    useRole(floating.context, { role: "menu" }),
    useListNavigation(floating.context, {
      listRef: list,
      activeIndex,
      onNavigate: setActiveIndex,
      // Keep unavailable actions focusable so keyboard users can read why.
      disabledIndices: [],
      loop: true,
    }),
  ]);
  function select(action: () => void) {
    if (disabled) return;
    floating.refs.domReference.current?.focus();
    setOpen(false);
    // Keep file picker activation synchronous with the user's click.
    action();
  }
  return { ...floating, ...interactions, open, activeIndex, list, select };
}
