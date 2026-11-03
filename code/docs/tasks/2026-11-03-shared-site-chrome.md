# 公共头部与页脚接入

日期：2026-11-03（Asia/Shanghai）。状态：已按用户后续“上线”指令正式发布，源码 `4a77bd2`；见 [联合上线记录](2026-11-03-production-release.md)。以下代码与预览阶段的记录按原时间保留。

## 用户目标与范围

用户确认各子应用自行渲染公共头部、共同引用一个维护入口，并追加公共页脚。沿用现有多应用架构，不引入运行时微前端、不改正式 URL、不迁移独立产品或后台。

接入四个公开应用：Astro 主站、VitePress 历史文章、Astro 教程公开站、Next.js 文件工具。公共菜单为教程、文章、工具、应用、作品、关于；HR Logo 返回主站搜索首页。公共页脚为“联系我 herong2023@qq.com”和原备案链接。教程内部按周/主题/工具、工具内部全部工具/课程/我的/后台继续保留；后台入口仍 nofollow。

修改前核对源码和已有审计，并再次使用已实际核验的 MacPaw 导航/页脚参考（`https://macpaw.com/`，仓库根 `output/playwright/nav-reference-macpaw-menu.png`、`nav-reference-macpaw-footer.png`）。沿用已确认主站 HR 字标、中性色与紫色强调，未重做内容页面或编造业务数据。

## 唯一维护入口

`packages/site/chrome/`，包名 `@herong/site-chrome`：

- `src/index.mjs`：公共菜单、地址派生、品牌文字、邮箱备案及完整 `renderHeader` / `renderFooter` HTML。
- `src/styles.css`：仅作用于 `hr-chrome` 的语义 tokens、桌面/手机布局和明暗外观，保留各应用正文样式。
- `src/theme.mjs`：首屏与客户端复用的主题解析，兼容旧 key、适配 `.dark` 和 `[data-theme]`。
- `src/client.mjs`：主题、系统跟随、菜单关闭与焦点、可重复初始化和卸载清理。
- `assets/logo-hr.svg`：现有纯 HR 字标，data URL 用于公共头部和已接入的 favicon。六个操作图标由官方 `lucide-static` 生成，浏览器不加载图标整库。

适配层只传当前栏目与环境地址：Astro `SiteLayout.astro` / 教程 `BaseLayout.astro` 用 `set:html`；VitePress 的 `SiteChromeHeader.vue` / `SiteChromeFooter.vue` 用 `v-html`；Next Header/Footer 用可信渲染结果插入，小 Client 组件连接 effect 生命周期。完整模板不在三个框架各复制一遍。

公共导航保持原生链接与原生 details，初始 HTML 已包含菜单和页脚，禁用 JavaScript 仍可导航。不加载远程壳、配置服务或子应用脚本。共享包改变后，消费应用须重新构建发布；不是实时修改线上静态页面。相同主题 key 在独立 origin 下仍分别保存，不能据此声称已实现跨域主题同步。

## 构建与独立发布边界

- 四个应用 package.json 使用 workspace 依赖，pnpm lock 同步。`pnpm run check:chrome` 执行资源防漂移和核心测试，现有 `build:site` 在构建前执行它。
- VitePress 1 的配置打包仍是 CJS。配置文件直接引用共享包的公开 `src/index.mjs` 供 Vite 打包，避免 require ESM 的失败；主题组件正常按包名引用。关闭默认 navbar，保留目录和 `VPNavBarSearch`。关闭 VitePress `appearance`，公共包为唯一主题控制器；Vue 适配层只读同步 `isDark` 给旧内容组件。
- 教程作者源码归档精确加入共享包，安装过滤包含其 workspace 依赖。发布源码指纹覆盖包 manifest、src 和 assets，并核实 node_modules 实际安装路径；共享源码在测试后或构建中改变时，沿用既有门禁拒绝直接激活正式内容。未改变正文状态、权限或测试→正式规则。
- 工具 Docker deps 阶段加入共享 manifest，Next transpile 与 standalone tracing 包含该依赖。旧独立 ThemeToggle 已删除。PUBLIC_NOINDEX 仅用于本地预览的响应头和 metadata，生产默认行为保留。
- 既有主站自动发布流程、RSS/Atom/JSON Feed、教程内容公开门禁及各独立产品域名保持原有分工；没有执行远程命令、推送或部署。

## 验证

- 公共包：生成资源防漂移检查通过，11 项测试通过，覆盖协议与属性安全、根路径/子路径、静态导航、主题兼容/保存失败/系统跟随及重复挂载和菜单清理。
- 主站：Astro check 0 errors/warnings/hints，构建成功；现有 31 项搜索/筛选/路由测试通过。完整历史构建与合并后 static verify 通过：3,041 HTML、3,040 canonical、57 页及 51 个本地资源抽样；预览 sitemap 0，禁止索引。
- 教程：Astro check 33 文件、0 errors/warnings/hints，17 页构建成功；发布回归 13/13。正式教程 feed 仍为 0 条，未将待实测资料或私有内容加入主站正式检索。
- 工具：typecheck 和本轮修改文件的 eslint 通过。全量 lint/标准 next build 仍被原有 `ImageConvertTool.tsx:590` 的 `react-hooks/set-state-in-effect` 错误阻断；该文件不属于本轮改动。提供预览时使用 Next CLI `--no-lint` 完成构建，没有改 lint 配置或图片转换业务。
- 实际浏览器覆盖四个公开应用：每页恰有 1 个公共 header/footer，同一套六菜单和邮箱备案；全部主菜单交叉跳转、Logo 回首页、手机菜单 Escape 关闭与焦点恢复均通过。显式主题刷新保留，跟随系统响应媒体变化；320、390、600、768、1024、1440、2560px 与 844×390 横屏无横向溢出。浏览器 pageerror 为 0。
- 禁用 JavaScript 后，四站初始 HTML 均有头尾，手机原生菜单可打开、六个链接可达。主站“图片压缩”仍为 27 条、首屏 12 条；历史本地搜索“Vue”显示 16 个结果。
- 实际查看桌面、390px 手机模拟、明暗主题、局部导航和页脚截图；手机浏览器模拟不等同 iOS/Android 真机验收。少数 element screenshot 后出现的重复头部是捕获合成伪影，已核对 DOM 只有 1 个 header、命中测试为正文，并在新导航后用真实 viewport 重拍覆盖。

日志和 JSON：`code/output/search-home-20261103/shared-chrome-*`；截图：仓库根 `output/playwright/shared-chrome-*`。历史主题单控制器修正后的最终记录为 `shared-chrome-blog-final-verification.json`：canonical light/旧 key dark、canonical dark/旧 key auto 两种冲突均以 canonical 为准；固定主题不被系统变化覆盖，跟随系统正确切换；文章 SPA 路由保留运行上下文，头尾仍各 1 个，主题一次切换有效，本地搜索仍 16 个结果。最终产物已重新构建、合并并通过 static verify；重新查看文章桌面及手机深色截图。

## 可用预览

- 主站及历史文章：`http://127.0.0.1:4371/`，launchd `info.herong.blog-search-preview`。
- 公开教程：`http://127.0.0.1:4372/`，launchd `info.herong.guides-chrome-preview`。
- 文件工具：`http://127.0.0.1:4373/file-tools/tools`，launchd `info.herong.tools-chrome-preview`。

三项只绑定 127.0.0.1，使用本地交叉导航和预览禁止索引设置。停止对应服务可用 `launchctl remove <label>`；没有安装登录启动 plist。正式源代码的默认菜单地址仍为已确认的正式域名和 `/file-tools`。


## 上线前补充：作品入口恢复原首页

用户明确“作品菜单的首页，应该是之前那个首页”。`/projects/` 已从逐领域展开目录恢复为改造前 Astro 首页的完整六卡内容，保留标题、五个领域与开发工具教程、概念图及交互背景，引用现有公共头尾；主域搜索首页不变。已对照尚在线上的原首页截图，查看 1440×1000 与 390×844 实际渲染；六卡与链接正确，手机两列三行、一屏无横向溢出。截图 `output/playwright/projects-restored-{desktop,mobile}.png`，生产发布会包含此修正。


## 正式上线结果

主站/历史文章、公开教程及文件工具均已上线公共头尾；`/projects/` 同时恢复原作品六卡首页。主域采用 GitHub CI 的精确生产 artifact，经 SHA256 校验后由已有固定发布器加速激活，buildId `d03baad729bd997c`；未使用任何本机端口预览产物。工具原有 lint 与 Docker HTTPS/CA 构建阻断均已修复，全量 lint/typecheck/Linux 标准构建通过，真实 JPG 和 FFmpeg GIF 转换均通过。正式浏览器和 71 项公共 HTTP 兼容验收通过。具体 release、回滚、存储与 CI 仍在进行的原上传状态详见联合上线记录。
