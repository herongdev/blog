# 让 ChatGPT 或 Codex 协作编辑这门课

本地软件和两个 `.command` 无需启动 Codex 即可使用。MCP 是另一个可选入口：让已连接的助手读取台词、按你的要求改停顿并启动同一套本机生成流程。它不调用模型 API，不安装依赖，不选择其他音色。

## 当前本机聊天已完成真实调用验收

2026-11-10 已在当前本机聊天通过注册的 `course_video` MCP 工具实际执行：读取工程 → 第一场景 `intro` 第一句后停顿由 0.75 秒改为 2 秒 → `render-only` 生成 → 查询本次任务直至成功。不是在终端模拟 MCP 调用。

本次 run：`20261110-100931-9d85dd0a`。9 个场景均复用缓存，TTS 请求为 0，未新增付费或模型 API。成片 154.25 秒，音轨 154.228083 秒；27 个原始配音/词事件/PCM 文件哈希不变，主音轨只增加 1.25 秒停顿。原文、字幕、词事件和完整解码检查通过。

实际调用证据：[registered-mcp-proof.json](../output/qa/mcp-chat-acceptance/registered-mcp-proof.json)；独立核验：[independent-verification.json](../output/qa/mcp-chat-acceptance/independent-verification.json)。当前工程第一句后停顿保持为用户要求的 2 秒。

在这个已连接的本机聊天里，可以直接说：

> 把第一句后的停顿改成 2 秒，再生成视频。

助手先读取当前版本，携带真实 revision 精确修改，再复用原声生成并核对新任务结果。若数值已经相同，无需重复保存；仍可按要求重建画面。下面的手动配置仅供重装或另一个客户端使用，无需在本工程重复添加服务器。本机当前连接成功不代表 ChatGPT 网页端或其他设备也已连接。

## 连接这台 Mac 的桌面客户端

按官方文档，支持本机 MCP 的 ChatGPT 桌面端、Codex CLI 和 IDE 共用同一主机的 MCP 配置。在桌面端打开 **设置 → MCP servers → Add server**，选择 **STDIO**，填写：

| 字段 | 内容 |
| --- | --- |
| 名称 | `yunxi-course-local` |
| Command | `/Users/ronnie/Documents/my-project/blog/code/integrations/edge-tts-course/.venv/bin/python` |
| Arguments | `/Users/ronnie/Documents/my-project/blog/code/integrations/edge-tts-course/mcp_server.py` |
| Working directory（如有） | `/Users/ronnie/Documents/my-project/blog/code/integrations/edge-tts-course` |

保存后按客户端的 **Restart** 重新连接。界面或账号未提供这个设置时，不代表此服务器已经接入；以客户端实际显示的连接状态和可调用工具为准。当前工程已通过项目级 `course_video` 配置完成上述本机聊天实测；全局配置未改。[官方本机 MCP 设置说明](https://learn.chatgpt.com/docs/extend/mcp#connect-an-existing-mcp-server)

支持 `mcpServers` JSON 的客户端可参考同目录 `mcp-config.example.json`。Codex 的 TOML 等价配置为：

```toml
[mcp_servers.yunxi-course-local]
command = "/Users/ronnie/Documents/my-project/blog/code/integrations/edge-tts-course/.venv/bin/python"
args = ["/Users/ronnie/Documents/my-project/blog/code/integrations/edge-tts-course/mcp_server.py"]
cwd = "/Users/ronnie/Documents/my-project/blog/code/integrations/edge-tts-course"
```

## 连接后可以怎么说

> 读取当前课程，把第二道练习题后面的思考停顿改为 3 秒，其他台词和声音保持不变，然后生成视频，检查本次任务是否成功，把成片路径给我。

工具包括读取课程、列出画面模板、修改指定台词和停顿、导入完整文本、生成视频、查看生成结果。读取返回当前 `revision`，写入必须携带该值；若你同时在本地界面改稿，旧版本写入会停止，助手应重新读取，不能覆盖你的新修改。

`full` 仅为修改或缺少有效缓存的语义段请求微软云希配音。**同一个场景内改一句，会重配该完整场景**以保留连贯语气，其余场景复用原始语音；不是把每个字幕短句分别合成再拼接。仅改停顿时不请求语音服务，原始声音和词边界保留。`render-only` 只使用有效的已有语音，不请求语音服务；改了台词却没有对应新语音时会停止。生成是异步任务，助手需要继续查询结果，不能看见旧 MP4 就称本次已成功。

## ChatGPT 网页端的边界

ChatGPT 网页端不读取这台 Mac 的本地 Codex 配置。官方网页插件接入使用远程 MCP；本工程没有配置远程托管、公开端口、隧道或账号授权，因此不能宣称已在 ChatGPT 网页端连接完成。当前本机 STDIO 入口供支持本地执行的桌面客户端使用。[官方网页与本机接入范围](https://learn.chatgpt.com/docs/extend/mcp#use-mcp-backed-tools-in-chatgpt-web)

## 本机验收记录

协议实现使用 Python 标准库，遵循 MCP 的 UTF-8、逐行 JSON-RPC STDIO、初始化和 tools 能力，不额外安装 MCP SDK。`output/qa/mcp-smoke-test.json` 是先前本地子进程的握手与读取验收；当前聊天的真实修改、生成和结果查询证据在 `output/qa/mcp-chat-acceptance/`，两类证据分别保存。

协议依据：[STDIO 传输](https://modelcontextprotocol.io/specification/2025-11-25/basic/transports#stdio)、[初始化](https://modelcontextprotocol.io/specification/2025-11-25/basic/lifecycle)、[工具调用](https://modelcontextprotocol.io/specification/2025-11-25/server/tools)。
