好的 ✅ 我来帮你写 **第 2 篇博客**，继续保持 Hexo 风格，重点放在「最常用、最容易在 AI 生成代码里遇到」的语法。

---

````markdown
---
title: Kotlin 入门（2）：语法速览（数据类型、字符串模板、空安全）
date: 2025-09-12
categories: [Kotlin 快速入门]
tags: [Kotlin, 语法速览, AI学习, Android]
---

# Kotlin 入门（2）：语法速览（数据类型、字符串模板、空安全）

这一篇，我们快速扫一遍 Kotlin 最常见的基础语法：**数据类型、字符串模板、空安全**。这些几乎每天都会用到，也是 AI 代码里最容易出现的。

---

## 1. 常见数据类型

Kotlin 是强类型语言，常见数据类型包括：

```kotlin
val age: Int = 20        // 整数
val price: Double = 9.99 // 小数
val isVip: Boolean = true // 布尔
val name: String = "Tom" // 字符串
```
````

Kotlin 会自动推断类型，所以一般不用写类型：

```kotlin
val age = 20
val price = 9.99
val isVip = true
val name = "Tom"
```

---

## 2. 字符串模板

Kotlin 内置了「字符串模板」功能，用 `$变量名` 或 `${表达式}` 嵌入变量：

```kotlin
fun main() {
    val name = "Alice"
    val age = 18
    println("名字: $name, 年龄: $age")

    // 表达式要加 {}
    println("明年年龄: ${age + 1}")
}
```

输出：

```
名字: Alice, 年龄: 18
明年年龄: 19
```

非常常用！比拼接字符串 `+` 更直观。

---

## 3. 空安全（Null Safety）

Kotlin 最大的特点之一就是「空安全」，尽量避免空指针错误。

### 普通变量（不能为 null）

```kotlin
val name: String = "Alice"
// name = null // ❌ 报错，普通变量不能赋值为 null
```

### 可空变量（可以为 null）

```kotlin
var nickname: String? = null
nickname = "小明"
```

- 加 `?` 表示这个变量可以为 null
- 读取时要小心

---

### 安全调用：`?.`

```kotlin
val length = nickname?.length
```

如果 `nickname` 为 null，结果就是 `null`，不会报错。

---

### Elvis 操作符：`?:`

```kotlin
val length = nickname?.length ?: 0
```

如果 `nickname` 为 null，就返回 `0`。

---

### 强制非空：`!!`

```kotlin
val length = nickname!!.length
```

如果 `nickname` 是 `null`，会抛出异常。⚠️ 一般少用。

---

## 4. 小结

- Kotlin 内置常见数据类型（Int、Double、String、Boolean）
- 字符串模板非常常用：`$变量` 或 `${表达式}`
- 空安全机制避免了大量空指针问题：

  - 可空变量 `?`
  - 安全调用 `?.`
  - 默认值 `?:`
  - 强制非空 `!!`

---

下一篇我们继续学习 👉 **《Kotlin 入门（3）：流程控制（if、when、循环）》**，带你掌握条件判断和循环写法。

```

---

要不要我接着帮你写 **第 3 篇《流程控制（if、when、循环）》**？
```
