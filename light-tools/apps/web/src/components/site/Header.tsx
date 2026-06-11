import Link from "next/link";
import { ThemeToggle } from "@/components/site/ThemeToggle";

export function Header() {
  return (
    <header className="site-header">
      <div className="mx-auto flex min-h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link className="text-base font-semibold text-[var(--color-text)]" href="/">
          轻量文件工具箱
        </Link>
        <nav className="flex items-center gap-2 text-sm font-medium" aria-label="主导航">
          <Link className="site-nav-link px-3 py-2" href="/">
            首页
          </Link>
          <Link className="site-nav-link px-3 py-2" href="/tools">
            工具
          </Link>
          <Link className="site-nav-link px-3 py-2" href="/admin">
            后台
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
