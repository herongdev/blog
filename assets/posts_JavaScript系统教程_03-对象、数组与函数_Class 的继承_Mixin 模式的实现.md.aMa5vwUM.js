import{_ as l,o as e,c as i,j as s,a as n}from"./chunks/framework.DJo0M80U.js";const h=JSON.parse('{"title":"Mixin 模式的实现","description":"\\\\ 来自。","frontmatter":{"title":"Mixin 模式的实现","date":"2026-08-11T00:00:00.000Z","categories":["JavaScript 系统教程"],"tags":["JavaScript","前端","教程","OneNote","对象、数组与函数"],"description":"\\\\ 来自。","sidebarWeight":175,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/b-原生js/面向对象程序设计/Class 的继承/Mixin 模式的实现.md"},"headers":[],"relativePath":"posts/JavaScript系统教程/03-对象、数组与函数/Class 的继承/Mixin 模式的实现.md","filePath":"posts/JavaScript系统教程/03-对象、数组与函数/Class 的继承/Mixin 模式的实现.md"}'),t={name:"posts/JavaScript系统教程/03-对象、数组与函数/Class 的继承/Mixin 模式的实现.md"};function p(c,a,o,r,u,d){return e(),i("div",null,[...a[0]||(a[0]=[s("div",null,[s("h1",{id:"mixin-模式的实现",tabindex:"-1"},[n("Mixin 模式的实现 "),s("a",{class:"header-anchor",href:"#mixin-模式的实现","aria-label":'Permalink to "Mixin 模式的实现"'},"​")]),s("blockquote",null,[s("p",null,"本节目标：理解“Mixin 模式的实现”的核心思路，并能把它用于实际开发或面试表达。")]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"Mixin 指的是多个对象合成一个新的对象，新对象具有各个组成成员的接口。它的最简单实现如下。")]),n(`
`),s("span",{class:"line"},[s("span",null,"const a = {  a: 'a'};const b = {  b: 'b'};const c = {...a, ...b}; // {a: 'a', b: 'b'}")]),n(`
`),s("span",{class:"line"},[s("span",null,"上面代码中，c对象是a对象和b对象的合成，具有两者的接口。")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"下面是一个更完备的实现，将多个类的接口“混入”（mix in）另一个类。")]),n(`
`),s("span",{class:"line"},[s("span",null,"function mix(...mixins) {")]),n(`
`),s("span",{class:"line"},[s("span",null,"    class Mix {")]),n(`
`),s("span",{class:"line"},[s("span",null,"        constructor() {")]),n(`
`),s("span",{class:"line"},[s("span",null,"            for (let mixin of mixins) {")]),n(`
`),s("span",{class:"line"},[s("span",null,"                copyProperties(this, new mixin()); // 拷贝实例属性")]),n(`
`),s("span",{class:"line"},[s("span",null,"            }")]),n(`
`),s("span",{class:"line"},[s("span",null,"        }")]),n(`
`),s("span",{class:"line"},[s("span",null,"    }")]),n(`
`),s("span",{class:"line"},[s("span",null,"    for (let mixin of mixins) {")]),n(`
`),s("span",{class:"line"},[s("span",null,"        copyProperties(Mix, mixin); // 拷贝静态属性")]),n(`
`),s("span",{class:"line"},[s("span",null,"        copyProperties(Mix.prototype, mixin.prototype); // 拷贝原型属性")]),n(`
`),s("span",{class:"line"},[s("span",null,"    }")]),n(`
`),s("span",{class:"line"},[s("span",null,"    return Mix;")]),n(`
`),s("span",{class:"line"},[s("span",null,"}")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"function copyProperties(target, source) {")]),n(`
`),s("span",{class:"line"},[s("span",null,"    for (let key of Reflect.ownKeys(source)) {")]),n(`
`),s("span",{class:"line"},[s("span",null,"        if (key !== 'constructor'")]),n(`
`),s("span",{class:"line"},[s("span",null,"            && key !== 'prototype'")]),n(`
`),s("span",{class:"line"},[s("span",null,"            && key !== 'name'")]),n(`
`),s("span",{class:"line"},[s("span",null,"        ) {")]),n(`
`),s("span",{class:"line"},[s("span",null,"            let desc = Object.getOwnPropertyDescriptor(source, key);")]),n(`
`),s("span",{class:"line"},[s("span",null,"            Object.defineProperty(target, key, desc);")]),n(`
`),s("span",{class:"line"},[s("span",null,"        }")]),n(`
`),s("span",{class:"line"},[s("span",null,"    }")]),n(`
`),s("span",{class:"line"},[s("span",null,"}")]),n(`
`),s("span",{class:"line"},[s("span",null,"上面代码的mix函数，可以将多个对象合成为一个类。使用的时候，只要继承这个类即可。")]),n(`
`),s("span",{class:"line"},[s("span",null,"class DistributedEdit extends mix(Loggable, Serializable) {  // ...}")])])])]),s("p",null,"> 来自"),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null," <https://es6.ruanyifeng.com/#docs/class-extends>")])])])])],-1)])])}const m=l(t,[["render",p]]);export{h as __pageData,m as default};
