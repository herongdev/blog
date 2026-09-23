import{_ as l,o as e,c as t,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const m=JSON.parse('{"title":"实例属性","description":"围绕“实例属性”整理的概念、示例与实践笔记。","frontmatter":{"title":"实例属性","date":"2026-08-11T00:00:00.000Z","categories":["JavaScript 系统教程"],"tags":["JavaScript","前端","教程","OneNote","对象、数组与函数"],"description":"围绕“实例属性”整理的概念、示例与实践笔记。","sidebarWeight":142,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/b-原生js/面向对象程序设计/(1m)类的属性/(5m)实例属性.md"},"headers":[],"relativePath":"posts/JavaScript系统教程/03-对象、数组与函数/(1m)类的属性/(5m)实例属性.md","filePath":"posts/JavaScript系统教程/03-对象、数组与函数/(1m)类的属性/(5m)实例属性.md"}'),p={name:"posts/JavaScript系统教程/03-对象、数组与函数/(1m)类的属性/(5m)实例属性.md"};function i(c,a,o,r,u,d){return e(),t("div",null,[...a[0]||(a[0]=[n("div",null,[n("h1",{id:"实例属性",tabindex:"-1"},[s("实例属性 "),n("a",{class:"header-anchor",href:"#实例属性","aria-label":'Permalink to "实例属性"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“实例属性”的核心思路，并能把它用于实际开发或面试表达。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**实例的属性需定义在****this****对象上，否则都是定义在原型上（即定义在****class****上）。**")]),s(`
`),n("span",{class:"line"},[n("span",null,"//定义类")]),s(`
`),n("span",{class:"line"},[n("span",null,"class Point {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    constructor(x, y) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        this.x = x;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        this.y = y;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    toString() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        return '(' + this.x + ', ' + this.y + ')';")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"var point = new Point(2, 3);")]),s(`
`),n("span",{class:"line"},[n("span",null,"point.toString() // (2, 3)")]),s(`
`),n("span",{class:"line"},[n("span",null,"point.hasOwnProperty('x') // true")]),s(`
`),n("span",{class:"line"},[n("span",null,"point.hasOwnProperty('y') // true")]),s(`
`),n("span",{class:"line"},[n("span",null,"point.hasOwnProperty('toString') // false")]),s(`
`),n("span",{class:"line"},[n("span",null,"point.__proto__.hasOwnProperty('toString') // true")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**实例属性的新写法**")]),s(`
`),n("span",{class:"line"},[n("span",null,"实例属性可以定义在类的最顶层，构造函数之外，这时不需要在实例属性前面加上this。如：")]),s(`
`),n("span",{class:"line"},[n("span",null,"class IncreasingCounter {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    _count = 0;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    get value() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        console.log('Getting the current value!');")]),s(`
`),n("span",{class:"line"},[n("span",null,"        return this._count;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    increment() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        this._count++;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"新写法的好处：")]),s(`
`),n("span",{class:"line"},[n("span",null,"所有实例对象自身的属性都定义在类的头部，实例的属性一目了然。")]),s(`
`),n("span",{class:"line"},[n("span",null,"class foo {  bar = 'hello';  baz = 'world';")]),s(`
`),n("span",{class:"line"},[n("span",null,"constructor() {    // ...  }}")])])])])],-1)])])}const g=l(p,[["render",i]]);export{m as __pageData,g as default};
