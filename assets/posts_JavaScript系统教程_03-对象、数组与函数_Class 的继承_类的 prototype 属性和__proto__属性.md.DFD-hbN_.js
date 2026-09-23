import{_ as n,o as e,c as l,j as s,a as t}from"./chunks/framework.DJo0M80U.js";const y=JSON.parse('{"title":"类的 prototype 属性和__proto__属性","description":"围绕“类的 prototype 属性和__proto__属性”整理的概念、示例与实践笔记。","frontmatter":{"title":"类的 prototype 属性和__proto__属性","date":"2026-08-11T00:00:00.000Z","categories":["JavaScript 系统教程"],"tags":["JavaScript","前端","教程","OneNote","对象、数组与函数"],"description":"围绕“类的 prototype 属性和__proto__属性”整理的概念、示例与实践笔记。","sidebarWeight":180,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/b-原生js/面向对象程序设计/Class 的继承/类的 prototype 属性和__proto__属性.md"},"headers":[],"relativePath":"posts/JavaScript系统教程/03-对象、数组与函数/Class 的继承/类的 prototype 属性和__proto__属性.md","filePath":"posts/JavaScript系统教程/03-对象、数组与函数/Class 的继承/类的 prototype 属性和__proto__属性.md"}'),a={name:"posts/JavaScript系统教程/03-对象、数组与函数/Class 的继承/类的 prototype 属性和__proto__属性.md"};function o(_,p,i,r,c,u){return e(),l("div",null,[...p[0]||(p[0]=[s("div",null,[s("h1",{id:"类的-prototype-属性和-proto-属性",tabindex:"-1"},[t("类的 prototype 属性和__proto__属性 "),s("a",{class:"header-anchor",href:"#类的-prototype-属性和-proto-属性","aria-label":'Permalink to "类的 prototype 属性和__proto__属性"'},"​")]),s("blockquote",null,[s("p",null,"本节目标：理解“类的 prototype 属性和__proto__属性”的核心思路，并能把它用于实际开发或面试表达。")]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"Class作为构造函数的语法糖，同时有prototype属性和__proto__属性，因此同时存在两条继承链。")]),t(`
`),s("span",{class:"line"},[s("span",null,"（1）子类的__proto__属性，表示构造函数的继承，总是指向父类。")]),t(`
`),s("span",{class:"line"},[s("span",null,"（2）子类prototype属性的__proto__属性，表示方法的继承，总是指向父类的prototype属性。")]),t(`
`),s("span",{class:"line"},[s("span",null,"class A {}")]),t(`
`),s("span",{class:"line"},[s("span",null,"class B extends A {}")]),t(`
`),s("span",{class:"line"},[s("span",null,"B.__proto__ === A // true")]),t(`
`),s("span",{class:"line"},[s("span",null,"B.prototype.__proto__ === A.prototype // true")]),t(`
`),s("span",{class:"line"},[s("span",null,"上面代码中，子类B的__proto__属性指向父类A，子类B的prototype属性的__proto__属性指向父类A的prototype属性。")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"**类的继承模式**")]),t(`
`),s("span",{class:"line"},[s("span",null,"class A { }")]),t(`
`),s("span",{class:"line"},[s("span",null,"class B { }")]),t(`
`),s("span",{class:"line"},[s("span",null,"// B 的实例继承 A 的实例")]),t(`
`),s("span",{class:"line"},[s("span",null,"Object.setPrototypeOf(B.prototype, A.prototype);")]),t(`
`),s("span",{class:"line"},[s("span",null,"// B 继承 A 的静态属性")]),t(`
`),s("span",{class:"line"},[s("span",null,"Object.setPrototypeOf(B, A);")]),t(`
`),s("span",{class:"line"},[s("span",null,"const b = new B();")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"**Object.setPrototypeOf****的实现**")]),t(`
`),s("span",{class:"line"},[s("span",null,"Object.setPrototypeOf = function (obj, proto) {  obj.__proto__ = proto;  return obj;}")]),t(`
`),s("span",{class:"line"},[s("span",null,"因此，就得到了上面的结果。")]),t(`
`),s("span",{class:"line"},[s("span",null,"Object.setPrototypeOf(B.prototype, A.prototype);// 等同于B.prototype.__proto__ = A.prototype;")]),t(`
`),s("span",{class:"line"},[s("span",null,"Object.setPrototypeOf(B, A);// 等同于B.__proto__ = A;")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"这两条继承链，可以这样理解：")]),t(`
`),s("span",{class:"line"},[s("span",null,"作为一个对象，子类（B）的原型（__proto__属性）是父类（A）；")]),t(`
`),s("span",{class:"line"},[s("span",null,"作为一个构造函数，子类（B）的原型对象（prototype属性）是父类的原型对象（prototype属性）的实例。")]),t(`
`),s("span",{class:"line"},[s("span",null,"B.prototype = Object.create(A.prototype);// 等同于B.prototype.__proto__ = A.prototype;")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"**extends****关键字后面可以跟多种类型的值。**")]),t(`
`),s("span",{class:"line"},[s("span",null,"class B extends A {}")]),t(`
`),s("span",{class:"line"},[s("span",null,"上面代码的A，只要是一个有prototype属性的函数，就能被B继承。由于函数都有prototype属性（除了Function.prototype函数），因此A可以是任意函数。")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"下面，讨论两种情况。")]),t(`
`),s("span",{class:"line"},[s("span",null,"第一种，子类继承Object类。")]),t(`
`),s("span",{class:"line"},[s("span",null,"class A extends Object {}")]),t(`
`),s("span",{class:"line"},[s("span",null,"A.__proto__ === Object // trueA.prototype.__proto__ === Object.prototype // true")]),t(`
`),s("span",{class:"line"},[s("span",null,"这种情况下，A其实就是构造函数Object的复制，A的实例就是Object的实例。")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"第二种情况，不存在任何继承。")]),t(`
`),s("span",{class:"line"},[s("span",null,"class A {}")]),t(`
`),s("span",{class:"line"},[s("span",null,"A.__proto__ === Function.prototype // trueA.prototype.__proto__ === Object.prototype // true")]),t(`
`),s("span",{class:"line"},[s("span",null,"这种情况下，A作为一个基类（即不存在任何继承），就是一个普通函数，所以直接继承Function.prototype。但是，A调用后返回一个空对象（即Object实例），所以A.prototype.__proto__指向构造函数（Object）的prototype属性。")]),t(`
`),s("span",{class:"line"},[s("span",null,"**实例的** **__proto__** **属性**")]),t(`
`),s("span",{class:"line"},[s("span",null,"子类实例的__proto__属性的__proto__属性，指向父类实例的__proto__属性。也就是说，子类的原型的原型，是父类的原型。")]),t(`
`),s("span",{class:"line"},[s("span",null,"var p1 = new Point(2, 3);var p2 = new ColorPoint(2, 3, 'red');")]),t(`
`),s("span",{class:"line"},[s("span",null,"p2.__proto__ === p1.__proto__ // falsep2.__proto__.__proto__ === p1.__proto__ // true")]),t(`
`),s("span",{class:"line"},[s("span",null,"上面代码中，ColorPoint继承了Point，导致前者原型的原型是后者的原型。")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"因此，通过子类实例的__proto__.__proto__属性，可以修改父类实例的行为。")]),t(`
`),s("span",{class:"line"},[s("span",null,"p2.__proto__.__proto__.printName = function () {  console.log('Ha');};")]),t(`
`),s("span",{class:"line"},[s("span",null,'p1.printName() // "Ha"')]),t(`
`),s("span",{class:"line"},[s("span",null,"上面代码在ColorPoint的实例p2上向Point类添加方法，结果影响到了Point的实例p1。")])])])])],-1)])])}const h=n(a,[["render",o]]);export{y as __pageData,h as default};
