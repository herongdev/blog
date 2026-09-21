---
title: "proxyRefs"
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
description: "围绕“proxyRefs”整理的概念、示例与实践笔记。"
sidebarWeight: 23
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/vue3/Ref实现/proxyRefs.md"
---
::: v-pre

# proxyRefs

> 本节目标：理解“proxyRefs”的核心思路，并能把它用于实际开发或面试表达。
```
把ref变回为proxy；
如果是取值操作，是ref就取ref.value;
如果是赋值操作，是ref就设置ref.value=newValue
export function proxyRefs(object) {
  return new Proxy(object, {
    get(target, key, recevier) {
      let r = Reflect.get(target, key, recevier);
      return r.__v_isRef ? r.value : r
    },
    set(target, key, value, recevier) {
      let oldValue = target[key];
      if (oldValue.__v_isRef) {
        oldValue.value = value;
        return true;
      } else {
        return Reflect.set(target, key, value, recevier);
      }
    }
  })
}
```

:::
