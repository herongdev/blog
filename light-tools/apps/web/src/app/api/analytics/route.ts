import { NextResponse } from "next/server";
import { recordAnalyticsEvent, type AnalyticsEventType } from "@/lib/server/analytics";

export const runtime = "nodejs";

const allowedEventTypes = new Set<AnalyticsEventType>([
  "page_view",
  "tool_view",
  "tool_use_attempt",
  "tool_use_success",
  "tool_use_failure",
  "quota_blocked"
]);

function readString(value: unknown): string | undefined {
  return typeof value === "string" ? value : undefined;
}

export async function POST(request: Request) {
  const payload = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  const eventType = readString(payload?.eventType) as AnalyticsEventType | undefined;

  if (!eventType || !allowedEventTypes.has(eventType)) {
    return NextResponse.json({ ok: false, message: "Invalid analytics event." }, { status: 400 });
  }

  const result = await recordAnalyticsEvent(request, {
    eventType,
    path: readString(payload?.path),
    toolId: readString(payload?.toolId),
    toolSlug: readString(payload?.toolSlug),
    detail: readString(payload?.detail)
  });

  return NextResponse.json(
    { ok: true },
    {
      headers: result.setCookie ? { "Set-Cookie": result.setCookie } : undefined
    }
  );
}
