export type CourseAccess = "free" | "paid";

export interface CourseLesson {
  title: string;
  summary: string;
}

export interface CourseProduct {
  slug: string;
  title: string;
  subtitle: string;
  access: CourseAccess;
  priceCents: number;
  currency: "CNY";
  level: string;
  duration: string;
  highlights: string[];
  lessons: CourseLesson[];
}

export const courseProducts: CourseProduct[] = [
  {
    slug: "mini-coding-agent-7-days",
    title: "7 天手写 Mini Coding Agent",
    subtitle: "从 Agent Run、状态机、工具权限到可验证代码修改，先跑通最小闭环。",
    access: "free",
    priceCents: 0,
    currency: "CNY",
    level: "入门到进阶前",
    duration: "7 天",
    highlights: [
      "从 0 做出本地 CLI 版 Mini Codex",
      "理解 Coding Agent 不是普通聊天套壳",
      "掌握 plan、diff、approval、verify 的基础闭环"
    ],
    lessons: [
      { title: "Day 0：为什么 AI 编程不是 prompt 技巧", summary: "建立任务运行时思维。" },
      { title: "Day 1：创建 Agent Run", summary: "让一次任务可持久化、可恢复、可追踪。" },
      { title: "Day 2：状态机", summary: "让 Agent 的每一步有边界。" },
      { title: "Day 3：Tool Registry", summary: "模型只提出意图，系统负责执行。" },
      { title: "Day 4：Permission Policy", summary: "Prompt 不是安全边界。" },
      { title: "Day 5：Plan / Diff Review", summary: "不让 AI 静默改仓库。" },
      { title: "Day 6-7：Verify / Trace / Eval", summary: "让完成可证明、失败可复盘。" }
    ]
  },
  {
    slug: "agent-coding-engineer-pro",
    title: "Agent 编码工程师实战课",
    subtitle: "从 toy but runnable 升级到 work-useful，做出可展示、可面试、可持续演进的 Coding Agent Runtime。",
    access: "paid",
    priceCents: 199900,
    currency: "CNY",
    level: "进阶",
    duration: "4-6 周",
    highlights: [
      "真实模型适配、Code Context、AGENTS.md 和 Prompt Injection 防护",
      "Sandbox、checkpoint、rollback、verify、repair 和 eval dashboard",
      "项目 README、面试讲法、作品集和付费交付路径"
    ],
    lessons: [
      { title: "Module 1：Agent Runtime 基础闭环", summary: "把免费课闭环升级成稳定架构。" },
      { title: "Module 2：Code Context Engineering", summary: "让 Agent 知道该看哪些文件。" },
      { title: "Module 3：Tool / MCP / Permission", summary: "接工具，但不放弃权限控制。" },
      { title: "Module 4：Sandbox / Checkpoint / Rollback", summary: "写错能停、能审、能回退。" },
      { title: "Module 5：Verifier / Repair / Eval", summary: "让成功和失败都可度量。" },
      { title: "Module 6：Desktop Workbench", summary: "把运行时能力产品化。" },
      { title: "Module 7：Git / Worktree / Subagent", summary: "向真实团队工作流靠近。" },
      { title: "Module 8：作品集和面试表达", summary: "把项目讲成工程能力。" }
    ]
  }
];

export function getCourseBySlug(slug: string): CourseProduct | undefined {
  return courseProducts.find((course) => course.slug === slug);
}

export function formatCoursePrice(course: CourseProduct): string {
  if (course.priceCents <= 0) return "免费";
  return `¥${(course.priceCents / 100).toLocaleString("zh-CN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  })}`;
}
