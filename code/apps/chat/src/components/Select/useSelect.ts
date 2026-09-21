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
  useTypeahead,
} from "@floating-ui/react";
import { overlayGap, overlayPadding } from "@/styles/overlayGeometry";

export interface SelectOption<Value extends string> {
  value: Value;
  label: string;
  group?: string;
}

export function useSelect<Value extends string>({
  value,
  options,
  disabled,
  onChange,
}: {
  value: Value;
  options: readonly SelectOption<Value>[];
  disabled: boolean;
  onChange: (value: Value) => void;
}) {
  const [requestedOpen, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const open = requestedOpen && !disabled && options.length > 0;
  const listRef = useRef<Array<HTMLElement | null>>([]);
  const labelsRef = useRef<Array<string | null>>([]);
  const selectedIndex = options.findIndex((option) => option.value === value);
  useEffect(() => {
    labelsRef.current = options.map((option) => option.label);
    listRef.current.length = options.length;
  }, [options]);
  useEffect(() => {
    if (disabled || !options.length) setOpen(false);
  }, [disabled, options.length]);

  const floating = useFloating<HTMLButtonElement>({
    open,
    onOpenChange: setOpen,
    placement: "bottom-start",
    strategy: "fixed",
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(overlayGap),
      flip((state) => ({ padding: overlayPadding(state) })),
      shift((state) => ({ padding: overlayPadding(state) })),
      size((state) => ({
        padding: overlayPadding(state),
        apply({ availableHeight, availableWidth, rects, elements }) {
          // Only measured geometry is inline; appearance stays in CSS Modules.
          elements.floating.style.setProperty(
            "--select-anchor-width",
            `${rects.reference.width}px`,
          );
          elements.floating.style.setProperty(
            "--select-available-width",
            `${Math.max(0, availableWidth)}px`,
          );
          elements.floating.style.setProperty(
            "--select-available-height",
            `${Math.max(0, availableHeight)}px`,
          );
        },
      })),
    ],
  });
  const interactions = useInteractions([
    useClick(floating.context, { enabled: !disabled }),
    useDismiss(floating.context),
    useRole(floating.context, { role: "select" }),
    useListNavigation(floating.context, {
      listRef,
      activeIndex,
      selectedIndex,
      onNavigate: setActiveIndex,
      enabled: !disabled,
      loop: true,
      focusItemOnOpen: true,
    }),
    useTypeahead(floating.context, {
      listRef: labelsRef,
      activeIndex,
      selectedIndex,
      enabled: !disabled,
      onMatch: (index) => {
        if (open) setActiveIndex(index);
        else if (options[index]) onChange(options[index].value);
      },
    }),
  ]);
  function select(index: number) {
    const option = options[index];
    if (disabled || !option) return;
    setOpen(false);
    onChange(option.value);
  }
  return {
    ...floating,
    ...interactions,
    open,
    activeIndex,
    selectedIndex,
    listRef,
    select,
  };
}
