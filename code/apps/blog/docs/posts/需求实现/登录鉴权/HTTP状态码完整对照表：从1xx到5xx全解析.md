---
title: HTTP状态码完整对照表：从1xx到5xx全解析
date: 2025-01-27
tags: [HTTP, 状态码, API, 响应码, Web开发]
---

# HTTP 状态码完整对照表：从 1xx 到 5xx 全解析

> 本文档提供完整的 HTTP 状态码对照表，包含所有标准状态码的详细说明、使用场景和最佳实践。

## 目录

1. [1xx 信息性响应](#1xx-信息性响应)
2. [2xx 成功响应](#2xx-成功响应)
3. [3xx 重定向](#3xx-重定向)
4. [4xx 客户端错误](#4xx-客户端错误)
5. [5xx 服务器错误](#5xx-服务器错误)
6. [WebDAV 扩展状态码](#webdav扩展状态码)
7. [最佳实践](#最佳实践)

---

## 1xx 信息性响应

1xx 状态码表示临时响应，用于告知客户端请求已收到，继续处理。

| 状态码  | 状态名称            | 说明     | 使用场景                                   |
| ------- | ------------------- | -------- | ------------------------------------------ |
| **100** | Continue            | 继续     | 客户端应继续发送请求体，服务器已准备好接收 |
| **101** | Switching Protocols | 切换协议 | 服务器同意切换协议（如 WebSocket）         |
| **102** | Processing          | 处理中   | 服务器已收到并正在处理请求，但无响应可用   |
| **103** | Early Hints         | 早期提示 | 用于预加载资源，在最终响应前发送           |

### 详细说明

#### 100 Continue

- **用途**：客户端发送带有较大请求体的请求时使用
- **场景**：文件上传、POST 大量数据
- **示例**：

  ```http
  POST /upload HTTP/1.1
  Content-Length: 1024
  Expect: 100-continue

  HTTP/1.1 100 Continue

  [请求体数据]
  ```

#### 101 Switching Protocols

- **用途**：协议升级
- **场景**：HTTP 升级到 WebSocket、HTTP/1.1 升级到 HTTP/2
- **示例**：

  ```http
  GET /chat HTTP/1.1
  Upgrade: websocket
  Connection: Upgrade

  HTTP/1.1 101 Switching Protocols
  Upgrade: websocket
  Connection: Upgrade
  ```

#### 102 Processing (WebDAV)

- **用途**：长时间处理请求
- **场景**：WebDAV 批量操作

#### 103 Early Hints

- **用途**：资源预加载提示
- **场景**：Link 预加载、DNS 预解析

---

## 2xx 成功响应

2xx 状态码表示请求已成功处理。

| 状态码  | 状态名称                      | 说明       | 使用场景               |
| ------- | ----------------------------- | ---------- | ---------------------- |
| **200** | OK                            | 请求成功   | 通用成功响应           |
| **201** | Created                       | 创建成功   | 资源创建成功           |
| **202** | Accepted                      | 已接受     | 请求已接受，异步处理中 |
| **203** | Non-Authoritative Information | 非权威信息 | 代理修改了原始响应     |
| **204** | No Content                    | 无内容     | 请求成功但无返回内容   |
| **205** | Reset Content                 | 重置内容   | 请求成功，重置文档视图 |
| **206** | Partial Content               | 部分内容   | 范围请求成功           |
| **207** | Multi-Status                  | 多状态     | WebDAV 多状态响应      |
| **208** | Already Reported              | 已报告     | WebDAV 绑定已报告      |
| **226** | IM Used                       | IM 已使用  | 实例操作已应用         |

### 详细说明

#### 200 OK

- **用途**：请求成功处理
- **场景**：GET 请求、PUT 更新、POST 处理成功
- **示例**：

  ```json
  HTTP/1.1 200 OK
  Content-Type: application/json

  {
    "status": "success",
    "data": {...}
  }
  ```

#### 201 Created

- **用途**：资源创建成功
- **场景**：POST 创建新资源、PUT 创建资源
- **最佳实践**：返回新创建资源的 URI
- **示例**：

  ```http
  POST /users HTTP/1.1

  HTTP/1.1 201 Created
  Location: /users/123
  Content-Type: application/json

  {
    "id": 123,
    "name": "张三",
    "created_at": "2025-01-27T10:00:00Z"
  }
  ```

#### 202 Accepted

- **用途**：请求已接受，异步处理
- **场景**：异步任务、邮件发送、数据处理
- **示例**：

  ```json
  HTTP/1.1 202 Accepted
  Content-Type: application/json

  {
    "message": "请求已接受",
    "task_id": "task-123",
    "status_url": "/tasks/task-123/status"
  }
  ```

#### 204 No Content

- **用途**：请求成功但无返回内容
- **场景**：DELETE 成功、PUT 更新无返回
- **示例**：

  ```http
  DELETE /users/123 HTTP/1.1

  HTTP/1.1 204 No Content
  ```

#### 206 Partial Content

- **用途**：范围请求成功
- **场景**：断点续传、视频流、大文件下载
- **示例**：

  ```http
  GET /video.mp4 HTTP/1.1
  Range: bytes=0-1023

  HTTP/1.1 206 Partial Content
  Content-Range: bytes 0-1023/2048
  Content-Length: 1024
  ```

---

## 3xx 重定向

3xx 状态码表示需要进一步操作来完成请求。

| 状态码  | 状态名称           | 说明       | 使用场景             |
| ------- | ------------------ | ---------- | -------------------- |
| **300** | Multiple Choices   | 多种选择   | 多个可选响应         |
| **301** | Moved Permanently  | 永久移动   | URL 永久重定向       |
| **302** | Found              | 临时移动   | URL 临时重定向       |
| **303** | See Other          | 查看其他   | POST 后重定向到 GET  |
| **304** | Not Modified       | 未修改     | 缓存有效             |
| **305** | Use Proxy          | 使用代理   | 必须使用代理         |
| **307** | Temporary Redirect | 临时重定向 | 保持方法的重定向     |
| **308** | Permanent Redirect | 永久重定向 | 保持方法的永久重定向 |

### 详细说明

#### 301 Moved Permanently

- **用途**：资源永久移动到新位置
- **场景**：域名迁移、URL 重构
- **示例**：
  ```http
  HTTP/1.1 301 Moved Permanently
  Location: https://new-domain.com/new-path
  ```

#### 302 Found

- **用途**：资源临时移动到新位置
- **场景**：临时维护、A/B 测试
- **示例**：
  ```http
  HTTP/1.1 302 Found
  Location: /maintenance.html
  ```

#### 304 Not Modified

- **用途**：缓存有效，无需重新传输
- **场景**：条件请求、缓存验证
- **示例**：

  ```http
  GET /api/data HTTP/1.1
  If-None-Match: "etag-value"

  HTTP/1.1 304 Not Modified
  ETag: "etag-value"
  ```

#### 307 Temporary Redirect

- **用途**：临时重定向，保持 HTTP 方法
- **场景**：POST 重定向到 POST
- **示例**：

  ```http
  POST /old-api HTTP/1.1

  HTTP/1.1 307 Temporary Redirect
  Location: /new-api
  ```

---

## 4xx 客户端错误

4xx 状态码表示客户端请求有误。

| 状态码  | 状态名称                        | 说明             | 使用场景                 |
| ------- | ------------------------------- | ---------------- | ------------------------ |
| **400** | Bad Request                     | 请求错误         | 请求语法错误             |
| **401** | Unauthorized                    | 未授权           | 需要身份验证             |
| **402** | Payment Required                | 需要付费         | 保留使用                 |
| **403** | Forbidden                       | 禁止访问         | 服务器拒绝请求           |
| **404** | Not Found                       | 未找到           | 资源不存在               |
| **405** | Method Not Allowed              | 方法不允许       | HTTP 方法不支持          |
| **406** | Not Acceptable                  | 不可接受         | 无法生成客户端接受的内容 |
| **407** | Proxy Authentication Required   | 需要代理认证     | 代理服务器认证           |
| **408** | Request Timeout                 | 请求超时         | 请求超时                 |
| **409** | Conflict                        | 冲突             | 请求冲突                 |
| **410** | Gone                            | 已删除           | 资源永久删除             |
| **411** | Length Required                 | 需要长度         | 缺少 Content-Length      |
| **412** | Precondition Failed             | 前置条件失败     | 前置条件不满足           |
| **413** | Payload Too Large               | 载荷过大         | 请求体过大               |
| **414** | URI Too Long                    | URI 过长         | 请求 URI 过长            |
| **415** | Unsupported Media Type          | 不支持的媒体类型 | 媒体类型不支持           |
| **416** | Range Not Satisfiable           | 范围不可满足     | 请求范围无效             |
| **417** | Expectation Failed              | 期望失败         | Expect 头字段失败        |
| **418** | I'm a teapot                    | 我是茶壶         | 愚人节笑话               |
| **421** | Misdirected Request             | 错误定向请求     | 请求定向错误             |
| **422** | Unprocessable Entity            | 无法处理的实体   | 语义错误                 |
| **423** | Locked                          | 已锁定           | WebDAV 资源锁定          |
| **424** | Failed Dependency               | 依赖失败         | WebDAV 依赖失败          |
| **425** | Too Early                       | 太早             | 请求太早                 |
| **426** | Upgrade Required                | 需要升级         | 需要升级协议             |
| **428** | Precondition Required           | 需要前置条件     | 需要条件请求             |
| **429** | Too Many Requests               | 请求过多         | 速率限制                 |
| **431** | Request Header Fields Too Large | 请求头字段过大   | 请求头过大               |
| **451** | Unavailable For Legal Reasons   | 因法律原因不可用 | 法律限制                 |

### 详细说明

#### 400 Bad Request

- **用途**：请求语法错误
- **场景**：JSON 格式错误、参数缺失
- **示例**：

  ```json
  HTTP/1.1 400 Bad Request
  Content-Type: application/json

  {
    "error": "bad_request",
    "message": "请求参数格式错误",
    "details": {
      "field": "email",
      "issue": "invalid_format"
    }
  }
  ```

#### 401 Unauthorized

- **用途**：需要身份验证
- **场景**：未登录、token 过期
- **示例**：

  ```http
  HTTP/1.1 401 Unauthorized
  WWW-Authenticate: Bearer realm="API"
  Content-Type: application/json

  {
    "error": "unauthorized",
    "message": "需要有效的访问令牌"
  }
  ```

#### 403 Forbidden

- **用途**：服务器拒绝请求
- **场景**：权限不足、IP 封禁
- **示例**：

  ```json
  HTTP/1.1 403 Forbidden
  Content-Type: application/json

  {
    "error": "forbidden",
    "message": "没有权限访问此资源"
  }
  ```

#### 404 Not Found

- **用途**：资源不存在
- **场景**：URL 错误、资源已删除
- **示例**：

  ```json
  HTTP/1.1 404 Not Found
  Content-Type: application/json

  {
    "error": "not_found",
    "message": "请求的资源不存在"
  }
  ```

#### 422 Unprocessable Entity

- **用途**：语义错误
- **场景**：验证失败、业务规则冲突
- **示例**：

  ```json
  HTTP/1.1 422 Unprocessable Entity
  Content-Type: application/json

  {
    "error": "validation_failed",
    "message": "数据验证失败",
    "errors": [
      {
        "field": "email",
        "message": "邮箱格式不正确"
      }
    ]
  }
  ```

#### 429 Too Many Requests

- **用途**：请求过多
- **场景**：API 限流、防止滥用
- **示例**：
  ```http
  HTTP/1.1 429 Too Many Requests
  X-RateLimit-Limit: 1000
  X-RateLimit-Remaining: 0
  X-RateLimit-Reset: 1640995200
  Retry-After: 3600
  ```

---

## 5xx 服务器错误

5xx 状态码表示服务器内部错误。

| 状态码  | 状态名称                        | 说明            | 使用场景        |
| ------- | ------------------------------- | --------------- | --------------- |
| **500** | Internal Server Error           | 内部服务器错误  | 通用服务器错误  |
| **501** | Not Implemented                 | 未实现          | 功能未实现      |
| **502** | Bad Gateway                     | 网关错误        | 网关或代理错误  |
| **503** | Service Unavailable             | 服务不可用      | 服务临时不可用  |
| **504** | Gateway Timeout                 | 网关超时        | 网关超时        |
| **505** | HTTP Version Not Supported      | HTTP 版本不支持 | HTTP 版本不支持 |
| **506** | Variant Also Negotiates         | 变体协商        | 配置错误        |
| **507** | Insufficient Storage            | 存储不足        | WebDAV 存储不足 |
| **508** | Loop Detected                   | 检测到循环      | WebDAV 无限循环 |
| **510** | Not Extended                    | 未扩展          | 需要扩展        |
| **511** | Network Authentication Required | 需要网络认证    | 网络访问控制    |

### 详细说明

#### 500 Internal Server Error

- **用途**：通用服务器错误
- **场景**：未处理的异常、系统错误
- **示例**：

  ```json
  HTTP/1.1 500 Internal Server Error
  Content-Type: application/json

  {
    "error": "internal_server_error",
    "message": "服务器内部错误",
    "request_id": "req-123456"
  }
  ```

#### 502 Bad Gateway

- **用途**：网关或代理服务器错误
- **场景**：反向代理无法连接后端、CDN 错误
- **示例**：

  ```http
  HTTP/1.1 502 Bad Gateway
  Content-Type: text/html

  <html>
    <head><title>502 Bad Gateway</title></head>
    <body>服务器暂时不可用，请稍后重试</body>
  </html>
  ```

#### 503 Service Unavailable

- **用途**：服务临时不可用
- **场景**：维护模式、服务器过载
- **示例**：

  ```http
  HTTP/1.1 503 Service Unavailable
  Retry-After: 3600
  Content-Type: application/json

  {
    "error": "service_unavailable",
    "message": "服务正在维护中",
    "retry_after": 3600
  }
  ```

#### 504 Gateway Timeout

- **用途**：网关超时
- **场景**：上游服务器响应超时
- **示例**：

  ```http
  HTTP/1.1 504 Gateway Timeout
  Content-Type: application/json

  {
    "error": "gateway_timeout",
    "message": "请求超时，请重试"
  }
  ```

---

## WebDAV 扩展状态码

WebDAV 协议扩展的状态码。

| 状态码  | 状态名称             | 说明         | 使用场景     |
| ------- | -------------------- | ------------ | ------------ |
| **207** | Multi-Status         | 多状态       | 多个操作结果 |
| **208** | Already Reported     | 已报告       | 绑定已报告   |
| **422** | Unprocessable Entity | 无法处理实体 | 语义错误     |
| **423** | Locked               | 已锁定       | 资源被锁定   |
| **424** | Failed Dependency    | 依赖失败     | 依赖操作失败 |
| **507** | Insufficient Storage | 存储不足     | 磁盘空间不足 |
| **508** | Loop Detected        | 检测到循环   | 无限循环     |

---

## 最佳实践

### 状态码选择原则

1. **2xx 成功响应**

   - `200 OK`：通用成功
   - `201 Created`：资源创建
   - `204 No Content`：成功但无内容
   - `202 Accepted`：异步处理

2. **4xx 客户端错误**

   - `400 Bad Request`：请求格式错误
   - `401 Unauthorized`：需要认证
   - `403 Forbidden`：权限不足
   - `404 Not Found`：资源不存在
   - `422 Unprocessable Entity`：验证失败
   - `429 Too Many Requests`：限流

3. **5xx 服务器错误**
   - `500 Internal Server Error`：通用服务器错误
   - `502 Bad Gateway`：网关错误
   - `503 Service Unavailable`：服务不可用
   - `504 Gateway Timeout`：超时

### API 设计建议

```typescript
// 标准响应格式
interface APIResponse<T = any> {
  status: number;
  message: string;
  data?: T;
  error?: {
    code: string;
    details?: any;
  };
  meta?: {
    request_id: string;
    timestamp: string;
    version: string;
  };
}

// 成功响应示例
const successResponse: APIResponse<User> = {
  status: 200,
  message: "获取用户信息成功",
  data: {
    id: 123,
    name: "张三",
    email: "zhangsan@example.com",
  },
  meta: {
    request_id: "req-123456",
    timestamp: "2025-01-27T10:00:00Z",
    version: "1.0.0",
  },
};

// 错误响应示例
const errorResponse: APIResponse = {
  status: 400,
  message: "请求参数错误",
  error: {
    code: "VALIDATION_ERROR",
    details: {
      field: "email",
      issue: "invalid_format",
    },
  },
  meta: {
    request_id: "req-123456",
    timestamp: "2025-01-27T10:00:00Z",
    version: "1.0.0",
  },
};
```

### 前端处理建议

```typescript
// HTTP状态码处理
class HTTPStatusHandler {
  static handleResponse(response: Response): Promise<any> {
    const status = response.status;

    switch (true) {
      case status >= 200 && status < 300:
        return this.handleSuccess(response);

      case status >= 400 && status < 500:
        return this.handleClientError(response);

      case status >= 500:
        return this.handleServerError(response);

      default:
        throw new Error(`未知状态码: ${status}`);
    }
  }

  private static async handleSuccess(response: Response) {
    const contentType = response.headers.get("content-type");

    if (contentType?.includes("application/json")) {
      return await response.json();
    }

    return await response.text();
  }

  private static async handleClientError(response: Response) {
    const errorData = await response.json();

    switch (response.status) {
      case 400:
        throw new ValidationError(errorData.message, errorData.error?.details);

      case 401:
        throw new AuthenticationError(errorData.message);

      case 403:
        throw new AuthorizationError(errorData.message);

      case 404:
        throw new NotFoundError(errorData.message);

      case 422:
        throw new ValidationError(errorData.message, errorData.errors);

      case 429:
        throw new RateLimitError(
          errorData.message,
          response.headers.get("Retry-After")
        );

      default:
        throw new ClientError(errorData.message, response.status);
    }
  }

  private static async handleServerError(response: Response) {
    const errorData = await response.json();

    switch (response.status) {
      case 500:
        throw new InternalServerError(errorData.message, errorData.request_id);

      case 502:
        throw new BadGatewayError(errorData.message);

      case 503:
        throw new ServiceUnavailableError(
          errorData.message,
          response.headers.get("Retry-After")
        );

      case 504:
        throw new GatewayTimeoutError(errorData.message);

      default:
        throw new ServerError(errorData.message, response.status);
    }
  }
}

// 自定义错误类
class ValidationError extends Error {
  constructor(message: string, public details?: any) {
    super(message);
    this.name = "ValidationError";
  }
}

class AuthenticationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthenticationError";
  }
}

class RateLimitError extends Error {
  constructor(message: string, public retryAfter?: string) {
    super(message);
    this.name = "RateLimitError";
  }
}
```

### 缓存策略

```typescript
// 基于状态码的缓存策略
class CacheStrategy {
  static shouldCache(status: number): boolean {
    // 成功响应可缓存
    if (status >= 200 && status < 300) {
      return true;
    }

    // 重定向可缓存
    if (status >= 300 && status < 400) {
      return true;
    }

    // 客户端错误不缓存
    if (status >= 400 && status < 500) {
      return false;
    }

    // 服务器错误不缓存
    if (status >= 500) {
      return false;
    }

    return false;
  }

  static getCacheTTL(status: number): number {
    switch (status) {
      case 200:
        return 3600; // 1小时
      case 201:
        return 0; // 不缓存
      case 204:
        return 0; // 不缓存
      case 301:
        return 86400 * 365; // 1年
      case 302:
        return 3600; // 1小时
      case 304:
        return 3600; // 1小时
      default:
        return 0; // 不缓存
    }
  }
}
```

---

## 总结

HTTP 状态码是 Web 开发中的重要组成部分，正确使用状态码能够：

1. **提高 API 可读性**：清晰表达请求结果
2. **改善用户体验**：提供准确的错误信息
3. **便于调试**：快速定位问题
4. **支持缓存**：优化性能
5. **符合标准**：遵循 HTTP 规范

### 关键要点

- **2xx**：成功响应，根据操作类型选择合适的状态码
- **3xx**：重定向，注意 301 和 302 的区别
- **4xx**：客户端错误，提供详细的错误信息
- **5xx**：服务器错误，避免暴露敏感信息

### 推荐资源

- [RFC 7231 - HTTP/1.1 Semantics and Content](https://tools.ietf.org/html/rfc7231)
- [MDN HTTP Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
- [HTTP Status Dogs](https://httpstatusdogs.com/) - 有趣的状态码说明

通过合理使用这些状态码，可以构建更加健壮和用户友好的 Web 应用程序。
