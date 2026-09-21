import { useI18n } from "@/i18n/useI18n";
import styles from "./HistoryStatus.module.css";

export function HistoryStatus({
  status,
  loadIssue,
  onRetry,
  exportFailed = false,
  onRetryExport,
}: {
  status: "saved" | "saving" | "error" | "conflict";
  loadIssue?: "unavailable" | "damaged" | "conflict";
  onRetry: () => void;
  exportFailed?: boolean;
  onRetryExport?: () => void;
}) {
  const { t } = useI18n();
  const failed = status === "error" || status === "conflict";
  if (!failed && !loadIssue && !exportFailed)
    return <span hidden data-history-status={status} />;
  return (
    <div
      className={styles.notice}
      data-history-status={status}
      data-error="true"
    >
      <span role="alert">
        {t(
          exportFailed
            ? "history.exportFailed"
            : status === "conflict" || loadIssue === "conflict"
              ? "history.conflict"
              : status === "error"
                ? "history.saveFailed"
                : loadIssue === "damaged"
                  ? "history.damaged"
                  : "history.loadFailed",
        )}
      </span>
      <div className={styles.actions}>
        {exportFailed && (
          <button type="button" onClick={onRetryExport}>
            {t("history.retryExport")}
          </button>
        )}
        {status === "error" && (
          <button type="button" onClick={onRetry}>
            {t("history.retry")}
          </button>
        )}
      </div>
    </div>
  );
}
