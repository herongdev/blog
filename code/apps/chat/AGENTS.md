# 项目维护约定

项目遵循逻辑与样式分离、组件化和职责清晰的维护原则。

交付优先满足任务书要求和运行稳定性。新增工作优先处理验收缺口；扩展能力应有明确目的和对应验证。

- `src/app/App.tsx` 是页面组装入口；跨业务协调放同目录 `useChatWorkspace`。聊天归属 `src/features/chat`，模型配置归属 `src/features/model-settings`；模块内按 components/hooks/services/state/lib 的实际职责组织。
- app 只依赖 feature 的公开文件，清单在 `scripts/eslint/architecture.mjs`；feature 不反向导入 app，不直接导入兄弟模块。通用客户端 Hook 留在 `src/hooks`，不得依赖具体业务。
- 不创建全量导出的 barrel index。模块内部优先相对路径；跨模块使用 `@/`，客户端共享协议使用 `@shared/`，指定的源码封装使用 `@vendor/`。新增别名要同步 TypeScript、Vite 和边界检查。
- 客户端状态类型留在 `features/chat/types.ts`，两端契约放 `shared/contracts`。前后端分别类型检查，不把 Node 全局类型引入客户端，也不把 DOM 类型引入服务端。测试单独使用 tsconfig.tests。
- `components` 通过明确的 props 接收业务数据和回调。展开状态、输入草稿等局部交互留在组件；可复用的副作用放专用 Hook。不要向组件引入服务请求、整套聊天控制器或服务端代码。
- `state` 只做纯状态更新，`lib` 放可独立验证的数据转换。`shared` 是两端共用的协议与底层工具，不能反向依赖客户端或服务端业务。
- 每个组件的样式与组件同目录，使用 `*.module.css`。共享视觉样式使用 `styles/primitives.module.css`；公共设计变量在 `styles/tokens.css`，全局基础规则在 `styles/global.css`。
- 响应式规则跟随所属组件。颜色、间距、尺寸等外观放 CSS；JavaScript 只负责必须测量的运行时值，例如浮层位置、文本框内容高度。
- 外部 Markdown 插件的类名只能在 Markdown 容器内通过 `:global` 适配。跨组件状态样式使用明确的属性约定，不依赖另一个组件生成的 CSS 类名。
- 不机械地把所有组件状态移到全局，也不为简单展示新增无用途的框架层。优先按职责拆分，重复出现的行为再抽取复用。
- 新的计时器、观察器和请求应有对应清理；保持旧请求隔离、停止先提交缓冲、终态拒收迟到事件、流式引用组件身份稳定等已有约束。
- `third_party` 保留上游来源、许可证和修改记录；业务适配优先放项目封装。不要批量格式化或重写上游源码。
- 结构调整需通过 `npm run check` 和构建；影响交互或布局时运行对应的 `tests/e2e` 用例，完整浏览器回归用 `npm run test:e2e`。测试使用空服务配置和模拟响应，不调用真实模型。仅对实际风险增加测试，避免为文件搬移编写镜像测试。
- 不读取或输出 `.env.local` 的密钥内容；密钥仅由服务端使用。
- 课程、学习记录和历史评审集中保存在 `local-docs/`，不提交到代码仓库；遵守 `.gitignore` 中的学习资料排除项，运行说明不链接被排除的文件。

职责、依赖方向和修改入口见 `docs/架构与维护.md`。
