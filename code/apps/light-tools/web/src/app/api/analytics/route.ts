import { NextResponse } from "next/server";
import {
  recordAnalyticsEvent,
  type AnalyticsEventType,
  type ClientAnalyticsContext,
  type ClientHardwareInfo,
  type ClientNetworkInfo
} from "@/lib/server/analytics";

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

function readNumber(value: unknown): number | undefined {
  return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}

function readBoolean(value: unknown): boolean | undefined {
  return typeof value === "boolean" ? value : undefined;
}

function readObject(value: unknown): Record<string, unknown> | undefined {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as Record<string, unknown>) : undefined;
}

function readClientContext(value: unknown): ClientAnalyticsContext | undefined {
  const context = readObject(value);
  if (!context) return undefined;

  const hardwarePayload = readObject(context.hardware);
  const networkPayload = readObject(context.network);
  const hardware: ClientHardwareInfo | undefined = hardwarePayload
    ? {
        platform: readString(hardwarePayload.platform),
        vendor: readString(hardwarePayload.vendor),
        language: readString(hardwarePayload.language),
        languages: readString(hardwarePayload.languages),
        timezone: readString(hardwarePayload.timezone),
        screen: readString(hardwarePayload.screen),
        viewport: readString(hardwarePayload.viewport),
        colorDepth: readNumber(hardwarePayload.colorDepth),
        devicePixelRatio: readNumber(hardwarePayload.devicePixelRatio),
        hardwareConcurrency: readNumber(hardwarePayload.hardwareConcurrency),
        deviceMemory: readNumber(hardwarePayload.deviceMemory),
        maxTouchPoints: readNumber(hardwarePayload.maxTouchPoints),
        cookiesEnabled: readBoolean(hardwarePayload.cookiesEnabled)
      }
    : undefined;

  const network: ClientNetworkInfo | undefined = networkPayload
    ? {
        effectiveType: readString(networkPayload.effectiveType),
        downlink: readNumber(networkPayload.downlink),
        rtt: readNumber(networkPayload.rtt),
        saveData: readBoolean(networkPayload.saveData)
      }
    : undefined;

  return { hardware, network };
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
    detail: readString(payload?.detail),
    client: readClientContext(payload?.client)
  });

  return NextResponse.json(
    { ok: true },
    {
      headers: result.setCookie ? { "Set-Cookie": result.setCookie } : undefined
    }
  );
}
