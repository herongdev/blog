import { useMessageViewState } from "../hooks/useMessageViewState";
import { useI18n } from "@/i18n/useI18n";
import { Icon } from "@/components/Icon/Icon";
import styles from "./ActivityPanel.module.css";
import { useEffect, useState } from "react";
import {
  Check,
  ChevronDown,
  Circle,
  Search,
  Sparkles,
  Square,
} from "lucide-react";
import type { ChatMessage } from "../types";
import { isGenerating } from "../state/selectors";
export function ActivityPanel({ message }: { message: ChatMessage }) {
  const { t } = useI18n();

  const [expanded, setExpanded] = useMessageViewState<boolean>(
    "activity",
    false,
  );
  const [now, setNow] = useState(() => Date.now());
  const generating = isGenerating(message);
  useEffect(() => {
    if (!generating) return;
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, [generating]);
  if (!message.activities.length) return null;
  const seconds = Math.max(
    0,
    Math.round(((message.finishedAt ?? now) - message.createdAt) / 1000),
  );
  const active = message.activities.find((a) => a.status === "running");
  return (
    <div className={styles["activity-panel"]}>
      <button
        type="button"
        className={styles["activity-toggle"]}
        data-activity-toggle
        aria-expanded={expanded}
        onClick={() => setExpanded((v) => !v)}
      >
        <Icon
          icon={Sparkles}
          size="md"
          className={generating ? styles["thinking-spark"] : ""}
        />
        <span>
          {generating && active
            ? active.kind === "tool"
              ? t("activity.searching")
              : t("activity.thinking")
            : t("activity.title")}
        </span>
        <span className={styles["activity-time"]}>{seconds}s</span>
        <Icon
          icon={ChevronDown}
          size="sm"
          className={expanded ? styles["rotated"] : ""}
        />
      </button>
      {expanded && (
        <div className={styles["activity-timeline"]}>
          {message.activities.map((activity) => (
            <div className={styles["activity-step"]} key={activity.id}>
              <span
                className={
                  styles["activity-dot"] + " " + (styles[activity.status] ?? "")
                }
              >
                {activity.status === "complete" ? (
                  <Icon icon={Check} size="xs" />
                ) : activity.status === "stopped" ? (
                  <Icon icon={Square} size="xs" />
                ) : (
                  <Icon icon={Circle} size="xs" />
                )}
              </span>
              <div className={styles["activity-step-content"]}>
                <div className={styles["activity-step-title"]}>
                  {activity.kind === "tool" && <Icon icon={Search} size="sm" />}
                  {activity.kind === "reasoning"
                    ? t("activity.reasoning")
                    : activity.title}
                  <span>
                    {activity.status === "running"
                      ? t("activity.running")
                      : activity.status === "stopped"
                        ? t("activity.stopped")
                        : activity.status === "error"
                          ? t("activity.error")
                          : t("activity.complete")}
                  </span>
                </div>
                <div className={styles["activity-text"]}>
                  {activity.content.trim() || t("activity.preparing")}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
