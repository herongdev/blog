import { useMemo, useRef, type CSSProperties, type ReactNode } from "react";
import { useVirtualList } from "@/hooks/useVirtualList";
import styles from "./WindowedList.module.css";

export function WindowedList<T>({
  items,
  itemKey,
  children,
  reading = false,
}: {
  reading?: boolean;
  items: T[];
  itemKey: (item: T) => string;
  children: (item: T) => ReactNode;
}) {
  const root = useRef<HTMLDivElement>(null);
  const keys = useMemo(() => items.map(itemKey), [items, itemKey]);
  const staticList = reading && items.length <= 80;
  const window = useVirtualList(root, keys, reading, !staticList);
  const listStyle = {
    "--virtual-height": `${staticList ? 0 : window.total}px`,
  } as CSSProperties;
  return (
    <div
      ref={root}
      className={styles.list}
      data-windowed-list
      data-reading={reading}
      data-static={staticList}
      data-total-items={items.length}
      style={listStyle}
      onFocusCapture={(event) => {
        const row = (event.target as HTMLElement).closest<HTMLElement>(
          "[data-virtual-key]",
        );
        if (row?.parentElement === root.current)
          window.setFocused(row.dataset.virtualKey);
      }}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null))
          window.setFocused(undefined);
      }}
      onKeyDown={(event) => {
        if (
          reading ||
          !!(event.target as Element).closest(
            '[aria-haspopup="menu"], [role="menu"]',
          ) ||
          event.defaultPrevented ||
          event.altKey ||
          event.ctrlKey ||
          event.metaKey
        )
          return;
        const row = (event.target as HTMLElement).closest<HTMLElement>(
          "[data-virtual-index]",
        );
        if (row?.parentElement !== root.current) return;
        const index = Number(row?.dataset.virtualIndex);
        const next =
          event.key === "ArrowDown"
            ? index + 1
            : event.key === "ArrowUp"
              ? index - 1
              : event.key === "Home"
                ? 0
                : event.key === "End"
                  ? items.length - 1
                  : undefined;
        if (next !== undefined && next >= 0 && next < items.length) {
          event.preventDefault();
          window.reveal(next);
        }
      }}
    >
      <div data-virtual-probe className={styles.probe} aria-hidden="true" />
      {window.indexes.map((index) => {
        const rowStyle = {
          "--virtual-offset": `${window.offsets[index]}px`,
        } as CSSProperties;
        return (
          <div
            key={keys[index]}
            data-virtual-row
            data-virtual-key={keys[index]}
            data-virtual-index={index}
            className={styles.row}
            style={rowStyle}
          >
            {children(items[index])}
          </div>
        );
      })}
    </div>
  );
}
