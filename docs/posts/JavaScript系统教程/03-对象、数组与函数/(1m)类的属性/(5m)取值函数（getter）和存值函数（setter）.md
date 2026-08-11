---
title: "取值函数（getter）和存值函数（setter）"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "对象、数组与函数"
description: "围绕“取值函数（getter）和存值函数（setter）”整理的概念、示例与实践笔记。"
sidebarWeight: 141
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/面向对象程序设计/(1m)类的属性/(5m)取值函数（getter）和存值函数（setter）.md"
---
::: v-pre

# 取值函数（getter）和存值函数（setter）

> 本节目标：理解“取值函数（getter）和存值函数（setter）”的核心思路，并能把它用于实际开发或面试表达。

> 说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。
```
与 ES5 一样，在“类”的内部可以使用get和set关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为。
class MyClass {
    constructor() {
        // ...
    }
    get prop() {
        return 'getter';
    }
    set prop(value) {
        console.log('setter: ' + value);
    }
}
let inst = new MyClass();
inst.prop = 123;
// setter: 123
inst.prop
// 'getter'
```

```
存值函数和取值函数是设置在属性的 Descriptor 对象上的。
class CustomHTMLElement {
    constructor(element) {
        this.element = element;
    }
    get html() {
        return this.element.innerHTML;
    }
    set html(value) {
        this.element.innerHTML = value;
    }
}
var descriptor = Object.getOwnPropertyDescriptor(
    CustomHTMLElement.prototype, "html"
);
"get" in descriptor  // true
"set" in descriptor  // true
注意：html属性定义在原型上，因为没有用this指定。使用取值和存值函数指定的属性，如果没有使用this指定到实例上，就会挂载到原型对象上。
```

:::
