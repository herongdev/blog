---
title: "49. Serializing Structs to Disk"
date: "2026-07-04"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "Input Output and Files"
description: "The Little Book of C — 49. Serializing Structs to Disk"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
section: 49
sidebarWeight: 49
lang: "en-US"
alternateEn: "/posts/c教程/en-US/05-Input Output and Files/049-Serializing Structs to Disk"
alternateZh: "/posts/c教程/zh-CN/05-输入输出与文件/049-Serializing Structs to Disk"
---
[中文版本](/posts/c教程/zh-CN/05-输入输出与文件/049-Serializing Structs to Disk)

So far, you’ve worked with text files, configuration files, and basic binary data. Now it’s time to combine those ideas into something more powerful, serialization: saving complete C structs to disk and restoring them later, exactly as they were in memory.

This is the foundation for databases, caches, and persistent state in operating systems and games.

#### What Is Serialization?

Serialization means converting in-memory data into a format that can be stored or transmitted (like a file). Deserialization is the reverse: reconstructing that data from the file.

In C, this often means writing structs directly as binary data with`fwrite()` and reading them back with`fread()`.

#### Step 1. Define a Struct to Store

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

Each field is fixed-size, which makes it safe to write directly to disk as binary.

#### Step 2. Write Structs to Disk

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

#### Step 3. Read Structs from Disk

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

#### Tiny Code: Complete Example

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

Output:

```
Products saved.
Loaded 3 products:
1 | Notebook   | $2.99
2 | Pencil     | $0.49
3 | Backpack   | $25.00
```

#### Step 4. Appending Records

You can add more data without overwriting by using append mode`"ab"`:

```
Product p = {4, "Eraser", 0.99};
FILE *fp = fopen("store.bin", "ab");
fwrite(&p, sizeof(Product), 1, fp);
fclose(fp);
```

#### Step 5. Random Access to Records

You can use`fseek()` to jump to a specific record (useful for updating or reading one record at a time).

```
FILE *fp = fopen("store.bin", "rb");
fseek(fp, sizeof(Product) * 1, SEEK_SET);  // skip first record
Product p;
fread(&p, sizeof(Product), 1, fp);
printf("Record 2: %s\n", p.name);
fclose(fp);
```

#### Step 6. Portability Considerations

Serialization like this is machine-dependent because of:

- Endianness (byte order of integers/floats)
- Structure padding (compiler alignment)
- Data type sizes

To make it portable:

- Use`#pragma pack(1)` or`__attribute__((packed))` to disable padding.
- Convert integers to a standard byte order (e.g., use`htonl()` and`ntohl()`).
- Consider text-based or portable formats like CSV, JSON, or protobuf for cross-platform storage.

#### Step 7. Text-Based Alternative (Human-Readable)

```
void save_as_text(const char *filename, Product *arr, size_t count) {
    FILE *fp = fopen(filename, "w");
    if (!fp) return;
    for (size_t i = 0; i < count; i++)
        fprintf(fp, "%d,%s,%.2f\n", arr[i].id, arr[i].name, arr[i].price);
    fclose(fp);
}
```

This produces:

```
1,Notebook,2.99
2,Pencil,0.49
3,Backpack,25.00
```

Easy to read, but slower to parse and less space-efficient.

#### Why It Matters

Serialization makes your C programs stateful, they can save progress, store data, or recover after restarts. It’s the basis for:

- Databases and key-value stores
- Save files in games
- Checkpointing in scientific software
- System daemons and caches

You’re now handling real persistence in C.

#### Try It Yourself

1. Add a function`add_product()` that appends new records safely.
2. Implement`list_products()` that prints all products from file.
3. Add a “delete by id” operation by copying all but one record to a new file.
4. Experiment with structure padding (`sizeof(Product)` may not be what you expect).
5. Add a checksum field to detect corrupted data.

You now know how to persist structured data in binary or text form. Next, you’ll close Chapter 5 by combining all this knowledge, writing a log reader and writer system that records events, rotates files, and safely replays logs on startup.
