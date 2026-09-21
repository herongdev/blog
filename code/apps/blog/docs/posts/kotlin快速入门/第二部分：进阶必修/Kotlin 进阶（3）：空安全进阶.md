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

### 3.1 基础用法

```kotlin
// 简单的默认值
val userName = user.name ?: "未知用户"
val userAge = user.age ?: 0

// 链式调用
val result = getData()?.process()?.format() ?: "默认结果"
```

### 3.2 Elvis + run：处理复杂的空值情况

当空值时需要执行多行代码，可以使用 `?: run` 组合：

```kotlin
val activity: Activity = UTSAndroid.getUniActivity() ?: run {
    cb(fail("no activity"))
    return
}
```

**语法解析：**

- `?:` - Elvis 操作符，空值合并
- `run` - 作用域函数，提供代码块执行环境

**执行逻辑：**

1. 计算 `UTSAndroid.getUniActivity()`
2. 如果**不为 null**：直接赋值给 `activity`
3. 如果**为 null**：执行 `run` 块中的代码

**等价写法对比：**

```kotlin
// 使用 ?: run（推荐）
val activity = getActivity() ?: run {
    logError("Activity not found")
    showErrorDialog()
    return
}

// 传统 if-else 写法
val activity = getActivity()
if (activity == null) {
    logError("Activity not found")
    showErrorDialog()
    return
}
```

### 3.3 实际应用场景

#### 场景一：早期返回（Early Return）

```kotlin
fun processUserData(userId: String?) {
    val user = findUser(userId) ?: run {
        println("用户不存在")
        return
    }

    val profile = user.getProfile() ?: run {
        println("用户资料不完整")
        return
    }

    // 继续处理逻辑...
    updateUserProfile(profile)
}
```

#### 场景二：错误处理与回调

```kotlin
fun downloadFile(url: String?, callback: (Boolean) -> Unit) {
    val validUrl = url ?: run {
        callback(false)
        return
    }

    val connection = createConnection(validUrl) ?: run {
        callback(false)
        return
    }

    // 执行下载...
    callback(true)
}
```

#### 场景三：资源获取与清理

```kotlin
fun processData(): String? {
    val resource = acquireResource() ?: run {
        cleanup()
        return null
    }

    val processor = createProcessor() ?: run {
        resource.release()
        return null
    }

    return processor.process(resource)
}
```

### 3.4 `?: run` vs 其他模式

```kotlin
// 1. 简单默认值：用 ?:
val name = user.name ?: "匿名"

// 2. 空值时执行单行：用 ?:
val result = getData() ?: getDefaultData()

// 3. 空值时执行多行：用 ?: run
val config = getConfig() ?: run {
    logError("配置加载失败")
    initDefaultConfig()
    getDefaultConfig()
}

// 4. 空值时抛异常：用 ?: run 或 ?:
val required = getRequired() ?: run {
    throw IllegalStateException("必需资源不可用")
}
// 或更简洁的
val required = getRequired() ?: error("必需资源不可用")
```

---

## 4. 非空断言（!!）

把可空类型强制转为非空，如果是 `null` 就抛 NPE。
⚠️ **慎用！** 一般只在"绝对保证非空"的地方使用。

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

## 8. 空安全最佳实践

### 8.1 优先级顺序

1. **`?.` 安全调用** - 最安全，链式调用友好
2. **`?: 默认值`** - 简单场景的空值处理
3. **`?: run { ... }`** - 复杂空值处理，多行代码
4. **`!!` 非空断言** - 谨慎使用，确保绝对非空

### 8.2 常见模式总结

```kotlin
// ✅ 推荐：渐进式空值处理
fun safeProcess(data: String?): String {
    // 1. 安全调用 + Elvis
    val trimmed = data?.trim() ?: return "空数据"

    // 2. 进一步验证
    val validated = trimmed.takeIf { it.isNotEmpty() } ?: run {
        logWarning("数据为空")
        return "默认数据"
    }

    // 3. 正常处理
    return validated.uppercase()
}

// ❌ 避免：过度使用非空断言
fun unsafeProcess(data: String?): String {
    return data!!.trim()!!.uppercase()  // 危险！
}
```

---

## 9. 小结

- Kotlin 通过 **可空类型** 和 **空安全操作符**，最大限度避免 NPE
- 核心语法：`?.`、`?:`、`?: run`、`!!`、`let`
- **`?: run`** 是处理复杂空值场景的利器
- 初始化场景：`lateinit` 和 `by lazy`
- 注意 Java 平台类型的潜在风险

---

**下一篇预告** 👉 **《Kotlin 进阶（4）：数据类、枚举类、密封类》**，学习 Kotlin 的特色类型系统。
