---
title: "dangerouslySetInnerHTML使用"
date: 2026-08-11
categories:
  - "React 系统教程"
tags:
  - "React"
  - "Redux"
  - "前端"
  - "教程"
  - "OneNote"
  - "性能与实战"
description: "不合时宜的使用 innerHTML 可能会导致 cross site scripting (XSS) 攻击。 净化用户的输入来显示的时候，经常会出现错误，不合适的净化也是导致网页攻击的原因之一。dangerouslySetInnerHTML 这个 prop 的命名是故意这么设计的。"
sidebarWeight: 2
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/应用/dangerouslySetInnerHTML使用.md"
---
::: v-pre

# dangerouslySetInnerHTML使用

> 本节目标：理解“dangerouslySetInnerHTML使用”的核心思路，并能把它用于实际开发或面试表达。
```
在react中，通过富文本编辑器进行操作后的内容，会保留原有的标签样式，并不能正确展示。
在显示时，将内容写入__html对象中即可。具体如下：
<div dangerouslySetInnerHTML = {{ __html: checkMessages.details }} />
```

```
如果是直接调用接口中的值，则是以上的写法，如果是单纯的显示固定的内容，用如下的写法：
<div dangerouslySetInnerHTML={{ __html: '<div>123</div>' }} />
```

```
**原理：**
```

```
既可以插入DOM，又可以插入字符串；
```

不合时宜的使用 innerHTML 可能会导致 cross-site scripting (XSS) 攻击。 净化用户的输入来显示的时候，经常会出现错误，不合适的净化也是导致网页攻击的原因之一。dangerouslySetInnerHTML 这个 prop 的命名是故意这么设计的，以此来警告，它的 prop 值（ 一个对象而不是字符串 ）应该被用来表明净化后的数据。

```
来自 <[https://www.jianshu.com/p/186ccd8a5178](https://www.jianshu.com/p/186ccd8a5178)>
```

:::
