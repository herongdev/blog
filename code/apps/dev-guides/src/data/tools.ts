export const tools = [
  {
    slug: 'codex',
    name: 'Codex',
    category: 'AI 编程',
    description: '多任务协作、工作树与日常代码修改。',
    aliases: ['OpenAI Codex', 'Codex 桌面版', 'codex app'],
    tone: 'blue',
  },
  {
    slug: 'cursor',
    name: 'Cursor',
    category: 'AI 编程',
    description: '编辑器中的 Agent 工作流与项目协作。',
    aliases: ['Cursor IDE', 'cursor editor'],
    tone: 'purple',
  },
  {
    slug: 'trae',
    name: 'TRAE',
    category: 'AI 编程',
    description: '项目上下文、引用与多路径工作。',
    aliases: ['TRAE CN', 'Trae IDE', '字节编程工具'],
    tone: 'coral',
  },
  {
    slug: 'vscode',
    name: 'VS Code',
    category: '编辑器',
    description: '高频编辑、调试与 Agent 会话。',
    aliases: ['Visual Studio Code', 'vscode', '微软编辑器'],
    tone: 'cyan',
  },
  {
    slug: 'github',
    name: 'GitHub',
    category: '协作与发布',
    description: '代码协作、Actions 与发布流程。',
    aliases: ['Git', 'GitHub Actions', 'Copilot'],
    tone: 'slate',
  },
  {
    slug: 'apifox',
    name: 'Apifox',
    category: '接口调试',
    description: '接口请求、环境变量与调试结果。',
    aliases: ['API Fox', '接口工具'],
    tone: 'orange',
  },
  {
    slug: 'qoder-cn',
    name: 'Qoder CN',
    category: 'AI 编程',
    description: '国产 AI 编程工具与项目任务。',
    aliases: ['通义灵码', 'Qoder', 'Lingma'],
    tone: 'green',
  },
  {
    slug: 'codebuddy',
    name: 'CodeBuddy',
    category: 'AI 编程',
    description: '腾讯 AI 编程工具的规则与 Agent 工作流。',
    aliases: ['腾讯 CodeBuddy', '腾讯编程工具'],
    tone: 'teal',
  },
] as const;

export type ToolSlug = (typeof tools)[number]['slug'];

export const toolBySlug = Object.fromEntries(tools.map((tool) => [tool.slug, tool])) as Record<ToolSlug, (typeof tools)[number]>;
