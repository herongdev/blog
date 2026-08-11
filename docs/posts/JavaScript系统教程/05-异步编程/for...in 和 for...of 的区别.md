---
title: "for...in 和 for...of 的区别"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "异步编程"
description: "for...in 和 for...of 都是 JavaScript 中的循环语句，但它们有重要的区别： 主要区别 特性 for...in for...of 遍历对象 对象的可枚举属性（包括原型链） 可迭代对象的值（Array, Map, Set等） 返回值 属性名（键名/key）。"
sidebarWeight: 46
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/11-异步编程/`for...in` 和 `for...of` 的区别.md"
---
::: v-pre

# for...in 和 for...of 的区别

> 本节目标：理解“for...in 和 for...of 的区别”的核心思路，并能把它用于实际开发或面试表达。
`for...in` 和 `for...of` 都是 JavaScript 中的循环语句，但它们有重要的区别：

## 主要区别

| 特性 | `for...in` | `for...of` |
|---------------|---------------------------------|---------------------------------|
| **遍历对象** | 对象的可枚举属性（包括原型链） | 可迭代对象的值（Array, Map, Set等） |
| **返回值** | 属性名（键名/key） | 属性值（value） |
| **适用对象** | 普通对象 | 可迭代对象 |
| **原型属性** | 会遍历原型链上的属性 | 只遍历对象自身的值 |

## 详细解释

### 1. `for...in` 循环

```javascript
const obj = {a: 1, b: 2, c: 3};

for (const key in obj) {
console.log(key); // 输出: "a", "b", "c"
console.log(obj[key]); // 输出: 1, 2, 3
}
```

特点：
- 遍历对象自身的和继承的可枚举属性
- 遍历顺序不保证（特别是对数字键）
- 通常需要配合 `hasOwnProperty` 检查：
```javascript
for (const key in obj) {
if (obj.hasOwnProperty(key)) {
// 只处理对象自身的属性
}
}
```

### 2. `for...of` 循环

```javascript
const arr = ['a', 'b', 'c'];

for (const value of arr) {
console.log(value); // 输出: "a", "b", "c"
}
```

特点：
- 用于遍历可迭代对象（实现了 `[Symbol.iterator]` 方法的对象）
- 不遍历对象属性，只遍历值
- 支持的数据结构包括：Array, Map, Set, String, TypedArray, arguments 等

## 使用场景对比

### 适合 `for...in` 的情况：
- 需要遍历对象的所有属性（包括继承的）
- 需要检查对象是否具有某些属性
- 调试时查看对象内容

### 适合 `for...of` 的情况：
- 遍历数组元素
- 遍历 Map、Set 等集合
- 处理字符串的字符
- 任何需要直接获取值而不是键的场景

## 特殊示例

```javascript
// 数组 - 差异明显
const arr = ['a', 'b', 'c'];
arr.customProp = 'd';

// for...in 会包含自定义属性
for (const key in arr) {
console.log(key); // 输出: "0", "1", "2", "customProp"
}

// for...of 只遍历值
for (const value of arr) {
console.log(value); // 输出: "a", "b", "c"
}
```

## 注意事项

1. 对数组遍历优先使用 `for...of` 而不是 `for...in`，因为：
- `for...in` 会包含数组的非数字属性
- `for...in` 遍历顺序不一定按索引顺序
- `for...of` 性能通常更好

2. 普通对象不是可迭代对象，不能直接用 `for...of`：
```javascript
const obj = {a: 1, b: 2};
// 这会报错
for (const value of obj) { console.log(value); }   // 可以先用 Object.values()
for (const value of Object.values(obj)) { console.log(value); }
```

3. 要记住 `for...in` 会遍历原型链上的可枚举属性，必要时使用 `hasOwnProperty` 检查。

:::
