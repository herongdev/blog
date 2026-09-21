import { useMemo, type ReactNode } from "react";
import type { MessageViewCache } from "../lib/messageViewCache";
import { MessageViewContext } from "../hooks/useMessageViewState";
export function MessageViewBoundary({
  prefix,
  cache,
  children,
}: {
  prefix: string;
  cache: MessageViewCache;
  children: ReactNode;
}) {
  const value = useMemo(() => ({ prefix, cache }), [prefix, cache]);
  return <MessageViewContext value={value}>{children}</MessageViewContext>;
}
