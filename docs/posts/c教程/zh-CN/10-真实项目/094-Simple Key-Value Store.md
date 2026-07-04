---
title: "94. 简单的键值存储"
date: "2026-07-04"
lang: "zh-CN"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "10-真实项目"
  - "中文"
description: "The Little Book of C 中文版 — 94. 简单的键值存储"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
translator: "机器辅助翻译（Google Translate）"
section: 94
sidebarWeight: 94
alternateZh: "/posts/c教程/zh-CN/10-真实项目/094-Simple Key-Value Store"
alternateEn: "/posts/c教程/en-US/10-Building Real Projects/094-Simple Key-Value Store"
---

[English version](/posts/c教程/en-US/10-Building Real Projects/094-Simple Key-Value Store)

在您自己构建数据库之前，数据库看起来很可怕。在本节中，您将编写一个小型仅附加键值存储，它将数据保存到磁盘，在启动时加载内存索引，并支持`get`和`set`通过简单的 CLI。

您将学习文件、序列化、索引和碰撞安全基础知识。

#### 步骤1.设计文件格式

保持简单和二元化。每条记录仅附加：

```
[ u32 key_len ][ u32 val_len ][ key bytes ][ value bytes ]
```

- 所有整数都以大端存储，因此文件是可移植的。
- 没有就地更新。再次设置相同的键会附加一条新记录。

#### 步骤 2. 字节序助手

我们将使用`htonl`和`ntohl`编码和解码 32 位长度。

```
#include <arpa/inet.h>   // Windows: winsock2.h
static inline uint32_t be32(uint32_t x)  { return htonl(x);  }
static inline uint32_t from_be32(uint32_t x) { return ntohl(x); }
```

#### 步骤 3. 内存索引

启动时，扫描一次日志文件并构建最新记录的 key -> 文件偏移量的哈希映射。为了清楚起见，我们将实现一个简单的开放寻址哈希表。

索引条目：

```
typedef struct {
    uint64_t offset;   // file position of record start
    uint32_t key_hash; // cached hash for quick probing
    uint32_t key_len;  // used to confirm match
} kv_slot;
```

#### 步骤 4. 散列

对字符串使用紧凑的 32 位 FNV-1a 哈希。

```
static uint32_t fnv1a(const unsigned char *s, size_t n) {
    uint32_t h = 2166136261u;
    for (size_t i = 0; i < n; i++) {
        h ^= s[i];
        h *= 16777619u;
    }
    return h;
}
```

#### 步骤 5. Tiny Code：核心实现

单一文件版本让事情变得平易近人。

```
// file: kv.c
#define _POSIX_C_SOURCE 200809L
#include <stdio.h>
#include <stdint.h>
#include <stdlib.h>
#include <string.h>
#include <arpa/inet.h>   // Windows: include <winsock2.h> and link Ws2_32
#include <errno.h>
typedef struct {
    FILE *f;
    char *path;
    // simple hash table index
    struct slot { uint64_t off; uint32_t h, klen; } *tab;
    size_t cap, used;
} kv_db;
static uint32_t fnv1a(const unsigned char *s, size_t n) {
    uint32_t h = 2166136261u;
    for (size_t i = 0; i < n; i++) { h ^= s[i]; h *= 16777619u; }
    return h;
}
static size_t next_pow2(size_t n) { size_t p = 1; while (p < n) p <<= 1; return p; }
static int kv_index_put(kv_db *db, const unsigned char *key, uint32_t klen, uint64_t off) {
    if (db->used * 2 >= db->cap) { // grow
        size_t ncap = db->cap ? db->cap * 2 : 1024;
        struct slot *old = db->tab;
        size_t oldcap = db->cap;
        db->tab = calloc(ncap, sizeof(*db->tab));
        if (!db->tab) return -1;
        db->cap = ncap; db->used = 0;
        for (size_t i = 0; i < oldcap; i++) if (old[i].off) {
            // reinsert based on stored key hash and key length
            size_t m = ncap - 1, j = old[i].h & m;
            while (db->tab[j].off) j = (j + 1) & m;
            db->tab[j] = old[i];
            db->used++;
        }
        free(old);
    }
    uint32_t h = fnv1a(key, klen);
    size_t m = db->cap - 1, i = h & m;
    while (db->tab[i].off) {
        if (db->tab[i].h == h && db->tab[i].klen == klen) { db->tab[i].off = off; return 0; }
        i = (i + 1) & m;
    }
    db->tab[i].off = off; db->tab[i].h = h; db->tab[i].klen = klen; db->used++;
    return 0;
}
static long kv_index_find_slot(kv_db *db, const unsigned char *key, uint32_t klen) {
    if (db->cap == 0) return -1;
    uint32_t h = fnv1a(key, klen);
    size_t m = db->cap - 1, i = h & m, steps = 0;
    while (db->tab[i].off && steps <= db->cap) {
        if (db->tab[i].h == h && db->tab[i].klen == klen) return (long)i;
        i = (i + 1) & m; steps++;
    }
    return -1;
}
static int kv_open(kv_db *db, const char *path) {
    memset(db, 0, sizeof(*db));
    db->path = strdup(path);
    db->f = fopen(path, "ab+");
    if (!db->f) return -1;
    fflush(db->f);
    // build index by scanning from start
    FILE *r = fopen(path, "rb");
    if (!r) return -1;
    // start with some capacity
    db->cap = 1024; db->tab = calloc(db->cap, sizeof(*db->tab));
    if (!db->tab) return -1;
    uint64_t off = 0;
    for (;;) {
        uint32_t klen_be, vlen_be;
        if (fread(&klen_be, 4, 1, r) != 1) break;
        if (fread(&vlen_be, 4, 1, r) != 1) break;
        uint32_t klen = ntohl(klen_be), vlen = ntohl(vlen_be);
        unsigned char *k = malloc(klen);
        if (!k) break;
        if (fread(k, 1, klen, r) != klen) { free(k); break; }
        if (fseek(r, vlen, SEEK_CUR) != 0) { free(k); break; }
        kv_index_put(db, k, klen, off);
        free(k);
        off += 8u + klen + vlen;
    }
    fclose(r);
    return 0;
}
static int kv_set(kv_db *db, const unsigned char *key, uint32_t klen,
                  const unsigned char *val, uint32_t vlen) {
    uint32_t klen_be = htonl(klen), vlen_be = htonl(vlen);
    if (fwrite(&klen_be, 4, 1, db->f) != 1) return -1;
    if (fwrite(&vlen_be, 4, 1, db->f) != 1) return -1;
    if (fwrite(key, 1, klen, db->f) != klen) return -1;
    if (fwrite(val, 1, vlen, db->f) != vlen) return -1;
    fflush(db->f); // durability: fsync would be stronger
    // compute offset of the record we just wrote
    long end = ftell(db->f);
    if (end < 0) return -1;
    uint64_t off = (uint64_t)end - (8u + klen + vlen);
    return kv_index_put(db, key, klen, off);
}
static int kv_get(kv_db *db, const unsigned char *key, uint32_t klen,
                  unsigned char **out, uint32_t *outlen) {
    long s = kv_index_find_slot(db, key, klen);
    if (s < 0) return -1;
    uint64_t off = db->tab[s].off;
    if (fseek(db->f, (long)off, SEEK_SET) != 0) return -1;
    uint32_t klen_be, vlen_be;
    if (fread(&klen_be, 4, 1, db->f) != 1) return -1;
    if (fread(&vlen_be, 4, 1, db->f) != 1) return -1;
    uint32_t kL = ntohl(klen_be), vL = ntohl(vlen_be);
    unsigned char *kbuf = malloc(kL);
    if (!kbuf) return -1;
    if (fread(kbuf, 1, kL, db->f) != kL) { free(kbuf); return -1; }
    // confirm key match to be safe
    if (kL != klen || memcmp(kbuf, key, klen) != 0) { free(kbuf); return -1; }
    free(kbuf);
    unsigned char *v = malloc(vL + 1);
    if (!v) return -1;
    if (fread(v, 1, vL, db->f) != vL) { free(v); return -1; }
    v[vL] = 0; // NUL terminate for convenience
    *out = v; *outlen = vL;
    return 0;
}
static void kv_close(kv_db *db) {
    if (!db) return;
    if (db->f) fclose(db->f);
    free(db->tab);
    free(db->path);
}
static void usage(const char *p) {
    fprintf(stderr, "Usage: %s <file> get <key>\n", p);
    fprintf(stderr, "       %s <file> set <key> <value>\n", p);
}
int main(int argc, char **argv) {
    if (argc < 4) { usage(argv[0]); return 1; }
    kv_db db;
    if (kv_open(&db, argv[1]) != 0) { perror("open"); return 1; }
    const char *cmd = argv[2];
    if (strcmp(cmd, "set") == 0) {
        if (argc < 5) { usage(argv[0]); kv_close(&db); return 1; }
        const unsigned char *k = (const unsigned char *)argv[3];
        const unsigned char *v = (const unsigned char *)argv[4];
        if (kv_set(&db, k, (uint32_t)strlen((char*)k), v, (uint32_t)strlen((char*)v)) != 0)
            perror("set");
    } else if (strcmp(cmd, "get") == 0) {
        const unsigned char *k = (const unsigned char *)argv[3];
        unsigned char *out = NULL; uint32_t n = 0;
        if (kv_get(&db, k, (uint32_t)strlen((char*)k), &out, &n) == 0) {
            fwrite(out, 1, n, stdout);
            fputc('\n', stdout);
            free(out);
        } else {
            fprintf(stderr, "not found\n");
        }
    } else {
        usage(argv[0]);
    }
    kv_close(&db);
    return 0;
}
```

建造：

```
gcc -std=c23 -O2 -Wall -Wextra kv.c -o kv
```

跑步：

```
./kv store.log set color blue
./kv store.log get color
# prints: blue
```

#### 步骤 6. 压实

因为我们永远追加，所以日志会增长。实现一个简单的紧凑命令，仅将每个密钥的最新版本重写到新文件，然后交换文件。

主意：

1. 迭代索引
2.读取每个key的最新记录
3. 将其附加到`store.log.new`
4.替换旧文件

这可以控制磁盘使用并加快启动扫描速度。

#### 步骤 7. 碰撞安全基础知识

- 总是`fflush`添加一条记录后。
- 更强的耐用性`fsync(fileno(db->f))`在 POSIX 之后`fflush`.
- 写入整个记录或不写入。首先是长度标头，然后是键，然后是值。
- 考虑每个记录的校验和来检测撕裂的写入。

#### 步骤 8.CLI 改进

添加子命令：

```
kv <file> set <k> <v>
kv <file> get <k>
kv <file> compact
kv <file> stats
```

`stats`可以打印键数、文件大小、负载因子和索引容量。

#### 步骤 9. 测试

插入 10k 个密钥，然后随机获取 100 个密钥并验证值。

多次覆盖同一个密钥并确保`get`返回最新的一个。

在写入期间终止程序并确保日志仍然可读。

使用 AddressSanitizer 运行以捕获内存错误：

```
clang -std=c23 -O1 -g -fsanitize=address,undefined kv.c -o kv_asan
```

#### 第 10 步：为什么它很重要

这个小商店教授核心数据库循环：

- 日志结构化存储以实现持久性
- 内存索引以提高速度
- 空间和局部性的压缩
- 用于跨平台读取的便携式编码

您刚刚构建了许多生产系统大规模使用的基础。

#### 自己尝试一下

1.添加删除墓碑记录类型并有`get`尊重它。
2. 存储过期时间戳并实现`purge`命令。
3. 使用内存映射I O 进行读取，以加快查找速度。
4. 将线性探测表替换为链式哈希或跳房子哈希。
5. 为每条记录添加一个简单的校验和并在读取时进行验证。

接下来您将实现 95. 实现自定义分配器，您将在其中了解如何`malloc`就像系统管理堆一样，编写一个可以放入小型 C 项目的小型竞技场分配器。
