import type { CourseProduct } from "@/lib/course-catalog";

export interface CourseContentBlock {
  title: string;
  body: string[];
}

export interface CourseContent {
  intro: string;
  preview: CourseContentBlock[];
  protectedBlocks: CourseContentBlock[];
}

export function getCourseContent(course: CourseProduct): CourseContent {
  if (course.slug === "mini-coding-agent-7-days") {
    return {
      intro: "免费课目标是让你先跑通一个可解释的 Mini Coding Agent，而不是先学一堆名词。",
      preview: [
        {
          title: "学习方式",
          body: [
            "每天只做一个工程判断：先理解为什么需要这一层，再写代码验证。",
            "每节课都保留设计问题、文件路径、运行命令、预期输出和验收清单。"
          ]
        }
      ],
      protectedBlocks: [
        {
          title: "Day 1：Agent Run 的最小数据结构",
          body: [
            "一次 Coding Agent 任务不能只保存最终回答。它至少需要 runId、用户任务、目标仓库、状态、事件时间线和 artifact。",
            "后续的 plan、diff、approval、verify、trace 都挂在同一个 runId 下。"
          ]
        },
        {
          title: "Day 2：为什么先做状态机",
          body: [
            "状态机不是复杂化，而是让 UI、工具和人类审批知道任务正卡在哪一步。",
            "第一版至少区分 running、awaiting_approval、completed、failed。"
          ]
        },
        {
          title: "Day 3：Tool Registry 的边界",
          body: [
            "模型不直接读写文件，它只提出工具调用意图。",
            "Runtime 负责 schema 校验、权限判断、handler 执行和 observation 记录。"
          ]
        },
        {
          title: "Day 4-7：从能跑到可信",
          body: [
            "Plan 和 diff 都必须可审查；apply 必须有权限门；完成必须跑 verify。",
            "Trace 和 eval 是持续改进的地基，不是课程最后的装饰。"
          ]
        }
      ]
    };
  }

  return {
    intro: "高级课目标是把最小闭环升级成工作可用的 Coding Agent Runtime。",
    preview: [
      {
        title: "付费课解决什么",
        body: [
          "免费课让你知道 Coding Agent Runtime 长什么样。",
          "付费课解决真实工程复杂度：上下文取舍、权限、安全、回滚、评测、桌面工作台和面试表达。"
        ]
      },
      {
        title: "试看内容：高级课第一条原则",
        body: [
          "不要把模型输出当执行结果。模型负责建议，Runtime 负责校验、权限、执行、验证和记录。",
          "这条原则会贯穿模型适配、MCP、sandbox、repair 和 subagent。"
        ]
      }
    ],
    protectedBlocks: [
      {
        title: "Module 1：真实模型适配层",
        body: [
          "模型适配层只暴露 generatePlan、generateDiff、summarizeObservation 这类能力。",
          "模型输出必须结构化校验，不能直接写文件，不能直接执行 shell 命令。"
        ]
      },
      {
        title: "Module 2：Code Context Engineering",
        body: [
          "Code Context 不是普通 RAG。它要根据任务、文件名、依赖关系、最近改动和项目规则做取舍。",
          "仓库文本必须标记为 untrusted context，不能让 AGENTS.md 或 README 覆盖系统权限。"
        ]
      },
      {
        title: "Module 3：Sandbox 和 Permission Profile",
        body: [
          "第一版至少提供 read_only、plan_only、review_required、apply_allowed_once、verify_allowed。",
          "权限策略依赖工具名、输入参数、当前 run 状态和用户审批记录。"
        ]
      },
      {
        title: "Module 4：Checkpoint / Rollback",
        body: [
          "每次 apply 前保存 checkpoint，记录文件快照、diff、审批人和验证命令。",
          "Rollback 不默认自动执行，高风险恢复也要进入 human gate。"
        ]
      },
      {
        title: "Module 5：作品集表达",
        body: [
          "面试中不要说“我接了一个模型 API”。",
          "要讲清模型、Runtime、Tool、Permission、Verifier、Trace、Eval 的分工，以及失败时如何定位。"
        ]
      }
    ]
  };
}
