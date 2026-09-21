import { useEffect, useId, useRef, useState } from "react";
import { useI18n } from "@/i18n/useI18n";
import styles from "./ConversationDialog.module.css";

export function ConversationDialog({
  mode,
  title,
  onClose,
  onConfirm,
}: {
  mode: "rename" | "delete";
  title: string;
  onClose: () => void;
  onConfirm: (title: string) => void;
}) {
  const { t } = useI18n();
  const id = useId();
  const dialog = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const cancel = useRef<HTMLButtonElement>(null);
  const [value, setValue] = useState(title);
  useEffect(() => {
    const node = dialog.current!;
    node.showModal();
    if (mode === "rename") {
      input.current?.focus();
      input.current?.select();
    } else cancel.current?.focus();
    return () => node.close();
  }, [mode]);
  function close() {
    dialog.current?.close();
    onClose();
  }
  return (
    <dialog
      ref={dialog}
      className={styles.dialog}
      aria-labelledby={`${id}-title`}
      onCancel={(event) => {
        event.preventDefault();
        close();
      }}
    >
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (mode === "rename" && !value.trim()) return;
          dialog.current?.close();
          onConfirm(value.trim());
        }}
      >
        <h2 id={`${id}-title`}>
          {t(mode === "rename" ? "conversation.rename" : "conversation.delete")}
        </h2>
        {mode === "rename" ? (
          <label className={styles.field}>
            <span>{t("conversation.title")}</span>
            <input
              ref={input}
              value={value}
              maxLength={80}
              required
              onChange={(event) => setValue(event.target.value)}
            />
          </label>
        ) : (
          <p>{t("conversation.deleteConfirm", { title })}</p>
        )}
        <div className={styles.actions}>
          <button ref={cancel} type="button" onClick={close}>
            {t("conversation.cancel")}
          </button>
          <button
            type="submit"
            className={styles.confirm}
            data-danger={mode === "delete"}
            disabled={mode === "rename" && !value.trim()}
          >
            {t(mode === "rename" ? "conversation.save" : "conversation.delete")}
          </button>
        </div>
      </form>
    </dialog>
  );
}
