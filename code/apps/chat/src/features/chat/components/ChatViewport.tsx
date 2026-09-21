import { useI18n } from "@/i18n/useI18n";
import { Icon } from "@/components/Icon/Icon";
import styles from "./ChatViewport.module.css";
import type { ReactNode, Ref } from "react";
import { ArrowDown } from "lucide-react";
interface ChatViewportProps {
  viewportRef: Ref<HTMLDivElement>;
  contentRef: Ref<HTMLDivElement>;
  empty: boolean;
  away: boolean;
  onBottom: () => void;
  children: ReactNode;
  notice?: ReactNode;
}
export function ChatViewport({
  viewportRef,
  contentRef,
  empty,
  away,
  onBottom,
  children,
  notice,
}: ChatViewportProps) {
  const { t } = useI18n();

  return (
    <div className={styles["conversation-area"]}>
      {notice && <div className={styles["viewport-notice"]}>{notice}</div>}
      <div
        // The welcome screen is freely scrollable; only messages follow the bottom.
        ref={empty ? undefined : viewportRef}
        className={styles["message-viewport"]}
        data-message-viewport
        data-scroll-following={!away}
        tabIndex={0}
        role="region"
        aria-label={t("message.readingArea")}
      >
        <div
          ref={empty ? undefined : contentRef}
          className={
            styles["reading-column"] + " " + (empty ? styles["is-empty"] : "")
          }
        >
          {children}
        </div>
      </div>
      {!empty && away && (
        <button className={styles["scroll-bottom"]} onClick={onBottom}>
          <Icon icon={ArrowDown} size="sm" />
          {t("message.latest")}
        </button>
      )}
    </div>
  );
}
