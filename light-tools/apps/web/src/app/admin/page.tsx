import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { withBasePath } from "@/lib/base-path";
import { adminCookieName, isValidAdminSession } from "@/lib/server/admin-auth";

export const metadata: Metadata = {
  title: "后台登录",
  robots: {
    index: false,
    follow: false
  }
};

function getErrorMessage(error?: string): string {
  if (error === "config") return "后台密码还没有配置，请先设置 LIGHT_TOOLS_ADMIN_PASSWORD。";
  if (error === "invalid") return "密码不正确。";
  return "";
}

export default async function AdminLoginPage({
  searchParams
}: {
  searchParams?: Promise<{ error?: string }>;
}) {
  const cookieStore = await cookies();
  const params = await searchParams;

  if (isValidAdminSession(cookieStore.get(adminCookieName)?.value)) {
    redirect("/admin/stats");
  }

  const errorMessage = getErrorMessage(params?.error);

  return (
    <div className="app-container">
      <section className="panel panel-padded w-full max-w-xl self-center">
        <h1 className="page-title">后台登录</h1>
        <p className="mt-2 text-sm leading-6 text-muted">登录后可以查看访问量和工具使用统计。</p>
        <form action={withBasePath("/api/admin/login")} className="mt-6 space-y-4" method="post">
          <label className="block text-sm font-semibold text-[var(--color-text)]">
            管理密码
            <input
              autoComplete="current-password"
              className="input-control mt-2 w-full px-3 py-2 text-sm font-normal"
              name="password"
              required
              type="password"
            />
          </label>
          {errorMessage ? <div className="status-error">{errorMessage}</div> : null}
          <button className="button-primary w-full" type="submit">
            进入后台
          </button>
        </form>
      </section>
    </div>
  );
}
