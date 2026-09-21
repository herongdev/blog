---
title: "src-vnode"
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
description: "位运算 & 适合权限的组合，每个权限在一个长二进制的不同位上值为1，其它低位值为0； 然后，赋予权限时，只要把相应的权限值用 运算组合即可，则得到的值，相应权限位上的值就是1，其它没有赋予权限的位上的值为0； 接下来要判断用户是否有某个权限时，只要用它的权限值&要判断的权限即可。"
sidebarWeight: 49
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/vue3/runtime-dom/src-vnode.md"
---
::: v-pre

# src-vnode

> 本节目标：理解“src-vnode”的核心思路，并能把它用于实际开发或面试表达。

> 说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。
```
先在packages/shared/src/index.ts中创建一个枚举
// vue3提供的形状标识
export const enum ShapeFlags {
  ELEMENT = 1,
  FUNCTIONAL_COMPONENT = 1 << 1,// 0b10
  STATEFUL_COMPONENT = 1 << 2,// 0b100
  TEXT_CHILDREN = 1 << 3,// 0b1000
  ARRAY_CHILDREN = 1 << 4,// 0b10000
  SLOTS_CHILDREN = 1 << 5,
  TELEPORT = 1 << 6,
  SUSPENSE = 1 << 7,
  COMPONENT_SHOULD_KEEP_ALIVE = 1 << 8,
  COMPONENT_KEPT_ALIVE = 1 << 9,
  COMPONENT = ShapeFlags.STATEFUL_COMPONENT | ShapeFlags.FUNCTIONAL_COMPONENT
}
```

位运算 & | 适合权限的组合，每个权限在一个长二进制的不同位上值为1，其它低位值为0；

然后，赋予权限时，只要把相应的权限值用|运算组合即可，则得到的值，相应权限位上的值就是1，其它没有赋予权限的位上的值为0；

接下来要判断用户是否有某个权限时，只要用它的权限值&要判断的权限即可，如果有相应的权限，则得到的值是否大于0；
let user = 增加 | 删除
看一下是否有增加权限 ，则可看user&增加是否\>0，即

权限值是一个只有权限位也就是最高位为1，其它位都0的二进制数；
只有要判断的权限值的相应判断位置为1时，与权限值相&时，值必然大于0；
说相判断的权限位为0，与相应权限（只有权限位为1，其它位为0）相&值必为0；

同样，对于是不是组件的判断来说也是一样，先|操作来赋值
 COMPONENT = ShapeFlags.STATEFUL_COMPONENT | ShapeFlags.FUNCTIONAL_COMPONENT
再用对应的组件类型来&来判断是不是相应组件

:::
