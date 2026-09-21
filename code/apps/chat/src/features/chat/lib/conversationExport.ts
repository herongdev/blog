import type { ChatState } from "../state/chatReducer";

/** Export only the requested conversation and its project metadata. */
export function conversationExport(state: ChatState, id: string) {
  const conversation = state.conversations.find(
    (c) => c.id === id && !c.deleted,
  );
  if (!conversation) return;
  const title =
    conversation.title
      .replace(/[<>:"/\\|?*\p{Cc}]/gu, " ")
      .trim()
      .slice(0, 60) || "conversation";
  return {
    filename: `zhixu-${title}-${new Date().toISOString().slice(0, 10)}.json`,
    data: {
      version: 1,
      activeId: conversation.id,
      projects: state.projects.filter(
        (p) => p.id === conversation.projectId && !p.deleted,
      ),
      conversations: [conversation],
    },
  };
}
