import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import "@herong/site-chrome/styles.css";
import { themeBootstrapScript, BRAND_FAVICON_DATA_URL } from "@herong/site-chrome";
import { AnalyticsTracker } from "@/components/site/AnalyticsTracker";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { getCanonicalUrl, getSiteUrl } from "@/lib/seo";
import { withBasePath } from "@/lib/base-path";

const noindex = process.env.PUBLIC_NOINDEX === "true";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "轻量文件工具箱",
    template: "%s | 轻量文件工具箱"
  },
  description: "免费在线 PDF、图片、视频小工具，快速处理常见文件任务。",
  keywords: ["PDF 工具", "图片工具", "视频转 GIF", "文件处理"],
  icons: {
    icon: [{ url: BRAND_FAVICON_DATA_URL, type: "image/svg+xml" }],
    apple: [{ url: withBasePath("/apple-touch-icon.png"), sizes: "180x180", type: "image/png" }]
  },
  alternates: {
    canonical: getSiteUrl()
  },
  openGraph: {
    title: "轻量文件工具箱",
    description: "免费在线 PDF、图片、视频小工具，快速处理常见文件任务。",
    type: "website",
    url: getSiteUrl(),
    images: [{ url: getCanonicalUrl("/logo-hr.png"), width: 512, height: 512, alt: "何荣 HR" }]
  },
  twitter: {
    card: "summary",
    title: "轻量文件工具箱",
    description: "免费在线 PDF、图片、视频小工具，快速处理常见文件任务。",
    images: [getCanonicalUrl("/logo-hr.png")]
  },
  robots: {
    index: !noindex,
    follow: !noindex,
    noarchive: noindex || undefined
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: themeBootstrapScript }} /></head>
      <body>
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
