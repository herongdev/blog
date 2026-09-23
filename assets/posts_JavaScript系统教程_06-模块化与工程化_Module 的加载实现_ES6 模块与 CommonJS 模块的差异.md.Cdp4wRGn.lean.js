import{_ as a,o as e,c as p,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const h=JSON.parse('{"title":"ES6 模块与 CommonJS 模块的差异","description":"第二个差异是因为 CommonJS 加载的是一个对象（即module.exports属性），该对象只有在脚本运行完才会生成。而 ES6 模块不是对象，它的对外接口只是一种静态定义，在代码静态解析阶段就会生成。","frontmatter":{"title":"ES6 模块与 CommonJS 模块的差异","date":"2026-08-11T00:00:00.000Z","categories":["JavaScript 系统教程"],"tags":["JavaScript","前端","教程","OneNote","模块化与工程化"],"description":"第二个差异是因为 CommonJS 加载的是一个对象（即module.exports属性），该对象只有在脚本运行完才会生成。而 ES6 模块不是对象，它的对外接口只是一种静态定义，在代码静态解析阶段就会生成。","sidebarWeight":14,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/b-原生js/12-模块化编程/Module 的加载实现/ES6 模块与 CommonJS 模块的差异.md"},"headers":[],"relativePath":"posts/JavaScript系统教程/06-模块化与工程化/Module 的加载实现/ES6 模块与 CommonJS 模块的差异.md","filePath":"posts/JavaScript系统教程/06-模块化与工程化/Module 的加载实现/ES6 模块与 CommonJS 模块的差异.md"}'),i={name:"posts/JavaScript系统教程/06-模块化与工程化/Module 的加载实现/ES6 模块与 CommonJS 模块的差异.md"};function o(c,l,t,u,r,d){return e(),p("div",null,[...l[0]||(l[0]=[n("div",null,[n("h1",{id:"es6-模块与-commonjs-模块的差异",tabindex:"-1"},[s("ES6 模块与 CommonJS 模块的差异 "),n("a",{class:"header-anchor",href:"#es6-模块与-commonjs-模块的差异","aria-label":'Permalink to "ES6 模块与 CommonJS 模块的差异"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“ES6 模块与 CommonJS 模块的差异”的核心思路，并能把它用于实际开发或面试表达。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"ES6 模块与 CommonJS 模块完全不同。有两个重大差异。")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"CommonJS 模块输出的是值的拷贝，ES6 模块输出的是值的引用。")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。")])])])]),n("p",null,"第二个差异是因为 CommonJS 加载的是一个对象（即module.exports属性），该对象只有在脚本运行完才会生成。而 ES6 模块不是对象，它的对外接口只是一种静态定义，在代码静态解析阶段就会生成。"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"下面重点解释第一个差异。")]),s(`
`),n("span",{class:"line"},[n("span",null,"CommonJS 模块输出的是值的拷贝，也就是说，一旦输出一个值，模块内部的变化就影响不到这个值。请看下面这个模块文件lib.js的例子。")]),s(`
`),n("span",{class:"line"},[n("span",null,"// lib.js")]),s(`
`),n("span",{class:"line"},[n("span",null,"var counter = 3;")]),s(`
`),n("span",{class:"line"},[n("span",null,"function incCounter() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  counter++;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"module.exports = {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  counter: counter,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  incCounter: incCounter,")]),s(`
`),n("span",{class:"line"},[n("span",null,"};")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"上面代码输出内部变量counter和改写这个变量的内部方法incCounter。然后，在main.js里面加载这个模块。")]),s(`
`),n("span",{class:"line"},[n("span",null,"// main.js")]),s(`
`),n("span",{class:"line"},[n("span",null,"var mod = require('./lib');")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(mod.counter);  // 3")]),s(`
`),n("span",{class:"line"},[n("span",null,"mod.incCounter();")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(mod.counter); // 3")]),s(`
`),n("span",{class:"line"},[n("span",null,"上面代码说明，lib.js模块加载以后，它的内部变化就影响不到输出的mod.counter了。这是因为mod.counter是一个原始类型的值，会被缓存。除非写成一个函数，才能得到内部变动后的值。")]),s(`
`),n("span",{class:"line"},[n("span",null,"// lib.js")]),s(`
`),n("span",{class:"line"},[n("span",null,"var counter = 3;")]),s(`
`),n("span",{class:"line"},[n("span",null,"function incCounter() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  counter++;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"module.exports = {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  get counter() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return counter")]),s(`
`),n("span",{class:"line"},[n("span",null,"  },")]),s(`
`),n("span",{class:"line"},[n("span",null,"  incCounter: incCounter,")]),s(`
`),n("span",{class:"line"},[n("span",null,"};")]),s(`
`),n("span",{class:"line"},[n("span",null,"上面代码中，输出的counter属性实际上是一个取值器函数。现在再执行main.js，就可以正确读取内部变量counter的变动了。")]),s(`
`),n("span",{class:"line"},[n("span",null,"$ node main.js34")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"ES6 模块的运行机制与 CommonJS 不一样。JS 引擎对脚本静态分析的时候，遇到模块加载命令import，就会生成一个只读引用。等到脚本真正执行时，再根据这个只读引用，到被加载的那个模块里面去取值。换句话说，ES6 的import有点像 Unix 系统的“符号连接”，原始值变了，import加载的值也会跟着变。因此，ES6 模块是动态引用，并且不会缓存值，模块里面的变量绑定其所在的模块。")]),s(`
`),n("span",{class:"line"},[n("span",null,"还是举上面的例子。")]),s(`
`),n("span",{class:"line"},[n("span",null,"// lib.js")]),s(`
`),n("span",{class:"line"},[n("span",null,"export let counter = 3;")]),s(`
`),n("span",{class:"line"},[n("span",null,"export function incCounter() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  counter++;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"// main.js")]),s(`
`),n("span",{class:"line"},[n("span",null,"import { counter, incCounter } from './lib';")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(counter); // 3")]),s(`
`),n("span",{class:"line"},[n("span",null,"incCounter();")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(counter); // 4")]),s(`
`),n("span",{class:"line"},[n("span",null,"上面代码说明，ES6 模块输入的变量counter是活的，完全反应其所在模块lib.js内部的变化。")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"再举一个出现在export一节中的例子。")]),s(`
`),n("span",{class:"line"},[n("span",null,"// m1.js")]),s(`
`),n("span",{class:"line"},[n("span",null,"export var foo = 'bar';")]),s(`
`),n("span",{class:"line"},[n("span",null,"setTimeout(() => foo = 'baz', 500);")]),s(`
`),n("span",{class:"line"},[n("span",null,"// m2.js")]),s(`
`),n("span",{class:"line"},[n("span",null,"import { foo } from './m1.js';")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(foo);")]),s(`
`),n("span",{class:"line"},[n("span",null,"setTimeout(() => console.log(foo), 500);")]),s(`
`),n("span",{class:"line"},[n("span",null,"上面代码中，m1.js的变量foo，在刚加载时等于bar，过了 500 毫秒，又变为等于baz。")]),s(`
`),n("span",{class:"line"},[n("span",null,"让我们看看，m2.js能否正确读取这个变化。")]),s(`
`),n("span",{class:"line"},[n("span",null,"$ babel-node m2.js")]),s(`
`),n("span",{class:"line"},[n("span",null,"barbaz")]),s(`
`),n("span",{class:"line"},[n("span",null,"上面代码表明，ES6 模块不会缓存运行结果，而是动态地去被加载的模块取值，并且变量总是绑定其所在的模块。每次取值都会其所在模块中去找。")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"由于 ES6 输入的模块变量，只是一个“符号连接”，所以这个变量是只读的，对它进行重新赋值会报错。")]),s(`
`),n("span",{class:"line"},[n("span",null,"// lib.js")]),s(`
`),n("span",{class:"line"},[n("span",null,"export let obj = {};")]),s(`
`),n("span",{class:"line"},[n("span",null,"// main.js")]),s(`
`),n("span",{class:"line"},[n("span",null,"import { obj } from './lib';")]),s(`
`),n("span",{class:"line"},[n("span",null,"obj.prop = 123; // OK")]),s(`
`),n("span",{class:"line"},[n("span",null,"obj = {}; // TypeError")]),s(`
`),n("span",{class:"line"},[n("span",null,"上面代码中，main.js从lib.js输入变量obj，可以对obj添加属性，但是重新赋值就会报错。因为变量obj指向的地址是只读的，不能重新赋值，这就好比main.js创造了一个名为obj的const变量。")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"最后，export通过接口，输出的是同一个值。不同的脚本加载这个接口，得到的都是同样的实例。")]),s(`
`),n("span",{class:"line"},[n("span",null,"// mod.js")]),s(`
`),n("span",{class:"line"},[n("span",null,"function C() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  this.sum = 0;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  this.add = function () {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.sum += 1;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  };")]),s(`
`),n("span",{class:"line"},[n("span",null,"  this.show = function () {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    console.log(this.sum);")]),s(`
`),n("span",{class:"line"},[n("span",null,"  };")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"export let c = new C();")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"上面的脚本mod.js，输出的是一个C的实例。不同的脚本加载这个模块，得到的都是同一个实例。")]),s(`
`),n("span",{class:"line"},[n("span",null,"// x.js")]),s(`
`),n("span",{class:"line"},[n("span",null,"import { c } from './mod';")]),s(`
`),n("span",{class:"line"},[n("span",null,"c.add();")]),s(`
`),n("span",{class:"line"},[n("span",null,"// y.js")]),s(`
`),n("span",{class:"line"},[n("span",null,"import { c } from './mod';")]),s(`
`),n("span",{class:"line"},[n("span",null,"c.show();")]),s(`
`),n("span",{class:"line"},[n("span",null,"// main.js")]),s(`
`),n("span",{class:"line"},[n("span",null,"import './x';")]),s(`
`),n("span",{class:"line"},[n("span",null,"import './y';")]),s(`
`),n("span",{class:"line"},[n("span",null,"现在执行main.js，输出的是1。")]),s(`
`),n("span",{class:"line"},[n("span",null,"$ babel - node main.js")]),s(`
`),n("span",{class:"line"},[n("span",null,"1")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"这就证明了x.js和y.js加载的都是C的同一个实例。")])])])])],-1)])])}const b=a(i,[["render",o]]);export{h as __pageData,b as default};
