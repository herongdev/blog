---
title: Web 与移动应用登录失效后「重新登录」提示的通用方案（含 WS/Token 最佳实践）
date: 2025-09-27 10:00:00
tags: [登录失效, Token, 鉴权与安全]
---

# 概览

- 目标：当**会话过期**、**多端登录被挤下线**或**长时间未操作**时，**主动提示用户**并**引导重新登录**。
- 核心思路：

  1. **服务端主动通知**（WS/推送）+ **客户端统一处理**。
  2. **客户端被动检测**（拦截 401/403 或本地过期计时）+ **统一登出流程**。
  3. **AccessToken（短）+ RefreshToken（长）** 的续期机制，尽量**无感刷新**；刷新失败再提示登录。
  4. WebSocket 在**握手即鉴权**，并约定**失效信号与重连策略**。

---

# 一、触发与检测机制

## 1. 服务端主动通知（实时感知）

- 典型场景：**他端登录挤下线**、管理后台**强制失效**、安全风控。
- 通道选择：

  - **WebSocket**：向客户端推送 `logout`/`session_expired` 事件；客户端弹窗 → 清理 → 跳登录。
  - **移动推送**（APNs/FCM）：App 在前台时提示，后台可静默标记，回到前台统一处理。

- 优点：**即时**、**统一**；缺点：需**协议与客户端处理逻辑**配套。

## 2. 客户端被动检测（最常见）

- **HTTP 拦截**：在网络层统一捕获 **401/403**。
- **本地计时**：解析 token 的 `exp`，**到期前刷新**，失败则触发登出。
- 优点：实现简单、**集中维护**；缺点：**非实时**（在发起请求时才发现）。

---

# 二、Web 应用实现与交互范式（React/Vue/SPA）

## 1. 统一拦截器

```js
// 复杂逻辑：统一拦截 401，先清状态再引导登录，避免“幽灵会话”
import axios from "axios";

axios.interceptors.response.use(
  (res) => res,
  (err) => {
    const status = err?.response?.status;
    if (status === 401 || status === 403) {
      // 清本地凭证与用户态
      localStorage.removeItem("authToken");
      // 可广播给其它标签同步退出（BroadcastChannel 或 storage 事件）
      // new BroadcastChannel('auth').postMessage({ type: 'LOGOUT' });

      // 友好提示 + 携带回跳
      const redirect = encodeURIComponent(
        window.location.pathname + window.location.search
      );
      window.location.href = `/login?redirect=${redirect}&reason=expired`;
    }
    return Promise.reject(err);
  }
);
```

## 2. 多标签页同步退出

- 使用 `BroadcastChannel('auth')` 或 `window.addEventListener('storage')` 同步其它标签页的登出动作。
- 登出时只做**一次性清理**，其余标签页收到事件后**跳登录**即可。

## 3. 交互建议

- **前台弹窗**（模态框/顶部警示条）：提示“登录已失效，请重新登录”。
- **路由守卫**：访问受保护路由时若无有效会话，**直接重定向登录**并带回跳参数。
- **可回跳**：登录成功后返回原页面，降低打断感。

---

# 三、移动端实现与交互范式（iOS/Android/Flutter）

## 1. 网络层统一拦截

**Android（OkHttp/Retrofit）示例：**

```java
// 复杂逻辑：网络层统一捕获 401，切至主线程做 UI 提示与登出跳转
class AuthInterceptor implements Interceptor {
  @Override public Response intercept(Chain chain) throws IOException {
    Response res = chain.proceed(chain.request());
    if (res.code() == 401 || res.code() == 403) {
      App.runOnMainThread(() -> App.get().onTokenExpired());
    }
    return res;
  }
}
```

**iOS（Alamofire/URLSession）要点：**

- 在响应回调里判断 401/403 → `DispatchQueue.main.async` 切主线程弹窗与路由到登录页。
- 清理：Keychain/NSUserDefaults 中的 token、内存单例用户对象、与用户相关的后台任务。

## 2. 推送配合

- 前台：展示对话框并跳登录。
- 后台：标记“需重登”，用户回前台时统一处理（或使用静默推送直接触发登出流程）。

## 3. 导航与状态

- 清空导航栈/重建根路由，**禁止返回**到受保护页面。
- 退出时注销推送别名/话题订阅，避免误投递。

---

# 四、Token 最佳实践

## 1. 短 Access + 长 Refresh

- **Access Token**（15–60 分钟）：用于请求；
- **Refresh Token**（天/周级）：用于无感续期；
- 流程：请求失败（401）→ **先尝试刷新** → 刷新成功重试原请求 → 刷新失败才提示重新登录。

## 2. 安全与合规

- Web：**Refresh Token 放 HttpOnly Cookie**；Access 可放内存/非持久。
- 移动端：Refresh 放 **Keychain/Keystore**；必要时二次加密。
- **Refresh Token 轮换**：每次刷新下发新 RT，使旧 RT 失效。
- **强退/改密**：后端需可**撤销**既发 token（黑名单/会话存储），并**广播**失效事件。

## 3. 客户端实现要点

- 统一的 **token 管理器**：

  - 维护 `access/refresh/exp`；
  - 提供 `getValidAccessToken()`（自动判断与刷新）；
  - **并发刷新去抖**：刷新中其余请求**等待同一 Promise**，避免风暴；
  - 最大会话总时长/刷新次数上限，超限则要求重新登录。

---

# 五、WebSocket 鉴权与失效处理

## 1. 握手即鉴权

- **浏览器**：URL 查询参数附带 `token`（配合 `wss://`；避免在日志中记录完整 URL）。

  ```js
  // 复杂逻辑：用代次隔离迟到消息，切换/重连时避免“幽灵数据”
  let gen = 0,
    ws = null;
  function connect(token) {
    const myGen = ++gen;
    ws = new WebSocket(
      `wss://example.com/stream?token=${encodeURIComponent(token)}`
    );
    ws.onmessage = (e) => {
      if (myGen !== gen) return; /* 正常处理消息 */
    };
    ws.onclose = () => {
      /* 根据 code/reason 决定是否提示或重连 */
    };
  }
  ```

- **原生/Node 客户端**：可走 `Authorization: Bearer <token>` 自定义头。

## 2. 过期与续期

- **主动续期**：本地检测将过期 → 刷新成功后 **重建 WS**（带新 token）。
- **服务端信号**：约定 `auth_error` 事件或特定 close code；客户端收到后**弹窗 → 清理 → 跳登录**或执行透明重连。
- **多端冲突**：新连接建立 → 服务端关闭旧连接并推送“被挤下线”消息；客户端统一走登出流程。

---

# 六、统一登出流程（Web/移动端通用清单）

1. **停止一切后续请求**（可取消队列/挂起 UI 操作）。
2. **清理本地凭证与用户态**：token、用户信息、缓存、订阅、定时器。
3. **关闭 WS/RTC/推送别名** 等与用户绑定的长连接通道。
4. **多实例同步**（Web 多标签、移动多进程）。
5. **跳转登录页**（重建导航栈；可带回跳参数）。
6. **显式提示原因**：会话超时/他端登录/安全风险等。

---

# 七、常见陷阱与规避

- **只清 token 不清内存态** → 页面仍显示旧用户信息。
- **并发刷新风暴** → 使用**单航道刷新**（队列/锁/共享 Promise）。
- **WS 不识别过期** → 缺少 close code/事件约定；补齐协议。
- **多标签不同步** → BroadcastChannel/storage 事件必配。
- **Refresh 永不过期** → 增加**最长会话窗口**与**轮换**策略。

---

# 八、快速集成清单（落地指南）

- [ ] Axios/OkHttp/Alamofire **响应拦截器**接管 401/403。
- [ ] `TokenManager`：持久化、`getValidAccessToken()`、并发去抖刷新。
- [ ] **Access+Refresh** 流水线与**轮换**；Web 用 HttpOnly Cookie。
- [ ] WebSocket：**握手鉴权**、**失效信号**、**重连与代次**。
- [ ] 统一 `logout()`：清理 + 关闭通道 + 同步 + 跳登录。
- [ ] 多端登录策略：后端**单会话/多会话**规则 + 主动通知。
- [ ] UX：显式原因、可回跳、不中断未保存数据（必要时草稿）。

---

# 附：代码片段索引

- **Web：Axios 401 拦截**（见上文「二-1」）。
- **Android：OkHttp 拦截器**（见上文「三-1」）。
- **WS：握手鉴权与代次**（见上文「五-1」）。

> 以上为可直接落地的基线方案；结合你们目前“HTTP 为主 + 服务器亦可下发退出通知”的架构，建议**先完善客户端拦截与统一登出**，再逐步接入**WS 主动通知**与**Refresh 轮换**，最终实现“**无感续期，必要时清晰提示**”的一致体验。
