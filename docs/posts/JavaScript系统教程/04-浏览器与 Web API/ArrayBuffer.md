---
title: "ArrayBuffer"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "浏览器与 Web API"
description: "ArrayBuffer ECMAScript 6入门 Int32Array 和 Float64Array 是 JavaScript 中的 TypedArray 类型，用于高效存储和操作二进制数据。它们的区别主要体现在存储的数据类型、内存占用和数值范围上。 1. 数据类型 类型 存。"
sidebarWeight: 89
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/二进制数据/ArrayBuffer.md"
---
::: v-pre

# ArrayBuffer

> 本节目标：理解“ArrayBuffer”的核心思路，并能把它用于实际开发或面试表达。
[ArrayBuffer - ECMAScript 6入门](https://es6.ruanyifeng.com/#docs/arraybuffer)
`` `Int32Array` `` 和 `` `Float64Array` `` 是 `JavaScript` 中的 `**TypedArray**` 类型，用于高效存储和操作二进制数据。它们的区别主要体现在存储的数据类型、内存占用和数值范围上。

`## **1.` **数据类型**`**`

|   |   |   |   |
|---|---|---|---|
|类型|存储的数据类型|字节/元素|描述|
|==Int32Array==|32位有符号整数|4 字节|存储整数，范围较大，但只能表示整数|
|==Float64Array==|64位双精度浮点数|8 字节|存储浮点数（小数），范围更大，但可能有精度问题|

`## **2.` **数值范围**

```
**
### **(1) `Int32Array`
```

**（**`32` **位有符号整数）**

```
**
- **
```

**最小值**`**`：

```
`-2^31` = `-2,147,483,648`
- **
```

**最大值**`**`：

```
`2^31 - 1` = `2,147,483,647`
- **
```

**超出范围会发生溢出**`**`（例如 `` `2,147,483,648` `` 会变成 `` `-2,147,483,648` ``）

```
### **(2) `Float64Array`
```

**（**`64` **位双精度浮点数）**

```
**
- **
```

**最小值**`**`：

```
`≈ -1.8 × 10^308`
- **
```

**最大值**`**`：

```
`≈ 1.8 × 10^308`
- **
```

**精度**`**`：大约 `15-17` 位有效数字

```
- **
```

**特殊值**`**`：可以存储 `` `Infinity` ``、`` `-Infinity` `` 和 `` `NaN` ``

`## **3.` **存储计算**

```
**
### **(1)
```

**计算数组占用的内存**

```
**
- `Int32Array`
```

每个元素占用 `**4` **字节**

```
**
- `Float64Array`
```

每个元素占用 `**8` **字节**

```
**
**
```

**计算公式：**

```
**
```
```
 总字节数 `=` 元素数量 `×` 每个元素的字节数

```
```
**
```

**示例：**

```
**
```javascript
const intArray = new Int32Array(1000) // 1000
```

个 `32` 位整数

```
console.log(intArray.byteLength) // 1000 × 4 = 4000
```

字节（`4KB`）

```
const floatArray = new Float64Array(1000) // 1000
```

个 `64` 位浮点数

```
console.log(floatArray.byteLength) // 1000 × 8 = 8000
```

字节（`8KB`）
` ``` `

`### **(2)` **计算最大存储元素数量**`**`
由于 `` `TypedArray` `` 是基于 `` `ArrayBuffer` `` 的，其最大长度受 `` `ArrayBuffer` `` 限制：

```
- **
```

**最大** `` `ArrayBuffer` `` **大小**`**`（浏览器环境）：通常 `` `2^31 - 1` ``（约 `2GB`）

```
- **Node.js**
```

可能有更高的限制（取决于系统内存）

`**`**计算最大元素数量：**

```
**
```javascript
// Int32Array
```

最大可能长度

```
const maxInt32Elements = Math.floor((2 ** 31 - 1) / 4) //
```

约 `536,870,911` 个元素
`// Float64Array` 最大可能长度

```
const maxFloat64Elements = Math.floor((2 ** 31 - 1) / 8) //
```

约 `268,435,455` 个元素

```
```
---
## **4.
```

**使用场景对比**

```
**
|
```

场景                            `|` 推荐使用

```
                                     |
| ------------------------------- | -------------------------------------------- |
|
```

存储整数（如像素数据、索引）

```
    | `Int32Array`                                 |
|
```

存储高精度小数（如科学计算）

```
    | `Float64Array`                               |
|
```

需要节省内存（如 `WebGL` 缓冲区）

```
 | `Int32Array`
```

（比 `` `Float64Array` `` 省一半内存）

```
 |
|
```

需要极大数值范围（如天文计算）

```
  | `Float64Array`                               |
---
## **5.
```

**代码示例**

```
**
### **(1)
```

**创建并计算内存**

```
**
```javascript
// Int32Array
```

示例

```
const intArr = new Int32Array([1, 2, 3, 2147483647])
console.log(intArr.length) // 4
console.log(intArr.byteLength) // 4 × 4 = 16
```

字节
`// Float64Array` 示例

```
const floatArr = new Float64Array([1.5, 2.3, 1.8e308])
console.log(floatArr.length) // 3
console.log(floatArr.byteLength) // 3 × 8 = 24
```

字节

```
```
### **(2)
```

**数值溢出测试**

```
**
```javascript
const intArr = new Int32Array([2147483647])
intArr[0] += 1 //
```

溢出，变成

```
 -2147483648
console.log(intArr[0]) // -2147483648
const floatArr = new Float64Array([1.8e308])
floatArr[0] *= 2 //
```

超出范围，变成

```
 Infinity
console.log(floatArr[0]) // Infinity
```
---
## **
```

**总结**

```
**
|
```

特性

```
         | `Int32Array`       | `Float64Array`   |
| ------------ | ------------------ | ---------------- |
| **
```

**存储类型**

```
** | 32
```

位整数          `| 64` 位浮点数

```
      |
| **
```

**内存占用**

```
** | 4
```

字节`/`元素        `| 8` 字节`/`元素

```
      |
| **
```

**数值范围**

```
** | `-2^31` ~ `2^31-1` | `≈ ±1.8e308`     |
| **
```

**适用场景**

```
** |
```

整数计算、节省内存 `|` 高精度浮点数计算 `|`
如果你的数据是整数，且范围在 `` `±2.1e9` `` 内，`` `Int32Array` `` 更节省内存。
如果需要存储极大数或小数，`` `Float64Array` `` 更合适，但占用双倍内存。

:::
