---
title: "ES6继承"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "对象、数组与函数"
description: "继承 继承是 OO 语言中的一个最为人津津乐道的概念。 许多 OO 语言都支持两种继承方式：接口继承和实现继承。 接口继承只继承方法签名，而实现继承则继承实际的方法。 由于函数没有签名，在 中无法实现接口继承，而只支持实现继承，而其实现继承主要是依靠原型链来实现的。 将继承部分封。"
sidebarWeight: 181
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/面向对象程序设计/ES6继承.md"
---
::: v-pre

# ES6继承

> 本节目标：理解“ES6继承”的核心思路，并能把它用于实际开发或面试表达。

> 说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。
**继承**
继承是`OO`语言中的一个最为人津津乐道的概念。

许多`OO`语言都支持两种继承方式：接口继承和实现继承。
接口继承只继承方法签名，而实现继承则继承实际的方法。

由于函数没有签名，在

```
ECMAScript
```

中无法实现接口继承，而只支持实现继承，而其实现继承主要是依靠原型链来实现的。

**将继承部分封装成函数**

```
function extend(Child, Parent) {
  var F = function () {};
```
 // constructor也指向了Parent

```
  F.prototype = Parent.prototype;
  // constructor
```

通过`__proto__`打到

```
Parent
  Child.prototype = new F();
  Child.prototype.constructor = Child;
  Child.uber = Parent.prototype;
}
```

思考：原型指向构造函数的原型与原型指向构造函数实例的区别；

- 无法区分子类和父类，因为constructor为同个；
- 此外，我们可以修改子类的原型对象，即添加属性，只会屏蔽父类同名属性而不会修改；

通过应用上面的函数，我们即可使代码保持简洁，又能将其重用在构建继承关系的任务中。这种方式让我们能通过以下简单的调用来实现继承。

```
extend(TwoDShape, Shape);
//
```

以及

```
extend(Triangle, TwoDShape);
//
```

完整的例子

```
//inheritance helper
function extend(Child, Parent) {
  var F = function () {};
  F.prototype = Parent.prototype;
  Child.prototype = new F();
  Child.prototype.constructor = Child;
  Child.uber = Parent.prototype;
}
//define->augment
function Shape() {}
Shape.prototype.name = "Shape";
Shape.prototype.toString = function () {
  return this.constructor.uber
    ? this.constructor.uber.toString() + "," + this.name
    : this.name;
};
//define->inherit->augment
function TwoDShape() {}
extend(TwoDShape, Shape);
TwoDShape.prototype.name = "2D shape";
//define
function Triangle(side, height) {
  this.side = side;
  this.height = height;
}
//inherit
extend(Triangle, TwoDShape);
//augment
Triangle.prototype.name = "Triangle";
Triangle.prototype.getArea = function () {
  return (this.side * this.height) / 2;
};
//
```

测试

```
console.log(new Triangle().toString());
```

**属性拷贝**
在构建可重用的继承代码时，我们也可以简单地将父对象的属性拷贝给子对象。我们创建一个`extend2()`函数，该函数也接受两个构造器函数为参数，并将`Parent`的原型的所有属性全部拷贝给`Child`的原型，其中包括方法，因为方法本身也是一种函数类型的属性。

```
function extend2(Child,Parent){
var p = Parent.prototype;
var c = Child.prototype;
for(var i in p){
c[i] = p[i];
}
c.uber = p;
}
```
 与之前的方法相比，这个方法在效率上略逊一筹。因为这里执行的是子对象原型的逐一拷贝，而非简单的原型链查询。所以我们必须要记住，这种方式仅适用于只包含基本数据类型的对象，所有的对象类型（包括函数和数组）都是不可复制，因为它们只支持引用传递。
具体示例，以下有两个构造器函数`Shape()`和`TwoDShape()`。其中，`Shape()`的原型中包含了一个基类型属性`name`，和一个非基本类型属性–`toString()`方法。

```
var Shape = function(){};
var TwoDShape = function(){};
Shape.prototype.name = 'shape';
Shape.prototype.toString = function(){
return this.uber?this.uber.toString()+','+this.name:this.name;
};
//
```

如果我们通过`extend()`方法来实现继承，那么`name`属性即不会是`TwoDShape()`实例的属性，也不会成为其原型对象的属性，但是子对象依然可以通过继承方式来访问该属性。

```
> extend(TwoDShape,Shape);
> var td = new TwoDShape();
> td.name;//'shape'
> TwoDShape.prototype.name;//'shape'
> td.__proto__.name;//'shape'
> td.hasOwnProperty('name');//false
> td.__proto__.hasOwnProperty('name');//false
//
```

而如果继承是通过`extend2()`方法来实现的，`TwoDShape()`的原型中就会拷贝获得属于自己的`name`属性。同样的，其中也会拷贝属于自己的`toString()`方法，但这只是一个函数引用，函数本身并没有被再次创建。

```
>extend2(TwoDShape,Shape);
>var td = new TwoDShape();
>td.__proto__.hasOwnProperty('name');//true
>td.__proto__.hasOwnProperty('toString');//true
>td.__proto__.toString === Shape.prototype.toString;//true
//
```

对于只包含基本数据类型的对象来说，未必真的就如此糟糕。而且，这样做还能使属性查找操作更多地停留在对象本身，从而可减少原型链接上的查找。
现在，让我们再来回顾一下定义`uber`属性的整个过程。这一次的做法有别于之前的通过`Parent`构造器赋值，这里我们是将`Parent`的`prototype`属性赋值给了变量`p`，再通过`p`来完成`uber`赋值的，之所以要故意做出这种差异化实现只是为了说明，您可以根据自己的需要来使用您自己认为合适的继承模式。例如

```
>td.toString();//Shaper,Shape
//TwoDShape
```

并没有重新定义`name`属性，所以这里打印了两个`Shape`。您可以在任何时候重新定义`name`属性，然后所有实例都会立即“看见”`name`属性的更新。

```
>TwoDShape.prototype.name = '2D shape';
>td.toString();//Shape,2D shape
```
 **请小心处理引用拷贝**

`//`创建两个构造函数，并在第一个构造器的原型中添加一些属性

```
function Papa(){};
function Wee(){};
Papa.prototype.name = 'Bear';
Papa.prototype.owns = ['porridge','chair','bed'];
//
```

现在，我们让`Wee`继承`Papa`（通过`extend()`或`extend2()`来实现）

```
extend2(Wee,Papa);
//Wee
```

的原型继承了`Papa`的原型属性，并将其变成了自身属性。

```
>Wee.prototype.hasOwnProperty('name');//true
>Wee.prototype.hasOwnProperty('owns');//true
//
```

其中，`name`属于基本类型属性，创建的是一份全新的拷贝。而`own`属性是一个数组对象，它所执行的是引用拷贝：

```
>Wee.prototype.owns;//['porridge','chair','bed'];
>Wee.prototype.owns === Papa.prototype.owns;//true
//
```

如果改变`Wee`的`owns`属性，`Papa`就会受到影响，因为这两个属性在内存中引用的是同一个数组：

```
>Wee.prototype.owns.pop();//'bed'
>Papa.prototype.owns;//['porridge','chair']
```
 **内存中对象的储存情况**
内存中所存储的对象通常会整齐排列，看上去就像一面用砖头堆起来的墙。而我们的变量帽是一些指向这些对象的指针。该图中展示了以下几种情况。
》创建一个新对象，并且让变量`A`指向该对象。
》创建一个新对象`B`，并设置其与`A`相等。也就是说，现在`B`和`A`指向了同一个对象，也就是内存中的同一个位置。
》修改变量`B`所指对象的`color`属性，将它设置为’`white`’。如果我们检查`A.color ===` ‘`white`’，就会得到`true`。
》再创建一个新对象，然后变量`B`指向这个新对象。这样一来，由于`A`和`B`指向了内存中的不同位置，所以它们之间已经完全没有联系，对它们之中任何一个所做的更改不会影响另一个。

**【对象之间的继承】**

**【原型继承与属性拷贝的混合应用】**
对于继承来说，主要目标就是将一些现有的功能归为己有。也就是说，我们在新建一个对象的时，通常首先应该继承于现在对象，然后再为其添加额外的方法与属性。对此，我们可以通过一个函数调用来完成，并且在其中混合使用我们刚才所讨论的两种方式。
具体而言就是：
》使用原型继承方式，将一个已有对象设置为新对象的原型。
》新建一个对象后，将另一个已有对象的所有属性拷贝过来。

```
function objectPlus(o,stuff){
var n;
function F(){}
F.prototype = o;
n = new F();
n.uber = o;
for(var i in stuff){
n[i] = stuff[i];
}
return n;
}
//
```

实际应用
`//`首先，需要一个基本对象

```
shape:
var shape = {
name:'shape',
toString:function(){
return this.name;
}
}
//
```

接着再创建一个继承于`shape`的`2D`对象，并为其添加更多的属性。这些额外的属性由一个用文本标识法所创建的匿名对象提供。

```
var twoDee = objectPlus(shape, {
name: '2D shape', toString: function () {
return this.uber.toString() + ',' + this.name;
}
});
//
```

现在，我们来创建一个继承于`2D`对象的`triangle`对象，并为其添加一些额外的属性。

```
var triangle = objectPlus(twoDee,{
name:'Triangle',getArea:function(){
return this.side*this.height/2;
},
side:0,
height:0
});
//
```

下面我们测试一下：创建一个具体的`triangle`对象`my`，并自定义其`side`和`height`属性。

```
>var my = objectPlus(triangle,{
side:4,height:4
});
>my.getArea();//8
>my.toString();//'shape,2D shape,Triangle,Triangle'
```
 这里的`objectPlus()`函数的实现方式比起之前提到的`object()`更接近`ES5`的`Object.create()`。只是`ES5`的实现中，附加属性（出就是第二个参数）是通过属性描述符提供的（见附录`C`：内建对象）。

**【多重继承】**
所谓多重继承，通常指的是一个子对象中有不止一个父对象的继承模式。对于这种继承模式，有的面向对象程序支持，有些则不支持。我们可以对它们进行一些甄别，自行判断在复杂的应用程序设计中多重继承是否带来便利，或者是否有必要使用它，以及它是否会比原型链的方式更好。
对于`JavaScript`这样的动态语言来说，实现多重继承是很简单的，尽管语言本身没有为此提供特殊的语法单元。
多重继承实现是极其简单的，我们只需要延续属性拷贝法的继承思路依次扩展对象即可，而对参数中所继承的对象的数量没有限制。
下面，我们来创建一个`multi()`函数，它可以接受任意数量的输入性对象。然后，我们在其中实现一个双重循环，内层循环用于拷贝属性，而外层循环则用于遍历函数参数中所传递进来的所有对象。

```
function multi(){
var n = {};
var staff;
for (var j = 0;j < arguments.length;j++){
stuff = arguments[j];
for (var i in stuff){
if(stuff hasOwnProperty(i)){
n[i] = stuff[i];
}
}
return n;
}
}
//
```

现在来测试一下：首先，我们需要创建`shape,twoDee`以及一个那匿名对象。然后调用`multi()`陈洁灵，将这三个对象作为参数传递，该函数会返回新建的`triangle`对象。

```
var shape = {
name:'shape',
toString:function(){
return this.name;
}
};
var twoDee = {
name:'2D shape',
dimensions:2,
};
var triangle = multi(shape,twoDee,{
name:'Triangle',
getArea:function(){
return this.side*this.height/2;
},
side:5,
height:10
});
//
```

然后，让我们来看看它是否可以工作。`getArea()`方法应该是独有的属性，`dimensions`则应该是自`twoDee`而来的继承属性，`toString()`则是从`shape`继承而来的：

```
>triangle.getArea();//25
>triangle.dimensions;//2
>triangle.toString();//'Triangle'
//
```

要注意的是，`multi()`中的循环是按照对象的输入顺序来进行遍历的。如果其中两个对象拥有相同的属性，前一个就会被后一个覆盖。
**混合插入**
在这里，我们需要了解一种叫做混合插入`(mixins)`的技术。我们可以将其看做一种为对象提供某此实用功能的技术，只不过，它并不是通过子对象的继承与扩展来完成的。我们之前所讨论的多重继承实际上正是基于这种技术理念来实现的。也就是说，每当我们新建一个对象时，可以选择将其他对象的内容混合到我们新的对象中去，只要将它们全部传递给`multi()`函数，我们就可以在不建立相关继承关系对的情况下获得这些对象的功能。

**【寄生式继承】**
这是由`Douglas Crockford`所提出的技术，基本思路是，我们可以在创建对象的函数中直接吸收其它对象的功能，然后对其进行扩展并返回。就好像所有的工作都是自己做的一样。

```
var twoDee = {
name:'2D shape',
dimensions:2
};
//
```

然后我们来编写用于创建`triangle`对象的函数。
`//`将`twoD`对象克隆进一来叫做`that`的对象，这一步可以使用我们之前所讨论过的任何方法，例如使用`object()`函数或者执行全属性拷贝。
`//`扩展`that`对象
`//`返回`that`对象

```
function triangle(s,h){
var that = object(twoD);
that.name = 'Triangle';
that.getArea = function(){
return this.side*this.height/2;
};
that.side = s;
that.height = h;
return that;
}
//
```

由于`triangle()`只是个一般函数，不属于构造器，所以调用它通常是不需要`new`操作符的。但由于该函数返回的是一个对象，所以即便我们在函数调用时错误地使用了`new`操作符，它也会按照预定的方式工作。

```
>var t = triangle(5,10);
>t.dimensions;//2
>var t2 = new triangle(5,5);
>t2.getArea();//12.5
//
```

注意，这里的`that`只是一个名字，并不存在与保留字`this`用法类似的特殊含义。

**【构造器借用】**
由于这种继承模式中，子对象构造器可以通过`call()`或`apply()`方法来调用父对象的构造器，因而，它通常被称为构造器盗用法`(stealing a constructor)`或者构造器借用法`(borrowing a constructor)`如果您想更含蓄一点的话。
`call()`和`apply()`这两个方法允许我们将某个指定对象`this`值与一个函数的调用绑定起来。这对于继承而言，就意味着子对象的构造器在调用父对象构造器时，也可以将子对象中新建的`this`对象与父对的`this`值绑定起来。

`//`下面，我们来构建一个父类构造器

```
`Shape()`:
function Shape(id){
this.id = id;
}
Shape.prototype.name = 'shape';
Shape.prototype.toString = function(){
return this.name;
}
//
```

现在我们来定义`Triangle()`构造器，在其中通过`apply()`方法来调用`Shape()`构造器，并将相关的`this`值（即`new Triangle()`所创建的实例）和其它一些参数传递给该方法。

```
function Triangle(){
Shape.apply(this,arguments);
}
Triangle.prototype.name = 'Triangle';
//
```

注意，这里无论是`Triangle()`还是`Shape()`者是在其各自的原型中添加些额外的属性。
`//`下面，我们来测试一下，先新建一个`Triangel`对象：

```
>var t =new Triangle(101);
>t.name;//'Triangel'
//
```

在这里，新的`Triangle`对象继承了其父对象的`id`属性，但它并没有继承父对象原型中的其它任何东西

```
>t.id;//101
>t.toString();//"[object Object]"
//
```

之所以`Triangel`对象中不包含`Shape`的原型属性，是因为我们从来没有调用`new Shape()`创建任何一个实例，自然其原型也从来没有被用到。这很容易做到，例如在本章初的那个示例中，我们可以地`Triangle()`构造器进行如下重定义：

```
function Triangel(){
Shape.apple(this,arguments);
}
Triangle.prototype = new Shape();
Triangle.prototype.name = 'Triangle';
```
 在这种继承模式中，父对象的属性是以子对象自身属性的身份来重建的。这也体现了构造器借用法的一大优势：当我们创建一个继承于数组或者其它对象类型的子对象时，将获得一个完完全全的新值（不是一个引用），对它做的任何修改都不会影响其父对象。
但这种模式也是有缺点的，因为这种情况下父对象的构造器往往会被调用两次：一次发生在通过`apply()`方法继承其自身属性时，而另一次则发生在通过`new`操作符继承其原型时。这样一来，父对象自身的属性事实上被继承了两次，下面我们来做一个简单的演示：

```
function Shape(id){
this.id = id;
}
function Triangle(){
Shape.apply(this,arguments);
}
Triangle.prototype = new Shape(101);
//
```

然后我们新建一个实例：

```
>var t = new Triangle(202);
>t.id;//202
//
```

如您所见，对象中有一个自身的属性`id`，但它并非来自原型链中，我们可以执行如下验证：

```
>t.__proto__.id;//101
>delete t.id;//true
>t.id;//101
```

`delete` 操作符会从某个对象上移除指定属性。成功删除的时候回返回

```
 true
```

，否则返回

```
 false
```

。但是，以下情况需要重点考虑：
如果你试图删除的属性不存在，那么`delete`将不会起任何作用，但仍会返回`true`
如果对象的原型链上有一个与待删除属性同名的属性，那么删除属性之后，对象会使用原型链上的那个属性（也就是说，`delete`操作只会在自身的属性上起作用）
任何使用

```
 var
```

声明的属性不能从全局作用域或函数的作用域中删除。
这样的话，`delete`操作不能删除任何在全局作用域中的函数（无论这个函数是来自于函数声明或函数表达式）
除了在全局作用域中的函数不能被删除，在对象`(object)`中的函数是能够用`delete`操作删除的。
任何用`let`或`const`声明的属性不能够从它被声明的作用域中删除。
不可设置的`(Non-configurable)`属性不能被移除。这意味着像

```
Math, Array, Object
```

内置对象的属性以及使用

```
Object.defineProperty()
```

方法设置为不可设置的属性不能被删除。
参考：

```
https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/delete
```
 **借用构造器与原型复制**
对于这种构造器的双重调用带来的重复执行问题，实际 上是很容易更正的。我们可以在父对象构造器上调用`apply()`方法，以获得其全部的自身属性，然后再用一个简单迭代器对其原型属性执行逐项拷贝（这也可以使用之前讨论`extend2()`方法来完成）。例如：

```
function Shape(id){
this.id = id;
}
Shape.prototype.name = 'Shape';
Shape.prototype.toString = function(){
return this.name;
};
function Triangle(){
Shape.apply(this,arguments);
}
extend2(Triangle,Shape);
Triangle.prototype.name = 'Triangle';
//
```

下面测试一下：

```
>var t = new Triangle(101);
>t.toString();//'Triangle'
>t.id;//101
//
```

这样一来，双重继承就不见了：

```
>type of t.__proto__.id;//'undefinded'
//
```

如果有必要的话，`extend2()`还可以访问对象的`uber`属性：

```
>t.uber.name;//'Shape'
```

**【总结】**

面对这么多方法，我们应该如何做出正确的选择呢？事实上取决于我们的设计风格、性能需求、具体项目任务及团队。例如，您是否更习惯于从类的角度来解决问题？那么基于构造器工作模式更适合您。或者您可能只关心该”类“的某些具体实例，那么可能使用基于对象的模式更合适。
那么，继承实现是否只有这些呢？当然不是，我们可以从上面的表中选择任何一种模式，也可以混合使用它们，甚至我们也可以写出我们自己的方法。重点在于必须理解并熟悉这些对象、原型以及构造器的工作方式，剩下的就简单了。
 \> 来自

```
 <https://maxiang.io/client_zh.html>
```

:::
