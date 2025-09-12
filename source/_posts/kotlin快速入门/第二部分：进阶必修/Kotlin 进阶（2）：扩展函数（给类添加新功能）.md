好的 ✅ 我来帮你写 **进阶系列第 2 篇**，保持 Hexo 博客风格，主题是 **扩展函数**。

---

````markdown
---
title: Kotlin 进阶（2）：扩展函数（给类添加新功能）
date: 2025-09-12
categories: [Kotlin 进阶学习]
tags: [Kotlin, 扩展函数, 面向对象, 语法糖]
---

# Kotlin 进阶（2）：扩展函数（给类添加新功能）

在 Kotlin 里，**扩展函数**让你不用继承或修改源码，就能给现有的类加新功能。  
这非常适合 **库的增强**、**工具方法封装**、**简化代码**。

---

## 1. 基础语法

扩展函数的定义形式：

```kotlin
fun 类型名.函数名(参数...): 返回类型 {
    // this 代表调用对象
}
```
````

示例：

```kotlin
fun String.lastChar(): Char {
    return this[this.length - 1]
}

fun main() {
    println("Hello".lastChar()) // o
}
```

---

## 2. 常用场景示例

### (1) 数字工具函数

```kotlin
fun Int.isEven(): Boolean = this % 2 == 0
fun Int.isOdd(): Boolean = this % 2 != 0

println(10.isEven()) // true
println(3.isOdd())   // true
```

### (2) 集合扩展

```kotlin
fun <T> List<T>.secondOrNull(): T? =
    if (this.size >= 2) this[1] else null

println(listOf(1, 2, 3).secondOrNull()) // 2
println(emptyList<Int>().secondOrNull()) // null
```

### (3) 日期格式化（依赖 `java.time`）

```kotlin
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter

fun LocalDateTime.format(pattern: String = "yyyy-MM-dd HH:mm:ss"): String {
    return this.format(DateTimeFormatter.ofPattern(pattern))
}

fun main() {
    println(LocalDateTime.now().format()) // 2025-09-12 15:30:00
}
```

---

## 3. 扩展属性

不仅可以写函数，还能写属性。

```kotlin
val String.wordCount: Int
    get() = this.trim().split("\\s+".toRegex()).size

println("Hello Kotlin Extension".wordCount) // 3
```

---

## 4. 伴生对象扩展

可以给类的伴生对象（类似静态方法）添加扩展。

```kotlin
class Utils {
    companion object {}
}

fun Utils.Companion.now(): Long = System.currentTimeMillis()

println(Utils.now()) // 1694500000000
```

---

## 5. 注意事项

- 扩展函数 **不会修改原类**，只是 **语法糖**
- 调用时根据 **静态类型** 决定，不支持多态覆盖
- 适合用在 **工具类**、**增强库功能**

---

## 6. 小结

- 用 `fun 类型.函数名()` 定义扩展函数
- 可以扩展 **普通函数**、**属性**、**伴生对象**
- 常用于 **工具方法封装** 和 **代码简化**

---

下一篇我们学习 👉 **《Kotlin 进阶（3）：协程基础（挂起函数、launch、async）》**，进入并发编程的核心。

```

---

要不要我接着帮你写 **《Kotlin 进阶（3）：协程基础》**？
```
