"use client";

import { useEffect, useState } from "react";

export function OrderStatusPoller({
  redirectTo,
  statusUrl
}: {
  redirectTo: string;
  statusUrl: string;
}) {
  const [statusText, setStatusText] = useState("等待微信支付结果...");

  useEffect(() => {
    let cancelled = false;

    async function poll() {
      try {
        const response = await fetch(statusUrl, {
          cache: "no-store",
          credentials: "same-origin"
        });
        if (!response.ok) return;

        const payload = (await response.json()) as { paid?: boolean; status?: string };
        if (payload.paid) {
          setStatusText("支付成功，正在打开课程...");
          window.location.assign(redirectTo);
          return;
        }
        if (!cancelled) setStatusText(`当前状态：${payload.status || "pending"}`);
      } catch {
        if (!cancelled) setStatusText("暂时无法读取支付状态，页面会继续重试。");
      }
    }

    poll();
    const timer = window.setInterval(poll, 3000);

    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, [redirectTo, statusUrl]);

  return <div className="mt-3 text-xs text-soft">{statusText}</div>;
}
