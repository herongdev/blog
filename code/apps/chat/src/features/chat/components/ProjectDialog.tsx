import { useEffect, useId, useRef, useState } from "react";
import { Folder, FolderPlus, Check } from "lucide-react";
import { Icon } from "@/components/Icon/Icon";
import { useI18n } from "@/i18n/useI18n";
import type { ChatProject } from "../types";
import styles from "./ProjectDialog.module.css";

export function ProjectDialog({
  mode,
  initialName = "",
  projects,
  projectId,
  onClose,
  onConfirm,
}: {
  mode: "create" | "move" | "rename" | "delete";
  initialName?: string;
  projects: ChatProject[];
  projectId?: string;
  onClose: () => void;
  onConfirm: (value: string) => void;
}) {
  const { t } = useI18n();
  const id = useId();
  const dialog = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const [name, setName] = useState(initialName);
  useEffect(() => {
    const node = dialog.current!;
    node.showModal();
    input.current?.focus();
    if (mode === "rename") input.current?.select();
    return () => node.close();
  }, [mode]);
  function close() {
    dialog.current?.close();
    onClose();
  }
  function confirm(value: string) {
    dialog.current?.close();
    onConfirm(value);
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
      <h2 id={`${id}-title`} className={styles.title}>
        <Icon icon={mode === "create" ? FolderPlus : Folder} size="lg" />
        {t(`project.${mode}`)}
      </h2>
      {mode === "delete" ? (
        <>
          <p>{t("project.deleteConfirm", { name: initialName })}</p>
          <div className={styles.actions}>
            <button type="button" autoFocus onClick={close}>
              {t("conversation.cancel")}
            </button>
            <button
              type="button"
              className={styles.confirm}
              data-danger="true"
              onClick={() => confirm("")}
            >
              {t("project.delete")}
            </button>
          </div>
        </>
      ) : mode !== "move" ? (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            if (name.trim()) confirm(name.trim());
          }}
        >
          <label className={styles.field}>
            <span>{t("project.name")}</span>
            <input
              ref={input}
              value={name}
              maxLength={80}
              required
              placeholder={t("project.placeholder")}
              onChange={(event) => setName(event.target.value)}
            />
          </label>
          <div className={styles.actions}>
            <button type="button" onClick={close}>
              {t("conversation.cancel")}
            </button>
            <button
              type="submit"
              className={styles.confirm}
              disabled={!name.trim()}
            >
              {t(mode === "rename" ? "conversation.save" : "project.create")}
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className={styles.destinations}>
            {[{ id: "", name: t("project.none") }, ...projects].map(
              (project) => (
                <button
                  key={project.id}
                  type="button"
                  className={styles.destination}
                  aria-pressed={project.id === (projectId ?? "")}
                  onClick={() => confirm(project.id)}
                >
                  <Icon icon={Folder} size="md" />
                  <span>{project.name}</span>
                  {project.id === (projectId ?? "") && (
                    <Icon icon={Check} size="md" />
                  )}
                </button>
              ),
            )}
          </div>
          <div className={styles.actions}>
            <button type="button" onClick={close}>
              {t("conversation.cancel")}
            </button>
          </div>
        </>
      )}
    </dialog>
  );
}
