> 本项目现位于 herong.info monorepo 的 `code/apps/chat/`。从 `code/` 运行 `pnpm dev:chat`、`pnpm check:chat`、`pnpm build:chat`；发布到现有 `chat.herong.info` 使用 `pnpm deploy:chat`。应用仍可在本目录用 npm 命令独立运行和构建。

# 知序 · React AI 对话

前端试岗实现：流式消息、Markdown、正文引用、活动过程、主动停止、失败重试。支持 **本地附件 / 阿里云百炼 / DeepSeek** 三种数据来源。

## 验收入口

本项目按原任务书交付消息展示、流式输出、Markdown、引用与多来源切换、停止、异常状态、组件拆分和活动过程。**先用公司附件完成核心验收，无需配置模型密钥。**

- [试岗交付说明](docs/试岗交付说明.md)：三分钟演示顺序、关键取舍和实际验证结果。
- [任务书验收对照](docs/任务书验收对照.md)：8 个模块逐项对应实现与测试。
- [架构与维护](docs/架构与维护.md)：职责、依赖方向和修改入口。
- [容器部署与发布恢复](docs/容器部署.md)：Docker、HTTPS 访问入口、健康检查、运行配置与镜像回滚。

## 代码评审阅读路径

建议先按任务书运行附件主流程，再沿着 [关键设计与回归证据](docs/试岗交付说明.md#关键设计与回归证据) 阅读实现。该索引集中说明界面演示中不易察觉的处理：停止前提交缓冲、旧请求隔离、增量引用保留交互状态、历史读取竞态与数据异常恢复，以及可执行的模块和样式约束。

每项设计都有源码或测试入口，可用于人工或 AI 辅助评审时核实。验收记录注明执行环境和未覆盖范围；文档描述以交付版本的代码与实际运行结果为准。

本地附件是验收基准：按原始顺序回放公司的 JSON 事件，不调用真实模型。真实 API 是额外扩展，只有发送消息时才调用所选厂商；已有消息时切换来源或模型会开始新对话，避免样例和不同厂商的历史混用。

实现采用“业务代码 + 内置通用源码”的结构：消息状态、附件适配、引用规则和 API 代理由本项目实现；SSE 分帧、流式 Markdown 修复和滚动采用固定版本的开源源码，放在 `third_party/`，由项目封装接入。React、Markdown 解析、浮层等基础依赖继续通过 npm 管理。[源码来源与本地改动](third_party/README.md)

## 启动

使用 Node.js 22.12+，统一通过 npm 和仓库中的 `package-lock.json` 安装依赖。

```bash
npm ci
npm run dev
```

打开 http://127.0.0.1:5173 。本地模式无需密钥，前端 5173，NestJS 服务 3001，均只监听本机。

```bash
npm run typecheck
npm run lint
npm test
npm run build
# 先停止 dev 中的 API 服务，避免占用同一端口
npm start
```

`npm run build` 将前端构建到 `dist/client/`，将后端编译到 `dist/server/`。`npm start` 使用 Node 运行后端 JavaScript，只把前端目录作为静态资源提供，默认打开 http://127.0.0.1:3001 。生产运行需要安装 `dependencies`，不需要 `tsx`；生产入口只读取注入的环境变量。本机若需要显式加载开发配置，可运行 `node --env-file=.env.local dist/server/index.js --production`。

容器启动：复制 `deploy/.env.example` 为 `.env.deploy`，运行 `docker compose --env-file .env.deploy -f compose.yaml -f compose.local.yaml up -d --build --wait`。公网部署使用独立的 HTTPS / 共享口令入口，步骤见 [容器部署](docs/容器部署.md)。当前交付是单实例应用，没有账户、服务端历史数据库或用户隔离。

已有 Nginx 的服务器可按 [Nginx 部署说明](docs/Nginx部署说明.md) 部署：应用容器仅映射本机端口，由现有 Nginx 提供 HTTPS 和流式反向代理。发给验收方的精简介绍见 [交付附言](docs/交付附言.md)。

## 自动化验证

```bash
npm run check                       # lint、Vitest、前后端和测试类型检查
npx playwright install chromium    # 首次安装浏览器
npm run test:e2e                    # 构建前后端后启动隔离服务，运行浏览器回归
npm run test:e2e:report             # 查看报告
```

浏览器测试使用本地附件和模拟 API；测试服务不加载真实密钥。默认端口 4173，可通过 `E2E_PORT` 修改。已有 Google Chrome 时，也可用 `PLAYWRIGHT_CHANNEL=chrome npm run test:e2e`。CI 固定使用 Playwright 安装的 Chromium。报告和失败 trace 位于 `output/playwright/`。

GitHub Actions 工作流位于 `.github/workflows/ci.yml`，push / pull request 时执行格式、lint、Vitest、类型检查、构建、浏览器回归和 Docker 镜像验收，不自动发布到公网。当前已验证本地运行及 Linux arm64 容器，尚未在 GitHub 执行。

公开 issue 的复现条件、优先级、适用性和测试入口见 [回归覆盖矩阵](docs/回归覆盖矩阵.md)。覆盖会话取消与迟到数据、重试、中文 Markdown、引用资料更新、复制失败、配置异常与窄屏布局；未验证的真机场景单独记录。代表性缺陷的复现与修复见 [缺陷来源与回归测试](docs/缺陷来源与回归测试.md)。

原试岗题目的 8 个模块、实现要求和交付物逐项对应见 [任务书验收对照](docs/任务书验收对照.md)。其中区分功能自动化证据与视觉、架构人工审查，专项测试使用 `REQ-` 编号。

## 源码交付包

提交需要交付的修改后，在仓库根目录从已提交版本生成压缩包：

```bash
git archive --format=zip --prefix=zhixu/ --output=../zhixu-delivery.zip HEAD
```

归档仅包含该提交的文件，不包含 Git 历史、未提交修改及本地未跟踪文件。密钥、依赖目录和本地资料不应纳入版本控制；接收方解压后按“启动”说明运行 `npm ci` 和 `npm run dev`。

## 输入框与附件

输入框左侧「＋」区分图片与 TXT、Markdown、JSON 文本入口；不支持的入口置灰，并通过悬停、聚焦或点击说明原因，也可拖入图片或粘贴截图；点击缩略图预览。每次最多 3 个附件，图片最大 4 MB，文本最大 16 KB。图片添加和发送需要视觉模型，本地样例不接收新附件；已有草稿和已发送图片支持本地保存。详见 [图片附件与预览](docs/图片附件与预览.md) 和 [输入框与文本附件](docs/输入框与文本附件.md)。

## 配置真实模型

复制 `.env.example` 为 `.env.local`，填入你自己的 Key，再重启 `npm run dev`。如该文件已存在，直接编辑即可。

```dotenv
DASHSCOPE_API_KEY=你的密钥
DASHSCOPE_BASE_URL=https://dashscope.aliyuncs.com/compatible-mode/v1
DASHSCOPE_MODELS=qwen-plus,qwen-flash,qwen3-vl-plus
DEEPSEEK_API_KEY=你的密钥
DEEPSEEK_BASE_URL=https://api.deepseek.com
DEEPSEEK_MODELS=deepseek-v4-flash,deepseek-v4-pro
```

- `.env.local` 已被 Git 忽略，不要提交密钥；环境变量不能使用 `VITE_` 前缀，否则会暴露给浏览器。
- 阿里默认使用北京地域的百炼兼容接口。若账号使用新工作空间专属域名、其他地域或其他阿里服务，请按控制台替换 base URL；Key 必须匹配地域和服务。
- 模型列表用英文逗号分隔。默认名称根据 2026-09-03 官方文档设置，实际权限以账号为准。
- 页面“模型设置”只显示是否配置和模型列表，不返回 Key 或接口凭证。“已配置”不等同于完成联网验证。
- 输入框右下角统一选择本地样例或 API 模型，按服务商分组。已核实支持的模型在输入框“＋”工具菜单中提供深度思考开关，默认关闭，手动开启后显示可关闭的状态标签；未知模型省略思考参数。能力范围见 [模型选择与能力](docs/模型选择与能力.md)。
- 普通聊天接口没有开启联网搜索、没有注册本地工具，因此不保证产生题目中的引用资料。工具和来源展示以附件验收；真实 API 不伪造来源。
- API 适配与取消流程已用模拟上游测试。2026-09-03 已通过 DeepSeek V4 Flash 与阿里百炼 Qwen Plus 的真实流式调用，均包含思考与正文。

官方接口资料：[DeepSeek](https://api-docs.deepseek.com/)、[DeepSeek 思考模式](https://api-docs.deepseek.com/guides/thinking_mode/)、[百炼文本生成](https://help.aliyun.com/zh/model-studio/text-generation)。

## 快速演示

1. 选“本地样例”，点击首页“甲硝唑是什么？”，观察思考、搜索、正文依次出现。
2. 展开“活动过程”，查看两段思考和一次搜索；点击正文来源标签，左右切换资料。
3. 再发起一次生成，提前在输入框填写下一条草稿，然后点停止：草稿应保留、不自动发送，旧回答不再追加；之后由用户主动发送。
4. 本地模型菜单中的回放速度可选 1×、1.5×、2×、3×、4×；计时显示当前回放的实际耗时，不硬编码截图中的 49s。
5. 打开输入框右下角的模型菜单，在本地演示场景中选择“Markdown 排版”“异常恢复”或“空结果”，发送消息验证对应场景。
6. 错误演示每次都会中断。要演示“失败后恢复”，失败后将场景改回正常样例，再点“重新生成”。
7. 配置真实密钥后，在输入框的模型菜单选择模型，发送自定义问题，检查流式输出、深度思考、停止与多轮对话。

## 已有扩展

除任务书主线外，已完成 NestJS 真实模型代理、视觉与文本附件、聊天历史与草稿持久化、项目分组、搜索／归档／导出，以及中英文、主题和布局密度。项目各自展开／收起，点击名称右侧“＋”创建组内聊天，仅当前聊天显示选中效果；侧栏标识仍在生成的聊天，切换后继续接收。完整交付范围见 [试岗交付说明](docs/试岗交付说明.md)，可直接转发的简介见 [交付附言](docs/交付附言.md)。

聊天记录和草稿自动保存在当前浏览器，刷新或重新打开相同地址后恢复；正常保存保持静默，保存异常时显示提示；在侧栏会话的“更多操作 → 导出对话”中下载 JSON。范围和恢复规则见 [聊天记录与本地保存](docs/聊天记录与本地保存.md)。远程请求出错时可展开“问题详情”，用编号关联服务端的结果与耗时记录，详见 [请求诊断与草稿](docs/请求诊断与草稿.md)。

侧栏左下角“用户设置 → 语言与外观”提供 **简体中文 / English** 和 **浅色 / 深色 / 跟随系统**。切换立即生效，保留当前对话与草稿；偏好自动保存到当前浏览器。首次访问按浏览器语言选择支持的语言，默认跟随系统主题。界面语言不会改写模型回答或附件原文。实现与验证说明见 [多语言与主题](docs/多语言与主题.md)。

同一窗口还提供 **紧凑 / 适中 / 宽松** 三档布局密度，默认适中。密度调整列表、消息、输入区和面板间距，保留字号、阅读宽度及控件的最小点击区域。详见 [布局密度](docs/布局密度.md)。

这些入口用于补充展示；原题验收仍以附件数据及消息交互为基准。

## 目录与职责

```text
src/
  main.tsx
  app/                          页面组装与跨业务协调
    App.tsx + App.module.css
    ChatHeader.tsx + ChatHeader.module.css
    useChatWorkspace.ts
  components/                   跨业务公共 UI（Select、Icon），不依赖业务
  features/
    chat/
      components/               消息、活动、引用、输入、侧栏及 CSS Modules
      hooks/                    生成任务生命周期、阅读跟随
      services/                 本地回放、API 事件流与来源选择
      state/                    reducer 与纯状态查询
      lib/                      引用转换、Markdown 修复、上下文提取及单测
      types.ts                  客户端消息、会话、演示场景
    model-settings/
      components/               设置弹窗、模型选择及 CSS Modules
      hooks/                    配置加载、刷新与取消
      services/                 获取公开模型元数据
  hooks/                        通用复制、文本框测量
  i18n/                         类型安全文案、插值、界面翻译与错误兼容适配
  preferences/                  语言与主题策略、存储、系统监听、偏好窗口
  styles/                       设计令牌、基础规则、共享视觉及浮层几何适配
shared/
  contracts/                    请求、事件、公开元数据与运行时校验
  transport/                    SSE 解码与分帧封装
  async/                        可取消等待
server/
  index.ts                      读取环境配置、启动 Nest 与关闭钩子
  app.ts + app.module.ts         应用组装、模块注册、静态资源
  chat/                         Controller、Service、请求校验 Pipe、聊天策略
  model-providers/              模块公开服务、私有配置与厂商适配
  http/                         来源校验、异常 Filter、SSE 连接与诊断
  health/                       不调用模型的应用健康检查
  common/                       运行配置校验与公共错误类型
tests/
  integration/                  真实附件、API、传输边界
  architecture/                 导入规则与运行环境约束的反例测试
  e2e/                          浏览器行为、隔离测试服务与公共测试工具
scripts/eslint/architecture.mjs  模块边界检查及公开文件清单
scripts/vite/                   首屏偏好引导脚本的构建与注入
third_party/                    固定版本开源源码与许可证
```

具体依赖方向、公开入口和修改入口见 [架构与维护](docs/架构与维护.md)。

## 关键取舍

- **React + TypeScript + Vite**：单页交互的范围清楚，用类型区分消息与事件，减少字符串字段错配。
- **NestJS + Express**：聊天和模型接入按模块组织，Controller 处理 HTTP，Service 处理业务，Pipe 使用共享 Zod schema 校验请求。显式依赖注入支持空配置与模拟模型测试；SSE 保留 POST、背压、超时和连接关闭取消。模块边界由 ESLint 检查。
- **useReducer + 自定义 Hook**：本项目状态集中于对话树，React 自带能力足够。副作用在 Hook / 服务层，reducer 内只有纯状态计算。
- **统一外观与选择器**：全局设计令牌管理字号、颜色、留白、图标、层级及布局；公共 Select 处理菜单定位、键盘操作、长选项与窄屏边界。样式守卫防止新增硬编码。详见 [样式令牌与选择器](docs/样式令牌与选择器.md)。
- **组件与样式分离**：App 组装页面，展示组件通过 props 接收数据与回调；CSS Modules 隔离样式，响应式规则跟随组件。共享行为放专用 Hook，ESLint 检查分层依赖。详见 [架构与维护](docs/架构与维护.md)。
- **统一事件协议**：公司附件和不同厂商格式在边界转换；UI 不判断厂商原始字段，后续替换真实接口不必重写组件。
- **react-markdown + remark-gfm**：按语法树处理 Markdown。自定义 remark 插件仅转换普通文本中的引用，跳过已有链接和代码，避免直接拼 HTML。
- **内置 remend 源码**：仅在生成期间修复展示用的未完整 Markdown；代码与引用尾部单独保护，历史和复制仍使用原文。
- **内置 SSE 解析源码 + Zod**：标准 SSE 分帧与业务结构校验分开；缺少完成事件、错误响应类型和非法数据会明确报错。
- **Floating UI**：负责定位、防止浮层越界、悬停路径、点击和键盘访问。引用渲染器在文本增量更新时保持组件身份，避免分页状态重置。
- **32ms 合并更新**：保留事件顺序，将短时间内的事件批量 dispatch，降低逐字符重排频率。Markdown 渲染模块按需加载。
- **请求取消与隔离**：AbortController 取消本地等待或 fetch；服务端收到连接关闭后取消上游；每次请求有独立运行对象和消息 ID；终态拒收迟到事件。
- **状态反馈**：等待、生成、完成、停止、失败、空结果分别处理；以正文 `trim()` 判断空结果；错误保留已有正文。
- **内置 use-stick-to-bottom 源码**：区分内容尺寸变化、自身滚动和用户上滚；项目封装补充视口变化和活动收起的跟随处理，用户离开底部后显示“回到最新”。
- **边界**：关闭原始 HTML；来源只允许 HTTP(S) 链接；不自动加载回答中的外部图片；不记录模型原始错误体或密钥。

## 当前范围与待优化

自动化验证覆盖业务与集成测试、架构规则、类型检查、lint 和前后端生产构建；浏览器用例覆盖流式引用、停止后重发、滚动、模型配置、异常恢复、手机布局以及编译后的 Nest API。最近完整验证见 [实际验收记录](docs/试岗交付说明.md#四实际验收记录)；重新执行时以运行输出为准。源码来源见 [内置的开源源码](third_party/README.md)，当前组件职责见 [架构与维护](docs/架构与维护.md)。

- 对话记录保存在当前浏览器的 IndexedDB；不同浏览器、域名或端口不共用，没有登录或多设备同步。清理网站数据可能删除记录，重要内容请导出备份。
- 每个聊天独立生成，同一聊天禁止重复提交；新建或切换聊天不会停止其他回答。停止、归档或删除只取消对应聊天。刷新或关闭页面会中断连接，已收到内容保留，重新打开不会自动续跑；服务端并发上限仍然生效。
- 附件回放时间是模拟的，原始 49,391ms 作为元数据保留。
- API 请求上限为两分钟，超时会取消并提示；发送时按消息数和文本字节预算选择近期完整轮次，历史仍完整保留，暂未做自动摘要。
- 引用正文高亮按段落 / 列表项关联；截图没有给出精确字符区间，因此没有猜测更细的引用范围。
- 长会话已有虚拟列表、稳定 Markdown 块复用和大表格分页；当前会话仍整体读入内存，实际规模测量与边界见 [规模与性能验证](docs/规模与性能验证.md)。
