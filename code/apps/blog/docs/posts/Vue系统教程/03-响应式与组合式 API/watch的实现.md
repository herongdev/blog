---
title: "watch的实现"
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
description: "注意：监控对象是无法区分新值和旧值的，他们是同一个引用地址； watch本质是一个effect，内部会对第一个参数进行依赖收集； 第一个参数变化后，执行第二个函数，第二个函数是自定义的Scheduler。"
sidebarWeight: 57
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/vue3/watch的实现.md"
---
::: v-pre

# watch的实现

> 本节目标：理解“watch的实现”的核心思路，并能把它用于实际开发或面试表达。
```
不属于响应式reactivity包中；
```

注意：监控对象是无法区分新值和旧值的，他们是同一个引用地址；

```
watch的第一个参数：
```

```
一个对象；
```

```
一个ref；
```

```
返回响应式值的函数；
```

```
数组；
```

watch本质是一个effect，内部会对第一个参数进行依赖收集；
第一个参数变化后，执行第二个函数，第二个函数是自定义的Scheduler；

```
用到的方法/src/reactive.ts
export function isReactive(value) {
  return !!(value && value[ReactiveFlags.IS_REACTIVE])
}
```

```
新建文件reactivity/src/watch.ts;
import { ReactiveEffect } from "./effect";
import { isReactive } from "./reactive";
// 本质也是一个ReactiveEffect，接受一个getter函数用来取值和依赖收集
// watch的getter也就是第一个参数，如果是对象或者一个数组，要转成一个方法
// 这个方法会对我们想观测的数组的属性进行递归，达到依赖收集的目的
// ReactiveEffect的第二参数是自定义的调度器，当依赖变化时，执行这个调度器；
export function watch(source, cb) {
    let getter;
    if (isReactive(source)) {
        // 调用get只是返回一个对象，我们要对对象中的属性进行访问
        // 只有这样才能进行依赖收集，所以我们要递归循环，只要循环就会访问对象上的每一个属性
        // 访问属性就会收集effect
        getter = () => source
    }
    let oldValue;
    const job = () => {
        const newValue = effect.run();
        cb(newValue, oldValue);
        oldValue = newValue;
    }
    // 监控自己构造的函数，变化后重新执行job
    const effect = new ReactiveEffect(getter, job);
    oldValue = effect.run();
}
```

```
import { isFunction, isObject } from "@vue/shared";
import { ReactiveEffect } from "./effect";
import { isReactive } from "./reactive";
==function== ==traversal====(====value====,== ==set== ===== ==new== ==Set====())== =={==
    ==//== ==考虑如果对象中有循环引用的问题==
    ==//== ==第一步递归要有终结条件，不是对象就不在递归了==
    ==if== ==(!====isObject====(====value====))== ==return== ==value====;==
    ==if== ==(====set====.====has====(====value====))== =={==
        ==return== ==value====;==
    ==}==
    ==set====.====add====(====value====);==
    ==for== ==(====let== ==key== ==in== ==value====)== =={==
        ==traversal====(====value====[====key====],== ==set====);==
    ==}==
    ==return== ==value==
==}==
export function watch(source, cb) {
    let getter;
    if (isReactive(source)) {
        // 对数据递归循环，只要循环就会访问对象上的每一个属性，访问属性的时候会收集effect
        getter = () => ==traversal====(====source====)==
    } else if (isFunction(source)) {
        // 这里假设用户的函数返回的是对象的属性值，而不是一个对象；
        getter = source
    } else {
        return
    }
    let oldValue;
    const job = () => {
        const newValue = effect.run();
        cb(newValue, oldValue);
        oldValue = newValue;
    }
    // 监控自己构造的函数，变化后重新执行job
    const effect = new ReactiveEffect(getter, job);
    oldValue = effect.run();
}
```

:::
