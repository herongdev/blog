# UI 规范

适用于本站主页、博客主题及 `code/apps/` 下各子项目的用户界面。新增和修改 UI 时均须遵守。

## 图标

- **禁止使用字符充当图标。** 不得用 Unicode 箭头、数学符号、字母、Emoji 等替代操作、导航或状态图标，例如用 `↗` 表示外链、`×` 表示关闭、`☰` 表示菜单。
- **必须使用成熟图标库或 UI 组件库提供的图标。** 优先复用子项目已引入的图标库；没有现成依赖时，选择适配当前框架的图标库，如 Lucide、Material Symbols 或对应 UI 库的官方图标组件。
- 同一界面统一图标体系，保持线条粗细、尺寸和视觉风格一致。按需引入，避免仅为单个图标引入整套 UI 库。
- 不得用手写 SVG 路径、CSS 拼图或伪元素中的字符绕过上述规则；库提供的 SVG 图标可以正常使用。
- 纯图标按钮必须提供可访问名称（例如 `aria-label="关闭"`）；仅作装饰的图标使用 `aria-hidden="true"`，动作含义由文字或按钮名称表达。
- 正常正文标点、代码示例及文字品牌标识不属于图标替代；不得借此将操作图标继续写成字符。

### 验收

- 检查模板、JSX 和 CSS `content`，确保没有字符式操作、导航、状态图标。
- 检查图标是否来自选定库，尺寸、对齐和深浅色表现是否一致。
- 检查纯图标按钮的可访问名称和键盘焦点。

## 响应式与 H5

- Astro 主站的适配规则与语义变量位于 `apps/site/src/styles/site.css`，共享项目概念图样式位于 `apps/site/src/styles/project-visuals.css`。VitePress 历史文章和完整兼容站继续使用 `apps/blog/docs/.vitepress/theme/responsive.css`。修改共享 Vue 概念图时须检查两种构建，不通过给整个页面设置 `overflow: hidden` 掩盖布局溢出。
- 支持 320px 起的手机、平板、桌面及超宽屏；首页三列 / 两列切换。宽屏内容最大 1440px，正文沿用阅读宽度，不随屏幕无限拉伸。
- 内容内页在矮屏允许纵向滚动，不裁切信息。首页按用户最新要求一屏展示，采用弹性封面与紧凑双列布局，具体规则见 `homepage.md`。手机横屏菜单自身可滚动。
- 导航和主题按钮至少 44px 触控区域；移动菜单至少 48px 行高，支持 Escape 关闭和键盘焦点。
- 保留刘海、横屏侧边与底部安全区。不能禁用用户缩放。
- 长标题、链接正常换行；代码块和宽表格在自身内部横向滚动，不撑宽页面。
- 修改共享样式后，检查首页、分类、项目详情、文章列表、教程正文、自营产品和关于；覆盖 320、390、600、768、1024、1440、2560px，以及 844×390 横屏。检查深浅色、导航开关、页面溢出和实际截图；浏览器模拟不能代替 iOS/Android 真机验收。

## 项目落地

- 主站 `apps/site/` 使用 Astro 7 + TypeScript 静态生成，Astro 模板图标使用 `@lucide/astro`。主要文字、导航和作品链接保留在初始 HTML；已有 `FieldPreview.vue` / `ProjectVisual.vue` 通过 `@astrojs/vue` 在构建时渲染，只有需要状态的区域加载 Vue 交互岛，当前为首页背景。不要把整个主站改成单页应用或 `client:only`。
- 主站主题与移动导航使用语义化 HTML、原生按钮 / `details` 和少量 JavaScript；Escape 关闭移动菜单后焦点返回入口。主题优先读取 `vitepress-theme-appearance`，兼容 `herong-theme`，切换时同步两者，保留 `auto` 跟随系统。
- VitePress 文章兼容主题继续使用 `lucide-vue-next`，外链、菜单、关闭、主题切换通过组件引用。
- 3D 展示使用 `lucide-react`，HUD 图标在 `HudIcons.tsx` 中集中映射。
- 聊天应用、工具箱沿用已有 `lucide-react`。
- 检查范围包括未挂载的旧组件、移动导航和 CSS 伪元素。图表与地图绘图、品牌标识、正文符号和测试数据不作为操作图标替换。

## 开发工具教程子站：headless UI 约定

本节约束 `code/apps/dev-guides/` 的**公开网站**。公开页面当前使用 **Astro 7 + TypeScript + 静态 HTML + 少量原生 JavaScript**，尚未安装 React 或 UI 组件库。`author/` 写作台是独立的 React 19 + ByteMD 应用，支持本机模式及登录保护的线上模式，并复用本站 tokens；它单独部署，不进入公开教程站点构建。作品主站 `apps/site/` 使用 Astro + 按需 Vue 交互岛，历史文章 `apps/blog/` 保留 VitePress + Vue；它们与本教程公开站是独立应用，不能因共享 Astro 或参考 Vue 官网主题开关的外观，就把教程子站误写成 Vue 项目。本节的 React / Radix 约定保持不变。

- **指定库：Radix Primitives（无样式组件），配 React 19 交互岛。** 出现弹窗、弹出菜单、组合选择、提示气泡等需要焦点管理和键盘交互的组件时，在 Astro 中通过 `@astrojs/react` 按需挂载 React 组件，优先使用 Radix Primitives 的对应原语；不要把整个静态站改造成单页应用。第一次实际使用时再加入依赖，先实现并验证一个真实组件。仅有选型约定不代表当前站点已经集成该库。
- 普通链接、按钮、搜索框、表单标签和简单单选筛选使用语义化 HTML。现有工具筛选的原生 radio 已满足需求，不为满足库覆盖率而替换。需要自绘弹出选单时使用 Radix 的 Select/Popover 等原语，不自行拼接角色、焦点和键盘逻辑。
- Radix 只提供行为和可访问性基础；外观统一引用 `src/styles/tokens.css` 的语义变量，覆盖浅色、深色、悬停、选中、禁用、焦点、触屏和窄屏状态。不要引入 Radix Themes 或另一套视觉主题。Astro 模板的图标沿用 `@lucide/astro`，React 交互岛需要图标时使用同一 Lucide 图标体系。
- React 交互岛只在确有客户端状态的区域使用；教程正文、导航链接和搜索可索引文本保持 Astro 服务端生成的 HTML。组件上线前检查键盘操作、读屏名称、焦点回收、Escape 关闭、触控目标、亮暗主题和 320px 宽度。

选型依据：[Astro 的 React 集成](https://docs.astro.build/en/guides/integrations-guide/react/)支持在 Astro 页面中按需渲染和激活组件；[Radix Primitives](https://www.radix-ui.com/primitives/docs/overview/introduction)提供无样式、可逐步采用的 React 原语。用户提出的 [Zag.js](https://zagjs.com/) 是跨框架的底层状态机，需要自行接线到组件；当前子站以 React 作为未来交互层，因此采用 Radix 作为统一组件接口。
