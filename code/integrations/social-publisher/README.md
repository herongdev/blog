# 社交视频执行器

本模块在宿主既有管理员后台内提供真实 Python 投稿能力。宿主负责素材 ID、权限、SQLite 持久队列、互斥与提交授权；执行器单次运行一个操作。没有第二套 Web 后台，没有后台自动发表样例视频。

## 依赖与初始化

使用 Python 3.12 和 `uv`。在本目录运行：

```sh
uv run --python 3.12 --no-project setup.py
```

初始化克隆用户的 `herongxhr-netizen/social-auto-upload` fork，检出 `fork-lock.json` 的基线，应用 `patches/0001-safe-publishing-integration.patch`，按 `requirements.lock` 安装依赖。既有 checkout 如果含未知改动会停止，避免覆盖。安装不登录账号、不执行投稿。支持标准 `HTTPS_PROXY`；不要将代理凭据写入 Git。

浏览器固定为 Patchright 1.58.2 对应的 Chromium，优先安装在显式配置的 `PLAYWRIGHT_BROWSERS_PATH`，未配置时独立安装在 `.vendor/browsers`；安装设置 `PLAYWRIGHT_SKIP_BROWSER_GC=1`，不清理其他工程浏览器缓存。Linux 首次部署需由运维安装 Chromium 所需系统库。`python -m patchright install-deps chromium` 使用 apt，仅适用于其支持的 Debian/Ubuntu 系统；CentOS Stream 9 使用 dnf 核对实际缺失的共享库，包含 OpenCV 所需的 `mesa-libGL`，再实际启动完整 Chromium 与 headless-shell 验证。

生产 systemd 若配置 ProtectHome，Python 解释器不能引用 `/root/.local`。初始化前设置 `UV_PYTHON_INSTALL_DIR=/opt/herong-social-publisher/python`，确保宿主服务用户可以读取和执行解释器、fork、虚拟环境与浏览器依赖。也可以使用已安装的 `/usr/bin/python3.12` 创建独立虚拟环境。浏览器随 `/opt` 下的执行器版本部署，不能放进作者数据目录：宿主安装器会将私有数据文件统一设为 0600。root 安装的 biliup 默认 0700，生产需明确设置为 `root:dev-guides-author`、0750。私有会话目录仍仅授权宿主用户。

B站二进制固定官方 biliup v1.3.4，各系统下载 URL 与发布方 SHA256 见 `fork-lock.json`。初始化核对下载摘要，运行再核对本地二进制摘要，任务执行中不访问 latest 或自动升级。保留 fork/LICENSE 与 biliup 的 THIRD-PARTY-NOTICES。主线 uv.lock 尚未列入当前 pyproject 的 tinycss2；本模块将这部分及 webencodings 另行精确锁定，其他运行依赖沿用基线 uv.lock。

Linux 生产视频探测工具锁定在 `linux-runtime-lock.json`。本次 CentOS 的系统 `ffmpeg-free` 不能解析 H.264 MP4，生产使用锁中指定的完整静态构建：核对归档 SHA256 后，将归档顶层目录内容解压至执行器的 `.vendor/ffmpeg/`，保留 `LICENSE.txt`，设置 `PUBLISHER_FFPROBE=/opt/herong-social-publisher/current/.vendor/ffmpeg/bin/ffprobe`。不替换系统 FFmpeg 或其他服务的库；上线验收必须用真实 H.264 文件，不能只运行 `ffprobe -version`。

宿主必要配置（使用绝对路径）：

```sh
PUBLISHER_PYTHON=/absolute/blog/code/integrations/social-publisher/.venv/bin/python
PUBLISHER_RUNNER=/absolute/blog/code/integrations/social-publisher/runner.py
PUBLISHER_SAU_ROOT=/absolute/blog/code/integrations/social-publisher/.vendor/social-auto-upload
PUBLISHER_DATA_DIR=/absolute/private/publishing
PLAYWRIGHT_BROWSERS_PATH=/absolute/blog/code/integrations/social-publisher/.vendor/browsers
```

runner 单独运行时 `PUBLISHER_SAU_ROOT` 可省略，默认模块的 `.vendor/social-auto-upload`；宿主生产配置要求显式设置。`PLAYWRIGHT_BROWSERS_PATH` 可省略，runner 默认本模块私有浏览器目录。宿主的 `PUBLISHER_DATA_DIR` 是私有根；每次请求的 `data_dir` 是该根下面单独的 `runtime/<操作ID>`。账号文件固定由宿主解析为 `accounts/<内部账号ID>.json`。所有这些路径均不能来自普通网页输入。Cookie、二维码、验证码和视频私有目录不能映射为公开静态资源。

账号 storage_state 先写同目录临时文件，再原子替换，权限 0600。二维码保存在本次 runtime，执行结束清理；验证码仅在对应 challenge 中存活，不写日志、文件或历史。首次登录不会继承日常 Chrome 会话。服务器上的浏览器使用服务器网络，Mac 验证不能代表服务器验证。

## B站本地登录

先在后台创建 B站账号，复制其内部账号 ID，然后由账号本人在执行节点的交互终端运行：

```sh
export PUBLISHER_DATA_DIR=/absolute/private/publishing
.venv/bin/python local_login.py --account-id BACKEND_ACCOUNT_ID
```

脚本仅在本人扫码登录成功后原子替换该 ID 的会话，不投稿。返回后台执行“检查会话”。脚本通过宿主同一个 SQLite executor 行占用执行槽，验证账号归属 B站，并在登录期间续租；槽已占用或存在未停止任务时拒绝启动，子进程停止后才释放。没有 Web 扫码桥接。

## 事件协议

进程 stdin 首行是一个 JSON 请求，operation 为 `login/check/publish`。字段与宿主实现一致：`platform`、`account_id`、`account_file`、`data_dir`、`session_id/target_id/attempt_id`；投稿增加 `video_file`、`cover_file`、`title/description/tags` 与 `platform_options`。兼容 `video_path/cover_path` 以及 `content` 包裹。平台标识为 `douyin/xiaohongshu/tencent/bilibili`。

stdout 仅逐行 JSON，事件有严格递增 `seq`、UTC `at` 和请求身份。事件包括 `stage/qrcode/challenge/before_submit/result/heartbeat`；普通日志走 stderr 并移除私有路径。健康检查请求只需 `{"operation":"health"}`，验证补丁文件摘要、Python 入口和浏览器可执行文件，不登录、不启动浏览器；成功返回 `status:ready, protocol_version:1, platforms:[...]`。

执行器发出 `before_submit{request_id}`，等待 stdin `submit_authorized{request_id,authorized:true}`。宿主必须先在同一事务中核对活动尝试、租约、执行代次、取消标记并记录提交意图。拒绝或超时不能点击发布。点击发生后只核查证据，不重复点击。控制连接丢失导致授权不确定时按结果待核实处理。

人工验证发出 `challenge{challenge_id,kind,message,expires_at,image_path?}`，响应为 `challenge_response{challenge_id,value}`。短信 kind 为 `sms`；视频号管理员验证为 `qrcode`，扫码后用户点“已完成”仅唤醒核对，随后仍等待真实平台验证完成。过期或类型/ID 不匹配的响应无效。二维码不是验证码已通过的证明。

宿主必须以独立进程组启动，在取消/超时时停止整个进程组并等待 close，然后确定可重试状态。runner 会处理 SIGTERM/SIGINT、关闭控制管道和清理临时二维码；B站子进程超时先 terminate 再 kill。runner 退出码不能作为投稿成功依据。

## 接入能力与限制

| 平台 | 已接入能力 | 明确限制 |
|---|---|---|
| 抖音 | 扫码、会话检查、视频、标题/简介/话题、竖封面、显式 AI 声明、短信挑战 | 没有通用原创/转载声明接口；不默认声明 AI；平台额外滑块等验证仍可能需执行节点人工处理 |
| 小红书 | 扫码、会话检查、视频、标题/简介/话题、封面、明确选择的转载及来源 | 标题最多20字符、话题最多10个；原创不会选择转载；未接 AI 声明 |
| 视频号 | 扫码、会话检查、视频、文案/话题、3:4 竖封面、显式 AI 声明、管理员验证 | 通用标题进入正文，短标题不自动截断/补造；尚未提供独立短标题编辑；4:3横封面本期未开放 |
| B站 | 本地登录后会话检查、视频、标题/简介/标签、封面、分区、原创/转载与来源 | 尚无Web扫码；CLI没有统一受理结果，投稿命令结束后保守显示“结果待核实”，用户核对实际作品 |

抖音/视频号只在实际页面出现新的成功提示时记录平台受理；小红书还接受其明确的投稿成功页面。跳离创建页、按钮消失、退出码0、日志“成功”均不足以认定受理。受理与公开上线/审核通过分开，未取得真实作品 ID/URL 时返回空。

标题、话题、封面和声明先校验；指定字段不能设置时终止，不能改用其他已确认内容。提交后超时、断开或无受理证据一律待核实。B站调用整个 upload 命令前即记提交意图，原因是 biliup 不提供实际点击点回调。这是保守防重复，不能保证第三方端到端 exactly-once。

## 验证与维护

```sh
.venv/bin/python -m unittest discover -s tests -v
printf '%s\n' '{"operation":"health"}' | .venv/bin/python runner.py
```

测试使用临时文件与本地 HTML 页面，阻断浏览器所有网络请求；覆盖拒绝授权不点击、提交失联不重发、真实可见受理证据、声明默认值、指定封面失败、挑战类型隔离和原子会话写入。不会使用真实账号或发表作品。四个平台真实登录、会话复用、封面与受理证据均须由用户实际操作后逐项记录，目前未实测。

fork 初始修改保存为本地 `codex/publishing-integration` 提交及可追踪 patch，没有推送。`fork-lock.json` 中 `patched_sha` 保留原补丁提交的历史身份；当前 patch 另包含 2026-11-04 的静态资源路径修正，完整实现以 8 个 `patched_files` 摘要为准，不能将原提交号误称为本次新增修正的提交。初始化允许对已验证的原 7 文件版本补上这一修正；任何未知提交或补丁范围外的 tracked 改动仍会停止，不覆盖。升级上游前重查各真实发布点、声明和封面行为，更新 fixture、重新导出 patch 与摘要，并重新验证；不要直接更新依赖到 main。
