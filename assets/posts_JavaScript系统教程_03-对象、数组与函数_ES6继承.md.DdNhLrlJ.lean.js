import{_ as a,o as e,c as p,j as n,a as l}from"./chunks/framework.DJo0M80U.js";const g=JSON.parse('{"title":"ES6继承","description":"继承 继承是 OO 语言中的一个最为人津津乐道的概念。 许多 OO 语言都支持两种继承方式：接口继承和实现继承。 接口继承只继承方法签名，而实现继承则继承实际的方法。 由于函数没有签名，在 中无法实现接口继承，而只支持实现继承，而其实现继承主要是依靠原型链来实现的。 将继承部分封。","frontmatter":{"title":"ES6继承","date":"2026-08-11T00:00:00.000Z","categories":["JavaScript 系统教程"],"tags":["JavaScript","前端","教程","OneNote","对象、数组与函数"],"description":"继承 继承是 OO 语言中的一个最为人津津乐道的概念。 许多 OO 语言都支持两种继承方式：接口继承和实现继承。 接口继承只继承方法签名，而实现继承则继承实际的方法。 由于函数没有签名，在 中无法实现接口继承，而只支持实现继承，而其实现继承主要是依靠原型链来实现的。 将继承部分封。","sidebarWeight":181,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/b-原生js/面向对象程序设计/ES6继承.md"},"headers":[],"relativePath":"posts/JavaScript系统教程/03-对象、数组与函数/ES6继承.md","filePath":"posts/JavaScript系统教程/03-对象、数组与函数/ES6继承.md"}'),i={name:"posts/JavaScript系统教程/03-对象、数组与函数/ES6继承.md"};function t(c,s,u,o,d,h){return e(),p("div",null,[...s[0]||(s[0]=[n("div",null,[n("h1",{id:"es6继承",tabindex:"-1"},[l("ES6继承 "),n("a",{class:"header-anchor",href:"#es6继承","aria-label":'Permalink to "ES6继承"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“ES6继承”的核心思路，并能把它用于实际开发或面试表达。")]),n("blockquote",null,[n("p",null,[l("说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。 "),n("strong",null,"继承"),l(" 继承是"),n("code",null,"OO"),l("语言中的一个最为人津津乐道的概念。")])]),n("p",null,[l("许多"),n("code",null,"OO"),l("语言都支持两种继承方式：接口继承和实现继承。 接口继承只继承方法签名，而实现继承则继承实际的方法。")]),n("p",null,"由于函数没有签名，在"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"ECMAScript")])])])]),n("p",null,"中无法实现接口继承，而只支持实现继承，而其实现继承主要是依靠原型链来实现的。"),n("p",null,[n("strong",null,"将继承部分封装成函数")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"function extend(Child, Parent) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  var F = function () {};")])])])]),n("p",null,"// constructor也指向了Parent"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  F.prototype = Parent.prototype;")]),l(`
`),n("span",{class:"line"},[n("span",null,"  // constructor")])])])]),n("p",null,[l("通过"),n("code",null,"__proto__"),l("打到")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"Parent")]),l(`
`),n("span",{class:"line"},[n("span",null,"  Child.prototype = new F();")]),l(`
`),n("span",{class:"line"},[n("span",null,"  Child.prototype.constructor = Child;")]),l(`
`),n("span",{class:"line"},[n("span",null,"  Child.uber = Parent.prototype;")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("p",null,"思考：原型指向构造函数的原型与原型指向构造函数实例的区别；"),n("ul",null,[n("li",null,"无法区分子类和父类，因为constructor为同个；"),n("li",null,"此外，我们可以修改子类的原型对象，即添加属性，只会屏蔽父类同名属性而不会修改；")]),n("p",null,"通过应用上面的函数，我们即可使代码保持简洁，又能将其重用在构建继承关系的任务中。这种方式让我们能通过以下简单的调用来实现继承。"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"extend(TwoDShape, Shape);")]),l(`
`),n("span",{class:"line"},[n("span",null,"//")])])])]),n("p",null,"以及"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"extend(Triangle, TwoDShape);")]),l(`
`),n("span",{class:"line"},[n("span",null,"//")])])])]),n("p",null,"完整的例子"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"//inheritance helper")]),l(`
`),n("span",{class:"line"},[n("span",null,"function extend(Child, Parent) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  var F = function () {};")]),l(`
`),n("span",{class:"line"},[n("span",null,"  F.prototype = Parent.prototype;")]),l(`
`),n("span",{class:"line"},[n("span",null,"  Child.prototype = new F();")]),l(`
`),n("span",{class:"line"},[n("span",null,"  Child.prototype.constructor = Child;")]),l(`
`),n("span",{class:"line"},[n("span",null,"  Child.uber = Parent.prototype;")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"//define->augment")]),l(`
`),n("span",{class:"line"},[n("span",null,"function Shape() {}")]),l(`
`),n("span",{class:"line"},[n("span",null,'Shape.prototype.name = "Shape";')]),l(`
`),n("span",{class:"line"},[n("span",null,"Shape.prototype.toString = function () {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  return this.constructor.uber")]),l(`
`),n("span",{class:"line"},[n("span",null,'    ? this.constructor.uber.toString() + "," + this.name')]),l(`
`),n("span",{class:"line"},[n("span",null,"    : this.name;")]),l(`
`),n("span",{class:"line"},[n("span",null,"};")]),l(`
`),n("span",{class:"line"},[n("span",null,"//define->inherit->augment")]),l(`
`),n("span",{class:"line"},[n("span",null,"function TwoDShape() {}")]),l(`
`),n("span",{class:"line"},[n("span",null,"extend(TwoDShape, Shape);")]),l(`
`),n("span",{class:"line"},[n("span",null,'TwoDShape.prototype.name = "2D shape";')]),l(`
`),n("span",{class:"line"},[n("span",null,"//define")]),l(`
`),n("span",{class:"line"},[n("span",null,"function Triangle(side, height) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  this.side = side;")]),l(`
`),n("span",{class:"line"},[n("span",null,"  this.height = height;")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"//inherit")]),l(`
`),n("span",{class:"line"},[n("span",null,"extend(Triangle, TwoDShape);")]),l(`
`),n("span",{class:"line"},[n("span",null,"//augment")]),l(`
`),n("span",{class:"line"},[n("span",null,'Triangle.prototype.name = "Triangle";')]),l(`
`),n("span",{class:"line"},[n("span",null,"Triangle.prototype.getArea = function () {")]),l(`
`),n("span",{class:"line"},[n("span",null,"  return (this.side * this.height) / 2;")]),l(`
`),n("span",{class:"line"},[n("span",null,"};")]),l(`
`),n("span",{class:"line"},[n("span",null,"//")])])])]),n("p",null,"测试"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"console.log(new Triangle().toString());")])])])]),n("p",null,[n("strong",null,"属性拷贝"),l(" 在构建可重用的继承代码时，我们也可以简单地将父对象的属性拷贝给子对象。我们创建一个"),n("code",null,"extend2()"),l("函数，该函数也接受两个构造器函数为参数，并将"),n("code",null,"Parent"),l("的原型的所有属性全部拷贝给"),n("code",null,"Child"),l("的原型，其中包括方法，因为方法本身也是一种函数类型的属性。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"function extend2(Child,Parent){")]),l(`
`),n("span",{class:"line"},[n("span",null,"var p = Parent.prototype;")]),l(`
`),n("span",{class:"line"},[n("span",null,"var c = Child.prototype;")]),l(`
`),n("span",{class:"line"},[n("span",null,"for(var i in p){")]),l(`
`),n("span",{class:"line"},[n("span",null,"c[i] = p[i];")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"c.uber = p;")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("p",null,[l("与之前的方法相比，这个方法在效率上略逊一筹。因为这里执行的是子对象原型的逐一拷贝，而非简单的原型链查询。所以我们必须要记住，这种方式仅适用于只包含基本数据类型的对象，所有的对象类型（包括函数和数组）都是不可复制，因为它们只支持引用传递。 具体示例，以下有两个构造器函数"),n("code",null,"Shape()"),l("和"),n("code",null,"TwoDShape()"),l("。其中，"),n("code",null,"Shape()"),l("的原型中包含了一个基类型属性"),n("code",null,"name"),l("，和一个非基本类型属性–"),n("code",null,"toString()"),l("方法。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"var Shape = function(){};")]),l(`
`),n("span",{class:"line"},[n("span",null,"var TwoDShape = function(){};")]),l(`
`),n("span",{class:"line"},[n("span",null,"Shape.prototype.name = 'shape';")]),l(`
`),n("span",{class:"line"},[n("span",null,"Shape.prototype.toString = function(){")]),l(`
`),n("span",{class:"line"},[n("span",null,"return this.uber?this.uber.toString()+','+this.name:this.name;")]),l(`
`),n("span",{class:"line"},[n("span",null,"};")]),l(`
`),n("span",{class:"line"},[n("span",null,"//")])])])]),n("p",null,[l("如果我们通过"),n("code",null,"extend()"),l("方法来实现继承，那么"),n("code",null,"name"),l("属性即不会是"),n("code",null,"TwoDShape()"),l("实例的属性，也不会成为其原型对象的属性，但是子对象依然可以通过继承方式来访问该属性。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"> extend(TwoDShape,Shape);")]),l(`
`),n("span",{class:"line"},[n("span",null,"> var td = new TwoDShape();")]),l(`
`),n("span",{class:"line"},[n("span",null,"> td.name;//'shape'")]),l(`
`),n("span",{class:"line"},[n("span",null,"> TwoDShape.prototype.name;//'shape'")]),l(`
`),n("span",{class:"line"},[n("span",null,"> td.__proto__.name;//'shape'")]),l(`
`),n("span",{class:"line"},[n("span",null,"> td.hasOwnProperty('name');//false")]),l(`
`),n("span",{class:"line"},[n("span",null,"> td.__proto__.hasOwnProperty('name');//false")]),l(`
`),n("span",{class:"line"},[n("span",null,"//")])])])]),n("p",null,[l("而如果继承是通过"),n("code",null,"extend2()"),l("方法来实现的，"),n("code",null,"TwoDShape()"),l("的原型中就会拷贝获得属于自己的"),n("code",null,"name"),l("属性。同样的，其中也会拷贝属于自己的"),n("code",null,"toString()"),l("方法，但这只是一个函数引用，函数本身并没有被再次创建。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,">extend2(TwoDShape,Shape);")]),l(`
`),n("span",{class:"line"},[n("span",null,">var td = new TwoDShape();")]),l(`
`),n("span",{class:"line"},[n("span",null,">td.__proto__.hasOwnProperty('name');//true")]),l(`
`),n("span",{class:"line"},[n("span",null,">td.__proto__.hasOwnProperty('toString');//true")]),l(`
`),n("span",{class:"line"},[n("span",null,">td.__proto__.toString === Shape.prototype.toString;//true")]),l(`
`),n("span",{class:"line"},[n("span",null,"//")])])])]),n("p",null,[l("对于只包含基本数据类型的对象来说，未必真的就如此糟糕。而且，这样做还能使属性查找操作更多地停留在对象本身，从而可减少原型链接上的查找。 现在，让我们再来回顾一下定义"),n("code",null,"uber"),l("属性的整个过程。这一次的做法有别于之前的通过"),n("code",null,"Parent"),l("构造器赋值，这里我们是将"),n("code",null,"Parent"),l("的"),n("code",null,"prototype"),l("属性赋值给了变量"),n("code",null,"p"),l("，再通过"),n("code",null,"p"),l("来完成"),n("code",null,"uber"),l("赋值的，之所以要故意做出这种差异化实现只是为了说明，您可以根据自己的需要来使用您自己认为合适的继承模式。例如")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,">td.toString();//Shaper,Shape")]),l(`
`),n("span",{class:"line"},[n("span",null,"//TwoDShape")])])])]),n("p",null,[l("并没有重新定义"),n("code",null,"name"),l("属性，所以这里打印了两个"),n("code",null,"Shape"),l("。您可以在任何时候重新定义"),n("code",null,"name"),l("属性，然后所有实例都会立即“看见”"),n("code",null,"name"),l("属性的更新。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,">TwoDShape.prototype.name = '2D shape';")]),l(`
`),n("span",{class:"line"},[n("span",null,">td.toString();//Shape,2D shape")])])])]),n("p",null,[n("strong",null,"请小心处理引用拷贝")]),n("p",null,[n("code",null,"//"),l("创建两个构造函数，并在第一个构造器的原型中添加一些属性")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"function Papa(){};")]),l(`
`),n("span",{class:"line"},[n("span",null,"function Wee(){};")]),l(`
`),n("span",{class:"line"},[n("span",null,"Papa.prototype.name = 'Bear';")]),l(`
`),n("span",{class:"line"},[n("span",null,"Papa.prototype.owns = ['porridge','chair','bed'];")]),l(`
`),n("span",{class:"line"},[n("span",null,"//")])])])]),n("p",null,[l("现在，我们让"),n("code",null,"Wee"),l("继承"),n("code",null,"Papa"),l("（通过"),n("code",null,"extend()"),l("或"),n("code",null,"extend2()"),l("来实现）")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"extend2(Wee,Papa);")]),l(`
`),n("span",{class:"line"},[n("span",null,"//Wee")])])])]),n("p",null,[l("的原型继承了"),n("code",null,"Papa"),l("的原型属性，并将其变成了自身属性。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,">Wee.prototype.hasOwnProperty('name');//true")]),l(`
`),n("span",{class:"line"},[n("span",null,">Wee.prototype.hasOwnProperty('owns');//true")]),l(`
`),n("span",{class:"line"},[n("span",null,"//")])])])]),n("p",null,[l("其中，"),n("code",null,"name"),l("属于基本类型属性，创建的是一份全新的拷贝。而"),n("code",null,"own"),l("属性是一个数组对象，它所执行的是引用拷贝：")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,">Wee.prototype.owns;//['porridge','chair','bed'];")]),l(`
`),n("span",{class:"line"},[n("span",null,">Wee.prototype.owns === Papa.prototype.owns;//true")]),l(`
`),n("span",{class:"line"},[n("span",null,"//")])])])]),n("p",null,[l("如果改变"),n("code",null,"Wee"),l("的"),n("code",null,"owns"),l("属性，"),n("code",null,"Papa"),l("就会受到影响，因为这两个属性在内存中引用的是同一个数组：")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,">Wee.prototype.owns.pop();//'bed'")]),l(`
`),n("span",{class:"line"},[n("span",null,">Papa.prototype.owns;//['porridge','chair']")])])])]),n("p",null,[n("strong",null,"内存中对象的储存情况"),l(" 内存中所存储的对象通常会整齐排列，看上去就像一面用砖头堆起来的墙。而我们的变量帽是一些指向这些对象的指针。该图中展示了以下几种情况。 》创建一个新对象，并且让变量"),n("code",null,"A"),l("指向该对象。 》创建一个新对象"),n("code",null,"B"),l("，并设置其与"),n("code",null,"A"),l("相等。也就是说，现在"),n("code",null,"B"),l("和"),n("code",null,"A"),l("指向了同一个对象，也就是内存中的同一个位置。 》修改变量"),n("code",null,"B"),l("所指对象的"),n("code",null,"color"),l("属性，将它设置为’"),n("code",null,"white"),l("’。如果我们检查"),n("code",null,"A.color ==="),l(" ‘"),n("code",null,"white"),l("’，就会得到"),n("code",null,"true"),l("。 》再创建一个新对象，然后变量"),n("code",null,"B"),l("指向这个新对象。这样一来，由于"),n("code",null,"A"),l("和"),n("code",null,"B"),l("指向了内存中的不同位置，所以它们之间已经完全没有联系，对它们之中任何一个所做的更改不会影响另一个。")]),n("p",null,[n("strong",null,"【对象之间的继承】")]),n("p",null,[n("strong",null,"【原型继承与属性拷贝的混合应用】"),l(" 对于继承来说，主要目标就是将一些现有的功能归为己有。也就是说，我们在新建一个对象的时，通常首先应该继承于现在对象，然后再为其添加额外的方法与属性。对此，我们可以通过一个函数调用来完成，并且在其中混合使用我们刚才所讨论的两种方式。 具体而言就是： 》使用原型继承方式，将一个已有对象设置为新对象的原型。 》新建一个对象后，将另一个已有对象的所有属性拷贝过来。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"function objectPlus(o,stuff){")]),l(`
`),n("span",{class:"line"},[n("span",null,"var n;")]),l(`
`),n("span",{class:"line"},[n("span",null,"function F(){}")]),l(`
`),n("span",{class:"line"},[n("span",null,"F.prototype = o;")]),l(`
`),n("span",{class:"line"},[n("span",null,"n = new F();")]),l(`
`),n("span",{class:"line"},[n("span",null,"n.uber = o;")]),l(`
`),n("span",{class:"line"},[n("span",null,"for(var i in stuff){")]),l(`
`),n("span",{class:"line"},[n("span",null,"n[i] = stuff[i];")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"return n;")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"//")])])])]),n("p",null,[l("实际应用 "),n("code",null,"//"),l("首先，需要一个基本对象")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"shape:")]),l(`
`),n("span",{class:"line"},[n("span",null,"var shape = {")]),l(`
`),n("span",{class:"line"},[n("span",null,"name:'shape',")]),l(`
`),n("span",{class:"line"},[n("span",null,"toString:function(){")]),l(`
`),n("span",{class:"line"},[n("span",null,"return this.name;")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"//")])])])]),n("p",null,[l("接着再创建一个继承于"),n("code",null,"shape"),l("的"),n("code",null,"2D"),l("对象，并为其添加更多的属性。这些额外的属性由一个用文本标识法所创建的匿名对象提供。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"var twoDee = objectPlus(shape, {")]),l(`
`),n("span",{class:"line"},[n("span",null,"name: '2D shape', toString: function () {")]),l(`
`),n("span",{class:"line"},[n("span",null,"return this.uber.toString() + ',' + this.name;")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"});")]),l(`
`),n("span",{class:"line"},[n("span",null,"//")])])])]),n("p",null,[l("现在，我们来创建一个继承于"),n("code",null,"2D"),l("对象的"),n("code",null,"triangle"),l("对象，并为其添加一些额外的属性。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"var triangle = objectPlus(twoDee,{")]),l(`
`),n("span",{class:"line"},[n("span",null,"name:'Triangle',getArea:function(){")]),l(`
`),n("span",{class:"line"},[n("span",null,"return this.side*this.height/2;")]),l(`
`),n("span",{class:"line"},[n("span",null,"},")]),l(`
`),n("span",{class:"line"},[n("span",null,"side:0,")]),l(`
`),n("span",{class:"line"},[n("span",null,"height:0")]),l(`
`),n("span",{class:"line"},[n("span",null,"});")]),l(`
`),n("span",{class:"line"},[n("span",null,"//")])])])]),n("p",null,[l("下面我们测试一下：创建一个具体的"),n("code",null,"triangle"),l("对象"),n("code",null,"my"),l("，并自定义其"),n("code",null,"side"),l("和"),n("code",null,"height"),l("属性。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,">var my = objectPlus(triangle,{")]),l(`
`),n("span",{class:"line"},[n("span",null,"side:4,height:4")]),l(`
`),n("span",{class:"line"},[n("span",null,"});")]),l(`
`),n("span",{class:"line"},[n("span",null,">my.getArea();//8")]),l(`
`),n("span",{class:"line"},[n("span",null,">my.toString();//'shape,2D shape,Triangle,Triangle'")])])])]),n("p",null,[l("这里的"),n("code",null,"objectPlus()"),l("函数的实现方式比起之前提到的"),n("code",null,"object()"),l("更接近"),n("code",null,"ES5"),l("的"),n("code",null,"Object.create()"),l("。只是"),n("code",null,"ES5"),l("的实现中，附加属性（出就是第二个参数）是通过属性描述符提供的（见附录"),n("code",null,"C"),l("：内建对象）。")]),n("p",null,[n("strong",null,"【多重继承】"),l(" 所谓多重继承，通常指的是一个子对象中有不止一个父对象的继承模式。对于这种继承模式，有的面向对象程序支持，有些则不支持。我们可以对它们进行一些甄别，自行判断在复杂的应用程序设计中多重继承是否带来便利，或者是否有必要使用它，以及它是否会比原型链的方式更好。 对于"),n("code",null,"JavaScript"),l("这样的动态语言来说，实现多重继承是很简单的，尽管语言本身没有为此提供特殊的语法单元。 多重继承实现是极其简单的，我们只需要延续属性拷贝法的继承思路依次扩展对象即可，而对参数中所继承的对象的数量没有限制。 下面，我们来创建一个"),n("code",null,"multi()"),l("函数，它可以接受任意数量的输入性对象。然后，我们在其中实现一个双重循环，内层循环用于拷贝属性，而外层循环则用于遍历函数参数中所传递进来的所有对象。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"function multi(){")]),l(`
`),n("span",{class:"line"},[n("span",null,"var n = {};")]),l(`
`),n("span",{class:"line"},[n("span",null,"var staff;")]),l(`
`),n("span",{class:"line"},[n("span",null,"for (var j = 0;j < arguments.length;j++){")]),l(`
`),n("span",{class:"line"},[n("span",null,"stuff = arguments[j];")]),l(`
`),n("span",{class:"line"},[n("span",null,"for (var i in stuff){")]),l(`
`),n("span",{class:"line"},[n("span",null,"if(stuff hasOwnProperty(i)){")]),l(`
`),n("span",{class:"line"},[n("span",null,"n[i] = stuff[i];")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"return n;")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"//")])])])]),n("p",null,[l("现在来测试一下：首先，我们需要创建"),n("code",null,"shape,twoDee"),l("以及一个那匿名对象。然后调用"),n("code",null,"multi()"),l("陈洁灵，将这三个对象作为参数传递，该函数会返回新建的"),n("code",null,"triangle"),l("对象。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"var shape = {")]),l(`
`),n("span",{class:"line"},[n("span",null,"name:'shape',")]),l(`
`),n("span",{class:"line"},[n("span",null,"toString:function(){")]),l(`
`),n("span",{class:"line"},[n("span",null,"return this.name;")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"};")]),l(`
`),n("span",{class:"line"},[n("span",null,"var twoDee = {")]),l(`
`),n("span",{class:"line"},[n("span",null,"name:'2D shape',")]),l(`
`),n("span",{class:"line"},[n("span",null,"dimensions:2,")]),l(`
`),n("span",{class:"line"},[n("span",null,"};")]),l(`
`),n("span",{class:"line"},[n("span",null,"var triangle = multi(shape,twoDee,{")]),l(`
`),n("span",{class:"line"},[n("span",null,"name:'Triangle',")]),l(`
`),n("span",{class:"line"},[n("span",null,"getArea:function(){")]),l(`
`),n("span",{class:"line"},[n("span",null,"return this.side*this.height/2;")]),l(`
`),n("span",{class:"line"},[n("span",null,"},")]),l(`
`),n("span",{class:"line"},[n("span",null,"side:5,")]),l(`
`),n("span",{class:"line"},[n("span",null,"height:10")]),l(`
`),n("span",{class:"line"},[n("span",null,"});")]),l(`
`),n("span",{class:"line"},[n("span",null,"//")])])])]),n("p",null,[l("然后，让我们来看看它是否可以工作。"),n("code",null,"getArea()"),l("方法应该是独有的属性，"),n("code",null,"dimensions"),l("则应该是自"),n("code",null,"twoDee"),l("而来的继承属性，"),n("code",null,"toString()"),l("则是从"),n("code",null,"shape"),l("继承而来的：")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,">triangle.getArea();//25")]),l(`
`),n("span",{class:"line"},[n("span",null,">triangle.dimensions;//2")]),l(`
`),n("span",{class:"line"},[n("span",null,">triangle.toString();//'Triangle'")]),l(`
`),n("span",{class:"line"},[n("span",null,"//")])])])]),n("p",null,[l("要注意的是，"),n("code",null,"multi()"),l("中的循环是按照对象的输入顺序来进行遍历的。如果其中两个对象拥有相同的属性，前一个就会被后一个覆盖。 "),n("strong",null,"混合插入"),l(" 在这里，我们需要了解一种叫做混合插入"),n("code",null,"(mixins)"),l("的技术。我们可以将其看做一种为对象提供某此实用功能的技术，只不过，它并不是通过子对象的继承与扩展来完成的。我们之前所讨论的多重继承实际上正是基于这种技术理念来实现的。也就是说，每当我们新建一个对象时，可以选择将其他对象的内容混合到我们新的对象中去，只要将它们全部传递给"),n("code",null,"multi()"),l("函数，我们就可以在不建立相关继承关系对的情况下获得这些对象的功能。")]),n("p",null,[n("strong",null,"【寄生式继承】"),l(" 这是由"),n("code",null,"Douglas Crockford"),l("所提出的技术，基本思路是，我们可以在创建对象的函数中直接吸收其它对象的功能，然后对其进行扩展并返回。就好像所有的工作都是自己做的一样。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"var twoDee = {")]),l(`
`),n("span",{class:"line"},[n("span",null,"name:'2D shape',")]),l(`
`),n("span",{class:"line"},[n("span",null,"dimensions:2")]),l(`
`),n("span",{class:"line"},[n("span",null,"};")]),l(`
`),n("span",{class:"line"},[n("span",null,"//")])])])]),n("p",null,[l("然后我们来编写用于创建"),n("code",null,"triangle"),l("对象的函数。 "),n("code",null,"//"),l("将"),n("code",null,"twoD"),l("对象克隆进一来叫做"),n("code",null,"that"),l("的对象，这一步可以使用我们之前所讨论过的任何方法，例如使用"),n("code",null,"object()"),l("函数或者执行全属性拷贝。 "),n("code",null,"//"),l("扩展"),n("code",null,"that"),l("对象 "),n("code",null,"//"),l("返回"),n("code",null,"that"),l("对象")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"function triangle(s,h){")]),l(`
`),n("span",{class:"line"},[n("span",null,"var that = object(twoD);")]),l(`
`),n("span",{class:"line"},[n("span",null,"that.name = 'Triangle';")]),l(`
`),n("span",{class:"line"},[n("span",null,"that.getArea = function(){")]),l(`
`),n("span",{class:"line"},[n("span",null,"return this.side*this.height/2;")]),l(`
`),n("span",{class:"line"},[n("span",null,"};")]),l(`
`),n("span",{class:"line"},[n("span",null,"that.side = s;")]),l(`
`),n("span",{class:"line"},[n("span",null,"that.height = h;")]),l(`
`),n("span",{class:"line"},[n("span",null,"return that;")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"//")])])])]),n("p",null,[l("由于"),n("code",null,"triangle()"),l("只是个一般函数，不属于构造器，所以调用它通常是不需要"),n("code",null,"new"),l("操作符的。但由于该函数返回的是一个对象，所以即便我们在函数调用时错误地使用了"),n("code",null,"new"),l("操作符，它也会按照预定的方式工作。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,">var t = triangle(5,10);")]),l(`
`),n("span",{class:"line"},[n("span",null,">t.dimensions;//2")]),l(`
`),n("span",{class:"line"},[n("span",null,">var t2 = new triangle(5,5);")]),l(`
`),n("span",{class:"line"},[n("span",null,">t2.getArea();//12.5")]),l(`
`),n("span",{class:"line"},[n("span",null,"//")])])])]),n("p",null,[l("注意，这里的"),n("code",null,"that"),l("只是一个名字，并不存在与保留字"),n("code",null,"this"),l("用法类似的特殊含义。")]),n("p",null,[n("strong",null,"【构造器借用】"),l(" 由于这种继承模式中，子对象构造器可以通过"),n("code",null,"call()"),l("或"),n("code",null,"apply()"),l("方法来调用父对象的构造器，因而，它通常被称为构造器盗用法"),n("code",null,"(stealing a constructor)"),l("或者构造器借用法"),n("code",null,"(borrowing a constructor)"),l("如果您想更含蓄一点的话。 "),n("code",null,"call()"),l("和"),n("code",null,"apply()"),l("这两个方法允许我们将某个指定对象"),n("code",null,"this"),l("值与一个函数的调用绑定起来。这对于继承而言，就意味着子对象的构造器在调用父对象构造器时，也可以将子对象中新建的"),n("code",null,"this"),l("对象与父对的"),n("code",null,"this"),l("值绑定起来。")]),n("p",null,[n("code",null,"//"),l("下面，我们来构建一个父类构造器")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"`Shape()`:")]),l(`
`),n("span",{class:"line"},[n("span",null,"function Shape(id){")]),l(`
`),n("span",{class:"line"},[n("span",null,"this.id = id;")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"Shape.prototype.name = 'shape';")]),l(`
`),n("span",{class:"line"},[n("span",null,"Shape.prototype.toString = function(){")]),l(`
`),n("span",{class:"line"},[n("span",null,"return this.name;")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"//")])])])]),n("p",null,[l("现在我们来定义"),n("code",null,"Triangle()"),l("构造器，在其中通过"),n("code",null,"apply()"),l("方法来调用"),n("code",null,"Shape()"),l("构造器，并将相关的"),n("code",null,"this"),l("值（即"),n("code",null,"new Triangle()"),l("所创建的实例）和其它一些参数传递给该方法。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"function Triangle(){")]),l(`
`),n("span",{class:"line"},[n("span",null,"Shape.apply(this,arguments);")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"Triangle.prototype.name = 'Triangle';")]),l(`
`),n("span",{class:"line"},[n("span",null,"//")])])])]),n("p",null,[l("注意，这里无论是"),n("code",null,"Triangle()"),l("还是"),n("code",null,"Shape()"),l("者是在其各自的原型中添加些额外的属性。 "),n("code",null,"//"),l("下面，我们来测试一下，先新建一个"),n("code",null,"Triangel"),l("对象：")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,">var t =new Triangle(101);")]),l(`
`),n("span",{class:"line"},[n("span",null,">t.name;//'Triangel'")]),l(`
`),n("span",{class:"line"},[n("span",null,"//")])])])]),n("p",null,[l("在这里，新的"),n("code",null,"Triangle"),l("对象继承了其父对象的"),n("code",null,"id"),l("属性，但它并没有继承父对象原型中的其它任何东西")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,">t.id;//101")]),l(`
`),n("span",{class:"line"},[n("span",null,'>t.toString();//"[object Object]"')]),l(`
`),n("span",{class:"line"},[n("span",null,"//")])])])]),n("p",null,[l("之所以"),n("code",null,"Triangel"),l("对象中不包含"),n("code",null,"Shape"),l("的原型属性，是因为我们从来没有调用"),n("code",null,"new Shape()"),l("创建任何一个实例，自然其原型也从来没有被用到。这很容易做到，例如在本章初的那个示例中，我们可以地"),n("code",null,"Triangle()"),l("构造器进行如下重定义：")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"function Triangel(){")]),l(`
`),n("span",{class:"line"},[n("span",null,"Shape.apple(this,arguments);")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"Triangle.prototype = new Shape();")]),l(`
`),n("span",{class:"line"},[n("span",null,"Triangle.prototype.name = 'Triangle';")])])])]),n("p",null,[l("在这种继承模式中，父对象的属性是以子对象自身属性的身份来重建的。这也体现了构造器借用法的一大优势：当我们创建一个继承于数组或者其它对象类型的子对象时，将获得一个完完全全的新值（不是一个引用），对它做的任何修改都不会影响其父对象。 但这种模式也是有缺点的，因为这种情况下父对象的构造器往往会被调用两次：一次发生在通过"),n("code",null,"apply()"),l("方法继承其自身属性时，而另一次则发生在通过"),n("code",null,"new"),l("操作符继承其原型时。这样一来，父对象自身的属性事实上被继承了两次，下面我们来做一个简单的演示：")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"function Shape(id){")]),l(`
`),n("span",{class:"line"},[n("span",null,"this.id = id;")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"function Triangle(){")]),l(`
`),n("span",{class:"line"},[n("span",null,"Shape.apply(this,arguments);")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"Triangle.prototype = new Shape(101);")]),l(`
`),n("span",{class:"line"},[n("span",null,"//")])])])]),n("p",null,"然后我们新建一个实例："),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,">var t = new Triangle(202);")]),l(`
`),n("span",{class:"line"},[n("span",null,">t.id;//202")]),l(`
`),n("span",{class:"line"},[n("span",null,"//")])])])]),n("p",null,[l("如您所见，对象中有一个自身的属性"),n("code",null,"id"),l("，但它并非来自原型链中，我们可以执行如下验证：")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,">t.__proto__.id;//101")]),l(`
`),n("span",{class:"line"},[n("span",null,">delete t.id;//true")]),l(`
`),n("span",{class:"line"},[n("span",null,">t.id;//101")])])])]),n("p",null,[n("code",null,"delete"),l(" 操作符会从某个对象上移除指定属性。成功删除的时候回返回")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null," true")])])])]),n("p",null,"，否则返回"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null," false")])])])]),n("p",null,[l("。但是，以下情况需要重点考虑： 如果你试图删除的属性不存在，那么"),n("code",null,"delete"),l("将不会起任何作用，但仍会返回"),n("code",null,"true"),l(" 如果对象的原型链上有一个与待删除属性同名的属性，那么删除属性之后，对象会使用原型链上的那个属性（也就是说，"),n("code",null,"delete"),l("操作只会在自身的属性上起作用） 任何使用")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null," var")])])])]),n("p",null,[l("声明的属性不能从全局作用域或函数的作用域中删除。 这样的话，"),n("code",null,"delete"),l("操作不能删除任何在全局作用域中的函数（无论这个函数是来自于函数声明或函数表达式） 除了在全局作用域中的函数不能被删除，在对象"),n("code",null,"(object)"),l("中的函数是能够用"),n("code",null,"delete"),l("操作删除的。 任何用"),n("code",null,"let"),l("或"),n("code",null,"const"),l("声明的属性不能够从它被声明的作用域中删除。 不可设置的"),n("code",null,"(Non-configurable)"),l("属性不能被移除。这意味着像")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"Math, Array, Object")])])])]),n("p",null,"内置对象的属性以及使用"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"Object.defineProperty()")])])])]),n("p",null,"方法设置为不可设置的属性不能被删除。 参考："),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/delete")])])])]),n("p",null,[n("strong",null,"借用构造器与原型复制"),l(" 对于这种构造器的双重调用带来的重复执行问题，实际 上是很容易更正的。我们可以在父对象构造器上调用"),n("code",null,"apply()"),l("方法，以获得其全部的自身属性，然后再用一个简单迭代器对其原型属性执行逐项拷贝（这也可以使用之前讨论"),n("code",null,"extend2()"),l("方法来完成）。例如：")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"function Shape(id){")]),l(`
`),n("span",{class:"line"},[n("span",null,"this.id = id;")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"Shape.prototype.name = 'Shape';")]),l(`
`),n("span",{class:"line"},[n("span",null,"Shape.prototype.toString = function(){")]),l(`
`),n("span",{class:"line"},[n("span",null,"return this.name;")]),l(`
`),n("span",{class:"line"},[n("span",null,"};")]),l(`
`),n("span",{class:"line"},[n("span",null,"function Triangle(){")]),l(`
`),n("span",{class:"line"},[n("span",null,"Shape.apply(this,arguments);")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"extend2(Triangle,Shape);")]),l(`
`),n("span",{class:"line"},[n("span",null,"Triangle.prototype.name = 'Triangle';")]),l(`
`),n("span",{class:"line"},[n("span",null,"//")])])])]),n("p",null,"下面测试一下："),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,">var t = new Triangle(101);")]),l(`
`),n("span",{class:"line"},[n("span",null,">t.toString();//'Triangle'")]),l(`
`),n("span",{class:"line"},[n("span",null,">t.id;//101")]),l(`
`),n("span",{class:"line"},[n("span",null,"//")])])])]),n("p",null,"这样一来，双重继承就不见了："),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,">type of t.__proto__.id;//'undefinded'")]),l(`
`),n("span",{class:"line"},[n("span",null,"//")])])])]),n("p",null,[l("如果有必要的话，"),n("code",null,"extend2()"),l("还可以访问对象的"),n("code",null,"uber"),l("属性：")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,">t.uber.name;//'Shape'")])])])]),n("p",null,[n("strong",null,"【总结】")]),n("p",null,"面对这么多方法，我们应该如何做出正确的选择呢？事实上取决于我们的设计风格、性能需求、具体项目任务及团队。例如，您是否更习惯于从类的角度来解决问题？那么基于构造器工作模式更适合您。或者您可能只关心该”类“的某些具体实例，那么可能使用基于对象的模式更合适。 那么，继承实现是否只有这些呢？当然不是，我们可以从上面的表中选择任何一种模式，也可以混合使用它们，甚至我们也可以写出我们自己的方法。重点在于必须理解并熟悉这些对象、原型以及构造器的工作方式，剩下的就简单了。 > 来自"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null," <https://maxiang.io/client_zh.html>")])])])])],-1)])])}const v=a(i,[["render",t]]);export{g as __pageData,v as default};
