好的 ✅ 我先给你生成 **第 1 篇博客**，完全符合 Hexo 博客风格（带 YAML front-matter，分节结构，代码示例）。

---

````markdown
---
title: Kotlin 入门（1）：Hello World 与变量常量
date: 2025-09-12
categories: [Kotlin 快速入门]
tags: [Kotlin, Android, 编程入门, AI学习]
---

# Kotlin 入门（1）：Hello World 与变量常量

在 AI 时代，我们学习 Kotlin 的目标不是背诵语法，而是 **快速能看懂 AI 生成的代码**，并能写出简单功能。本篇文章带你用最短的路径跑通第一个 Kotlin 程序，并掌握「变量与常量」的写法。

---

## 1. 第一个 Kotlin 程序

Kotlin 的入口和其它语言类似，一个 `main` 函数就能跑起来。

```kotlin
fun main() {
    println("Hello, Kotlin!")
}
```
````

运行后输出：

```
Hello, Kotlin!
```

- `fun` 表示函数
- `main` 是程序入口
- `println` 用来打印内容到控制台

---

## 2. 变量与常量

在 Kotlin 中，声明变量有两种方式：

### 可变变量：`var`

```kotlin
fun main() {
    var age = 18
    println(age)   // 输出 18

    age = 20
    println(age)   // 输出 20
}
```

- `var` 声明的变量可以修改
- Kotlin 会自动推断类型（这里 `age` 是 `Int` 类型）

---

### 不可变变量：`val`

```kotlin
fun main() {
    val name = "Alice"
    println(name)  // 输出 Alice

    // name = "Bob"  // ❌ 报错：val 不能重新赋值
}
```

- `val` 相当于常量，只能赋值一次
- 推荐 **能用 `val` 就用 `val`**，保证安全性

---

## 3. 指定类型

Kotlin 通常能自动推断类型，但你也可以显式声明：

```kotlin
val score: Int = 100
val pi: Double = 3.14
val username: String = "admin"
```

常见类型有：

- `Int`：整数
- `Double`：小数
- `Boolean`：布尔值
- `String`：字符串

---

## 4. 小结

- **程序入口**：`fun main()`
- **打印**：`println()`
- **变量**：`var`（可变）
- **常量**：`val`（不可变，推荐）
- **类型**：自动推断 or 显式声明

---

下一篇我们继续学习 👉 **《Kotlin 入门（2）：语法速览（数据类型、字符串模板、空安全）》**，带你快速掌握写 Kotlin 代码最常见的基础语法。

```

---

要不要我继续帮你写 **第 2 篇：语法速览（数据类型、字符串模板、空安全）**？
```
