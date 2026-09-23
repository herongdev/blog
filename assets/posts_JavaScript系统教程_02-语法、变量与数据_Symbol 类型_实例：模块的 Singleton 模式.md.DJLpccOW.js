import{_ as a,o as e,c as o,j as n,a as l}from"./chunks/framework.DJo0M80U.js";const m=JSON.parse('{"title":"实例：模块的 Singleton 模式","description":"围绕“实例：模块的 Singleton 模式”整理的概念、示例与实践笔记。","frontmatter":{"title":"实例：模块的 Singleton 模式","date":"2026-08-11T00:00:00.000Z","categories":["JavaScript 系统教程"],"tags":["JavaScript","前端","教程","OneNote","语法、变量与数据"],"description":"围绕“实例：模块的 Singleton 模式”整理的概念、示例与实践笔记。","sidebarWeight":65,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/b-原生js/数据类型/Symbol 类型/实例：模块的 Singleton 模式.md"},"headers":[],"relativePath":"posts/JavaScript系统教程/02-语法、变量与数据/Symbol 类型/实例：模块的 Singleton 模式.md","filePath":"posts/JavaScript系统教程/02-语法、变量与数据/Symbol 类型/实例：模块的 Singleton 模式.md"}'),t={name:"posts/JavaScript系统教程/02-语法、变量与数据/Symbol 类型/实例：模块的 Singleton 模式.md"};function i(p,s,c,r,u,d){return e(),o("div",null,[...s[0]||(s[0]=[n("div",null,[n("h1",{id:"实例-模块的-singleton-模式",tabindex:"-1"},[l("实例：模块的 Singleton 模式 "),n("a",{class:"header-anchor",href:"#实例-模块的-singleton-模式","aria-label":'Permalink to "实例：模块的 Singleton 模式"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“实例：模块的 Singleton 模式”的核心思路，并能把它用于实际开发或面试表达。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"Singleton 模式指的是调用一个类，任何时候返回的都是同一个实例。")]),l(`
`),n("span",{class:"line"},[n("span",null,"对于 Node 来说，模块文件可以看成是一个类。怎么保证每次执行这个模块文件，返回的都是同一个实例呢？")]),l(`
`),n("span",{class:"line"},[n("span",null,"很容易想到，可以把实例放到顶层对象global。")]),l(`
`),n("span",{class:"line"},[n("span",null,"// mod.jsfunction A() {  this.foo = 'hello';}")]),l(`
`),n("span",{class:"line"},[n("span",null,"if (!global._foo) {  global._foo = new A();}")]),l(`
`),n("span",{class:"line"},[n("span",null,"module.exports = global._foo;")]),l(`
`),n("span",{class:"line"},[n("span",null,"然后，加载上面的mod.js。")]),l(`
`),n("span",{class:"line"},[n("span",null,"const a = require('./mod.js');console.log(a.foo);")]),l(`
`),n("span",{class:"line"},[n("span",null,"上面代码中，变量a任何时候加载的都是A的同一个实例。")]),l(`
`),n("span",{class:"line"},[n("span",null,"但是，这里有一个问题，全局变量global._foo是可写的，任何文件都可以修改。")]),l(`
`),n("span",{class:"line"},[n("span",null,"global._foo = { foo: 'world' };")]),l(`
`),n("span",{class:"line"},[n("span",null,"const a = require('./mod.js');console.log(a.foo);")]),l(`
`),n("span",{class:"line"},[n("span",null,"上面的代码，会使得加载mod.js的脚本都失真。")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"为了防止这种情况出现，我们就可以使用 Symbol。")]),l(`
`),n("span",{class:"line"},[n("span",null,"// mod.jsconst FOO_KEY = Symbol.for('foo');")]),l(`
`),n("span",{class:"line"},[n("span",null,"function A() {  this.foo = 'hello';}")]),l(`
`),n("span",{class:"line"},[n("span",null,"if (!global[FOO_KEY]) {  global[FOO_KEY] = new A();}")]),l(`
`),n("span",{class:"line"},[n("span",null,"module.exports = global[FOO_KEY];")]),l(`
`),n("span",{class:"line"},[n("span",null,"上面代码中，可以保证global[FOO_KEY]不会被无意间覆盖，但还是可以被改写。")]),l(`
`),n("span",{class:"line"},[n("span",null,"global[Symbol.for('foo')] = { foo: 'world' };")]),l(`
`),n("span",{class:"line"},[n("span",null,"const a = require('./mod.js');")]),l(`
`),n("span",{class:"line"},[n("span",null,"如果键名使用Symbol方法生成，那么外部将无法引用这个值，当然也就无法改写。")]),l(`
`),n("span",{class:"line"},[n("span",null,"// mod.jsconst FOO_KEY = Symbol('foo');")]),l(`
`),n("span",{class:"line"},[n("span",null,"// 后面代码相同 ……")]),l(`
`),n("span",{class:"line"},[n("span",null,"上面代码将导致其他脚本都无法引用FOO_KEY。但这样也有一个问题，就是如果多次执行这个脚本，每次得到的FOO_KEY都是不一样的。虽然 Node 会将脚本的执行结果缓存，一般情况下，不会多次执行同一个脚本，但是用户可以手动清除缓存，所以也不是绝对可靠。")])])])])],-1)])])}const b=a(t,[["render",i]]);export{m as __pageData,b as default};
