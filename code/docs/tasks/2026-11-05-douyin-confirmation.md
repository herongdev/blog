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

用户随后明确选择继续修全自动、继续排查服务器网页登录。没有创建开放平台应用或提交申请。

## 重新核对原开源应用与实际 2046 响应

用户要求检查开源应用完整实现，已核对 fork 当前主线及本地锁定投影。原 Web 链路为 `AccountManagement.vue connectSSE` → `sau_backend.py /login` → `myUtils/login.py douyin_cookie_gen`；我们的接入调用 `uploader/douyin_uploader/main.py douyin_setup`。前者使用 Playwright、支持本地浏览器路径和额外启动参数；后者使用 Patchright。原示例配置同样默认无头，不能把“原版有头、接入无头”作为已证结论。源码见 [Web 登录实现](https://github.com/herongxhr-netizen/social-auto-upload/blob/main/myUtils/login.py) 和 [uploader 实现](https://github.com/herongxhr-netizen/social-auto-upload/blob/main/uploader/douyin_uploader/main.py)。

原 Web 使用 SSE 推送二维码与结果，我们使用持久化状态及网页轮询；传输方式差异没有解释本次确认后停住。生产会话 `22055070-8023-4d5e-a8e2-22143a2761f9` 的页面原生轮询实际依次返回 `new`（16.2 秒）、`scanned`（29.6 秒）、`error_code=2046`（31.1 秒），均 HTTP 200；仍无 sessionid。因此服务器确实收到已扫码，不能再归咎用户没有扫码或没有确认。

对匿名官网登录页加载的官方 `lf-fe-creator.douyinstatic.com` 公共 JS 检查确认：响应中存在 `verify_center_decision_conf` / `verify_center_secondary_decision_conf` 时进入官方验证组件，2046 可携带 `sms_code_key`。这说明应检查额外验证，不能把 2046 一律当成终态拒绝、改发成功或仅延长轮询。上游 [issue 124](https://github.com/dreammis/social-auto-upload/issues/124) 的作者示例也通过正常页面的“身份验证”→“接收短信验证”→用户验证码→“验证”完成该步骤；[issue 224](https://github.com/dreammis/social-auto-upload/issues/224) 是同类失败报告，不作为本次根因的独立证明。

锁定 uploader 的登录等待函数只提示去弹出的浏览器完成验证；短信读取/提交函数没有接入登录路径。服务器无头执行时，用户无法操作这一步。现在新增 `login_verification.py`，在页面原生响应明确要求验证后，仅处理可信抖音页面或可见同域 iframe 中真实身份验证控件，借用既有后台 challenge/control 通道收取短信验证码。只做正常 DOM 点击与填写，不调用额外私有认证接口、不自动重发短信、不处理绕过验证。验证码提交后等待原始成功检查，不以表单已提交推断登录成功；最多三次用户验证码尝试，出现明确错误才再次索取。

验证期间持有原浏览器并阻止旧二维码轮询继续刷新；迟到 QR 状态不能覆盖验证阶段。前端优先显示验证码表单，终态后恢复重新登录入口。未知验证方式返回受控 `LOGIN_VERIFICATION_REQUIRED`，失败仍是 `auth_status=unknown`，不声称账号失效；没有放宽真实成功检查或会话文件校验。

## 当前版本与验证范围

- 作者 release `20261105T075037Z`，源码包 SHA-256 `7973013888e9cfc37d8b98b729568e5e0663bb34e3131e59cc7585eaeadbcd78`；上一版 `20261105T034159Z`。
- 当前执行器 `20261105T082306Z-douyin-verification-scope`，源码包 SHA-256 `b416139002daccd9528f4add04628236666c7bbcc40732b81b3faa17df779c61`；上一版 `20261105T075037Z-douyin-verification`（源码包 `3ac13a1f7031d976497815a0c0e25c6afe18d40f519501d6334bfe9f2e42ad98`）。后续复核补齐两项边界：2046 状态不被其他错误覆盖，未知验证码组件结构不退回整页输入框；对应真实 DOM fixture 再次通过。此前已上线受控的页面原生轮询观测，以及八分钟交互窗口；观测只保留固定状态、数字错误码和布尔字段，私有侧文件至多 12 个变化，不保存响应正文、二维码 token 或凭据。
- 停写一致备份 `/var/backups/herong-dev-guides-author/20261105T080316Z.tar.gz`；回执 `/var/backups/herong-dev-guides-author/20261105T075037Z-douyin-verification/`。166 个项目文件、微信认证、配置与公开站链接不变；服务和备份 timer active，TasksMax 512、MemoryMax 2 GiB 保持原样。
- 上述执行器边界补强另有停写备份 `20261105T082511Z.tar.gz` 与回执 `/var/backups/herong-dev-guides-author/20261105T075037Z-douyin-verification-scope/`；作者版本未再切换，166 个项目文件、认证、配置及公开站仍不变。
- 没有修改依赖或 SAU 补丁；作者 Node 依赖经全部包清单与锁文件一致性校验后，复用上一版不可变依赖目录。执行器复用已核验 `.venv` 与 `.vendor`。这些被引用的旧 release 不可清理或原地重装。
- 完整 Python 测试通过 88 项（使用已锁定虚拟环境及完整审查投影），覆盖真实 2046 分类、短信桥接、取消、未知验证、成功优先与防止重复提交。新增真实子进程的登录短信控制回归后，Node 完整 202 项通过；类型检查与生产构建通过。
- 服务器既有执行组件在隔离无账号的真实浏览器 DOM fixture 中完成验证输入、正常提交与第二 tick 不重复索码，普通登录验证码框保持空白。初版 fixture 缺 UTF-8 声明导致中文选择器不匹配，补正 fixture 编码后，同一候选代码通过；这不等于真实抖音账号已验收。
- 公网新前端 HTML 200，未授权文章与发布账号 API 401。只在既有 Edge 窗口新开标签，已看见发布中心主界面；手机确认后的真实验证表单、会话保存与成功关窗仍待用户本次账号结果，不声称已通过完整视觉或真实账号验收。
- 为完成备份与代码切换，清理了 root 的可重下载 pip HTTP 缓存（189 个文件，约 173.5 MB）和系统 DNF 仓库元数据缓存（52 个文件）；已安装依赖不变，没有删除文章、账号、历史备份或旧发布版本。最终剩余 753,049,600 字节（约 718 MiB），仍需留意现有 512 MiB 视频上传保留空间；本次没有降低应用上传保护。
