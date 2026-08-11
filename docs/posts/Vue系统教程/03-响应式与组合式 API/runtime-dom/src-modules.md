---
title: "src-modules"
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
description: "围绕“src-modules”整理的概念、示例与实践笔记。"
sidebarWeight: 47
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/vue3/runtime-dom/src-modules.md"
---
::: v-pre

# src-modules

> 本节目标：理解“src-modules”的核心思路，并能把它用于实际开发或面试表达。

> 说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。
```
attr.ts
export function patchAttr(el, key, nextValue) {
  if (nextValue) {
    el.setAttribute(key, nextValue);
  } else {
    el.removeAttribute(key);
  }
}
```

```
class.ts
export function patchClass(el, nextValue) {
  if (nextValue == null) {
    // 如果不需要class直接移除
    el.removeAttribute('class');
  } else {
    el.className = nextValue
  }
}
```

```
style.ts
export function patchStyle(el, prevValue, nextValue = {}) {
  // 样式需要比对差异
  for (let key in nextValue) {
    // 用新的直接覆盖即可
    el.style[key] = nextValue[key];
  }
  if (prevValue) {
    for (let key in prevValue) {
      if (nextValue[key] == null) {
        el.style[key] = null;
      }
    }
  }
}
```

```
event.ts
function createInvoker(callback) {
  const invoker = (e) => invoker.value(e);
  invoker.value = callback;
  return invoker
}
```

```
如果之前有且现在还有同名事件，就更新事件回调函数即可；
如果之前存在同名事件，现在没有同名事件，要移除事件绑定；
如果之前不存在此名称事件，现在有了，则增加事件
export function patchEvent(el, eventName, nextValue) {
  // 事件绑定都缓存到了当前dom上
  // 可以先移除掉事件，再重新绑定事件
  // 但 add + 自定义事件 （里面调用绑定的方法）更佳
  let invokers = el._vei || (el._vei = {});
  let exits = invokers[eventName]; // 先看有没有缓存过
  // 如果绑定的是一个空
  if (exits && nextValue) { // 已经绑定过事件了
    exits.value = nextValue; // 没有卸载函数，只是改了invoker.value 属性
  } else {
    // 有!exits&&nextValue和exist&&!nextValue两种情况
    let event = eventName.slice(2).toLowerCase();
    if (nextValue) { // 只能是!exits才可以满足,不存在则创建事件
      const invoker = invokers[eventName] = createInvoker(nextValue);
      el.addEventListener(event, invoker)
    } else if (exits) {
     // 只有!nextValue满足，如果有老值，需要将老的绑定事件移除掉
      el.removeEventListener(event, exits);
      invokers[eventName] = undefined
    }
  }
}
```

:::
