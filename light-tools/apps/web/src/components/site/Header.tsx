import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-slate-200 bg-white/95">
      <div className="mx-auto flex min-h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link className="text-base font-semibold text-slate-950" href="/">
          轻量文件工具箱
        </Link>
        <nav className="flex items-center gap-1 text-sm font-medium text-slate-700" aria-label="主导航">
          <Link className="rounded-md px-3 py-2 hover:bg-slate-100 hover:text-slate-950" href="/">
            首页
          </Link>
          <Link className="rounded-md px-3 py-2 hover:bg-slate-100 hover:text-slate-950" href="/tools">
            工具
          </Link>
        </nav>
      </div>
    </header>
  );
}
