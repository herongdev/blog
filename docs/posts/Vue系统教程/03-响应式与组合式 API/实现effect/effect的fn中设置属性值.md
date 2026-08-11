---
title: "effect的fn中设置属性值"
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
description: "围绕“effect的fn中设置属性值”整理的概念、示例与实践笔记。"
sidebarWeight: 88
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/vue3/实现effect/effect的fn中设置属性值.md"
---
::: v-pre

# effect的fn中设置属性值

> 本节目标：理解“effect的fn中设置属性值”的核心思路，并能把它用于实际开发或面试表达。
```
effect(() => {
  ==state====.====aget== ===== ==Math====.====random====();==
  document.getElementById('app').innerHTML = state.name + '今年' + state.age + '岁了' + state.n
});
```

```
会死循环；
我们在执行Effect的时候，又要执行自己，那我们需要屏蔽掉，不要无限调用；
export function trigger(target, type, key, value, oldValue) {
  const depsMap = targetMap.get(target);
  // 触发的值不在模板中使用
  if (!depsMap) return;
  // 找到了属性对应的effcts
  const effects = depsMap.get(key);
  effects && effects.forEach(effect => {
    ==if== ==(====effect== ==!==== ==activeEffect====)== =={==
      ==effect====.====run====();==
    ==}==
  });
}
```

:::
