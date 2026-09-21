import Link from "next/link";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
          <div className="font-medium text-[var(--color-text)]">LightTools</div>
          <p>PDF、图片和视频处理工具。</p>
        </div>
        <div className="flex gap-3 text-xs text-soft">
          <Link className="hover:text-muted" href="/courses">
            课程
          </Link>
          <Link className="hover:text-muted" href="/admin" rel="nofollow">
            后台
          </Link>
        </div>
      </div>
    </footer>
  );
}
