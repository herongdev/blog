import{_ as l,o as e,c as t,j as s,a as n}from"./chunks/framework.DJo0M80U.js";const g=JSON.parse('{"title":"this指向","description":"围绕“this指向”整理的概念、示例与实践笔记。","frontmatter":{"title":"this指向","date":"2026-08-11T00:00:00.000Z","categories":["JavaScript 系统教程"],"tags":["JavaScript","前端","教程","OneNote","对象、数组与函数"],"description":"围绕“this指向”整理的概念、示例与实践笔记。","sidebarWeight":158,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/b-原生js/面向对象程序设计/(80m-5m)Class 的基本语法/(5m)this指向.md"},"headers":[],"relativePath":"posts/JavaScript系统教程/03-对象、数组与函数/(80m-5m)Class 的基本语法/(5m)this指向.md","filePath":"posts/JavaScript系统教程/03-对象、数组与函数/(80m-5m)Class 的基本语法/(5m)this指向.md"}'),i={name:"posts/JavaScript系统教程/03-对象、数组与函数/(80m-5m)Class 的基本语法/(5m)this指向.md"};function p(c,a,o,r,u,h){return e(),t("div",null,[...a[0]||(a[0]=[s("div",null,[s("h1",{id:"this指向",tabindex:"-1"},[n("this指向 "),s("a",{class:"header-anchor",href:"#this指向","aria-label":'Permalink to "this指向"'},"​")]),s("blockquote",null,[s("p",null,"本节目标：理解“this指向”的核心思路，并能把它用于实际开发或面试表达。")]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"类的方法内部如果含有this，它默认指向类的实例。")]),n(`
`),s("span",{class:"line"},[s("span",null,"但单独使用类原型上的方法时，很可能报错，原因是this会指向该方法运行时所在的环境（由于 class 内部是严格模式，所以 this 实际指向的是undefined）。")]),n(`
`),s("span",{class:"line"},[s("span",null,"class Logger {")]),n(`
`),s("span",{class:"line"},[s("span",null,"    printName(name = 'there') {")]),n(`
`),s("span",{class:"line"},[s("span",null,"        this.print(`Hello ${name}`);")]),n(`
`),s("span",{class:"line"},[s("span",null,"    }")]),n(`
`),s("span",{class:"line"},[s("span",null,"    print(text) {")]),n(`
`),s("span",{class:"line"},[s("span",null,"        console.log(text);")]),n(`
`),s("span",{class:"line"},[s("span",null,"    }")]),n(`
`),s("span",{class:"line"},[s("span",null,"}")]),n(`
`),s("span",{class:"line"},[s("span",null,"const logger = new Logger();")]),n(`
`),s("span",{class:"line"},[s("span",null,"const { printName } = logger;")]),n(`
`),s("span",{class:"line"},[s("span",null,"printName(); // TypeError: Cannot read property 'print' of undefined")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"解决方法")]),n(`
`),s("span",{class:"line"},[s("span",null,"一、在构造方法中绑定this，这样就不会找不到print方法了。")]),n(`
`),s("span",{class:"line"},[s("span",null,"class Logger {  constructor() {    this.printName = this.printName.bind(this);  }")]),n(`
`),s("span",{class:"line"},[s("span",null,"// ...}")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"二、使用箭头函数。")]),n(`
`),s("span",{class:"line"},[s("span",null,"class Obj {  constructor() {    this.getThis = () => this;  }}")]),n(`
`),s("span",{class:"line"},[s("span",null,"const myObj = new Obj();myObj.getThis() === myObj // true")]),n(`
`),s("span",{class:"line"},[s("span",null,"箭头函数内部的this总是指向定义时所在的对象。上面代码中，箭头函数位于构造函数内部，它的定义生效的时候，是在构造函数执行的时候。这时，箭头函数所在的运行环境，肯定是实例对象，所以this会总是指向实例对象。")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"三、还有一种解决方法是使用Proxy，获取方法的时候，自动绑定this。")]),n(`
`),s("span",{class:"line"},[s("span",null,"function selfish(target) {")]),n(`
`),s("span",{class:"line"},[s("span",null,"    const cache = new WeakMap();")]),n(`
`),s("span",{class:"line"},[s("span",null,"    const handler = {")]),n(`
`),s("span",{class:"line"},[s("span",null,"        get(target, key) {")]),n(`
`),s("span",{class:"line"},[s("span",null,"            const value = Reflect.get(target, key);")]),n(`
`),s("span",{class:"line"},[s("span",null,"            if (typeof value !== 'function') {")]),n(`
`),s("span",{class:"line"},[s("span",null,"                return value;")]),n(`
`),s("span",{class:"line"},[s("span",null,"            }")]),n(`
`),s("span",{class:"line"},[s("span",null,"            if (!cache.has(value)) {")]),n(`
`),s("span",{class:"line"},[s("span",null,"                cache.set(value, value.bind(target));")]),n(`
`),s("span",{class:"line"},[s("span",null,"            }")]),n(`
`),s("span",{class:"line"},[s("span",null,"            return cache.get(value);")]),n(`
`),s("span",{class:"line"},[s("span",null,"        }")]),n(`
`),s("span",{class:"line"},[s("span",null,"    };")]),n(`
`),s("span",{class:"line"},[s("span",null,"    const proxy = new Proxy(target, handler);")]),n(`
`),s("span",{class:"line"},[s("span",null,"    return proxy;")]),n(`
`),s("span",{class:"line"},[s("span",null,"}")]),n(`
`),s("span",{class:"line"},[s("span",null,"const logger = selfish(new Logger());")])])])])],-1)])])}const m=l(i,[["render",p]]);export{g as __pageData,m as default};
