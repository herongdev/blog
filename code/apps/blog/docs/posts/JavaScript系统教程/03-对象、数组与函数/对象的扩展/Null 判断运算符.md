---
title: "Null 判断运算符"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "对象、数组与函数"
description: "\\ 来自。"
sidebarWeight: 57
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/引用数据类型-对象/对象的扩展/Null 判断运算符.md"
---
::: v-pre

# Null 判断运算符

> 本节目标：理解“Null 判断运算符”的核心思路，并能把它用于实际开发或面试表达。
```
**背景**
读取对象属性的时候，如果某个属性的值是null或undefined，有时候需要为它们指定默认值。常见做法是通过||运算符指定默认值。
const headerText = response.settings.headerText || 'Hello, world!';const animationDuration = response.settings.animationDuration || 300;const showSplashScreen = response.settings.showSplashScreen || true;
上面的三行代码都通过||运算符指定默认值，但是这样写是错的。开发者的原意是，只要属性的值为null或undefined，默认值就会生效，但是属性的值如果为空字符串或false或0，默认值也会生效。
```

```
为了避免这种情况，[ES2020](https://github.com/tc39/proposal-nullish-coalescing) 引入了一个新的 Null 判断运算符??。它的行为类似||，但是只有运算符左侧的值为null或undefined时，才会返回右侧的值。
const headerText = response.settings.headerText ?? 'Hello, world!';const animationDuration = response.settings.animationDuration ?? 300;const showSplashScreen = response.settings.showSplashScreen ?? true;
上面代码中，默认值只有在属性值为null或undefined时，才会生效。
```

```
这个运算符的一个目的，就是跟链判断运算符?.配合使用，为null或undefined的值设置默认值。
const animationDuration = response.settings?.animationDuration ?? 300;
上面代码中，response.settings如果是null或undefined，就会返回默认值300。
```

```
**实际应用**
这个运算符很适合判断函数参数是否赋值。
function Component(props) {  const enable = props.enabled ?? true; // …}
上面代码判断props参数的enabled属性是否赋值，等同于下面的写法。
function Component(props) {  const {    enabled: enable = true,  } = props; // …}
```

```
**运算优先级**
??有一个运算优先级问题，它与&&和||的优先级孰高孰低。现在的规则是，如果多个逻辑运算符一起使用，必须用括号表明优先级，否则会报错。
// 报错lhs && middle ?? rhslhs ?? middle && rhslhs || middle ?? rhslhs ?? middle || rhs
上面四个表达式都会报错，必须加入表明优先级的括号。
(lhs && middle) ?? rhs;lhs && (middle ?? rhs);
(lhs ?? middle) && rhs;lhs ?? (middle && rhs);
(lhs || middle) ?? rhs;lhs || (middle ?? rhs);
(lhs ?? middle) || rhs;lhs ?? (middle || rhs);
```
 \> 来自

```
 <https://es6.ruanyifeng.com/#docs/object>
```

:::
