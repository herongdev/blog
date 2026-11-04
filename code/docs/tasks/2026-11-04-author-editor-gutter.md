# 双栏编辑器留白修正

日期：2026-11-04，Asia/Shanghai。

用户指出 Markdown 源码和预览两栏留白过大。实际核对 bytemd@1.22.0：CodeMirror-lines 和预览 markdown-body 默认 max-width 800px、margin auto；源码行 padding 4%，预览 markdown-body padding 16px 4%，项目又给预览外层 24px，形成居中和叠加留白。

实施前实际查看 [微软 VS Code 官方 Markdown 预览截图](https://code.visualstudio.com/assets/docs/languages/Markdown/preview.png) 与 [Visual Studio Split Preview 控件截图](https://learn.microsoft.com/en-us/visualstudio/ide/media/visualstudio/markdown-preview/markdown-preview-controls.png)，按编辑工作区利用栏宽、保留分隔线和适量内边距调整；不复制它们的主题。

仅在 `.editor-wrap` 中取消 800px 上限和居中，源码/预览使用统一 16px 内边距，760px 以下为 12px。预览外层 padding 归零，只有正文一层负责边距。CodeMirror-line 和 CodeMirror-line-like 同步覆盖，保证可见行与测量行边距一致；不改 scroller/sizer/gutter 或库的负 50px 滚动修正。保留双栏/单栏切换、全屏行为、同步滚动和当前主题；不影响只读历史、调研来源和公开站。

类型检查、Vite 构建、diff-check 通过；独立只读复核 ByteMD/CodeMirror 的选择器、测量行及全屏/窄屏作用域。未为纯样式修改新增实现镜像测试或重复运行无关服务端回归。

Edge 在现有窗口的空白标签打开隔离预览，屏幕采集先遇到 ScreenCaptureKit -3811；随后恢复，并通过新 URL 重新加载最新构建。实际查看修改前后的桌面深色双栏，确认源码/预览从大幅居中留白改为靠栏边的统一内边距，首段因可用宽度增加减少换行。全屏光标操作与窄屏尚未实测，不将桌面截图扩大为全场景验收。

已上线作者 release `20261104T153408Z`，来源包 SHA256 `549415b749f6f5bb850a8d6db75df243439684f12e7e587234a756a3ea537530`；上版 `20261104T151650Z`。停写一致备份 `20261104T153702Z.tar.gz`，发布回执位于 `/var/backups/herong-dev-guides-author/20261104T153408Z-editor-gutter/`。165 个项目文件、认证、配置和公开站/执行器链接保持一致。只更新作者代码，没有数据迁移或文章/视频发布。代码回滚只切回上述上版并重启作者服务，保留当前数据。

