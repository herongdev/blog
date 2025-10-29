---
title: C++ 与 CMake 学习指南
date: 2025-01-27
---

# C++ 与 CMake 学习指南

> 从 C++ 语法速览到 CMake 实战，再到 NAPI 模块构建，一站式掌握 C++ 原生开发。

## 📚 教程目录

### 第一部分：C++ 快速入门

掌握 C++ 常用语法与工程实践。

- [C++ 半小时快速入门（只学最常用的）](./基础入门/C++-半小时快速入门（只学最常用的）.md) ⭐
  - `.h` 与 `.cpp` 文件分工
  - 常用语法速览
  - 类与 RAII 概念
  - 智能指针基础
  - CMake 最小配置
  - `extern "C"` 详解

### 第二部分：CMake 构建系统

深入学习 CMake，掌握构建系统配置。

- [CMake 实战：从零到生成动态库](./基础入门/CMake实战：从零到生成动态库.md) ⭐

  - CMake 基础概念
  - 最简单的 CMake 项目
  - 生成动态库
  - 完整的 CMake 项目
  - 进阶：条件编译和路径管理

- [CMake 实战 2：NAPI 模块构建详解](./基础入门/CMake实战2：NAPI模块构建详解.md) ⭐

  - NAPI 模块构建流程
  - 第三方库管理
  - 头文件路径设置
  - 依赖库链接
  - 完整实例代码

- [CMake 语法解析：为什么用空格而不是逗号？](./基础入门/CMake语法解析：为什么用空格而不是逗号.md) ⭐
  - CMake 语法特点
  - 空格 vs 逗号
  - 各种分隔方式
  - 常见错误与解决方案

---

## 🎯 学习路径

### 初学者路线

```
1. C++ 快速入门 ← 语法基础
   ├─ .h 和 .cpp 文件
   ├─ 常用标准库（vector, string, algorithm）
   ├─ 类和 RAII
   └─ extern "C" 详解

2. CMake 基础 ← 构建系统
   ├─ Hello CMake
   ├─ 生成动态库
   └─ 文件组织

3. CMake 实战 ← NAPI 应用
   ├─ 第三方库管理
   ├─ 依赖链接
   └─ NAPI 模块构建

4. 语法深入 ← 理解规则
   └─ CMake 语法特点
```

### 进阶开发者路线

```
1. NAPI 开发
2. HarmonyOS 原生模块
3. 性能优化
4. 多平台构建
```

---

## 💡 特色内容

### ⭐ C++ 半小时快速入门

**核心内容**：

- 为什么有 `.cpp` 和 `.h` 文件？
- 多文件工程与头文件用法
- 最常用语法速览
- 类（最常用子集）与 RAII 概念
- 智能指针（unique_ptr）
- CMake 最小配置
- `extern "C"` 详解

**适合人群**：

- 会写代码但没学过 C++
- 需要快速上手 C++ 语法
- 准备学习 NAPI 开发

**学习收获**：

- 掌握 C++ 常用语法（30 分钟）
- 理解 `.h` 和 `.cpp` 的作用
- 学会使用 CMake 构建项目
- 了解 `extern "C"` 的作用

### ⭐ CMake 从零到生成动态库

**核心内容**：

- CMake 是什么？
- Hello CMake 项目
- CMake 核心概念
- 生成动态库
- 多文件项目
- 条件编译与路径管理

**适合人群**：

- 第一次接触 CMake
- 需要配置构建系统
- 准备做 NAPI 开发

**学习收获**：

- 从零掌握 CMake
- 生成自己的动态库
- 理解构建流程
- 掌握常用命令

### ⭐ NAPI 模块构建详解

**核心内容**：

- 项目结构设计
- 主 CMakeLists.txt 逐行详解
- 第三方库管理（add_subdirectory）
- NAPI 模块构建（add_library）
- 头文件路径管理
- 依赖库链接
- 完整实例代码

**适合人群**：

- 要做 HarmonyOS NAPI 开发
- 需要链接第三方库
- 想理解构建系统

**学习收获**：

- 掌握 NAPI 模块构建
- 理解依赖管理
- 学会组织多文件项目
- 能调试构建问题

### ⭐ CMake 语法解析

**核心内容**：

- 为什么用空格而不是逗号？
- CMake 的"方言"特点
- 各种分隔方式
- 与其他语言对比
- 常见错误与解决方案

**适合人群**：

- 对 CMake 语法感到困惑
- 来自其他编程语言
- 想深入理解 CMake

**学习收获**：

- 理解 CMake 设计哲学
- 掌握语法规则
- 避免常见错误
- 写出规范的 CMakeLists.txt

---

## 📖 使用指南

### 如何阅读本教程

1. **按需学习**：根据目录选择需要的章节
2. **循序渐进**：建议按照学习路线顺序学习
3. **动手实践**：每篇文章都有完整代码示例
4. **查漏补缺**：可作为速查手册使用

### 学习顺序建议

**快速上手**：

```
C++ 快速入门 → CMake 基础 → NAPI 构建
```

**深入学习**：

```
C++ 快速入门 → CMake 基础 → CMake 实战 → 语法解析
```

**专项学习**：

- 只学 C++：阅读 "C++ 快速入门"
- 只学 CMake：阅读 "CMake 从零到生成动态库"
- 只学 NAPI：阅读 "NAPI 模块构建详解"

---

## 🔧 开发环境

### 推荐配置

- **C++ 编译器**：GCC/Clang
- **CMake**：3.16 以上
- **编辑器**：VSCode / CLion / DevEco Studio
- **操作系统**：Windows / Linux / macOS / HarmonyOS

### 快速搭建

1. 安装 C++ 编译器（随操作系统自带或下载）
2. 安装 CMake
3. 创建第一个项目
4. 按照教程实践

---

## 📝 更新日志

- **2025-01-27**：创建教程目录结构
- **2025-01-27**：添加 C++ 快速入门
- **2025-01-27**：添加 CMake 实战教程
- **2025-01-27**：添加 NAPI 模块构建详解
- **2025-01-27**：添加 CMake 语法解析

---

## 🤝 贡献指南

欢迎贡献内容！

### 贡献方式

- 提交 Issue 反馈问题
- 提交 Pull Request 改进内容
- 分享学习心得

### 内容规范

- 代码示例完整可运行
- 注释详细规范
- 排版美观统一
- 使用大白话解释

---

## 🔗 相关资源

### 官方文档

- [C++ 标准](https://isocpp.org/)
- [CMake 文档](https://cmake.org/documentation/)
- [HarmonyOS 开发者官网](https://developer.huawei.com/consumer/cn/harmonyos/)

### 学习资源

- [C++ 参考](https://zh.cppreference.com/)
- [CMake 教程](https://cmake.org/cmake/help/latest/guide/tutorial/index.html)
- [NAPI 示例](https://gitee.com/openharmony-sig/napi-examples)

### 工具推荐

- [VSCode](https://code.visualstudio.com/) - 轻量级编辑器
- [CLion](https://www.jetbrains.com/clion/) - 专业的 C++ IDE
- [CMake Tools](https://cmake.org/cmake/help/latest/manual/cmake.1.html) - VSCode 插件

---

## 📧 联系方式

- **博客**：[herong.dev](https://herong.dev)
- **问题反馈**：通过 Issue 或评论区

---

**让我们一起掌握 C++ 与 CMake！** 🚀
