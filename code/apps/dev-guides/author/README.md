# 教程写作台

内容库的“我的内容 → 添加”提供“添加文章 / 添加视频 / 添加资源”。只填标题即可创建，地址默认自动生成；视频和资源直接进入对应页签，不要求先写正文。已有内容行和排期的“更多”菜单可直接进入写文章、添加视频、添加资源及发布记录。上传和保存均不触发公开发布。

内容工作区将一条选题的「文章 / 视频 / 制作素材 / 发布」关联起来，从排期标题、更多操作或内容库进入。切换页签保留正在编辑的正文；工程说明、原始素材及成片版本独立保存。历史版本可恢复为工作稿，发布需要另行确认。本次共享目录、选题归档和「选题与拍摄」为待上线改动，需完成本文后述整理迁移与部署验收，不能由本地代码或测试结果推定已经上线。

私有素材默认保存在持久数据项目的 `.content-workspace/`，原字节不转码；支持分片续传、成片选择及带 SHA256 清单的 ZIP 导出。私有 S3 兼容存储的独立配置见 `workspace.env.example`；上传目前经过作者服务分片中转，校验后写入对象存储，尚非浏览器 STS 直传。云端预览与下载经过作者鉴权，不复用公开图片凭据。

逐篇发布使用 `.article-revisions/` 中的不可变修订与预览计划，正式发布提交已检查的 `previewId`，其它文章的未确认修改不进入构建。旧正式站缺少修订基线时会阻止发布，部署前须停写、备份并从核对过的公开版本显式导入基线，不能盲目将当前工作目录视作线上版。两个私有目录需纳入一致备份，云端对象需另有独立副本。

2026-11-04 已部署内容工作区和三个添加入口，升级、备份与尚未完成的 Edge 验收见 [内容入口上线记录](../../../docs/tasks/2026-11-04-content-entry-release.md)。原隔离预览见 [内容工作区实施记录](../../../docs/tasks/2026-11-03-content-workspace-implementation.md)。本地启用网站构建需独立 `DEV_GUIDES_AUTHOR_PROJECT_ROOT` 与 `DEV_GUIDES_AUTHOR_ENABLE_SITE_PREVIEW=true`，作者端口后两个回环端口分别提供实际构建的测试预览和本地发布版本，不连接正式发布目录。

视频多平台分发见 [发布中心接入与运行说明](../../../docs/dev-guides/publishing-integration.md)。它与文章保存、拍摄排期及网站构建发布分别记录状态；真实作品只在发布中心明确确认后提交。

日常写作使用 [线上后台](https://dev.herong.info/admin/)，仅已绑定的管理员微信可进入。文章、草稿和目录保存在服务器；本地模式用于开发与隔离验收，使用自己的独立数据，不会自动同步到线上。部署与恢复见 [运维说明](../../../infra/dev-guides/author/README.md)。

在 `blog/code` 执行 `pnpm --filter @herong/dev-guides-author dev`，打开终端给出的 `http://127.0.0.1:4331/`。服务只监听本机回环地址，不要用公网反向代理转发该端口。

本地模式读取 `../drafts/*.md` 与 `../src/content/tutorials/*.md`。新建文章从 `../templates/tutorial.md` 生成；标题、摘要、工具直接编辑，来源、验证、视频等字段在“发布信息”中编辑。正文使用 ByteMD 的 Markdown 分栏编辑与预览，支持粘贴或拖入 PNG、JPEG、WebP 图片（单张不超过 15 MiB）。配置父目录的 `.env.media.local` 后，图片会由本机服务优化并上传到自有对象存储，公开地址校验通过才插入正文；密钥始终留在 Node 服务端。未配置时图片暂存到文章同名的本地目录，Markdown 中插入相对路径，正式发布前需另运行父项目的媒体发布流程。

目录属于后台私有组织信息，保存在数据项目根目录的 `.library.json`，不改变 Markdown 文件位置、文章地址和发布状态。排期与内容库共用一棵目录树；支持多级目录新增、重命名、拖动换父目录、手动同级排序、搜索和删除空目录。内容可移动到目录或退回未分类，草稿加入发布内容后保持原目录。目录最多 6 层，同级名称唯一；删除前必须移出内容与子目录。修改带版本校验，其他设备已变更时拒绝覆盖并提示重新操作。

归档是可恢复的私有工作池状态，记录在 `.library.json` 的 `lifecycleBySlug`，不会删除正文、素材、修订历史或改变已确认的公开版本。活动列表默认隐藏归档项，“已归档”可查看和恢复。归档代次持续保留，排期读取时移除对应活动条目；连续归档再恢复也不会带回旧排期，恢复后需手动重新加入。历史排期标题与状态保持原记录。`GET /api/articles?scope=archived|all` 提供显式归档/全部视图，默认仅活动项。

## 拍摄排期与待拍队列

“拍摄排期”采用上下排列的“本周 / 候选选题”两组。共享目录用于筛选候选选题，本周始终显示全部已安排内容。拖到目录只改变分类；拖到本周或候选列表才改变拍摄安排，两者分别保存。本周可以不选或选任意多条，没有每周配额和下周预排。首次建立时按已有研究计划的主选、备选、近期候选顺序引入未归档稿件，本周留空；复用旧稿而不复制文章。旧周目录是历史分类，不能当成当前拍摄时间表；后述整理工具可在审核后移除已经清空且来源明确的旧目录。

- 两组待拍条目可拖动排序及互相转移，空组也可接收条目；触控、键盘与按钮均可操作。
- 已拍固定在本周顶部且不能拖动排序，待拍只能排在其后；拖动、按钮及旧 API 均受服务端边界保护。标记已拍移到已拍区末尾，撤销后回待拍区开头。已拍条目先撤销再退回其它；标记已拍不会发布网站文章。
- 其它支持分页、搜索、按钮上下移动、置顶和移动到指定全局位置；筛选与分页后的动作始终使用完整队列位置。新建临时素材只需标题，地址自动生成；也可添加已有文章。
- “移出队列”不删除稿件。新稿创建成功但入队失败会保留稿件，只需重试入队。
- 周一按 Asia/Shanghai 换周。旧本周未拍条目退回其它最前，历史保留原已拍/未拍状态，新本周留空，由作者自行选择。跳过多周只归档真实排过的周，不生成虚构记录。

排期保存在私有数据根目录 `.schedule.json`，随项目日备份保存，既不进入 Git，也不随代码升级替换。接口使用现有微信鉴权、Origin/CSRF 和版本冲突检查；文章由草稿加入发布内容时通过稳定 slug 保持排期。更改稿件标题不重写历史快照。

手动排期使用 schema v2，首次读取原 v1 文件时保留条目、已拍状态与历史，移除自动配额；本周稳定分为已拍/待拍，各组原相对顺序不变，其它与历史不重排。部署前须备份排期；旧代码不能直接读取 v2，回滚时须协调升级后的操作，不能盲目覆盖新数据。

保存文章时使用文件内容版本校验，若另一个窗口已经修改同一篇文章，将提示刷新而不会覆盖。图片插入会立即写入本地文件，即使正文尚未保存；未引用的图片应在发布前检查清理。

## 选题与拍摄资料

从排期标题进入「选题与拍摄」，目标、提纲、准备清单和补充备注保存在独立私有文件 `.filming.json`；它们不是文章正文，也不触发网站或视频发布。`GET/PATCH /api/filming/:slug` 使用独立 `revision` 防止覆盖另一窗口的准备内容，更新只接受 `preparation` 四个文本字段。

下方调研来源只读保留原题、演示依据、适用条件、限制、当时的核对信息与链接；完整原始 JSON 和 SHA256 随来源卡保存。这里的来源来自历史调研 JSON，不应标为用户原始笔记或已实测结论。DG004、DG006、DG125 仍关联原有文章，同时挂接各自完整调研来源，不覆盖文章标题或正文。整理前的实际目录和原调研目录保存在审阅记录中。后续整理只追加新来源版本，不覆盖已经编辑的拍摄准备。

## 离线整理与可恢复归档

具体保留/归档依据见 [2026-11-04 选题审查报告](../../../docs/dev-guides/editorial/2026-11-04/curation.md) 和同目录 `curation.json`。整理只更新 `.library.json`、`.filming.json`、`.schedule.json`，不改文章、公开修订指针或文件素材。非本次导入的用户新建内容不参与整理；来源 ID 可识别作者已改名的稿件，缺失项只报告，不重建。

先在完整仓库生成自包含维护清单；正式安装包不需要包含调研文档目录。输出文件必须不存在：

```bash
node code/apps/dev-guides/author/editorial-curation.mjs --prepare --curation code/docs/dev-guides/editorial/2026-11-04/curation.json --output /tmp/editorial-curation-payload.json
node code/apps/dev-guides/author/editorial-curation.mjs --project /path/to/copied-project --payload /tmp/editorial-curation-payload.json --cleanup-legacy-folders
```

第二条默认只读预检，返回 `revision`、每项结论、缺失项、排期移除数量和 `candidateFolderRemovals`。`--cleanup-legacy-folders` 只允许清理已完成导入回执记载的精确旧路径、导入前不存在的目录 ID，且迁移后必须完全无内容和子目录。改名、换父目录或用户内容占用的目录保留。原回执没有创建后 UUID 清单，因此“删后重新创建同名路径”无法自动判别；必须审核候选 ID 和路径后才应用。全部原目录数据会保存在私有回执中。

先备份并确认无发布任务，停止写作服务，以服务账号对目标数据重新预检，审核结果，再用同一清单和最新 `revision` 应用：

```bash
node /path/to/author/editorial-curation.mjs --project /path/to/data-project --payload /path/to/editorial-curation-payload.json --cleanup-legacy-folders
node /path/to/author/editorial-curation.mjs --project /path/to/data-project --payload /path/to/editorial-curation-payload.json --cleanup-legacy-folders --apply --offline --revision 'DRY_RUN_REVISION'
```

预检后任何相关文章、目录、准备或排期变化都会使应用拒绝。相同清单成功执行后再次调用只返回完成回执，不重新归档作者后来恢复的内容。迁移归档项退回未分类，原路径可追溯；恢复不会重新创建旧周目录。

`.editorial-curation/` 保存完整迁移前元数据、计划、完成回执及可能的 `pending.json`。未完成事务阻止再次应用；仍保持停写状态时执行：

```bash
node /path/to/author/editorial-curation.mjs --project /path/to/data-project --recover --offline
```

恢复仅在文件仍等于迁移前或本次写入结果时回退；发现后续人工修改便停止，不覆盖。事务与完成回执均先写临时文件并同步，再原子改名；数据文件与所在目录也在完成回执出现前同步。若已有完整且匹配的完成回执，只清理未完成标记；旧版本遗留的空或截断完成回执，必须先核对完整事务记录及全部数据文件，才会隔离损坏回执并安全回退。普通异常会释放 `.lock`；若进程被强杀，维护者须核对锁内 PID、确认没有存活的整理进程后再移走残留锁，不能盲目删锁或并发运行恢复。恢复与应用后核对结果再恢复服务。`.filming.json` 和 `.editorial-curation/` 都须纳入私有备份并排除代码升级覆盖；迁移完成不等于已通过浏览器验收。

## 已有选题导入写作台

`editorial-plan.mjs` 从仓库 `code/docs/dev-guides/editorial/2026-10-27/` 的两个 JSON 生成私有导入清单：78 个主计划、52 个备选、8 个近期精选。DG004、DG006、DG125 复用既有文章，其余 135 个选题生成 `draft`；不会把预期结果填为已实测，不生成视频地址。主计划分 26 周，备选按工具分组，近期候选分两批。

从完整仓库生成清单（输出文件必须不存在），再在目标数据的副本上预演：

```bash
node code/apps/dev-guides/author/editorial-plan.mjs /tmp/editorial-payload.json
node code/apps/dev-guides/author/editorial-import.mjs --project /path/to/copied-project --payload /tmp/editorial-payload.json
```

默认仅预检。线上写入前运行私有备份服务、确认无发布任务并停止写作服务，然后以写作服务账号执行 `editorial-import.mjs`，增加 `--apply --offline`。必须在 `finally` 中恢复服务。不要在仍可同时保存文章的服务上运行离线导入。清单不属于公开网站产物，也不要导入到 `src/content/tutorials` 来代替草稿。

导入以来源 ID 和文章地址识别已有稿件，不覆盖正文、标题或作者后来调整的归档位置，不重复生成作者已删除的稿件。复用的既有文章只归档，内容和发布状态不变。事务备份与新建清单位于数据项目的 `.editorial-imports/`（私有权限），普通失败只回滚本次新建内容及目录元数据；进程中断后应先核对事务记录和私有备份再处理锁文件，不能直接重跑或清理数据。导入不触发网站发布。

运行 `pnpm --filter @herong/dev-guides-author test` 测试接口，`pnpm --filter @herong/dev-guides-author build` 验证前端构建。`dist/` 独立部署到受认证保护的写作服务，不能混入公开教程站的静态产物；线上代码升级不覆盖文章、目录与身份数据。
