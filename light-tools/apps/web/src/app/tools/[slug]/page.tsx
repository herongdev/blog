import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StructuredData } from "@/components/site/StructuredData";
import { Mp4ToGifTool } from "@/components/tools/mp4-to-gif/Mp4ToGifTool";
import { ToolShell } from "@/components/tools/ToolShell";
import { buildToolJsonLd, buildToolMetadata } from "@/lib/seo";
import { getToolBySlug, tools } from "@/lib/tool-registry";

type ToolPageParams = Promise<{ slug: string }>;

export function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: { params: ToolPageParams }): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    return {
      title: "工具不存在",
      description: "未找到对应的文件处理工具。"
    };
  }

  return buildToolMetadata(tool);
}

export default async function ToolPage({ params }: { params: ToolPageParams }) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  const content =
    tool.slug === "mp4-to-gif" ? <Mp4ToGifTool tool={tool} /> : <ToolShell tool={tool} />;

  return (
    <>
      <StructuredData data={buildToolJsonLd(tool)} />
      {content}
    </>
  );
}
