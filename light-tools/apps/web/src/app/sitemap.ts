import type { MetadataRoute } from "next";
import { getCanonicalUrl } from "@/lib/seo";
import { tools } from "@/lib/tool-registry";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: getCanonicalUrl(),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1
    },
    {
      url: getCanonicalUrl("/tools"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9
    },
    ...tools.map((tool) => ({
      url: getCanonicalUrl(`/tools/${tool.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: tool.slug === "mp4-to-gif" ? 0.9 : 0.7
    }))
  ];
}
