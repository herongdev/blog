import { useCallback, useLayoutEffect, useRef } from "react";
/** Stable callback identity with the latest committed render's behavior. */
export function useStableEvent<Args extends unknown[], Result>(
  callback: (...args: Args) => Result,
) {
  const current = useRef(callback);
  useLayoutEffect(() => {
    current.current = callback;
  });
  return useCallback((...args: Args) => current.current(...args), []);
}
