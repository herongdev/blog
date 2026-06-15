import { createDecipheriv, createSign, createVerify, randomBytes } from "node:crypto";
import { readFileSync } from "node:fs";
import type { CourseOrder } from "@/lib/server/course-store";
import { getCourseBySlug } from "@/lib/course-catalog";

const wechatPayApiBaseUrl = "https://api.mch.weixin.qq.com";

interface WechatPayConfig {
  appId: string;
  mchId: string;
  apiV3Key: string;
  privateKey: string;
  certSerialNo: string;
  notifyUrl: string;
}

export interface WechatPayRuntimeStatus {
  enabled: boolean;
  ready: boolean;
  missing: string[];
}

export interface WechatPaymentNotification {
  out_trade_no: string;
  transaction_id?: string;
  trade_state?: string;
}

function env(name: string): string {
  return process.env[name]?.trim() || "";
}

function readPem(pathValue: string, inlineValue: string): string {
  if (inlineValue) return inlineValue.replace(/\\n/g, "\n");
  if (!pathValue) return "";
  return readFileSync(pathValue, "utf-8");
}

export function getWechatPayRuntimeStatus(): WechatPayRuntimeStatus {
  const enabled = env("WECHAT_PAY_ENABLED") === "true";
  const required: Array<[string, string]> = [
    ["WECHAT_PAY_APPID", env("WECHAT_PAY_APPID")],
    ["WECHAT_PAY_MCH_ID", env("WECHAT_PAY_MCH_ID")],
    ["WECHAT_PAY_API_V3_KEY", env("WECHAT_PAY_API_V3_KEY")],
    ["WECHAT_PAY_CERT_SERIAL_NO", env("WECHAT_PAY_CERT_SERIAL_NO")]
  ];

  if (!env("WECHAT_PAY_PRIVATE_KEY") && !env("WECHAT_PAY_PRIVATE_KEY_PATH")) {
    required.push(["WECHAT_PAY_PRIVATE_KEY_PATH", ""]);
  }

  return {
    enabled,
    ready: enabled && required.every(([, value]) => Boolean(value)),
    missing: required.filter(([, value]) => !value).map(([name]) => name)
  };
}

function getSiteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");
}

function getConfig(): WechatPayConfig {
  const status = getWechatPayRuntimeStatus();
  if (!status.ready) {
    throw new Error(`WeChat Pay is not ready: ${status.missing.join(", ")}`);
  }

  return {
    appId: env("WECHAT_PAY_APPID"),
    mchId: env("WECHAT_PAY_MCH_ID"),
    apiV3Key: env("WECHAT_PAY_API_V3_KEY"),
    privateKey: readPem(env("WECHAT_PAY_PRIVATE_KEY_PATH"), env("WECHAT_PAY_PRIVATE_KEY")),
    certSerialNo: env("WECHAT_PAY_CERT_SERIAL_NO"),
    notifyUrl: env("WECHAT_PAY_NOTIFY_URL") || `${getSiteUrl()}/api/payments/wechat/notify`
  };
}

function signWechatRequest(input: {
  method: string;
  urlPath: string;
  body: string;
  config: WechatPayConfig;
}): string {
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const nonce = randomBytes(16).toString("hex");
  const message = `${input.method}\n${input.urlPath}\n${timestamp}\n${nonce}\n${input.body}\n`;
  const signature = createSign("RSA-SHA256").update(message).sign(input.config.privateKey, "base64");
  const token = [
    `mchid="${input.config.mchId}"`,
    `nonce_str="${nonce}"`,
    `timestamp="${timestamp}"`,
    `serial_no="${input.config.certSerialNo}"`,
    `signature="${signature}"`
  ].join(",");

  return `WECHATPAY2-SHA256-RSA2048 ${token}`;
}

export async function createWechatNativePayment(order: CourseOrder): Promise<{ codeUrl: string; prepayId?: string }> {
  const course = getCourseBySlug(order.courseSlug);
  if (!course) throw new Error(`Missing course for order ${order.id}`);

  const config = getConfig();
  const urlPath = "/v3/pay/transactions/native";
  const body = JSON.stringify({
    appid: config.appId,
    mchid: config.mchId,
    description: course.title.slice(0, 120),
    out_trade_no: order.id,
    notify_url: config.notifyUrl,
    amount: {
      total: order.amountCents,
      currency: order.currency
    }
  });

  const response = await fetch(`${wechatPayApiBaseUrl}${urlPath}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: signWechatRequest({ method: "POST", urlPath, body, config }),
      "Content-Type": "application/json"
    },
    body
  });

  const raw = await response.text();
  if (!response.ok) {
    throw new Error(`WeChat Native payment failed: ${response.status} ${raw}`);
  }

  const parsed = JSON.parse(raw) as { code_url?: string; prepay_id?: string };
  if (!parsed.code_url) throw new Error("WeChat Native payment response is missing code_url");

  return {
    codeUrl: parsed.code_url,
    prepayId: parsed.prepay_id
  };
}

function readPlatformCertificate(): string {
  const inline = env("WECHAT_PAY_PLATFORM_CERT");
  const pathValue = env("WECHAT_PAY_PLATFORM_CERT_PATH");
  const certificate = readPem(pathValue, inline);
  if (!certificate) {
    throw new Error("Missing WeChat Pay platform certificate");
  }
  return certificate;
}

function verifyWechatNotifySignature(input: {
  body: string;
  timestamp: string;
  nonce: string;
  signature: string;
  serial: string;
}): void {
  const expectedSerial = env("WECHAT_PAY_PLATFORM_CERT_SERIAL_NO");
  if (expectedSerial && expectedSerial !== input.serial) {
    throw new Error("WeChat Pay platform certificate serial mismatch");
  }

  const message = `${input.timestamp}\n${input.nonce}\n${input.body}\n`;
  const isValid = createVerify("RSA-SHA256")
    .update(message)
    .verify(readPlatformCertificate(), input.signature, "base64");

  if (!isValid) throw new Error("Invalid WeChat Pay notification signature");
}

function decryptWechatResource(resource: {
  associated_data?: string;
  ciphertext: string;
  nonce: string;
}): string {
  const key = Buffer.from(env("WECHAT_PAY_API_V3_KEY"), "utf-8");
  if (key.length !== 32) throw new Error("WECHAT_PAY_API_V3_KEY must be 32 bytes");

  const encrypted = Buffer.from(resource.ciphertext, "base64");
  const authTag = encrypted.subarray(encrypted.length - 16);
  const ciphertext = encrypted.subarray(0, encrypted.length - 16);
  const decipher = createDecipheriv("aes-256-gcm", key, Buffer.from(resource.nonce, "utf-8"));

  if (resource.associated_data) {
    decipher.setAAD(Buffer.from(resource.associated_data, "utf-8"));
  }

  decipher.setAuthTag(authTag);
  return Buffer.concat([decipher.update(ciphertext), decipher.final()]).toString("utf-8");
}

export async function parseWechatPaymentNotification(request: Request): Promise<WechatPaymentNotification> {
  const body = await request.text();
  const timestamp = request.headers.get("wechatpay-timestamp") || "";
  const nonce = request.headers.get("wechatpay-nonce") || "";
  const signature = request.headers.get("wechatpay-signature") || "";
  const serial = request.headers.get("wechatpay-serial") || "";

  if (!timestamp || !nonce || !signature || !serial) {
    throw new Error("Missing WeChat Pay notification headers");
  }

  verifyWechatNotifySignature({ body, timestamp, nonce, signature, serial });

  const payload = JSON.parse(body) as {
    resource?: {
      associated_data?: string;
      ciphertext: string;
      nonce: string;
    };
  };

  if (!payload.resource) throw new Error("Missing WeChat Pay notification resource");
  return JSON.parse(decryptWechatResource(payload.resource)) as WechatPaymentNotification;
}
