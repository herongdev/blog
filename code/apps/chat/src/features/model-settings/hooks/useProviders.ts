import { useCallback, useEffect, useRef, useState } from "react";
import { defaultProviders, getProviderInfo } from "../services/providers";

/** Own provider discovery and cancellation; components only consume public metadata. */
export function useProviders() {
  const [providers, setProviders] = useState(defaultProviders);
  const [error, setError] = useState<string>();
  const request = useRef<AbortController | null>(null);

  const refresh = useCallback(async () => {
    request.current?.abort();
    const controller = new AbortController();
    request.current = controller;
    try {
      const data = await getProviderInfo(controller.signal);
      if (!controller.signal.aborted) {
        setProviders(data);
        setError(undefined);
      }
    } catch (error) {
      if (!controller.signal.aborted)
        setError(error instanceof Error ? error.message : "读取模型配置失败。");
    }
  }, []);

  useEffect(() => {
    void refresh();
    return () => request.current?.abort();
  }, [refresh]);

  return { providers, error, refresh, dismissError: () => setError(undefined) };
}
