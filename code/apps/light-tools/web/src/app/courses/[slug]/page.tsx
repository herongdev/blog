import type { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, LockKeyhole } from "lucide-react";
import { withBasePath } from "@/lib/base-path";
import { formatCoursePrice, getCourseBySlug } from "@/lib/course-catalog";
import { getCourseContent } from "@/lib/course-content";
import { getCourseUserById, hasCourseAccess } from "@/lib/server/course-store";
import { memberCookieName, readMemberSession } from "@/lib/server/member-auth";
import { getWechatPayRuntimeStatus } from "@/lib/server/wechat-pay";

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) return {};

  return {
    title: course.title,
    description: course.subtitle
  };
}

function ContentBlock({ title, body }: { title: string; body: string[] }) {
  return (
    <section className="panel panel-padded">
      <h2 className="section-title">{title}</h2>
      <div className="mt-3 space-y-2 text-sm leading-6 text-muted">
        {body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}

export default async function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) notFound();

  const cookieStore = await cookies();
  const session = readMemberSession(cookieStore.get(memberCookieName)?.value);
  const user = await getCourseUserById(session?.userId);
  const canReadFullCourse = await hasCourseAccess(user?.id, course.slug);
  const content = getCourseContent(course);
  const wechatPayReady = getWechatPayRuntimeStatus().ready;

  return (
    <div className="app-container">
      <header className="panel panel-padded">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
          <div>
            <Link className="link-accent text-sm" href="/courses">
              返回课程列表
            </Link>
            <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-[var(--color-accent)]">
              {course.access === "paid" ? <LockKeyhole size={18} /> : <CheckCircle2 size={18} />}
              {course.access === "paid" ? "付费课程" : "免费课程"}
            </div>
            <h1 className="page-title mt-3">{course.title}</h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-muted">{course.subtitle}</p>
          </div>
          <div className="rounded-md border border-[var(--color-border)] bg-[var(--color-surface-subtle)] p-4 lg:min-w-56">
            <div className="text-2xl font-semibold text-[var(--color-text)]">{formatCoursePrice(course)}</div>
            <div className="mt-1 text-sm text-muted">{course.level} · {course.duration}</div>
            {user ? (
              <div className="mt-3 text-xs text-soft">当前账号：{user.email}</div>
            ) : (
              <Link className="button-muted mt-4 w-full" href={`/courses/login?redirectTo=/courses/${course.slug}`}>
                登录 / 注册
              </Link>
            )}
          </div>
        </div>
      </header>

      <section className="grid gap-3 md:grid-cols-2">
        {course.lessons.map((lesson) => (
          <div className="panel p-4" key={lesson.title}>
            <h2 className="panel-title">{lesson.title}</h2>
            <p className="mt-2 text-sm leading-6 text-muted">{lesson.summary}</p>
          </div>
        ))}
      </section>

      <ContentBlock body={[content.intro]} title="课程说明" />

      {content.preview.map((block) => (
        <ContentBlock body={block.body} key={block.title} title={block.title} />
      ))}

      {canReadFullCourse ? (
        content.protectedBlocks.map((block) => <ContentBlock body={block.body} key={block.title} title={block.title} />)
      ) : (
        <section className="panel panel-padded">
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
            <div>
              <h2 className="section-title">完整内容需要开通后阅读</h2>
              <p className="mt-2 text-sm leading-6 text-muted">
                课程正文由服务端按账号权限返回，不会放进静态博客 HTML。当前支持后台手动开通，微信支付配置完成后可自动开通。
              </p>
            </div>
            {user ? (
              <form action={withBasePath("/api/courses/checkout")} method="post">
                <input name="courseSlug" type="hidden" value={course.slug} />
                <button className="button-primary" type="submit">
                  {wechatPayReady ? "购买并支付" : "创建购买订单"}
                </button>
              </form>
            ) : (
              <Link className="button-primary" href={`/courses/login?redirectTo=/courses/${course.slug}`}>
                登录后购买
              </Link>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
