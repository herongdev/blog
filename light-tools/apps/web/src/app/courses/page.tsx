import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, CheckCircle2, LockKeyhole } from "lucide-react";
import { courseProducts, formatCoursePrice } from "@/lib/course-catalog";

export const metadata: Metadata = {
  title: "Agent 编码课程",
  description: "从免费 Mini Coding Agent 到付费 Agent 编码工程师实战课。"
};

export default function CoursesPage() {
  return (
    <div className="app-container">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-[var(--color-accent)]">
          <BookOpen size={18} />
          Agent 编码课程
        </div>
        <h1 className="page-title">从会用 AI 写代码，到能设计 Coding Agent Runtime</h1>
        <p className="max-w-3xl text-sm leading-6 text-muted">
          免费课先跑通最小闭环，付费课继续补齐真实工程里的上下文、权限、回滚、评测和作品集表达。
        </p>
      </header>

      <section className="grid gap-4 lg:grid-cols-2">
        {courseProducts.map((course) => (
          <article className="panel panel-padded flex flex-col gap-5" key={course.slug}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-soft">
                  {course.access === "paid" ? <LockKeyhole size={16} /> : <CheckCircle2 size={16} />}
                  {course.access === "paid" ? "付费进阶" : "免费公开"}
                </div>
                <h2 className="section-title mt-3">{course.title}</h2>
                <p className="mt-2 text-sm leading-6 text-muted">{course.subtitle}</p>
              </div>
              <div className="rounded-md border border-[var(--color-border)] px-3 py-2 text-right">
                <div className="text-lg font-semibold text-[var(--color-text)]">{formatCoursePrice(course)}</div>
                <div className="text-xs text-soft">{course.duration}</div>
              </div>
            </div>

            <div className="grid gap-2">
              {course.highlights.map((highlight) => (
                <div className="flex gap-2 text-sm text-muted" key={highlight}>
                  <CheckCircle2 className="mt-0.5 shrink-0 text-[var(--color-accent)]" size={16} />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>

            <div className="mt-auto flex flex-wrap gap-3">
              <Link className="button-primary" href={`/courses/${course.slug}`}>
                查看课程
              </Link>
              {course.access === "paid" ? (
                <Link className="button-muted" href="/courses/login">
                  登录后购买
                </Link>
              ) : null}
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
