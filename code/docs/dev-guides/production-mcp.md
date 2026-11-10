# 微课制作：ChatGPT MCP 连接

本模块是现有写作台业务服务的适配层，不调用模型 API。网页与 MCP 使用同一套内容身份、阶段修订、幂等和版本冲突规则。代码已具备本地 OAuth 与 MCP 协议测试；正式 ChatGPT 连接、正式 OAuth 回调以及线上反向代理仍须独立验收，不能由测试通过推定已开通。

## 权限和边界

- `production:read`：读取制作列表、完整制作档案及交接资料。
- `production:draft`：在只读权限之上保存阶段草稿、关联本期已上传的文件或文章修订、提交审阅、记录实际检查及待核对反馈。
- 首版不提供发布、删除、真正用户批准、修改执行授权或创建制作档案的 MCP 工具。先在网页为现有内容启动制作，再从 ChatGPT 接着做。
- `report_decision` 的结果始终是 `reported_decision`。模型转述“用户同意”或传入 `confirmed: true`，都不能建立后台的正式用户确认。
- 检查由具体版本及本期证据修订标识绑定。自动脚本不能通过音画播放检查；未检查不写成通过。
- 令牌只代表既有单管理员，不能凭模型参数选择其他用户。网页登录 cookie、CSRF 令牌与 MCP OAuth 访问令牌分别使用。

工具清单：`list_episodes`、`get_episode_context`、`save_stage_revision`、`register_artifact`、`submit_for_review`、`record_check`、`report_decision`、`export_handoff`。读工具声明 `readOnlyHint: true`，写工具保留宿主平台的写入确认机制。

## 连接配置

默认不启用。服务器环境变量 `AUTHOR_PRODUCTION_MCP_CLIENTS_JSON` 未配置或为 `[]` 时，状态接口返回 `enabled: false`，公开协议路由返回 503，也不创建 OAuth 凭证数据库。

静态预注册客户端示例（只是配置形状，回调必须替换为 ChatGPT 连接管理页实际显示的精确 URI）：

```json
[
  {
    "clientId": "herong-production-chatgpt",
    "name": "ChatGPT 微课制作",
    "redirectUris": ["https://chatgpt.com/connector_platform_oauth_redirect"]
  }
]
```

此客户端使用 `token_endpoint_auth_method=none` 加 PKCE S256，没有客户端密钥，也不开放动态注册。客户端 ID 不是访问凭证；仍需管理员在现有登录会话中明确同意授权。不要因为示例包含某个 URI 就假定当前连接一定使用它。

正式 URL 从已确认的写作台 origin 与 basePath 派生；当其为 `https://dev.herong.info` 和 `/admin/` 时：

| 用途 | URL |
| --- | --- |
| MCP 服务器 | `https://dev.herong.info/admin/api/production-mcp` |
| OAuth issuer | `https://dev.herong.info/admin/production-oauth` |
| 浏览器授权 | `https://dev.herong.info/admin/production-oauth/authorize` |
| 查看与撤销连接 | `https://dev.herong.info/admin/production-oauth/connections` |
| 访问令牌 | `https://dev.herong.info/admin/production-oauth/token` |
| 客户端撤销 | `https://dev.herong.info/admin/production-oauth/revoke` |
| 受保护资源元数据 | `https://dev.herong.info/.well-known/oauth-protected-resource/admin/api/production-mcp` |
| OAuth 授权服务器元数据 | `https://dev.herong.info/.well-known/oauth-authorization-server/admin/production-oauth` |

登录后的 `GET /admin/api/production-mcp/status` 返回配置状态、资源、issuer、scope 和元数据 URL，不返回任何令牌。`enabled: true` 仅表示配置已加载，仍不代表公网发现与 ChatGPT 读写已通过。

## 主机集成顺序

1. `handlePublic(request, response, {url})` 仅匹配两个标准元数据路由、MCP bearer 路由及 token/revoke 路由，在普通浏览器登录检查前调用。所有私有 MCP 请求逐次验证访问令牌、固定资源、有效期和 scope；其他 `/api/` 接口不能使用此 bearer token 绕过登录。
2. 解析原有管理员 session 后，调用 `handleAuthorize(request, response, {url, session, csrfToken})`。仅匹配 `/production-oauth/authorize` 和 `/production-oauth/connections`。其表单 POST 自行验证 Host、Origin、CSRF；授权同意还须验证与会话绑定的一次性 ticket。
3. 其余接口继续原有 Origin、管理员登录和 header-CSRF 检查，不扩大例外。

现有 `/admin/` 反代剥离该前缀后，传给模块的普通 host 路径是 `/api/production-mcp`、`/production-oauth/...`。模块使用 `basePath` 保留外部 canonical URL。两个根元数据路径则须原样转发。

## 待审核的反向代理模板

这里只列模板，未修改远程配置或 reload。执行前完整阅读 `../enterprise-demo-deployment.md` 及作者服务实际运维文档，用 `nginx -T` 核对 **dev.herong.info** 的现有 HTTPS server block、端口、Host 和 `/admin/` 规则，备份精确目标文件后再实施。不要代理整个 `/.well-known/`，不要覆盖证书挑战或其他产品路径。

如果现有 `/admin/` 规则已转发至作者服务 `127.0.0.1:24320`，只需额外评审以下两个精确入口；普通 MCP 与 OAuth 路由继续复用现有 `/admin/` 转发：

```nginx
location = /.well-known/oauth-protected-resource/admin/api/production-mcp {
    proxy_pass http://127.0.0.1:24320;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_cache off;
}

location = /.well-known/oauth-authorization-server/admin/production-oauth {
    proxy_pass http://127.0.0.1:24320;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_cache off;
}
```

模块对两种元数据也提供子路径辅助入口，但正式连接验收以 RFC 标准根路径为准，不把辅助入口当作反代已完成。这里不伪装实现 OIDC：没有发布 openid/email scope、ID token 或 UserInfo。

## 凭证和恢复

OAuth 状态位于私有项目 `.production-workflow/oauth.sqlite`，与内容升级隔离，数据库及 WAL/SHM 为 0600。只持久保存访问令牌、刷新令牌、授权码与同意 ticket 的摘要；代码挑战及经过校验的请求上下文用于绑定回调，不返回给模型。

授权码有效 60 秒且一次性使用；访问令牌有效 1 小时；刷新令牌有效 30 天，每次使用旋转，重放已使用刷新令牌会撤销整条连接。重新启动不丢失尚有效的授权。管理员可以在连接管理页撤销，不需要取出 bearer token；撤销不删除课程和稿件。

公开 OAuth 路由按实际连接地址限 60 次/分钟，MCP 为 180 次/分钟，浏览器授权/连接管理为 30 次/分钟；反代后可能共享回环地址，这适合首版单管理员规模。Origin 必须是服务自身或允许的 `https://chatgpt.com`，Host 必须等于 canonical origin。不要把可信 Origin 扩成任意值，不要记录 Authorization、授权码或 token 响应。

## 测试与真实验收

```bash
node --test test/production-mcp-auth.test.mjs test/production-mcp.test.mjs
```

以上测试在作者目录执行，使用临时 SQLite 和本机 HTTP，覆盖 PKCE、用户同意及取消、CSRF、redirect/resource/scope 绑定、单次授权码、令牌摘要与重启、过期、刷新旋转与重放撤销、管理页撤销、无授权读取、只读 token 写入拒绝、伪造确认/身份/任意文件地址拒绝、协议初始化、真实 HTTP 草稿写入往返、版本冲突以及限流。它们不是生产 ChatGPT 账号连接验收。

正式验收顺序：确认两个标准元数据 URL → 在 ChatGPT 配置预注册 OAuth 客户端 → 在现有 Edge 中登录并审核连接权限 → 读取一份真实制作档案 → 保存一份可识别草稿 → 网页核对同一修订 → 换聊天重新读取 → 撤销后确认原 token 不再可用。MCP 不负责对外发布。

## 官方技术依据

核对日期：2026-11-09。官方文档支持 OAuth 2.1、PKCE S256、受保护资源元数据、issuer/resource 绑定及预定义客户端；本项目的 scope、工具、单管理员权限和数据状态是应用设计：

- [OpenAI：MCP authentication](https://developers.openai.com/plugins/build/auth)
- [OpenAI：Build an MCP server](https://developers.openai.com/plugins/build/mcp-server)
- [OpenAI：Add custom MCP server](https://developers.openai.com/api/docs/guides/custom-mcp-server)

这里是面向单管理员的受限实现，未声明完成第三方安全审计或所有 MCP 客户端兼容性测试。未来扩大为多用户或开放平台时应采用成熟身份提供方，并重新审查授权、存储隔离和撤销策略。
