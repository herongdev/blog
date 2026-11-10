# 教程站与写作台 UI 约定

- 修改本目录的界面前，阅读 `../../docs/ui-guidelines.md`；它同时约束公开站和 `author/` 写作台。
- 所有自有操作、导航和状态图标统一使用 Lucide。Astro 用 `@lucide/astro`，React 用 `lucide-react`，按需导入；两个依赖已经存在。
- 禁止用文本符号、Emoji、首字母、CSS 拼图或手写 SVG 路径代替图标。检查 JSX、Astro 模板、动态 DOM 和 CSS 伪元素；正常正文标点、步骤编号、代码及品牌文字不是替换对象。
- 图标继承语义颜色与尺寸 tokens，覆盖明暗主题；纯图标按钮须有可访问名称、键盘焦点和足够触控区域。Radix 负责 headless 交互，Lucide 负责图标，不混用另一套业务图标体系。

## 本机 Gradle 公共缓存约束

- 本机所有项目的 Gradle User Home 统一使用 `~/.gradle`。默认遵循 Gradle 的公共目录；需要显式设置时，只使用 `GRADLE_USER_HOME="$HOME/.gradle"`。普通开发、构建与故障排查不得新建项目专属、仓库内或 `/tmp` 下的 Gradle User Home。
- 此约束仅针对 Gradle User Home；项目自己的 `android/.gradle`、`build`、`.cxx` 等仍是项目本地构建产物，不得将它们混入公共缓存。
- 公共缓存异常时，先检查磁盘空间、活动构建和具体损坏条目，再定点恢复；保留其他项目依赖及公共配置，不自动清空整个公共缓存，也不改用独立缓存绕过问题。现有文档或示例中与本条冲突的本机 Gradle 缓存约定，以本条为准。
