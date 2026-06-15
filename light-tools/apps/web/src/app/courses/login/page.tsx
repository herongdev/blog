import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { withBasePath } from "@/lib/base-path";
import { memberCookieName, readMemberSession } from "@/lib/server/member-auth";

export const metadata: Metadata = {
  title: "课程账号登录",
  robots: {
    index: false,
    follow: false
  }
};

function getMessage(code?: string): string {
  if (code === "invalid") return "账号或密码不正确。";
  if (code === "exists") return "这个邮箱已经注册，请直接登录。";
  if (code === "weak") return "邮箱格式不正确，或密码少于 8 位。";
  return "";
}

function safeRedirectTo(value?: string): string {
  if (!value || !value.startsWith("/") || value.startsWith("//")) return "/courses/me";
  return value;
}

export default async function CourseLoginPage({
  searchParams
}: {
  searchParams?: Promise<{ error?: string; redirectTo?: string }>;
}) {
  const cookieStore = await cookies();
  const params = await searchParams;
  const redirectTo = safeRedirectTo(params?.redirectTo);

  if (readMemberSession(cookieStore.get(memberCookieName)?.value)) {
    redirect(redirectTo);
  }

  const message = getMessage(params?.error);

  return (
    <div className="app-container">
      <header>
        <h1 className="page-title">课程账号</h1>
        <p className="mt-2 text-sm leading-6 text-muted">登录后可以购买课程、查看订单和阅读已开通内容。</p>
      </header>

      {message ? <div className="status-error">{message}</div> : null}

      <section className="grid gap-4 lg:grid-cols-2">
        <form action={withBasePath("/api/courses/login")} className="panel panel-padded space-y-4" method="post">
          <input name="redirectTo" type="hidden" value={redirectTo} />
          <h2 className="section-title">登录</h2>
          <label className="block text-sm font-semibold text-[var(--color-text)]">
            邮箱
            <input autoComplete="email" className="input-control mt-2 w-full px-3 py-2" name="email" required type="email" />
          </label>
          <label className="block text-sm font-semibold text-[var(--color-text)]">
            密码
            <input
              autoComplete="current-password"
              className="input-control mt-2 w-full px-3 py-2"
              name="password"
              required
              type="password"
            />
          </label>
          <button className="button-primary w-full" type="submit">
            登录
          </button>
        </form>

        <form action={withBasePath("/api/courses/register")} className="panel panel-padded space-y-4" method="post">
          <input name="redirectTo" type="hidden" value={redirectTo} />
          <h2 className="section-title">注册</h2>
          <label className="block text-sm font-semibold text-[var(--color-text)]">
            昵称
            <input autoComplete="name" className="input-control mt-2 w-full px-3 py-2" name="name" type="text" />
          </label>
          <label className="block text-sm font-semibold text-[var(--color-text)]">
            邮箱
            <input autoComplete="email" className="input-control mt-2 w-full px-3 py-2" name="email" required type="email" />
          </label>
          <label className="block text-sm font-semibold text-[var(--color-text)]">
            密码
            <input
              autoComplete="new-password"
              className="input-control mt-2 w-full px-3 py-2"
              minLength={8}
              name="password"
              required
              type="password"
            />
          </label>
          <button className="button-accent w-full" type="submit">
            注册并登录
          </button>
        </form>
      </section>
    </div>
  );
}
