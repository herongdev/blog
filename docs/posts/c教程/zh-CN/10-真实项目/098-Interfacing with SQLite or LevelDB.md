---
title: "98. 与 SQLite 或 LevelDB 接口"
date: "2026-07-04"
lang: "zh-CN"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "10-真实项目"
  - "中文"
description: "The Little Book of C 中文版 — 98. 与 SQLite 或 LevelDB 接口"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
translator: "机器辅助翻译（Google Translate）"
section: 98
sidebarWeight: 98
alternateZh: "/posts/c教程/zh-CN/10-真实项目/098-Interfacing with SQLite or LevelDB"
alternateEn: "/posts/c教程/en-US/10-Building Real Projects/098-Interfacing with SQLite or LevelDB"
---

[English version](/posts/c教程/en-US/10-Building Real Projects/098-Interfacing with SQLite or LevelDB)

是时候将 C 程序连接到实际数据了。在本节中，您将讨论两种流行的嵌入式数据库：

- SQLite：单个文件中的关系、SQL 查询、ACID 事务
- LevelDB：键值存储，按键排序，快速读写

您将编写使用两个引擎插入和查询数据的小程序。

#### 步骤 1. 何时选择

- 当您需要表、索引、SQL 和事务时选择 SQLite
- 当您想要一个简单的排序键值存储，没有 SQL，并且您可以控制应用程序中的架构时，请选择 LevelDB

两者都是可嵌入的并且不需要单独的服务器进程。

#### 步骤 2. 安装标头和库

在使用 Homebrew 或 apt 的 Linux 或 macOS 上：

```
# SQLite
sudo apt install libsqlite3-dev        # Debian based
# or
brew install sqlite                    # macOS
# LevelDB
sudo apt install libleveldb-dev        # Debian based
# or
brew install leveldb                   # macOS
```

Windows 用户可以获取预构建的二进制文件或从源代码构建并链接 .lib 文件。

#### 步骤 3. SQLite 的小代码：创建、插入、查询

```
// file: sqlite_demo.c
#include <stdio.h>
#include <sqlite3.h>
static int print_row(void *unused, int argc, char **argv, char **col) {
    for (int i = 0; i < argc; i++)
        printf("%s = %s\n", col[i], argv[i] ? argv[i] : "NULL");
    puts("---");
    return 0;
}
int main(void) {
    sqlite3 *db = NULL;
    if (sqlite3_open("people.db", &db) != SQLITE_OK) {
        fprintf(stderr, "open: %s\n", sqlite3_errmsg(db));
        return 1;
    }
    const char *ddl =
        "CREATE TABLE IF NOT EXISTS people ("
        " id INTEGER PRIMARY KEY AUTOINCREMENT,"
        " name TEXT NOT NULL,"
        " age INTEGER NOT NULL"
        ");";
    if (sqlite3_exec(db, ddl, NULL, NULL, NULL) != SQLITE_OK) {
        fprintf(stderr, "ddl: %s\n", sqlite3_errmsg(db));
        return 1;
    }
    // Use prepared statements for safety and speed
    const char *ins = "INSERT INTO people(name, age) VALUES(?, ?);";
    sqlite3_stmt *stmt = NULL;
    if (sqlite3_prepare_v2(db, ins, -1, &stmt, NULL) != SQLITE_OK) {
        fprintf(stderr, "prepare: %s\n", sqlite3_errmsg(db));
        return 1;
    }
    struct { const char *name; int age; } rows[] = {
        {"Ada", 36}, {"Linus", 55}, {"Grace", 61}
    };
    for (int i = 0; i < 3; i++) {
        sqlite3_reset(stmt);
        sqlite3_clear_bindings(stmt);
        sqlite3_bind_text(stmt, 1, rows[i].name, -1, SQLITE_TRANSIENT);
        sqlite3_bind_int(stmt,  2, rows[i].age);
        if (sqlite3_step(stmt) != SQLITE_DONE) {
            fprintf(stderr, "insert: %s\n", sqlite3_errmsg(db));
            return 1;
        }
    }
    sqlite3_finalize(stmt);
    const char *q = "SELECT id, name, age FROM people WHERE age >= ? ORDER BY age DESC;";
    if (sqlite3_prepare_v2(db, q, -1, &stmt, NULL) != SQLITE_OK) {
        fprintf(stderr, "prepare q: %s\n", sqlite3_errmsg(db));
        return 1;
    }
    sqlite3_bind_int(stmt, 1, 40);
    while (sqlite3_step(stmt) == SQLITE_ROW) {
        int id = sqlite3_column_int(stmt, 0);
        const unsigned char *name = sqlite3_column_text(stmt, 1);
        int age = sqlite3_column_int(stmt, 2);
        printf("id=%d name=%s age=%d\n", id, name, age);
    }
    sqlite3_finalize(stmt);
    sqlite3_close(db);
    return 0;
}
```

构建并运行：

```
gcc -std=c23 -O2 sqlite_demo.c -lsqlite3 -o sqlite_demo
./sqlite_demo
```

您应该会看到为 40 岁或以上的人打印的行。

#### 步骤 4. C 语言中的 SQLite 最佳实践

- 始终使用准备好的语句`?`占位符
- 随时打电话`sqlite3_finalize`关于声明
- 包裹批次`BEGIN`和`COMMIT`为了速度
- 检查每个返回码并打印`sqlite3_errmsg(db)`出错时
- 使用`sqlite3_last_insert_rowid`获取新的主键

#### 步骤 5. LevelDB 的小代码：打开、放置、获取、迭代

LevelDB 有一个反映 C++ API 的 C API。

```
// file: leveldb_demo.c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <leveldb/c.h>
int main(void) {
    char *err = NULL;
    leveldb_options_t *opts = leveldb_options_create();
    leveldb_options_set_create_if_missing(opts, 1);
    leveldb_t *db = leveldb_open(opts, "kvdb", &err);
    if (err) { fprintf(stderr, "open: %s\n", err); leveldb_free(err); return 1; }
    leveldb_writeoptions_t *wopt = leveldb_writeoptions_create();
    leveldb_readoptions_t  *ropt = leveldb_readoptions_create();
    // Put some keys
    leveldb_put(db, wopt, "name", 4, "Ada", 3, &err);
    if (err) { fprintf(stderr, "put: %s\n", err); leveldb_free(err); err = NULL; }
    leveldb_put(db, wopt, "lang", 4, "C", 1, &err);
    leveldb_put(db, wopt, "year", 4, "1972", 4, &err);
    // Get a value
    size_t vlen = 0;
    char *val = leveldb_get(db, ropt, "name", 4, &vlen, &err);
    if (err) { fprintf(stderr, "get: %s\n", err); leveldb_free(err); err = NULL; }
    if (val) { printf("name=%.*s\n", (int)vlen, val); leveldb_free(val); }
    // Iterate in key order
    leveldb_iterator_t *it = leveldb_create_iterator(db, ropt);
    leveldb_iter_seek_to_first(it);
    while (leveldb_iter_valid(it)) {
        size_t klen, vlen2;
        const char *k = leveldb_iter_key(it, &klen);
        const char *v = leveldb_iter_value(it, &vlen2);
        printf("%.*s=%.*s\n", (int)klen, k, (int)vlen2, v);
        leveldb_iter_next(it);
    }
    if ((err = (char*)leveldb_iter_get_error(it)) && *err) {
        fprintf(stderr, "iter: %s\n", err);
    }
    leveldb_iter_destroy(it);
    // Clean up
    leveldb_readoptions_destroy(ropt);
    leveldb_writeoptions_destroy(wopt);
    leveldb_close(db);
    leveldb_options_destroy(opts);
    return 0;
}
```

构建并运行：

```
gcc -std=c23 -O2 leveldb_demo.c -lleveldb -o leveldb_demo
./leveldb_demo
```

您应该会看到按排序键顺序排列的键值对。

#### 步骤 6. 交易和持久性

SQLite有完整的事务

- 使用`BEGIN IMMEDIATE;`然后你的插入`COMMIT;`
- 为了确保崩溃安全，请使用默认的回滚日志或 WAL 模式

LevelDB 具有每个键的原子写入和批量写入

- 使用`leveldb_writebatch_t`以原子方式对放置和删除进行分组
- 同步到磁盘`leveldb_writeoptions_set_sync(wopt, 1)`

#### 步骤 7. SQLite 的参数绑定和类型安全

使用正确的绑定和列函数：

-`sqlite3_bind_int`,`sqlite3_bind_int64`,`sqlite3_bind_double`,`sqlite3_bind_text`
-`sqlite3_column_int`,`sqlite3_column_int64`,`sqlite3_column_double`,`sqlite3_column_text`

切勿通过字符串连接与用户输入来构建 SQL。绑定可以防止 SQL 注入并为您处理转义。

#### 步骤 8. 使用二进制数据

- SQLite：使用`sqlite3_bind_blob`和`sqlite3_column_blob`有单独的长度
- LevelDB：键和值是原始字节跨度`(ptr, length)`，所以二进制是自然的

您可以存储序列化结构、protobuf 或 JSON。请记住定义您自己的版本以实现兼容性。

#### 步骤 9. 架构和索引想法

SQLite

- 规范化为具有主键和外键的表
- 为频繁查找创建索引
- 使用`PRAGMA foreign_keys = ON;`强制执行约束

水平数据库

- 设计复合键来编码访问模式
- 例子：`user: `对于用户行，`user_email: `指向` `
- 范围扫描很简单：存储密钥，例如`post:: `并按前缀迭代

#### 第 10 步：为什么这很重要

嵌入数据库使您的 C 程序从玩具变成了工具。您现在知道如何：

- 使用 SQLite 执行 SQL 查询和准备好的语句
- 将排序键值引擎与 LevelDB 结合使用
- 为每个问题选择正确的存储模型
- 处理持久性、二进制数据和 C 迭代

#### 自己尝试一下

1. 使用以下命令扩展 SQLite 演示`BEGIN`和`COMMIT`大约 10000 次插入的循环并测量时间。
2.添加索引`age`并比较查询性能。
3. 在 LevelDB 演示中添加一个插入 1000 个顺序键的写入批处理。
4. 在两个系统中存储二进制 blob 并将其读回。
5. 构建一个用于路由的小型 CLI`sql ...`到 SQLite 的行和`kv ...`到 LevelDB 的线路。

接下来是 99. 打包、版本控制和文档，您将学习如何像专业人士一样使用 Makefile、pkg 配置、语义版本控制和干净的 README 文档来发布代码。
