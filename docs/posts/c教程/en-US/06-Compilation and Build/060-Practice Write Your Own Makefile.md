---
title: "60. Practice: Write Your Own Makefile"
date: "2026-07-04"
categories: "[C 教程]"
tags: "[C, Little Book of C, Compilation and Build]"
description: "The Little Book of C — 60. Practice: Write Your Own Makefile"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
section: "60"
sidebarWeight: "60"
lang: "en-US"
alternateEn: "/posts/c教程/en-US/06-Compilation and Build/060-Practice Write Your Own Makefile"
alternateZh: "/posts/c教程/zh-CN/06-编译与构建/060-Practice Write Your Own Makefile"
---
[中文版本](/posts/c教程/zh-CN/06-编译与构建/060-Practice Write Your Own Makefile)

#### Follow-Along Deliverable

- Assumed state: lessons 051-059 are complete and you can rebuild the previous example.
- Working directory: `~/c-course-labs/060-makefile-lab`.
- First command: on macOS / Linux run `mkdir -p ~/c-course-labs/060-makefile-lab && cd ~/c-course-labs/060-makefile-lab`; on Windows PowerShell run `New-Item -ItemType Directory -Force "$HOME\c-course-labs\060-makefile-lab"; Set-Location "$HOME\c-course-labs\060-makefile-lab"`.
- Success evidence: keep the source file, executable, `evidence.md`, and record `make`, one incremental rebuild after editing a `.c` file, and `make clean` output.
- Boundary for this lab: This lab focuses on repeatable builds. CMake, Ninja, and release pipelines are out of scope.
- Reset: remove the executable, temporary data, and generated output for this lab; keep source and `evidence.md` for review.

Now that you understand how the C build process works, preprocessing, compiling, linking, and libraries, it’s time to tie everything together with your own Makefile.

`make` is one of the oldest and most powerful automation tools in C development. It watches file timestamps, builds only what has changed, and lets you define build rules in a concise way.

By writing your own Makefile, you’ll automate your entire compilation workflow like a professional.

#### Step 1. Create the Project

Let’s build a small multi-file project:

```
project/
├── Makefile
├── main.c
├── math.c
├── math.h
└── string_utils.c
```

main.c

```
#include <stdio.h>
#include "math.h"
int main(void) {
    printf("2 + 3 = %d\n", add(2, 3));
    printf("2 * 3 = %d\n", mul(2, 3));
    return 0;
}
```

math.c

```
#include "math.h"
int add(int a, int b) { return a + b; }
int mul(int a, int b) { return a * b; }
```

math.h

```
#ifndef MATH_H
#define MATH_H
int add(int a, int b);
int mul(int a, int b);
#endif
```

#### Step 2. Write the Simplest Makefile

Makefile

```
main: main.c math.c
    gcc main.c math.c -o main
```

Run:

```
make
./main
```

Output:

```
2 + 3 = 5
2 * 3 = 6
```

This works, but`make` will rebuild everything every time, even if only one file changed.

Let’s make it smarter.

#### Step 3. Split the Compilation Steps

Separate compilation into object files:

```
CC = gcc
CFLAGS = -Wall -std=c99
main: main.o math.o
    $(CC) $(CFLAGS) main.o math.o -o main
main.o: main.c math.h
    $(CC) $(CFLAGS) -c main.c
math.o: math.c math.h
    $(CC) $(CFLAGS) -c math.c
clean:
    rm -f *.o main
```

Now when you run`make`, it builds`.o` files only once, and recompiles only what changed.

Test it:

```
make
touch math.c
make
```

You’ll see that only`math.o` is rebuilt.

#### Step 4. Add Automatic Dependency Handling

Use pattern rules to avoid repeating commands for every`.c` file:

```
CC = gcc
CFLAGS = -Wall -std=c99
OBJS = main.o math.o string_utils.o
TARGET = app
$(TARGET): $(OBJS)
    $(CC) $(CFLAGS) $(OBJS) -o $(TARGET)
%.o: %.c
    $(CC) $(CFLAGS) -c $< -o $@
clean:
    rm -f $(OBJS) $(TARGET)
```

`$<` means “the first dependency” (like`main.c`).`$@` means “the target” (like`main.o`).

Now the Makefile works for any`.c` file automatically.

#### Step 5. Add Debug and Release Targets

Real projects have multiple build modes:

```
CC = gcc
CFLAGS = -Wall -std=c99
DEBUG_FLAGS = -g -O0 -DDEBUG
RELEASE_FLAGS = -O2 -DNDEBUG
OBJS = main.o math.o
TARGET = app
.PHONY: all clean debug release
all: release
debug: CFLAGS += $(DEBUG_FLAGS)
debug: $(TARGET)
release: CFLAGS += $(RELEASE_FLAGS)
release: $(TARGET)
$(TARGET): $(OBJS)
    $(CC) $(CFLAGS) $(OBJS) -o $(TARGET)
%.o: %.c
    $(CC) $(CFLAGS) -c $< -o $@
clean:
    rm -f $(OBJS) $(TARGET)
```

Run:

```
make debug
./app
```

Then:

```
make clean
make release
```

The debug build has symbols for`gdb`; the release build is optimized.

#### Step 6. Add Static and Shared Library Targets

Add these to your Makefile:

```
libmylib.a: math.o
    ar rcs libmylib.a math.o
libmylib.so: math.o
    $(CC) -shared -o libmylib.so math.o
```

Now you can build a reusable library:

```
make libmylib.a
make libmylib.so
```

#### Step 7. Add Installation and Help

```
install:
    cp app /usr/local/bin/
help:
    @echo "make [target]"
    @echo "Targets: all, debug, release, clean, install, libmylib.a, libmylib.so"
```

The`@` suppresses command echoing, only prints your messages.

Run:

```
make help
```

#### Step 8. Use Variables for Paths and Options

Clean up your Makefile by grouping related flags:

```
CC = gcc
SRC = $(wildcard *.c)
OBJ = $(SRC:.c=.o)
CFLAGS = -Wall -Wextra -std=c99
LDFLAGS = -lm
TARGET = app
$(TARGET): $(OBJ)
    $(CC) $(CFLAGS) $(OBJ) -o $(TARGET) $(LDFLAGS)
clean:
    rm -f $(OBJ) $(TARGET)
```

`wildcard` and`patsubst` let you automatically include new`.c` files as the project grows.

#### Tiny Code: Final Polished Makefile

```
CC = gcc
CFLAGS = -Wall -Wextra -std=c99 -O2
LDFLAGS = -lm
SRC = $(wildcard *.c)
OBJ = $(SRC:.c=.o)
TARGET = app
all: $(TARGET)
$(TARGET): $(OBJ)
    $(CC) $(CFLAGS) $(OBJ) -o $(TARGET) $(LDFLAGS)
%.o: %.c
    $(CC) $(CFLAGS) -c $< -o $@
clean:
    rm -f $(OBJ) $(TARGET)
```

Run:

```
make
./app
```

This pattern is simple, robust, and scalable, the foundation of nearly all C build systems.

#### Step 9. Makefile Debugging

To see what commands`make` is running:

```
make VERBOSE=1
```

Or trace variable expansions:

```
make -p
```

Add`@echo "Building $@"` before commands for clarity.

#### Step 10. Why It Matters

A well-crafted Makefile:

- Automates your entire C build workflow
- Avoids recompiling unchanged files
- Scales to large multi-directory projects
- Makes your builds reproducible across systems

It’s your first step toward professional build systems like CMake, Meson, or Bazel, all of which build on these principles.

#### Try It Yourself

1. Add a new`.c` file and watch your Makefile compile it automatically.
2. Add a`test` target that compiles and runs unit tests.
3. Add colorized output using`tput` or ANSI escapes.
4. Build both static and shared libraries in one run.
5. Convert your Makefile to use multiple directories (`src/`,`include/`,`build/`).

Congratulations! You’ve completed Chapter 6 – Compilation and the Build Process. You now understand how source becomes an executable, every stage from preprocessor to linker, and every tool in between.

Next, we’ll step deeper into Chapter 7: Working Close to the System, where your programs start interacting directly with the operating system through system calls, processes, and files.
