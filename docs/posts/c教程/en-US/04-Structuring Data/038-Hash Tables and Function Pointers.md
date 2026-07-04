---
title: "38. Hash Tables and Function Pointers"
date: "2026-07-04"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "Structuring Data"
description: "The Little Book of C — 38. Hash Tables and Function Pointers"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
section: 38
sidebarWeight: 38
lang: "en-US"
alternateEn: "/posts/c教程/en-US/04-Structuring Data/038-Hash Tables and Function Pointers"
alternateZh: "/posts/c教程/zh-CN/04-数据结构/038-Hash Tables and Function Pointers"
---
[中文版本](/posts/c教程/zh-CN/04-数据结构/038-Hash Tables and Function Pointers)

Hash tables are among the most important data structures in computing, fast, flexible, and foundational. They give you average O(1) lookup, insertion, and deletion by mapping keys to values through a hash function. In this section, you’ll build a simple hash table from scratch in C using structs, arrays, and function pointers for hash and comparison operations.

#### What Is a Hash Table?

A hash table stores data as key–value pairs. When you insert a key:

1. The hash function converts it into an integer index.
2. The data is stored in that slot of an array.
3. When you search later, the key is hashed again to find the same index.

If multiple keys map to the same slot, that’s called a collision, handled by chaining (linked lists) or open addressing.

#### Simple Design

We’ll use chaining, each slot in the table is a linked list of key–value pairs that share the same hash.

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

#### Hash Function

A basic string hash function (the djb2 algorithm):

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

#### Tiny Code: Hash Table Implementation

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

Output:

```
banana = 7
```

#### Using Function Pointers for Genericity

We can make the hash table generic by letting users provide custom hash and compare functions:

```
typedef unsigned long (*HashFunc)(const void*);
typedef int (*CompareFunc)(const void*, const void*);
```

Then we embed them in the struct:

```
typedef struct {
    Entry **buckets;
    size_t size;
    HashFunc hash;
    CompareFunc compare;
} GenericTable;
```

This lets you reuse the same table for strings, integers, or structs, just provide the right hash and compare functions.

Example:

```
unsigned long hash_int(const void *p) {
    return (*(int*)p) * 2654435761u;
}
```

#### Why It Matters

Hash tables power:

- Compilers (symbol tables, variable scopes)
- Databases and caches (key-value stores)
- Operating systems (file descriptor maps, kernel objects)
- Network stacks (routing tables, ARP caches)

They balance speed, simplicity, and control, the heart of efficient system design in C.

#### Common Pitfalls

- Forgetting to handle collisions (loses data).
- Failing to free all nodes → memory leaks.
- Using poor hash functions → clustering, performance drops.
- Not resizing when full → reduced efficiency.

A well-designed hash table grows dynamically (doubling capacity and rehashing when load exceeds a threshold).

#### Try It Yourself

1. Modify the table to update existing keys instead of always inserting new ones.
2. Implement a delete(key) function that removes an entry.
3. Write a version with integer keys.
4. Implement rehash() that doubles table size when 75% full.
5. Replace function pointers with macros for performance comparison.

Hash tables are where C shows its full power: raw pointers, function indirection, and dynamic memory, all working together for blazing-fast lookups. Next, you’ll take these ideas further and explore how to simulate object-oriented design in C using structs, function pointers, and encapsulation.
