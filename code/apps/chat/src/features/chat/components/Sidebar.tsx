import { useProjectDisclosure } from "../hooks/useProjectDisclosure";
import { useStableEvent } from "@/hooks/useStableEvent";
import type { ConversationCatalog } from "../types";
import { WindowedList } from "@/components/WindowedList/WindowedList";
import type { SearchChats } from "../lib/searchConversations";
import { messageCount } from "../lib/conversationSummary";
import { useI18n } from "@/i18n/useI18n";
import { Icon } from "@/components/Icon/Icon";
import primitives from "@/styles/primitives.module.css";
import styles from "./Sidebar.module.css";
import {
  memo,
  useSyncExternalStore,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";
import {
  FloatingFocusManager,
  useDismiss,
  useFloating,
  useInteractions,
} from "@floating-ui/react";
import { ArrowLeft, PanelLeft, Plus, Search } from "lucide-react";
import { ConversationItem, type ConversationAction } from "./ConversationItem";
import { ConversationDialog } from "./ConversationDialog";
import { ProjectList, type ProjectAction } from "./ProjectList";
import { ChatSearchDialog } from "./ChatSearchDialog";
import { ProjectDialog } from "./ProjectDialog";
import type { Conversation, ChatProject } from "../types";
interface SidebarProps {
  directories: Record<
    string,
    { more: boolean; total: number; error?: boolean }
  >;
  onLoadDirectory: (scope: string, more?: boolean) => Promise<void>;
  onSearch: SearchChats;
  id: string;
  open: boolean;
  mobile: boolean;
  openButtonRef: RefObject<HTMLButtonElement | null>;
  closeButtonRef: RefObject<HTMLButtonElement | null>;
  catalog: ConversationCatalog;
  projects: ChatProject[];
  onCreateProject: (name: string) => void;
  onMoveToProject: (id: string, projectId?: string) => void;
  activeId: string;
  onManageProject: (id: string, action: ProjectAction, name?: string) => void;
  onClose: () => void;
  onCreate: () => void;
  onSelect: (id: string) => void;
  renderFooter: (onOpenArchive: () => void) => ReactNode;
  onManage: (
    id: string,
    action: Exclude<ConversationAction, "move">,
    title?: string,
  ) => void;
}
export function Sidebar(props: SidebarProps) {
  const conversations = useSyncExternalStore(
    props.catalog.subscribe,
    props.catalog.getSnapshot,
  );
  const onCreate = useStableEvent(props.onCreate);
  const onSelect = useStableEvent(props.onSelect);
  const onManage = useStableEvent(props.onManage);
  const onCreateProject = useStableEvent(props.onCreateProject);
  const onMoveToProject = useStableEvent(props.onMoveToProject);
  const onManageProject = useStableEvent(props.onManageProject);
  return (
    <SidebarView
      {...props}
      conversations={conversations}
      onCreate={onCreate}
      onSelect={onSelect}
      onManage={onManage}
      onCreateProject={onCreateProject}
      onMoveToProject={onMoveToProject}
      onManageProject={onManageProject}
    />
  );
}
const SidebarView = memo(function SidebarView({
  directories,
  onLoadDirectory,
  id,
  onSearch,
  open,
  mobile,
  openButtonRef,
  closeButtonRef,
  conversations,
  activeId,
  onClose,
  onCreate,
  onSelect,
  renderFooter,
  onManage,
  projects,
  onCreateProject,
  onMoveToProject,
  onManageProject,
}: SidebarProps & { conversations: Conversation[] }) {
  const { t } = useI18n();
  const [searchOpen, setSearchOpen] = useState(false);
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (
        event.defaultPrevented ||
        event.isComposing ||
        event.altKey ||
        event.shiftKey
      )
        return;
      if (
        (event.metaKey || event.ctrlKey) &&
        event.key.toLowerCase() === "k" &&
        !document.querySelector("dialog[open]")
      ) {
        event.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);
  const [archivedView, setArchivedView] = useState(
    () => !!conversations.find((c) => c.id === activeId)?.archived,
  );
  const openArchive = useStableEvent(() => setArchivedView(true));
  const [dialog, setDialog] = useState<{
    id: string;
    mode: "rename" | "delete";
    title: string;
  } | null>(null);
  const [projectDialog, setProjectDialog] = useState<
    | { mode: "create" }
    | { mode: "rename" | "delete"; projectId: string; name: string }
    | { mode: "move"; conversationId: string; projectId?: string }
    | null
  >(null);
  const activeProjectId = conversations.find(
    (c) => c.id === activeId,
  )?.projectId;
  const { expandedIds, expand, toggle } = useProjectDisclosure(
    projects,
    activeProjectId,
  );
  useEffect(() => {
    if (archivedView) {
      void onLoadDirectory("archived");
      return;
    }
    void onLoadDirectory("history");
    for (const projectId of expandedIds) {
      void onLoadDirectory(`project:${projectId}`);
    }
  }, [onLoadDirectory, archivedView, expandedIds]);
  const moreButton = (key: string) =>
    directories[key]?.more && (
      <button
        type="button"
        className={styles["load-more"]}
        onClick={() => void onLoadDirectory(key, true)}
      >
        {t(directories[key].error ? "history.retryRead" : "history.loadMore")}
      </button>
    );
  const newButton = useRef<HTMLButtonElement>(null);
  const available = conversations.filter((c) => !c.deleted);
  const visible = available
    .filter(
      (c) =>
        !!c.archived === archivedView &&
        (messageCount(c) ||
          c.hasDraft ||
          c.titleEdited ||
          c.pinnedAt ||
          c.id === activeId),
    )
    .sort((a, b) => (b.pinnedAt ?? 0) - (a.pinnedAt ?? 0));
  function conversationTitle(c: Conversation) {
    return messageCount(c) || c.titleEdited
      ? c.title
      : t(c.hasDraft ? "nav.draft" : "nav.untitled");
  }

  function renderConversation(conversation: Conversation) {
    return (
      <ConversationItem
        key={`${open}-${conversation.id}`}
        conversation={conversation}
        title={conversationTitle(conversation)}
        selected={conversation.id === activeId}
        onSelect={() => {
          onSelect(conversation.id);
          if (mobile) onClose();
        }}
        onAction={(action) => {
          if (action === "move")
            setProjectDialog({
              mode: "move",
              conversationId: conversation.id,
              projectId: conversation.projectId,
            });
          else if (action === "rename" || action === "delete")
            setDialog({
              id: conversation.id,
              mode: action,
              title: conversationTitle(conversation),
            });
          else {
            onManage(conversation.id, action);
            if (action === "archive") newButton.current?.focus();
          }
        }}
      />
    );
  }

  const { refs, context } = useFloating({
    open: mobile && open,
    onOpenChange: (next) => {
      if (!next) onClose();
    },
  });
  const { getFloatingProps } = useInteractions([
    useDismiss(context, {
      enabled: mobile && !dialog && !projectDialog && !searchOpen,
      outsidePress: false,
    }),
  ]);
  return (
    <>
      <button
        type="button"
        tabIndex={-1}
        className={styles["sidebar-scrim"]}
        data-open={mobile && open}
        inert={!mobile || !open}
        aria-hidden={!mobile || !open}
        aria-label={t("nav.closeSidebar")}
        onClick={onClose}
      />
      <div className={styles["sidebar-slot"]} data-open={open}>
        <FloatingFocusManager
          context={context}
          disabled={!mobile || !open}
          initialFocus={closeButtonRef}
          returnFocus={openButtonRef}
        >
          <aside
            id={id}
            ref={refs.setFloating}
            role={mobile ? "dialog" : undefined}
            aria-modal={mobile ? true : undefined}
            aria-label={t("nav.sidebar")}
            aria-hidden={!open}
            inert={!open}
            data-open={open}
            className={styles["sidebar"]}
            {...getFloatingProps()}
          >
            <div className={styles["sidebar-brand"]}>
              <span className={primitives["brand-mark"]}>Z</span>
              <span>
                {t("app.name")}
                <span className={styles["brand-en"]}>ZHIXU</span>
              </span>
              <button
                type="button"
                className={
                  primitives["icon-button"] + " " + styles["sidebar-search"]
                }
                aria-label={t("search.title")}
                title={t("search.shortcut")}
                aria-keyshortcuts="Control+k Meta+k"
                onClick={() => setSearchOpen(true)}
              >
                <Icon icon={Search} size="lg" weight="light" />
              </button>
              <button
                ref={closeButtonRef}
                type="button"
                className={
                  primitives["icon-button"] + " " + styles["sidebar-close"]
                }
                aria-label={t("nav.collapseSidebar")}
                title={t("nav.collapseSidebar")}
                aria-controls={id}
                aria-expanded={open}
                onClick={onClose}
              >
                <Icon icon={PanelLeft} size="lg" weight="light" />
              </button>
            </div>
            <button
              ref={newButton}
              className={styles["new-chat-button"]}
              onClick={() => {
                setArchivedView(false);
                onCreate();
                if (mobile) onClose();
              }}
            >
              <Icon icon={Plus} size="md" />
              {t("nav.newChat")}
            </button>
            <div className={styles["navigation-scroll"]}>
              {!archivedView && (
                <ProjectList
                  key={String(open)}
                  projects={projects}
                  onAction={(id, action) => {
                    const project = projects.find((p) => p.id === id);
                    if (!project) return;
                    if (action === "rename" || action === "delete")
                      setProjectDialog({
                        mode: action,
                        projectId: id,
                        name: project.name,
                      });
                    else {
                      if (action === "new") expand(id);
                      onManageProject(id, action);
                      if (mobile && action === "new") onClose();
                    }
                  }}
                  onCreate={() => setProjectDialog({ mode: "create" })}
                  expandedIds={expandedIds}
                  onToggle={toggle}
                >
                  {(projectId) => (
                    <>
                      <WindowedList
                        items={visible.filter((c) => c.projectId === projectId)}
                        itemKey={(c) => c.id}
                      >
                        {renderConversation}
                      </WindowedList>
                      {moreButton(`project:${projectId}`)}
                    </>
                  )}
                </ProjectList>
              )}
              {archivedView && (
                <button
                  type="button"
                  className={styles["archive-back"]}
                  onClick={() => {
                    setArchivedView(false);
                    newButton.current?.focus();
                  }}
                >
                  <Icon icon={ArrowLeft} size="md" />
                  {t("conversation.back")}
                </button>
              )}
              <div className={styles["sidebar-section-label"]}>
                {t(archivedView ? "conversation.archived" : "nav.history")}
              </div>
              <nav
                className={styles["conversation-list"]}
                aria-label={t(
                  archivedView ? "conversation.archived" : "nav.history",
                )}
              >
                <WindowedList
                  items={visible.filter(
                    (c) =>
                      archivedView ||
                      !projects.some((p) => p.id === c.projectId),
                  )}
                  itemKey={(c) => c.id}
                >
                  {renderConversation}
                </WindowedList>
                {moreButton(archivedView ? "archived" : "history")}
                {archivedView && visible.length === 0 && (
                  <p className={styles["empty-archive"]}>
                    {t("conversation.archiveEmpty")}
                  </p>
                )}
              </nav>
            </div>
            <div className={styles["sidebar-bottom"]}>
              {renderFooter(openArchive)}
            </div>
          </aside>
        </FloatingFocusManager>
      </div>
      {searchOpen && (
        <ChatSearchDialog
          onSearch={onSearch}
          projects={projects}
          onClose={() => setSearchOpen(false)}
          onSelect={(conversation) => {
            setArchivedView(!!conversation.archived);
            setSearchOpen(false);
            onSelect(conversation.id);
            if (mobile) onClose();
          }}
        />
      )}
      {projectDialog && (
        <ProjectDialog
          mode={projectDialog.mode}
          initialName={"name" in projectDialog ? projectDialog.name : undefined}
          projects={projects}
          projectId={
            projectDialog.mode === "move" ? projectDialog.projectId : undefined
          }
          onClose={() => setProjectDialog(null)}
          onConfirm={(value) => {
            if (projectDialog.mode === "create") {
              setArchivedView(false);
              onCreateProject(value);
              if (mobile) onClose();
            } else if (projectDialog.mode === "move")
              onMoveToProject(projectDialog.conversationId, value || undefined);
            else
              onManageProject(
                projectDialog.projectId,
                projectDialog.mode,
                value,
              );
            setProjectDialog(null);
            newButton.current?.focus();
          }}
        />
      )}
      {dialog && (
        <ConversationDialog
          key={`${dialog.id}-${dialog.mode}`}
          mode={dialog.mode}
          title={dialog.title}
          onClose={() => setDialog(null)}
          onConfirm={(title) => {
            onManage(dialog.id, dialog.mode, title);
            setDialog(null);
            if (dialog.mode === "delete") newButton.current?.focus();
          }}
        />
      )}
    </>
  );
});
