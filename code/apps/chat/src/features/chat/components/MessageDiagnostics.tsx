import { useI18n } from "@/i18n/useI18n";
import { useClipboard } from "@/hooks/useClipboard";
import styles from "./MessageDiagnostics.module.css";

export function MessageDiagnostics({ requestId }: { requestId: string }) {
  const { t } = useI18n();
  const { copy, copied, failed } = useClipboard();
  return (
    <details className={styles.details}>
      <summary>{t("message.problemDetails")}</summary>
      <div className={styles.content}>
        <p>{t("message.problemHelp")}</p>
        <code>{requestId}</code>
        <button type="button" onClick={() => void copy(requestId)}>
          {t("message.copyRequestId")}
        </button>
        <span role="status">
          {copied
            ? t("message.requestIdCopied")
            : failed
              ? t("message.copyFailed")
              : ""}
        </span>
      </div>
    </details>
  );
}
