# 抖音手机确认后的结果识别

日期：2026-11-05（Asia/Shanghai）。用户明确手机已点确认登录，网页仍无反应。本轮正在定位确认后到保存会话的卡点，不能再推断用户未点确认。

## 已确认并修复

- 前端原先收到成功终态也不关弹窗、不提示成功；现仅在当前登录操作同时返回成功终态、`auth_status=valid` 且无错误码时关闭弹窗、清旧错误并提示一次“账号已连接”。
- 登录状态轮询与作品请求分开；恢复页面焦点立即查询。账号单独刷新，素材或作品接口故障不阻断账号状态。旧会话及旧操作响应仍不能关闭新弹窗。
- 现有执行器在手机确认后仍可能超时且未保存文件，原因尚不能由结果记录确定。新增只读观测包装，保持原判定原样返回，并在退出时恢复原函数；每次采集最多两秒、三个已存在页面、每类八个标记，不创建页面或改变登录状态。
- 观测只含固定路由类别、布尔状态和数量，变化时发送。Node 严格白名单只存最后一份，额外字段和越界值拒收，公开会话 API 删除该字段。不记录 Cookie 值、二维码内容、完整 URL、页面正文或原始异常。

## 验证与上线

- 201 项 Node、59 项选择性 Python 离线测试通过，类型检查与构建通过。Python 覆盖观测脱敏、范围、超时、异常不改变判定、包装恢复；Node 覆盖合法事件、拒绝原始字段、内部存储及 API 隐藏。尚未把真实成功判定改成 Cookie 或 URL 单项通过。
- 作者 release `20261105T034159Z`，源码包 SHA-256 `1206c3494b83f4e8b26f6ee8ba14255adfcb1ed374ff357e50708aa0c5eaf51e`；上版 `20261105T022731Z`。
- 执行器 release `20261105T034253Z-douyin-confirm`，源码包 SHA-256 `db27e68f0a6b06bde20e9de25abfbb7725bd07f57058049df66be77c74b5f819`；上版 `20261105T023853Z-douyin-qr`。SAU 补丁及依赖锁没有变；旧只读运行依赖继续保留。
- 停写备份 `20261105T034351Z.tar.gz`，回执 `/var/backups/herong-dev-guides-author/20261105T034159Z-douyin-confirm/`。服务与备份 timer active，165 个项目文件、认证、环境配置及公开站保持原样。
- 一个未激活候选因新增测试调用名称错误已丢弃，测试修正并全通过后重新准备以上版本；没有修改或清理已运行版本。
- 已请用户刷新后台，再扫码并确认一次以获取实际状态。真实登录、会话保存和成功自动关闭仍待该次结果验收；没有自动提交作品。

## 采集时限修正

第一次真实确认后的观测返回 `observationUnavailable=true`，没有可用于判断的页面状态。独立公开登录页诊断复现串行状态读取约 3.53 秒，超过两秒预算。将相互独立的状态读取并行后，同等服务器条件约 0.94 秒完成，字段不变；59 项 Python 离线测试再次通过。没有把该采集失败当作用户未确认或平台未登录的证据。

仅执行器切到 `20261105T035356Z-douyin-confirm-fast`，源码包 SHA-256 `052e10c20ad8a13ab4faf2ba4b1cc5755f16b100c6b9658d314c32542b467e1e`，作者代码仍为 `20261105T034159Z`。停写备份 `20261105T035835Z.tar.gz`，回执 `/var/backups/herong-dev-guides-author/20261105T034159Z-douyin-confirm-fast/`，165 个项目文件、认证、配置、公开站及作者代码链接不变。已说明需再次扫码获取实际确认后状态，等待结果。

## 实际确认后结果与首期范围

用户再次明确手机已扫码确认，网页仍无反应，并提供 `signal timed out` 截图。有效观测显示：一个页面仍为 `creator_root`、`hasSessionCookie=false`、可见登录标记仍存在、未识别到扫码确认文字或验证码阻断、没有已登录的发布控件。普通登录页的验证码输入为可见，不能单凭该输入推断已进入额外验证。没有足够证据判断抖音未收到手机确认，也不能将浏览器内无会话与网页查询超时混为同一个故障。

现有链路是服务器浏览器检查平台页面、后台持久化结果、网页每 3.5 秒查询；不是官方 OAuth 回调，增加 WebSocket 本身不能补上平台到浏览器的缺口。成功提示代码已上线，但尚无真实有效登录结果来完成成功关窗验收。

用户希望首期功能精简并考虑官方 API，明确尚未申请应用、主体为个体工商户。核对官方公开资料：

- [上传 API](https://developer.open-douyin.com/docs/resource/zh-CN/dop/develop/openapi/video-management/douyin/create-video/upload-video) 与 [创建视频 API](https://partner.open-douyin.com/docs/resource/zh-CN/dop/develop/openapi/video-management/douyin/create-video/video-create) 要求申请 `video.create.bind` 并取得用户授权。
- [SDK/H5 投稿规范](https://partner.open-douyin.com/docs/resource/zh-CN/dop/operation-standard/platform-capabilities/useclue) 明确不再向个体工商户开放这两类投稿能力；不能将其准入与所有 OpenAPI 混为一谈。
- [代发布公开准入说明](https://developer.open-douyin.com/forum/question/post/653f50669f388ddfd97beb4a) 列企业、党政机关、事业单位、正式网站应用及对应业务场景，未列个体工商户。该说明属于官方公开问答，不能据此承诺个体申请一定成功，需以实际准入和审核为准。

已询问首期选择半自动发布（整理视频文案、到平台本人确认）或继续排查全自动网页登录。尚未取得范围取舍答复前，不将原自动发布功能悄悄替换成手工流程，不宣称登录故障已解决，也没有创建开放平台应用或提交申请。
