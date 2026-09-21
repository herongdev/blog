import { useI18n } from "@/i18n/useI18n";
import { overlayGap, overlayPadding } from "@/styles/overlayGeometry";
import { Icon } from "@/components/Icon/Icon";
import primitives from "@/styles/primitives.module.css";
import styles from "./Citation.module.css";
import { useId, useState } from "react";
import {
  autoUpdate,
  flip,
  FloatingFocusManager,
  FloatingPortal,
  offset,
  safePolygon,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole,
} from "@floating-ui/react";
import { ArrowLeft, ArrowRight, ExternalLink, Globe2 } from "lucide-react";
import type { Reference } from "@shared/contracts/chat";
import { cleanExcerpt, safeWebUrl } from "../lib/citations";
export function Citation({
  ids,
  references,
}: {
  ids: string[];
  references: Record<string, Reference>;
}) {
  const { t } = useI18n();

  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const titleId = useId();
  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement: "bottom-start",
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(overlayGap),
      flip(),
      shift((state) => ({ padding: overlayPadding(state) })),
    ],
  });
  const interactions = useInteractions([
    useHover(context, {
      delay: { open: 100, close: 100 },
      handleClose: safePolygon(),
    }),
    useClick(context),
    useFocus(context),
    useDismiss(context),
    useRole(context, { role: "dialog" }),
  ]);
  const items = ids.map((id) => references[id]);
  const item = items[Math.min(index, items.length - 1)];
  const first = items[0];
  const link = safeWebUrl(item?.link);
  const host = link ? new URL(link).hostname : t("citation.material");
  return (
    <>
      <button
        type="button"
        data-citation
        data-citation-open={open ? "true" : undefined}
        ref={refs.setReference}
        className={
          styles["citation-badge"] + " " + (open ? styles["active"] : "")
        }
        aria-label={t(
          ids.length === 1 ? "citation.labelOne" : "citation.labelMany",
          { title: first?.title ?? ids[0], count: ids.length },
        )}
        {...interactions.getReferenceProps()}
      >
        <span>{first?.title ?? t("citation.pending")}</span>
        {ids.length > 1 && <sup>+{ids.length - 1}</sup>}
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
              className={styles["citation-popover"]}
              aria-labelledby={titleId}
              {...interactions.getFloatingProps()}
            >
              <div className={styles["citation-topline"]}>
                <span className={styles["citation-domain"]}>
                  <Icon icon={Globe2} size="md" />
                  {host}
                </span>
                {ids.length > 1 && (
                  <span className={styles["citation-pagination"]}>
                    <button
                      type="button"
                      className={primitives["icon-button"]}
                      aria-label={t("citation.previous")}
                      aria-disabled={index === 0}
                      onClick={() => setIndex((i) => Math.max(0, i - 1))}
                    >
                      <Icon icon={ArrowLeft} size="md" />
                    </button>
                    <span aria-live="polite">
                      {index + 1}/{ids.length}
                    </span>
                    <button
                      type="button"
                      className={primitives["icon-button"]}
                      aria-label={t("citation.next")}
                      aria-disabled={index === ids.length - 1}
                      onClick={() =>
                        setIndex((i) => Math.min(ids.length - 1, i + 1))
                      }
                    >
                      <Icon icon={ArrowRight} size="md" />
                    </button>
                  </span>
                )}
              </div>
              <div className={styles["citation-body"]}>
                <p id={titleId} className={styles["citation-title"]}>
                  {item?.title ?? t("citation.unavailable", { id: ids[index] })}
                </p>
                <p className={styles["citation-excerpt"]}>
                  {item ? cleanExcerpt(item.content) : t("citation.waiting")}
                </p>
                {link && (
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles["source-link"]}
                  >
                    {t("citation.original")}
                    <Icon icon={ExternalLink} size="xs" />
                  </a>
                )}
              </div>
            </div>
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </>
  );
}
