import { useMessageViewState } from "../hooks/useMessageViewState";
import {
  Children,
  cloneElement,
  isValidElement,
  useLayoutEffect,
  useRef,
  type ReactNode,
} from "react";
import { useI18n } from "@/i18n/useI18n";
import styles from "./MarkdownTable.module.css";
const pageSize = 50;
/** Keep the header and table semantics while bounding mounted rows. */
export function MarkdownTable({
  children,
  node,
}: {
  children?: ReactNode;
  node?: { position?: { start: { offset?: number } } };
}) {
  const { t } = useI18n();
  const [requestedPage, setPage] = useMessageViewState<number>(
    `table:${node?.position?.start.offset ?? 0}`,
    0,
  );
  const root = useRef<HTMLDivElement>(null);
  const reveal = useRef(false);
  const changePage = (next: number) => {
    reveal.current = true;
    setPage(next);
  };
  useLayoutEffect(() => {
    if (!reveal.current) return;
    reveal.current = false;
    root.current?.scrollIntoView({ block: "nearest", inline: "nearest" });
  }, [requestedPage]);
  const sections = Children.toArray(children);
  const body = sections.find(
    (section) =>
      isValidElement<{ children?: ReactNode }>(section) &&
      section.type === "tbody",
  );
  const rows = isValidElement<{ children?: ReactNode }>(body)
    ? Children.toArray(body.props.children)
    : [];
  const pages = Math.max(1, Math.ceil(rows.length / pageSize));
  const page = Math.min(requestedPage, pages - 1);
  return (
    <div ref={root} className={styles.root}>
      <div className={styles.scroll}>
        <table>
          {sections.map((section) =>
            section === body &&
            isValidElement<{ children?: ReactNode }>(section)
              ? cloneElement(
                  section,
                  {},
                  rows.slice(page * pageSize, (page + 1) * pageSize),
                )
              : section,
          )}
        </table>
      </div>
      {pages > 1 && (
        <nav className={styles.pages} aria-label={t("table.pagination")}>
          <button
            type="button"
            disabled={page === 0}
            onClick={() => changePage(page - 1)}
          >
            {t("table.previous")}
          </button>
          <span aria-live="polite">
            {t("table.page", { page: page + 1, pages })}
          </span>
          <button
            type="button"
            disabled={page + 1 === pages}
            onClick={() => changePage(page + 1)}
          >
            {t("table.next")}
          </button>
        </nav>
      )}
    </div>
  );
}
