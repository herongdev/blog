import { useCallback, useEffect, useLayoutEffect } from "react";
import { useStickToBottom } from "@vendor/use-stick-to-bottom/useStickToBottom";

/** Keep following new content until the reader scrolls away; explicit sends and thread switches resume it. */
export function useAutoScroll(conversationId: string, active: boolean) {
  const {
    scrollRef,
    contentRef,
    scrollToBottom,
    stopScroll,
    isAtBottom,
    state,
  } = useStickToBottom({ initial: "instant", resize: "instant" });
  const bottom = useCallback(() => {
    void scrollToBottom({ animation: "instant" });
  }, [scrollToBottom]);
  useLayoutEffect(() => {
    if (!active) return;
    // Upstream's instant scroll still starts on the next animation frame.
    // Place the new thread before paint, using its setter to suppress a false
    // user-scroll event, then resume normal streaming/resize following.
    state.scrollTop = state.targetScrollTop;
    bottom();
  }, [conversationId, active, bottom, state]);
  useEffect(() => {
    if (!active || !scrollRef.current) return;
    // Reconcile both viewport resizes and content shrinking (e.g. activity collapse).
    // Upstream follows content growth, but shrinking may leave a browser-anchored
    // position above the bottom. Only resume when the reader is still following.
    const observer = new ResizeObserver(() => {
      if (state.isAtBottom) bottom();
    });
    observer.observe(scrollRef.current);
    if (contentRef.current) observer.observe(contentRef.current);
    return () => {
      observer.disconnect();
      stopScroll();
    };
  }, [active, scrollRef, contentRef, state, bottom, stopScroll]);
  return {
    viewport: scrollRef,
    content: contentRef,
    bottom,
    away: !isAtBottom,
    pause: stopScroll,
  };
}
