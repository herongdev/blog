---
title: "data快捷访问"
date: 2026-08-11
categories:
  - "Vue 系统教程"
tags:
  - "Vue"
  - "Vue3"
  - "前端"
  - "教程"
  - "OneNote"
  - "原理与手写实现"
description: "注意，这是对使用vm.属性名这种方式取值和赋值的拦截，不是对data.属性名上取值和赋值的拦截； 配置访问vue实例data的快捷方式； 对vm[键名]这种对值的访问方式进行拦截，把这种取值代理到对vm. data的访问； 思考： 为什么要对象拦截后再进行快捷访问拦截？ 如果键名。"
sidebarWeight: 56
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/手写/使用我们的Vue/data快捷访问.md"
---
::: v-pre

# data快捷访问

> 本节目标：理解“data快捷访问”的核心思路，并能把它用于实际开发或面试表达。
注意，这是对使用vm.属性名这种方式取值和赋值的拦截，不是对data.属性名上取值和赋值的拦截；
配置访问vue实例data的快捷方式；

```
首先，将options.data定义到实例的vm._data上去；
```

对vm[键名]这种对值的访问方式进行拦截，把这种取值代理到对vm.__data的访问；

```

在src/state.js中
function initData(vm) {
  // 用户传入的数据
  let data = vm.$options.data;
  // 只有根实例可以data是一个对象
  data = vm._data = isFunction(data) ? data.call(vm) : data;
  // 需要将data变成响应式的
  // 观测对象中的属性
  observe(data);
  for (let key in data) { // vm.message => vm._data.message
    proxy(vm, key, '_data');// 代理vm上的取值和设置值 和  vm._data 没关系了
  }
}

// 取值的时候做代理，不是暴力的把_data 属性赋予给vm
// 而且直接赋值会有命名冲突问题
function proxy(vm, key, source) {
  Object.defineProperty(vm, key, {
    get() {
      // vm._data.message
      return vm[source][key];
    },
    set(newValue) {
      // vm._data.message = newValue
      vm[source][key] = newValue;
    }
  })
}
```

思考：
为什么要对象拦截后再进行快捷访问拦截？
如果键名是$或__开头的特殊属性，会怎么样？

:::
