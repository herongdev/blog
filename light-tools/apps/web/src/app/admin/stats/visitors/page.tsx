import type { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getVisitorAnalytics, type VisitorAnalyticsRow } from "@/lib/server/analytics";
import { adminCookieName, isValidAdminSession } from "@/lib/server/admin-auth";

export const metadata: Metadata = {
  title: "独立访客详情",
  robots: {
    index: false,
    follow: false
  }
};

function StatCard({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="panel p-4">
      <div className="text-sm text-muted">{label}</div>
      <div className="mt-2 text-3xl font-semibold text-[var(--color-text)]">{value}</div>
    </div>
  );
}

function compact(values: Array<string | number | boolean | undefined>): string[] {
  return values
    .filter((value) => value !== undefined && value !== "")
    .map((value) => String(value));
}

function shortHash(value: string): string {
  return value ? value.slice(0, 10) : "未知";
}

function formatClientIp(value: string): string {
  return value || "未记录";
}

function formatDateTime(value: string): string {
  if (!value) return "未知";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "未知";

  return date.toLocaleString("zh-CN", {
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function formatReferer(value: string): string {
  if (!value) return "";

  try {
    return new URL(value).hostname;
  } catch {
    return value;
  }
}

function formatLocation(visitor: VisitorAnalyticsRow): { primary: string; secondary: string } {
  const primary = compact([visitor.geo.city, visitor.geo.region, visitor.geo.country]).join(" / ");
  const secondary = compact([
    visitor.geo.timezone ? `时区 ${visitor.geo.timezone}` : visitor.hardware.timezone,
    visitor.geo.latitude && visitor.geo.longitude ? `${visitor.geo.latitude}, ${visitor.geo.longitude}` : undefined
  ]).join(" · ");

  return {
    primary: primary || "地域未知",
    secondary
  };
}

function formatComputer(visitor: VisitorAnalyticsRow): { primary: string; secondary: string } {
  const primary = compact([visitor.browser, visitor.operatingSystem, visitor.deviceType]).join(" / ");
  const secondary = compact([
    visitor.hardware.platform,
    visitor.hardware.hardwareConcurrency ? `${visitor.hardware.hardwareConcurrency} 线程` : undefined,
    visitor.hardware.deviceMemory ? `${visitor.hardware.deviceMemory}GB 内存` : undefined,
    visitor.hardware.screen ? `屏幕 ${visitor.hardware.screen}` : undefined,
    visitor.hardware.viewport ? `视口 ${visitor.hardware.viewport}` : undefined,
    visitor.hardware.devicePixelRatio ? `DPR ${visitor.hardware.devicePixelRatio}` : undefined
  ]).join(" · ");

  return {
    primary: primary || "设备未知",
    secondary
  };
}

function formatNetwork(visitor: VisitorAnalyticsRow): { primary: string; secondary: string } {
  const primary = compact([
    visitor.network.effectiveType,
    visitor.network.downlink ? `${visitor.network.downlink}Mbps` : undefined,
    visitor.network.rtt ? `${visitor.network.rtt}ms RTT` : undefined,
    visitor.network.saveData ? "省流量模式" : undefined
  ]).join(" / ");

  return {
    primary: primary || "网络能力未知",
    secondary: `网络哈希 ${shortHash(visitor.networkHash)}`
  };
}

function VisitorRow({ visitor }: { visitor: VisitorAnalyticsRow }) {
  const location = formatLocation(visitor);
  const computer = formatComputer(visitor);
  const network = formatNetwork(visitor);
  const referer = formatReferer(visitor.referer);

  return (
    <tr>
      <td className="border-b border-[var(--color-border)] py-4 pr-4 align-top">
        <div className="font-mono text-xs font-semibold text-[var(--color-text)]">{visitor.visitorLabel}</div>
        <div className="mt-1 break-all font-mono text-xs text-[var(--color-text)]">IP {formatClientIp(visitor.clientIp)}</div>
        <div className="mt-1 text-xs text-soft">IP 哈希 {shortHash(visitor.ipHash)}</div>
      </td>
      <td className="border-b border-[var(--color-border)] py-4 pr-4 align-top">
        <div className="font-medium text-[var(--color-text)]">{location.primary}</div>
        {location.secondary ? <div className="mt-1 text-xs text-soft">{location.secondary}</div> : null}
      </td>
      <td className="border-b border-[var(--color-border)] py-4 pr-4 align-top">
        <div className="font-medium text-[var(--color-text)]">{computer.primary}</div>
        {computer.secondary ? <div className="mt-1 max-w-sm text-xs leading-5 text-soft">{computer.secondary}</div> : null}
      </td>
      <td className="border-b border-[var(--color-border)] py-4 pr-4 align-top">
        <div className="font-medium text-[var(--color-text)]">{network.primary}</div>
        <div className="mt-1 text-xs text-soft">{network.secondary}</div>
      </td>
      <td className="border-b border-[var(--color-border)] py-4 pr-4 align-top">
        <div className="font-medium text-[var(--color-text)]">{formatDateTime(visitor.lastSeenAt)}</div>
        <div className="mt-1 text-xs text-soft">距今 {visitor.daysSinceLastVisit} 天</div>
      </td>
      <td className="border-b border-[var(--color-border)] py-4 pr-4 align-top">
        <div className="font-medium text-[var(--color-text)]">{visitor.totalPageViews} 次</div>
        <div className="mt-1 text-xs text-soft">
          事件 {visitor.totalEvents} · 活跃 {visitor.activeDays} 天 · 跨度 {visitor.visitSpanDays} 天
        </div>
      </td>
      <td className="border-b border-[var(--color-border)] py-4 align-top">
        <div className="max-w-xs break-all font-medium text-[var(--color-text)]">{visitor.latestPath || "-"}</div>
        <div className="mt-1 max-w-xs break-all text-xs text-soft">
          常用 {visitor.topPath || visitor.topTool || "-"}
          {referer ? ` · 来源 ${referer}` : ""}
        </div>
      </td>
    </tr>
  );
}

export default async function AdminVisitorStatsPage() {
  const cookieStore = await cookies();
  if (!isValidAdminSession(cookieStore.get(adminCookieName)?.value)) {
    redirect("/admin");
  }

  const analytics = await getVisitorAnalytics(30);
  const cumulativePageViews = analytics.visitors.reduce((sum, visitor) => sum + visitor.totalPageViews, 0);
  const activeDays = analytics.visitors.reduce((sum, visitor) => sum + visitor.activeDays, 0);
  const averageActiveDays = analytics.visitors.length > 0 ? (activeDays / analytics.visitors.length).toFixed(1) : "0";

  return (
    <div className="app-container">
      <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <Link className="link-accent text-sm" href="/admin/stats">
            返回统计数据
          </Link>
          <h1 className="page-title mt-3">独立访客详情</h1>
          <p className="mt-2 text-sm text-muted">最近 30 天有访问记录的访客，累计数据按当前统计日志计算。</p>
        </div>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="独立访客" value={analytics.uniqueVisitors} />
        <StatCard label="最近访问" value={analytics.totalPageViews} />
        <StatCard label="累计访问" value={cumulativePageViews} />
        <StatCard label="平均活跃天数" value={averageActiveDays} />
      </section>

      <section className="panel panel-padded">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="section-title">访客列表</h2>
          <div className="text-sm text-soft">生成时间 {formatDateTime(analytics.generatedAt)}</div>
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[1180px] text-left text-sm">
            <thead className="text-soft">
              <tr>
                <th className="border-b border-[var(--color-border)] py-2 pr-4 font-semibold">访客</th>
                <th className="border-b border-[var(--color-border)] py-2 pr-4 font-semibold">地域</th>
                <th className="border-b border-[var(--color-border)] py-2 pr-4 font-semibold">电脑配置</th>
                <th className="border-b border-[var(--color-border)] py-2 pr-4 font-semibold">网络情况</th>
                <th className="border-b border-[var(--color-border)] py-2 pr-4 font-semibold">上次访问</th>
                <th className="border-b border-[var(--color-border)] py-2 pr-4 font-semibold">累计访问</th>
                <th className="border-b border-[var(--color-border)] py-2 font-semibold">访问偏好</th>
              </tr>
            </thead>
            <tbody>
              {analytics.visitors.length > 0 ? (
                analytics.visitors.map((visitor) => <VisitorRow key={visitor.visitorHash} visitor={visitor} />)
              ) : (
                <tr>
                  <td className="py-4 text-muted" colSpan={7}>
                    暂时还没有独立访客数据。
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
