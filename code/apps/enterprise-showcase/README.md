# 政企与数字孪生领域首页

正式地址：`https://herong.info/projects/enterprise/`

这是政企与数字孪生领域的独立媒体首页，来源于 `easyv-display-v21`，包含视频数字孪生首屏、行业 Tabs 和项目卡片。它与具体项目 `3d-showcase` 分开维护：

- 本目录：领域首页，只负责项目导航和视觉展示。
- `../3d-showcase/`：汽车采样站具体演示页。

汽车采样站的正式地址为 `https://herong.info/projects/enterprise/sampling-station/`。不得将本项目或采样站重新部署到 `/3d/`、`/projects/fields/enterprise/`、根 `/api` 或其他服务器。

该项目不需要编译。先运行 `node scripts/check-assets.mjs`，发布时仅复制 `manifest.json` 列出的运行文件与清单本身到领域首页的独立 release，再由 Nginx 的 `/projects/enterprise/` 路由提供；README 与检查脚本不是网站运行资源。它仍部署在旧机 `115.190.214.176`，主域新机按原路径回源，不合并主站 CI。完整边界见 [部署交接](../../docs/enterprise-demo-deployment.md)。

`stage.json` 中 18 个带 `reference` 的 EasyV 卡片在运行时显示“参考案例 · EasyV”并链接原作，不表示何荣工作室拥有或交付了这些项目；它们没有本站 demo 地址。汽车采样站是单独的模拟演示，不使用这些参考卡片冒充个人履历。

媒体资源正式存放在火山引擎 TOS 北京区域的私有桶 `herong-media`，公开读取范围仅为 `projects/enterprise/v1/assets/*`。`stage.json` 的 `assetBase` 指向该版本化前缀；本目录 `assets/` 必须继续随 release 保留，作为可回滚源文件，未经验证不得删除或再次压缩 WebM。对象使用 `public, max-age=31536000, immutable`，更新内容时必须启用新的版本前缀（例如 `v2`），不能原地覆盖后依赖浏览器刷新缓存。

`sources.json` 记录 26 份原始素材的来源、获取方式、字节数和 SHA256。这些来源记录及公开可下载状态不构成再分发许可；本仓库尚未包含 EasyV 素材的明确许可证或授权证明，许可状态标为未核实，不能将它们声明为自制或自由授权素材。本次只校正本地源码与清单，不发布媒体。

favicon 由仓库根 Logo 母版生成，与品牌提交 `57903ab` 一致。`manifest.json` 是当前运行文件的 SHA256 清单，不是原始获取证据；修改运行代码或生成品牌资产后，用 `node scripts/check-assets.mjs --write-manifest` 更新，再执行无参数检查。原素材获取哈希保留在 `sources.json`，不能随修改伪造来源。

操作、行业、导航图标均来自工作区已锁定的官方 `lucide-static@1.66.0`。`node scripts/generate-icons.mjs` 仅从现有 `@herong/site-chrome` 开发依赖生成固定的 13 个 SVG 到 `runtime/icons.generated.mjs`，并同步首页三处静态图标；不引入浏览器整库、远程图标或手写路径。完整 ISC / 继承 MIT 许可随 `runtime/LUCIDE-LICENSE` 发布。`--check` 比较官方源与派生文件，资源检查自动执行该校验；UI 图标许可与上文 EasyV 素材的未核实状态分开。
