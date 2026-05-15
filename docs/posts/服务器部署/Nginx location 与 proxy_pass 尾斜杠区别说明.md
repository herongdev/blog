---
title: Nginx：`location /api` 与 `location /api/`，以及 `proxy_pass` 尾斜杠的区别
date: 2026-05-14 12:00:00
tags:
  - Nginx
  - 反向代理
  - Linux
  - 服务器部署
categories:
  - 服务器部署
---

区别分两层看。

## 1. `location /api` 和 `location /api/`

### `location /api`

会匹配所有以 `/api` 开头的路径：

```nginx
location /api {
}
```

会匹配：

```text
/api
/api/
/api/user
/api/v1/list
/api123
/api-test
```

所以它范围更宽，可能误匹配 `/api123` 这种路径。

---

### `location /api/`

只匹配以 `/api/` 开头的路径：

```nginx
location /api/ {
}
```

会匹配：

```text
/api/
/api/user
/api/v1/list
```

不会匹配：

```text
/api
/api123
/api-test
```

所以更安全、更常用。

---

## 2. `proxy_pass` 后面有没有 `/`

假设请求是：

```text
/api/user/list
```

### 写法一：不带 `/`

```nginx
location /api/ {
  proxy_pass http://127.0.0.1:8080;
}
```

转发给后端的是：

```text
http://127.0.0.1:8080/api/user/list
```

也就是：**原路径完整保留**。

---

### 写法二：带 `/`

```nginx
location /api/ {
  proxy_pass http://127.0.0.1:8080/;
}
```

转发给后端的是：

```text
http://127.0.0.1:8080/user/list
```

也就是：**去掉 `/api/` 前缀**。

---

## 推荐用法

如果你的后端接口本身就是：

```text
/api/user/list
```

那用这个：

```nginx
location /api/ {
  proxy_pass http://127.0.0.1:8080;
}
```

如果你的后端接口是：

```text
/user/list
```

只是前端访问时想统一加 `/api/`，那用这个：

```nginx
location /api/ {
  proxy_pass http://127.0.0.1:8080/;
}
```

---

## 最推荐记法

```text
proxy_pass 不带 / ：保留 /api 前缀
proxy_pass 带 /   ：去掉 /api 前缀
```

一般建议用：

```nginx
location /api/ {
  proxy_pass http://127.0.0.1:8080;
}
```

不要轻易写 `location /api`，因为它会误匹配 `/api123`。
