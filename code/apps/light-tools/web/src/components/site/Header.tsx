import Link from "next/link";
import { ThemeToggle } from "@/components/site/ThemeToggle";

const blogHomeUrl = process.env.NEXT_PUBLIC_BLOG_HOME_URL ?? "https://herong.info/";

export function Header() {
  return (
    <header className="site-header">
      <div className="mx-auto flex min-h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link className="text-base font-semibold text-[var(--color-text)]" href="/tools">
          LightTools
        </Link>
        <nav className="flex items-center gap-2 text-sm font-medium" aria-label="主导航">
          <a className="site-nav-link px-3 py-2" href={blogHomeUrl}>
            首页
          </a>
          <Link className="site-nav-link px-3 py-2" href="/courses">
            课程
          </Link>
          <Link className="site-nav-link px-3 py-2" href="/tools">
            工具
          </Link>
          <Link className="site-nav-link px-3 py-2" href="/courses/me" rel="nofollow">
            我的
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
