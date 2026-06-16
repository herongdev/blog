export type ToolProcessMode = "browser" | "server" | "hybrid";

export type ToolCategory = "pdf" | "image" | "video" | "text" | "office";

export interface ToolDefinition {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  category: ToolCategory;
  processMode: ToolProcessMode;
  acceptedMimeTypes: string[];
  maxFilesFree: number;
  maxFileSizeMbFree: number;
  maxFilesPro: number;
  maxFileSizeMbPro: number;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}

export interface ToolCategoryDefinition {
  id: ToolCategory;
  name: string;
  description: string;
}

export const toolCategories: ToolCategoryDefinition[] = [
  {
    id: "pdf",
    name: "PDF",
    description: "合并、拆分、生成和优化 PDF 文件"
  },
  {
    id: "image",
    name: "图片",
    description: "压缩、转换和整理常见图片格式"
  },
  {
    id: "video",
    name: "视频",
    description: "处理短视频和动图生成任务"
  },
  {
    id: "text",
    name: "文字",
    description: "后续用于文本清洗、格式化和编码转换"
  },
  {
    id: "office",
    name: "Office",
    description: "后续用于文档转换和办公格式处理"
  }
];

export const tools: ToolDefinition[] = [
  {
    id: "pdf-merge",
    slug: "pdf-merge",
    name: "PDF 合并",
    shortDescription: "把多个 PDF 合并成一个文件",
    longDescription:
      "选择多个 PDF 文件，按顺序在浏览器本地合并成一个文件。",
    category: "pdf",
    processMode: "browser",
    acceptedMimeTypes: ["application/pdf"],
    maxFilesFree: 10,
    maxFileSizeMbFree: 30,
    maxFilesPro: 100,
    maxFileSizeMbPro: 500,
    seo: {
      title: "PDF 合并 - 免费在线合并多个 PDF 文件",
      description:
        "免费在线合并 PDF 文件，支持拖拽排序和浏览器本地处理，不上传文件。",
      keywords: ["PDF 合并", "合并 PDF", "多个 PDF 合成一个"]
    }
  },
  {
    id: "pdf-split",
    slug: "pdf-split",
    name: "PDF 拆分",
    shortDescription: "按页码范围拆分 PDF 文件",
    longDescription:
      "上传一个 PDF，按指定页码、单页或固定页数在浏览器本地拆分导出。",
    category: "pdf",
    processMode: "browser",
    acceptedMimeTypes: ["application/pdf"],
    maxFilesFree: 1,
    maxFileSizeMbFree: 50,
    maxFilesPro: 10,
    maxFileSizeMbPro: 500,
    seo: {
      title: "PDF 拆分 - 免费在线按页拆分 PDF",
      description:
        "免费在线拆分 PDF 文件，支持按页码范围、每页一个 PDF 或每 N 页拆分，浏览器本地处理，不上传文件。",
      keywords: ["PDF 拆分", "拆分 PDF", "PDF 按页导出", "PDF 提取页面"]
    }
  },
  {
    id: "pdf-organize",
    slug: "pdf-organize",
    name: "PDF 页面整理",
    shortDescription: "删除、旋转和调整页面顺序",
    longDescription:
      "上传一个 PDF，预览页面缩略图后删除页面、调整顺序、旋转页面并导出新的 PDF。",
    category: "pdf",
    processMode: "browser",
    acceptedMimeTypes: ["application/pdf"],
    maxFilesFree: 1,
    maxFileSizeMbFree: 50,
    maxFilesPro: 10,
    maxFileSizeMbPro: 500,
    seo: {
      title: "PDF 页面整理 - 免费在线删除、旋转和排序 PDF 页面",
      description:
        "免费在线整理 PDF 页面，支持删除页面、旋转页面、调整顺序并导出新 PDF，浏览器本地处理，不上传文件。",
      keywords: ["PDF 页面整理", "PDF 删除页面", "PDF 旋转页面", "PDF 页面排序", "PDF 提取页面"]
    }
  },
  {
    id: "pdf-to-image",
    slug: "pdf-to-image",
    name: "PDF 转图片",
    shortDescription: "把 PDF 页面导出为图片",
    longDescription:
      "上传一个 PDF，选择页码范围后在浏览器本地导出 JPG、PNG 或 WebP 图片。",
    category: "pdf",
    processMode: "browser",
    acceptedMimeTypes: ["application/pdf"],
    maxFilesFree: 1,
    maxFileSizeMbFree: 50,
    maxFilesPro: 10,
    maxFileSizeMbPro: 500,
    seo: {
      title: "PDF 转图片 - 免费在线 PDF 转 JPG/PNG/WebP",
      description:
        "免费在线把 PDF 页面转换成 JPG、PNG 或 WebP 图片，支持指定页码范围和清晰度选择，浏览器本地处理，不上传文件。",
      keywords: ["PDF 转图片", "PDF 转 JPG", "PDF 转 PNG", "PDF 导出图片"]
    }
  },
  {
    id: "image-to-pdf",
    slug: "image-to-pdf",
    name: "图片转 PDF",
    shortDescription: "把 JPG、PNG 图片整理成 PDF",
    longDescription:
      "选择多张图片，按顺序生成 PDF 文件，适合整理证件照、截图和扫描图片。",
    category: "image",
    processMode: "browser",
    acceptedMimeTypes: ["image/jpeg", "image/png", "image/webp"],
    maxFilesFree: 20,
    maxFileSizeMbFree: 20,
    maxFilesPro: 200,
    maxFileSizeMbPro: 100,
    seo: {
      title: "图片转 PDF - 免费在线 JPG/PNG 转 PDF",
      description:
        "免费在线把 JPG、PNG、WebP 图片合成为 PDF，支持多图排序和浏览器本地生成。",
      keywords: ["图片转 PDF", "JPG 转 PDF", "PNG 转 PDF"]
    }
  },
  {
    id: "image-compress",
    slug: "image-compress",
    name: "图片压缩",
    shortDescription: "压缩、改尺寸和转换格式",
    longDescription:
      "在浏览器本地压缩 JPG、PNG、WebP 图片，可设置目标体积、输出尺寸和格式。",
    category: "image",
    processMode: "browser",
    acceptedMimeTypes: ["image/jpeg", "image/png", "image/webp"],
    maxFilesFree: 20,
    maxFileSizeMbFree: 20,
    maxFilesPro: 500,
    maxFileSizeMbPro: 100,
    seo: {
      title: "图片压缩转换 - 免费在线压缩、改尺寸、转格式",
      description:
        "免费在线压缩图片、调整尺寸并转换 JPG、PNG、WebP 格式，支持目标体积和常用预设，浏览器本地处理。",
      keywords: ["图片压缩", "图片格式转换", "图片尺寸调整", "JPG 压缩", "WebP 转换"]
    }
  },
  {
    id: "image-crop",
    slug: "image-crop",
    name: "图片裁剪",
    shortDescription: "裁剪头像、证件照和封面图",
    longDescription:
      "在浏览器本地裁剪 JPG、PNG、WebP 图片，支持头像、证件照、表单图和封面尺寸预设。",
    category: "image",
    processMode: "browser",
    acceptedMimeTypes: ["image/jpeg", "image/png", "image/webp"],
    maxFilesFree: 1,
    maxFileSizeMbFree: 20,
    maxFilesPro: 100,
    maxFileSizeMbPro: 100,
    seo: {
      title: "图片裁剪 - 免费在线裁剪头像、证件照和封面图",
      description:
        "免费在线裁剪图片，支持头像方图、一寸证件照、二寸证件照、横版封面、自定义尺寸和 JPG/PNG/WebP 导出，浏览器本地处理。",
      keywords: ["图片裁剪", "证件照尺寸", "头像裁剪", "图片改尺寸", "在线裁剪图片"]
    }
  },
  {
    id: "image-convert",
    slug: "image-convert",
    name: "图片格式转换",
    shortDescription: "HEIC、PNG、JPG、WebP、ICO 互转",
    longDescription:
      "在浏览器本地把 HEIC、HEIF、JPG、PNG、WebP、GIF、BMP 图片转换为 PNG、JPG、WebP 或 ICO 图标。",
    category: "image",
    processMode: "browser",
    acceptedMimeTypes: [
      "image/heic",
      "image/heif",
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif",
      "image/bmp"
    ],
    maxFilesFree: 1,
    maxFileSizeMbFree: 30,
    maxFilesPro: 100,
    maxFileSizeMbPro: 100,
    seo: {
      title: "图片格式转换 - 免费在线 HEIC/PNG/JPG/WebP/ICO 互转",
      description:
        "免费在线转换图片格式，支持 HEIC、HEIF、JPG、PNG、WebP、GIF、BMP 输入，导出 PNG、JPG、WebP 或 favicon.ico，支持裁剪、留边、常用图标尺寸和自定义尺寸。",
      keywords: [
        "图片格式转换",
        "HEIC 转 PNG",
        "HEIC 转 ICO",
        "PNG 转 ICO",
        "JPG 转 WebP",
        "favicon 生成"
      ]
    }
  },
  {
    id: "mp4-to-gif",
    slug: "mp4-to-gif",
    name: "MP4 转 GIF",
    shortDescription: "把短视频转换成 GIF 动图",
    longDescription:
      "上传 MP4 后由服务器生成 GIF，可设置目标体积、输出尺寸、帧率和转换时长。",
    category: "video",
    processMode: "server",
    acceptedMimeTypes: ["video/mp4"],
    maxFilesFree: 1,
    maxFileSizeMbFree: 50,
    maxFilesPro: 20,
    maxFileSizeMbPro: 500,
    seo: {
      title: "MP4 转 GIF - 免费在线视频转动图",
      description:
        "免费在线将 MP4 短视频转换为 GIF 动图，支持目标体积、常用尺寸预设和自定义宽高。",
      keywords: ["MP4 转 GIF", "视频转 GIF", "在线生成动图"]
    }
  }
];

export function getToolBySlug(slug: string): ToolDefinition | undefined {
  return tools.find((tool) => tool.slug === slug);
}

export function getToolsByCategory(category: ToolCategory): ToolDefinition[] {
  return tools.filter((tool) => tool.category === category);
}

export function getRelatedTools(tool: ToolDefinition, limit = 3): ToolDefinition[] {
  return tools
    .filter((candidate) => candidate.id !== tool.id && candidate.category === tool.category)
    .slice(0, limit);
}
