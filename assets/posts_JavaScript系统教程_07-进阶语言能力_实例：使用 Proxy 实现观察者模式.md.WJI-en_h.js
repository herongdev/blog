import{_ as a,o as l,c as t,j as s,a as e}from"./chunks/framework.DJo0M80U.js";const b=JSON.parse('{"title":"实例：使用 Proxy 实现观察者模式","description":"\\\\ 来自。","frontmatter":{"title":"实例：使用 Proxy 实现观察者模式","date":"2026-08-11T00:00:00.000Z","categories":["JavaScript 系统教程"],"tags":["JavaScript","前端","教程","OneNote","进阶语言能力"],"description":"\\\\ 来自。","sidebarWeight":22,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/b-原生js/Reflect/实例：使用 Proxy 实现观察者模式.md"},"headers":[],"relativePath":"posts/JavaScript系统教程/07-进阶语言能力/实例：使用 Proxy 实现观察者模式.md","filePath":"posts/JavaScript系统教程/07-进阶语言能力/实例：使用 Proxy 实现观察者模式.md"}'),p={name:"posts/JavaScript系统教程/07-进阶语言能力/实例：使用 Proxy 实现观察者模式.md"};function r(o,n,i,c,u,d){return l(),t("div",null,[...n[0]||(n[0]=[s("div",null,[s("h1",{id:"实例-使用-proxy-实现观察者模式",tabindex:"-1"},[e("实例：使用 Proxy 实现观察者模式 "),s("a",{class:"header-anchor",href:"#实例-使用-proxy-实现观察者模式","aria-label":'Permalink to "实例：使用 Proxy 实现观察者模式"'},"​")]),s("blockquote",null,[s("p",null,"本节目标：理解“实例：使用 Proxy 实现观察者模式”的核心思路，并能把它用于实际开发或面试表达。")]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"观察者模式（Observer mode）指的是函数自动观察数据对象，一旦对象有变化，函数就会自动执行。")]),e(`
`),s("span",{class:"line"},[s("span",null,"const person = observable({")]),e(`
`),s("span",{class:"line"},[s("span",null,"    name: '张三',")]),e(`
`),s("span",{class:"line"},[s("span",null,"    age: 20")]),e(`
`),s("span",{class:"line"},[s("span",null,"});")]),e(`
`),s("span",{class:"line"},[s("span",null,"function print() {")]),e(`
`),s("span",{class:"line"},[s("span",null,"    console.log(`${person.name}, ${person.age}`)")]),e(`
`),s("span",{class:"line"},[s("span",null,"}")]),e(`
`),s("span",{class:"line"},[s("span",null,"observe(print);")]),e(`
`),s("span",{class:"line"},[s("span",null,"person.name = '李四';")]),e(`
`),s("span",{class:"line"},[s("span",null,"  // 输出")]),e(`
`),s("span",{class:"line"},[s("span",null,"  // 李四, 20")]),e(`
`),s("span",{class:"line"},[s("span",null,"上面代码中，数据对象person是观察目标，函数print是观察者。一旦数据对象发生变化，print就会自动执行。")]),e(`
`),s("span",{class:"line"},[s("span",null,"下面，使用 Proxy 写一个观察者模式的最简单实现，即实现observable和observe这两个函数。思路是observable函数返回一个原始对象的 Proxy 代理，拦截赋值操作，触发充当观察者的各个函数。")]),e(`
`),s("span",{class:"line"},[s("span",null,"const queuedObservers = new Set();")]),e(`
`),s("span",{class:"line"},[s("span",null,"const observe = fn => queuedObservers.add(fn);")]),e(`
`),s("span",{class:"line"},[s("span",null,"const observable = obj => new Proxy(obj, { set });")]),e(`
`),s("span",{class:"line"},[s("span",null,"function set(target, key, value, receiver) {")]),e(`
`),s("span",{class:"line"},[s("span",null,"    const result = Reflect.set(target, key, value, receiver);")]),e(`
`),s("span",{class:"line"},[s("span",null,"    queuedObservers.forEach(observer => observer());")]),e(`
`),s("span",{class:"line"},[s("span",null,"    return result;")]),e(`
`),s("span",{class:"line"},[s("span",null,"}")]),e(`
`),s("span",{class:"line"},[s("span",null,"上面代码中，先定义了一个Set集合，所有观察者函数都放进这个集合。然后，observable函数返回原始对象的代理，拦截赋值操作。拦截函数set之中，会自动执行所有观察者。")])])])]),s("p",null,"> 来自"),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null," <http://es6.ruanyifeng.com/#docs/reflect>")])])])])],-1)])])}const h=a(p,[["render",r]]);export{b as __pageData,h as default};
