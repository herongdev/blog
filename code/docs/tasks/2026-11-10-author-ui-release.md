# 写作台共享控件与制作界面上线

日期：2026-11-10（Asia/Shanghai）。用户要求补齐浅色、窄屏及其它作者页面验收，通过后直接部署；随后明确允许使用 IAB。本次只发布写作台。

## 版本与范围

- 正式入口：<https://dev.herong.info/admin/>。
- 作者 current：`20261110T110945Z`；previous / 代码回滚目标：`20261110T080921Z`。
- 真实部署白名单归档：263 文件、2,305,075 bytes，SHA256 `713bb5d02dca4923073c090e7ae9aeaee56c110988aa22d2cd2cc3a3f9801fe6`。来源是工作区，不代表所有改动已经 Git 提交。
- 上线共享输入、选择、按钮和工具栏，以及此前已授权的制作入口合并、排期 / 全部进度工具栏稳定性修正；补齐目录入口误显、搜索焦点、tooltip 层级、320px 弹窗按钮及长文本换行修复。
- 已建制作档案后，旧拍摄准备 PATCH 返回 409，防止旧窗口继续写入第二份准备资料；没有数据库迁移。

## 实际验收

本地页面、主题、尺寸及交互矩阵见 [共享 UI 验收记录](2026-11-10-author-ui-components.md)。使用隔离内容及文件，不改原用户验收稿，测试内容未进入线上。

- 本地完整测试 **304/304**，无跳过；`AUTHOR_BASE_PATH=/admin/` 构建、类型检查、UI 扫描 / 自测、品牌 token / 对比度及 diff 检查通过。已有编辑器大 chunk 提示仍存在。
- 服务器服务账号及 PrivateTmp、ProtectHome、ProtectSystem=strict、NoNewPrivileges、2 GiB / 512 tasks 限制下，UI / 类型检查及完整 **304/304** 测试通过。首次 3 个视频夹具误用系统精简版 FFmpeg；改为现有生产 ffprobe 同目录的完整版后，重验源码并重跑全套。未改系统二进制、降低容量保留线或跳过测试。
- 重验归档成员、六份依赖清单、共享 chrome 和三处链接后，复用 `20261105T034159Z` 的不可变依赖，该 release 必须保留。
- 公网 28 个新版文件及 51 个旧 assets 全部 200、SHA256 一致，入口 HTML 逐字节相同。首次批量传输中断后限制并发，最终全部重验通过，见 [资源与权限回执](evidence/2026-11-10-author-ui-review/public-verification.json)。
- 匿名文章、目录、制作、会话和发布账号接口为 401；错误 Origin 写入为 403；私有 SQLite、源码、环境和准备回执路径为 404。主站、正式 / 测试教程站均为 200。
- IAB 查看线上微信登录页：320px 深 / 浅色、1440px 浅色无横向溢出，普通按钮分别为 44 / 36px，控制台无错误。证据：[窄屏登录](evidence/2026-11-10-author-ui-review/online-mobile-light-login.jpg)、[桌面登录](evidence/2026-11-10-author-ui-review/online-desktop-light-login.jpg)、[测量](evidence/2026-11-10-author-ui-review/online-measurements.json)。

内部页面完整操作来自本地隔离预览，没有伪造线上管理员身份。本次没有重做微信绑定、真实平台扫码 / 投稿或 iOS / Android 真机验收，窄屏模拟不计真机通过。

## 数据与备份

激活前确认无网站发布、平台投稿及登录任务，停写后一致备份。通用安装器仍存在重启后立即备份的竞态；本轮两库已存在，并额外等待新版入口就绪、核验备份包含两库，没有以 restart 命令成功代替就绪验证。

| 记录 | 服务器路径 | SHA256 |
| --- | --- | --- |
| 停写备份 | `/var/backups/herong-dev-guides-author/20261110T111502Z.tar.gz` | `df40358142b9addf2fa3743cd0fe889a5d570b99d4c162e6f382606eee920b5f` |
| 激活后备份 | `/var/backups/herong-dev-guides-author/20261110T111505Z.tar.gz` | `01dd67178cf5d5fbc5eaed2d0a7097c2b7834a509f11ad996429c4968510c650` |
| 激活及原单元回执 | `/var/backups/herong-dev-guides-author/20261110T110945Z-author-ui/` | 目录 |

173 个非数据库项目文件、2 个认证文件和 5 个配置文件摘要一致。制作与发布两库备份的 `integrity_check=ok`，前后完整逻辑摘要一致；备份排除活动 DB/WAL/SHM，以服务账号执行 SQLite backup API。未回放队列或恢复历史数据，未执行生产恢复演练。

两份归档另下载到本机 Git 忽略的 `code/secrets/author-ui-20261110T110945Z/`，目录 0700、文件 0600，SHA256 与服务器一致。这是本次私有副本，不等于持续异地备份已经配置。

候选日志：`/opt/herong-dev-guides-author/releases/20261110T110945Z/.candidate-resume-20261110T111414Z-3.log`；候选来源回执为同目录 `.author-candidate-audit.json`。作者 active、NRestarts=0、Result=success，备份 Result=success、timer active。其它 current 保持原样：正式站 `20261103T165200Z-10631a44`，测试站 `20261103T164524Z-a7c19d8a`，执行器 `20261105T100033Z-douyin-verification-sms-choice`。没有发布文章或平台作品。

回滚前确认无活动任务，原子切回作者 `20261110T080921Z`，必要时恢复原 systemd 单元，重启并等待旧入口就绪；不恢复旧项目、认证或任务库覆盖用户新写入。当前、上一版、依赖源及历史备份均保留。

## 容量

只回收可重建的 DNF 元数据缓存，未删除内容、备份、历史 release 或依赖 store。DNF 定时任务在激活期间重新生成缓存，曾再次压低余量；确认无包管理进程后再次精准回收，最终检查为 680,849,408 bytes（约 649 MiB）。512 MiB 保留线保持不变。较大视频及持续全量备份仍需扩容，本轮未改购买、定时任务或存储策略。
