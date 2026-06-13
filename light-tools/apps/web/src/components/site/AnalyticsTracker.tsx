"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { withBasePath } from "@/lib/base-path";

function getToolSlug(pathname: string): string | undefined {
  const match = pathname.match(/\/tools\/([^/]+)$/);
  return match?.[1];
}

interface NetworkInformationLike {
  effectiveType?: string;
  downlink?: number;
  rtt?: number;
  saveData?: boolean;
}

interface NavigatorWithClientHints extends Navigator {
  deviceMemory?: number;
  connection?: NetworkInformationLike;
  mozConnection?: NetworkInformationLike;
  webkitConnection?: NetworkInformationLike;
}

function getClientContext() {
  const nav = navigator as NavigatorWithClientHints;
  const connection = nav.connection || nav.mozConnection || nav.webkitConnection;
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return {
    hardware: {
      platform: nav.platform,
      vendor: nav.vendor,
      language: nav.language,
      languages: nav.languages?.slice(0, 6).join(", "),
      timezone,
      screen: `${window.screen.width}x${window.screen.height}`,
      viewport: `${window.innerWidth}x${window.innerHeight}`,
      colorDepth: window.screen.colorDepth,
      devicePixelRatio: window.devicePixelRatio,
      hardwareConcurrency: nav.hardwareConcurrency,
      deviceMemory: nav.deviceMemory,
      maxTouchPoints: nav.maxTouchPoints,
      cookiesEnabled: nav.cookieEnabled
    },
    network: connection
      ? {
          effectiveType: connection.effectiveType,
          downlink: connection.downlink,
          rtt: connection.rtt,
          saveData: connection.saveData
        }
      : undefined
  };
}

function sendAnalytics(payload: Record<string, unknown>) {
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
      toolSlug,
      client: getClientContext()
    });

    if (toolSlug) {
      sendAnalytics({
        eventType: "tool_view",
        path,
        toolSlug,
        client: getClientContext()
      });
    }
  }, [pathname, search]);

  return null;
}
