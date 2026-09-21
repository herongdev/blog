import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import type { MessageViewCache } from "../lib/messageViewCache";
export const MessageViewContext = createContext<
  { prefix: string; cache: MessageViewCache } | undefined
>(undefined);
/** Local state writes through to a bounded cache so virtual unmounts preserve explicit choices. */
export function useMessageViewState<T extends boolean | number>(
  key: string,
  initial: T,
): [T, Dispatch<SetStateAction<T>>] {
  const scope = useContext(MessageViewContext);
  const id = `${scope?.prefix}:${key}`;
  const [value, setValue] = useState(
    () => scope?.cache.get(id, initial) ?? initial,
  );
  const update: Dispatch<SetStateAction<T>> = (next) =>
    setValue((previous) => {
      const resolved = typeof next === "function" ? next(previous) : next;
      scope?.cache.set(id, resolved);
      return resolved;
    });
  return [value, update];
}
