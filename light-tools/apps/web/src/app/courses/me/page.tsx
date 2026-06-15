import type { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { withBasePath } from "@/lib/base-path";
import { courseProducts, formatCoursePrice, getCourseBySlug } from "@/lib/course-catalog";
import { getUserCourseDashboard, hasCourseAccess } from "@/lib/server/course-store";
import { memberCookieName, readMemberSession } from "@/lib/server/member-auth";

export const metadata: Metadata = {
  title: "我的课程",
  robots: {
    index: false,
    follow: false
  }
};

function formatDate(value: string): string {
  return new Date(value).toLocaleString("zh-CN", { hour12: false });
}

export default async function MyCoursesPage() {
  const cookieStore = await cookies();
  const session = readMemberSession(cookieStore.get(memberCookieName)?.value);
  if (!session) redirect("/courses/login?redirectTo=/courses/me");

  const dashboard = await getUserCourseDashboard(session.userId);
  if (!dashboard.user) redirect("/courses/login?redirectTo=/courses/me");

  const accessRows = await Promise.all(
    courseProducts.map(async (course) => ({
      course,
      hasAccess: await hasCourseAccess(session.userId, course.slug)
    }))
  );

  return (
    <div className="app-container">
      <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="page-title">我的课程</h1>
          <p className="mt-2 text-sm text-muted">{dashboard.user.email}</p>
        </div>
        <form action={withBasePath("/api/courses/logout")} method="post">
          <button className="button-muted" type="submit">
            退出登录
          </button>
        </form>
      </header>

      <section className="grid gap-4 lg:grid-cols-2">
        {accessRows.map(({ course, hasAccess }) => (
          <article className="panel panel-padded" key={course.slug}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="section-title">{course.title}</h2>
                <p className="mt-2 text-sm leading-6 text-muted">{course.subtitle}</p>
              </div>
              <div className="text-right text-sm">
                <div className="font-semibold text-[var(--color-text)]">{formatCoursePrice(course)}</div>
                <div className={hasAccess ? "text-[var(--color-accent)]" : "text-soft"}>
                  {hasAccess ? "已开通" : "未开通"}
                </div>
              </div>
            </div>
            <Link className="button-primary mt-4" href={`/courses/${course.slug}`}>
              {hasAccess ? "继续学习" : "查看课程"}
            </Link>
          </article>
        ))}
      </section>

      <section className="panel panel-padded">
        <h2 className="section-title">订单记录</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="text-soft">
              <tr>
                <th className="border-b border-[var(--color-border)] py-2 pr-4 font-semibold">订单</th>
                <th className="border-b border-[var(--color-border)] py-2 pr-4 font-semibold">课程</th>
                <th className="border-b border-[var(--color-border)] py-2 pr-4 font-semibold">金额</th>
                <th className="border-b border-[var(--color-border)] py-2 pr-4 font-semibold">状态</th>
                <th className="border-b border-[var(--color-border)] py-2 font-semibold">时间</th>
              </tr>
            </thead>
            <tbody>
              {dashboard.orders.length > 0 ? (
                dashboard.orders.map((order) => {
                  const course = getCourseBySlug(order.courseSlug);
                  return (
                    <tr key={order.id}>
                      <td className="border-b border-[var(--color-border)] py-3 pr-4 font-mono text-xs">{order.id.slice(0, 8)}</td>
                      <td className="border-b border-[var(--color-border)] py-3 pr-4">{course?.title || order.courseSlug}</td>
                      <td className="border-b border-[var(--color-border)] py-3 pr-4">¥{order.amountCents / 100}</td>
                      <td className="border-b border-[var(--color-border)] py-3 pr-4">{order.status}</td>
                      <td className="border-b border-[var(--color-border)] py-3">{formatDate(order.createdAt)}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td className="py-4 text-muted" colSpan={5}>
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
