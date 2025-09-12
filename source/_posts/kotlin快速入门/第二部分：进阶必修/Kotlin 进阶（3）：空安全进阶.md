好的 ✅ 我来帮你写 **进阶系列第 3 篇**，保持 Hexo 博客风格，主题是 **空安全进阶**。

---

````markdown
---
title: Kotlin 进阶（3）：空安全进阶
date: 2025-09-12
categories: [Kotlin 进阶学习]
tags: [Kotlin, 空安全, NullPointerException, Elvis, 安全调用]
---

# Kotlin 进阶（3）：空安全进阶

在 Java 里，`NullPointerException`（简称 NPE）几乎是最常见的运行时错误。  
而 Kotlin 的设计目标之一就是 **彻底减少空指针错误**。  
今天我们深入学习 Kotlin 的 **空安全语法** 和 **最佳实践**。

---

## 1. 可空类型与非空类型

Kotlin 把类型分为两种：

- **非空类型**：默认不能为 `null`
- **可空类型**：在类型后加 `?` 表示

```kotlin
val a: String = "Hello"
// a = null ❌ 编译报错

val b: String? = "Hi"
val c: String? = null
```
````

---

## 2. 安全调用（?.）

如果对象可能为 `null`，用 `?.` 来安全调用。

```kotlin
val name: String? = null
println(name?.length) // null，而不是抛异常
```

---

## 3. Elvis 操作符（?:）

如果左边是 `null`，就用右边的值。

```kotlin
val name: String? = null
val length = name?.length ?: 0
println(length) // 0
```

---

## 4. 非空断言（!!）

把可空类型强制转为非空，如果是 `null` 就抛 NPE。
⚠️ **慎用！** 一般只在“绝对保证非空”的地方使用。

```kotlin
val s: String? = "Kotlin"
println(s!!.length) // 6

val t: String? = null
println(t!!.length) // ❌ NPE
```

---

## 5. `let` 与空安全链式调用

`let` 常和 `?.` 一起用，只有非空时才会执行。

```kotlin
val name: String? = "Kotlin"
name?.let {
    println("长度是 ${it.length}") // 6
}
```

还能写成链式调用：

```kotlin
val result = name?.takeIf { it.length > 3 }?.uppercase()
println(result) // KOTLIN
```

---

## 6. `lateinit` 与 `by lazy`

如果一个变量在稍后初始化，可以用：

- **`lateinit var`**：必须是 `var`，常用于依赖注入、Android View
- **`by lazy`**：必须是 `val`，第一次访问时才会初始化

```kotlin
lateinit var username: String

val config: String by lazy {
    println("初始化中…")
    "配置加载完成"
}
```

---

## 7. 平台类型与 Java 互操作

从 Java 代码调用来的对象可能是 `null` 也可能不是，Kotlin 把它称为 **平台类型**（不带 `?` 也不带 `!!`）。
所以在和 Java 互操作时，要特别小心空指针问题。

```java
// Java
public String getName() { return null; }
```

```kotlin
val name = javaObj.name // 平台类型，不安全
println(name.length)    // 可能直接 NPE
```

---

## 8. 小结

- Kotlin 通过 **可空类型** 和 **空安全操作符**，最大限度避免 NPE
- 常用语法：`?.`、`?:`、`!!`、`let`
- 初始化场景：`lateinit` 和 `by lazy`
- 注意 Java 平台类型的潜在风险

---

下一篇我们学习 👉 **《Kotlin 进阶（4）：集合操作进阶（map/filter/flatMap/reduce）》**，写出更简洁优雅的数据处理代码。

```

---

要不要我接着帮你写 **《Kotlin 进阶（4）：集合操作进阶》**？
```
