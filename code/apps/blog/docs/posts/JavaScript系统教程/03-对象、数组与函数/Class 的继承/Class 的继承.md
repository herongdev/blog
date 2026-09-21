---
title: "Class 的继承"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "对象、数组与函数"
description: "ES5 的继承，实质是先创造子类的实例对象this，然后再将父类的方法添加到this上面（Parent.apply(this)）。 ES6 的继承机制完全不同，实质是先将父类实例对象的属性和方法，加到this上面（所以必须先调用super方法），然后再用子类的构造函数修改this。"
sidebarWeight: 174
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/面向对象程序设计/Class 的继承/Class 的继承.md"
---
::: v-pre

# Class 的继承

> 本节目标：理解“Class 的继承”的核心思路，并能把它用于实际开发或面试表达。
```
**Class****通过****extends****关键字实现继承；**
这比ES5的通过修改原型链实现继承，要清晰和方便很多。
class Point {
}
class ColorPoint extends Point {
}
```

```
在ColorPoint内部加上代码。
class ColorPoint extends Point {
    constructor(x, y, color) {
        super(x, y); // 调用父类的constructor(x, y)
        this.color = color;
    }
    toString() {
        return this.color + ' ' + super.toString(); // 调用父类的toString()
    }
}
上面代码中，constructor方法和toString方法之中，都出现了super关键字，它在这里表示父类的构造函数，用来新建父类的this对象。
```

```
**con****structor()**
如果子类没有定义constructor方法，这个方法会被默认添加，代码如下。也就是说，不管有没有显式定义，任何一个子类都有constructor方法。
class ColorPoint extends Point {
}
// 等同于
class ColorPoint extends Point {
    constructor(...args) {
        super(...args);
    }
}
```

```
**su****per()**
子类必须在constructor方法中调用super方法，否则新建实例时会报错。
class Point { /* ... */ }
class ColorPoint extends Point {
    constructor() {
    }
}
let cp = new ColorPoint(); // ReferenceError
```

```
继承机制：
```

ES5 的继承，实质是先创造子类的实例对象this，然后再将父类的方法添加到this上面（Parent.apply(this)）。

ES6 的继承机制完全不同，实质是先将父类实例对象的属性和方法，加到this上面（所以必须先调用super方法），然后再用子类的构造函数修改this。

```
如果不调用super方法，子类就得不到this对象。
```

在子类的构造函数中，只有调用super之后，才可以使用this关键字，否则会报错。这是因为子类实例的构建，基于父类实例，只有super方法才能调用父类实例。

```
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
class ColorPoint extends Point {
    constructor(x, y, color) {
        this.color = color; // ReferenceError
        super(x, y);
        this.color = color; // 正确
    }
}
```

```
下面是生成子类实例的代码。
let cp = new ColorPoint(25, 8, 'green');
cp instanceof ColorPoint // truecp instanceof Point // true
上面代码中，实例对象cp同时是ColorPoint和Point两个类的实例，这与 ES5 的行为完全一致。
```

:::
