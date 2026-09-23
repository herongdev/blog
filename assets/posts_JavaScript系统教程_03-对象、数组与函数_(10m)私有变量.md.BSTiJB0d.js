import{_ as l,o as e,c as p,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const v=JSON.parse('{"title":"私有变量","description":"严格来讲，JavaScript中没有私有成员的概念；所有对象属性都是公有的。 不过，倒是有一个私有变量的概念。任何在函数中定义的变量，都可以认为是私有变量，因为不能在函数的外部访问这些变量。 如果在这个函数内部创建一个闭包，那么闭包通过自己的作用域链也可以访问这些变量。而利用这一。","frontmatter":{"title":"私有变量","date":"2026-08-11T00:00:00.000Z","categories":["JavaScript 系统教程"],"tags":["JavaScript","前端","教程","OneNote","对象、数组与函数"],"description":"严格来讲，JavaScript中没有私有成员的概念；所有对象属性都是公有的。 不过，倒是有一个私有变量的概念。任何在函数中定义的变量，都可以认为是私有变量，因为不能在函数的外部访问这些变量。 如果在这个函数内部创建一个闭包，那么闭包通过自己的作用域链也可以访问这些变量。而利用这一。","sidebarWeight":6,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/b-原生js/引用数据类型-函数/(10m)私有变量.md"},"headers":[],"relativePath":"posts/JavaScript系统教程/03-对象、数组与函数/(10m)私有变量.md","filePath":"posts/JavaScript系统教程/03-对象、数组与函数/(10m)私有变量.md"}'),i={name:"posts/JavaScript系统教程/03-对象、数组与函数/(10m)私有变量.md"};function t(c,a,u,o,r,d){return e(),p("div",null,[...a[0]||(a[0]=[n("div",null,[n("h1",{id:"私有变量",tabindex:"-1"},[s("私有变量 "),n("a",{class:"header-anchor",href:"#私有变量","aria-label":'Permalink to "私有变量"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“私有变量”的核心思路，并能把它用于实际开发或面试表达。 严格来讲，JavaScript中没有私有成员的概念；所有对象属性都是公有的。")]),n("p",null,"不过，倒是有一个私有变量的概念。任何在函数中定义的变量，都可以认为是私有变量，因为不能在函数的外部访问这些变量。"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"私有变量包括函数的：")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"参数")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"局部变量")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"在函数内部定义的其他函数。")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"来看下面的例子：")]),s(`
`),n("span",{class:"line"},[n("span",null,"function add(num1, num2) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    var sum = num1 + num2;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return sum;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"在这个函数内部，有3个私有变量：num1、num2和sum，在函数内部可以访何这几个变量，但在函数外部则不能访问它们。")])])])]),n("p",null,"如果在这个函数内部创建一个闭包，那么闭包通过自己的作用域链也可以访问这些变量。而利用这一点，就可以创建用于访问私有变量的公有方法。"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"我们把有权访问私有变量和私有函数的公有方法称为特权方法(privileged method)。")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"有两种在对象上创建特权方法的方式。")]),s(`
`),n("span",{class:"line"},[n("span",null,"第一种是在构造函数中定义特权方法，基本模式如下。")]),s(`
`),n("span",{class:"line"},[n("span",null,"function MyObject() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 私有变量和私有函数")]),s(`
`),n("span",{class:"line"},[n("span",null,"    var privateVariable = 10;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    function privateFunction() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        return false;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 特权方法")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.publicMethod = function () {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        privateVariable++;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        return privateFunction();")]),s(`
`),n("span",{class:"line"},[n("span",null,"    };")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("p",null,"这个模式在构造函数内部定义了所有私有变量和函数。然后，又继续创建了能够访何这些私有成员的特权方法。能够在构造函数中定义特权方法，是因为特权方法作为闭包有权访问在构造函数中定义的所有变量和函数。对这个例子而言，privateVariable和函数privateFunction()只能通过特权方法publicMethod()来访问，在创建MyObject的实例后，除了使用publicMethod()这一个途径外，没有任何办法可以直接访问privateVariable和privateFunction()。"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"利用私有和特权成员，可以隐藏那些不应该被直接修改的数据，例如：")]),s(`
`),n("span",{class:"line"},[n("span",null,"function Person(name) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.getName = function () {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        return name;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    };")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.setName = function (value) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        name = value;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    };")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,'var person = new Person("Nicholas");')]),s(`
`),n("span",{class:"line"},[n("span",null,'alert(person.getName()); //"Nicholas"')]),s(`
`),n("span",{class:"line"},[n("span",null,'person.setName("Greg");')]),s(`
`),n("span",{class:"line"},[n("span",null,'alert(person.getName()); //"Greg"')]),s(`
`),n("span",{class:"line"},[n("span",null,"以上代码的构造函数中定义了两个特权方法：getName()和setName()。这两个方法都可以在构造函数外部使用，而且都有权访问私有变量name。但在Person构造函数外部,没有任何办法访问name。")])])])]),n("p",null,"由于这两个方法是在构造函数内部定义的，它们作为闭包能够通过作用域链访问name。私有变量name在Person的每个实例中都不相同，因为每次调用构造函数都会重新创建这两个方法。不过，在构造函数中定义特权方法也有一个缺点，那就是你必须使用构造函数模式来达到这个目的。构造函数模式的点是针对每个实例都会创建同样一组新方法，而使用静态私有变量来实现特权方法就可以避免这个何题。"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**静态私有变量**")]),s(`
`),n("span",{class:"line"},[n("span",null,"通过在私有作用域中定义私有变量或函数，同样也可以创建特权方法，其基本模式如下所示：")]),s(`
`),n("span",{class:"line"},[n("span",null,"(function () {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 私有变量和私有函数")]),s(`
`),n("span",{class:"line"},[n("span",null,"    var privateVariable = 10;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    function privateFunction() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        return false;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 构造函数")]),s(`
`),n("span",{class:"line"},[n("span",null,"    MyObject = function () { };")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 公有/特权方法")]),s(`
`),n("span",{class:"line"},[n("span",null,"    MyObject.prototype.publicMethod = function () {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        privateVariable++;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        return privateFunction();")]),s(`
`),n("span",{class:"line"},[n("span",null,"    };")]),s(`
`),n("span",{class:"line"},[n("span",null,"})();")]),s(`
`),n("span",{class:"line"},[n("span",null,"这个模式创建了一个私有作用域，并在其中封装了一个构造函数及相应的方法。在私有作用城中，首先定义了私有变最和私有函数，然后又定义了构造函数及其公有方法。公有方法是在原型上定义的，这一点体现了典型的原型模式。需要注意的是，这个模式在定义构造函数时并没有使用函数声明，而是使用了函数表达式。函数声明只能创建局部函数，但那并不是我们想要的。出于同样的原因，我们也没有在声明MyObject时使用var关键字。记住：初始化未经声明的变量，总是会创建全局变量。")]),s(`
`),n("span",{class:"line"},[n("span",null,"因此，MyObject就成了一个全局变最，能够在私有作用域之外被访冋到。但也要知道，在严格模式下给未经声明的变最赋值会导致错误。")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"这个模式与在构造函数中定义特权方法的主要区别，就在于私有变量和函数是由实例共享的。由于待权方法是在原型上定义的，因此所有实例都使用同一个函数。而这个特权方法，作为一个闭包，同是保存着对包含作用域的引用。来看一看下面的代码。")]),s(`
`),n("span",{class:"line"},[n("span",null,"(function () {")]),s(`
`),n("span",{class:"line"},[n("span",null,'    var name = "";')]),s(`
`),n("span",{class:"line"},[n("span",null,"    Person = function (value) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        name = value;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    };")]),s(`
`),n("span",{class:"line"},[n("span",null,"    Person.prototype.getName = function () {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        return name;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    };")]),s(`
`),n("span",{class:"line"},[n("span",null,"    Person.prototype.setName = function (value) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        name = value;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    };")]),s(`
`),n("span",{class:"line"},[n("span",null,"})();")]),s(`
`),n("span",{class:"line"},[n("span",null,'var person1 = new Person("Nicholas");')]),s(`
`),n("span",{class:"line"},[n("span",null,'alert(person1.getName()); //"Nicholas"')]),s(`
`),n("span",{class:"line"},[n("span",null,'person1.setName("Greg");')]),s(`
`),n("span",{class:"line"},[n("span",null,'alert(person1.getName()); //"Greg"')]),s(`
`),n("span",{class:"line"},[n("span",null,'var person2 = new Person("Michael");')]),s(`
`),n("span",{class:"line"},[n("span",null,'alert(person1.getName()); //"Michael"')]),s(`
`),n("span",{class:"line"},[n("span",null,'alert(person2.getName()); //"Michael"')]),s(`
`),n("span",{class:"line"},[n("span",null,"这个例子中的Person构造函数与getName()和setName()方法一样，都有权访问私有变量:name。在这种模式下，变name就变成了一个静态的、由所有实例共享的属性。也就是说，在一个实例上调用setName()会影响所有实例。而调用setName()或新建一个Person实例都会赋予name属性一个新值。结果就是所有实例都会返回相同的值。")])])])]),n("p",null,"以这种方式创建静态私有变最会因为使用原型而增进代码复用，但每个实例都没有自己的私有变量。到底是使用实例变量，还是静态私有变量，最终还是要视你的具体需求而定。"),n("p",null,"多查找作用链中的一个层次，就会在一定程度上影响査找速度。而这正是使用 闭包和私有变量的一个明显的不足之处。")],-1)])])}const g=l(i,[["render",t]]);export{v as __pageData,g as default};
