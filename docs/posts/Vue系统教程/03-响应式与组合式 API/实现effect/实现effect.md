---
title: "实现effect"
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
description: "effect函数的作用是将一个函数变成当其中依赖值变化时，会重新运行的函数； effect副作用，它接受一个函数fn作为参数； 当函数内部的数据变化时，函数fn会重新执行； 为了知道fn要监控哪些值，effect会一开始就运行一次函数fn，在读取函数内部的被代理数据的属性时，走到。"
sidebarWeight: 92
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/vue3/实现effect/实现effect.md"
---
::: v-pre

# 实现effect

> 本节目标：理解“实现effect”的核心思路，并能把它用于实际开发或面试表达。
effect函数的作用是将一个函数变成当其中依赖值变化时，会重新运行的函数；

effect副作用，它接受一个函数fn作为参数；
当函数内部的数据变化时，函数fn会重新执行；
为了知道fn要监控哪些值，effect会一开始就运行一次函数fn，在读取函数内部的被代理数据的属性时，走到get方法，将fn与这些属性进行关联，进行依赖收集；

```
export let activeEffect = undefined;
// 拥有一个run方法，就是执行effect
class ReactiveEffect {
  // 创建的effect默认是激活的
  active = true
  // public修饰符会在实例上添加这个参数作为属性
  // 相当于this.fn=fn
  constructor(public fn) { }
  run() {
    // 如果是非激活的，只需要执行函数，不需要进行依赖收集
    if (!this.active) {
      this.fn();
    }
    try {
      // 其它情况需要依赖收集
      // 核心就是将当前的effect和稍后渲染的属性关联在一起
      // 一、先创建一个全局变量 let activeEffect=undefinded
      // 二、当运行run时,将全局变量activeEffect指向当前effect
      activeEffect = this;
      // 先执行一次fn, 在运行函数内部代码时，会访问代理过的数据的get
      // 此时，我们是可以读取到这个全局的activeEffect的；
      // 然后将这个activeEffect与这些代理的属性进行关联；
      return this.fn();
    } finally {
      // 由于代码中有多个Effect实例，所以我们在运行完fn后，还要将activeEffect重置；
      activeEffect = undefined
    }
  }
}
export const effect = (fn) => {
  // 这里的fn可以根据数据变化，重新执行；
  // effect可以嵌套着写
  // 创建响应式的effect
  const _effect = new ReactiveEffect(fn);
  // 默认先执行一次
  _effect.run();
}
```

```
在baseHandle中导入activeEffect；
import { activeEffect } from "./effect";
```

**总结一下：**
我们的代码中会调用Effect函数或包装后的effect;
它会创建一个effect实例；
然后我们调用这个实例的run方法，在这个方法中，我们会：
将全局中的activeEffect指向这个实例；
也就是将传入effect的Fn执行一次，执行的时候自然会从reactive返回的proxy上进行取值；
而取值的时候，会触发get函数，在Get函数中，我们：

```
可以取到全局的activeEffect；
```

```
然后将当前要取的属性和这个activeEffect进行关联；
```

下次当这个属性的变化时，会触发set方法，我们在修改值后，将这个属性关联的activeEffect的run方法执行一次，也就是执行了传入给effect的函数fn执行了一次；

:::
