---
title: "toRef和toRefs"
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
description: "把对一个对象属性的访问，变成了对一个对象value属性的访问； 这样，我们创建了一个值，这个值可以用于其它effect中，在effect中，我们从value上取值时，我们收集了effect，之后，我们对这个值的value进行赋值时，我们可以让effect的run方法重新执行一次。"
sidebarWeight: 24
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/vue3/Ref实现/toRef和toRefs.md"
---
::: v-pre

# toRef和toRefs

> 本节目标：理解“toRef和toRefs”的核心思路，并能把它用于实际开发或面试表达。
把对一个对象属性的访问，变成了对一个对象value属性的访问；

这样，我们创建了一个值，这个值可以用于其它effect中，在effect中，我们从value上取值时，我们收集了effect，之后，我们对这个值的value进行赋值时，我们可以让effect的run方法重新执行一次；

```
export function toRef(object, key) {
  return new ObjectRefImpl(object, key);
}
```

```
class ObjectRefImpl { // 只是将.value属性代理到原始类型上
  constructor(public object, public key) { }
  get value() {
    return this.object[this.key];
  }
  set value(newValue) {
    this.object[this.key] = newValue
  }
}
```

```
**toRefs**
在内部循环调用了toRef，让对象上的每个属性变成了ref；
之后 ，当在effect中使用ref.value时收集依赖，设置ref的值时，让effect.run执行；
export function toRefs(object) {
  const result = isArray(object) ? new Array(object.length) : {};
  for (let key in object) {
    result[key] = toRef(object, key);
  }
  return result
}
```

:::
