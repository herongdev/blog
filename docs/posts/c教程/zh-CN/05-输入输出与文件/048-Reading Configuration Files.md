---
title: "48. 读取配置文件"
date: "2026-07-04"
lang: "zh-CN"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "05-输入输出与文件"
  - "中文"
description: "The Little Book of C 中文版 — 48. 读取配置文件"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
translator: "机器辅助翻译（Google Translate）"
section: 48
sidebarWeight: 48
alternateZh: "/posts/c教程/zh-CN/05-输入输出与文件/048-Reading Configuration Files"
alternateEn: "/posts/c教程/en-US/05-Input Output and Files/048-Reading Configuration Files"
---

[English version](/posts/c教程/en-US/05-Input Output and Files/048-Reading Configuration Files)

随着 C 程序的增长，文件路径、阈值或用户首选项等硬编码设置变得有限。配置文件允许您的程序在运行时读取设置，这是工具、服务器和嵌入式系统的关键功能。

您将学习如何使用标准 I/O 和字符串处理来读取和解析配置文件。

#### 目标

配置文件可能如下所示：

```
port=8080
host=localhost
max_clients=100
log_file=server.log
```

你的程序应该：

1.打开文件
2.逐行阅读
3. 将每一行分成`key`和`value`
4. 存储或使用这些值

#### 步骤 1. 定义 Config 的结构

```
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#define MAX_LINE 128
typedef struct {
    int port;
    char host[64];
    int max_clients;
    char log_file[64];
} Config;
```

这`Config`struct 将保存解析后的值。

#### 步骤 2. 实现解析器

```
void load_config(const char *filename, Config *cfg) {
    FILE *fp = fopen(filename, "r");
    if (!fp) {
        perror("Cannot open config file");
        exit(1);
    }
    char line[MAX_LINE];
    while (fgets(line, sizeof(line), fp)) {
        line[strcspn(line, "\n")] = '\0'; // remove newline
        if (line[0] == '#' || strlen(line) == 0)
            continue; // skip comments and blanks
        char key[64], value[64];
        if (sscanf(line, "%63[^=]=%63s", key, value) == 2) {
            if (strcmp(key, "port") == 0)
                cfg->port = atoi(value);
            else if (strcmp(key, "host") == 0)
                strncpy(cfg->host, value, sizeof(cfg->host));
            else if (strcmp(key, "max_clients") == 0)
                cfg->max_clients = atoi(value);
            else if (strcmp(key, "log_file") == 0)
                strncpy(cfg->log_file, value, sizeof(cfg->log_file));
        }
    }
    fclose(fp);
}
```

这个功能：

- 读取每一行
- 忽略注释和空行
- 使用提取键值对`sscanf()`
- 更新字段`Config`

#### 步骤 3. 使用配置

```
int main(void) {
    Config cfg = {0};
    load_config("config.txt", &cfg);
    printf("Server settings:\n");
    printf("Host: %s\n", cfg.host);
    printf("Port: %d\n", cfg.port);
    printf("Max clients: %d\n", cfg.max_clients);
    printf("Log file: %s\n", cfg.log_file);
    return 0;
}
```

运行`config.txt`文件：

```
host=127.0.0.1
port=9090
max_clients=250
log_file=/tmp/server.log
```

输出：

```
Server settings:
Host: 127.0.0.1
Port: 9090
Max clients: 250
Log file: /tmp/server.log
```

#### 小代码：默认后备

您可以在读取文件之前初始化合理的默认值：

```
Config cfg = {
    .port = 8080,
    .host = "localhost",
    .max_clients = 100,
    .log_file = "server.log"
};
```

这可以确保即使文件缺少某些值，您的程序仍然可以运行。

#### 步骤 4. 可选：处理引用的值

如果您期望带有空格的值（例如`name="My Server"`），可以修改解析逻辑：

```
if (sscanf(line, "%63[^=]=\"%63[^\"]\"", key, value) == 2) {
    // handle quoted strings
}
```

#### 步骤 5. 可选：通用存储

对于更灵活的系统，您可以使用哈希表或键值对数组来代替固定字段：

```
typedef struct {
    char key[64];
    char value[64];
} KVPair;
KVPair settings[100];
```

这允许加载任意密钥而无需重新编译程序。

#### 为什么它很重要

配置文件让您：

- 将代码与数据分开，无需重新编译即可改变行为
- 适应环境、开发、测试、生产
- 使您的程序可以被其他人重用

它们无处不在，从`.ini`和`.conf`现代系统中复杂的 YAML/JSON 格式的文件。

#### 自己尝试一下

1.添加支持`#`注释和空行（安全地跳过它们）。
2. 让解析器打印未知键的警告。
3.添加功能`save_config()`将结构写回文件。
4.添加`reload_config()`在运行时更新设置。
5. 实施你自己的`.ini`格式解析器支持`[section]`标头。

通过配置文件，您的 C 程序可以获得灵活性和实际可用性，它们可以像专业系统软件一样适应、重新加载和保留设置。接下来，您将学习如何将结构序列化和反序列化到磁盘，这是第 49 节中持久数据处理的下一个级别。
