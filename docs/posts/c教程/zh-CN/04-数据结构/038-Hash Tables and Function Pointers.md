---
title: "38. 哈希表和函数指针"
date: "2026-07-04"
lang: "zh-CN"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "04-数据结构"
  - "中文"
description: "The Little Book of C 中文版 — 38. 哈希表和函数指针"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
translator: "机器辅助翻译（Google Translate）"
section: 38
sidebarWeight: 38
alternateZh: "/posts/c教程/zh-CN/04-数据结构/038-Hash Tables and Function Pointers"
alternateEn: "/posts/c教程/en-US/04-Structuring Data/038-Hash Tables and Function Pointers"
---

[English version](/posts/c教程/en-US/04-Structuring Data/038-Hash Tables and Function Pointers)

哈希表是计算中最重要的数据结构之一，快速、灵活且基础。它们通过哈希函数将键映射到值，为您提供平均 O(1) 查找、插入和删除。在本节中，您将从头开始使用 C 语言构建一个简单的哈希表，使用结构体、数组和函数指针进行哈希和比较操作。

#### 什么是哈希表？

哈希表将数据存储为键值对。当您插入密钥时：

1. 哈希函数将其转换为整数索引。
2. 数据存储在数组的该槽中。
3. 稍后搜索时，会再次对键进行哈希处理以找到相同的索引。

如果多个键映射到同一个槽，则称为冲突，通过链接（链表）或开放寻址来处理。

#### 简单的设计

我们将使用链接，表中的每个槽都是共享相同哈希的键值对的链接列表。

```
typedef struct Entry {
    char *key;
    int value;
    struct Entry *next;
} Entry;
typedef struct {
    Entry **buckets; // array of linked lists
    size_t size;
} HashTable;
```

#### 哈希函数

一个基本的字符串哈希函数（djb2 算法）：

```
#include <stddef.h>
unsigned long hash_string(const char *str) {
    unsigned long hash = 5381;
    int c;
    while ((c = *str++))
        hash = ((hash << 5) + hash) + c; // hash * 33 + c
    return hash;
}
```

#### 小代码：哈希表实现

```
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
typedef struct Entry {
    char *key;
    int value;
    struct Entry *next;
} Entry;
typedef struct {
    Entry **buckets;
    size_t size;
} HashTable;
unsigned long hash_string(const char *str) {
    unsigned long hash = 5381;
    int c;
    while ((c = *str++))
        hash = ((hash << 5) + hash) + c;
    return hash;
}
HashTable* create_table(size_t size) {
    HashTable *t = malloc(sizeof(HashTable));
    t->size = size;
    t->buckets = calloc(size, sizeof(Entry*));
    return t;
}
Entry* create_entry(const char *key, int value) {
    Entry *e = malloc(sizeof(Entry));
    e->key = strdup(key);
    e->value = value;
    e->next = NULL;
    return e;
}
void insert(HashTable *t, const char *key, int value) {
    unsigned long index = hash_string(key) % t->size;
    Entry *new_entry = create_entry(key, value);
    new_entry->next = t->buckets[index];
    t->buckets[index] = new_entry;
}
Entry* search(HashTable *t, const char *key) {
    unsigned long index = hash_string(key) % t->size;
    for (Entry *e = t->buckets[index]; e; e = e->next)
        if (strcmp(e->key, key) == 0)
            return e;
    return NULL;
}
void free_table(HashTable *t) {
    for (size_t i = 0; i < t->size; i++) {
        Entry *e = t->buckets[i];
        while (e) {
            Entry *next = e->next;
            free(e->key);
            free(e);
            e = next;
        }
    }
    free(t->buckets);
    free(t);
}
int main(void) {
    HashTable *table = create_table(8);
    insert(table, "apple", 5);
    insert(table, "banana", 7);
    insert(table, "orange", 10);
    Entry *result = search(table, "banana");
    if (result)
        printf("banana = %d\n", result->value);
    else
        printf("Key not found\n");
    free_table(table);
    return 0;
}
```

输出：

```
banana = 7
```

#### 使用函数指针实现通用性

我们可以通过让用户提供自定义哈希和比较函数来使哈希表通用：

```
typedef unsigned long (*HashFunc)(const void*);
typedef int (*CompareFunc)(const void*, const void*);
```

然后我们将它们嵌入到结构中：

```
typedef struct {
    Entry **buckets;
    size_t size;
    HashFunc hash;
    CompareFunc compare;
} GenericTable;
```

这使您可以对字符串、整数或结构重复使用同一个表，只需提供正确的哈希和比较函数即可。

例子：

```
unsigned long hash_int(const void *p) {
    return (*(int*)p) * 2654435761u;
}
```

#### 为什么它很重要

哈希表的功效：

- 编译器（符号表、变量范围）
- 数据库和缓存（键值存储）
- 操作系统（文件描述符映射、内核对象）
- 网络堆栈（路由表、ARP 缓存）

它们平衡了速度、简单性和控制，这是 C 语言高效系统设计的核心。

#### 常见陷阱

- 忘记处理碰撞（丢失数据）。
- 未能释放所有节点→内存泄漏。
- 使用较差的哈希函数 → 集群，性能下降。
- 满时不调整大小 → 效率降低。

设计良好的哈希表会动态增长（当负载超过阈值时，容量加倍并重新哈希）。

#### 自己尝试一下

1. 修改表以更新现有键，而不是总是插入新键。
2. 实现删除条目的delete(key) 函数。
3. 编写带有整数键的版本。
4. 实现 rehash()，在 75% 满时将表大小加倍。
5、用宏替换函数指针进行性能比较。

哈希表是 C 语言展示其全部威力的地方：原始指针、函数间接寻址和动态内存，所有这些一起工作以实现极快的查找。接下来，您将进一步深化这些想法，探索如何使用结构、函数指针和封装在 C 中模拟面向对象的设计。
