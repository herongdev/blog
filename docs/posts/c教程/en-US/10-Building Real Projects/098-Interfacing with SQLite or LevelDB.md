---
title: "98. Interfacing with SQLite or LevelDB"
date: "2026-07-04"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "Building Real Projects"
description: "The Little Book of C — 98. Interfacing with SQLite or LevelDB"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
section: 98
sidebarWeight: 98
lang: "en-US"
alternateEn: "/posts/c教程/en-US/10-Building Real Projects/098-Interfacing with SQLite or LevelDB"
alternateZh: "/posts/c教程/zh-CN/10-真实项目/098-Interfacing with SQLite or LevelDB"
---
[中文版本](/posts/c教程/zh-CN/10-真实项目/098-Interfacing with SQLite or LevelDB)

Time to connect your C programs to real data. In this section you will talk to two popular embeddable databases:

- SQLite: relational, SQL queries, ACID transactions in a single file
- LevelDB: key value store, ordered by key, fast reads and writes

You will write tiny programs that insert and query data with both engines.

#### Step 1. When to choose which

- Choose SQLite when you want tables, indexes, SQL, and transactions
- Choose LevelDB when you want a simple sorted key value store, no SQL, and you control schema in your app

Both are embeddable and require no separate server process.

#### Step 2. Install headers and libs

On Linux or macOS with Homebrew or apt:

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

Windows users can grab prebuilt binaries or build from source and link the .lib files.

#### Step 3. Tiny Code for SQLite: create, insert, query

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

Build and run:

```
gcc -std=c23 -O2 sqlite_demo.c -lsqlite3 -o sqlite_demo
./sqlite_demo
```

You should see rows printed for people with age 40 or higher.

#### Step 4. SQLite best practices in C

- Always use prepared statements with`?` placeholders
- Always call`sqlite3_finalize` on statements
- Wrap batches in`BEGIN` and`COMMIT` for speed
- Check every return code and print`sqlite3_errmsg(db)` on error
- Use`sqlite3_last_insert_rowid` to fetch new primary keys

#### Step 5. Tiny Code for LevelDB: open, put, get, iterate

LevelDB has a C API that mirrors the C++ API.

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

Build and run:

```
gcc -std=c23 -O2 leveldb_demo.c -lleveldb -o leveldb_demo
./leveldb_demo
```

You should see key value pairs in sorted key order.

#### Step 6. Transactions and durability

SQLite has full transactions

- Use`BEGIN IMMEDIATE;` then your inserts then`COMMIT;`
- For crash safety use the default rollback journal or WAL mode

LevelDB has atomic writes per key and write batches

- Use`leveldb_writebatch_t` to group puts and deletes atomically
- Sync to disk with`leveldb_writeoptions_set_sync(wopt, 1)`

#### Step 7. Parameter binding and type safety with SQLite

Use the correct bind and column functions:

- `sqlite3_bind_int`,`sqlite3_bind_int64`,`sqlite3_bind_double`,`sqlite3_bind_text`
- `sqlite3_column_int`,`sqlite3_column_int64`,`sqlite3_column_double`,`sqlite3_column_text`

Never build SQL by string concatenation with user input. Bindings prevent SQL injection and handle escaping for you.

#### Step 8. Working with binary data

- SQLite: use`sqlite3_bind_blob` and`sqlite3_column_blob` with a separate length
- LevelDB: keys and values are raw byte spans`(ptr, length)`, so binary is natural

You can store serialized structs, protobufs, or JSON. Remember to define your own versioning for compatibility.

#### Step 9. Schema and indexing ideas

SQLite

- Normalize into tables with primary keys and foreign keys
- Create indexes for frequent lookups
- Use`PRAGMA foreign_keys = ON;` to enforce constraints

LevelDB

- Design composite keys to encode access patterns
- Example:`user: ` for user row,`user_email: ` points to` `
- Range scans are easy: store keys like`post:: ` and iterate by prefix

#### Step 10. Why this matters

Embedding a database takes your C program from toy to tool. You now know how to:

- Execute SQL queries and prepared statements with SQLite
- Use a sorted key value engine with LevelDB
- Choose the right storage model for each problem
- Handle durability, binary data, and iteration from C

#### Try it yourself

1. Extend the SQLite demo with a`BEGIN` and`COMMIT` around a loop of 10000 inserts and measure time.
2. Add an index on`age` and compare query performance.
3. In the LevelDB demo add a write batch that inserts 1000 sequential keys.
4. Store binary blobs in both systems and read them back.
5. Build a tiny CLI that routes`sql ...` lines to SQLite and`kv ...` lines to LevelDB.

Next up is 99. Packaging, Versioning, and Documentation where you will learn how to ship your code like a pro with Makefiles, pkg config, semantic versioning, and clean README docs.
