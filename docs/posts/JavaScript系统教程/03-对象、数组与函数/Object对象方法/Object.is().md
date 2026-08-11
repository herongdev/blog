---
title: "Object.is()"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "对象、数组与函数"
description: "比较情况 Object.is(a, b) a b 相同值 true true 不同类型 false false NaN vs NaN true ✅ false ❌ +0 vs 0 false ✅ true ❌ 其他情况 同 同 Object.is \\ 来自 \\<https://c。"
sidebarWeight: 43
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/引用数据类型-对象/Object对象方法/Object.is().md"
---
::: v-pre

# Object.is()

> 本节目标：理解“Object.is()”的核心思路，并能把它用于实际开发或面试表达。

> 说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。
|   |   |   |
|---|---|---|
|比较情况|==Object.is(a, b)==|==a === b==|
|相同值|==true==|==true==|
|不同类型|==false==|==false==|
|==NaN== vs ==NaN==|==true== ✅|==false== ❌|
|==+0== vs ==-0==|==false== ✅|==true== ❌|
|其他情况|同 =======|同 ==Object.is==|
 \> 来自 \<[https://chat.deepseek.com/a/chat/s/090e7160-1f47-45f6-957e-0a530771a40d](https://chat.deepseek.com/a/chat/s/090e7160-1f47-45f6-957e-0a530771a40d)\>

```
**背景**
ES5 比较两个值是否相等，只有两个运算符：
```

```
相等运算符（==）
```

```
严格相等运算符（===）。
```

```
它们都有缺点：
```

```
前者会自动转换数据类型，
```

```
后者的NaN不等于自身，以及+0等于-0。
```

```
ES6 提出“Same-value equality”（同值相等）算法。
Object.is就是部署这个算法的新方法。
```

它用来比较两个值是否严格相等，与严格比较运算符（===）的行为基本一致。

```
Object.is('foo', 'foo')// trueObject.is({}, {})// false
```

```
不同之处只有两个：一是+0不等于-0，二是NaN等于自身。
```

```
+0 === -0 //trueNaN === NaN // false
Object.is(+0, -0) // falseObject.is(NaN, NaN) // true
```

```
实现
ES5 可以通过下面的代码，部署Object.is。
Object.defineProperty(Object, 'is', {  value: function(x, y) {    if (x === y) {     // 针对+0 不等于 -0的情况      return x !== 0 || 1 / x === 1 / y;    }   // 针对NaN的情况    return x !== x && y !== y;  },  configurable: true,  enumerable: false,  writable: true});
```

:::
