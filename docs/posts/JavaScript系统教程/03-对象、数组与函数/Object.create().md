---
title: "Object.create()"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "对象、数组与函数"
description: "Object.create() 方法详解 Object.create() 是 JavaScript 中用于创建新对象的重要方法，它允许你明确指定新对象的原型。 基本语法 javascript 复制 下载 Object.create(proto, [propertiesObject。"
sidebarWeight: 182
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/面向对象程序设计/Object.create().md"
---
::: v-pre

# Object.create()

> 本节目标：理解“Object.create()”的核心思路，并能把它用于实际开发或面试表达。
==Object.create()== **方法详解**
==Object.create()== ==是 JavaScript 中用于创建新对象的重要方法，它允许你明确指定新对象的原型。==
==基本语法==
javascript
复制
下载
Object.create(proto, [propertiesObject])

- ==proto====：新创建对象的原型对象（必须参数）==
- ==propertiesObject====：可选参数，包含要添加到新对象的属性描述符==

==核心功能==

- ==创建以指定对象为原型的新对象========javascript========复制========下载========const== ==person== ===== ==\{====== ==isHuman====:== ==false====,====== ==printIntroduction====:== ==function====()== ==\{====== ==console====.====log====(====`My name is== ==${====this====.====name====}====. Am I human?== ==${====this====.====isHuman====}====`====);====== ==\}========\};============const== ==me== ===== ==Object====.====create====(====person====);========me====.====name== ===== =='Matthew'====;== ======me====.====isHuman== ===== ==true====;== ======me====.====printIntroduction====();== ==// "My name is Matthew. Am I human? true"==
- ==创建没有原型的对象========javascript========复制========下载========const== ==obj== ===== ==Object====.====create====(====null====);== ==// 创建一个真正的空对象，没有继承任何属性或方法========console====.====log====(====obj====.====toString====);== ==// undefined==
- ==使用属性描述符========javascript========复制========下载========const== ==obj== ===== ==Object====.====create====(====Object====.====prototype====,== ==\{====== ==foo====:== ==\{====== ==value====:== =='hello'====,====== ==writable====:== ==true====,====== ==enumerable====:== ==true====,====== ==configurable====:== ==true====== ==\},====== ==bar====:== ==\{====== ==get====()== ==\{== ==return== ==10====;== ==\},====== ==enumerable====:== ==true====== ==\}========\});==

==与== ==new== ==操作符的区别==

|   |   |   |
|---|---|---|
|特性|==Object.create()==|==new== 操作符|
|原型设置|直接指定|通过构造函数.prototype|
|构造函数调用|不调用|调用|
|性能|更快|稍慢|

==实际应用场景==

- ==实现继承========javascript========复制========下载========function== ==Shape====()== ==\{====== ==this====.====x== ===== ==0====;====== ==this====.====y== ===== ==0====;========\}============function== ==Rectangle====()== ==\{====== ==Shape====.====call====(====this====);== ==// 调用父类构造函数========\}============// 设置原型链========Rectangle====.====prototype== ===== ==Object====.====create====(====Shape====.====prototype====);========Rectangle====.====prototype====.====constructor== ===== ==Rectangle====;==
- ==创建纯净对象========javascript========复制========下载========// 创建一个没有原型链上属性的纯净对象========const== ==pureObject== ===== ==Object====.====create====(====null====);==
- ==安全地扩展对象========javascript========复制========下载========const== ==original== ===== ==\{== ==a====:== ==1== ==\};========const== ==extended== ===== ==Object====.====create====(====original====,== ==\{====== ==b====:== ==\{== ==value====:== ==2== ==\}========\});==

    1. 在 ES5 之前的环境中可能需要 polyfilljavascript复制下载if (typeof Object.create !== 'function') \{ Object.create = function (proto) \{ function F() \{\} F.prototype = proto; return new F(); \};\}
    2. 属性描述符中的 ==writable==, ==enumerable== 和 ==configurable== 默认为 ==false==
    3. 使用 ==Object.create(null)== 创建的对象不包含任何默认方法（如 ==toString()==） \> 来自 \<[https://chat.deepseek.com/a/chat/s/9d046af8-e82c-4378-bdb9-59856bc1d8f4](https://chat.deepseek.com/a/chat/s/9d046af8-e82c-4378-bdb9-59856bc1d8f4)\>
==注意事项==
 \> 来自 \<[https://chat.deepseek.com/a/chat/s/9d046af8-e82c-4378-bdb9-59856bc1d8f4](https://chat.deepseek.com/a/chat/s/9d046af8-e82c-4378-bdb9-59856bc1d8f4)\>

:::
