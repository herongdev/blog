import { ConversationOpenStatus } from "@/features/chat/components/ConversationOpenStatus";
import { useI18n } from "@/i18n/useI18n";
import { PreferencesDialog } from "@/preferences/PreferencesDialog";
import { usePreferences } from "@/preferences/PreferencesProvider";
import { Icon } from "@/components/Icon/Icon";
import primitives from "../styles/primitives.module.css";
import styles from "./App.module.css";
import { useFileDrop } from "@/hooks/useFileDrop";
import { useStableEvent } from "@/hooks/useStableEvent";
import { useCallback, useMemo, useState } from "react";
import { X } from "lucide-react";
import { useChatWorkspace } from "./useChatWorkspace";
import { useSidebarDisclosure } from "./useSidebarDisclosure";
import { Sidebar } from "@/features/chat/components/Sidebar";
import { ChatHeader } from "./ChatHeader";
import { UserSettingsMenu } from "./UserSettingsMenu";
import { Welcome } from "@/features/chat/components/Welcome";
import { MessageList } from "@/features/chat/components/MessageList";
import { ChatViewport } from "@/features/chat/components/ChatViewport";
import { ModelSelector } from "@/features/model-settings/components/ModelSelector";
import { ReplayControls } from "@/features/chat/components/ReplayControls";
import { Composer } from "@/features/chat/components/Composer";
import { HistoryStatus } from "@/features/chat/components/HistoryStatus";
import { SettingsDialog } from "@/features/model-settings/components/SettingsDialog";
/** Composition root: connects page policies with presentational components. */
export default function App() {
  const workspace = useChatWorkspace();
  const { t, notice } = useI18n();
  const { preferences, updatePreferences, savingFailed } = usePreferences();
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const { chat, scroll, providerState, provider, generating, empty } =
    workspace;
  const sidebar = useSidebarDisclosure();
  const displayProject = chat.state.projects.find(
    (p) => p.id === chat.current.projectId && !p.deleted,
  );
  const drop = useFileDrop(
    workspace.attachments.add,
    generating || workspace.attachments.reading,
    (data) => {
      const error = workspace.attachments.dropError(data);
      return error ? t(`composer.attachmentError.${error}`) : undefined;
    },
  );
  const openPreferences = useStableEvent(() => {
    if (sidebar.mobile) sidebar.collapse();
    setPreferencesOpen(true);
  });
  const openSettings = useStableEvent(() => {
    if (sidebar.mobile) sidebar.collapse();
    workspace.openSettings();
  });
  const visibleProjects = useMemo(
    () => chat.state.projects.filter((p) => !p.deleted),
    [chat.state.projects],
  );
  const sidebarFooter = useCallback(
    (onOpenArchive: () => void) => (
      <UserSettingsMenu
        key={String(sidebar.open)}
        onPreferences={openPreferences}
        onSettings={openSettings}
        onArchive={onOpenArchive}
      />
    ),
    [sidebar.open, openPreferences, openSettings],
  );
  if (!chat.ready)
    return (
      <div className={styles["history-loading"]} role="status">
        {chat.migration
          ? t("history.migrating", chat.migration)
          : t("history.loading")}
      </div>
    );
  return (
    <div className={styles["app-shell"]}>
      <Sidebar
        directories={chat.directories}
        onLoadDirectory={chat.loadDirectory}
        onSearch={chat.search}
        id={sidebar.id}
        open={sidebar.open}
        mobile={sidebar.mobile}
        openButtonRef={sidebar.openButtonRef}
        closeButtonRef={sidebar.closeButtonRef}
        catalog={chat.catalog}
        activeId={chat.current.id}
        onManageProject={chat.manageProject}
        onClose={sidebar.collapse}
        onCreate={chat.createStandalone}
        projects={visibleProjects}
        onCreateProject={chat.createProject}
        onMoveToProject={chat.moveToProject}
        onSelect={chat.select}
        onManage={chat.manageConversation}
        renderFooter={sidebarFooter}
      />
      <main className={styles["main-panel"]} {...drop.handlers}>
        {drop.active && (
          <div className={styles["file-drop-overlay"]} role="status">
            {drop.rejection ?? t("image.drop")}
          </div>
        )}
        <ChatHeader
          projectName={displayProject?.name}
          sidebarId={sidebar.id}
          sidebarOpen={sidebar.open}
          mobile={sidebar.mobile}
          sidebarButtonRef={sidebar.openButtonRef}
          onOpenSidebar={sidebar.expand}
        />
        <ChatViewport
          viewportRef={scroll.viewport}
          contentRef={scroll.content}
          empty={empty}
          away={scroll.away}
          onBottom={scroll.bottom}
          notice={
            chat.opening && (
              <ConversationOpenStatus
                status={chat.opening.status}
                onRetry={() => void chat.retryOpening()}
                onCancel={chat.cancelOpening}
              />
            )
          }
        >
          {chat.current.unloaded ? (
            <div
              className={styles["history-read"]}
              role={chat.readError ? "alert" : "status"}
            >
              {t(chat.readError ? "history.readFailed" : "history.loading")}
              {chat.readError && (
                <button type="button" onClick={() => void chat.retryRead()}>
                  {t("history.retryRead")}
                </button>
              )}
            </div>
          ) : empty ? (
            <Welcome
              projectName={
                chat.state.projects.find((p) => p.id === chat.current.projectId)
                  ?.name
              }
              provider={provider}
              onSend={workspace.send}
              onConfigure={workspace.openSettings}
            />
          ) : (
            <MessageList
              key={chat.current.id}
              messages={chat.current.messages}
              generating={generating}
              onRetry={workspace.retry}
            />
          )}
        </ChatViewport>
        <div className={styles["bottom-panel"]}>
          {!chat.current.unloaded && (
            <>
              {chat.current.provider !== "local" && (
                <>
                  {providerState.error && (
                    <div className={styles["service-error"]} role="alert">
                      <span>{notice(providerState.error)}</span>
                      <button
                        className={primitives["icon-button"]}
                        aria-label={t("provider.dismissError")}
                        onClick={providerState.dismissError}
                      >
                        <Icon icon={X} size="sm" />
                      </button>
                    </div>
                  )}
                </>
              )}
              <Composer
                conversationId={chat.current.id}
                thinking={workspace.thinking}
                onThinking={workspace.toggleThinking}
                modelControl={
                  <ModelSelector
                    provider={provider}
                    model={chat.current.model}
                    generating={generating}
                    providers={providerState.providers}
                    onSelect={workspace.selectModel}
                    localSpeed={workspace.speed}
                    localControls={
                      <ReplayControls
                        scenario={workspace.scenario}
                        speed={workspace.speed}
                        onScenario={workspace.setScenario}
                        onSpeed={workspace.setSpeed}
                      />
                    }
                  />
                }
                provider={chat.current.provider}
                generating={generating}
                configured={provider.configured}
                onSend={(text, images) =>
                  workspace.send(text, workspace.scenario, images)
                }
                onStop={chat.stop}
                onConfigure={workspace.openSettings}
                draft={chat.current.draft ?? ""}
                attachments={workspace.attachments}
                model={chat.current.model}
                historyImageBytes={workspace.historyImageBytes}
                onDraftChange={chat.setDraft}
              />
            </>
          )}
          <HistoryStatus
            status={chat.saveStatus}
            exportFailed={chat.exportFailed}
            onRetryExport={() => void chat.retryExport()}
            loadIssue={chat.loadIssue}
            onRetry={chat.retrySave}
          />
        </div>
      </main>
      <PreferencesDialog
        open={preferencesOpen}
        onClose={() => setPreferencesOpen(false)}
        preferences={preferences}
        onChange={updatePreferences}
        savingFailed={savingFailed}
      />
      <SettingsDialog
        open={workspace.settingsOpen}
        onClose={workspace.closeSettings}
        providers={providerState.providers}
        onRefresh={providerState.refresh}
        error={providerState.error}
      />
    </div>
  );
}
