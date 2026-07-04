---
title: "43. Reading and Writing Binary Files"
date: "2026-07-04"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "Input Output and Files"
description: "The Little Book of C — 43. Reading and Writing Binary Files"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
section: 43
sidebarWeight: 43
lang: "en-US"
alternateEn: "/posts/c教程/en-US/05-Input Output and Files/043-Reading and Writing Binary Files"
alternateZh: "/posts/c教程/zh-CN/05-输入输出与文件/043-Reading and Writing Binary Files"
---
[中文版本](/posts/c教程/zh-CN/05-输入输出与文件/043-Reading and Writing Binary Files)

Text files are easy to read but not always efficient. Binary files, on the other hand, store raw bytes exactly as they exist in memory, no formatting, no conversions. They’re ideal for saving arrays, structs, or any data that must be written and read back quickly without loss or rounding.

#### Text vs Binary

| Aspect | Text File | Binary File |
| --- | --- | --- |
| Format | Human-readable (ASCII) | Raw bytes |
| Size | Larger (extra characters, newlines) | Smaller (compact form) |
| Read/Write | `fprintf`,`fscanf`,`fgets` | `fwrite`,`fread` |
| Use Case | Logs, config, reports | Structs, images, executables, serialized data |

When you open a file for binary I/O, add`b` to the mode:

```
FILE *fp = fopen("data.bin", "wb"); // write binary
FILE *fp = fopen("data.bin", "rb"); // read binary
```

#### Writing Binary Data

Let’s write an array of integers directly to disk.

```
#include <stdio.h>
int main(void) {
    int numbers[] = {10, 20, 30, 40, 50};
    size_t count = sizeof(numbers) / sizeof(numbers[0]);
    FILE *fp = fopen("numbers.bin", "wb");
    if (!fp) {
        perror("Failed to open file");
        return 1;
    }
    fwrite(numbers, sizeof(int), count, fp);
    fclose(fp);
    printf("Wrote %zu integers to numbers.bin\n", count);
    return 0;
}
```

This writes 5 integers (4 bytes each on most systems) directly to disk as raw bytes, no text conversion.

#### Reading Binary Data

Now let’s read them back:

```
#include <stdio.h>
int main(void) {
    int numbers[5];
    FILE *fp = fopen("numbers.bin", "rb");
    if (!fp) {
        perror("Failed to open file");
        return 1;
    }
    size_t n = fread(numbers, sizeof(int), 5, fp);
    fclose(fp);
    printf("Read %zu integers:\n", n);
    for (size_t i = 0; i < n; i++)
        printf("%d ", numbers[i]);
    printf("\n");
    return 0;
}
```

Output:

```
Wrote 5 integers to numbers.bin
Read 5 integers:
10 20 30 40 50
```

#### Writing and Reading Structs

You can store whole structures directly using the same pattern.

```
#include <stdio.h>
#include <stdlib.h>
typedef struct {
    int id;
    float price;
    char title[50];
} Book;
int main(void) {
    Book b1 = {1, 9.99, "The C Book"};
    Book b2 = {2, 15.49, "Algorithms in C"};
    FILE *fp = fopen("books.bin", "wb");
    if (!fp) return 1;
    fwrite(&b1, sizeof(Book), 1, fp);
    fwrite(&b2, sizeof(Book), 1, fp);
    fclose(fp);
    fp = fopen("books.bin", "rb");
    if (!fp) return 1;
    Book b;
    while (fread(&b, sizeof(Book), 1, fp) == 1)
        printf("%d | %s | %.2f\n", b.id, b.title, b.price);
    fclose(fp);
    return 0;
}
```

Output:

```
1 | The C Book | 9.99
2 | Algorithms in C | 15.49
```

#### Handling Endianness

Binary files depend on the CPU’s byte order (endianness). If you write on a little-endian machine and read on a big-endian one, bytes may appear reversed.

For portable formats, you can:

- Use standardized serialization (like Protocol Buffers or MessagePack).
- Convert manually using bit shifts or network-byte-order functions (`htonl`,`ntohl`).

Example for manual conversion:

```
unsigned int to_big_endian(unsigned int x) {
    return ((x & 0xFF) << 24) |
           ((x & 0xFF00) << 8) |
           ((x & 0xFF0000) >> 8) |
           ((x >> 24) & 0xFF);
}
```

#### Appending Binary Data

You can append more records with mode`"ab"`:

```
Book b3 = {3, 21.75, "Advanced C"};
FILE *fp = fopen("books.bin", "ab");
fwrite(&b3, sizeof(Book), 1, fp);
fclose(fp);
```

#### Binary File Utilities

| Function | Purpose |
| --- | --- |
| `fwrite(ptr, size, count, file)` | Write binary data |
| `fread(ptr, size, count, file)` | Read binary data |
| `fseek(file, offset, origin)` | Move position |
| `ftell(file)` | Get current position |
| `rewind(file)` | Go back to start |

#### Why It Matters

Binary I/O is essential for:

- Saving large datasets efficiently
- Game save files, multimedia formats, or scientific data
- Databases and memory-mapped storage
- Embedded and system-level tools

It’s the foundation of serialization, transforming data in memory into bytes that can travel or persist.

#### Try It Yourself

1. Save an array of`double` values and read them back.
2. Modify the struct example to include an`enum` field and test the binary result.
3. Implement a function`count_records(filename)` that counts how many structs are stored.
4. Use`fseek()` to jump to the third record and print only that one.
5. Write both text and binary versions of the same file and compare sizes.

Binary I/O connects C’s low-level power to real-world storage efficiency. Next, you’ll expand this further by understanding standard streams, how to use`stdin`,`stdout`, and`stderr` to build flexible, composable command-line tools.
