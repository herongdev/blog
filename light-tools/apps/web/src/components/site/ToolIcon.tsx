import type { ToolCategory, ToolDefinition } from "@light-tools/shared";
import {
  Crop,
  File,
  FileImage,
  FileStack,
  FileText,
  Film,
  Image as ImageIcon,
  Images,
  Minimize2,
  Scissors,
  type LucideIcon
} from "lucide-react";

const toolIcons: Record<string, LucideIcon> = {
  "pdf-merge": FileText,
  "pdf-split": Scissors,
  "pdf-organize": FileStack,
  "pdf-to-image": FileImage,
  "image-to-pdf": Images,
  "image-compress": Minimize2,
  "image-convert": FileImage,
  "image-crop": Crop,
  "mp4-to-gif": Film
};

const categoryIcons: Partial<Record<ToolCategory, LucideIcon>> = {
  pdf: FileText,
  image: ImageIcon,
  video: Film,
  text: File,
  office: File
};

export function ToolIcon({ className, tool }: { className?: string; tool: ToolDefinition }) {
  const Icon = toolIcons[tool.id] ?? categoryIcons[tool.category] ?? File;

  return <Icon aria-hidden="true" className={className} strokeWidth={1.8} />;
}

export function CategoryIcon({
  category,
  className
}: {
  category: ToolCategory;
  className?: string;
}) {
  const Icon = categoryIcons[category] ?? File;

  return <Icon aria-hidden="true" className={className} strokeWidth={1.8} />;
}
