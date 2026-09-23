import{_ as a,o as e,c as p,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const g=JSON.parse('{"title":"常见函数封装","description":"检测变量类型 jquery3.3.1中的方法 保藏的 运算符优先级 // typeof 与 ! 同级 // 比较运算符 ( ) \\\\ 逻辑运算符 最后三元运算符。","frontmatter":{"title":"常见函数封装","date":"2026-08-11T00:00:00.000Z","categories":["JavaScript 系统教程"],"tags":["JavaScript","前端","教程","OneNote","面试与手写"],"description":"检测变量类型 jquery3.3.1中的方法 保藏的 运算符优先级 // typeof 与 ! 同级 // 比较运算符 ( ) \\\\ 逻辑运算符 最后三元运算符。","sidebarWeight":28,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/b-原生js/面试题/常见函数封装.md"},"headers":[],"relativePath":"posts/JavaScript系统教程/09-面试与手写/常见函数封装.md","filePath":"posts/JavaScript系统教程/09-面试与手写/常见函数封装.md"}'),t={name:"posts/JavaScript系统教程/09-面试与手写/常见函数封装.md"};function i(c,l,o,u,r,d){return e(),p("div",null,[...l[0]||(l[0]=[n("div",null,[n("h1",{id:"常见函数封装",tabindex:"-1"},[s("常见函数封装 "),n("a",{class:"header-anchor",href:"#常见函数封装","aria-label":'Permalink to "常见函数封装"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“常见函数封装”的核心思路，并能把它用于实际开发或面试表达。 检测变量类型")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"function typeOf(arg) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"return typeof arg !== 'object' ? typeof arg : Object.prototype.toString.call(arg);")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(typeOf([1,2]));")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"function typeOf(arg) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"if (typeof arg !== 'object') {")]),s(`
`),n("span",{class:"line"},[n("span",null,"return typeof arg;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"return Object.prototype.toString.call(arg);")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"console.log(typeOf([1,2]));")])])])]),n("p",null,"jquery3.3.1中的方法"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,'"use strict";')]),s(`
`),n("span",{class:"line"},[n("span",null,"var arr = [];")]),s(`
`),n("span",{class:"line"},[n("span",null,"var document = window.document;")]),s(`
`),n("span",{class:"line"},[n("span",null,"var getProto = Object.getPrototypeOf;")]),s(`
`),n("span",{class:"line"},[n("span",null,"var slice = arr.slice;")]),s(`
`),n("span",{class:"line"},[n("span",null,"var concat = arr.concat;")]),s(`
`),n("span",{class:"line"},[n("span",null,"var push = arr.push;")]),s(`
`),n("span",{class:"line"},[n("span",null,"var indexOf = arr.indexOf;")]),s(`
`),n("span",{class:"line"},[n("span",null,"var class2type = {};")]),s(`
`),n("span",{class:"line"},[n("span",null,"var toString = class2type.toString;")]),s(`
`),n("span",{class:"line"},[n("span",null,"var hasOwn = class2type.hasOwnProperty;")]),s(`
`),n("span",{class:"line"},[n("span",null,"var fnToString = hasOwn.toString;")]),s(`
`),n("span",{class:"line"},[n("span",null,"var ObjectFunctionString = fnToString.call(Object);")]),s(`
`),n("span",{class:"line"},[n("span",null,"var support = {};")]),s(`
`),n("span",{class:"line"},[n("span",null,"var isFunction = function isFunction(obj) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"// Support: Chrome <=57, Firefox <=52")]),s(`
`),n("span",{class:"line"},[n("span",null,'// In some browsers, typeof returns "function" for HTML <object> elements')]),s(`
`),n("span",{class:"line"},[n("span",null,'// (i.e., `typeof document.createElement( "object" ) === "function"`).')]),s(`
`),n("span",{class:"line"},[n("span",null,"// We don't want to classify *any* DOM node as a function.")]),s(`
`),n("span",{class:"line"},[n("span",null,'return typeof obj === "function" && typeof obj.nodeType !== "number";')]),s(`
`),n("span",{class:"line"},[n("span",null,"};")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"var isWindow = function isWindow(obj) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"return obj != null && obj === obj.window;")]),s(`
`),n("span",{class:"line"},[n("span",null,"};")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"var preservedScriptAttributes = {//")])])])]),n("p",null,"保藏的"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"type: true,")]),s(`
`),n("span",{class:"line"},[n("span",null,"src: true,")]),s(`
`),n("span",{class:"line"},[n("span",null,"noModule: true")]),s(`
`),n("span",{class:"line"},[n("span",null,"};")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"function DOMEval(code, doc, node) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"doc = doc || document;")]),s(`
`),n("span",{class:"line"},[n("span",null,"var i,")]),s(`
`),n("span",{class:"line"},[n("span",null,'script = doc.createElement("script");')]),s(`
`),n("span",{class:"line"},[n("span",null,"script.text = code;")]),s(`
`),n("span",{class:"line"},[n("span",null,"if (node) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"for (i in preservedScriptAttributes) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"if (node[i]) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"script[i] = node[i];")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"doc.head.appendChild(script).parentNode.removeChild(script);")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"function toType(obj) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"if (obj == null) {")]),s(`
`),n("span",{class:"line"},[n("span",null,'return obj + "";')]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"// Support: Android <=2.3 only (functionish RegExp)")]),s(`
`),n("span",{class:"line"},[n("span",null,"//")])])])]),n("p",null,[s("运算符优先级 "),n("code",null,"// typeof"),s(" 与 "),n("code",null,"!"),s(" 同级 "),n("code",null,"//"),s(" 比较运算符"),n("code",null,"(== ===) \\>"),s(" 逻辑运算符")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"(! > && > ||)")]),s(`
`),n("span",{class:"line"},[n("span",null,"//")])])])]),n("p",null,"最后三元运算符"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,'return typeof obj === "object" || typeof obj === "function" ?')]),s(`
`),n("span",{class:"line"},[n("span",null,'class2type[toString.call(obj)] || "object" :')]),s(`
`),n("span",{class:"line"},[n("span",null,"typeof obj;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])])],-1)])])}const v=a(t,[["render",i]]);export{g as __pageData,v as default};
