import type { Metadata } from "next";
import type { ToolDefinition } from "@light-tools/shared";

export function buildToolMetadata(tool: ToolDefinition): Metadata {
  return {
    title: tool.seo.title,
    description: tool.seo.description,
    keywords: tool.seo.keywords
  };
}
