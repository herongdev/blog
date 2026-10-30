# 教程写作台

日常写作使用 [线上后台](https://dev.herong.info/admin/)，仅已绑定的管理员微信可进入。文章、草稿和目录保存在服务器；本地模式用于开发与隔离验收，使用自己的独立数据，不会自动同步到线上。部署与恢复见 [运维说明](../../../infra/dev-guides/author/README.md)。

在 `blog/code` 执行 `pnpm --filter @herong/dev-guides-author dev`，打开终端给出的 `http://127.0.0.1:4331/`。服务只监听本机回环地址，不要用公网反向代理转发该端口。

本地模式读取 `../drafts/*.md` 与 `../src/content/tutorials/*.md`。新建文章从 `../templates/tutorial.md` 生成；标题、摘要、工具直接编辑，来源、验证、视频等字段在“发布信息”中编辑。正文使用 ByteMD 的 Markdown 分栏编辑与预览，支持粘贴或拖入 PNG、JPEG、WebP 图片（单张不超过 15 MiB）。配置父目录的 `.env.media.local` 后，图片会由本机服务优化并上传到自有对象存储，公开地址校验通过才插入正文；密钥始终留在 Node 服务端。未配置时图片暂存到文章同名的本地目录，Markdown 中插入相对路径，正式发布前需另运行父项目的媒体发布流程。

目录属于后台私有组织信息，保存在数据项目根目录的 `.library.json`，不改变 Markdown 文件位置、文章地址和发布状态。支持多级目录新增、重命名、移动、搜索和删除空目录；文章可移动到目录或退回未分类，草稿加入发布内容后保持原目录。目录最多 6 层，同级名称唯一；删除前必须移出文章与子目录。修改带版本校验，其他设备已变更时拒绝覆盖并提示重新操作。

保存文章时使用文件内容版本校验，若另一个窗口已经修改同一篇文章，将提示刷新而不会覆盖。图片插入会立即写入本地文件，即使正文尚未保存；未引用的图片应在发布前检查清理。

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
