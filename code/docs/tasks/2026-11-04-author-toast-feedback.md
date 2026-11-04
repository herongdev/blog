# 写作台顶部轻提示

日期：2026-11-04，Asia/Shanghai。

用户指出排期成功提示插在正文导致页面下移，要求检查写作台全部同类反馈并统一处理。

## 参考和实现

实际查看 [Semi 官方 Toast 结构截图](https://semi.design/design/zh-CN/feedback/toast)（官方 Toast00.png），并核对 [Ant Design Message](https://ant.design/components/message/) 顶部中央、自动消失的场景与 [Radix Toast](https://www.radix-ui.com/primitives/docs/components/toast) 交互。保留当前明暗主题、语义 token、Lucide 与 Radix，不引入另一套视觉主题。

- 新增共享 `AuthorToastProvider` / `useToast()`，固定顶部中央，不占页面高度。普通 5 秒、超过 50 字 7 秒；最多 3 条，支持手动关闭、悬停/聚焦/窗口失焦暂停、F8、滑动关闭及减少动态效果。
- 锁定 `@radix-ui/react-toast@1.3.1`；核对与既有 Dialog/Select 使用相同 DismissableLayer 模块，避免提示关闭被业务弹窗当作外部点击。
- 迁移 App、ScheduleBoard、ContentWorkspace、PublishingCenter、FilmingPanel 五处流式成功提示。覆盖文章保存、目录和排期、拍摄准备、素材上传、账号及发布草稿等反馈。
- 目录操作只由父层报告，自动归类不多报；预览完成按本次 previewId 和 job.id 去重，拒绝旧任务误报。恢复本窗口准备只在首次进入拍摄页后提示；批量图片上传只在整批完成后反馈一次。
- 正在生成预览/准备成片/发布使用信息型短提示；任务进度和正式结果仍保留在业务区域。错误、字段校验、版本冲突、未保存、上传暂停/重试、二维码/验证码和发布证据保留原位。
- 公开教程站未发现同类操作成功横幅，搜索结果数量及线索说明属于持续内容，保持原样。

## 验证

165 项现有回归通过，类型检查、Vite 构建、diff-check 通过。Provider/Consumer SSR smoke、缺 Provider 检查、Radix 模块身份及 frozen lockfile 安装检查通过。独立只读复核五处迁移及重复通知处理通过。

Edge 原生控制在既有窗口内尝试打开新标签，连续遇到“用户改变窗口”、超时和跨窗口状态切换，未完成最终视觉或布局位移测量；静态 fixed 布局和自动测试不冒充浏览器验收。

## 发布

已上线 `20261104T151650Z`，来源包 SHA256 `e3a89a7c4aaaa8b69848ddcee8359e85d51d3b037ed0217bc8a9bb791a834748`，上一版 `20261104T140757Z`。停写一致备份 `20261104T152031Z.tar.gz`，执行和数据摘要回执位于 `/var/backups/herong-dev-guides-author/20261104T151650Z-toast/`。165 个项目文件、认证、环境配置和公开站/执行器链接保持原样；没有数据迁移或文章/视频投稿。

停写前按实际状态确认无 queued/running/waiting_user 的投稿目标或账号登录操作。已失败的历史登录记录不视为活动任务，也不清理历史记录。代码回滚只切回上一作者 release 并重启本服务，保留当前私有数据，不恢复旧队列或覆盖后续编辑。
