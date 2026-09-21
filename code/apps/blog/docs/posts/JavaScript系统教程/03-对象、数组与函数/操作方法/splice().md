---
title: "splice()"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "对象、数组与函数"
description: "splice() 方法通过删除或替换现有元素或者原地添加新的元素来修改数组,并以数组形式返回被修改的内容。此方法会改变原数组。 语法 array.splice(start[, deleteCount[, item1[, item2[, ...]]]] ) 参数 start​ 指定。"
sidebarWeight: 87
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/引用数据类型-数组/操作方法/splice().md"
---
::: v-pre

# splice()

> 本节目标：理解“splice()”的核心思路，并能把它用于实际开发或面试表达。
**splice()** 方法通过删除或替换现有元素或者原地添加新的元素来修改数组,并以数组形式返回被修改的内容。此方法会改变原数组。
**语法**
array.splice(start[, deleteCount[, item1[, item2[, _...]]]]_)
**参数**
start​
指定修改的开始位置（从0计数）。如果超出了数组的长度，则从数组末尾开始添加内容；如果是负值，则表示从数组末位开始的第几位（从-1计数，这意味着-n是倒数第n个元素并且等价于array.length-n）；如果负数的绝对值大于数组的长度，则表示开始位置为第0位。
deleteCount 可选
整数，表示要移除的数组元素的个数。
如果 deleteCount 大于 start 之后的元素的总数，则从 start 后面的元素都将被删除（含第 start 位）。
如果 deleteCount 被省略了，或者它的值大于等于array.length - start(也就是说，如果它大于或者等于start之后的所有元素的数量)，那么start之后数组的所有元素都会被删除。
如果 deleteCount 是 0 或者负数，则不移除元素。这种情况下，至少应添加一个新元素。
item1, item2, _..._ 可选
要添加进数组的元素,从start 位置开始。如果不指定，则 splice() 将只删除数组元素。

```
**返回值**
由被删除的元素组成的一个数组。如果只删除了一个元素，则返回只包含一个元素的数组。如果没有删除元素，则返回空数组。
**描述**
如果添加进数组的元素个数不等于被删除的元素个数，数组的长度会发生相应的改变。
**示例**
**从第** **2** **位开始删除** **0** **个元素，插入“****drum****”**
var myFish = ["angel", "clown", "mandarin", "sturgeon"];var removed = myFish.splice(2, 0, "drum");
// 运算后的 myFish: ["angel", "clown", "drum", "mandarin", "sturgeon"]// 被删除的元素: [], 没有元素被删除
**从第** **2** **位开始删除** **0** **个元素，插入“****drum****”** **和** **"guitar"**
var myFish = ['angel', 'clown', 'mandarin', 'sturgeon'];var removed = myFish.splice(2, 0, 'drum', 'guitar');
// 运算后的 myFish: ["angel", "clown", "drum", "guitar", "mandarin", "sturgeon"]// 被删除的元素: [], 没有元素被删除
**从第** **3** **位开始删除** **1** **个元素**
var myFish = ['angel', 'clown', 'drum', 'mandarin', 'sturgeon'];var removed = myFish.splice(3, 1);
// 运算后的 myFish: ["angel", "clown", "drum", "sturgeon"]// 被删除的元素: ["mandarin"]
**从第** **2** **位开始删除** **1** **个元素，插入“****trumpet****”**
var myFish = ['angel', 'clown', 'drum', 'sturgeon'];var removed = myFish.splice(2, 1, "trumpet");
// 运算后的 myFish: ["angel", "clown", "trumpet", "sturgeon"]// 被删除的元素: ["drum"]
**从第** **0** **位开始删除** **2** **个元素，插入****"parrot"****、****"anemone"****和****"blue"**
var myFish = ['angel', 'clown', 'trumpet', 'sturgeon'];var removed = myFish.splice(0, 2, 'parrot', 'anemone', 'blue');
// 运算后的 myFish: ["parrot", "anemone", "blue", "trumpet", "sturgeon"]// 被删除的元素: ["angel", "clown"]
**从第** **2** **位开始删除** **2** **个元素**
var myFish = ['parrot', 'anemone', 'blue', 'trumpet', 'sturgeon'];var removed = myFish.splice(myFish.length - 3, 2);
// 运算后的 myFish: ["parrot", "anemone", "sturgeon"]// 被删除的元素: ["blue", "trumpet"]
**从倒数第** **2** **位开始删除** **1** **个元素**
var myFish = ['angel', 'clown', 'mandarin', 'sturgeon'];var removed = myFish.splice(-2, 1);
// 运算后的 myFish: ["angel", "clown", "sturgeon"]// 被删除的元素: ["mandarin"]
**从第** **2** **位开始删除所有元素**
var myFish = ['angel', 'clown', 'mandarin', 'sturgeon'];var removed = myFish.splice(2);
// 运算后的 myFish: ["angel", "clown"]// 被删除的元素: ["mandarin", "sturgeon"]
```
 \> 来自

```
 <https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/splice>
```

:::
