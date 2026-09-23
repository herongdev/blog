import{_ as s,o as l,c as t,j as n,a as e}from"./chunks/framework.DJo0M80U.js";const h=JSON.parse('{"title":"Generator 函数的this","description":"围绕“Generator 函数的this”整理的概念、示例与实践笔记。","frontmatter":{"title":"Generator 函数的this","date":"2026-08-11T00:00:00.000Z","categories":["JavaScript 系统教程"],"tags":["JavaScript","前端","教程","OneNote","异步编程"],"description":"围绕“Generator 函数的this”整理的概念、示例与实践笔记。","sidebarWeight":11,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/b-原生js/11-异步编程/Generator函数/Generator 函数的this.md"},"headers":[],"relativePath":"posts/JavaScript系统教程/05-异步编程/Generator函数/Generator 函数的this.md","filePath":"posts/JavaScript系统教程/05-异步编程/Generator函数/Generator 函数的this.md"}'),i={name:"posts/JavaScript系统教程/05-异步编程/Generator函数/Generator 函数的this.md"};function o(r,a,p,c,u,d){return l(),t("div",null,[...a[0]||(a[0]=[n("div",null,[n("h1",{id:"generator-函数的this",tabindex:"-1"},[e("Generator 函数的this "),n("a",{class:"header-anchor",href:"#generator-函数的this","aria-label":'Permalink to "Generator 函数的this"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“Generator 函数的this”的核心思路，并能把它用于实际开发或面试表达。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"Generator 函数总是返回一个遍历器，ES6 规定这个遍历器是 Generator 函数的实例，也继承了 Generator 函数的prototype对象上的方法。")]),e(`
`),n("span",{class:"line"},[n("span",null,"function* g() {}")]),e(`
`),n("span",{class:"line"},[n("span",null,"g.prototype.hello = function () {  return 'hi!';};")]),e(`
`),n("span",{class:"line"},[n("span",null,"let obj = g();")]),e(`
`),n("span",{class:"line"},[n("span",null,"obj instanceof g // trueobj.hello() // 'hi!'")]),e(`
`),n("span",{class:"line"},[n("span",null,"上面代码表明，Generator 函数g返回的遍历器obj，是g的实例，而且继承了g.prototype。但是，如果把g当作普通的构造函数，并不会生效，因为g返回的总是遍历器对象，而不是this对象。")]),e(`
`),n("span",{class:"line"},[n("span",null,"function* g() {  this.a = 11;}")]),e(`
`),n("span",{class:"line"},[n("span",null,"let obj = g();obj.next();obj.a // undefined")]),e(`
`),n("span",{class:"line"},[n("span",null,"上面代码中，Generator 函数g在this对象上面添加了一个属性a，但是obj对象拿不到这个属性。")]),e(`
`),n("span",{class:"line"},[n("span",null,"Generator 函数也不能跟new命令一起用，会报错。")]),e(`
`),n("span",{class:"line"},[n("span",null,"function* F() {  yield this.x = 2;  yield this.y = 3;}")]),e(`
`),n("span",{class:"line"},[n("span",null,"new F()// TypeError: F is not a constructor")]),e(`
`),n("span",{class:"line"},[n("span",null,"上面代码中，new命令跟构造函数F一起使用，结果报错，因为F不是构造函数。")]),e(`
`),n("span",{class:"line"},[n("span",null,"那么，有没有办法让 Generator 函数返回一个正常的对象实例，既可以用next方法，又可以获得正常的this？")]),e(`
`),n("span",{class:"line"},[n("span",null,"下面是一个变通方法。首先，生成一个空对象，使用call方法绑定 Generator 函数内部的this。这样，构造函数调用以后，这个空对象就是 Generator 函数的实例对象了。")]),e(`
`),n("span",{class:"line"},[n("span",null,"function* F() {  this.a = 1;  yield this.b = 2;  yield this.c = 3;}var obj = {};var f = F.call(obj);")]),e(`
`),n("span",{class:"line"},[n("span",null,"f.next();  // Object {value: 2, done: false}f.next();  // Object {value: 3, done: false}f.next();  // Object {value: undefined, done: true}")]),e(`
`),n("span",{class:"line"},[n("span",null,"obj.a // 1obj.b // 2obj.c // 3")]),e(`
`),n("span",{class:"line"},[n("span",null,"上面代码中，首先是F内部的this对象绑定obj对象，然后调用它，返回一个 Iterator 对象。这个对象执行三次next方法（因为F内部有两个yield表达式），完成 F 内部所有代码的运行。这时，所有内部属性都绑定在obj对象上了，因此obj对象也就成了F的实例。")]),e(`
`),n("span",{class:"line"},[n("span",null,"上面代码中，执行的是遍历器对象f，但是生成的对象实例是obj，有没有办法将这两个对象统一呢？")]),e(`
`),n("span",{class:"line"},[n("span",null,"一个办法就是将obj换成F.prototype。")]),e(`
`),n("span",{class:"line"},[n("span",null,"function* F() {  this.a = 1;  yield this.b = 2;  yield this.c = 3;}var f = F.call(F.prototype);")]),e(`
`),n("span",{class:"line"},[n("span",null,"f.next();  // Object {value: 2, done: false}f.next();  // Object {value: 3, done: false}f.next();  // Object {value: undefined, done: true}")]),e(`
`),n("span",{class:"line"},[n("span",null,"f.a // 1f.b // 2f.c // 3")]),e(`
`),n("span",{class:"line"},[n("span",null,"再将F改成构造函数，就可以对它执行new命令了。")]),e(`
`),n("span",{class:"line"},[n("span",null,"function* gen() {  this.a = 1;  yield this.b = 2;  yield this.c = 3;}")]),e(`
`),n("span",{class:"line"},[n("span",null,"function F() {  return gen.call(gen.prototype);}")]),e(`
`),n("span",{class:"line"},[n("span",null,"var f = new F();")]),e(`
`),n("span",{class:"line"},[n("span",null,"f.next();  // Object {value: 2, done: false}f.next();  // Object {value: 3, done: false}f.next();  // Object {value: undefined, done: true}")]),e(`
`),n("span",{class:"line"},[n("span",null,"f.a // 1f.b // 2f.c // 3")])])])])],-1)])])}const b=s(i,[["render",o]]);export{h as __pageData,b as default};
