---
title: "如何在多个Effect实例准确切换激活的"
date: 2026-08-11
categories:
  - "Vue 系统教程"
tags:
  - "Vue"
  - "Vue3"
  - "前端"
  - "教程"
  - "OneNote"
  - "响应式与组合式 API"
description: "方案二：弄一个树形结构，在每一个Effect上添加一个指针parent，用来指向入上一个effect；当fn执行完后，将指针指回到parent，即上一个effect。"
sidebarWeight: 91
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/vue3/实现effect/如何在多个Effect实例准确切换激活的.md"
---
::: v-pre

# 如何在多个Effect实例准确切换激活的

> 本节目标：理解“如何在多个Effect实例准确切换激活的”的核心思路，并能把它用于实际开发或面试表达。
```
方案一：使用栈，不停的入栈出栈；
```

方案二：弄一个树形结构，在每一个Effect上添加一个指针parent，用来指向入上一个effect；当fn执行完后，将指针指回到parent，即上一个effect；

```
方案二只要添加一个指针，优于方案一的栈；
```

```
export let activeEffect = undefined;
// 拥有一个run方法，就是执行effect
class ReactiveEffect {
  ==public== ==parent== ===== ==null====;==
  // 创建的effect默认是激活的
  public active = true
  // public修饰符会在实例上添加这个参数作为属性
  // 相当于this.fn=fn
  constructor(public fn) { }
  run() {
    // 如果是非激活的，只需要执行函数，不需要进行依赖收集
    if (!this.active) {
      this.fn();
    }
    try {
      ==//== ==第一个实例的====parent====是====undefined==
      ==this====.====parent== ===== ==activeEffect====;==
      activeEffect = this;
      return this.fn();
    } finally {
      ==//== ==代码执行完后，==
      ==//== ==一、重置====activeEffect====，指向====parent==
      ==activeEffect== ===== ==this====.====parent====;==
      ==//== ==二、重置====parent====指针====,undefined?==
      ==this====.====parent== ===== ==null====;==
    }
  }
}
```

:::
