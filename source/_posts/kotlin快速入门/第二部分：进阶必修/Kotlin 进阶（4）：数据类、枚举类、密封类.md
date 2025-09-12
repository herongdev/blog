好的 ✅ 我来帮你写 **进阶系列第 4 篇**，主题是 **数据类、枚举类、密封类**，保持 Hexo 博客风格。

---

````markdown
---
title: Kotlin 进阶（4）：数据类、枚举类、密封类
date: 2025-09-12
categories: [Kotlin 进阶学习]
tags: [Kotlin, 数据类, 枚举类, 密封类, 面向对象]
---

# Kotlin 进阶（4）：数据类、枚举类、密封类

在 Kotlin 中，除了普通的 `class`，还有三类非常常用的特殊类：

- **数据类（data class）**：用来存放数据，自动生成常用方法
- **枚举类（enum class）**：表示有限个固定常量
- **密封类（sealed class）**：用于表示有限但可扩展的类型层次结构

---

## 1. 数据类（Data Class）

数据类的主要用途是存放数据，Kotlin 会自动为你生成：

- `toString()`
- `equals()`
- `hashCode()`
- `copy()`
- `componentN()`（解构用）

### 示例

```kotlin
data class User(val id: Int, val name: String)

fun main() {
    val u1 = User(1, "Alice")
    val u2 = User(1, "Alice")
    val u3 = u1.copy(name = "Bob")

    println(u1)         // User(id=1, name=Alice)
    println(u1 == u2)   // true
    println(u3)         // User(id=1, name=Bob)

    val (id, name) = u1 // 解构
    println("id=$id, name=$name")
}
```
````

非常适合用在 **模型类 / DTO**。

---

## 2. 枚举类（Enum Class）

枚举表示固定的一组常量。
每个枚举成员本质上是一个对象。

### 示例

```kotlin
enum class Direction {
    NORTH, SOUTH, EAST, WEST
}

fun main() {
    val dir = Direction.NORTH
    println(dir)            // NORTH
    println(dir.name)       // NORTH
    println(dir.ordinal)    // 0
}
```

---

### 枚举类也能有属性和方法

```kotlin
enum class Color(val rgb: Int) {
    RED(0xFF0000),
    GREEN(0x00FF00),
    BLUE(0x0000FF);

    fun hex() = "#${rgb.toString(16)}"
}

fun main() {
    println(Color.RED.hex()) // #ff0000
}
```

---

## 3. 密封类（Sealed Class）

密封类用来表示 **受限的类层次结构**。
它的子类必须在 **同一个文件** 中声明，因此编译器能知道所有子类。

常用于 **状态机**、**结果类型**。

### 示例：表达式求值

```kotlin
sealed class Expr

data class Const(val value: Int) : Expr()
data class Sum(val left: Expr, val right: Expr) : Expr()
object NotANumber : Expr()

fun eval(expr: Expr): Int = when(expr) {
    is Const -> expr.value
    is Sum -> eval(expr.left) + eval(expr.right)
    NotANumber -> 0
}
```

优势：`when` 表达式会 **强制检查所有分支**，防止遗漏。

---

## 4. 小结

- **数据类**：快速建模数据对象，自动生成常用方法
- **枚举类**：固定集合常量，可带属性与方法
- **密封类**：有限层次结构，常用于状态或结果建模

---

下一篇我们学习 👉 **《Kotlin 进阶（5）：协程入门（suspend、launch、async）》**，带你进入 Kotlin 最强大的异步编程世界。

```

---

要不要我继续帮你写 **《Kotlin 进阶（5）：协程入门》**？
```
