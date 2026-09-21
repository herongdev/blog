import {
  Archive,
  Download,
  ArchiveRestore,
  FolderInput,
  MessageSquare,
  LoaderCircle,
  Pencil,
  Pin,
  PinOff,
  Trash2,
} from "lucide-react";
import { Icon } from "@/components/Icon/Icon";
import { useI18n } from "@/i18n/useI18n";
import { ActionMenu } from "./ActionMenu";
import type { Conversation } from "../types";
import styles from "./ConversationItem.module.css";

export type ConversationAction =
  "rename" | "pin" | "archive" | "delete" | "move" | "export";
export function ConversationItem({
  conversation,
  title,
  selected,
  onSelect,
  onAction,
}: {
  conversation: Conversation;
  title: string;
  selected: boolean;
  onSelect: () => void;
  onAction: (action: ConversationAction) => void;
}) {
  const { t } = useI18n();
  const options = [
    { action: "rename", label: t("conversation.rename"), icon: Pencil },
    {
      action: "pin",
      separator: true,
      label: t(
        conversation.pinnedAt ? "conversation.unpin" : "conversation.pin",
      ),
      icon: conversation.pinnedAt ? PinOff : Pin,
    },
    {
      action: "archive",
      label: t(
        conversation.archived
          ? "conversation.unarchive"
          : "conversation.archive",
      ),
      icon: conversation.archived ? ArchiveRestore : Archive,
    },
    { action: "export", label: t("conversation.export"), icon: Download },
    { action: "move", label: t("project.move"), icon: FolderInput },
    {
      action: "delete",
      label: t("conversation.delete"),
      icon: Trash2,
      destructive: true,
    },
  ] as const;
  return (
    <div
      className={styles.row}
      role="group"
      aria-label={title}
      data-selected={selected}
      data-conversation-id={conversation.id}
      data-pinned={!!conversation.pinnedAt}
    >
      <button
        type="button"
        className={styles.select}
        aria-current={selected ? "page" : undefined}
        title={title}
        onClick={onSelect}
      >
        <Icon icon={MessageSquare} size="md" />
        <span>{title}</span>
      </button>
      {conversation.generating && (
        <span
          className={styles.generating}
          role="img"
          aria-label={t("message.generating")}
          title={t("message.generating")}
        >
          <Icon icon={LoaderCircle} size="sm" />
        </span>
      )}
      {!!conversation.pinnedAt && (
        <span className={styles.pin} title={t("conversation.pinned")}>
          <Icon icon={Pin} size="sm" />
        </span>
      )}
      <ActionMenu
        label={t("conversation.actions")}
        options={options}
        onAction={onAction}
      />
    </div>
  );
}
