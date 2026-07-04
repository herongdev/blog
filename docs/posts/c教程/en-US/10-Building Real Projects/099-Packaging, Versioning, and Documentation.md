---
title: "99. Packaging, Versioning, and Documentation"
date: "2026-07-04"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "Building Real Projects"
description: "The Little Book of C — 99. Packaging, Versioning, and Documentation"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
section: 99
sidebarWeight: 99
lang: "en-US"
alternateEn: "/posts/c教程/en-US/10-Building Real Projects/099-Packaging, Versioning, and Documentation"
alternateZh: "/posts/c教程/zh-CN/10-真实项目/099-Packaging, Versioning, and Documentation"
---
[中文版本](/posts/c教程/zh-CN/10-真实项目/099-Packaging, Versioning, and Documentation)

You’ve written real C programs—now it’s time to package, version, and document them like a professional. This is what makes your code usable by others and maintainable by your future self.

#### Step 1. The goal of packaging

Packaging is about making your project easy to:

- build (`make`,`cmake`, or`meson`)
- install (`make install`)
- link (`pkg-config`)
- use (`#include "yourlib.h"`)

You’ll create a structure that helps others build and use your code without guessing.

#### Step 2. Standard project layout

A simple, conventional layout for a C project:

```
myproject/
├── include/
│   └── myproject.h
├── src/
│   ├── main.c
│   └── util.c
├── tests/
│   └── test_basic.c
├── Makefile
├── README.md
└── LICENSE
```

- `include/` holds headers that others can include
- `src/` holds your implementation files
- `tests/` holds unit tests
- `Makefile` defines how to build and install

#### Step 3. Tiny Code: a simple reusable library

```
// include/myproject.h
#ifndef MYPROJECT_H
#define MYPROJECT_H
int add(int a, int b);
int sub(int a, int b);
#endif
```

```
// src/myproject.c
#include "myproject.h"
int add(int a, int b) { return a + b; }
int sub(int a, int b) { return a - b; }
```

#### Step 4. Minimal Makefile

```
CC      = gcc
CFLAGS  = -std=c23 -O2 -Wall -Iinclude
LDFLAGS =
SRC = $(wildcard src/*.c)
OBJ = $(SRC:.c=.o)
LIB = libmyproject.a
.PHONY: all clean install uninstall
all: $(LIB)
$(LIB): $(OBJ)
    ar rcs $@ $^
%.o: %.c
    $(CC) $(CFLAGS) -c $< -o $@
install:
    mkdir -p /usr/local/include/myproject
    cp include/*.h /usr/local/include/myproject/
    cp $(LIB) /usr/local/lib/
uninstall:
    rm -f /usr/local/lib/$(LIB)
    rm -rf /usr/local/include/myproject
clean:
    rm -f $(OBJ) $(LIB)
```

Build the library:

```
make
sudo make install
```

Then another project can link against it:

```
gcc main.c -lmyproject -L/usr/local/lib -I/usr/local/include/myproject
```

#### Step 5. Versioning your releases

Follow semantic versioning:

```
vMAJOR.MINOR.PATCH
```

Examples:

- `v1.0.0`– stable release
- `v1.1.0`– new feature, backward compatible
- `v1.1.1`– bug fix, no API change
- `v2.0.0`– breaking API change

Tag your releases in git:

```
git tag -a v1.0.0 -m "First stable release"
git push origin v1.0.0
```

#### Step 6. Create a pkg-config file

`pkg-config` lets others compile your library easily.

Create`myproject.pc`:

```
prefix=/usr/local
exec_prefix=${prefix}
libdir=${exec_prefix}/lib
includedir=${prefix}/include/myproject

Name: myproject
Description: Tiny math helper library
Version: 1.0.0
Libs: -L${libdir} -lmyproject
Cflags: -I${includedir}
```

Install it in`/usr/local/lib/pkgconfig/` and test:

```
pkg-config --cflags --libs myproject
```

#### Step 7. Documentation with Markdown and Doxygen

Keep a clear README.md at the root:

```
# myproject
A tiny example C library for arithmetic functions.
## Build
```

make sudo make install

```

## Usage
```c
#include <myproject.h>

int main() {
    printf("%d\n", add(3, 4));
}
```

```

For API documentation, use **Doxygen**:

```bash
sudo apt install doxygen
doxygen -g
```

Edit`Doxyfile` to include your source paths, then run:

```
doxygen Doxyfile
```

Docs will appear in`html/` or`latex/`.

#### Step 8. Licensing

Add a`LICENSE` file so others know how they can use your code. Common ones:

- MIT License: simple, permissive
- Apache 2.0: adds patent protection
- GPLv3: ensures derivatives remain open

Example MIT License header for your source files:

```
/* 
 * Copyright (c) 2025 Your Name
 * Licensed under the MIT License.
 */
```

#### Step 9. Continuous Integration (optional)

Add GitHub Actions or another CI service:

```
# .github/workflows/build.yml
name: Build and Test
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - run: make
    - run: make test || echo "No tests yet"
```

Now every push builds automatically.

#### Step 10. Why this matters

Professional packaging is part of being a systems engineer:

- Your projects build reproducibly.
- Others can install, link, and use them easily.
- Documentation and version tags create confidence.
- Licensing clarifies ownership.

You have now moved from C programmer to C maintainer, the person others trust to deliver solid, reusable, and well-documented software.

Next is 100. Practice: Build Your Own Mini Project, where you will bring everything together, writing, building, debugging, and packaging a complete small system in pure C.
