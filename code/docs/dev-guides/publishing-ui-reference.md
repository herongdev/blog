# 发布中心界面参考与验收

日期：2026-11-02。开发前已查看可核验的 YouTube Studio 实际截图。

## 参考

- 产品与场景：YouTube Studio 桌面端「上传视频 → 详情 → 检查 → 可见性」。
- 当前官方流程依据：[Upload YouTube videos](https://support.google.com/youtube/answer/57407)。
- 截图证据：[UA Pulaski Technical College 教学 PDF](https://mediaserver.uaptc.edu/content/accessibility/Captioning-Videos-in-YouTube.pdf)，第 1 页的上传与详情界面、第 2 页的检查与确认界面。教学截图为历史界面参考，不声称它与当前每个像素相同。
- 已在实现前下载 PDF 至临时目录并渲染第 1 页，实际查看了其上传空状态和详情截图。详情截图展示左侧标题/简介/缩略图表单、右侧视频预览与文件名、底部主操作；不是只读取文字后凭印象设计。

## 本项目采用的结构

1. 复用写作台外壳，发布中心提供「新建发布 / 账号 / 发布记录」三个业务入口。
2. 编辑页连续纵向表单表达素材、通用内容、目标账号的先后关系；桌面右侧显示视频预览和文件元数据，窄屏回到单列。
3. 每个目标按需展开独立编辑，继承与覆盖有明确文字。预检查后展示最终目标快照，确认按钮才向平台提交。
4. 账号和记录采用行列表；状态文字优先，未取得作品链接不补造链接，二维码只使用受保护接口。
5. 参考信息结构，保留项目语义 token、明暗主题、Lucide 图标与 Radix 弹窗。没有照搬 YouTube 的品牌颜色、业务字段或示例内容。

## 验收边界

代码类型检查、实际浏览器截图验收、真实平台投稿验证分别记录。自动化或 fake adapter 不构成真实平台投稿成功；浏览器窄屏不构成手机真机验收。

## 2026-11-02 实际浏览器验收

- 使用独立本地数据目录与真实宿主服务 `http://127.0.0.1:4349/`，未配置投稿执行器。没有连接真实平台账号，也没有触发平台发布。
- 通过页面文件选择器上传 1 秒 MP4 验收视频，预览显示真实文件名、大小、时长和分辨率。
- 页面新增两个隔离账号记录（抖音、小红书），选择两个目标，小红书独立标题和原创来源、抖音继承通用文案；保存草稿后只有一条双目标记录。
- 预检查明确显示服务未就绪和两个账号未登录，未出现可执行的“确认并发布”按钮。最终预览中的两个标题和来源不同且正确。
- 标签页切换与浏览器刷新后，视频、标题、简介、话题、目标勾选及覆盖关系保留；重新预检查复用原草稿，没有新建重复记录。
- 1440 × 1000 浅色桌面、390 × 844 浅色手机宽度、320 × 740 深色窄屏均查看实际渲染；320 下 `scrollWidth === clientWidth === 320`。窄屏账号别名、状态和操作按钮正常换行。
- 按实际截图修复窄屏刷新按钮折行；预检查完成自动滚动至结果，不让用户在长表单里寻找错误。主工作区导航的 320 宽度折行由宿主集成同步修复。
- 浏览器捕获的应用 error 日志为空。二维码、人工挑战和人工核对弹窗的真实平台触发依赖后续账号验收，未把它们标为真实平台通过。

代表性截图（相对 `code/`）：

- `output/playwright/publishing/desktop-top-final.jpg`：桌面首屏，右侧视频预览。
- `output/playwright/publishing/desktop-records.jpg`：草稿与双目标记录。
- `output/playwright/publishing/mobile-light.jpg`：手机浅色完整页。
- `output/playwright/publishing/mobile-320-top-dark.jpg`：320 暗色首屏。
- `output/playwright/publishing/mobile-320-accounts-dark.jpg`：320 暗色账号行。
- `output/playwright/publishing/mobile-320-precheck-dark.jpg`：320 暗色预检查与操作条。

完整长页截图会固定捕获当时 sticky 预览与操作条的位置；桌面首屏布局以 `desktop-top-final.jpg` 为准。以上都是浏览器验收，不是手机真机验收。

### 最终执行器配置后的复验

同日使用 Playwright CLI 对最终后端与真实 Python 执行器配置再次只读验收（原 IAB 临时会话已回收）。页面不再显示“发布服务尚未就绪”，两个隔离账号和原双目标草稿仍存在，账号扫码与检查按钮按能力启用。本次没有点击扫码、检查、预检查或确认发布。

- `output/playwright/publishing/desktop-ready-records.jpg`：1440 × 1000 浅色记录界面，最终服务就绪状态。
- `output/playwright/publishing/mobile-320-ready-accounts-dark.jpg`：320 × 740 暗色账号页面。
- 本地模式启动时的原 `/api/auth/session` 404 已由宿主修复；最终浏览器控制台 **0 errors / 0 warnings**。
- 新建账号的平台选择不再受执行器就绪状态过滤，未配置执行器时仍可登记账号、准备素材和保存草稿；仅登录、检查和投稿依赖实际执行能力。
