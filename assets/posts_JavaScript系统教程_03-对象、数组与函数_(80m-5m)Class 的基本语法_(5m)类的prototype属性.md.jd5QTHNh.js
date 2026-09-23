import{_ as l,o as e,c as t,j as s,a as n}from"./chunks/framework.DJo0M80U.js";const g=JSON.parse('{"title":"类的prototype属性","description":"围绕“类的prototype属性”整理的概念、示例与实践笔记。","frontmatter":{"title":"类的prototype属性","date":"2026-08-11T00:00:00.000Z","categories":["JavaScript 系统教程"],"tags":["JavaScript","前端","教程","OneNote","对象、数组与函数"],"description":"围绕“类的prototype属性”整理的概念、示例与实践笔记。","sidebarWeight":161,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/b-原生js/面向对象程序设计/(80m-5m)Class 的基本语法/(5m)类的prototype属性.md"},"headers":[],"relativePath":"posts/JavaScript系统教程/03-对象、数组与函数/(80m-5m)Class 的基本语法/(5m)类的prototype属性.md","filePath":"posts/JavaScript系统教程/03-对象、数组与函数/(80m-5m)Class 的基本语法/(5m)类的prototype属性.md"}'),p={name:"posts/JavaScript系统教程/03-对象、数组与函数/(80m-5m)Class 的基本语法/(5m)类的prototype属性.md"};function o(i,a,c,r,u,d){return e(),t("div",null,[...a[0]||(a[0]=[s("div",null,[s("h1",{id:"类的prototype属性",tabindex:"-1"},[n("类的prototype属性 "),s("a",{class:"header-anchor",href:"#类的prototype属性","aria-label":'Permalink to "类的prototype属性"'},"​")]),s("blockquote",null,[s("p",null,"本节目标：理解“类的prototype属性”的核心思路，并能把它用于实际开发或面试表达。")]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"类也有prototype属性，指向原型对象。")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"事实上，类的所有方法都定义在类的prototype属性上面。")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"class Point {")]),n(`
`),s("span",{class:"line"},[s("span",null,"    constructor() {")]),n(`
`),s("span",{class:"line"},[s("span",null,"      // ...")]),n(`
`),s("span",{class:"line"},[s("span",null,"    }")]),n(`
`),s("span",{class:"line"},[s("span",null,"  toString() {")]),n(`
`),s("span",{class:"line"},[s("span",null,"      // ...")]),n(`
`),s("span",{class:"line"},[s("span",null,"    }")]),n(`
`),s("span",{class:"line"},[s("span",null,"  toValue() {")]),n(`
`),s("span",{class:"line"},[s("span",null,"      // ...")]),n(`
`),s("span",{class:"line"},[s("span",null,"    }")]),n(`
`),s("span",{class:"line"},[s("span",null,"  }")]),n(`
`),s("span",{class:"line"},[s("span",null,"  // 等同于")]),n(`
`),s("span",{class:"line"},[s("span",null,"  Point.prototype = {")]),n(`
`),s("span",{class:"line"},[s("span",null,"    constructor() {},")]),n(`
`),s("span",{class:"line"},[s("span",null,"    toString() {},")]),n(`
`),s("span",{class:"line"},[s("span",null,"    toValue() {},")]),n(`
`),s("span",{class:"line"},[s("span",null,"  };")]),n(`
`),s("span",{class:"line"},[s("span",null,"在类的实例上面调用方法，其实就是调用原型上的方法。")]),n(`
`),s("span",{class:"line"},[s("span",null,"class B {}let b = new B();")]),n(`
`),s("span",{class:"line"},[s("span",null,"b.constructor === B.prototype.constructor // true")]),n(`
`),s("span",{class:"line"},[s("span",null,"上面代码中，b是B类的实例，它的constructor方法就是B类原型的constructor方法。")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"**可操作类的原型对象**")]),n(`
`),s("span",{class:"line"},[s("span",null,"由于类的方法都定义在prototype对象上面，所以类的新方法可以添加在prototype对象上面。")]),n(`
`),s("span",{class:"line"},[s("span",null,"Object.assign方法可以很方便地一次向类添加多个方法。")]),n(`
`),s("span",{class:"line"},[s("span",null,"class Point {  constructor(){    // ...  }}")]),n(`
`),s("span",{class:"line"},[s("span",null,"Object.assign(Point.prototype, {  toString(){},  toValue(){}});")])])])])],-1)])])}const m=l(p,[["render",o]]);export{g as __pageData,m as default};
