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
