好的 ✅ 我来帮你写 **进阶系列第 6 篇**，主题是 **内联函数与性能优化**，继续保持 Hexo 技术分享风格，实用精简。

---

````markdown
---
title: Kotlin 进阶（6）：内联函数与性能优化
date: 2025-09-12
categories: [Kotlin 进阶学习]
tags: [Kotlin, 内联函数, inline, 性能优化]
---

# Kotlin 进阶（6）：内联函数与性能优化

Kotlin 的 **内联函数（inline function）** 主要用于 **性能优化**，尤其是高阶函数中，减少不必要的对象创建和函数调用开销。

---

## 1. 什么是内联函数？

一般高阶函数（接受 Lambda 参数的函数）在运行时会生成额外的对象和调用层级。  
加上 `inline` 关键字后，编译器会 **把函数体直接拷贝到调用处**，减少开销。

```kotlin
inline fun logTime(block: () -> Unit) {
    val start = System.currentTimeMillis()
    block()
    val end = System.currentTimeMillis()
    println("耗时: ${end - start}ms")
}

fun main() {
    logTime {
        Thread.sleep(500)
    }
}
```
````

👉 输出：

```
耗时: 500ms
```

这里 `block()` 会被编译成 **直接调用**，而不是额外的函数对象。

---

## 2. noinline 关键字

如果函数有多个 Lambda 参数，但并不是所有都需要内联，可以用 `noinline` 标记。

```kotlin
inline fun doSomething(
    block1: () -> Unit,
    noinline block2: () -> Unit
) {
    block1()
    block2()
}
```

这样 `block1` 会被内联，而 `block2` 仍然是普通对象。

---

## 3. crossinline 关键字

有些 Lambda 要求不能使用 `return` 直接跳出外层函数，可以用 `crossinline` 解决。

```kotlin
inline fun runTask(crossinline block: () -> Unit) {
    Thread {
        block() // 允许调用，但禁止直接 return 外层函数
    }.start()
}
```

---

## 4. reified（具体化类型参数）

通常泛型在运行时会被擦除，用 `reified` 可以让 **内联函数** 保留类型信息。

```kotlin
inline fun <reified T> printType() {
    println(T::class.simpleName)
}

fun main() {
    printType<String>() // 输出 String
    printType<Int>()    // 输出 Int
}
```

这在写工具函数时非常常用，比如 `startActivity<T>()`。

---

## 5. 使用场景

- **性能优化**：减少 Lambda 对象创建（常见于集合操作、DSL）
- **泛型工具函数**：结合 `reified`，写更优雅的 API
- **Android 开发**：`inline fun <reified T : Activity> Context.startActivity()`

---

## 6. 小结

- `inline`：把函数体复制到调用处，减少开销
- `noinline`：某些参数不内联
- `crossinline`：禁止 Lambda 非局部返回
- `reified`：泛型具体化，保留类型信息

---

下一篇我们学习 👉 **《Kotlin 进阶（7）：泛型与约束》**，掌握写通用代码的核心技能。

```

---

要不要我接着帮你写 **《Kotlin 进阶（7）：泛型与约束》**？
```
