import { isGenerating } from "../state/selectors";
import type { Conversation } from "../types";
import { summarize } from "../lib/conversationSummary";

/** Metadata subscription is independent of streaming message bodies. */
export class ChatCatalog {
  private entries = new Map<string, Conversation>();
  private snapshot: Conversation[] = [];
  private listeners = new Set<() => void>();
  subscribe = (listener: () => void) => {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  };
  getSnapshot = () => this.snapshot;
  update(conversations: Conversation[]) {
    let changed = false;
    for (const conversation of conversations) {
      const next = {
        ...summarize(conversation),
        generating: isGenerating(conversation.messages.at(-1)),
      };
      const previous = this.entries.get(next.id);
      if (
        previous &&
        (Object.keys(next) as Array<keyof Conversation>).every(
          (key) => key === "messages" || previous[key] === next[key],
        )
      )
        continue;
      this.entries.set(next.id, next);
      changed = true;
    }
    if (!changed) return;
    this.snapshot = [...this.entries.values()];
    for (const listener of this.listeners) listener();
  }
}
