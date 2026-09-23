import{_ as l,o as a,c as t,j as s,a as n}from"./chunks/framework.DJo0M80U.js";const m=JSON.parse('{"title":"取值函数（getter）和存值函数（setter）","description":"围绕“取值函数（getter）和存值函数（setter）”整理的概念、示例与实践笔记。","frontmatter":{"title":"取值函数（getter）和存值函数（setter）","date":"2026-08-11T00:00:00.000Z","categories":["JavaScript 系统教程"],"tags":["JavaScript","前端","教程","OneNote","对象、数组与函数"],"description":"围绕“取值函数（getter）和存值函数（setter）”整理的概念、示例与实践笔记。","sidebarWeight":141,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/b-原生js/面向对象程序设计/(1m)类的属性/(5m)取值函数（getter）和存值函数（setter）.md"},"headers":[],"relativePath":"posts/JavaScript系统教程/03-对象、数组与函数/(1m)类的属性/(5m)取值函数（getter）和存值函数（setter）.md","filePath":"posts/JavaScript系统教程/03-对象、数组与函数/(1m)类的属性/(5m)取值函数（getter）和存值函数（setter）.md"}'),p={name:"posts/JavaScript系统教程/03-对象、数组与函数/(1m)类的属性/(5m)取值函数（getter）和存值函数（setter）.md"};function r(i,e,c,u,o,d){return a(),t("div",null,[...e[0]||(e[0]=[s("div",null,[s("h1",{id:"取值函数-getter-和存值函数-setter",tabindex:"-1"},[n("取值函数（getter）和存值函数（setter） "),s("a",{class:"header-anchor",href:"#取值函数-getter-和存值函数-setter","aria-label":'Permalink to "取值函数（getter）和存值函数（setter）"'},"​")]),s("blockquote",null,[s("p",null,"本节目标：理解“取值函数（getter）和存值函数（setter）”的核心思路，并能把它用于实际开发或面试表达。")]),s("blockquote",null,[s("p",null,"说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。")]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"与 ES5 一样，在“类”的内部可以使用get和set关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为。")]),n(`
`),s("span",{class:"line"},[s("span",null,"class MyClass {")]),n(`
`),s("span",{class:"line"},[s("span",null,"    constructor() {")]),n(`
`),s("span",{class:"line"},[s("span",null,"        // ...")]),n(`
`),s("span",{class:"line"},[s("span",null,"    }")]),n(`
`),s("span",{class:"line"},[s("span",null,"    get prop() {")]),n(`
`),s("span",{class:"line"},[s("span",null,"        return 'getter';")]),n(`
`),s("span",{class:"line"},[s("span",null,"    }")]),n(`
`),s("span",{class:"line"},[s("span",null,"    set prop(value) {")]),n(`
`),s("span",{class:"line"},[s("span",null,"        console.log('setter: ' + value);")]),n(`
`),s("span",{class:"line"},[s("span",null,"    }")]),n(`
`),s("span",{class:"line"},[s("span",null,"}")]),n(`
`),s("span",{class:"line"},[s("span",null,"let inst = new MyClass();")]),n(`
`),s("span",{class:"line"},[s("span",null,"inst.prop = 123;")]),n(`
`),s("span",{class:"line"},[s("span",null,"// setter: 123")]),n(`
`),s("span",{class:"line"},[s("span",null,"inst.prop")]),n(`
`),s("span",{class:"line"},[s("span",null,"// 'getter'")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"存值函数和取值函数是设置在属性的 Descriptor 对象上的。")]),n(`
`),s("span",{class:"line"},[s("span",null,"class CustomHTMLElement {")]),n(`
`),s("span",{class:"line"},[s("span",null,"    constructor(element) {")]),n(`
`),s("span",{class:"line"},[s("span",null,"        this.element = element;")]),n(`
`),s("span",{class:"line"},[s("span",null,"    }")]),n(`
`),s("span",{class:"line"},[s("span",null,"    get html() {")]),n(`
`),s("span",{class:"line"},[s("span",null,"        return this.element.innerHTML;")]),n(`
`),s("span",{class:"line"},[s("span",null,"    }")]),n(`
`),s("span",{class:"line"},[s("span",null,"    set html(value) {")]),n(`
`),s("span",{class:"line"},[s("span",null,"        this.element.innerHTML = value;")]),n(`
`),s("span",{class:"line"},[s("span",null,"    }")]),n(`
`),s("span",{class:"line"},[s("span",null,"}")]),n(`
`),s("span",{class:"line"},[s("span",null,"var descriptor = Object.getOwnPropertyDescriptor(")]),n(`
`),s("span",{class:"line"},[s("span",null,'    CustomHTMLElement.prototype, "html"')]),n(`
`),s("span",{class:"line"},[s("span",null,");")]),n(`
`),s("span",{class:"line"},[s("span",null,'"get" in descriptor'),s("span",null,"  // true")]),n(`
`),s("span",{class:"line"},[s("span",null,'"set" in descriptor'),s("span",null,"  // true")]),n(`
`),s("span",{class:"line"},[s("span",null,"注意：html属性定义在原型上，因为没有用this指定。使用取值和存值函数指定的属性，如果没有使用this指定到实例上，就会挂载到原型对象上。")])])])])],-1)])])}const h=l(p,[["render",r]]);export{m as __pageData,h as default};
