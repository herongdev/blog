# 教程公共头尾与正式搜索 feed 上线

日期：2026-11-03（Asia/Shanghai）。用户已明确授权上线。此记录为实际执行结果，覆盖前一轮“本地预览、未部署”的教程部分状态。

## 实际版本

| 用途 | 当前版本 | 回滚基线 |
| --- | --- | --- |
| 作者服务代码及下次公开发布来源 | `20261103T044826Z-chrome` | `20261102T142731Z` |
| 测试公开站 | `20261103T045310Z-56ee6356` | `20261030T080331Z-ee47dd89` |
| 正式公开站 | `20261103T045634Z-e3a92a83` | `20261030T080538Z-5dc4f387` |

入口继续为 `https://dev.herong.info/`、`https://test-dev.herong.info/`、`https://dev.herong.info/admin/`，没有更换域名、端口、证书或持久数据目录。作者服务与备份 timer 均 active。两次公开发布的来源指纹一致：`1155155519c6924b2e9abdf40f1cd3f9d825d42e6250e2901f7b390727cb2841`。

## 源码隔离与发布过程

先克隆已验证的线上作者代码 `20261102T142731Z` 到独立候选目录，再应用 56 个白名单文件的 overlay：仅公共站源码（排除 `src/content/tutorials`）、公共包、公共依赖与锁、`publish-manager.mjs` 的共享来源指纹补丁及测试。根清单使用 `scoped-source` 过滤副本，没有带入工作区无关 3D/Babylon 改动。没有执行本地作者全量 deploy，不包含本地未提交的视频发布中心 UI/server 变更。

overlay 压缩包为 201,060 B，SHA256：`a4bad28156f54f96bc2fcfe2e9b63c90aa8f7d2e077d93d65bd991138c8e84cb`。候选 `chrome-source.json` 保存基线与白名单摘要，不进入公开 web。逐字比较确认原 `author/server-production.mjs`、`server-core.mjs`、`src/App.tsx`、作者 `dist/index.html`、`publishing/service.mjs` 未改变。

候选 filtered frozen install、公共包资源检查及 11 项核心测试、教程 Astro 33 文件检查（0 errors/warnings/hints）、发布与公开门禁合计 20 项测试均通过。先确认发布器无活动任务，调用原私有备份服务；短暂停止作者服务，以服务用户调用候选既有 `createPublishManager` 从服务器持久内容生成测试版本，结束后恢复旧作者服务。主代理实际查看测试站桌面、手机截图后批准正式窗口，再短停、正式发布并原子激活候选作者代码，最后恢复服务。

文章始终读取 `/var/lib/herong-dev-guides-author/project/src/content/tutorials/`，没有用本地种子替换服务器内容。正式内容仍为原 4 条待实测 lead、0 篇 published；135 篇私有草稿保持私有。发布前后全部 150 个项目文件及微信管理员身份文件的内容摘要完全一致。累计首发账本版本仍为 1，正式首发/旧稿未定日期条目均为 0，没有制造新发布日期。

完整私有备份为 `/var/backups/herong-dev-guides-author/20261103T045258Z.tar.gz`（root 专用）；操作回执、原链接、私有摘要和发布日志位于 `/var/backups/herong-dev-guides/20261103T044826Z-chrome/`。不将备份、私有正文或身份内容放进仓库。

## 正式验收

- 正式首页、周/主题/工具目录 HTTP 200，canonical 为正式 dev 域；每页仅 1 个公共 header/footer，六个菜单全为正式地址。
- `https://dev.herong.info/search/published.json` HTTP 200、73 B、`items: []`，只允许符合正式发布和实测门禁的公开教程进入。以 `Origin: https://herong.info` 请求时，`Access-Control-Allow-Origin` 正确且没有 `Access-Control-Allow-Credentials`。精确 Nginx CORS 规则由主代理单独备份、校验并 reload，本任务没有同时修改 Nginx。
- 原 `/search-index.json` 仍为 4 条标明待实测的功能资料，不冒充正式教程。测试站全部响应及 metadata 禁止索引；正式站由于暂无正式教程，保留原目录/lead 的 noindex 规则和空 sitemap。
- 私有 `.library.json`、drafts 等公开地址 HTTP 404。作者入口和原 4 个哈希 JS/CSS 资源全部 200；未登录文章 API 401；auth session 返回微信认证、可登录、无需重新绑定、未登录。外站 Origin 请求仍被 403 拒绝。
- 本轮未伪造管理员身份、未新增/修改文章、未触发任何视频投稿。作者前端没有重新构建，现有登录与 UI bundle 保持线上原版本。

本地证据在 `code/output/shared-chrome-release-20261103/guides-*`、`chrome-*.log`。测试站实际视觉由主代理完成，正式站本子任务验收为 HTTPS/资源/状态/公开边界检查，不宣称完成登录后或手机真机验收。

## 回滚与容量

对应代码与两个公开站的 `current/previous` 均保留，可分别切回上表基线。回滚前停止网页发布任务并保留当前 release 元数据，按现有首发账本规则处理；不得恢复旧文章/身份备份覆盖本次之后的写作。代码回滚只恢复候选前的作者链接与服务，不更改配置、视频执行器或持久数据。

本子任务结束时根盘约 6.7 GiB 可用（83% 使用）；这是工具/主站后续发布前的计量，最终容量应由联合发布再次读取。没有删除任何镜像、数据卷、其他服务缓存或历史内容。
