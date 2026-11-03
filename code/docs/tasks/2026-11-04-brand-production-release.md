# HR 小象品牌与统一配色：正式发布

日期：2026-11-04（北京时间；版本 ID 中的时间沿用 UTC）。

状态：主站、历史文章、教程、写作台、文件工具与政企 favicon 已正式发布，线上 HTTP、资源与文件工具 FFmpeg 实测通过。Mac 锁屏导致正式域 Edge 最终视觉复核未完成；原 CI 的重复上传和 GitHub Pages 备份仍在后台继续，二者不影响已激活的正式站。

## 范围与源码

用户已授权将本轮 HR 小象标志和统一 UI 配色发布到线上。主站、历史文章、公开教程、文件工具和教程写作台沿用独立应用与部署；政企独立领域页只更新 favicon。知序、声稿及其他独立产品不随本轮改品牌，汽车采样站 Java/H2 与业务逻辑不变。

- 源码提交：`57903ab47296720834cca30ef3923ba9db725206`（简称 `57903ab`）。
- 发布源码白名单共 85 个文件；与实际文件集合、SHA256 和大小逐项一致，无额外文件或符号链接。
- 写作台 App、样式、Vite 配置、根 package 与 UI 文档使用经过筛选的品牌变更，未夹带本地正在开发的其他功能或私有内容。
- 在隔离的白名单源码中，`check:brand` 的 42 个派生资产和 `check:tokens` 的 5 个适配入口、18 组对比度检查通过；教程 CSS 使用包入口导入同一 `brand.css`。
- 根目录 `logo.svg` 为品牌图形母版；`packages/site/chrome/src/brand.css` 为 UI 色源。历史文章地址、RSS、公开内容筛选与独立产品入口保留。

证据：[源码提交](../../output/brand-release-20261104/source-commit.txt)、[源码清单](../../output/brand-release-20261104/source-manifest.json)。此前实现与本地验证分别见 [小象 Logo 任务](2026-11-03-hr-elephant-logo.md) 和 [品牌配色任务](2026-11-03-brand-color-tokens.md)。

## 主站与历史文章

正式入口：[herong.info](https://herong.info/)。

| 项目 | 实际值 |
| --- | --- |
| 源码提交 | `57903ab47296720834cca30ef3923ba9db725206` |
| buildId | `54b5df33968f1537` |
| 已激活 release | `57903ab47296720834cca30ef3923ba9db725206-20261103170015-1` |
| 上一可回滚 release | `4a77bd2b1387a8e1ee3ba43418dfd9a980a3b901-41581261297-1` |
| 来源 GitHub Actions run | `41678122569` |
| 来源 artifact | `13252386007` |
| artifact ZIP SHA256 | `316c56b6c852f55fed87f03a14d0e3baa136e758a9b5bccc9581197a14122a58` |
| 发布归档 SHA256 | `8e785a59e282a3012f077a581c2660791e61f9d5ca4b2f8244cd465518fc37e5` |

本次采用加速发布：取用同一 CI run 的构建 artifact，经 SHA 校验后用于正式激活，没有另外使用工作区脏文件重建一套主站内容。容器健康与正式健康接口均返回目标 buildId。产物包含 9,210 文件、3,041 HTML，其中 3,025 为历史页面，正式 sitemap 为 3,039 条 URL。

**CI 状态：**截至 2026-11-03 17:11:37 UTC，[原 run `41678122569`](https://github.com/herongdev/blog/actions/runs/41678122569) 仍在上传同一目标归档，进度为 `31,334,400 / 58,100,679` 字节，GitHub Pages 备份步骤尚未执行。工作流在后台继续，尚无最终成功结论。正式主域已运行上述加速 release。原工作流后续使用正常 release ID `57903ab47296720834cca30ef3923ba9db725206-41678122569-1` 发布同一构建时，buildId 应保持相同；保留上一有效旧版本作为显式回滚目标，不将同一构建的两次发布误当成旧版回滚。

证据：[artifact 回执](../../output/brand-release-20261104/site-artifact-receipt.json)、[发布版本](../../output/brand-release-20261104/main-release.json)、[激活日志](../../output/brand-release-20261104/main-activation.log)、[正式健康回执](../../output/brand-release-20261104/main-health-poll.json)。[CI 状态快照](../../output/brand-release-20261104/ci-status.json) 在 17:16:04 UTC 再次确认上传仍在进行。

## 教程与写作台

正式入口：[公开教程](https://dev.herong.info/)、[教程写作台](https://dev.herong.info/admin/)；测试入口：[test-dev.herong.info](https://test-dev.herong.info/)。

| 用途 | 已激活版本 | 上一可回滚版本 |
| --- | --- | --- |
| 教程正式站 | `20261103T165200Z-10631a44` | `20261103T045634Z-e3a92a83` |
| 教程测试站 | `20261103T164524Z-a7c19d8a` | `20261103T045310Z-56ee6356` |
| 写作台 | `20261103T164143Z-brand` | `20261103T-manual-schedule` |

测试和正式发布使用相同源码指纹 `6d2c11b73344b0f66724c0eed03d65232e5d0718dda0816edb72162a069ace44`。正式发布返回成功，写作台服务及备份定时器处于 active，发布任务结束后无活动作业。原有私有内容与所有者数据的前后摘要一致；此文档不记录私有存储位置、内容或凭据。

正式 HTTP 已确认教程首页、按周/主题/工具目录均返回 200，头尾各一份；公开品牌 CSS 与写作台品牌资源存在，写作台新旧静态资源兼容保留且哈希匹配。正式教程搜索 feed 仍为 0 篇，旧公开资料索引仍为 4 条；CORS 仅允许主域且不携带凭据。草稿与私有索引不能公开获取，管理员数据接口在未登录时保持拒绝，未绕过发布门禁或权限规则。

证据：[正式发布回执](../../output/brand-release-20261104/guides-production-receipt.json)、[最终服务状态](../../output/brand-release-20261104/guides-final-state.json)、[正式 HTTP 验证](../../output/brand-release-20261104/guides-production-http.json)。

## 政企独立领域页 favicon

正式入口：[政企与数字孪生](https://herong.info/projects/enterprise/)。

- 新版本：`20261103T170340Z-brand-favicon-57903ab`。
- 回滚目标：`20260923T145455Z-enterprise-tos-v1`，旧版本保留。
- 发布前核实原 current 和 index SHA256 与授权基线一致；复制为独立新版本，仅将 icon 标签改为 `./favicon.svg`、声明 SVG MIME，并新增提交 `57903ab` 中的 favicon。
- 原有 36 个文件中只有 index 标签变化，其余 35 个文件字节一致；CSP、app.js、媒体、stage 和 manifest 均保留。
- 正式 favicon SHA256：`0b2a8ad9fe018d98da52580f60658c775c3963ba73b8c1fecd65a63c3172c5ca`，响应 MIME 为 `image/svg+xml`。
- 正式域 9 个资源字节哈希、26 个媒体 HEAD 与长度检查通过；采样页返回 200，system/info 和 stations 返回 OK，数据模式仍为 `local-demo`。
- 采样服务健康为 UP，进程与重启计数未变；未修改 Nginx、重启采样服务或触碰 Java/H2 数据。

证据：[版本及逐文件记录](../../output/brand-release-20261104/enterprise-release-receipt.json)、[正式验证回执](../../output/brand-release-20261104/enterprise-verification.json)。这部分为只读 HTTP/服务核验，没有浏览器操作。

## 文件工具

正式入口：[文件工具目录](https://herong.info/file-tools/tools)。

| 项目 | 当前记录 |
| --- | --- |
| 已激活版本 | `20261103T164200Z-hr-brand` |
| 上一可回滚版本 | `20261103T050046Z-4a77bd2-chrome` |
| 镜像 | `light-tools-web:20261103t164200z-hr-brand` |
| 目标平台 | `linux/amd64` |
| 容器状态 | healthy，HTTP health 返回 ok |
| 归档 SHA256 | `fd16b12faf71ede8977ab27ace4718a88e33d7023e01c064bf71c1d7ce054f0e` |

候选构建已通过正常 lint/type 检查；本地候选 HTTP、品牌资源与 FFmpeg 转换已验证。正式激活回执确认用户、权益和订单记录数量以及关键运行配置摘要前后一致，备份校验通过；不在此文档展示配置内容或凭据。

正式 HTTPS 已确认目录 canonical 与 `index, follow` 正常，公共头尾各一份，导航指向既定正式地址；7 个品牌资产均返回 200 且 SHA 匹配，CSS 包含共享品牌 token。正式 MP4→GIF 接口实测返回 200，输出为 `GIF89a`、1,151 字节，SHA256 为 `b496a299397c2599333237735be67317cdc0b7fa487818b4c44b1f94e8a499f5`。客户端 PNG→JPG 与浏览器视觉检查不包含在这些服务端验证结论中。

证据：[发布摘要](../../output/brand-release-20261104/tools-production-summary.md)、[前后完整回执](../../output/brand-release-20261104/tools-production-receipt.json)、[候选回执](../../output/brand-release-20261104/tools-candidate-receipt.json)、[镜像归档核验](../../output/brand-release-20261104/tools-archive-verification.json)、[正式激活回执](../../output/brand-release-20261104/tools-production-activation.json)、[正式 HTTP 验证](../../output/brand-release-20261104/tools-production-http-verification.json)、[正式 FFmpeg 验证](../../output/brand-release-20261104/tools-production-ffmpeg-verification.json)。

## 公开兼容性检查

主站激活后，公开 HTTP 兼容性检查共 80 项通过、无失败；目标 buildId 在检查前后稳定。覆盖主站与历史入口、SEO/索引、品牌资产、独立项目资源和采样 API。RSS/Atom/JSON feed 为有限 Range GET 格式检查，不宣称全文解析。

采样站使用公开列表返回的站点 ID，仅执行读取；SSE 在约 2.47 秒内收到两条完整 snapshot 事件后关闭，没有调用场景启动/重置接口。公开教程 feed 为 0 篇正式教程，CORS 保持主域限制；主站 robots 与 sitemap 均指向正式地址。

这份检查中的工具项仅覆盖路由兼容，工具品牌激活当时仍标记为独立检查待完成；后续正式激活、HTTP 与 FFmpeg 结果已由上一节独立工具回执补齐。

证据：[公开兼容性回执](../../output/brand-release-20261104/public-compat.json)。

## Edge 与实际视觉范围

- 此前已在本地原生 Microsoft Edge 实际查看主站、教程首页、工具目录各自深浅主题，Logo、按钮、选中态与中性色正常；范围和限制见 [品牌配色任务](2026-11-03-brand-color-tokens.md)。
- 本轮已实际查看线上测试入口 `test-dev.herong.info` 的深浅主题；这是测试站的视觉记录，不替代正式教程域或其他正式应用的最终复核。
- **正式域 Edge 最终检查未完成：**Mac 当前锁屏，已提示用户手动解锁，正式域最终浏览器复核尚未完成，不能写为 Edge 通过。
- 本会话中的 CUA 截图及 AX 可访问性状态为实际界面证据；不编造未保存的本地 Edge PNG。此前 Chromium 的 176 个状态检查不能冒充 Edge 记录，也没有完成 iOS/Android 手机真机验收。

## 最终服务状态与回滚

2026-11-03 17:13:10 UTC（北京时间 11 月 4 日 01:13:10），主站和文件工具容器均为 healthy，写作台服务 active，正式主站 buildId 为 `54b5df33968f1537`；新服务器磁盘余量为 `3,197,177,856` 字节（约 2.98 GiB），高于发布预留的 768 MiB。工具独立最终数据核验随后再次确认摘要不变。

各应用 current/previous 的最终读取见 [服务与磁盘回执](../../output/brand-release-20261104/production-final-state.json)。主站、教程、写作台、工具和政企的旧版均保留；写作台回滚必须以 `20261103T-manual-schedule` 为前版，保留已上线的排期功能，不能退到更早实现。主站使用既有 `infra/site/rollback.sh`，其他应用使用各自既有发布/激活机制。

本轮仅移除自身已验证的远端工具传输归档与临时候选，未清理历史版本、运行数据或其他项目缓存。回滚只切换应用版本，不能用旧数据覆盖发布后新增的业务记录；本轮未执行线上回滚演练。正式 Edge 视觉与 CI 备份的未完成范围已在上文单列，不能与本次正式域发布状态混淆。
