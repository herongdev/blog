"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { withBasePath } from "@/lib/base-path";

function getToolSlug(pathname: string): string | undefined {
  const match = pathname.match(/\/tools\/([^/]+)$/);
  return match?.[1];
}

function sendAnalytics(payload: Record<string, string | undefined>) {
  void fetch(withBasePath("/api/analytics"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload),
    credentials: "same-origin",
    keepalive: true
  }).catch(() => undefined);
}

export function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.toString();

  useEffect(() => {
    if (!pathname || pathname.startsWith("/admin")) return;

    const path = search ? `${pathname}?${search}` : pathname;
    const toolSlug = getToolSlug(pathname);

    sendAnalytics({
      eventType: "page_view",
      path,
      toolSlug
    });

    if (toolSlug) {
      sendAnalytics({
        eventType: "tool_view",
        path,
        toolSlug
      });
    }
  }, [pathname, search]);

  return null;
}
