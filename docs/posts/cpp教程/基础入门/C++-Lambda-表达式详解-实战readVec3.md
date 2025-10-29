---
title: "C++ Lambda 表达式详解（以 readVec3 为例）"
date: 2025-01-27
tags:
  - C++
  - Lambda
  - NAPI
  - 实战
description: "用一个真实的 readVec3 例子，逐段拆解 C++ Lambda：捕获、参数、返回类型与函数体，并对比等价普通写法。"
---

## C++ Lambda 表达式详解（以 readVec3 为例）

## 完整的 Lambda 表达式结构

```cpp
auto readVec3 = [&](const char *key, float v[3]) -> bool {
    // 函数体
    return true;
};
```

## 逐部分详解

### 1) `auto` - 自动类型推断

```cpp
auto
```

- 作用：让编译器自动推断变量的类型。
- 这里：编译器会自动推断 `readVec3` 的类型是这个 Lambda 的闭包类型。

### 2) `readVec3` - 变量名

```cpp
readVec3
```

- 作用：给这个 Lambda 起个名字，方便后续调用。
- 含义：读取三维向量（vec3）。

### 3) `[&]` - 捕获列表

```cpp
[&]
```

- 作用：定义 Lambda 如何访问外部变量。
- `&`：按引用捕获所有外部变量（如 `env`, `item`）。
- 常见形式：
  - `[=]` 按值捕获；
  - `[env, &item]` 混合捕获；
  - `[]` 不捕获任何变量。

### 4) `(const char *key, float v[3])` - 参数列表

```cpp
(const char *key, float v[3])
```

- `const char *key`：C 风格字符串，属性名（如 "position"）。
- `float v[3]`：长度为 3 的浮点数组，作为输出参数存放结果。

### 5) `-> bool` - 返回类型

```cpp
-> bool
```

- 显式指定返回 `bool`，`true` 表成功，`false` 表失败。

### 6) `{ ... }` - 函数体

```cpp
{
    // 具体的执行代码
}
```

## 函数体内部代码详解（NAPI 实战）

第一步：获取属性

```cpp
napi_value arr;
if (napi_get_named_property(env, item, key, &arr) != napi_ok)
  return false;
```

- 从 JS 对象 `item` 上读取名为 `key` 的属性到 `arr`。

第二步：检查是否为数组

```cpp
bool isA = false;
napi_is_array(env, arr, &isA);
if (!isA)
  return false;
```

- 验证读取到的是数组。

第三步：遍历前三个元素并转换

```cpp
for (int k = 0; k < 3; k++) {
  napi_value num;
  napi_get_element(env, arr, k, &num);

  double d = 0;
  napi_get_value_double(env, num, &d);

  v[k] = (float)d;
}
```

- 读取数组前 3 项（x/y/z），并转为 `float` 存入输出数组 `v`。

## 等价的普通写法（类仿函数）

```cpp
class Functor {
private:
    napi_env env;
    napi_value item;
public:
    Functor(napi_env e, napi_value i) : env(e), item(i) {}

    bool operator()(const char *key, float v[3]) {
        // 与 Lambda 相同的逻辑...
        return true;
    }
};

auto readVec3 = Functor(env, item);
```

对比：Lambda 更简洁，能就地捕获外部变量，避免到处传参，且作用域明确。

## 调用示例

```cpp
float position[3];
if (readVec3("position", position)) {
    // position[0], position[1], position[2]
} else {
    // 读取失败
}
```

## 何时优先用 Lambda？

- 只在局部场景使用的一小段逻辑；
- 需要方便地捕获上下文变量；
- 想避免为一次性逻辑创建独立函数/类。

---

结论：这个 Lambda 是一个精巧的“数据提取器”，通过引用捕获外部环境，把 JS 对象中的三维向量读出到 `float[3]` 中，代码简洁且意图清晰。
