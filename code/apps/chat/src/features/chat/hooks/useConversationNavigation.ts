import { useCallback, useEffect, useRef, useState } from "react";
import type { Conversation } from "../types";

const openingNoticeDelayMs = 200;

/** Loading may populate the cache, but only the latest navigation may activate it. */
export function useConversationNavigation(
  load: (id: string) => Promise<Conversation | undefined>,
  activate: (id: string) => void,
) {
  const version = useRef(0);
  const noticeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  const [pending, setPending] = useState<{
    id: string;
    status: "loading" | "error";
  }>();
  const cancel = useCallback(() => {
    version.current++;
    clearTimeout(noticeTimer.current);
    setPending(undefined);
  }, []);
  useEffect(
    () => () => {
      version.current++;
      clearTimeout(noticeTimer.current);
    },
    [],
  );
  const open = useCallback(
    async (id: string) => {
      const request = ++version.current;
      clearTimeout(noticeTimer.current);
      setPending(undefined);
      // Fast local reads do not need a transient banner. Keep the screen stable;
      // show feedback only when there is a perceptible wait.
      const timer = setTimeout(() => {
        if (request === version.current) setPending({ id, status: "loading" });
      }, openingNoticeDelayMs);
      noticeTimer.current = timer;
      try {
        const conversation = await load(id);
        if (request !== version.current) return;
        if (!conversation) {
          setPending({ id, status: "error" });
          return;
        }
        activate(id);
        setPending(undefined);
      } catch {
        if (request === version.current) setPending({ id, status: "error" });
      } finally {
        clearTimeout(timer);
      }
    },
    [load, activate],
  );
  return { pending, open, cancel };
}
