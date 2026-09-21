import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import { AnalyticsTracker } from "@/components/site/AnalyticsTracker";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { getSiteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "轻量文件工具箱",
    template: "%s | 轻量文件工具箱"
  },
  description: "免费在线 PDF、图片、视频小工具，快速处理常见文件任务。",
  keywords: ["PDF 工具", "图片工具", "视频转 GIF", "文件处理"],
  alternates: {
    canonical: getSiteUrl()
  },
  openGraph: {
    title: "轻量文件工具箱",
    description: "免费在线 PDF、图片、视频小工具，快速处理常见文件任务。",
    type: "website",
    url: getSiteUrl()
  },
  twitter: {
    card: "summary",
    title: "轻量文件工具箱",
    description: "免费在线 PDF、图片、视频小工具，快速处理常见文件任务。"
  },
  robots: {
    index: true,
    follow: true
  }
};

const themeScript = `
(() => {
  try {
    const storedTheme = localStorage.getItem("light-tools-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const theme = storedTheme === "dark" || storedTheme === "light"
      ? storedTheme
      : prefersDark
        ? "dark"
        : "light";
    document.documentElement.dataset.theme = theme;
  } catch {
    document.documentElement.dataset.theme = "light";
  }
})();
`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <Suspense fallback={null}>
          <AnalyticsTracker />
        </Suspense>
      </body>
    </html>
  );
}
