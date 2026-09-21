import type { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import QRCode from "qrcode";
import { withBasePath } from "@/lib/base-path";
import { OrderStatusPoller } from "@/components/courses/OrderStatusPoller";
import { formatCoursePrice, getCourseBySlug } from "@/lib/course-catalog";
import { getCourseOrder } from "@/lib/server/course-store";
import { memberCookieName, readMemberSession } from "@/lib/server/member-auth";
import { getWechatPayRuntimeStatus } from "@/lib/server/wechat-pay";

export const metadata: Metadata = {
  title: "课程订单",
  robots: {
    index: false,
    follow: false
  }
};

function formatOrderStatus(status: string): string {
  if (status === "paid") return "已支付";
  if (status === "cancelled") return "已取消";
  return "待支付";
}

export default async function CourseOrderPage({
  params,
  searchParams
}: {
  params: Promise<{ orderId: string }>;
  searchParams?: Promise<{ payment?: string }>;
}) {
  const { orderId } = await params;
  const query = await searchParams;
  const cookieStore = await cookies();
  const session = readMemberSession(cookieStore.get(memberCookieName)?.value);
  if (!session) redirect(`/courses/login?redirectTo=/courses/orders/${orderId}`);

  const order = await getCourseOrder(session.userId, orderId);
  if (!order) notFound();

  const course = getCourseBySlug(order.courseSlug);
  if (!course) notFound();

  const wechatPayStatus = getWechatPayRuntimeStatus();
  const qrSvg = order.wechatCodeUrl
    ? await QRCode.toString(order.wechatCodeUrl, {
        margin: 1,
        type: "svg",
        width: 220
      })
    : undefined;
  const courseUrl = withBasePath(`/courses/${course.slug}`);
  const orderStatusUrl = withBasePath(`/api/courses/orders/${order.id}/status`);

  return (
    <div className="app-container">
      <section className="panel panel-padded max-w-3xl">
        <Link className="link-accent text-sm" href="/courses/me">
          返回我的课程
        </Link>
        <h1 className="page-title mt-4">课程订单</h1>
        <div className="mt-6 grid gap-3 text-sm">
          <div className="flex justify-between gap-4 border-b border-[var(--color-border)] pb-3">
            <span className="text-muted">课程</span>
            <span className="font-semibold text-[var(--color-text)]">{course.title}</span>
          </div>
          <div className="flex justify-between gap-4 border-b border-[var(--color-border)] pb-3">
            <span className="text-muted">金额</span>
            <span className="font-semibold text-[var(--color-text)]">{formatCoursePrice(course)}</span>
          </div>
          <div className="flex justify-between gap-4 border-b border-[var(--color-border)] pb-3">
            <span className="text-muted">订单号</span>
            <span className="font-mono text-xs text-[var(--color-text)]">{order.id}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-muted">状态</span>
            <span className="font-semibold text-[var(--color-warning)]">{formatOrderStatus(order.status)}</span>
          </div>
        </div>

        {order.status === "paid" ? (
          <div className="mt-6">
            <div className="status-warning">支付已完成，课程权限已经开通。</div>
            <Link className="button-primary mt-4" href={`/courses/${course.slug}`}>
              进入课程
            </Link>
          </div>
        ) : null}

        {order.status !== "paid" && wechatPayStatus.ready && !qrSvg ? (
          <form action={withBasePath(`/api/courses/orders/${order.id}/wechat/native`)} className="mt-6" method="post">
            <button className="button-primary" type="submit">
              生成微信支付二维码
            </button>
          </form>
        ) : null}

        {order.status !== "paid" && qrSvg ? (
          <section className="mt-6 rounded-md border border-[var(--color-border)] bg-[var(--color-surface-subtle)] p-4">
            <h2 className="section-title">微信扫码支付</h2>
            <div className="mt-4 inline-flex rounded-md border border-[var(--color-border)] bg-white p-3 text-black">
              <div dangerouslySetInnerHTML={{ __html: qrSvg }} />
            </div>
            <OrderStatusPoller redirectTo={courseUrl} statusUrl={orderStatusUrl} />
          </section>
        ) : null}

        {order.status !== "paid" && query?.payment === "wechat_error" ? (
          <div className="status-error mt-6">微信支付二维码生成失败，请稍后重试或先用人工开通方式处理。</div>
        ) : null}

        {order.status !== "paid" && !wechatPayStatus.ready ? (
          <div className="status-warning mt-6">
            当前订单用于人工收款和手动开课：收款后在后台课程权限页输入用户邮箱和订单号，即可开通付费内容。
          </div>
        ) : null}
      </section>
    </div>
  );
}
