---
title: "94. Simple Key-Value Store"
date: "2026-07-04"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "Building Real Projects"
description: "The Little Book of C — 94. Simple Key-Value Store"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
section: 94
sidebarWeight: 94
lang: "en-US"
alternateEn: "/posts/c教程/en-US/10-Building Real Projects/094-Simple Key-Value Store"
alternateZh: "/posts/c教程/zh-CN/10-真实项目/094-Simple Key-Value Store"
---
[中文版本](/posts/c教程/zh-CN/10-真实项目/094-Simple Key-Value Store)

Databases look scary until you build one yourself. In this section you will write a tiny append only key value store that persists data to disk, loads an in memory index on startup, and supports`get` and`set` from a simple CLI.

You will learn files, serialization, indexing, and crash safety basics.

#### Step 1. Design the file format

Keep it simple and binary. Each record is append only:

```
[ u32 key_len ][ u32 val_len ][ key bytes ][ value bytes ]
```

- All integers are stored as big endian so the file is portable.
- No in place updates. Setting the same key again appends a new record.

#### Step 2. Endianness helpers

We will use`htonl` and`ntohl` to encode and decode 32 bit lengths.

```
#include <arpa/inet.h>   // Windows: winsock2.h
static inline uint32_t be32(uint32_t x)  { return htonl(x);  }
static inline uint32_t from_be32(uint32_t x) { return ntohl(x); }
```

#### Step 3. The in memory index

On startup, scan the log file once and build a hash map of key -> file offset of the newest record. We will implement a simple open addressing hash table for clarity.

Index entry:

```
typedef struct {
    uint64_t offset;   // file position of record start
    uint32_t key_hash; // cached hash for quick probing
    uint32_t key_len;  // used to confirm match
} kv_slot;
```

#### Step 4. Hashing

Use a compact 32 bit FNV-1a hash for strings.

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

#### Step 5. Tiny Code: core implementation

A single file version to keep things approachable.

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

Build:

```
gcc -std=c23 -O2 -Wall -Wextra kv.c -o kv
```

Run:

```
./kv store.log set color blue
./kv store.log get color
# prints: blue
```

#### Step 6. Compaction

Because we append forever, the log grows. Implement a simple compact command that rewrites only the latest version of each key to a new file, then swaps files.

Idea:

1. Iterate index
2. Read the newest record for each key
3. Append it to`store.log.new`
4. Replace the old file

This keeps disk usage under control and speeds up startup scanning.

#### Step 7. Crash safety basics

- Always`fflush` after appending a record.
- For stronger durability call`fsync(fileno(db->f))` on POSIX after`fflush`.
- Write whole records or none. Length headers first, then key, then value.
- Consider a checksum per record to detect torn writes.

#### Step 8. CLI improvements

Add subcommands:

```
kv <file> set <k> <v>
kv <file> get <k>
kv <file> compact
kv <file> stats
```

`stats` can print number of keys, file size, load factor, and index capacity.

#### Step 9. Testing

Insert 10k keys, then get a random 100 keys and verify values.

Overwrite the same key many times and ensure`get` returns the latest one.

Kill the program during writes and ensure the log is still readable.

Run with AddressSanitizer to catch memory bugs:

```
clang -std=c23 -O1 -g -fsanitize=address,undefined kv.c -o kv_asan
```

#### Step 10. Why it matters

This tiny store teaches the core database loop:

- Log structured storage for durability
- In memory index for speed
- Compaction for space and locality
- Portable encoding for cross platform reads

You just built the foundation that many production systems use at larger scale.

#### Try it yourself

1. Add a delete tombstone record type and have`get` respect it.
2. Store expiration timestamps and implement a`purge` command.
3. Use memory mapped I O for reads to speed up lookups.
4. Replace the linear probing table with a chained hash or hopscotch hashing.
5. Add a simple checksum per record and verify on read.

Next you will implement 95. Implementing a Custom Allocator where you will learn how`malloc` like systems manage the heap, and write a tiny arena allocator you can drop into small C projects.
