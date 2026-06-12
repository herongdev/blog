import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StructuredData } from "@/components/site/StructuredData";
import { ImageCompressTool } from "@/components/tools/image-compress/ImageCompressTool";
import { ImageCropTool } from "@/components/tools/image-crop/ImageCropTool";
import { ImageToPdfTool } from "@/components/tools/image-to-pdf/ImageToPdfTool";
import { Mp4ToGifTool } from "@/components/tools/mp4-to-gif/Mp4ToGifTool";
import { PdfMergeTool } from "@/components/tools/pdf-merge/PdfMergeTool";
import { PdfOrganizeTool } from "@/components/tools/pdf-organize/PdfOrganizeTool";
import { PdfSplitTool } from "@/components/tools/pdf-split/PdfSplitTool";
import { PdfToImageTool } from "@/components/tools/pdf-to-image/PdfToImageTool";
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

  const toolContent = {
    "image-compress": <ImageCompressTool tool={tool} />,
    "image-crop": <ImageCropTool tool={tool} />,
    "image-to-pdf": <ImageToPdfTool tool={tool} />,
    "mp4-to-gif": <Mp4ToGifTool tool={tool} />,
    "pdf-merge": <PdfMergeTool tool={tool} />,
    "pdf-organize": <PdfOrganizeTool tool={tool} />,
    "pdf-split": <PdfSplitTool tool={tool} />,
    "pdf-to-image": <PdfToImageTool tool={tool} />
  }[tool.slug];

  const content = toolContent ?? <ToolShell tool={tool} />;

  return (
    <>
      <StructuredData data={buildToolJsonLd(tool)} />
      {content}
    </>
  );
}
