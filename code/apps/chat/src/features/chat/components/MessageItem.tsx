import { useI18n } from "@/i18n/useI18n";
import { Icon } from "@/components/Icon/Icon";
import primitives from "@/styles/primitives.module.css";
import styles from "./MessageItem.module.css";
import { lazy, memo, Suspense, useState } from "react";
import {
  AlertCircle,
  Check,
  Copy,
  FileText,
  RotateCcw,
  Square,
} from "lucide-react";
import type { ChatMessage } from "../types";
import { isGenerating } from "../state/selectors";
import { AttachmentList } from "./AttachmentList";
import { ActivityPanel } from "./ActivityPanel";
import { MessageContentBoundary } from "./MessageContentBoundary";
import { MessageDiagnostics } from "./MessageDiagnostics";
import { useClipboard } from "@/hooks/useClipboard";
import { safeWebUrl } from "../lib/citations";
const MarkdownContent = lazy(() =>
  import("./MarkdownContent").then((module) => ({
    default: module.MarkdownContent,
  })),
);
export const MessageItem = memo(function MessageItem({
  message,
  canRetry,
  onRetry,
}: {
  message: ChatMessage;
  canRetry: boolean;
  onRetry?: () => void;
}) {
  const { t, notice } = useI18n();

  const { copy, copied, failed: copyError } = useClipboard();
  const [showSources, setShowSources] = useState(false);
  if (message.role === "user")
    return (
      <article
        className={styles["message"] + " " + styles["user-message"]}
        aria-label={t("message.user")}
      >
        <AttachmentList files={message.images ?? []} />
        {message.content && <div>{message.content}</div>}
      </article>
    );
  const generating = isGenerating(message);
  const references = Object.values(message.references);
  return (
    <article
      className={styles["message"] + " " + styles["assistant-message"]}
      aria-label={t("message.assistant")}
    >
      <div className={styles["assistant-heading"]}>
        <span className={primitives["brand-mark"] + " " + primitives["small"]}>
          Z
        </span>
        <span>{t("app.name")}</span>
        <span className={styles["assistant-label"]}>{t("message.answer")}</span>
      </div>
      <div className={styles["assistant-content"]}>
        {message.contextLimited && (
          <p className={styles["message-notice"]}>
            {t("history.contextLimited")}
          </p>
        )}
        <ActivityPanel message={message} />
        {message.content.trim() ? (
          <MessageContentBoundary content={message.content}>
            <Suspense
              fallback={
                <div className={styles["waiting"]}>
                  {t("message.formatting")}
                </div>
              }
            >
              <MarkdownContent
                content={message.content}
                references={message.references}
                streaming={generating}
              />
            </Suspense>
          </MessageContentBoundary>
        ) : (
          generating && (
            <div className={styles["waiting"]}>
              <span className={styles["loading-dots"]}>
                <i />
                <i />
                <i />
              </span>
              <span>
                {message.activities.length
                  ? t("message.preparing")
                  : message.requestStage === "preparing"
                    ? t("message.preparingAttachments")
                    : message.requestStage === "sending"
                      ? t("message.sending")
                      : message.requestStage === "waiting"
                        ? t("message.waitingModel")
                        : t("message.connecting")}
              </span>
            </div>
          )
        )}
        {generating && message.content.trim() && (
          <span
            className={styles["stream-cursor"]}
            aria-label={t("message.generating")}
          />
        )}
        {message.status === "stopped" && (
          <p className={styles["message-notice"]}>
            <Icon icon={Square} size="xs" />
            {t(message.interrupted ? "message.interrupted" : "message.stopped")}
          </p>
        )}
        {message.status === "empty" && (
          <p className={styles["message-notice"]}>
            <Icon icon={AlertCircle} size="md" />
            {t("message.empty")}
          </p>
        )}
        {message.status === "error" && (
          <div className={styles["error-notice"]} role="alert">
            <Icon icon={AlertCircle} size="md" />
            <span>{notice(message.error)}</span>
          </div>
        )}
        {!generating && (
          <div className={styles["message-actions"]}>
            {message.content.trim() && (
              <button
                type="button"
                className={primitives["icon-button"]}
                onClick={() => void copy(message.content)}
                aria-label={copied ? t("message.copied") : t("message.copy")}
                title={copyError ? t("message.copyFailed") : t("message.copy")}
              >
                {copied ? (
                  <Icon icon={Check} size="md" />
                ) : (
                  <Icon icon={Copy} size="md" />
                )}
              </button>
            )}
            {canRetry && (
              <button
                type="button"
                className={primitives["icon-button"]}
                aria-label={t("message.retry")}
                title={t("message.retry")}
                onClick={onRetry}
              >
                <Icon icon={RotateCcw} size="md" />
              </button>
            )}
            {references.length > 0 && (
              <button
                type="button"
                className={
                  styles["sources-button"] +
                  " " +
                  (showSources ? styles["active"] : "")
                }
                aria-expanded={showSources}
                onClick={() => setShowSources((v) => !v)}
              >
                <Icon icon={FileText} size="sm" />
                {t(
                  references.length === 1
                    ? "message.sourceOne"
                    : "message.sourceMany",
                  { count: references.length },
                )}
              </button>
            )}
            {copyError && (
              <span className={styles["copy-feedback"]} role="status">
                {t("message.copyFailed")}
              </span>
            )}
          </div>
        )}
        {message.status === "error" && message.requestId && (
          <MessageDiagnostics requestId={message.requestId} />
        )}
        {showSources && (
          <div className={styles["sources-list"]}>
            {references.map((ref, i) => (
              <a
                key={ref.id}
                href={safeWebUrl(ref.link)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>{i + 1}</span>
                <span>
                  {ref.title}
                  <small>{ref.media}</small>
                </span>
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  );
});
