# 本机云希微课视频

双击 `微课视频.app` 编辑台词、调整停顿并生成视频。也可双击 `生成视频.command` 或 `仅更新画面.command`。面向使用者的一页指南是 [操作说明.png](操作说明.png)，可编辑网页版为 [操作说明.html](操作说明.html)。

## 已固定的运行环境

仅使用本目录 `.venv/bin/python`：本机已安装的 uv 托管 Python 3.12.13。全部已安装依赖、FFmpeg/ffprobe 9.0.1 的具体二进制、字体和哈希记录在 `runtime-lock.json`。启动时核验，不安装、不升级、不搜索全局 Python。`start.command` 仅为完整生成的旧入口别名。`requirements.txt` 保留原始依赖声明，不是启动安装脚本。

云希 `zh-CN-YunxiNeural`，`intro` 开场 −3%，其余场景正文 −5%，pitch +0Hz，volume +0%。原包证据在 `evidence/`，其中网络失败和未生成状态是历史记录。本机真实合成和完整153秒成片已完成。

## 编辑与缓存

当前文稿 `lesson.json`。界面保存会同步 captions 与 cues；停顿为 cue 的 `pause_after_min_seconds`。导入全文按空行拆场景、按句子拆编辑项，不调用模型改写，默认使用中性文字画面。所有保存前的文稿会备份到 `projects/history/`。

原始配音及真实 WordBoundary 保存在 `narration/`，按文本、voice、rate、pitch、volume、客户端版本及生成方法构建缓存身份，音频和词事件均验哈希。粒度是完整语义场景：未改场景零次TTS；改一句重配该场景；改停顿或画面不重配。历史原声归档在 `narration/cache/`。

完整生成：`.venv/bin/python pipeline.py full`。画面更新：`.venv/bin/python pipeline.py render-only`，内部调用 `run.py --render-only`，仅从匹配的真实原声离线重算停顿、字幕和画面；文本不匹配时停止。追加 `--no-open` 可在自动化任务中抑制播放器弹出。

## 输出与失败处理

最终视频 `output/full-course-original-voice.mp4`，字幕 `output/subtitles.srt`，实际时间线 `output/actual-timing.json`。每次在 `output/runs/<run_id>/` 隔离生成并核验，成功后发布；旧成片备份于 `output/history/`。失败保留原文件与本次日志，不写本次success。

本次状态 `output/last-run.json`；最近成功记录 `output/last-success.json`；运行日志在对应 run 的 `run.log`；命令入口日志在 `output/launcher-logs/`。状态记录包含缓存数、实际TTS请求数和进程来源，不输出环境秘密。`verify_delivery.py` 独立校验全部原文、真实词事件、原始PCM及主轨拼接、MP4音视频与时长。自动核验不代表完整听审。

## 本地软件与MCP

原生AppKit/WKWebView外壳位于 `app/main.swift`，本机服务 `app_server.py` 仅监听127.0.0.1随机端口；共享操作 `course_service.py`。界面没有收费插件、CDN、模型API或新依赖。首次用系统文件夹选择器授权当前工程，bookmark、启动日志和会话保存在 `~/Library/Application Support/LocalCourseVideo/`，不要求全盘访问。

[MCP接入说明](integrations/MCP说明.md)；当前仓库项目级 `.codex/config.toml` 已配置 `course_video`，全局配置未改。2026-11-10 已在当前本机聊天实际调用读取、精确修改、生成和状态查询：第一句后最少停顿改为2秒，9场景缓存复用、0TTS，生成154.25秒新成片。实际调用与独立核验证据见 `output/qa/mcp-chat-acceptance/`。这是当前本机聊天的连接验收，其他客户端需分别检查连接状态。官方范围：[本机MCP接入](https://learn.chatgpt.com/docs/extend/mcp)。

## 验收记录

`output/qa/entrypoint-validation.json`：入口、停顿、失败保留、并发、取消。
`output/qa/editor-workflow-validation.json`：全文导入与真实配音、界面停顿保存及恢复。
`output/qa/mcp-smoke-test.json`：真实STDIO握手与读取。
`output/qa/editor-http-validation.json`：本机请求与MP4分段播放。

普通Terminal验收与本机原生菜单生成结果以最终 `output/qa/local-app-delivery.json` 为准，不用Codex内命令测试冒充。

本机原生软件已完成完整生成与仅更新画面的真实测试，9/9场景复用、零TTS，进程来源为应用→Python→pipeline→FFmpeg，不含Codex。浅/深主题、跨随机端口重开持久化、视频播放与全文导入界面已实测。普通Terminal尚待用户双击验证，因原生控制工具拒绝操作Terminal；不将前述测试冒充该项通过。工程及其.venv请保留原位置。
