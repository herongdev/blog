# 知识搜索与公共头尾上线

日期：2026-11-03（Asia/Shanghai）。用户明确授权“上线”，并补充作品菜单首页应恢复改造前首页。

## 发布范围

- 主域搜索首页、主题/时间筛选、原文检索和公开边界。
- 公共头尾接入主站、历史文章、教程公开站、文件工具；HR、六菜单、邮箱与备案共用来源。
- `/projects/` 恢复原“技术落地的不同现场”六卡首页，领域/详情及所有历史地址保留。
- 教程正式 published-only feed 与精确路径 CORS；不发布私有草稿或视频制作后台的未提交改动。
- 修复工具旧图片预估状态触发的 lint 构建阻断，以及 Docker slim 镜像缺 CA 时的 HTTPS APT 初始化；不关闭检查或 TLS 验证。

源代码按白名单独立提交。根 manifest 只提交 `check:chrome`，锁文件只提交四应用公共包依赖与官方图标生成依赖；排除无关 3D、其他产品、视频发布中心及后台 UI 的本地改动。作者源码打包只加入共享包，不混入本地后台业务修改。

## 发布前核对

服务器为已确认的 `101.96.210.172`，严格核对已有 SSH 主机身份。现场磁盘可用约 7.2GB，内存可用约 4.1GB，无需清理其他项目。

- 主站旧 current：`68b567ff2c05e47d3b8d2a63e6b22209dfa94c2f-40080671767-1`；旧 previous 仍保留。
- 工具旧 current：`20261024T075359Z-final`，镜像 `light-tools-web:20261024-migrated`，继续使用原实际数据卷与私有 runtime/secrets。
- 教程旧正式 current：`20261030T080538Z-5dc4f387`；旧测试 current：`20261030T080331Z-ee47dd89`；作者旧 current：`20261102T142731Z`。
- 作者持久源仍为 4 lead / 0 published / 135 private draft，无活动发布任务。部署不以本机种子覆盖它；管理员与项目文件摘要发布前后校验。

## 顺序与回滚

1. 准备教程候选作者代码，只覆盖公开站、公共包、依赖及共享源码发布指纹；保留线上既有后台、私有内容和发布中心。按原 manager 先测试、实际查看后再正式发布。
2. 正式教程域只新增 `/search/published.json` CORS location，允许 `https://herong.info`，不配置测试域跨站检索；备份原配置、nginx -t 通过后 reload。
3. 本次白名单源码推送触发现有主站 CI：干净 checkout、生产变量、正式索引与 canonical、受限发布器激活、GitHub Pages 原流程。不得上传本机端口预览产物。
4. 工具本机构建 linux/amd64 正式镜像，标准 lint/typecheck/build；隔离临时数据验证真实图片/FFmpeg转换后，再用原 Compose 激活流程更新本容器并复用原数据配置。
5. 完成正式 HTTP、搜索、菜单、作品、历史内容、RSS、独立演示 API/SSE、明暗主题和手机模拟验收。各原 current、镜像和内容备份保留，失败只回滚本应用。

Nginx 备份：`/var/backups/herong-site/20261103-shared-chrome/herong-dev-guides-domains.conf`。只新增精确公开 feed location，测试与 reload 已通过；没有修改 DNS、证书、旧机演示或其他产品。

## 已完成的发布前验证

- 原作品首页恢复后，1440×1000 与 390×844 实际查看；六卡、五领域和教程入口正确，手机无横向溢出且完整一屏。截图 `output/playwright/projects-restored-{desktop,mobile}.png`。
- 教程 staging 已发布 `20261103T045310Z-56ee6356`，桌面与手机实际查看通过；公共头尾各 1、正式菜单地址、测试站 noindex、公开 feed 0 项、旧资料检索 4 项，私有路径不可访问。
- 服务器候选公共包资源/测试、教程 Astro check、发布与公开 feed 回归通过；发布前完整备份及持久项目/管理员摘要核对未变。工具本轮全量 lint/typecheck 已通过。

详细日志、校验、回执：`code/output/shared-chrome-release-20261103/`（不提交私有部署材料）。正式结果及最终 release 将在本记录中补齐，不能把上述准备状态当成已全部上线。


## 正式发布结果

源码已独立提交并推送 `4a77bd2b1387a8e1ee3ba43418dfd9a980a3b901`，未夹带其他产品、3D 或视频发布中心的工作区修改。

| 应用 | 正式版本 | 保留回滚基线 |
| --- | --- | --- |
| 主站与历史文章 | `4a77bd2b1387a8e1ee3ba43418dfd9a980a3b901-202611031315-1` | `68b567ff2c05e47d3b8d2a63e6b22209dfa94c2f-40080671767-1` |
| 教程公开站 | `20261103T045634Z-e3a92a83` | `20261030T080538Z-5dc4f387` |
| 教程测试站 | `20261103T045310Z-56ee6356` | `20261030T080331Z-ee47dd89` |
| 作者代码 | `20261103T044826Z-chrome` | `20261102T142731Z` |
| 文件工具 | `20261103T050046Z-4a77bd2-chrome` | `20261024T075359Z-final` |

主站 [CI run 41581261297](https://github.com/herongdev/blog/actions/runs/41581261297) 的干净生产构建和 artifact 上传已完成。GitHub runner 到服务器 SCP 约 15KB/s，为加速上线，通过 GitHub 连接器取得该 run 的精确 artifact `13206411983`，ZIP SHA256 与 GitHub 元数据完全一致：`288b628f0833b860e3919c707d266a3ce21ac94f662214c99badc64820c739ed`。再次核验正式域名/索引与无 localhost/旧 IP 菜单，通过 static verify 后，使用原 `pack-static.py` 及服务器 root-owned 固定发布器激活；没有复建、改写产物或上传可执行发布代码。严格归档 SHA256 为 `4069f60b585dc462b7038f9944ca83fb9b0a7400f72bbe7a82540fef681ead1a`，主站 buildId 为 `d03baad729bd997c`，3,041 HTML / 3,039 sitemap。

记录时原 CI 的 SCP 上传步骤仍继续运行，不能称整条 Actions 或 GitHub Pages 已完成；它后续使用的正是已上线的同一 artifact/buildId，版本一致。本次上线不依赖这条慢上传完成。备用干净 worktree 已完成 frozen offline install，但发现精确 artifact 可取后停止了仅本任务的构建，没有使用其未完成产物。

## 正式验收与数据保护

- 正式浏览器：主域首页 `index, follow`、canonical 正确、初始搜索索引请求 0；“图片压缩”返回 27 条、首屏 12 条，首项进入真实工具原页；文件处理筛选返回 28 条。元数据和倒排分片均 HTTP 200/gzip，搜索查询切为 noindex；搜索没有请求 localhost、测试站或管理员接口。一次冷查询约 7.9 秒，未声称完成性能基准。
- 作品入口 `/projects/` 是原六卡首页，五个领域与教程链接、原概念图和背景均保留；桌面及手机实际查看，无横向溢出。主域搜索首页未被替换或重定向。
- 手机菜单六项完整，深色刷新保留；主站→文章→工具→教程→主站实际跨站导航通过。四公开应用均只有 1 套公共头尾；历史本地搜索“Vue”仍显示 16 项。
- [公共兼容报告](../../output/shared-chrome-release-20261103/public-compat.json) 为 `production-verified`，71 项全部通过，覆盖新 buildId、SEO、页面/旧地址、RSS/Atom/JSON Feed、真实404/缺失JS、独立政企与采样站资源及 API。真实 station ID snapshot 和 SSE 均可用，SSE 收到 2 个模拟事件后主动关闭；全程 GET，未操作旧机模拟状态。
- 教程保持 4 lead / 0 published / 135 private draft，150 个项目文件和管理员身份摘要不变；作者原前端/登录及视频发布代码未被本机脏改动覆盖。正式 feed 73B/0 项、CORS 只允许主域，原资料索引仍 4 条。详见 [教程发布记录](2026-11-03-shared-chrome-release-guides.md)。
- 工具全量 lint、typecheck、Linux 标准构建通过；正式浏览器 PNG→JPG 输出 512×512/12,114B，公开边缘 MP4→GIF 为 200/GIF89a/1,176B。原课程数据文件、4 用户/2 权益/2 订单、原数据卷、runtime 与 secrets 内容摘要不变。详见 [工具发布记录](2026-11-03-shared-chrome-release-tools.md)。未验证真实账号登录、支付交易或手机真机。
- 主站与工具容器均 healthy，最终服务器根盘约 4.6GB 可用（88% 使用）。没有清理其他项目镜像、缓存、数据卷或旧机服务；当前和明确的旧回滚版本均保留。

证据：`code/output/shared-chrome-release-20261103/` 的 artifact、publisher receipt、JSON、HTTP 与浏览器报告；截图为仓库根 `output/playwright/release-*`。私有备份与身份材料仅留服务器私有目录，没有进入公共产物或 Git。
