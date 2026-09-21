---
title: "Object类型"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "语法、变量与数据"
description: "定义 ECMAScript 中的对象其实就是一组数据和功能的集合。 创建对象 对象可以通过执行 new 操作符后跟要创建的对象类型的名称来创建。 而创建 Object 类型的实例并为其添加属性和 ( 或 ) 方法，就可以创建自定义对象，如下所示： 如果不给构造函数传参数，则可以省。"
sidebarWeight: 76
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/数据类型/引用数据类型/Object类型.md"
---
::: v-pre

# Object类型

> 本节目标：理解“Object类型”的核心思路，并能把它用于实际开发或面试表达。

> 说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。
**定义**
`ECMAScript`中的对象其实就是一组数据和功能的集合。

**创建对象**
对象可以通过执行`new`操作符后跟要创建的对象类型的名称来创建。
而创建`Object`类型的实例并为其添加属性和`(`或`)`方法，就可以创建自定义对象，如下所示：

```
var o = new Object();
```
 如果不给构造函数传参数，则可以省略后面的那一对圆括号，但这不是推荐的做法

```
:
var o = new Object
```

；

**对象通用属性和方法**
在`ECMAScript`中，`Object`类型是所有它的实例的基础。换句话说，`Object`类型所具有的任何属性和方法也同样存在于更具体的对象中。`Object`的每个实例都具有下列属性和方法。

- `constructor`：保存着用于创建当前对象的函数。
- ```
    hasOwnProperty(PropertyName)
    ```

    ：用于检査给定的属性在当前对象实例中`(`而不是在实例的原型中`)`是否存在。其中，作为参数的属性名

    ```
    (propertyname)
    ```

    必须以字符串形式指定`(`例如：

    ```
    o.hasOwnProperty ('name')
    ```

    。
- `isPrototypeOf(object)`：用于检査某对象是否是传入对象的原型
- ```
    propertyIsEnumerable(propertyName)
    ```

    ：用于检査给定的属性是否能够使用

    ```
    for-in
    ```

    语句`(`本章后面将会讨论`)`来枚举。与`hasOwnProperty()`方法一样，作为分数的属性名必须以字符串形式指定。
- ```
    toLocaleString()
    ```

    ：返回对象的字符串表示，该字符串与执行环境的地区对应。
- ```
    toString()
    ```

    ：返回对象的字符串表示。
- ```
    valueOf()
    ```

    ：返回对象的字符串、数值或布尔值表示。通常与`tostring()`方法的返回值相同。

**注意**
从技术角度来讲，`ECMA-262`中对象的行为不一定适用于`JavaScript`中的其他对象。浏览器环境中对象，比如`BOM`和`DOM`中的对象，都属于宿主对象，因为它们是由宿主实现提供和定义的。`ECMA262`不负责定义宿主对象，因此宿主对象可能会也可能不会继承`Object`。

:::
