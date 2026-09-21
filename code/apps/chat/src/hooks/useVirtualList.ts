import {
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type RefObject,
} from "react";

function scrollParent(element: HTMLElement) {
  let node = element.parentElement;
  while (node && !/(auto|scroll)/.test(getComputedStyle(node).overflowY))
    node = node.parentElement;
  return node ?? document.documentElement;
}
function lowerBound(offsets: number[], value: number) {
  let left = 0,
    right = offsets.length - 1;
  while (left < right) {
    const middle = Math.floor((left + right + 1) / 2);
    if (offsets[middle] <= value) left = middle;
    else right = middle - 1;
  }
  return left;
}

/** Variable-height rows share the nearest scroll container; nested lists do not add scrollbars. */
export function useVirtualList(
  root: RefObject<HTMLDivElement | null>,
  keys: string[],
  reading = false,
  virtual = true,
) {
  const [metrics, setMetrics] = useState({
    top: 0,
    height: 0,
    estimate: 1,
    sizes: new Map<string, number>(),
  });
  const [focused, setFocused] = useState<string>();
  const [requested, setRequested] = useState<number>();
  const anchor = useRef<{ key: string; top: number } | undefined>(undefined);
  const measurements = useRef<number[]>([]);
  const offsets = useMemo(() => {
    const next = [0];
    for (const key of keys)
      next.push(next.at(-1)! + (metrics.sizes.get(key) ?? metrics.estimate));
    return next;
  }, [keys, metrics.estimate, metrics.sizes]);
  const start =
    reading && !metrics.height
      ? Math.max(0, keys.length - 40)
      : Math.max(0, lowerBound(offsets, metrics.top) - 4);
  const end = metrics.height
    ? Math.min(
        keys.length,
        lowerBound(offsets, metrics.top + metrics.height) + 5,
      )
    : reading
      ? keys.length
      : Math.min(keys.length, 12);
  const indexes = Array.from(
    { length: Math.max(0, end - start) },
    (_, i) => i + start,
  );
  for (const index of [focused ? keys.indexOf(focused) : -1, requested ?? -1])
    if (index >= 0 && index < keys.length && !indexes.includes(index))
      indexes.push(index);
  indexes.sort((a, b) => a - b);
  if (!virtual) {
    indexes.length = 0;
    indexes.push(...keys.map((_, index) => index));
  }

  useLayoutEffect(() => {
    const node = root.current;
    if (!node || !virtual) return;
    const parent = scrollParent(node);
    let frame = 0;
    const measure = () => {
      frame = 0;
      // Disabling a focused control can move focus to body without React blur.
      // Only retain a row while the DOM still owns that focus.
      const focusedRow =
        document.activeElement?.closest<HTMLElement>("[data-virtual-key]");
      setFocused(
        focusedRow?.parentElement === node
          ? focusedRow.dataset.virtualKey
          : undefined,
      );
      const estimate =
        node
          .querySelector<HTMLElement>("[data-virtual-probe]")
          ?.getBoundingClientRect().height ?? 1;
      const measured = new Map<string, number>();
      for (const row of Array.from(node.children)) {
        const key = (row as HTMLElement).dataset.virtualKey;
        if (!key) continue;
        const height = row.getBoundingClientRect().height;
        if (height > 0) measured.set(key, height);
      }
      const bounds = node.getBoundingClientRect();
      const viewport = parent.getBoundingClientRect();
      const top = Math.max(0, viewport.top - bounds.top);
      const height = Math.max(
        0,
        Math.min(viewport.height, viewport.bottom - bounds.top),
      );
      const changed =
        estimate !== metrics.estimate ||
        [...measured].some(
          ([key, value]) =>
            Math.abs((metrics.sizes.get(key) ?? 0) - value) > 0.5,
        );
      if (
        reading &&
        parent.dataset.scrollFollowing !== "true" &&
        changed &&
        !anchor.current &&
        parent.scrollHeight - parent.scrollTop - parent.clientHeight > 5
      ) {
        const visible = Array.from(node.children).find(
          (row) =>
            (row as HTMLElement).dataset.virtualKey &&
            row.getBoundingClientRect().bottom > viewport.top,
        );
        if (visible)
          anchor.current = {
            key: (visible as HTMLElement).dataset.virtualKey!,
            top: visible.getBoundingClientRect().top,
          };
      }
      setMetrics((previous) => {
        let sizes = previous.sizes;
        for (const [key, value] of measured) {
          if (Math.abs((sizes.get(key) ?? 0) - value) <= 0.5) continue;
          if (sizes === previous.sizes) sizes = new Map(sizes);
          sizes.set(key, value);
        }
        return sizes === previous.sizes &&
          previous.top === top &&
          previous.height === height &&
          previous.estimate === estimate
          ? previous
          : { top, height, estimate, sizes };
      });
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    const observer = new ResizeObserver(schedule);
    observer.observe(node);
    observer.observe(parent);
    for (const row of Array.from(node.children)) observer.observe(row);
    parent.addEventListener("scroll", schedule, { passive: true });
    measure();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      parent.removeEventListener("scroll", schedule);
    };
  });

  useLayoutEffect(() => {
    const previous = anchor.current;
    const node = root.current;
    if (previous && node) {
      const row = Array.from(node.children).find(
        (child) => (child as HTMLElement).dataset.virtualKey === previous.key,
      );
      if (row)
        scrollParent(node).scrollTop +=
          row.getBoundingClientRect().top - previous.top;
      anchor.current = undefined;
    }
  }, [offsets, root]);

  useLayoutEffect(() => {
    measurements.current = offsets;
  }, [offsets]);
  const reveal = useCallback(
    (index: number) => {
      const node = root.current;
      if (!node) return;
      const parent = scrollParent(node);
      const top =
        node.getBoundingClientRect().top - parent.getBoundingClientRect().top;
      parent.scrollTop += top + (measurements.current[index] ?? 0);
      setRequested(index);
    },
    [root],
  );
  useLayoutEffect(() => {
    if (requested === undefined) return;
    const row = root.current?.querySelector<HTMLElement>(
      `[data-virtual-index="${requested}"]`,
    );
    row
      ?.querySelector<HTMLElement>("button, a, [tabindex]")
      ?.focus({ preventScroll: true });
    setRequested(undefined);
  }, [requested, root]);
  return { indexes, offsets, total: offsets.at(-1) ?? 0, setFocused, reveal };
}
