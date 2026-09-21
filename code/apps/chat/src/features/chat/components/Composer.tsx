import { useI18n } from "@/i18n/useI18n";
import { Icon } from "@/components/Icon/Icon";
import styles from "./Composer.module.css";
import { useRef, type FormEvent, type ReactNode } from "react";
import { ArrowUp, Square } from "lucide-react";
import { useAutosizeTextarea } from "@/hooks/useAutosizeTextarea";
import type { ProviderId } from "@shared/contracts/chat";
import { ComposerTools } from "./ComposerTools";
import { supportsThinkingToggle } from "@shared/contracts/modelCapabilities";
import { AttachmentList } from "./AttachmentList";
import type { AttachmentController } from "../hooks/useAttachments";
import { isImageAttachment, type ImageAttachment } from "../types";
import { supportsImages, requestImageBudget } from "@shared/contracts/images";
import {
  attachmentMessage,
  attachmentAccept,
  attachmentCapabilityError,
  attachmentLimit,
  type AttachmentKind,
} from "../lib/attachments";
export function Composer({
  conversationId,
  provider,
  modelControl,
  thinking,
  onThinking,
  generating,
  configured,
  onSend,
  onStop,
  onConfigure,
  draft,
  attachments,
  model,
  historyImageBytes,
  onDraftChange,
}: {
  conversationId: string;
  provider: ProviderId;
  modelControl?: ReactNode;
  thinking: boolean;
  onThinking: () => void;
  generating: boolean;
  configured: boolean;
  onSend: (text: string, images: ImageAttachment[]) => void;
  onStop: () => void;
  onConfigure: () => void;
  draft: string;
  attachments: AttachmentController;
  model: string;
  historyImageBytes: number;
  onDraftChange: (conversationId: string, value: string) => void;
}) {
  const { t } = useI18n();

  const text = draft;
  const images = attachments.files.filter(isImageAttachment);
  const imageUnsupported =
    (images.length > 0 || historyImageBytes > 0) &&
    !supportsImages(provider, model);
  const imageBudgetExceeded =
    images.reduce(
      (sum, image) => sum + (image.encodedSize ?? image.dataUrl.length),
      0,
    ) > requestImageBudget;
  const fileInput = useRef<HTMLInputElement>(null);
  const attachmentReasons = {
    text: attachmentCapabilityError(provider, model, "text"),
    image: attachmentCapabilityError(provider, model, "image"),
  };
  function disabledReason(kind: AttachmentKind) {
    const reason = attachmentReasons[kind];
    if (reason) return t(`composer.attachmentError.${reason}`);
    if (attachments.reading) return t("composer.attachmentReading");
    if (attachments.files.length >= attachmentLimit)
      return t("composer.attachmentError.count");
  }
  function openPicker(kind: AttachmentKind) {
    if (generating || disabledReason(kind) || !fileInput.current) return;
    fileInput.current.accept = attachmentAccept[kind];
    fileInput.current.click();
  }
  const hasDraft = Boolean(text.trim()) || attachments.files.length > 0;
  function setText(value: string) {
    onDraftChange(conversationId, value);
  }
  const textarea = useAutosizeTextarea(text);
  function submit(event?: FormEvent) {
    event?.preventDefault();
    if (
      generating ||
      attachments.reading ||
      !hasDraft ||
      imageUnsupported ||
      imageBudgetExceeded ||
      (provider === "local" && attachments.files.length > 0)
    )
      return;
    if (!configured) {
      onConfigure();
      return;
    }
    onSend(attachmentMessage(text, attachments.files), images);
    attachments.clear();
  }
  return (
    <div className={styles["composer-wrap"]}>
      <form className={styles["composer"]} onSubmit={submit}>
        <AttachmentList
          files={attachments.files}
          onRemove={attachments.remove}
        />
        <input
          ref={fileInput}
          type="file"
          hidden
          multiple
          accept={
            supportsImages(provider, model)
              ? `${attachmentAccept.text},${attachmentAccept.image}`
              : attachmentAccept.text
          }
          aria-label={t("composer.addAttachment")}
          disabled={generating || attachments.reading || provider === "local"}
          onChange={(event) => {
            const files = Array.from(event.currentTarget.files ?? []);
            event.currentTarget.value = "";
            void attachments.add(files);
          }}
        />
        <textarea
          onPaste={(event) => {
            const files = Array.from(event.clipboardData?.files ?? []);
            if (files.length && !generating && !attachments.reading) {
              event.preventDefault();
              void attachments.add(files);
            }
          }}
          ref={textarea}
          aria-label={t("composer.input")}
          rows={1}
          value={text}
          maxLength={12000}
          placeholder={
            provider === "local"
              ? t("composer.localPlaceholder")
              : t("composer.remotePlaceholder")
          }
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (
              e.key === "Enter" &&
              !e.shiftKey &&
              !e.nativeEvent.isComposing &&
              e.keyCode !== 229
            ) {
              e.preventDefault();
              submit();
            }
          }}
        />
        <div className={styles["composer-toolbar"]}>
          <ComposerTools
            key={`${conversationId}:${provider}:${model}`}
            disabled={generating}
            textDisabledReason={disabledReason("text")}
            imageDisabledReason={disabledReason("image")}
            onAttach={openPicker}
            thinking={thinking}
            onThinking={
              supportsThinkingToggle(provider, model) ? onThinking : undefined
            }
          />
          <div className={styles["composer-options"]}>{modelControl}</div>
          {generating ? (
            <button
              type="button"
              className={styles["send-button"] + " " + styles["stop-button"]}
              aria-label={t("composer.stop")}
              onClick={(event) => {
                // React can reuse this node as the submit button after stopping.
                // Cancel this click's default action before changing its type.
                event.preventDefault();
                onStop();
              }}
            >
              <Icon icon={Square} size="md" fill="currentColor" />
            </button>
          ) : (
            <button
              type="submit"
              className={styles["send-button"]}
              aria-label={t("composer.send")}
              disabled={
                !hasDraft ||
                attachments.reading ||
                imageUnsupported ||
                imageBudgetExceeded ||
                (provider === "local" && attachments.files.length > 0)
              }
            >
              <Icon icon={ArrowUp} size="lg" weight="strong" />
            </button>
          )}
        </div>
        {(imageUnsupported ||
          (provider === "local" && attachments.files.length > 0)) && (
          <p className={styles["attachment-status"]} role="status">
            {t(
              imageUnsupported
                ? "image.unsupported"
                : "composer.attachmentLocal",
            )}
          </p>
        )}
        {imageBudgetExceeded && (
          <p className={styles["attachment-error"]} role="alert">
            {t("image.budget")}
          </p>
        )}
        {attachments.reading && (
          <p className={styles["attachment-status"]} role="status">
            {t("composer.attachmentReading")}
          </p>
        )}
        {attachments.error && (
          <p className={styles["attachment-error"]} role="alert">
            {t(`composer.attachmentError.${attachments.error}`)}
          </p>
        )}
      </form>
      <p className={styles["composer-note"]} data-source={provider}>
        {provider !== "local" && t("composer.remoteNote")}
        <span>{t("composer.shortcuts")}</span>
      </p>
    </div>
  );
}
