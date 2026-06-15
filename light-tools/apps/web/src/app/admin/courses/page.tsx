import type { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { withBasePath } from "@/lib/base-path";
import { getPaidCourses } from "@/lib/server/course-store";
import { adminCookieName, isValidAdminSession } from "@/lib/server/admin-auth";
import { getCourseAdminSummary, getCourseTitle } from "@/lib/server/course-store";

export const metadata: Metadata = {
  title: "课程权限后台",
  robots: {
    index: false,
    follow: false
  }
};

function formatDate(value: string): string {
  return new Date(value).toLocaleString("zh-CN", { hour12: false });
}

function findUserEmail(users: Awaited<ReturnType<typeof getCourseAdminSummary>>["users"], userId: string): string {
  return users.find((user) => user.id === userId)?.email || userId;
}

export default async function AdminCoursesPage({
  searchParams
}: {
  searchParams?: Promise<{ status?: string }>;
}) {
  const cookieStore = await cookies();
  if (!isValidAdminSession(cookieStore.get(adminCookieName)?.value)) {
    redirect("/admin");
  }

  const params = await searchParams;
  const summary = await getCourseAdminSummary();
  const paidCourses = getPaidCourses();

  return (
    <div className="app-container">
      <header className="flex flex-col gap-3">
        <Link className="link-accent text-sm" href="/admin/stats">
          返回统计后台
        </Link>
        <h1 className="page-title">课程权限后台</h1>
        <p className="text-sm text-muted">手动开通付费课程，查看注册用户、授权和待支付订单。</p>
      </header>

      {params?.status === "granted" ? <div className="status-warning">课程权限已开通或更新。</div> : null}
      {params?.status === "missing_user" ? <div className="status-error">没有找到这个邮箱对应的课程账号。</div> : null}
      {params?.status === "missing_course" ? <div className="status-error">课程不存在。</div> : null}

      <section className="panel panel-padded">
        <h2 className="section-title">手动开通课程</h2>
        <form action={withBasePath("/api/admin/courses/grant")} className="mt-4 grid gap-4 lg:grid-cols-4" method="post">
          <label className="block text-sm font-semibold text-[var(--color-text)]">
            用户邮箱
            <input className="input-control mt-2 w-full px-3 py-2" name="email" required type="email" />
          </label>
          <label className="block text-sm font-semibold text-[var(--color-text)]">
            课程
            <select className="input-control mt-2 w-full px-3 py-2" name="courseSlug" required>
              {paidCourses.map((course) => (
                <option key={course.slug} value={course.slug}>
                  {course.title}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-sm font-semibold text-[var(--color-text)]">
            订单号
            <input className="input-control mt-2 w-full px-3 py-2" name="orderId" type="text" />
          </label>
          <label className="block text-sm font-semibold text-[var(--color-text)]">
            备注
            <input className="input-control mt-2 w-full px-3 py-2" name="note" type="text" />
          </label>
          <button className="button-primary lg:col-span-4" type="submit">
            开通课程权限
          </button>
        </form>
      </section>

      <section className="panel panel-padded">
        <h2 className="section-title">待处理订单</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[860px] text-left text-sm">
            <thead className="text-soft">
              <tr>
                <th className="border-b border-[var(--color-border)] py-2 pr-4 font-semibold">订单号</th>
                <th className="border-b border-[var(--color-border)] py-2 pr-4 font-semibold">用户</th>
                <th className="border-b border-[var(--color-border)] py-2 pr-4 font-semibold">课程</th>
                <th className="border-b border-[var(--color-border)] py-2 pr-4 font-semibold">金额</th>
                <th className="border-b border-[var(--color-border)] py-2 pr-4 font-semibold">状态</th>
                <th className="border-b border-[var(--color-border)] py-2 font-semibold">时间</th>
              </tr>
            </thead>
            <tbody>
              {summary.orders.length > 0 ? (
                summary.orders.map((order) => (
                  <tr key={order.id}>
                    <td className="border-b border-[var(--color-border)] py-3 pr-4 font-mono text-xs">{order.id}</td>
                    <td className="border-b border-[var(--color-border)] py-3 pr-4">{findUserEmail(summary.users, order.userId)}</td>
                    <td className="border-b border-[var(--color-border)] py-3 pr-4">{getCourseTitle(order.courseSlug)}</td>
                    <td className="border-b border-[var(--color-border)] py-3 pr-4">¥{order.amountCents / 100}</td>
                    <td className="border-b border-[var(--color-border)] py-3 pr-4">{order.status}</td>
                    <td className="border-b border-[var(--color-border)] py-3">{formatDate(order.createdAt)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="py-4 text-muted" colSpan={6}>
                    暂时还没有订单。
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
