---
title: "super 关键字"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "对象、数组与函数"
description: "super这个关键字，既可以当作函数使用，也可以当作对象使用。在这两种情况下，它的用法完全不同。 由于super指向父类的原型对象，所以定义在父类实例上的方法或属性，是无法通过super调用的。 ES6 规定，在子类普通方法中通过super调用父类的方法时，方法内部的this指向。"
sidebarWeight: 177
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/面向对象程序设计/Class 的继承/super 关键字.md"
---
::: v-pre

# super 关键字

> 本节目标：理解“super 关键字”的核心思路，并能把它用于实际开发或面试表达。
super这个关键字，既可以当作函数使用，也可以当作对象使用。在这两种情况下，它的用法完全不同。

```
一、super作为函数调用时，代表父类的构造函数。
ES6 要求，子类的构造函数必须执行一次super函数。
class A { }
class B extends A {
    constructor() {
        super();
    }
}
```

```
注意：
1、super虽然代表了父类A的构造函数，但是返回的是子类B的实例，即super内部的this指的是B的实例；
因此super()在这里相当于A.prototype.constructor.call(this)。
class A {
    constructor() {
        console.log(new.target.name);
    }
}
class B extends A {
    constructor() {
        super();
    }
}
new A() // A
new B() // B
```

```
2、作为函数时，super()只能用在子类的构造函数之中，用在其他地方就会报错。
class A {}
class B extends A {  m() {    super(); // 报错  }}
```

```
二、super作为对象时：
```

```
在普通方法中，指向父类的原型对象；
```

```
在静态方法中，指向父类。
```

```
class A {
    p() {
        return 2;
    }
}
class B extends A {
    constructor() {
        super();
        console.log(super.p()); // 2
    }
}
let b = new B();
```

```

p是父类A实例的属性，super.p就引用不到它。
class A {
    constructor() {
        this.p = 2;
    }
}
class B extends A {
    get m() {
        return super.p;
    }
}
let b = new B();
b.m // undefined
```

```
如果属性定义在父类的原型对象上，super就可以取到。
class A {}
A.prototype.x = 2;
class B extends A {
  constructor() {
    super();
    console.log(super.x) // 2
  }
}
let b = new B();
注意：
```

由于super指向父类的原型对象，所以定义在父类实例上的方法或属性，是无法通过super调用的。

ES6 规定，在子类普通方法中通过super调用父类的方法时，方法内部的this指向当前的子类实例。

```
class A {
    constructor() {
        this.x = 1;
    }
    print() {
        console.log(this.x);
    }
}
```

```
class B extends A {
    constructor() {
        super();
        this.x = 2;
    }
    m() {
        super.print();
    }
}
let b = new B();
b.m() // 2
实际上执行的是super.print.call(this)。
```

由于this指向子类实例，所以如果通过super对某个属性赋值，这时super就是this，赋值的属性会变成子类实例的属性。

```
class A {
    constructor() {
        this.x = 1;
    }
}
class B extends A {
    constructor() {
        super();
        this.x = 2;
        super.x = 3;
        console.log(super.x); // undefined
        console.log(this.x); // 3
    }
}
let b = new B();
```

上面代码中，super.x赋值为3，这时等同于对this.x赋值为3。而当读取super.x的时候，读的是A.prototype.x，所以返回undefined。

```
**super****用在静态方法中**
super指向：super作为对象用在静态方法之中，这时super将指向父类，而不是父类的原型对象。
class Parent {
    static myMethod(msg) {
        console.log('static', msg);
    }
    myMethod(msg) {
        console.log('instance', msg);
    }
}
class Child extends Parent {
    static myMethod(msg) {
        super.myMethod(msg);
    }
    myMethod(msg) {
        super.myMethod(msg);
    }
}
Child.myMethod(1); // static 1
var child = new Child();
child.myMethod(2); // instance 2
上面代码中，super在静态方法之中指向父类，在普通方法之中指向父类的原型对象。
```

```
this指向：在子类的静态方法中通过super调用父类的方法时，方法内部的this指向当前的子类，而不是子类的实例。
class A {
    constructor() {
        this.x = 1;
    }
    static print() {
        console.log(this.x);
    }
}
class B extends A {
    constructor() {
        super();
        this.x = 2;
    }
    static m() {
        super.print();
    }
}
B.x = 3;
B.m() // 3
```

```
**注意：**
使用super的时候，必须显式指定是作为函数、还是作为对象使用，否则会报错。也就是说super不能单独使用
class A { }
class B extends A {
    constructor() {
        super();
        console.log(super); // 报错
    }
}
上面代码中，console.log(super)当中的super，无法看出是作为函数使用，还是作为对象使用，所以 JavaScript 引擎解析代码的时候就会报错。这时，如果能清晰地表明super的数据类型，就不会报错。
```

```
class A { }
class B extends A {
    constructor() {
        super();
        console.log(super.valueOf() instanceof B); // true
    }
}
let b = new B();
上面代码中，super.valueOf()表明super是一个对象，因此就不会报错。
同时，由于super使得this指向B的实例，所以super.valueOf()返回的是一个B的实例。
```

```
最后，由于对象总是继承其他对象的，所以可以在任意一个对象中，使用super关键字。
var obj = {  toString() {    return "MyObject: " + super.toString();  }};
obj.toString(); // MyObject: [object Object]
```

:::
