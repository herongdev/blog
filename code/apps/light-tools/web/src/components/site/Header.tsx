import Link from "next/link";
import { renderHeader } from "@herong/site-chrome";
import { SiteChromeClient } from "@/components/site/SiteChromeClient";

const blogHomeUrl = process.env.NEXT_PUBLIC_BLOG_HOME_URL ?? "https://herong.info/";
const guidesUrl = process.env.NEXT_PUBLIC_GUIDES_URL ?? "https://dev.herong.info/";
const toolsUrl = process.env.NEXT_PUBLIC_TOOLS_URL ?? "https://herong.info/file-tools";

export function Header() {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: renderHeader({ homeUrl: blogHomeUrl, guidesUrl, toolsUrl, active: "tools" }) }} />
      <SiteChromeClient />
      <nav className="border-b border-[var(--color-border)] bg-[var(--color-surface)]" aria-label="工具箱导航">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center gap-x-2 px-4 text-sm font-medium sm:gap-x-4 sm:px-6 lg:px-8">
          <span className="mr-2 hidden py-3 text-[var(--color-text)] sm:inline-block">文件工具箱</span>
          <Link className="site-nav-link inline-flex min-h-11 items-center px-2" href="/tools">全部工具</Link>
          <Link className="site-nav-link inline-flex min-h-11 items-center px-2" href="/courses">课程</Link>
          <Link className="site-nav-link inline-flex min-h-11 items-center px-2" href="/courses/me" rel="nofollow">我的</Link>
          <Link className="site-nav-link ml-auto inline-flex min-h-11 items-center px-2 text-xs" href="/admin" rel="nofollow">后台</Link>
        </div>
      </nav>
    </>
  );
}
