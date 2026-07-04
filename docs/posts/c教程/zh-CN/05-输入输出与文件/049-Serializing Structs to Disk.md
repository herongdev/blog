---
title: "49. 将结构序列化到磁盘"
date: "2026-07-04"
lang: "zh-CN"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "05-输入输出与文件"
  - "中文"
description: "The Little Book of C 中文版 — 49. 将结构序列化到磁盘"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
translator: "机器辅助翻译（Google Translate）"
section: 49
sidebarWeight: 49
alternateZh: "/posts/c教程/zh-CN/05-输入输出与文件/049-Serializing Structs to Disk"
alternateEn: "/posts/c教程/en-US/05-Input Output and Files/049-Serializing Structs to Disk"
---

[English version](/posts/c教程/en-US/05-Input Output and Files/049-Serializing Structs to Disk)

到目前为止，您已经使用了文本文件、配置文件和基本二进制数据。现在是时候将这些想法结合到更强大的序列化中了：将完整的 C 结构保存到磁盘并稍后恢复它们，就像它们在内存中一样。

这是操作系统和游戏中数据库、缓存和持久状态的基础。

#### 什么是序列化？

序列化意味着将内存中的数据转换为可以存储或传输的格式（如文件）。反序列化则相反：从文件中重建该数据。

在 C 中，这通常意味着将结构直接写为二进制数据`fwrite()`并读回它们`fread()`.

#### 步骤 1. 定义要存储的结构

```
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
typedef struct {
    int id;
    char name[50];
    float price;
} Product;
```

每个字段都是固定大小的，这使得可以安全地以二进制形式直接写入磁盘。

#### 步骤 2. 将结构写入磁盘

```
void save_products(const char *filename, Product *arr, size_t count) {
    FILE *fp = fopen(filename, "wb");
    if (!fp) {
        perror("Cannot open file for writing");
        exit(1);
    }
    fwrite(arr, sizeof(Product), count, fp);
    fclose(fp);
}
```

#### 步骤 3. 从磁盘读取结构

```
size_t load_products(const char *filename, Product *arr, size_t max_count) {
    FILE *fp = fopen(filename, "rb");
    if (!fp) {
        perror("Cannot open file for reading");
        return 0;
    }
    size_t n = fread(arr, sizeof(Product), max_count, fp);
    fclose(fp);
    return n;
}
```

#### 小代码：完整示例

```
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
typedef struct {
    int id;
    char name[50];
    float price;
} Product;
void save_products(const char *filename, Product *arr, size_t count) {
    FILE *fp = fopen(filename, "wb");
    if (!fp) {
        perror("Cannot open file");
        exit(1);
    }
    fwrite(arr, sizeof(Product), count, fp);
    fclose(fp);
}
size_t load_products(const char *filename, Product *arr, size_t max_count) {
    FILE *fp = fopen(filename, "rb");
    if (!fp) {
        perror("Cannot open file");
        return 0;
    }
    size_t n = fread(arr, sizeof(Product), max_count, fp);
    fclose(fp);
    return n;
}
int main(void) {
    Product products[3] = {
        {1, "Notebook", 2.99},
        {2, "Pencil", 0.49},
        {3, "Backpack", 25.00}
    };
    save_products("store.bin", products, 3);
    printf("Products saved.\n");
    Product loaded[3];
    size_t n = load_products("store.bin", loaded, 3);
    printf("Loaded %zu products:\n", n);
    for (size_t i = 0; i < n; i++)
        printf("%d | %-10s | $%.2f\n", loaded[i].id, loaded[i].name, loaded[i].price);
    return 0;
}
```

输出：

```
Products saved.
Loaded 3 products:
1 | Notebook   | $2.99
2 | Pencil     | $0.49
3 | Backpack   | $25.00
```

#### 步骤 4. 追加记录

您可以使用追加模式添加更多数据而不覆盖`"ab"`:

```
Product p = {4, "Eraser", 0.99};
FILE *fp = fopen("store.bin", "ab");
fwrite(&p, sizeof(Product), 1, fp);
fclose(fp);
```

#### 步骤 5. 随机访问记录

您可以使用`fseek()`跳转到特定记录（对于一次更新或读取一条记录很有用）。

```
FILE *fp = fopen("store.bin", "rb");
fseek(fp, sizeof(Product) * 1, SEEK_SET);  // skip first record
Product p;
fread(&p, sizeof(Product), 1, fp);
printf("Record 2: %s\n", p.name);
fclose(fp);
```

#### 步骤 6. 可移植性考虑因素

像这样的序列化是依赖于机器的，因为：

- Endianness（整数/浮点数的字节顺序）
- 结构填充（编译器对齐）
- 数据类型大小

为了使其便携：

- 使用`#pragma pack(1)`或者`__attribute__((packed))`禁用填充。
- 将整数转换为标准字节顺序（例如，使用`htonl()`和`ntohl()`).
- 考虑使用基于文本或可移植的格式（例如 CSV、JSON 或 protobuf）进行跨平台存储。

#### 步骤 7. 基于文本的替代方案（人类可读）

```
void save_as_text(const char *filename, Product *arr, size_t count) {
    FILE *fp = fopen(filename, "w");
    if (!fp) return;
    for (size_t i = 0; i < count; i++)
        fprintf(fp, "%d,%s,%.2f\n", arr[i].id, arr[i].name, arr[i].price);
    fclose(fp);
}
```

这会产生：

```
1,Notebook,2.99
2,Pencil,0.49
3,Backpack,25.00
```

易于阅读，但解析速度较慢且空间利用率较低。

#### 为什么它很重要

序列化使您的 C 程序有状态，它们可以保存进度、存储数据或重新启动后恢复。它的基础是：

- 数据库和键值存储
- 在游戏中保存文件
- 科学软件中的检查点
- 系统守护进程和缓存

您现在正在用 C 处理真正的持久性。

#### 自己尝试一下

1.添加功能`add_product()`安全地附加新记录。
2. 实施`list_products()`打印文件中的所有产品。
3. 添加“按 id 删除”操作，将除一条记录外的所有记录复制到新文件中。
4. 结构填充实验（`sizeof(Product)`可能不是你所期望的）。
5. 添加校验和字段以检测损坏的数据。

您现在知道如何以二进制或文本形式保存结构化数据。接下来，您将通过结合所有这些知识来结束第 5 章，编写一个日志读取器和写入器系统来记录事件、轮换文件并在启动时安全地重播日志。
