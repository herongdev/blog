import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { tools, type ToolSlug } from './data/tools';
import { themes, type ThemeSlug } from './data/themes';

const toolSlugs = tools.map((tool) => tool.slug) as [ToolSlug, ...ToolSlug[]];
const themeSlugs = themes.map((theme) => theme.slug) as [ThemeSlug, ...ThemeSlug[]];

const tutorials = defineCollection({
  loader: glob({ base: './src/content/tutorials', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string().min(8),
    summary: z.string().min(20),
    tool: z.enum(toolSlugs),
    status: z.enum(['lead', 'published']),
    updatedAt: z.coerce.date(),
    publishedAt: z.coerce.date().optional(),
    version: z.string().optional(),
    platform: z.string().optional(),
    keywords: z.array(z.string()).default([]),
    searchClues: z.array(z.string()).default([]),
    themes: z.array(z.enum(themeSlugs)).default([]),
    featured: z.boolean().default(false),
    officialSources: z.array(z.object({
      title: z.string(),
      url: z.url(),
    })).min(1),
    discoverySources: z.array(z.object({
      title: z.string(),
      url: z.url(),
    })).default([]),
    verification: z.object({
      testedAt: z.coerce.date(),
      environment: z.string().min(8),
      result: z.string().min(8),
    }).optional(),
    videoUrl: z.url().optional(),
  }).superRefine((data, context) => {
    if (data.status === 'lead' && data.videoUrl) {
      context.addIssue({
        code: 'custom',
        message: '待实测线索不能填写 videoUrl；亲测并发布后再关联原视频',
        path: ['videoUrl'],
      });
    }
    if (data.status === 'lead' && data.featured) {
      context.addIssue({
        code: 'custom',
        message: '待实测线索不能设为首页重点教程',
        path: ['featured'],
      });
    }
    if (data.status === 'published' && !data.verification) {
      context.addIssue({
        code: 'custom',
        message: '发布教程必须填写 verification（实测时间、环境和结果）',
        path: ['verification'],
      });
    }
    if (data.status === 'published' && data.searchClues.length < 2) {
      context.addIssue({
        code: 'custom',
        message: '发布教程至少填写 2 条用户可能记住的搜索线索',
        path: ['searchClues'],
      });
    }
    if (data.status === 'published') {
      const fields = [
        data.title,
        data.summary,
        data.version,
        data.platform,
        ...data.keywords,
        ...data.searchClues,
        ...data.officialSources.flatMap((source) => [source.title, source.url]),
        ...data.discoverySources.flatMap((source) => [source.title, source.url]),
        data.verification?.environment,
        data.verification?.result,
      ];
      if (fields.some((value) => value && /(?:TODO[:：]|REPLACE_WITH_)/i.test(value))) {
        context.addIssue({
          code: 'custom',
          message: '发布教程前必须替换 frontmatter 中的模板占位内容',
        });
      }
    }
  }),
});

export const collections = { tutorials };
