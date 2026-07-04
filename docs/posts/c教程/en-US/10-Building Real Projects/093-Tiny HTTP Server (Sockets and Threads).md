---
title: "93. Tiny HTTP Server (Sockets and Threads)"
date: "2026-07-04"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "Building Real Projects"
description: "The Little Book of C — 93. Tiny HTTP Server (Sockets and Threads)"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
section: 93
sidebarWeight: 93
lang: "en-US"
alternateEn: "/posts/c教程/en-US/10-Building Real Projects/093-Tiny HTTP Server (Sockets and Threads)"
alternateZh: "/posts/c教程/zh-CN/10-真实项目/093-Tiny HTTP Server (Sockets and Threads)"
---
[中文版本](/posts/c教程/zh-CN/10-真实项目/093-Tiny HTTP Server (Sockets and Threads))

Now that you know how to build command-line tools, it’s time to make your program talk to the network. In this section, you’ll build a tiny multithreaded HTTP server, a small, minimal clone of what powers the web.

You’ll learn sockets, threading, request parsing, and response generation, all from first principles.

#### Step 1. The Goal

We’ll create a simple HTTP server that:

- Listens on port`8080`
- Accepts multiple connections (one per thread)
- Parses a minimal HTTP request
- Responds with a static HTML page

This project combines file I/O, networking, and concurrency, three of C’s most powerful capabilities.

#### Step 2. Project Layout

```
tinyhttp/
 ├── server.c
 ├── Makefile
 └── index.html
```

#### Step 3. The Core Idea

The server will:

1. Create a socket and bind it to port 8080.
2. Listen for connections.
3. Accept a client.
4. Handle the request in a new thread.
5. Send an HTTP response.
6. Close the socket and repeat.

#### Step 4. Tiny Code: server.c

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

#### Step 5. Build and Run

Makefile

```
CC = gcc
CFLAGS = -std=c23 -pthread -O2 -Wall -Wextra
all: server
server: server.c
    $(CC) $(CFLAGS) server.c -o server
clean:
    rm -f server
```

Build and run:

```
make
./server
```

Open your browser and visit:

```
http://localhost:8080
```

You should see:

```
Hello from TinyHTTP!
```

#### Step 6. How It Works

Socket setup: The server creates a TCP socket (`socket()`), binds it to port 8080, and listens.

Accept loop: The main thread waits for connections.

Threading: Each connection is handled by a new thread (`pthread_create`), allowing multiple clients at once.

HTTP parsing: Minimal, just reads the request header and ignores the rest for now.

Response: A static HTML body is written to the socket.

Cleanup: Each thread closes its client socket after responding.

#### Step 7. Extend It

To make it more realistic, add:

Serve static files:

```
FILE *f = fopen("index.html", "r");
```

Parse the first line of the request to get the path.

Return 404 if the file doesn’t exist.

Add MIME types for`.html`,`.css`,`.js`,`.png`.

Add logging with timestamps.

#### Step 8. Cross-Platform Notes

- Use`#ifdef _WIN32` to include`<winsock2.h>` and initialize with`WSAStartup()`.
- Replace`close()` with`closesocket()` on Windows.
- Use threads from`<threads.h>` for C11-only builds.

#### Step 9. Why It Matters

Building an HTTP server from scratch teaches you how the web really works:

- Sockets: the foundation of all network software.
- Concurrency: how to handle many users at once.
- Protocols: understanding request/response formats.
- Systems thinking: combining multiple low-level C features cleanly.

You’re no longer just writing programs, you’re shaping communication between machines.

#### Step 10. Try It Yourself

1. Add logging for each client connection.
2. Serve static files (`index.html`,`style.css`).
3. Implement a`/time` endpoint returning the system time.
4. Benchmark with`curl` or`ab`.
5. Extend to HTTP/1.1 persistent connections.

Next, you’ll build 94. A Simple Key-Value Store, where you’ll learn file-based persistence, indexing, and serialization, the first step toward writing databases in pure C.
