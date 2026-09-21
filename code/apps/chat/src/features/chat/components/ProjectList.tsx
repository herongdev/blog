import { WindowedList } from "@/components/WindowedList/WindowedList";
import { useId, type ReactNode } from "react";
import {
  Folder,
  FolderOpen,
  FolderPlus,
  Pencil,
  Pin,
  PinOff,
  Trash2,
  Plus,
} from "lucide-react";
import { Icon } from "@/components/Icon/Icon";
import { useI18n } from "@/i18n/useI18n";
import type { ChatProject } from "../types";
import { ActionMenu } from "./ActionMenu";
import styles from "./ProjectList.module.css";

export type ProjectAction = "rename" | "pin" | "delete" | "new";

export function ProjectList({
  projects,
  onCreate,
  expandedIds,
  onToggle,
  onAction,
  children,
}: {
  projects: ChatProject[];
  onCreate: () => void;
  expandedIds: ReadonlySet<string>;
  onToggle: (id: string) => void;
  onAction: (id: string, action: ProjectAction) => void;
  children: (id: string) => ReactNode;
}) {
  const { t } = useI18n();
  const listId = useId();
  return (
    <section className={styles.projects} aria-label={t("project.projects")}>
      <h2>{t("project.projects")}</h2>
      <button type="button" className={styles.row} onClick={onCreate}>
        <Icon icon={FolderPlus} size="md" />
        <span>{t("project.create")}</span>
      </button>
      <WindowedList
        items={[...projects].sort(
          (a, b) =>
            (b.pinnedAt ?? 0) - (a.pinnedAt ?? 0) || a.createdAt - b.createdAt,
        )}
        itemKey={(project) => project.id}
      >
        {(project) => {
          const expanded = expandedIds.has(project.id);
          const chatsId = `${listId}-${project.id}`;
          return (
            <div
              key={project.id}
              data-project-id={project.id}
              data-pinned={!!project.pinnedAt}
            >
              <div className={styles.projectRow}>
                <button
                  type="button"
                  className={styles.row}
                  aria-expanded={expanded}
                  aria-controls={expanded ? chatsId : undefined}
                  title={project.name}
                  onClick={() => onToggle(project.id)}
                >
                  <Icon icon={expanded ? FolderOpen : Folder} size="md" />
                  <span>{project.name}</span>
                </button>
                {!!project.pinnedAt && <Icon icon={Pin} size="sm" />}
                <button
                  type="button"
                  className={styles.quickAdd}
                  aria-label={t("project.quickNew")}
                  title={t("project.quickNew")}
                  onClick={() => onAction(project.id, "new")}
                >
                  <Icon icon={Plus} size="md" />
                </button>
                <ActionMenu
                  label={t("project.actions")}
                  options={[
                    {
                      action: "rename",
                      label: t("project.rename"),
                      icon: Pencil,
                    },
                    {
                      action: "pin",
                      label: t(
                        project.pinnedAt ? "project.unpin" : "project.pin",
                      ),
                      icon: project.pinnedAt ? PinOff : Pin,
                      separator: true,
                    },
                    {
                      action: "delete",
                      label: t("project.delete"),
                      icon: Trash2,
                      destructive: true,
                    },
                  ]}
                  onAction={(action) => onAction(project.id, action)}
                />
              </div>
              {expanded && (
                <div id={chatsId} className={styles.chats}>
                  {children(project.id)}
                </div>
              )}
            </div>
          );
        }}
      </WindowedList>
    </section>
  );
}
