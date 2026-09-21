import { useState } from "react";
import { MessageViewCache } from "../lib/messageViewCache";
import { MessageViewBoundary } from "./MessageViewBoundary";
import { WindowedList } from "@/components/WindowedList/WindowedList";
import styles from "./MessageList.module.css";
import type { ChatMessage } from "../types";
import { MessageItem } from "./MessageItem";
interface MessageListProps {
  messages: ChatMessage[];
  generating: boolean;
  onRetry: () => void;
}
export function MessageList({
  messages,
  generating,
  onRetry,
}: MessageListProps) {
  const [viewCache] = useState(() => new MessageViewCache());
  return (
    <div className={styles["message-list"]}>
      <WindowedList reading items={messages} itemKey={(message) => message.id}>
        {(message) => {
          const canRetry = message.id === messages.at(-1)?.id && !generating;
          return (
            <div data-message-row={message.id} tabIndex={-1}>
              <MessageViewBoundary prefix={message.id} cache={viewCache}>
                <MessageItem
                  message={message}
                  canRetry={canRetry}
                  onRetry={canRetry ? onRetry : undefined}
                />
              </MessageViewBoundary>
            </div>
          );
        }}
      </WindowedList>
    </div>
  );
}
