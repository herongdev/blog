---
title: "使用 JS 实现获取文件扩展名？"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "实战与性能"
description: "String.lastIndexOf() 方法返回指定值（本例中的'.'）在调用该方法的字符串中最后出现的位置，如果没找到则返回 1。 对于 'filename' 和 '.hiddenfile' ，lastIndexOf 的返回值分别为 0 和 1 无符号右移操作符(\\ \\ \\。"
sidebarWeight: 23
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/经典方法/使用 JS 实现获取文件扩展名？.md"
---
::: v-pre

# 使用 JS 实现获取文件扩展名？

> 本节目标：理解“使用 JS 实现获取文件扩展名？”的核心思路，并能把它用于实际开发或面试表达。
```
function getFileExtension3(filename) {
```

```
 return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
}
console.log(getFileExtension3("")); // ''
console.log(getFileExtension3("filename")); // ''
console.log(getFileExtension3("filename.txt")); // 'txt'
console.log(getFileExtension3(".hiddenfile")); // ''
console.log(getFileExtension3("filename.with.many.dots.ext")); // 'ext'
```
 String.lastIndexOf() 方法返回指定值（本例中的'.'）在调用该方法的字符串中最后出现的位置，如果没找到则返回 -1。
对于 'filename' 和 '.hiddenfile' ，lastIndexOf 的返回值分别为 0 和 -1 无符号右移操作符(\>\>\>) 将 -1 转换为 4294967295 ，将 -2 转换为 4294967294 ，这个方法可以保证边缘情况时文件名不变。

String.prototype.slice() 从上面计算的索引处提取文件的扩展名。如果索引比文件名的长度大，结果为""。
详细资料可以参考： [《如何更有效的获取文件扩展名》](https://segmentfault.com/a/1190000004993946)
 \> 来自

```
 <https://github.com/CavsZhouyou/Front-End-Interview-Notebook/blob/master/JavaScript/JavaScript.md>
```

:::
