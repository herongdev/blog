# 内容工作区实施与预览

日期：2026-11-03，Asia/Shanghai。状态：代码、隔离预览、功能与浏览器验收完成，未部署生产。

设计基线：[内容工作区设计](2026-11-03-content-workspace-design.md)。原文的“未实施”仅描述研究时点，本记录更新实际实施状态。

## 预览

- 写作台：`http://127.0.0.1:4383/`。从排期点选标题，或从内容库打开文章。
- 真实静态构建的发布预览：`http://127.0.0.1:4384/`；本地确认发布版本：`http://127.0.0.1:4385/`。
- 已通过页面将 `codex-worktrees` 构建并确认到本机版本；可打开 `http://127.0.0.1:4385/topics/codex-worktrees/`。
- 预览数据：`code/output/content-workspace-20261103/preview-project`，来自仓库本地稿件副本；不是最新生产排期或稿件的同步副本。未复制环境密钥。
- 平台投稿数据在同级独立 `publishing/`，未连接本人平台账号或执行第三方投稿。素材中的 `preview-*` 是明确命名的隔离验收文件，不是实际教程成片。
- 回环预览进程需保持运行。启动方法见作者 README；本次环境变量为独立项目根、`DEV_GUIDES_AUTHOR_PORT=4383`、`DEV_GUIDES_AUTHOR_ENABLE_SITE_PREVIEW=true` 和独立 `PUBLISHER_DATA_DIR`。

## 已实现

1. 排期标题、行内入口与更多菜单进入同一内容的文章/视频/制作素材/发布页签；保留原手动本周/其它和已拍固定顶部规则。
2. 稳定内容 ID 按 slug 关联，不因草稿加入网站内容而改变；切换页签或顶层工作区保留正文、工程说明与上传；切换另一条内容前提示尚未保存的修改。
3. Markdown 工作稿、不可变历史、已发布指针分开。支持线上版与历史预览、恢复为工作稿、版本冲突保护；历史图片也读取对应版本保存的字节。
4. 发布本文仅推进所选修订，其它文章使用已确认版本。预览计划固定正文及引用图片；正式确认提交 `previewId`，之后的修改不会混入。失败保持原版本，下架保留工作稿。
5. 本地私有原始素材、分类/搜索、目录上传、断点续传、SHA256 校验及去重、版本组、成片选择、Range 预览、工程说明。导出 ZIP 保留原目录，附软件、备注和文件校验清单，旧素材版本独立保存。
6. 选择成片进入发布中心时，服务端解析私有资产并校验导入，带入视频与标题。投稿草稿持久化 `content_ref`，工作区可筛选本内容的投稿记录，各内容的浏览器发布草稿独立。
7. 可配置独立私有 S3 兼容对象存储，不复用公开图片凭据。云端预览/下载与打包通过受保护接口；投稿按需建立 SHA 校验的有额度缓存，使用后释放。

## 数据与接口

- `.content-workspace/`：私有素材、上传分片、内容/版本关系及必要缓存。
- `.article-revisions/`：不可变文章对象、历史、已发布指针和固定预览计划。
- 两个目录已加入 Git 忽略与 Vite 访问拒绝；不进入公开教程构建。API 继承原微信会话、Origin 和 CSRF 保护。
- `/api/workspaces/:slug`：读取、带 revision 更新工程说明及成片。
- `.../uploads`、`.../uploads/:id/parts/:part`、`.../complete`：真实续传；`.../assets/:id` 为私有文件；`.../package.zip` 导出原始素材包。
- `/api/article-revisions/:kind/:slug` 及 history、published、restore：文章修订；恢复与原 PUT 共用 slug 锁。
- `/api/publish`：staging 需 selection；production 需 previewId，不再接受未经选择的整目录工作稿发布。
- `.../publishing-video`：把已选的工作区成片校验导入现有投稿器；新投稿草稿校验稳定内容身份后关联。

## 代码范围

新增作者模块：`content-workspace.mjs`、`workspace-s3.mjs`、`article-revisions.mjs`、`workspace-api.mjs`、`local-site-preview.mjs`、`workspace.env.example`。

新增界面：`src/ContentWorkspace.tsx`、`src/workspace.css`。接入修改在 `src/App.tsx`、`src/ScheduleBoard.tsx`、`src/PublishingCenter.tsx`、`publishing/service.mjs`、`publishing/store.mjs`、`server-core.mjs`、`server.mjs`、`server-production.mjs`、`publish-manager.mjs`、`vite.config.ts`、`.gitignore`。更新作者 README、UI 规范和本任务文档。

既有大量未提交的网站、发布、演示与部署改动保留；未提交 Git、未对生产做远程操作。

## 验证结果

- 作者完整回归 **134/134 通过**；TypeScript 和 Vite 生产构建通过。仍有既有编辑器大 chunk 提示，未新增依赖。
- 测试覆盖：A 发布不混入 B 的修改、预览后编辑仍发布固定版本、失败不推进指针、下架保留稿件、旧站基线保护、历史图片、修订冲突与宿主恢复锁。
- 素材测试使用真实 PNG、ffmpeg 生成的 MP4，验证原字节、重启续传、重复分片/去重、版本组、Range、配额、路径与符号链接拒绝、跨内容隔离、独立 ZIP 解压与校验。
- 宿主测试核对素材、清单、包及修订 API 未登录为 401，缺 CSRF 拒绝写入；投稿草稿保留稳定内容关联并拒绝伪造关联。
- 云适配器通过受控 SDK 测试，**未使用真实云账户验收**。
- 实际浏览器完成：图片/视频上传、选择成片、保存工程说明、带视频与标题进入发布中心、保存文章、查看历史并恢复原摘要、真实网站预览及本机确认发布、下载 ZIP、跨顶层导航保留未保存说明。
- 浏览器下载的 `browser-materials.zip` 经 `unzip -t` 验证，manifest、图片和视频均完整。素材后端还通过独立 Python ZIP 读取及哈希核对。
- 已实际查看桌面浅色、桌面深色、390px 深色和最终 320px 深色界面；320px 实测 `scrollWidth === innerWidth === 320`。这是浏览器响应式验收，不是手机真机或剪辑软件工程重开验收。
- 最终浏览器控制台 **0 errors / 0 warnings**。本机发布文章 GET 返回 200。

日志：`code/output/content-workspace-20261103-author-tests.log`、`code/output/content-workspace-20261103-author-build.log`。

代表截图位于仓库 `output/playwright/`：

- `content-workspace-assets-desktop.png`：浅色素材列表与工程说明。
- `content-workspace-assets-mobile-dark.png`：390px 深色。
- `content-workspace-assets-320-final.png`：最终 320px 深色。
- `content-workspace-publish-final-desktop.png`：真实本机发布成功及独立平台视频状态。
- `content-workspace-linked-publisher.png`：所选成片和标题进入现有发布中心。

## 配置与上线边界

当前预览实际使用本机私有存储。云模式配置详见 `author/workspace.env.example`：`WORKSPACE_STORAGE=s3` 与单独的 `WORKSPACE_S3_*`。必须使用私有桶和目录受限权限；没有创建云资源或改变现有媒体桶策略。

目前上传路径是浏览器分片到服务端，再于校验完成后上传私有对象存储；支持续传，但**不是 STS 浏览器直传**。每文件与总量默认分别 512 MiB、2 GiB，可在实现允许范围内配置；大素材仍需评估服务端临时分片空间。

现有第三方投稿器复用其原能力；真实账号登录、风控、受理/审核结果仍需本人所选内容逐平台实测。第三方更新/下架继续通过对应平台管理，不提供虚假的自动撤回。

生产部署前需要备份并核对现有正式内容的修订基线。若正式 release 缺少 `articleRevisionPlan` 且没有显式核验的基线，发布器会拒绝逐篇发布，避免误下线其它文章。不要将所有当前工作稿盲目导入为线上版本，也不能仅切旧代码回滚新持久化数据。

源工程 ZIP 可以原样归档；可恢复性仍需下载完整依赖并在实际剪辑软件中重开验证。共享素材挑选、浏览器直传、自动冷存储和跨平台数据分析未纳入当前界面，不显示尚未验证的能力。

生产原始素材与修订存储须在停写或一致快照下备份；现有备份会包含持久 project 目录，但不能将日常 tar 等同于新增复合状态的恢复演练。云对象需独立副本与保留策略。本次未修改生产保留或清理规则。

## 2026-11-04 提交前复核

本次只整理与校正仓库代码，不部署，也不读取真实私有配置或改动平台账号。原验收和部署记录保留其发生时点，Git 未跟踪状态不代表功能未曾上线。

- 修复文章预览投影中断后留下半成品目录的问题：全部已确认文章与引用图片先写入临时目录，完整后原子替换；失败不会让后续发布复用缺页投影。新增回归模拟第二篇对象缺失、恢复后重试，验证两篇均完整保留。
- 作者发布包过滤器明确排除 `.content-workspace/` 与 `.article-revisions/`；Git 忽略及 Vite 拒绝规则同步核对。API 仍先经过宿主 Host、会话、Origin 和 CSRF 边界。
- systemd 模板增加可选私有 `workspace.env`，对应已有配置示例；不创建云资源，不更改真实环境。S3 和 sharp 依赖由教程父包提供，现安装器同时安装父包及作者包。
- 运维说明更新为逐篇固定预览确认、本周/其它队列和新增私有目录。日备份继续保留现行为，明确 SQLite 快照一致性不等于全部文件的业务原子一致性；完整恢复基线仍需停写或文件系统一致快照及独立云对象副本。
- 修正后作者完整回归 **135/135 通过**，其中修订测试 13/13 通过；发布包私有路径过滤的 7 个隔离用例通过。TypeScript 与 Vite 生产构建通过，仍有既有编辑器大 chunk 提示。本次没有重做页面或浏览器视觉验收，也没有执行真实投稿。

本次日志位于 `code/output/author-commit-review-20261104-*.log`，不纳入产品公开资源。
