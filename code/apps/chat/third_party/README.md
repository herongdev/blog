# 内置的开源源码

本项目的三个通用模块采用源码内置方式（vendoring），不再通过 npm 安装。这里保留来源名称、版权和许可证；这些模块不属于项目原创代码。项目自己的适配、状态管理和交互规则在 src、shared、server 中。

## 来源与调用边界

| 源码模块 | 固定版本 / 提交 | 用途 | 项目入口 |
| --- | --- | --- | --- |
| [eventsource-parser](https://github.com/rexxars/eventsource-parser/tree/6519a0f70dfeb22f829e5c696da2cb4988d64c6a/src) | 4.1.0 / 6519a0f | SSE 字符流分帧 | shared/transport/sse.ts |
| [remend](https://github.com/vercel/streamdown/tree/8a2ac221a878a0fc5839f2035c1e16575cfa3440/packages/remend/src) | 1.3.1 / 8a2ac22，标签 remend@1.3.1 | 未完整 Markdown 的展示修复 | src/features/chat/lib/streamingMarkdown.ts |
| [use-stick-to-bottom](https://github.com/stackblitz-labs/use-stick-to-bottom/blob/8d6a19a0ca6ab632830588073e6a29312a06a088/src/useStickToBottom.ts) | 1.1.6 / 8d6a19a | 阅读跟随和退出跟随 | src/features/chat/hooks/useAutoScroll.ts |

`manifest.json` 保存完整提交、npm 发布包 integrity 和每个源码文件的 SHA-256。源文件共 19 个；没有纳入未使用的 UI 组件、示例、构建脚本或整套上游仓库。

## 许可证和本地改动

- eventsource-parser：MIT，版权声明及全文在 `eventsource-parser/LICENSE`。
- remend：Apache-2.0，版权声明在 `remend/LICENSE`，协议全文在 `remend/LICENSE-2.0.txt`。该版本的上游树中未发现需一并携带的 NOTICE 文件。
- use-stick-to-bottom：MIT，版权声明及全文在 `use-stick-to-bottom/LICENSE.txt`，源码中的版权头保留。

remend 的 `strikethrough-handler.ts` 有两处本地类型兼容调整：对可选匹配数量补 `?? 0`，通过项目严格 TypeScript 检查。文件头标明了改动，manifest 同时保留修改前和修改后的哈希。其余源码保持对应上游版本原样。

ESLint 和 Prettier 不改写这份上游快照。TypeScript 仍检查导入的源码，业务封装仍接受项目全部 lint 和测试。允许 `.ts` 导入后缀是为了保留 eventsource-parser 原始模块引用。

## 迁移验证

2026-09-03，将内置 remend（包含类型兼容调整）与原安装的 1.3.1 对比，2,278 个 Markdown 前缀和配置组合的输出一致。滚动 Hook 用 ES2020 转译并去除注释、统一格式后，与原安装的 1.1.6 JavaScript 一致；SSE 源码直接取自已安装的 4.1.0 发布包。

项目回归检查使用 `npm test`、`npm run lint`、`npm run build` 和真实浏览器。版本一致和回归通过不代表覆盖所有输入或所有浏览器；仍由本项目承担后续维护。

迁移后的 37 项测试、类型检查、lint 和生产构建通过。页面回归中发现活动收起导致内容缩短时的跟随缺口，已在项目 `useAutoScroll` 封装中补充尺寸观察；浏览器验证跟随模式会回到底部，阅读模式保持退出跟随。上游 Hook 未修改。

## 后续维护

需要更新时，先选定上游版本，对比源码与修复记录，保留许可证并更新 manifest，再运行项目边界测试及页面验证。涉及引用、取消和阅读行为的修改，应优先放在项目封装中；若必须修改上游文件，记录修改原因和对应文件。

试岗说明可以准确表述为：业务流程自行设计实现；通用解析与滚动算法采用明确署名的开源源码，并完成项目适配和回归验证。将源码放在项目内，展示的是可阅读、可调试、可维护的实现，不会改变其作者归属。
