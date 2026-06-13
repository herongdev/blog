import type { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { withBasePath } from "@/lib/base-path";
import { getAnalyticsSummary } from "@/lib/server/analytics";
import { adminCookieName, isValidAdminSession } from "@/lib/server/admin-auth";

export const metadata: Metadata = {
  title: "统计数据",
  robots: {
    index: false,
    follow: false
  }
};

function StatCard({ label, value, href }: { label: string; value: number; href?: string }) {
  const content = (
    <>
      <div className="text-sm text-muted">{label}</div>
      <div className="mt-2 text-3xl font-semibold text-[var(--color-text)]">{value}</div>
    </>
  );

  if (href) {
    return (
      <Link
        className="panel block p-4 transition hover:border-[var(--color-accent)] hover:bg-[var(--color-accent-soft)]"
        href={href}
      >
        {content}
      </Link>
    );
  }

  return <div className="panel p-4">{content}</div>;
}

export default async function AdminStatsPage() {
  const cookieStore = await cookies();
  if (!isValidAdminSession(cookieStore.get(adminCookieName)?.value)) {
    redirect("/admin");
  }

  const summary = await getAnalyticsSummary(30);

  return (
    <div className="app-container">
      <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="page-title">统计数据</h1>
          <p className="mt-2 text-sm text-muted">最近 30 天的访问和工具使用情况。</p>
        </div>
        <form action={withBasePath("/api/admin/logout")} method="post">
          <button className="button-muted" type="submit">
            退出登录
          </button>
        </form>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="访问事件" value={summary.pageViews} />
        <StatCard href="/admin/stats/visitors" label="独立访客" value={summary.uniqueVisitors} />
        <StatCard label="工具打开" value={summary.toolViews} />
        <StatCard label="成功使用" value={summary.toolUseSuccesses} />
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="使用尝试" value={summary.toolUseAttempts} />
        <StatCard label="失败次数" value={summary.toolUseFailures} />
        <StatCard label="额度拦截" value={summary.quotaBlocked} />
        <StatCard label="总事件" value={summary.totalEvents} />
      </section>

      <section className="panel panel-padded">
        <h2 className="section-title">工具使用排行</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="text-soft">
              <tr>
                <th className="border-b border-[var(--color-border)] py-2 pr-4 font-semibold">工具</th>
                <th className="border-b border-[var(--color-border)] py-2 pr-4 font-semibold">打开</th>
                <th className="border-b border-[var(--color-border)] py-2 pr-4 font-semibold">尝试</th>
                <th className="border-b border-[var(--color-border)] py-2 pr-4 font-semibold">成功</th>
                <th className="border-b border-[var(--color-border)] py-2 pr-4 font-semibold">失败</th>
                <th className="border-b border-[var(--color-border)] py-2 font-semibold">拦截</th>
              </tr>
            </thead>
            <tbody>
              {summary.byTool.length > 0 ? (
                summary.byTool.map((tool) => (
                  <tr key={`${tool.toolId}-${tool.toolSlug}`}>
                    <td className="border-b border-[var(--color-border)] py-3 pr-4 font-medium text-[var(--color-text)]">
                      {tool.toolId || tool.toolSlug}
                    </td>
                    <td className="border-b border-[var(--color-border)] py-3 pr-4 text-muted">{tool.views}</td>
                    <td className="border-b border-[var(--color-border)] py-3 pr-4 text-muted">{tool.attempts}</td>
                    <td className="border-b border-[var(--color-border)] py-3 pr-4 text-muted">{tool.successes}</td>
                    <td className="border-b border-[var(--color-border)] py-3 pr-4 text-muted">{tool.failures}</td>
                    <td className="border-b border-[var(--color-border)] py-3 text-muted">{tool.blocked}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="py-4 text-muted" colSpan={6}>
                    暂时还没有工具统计数据。
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="panel panel-padded">
        <h2 className="section-title">最近事件</h2>
        <div className="mt-4 space-y-2">
          {summary.recentEvents.length > 0 ? (
            summary.recentEvents.slice(0, 12).map((event) => (
              <div className="panel flex flex-col gap-1 p-3 text-sm sm:flex-row sm:items-center sm:justify-between" key={event.id}>
                <span className="font-medium text-[var(--color-text)]">{event.eventType}</span>
                <span className="text-muted">{event.path || event.toolSlug || event.toolId || "-"}</span>
                <span className="text-soft">{new Date(event.createdAt).toLocaleString("zh-CN")}</span>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted">暂时还没有事件。</p>
          )}
        </div>
      </section>
    </div>
  );
}
