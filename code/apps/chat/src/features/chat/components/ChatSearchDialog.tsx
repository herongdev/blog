import { useEffect, useId, useRef, type KeyboardEvent } from "react";
import { Search, X, MessageSquare } from "lucide-react";
import { Icon } from "@/components/Icon/Icon";
import { useI18n } from "@/i18n/useI18n";
import primitives from "@/styles/primitives.module.css";
import type { ChatProject, Conversation } from "../types";
import { useChatSearch } from "../hooks/useChatSearch";
import {
  searchPattern,
  searchResultLimit,
  type SearchChats,
} from "../lib/searchConversations";
import styles from "./ChatSearchDialog.module.css";

function Highlight({ text, query }: { text: string; query: string }) {
  const match = searchPattern(query)?.exec(text);
  if (!match) return text;
  return (
    <>
      {text.slice(0, match.index)}
      <mark>{match[0]}</mark>
      {text.slice(match.index + match[0].length)}
    </>
  );
}

export function ChatSearchDialog({
  onSearch,
  projects,
  onClose,
  onSelect,
}: {
  onSearch: SearchChats;
  projects: ChatProject[];
  onClose: () => void;
  onSelect: (conversation: Conversation) => void;
}) {
  const { t } = useI18n();
  const id = useId();
  const dialog = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const search = useChatSearch(onSearch);
  useEffect(() => {
    const node = dialog.current!;
    node.showModal();
    input.current?.focus();
    return () => node.close();
  }, []);
  function close() {
    dialog.current?.close();
    onClose();
  }
  function select(conversation: Conversation) {
    dialog.current?.close();
    onSelect(conversation);
  }
  function navigate(event: KeyboardEvent, fromInput = false) {
    if (event.nativeEvent.isComposing || search.pending) return;
    const buttons = Array.from(list.current?.querySelectorAll("button") ?? []);
    if (fromInput && event.key === "Enter" && search.results.items[0]) {
      event.preventDefault();
      select(search.results.items[0].conversation);
      return;
    }
    if (!["ArrowDown", "ArrowUp"].includes(event.key) || !buttons.length)
      return;
    event.preventDefault();
    const current = buttons.indexOf(
      document.activeElement as HTMLButtonElement,
    );
    const next =
      current < 0
        ? event.key === "ArrowDown"
          ? 0
          : buttons.length - 1
        : (current + (event.key === "ArrowDown" ? 1 : -1) + buttons.length) %
          buttons.length;
    buttons[next].focus();
    buttons[next].scrollIntoView({ block: "nearest" });
  }
  return (
    <dialog
      ref={dialog}
      className={styles.dialog}
      aria-labelledby={`${id}-title`}
      onKeyDown={(event) => {
        if (event.key === "Escape" && !event.nativeEvent.isComposing) {
          event.preventDefault();
          event.stopPropagation();
          close();
        }
      }}
      onCancel={(event) => {
        event.preventDefault();
        close();
      }}
    >
      <header className={styles.header}>
        <h2 id={`${id}-title`}>{t("search.title")}</h2>
        <button
          type="button"
          className={primitives["icon-button"]}
          aria-label={t("search.close")}
          onClick={close}
        >
          <Icon icon={X} size="md" />
        </button>
      </header>
      <div className={styles.inputRow}>
        <Icon icon={Search} size="md" />
        <input
          ref={input}
          type="search"
          autoComplete="off"
          maxLength={200}
          aria-label={t("search.input")}
          placeholder={t("search.placeholder")}
          value={search.query}
          onChange={(event) => search.setQuery(event.target.value)}
          onKeyDown={(event) => navigate(event, true)}
        />
      </div>
      <p className={styles.summary} role="status">
        {search.query.trim()
          ? t("search.count", { count: search.results.total })
          : t("search.recent")}
        {search.results.total > searchResultLimit &&
          ` · ${t("search.pageSize", { count: searchResultLimit })}`}
      </p>
      <ul
        ref={list}
        className={styles.results}
        aria-label={t("search.results")}
        aria-busy={search.pending}
        onKeyDown={(event) => navigate(event)}
      >
        {search.results.items.map(({ conversation, title, snippet }) => {
          const project = projects.find(
            (p) => p.id === conversation.projectId && !p.deleted,
          );
          return (
            <li key={conversation.id}>
              <button
                type="button"
                disabled={search.pending}
                onClick={() => select(conversation)}
              >
                <Icon icon={MessageSquare} size="md" />
                <span className={styles.resultText}>
                  <strong>
                    <Highlight
                      text={
                        title ||
                        t(conversation.hasDraft ? "nav.draft" : "nav.untitled")
                      }
                      query={search.matchedQuery}
                    />
                  </strong>
                  {!!snippet && (
                    <span className={styles.snippet}>
                      <Highlight text={snippet} query={search.matchedQuery} />
                    </span>
                  )}
                  {(project || conversation.archived) && (
                    <span className={styles.metadata}>
                      {[
                        project?.name,
                        conversation.archived
                          ? t("conversation.archived")
                          : undefined,
                      ]
                        .filter(Boolean)
                        .join(" · ")}
                    </span>
                  )}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      {search.error && <p role="alert">{t("search.error")}</p>}
      {!search.pending && !search.error && !search.results.total && (
        <p className={styles.empty}>
          {t(search.query.trim() ? "search.noResults" : "search.empty")}
        </p>
      )}
      {(search.offset > 0 ||
        search.offset + searchResultLimit < search.results.total) && (
        <div className={styles.pages}>
          <button
            type="button"
            disabled={search.pending || search.offset === 0}
            onClick={search.previous}
          >
            {t("search.previous")}
          </button>
          <span>
            {search.offset + 1}–
            {Math.min(search.offset + searchResultLimit, search.results.total)}{" "}
            / {search.results.total}
          </span>
          <button
            type="button"
            disabled={
              search.pending ||
              search.offset + searchResultLimit >= search.results.total
            }
            onClick={search.next}
          >
            {t("search.next")}
          </button>
        </div>
      )}
    </dialog>
  );
}
