import { useCallback, useEffect, useRef, useState } from "react";

/** Shared copy feedback; stale writes and unmounted components cannot restart timers. */
export function useClipboard() {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");
  const attempt = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(
    () => () => {
      attempt.current++;
      clearTimeout(timer.current);
    },
    [],
  );

  const copy = useCallback(async (text: string) => {
    const id = ++attempt.current;
    clearTimeout(timer.current);
    setStatus("idle");
    try {
      await navigator.clipboard.writeText(text);
      if (id !== attempt.current) return;
      setStatus("copied");
      timer.current = setTimeout(() => setStatus("idle"), 1800);
    } catch {
      if (id === attempt.current) setStatus("failed");
    }
  }, []);
  return { copy, copied: status === "copied", failed: status === "failed" };
}
