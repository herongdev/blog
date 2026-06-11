import type { Metadata } from "next";
import type { ToolDefinition } from "@light-tools/shared";
import { tools } from "@/lib/tool-registry";

export function getSiteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");
}

export function getCanonicalUrl(path = ""): string {
  const normalizedPath = path && path !== "/" ? `/${path.replace(/^\/+/, "")}` : "";
  return `${getSiteUrl()}${normalizedPath}`;
}

export function buildToolMetadata(tool: ToolDefinition): Metadata {
  const url = getCanonicalUrl(`/tools/${tool.slug}`);

  return {
    title: tool.seo.title,
    description: tool.seo.description,
    keywords: tool.seo.keywords,
    alternates: {
      canonical: url
    },
    openGraph: {
      title: tool.seo.title,
      description: tool.seo.description,
      type: "website",
      url
    },
    twitter: {
      card: "summary",
      title: tool.seo.title,
      description: tool.seo.description
    }
  };
}

export function buildHomeJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "轻量文件工具箱",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    url: getCanonicalUrl(),
    description: "在线处理 PDF、图片和视频等常见文件任务。"
  };
}

export function buildToolsJsonLd(items: ToolDefinition[] = tools): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "文件处理工具列表",
    itemListElement: items.map((tool, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: tool.name,
      url: getCanonicalUrl(`/tools/${tool.slug}`)
    }))
  };
}

export function buildToolJsonLd(tool: ToolDefinition): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    url: getCanonicalUrl(`/tools/${tool.slug}`),
    description: tool.seo.description,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "CNY"
    }
  };
}
