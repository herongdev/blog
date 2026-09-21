import { useI18n } from "@/i18n/useI18n";
import styles from "./ConversationOpenStatus.module.css";

export function ConversationOpenStatus({
  status,
  onRetry,
  onCancel,
}: {
  status: "loading" | "error";
  onRetry: () => void;
  onCancel: () => void;
}) {
  const { t } = useI18n();
  return (
    <div className={styles.notice}>
      <span role={status === "error" ? "alert" : "status"}>
        {t(status === "error" ? "history.openFailed" : "history.opening")}
      </span>
      <div className={styles.actions}>
        {status === "error" && (
          <button type="button" onClick={onRetry}>
            {t("history.retryRead")}
          </button>
        )}
        <button type="button" onClick={onCancel}>
          {t("history.cancelOpen")}
        </button>
      </div>
    </div>
  );
}
