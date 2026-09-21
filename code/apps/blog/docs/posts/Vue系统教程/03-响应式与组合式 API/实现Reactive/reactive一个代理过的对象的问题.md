---
title: "reactive一个代理过的对象的问题"
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
description: "给已代理过的对象加上一个标识；表示是不是一个已经代理过的对象，如果是一个代理过的对象，即一个proxy，直接返回即可； 简言之，这个 ReactiveFlags . IS REACTIVE 在对象上是不存在的； 但是在proxy实例上取这个属性值时，我们直接让代码返回true使条。"
sidebarWeight: 83
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/vue3/实现Reactive/reactive一个代理过的对象的问题.md"
---
::: v-pre

# reactive一个代理过的对象的问题

> 本节目标：理解“reactive一个代理过的对象的问题”的核心思路，并能把它用于实际开发或面试表达。
给已代理过的对象加上一个标识；表示是不是一个已经代理过的对象，如果是一个代理过的对象，即一个proxy，直接返回即可；

```
import { isObject } from "@vue/shared";
// 1、将数据转化为响应式数据，只能做对象的代理
const reactiveMap = new WeakMap();
const enum ReactiveFlags {
  IS_REACTIVE = '__v_isReactive'
}
export function reactivity(target) {
  if (!isObject) {
    return
  }
  ==//== ==首次代理一个对象时，对象上肯定没有这个属性，则跳过==
  ==//== ==对象被代理过后是一个====proxy====，这时再取这个属性时==
  ==//== ==会走到====get====方法的====if== ==(key== ======= ==ReactiveFlags.IS_REACTIVE)== ==判断中==
  ==//== ==条件成立，直接返回====proxy====本身==
  ==if== ==(====target====[====ReactiveFlags====.====IS_REACTIVE====])== =={==
    ==return== ==target==
  ==}==
  // 有缓存取缓存
  let existingProxy = reactiveMap.get(target);
  if (existingProxy) {
    return existingProxy;
  };
  const proxy = new Proxy(target, {
    get(target, key, receiver) {
      ==if== ==(====key== ======= ==ReactiveFlags====.====IS_REACTIVE====)== =={==
        ==return== ==true==
      ==};==
      return Reflect.get(target, key, receiver)
    },
    set(target, key, value, receiver) {
      return Reflect.set(target, key, value, receiver)
    }
  })
  // 创建缓存
  reactiveMap.set(target, proxy);
  return proxy
}
```

简言之，这个 ==ReactiveFlags====.====IS_REACTIVE==在对象上是不存在的；
但是在proxy实例上取这个属性值时，我们直接让代码返回true使条件成立，从而直接返回proxy本身；所有proxy取这个属性时，直接返回True，从而返回本身；

:::
