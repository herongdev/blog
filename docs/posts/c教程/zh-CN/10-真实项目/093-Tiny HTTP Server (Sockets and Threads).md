---
title: "93. 微型 HTTP 服务器（套接字和线程）"
date: "2026-07-04"
lang: "zh-CN"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "10-真实项目"
  - "中文"
description: "The Little Book of C 中文版 — 93. 微型 HTTP 服务器（套接字和线程）"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
translator: "机器辅助翻译（Google Translate）"
section: 93
sidebarWeight: 93
alternateZh: "/posts/c教程/zh-CN/10-真实项目/093-Tiny HTTP Server (Sockets and Threads)"
alternateEn: "/posts/c教程/en-US/10-Building Real Projects/093-Tiny HTTP Server (Sockets and Threads)"
---

[English version](/posts/c教程/en-US/10-Building Real Projects/093-Tiny HTTP Server (Sockets and Threads))

现在您已经知道如何构建命令行工具了，是时候让您的程序与网络对话了。在本节中，您将构建一个小型多线程 HTTP 服务器，这是网络驱动力的一个小型、最小的克隆。

您将学习套接字、线程、请求解析和响应生成，所有这些都是从第一原理开始的。

#### 步骤 1. 目标

我们将创建一个简单的 HTTP 服务器：

- 监听端口`8080`
- 接受多个连接（每个线程一个）
- 解析最小的 HTTP 请求
- 使用静态 HTML 页面进行响应

该项目结合了文件 I/O、网络和并发性，这三个 C 最强大的功能。

#### 步骤 2. 项目布局

```
tinyhttp/
 ├── server.c
 ├── Makefile
 └── index.html
```

#### 第三步：核心理念

服务器将：

1.创建一个socket并将其绑定到8080端口。
2. 监听连接。
3. 接受客户。
4. 在新线程中处理请求。
5. 发送 HTTP 响应。
6. 关闭插座并重复。

#### 步骤 4. 小代码：server.c

```
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <arpa/inet.h>
#include <pthread.h>
#define PORT 8080
#define BUF_SIZE 4096
void *handle_client(void *arg) {
    int client_fd = *(int *)arg;
    free(arg);
    char buffer[BUF_SIZE];
    int bytes = read(client_fd, buffer, sizeof(buffer) - 1);
    if (bytes <= 0) {
        close(client_fd);
        return NULL;
    }
    buffer[bytes] = '\0';
    // Basic HTTP response
    const char *body = "<html><body><h1>Hello from TinyHTTP!</h1></body></html>";
    char response[BUF_SIZE];
    snprintf(response, sizeof(response),
        "HTTP/1.1 200 OK\r\n"
        "Content-Type: text/html\r\n"
        "Content-Length: %zu\r\n"
        "Connection: close\r\n\r\n"
        "%s", strlen(body), body);
    write(client_fd, response, strlen(response));
    close(client_fd);
    return NULL;
}
int main(void) {
    int server_fd = socket(AF_INET, SOCK_STREAM, 0);
    if (server_fd == -1) {
        perror("socket failed");
        exit(EXIT_FAILURE);
    }
    int opt = 1;
    setsockopt(server_fd, SOL_SOCKET, SO_REUSEADDR, &opt, sizeof(opt));
    struct sockaddr_in addr = {0};
    addr.sin_family = AF_INET;
    addr.sin_addr.s_addr = INADDR_ANY;
    addr.sin_port = htons(PORT);
    if (bind(server_fd, (struct sockaddr *)&addr, sizeof(addr)) < 0) {
        perror("bind failed");
        close(server_fd);
        exit(EXIT_FAILURE);
    }
    if (listen(server_fd, 10) < 0) {
        perror("listen failed");
        close(server_fd);
        exit(EXIT_FAILURE);
    }
    printf("TinyHTTP running on http://localhost:%d\n", PORT);
    while (1) {
        int client_fd;
        struct sockaddr_in client;
        socklen_t len = sizeof(client);
        client_fd = accept(server_fd, (struct sockaddr *)&client, &len);
        if (client_fd < 0) {
            perror("accept failed");
            continue;
        }
        int *pclient = malloc(sizeof(int));
        *pclient = client_fd;
        pthread_t tid;
        pthread_create(&tid, NULL, handle_client, pclient);
        pthread_detach(tid);
    }
    close(server_fd);
    return 0;
}
```

#### 步骤 5. 构建并运行

生成文件

```
CC = gcc
CFLAGS = -std=c23 -pthread -O2 -Wall -Wextra
all: server
server: server.c
    $(CC) $(CFLAGS) server.c -o server
clean:
    rm -f server
```

构建并运行：

```
make
./server
```

打开浏览器并访问：

```
http://localhost:8080
```

你应该看到：

```
Hello from TinyHTTP!
```

#### 步骤 6. 工作原理

套接字设置：服务器创建一个 TCP 套接字（`socket()`），将其绑定到端口 8080 并监听。

Accept循环：主线程等待连接。

线程：每个连接都由一个新线程处理（`pthread_create`），同时允许多个客户端。

HTTP 解析：最少，仅读取请求标头，暂时忽略其余部分。

响应：静态 HTML 主体被写入套接字。

清理：每个线程在响应后关闭其客户端套接字。

#### 第 7 步：扩展它

为了使其更真实，请添加：

提供静态文件：

```
FILE *f = fopen("index.html", "r");
```

解析请求的第一行以获取路径。

如果文件不存在则返回 404。

添加 MIME 类型`.html`,`.css`,`.js`,`.png`.

添加带有时间戳的日志记录。

#### 步骤 8. 跨平台注释

- 使用`#ifdef _WIN32`包括`<winsock2.h>`并初始化`WSAStartup()`.
- 代替`close()`和`closesocket()`在 Windows 上。
- 使用来自的线程`<threads.h>`仅适用于 C11 版本。

#### 第 9 步：为什么它很重要

从头开始构建 HTTP 服务器将教会您 Web 的真正工作原理：

- 套接字：所有网络软件的基础。
- 并发：如何同时处理多个用户。
- 协议：了解请求/响应格式。
- 系统思考：干净地组合多个低级 C 功能。

您不再只是编写程序，而是在塑造机器之间的通信。

#### 第 10 步：亲自尝试一下

1. 为每个客户端连接添加日志记录。
2. 提供静态文件（`index.html`,`style.css`).
3. 实施`/time`返回系统时间的端点。
4. 基准测试`curl`或者`ab`.
5. 扩展到HTTP/1.1持久连接。

接下来，您将构建 94. 一个简单的键值存储，您将在其中学习基于文件的持久性、索引和序列化，这是用纯 C 编写数据库的第一步。
