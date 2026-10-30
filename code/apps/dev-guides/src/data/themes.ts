export const themes = [
  { slug: 'parallel-work', name: '并行任务' },
  { slug: 'context', name: '上下文引用' },
  { slug: 'api-debugging', name: '接口排查' },
  { slug: 'remote-work', name: '远程协作' },
] as const;

export type ThemeSlug = (typeof themes)[number]['slug'];
