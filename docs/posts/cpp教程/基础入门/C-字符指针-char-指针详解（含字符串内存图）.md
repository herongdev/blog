---
title: "C/C++ 字符指针 char* 详解（含字符串内存图）"
date: 2025-01-27
tags:
  - C
  - C++
  - 指针
  - 字符串
description: "从零解释 char*：指针与内存、字符串的本质、const char* 的必要性、指针运算与在 NAPI 实战中的用法。"
---

## `char*` 是什么？

```cpp
char *key;
```

- `char`：字符类型（一个字母/符号）
- `*`：指针符号，表示“指向……的地址”
- `key`：变量名

结论：`char*` 表示“指向字符的指针”，通常用来指向字符串的起始位置。

## 为什么需要 `*`（指针）？

### 1) 内存地址的概念

```cpp
char singleChar = 'A';         // 变量里存的是 'A'
char *pointer = &singleChar;   // 指针里存的是 singleChar 的内存地址
```

### 2) 字符串的本质：字符数组 + 结尾符 `\0`

```text
// 字符串 "hello" 在内存中的表示：
地址:  0x1000  0x1001  0x1002  0x1003  0x1004  0x1005
值:    'h'     'e'     'l'     'l'     'o'     '\0'
        ↑
      char* 指针通常指向这里（首地址）
```

`char*` 不存储整段字符串本身，只存储“起始地址”。通过这个地址，程序可以顺着读取完整的字符串，直到遇到 `\0`。

## `char*` 在字符串中的作用

### 1) 指向字符串首地址

```cpp
const char *key = "position";
```

- `key` 存储的是字符串常量 `"position"` 的起始地址；
- 通过 `key` 可逐个读取 `'p' 'o' ... 'n'`，直到遇到 `\0`。

### 2) 内存示意

```text
地址      值         含义
0x2000    'p'   ← key 指向这里
0x2001    'o'
0x2002    's'
0x2003    'i'
0x2004    't'
0x2005    'i'
0x2006    'o'
0x2007    'n'
0x2008    '\0'  字符串结束符
```

## 为什么应写成 `const char*`？

```cpp
const char *key = "position";  // 推荐
// char *key = "position";     // 旧式写法，可能警告或未定义行为
```

原因：

- 字符串字面量存放在只读区域；
- `const` 能防止修改（安全、表达意图清晰）；
- 现代编译器会对非常量指针指向字符串常量发出告警。

## 指针访问与运算

### 1) 解引用访问字符

```cpp
const char *str = "hello";
char c0 = *str;        // 'h'
char c1 = *(str + 1);  // 'e'
```

### 2) 指针移动

```cpp
// str 指向 'h'，str+1 指向 'e'，str+2 指向 'l' ...
```

## 在 NAPI/Node-API 实战中的应用

以 Lambda `readVec3` 为例：

```cpp
auto readVec3 = [&](const char *key, float v[3]) -> bool {
  // 通过 key（如 "position"）从 JS 对象中取属性
  napi_value arr;
  if (napi_get_named_property(env, item, key, &arr) != napi_ok) return false;

  bool isA = false;
  napi_is_array(env, arr, &isA);
  if (!isA) return false;

  for (int k = 0; k < 3; k++) {
    napi_value num;  napi_get_element(env, arr, k, &num);
    double d = 0;    napi_get_value_double(env, num, &d);
    v[k] = (float)d;
  }
  return true;
};
```

调用：

```cpp
float position[3];
readVec3("position", position);
```

流程：

1. 字符串常量 `"position"` 的地址传入 `key`；
2. 用 `key` 到 JS 对象里拿到名为 `"position"` 的属性；
3. 校验是数组后，读取前三项并写入 `v[3]`。

## 类比记忆

把 `char*` 想成“地址名片”：

```cpp
const char *名片 = "张三的家"; // 名片很小，只写地址
// 通过名片（地址）才能找到真正的房子（字符串内容）

// 若每次都传完整地址：
char 完整地址[100] = "北京市海淀区……"; // 每次复制很低效
```

`char*` 只传地址（4 或 8 字节），高效、节省内存，多个指针还能共享同一段只读字符串。

## 小结

- `char*` 是“指向字符的指针”，字符串是“以 `\0` 结尾的字符数组”；
- 传递 `const char*` 更安全，能清晰表达“只读”；
- 指针支持解引用与位移，便于遍历字符；
- 在 NAPI 等场景中，`const char*` 常用作属性名/键名的高效入参。
