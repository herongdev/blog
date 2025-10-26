---
title: "C++ 半小时快速入门（只学最常用的）"
date: 2025-01-27
tags:
  - C++
  - 快速入门
  - .cpp
  - .h
description: "面向会写代码的你：30 分钟掌握 C++ 最常用语法与工程习惯，包含 .cpp/.h 分工、常用标准库、类与 RAII、g++/CMake 最小构建。"
---

## 📚 为什么有 `.cpp` 和 `.h`？

`.h`（或 `.hpp`）头文件：放**声明**（接口），例如函数原型、类/结构体定义、常量与类型别名。可被多个 `.cpp` 引用。常见写法用 `#pragma once` 防止重复包含。

`.cpp` 源文件：放**实现**（逻辑代码），编译成目标文件后再链接为可执行程序或库。

**好处**：清晰分离接口与实现、加速增量编译、支持多文件协作。

> 经验：新手阶段统一用 `.h` + `.cpp`，等熟悉后再了解把模板等放在 `.hpp` 的场景。

## 🎯 学习路线（30 分钟）

## 0-5 分钟：最小项目与 Hello, C++

### 项目结构

```text
hello/
├─ main.cpp
└─ README.md
```

### main.cpp

```cpp
#include <iostream>   // 标准输入输出
int main() {
    std::cout << "Hello, C++!\n";
    return 0;         // 进程返回码，0 表示成功
}
```

### 编译运行

```bash
# 推荐 C++17 起步
g++ -std=c++17 -O2 -Wall -Wextra -pedantic main.cpp -o hello
./hello
```

> 选项说明：
> `-std=c++17` 指定标准；`-O2` 优化；`-Wall -Wextra -pedantic` 打开常用警告，早暴露问题。

---

## 5-12 分钟：多文件工程与头文件用法（最常用）

### 目标

把功能拆分到 `.h/.cpp`，学会 `#pragma once` 与命名空间的基本用法。

```text
calc/
├─ main.cpp
├─ calc.h
└─ calc.cpp
```

### calc.h（只放"声明"）

```cpp
#pragma once               // 防重复包含
#include <vector>

namespace calc {          // 简单的逻辑分组
int sum(const std::vector<int>& nums);
}
```

### calc.cpp（实现）

```cpp
#include "calc.h"          // 引用头文件的声明
int calc::sum(const std::vector<int>& nums) {
    int s = 0;
    for (int x : nums) s += x;  // 范围 for 与值类型
    return s;
}
```

### main.cpp（使用）

```cpp
#include <iostream>
#include <vector>
#include "calc.h"          // 包含接口

int main() {
    std::vector<int> a {1, 2, 3};
    std::cout << calc::sum(a) << "\n"; // 6
}
```

### 编译链接

```bash
g++ -std=c++17 -O2 -Wall -Wextra -c calc.cpp   # 仅编译为对象文件 calc.o
g++ -std=c++17 -O2 -Wall -Wextra -c main.cpp
g++ calc.o main.o -o app
./app
```

---

## 12-18 分钟：最常用语法速览

```cpp
#include <iostream>
#include <string>
#include <vector>
#include <algorithm>     // sort/find 等
#include <unordered_map> // 常用哈希表

// ✅ 推荐：按需 using，而不是 using namespace std;
using std::string;
using std::vector;

int add(int a, int b) { return a + b; }                 // 函数
int add_ref(const int& a, const int& b) { return a+b; } // 按引用传参（避免拷贝）

int main() {
    // 变量与初始化
    int x = 42;                // 直接初始化
    auto y = 3.14;             // auto 推断（常用）
    const int N = 3;           // const 常量（多用）

    // 字符串与拼接
    string name = "C++";
    std::cout << "Hello " + name << "\n";

    // 向量容器与遍历
    vector<int> v {3,1,2};
    std::sort(v.begin(), v.end());    // 1,2,3
    for (int n : v) std::cout << n << " ";
    std::cout << "\n";

    // 查找
    auto it = std::find(v.begin(), v.end(), 2);
    if (it != v.end()) std::cout << "found 2\n";

    // 哈希表（键值对）
    std::unordered_map<string,int> mp;
    mp["alice"] = 10; mp["bob"] = 20;
    if (auto it2 = mp.find("alice"); it2 != mp.end()) {
        std::cout << "alice=" << it2->second << "\n";
    }

    // 条件与循环
    if (x > 0) { std::cout << "positive\n"; }
    for (int i = 0; i < N; ++i) std::cout << i << " ";
    std::cout << "\n";

    return 0;
}
```

> 记忆法：**首选值语义 + const + 引用传参**，容器用 `std::vector/std::string` 起步，算法用 `<algorithm>`。

---

## 18-24 分钟：类（最常用子集）与 RAII 概念

会写一个小类（构造、成员函数、`const` 成员函数、初始化列表）。

### Point.h

```cpp
#pragma once
#include <string>

class Point {
public:
    // 初始化列表：高效赋值成员
    Point(int x, int y) : x_(x), y_(y) {}

    int x() const { return x_; }     // const 成员：承诺不改成员
    int y() const { return y_; }

    void move(int dx, int dy) { x_ += dx; y_ += dy; }

    std::string toString() const;    // 声明在 .h，实现在 .cpp
private:
    int x_;
    int y_;
};
```

### Point.cpp

```cpp
#include "Point.h"
#include <sstream>

std::string Point::toString() const {
    std::ostringstream oss;
    oss << "(" << x_ << "," << y_ << ")";
    return oss.str();
}
```

### main.cpp 片段

```cpp
#include <iostream>
#include "Point.h"

int main() {
    Point p(1,2);
    p.move(3,4);
    std::cout << p.toString() << "\n";  // (4,6)
}
```

> **RAII（最常用理解）**：对象**构造**时获取资源，**析构**时自动释放。实际开发里你最常见到的是**容器/智能指针自动管理内存**，减少 `new/delete`。

---

## 24-28 分钟：智能指针（只知道 `unique_ptr` 即可）

```cpp
#include <memory>
#include "Point.h"

int main() {
    // unique_ptr 独占所有权，离开作用域自动释放
    std::unique_ptr<Point> p = std::make_unique<Point>(1,2);
    p->move(1,1);
}
```

> 规则：**能用栈对象就用栈对象**；需要在堆上创建并转移所有权时再用 `std::unique_ptr`。很少需要裸 `new/delete`。

---

## 28-30 分钟：最小 CMake & 一键构建

### CMake 项目结构

```text
cmake-quick/
├─ CMakeLists.txt
├─ main.cpp
├─ calc.h
├─ calc.cpp
└─ Point.{h,cpp}
```

### CMakeLists.txt

```cmake
cmake_minimum_required(VERSION 3.16)
project(quick_cpp LANGUAGES CXX)
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
add_executable(app
  main.cpp
  calc.cpp
  Point.cpp
)
# 头文件位于源目录，现代 CMake 默认已包含当前目录
```

### 构建命令

```bash
cmake -S . -B build
cmake --build build -j
./build/app
```

---

## ⚠️ 常见坑 & 速查表（超实用）

- **不要** `using namespace std;`（污染命名空间），改用 **选择性 using** 或写全名。
- **首选** `std::string / std::vector`，少碰原始数组与 C 字符串。
- **传参**：大对象用 `const T&`，小标量（int/double）按值传。
- **循环**：`for (auto& x : v)` 常用；需要索引就用传统 `for`。
- **算法优先**：`std::sort / std::find / std::count / std::accumulate(需 <numeric>)`。
- **打印调试**：`std::cerr << "debug\n";`。
- **头文件防卫**：`#pragma once`。
- **编译开关**：开发期加 `-Wall -Wextra -pedantic -O0 -g`（便于调试）。
- **文件拆分**：声明进 `.h`，实现进 `.cpp`，main 只做"组装"。

---

## 💪 练习（5 分钟内）

1. **实现中位数**：写 `double median(std::vector<int> v)`，先排序，再返回中位数。
2. **类扩展**：给 `Point` 加 `distanceTo(const Point& other) const`，返回欧氏距离（`<cmath>` 的 `std::hypot`）。
3. **哈希统计**：统计字符串数组里每个单词出现次数，返回 `std::unordered_map<std::string,int>`。

### 参考答案要点（思路）

```cpp
// 1) median
#include <algorithm>
double median(std::vector<int> v) {
    std::sort(v.begin(), v.end());
    size_t n = v.size();
    if (n == 0) return 0.0;                 // 简单防御
    if (n % 2) return v[n/2];
    return (v[n/2-1] + v[n/2]) / 2.0;
}

// 2) distanceTo
#include <cmath>
double Point::distanceTo(const Point& other) const {
    // hypot 处理溢出更稳妥
    return std::hypot(double(x_ - other.x_), double(y_ - other.y_));
}

// 3) 词频
#include <unordered_map>
std::unordered_map<std::string,int>
countWords(const std::vector<std::string>& words) {
    std::unordered_map<std::string,int> mp;
    for (const auto& w : words) ++mp[w];
    return mp;
}
```

---

## 📖 一页速览（可收藏）

- 头文件 `.h` 放**声明**；源文件 `.cpp` 放**实现**；`#pragma once`。
- 常用头：`<iostream> <string> <vector> <algorithm> <unordered_map> <memory>`。
- 常用模式：**值语义 + const 优先**，大对象按 `const&` 传参。
- 类三件套（最常用子集）：构造函数、`const` 成员函数、初始化列表。
- 资源管理：优先容器与 `std::unique_ptr`，少用裸指针。
- 构建：`g++ -std=c++17` 或最小 `CMakeLists.txt`。

---

## 🔍 extern "C" 详解（大白话版）

### 什么是 extern "C"？

- **`extern`** = "外部"的意思
- **`C`** = C 语言
- 合起来就是 **"按照 C 语言的外部规则"**

### 问题背景

#### C++ 的函数重载功能

C++ 中可以有多个同名函数：

```cpp
int add(int a, int b);        // 编译后可能叫 _add_int_int
double add(double a, double b); // 编译后可能叫 _add_double_double
```

C++ 编译器会给函数名加上参数类型信息，这叫**名称修饰(name mangling)**。

#### C 语言的函数命名

在 C 语言中：

```c
int add(int a, int b);  // 编译后还是叫 add
```

C 编译器不会改变函数名。

### 问题来了

如果 C++ 程序想调用 C 语言写的函数库，C++ 编译器会困惑：

```cpp
add(1, 2);  // C++想：这到底是 _add_int_int 还是 _add_double_double？
```

### extern "C" 的作用

```cpp
extern "C" {
    int add(int a, int b);  // 告诉C++编译器：别给这个函数名"化妆"！
}
```

意思是："**老兄，大括号里的这些函数是按照 C 语言的规矩编译的，你去找那个最朴素的 `add` 名字就行，别瞎改名字！**"

### 类比理解

想象一下：

- **C 语言**像说方言的大爷 → 说话直接："吃饭"
- **C++** 像文艺青年 → 说话讲究："享用晚餐"(重载 1)、"品尝午餐"(重载 2)

`extern "C"` 就像对 C++ 说："接下来这段你要用大爷的方言来理解，别瞎翻译！"

### 为什么需要 `#ifdef __cplusplus` 包装？

因为：

- C 编译器看不懂 `extern "C"` 这个语法（会报错）
- 只有 C++ 编译器才认识这个语法

所以用：

```c
#ifdef __cplusplus  // 如果是C++环境
extern "C" {        // 才说这句C++能懂的话
#endif
```

这样无论是 C 还是 C++ 编译器，都能愉快地编译这个头文件了！

### 实际使用示例

**C 语言头文件 `calc.h`：**

```c
#pragma once

#ifdef __cplusplus
extern "C" {
#endif

int add(int a, int b);
int subtract(int a, int b);

#ifdef __cplusplus
}
#endif
```

**C++ 调用 C 函数：**

```cpp
#include "calc.h"

int main() {
    int result = add(10, 20);  // 正常调用
    return 0;
}
```

### 常见使用场景

1. **调用 C 语言库**：如 OpenSSL、SQLite 等
2. **NAPI 开发**：在 HarmonyOS 中调用原生 C/C++ 代码
3. **系统调用**：调用操作系统提供的 C 接口
4. **跨语言交互**：Python、JavaScript 等调用 C/C++ 库

**总结：`extern "C"` 就是让 C++ 和 C 能够"语言互通"的翻译官！**

---

如果你愿意，我可以把上面的模板项目打包成一个最小可运行示例（含 CMake 与多文件），你直接 `cmake -S . -B build && cmake --build build` 即可运行。需要的话告诉我操作系统（Windows/macOS/Linux），我给到对应命令行与 VSCode 调试配置。
